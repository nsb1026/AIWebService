const express = require('express');
const path = require('path');
const https = require('https');
const nodeFetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.argv[2] || 3000;

app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

const handleProxy = async (req, res) => {
    // GET은 query에서, POST는 body에서 파라미터를 가져옴
    const params = req.method === 'GET' ? req.query : req.body;
    const { url, method = 'GET', headers = {}, body, sslVerify = true } = params;

    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        console.log(`[Proxy] ${req.method} -> ${method} ${url}`);
        
        const agent = new https.Agent({ rejectUnauthorized: String(sslVerify) !== 'false' });
        let parsedHeaders = typeof headers === 'string' ? JSON.parse(headers) : headers;

        const fetchOptions = {
            method: method.toUpperCase(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                ...parsedHeaders
            },
            agent: url.startsWith('https') ? agent : undefined,
            timeout: 30000,
            redirect: 'follow'
        };

        if (!['GET', 'HEAD'].includes(fetchOptions.method) && body) {
            fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
        }

        const response = await nodeFetch(url, fetchOptions);
        
        // 보안 헤더 및 불필요한 헤더 제거
        const resHeaders = {};
        const skipHeaders = ['x-frame-options', 'content-security-policy', 'set-cookie', 'content-encoding', 'transfer-encoding'];
        response.headers.forEach((v, k) => {
            if (!skipHeaders.includes(k.toLowerCase())) resHeaders[k] = v;
        });

        // 응답 본문 처리 (텍스트 위주로 안전하게)
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
        res.status(500).json({ error: 'Proxy Error', message: error.message });
    }
};

app.all('/api/proxy', handleProxy);
app.listen(PORT, '0.0.0.0', () => console.log(`Server running at http://0.0.0.0:${PORT}`));
