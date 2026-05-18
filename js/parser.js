// --- JSON, JWT, URL, CSS, SQL, XML & YAML Parser Module ---

function updateStatus(elId, valid, msg) {
    const statusEl = document.getElementById(elId);
    if (!statusEl) return;
    if (valid) {
        statusEl.textContent = '✓ Valid Format';
        statusEl.className = 'json-status valid';
    } else {
        statusEl.textContent = '✗ ' + (msg || 'Invalid Format');
        statusEl.className = 'json-status invalid';
    }
}

export function setupJsonParser() {
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');

    if (!jsonInput || !jsonOutput) return;

    function updateJsonStatus(valid, msg) {
        if (!jsonStatus) return;
        if (valid) {
            jsonStatus.textContent = '✓ Valid JSON Structure';
            jsonStatus.className = 'json-status valid';
        } else {
            let userMsg = msg;
            if (msg.includes('Unexpected token')) userMsg = 'Syntax Error: Unexpected character or missing quote.';
            if (msg.includes('Unexpected end of JSON input')) userMsg = 'Syntax Error: Incomplete JSON (check for missing brackets).';
            jsonStatus.textContent = '✗ ' + userMsg;
            jsonStatus.className = 'json-status invalid';
        }
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
        if (jsonStatus) {
            jsonStatus.textContent = '';
            jsonStatus.className = 'json-status';
        }
    });
}

export function setupJwtDecoder() {
    const jwtInput = document.getElementById('jwt-input');
    const jwtOutput = document.getElementById('jwt-output');
    if (!jwtInput || !jwtOutput) return;

    document.getElementById('btn-jwt-decode')?.addEventListener('click', () => {
        try {
            const parts = jwtInput.value.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format (must have 3 parts)');
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            jwtOutput.value = 'HEADER: \n' + JSON.stringify(header, null, 2) + '\n\nPAYLOAD: \n' + JSON.stringify(payload, null, 2);
            updateStatus('jwt-status', true);
        } catch (e) {
            updateStatus('jwt-status', false, e.message);
        }
    });
}

export function setupUrlParser() {
    const urlInput = document.getElementById('url-input');
    const urlOutput = document.getElementById('url-output');
    if (!urlInput || !urlOutput) return;

    document.getElementById('btn-url-parse')?.addEventListener('click', () => {
        try {
            const url = new URL(urlInput.value);
            const params = {};
            url.searchParams.forEach((v, k) => params[k] = v);
            const result = {
                protocol: url.protocol,
                host: url.host,
                hostname: url.hostname,
                port: url.port,
                pathname: url.pathname,
                search: url.search,
                searchParams: params,
                hash: url.hash,
                origin: url.origin
            };
            urlOutput.value = JSON.stringify(result, null, 2);
            updateStatus('url-status', true);
        } catch (e) {
            updateStatus('url-status', false, e.message);
        }
    });
}

export function setupCssFormatter() {
    const cssInput = document.getElementById('css-input');
    const cssOutput = document.getElementById('css-output');
    if (!cssInput || !cssOutput) return;

    document.getElementById('btn-css-prettify')?.addEventListener('click', () => {
        let css = cssInput.value;
        css = css.replace(/\s*([\{\};])\s*/g, '$1\n');
        css = css.replace(/\n+/g, '\n');
        css = css.replace(/([\{;])\n/g, '$1\n  ');
        css = css.replace(/\n\s*\}/g, '\n}');
        cssOutput.value = css.trim();
        updateStatus('css-status', true);
    });

    document.getElementById('btn-css-minify')?.addEventListener('click', () => {
        cssOutput.value = cssInput.value.replace(/\s+/g, ' ').replace(/\s*([\{\};:])\s*/g, '$1').trim();
        updateStatus('css-status', true);
    });
}

export function setupSqlFormatter() {
    const sqlInput = document.getElementById('sql-input');
    const sqlOutput = document.getElementById('sql-output');
    if (!sqlInput || !sqlOutput) return;

    document.getElementById('btn-sql-prettify')?.addEventListener('click', () => {
        const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP BY', 'ORDER BY', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'ON', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'];
        let sql = sqlInput.value.replace(/\s+/g, ' ');
        keywords.forEach(key => {
            const regex = new RegExp('\\b' + key + '\\b', 'gi');
            sql = sql.replace(regex, '\n' + key);
        });
        sqlOutput.value = sql.trim();
        updateStatus('sql-status', true);
    });
}

export function setupHtmlFormatter() {
    const htmlInput = document.getElementById('html-input');
    const htmlOutput = document.getElementById('html-output');
    if (!htmlInput || !htmlOutput) return;

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
}

