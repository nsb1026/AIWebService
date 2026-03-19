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
    document.querySelectorAll('.btn-remove-header').forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('.header-row').remove());
    });

    const sendRequest = async () => {
        const url = apiUrl.value.trim();
        if (!url) {
            alert('Please enter a URL');
            return;
        }

        const method = apiMethod.value;
        const headers = {};
        document.querySelectorAll('.header-row').forEach(row => {
            const key = row.querySelector('.header-key').value.trim();
            const val = row.querySelector('.header-value').value.trim();
            if (key) headers[key] = val;
        });

        let body = apiBody.value.trim();
        if (body) {
            try { body = JSON.parse(body); } catch (e) { /* Keep as string if not JSON */ }
        }

        btnSend.disabled = true;
        apiResponseStatus.textContent = 'Sending...';
        apiResponseStatus.className = 'response-status-badge status-loading';
        apiResponseBody.value = '';
        apiResponseHeaders.innerHTML = '<p class="placeholder-text">Loading...</p>';

        try {
            const startTime = Date.now();
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, method, headers, body })
            });
            const data = await response.json();
            const endTime = Date.now();

            if (data.error) throw new Error(data.message || data.error);

            // Update Status Badge
            const statusClass = data.status >= 200 && data.status < 300 ? 'status-success' : 'status-error';
            apiResponseStatus.textContent = `${data.status} ${data.statusText || ''} (${data.time || (endTime - startTime)}ms)`;
            apiResponseStatus.className = `response-status-badge ${statusClass}`;

            // Update Body
            if (typeof data.body === 'object') {
                apiResponseBody.value = JSON.stringify(data.body, null, 2);
            } else {
                apiResponseBody.value = data.body;
            }

            // Update Headers
            apiResponseHeaders.innerHTML = '';
            Object.entries(data.headers).forEach(([key, val]) => {
                const nameSpan = document.createElement('span');
                nameSpan.className = 'header-name';
                nameSpan.textContent = key + ':';
                
                const valSpan = document.createElement('span');
                valSpan.className = 'header-val';
                valSpan.textContent = val;

                apiResponseHeaders.appendChild(nameSpan);
                apiResponseHeaders.appendChild(valSpan);
            });

        } catch (error) {
            apiResponseStatus.textContent = 'Error';
            apiResponseStatus.className = 'response-status-badge status-error';
            apiResponseBody.value = `Failed to execute request:\n${error.message}`;
            apiResponseHeaders.innerHTML = '<p class="placeholder-text">No headers received.</p>';
        } finally {
            btnSend.disabled = false;
        }
    };

    btnSend.addEventListener('click', sendRequest);

    // Initial runs
    updateEncoder();
});
