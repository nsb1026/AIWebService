// --- REST API Tester Module ---
import { formatSize, switchView } from './utils.js';

export function setupApiTester() {
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
        
        apiHeadersList.innerHTML = '';
        Object.entries(item.headers || {}).forEach(([k, v]) => {
            const row = createRow('header');
            row.querySelector('.header-key').value = k;
            row.querySelector('.header-value').value = v;
            apiHeadersList.appendChild(row);
        });

        if (item.body) {
            apiBodyType.value = 'json';
            apiBodyTextarea.value = item.body;
            apiBodyType.dispatchEvent(new Event('change'));
        } else {
            apiBodyType.value = 'none';
            apiBodyType.dispatchEvent(new Event('change'));
        }

        apiUrlInput.dispatchEvent(new Event('input'));
        
        // Navigation (Assuming globally available views and navLinks or handled differently)
        const views = document.querySelectorAll('.view');
        const navLinks = document.querySelectorAll('.nav-link, .footer-link');
        switchView('api-view', views, navLinks);
        
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

        if (btnSend) btnSend.disabled = true;
        if (apiResponseStatus) {
            apiResponseStatus.textContent = 'Connecting...';
            apiResponseStatus.className = 'response-status-badge status-loading';
        }

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
            
            if (apiResponseStatus) {
                apiResponseStatus.textContent = `${finalData.status} ${finalData.statusText} (${time}ms)`;
                apiResponseStatus.className = `response-status-badge ${finalData.status < 300 ? 'status-success' : 'status-error'}`;
            }
            if (apiResponseSize) apiResponseSize.textContent = formatSize(finalData.size);
            if (apiResponseRaw) apiResponseRaw.value = finalData.body;
            
            const ct = (finalData.contentType || '').toLowerCase();
            if (ct.includes('json')) {
                try { if (apiResponsePretty) apiResponsePretty.value = JSON.stringify(JSON.parse(finalData.body), null, 2); } catch(e) { if (apiResponsePretty) apiResponsePretty.value = finalData.body; }
            } else {
                if (apiResponsePretty) apiResponsePretty.value = finalData.body;
            }

            if (apiResponsePreview) {
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
            }

            if (apiResponseHeaders) {
                apiResponseHeaders.innerHTML = '';
                Object.entries(finalData.headers).forEach(([k, v]) => {
                    apiResponseHeaders.innerHTML += `<span class="header-name">${k}:</span><span class="header-val">${v}</span>`;
                });
            }

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
            if (apiResponseStatus) {
                apiResponseStatus.textContent = 'Request Failed';
                apiResponseStatus.className = 'response-status-badge status-error';
            }
            if (apiResponseRaw) apiResponseRaw.value = `Error: ${err.message}`;
            if (apiResponsePretty) apiResponsePretty.value = '';
            if (apiResponseHeaders) apiResponseHeaders.innerHTML = '<p class="placeholder-text">Error occurred. Check console for details.</p>';
        } finally {
            if (btnSend) btnSend.disabled = false;
        }
    };

    if (btnSend) btnSend.addEventListener('click', sendRequest);
    updateHistoryUI();

    if (apiBodyType) apiBodyType.dispatchEvent(new Event('change'));
    if (apiAuthType) apiAuthType.dispatchEvent(new Event('change'));
}
