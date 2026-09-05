// --- Cryptographic Hash & HMAC Generator Logic ---

export function setupHashGenerator() {
    const input = document.getElementById('hash-input');
    const hmacKeyInput = document.getElementById('hmac-key');
    const clearBtn = document.getElementById('btn-hash-clear');
    
    const outSha256 = document.getElementById('hash-sha256');
    const outSha512 = document.getElementById('hash-sha512');
    const outSha1 = document.getElementById('hash-sha1');
    const outMd5 = document.getElementById('hash-md5');

    if (!input || !outSha256) return;

    // Helper: Buffer to Hex String
    function bufToHex(buffer) {
        const byteArray = new Uint8Array(buffer);
        return Array.from(byteArray)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Pure JS MD5 implementation for client-side completeness
    function md5(string) {
        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];
            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17,  606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12,  1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7,  1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7,  1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22,  1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14,  643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9,  38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5,  568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20,  1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14,  1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16,  1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11,  1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4,  681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23,  76029189);
            a = hh(a, b, c, d, k[9], 4, -640364409);
            d = hh(d, a, b, c, k[12], 11, -343485551);
            c = hh(c, d, a, b, k[15], 16,  417753398);
            b = hh(b, c, d, a, k[2], 23, -1019803690);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10,  1126891415);
            c = ii(c, d, a, b, k[12], 15, -1416354905);
            b = ii(b, c, d, a, k[3], 21, -57434055);
            a = ii(a, b, c, d, k[10], 6,  1700485571);
            d = ii(d, a, b, c, k[1], 10, -1894986606);
            c = ii(c, d, a, b, k[8], 15, -1051523);
            b = ii(b, c, d, a, k[15], 21, -2054922799);
            a = ii(a, b, c, d, k[6], 6,  1873313359);
            d = ii(d, a, b, c, k[13], 10, -30611744);
            c = ii(c, d, a, b, k[4], 15, -1560198380);
            b = ii(b, c, d, a, k[11], 21,  1309151649);
            a = ii(a, b, c, d, k[2], 6, -145523070);
            d = ii(d, a, b, c, k[9], 10, -1120210379);
            c = ii(c, d, a, b, k[14], 15,  718787259);
            b = ii(b, c, d, a, k[5], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
        }

        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }
        function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
        function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
        function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
        function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }

        function md51(s) {
            var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i = 64; i <= s.length; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
            for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i++) tail[i] = 0;
            }
            tail[14] = n * 8;
            md5cycle(state, tail);
            return state;
        }

        function md5blk(s) {
            var md5blks = [], i;
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i)
                    + (s.charCodeAt(i + 1) << 8)
                    + (s.charCodeAt(i + 2) << 16)
                    + (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        function rhex(n) {
            var hex_chr = '0123456789abcdef';
            var s = '';
            for (var j = 0; j < 4; j++) {
                s += hex_chr.charAt((n >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((n >> (j * 8)) & 0x0F);
            }
            return s;
        }

        function hex(x) {
            for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
            return x.join('');
        }

        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        return hex(md51(string));
    }

    async function calculateHashes() {
        const text = input.value;
        const secret = hmacKeyInput.value;

        if (!text) {
            outSha256.value = '';
            outSha512.value = '';
            outSha1.value = '';
            outMd5.value = '';
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        try {
            if (secret) {
                // HMAC Calculation
                const keyData = encoder.encode(secret);
                
                // HMAC SHA-256
                const cryptoKey256 = await crypto.subtle.importKey(
                    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
                );
                const sig256 = await crypto.subtle.sign('HMAC', cryptoKey256, data);
                outSha256.value = bufToHex(sig256);

                // HMAC SHA-512
                const cryptoKey512 = await crypto.subtle.importKey(
                    'raw', keyData, { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']
                );
                const sig512 = await crypto.subtle.sign('HMAC', cryptoKey512, data);
                outSha512.value = bufToHex(sig512);

                // HMAC SHA-1
                const cryptoKey1 = await crypto.subtle.importKey(
                    'raw', keyData, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
                );
                const sig1 = await crypto.subtle.sign('HMAC', cryptoKey1, data);
                outSha1.value = bufToHex(sig1);

                outMd5.value = 'HMAC-MD5 (use Plain Hash)';
            } else {
                // Plain Hashing
                const hash256 = await crypto.subtle.digest('SHA-256', data);
                outSha256.value = bufToHex(hash256);

                const hash512 = await crypto.subtle.digest('SHA-512', data);
                outSha512.value = bufToHex(hash512);

                const hash1 = await crypto.subtle.digest('SHA-1', data);
                outSha1.value = bufToHex(hash1);

                outMd5.value = md5(text);
            }
        } catch (err) {
            console.error('Hash generation error:', err);
        }
    }

    input.addEventListener('input', calculateHashes);
    hmacKeyInput.addEventListener('input', calculateHashes);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            hmacKeyInput.value = '';
            calculateHashes();
        });
    }
}
