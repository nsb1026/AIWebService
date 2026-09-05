// --- Regex Tester & Cheatsheet Logic ---

export function setupRegexTester() {
    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testText = document.getElementById('regex-test-text');
    const highlightBox = document.getElementById('regex-highlight-box');
    const jsonOutput = document.getElementById('regex-matches-json');
    const status = document.getElementById('regex-status');
    const clearBtn = document.getElementById('btn-regex-clear');
    const presetBtns = document.querySelectorAll('.regex-preset-btn');

    if (!patternInput || !testText || !highlightBox) return;

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function processRegex() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const text = testText.value;

        if (!pattern || !text) {
            highlightBox.innerHTML = escapeHtml(text);
            jsonOutput.value = '';
            if (status) {
                status.textContent = '';
                status.className = 'json-status';
            }
            return;
        }

        try {
            const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
            const matches = [];
            let match;
            let lastIndex = 0;
            let highlightedHtml = '';

            while ((match = regex.exec(text)) !== null) {
                // Prevent infinite loop with zero-width matches
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // Append un-matched segment
                highlightedHtml += escapeHtml(text.substring(lastIndex, match.index));
                
                // Append matched segment with highlight background
                highlightedHtml += `<mark style="background: rgba(46, 204, 113, 0.4); color: inherit; padding: 2px 4px; border-radius: 4px; border-bottom: 2px solid #2ecc71;">${escapeHtml(match[0])}</mark>`;
                
                lastIndex = regex.lastIndex;

                matches.push({
                    index: match.index,
                    match: match[0],
                    groups: match.slice(1)
                });
            }

            highlightedHtml += escapeHtml(text.substring(lastIndex));
            highlightBox.innerHTML = highlightedHtml;

            jsonOutput.value = JSON.stringify({
                totalMatches: matches.length,
                matches: matches
            }, null, 2);

            if (status) {
                status.textContent = `${matches.length} Match(es) Found`;
                status.className = matches.length > 0 ? 'json-status success' : 'json-status';
            }
        } catch (err) {
            highlightBox.innerHTML = escapeHtml(text);
            jsonOutput.value = '';
            if (status) {
                status.textContent = `Regex Error: ${err.message}`;
                status.className = 'json-status error';
            }
        }
    }

    patternInput.addEventListener('input', processRegex);
    flagsInput.addEventListener('input', processRegex);
    testText.addEventListener('input', processRegex);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            testText.value = '';
            processRegex();
        });
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            patternInput.value = btn.getAttribute('data-pattern') || '';
            flagsInput.value = btn.getAttribute('data-flags') || 'g';
            processRegex();
        });
    });

    processRegex();
}
