const express = require('express');
const path = require('path');
const https = require('https');
const nodeFetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.argv[2] || 3000;

// Enable CORS for all origins and methods
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Common proxy handler logic
const handleProxy = async (req, res) => {
    // Merge params from body (for POST) or query (for GET)
    const { 
        url, 
        method = 'GET', 
        headers = {}, 
        body, 
        sslVerify = true 
    } = { ...req.query, ...req.body };

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Proxying ${method} request to: ${url} (SSL Verify: ${sslVerify})`);
        
        const startTime = Date.now();
        
        const agent = new https.Agent({
            rejectUnauthorized: String(sslVerify) !== 'false'
        });

        // Parse headers if they came as a string (common in GET query params)
        let parsedHeaders = headers;
        if (typeof headers === 'string') {
            try {
                parsedHeaders = JSON.parse(headers);
            } catch (e) {
                parsedHeaders = {};
            }
        }

        const fetchOptions = {
            method: (method || 'GET').toUpperCase(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                ...parsedHeaders
            },
            agent: url.startsWith('https') ? agent : undefined,
            timeout: 30000 // 30 seconds timeout
        };

        // Handle body for non-GET methods
        const upperMethod = fetchOptions.method;
        if (upperMethod !== 'GET' && upperMethod !== 'HEAD' && body) {
            fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
            if (!fetchOptions.headers['Content-Type'] && typeof body === 'object') {
                fetchOptions.headers['Content-Type'] = 'application/json';
            }
        }

        const response = await nodeFetch(url, fetchOptions);
        const endTime = Date.now();

        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        const contentType = response.headers.get('content-type');
        let responseData;
        
        try {
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        } catch (e) {
            responseData = await response.text();
        }

        res.json({
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
            body: responseData,
            time: endTime - startTime,
            size: responseData ? (typeof responseData === 'string' ? responseData.length : JSON.stringify(responseData).length) : 0
        });
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch from the target URL',
            message: error.message 
        });
    }
};

// Support both GET and POST for proxy
app.all('/api/proxy', handleProxy);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
