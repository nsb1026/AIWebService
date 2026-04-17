// --- JSON & HTML Parser Module ---

export function setupParsers() {
    // JSON Parser
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');

    function updateJsonStatus(valid, msg) {
        if (!jsonStatus) return;
        if (valid) {
            jsonStatus.textContent = '✓ Valid JSON Structure';
            jsonStatus.className = 'json-status valid';
        } else {
            // Make common V8 errors more human-readable
            let userMsg = msg;
            if (msg.includes('Unexpected token')) userMsg = 'Syntax Error: Unexpected character or missing quote.';
            if (msg.includes('Unexpected end of JSON input')) userMsg = 'Syntax Error: Incomplete JSON (check for missing brackets).';
            if (msg.includes('position')) userMsg += ' (Check the indicated position)';
            
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

    // HTML Formatter
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

    // Diff Checker
    const diffOriginal = document.getElementById('diff-input-original');
    const diffModified = document.getElementById('diff-input-modified');
    const diffOutput = document.getElementById('diff-output');
    const diffRaw = document.getElementById('diff-output-raw');

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
