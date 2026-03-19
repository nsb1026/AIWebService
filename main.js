document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation & View Switching ---
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const views = document.querySelectorAll('.view');

    function switchView(viewId) {
        views.forEach(v => v.classList.toggle('active', v.id === viewId));
        navLinks.forEach(l => {
            if (l.getAttribute('data-view') === viewId) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            switchView(viewId);
        });
    });

    // --- Tab Switching Utility ---
    function setupTabs(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const tabLinks = container.querySelectorAll('.tab-link');
        const tabContents = container.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tabId = link.getAttribute('data-tab');
                tabLinks.forEach(l => l.classList.toggle('active', l === link));
                tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
            });
        });
    }

    setupTabs('.api-request-section');
    setupTabs('.api-response-section');

    // --- Common Utils ---
    const formatSize = (b) => {
        if (!b) return '0 B';
        const k = 1024, i = Math.floor(Math.log(b) / Math.log(k));
        return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
    };

    const copyToClipboard = async (text, btn) => {
        try {
            await navigator.clipboard.writeText(text);
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) {
                copyToClipboard(target.value || target.textContent, btn);
            }
        });
    });

    // --- Encoder / Decoder Logic ---
    const mainInput = document.getElementById('main-input');
    const stats = {
        chars: document.getElementById('stat-chars'),
        words: document.getElementById('stat-words'),
        lines: document.getElementById('stat-lines')
    };

    const outputs = {
        urlEncode: document.getElementById('url-encode'),
        htmlEscape: document.getElementById('html-escape'),
        unicodeEscape: document.getElementById('unicode-escape'),
        base64Encode: document.getElementById('base64-encode'),
        binaryString: document.getElementById('binary-string'),
        hexEncode: document.getElementById('hex-encode'),
        rot13: document.getElementById('rot13'),
        atbash: document.getElementById('atbash'),
        camelCase: document.getElementById('camel-case'),
        snakeCase: document.getElementById('snake-case')
    };

    function updateEncoder() {
        const val = mainInput.value;
        
        // Stats
        stats.chars.textContent = val.length;
        stats.words.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        stats.lines.textContent = val ? val.split('\n').length : 0;

        if (!val) {
            Object.values(outputs).forEach(out => out.value = '');
            return;
        }

        // Web Encodings
        outputs.urlEncode.value = encodeURIComponent(val);
        outputs.htmlEscape.value = val.replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
        outputs.unicodeEscape.value = val.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');

        // Data Representations
        try { outputs.base64Encode.value = btoa(unescape(encodeURIComponent(val))); } catch(e) { outputs.base64Encode.value = 'Error'; }
        outputs.binaryString.value = val.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        outputs.hexEncode.value = val.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');

        // Ciphers
        outputs.rot13.value = val.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
        outputs.atbash.value = val.replace(/[a-zA-Z]/g, c => {
            const low = c.toLowerCase();
            const res = String.fromCharCode(219 - low.charCodeAt(0));
            return c === low ? res : res.toUpperCase();
        });

        // Case
        const words = val.toLowerCase().split(/[^a-zA-Z0-9]+/).filter(Boolean);
        outputs.camelCase.value = words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('');
        outputs.snakeCase.value = words.join('_');
    }

    if (mainInput) {
        mainInput.addEventListener('input', updateEncoder);
        const encoderClearBtn = document.getElementById('btn-encoder-clear');
        if (encoderClearBtn) {
            encoderClearBtn.onclick = () => {
                mainInput.value = '';
                updateEncoder();
            };
        }
    }

    // --- JSON Parser Logic ---
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');

    function updateJsonStatus(valid, msg) {
        jsonStatus.textContent = valid ? 'Valid JSON' : msg;
        jsonStatus.className = 'json-status ' + (valid ? 'valid' : 'invalid');
    }

    document.getElementById('btn-json-prettify')?.addEventListener('click', () => {
        try {
            const parsed = JSON.parse(jsonInput.value);
            jsonOutput.value = JSON.stringify(parsed, null, 2);
            updateJsonStatus(true);
        } catch (e) {
            updateJsonStatus(false, e.message);
        }
    });

    document.getElementById('btn-json-sort')?.addEventListener('click', () => {
        try {
            const sortObj = (obj) => {
                if (Array.isArray(obj)) return obj.map(sortObj);
                if (obj !== null && typeof obj === 'object') {
                    return Object.keys(obj).sort().reduce((acc, key) => {
                        acc[key] = sortObj(obj[key]);
                        return acc;
                    }, {});
                }
                return obj;
            };
            const parsed = JSON.parse(jsonInput.value);
            jsonOutput.value = JSON.stringify(sortObj(parsed), null, 2);
            updateJsonStatus(true);
        } catch (e) {
            updateJsonStatus(false, e.message);
        }
    });

    document.getElementById('btn-json-minify')?.addEventListener('click', () => {
        try {
            const parsed = JSON.parse(jsonInput.value);
            jsonOutput.value = JSON.stringify(parsed);
            updateJsonStatus(true);
        } catch (e) {
            updateJsonStatus(false, e.message);
        }
    });

    document.getElementById('btn-json-apply')?.addEventListener('click', () => {
        if (jsonOutput.value) jsonInput.value = jsonOutput.value;
    });

    document.getElementById('btn-json-clear')?.addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.value = '';
        jsonStatus.textContent = '';
        jsonStatus.className = 'json-status';
    });

    // --- HTML Formatter Logic ---
    const htmlInput = document.getElementById('html-input');
    const htmlOutput = document.getElementById('html-output');

    document.getElementById('btn-html-prettify')?.addEventListener('click', () => {
        let html = htmlInput.value;
        let tab = '  ';
        let result = '';
        let indent = '';

        html.split(/>\s*</).forEach(element => {
            if (element.match(/^\/\w/)) indent = indent.substring(tab.length);
            result += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br') && !element.startsWith('hr')) {
                indent += tab;
            }
        });
        htmlOutput.value = result.substring(1, result.length - 3);
    });

    document.getElementById('btn-html-minify')?.addEventListener('click', () => {
        htmlOutput.value = htmlInput.value.replace(/>\s+</g, '><').trim();
    });

    document.getElementById('btn-html-apply')?.addEventListener('click', () => {
        if (htmlOutput.value) htmlInput.value = htmlOutput.value;
    });

    document.getElementById('btn-html-clear')?.addEventListener('click', () => {
        htmlInput.value = '';
        htmlOutput.value = '';
    });

    // --- Diff Checker Logic ---
    const diffOriginal = document.getElementById('diff-input-original');
    const diffModified = document.getElementById('diff-input-modified');
    const diffOutput = document.getElementById('diff-output');
    const diffRaw = document.getElementById('diff-output-raw');

    function updateDiff() {
        if (!diffOriginal || !diffModified) return;
        const one = diffOriginal.value.split('\n');
        const two = diffModified.value.split('\n');
        let html = '';
        let raw = '';

        const max = Math.max(one.length, two.length);
        for (let i = 0; i < max; i++) {
            if (one[i] === two[i]) {
                html += `<div>${one[i] || ''}</div>`;
                raw += (one[i] || '') + '\n';
            } else {
                if (one[i] !== undefined) {
                    html += `<div class="diff-removed">- ${one[i]}</div>`;
                    raw += `- ${one[i]}\n`;
                }
                if (two[i] !== undefined) {
                    html += `<div class="diff-added">+ ${two[i]}</div>`;
                    raw += `+ ${two[i]}\n`;
                }
            }
        }
        diffOutput.innerHTML = html || '<p class="placeholder-text">Differences will appear here...</p>';
        diffRaw.value = raw;
    }

    diffOriginal?.addEventListener('input', updateDiff);
    diffModified?.addEventListener('input', updateDiff);
    document.getElementById('btn-diff-clear-original')?.addEventListener('click', () => { diffOriginal.value = ''; updateDiff(); });
    document.getElementById('btn-diff-clear-modified')?.addEventListener('click', () => { diffModified.value = ''; updateDiff(); });

    // --- REST API Tester Logic ---
    const apiUrlInput = document.getElementById('api-url');
    const apiMethodSelect = document.getElementById('api-method');
    const apiParamsList = document.getElementById('api-params-list');
    const apiHeadersList = document.getElementById('api-headers-list');
    const apiAuthType = document.getElementById('api-auth-type');
    const apiBodyType = document.getElementById('api-body-type');
    const apiBodyTextarea = document.getElementById('api-body');
    const btnSend = document.getElementById('btn-api-send');
    const historyList = document.getElementById('api-history-list');

    // UI Toggles
    apiAuthType?.addEventListener('change', () => {
        document.querySelectorAll('.auth-fields').forEach(f => f.style.display = 'none');
        const selected = apiAuthType.value;
        if (selected !== 'none') {
            const fields = document.getElementById(`auth-${selected}-fields`);
            if (fields) fields.style.display = 'block';
        }
    });

    apiBodyType?.addEventListener('change', () => {
        const val = apiBodyType.value;
        if (apiBodyTextarea) apiBodyTextarea.style.display = (val === 'none' ? 'none' : 'block');
        const noneMsg = document.getElementById('body-none-msg');
        if (noneMsg) noneMsg.style.display = (val === 'none' ? 'block' : 'none');
        const actions = document.getElementById('json-body-actions');
        if (actions) actions.style.display = (val === 'json' ? 'flex' : 'none');
    });

    // Params & Headers Management
    function createRow(type) {
        const row = document.createElement('div');
        row.className = type === 'param' ? 'param-row' : 'header-row';
        row.innerHTML = `
            <input type="text" placeholder="Key" class="${type}-key">
            <input type="text" placeholder="Value" class="${type}-value">
            <button class="btn-remove-${type}" title="Remove">&times;</button>
        `;
        const removeBtn = row.querySelector(`.btn-remove-${type}`);
        removeBtn.onclick = (e) => {
            e.preventDefault();
            row.remove();
            if (type === 'param') updateUrlFromParams();
        };
        
        if (type === 'param') {
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', updateUrlFromParams);
            });
        }
        return row;
    }

    document.getElementById('btn-add-param')?.addEventListener('click', (e) => {
        e.preventDefault();
        apiParamsList.appendChild(createRow('param'));
    });

    document.getElementById('btn-add-header')?.addEventListener('click', (e) => {
        e.preventDefault();
        apiHeadersList.appendChild(createRow('header'));
    });

    // Initialize existing rows
    function initRows() {
        document.querySelectorAll('.param-row').forEach(row => {
            const removeBtn = row.querySelector('.btn-remove-param');
            if (removeBtn) removeBtn.onclick = () => { row.remove(); updateUrlFromParams(); };
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', updateUrlFromParams);
            });
        });
        document.querySelectorAll('.header-row').forEach(row => {
            const removeBtn = row.querySelector('.btn-remove-header');
            if (removeBtn) removeBtn.onclick = () => { row.remove(); };
        });
    }
    initRows();

    // URL <-> Params Sync
    let isUpdatingUrl = false;
    function updateUrlFromParams() {
        if (isUpdatingUrl) return;
        isUpdatingUrl = true;
        try {
            const urlStr = apiUrlInput.value.trim();
            if (!urlStr) { isUpdatingUrl = false; return; }
            
            let url;
            try {
                url = new URL(urlStr.startsWith('http') ? urlStr : 'http://' + urlStr);
            } catch(e) { isUpdatingUrl = false; return; }

            const params = new URLSearchParams();
            document.querySelectorAll('.param-row').forEach(row => {
                const k = row.querySelector('.param-key').value.trim();
                const v = row.querySelector('.param-value').value.trim();
                if (k) params.append(k, v);
            });

            const baseUrl = urlStr.split('?')[0];
            const qs = params.toString();
            apiUrlInput.value = baseUrl + (qs ? '?' + qs : '');
        } finally {
            isUpdatingUrl = false;
        }
    }

    apiUrlInput?.addEventListener('input', () => {
        if (isUpdatingUrl) return;
        isUpdatingUrl = true;
        try {
            const urlStr = apiUrlInput.value.trim();
            if (!urlStr.includes('?')) {
                // Don't clear if user is just typing the base URL
                isUpdatingUrl = false;
                return;
            }
            
            let url;
            try {
                url = new URL(urlStr.startsWith('http') ? urlStr : 'http://' + urlStr);
            } catch(e) { isUpdatingUrl = false; return; }

            apiParamsList.innerHTML = '';
            url.searchParams.forEach((v, k) => {
                const row = createRow('param');
                row.querySelector('.param-key').value = k;
                row.querySelector('.param-value').value = v;
                apiParamsList.appendChild(row);
            });
        } finally {
            isUpdatingUrl = false;
        }
    });

    // History Management
    let history = JSON.parse(localStorage.getItem('api_history') || '[]');
    function updateHistoryUI() {
        if (!historyList) return;
        if (history.length === 0) {
            historyList.innerHTML = '<p class="placeholder-text">No request history yet.</p>';
            return;
        }
        historyList.innerHTML = '';
        history.slice().reverse().forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-main">
                    <span class="history-method">${item.method}</span>
                    <span class="history-url">${item.url}</span>
                    <div class="history-meta">
                        <span>${new Date(item.timestamp).toLocaleTimeString()}</span>
                        <span class="status-${item.status < 300 ? 'success' : 'error'}">${item.status}</span>
                    </div>
                </div>
            `;
            div.onclick = () => loadHistoryItem(item);
            historyList.appendChild(div);
        });
    }

    function loadHistoryItem(item) {
        apiUrlInput.value = item.url;
        apiMethodSelect.value = item.method;
        
        // Load Headers
        apiHeadersList.innerHTML = '';
        Object.entries(item.headers || {}).forEach(([k, v]) => {
            const row = createRow('header');
            row.querySelector('.header-key').value = k;
            row.querySelector('.header-value').value = v;
            apiHeadersList.appendChild(row);
        });

        // Load Body
        if (item.body) {
            apiBodyType.value = 'json';
            apiBodyTextarea.value = item.body;
            apiBodyType.dispatchEvent(new Event('change'));
        } else {
            apiBodyType.value = 'none';
            apiBodyType.dispatchEvent(new Event('change'));
        }

        // Trigger URL input to sync params
        apiUrlInput.dispatchEvent(new Event('input'));
        switchView('api-view');
        const paramTab = document.querySelector('.tab-link[data-tab="api-params-tab"]');
        if (paramTab) paramTab.click();
    }

    document.getElementById('btn-clear-history')?.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('api_history');
        updateHistoryUI();
    });

    // Send Request Logic
    const sendRequest = async () => {
        let url = apiUrlInput.value.trim();
        if (!url) return alert('Please enter a target URL');

        // Normalize URL: ensure protocol
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
            apiUrlInput.value = url;
        }

        const method = apiMethodSelect.value;
        const headers = {};
        document.querySelectorAll('.header-row').forEach(row => {
            const k = row.querySelector('.header-key').value.trim();
            const v = row.querySelector('.header-value').value.trim();
            if (k) headers[k] = v;
        });

        // Auth
        const authType = apiAuthType.value;
        if (authType === 'bearer') {
            headers['Authorization'] = `Bearer ${document.getElementById('api-bearer-token').value}`;
        } else if (authType === 'apikey') {
            headers[document.getElementById('api-key-name').value] = document.getElementById('api-key-value').value;
        } else if (authType === 'basic') {
            headers['Authorization'] = 'Basic ' + btoa(document.getElementById('api-basic-user').value + ':' + document.getElementById('api-basic-pass').value);
        }

        let body = null;
        if (!['GET', 'HEAD'].includes(method)) {
            const type = apiBodyType.value;
            if (type !== 'none') {
                body = apiBodyTextarea.value;
                if (type === 'json') {
                    try { 
                        body = JSON.stringify(JSON.parse(body)); 
                        if(!headers['Content-Type']) headers['Content-Type'] = 'application/json';
                    } catch(e) {
                        return alert('Invalid JSON in body');
                    }
                }
            }
        }

        const apiResponseStatus = document.getElementById('api-response-status');
        const apiResponseSize = document.getElementById('api-response-size');
        const apiResponseHeaders = document.getElementById('api-response-headers');
        const apiResponsePretty = document.getElementById('api-response-pretty');
        const apiResponseRaw = document.getElementById('api-response-raw');
        const apiResponsePreview = document.getElementById('api-response-preview');

        btnSend.disabled = true;
        apiResponseStatus.textContent = 'Connecting...';
        apiResponseStatus.className = 'response-status-badge status-loading';

        try {
            const startTime = Date.now();
            let finalData;

            const isDirect = document.getElementById('api-direct-call').checked;
            const sslVerify = document.getElementById('api-ssl-verify').checked;
            const customProxy = document.getElementById('api-proxy-url').value.trim();

            if (isDirect) {
                const res = await fetch(url, { method, headers, body: body || undefined });
                const resText = await res.text();
                const resHeaders = {};
                res.headers.forEach((v, k) => resHeaders[k] = v);
                finalData = { 
                    status: res.status, 
                    statusText: res.statusText, 
                    headers: resHeaders, 
                    body: resText, 
                    size: resText.length, 
                    contentType: res.headers.get('content-type') 
                };
            } else {
                const proxyUrl = customProxy ? (customProxy.replace(/\/$/, '') + '/api/proxy') : '/api/proxy';
                const res = await fetch(proxyUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, method, headers, body, sslVerify })
                });
                
                if (!res.ok) {
                    const errorJson = await res.json();
                    throw new Error(errorJson.message || errorJson.error || 'Proxy Error');
                }
                finalData = await res.json();
            }

            const time = Date.now() - startTime;
            
            // UI Updates
            apiResponseStatus.textContent = `${finalData.status} ${finalData.statusText} (${time}ms)`;
            apiResponseStatus.className = `response-status-badge ${finalData.status < 300 ? 'status-success' : 'status-error'}`;
            apiResponseSize.textContent = formatSize(finalData.size);

            apiResponseRaw.value = finalData.body;
            
            const ct = (finalData.contentType || '').toLowerCase();
            if (ct.includes('json')) {
                try { apiResponsePretty.value = JSON.stringify(JSON.parse(finalData.body), null, 2); } catch(e) { apiResponsePretty.value = finalData.body; }
            } else {
                apiResponsePretty.value = finalData.body;
            }

            // Enhanced Preview with Base Tag
            if (ct.includes('html') || finalData.body.trim().startsWith('<')) {
                let html = finalData.body;
                const baseTag = `<base href="${url}" target="_blank">`;
                if (html.includes('<head>')) {
                    html = html.replace('<head>', `<head>${baseTag}`);
                } else if (html.includes('<html>')) {
                    html = html.replace('<html>', `<html><head>${baseTag}</head>`);
                } else {
                    html = `<head>${baseTag}</head>` + html;
                }
                const blob = new Blob([html], { type: 'text/html' });
                apiResponsePreview.src = URL.createObjectURL(blob);
            } else {
                apiResponsePreview.srcdoc = '<div style="padding:20px;font-family:sans-serif;color:#666;text-align:center;">No HTML Preview Available for this Content-Type</div>';
            }

            apiResponseHeaders.innerHTML = '';
            Object.entries(finalData.headers).forEach(([k, v]) => {
                apiResponseHeaders.innerHTML += `<span class="header-name">${k}:</span><span class="header-val">${v}</span>`;
            });

            // Add to History
            history.push({
                url, method, status: finalData.status, 
                timestamp: Date.now(), 
                headers: headers,
                body: body
            });
            if (history.length > 50) history.shift();
            localStorage.setItem('api_history', JSON.stringify(history));
            updateHistoryUI();

        } catch (err) {
            console.error('Request Error:', err);
            apiResponseStatus.textContent = 'Request Failed';
            apiResponseStatus.className = 'response-status-badge status-error';
            apiResponseRaw.value = `Error: ${err.message}`;
            apiResponsePretty.value = '';
            apiResponseHeaders.innerHTML = '<p class="placeholder-text">Error occurred. Check console for details.</p>';
        } finally {
            btnSend.disabled = false;
        }
    };

    if (btnSend) btnSend.addEventListener('click', sendRequest);
    updateHistoryUI();

    // Initial API UI state
    if (apiBodyType) apiBodyType.dispatchEvent(new Event('change'));
    if (apiAuthType) apiAuthType.dispatchEvent(new Event('change'));
});
