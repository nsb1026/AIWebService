// --- Main Entry Point ---
import { switchView } from './js/utils.js';
import { setupEncoder } from './js/encoder.js';
import { setupParsers } from './js/parser.js';
import { setupBase64ImageTool } from './js/base64-image.js';
import { setupGuides, getArticleData, injectArticle } from './js/guides.js';
import { updateLanguage } from './js/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const views = document.querySelectorAll('.view');

    // 1. Enhanced Navigation with Hash Support
    const handleRoute = () => {
        const hash = window.location.hash.replace('#', '') || 'encoder-view';
        
        if (hash.startsWith('article-')) {
            const articleId = hash.replace('article-', '').trim();
            const articleData = getArticleData(articleId);
            const lang = document.documentElement.lang || 'en';
            
            if (articleData) {
                injectArticle(articleData[lang] || articleData['en']);
                switchView('article-view', views, navLinks);
            } else {
                switchView('guides-view', views, navLinks);
            }
        } else {
            const targetView = document.getElementById(hash);
            if (targetView) {
                switchView(hash, views, navLinks);
                updateMetadata(hash);
            } else {
                switchView('encoder-view', views, navLinks);
                updateMetadata('encoder-view');
            }
        }
        window.scrollTo(0, 0);
    };

    const updateMetadata = (viewId) => {
        const lang = document.documentElement.lang || 'en';
        const titles = {
            'encoder-view': { en: 'Professional String Encoder & Decoder | Parse Utils', ko: '전문적인 문자열 인코더 및 디코더 | 파스 유틸' },
            'json-view': { en: 'High-Performance JSON Analytics & Formatting | Parse Utils', ko: '고성능 JSON 분석 및 포맷팅 | 파스 유틸' },
            'base64-image-view': { en: 'Advanced Base64 to Image Reconstruction | Parse Utils', ko: '고급 Base64 이미지 재구성 | 파스 유틸' },
            'html-view': { en: 'Semantic HTML Formatter & Optimizer | Parse Utils', ko: '시맨틱 HTML 포맷터 및 최적화 도구 | 파스 유틸' },
            'diff-view': { en: 'Intelligent Text & Code Diff Checker | Parse Utils', ko: '지능형 텍스트 및 코드 차이점 분석기 | 파스 유틸' },
            'guides-view': { en: 'Developer Guides & Technical Articles | Parse Utils', ko: '개발자 가이드 및 기술 아티클 | 파스 유틸' },
            'resources-view': { en: 'Developer Knowledge Base & FAQ | Parse Utils', ko: '개발자 지식 베이스 및 FAQ | 파스 유틸' },
            'about-view': { en: 'About Parse Utils - Our Mission', ko: '파스 유틸 소개 - 우리의 미션' },
            'privacy-view': { en: 'Privacy Policy & Cookie Consent | Parse Utils', ko: '개인정보 처리방침 및 쿠키 동의 | 파스 유틸' },
            'contact-view': { en: 'Contact & Community Discussion | Parse Utils', ko: '문의 및 커뮤니티 토론 | 파스 유틸' }
        };

        if (titles[viewId]) {
            document.title = titles[viewId][lang];
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            if (viewId) {
                window.location.hash = viewId;
            }
        });
    });

    window.addEventListener('hashchange', handleRoute);

    // 2. Theme & Language Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'en';
    updateLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'en' ? 'ko' : 'en';
        updateLanguage(newLang);
        localStorage.setItem('lang', newLang);
        
        // Refresh current view (especially articles) on lang change
        handleRoute();
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
            console.log('User accepted cookies. Initializing AdSense...');
            // Reload ads if needed
            if (window.adsbygoogle) {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }
    };

    btnAccept.addEventListener('click', () => handleConsent('accepted'));
    btnDecline.addEventListener('click', () => handleConsent('declined'));

    // 4. Initial Routing & Module Initializations
    setupEncoder();
    setupParsers();
    setupBase64ImageTool();
    setupGuides();
    handleRoute(); // Run initial route

    console.log('Parse Utils initialized.');
});
