const express = require('express');
const path = require('path');
const app = express();
const PORT = process.argv[2] || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Proxy endpoint to bypass CORS
app.post('/api/proxy', async (req, res) => {
    const { url, method, headers, body } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Proxying ${method} request to: ${url}`);
        
        const startTime = Date.now();
        const response = await fetch(url, {
            method: method || 'GET',
            headers: headers || {},
            body: (method !== 'GET' && method !== 'HEAD' && body) ? (typeof body === 'object' ? JSON.stringify(body) : body) : undefined
        });
        const endTime = Date.now();

        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        const contentType = response.headers.get('content-type');
        let responseData;
        
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        res.json({
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
            body: responseData,
            time: endTime - startTime
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
