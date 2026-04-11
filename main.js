// --- Main Entry Point ---
import { switchView } from './js/utils.js';
import { setupEncoder } from './js/encoder.js';
import { setupParsers } from './js/parser.js';
import { setupBase64ImageTool } from './js/base64-image.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Global View Logic
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            if (viewId) {
                switchView(viewId, views, navLinks);
            }
        });
    });

    // 2. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.body.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Module Initializations
    setupEncoder();
    setupParsers();
    setupBase64ImageTool();

    console.log('Parse Utils initialized.');
});
