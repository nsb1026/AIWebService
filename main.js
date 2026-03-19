document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.getAttribute('data-view') === viewId));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- Utils ---
    const formatSize = (b) => {
        if (!b) return '0 B';
        const k = 1024, i = Math.floor(Math.log(b) / Math.log(k));
        return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
    };

    // --- REST Tester ---
    const btnSend = document.getElementById('btn-api-send');
    const apiResponseStatus = document.getElementById('api-response-status');
    const apiResponseSize = document.getElementById('api-response-size');
    const apiResponseHeaders = document.getElementById('api-response-headers');
    const apiResponsePretty = document.getElementById('api-response-pretty');
    const apiResponseRaw = document.getElementById('api-response-raw');
    const apiResponsePreview = document.getElementById('api-response-preview');

    const sendRequest = async () => {
        const url = document.getElementById('api-url').value.trim();
        if (!url) return alert('Enter URL');

        const method = document.getElementById('api-method').value;
        const headers = {};
        document.querySelectorAll('.header-row').forEach(row => {
            const k = row.querySelector('.header-key').value.trim();
            const v = row.querySelector('.header-value').value.trim();
            if (k) headers[k] = v;
        });

        // Auth
        const authType = document.getElementById('api-auth-type').value;
        if (authType === 'bearer') headers['Authorization'] = `Bearer ${document.getElementById('api-bearer-token').value}`;
        else if (authType === 'apikey') headers[document.getElementById('api-key-name').value] = document.getElementById('api-key-value').value;
        else if (authType === 'basic') headers['Authorization'] = 'Basic ' + btoa(document.getElementById('api-basic-user').value + ':' + document.getElementById('api-basic-pass').value);

        let body = null;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const type = document.getElementById('api-body-type').value;
            if (type !== 'none') {
                body = document.getElementById('api-body').value;
                if (type === 'json') try { body = JSON.stringify(JSON.parse(body)); if(!headers['Content-Type']) headers['Content-Type'] = 'application/json'; } catch(e){}
            }
        }

        btnSend.disabled = true;
        apiResponseStatus.textContent = 'Sending...';
        apiResponseStatus.className = 'response-status-badge status-loading';

        try {
            const startTime = Date.now();
            let finalData;

            if (document.getElementById('api-direct-call').checked) {
                const res = await fetch(url, { method, headers, body: body || undefined });
                const resText = await res.text();
                const resHeaders = {};
                res.headers.forEach((v, k) => resHeaders[k] = v);
                finalData = { status: res.status, statusText: res.statusText, headers: resHeaders, body: resText, size: resText.length, contentType: res.headers.get('content-type') };
            } else {
                const proxyBase = document.getElementById('api-proxy-url').value.trim().replace(/\/$/, '') || '';
                const proxyUrl = `${proxyBase}/api/proxy`;
                
                let fetchUrl = proxyUrl;
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, method, headers, body, sslVerify: document.getElementById('api-ssl-verify').checked }) };

                if (method === 'GET') {
                    const qs = new URLSearchParams({ url, method: 'GET', headers: JSON.stringify(headers), sslVerify: document.getElementById('api-ssl-verify').checked });
                    fetchUrl = `${proxyUrl}?${qs.toString()}`;
                    options = { method: 'GET' };
                }

                const res = await fetch(fetchUrl, options);
                finalData = await res.json();
                if (finalData.error) throw new Error(finalData.message || finalData.error);
            }

            // --- Update UI ---
            const time = Date.now() - startTime;
            apiResponseStatus.textContent = `${finalData.status} ${finalData.statusText} (${time}ms)`;
            apiResponseStatus.className = `response-status-badge ${finalData.status < 300 ? 'status-success' : 'status-error'}`;
            apiResponseSize.textContent = formatSize(finalData.size);

            // Raw
            apiResponseRaw.value = finalData.body;

            // Pretty
            const ct = (finalData.contentType || '').toLowerCase();
            if (ct.includes('json')) {
                try { apiResponsePretty.value = JSON.stringify(JSON.parse(finalData.body), null, 2); } catch(e) { apiResponsePretty.value = finalData.body; }
            } else {
                apiResponsePretty.value = finalData.body;
            }

            // Preview
            if (ct.includes('html') || finalData.body.trim().startsWith('<')) {
                const blob = new Blob([finalData.body], { type: 'text/html' });
                apiResponsePreview.src = URL.createObjectURL(blob);
                document.querySelector('.tab-link[data-tab="api-res-preview-tab"]').click();
            } else {
                apiResponsePreview.srcdoc = '<div style="padding:20px;font-family:sans-serif;color:#666;">No Preview Available</div>';
                document.querySelector('.tab-link[data-tab="api-res-pretty-tab"]').click();
            }

            // Headers
            apiResponseHeaders.innerHTML = '';
            Object.entries(finalData.headers).forEach(([k, v]) => {
                apiResponseHeaders.innerHTML += `<span class="header-name">${k}:</span><span class="header-val">${v}</span>`;
            });

        } catch (err) {
            apiResponseStatus.textContent = 'Error';
            apiResponseStatus.className = 'response-status-badge status-error';
            apiResponseRaw.value = err.message;
        } finally {
            btnSend.disabled = false;
        }
    };

    if (btnSend) btnSend.addEventListener('click', sendRequest);

    // Initial setup for existing buttons
    document.getElementById('btn-add-header')?.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'header-row';
        row.innerHTML = `<input type="text" placeholder="Key" class="header-key"><input type="text" placeholder="Value" class="header-value"><button class="btn-remove-header">&times;</button>`;
        row.querySelector('.btn-remove-header').onclick = () => row.remove();
        document.getElementById('api-headers-list').appendChild(row);
    });
});
