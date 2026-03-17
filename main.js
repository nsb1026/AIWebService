document.addEventListener('DOMContentLoaded', () => {
    // --- View Switching Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.getAttribute('data-view');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            views.forEach(v => {
                v.classList.toggle('active', v.id === targetViewId);
            });
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
        
        // Update Stats
        stats.chars.textContent = val.length;
        stats.words.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        stats.lines.textContent = val ? val.split(/\r\n|\r|\n/).length : 0;

        // Update Outputs
        Object.entries(encoderOutputs).forEach(([id, func]) => {
            const el = document.getElementById(id);
            if (el) el.value = val ? func(val) : '';
        });
    };

    mainInput.addEventListener('input', updateEncoder);

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
            
            // Try to handle relaxed JSON (like JS objects) by using a safer alternative or just better error reporting
            // For now, let's stick to JSON.parse but with much better error info
            let obj;
            try {
                obj = JSON.parse(raw);
            } catch (e) {
                // Check if it looks like a JS object (missing quotes around keys)
                // We can't safely use eval(), so we just report the error well
                throw e;
            }

            if (action === 'prettify') {
                jsonOutput.value = JSON.stringify(obj, null, 2);
            } else if (action === 'sort') {
                jsonOutput.value = JSON.stringify(sortJSON(obj), null, 2);
            } else if (action === 'minify') {
                jsonOutput.value = JSON.stringify(obj);
            }
            
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

    // --- Copy to Clipboard ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input && input.value) {
                navigator.clipboard.writeText(input.value).then(() => {
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

    // Initial runs
    updateEncoder();
});
