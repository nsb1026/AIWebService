document.addEventListener('DOMContentLoaded', () => {
    // --- View Switching Logic ---
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.getAttribute('data-view');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const topNavLink = document.querySelector(`.nav-link[data-view="${targetViewId}"]`);
            if (topNavLink) topNavLink.classList.add('active');
            views.forEach(v => v.classList.toggle('active', v.id === targetViewId));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- Encoder Logic (Simplified for brevity) ---
    const mainInput = document.getElementById('main-input');
    const stats = {
        chars: document.getElementById('stat-chars'),
        words: document.getElementById('stat-words'),
        lines: document.getElementById('stat-lines')
    };

    const encoderOutputs = {
        'url-encode': (s) => encodeURIComponent(s),
        'html-escape': (s) => {
            const div = document.createElement('div');
            div.textContent = s;
            return div.innerHTML;
        },
        'unicode-escape': (s) => s.split('').map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`).join(''),
        'base64-encode': (s) => { try { return btoa(unescape(encodeURIComponent(s))); } catch (e) { return 'Error'; } },
        'binary-string': (s) => s.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
        'hex-encode': (s) => Array.from(s).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '),
        'rot13': (s) => s.replace(/[a-zA-Z]/g, (c) => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
        'atbash': (s) => s.replace(/[a-zA-Z]/g, (c) => {
            const code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(155 - code);
            if (code >= 97 && code <= 122) return String.fromCharCode(219 - code);
            return c;
        }),
        'camel-case': (s) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
        'snake-case': (s) => {
            const matches = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
            return matches ? matches.map(x => x.toLowerCase()).join('_') : s.toLowerCase();
        }
    };

    const updateEncoder = () => {
        const val = mainInput.value;
        if (stats.chars) stats.chars.textContent = val.length;
        if (stats.words) stats.words.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        if (stats.lines) stats.lines.textContent = val ? val.split(/\r\n|\r|\n/).length : 0;
        Object.entries(encoderOutputs).forEach(([id, func]) => {
            const el = document.getElementById(id);
            if (el) el.value = val ? func(val) : '';
        });
    };

    if (mainInput) {
        mainInput.addEventListener('input', updateEncoder);
        document.getElementById('btn-encoder-clear').addEventListener('click', () => { mainInput.value = ''; updateEncoder(); });
    }

    // --- REST API Tester Logic ---
    const apiMethod = document.getElementById('api-method');
    const apiUrl = document.getElementById('api-url');
    const apiHeadersList = document.getElementById('api-headers-list');
    const btnAddHeader = document.getElementById('btn-add-header');
    const apiBody = document.getElementById('api-body');
    const btnSend = document.getElementById('btn-api-send');
    const apiResponseStatus = document.getElementById('api-response-status');
    const apiResponseHeaders = document.getElementById('api-response-headers');
    const apiAuthType = document.getElementById('api-auth-type');
    const apiParamsList = document.getElementById('api-params-list');
    const btnAddParam = document.getElementById('btn-add-param');
    const apiBodyType = document.getElementById('api-body-type');
    const jsonBodyActions = document.getElementById('json-body-actions');
    const bodyNoneMsg = document.getElementById('body-none-msg');
    const apiSSLVerify = document.getElementById('api-ssl-verify');
    const apiDirectCall = document.getElementById('api-direct-call');
    const apiHistoryList = document.getElementById('api-history-list');
    const apiResponseSize = document.getElementById('api-response-size');
    const apiProxyUrlInput = document.getElementById('api-proxy-url');

    // Helper: Sort JSON keys
    const sortJSON = (o) => {
        if (Array.isArray(o)) return o.map(sortJSON);
        if (o !== null && typeof o === 'object') {
            return Object.keys(o).sort().reduce((acc, key) => {
                acc[key] = sortJSON(o[key]);
                return acc;
            }, {});
        }
        return o;
    };

    // Tab Switching for API Tester (Request & Response)
    document.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.api-tabs');
            const targetTab = button.getAttribute('data-tab');
            container.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
            container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Auth Type Switching
    if (apiAuthType) {
        apiAuthType.addEventListener('change', () => {
            document.querySelectorAll('.auth-fields').forEach(f => f.style.display = 'none');
            const selected = apiAuthType.value;
            if (selected !== 'none') {
                const fields = document.getElementById(`auth-${selected}-fields`);
                if (fields) fields.style.display = 'block';
            }
        });
    }

    // Body Type Switching
    if (apiBodyType) {
        apiBodyType.addEventListener('change', () => {
            const type = apiBodyType.value;
            if (type === 'none') {
                apiBody.style.display = 'none';
                bodyNoneMsg.style.display = 'block';
                jsonBodyActions.style.display = 'none';
            } else {
                apiBody.style.display = 'block';
                bodyNoneMsg.style.display = 'none';
                jsonBodyActions.style.display = type === 'json' ? 'flex' : 'none';
                apiBody.placeholder = type === 'json' ? '{"key": "value"}' : 'Plain text...';
            }
        });
    }

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const sendRequest = async () => {
        let url = apiUrl.value.trim();
        if (!url) { alert('Please enter a URL'); return; }
        if (!url.startsWith('http')) url = 'https://' + url;

        const method = apiMethod.value;
        const headers = {};
        
        // Collect Headers
        document.querySelectorAll('.header-row').forEach(row => {
            const key = row.querySelector('.header-key').value.trim();
            const val = row.querySelector('.header-value').value.trim();
            if (key) headers[key] = val;
        });

        // Collect Auth
        const authType = apiAuthType.value;
        if (authType === 'apikey') {
            const key = document.getElementById('api-key-name').value.trim();
            const val = document.getElementById('api-key-value').value.trim();
            if (key && val) headers[key] = val;
        } else if (authType === 'bearer') {
            const token = document.getElementById('api-bearer-token').value.trim();
            if (token) headers['Authorization'] = `Bearer ${token}`;
        } else if (authType === 'basic') {
            const user = document.getElementById('api-basic-user').value.trim();
            const pass = document.getElementById('api-basic-pass').value.trim();
            if (user || pass) headers['Authorization'] = 'Basic ' + btoa(user + ':' + pass);
        }

        let body = null;
        const bodyType = apiBodyType.value;
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && bodyType !== 'none') {
            body = apiBody.value.trim();
            if (bodyType === 'json') {
                try { body = JSON.stringify(JSON.parse(body)); if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'; } catch (e) {}
            }
        }

        btnSend.disabled = true;
        apiResponseStatus.textContent = 'Sending...';
        apiResponseStatus.className = 'response-status-badge status-loading';
        
        try {
            const startTime = Date.now();
            let finalStatus, finalStatusText, finalHeaders, finalBody, finalTime, finalSize;

            if (apiDirectCall.checked) {
                const response = await fetch(url, { method, headers, body: body || undefined });
                finalStatus = response.status;
                finalStatusText = response.statusText;
                finalHeaders = {};
                response.headers.forEach((v, k) => finalHeaders[k] = v);
                finalBody = await response.text();
                finalTime = Date.now() - startTime;
                finalSize = finalBody.length;
            } else {
                let proxyBase = apiProxyUrlInput.value.trim();
                if (proxyBase && proxyBase.endsWith('/')) proxyBase = proxyBase.slice(0, -1);
                const proxyUrl = proxyBase ? `${proxyBase}/api/proxy` : '/api/proxy';

                const response = await fetch(proxyUrl, {
                    method: method === 'GET' ? 'GET' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: method === 'GET' ? undefined : JSON.stringify({ url, method, headers, body, sslVerify: apiSSLVerify.checked }),
                    // For GET, we pass query params
                    ...(method === 'GET' && {
                        method: 'GET',
                        body: undefined,
                        url: `${proxyUrl}?url=${encodeURIComponent(url)}&method=GET&headers=${encodeURIComponent(JSON.stringify(headers))}&sslVerify=${apiSSLVerify.checked}`
                    })
                });
                
                // Fix for GET proxy URL
                let targetProxyUrl = proxyUrl;
                if (method === 'GET') {
                    const params = new URLSearchParams({ url, method: 'GET', headers: JSON.stringify(headers), sslVerify: apiSSLVerify.checked });
                    targetProxyUrl = `${proxyUrl}?${params.toString()}`;
                }

                const finalRes = (method === 'GET') ? await fetch(targetProxyUrl) : response;
                const data = await finalRes.json();
                if (data.error) throw new Error(data.message || data.error);

                finalStatus = data.status;
                finalStatusText = data.statusText;
                finalHeaders = data.headers;
                finalBody = data.body;
                finalTime = data.time || (Date.now() - startTime);
                finalSize = data.size || 0;
            }

            // Update UI
            const statusClass = finalStatus >= 200 && finalStatus < 300 ? 'status-success' : 'status-error';
            apiResponseStatus.textContent = `${finalStatus} ${finalStatusText || ''} (${finalTime}ms)`;
            apiResponseStatus.className = `response-status-badge ${statusClass}`;
            apiResponseSize.textContent = formatSize(finalSize);

            const rawBodyText = typeof finalBody === 'object' ? JSON.stringify(finalBody, null, 2) : finalBody;
            document.getElementById('api-response-raw').value = rawBodyText;
            
            const prettyArea = document.getElementById('api-response-pretty');
            const contentType = (finalHeaders['content-type'] || '').toLowerCase();
            
            if (contentType.includes('application/json')) {
                try { prettyArea.value = JSON.stringify(typeof finalBody === 'string' ? JSON.parse(finalBody) : finalBody, null, 2); } catch(e) { prettyArea.value = rawBodyText; }
            } else {
                prettyArea.value = rawBodyText;
            }

            const previewIframe = document.getElementById('api-response-preview');
            if (contentType.includes('text/html') || rawBodyText.trim().startsWith('<')) {
                const blob = new Blob([rawBodyText], { type: 'text/html' });
                previewIframe.src = URL.createObjectURL(blob);
                document.querySelector('.tab-link[data-tab="api-res-preview-tab"]').click();
            } else {
                previewIframe.srcdoc = `<body style="font-family:sans-serif;color:#666;padding:20px;"><h3>No Preview</h3><p>Content-Type: ${contentType}</p></body>`;
                document.querySelector('.tab-link[data-tab="api-res-pretty-tab"]').click();
            }

            apiResponseHeaders.innerHTML = '';
            Object.entries(finalHeaders).forEach(([k, v]) => {
                apiResponseHeaders.innerHTML += `<span class="header-name">${k}:</span><span class="header-val">${v}</span>`;
            });

        } catch (error) {
            apiResponseStatus.textContent = 'Error';
            apiResponseStatus.className = 'response-status-badge status-error';
            document.getElementById('api-response-raw').value = `Error: ${error.message}`;
        } finally {
            btnSend.disabled = false;
        }
    };

    if (btnSend) btnSend.addEventListener('click', sendRequest);
    updateEncoder();
});
