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

import { setupCurlConverter } from './js/curl.js';
import { setupHashGenerator } from './js/hash.js';
import { setupCronExplainer } from './js/cron.js';
import { setupTimestampConverter } from './js/timestamp.js';
import { setupRegexTester } from './js/regex.js';

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const appContent = document.getElementById('app-content');
    const loader = document.getElementById('loader');
    
    // Cache for loaded views
    const loadedViews = new Set();
    if (document.getElementById('encoder-view')) {
        loadedViews.add('encoder-view');
        setupEncoder();
    }

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
        'curl-view': setupCurlConverter,
        'hash-view': setupHashGenerator,
        'cron-view': setupCronExplainer,
        'timestamp-view': setupTimestampConverter,
        'regex-view': setupRegexTester,
        'status-codes-view': setupStatusCodeFilter,
        'guides-view': setupGuides,
        'article-view': setupGuides,
        'resources-view': null,
        'about-view': null,
        'privacy-view': null,
        'terms-view': null,
        'contact-view': null,
        'news-view': null,
        'glossary-view': setupGlossaryFilter
    };

    function setupStatusCodeFilter() {
        const filterInput = document.getElementById('status-code-filter');
        const items = document.querySelectorAll('.details-card li');
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                items.forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(term) ? 'list-item' : 'none';
                });
            });
        }
    }

    function setupGlossaryFilter() {
        const filterInput = document.getElementById('glossary-filter');
        const items = document.querySelectorAll('.glossary-item');
        
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                items.forEach(item => {
                    const text = item.getAttribute('data-term') + ' ' + item.textContent.toLowerCase();
                    item.style.display = text.includes(term) ? 'block' : 'none';
                });
            });
        }
    }

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

    // 1. Enhanced Code Block Wrapper with Dark Theme & Copy Button
    function setupCodeBlockCopy() {
        const preBlocks = document.querySelectorAll('pre');
        preBlocks.forEach(pre => {
            if (pre.parentElement.classList.contains('code-wrapper')) return;

            const code = pre.querySelector('code') || pre;
            const codeText = code.textContent.trim();

            let langName = 'Code';
            if (codeText.includes('package ') || codeText.includes('import java') || codeText.includes('@RestController') || codeText.includes('SpringBootApplication')) {
                langName = 'Java 21 (Spring Boot 3.3)';
            } else if (codeText.includes('plugins {') || codeText.includes('dependencies {') || codeText.includes('implementation')) {
                langName = 'Gradle (build.gradle)';
            } else if (codeText.includes('jwt:') || codeText.includes('secret:')) {
                langName = 'YAML (application.yml)';
            } else if (codeText.includes('<dependency>')) {
                langName = 'Maven (pom.xml)';
            } else if (codeText.includes('const ') || codeText.includes('let ') || codeText.includes('function') || codeText.includes('btoa')) {
                langName = 'JavaScript';
            } else if (codeText.includes('import base64') || codeText.includes('def ')) {
                langName = 'Python 3';
            } else if (codeText.includes('curl ')) {
                langName = 'cURL';
            } else if (codeText.includes('SELECT ') || codeText.includes('CREATE TABLE')) {
                langName = 'SQL';
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';

            const header = document.createElement('div');
            header.className = 'code-header';

            const langTag = document.createElement('span');
            langTag.className = 'lang-tag';
            langTag.innerHTML = `💻 <span>${langName}</span>`;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.type = 'button';
            copyBtn.innerHTML = `📋 <span>Copy Code</span>`;

            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = `✓ <span>Copied!</span>`;
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = `📋 <span>Copy Code</span>`;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code: ', err);
                }
            });

            header.appendChild(langTag);
            header.appendChild(copyBtn);

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);

            // Apply IDE syntax highlighting with Highlight.js
            if (window.hljs && code) {
                try {
                    hljs.highlightElement(code);
                } catch (e) {
                    console.warn('hljs error:', e);
                }
            }
        });
    }

    // 2. Enhanced Navigation & SEO Routing Engine
    const handleRoute = async () => {
        const hash = window.location.hash.replace('#', '') || 'encoder-view';
        const isArticle = hash.startsWith('article-');
        const viewId = isArticle ? 'article-view' : hash;

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
                updateMetadata('article-view', articleId);
            } else {
                switchView('guides-view', views, navLinks);
                updateMetadata('guides-view');
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

        setupCodeBlockCopy();
    };

    const metaConfig = {
        'encoder-view': {
            title: { en: 'Professional String Encoder & Decoder | Parse Utils', ko: '전문적인 문자열 인코더 및 디코더 | 파스 유틸' },
            desc: { en: 'Client-side multi-format string encoder and decoder (Base64, URL, HTML Entity, Hex, Unicode, ROT13). Secure and instant V8 processing.', ko: '브라우저 로컬에서 안전하고 빠른 실시간 문자열 인코딩 및 디코딩 (Base64, URL, HTML 에스케이프, 헥스, 유니코드, ROT13).' },
            keywords: 'string encoder, base64 decoder, url encode, html entity escape, hex dump, rot13, utf-16 escape'
        },
        'json-view': {
            title: { en: 'High-Performance JSON Analytics & Formatting | Parse Utils', ko: '고성능 JSON 분석 및 포맷팅 | 파스 유틸' },
            desc: { en: 'Validate, restructure, sort keys, and compress JavaScript Object Notation payloads with millisecond latency.', ko: 'JSON 페이로드 유효성 검증, 들여쓰기 정렬, 알파벳순 키 정렬 및 실시간 압축 최적화 도구.' },
            keywords: 'json formatter, json validator, json prettify, sort json keys, json minifier, RFC 8259'
        },
        'jwt-view': {
            title: { en: 'Secure JWT Debugger & Decoder | Parse Utils', ko: '보안 JWT 디버거 및 디코더 | 파스 유틸' },
            desc: { en: 'Decode JSON Web Tokens locally. Inspect headers, payloads, and signatures without exposing sensitive tokens.', ko: 'JSON 웹 토큰(JWT) 헤더, 페이로드, 서명 정보 로컬 검사 및 안전한 무상태 디버깅.' },
            keywords: 'jwt debugger, jwt decoder, json web token, RFC 7519, bearer token inspector'
        },
        'url-view': {
            title: { en: 'Deep URL Parser & Analyzer | Parse Utils', ko: '심층 URL 파서 및 분석기 | 파스 유틸' },
            desc: { en: 'Deconstruct complex URLs into protocol schemes, hostname authorities, search query parameters, and fragments.', ko: '복잡한 URL 경로, 쿼리 매개변수, 호스트, 프래그먼트 구성 요소 심층 해석 및 JSON 구조화.' },
            keywords: 'url parser, query string analyzer, RFC 3986, whatwg url standard'
        },
        'css-view': {
            title: { en: 'Modern CSS Formatter & Minifier | Parse Utils', ko: '최신 CSS 포맷터 및 압축기 | 파스 유틸' },
            desc: { en: 'Format, structure, and optimize Cascading Style Sheets (CSS). Prettify for code reviews or minify for production.', ko: 'CSS 스타일시트 들여쓰기 정제 및 프로덕션 배포용 코드 압축 최적화.' },
            keywords: 'css formatter, css minifier, css beautifier, stylesheet optimizer'
        },
        'sql-view': {
            title: { en: 'Semantic SQL Formatter & Query Prettifier | Parse Utils', ko: '시맨틱 SQL 포맷터 및 쿼리 정렬기 | 파스 유틸' },
            desc: { en: 'Transform complex SQL queries into clean, standardized, and readable statements.', ko: '복잡하고 지저분한 SQL 쿼리 문장을 정식 대문자 예약어 및 시맨틱 들여쓰기로 표준화 정렬.' },
            keywords: 'sql formatter, sql prettifier, sql query beautifier, database query tool'
        },
        'xml-view': {
            title: { en: 'Professional XML Formatter & Beautifier | Parse Utils', ko: '전문적인 XML 포맷터 및 뷰티파이어 | 파스 유틸' },
            desc: { en: 'Transform cluttered XML documents, SVG vector graphics, and RSS feeds into clean hierarchical structures.', ko: 'XML 문서, SVG 그래픽 소스, RSS 피드 계층 구조 정리 및 미니파이 최적화.' },
            keywords: 'xml formatter, svg beautifier, xml minifier, rss feed formatter'
        },
        'yaml-view': {
            title: { en: 'Professional YAML Parser & JSON Converter | Parse Utils', ko: '전문적인 YAML 파서 및 변환기 | 파스 유틸' },
            desc: { en: 'Validate, format, and convert YAML data to JSON for Kubernetes configs and CI/CD pipelines.', ko: 'Kubernetes 및 CI/CD 설정을 위한 YAML 검증, 정렬 및 JSON 데이터 상호 변환.' },
            keywords: 'yaml parser, yaml to json, kubernetes config validator, yaml formatter'
        },
        'base64-image-view': {
            title: { en: 'Advanced Base64 to Image Reconstruction | Parse Utils', ko: '고급 Base64 이미지 재구성 도구 | 파스 유틸' },
            desc: { en: 'Instantly decode and render binary Base64 strings into visual image assets (PNG, JPEG, SVG, WebP).', ko: 'Base64 바이너리 스트림 및 Data URI 문자열을 이미지 자산(PNG, JPEG, SVG, WebP)으로 즉시 시각 복원.' },
            keywords: 'base64 to image, base64 decoder, data uri renderer, base64 viewer'
        },
        'curl-view': {
            title: { en: 'cURL Command to Code Converter | Parse Utils', ko: 'cURL 명령어 소스코드 변환기 | 파스 유틸' },
            desc: { en: 'Parse raw cURL commands from browser DevTools, Postman, or terminal into clean executable JavaScript, Python, and Go code.', ko: '개발자 도구 cURL 명령어를 JavaScript, Python, Go 실행 코드로 즉시 변환.' },
            keywords: 'curl to code, curl to javascript, curl to python, curl converter'
        },
        'hash-view': {
            title: { en: 'Cryptographic Hash & HMAC Generator | Parse Utils', ko: '암호화 해시 및 HMAC 생성기 | 파스 유틸' },
            desc: { en: 'Generate SHA-256, SHA-512, SHA-1, MD5 hashes and HMAC signatures locally using Web Crypto API.', ko: 'Web Crypto API 기반 브라우저 로컬 메모리 SHA-256, SHA-512, HMAC 암호화 해시 산출.' },
            keywords: 'sha256 generator, hmac calculator, sha512, md5 checksum, web crypto api'
        },
        'cron-view': {
            title: { en: 'Cron Expression Explainer & Generator | Parse Utils', ko: 'Cron 표현식 해석기 및 생성기 | 파스 유틸' },
            desc: { en: 'Parse 5-part standard Cron expressions into plain human-readable sentences and calculate future execution timelines.', ko: '5자리 표준 Cron 스케줄 표현식을 쉬운 한국어 문장으로 해석하고 향후 5회 실행 예정 시간 산출.' },
            keywords: 'cron explainer, cron generator, cron expression parser, cron schedule'
        },
        'timestamp-view': {
            title: { en: 'Unix Timestamp & Epoch Timezone Converter | Parse Utils', ko: 'Unix 타임스탬프 및 타임존 변환기 | 파스 유틸' },
            desc: { en: 'Convert Unix Epoch timestamps into ISO 8601, UTC, and KST (Korea Standard Time) formats with real-time live clock.', ko: 'Unix 에폭(Epoch) 타임스탬프 초/밀리초 단위를 ISO 8601, UTC, KST(한국 표준시) 변환 및 실시간 시계.' },
            keywords: 'unix timestamp converter, epoch converter, iso 8601, kst timezone'
        },
        'regex-view': {
            title: { en: 'Regex Tester & Cheatsheet | Parse Utils', ko: '정규표현식 검증기 및 치트시트 | 파스 유틸' },
            desc: { en: 'Test and debug regular expressions in real-time with pattern matching, capture group analysis, and presets.', ko: '정규표현식(Regex) 실시간 일치 하이라이트, 캡처 그룹 분석 및 이메일/URL/IPv4 프리셋.' },
            keywords: 'regex tester, regular expression validator, regex cheat sheet'
        },
        'status-codes-view': {
            title: { en: 'HTTP Status Codes Reference & Guide | Parse Utils', ko: 'HTTP 상태 코드 백과사전 | 파스 유틸' },
            desc: { en: 'Comprehensive reference of 1xx, 2xx, 3xx, 4xx, and 5xx HTTP response status codes with root-cause diagnostics.', ko: '1xx~5xx HTTP 상태 코드 상세 원인 분석 및 프론트엔드/백엔드 트러블슈팅 가이드.' },
            keywords: 'http status codes, 404 not found, 401 unauthorized, 500 internal server error, http reference'
        },
        'html-view': {
            title: { en: 'Semantic HTML Formatter & Optimizer | Parse Utils', ko: '시맨틱 HTML 포맷터 및 최적화 도구 | 파스 유틸' },
            desc: { en: 'Cleanse, indent, and validate HTML markup for SEO, accessibility, and Core Web Vitals performance.', ko: 'SEO 및 웹 접근성을 위한 시맨틱 HTML5 들여쓰기 정제 및 마크업 최적화.' },
            keywords: 'html formatter, html beautifier, html minifier, semantic html'
        },
        'diff-view': {
            title: { en: 'Intelligent Text & Code Diff Checker | Parse Utils', ko: '지능형 텍스트 및 코드 차이점 분석기 | 파스 유틸' },
            desc: { en: 'Perform line-by-line and character-by-character comparisons of code versions, API payloads, or text documents.', ko: '코드 버전, API 페이로드, 텍스트 문서 나란히(Side-by-side) 차이점 하이라이트 분석.' },
            keywords: 'diff checker, text comparison, code diff, diff tool'
        },
        'guides-view': {
            title: { en: 'Developer Guides & Technical Articles | Parse Utils', ko: '개발자 가이드 및 기술 아티클 | 파스 유틸' },
            desc: { en: 'In-depth articles covering Spring Boot 3.3, JWT security, XSS prevention, REST APIs, and Core Web Vitals.', ko: '스프링부트 3.3, JWT 보안, XSS 방어, REST API, Core Web Vitals 등 심층 기술 아티클 모음.' },
            keywords: 'developer guides, spring boot jwt guide, web security checklist, api debugging'
        },
        'news-view': {
            title: { en: 'What\'s New & Site Notices | Parse Utils', ko: '새로운 소식 및 공지사항 | 파스 유틸' },
            desc: { en: 'Stay updated with the latest improvements, new tools, and technical announcements from Parse Utils.', ko: '파스 유틸(Parse Utils) 팀의 최신 기능 업데이트, 새로운 유틸리티 출시 및 공지사항.' },
            keywords: 'site notices, feature updates, parse utils news'
        },
        'terms-view': {
            title: { en: 'Terms of Service | Parse Utils', ko: '서비스 이용약관 | 파스 유틸' },
            desc: { en: 'Terms and conditions for using Parse Utils free client-side developer utilities.', ko: '파스 유틸 서비스 이용 조건 및 라이선스 약관.' },
            keywords: 'terms of service, developer tools license'
        },
        'resources-view': {
            title: { en: 'Developer Knowledge Base & FAQ | Parse Utils', ko: '개발자 지식 베이스 및 FAQ | 파스 유틸' },
            desc: { en: 'Curated repository of web standards, security protocols, and data engineering concepts.', ko: '웹 표준, 보안 프로토콜 및 데이터 엔지니어링 개념 백과사전 및 자주 묻는 질문.' },
            keywords: 'developer faq, web standards, CORS, XSS, RFC standards'
        },
        'about-view': {
            title: { en: 'About Parse Utils - Our Mission', ko: '파스 유틸 소개 - 우리의 미션' },
            desc: { en: 'Learn about our mission to provide high-performance, client-side developer tools with zero data tracking.', ko: '100% 클라이언트 사이드 로컬 처리 기반 정밀 유틸리티 도구 소개.' },
            keywords: 'about parse utils, client side tools, privacy focused'
        },
        'privacy-view': {
            title: { en: 'Privacy Policy & Cookie Consent | Parse Utils', ko: '개인정보 처리방침 및 쿠키 동의 | 파스 유틸' },
            desc: { en: 'Our commitment to data privacy: 100% browser-local processing with zero server-side logging.', ko: '서버 데이터 전송이 없는 100% 브라우저 메모리 로컬 처리 기반 개인정보 처리방침.' },
            keywords: 'privacy policy, cookie policy, client side privacy'
        },
        'contact-view': {
            title: { en: 'Contact & Community Discussion | Parse Utils', ko: '문의 및 커뮤니티 토론 | 파스 유틸' },
            desc: { en: 'Get in touch with our team or participate in community discussions.', ko: '파스 유틸 팀 문의하기 및 개발자 커뮤니티 피드백 토론.' },
            keywords: 'contact developer, community discussion'
        },
        'glossary-view': {
            title: { en: 'Technical Glossary & Web Terminology | Parse Utils', ko: '기술 용어집 및 웹 용어 사전 | 파스 유틸' },
            desc: { en: 'Comprehensive directory of modern web development and data engineering terminology.', ko: '현대 웹 개발 및 데이터 엔지니어링 표준 기술 용어 해설 디렉토리.' },
            keywords: 'technical glossary, web development terms, baseline, WASM, PWA'
        }
    };

    const updateMetadata = (viewId, articleId = null) => {
        const lang = document.documentElement.lang || 'en';
        let config = metaConfig[viewId];
        let pageTitle = 'Parse Utils';
        let pageDesc = 'Client-side suite of developer tools.';
        let pageKeywords = 'developer tools, string encoder, json parser';
        let pageUrl = window.location.href;

        if (articleId) {
            const articleData = getArticleData(articleId);
            if (articleData && articleData[lang]) {
                pageTitle = `${articleData[lang].title} | Parse Utils`;
                pageDesc = articleData[lang].title;
            } else if (articleData && articleData['en']) {
                pageTitle = `${articleData['en'].title} | Parse Utils`;
                pageDesc = articleData['en'].title;
            }
        } else if (config) {
            pageTitle = config.title[lang] || config.title['en'];
            pageDesc = config.desc[lang] || config.desc['en'];
            pageKeywords = config.keywords;
        }

        // 1. Document Title
        document.title = pageTitle;

        // 2. Meta Description
        let metaDescEl = document.querySelector('meta[name="description"]');
        if (metaDescEl) metaDescEl.setAttribute('content', pageDesc);

        // 3. Meta Keywords
        let metaKeysEl = document.querySelector('meta[name="keywords"]');
        if (metaKeysEl) metaKeysEl.setAttribute('content', pageKeywords);

        // 4. OpenGraph Tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', pageTitle);

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', pageDesc);

        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', pageUrl);

        // 5. Canonical Link
        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (canonicalEl) canonicalEl.setAttribute('href', pageUrl);

        // 6. Dynamic JSON-LD Structured Data
        let jsonLdEl = document.getElementById('dynamic-seo-jsonld');
        if (!jsonLdEl) {
            jsonLdEl = document.createElement('script');
            jsonLdEl.id = 'dynamic-seo-jsonld';
            jsonLdEl.type = 'application/ld+json';
            document.head.appendChild(jsonLdEl);
        }

        const jsonLdData = {
            "@context": "https://schema.org",
            "@type": articleId ? "TechArticle" : "WebApplication",
            "name": pageTitle,
            "description": pageDesc,
            "url": pageUrl,
            "inLanguage": lang,
            "publisher": {
                "@type": "Organization",
                "name": "Parse Utils",
                "url": "https://parseutils.com"
            }
        };

        jsonLdEl.textContent = JSON.stringify(jsonLdData);
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
