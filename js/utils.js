// --- Common Utilities ---

/**
 * Formats bytes into a human-readable string.
 * @param {number} b - Bytes
 * @returns {string} Formatted size
 */
export const formatSize = (b) => {
    if (!b) return '0 B';
    const k = 1024, i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
};

/**
 * Copies text to the clipboard and updates the button UI.
 * @param {string} text - Text to copy
 * @param {HTMLElement} btn - The button element
 */
export const copyToClipboard = async (text, btn) => {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};

/**
 * Switches the active view.
 * @param {string} viewId - The ID of the view section
 * @param {NodeList} views - List of view elements
 * @param {NodeList} navLinks - List of navigation links
 */
export function switchView(viewId, views, navLinks) {
    views.forEach(v => v.classList.toggle('active', v.id === viewId));
    navLinks.forEach(l => {
        if (l.getAttribute('data-view') === viewId) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Sets up tab switching within a container.
 * @param {string} containerSelector - Selector for the container
 */
export function setupTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const tabLinks = container.querySelectorAll('.tab-link');
    const tabContents = container.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            tabLinks.forEach(l => l.classList.toggle('active', l === link));
            tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
        });
    });
}
