document.addEventListener('DOMContentLoaded', () => {
    const mainInput = document.getElementById('main-input');
    const outputs = {
        'url-encode': (s) => encodeURIComponent(s),
        'url-decode': (s) => {
            try { return decodeURIComponent(s); }
            catch (e) { return 'Error: Invalid URL encoding'; }
        },
        'html-escape': (s) => {
            const div = document.createElement('div');
            div.textContent = s;
            return div.innerHTML;
        },
        'html-unescape': (s) => {
            const div = document.createElement('div');
            div.innerHTML = s;
            return div.textContent;
        },
        'base64-encode': (s) => {
            try { return btoa(unescape(encodeURIComponent(s))); }
            catch (e) { return 'Error: Cannot encode to Base64'; }
        },
        'base64-decode': (s) => {
            try { return decodeURIComponent(escape(atob(s))); }
            catch (e) { return 'Error: Invalid Base64'; }
        },
        'hex-encode': (s) => {
            return Array.from(s).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
        },
        'upper-case': (s) => s.toUpperCase(),
        'lower-case': (s) => s.toLowerCase(),
        'title-case': (s) => {
            return s.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        },
        'camel-case': (s) => {
            return s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        },
        'snake-case': (s) => {
            const matches = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
            return matches ? matches.map(x => x.toLowerCase()).join('_') : s.toLowerCase();
        },
        'json-prettify': (s) => {
            try { return JSON.stringify(JSON.parse(s), null, 2); }
            catch (e) { return 'Error: Invalid JSON'; }
        },
        'json-sort': (s) => {
            try {
                const obj = JSON.parse(s);
                const sortObject = (o) => {
                    if (Array.isArray(o)) return o.map(sortObject);
                    if (o !== null && typeof o === 'object') {
                        return Object.keys(o).sort().reduce((acc, key) => {
                            acc[key] = sortObject(o[key]);
                            return acc;
                        }, {});
                    }
                    return o;
                };
                return JSON.stringify(sortObject(obj), null, 2);
            } catch (e) { return 'Error: Invalid JSON'; }
        },
        'json-minify': (s) => {
            try { return JSON.stringify(JSON.parse(s)); }
            catch (e) { return 'Error: Invalid JSON'; }
        }
    };

    const updateOutputs = () => {
        const value = mainInput.value;
        if (!value) {
            Object.keys(outputs).forEach(id => {
                document.getElementById(id).value = '';
            });
            return;
        }

        Object.entries(outputs).forEach(([id, func]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = func(value);
            }
        });
    };

    mainInput.addEventListener('input', updateOutputs);

    // Copy to clipboard functionality
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

    // Initial run in case there's content on load
    updateOutputs();
});
