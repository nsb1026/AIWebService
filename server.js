const express = require('express');
const path = require('path');
const https = require('https');
const nodeFetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.argv[2] || 3000;

// Detailed CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Common proxy handler logic
const handleProxy = async (req, res) => {
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
        console.log(`Proxying ${method} request to: ${url}`);
        
        const startTime = Date.now();
        const agent = new https.Agent({
            rejectUnauthorized: String(sslVerify) !== 'false'
        });

        let parsedHeaders = headers;
        if (typeof headers === 'string') {
            try { parsedHeaders = JSON.parse(headers); } catch (e) { parsedHeaders = {}; }
        }

        const fetchOptions = {
            method: (method || 'GET').toUpperCase(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
                ...parsedHeaders
            },
            agent: url.startsWith('https') ? agent : undefined,
            timeout: 30000,
            redirect: 'follow' // Automatically follow redirects like google.com -> www.google.com
        };

        if (fetchOptions.method !== 'GET' && fetchOptions.method !== 'HEAD' && body) {
            fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
            if (!fetchOptions.headers['Content-Type'] && typeof body === 'object') {
                fetchOptions.headers['Content-Type'] = 'application/json';
            }
        }

        const response = await nodeFetch(url, fetchOptions);
        const endTime = Date.now();

        // ---------------------------------------------------------
        // IMPORTANT: Strip security headers that block iframes (Preview mode)
        // ---------------------------------------------------------
        const responseHeaders = {};
        const forbiddenHeaders = [
            'x-frame-options', 
            'content-security-policy', 
            'set-cookie', 
            'strict-transport-security',
            'x-content-type-options'
        ];

        response.headers.forEach((value, key) => {
            if (!forbiddenHeaders.includes(key.toLowerCase())) {
                responseHeaders[key] = value;
            }
        });

        const contentType = response.headers.get('content-type') || '';
        let responseData;
        
        if (contentType.includes('application/json')) {
            try { responseData = await response.json(); } catch (e) { responseData = await response.text(); }
        } else {
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

app.all('/api/proxy', handleProxy);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
