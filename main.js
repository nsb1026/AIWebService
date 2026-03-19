document.addEventListener('DOMContentLoaded', () => {
    // --- View Switching Logic ---
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.getAttribute('data-view');

            // Remove active from all top-nav links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active to top-nav link corresponding to the target view
            const topNavLink = document.querySelector(`.nav-link[data-view="${targetViewId}"]`);
            if (topNavLink) topNavLink.classList.add('active');

            views.forEach(v => {
                v.classList.toggle('active', v.id === targetViewId);
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- Encoder Logic ---
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
        'unicode-escape': (s) => {
            return s.split('').map(char => {
                const hex = char.charCodeAt(0).toString(16).padStart(4, '0');
                return `\\u${hex}`;
            }).join('');
        },
        'base64-encode': (s) => {
            try { return btoa(unescape(encodeURIComponent(s))); }
            catch (e) { return 'Error'; }
        },
        'binary-string': (s) => {
            return s.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        },
        'hex-encode': (s) => {
            return Array.from(s).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
        },
        'rot13': (s) => {
            return s.replace(/[a-zA-Z]/g, (c) => {
                return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
            });
        },
        'atbash': (s) => {
            return s.replace(/[a-zA-Z]/g, (c) => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(155 - code);
                if (code >= 97 && code <= 122) return String.fromCharCode(219 - code);
                return c;
            });
        },
        'camel-case': (s) => {
            return s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        },
        'snake-case': (s) => {
            const matches = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
            return matches ? matches.map(x => x.toLowerCase()).join('_') : s.toLowerCase();
        }
    };

    const updateEncoder = () => {
        const val = mainInput.value;
        stats.chars.textContent = val.length;
        stats.words.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        stats.lines.textContent = val ? val.split(/\r\n|\r|\n/).length : 0;

        Object.entries(encoderOutputs).forEach(([id, func]) => {
            const el = document.getElementById(id);
            if (el) el.value = val ? func(val) : '';
        });
    };

    mainInput.addEventListener('input', updateEncoder);
    document.getElementById('btn-encoder-clear').addEventListener('click', () => {
        mainInput.value = '';
        updateEncoder();
    });

    // --- JSON Parser Logic ---
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');

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

    const validateJSON = () => {
        const raw = jsonInput.value.trim();
        if (!raw) {
            jsonStatus.textContent = '';
            jsonStatus.className = 'json-status';
            return;
        }
        try {
            JSON.parse(raw);
            jsonStatus.textContent = '✓ Valid JSON';
            jsonStatus.className = 'json-status valid';
        } catch (e) {
            jsonStatus.textContent = '✗ ' + e.message;
            jsonStatus.className = 'json-status invalid';
        }
    };

    const handleJSON = (action) => {
        try {
            const raw = jsonInput.value.trim();
            if (!raw) return;
            let obj = JSON.parse(raw);
            if (action === 'prettify') jsonOutput.value = JSON.stringify(obj, null, 2);
            else if (action === 'sort') jsonOutput.value = JSON.stringify(sortJSON(obj), null, 2);
            else if (action === 'minify') jsonOutput.value = JSON.stringify(obj);
            validateJSON();
        } catch (e) {
            jsonOutput.value = 'Error: Invalid JSON\n-------------------\n' + e.message;
            validateJSON();
        }
    };

    jsonInput.addEventListener('input', validateJSON);
    document.getElementById('btn-json-prettify').addEventListener('click', () => handleJSON('prettify'));
    document.getElementById('btn-json-sort').addEventListener('click', () => handleJSON('sort'));
    document.getElementById('btn-json-minify').addEventListener('click', () => handleJSON('minify'));
    document.getElementById('btn-json-apply').addEventListener('click', () => {
        if (jsonOutput.value && !jsonOutput.value.startsWith('Error:')) {
            jsonInput.value = jsonOutput.value;
            validateJSON();
        }
    });
    document.getElementById('btn-json-clear').addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.value = '';
        validateJSON();
    });

    // --- HTML Formatter Logic ---
    const htmlInput = document.getElementById('html-input');
    const htmlOutput = document.getElementById('html-output');
    const htmlStatus = document.getElementById('html-status');

    const formatHTML = (html) => {
        let formatted = '';
        let indent = '';
        const tab = '    ';
        html.split(/>\s*</).forEach(function(element) {
            if (element.match(/^\/\w/)) indent = indent.substring(tab.length);
            formatted += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.match(/^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i)) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    };

    const handleHTML = (action) => {
        const raw = htmlInput.value.trim();
        if (!raw) return;
        if (action === 'prettify') {
            htmlOutput.value = formatHTML(raw);
        } else if (action === 'minify') {
            htmlOutput.value = raw.replace(/\s+/g, ' ').replace(/>\s+</g, '><');
        }
    };

    document.getElementById('btn-html-prettify').addEventListener('click', () => handleHTML('prettify'));
    document.getElementById('btn-html-minify').addEventListener('click', () => handleHTML('minify'));
    document.getElementById('btn-html-apply').addEventListener('click', () => {
        if (htmlOutput.value) htmlInput.value = htmlOutput.value;
    });
    document.getElementById('btn-html-clear').addEventListener('click', () => {
        htmlInput.value = '';
        htmlOutput.value = '';
    });

    // --- Diff Checker Logic ---
    const diffInputOriginal = document.getElementById('diff-input-original');
    const diffInputModified = document.getElementById('diff-input-modified');
    const diffOutput = document.getElementById('diff-output');
    const diffOutputRaw = document.getElementById('diff-output-raw');

    const computeDiff = () => {
        const original = diffInputOriginal.value.split('\n');
        const modified = diffInputModified.value.split('\n');
        
        if (!diffInputOriginal.value && !diffInputModified.value) {
            diffOutput.innerHTML = '<p class="placeholder-text">Enter text in both boxes above to see the difference.</p>';
            diffOutputRaw.value = '';
            return;
        }

        let resultHTML = '';
        let resultRaw = '';
        const maxLines = Math.max(original.length, modified.length);

        for (let i = 0; i < maxLines; i++) {
            const lineOrig = original[i] || '';
            const lineMod = modified[i] || '';

            if (lineOrig === lineMod) {
                resultHTML += `<div>${lineOrig || '&nbsp;'}</div>`;
                resultRaw += lineOrig + '\n';
            } else {
                if (i < original.length) {
                    resultHTML += `<div class="diff-removed">- ${lineOrig || '&nbsp;'}</div>`;
                    resultRaw += `- ${lineOrig}\n`;
                }
                if (i < modified.length) {
                    resultHTML += `<div class="diff-added">+ ${lineMod || '&nbsp;'}</div>`;
                    resultRaw += `+ ${lineMod}\n`;
                }
            }
        }

        diffOutput.innerHTML = resultHTML;
        diffOutputRaw.value = resultRaw;
    };

    diffInputOriginal.addEventListener('input', computeDiff);
    diffInputModified.addEventListener('input', computeDiff);
    document.getElementById('btn-diff-clear-original').addEventListener('click', () => { diffInputOriginal.value = ''; computeDiff(); });
    document.getElementById('btn-diff-clear-modified').addEventListener('click', () => { diffInputModified.value = ''; computeDiff(); });

    // --- Copy to Clipboard ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input && (input.value || input.innerText)) {
                const textToCopy = input.value || input.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    });

    // --- API Tester Logic ---
    const apiMethod = document.getElementById('api-method');
    const apiUrl = document.getElementById('api-url');
    const apiHeadersList = document.getElementById('api-headers-list');
    const btnAddHeader = document.getElementById('btn-add-header');
    const apiBody = document.getElementById('api-body');
    const btnSend = document.getElementById('btn-api-send');
    const apiResponseStatus = document.getElementById('api-response-status');
    const apiResponseBody = document.getElementById('api-response-body');
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

    // Tab Switching for API Tester
    document.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.api-tabs');
            const targetTab = button.getAttribute('data-tab');

            container.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
            container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Auth Type Switching
    apiAuthType.addEventListener('change', () => {
        document.querySelectorAll('.auth-fields').forEach(f => f.style.display = 'none');
        const selected = apiAuthType.value;
        if (selected !== 'none') {
            document.getElementById(`auth-${selected}-fields`).style.display = 'block';
        }
    });

    // Body Type Switching
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

    // Body Formatting
    document.getElementById('btn-api-body-prettify').addEventListener('click', () => {
        try {
            const obj = JSON.parse(apiBody.value);
            apiBody.value = JSON.stringify(obj, null, 2);
        } catch (e) { alert('Invalid JSON in body'); }
    });

    document.getElementById('btn-api-body-sort').addEventListener('click', () => {
        try {
            const obj = JSON.parse(apiBody.value);
            apiBody.value = JSON.stringify(sortJSON(obj), null, 2);
        } catch (e) { alert('Invalid JSON in body'); }
    });

    // History Logic
    let requestHistory = JSON.parse(localStorage.getItem('api_history') || '[]');

    const updateHistoryUI = () => {
        if (requestHistory.length === 0) {
            apiHistoryList.innerHTML = '<p class="placeholder-text">No request history yet.</p>';
            return;
        }
        apiHistoryList.innerHTML = '';
        requestHistory.slice().reverse().forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'history-item';
            el.innerHTML = `
                <div class="history-main">
                    <span class="history-method">${item.method}</span>
                    <span class="history-url">${item.url}</span>
                    <div class="history-meta">
                        <span>${item.status} ${item.statusText}</span>
                        <span>${item.time}ms</span>
                    </div>
                </div>
            `;
            el.addEventListener('click', () => {
                apiUrl.value = item.url;
                apiMethod.value = item.method;
                // Basic fill back - could be improved
                try {
                    const urlObj = new URL(item.url.startsWith('http') ? item.url : 'http://' + item.url);
                    syncUrlToParamsUI(urlObj.searchParams);
                } catch(e) {}
                
                // Switch back to Params or Headers
                document.querySelector('.tab-link[data-tab="api-params-tab"]').click();
            });
            apiHistoryList.appendChild(el);
        });
    };

    const addToHistory = (item) => {
        requestHistory.push(item);
        if (requestHistory.length > 50) requestHistory.shift();
        localStorage.setItem('api_history', JSON.stringify(requestHistory));
        updateHistoryUI();
    };

    document.getElementById('btn-clear-history').addEventListener('click', () => {
        requestHistory = [];
        localStorage.removeItem('api_history');
        updateHistoryUI();
    });

    // Param Management
    const createParamRow = (key = '', val = '') => {
        const row = document.createElement('div');
        row.className = 'param-row';
        row.innerHTML = `
            <input type="text" placeholder="Key" class="param-key" value="${key}">
            <input type="text" placeholder="Value" class="param-value" value="${val}">
            <button class="btn-remove-param" title="Remove">&times;</button>
        `;
        row.querySelectorAll('input').forEach(input => input.addEventListener('input', syncParamsToUrl));
        row.querySelector('.btn-remove-param').addEventListener('click', () => {
            row.remove();
            syncParamsToUrl();
        });
        return row;
    };

    btnAddParam.addEventListener('click', () => {
        apiParamsList.appendChild(createParamRow());
    });

    const syncUrlToParamsUI = (urlParams) => {
        // Keep the add button if it was inside, but better to clear only rows
        apiParamsList.innerHTML = '';
        urlParams.forEach((v, k) => {
            apiParamsList.appendChild(createParamRow(k, v));
        });
        if (urlParams.size === 0) {
            apiParamsList.appendChild(createParamRow());
        }
    };

    // Sync URL -> Params
    apiUrl.addEventListener('input', () => {
        const val = apiUrl.value;
        if (val.includes('?')) {
            try {
                const urlObj = new URL(val.startsWith('http') ? val : 'http://' + val);
                syncUrlToParamsUI(urlObj.searchParams);
            } catch (e) {}
        }
    });

    function syncParamsToUrl() {
        let base = apiUrl.value.split('?')[0];
        const params = new URLSearchParams();
        document.querySelectorAll('.param-row').forEach(row => {
            const k = row.querySelector('.param-key').value.trim();
            const v = row.querySelector('.param-value').value.trim();
            if (k) params.append(k, v);
        });
        const qs = params.toString();
        apiUrl.value = qs ? `${base}?${qs}` : base;
    }

    // Header Management
    const createHeaderRow = () => {
        const row = document.createElement('div');
        row.className = 'header-row';
        row.innerHTML = `
            <input type="text" placeholder="Key" class="header-key">
            <input type="text" placeholder="Value" class="header-value">
            <button class="btn-remove-header" title="Remove">&times;</button>
        `;
        row.querySelector('.btn-remove-header').addEventListener('click', () => row.remove());
        return row;
    };

    btnAddHeader.addEventListener('click', () => {
        apiHeadersList.appendChild(createHeaderRow());
    });

    // Initial Remove Header listeners
    document.querySelectorAll('.btn-remove-header, .btn-remove-param').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('div');
            if (row) row.remove();
            if (btn.classList.contains('btn-remove-param')) syncParamsToUrl();
        });
    });

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const sendRequest = async () => {
        let url = apiUrl.value.trim();
        if (!url) {
            alert('Please enter a URL');
            return;
        }

        const method = apiMethod.value;
        const headers = {};
        
        // Manual Headers
        document.querySelectorAll('.header-row').forEach(row => {
            const key = row.querySelector('.header-key').value.trim();
            const val = row.querySelector('.header-value').value.trim();
            if (key) headers[key] = val;
        });

        // Authorization Headers
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
            if (user || pass) {
                headers['Authorization'] = 'Basic ' + btoa(unescape(encodeURIComponent(user + ':' + pass)));
            }
        }

        // Body Handling
        let body = null;
        const bodyType = apiBodyType.value;
        const hasBodyMethod = !['GET', 'HEAD'].includes(method);

        if (hasBodyMethod && bodyType !== 'none') {
            body = apiBody.value.trim();
            if (bodyType === 'json') {
                try { 
                    const parsedJson = JSON.parse(body);
                    body = JSON.stringify(parsedJson);
                    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
                } catch (e) { /* Send as raw if fail */ }
            } else if (bodyType === 'text') {
                if (!headers['Content-Type']) headers['Content-Type'] = 'text/plain';
            }
        }

        btnSend.disabled = true;
        apiResponseStatus.textContent = 'Sending...';
        apiResponseStatus.className = 'response-status-badge status-loading';
        apiResponseBody.value = '';
        apiResponseSize.textContent = '';
        apiResponseHeaders.innerHTML = '<p class="placeholder-text">Loading...</p>';

        try {
            const startTime = Date.now();
            let data;
            let finalStatus, finalStatusText, finalHeaders, finalBody, finalTime, finalSize;

            if (apiDirectCall.checked) {
                // --- DIRECT CALL (NO PROXY) ---
                console.log("Executing direct call to:", url);
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: hasBodyMethod ? body : undefined
                });
                
                finalStatus = response.status;
                finalStatusText = response.statusText;
                finalHeaders = {};
                response.headers.forEach((v, k) => finalHeaders[k] = v);
                
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    finalBody = await response.json();
                } else {
                    finalBody = await response.text();
                }
                finalTime = Date.now() - startTime;
                finalSize = finalBody ? (typeof finalBody === 'string' ? finalBody.length : JSON.stringify(finalBody).length) : 0;
            } else {
                // --- PROXY CALL ---
                let proxyBase = apiProxyUrlInput.value.trim();
                if (proxyBase && proxyBase.endsWith('/')) proxyBase = proxyBase.slice(0, -1);
                const proxyUrl = proxyBase ? `${proxyBase}/api/proxy` : '/api/proxy';

                if (window.location.protocol === 'https:' && proxyUrl.startsWith('http:')) {
                    throw new Error('Mixed Content: Cannot call an HTTP proxy from an HTTPS site. Please use an HTTPS proxy URL.');
                }

                let response;
                if (['GET', 'HEAD'].includes(method)) {
                    const params = new URLSearchParams({
                        url,
                        method,
                        headers: JSON.stringify(headers),
                        sslVerify: apiSSLVerify.checked
                    });
                    response = await fetch(`${proxyUrl}?${params.toString()}`);
                } else {
                    response = await fetch(proxyUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url, method, headers, body, sslVerify: apiSSLVerify.checked })
                    });
                }

                if (response.status === 405) {
                    throw new Error('405 Method Not Allowed: The proxy server rejected this request method. If using Cloudflare Pages, please specify an external Proxy Server URL in Settings.');
                }

                data = await response.json();
                if (data.error) throw new Error(data.message || data.error);

                finalStatus = data.status;
                finalStatusText = data.statusText;
                finalHeaders = data.headers;
                finalBody = data.body;
                finalTime = data.time || (Date.now() - startTime);
                finalSize = data.size || 0;
            }

            // --- UPDATE UI WITH RESULTS ---
            const statusClass = finalStatus >= 200 && finalStatus < 300 ? 'status-success' : 'status-error';
            apiResponseStatus.textContent = `${finalStatus} ${finalStatusText || ''} (${finalTime}ms)`;
            apiResponseStatus.className = `response-status-badge ${statusClass}`;
            apiResponseSize.textContent = formatSize(finalSize);

            if (typeof finalBody === 'object') {
                apiResponseBody.value = JSON.stringify(finalBody, null, 2);
            } else {
                apiResponseBody.value = finalBody;
            }

            apiResponseHeaders.innerHTML = '';
            Object.entries(finalHeaders).forEach(([key, val]) => {
                const nameSpan = document.createElement('span');
                nameSpan.className = 'header-name';
                nameSpan.textContent = key + ':';
                const valSpan = document.createElement('span');
                valSpan.className = 'header-val';
                valSpan.textContent = val;
                apiResponseHeaders.appendChild(nameSpan);
                apiResponseHeaders.appendChild(valSpan);
            });

            addToHistory({ url, method, status: finalStatus, statusText: finalStatusText, time: finalTime, timestamp: Date.now() });

        } catch (error) {
            console.error("Request Error:", error);
            apiResponseStatus.textContent = 'Error';
            apiResponseStatus.className = 'response-status-badge status-error';
            apiResponseBody.value = `Failed to execute request:\n${error.message}\n\nPossible reasons:\n1. CORS restrictions on the target API (Try using a Proxy).\n2. Proxy server is not reachable or doesn't support the method.\n3. Mixed Content (HTTPS calling HTTP).`;
            apiResponseHeaders.innerHTML = '<p class="placeholder-text">No headers received.</p>';
        } finally {
            btnSend.disabled = false;
        }
    };

    btnSend.addEventListener('click', sendRequest);
    updateHistoryUI();

    // Initial runs
    updateEncoder();
});