export function setupDiffChecker() {
    const diffOriginal = document.getElementById('diff-input-original');
    const diffModified = document.getElementById('diff-input-modified');
    const diffOutput = document.getElementById('diff-output');
    const diffRaw = document.getElementById('diff-output-raw');

    if (!diffOriginal || !diffModified) return;

    function updateDiff() {
        if (!diffOriginal || !diffModified || !diffOutput) return;
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
        if (diffRaw) diffRaw.value = raw;
    }

    diffOriginal?.addEventListener('input', updateDiff);
    diffModified?.addEventListener('input', updateDiff);
    document.getElementById('btn-diff-clear-original')?.addEventListener('click', () => { diffOriginal.value = ''; updateDiff(); });
    document.getElementById('btn-diff-clear-modified')?.addEventListener('click', () => { diffModified.value = ''; updateDiff(); });
}

export function setupXmlParser() {
    const xmlInput = document.getElementById('xml-input');
    const xmlOutput = document.getElementById('xml-output');
    const xmlStatus = document.getElementById('xml-status');

    if (!xmlInput || !xmlOutput) return;

    function formatXml(xml, indent = '  ') {
        let formatted = '';
        let reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach(node => {
            let indentLevel = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indentLevel = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indentLevel = 1;
            } else {
                indentLevel = 0;
            }

            let padding = '';
            for (let i = 0; i < pad; i++) padding += indent;
            formatted += padding + node + '\r\n';
            pad += indentLevel;
        });
        return formatted.trim();
    }

    document.getElementById('btn-xml-prettify')?.addEventListener('click', () => {
        try {
            const xml = xmlInput.value;
            if (!xml.trim()) throw new Error('Empty input');
            xmlOutput.value = formatXml(xml);
            updateStatus('xml-status', true);
        } catch (e) {
            updateStatus('xml-status', false, e.message);
        }
    });

    document.getElementById('btn-xml-minify')?.addEventListener('click', () => {
        try {
            xmlOutput.value = xmlInput.value.replace(/>\s+</g, '><').trim();
            updateStatus('xml-status', true);
        } catch (e) {
            updateStatus('xml-status', false, e.message);
        }
    });

    document.getElementById('btn-xml-apply')?.addEventListener('click', () => {
        if (xmlOutput.value) xmlInput.value = xmlOutput.value;
    });

    document.getElementById('btn-xml-clear')?.addEventListener('click', () => {
        xmlInput.value = '';
        xmlOutput.value = '';
        if (xmlStatus) {
            xmlStatus.textContent = '';
            xmlStatus.className = 'json-status';
        }
    });
}

export function setupYamlParser() {
    const yamlInput = document.getElementById('yaml-input');
    const yamlOutput = document.getElementById('yaml-output');
    const yamlStatus = document.getElementById('yaml-status');

    if (!yamlInput || !yamlOutput) return;

    document.getElementById('btn-yaml-prettify')?.addEventListener('click', () => {
        try {
            if (!window.jsyaml) throw new Error('YAML library not loaded');
            const parsed = jsyaml.load(yamlInput.value);
            yamlOutput.value = jsyaml.dump(parsed, { indent: 2 });
            updateStatus('yaml-status', true);
        } catch (e) {
            updateStatus('yaml-status', false, e.message);
        }
    });

    document.getElementById('btn-yaml-to-json')?.addEventListener('click', () => {
        try {
            if (!window.jsyaml) throw new Error('YAML library not loaded');
            const parsed = jsyaml.load(yamlInput.value);
            yamlOutput.value = JSON.stringify(parsed, null, 2);
            updateStatus('yaml-status', true);
        } catch (e) {
            updateStatus('yaml-status', false, e.message);
        }
    });

    document.getElementById('btn-yaml-apply')?.addEventListener('click', () => {
        if (yamlOutput.value) yamlInput.value = yamlOutput.value;
    });

    document.getElementById('btn-yaml-clear')?.addEventListener('click', () => {
        yamlInput.value = '';
        yamlOutput.value = '';
        if (yamlStatus) {
            yamlStatus.textContent = '';
            yamlStatus.className = 'json-status';
        }
    });
}

// Deprecated legacy entry point
export function setupParsers() {
    setupJsonParser();
    setupJwtDecoder();
    setupUrlParser();
    setupCssFormatter();
    setupSqlFormatter();
    setupXmlParser();
    setupYamlParser();
    setupHtmlFormatter();
    setupDiffChecker();
}
