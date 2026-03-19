// --- Encoder / Decoder Module ---

export function setupEncoder() {
    const mainInput = document.getElementById('main-input');
    if (!mainInput) return;

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
        if (stats.chars) stats.chars.textContent = val.length;
        if (stats.words) stats.words.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
        if (stats.lines) stats.lines.textContent = val ? val.split('\n').length : 0;

        if (!val) {
            Object.values(outputs).forEach(out => { if (out) out.value = ''; });
            return;
        }

        // Web Encodings
        if (outputs.urlEncode) outputs.urlEncode.value = encodeURIComponent(val);
        if (outputs.htmlEscape) outputs.htmlEscape.value = val.replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
        if (outputs.unicodeEscape) outputs.unicodeEscape.value = val.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');

        // Data Representations
        try { 
            if (outputs.base64Encode) outputs.base64Encode.value = btoa(unescape(encodeURIComponent(val))); 
        } catch(e) { 
            if (outputs.base64Encode) outputs.base64Encode.value = 'Error'; 
        }
        if (outputs.binaryString) outputs.binaryString.value = val.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        if (outputs.hexEncode) outputs.hexEncode.value = val.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');

        // Ciphers
        if (outputs.rot13) outputs.rot13.value = val.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
        if (outputs.atbash) outputs.atbash.value = val.replace(/[a-zA-Z]/g, c => {
            const low = c.toLowerCase();
            const res = String.fromCharCode(219 - low.charCodeAt(0));
            return c === low ? res : res.toUpperCase();
        });

        // Case
        const words = val.toLowerCase().split(/[^a-zA-Z0-9]+/).filter(Boolean);
        if (outputs.camelCase) outputs.camelCase.value = words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('');
        if (outputs.snakeCase) outputs.snakeCase.value = words.join('_');
    }

    mainInput.addEventListener('input', updateEncoder);
    const clearBtn = document.getElementById('btn-encoder-clear');
    if (clearBtn) {
        clearBtn.onclick = (e) => {
            e.preventDefault();
            mainInput.value = '';
            updateEncoder();
        };
    }
}
