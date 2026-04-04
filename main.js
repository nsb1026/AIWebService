// --- Main Entry Point ---
import { switchView, setupTabs } from './js/utils.js';
import { setupEncoder } from './js/encoder.js';
import { setupParsers } from './js/parser.js';
import { setupChat } from './js/chat.js';
import { setupApiTester } from './js/api-tester.js';

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

    // 2. Global Tab Initializations
    setupTabs('.api-request-section');
    setupTabs('.api-response-section');

    // 3. Module Initializations
    setupEncoder();
    setupParsers();
    setupChat();
    setupApiTester();

    console.log('Parse Utils initialized.');
});
