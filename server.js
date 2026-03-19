const express = require('express');
const path = require('path');
const https = require('https');
const nodeFetch = require('node-fetch');
const app = express();
const PORT = process.argv[2] || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Proxy endpoint to bypass CORS
app.post('/api/proxy', async (req, res) => {
    const { url, method, headers, body, sslVerify = true } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Proxying ${method} request to: ${url} (SSL Verify: ${sslVerify})`);
        
        const startTime = Date.now();
        
        const agent = new https.Agent({
            rejectUnauthorized: sslVerify
        });

        const fetchOptions = {
            method: method || 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                ...headers
            },
            agent: url.startsWith('https') ? agent : undefined,
            timeout: 30000 // 30 seconds timeout
        };

        if (method !== 'GET' && method !== 'HEAD' && body) {
            fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
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
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
