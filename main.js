// --- Main Entry Point ---
import { switchView } from './js/utils.js';
import { setupEncoder } from './js/encoder.js';
import { setupParsers } from './js/parser.js';
import { setupBase64ImageTool } from './js/base64-image.js';
import { setupGuides } from './js/guides.js';

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
                window.scrollTo(0, 0); // Scroll to top on view change
            }
        });
    });

    // 2. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-cookie-accept');
    const btnDecline = document.getElementById('btn-cookie-decline');
    const consent = localStorage.getItem('cookie-consent');

    if (!consent) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }

    const handleConsent = (status) => {
        localStorage.setItem('cookie-consent', status);
        cookieBanner.style.opacity = '0';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500);
        
        if (status === 'accepted') {
            console.log('User accepted cookies. Initializing analytics/ads...');
            // Here you would normally initialize AdSense/Analytics
        }
    };

    btnAccept.addEventListener('click', () => handleConsent('accepted'));
    btnDecline.addEventListener('click', () => handleConsent('declined'));

    // 4. Module Initializations
    setupEncoder();
    setupParsers();
    setupBase64ImageTool();
    setupGuides();

    console.log('Parse Utils initialized.');
});
