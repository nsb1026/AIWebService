// --- cURL Command to Code Converter Logic ---

export function setupCurlConverter() {
    const input = document.getElementById('curl-input');
    const output = document.getElementById('curl-output');
    const status = document.getElementById('curl-status');
    const clearBtn = document.getElementById('btn-curl-clear');
    const tabBtns = document.querySelectorAll('.language-tabs .tab-btn');

    if (!input || !output) return;

    let activeLang = 'js-fetch';

    function parseCurl(curlString) {
        if (!curlString || !curlString.trim()) return null;

        // Clean up multi-line backslashes
        let cleaned = curlString.replace(/\\\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

        if (!cleaned.startsWith('curl')) return null;

        let method = 'GET';
        let url = '';
        const headers = {};
        let body = null;

        // Extract URL
        const urlMatch = cleaned.match(/(?:'([^']+)'|"([^"]+)"|(\S+))/);
        
        // Regex tokenization for cURL flags
        const tokens = [];
        let current = '';
        let inSingle = false;
        let inDouble = false;

        for (let i = 0; i < cleaned.length; i++) {
            const char = cleaned[i];
            if (char === "'" && !inDouble) {
                inSingle = !inSingle;
            } else if (char === '"' && !inSingle) {
                inDouble = !inDouble;
            } else if (char === ' ' && !inSingle && !inDouble) {
                if (current) {
                    tokens.push(current);
                    current = '';
                }
            } else {
                current += char;
            }
        }
        if (current) tokens.push(current);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (token === 'curl' && !url && tokens[i+1] && !tokens[i+1].startsWith('-')) {
                url = tokens[i+1].replace(/^['"]|['"]$/g, '');
                i++;
            } else if (token === '-X' || token === '--request') {
                if (tokens[i+1]) {
                    method = tokens[i+1].replace(/^['"]|['"]$/g, '').toUpperCase();
                    i++;
                }
            } else if (token === '-H' || token === '--header') {
                if (tokens[i+1]) {
                    const headerStr = tokens[i+1].replace(/^['"]|['"]$/g, '');
                    const colonIdx = headerStr.indexOf(':');
                    if (colonIdx > 0) {
                        const key = headerStr.substring(0, colonIdx).trim();
                        const val = headerStr.substring(colonIdx + 1).trim();
                        headers[key] = val;
                    }
                    i++;
                }
            } else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
                if (tokens[i+1]) {
                    body = tokens[i+1].replace(/^['"]|['"]$/g, '');
                    if (method === 'GET') method = 'POST';
                    i++;
                }
            } else if (token.startsWith('http://') || token.startsWith('https://')) {
                url = token.replace(/^['"]|['"]$/g, '');
            }
        }

        return { method, url, headers, body };
    }

    function generateCode(parsed, lang) {
        if (!parsed || !parsed.url) {
            return '// Awaiting a valid cURL command...';
        }

        const { method, url, headers, body } = parsed;

        if (lang === 'js-fetch') {
            let code = `fetch("${url}", {\n`;
            code += `  method: "${method}",\n`;
            if (Object.keys(headers).length > 0) {
                code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
            }
            if (body) {
                code += `  body: ${JSON.stringify(body)}\n`;
            }
            code += `})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error('Error:', error));`;
            return code;
        }

        if (lang === 'js-axios') {
            let code = `import axios from 'axios';\n\n`;
            code += `axios({\n`;
            code += `  method: '${method.toLowerCase()}',\n`;
            code += `  url: '${url}',\n`;
            if (Object.keys(headers).length > 0) {
                code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
            }
            if (body) {
                try {
                    const parsedBody = JSON.parse(body);
                    code += `  data: ${JSON.stringify(parsedBody, null, 4).replace(/\n/g, '\n  ')}\n`;
                } catch (e) {
                    code += `  data: '${body}'\n`;
                }
            }
            code += `})\n.then(response => console.log(response.data))\n.catch(error => console.error(error));`;
            return code;
        }

        if (lang === 'python') {
            let code = `import requests\n\n`;
            code += `url = "${url}"\n`;
            if (Object.keys(headers).length > 0) {
                code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
            } else {
                code += `headers = {}\n`;
            }
            if (body) {
                try {
                    const parsedBody = JSON.parse(body);
                    code += `payload = ${JSON.stringify(parsedBody, null, 4)}\n`;
                    code += `response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)\n`;
                } catch (e) {
                    code += `payload = """${body}"""\n`;
                    code += `response = requests.${method.toLowerCase()}(url, headers=headers, data=payload)\n`;
                }
            } else {
                code += `response = requests.${method.toLowerCase()}(url, headers=headers)\n`;
            }
            code += `print(response.status_code)\nprint(response.text)`;
            return code;
        }

        if (lang === 'golang') {
            let code = `package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"net/http"\n`;
            if (body) code += `\t"strings"\n`;
            code += `)\n\nfunc main() {\n`;
            code += `\turl := "${url}"\n`;
            if (body) {
                code += `\tpayload := strings.NewReader(\`${body}\`)\n`;
                code += `\treq, err := http.NewRequest("${method}", url, payload)\n`;
            } else {
                code += `\treq, err := http.NewRequest("${method}", url, nil)\n`;
            }
            code += `\tif err != nil {\n\t\tpanic(err)\n\t}\n`;
            Object.entries(headers).forEach(([k, v]) => {
                code += `\treq.Header.Add("${k}", "${v}")\n`;
            });
            code += `\tres, err := http.DefaultClient.Do(req)\n`;
            code += `\tif err != nil {\n\t\tpanic(err)\n\t}\n`;
            code += `\tdefer res.Body.Close()\n`;
            code += `\tbody, _ := io.ReadAll(res.Body)\n`;
            code += `\tfmt.Println(res.Status)\n`;
            code += `\tfmt.Println(string(body))\n}`;
            return code;
        }

        return '';
    }

    function processInput() {
        const raw = input.value;
        const parsed = parseCurl(raw);
        if (parsed) {
            if (status) {
                status.textContent = `Parsed ${parsed.method} request successfully`;
                status.className = 'json-status success';
            }
            output.value = generateCode(parsed, activeLang);
        } else if (raw.trim()) {
            if (status) {
                status.textContent = 'Invalid cURL command format';
                status.className = 'json-status error';
            }
            output.value = '// Invalid cURL command. Make sure it starts with "curl"';
        } else {
            if (status) {
                status.textContent = '';
                status.className = 'json-status';
            }
            output.value = '';
        }
    }

    input.addEventListener('input', processInput);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            processInput();
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeLang = btn.getAttribute('data-lang');
            processInput();
        });
    });
}
