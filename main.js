// --- Main Entry Point ---
import { switchView } from './js/utils.js';
import { setupEncoder } from './js/encoder.js';
import { 
    setupJsonParser, 
    setupJwtDecoder, 
    setupUrlParser, 
    setupCssFormatter, 
    setupSqlFormatter, 
    setupXmlParser,
    setupYamlParser,
    setupHtmlFormatter, 
    setupDiffChecker 
} from './js/parser.js';
import { setupBase64ImageTool } from './js/base64-image.js';
import { setupGuides, getArticleData, injectArticle } from './js/guides.js';
import { updateLanguage } from './js/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const appContent = document.getElementById('app-content');
    const loader = document.getElementById('loader');
    
    // Cache for loaded views
    const loadedViews = new Set();

    // Map of view IDs to their specific setup functions
    const moduleSetupMap = {
        'encoder-view': setupEncoder,
        'json-view': setupJsonParser,
        'jwt-view': setupJwtDecoder,
        'url-view': setupUrlParser,
        'css-view': setupCssFormatter,
        'sql-view': setupSqlFormatter,
        'xml-view': setupXmlParser,
        'yaml-view': setupYamlParser,
        'html-view': setupHtmlFormatter,
        'diff-view': setupDiffChecker,
        'base64-image-view': setupBase64ImageTool,
        'guides-view': setupGuides,
        'article-view': setupGuides,
        'resources-view': null,
        'about-view': null,
        'privacy-view': null,
        'terms-view': null,
        'contact-view': null,
        'news-view': null
    };

    const ensureViewLoaded = async (viewId) => {
        if (loadedViews.has(viewId)) return true;

        const viewName = viewId.replace('-view', '');
        const viewPath = `./views/${viewName}.html`;

        try {
            if (loader) loader.style.display = 'flex';
            
            const response = await fetch(viewPath);
            if (!response.ok) throw new Error(`Failed to load view: ${viewId}`);
            
            const html = await response.text();
            
            const temp = document.createElement('div');
            temp.innerHTML = html.trim();
            const viewElement = temp.firstChild;
            
            if (!viewElement) throw new Error(`Empty response for view: ${viewId}`);
            
            appContent.appendChild(viewElement);
            loadedViews.add(viewId);

            // 1. Update translations for the new view
            const currentLang = document.documentElement.lang || 'en';
            updateLanguage(currentLang);

            // 2. Initialize corresponding module logic
            const setupFn = moduleSetupMap[viewId];
            if (setupFn) {
                setupFn();
            }

            return true;
        } catch (error) {
            console.error('Error loading view:', error);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-view';
            errorMsg.textContent = `Error loading tool: ${viewName}. Please check your connection and refresh.`;
            appContent.appendChild(errorMsg);
            return false;
        } finally {
            if (loader) loader.style.display = 'none';
        }
    };

    // 1. Enhanced Navigation with Hash Support
    const handleRoute = async () => {
        const hash = window.location.hash.replace('#', '') || 'encoder-view';
        const isArticle = hash.startsWith('article-');
        const viewId = isArticle ? 'article-view' : hash;

        // Ensure the view is loaded before switching
        const loaded = await ensureViewLoaded(viewId);
        if (!loaded) return;

        const views = document.querySelectorAll('.view');

        if (isArticle) {
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
                window.location.hash = 'encoder-view';
            }
        }
    };

    const updateMetadata = (viewId) => {
        const lang = document.documentElement.lang || 'en';
        const titles = {
            'encoder-view': { en: 'Professional String Encoder & Decoder | Parse Utils', ko: '전문적인 문자열 인코더 및 디코더 | 파스 유틸' },
            'json-view': { en: 'High-Performance JSON Analytics & Formatting | Parse Utils', ko: '고성능 JSON 분석 및 포맷팅 | 파스 유틸' },
            'jwt-view': { en: 'Secure JWT Debugger & Decoder | Parse Utils', ko: '보안 JWT 디버거 및 디코더 | 파스 유틸' },
            'url-view': { en: 'Deep URL Parser & Analyzer | Parse Utils', ko: '심층 URL 파서 및 분석기 | 파스 유틸' },
            'css-view': { en: 'Modern CSS Formatter & Minifier | Parse Utils', ko: '최신 CSS 포맷터 및 압축기 | 파스 유틸' },
            'sql-view': { en: 'Semantic SQL Formatter | Parse Utils', ko: '시맨틱 SQL 포맷터 | 파스 유틸' },
            'xml-view': { en: 'Professional XML Formatter & Beautifier | Parse Utils', ko: '전문적인 XML 포맷터 및 뷰티파이어 | 파스 유틸' },
            'yaml-view': { en: 'Professional YAML Parser & Converter | Parse Utils', ko: '전문적인 YAML 파서 및 변환기 | 파스 유틸' },
            'base64-image-view': { en: 'Advanced Base64 to Image Reconstruction | Parse Utils', ko: '고급 Base64 이미지 재구성 | 파스 유틸' },
            'html-view': { en: 'Semantic HTML Formatter & Optimizer | Parse Utils', ko: '시맨틱 HTML 포맷터 및 최적화 도구 | 파스 유틸' },
            'diff-view': { en: 'Intelligent Text & Code Diff Checker | Parse Utils', ko: '지능형 텍스트 및 코드 차이점 분석기 | 파스 유틸' },
            'guides-view': { en: 'Developer Guides & Technical Articles | Parse Utils', ko: '개발자 가이드 및 기술 아티클 | 파스 유틸' },
            'news-view': { en: 'What\'s New & Site Notices | Parse Utils', ko: '새로운 소식 및 공지사항 | 파스 유틸' },
            'terms-view': { en: 'Terms of Service | Parse Utils', ko: '서비스 이용약관 | 파스 유틸' },
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
        handleRoute();
    });

    // 3. Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-cookie-accept');
    const btnDecline = document.getElementById('btn-cookie-decline');
    const consent = localStorage.getItem('cookie-consent');

    if (!consent && cookieBanner) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }

    const handleConsent = (status) => {
        localStorage.setItem('cookie-consent', status);
        if (cookieBanner) {
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 500);
        }
        
        if (status === 'accepted') {
            console.log('User accepted cookies. Initializing AdSense...');
            if (window.adsbygoogle) {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }
    };

    if (btnAccept) btnAccept.addEventListener('click', () => handleConsent('accepted'));
    if (btnDecline) btnDecline.addEventListener('click', () => handleConsent('declined'));

    // 4. Initial Routing
    handleRoute();

    console.log('Parse Utils initialized.');
});
