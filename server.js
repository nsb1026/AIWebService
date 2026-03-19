const express = require('express');
const path = require('path');
const https = require('https');
const nodeFetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.argv[2] || 3000;

// Enable CORS for all routes
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '.')));

const handleProxy = async (req, res) => {
    // Cloudflare compatibility: Always prefer body for proxy instructions to avoid URL length limits
    const params = req.method === 'POST' ? req.body : req.query;
    const { url, method = 'GET', headers = {}, body, sslVerify = true } = params;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`[Proxy] ${new Date().toISOString()} | ${method} ${url}`);
        
        const agent = new https.Agent({ 
            rejectUnauthorized: String(sslVerify) !== 'false',
            keepAlive: true
        });

        let parsedHeaders = typeof headers === 'string' ? JSON.parse(headers) : headers;

        // Remove dangerous or restricted headers from the incoming request headers
        const forbiddenHeaders = ['host', 'connection', 'content-length', 'expect', 'upgrade'];
        const cleanHeaders = {};
        Object.entries(parsedHeaders).forEach(([k, v]) => {
            if (!forbiddenHeaders.includes(k.toLowerCase())) {
                cleanHeaders[k] = v;
            }
        });

        const fetchOptions = {
            method: method.toUpperCase(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                ...cleanHeaders
            },
            agent: url.startsWith('https') ? agent : undefined,
            timeout: 30000,
            redirect: 'follow'
        };

        if (!['GET', 'HEAD'].includes(fetchOptions.method) && body) {
            fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
            if (!fetchOptions.headers['Content-Type'] && typeof body === 'object') {
                fetchOptions.headers['Content-Type'] = 'application/json';
            }
        }

        const response = await nodeFetch(url, fetchOptions);
        
        // Header filtering for response
        const resHeaders = {};
        const skipHeaders = [
            'x-frame-options', 
            'content-security-policy', 
            'set-cookie', 
            'content-encoding', 
            'transfer-encoding',
            'access-control-allow-origin',
            'access-control-allow-methods',
            'access-control-allow-headers'
        ];
        
        response.headers.forEach((v, k) => {
            if (!skipHeaders.includes(k.toLowerCase())) {
                resHeaders[k] = v;
            }
        });

        const responseText = await response.text();

        res.json({
            status: response.status,
            statusText: response.statusText,
            headers: resHeaders,
            body: responseText,
            size: responseText.length,
            contentType: response.headers.get('content-type')
        });
    } catch (error) {
        console.error('[Proxy Error]', error.message);
        res.status(500).json({ 
            error: 'Proxy Error', 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

app.post('/api/proxy', handleProxy);
// Keep GET for backward compatibility or simple tests, but warn in logs
app.get('/api/proxy', (req, res) => {
    console.warn('[Proxy Warning] GET used for proxy. Switching to POST is recommended for stability.');
    handleProxy(req, res);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================`);
    console.log(`Parse Utils Proxy Server`);
    console.log(`Running at http://0.0.0.0:${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'production'}`);
    console.log(`========================================`);
});
