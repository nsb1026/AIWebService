export const translations = {
    en: {
        nav_brand: "Parse Utils",
        nav_encoder: "Encoder",
        nav_json: "JSON",
        nav_base64: "Base64",
        nav_html: "HTML",
        nav_diff: "Diff",
        nav_jwt: "JWT",
        nav_url: "URL",
        nav_css: "CSS",
        nav_sql: "SQL",
        nav_xml: "XML",
        nav_yaml: "YAML",
        nav_more: "More",
        nav_parsers: "Parsers",
        nav_guides: "Guides",
        nav_resources: "Resources",
        nav_about: "About",
        nav_privacy: "Privacy",
        nav_contact: "Contact",
        nav_news: "News",
        nav_terms: "Terms",
        
        encoder_h1: "Professional String Encoder & Decoder",
        encoder_p: "A multi-format transformation engine designed for secure, real-time data processing. Unlike server-side alternatives, all logic executes within your browser's V8 engine, ensuring that sensitive strings never leave your local environment.",
        
        json_h1: "High-Performance JSON Analytics & Formatting",
        json_p: "Validate, restructure, and optimize your JavaScript Object Notation payloads. Designed for handling large-scale API responses with millisecond latency.",
        
        jwt_h1: "Secure JWT Debugger & Decoder",
        jwt_p: "Decode JSON Web Tokens locally. Inspect headers, payloads, and signatures without exposing your sensitive tokens to external servers.",

        url_h1: "Deep URL Parser & Analyzer",
        url_p: "Deconstruct complex URLs into their fundamental components. Analyze protocols, query parameters, and fragments for debugging and SEO optimization.",

        css_h1: "Modern CSS Formatter & Minifier",
        css_p: "Cleanse and optimize your stylesheets. Prettify for development or minify for production deployment.",

        sql_h1: "Semantic SQL Formatter",
        sql_p: "Transform messy SQL queries into readable, structured statements. Supports various SQL dialects for better database management.",

        xml_h1: "Professional XML Formatter & Beautifier",
        xml_p: "Transform cluttered XML, SVG, or RSS data into a clean, hierarchical structure. Our local parser ensures your sensitive data remains private.",

        yaml_h1: "Professional YAML Parser & Converter",
        yaml_p: "Validate, format, and convert YAML data to JSON. Perfect for debugging Kubernetes configs, CI/CD pipelines, and application settings.",

        base64_h1: "Advanced Base64 to Image Reconstruction",
        base64_p: "Instantly render binary-encoded image data back into visual assets. This tool supports various MIME types including PNG, JPEG, SVG, and WEBP, utilizing the browser's native rendering pipeline for maximum accuracy.",
        
        html_h1: "Semantic HTML Formatter & Optimizer",
        html_p: "Cleanse, indent, and validate your markup for better SEO and maintainability. This utility transforms cluttered \"spaghetti code\" into professional, standards-compliant HTML5.",
        
        diff_h1: "Intelligent Text & Code Diff Checker",
        diff_p: "Perform side-by-side comparisons of code versions, API payloads, or text documents. Our algorithm highlights additions, deletions, and modifications with high precision.",
        
        resources_h1: "Developer Knowledge Base & Technical FAQ",
        resources_p: "A curated repository of web standards, security protocols, and data engineering concepts to support your daily development cycle.",
        
        about_h1: "About Parse Utils",
        about_p: "Professional Developer Utilities for the Modern Web.",

        privacy_h1: "Privacy Policy",
        privacy_p: "Last Updated: May 2026",

        terms_h1: "Terms of Service",
        terms_p: "Please read these terms carefully before using our utilities.",

        guides_h1: "Developer Guides & Resources",
        guides_p: "In-depth articles to help you master web development and data processing. All content is original and technically vetted.",

        news_h1: "What's New & Site Notices",
        news_p: "Stay updated with the latest improvements, new tools, and technical announcements from the Parse Utils team.",

        contact_h1: "Contact & Community",
        contact_p: "Get in touch or join the discussion with our developer community.",

        btn_copy: "Copy",
        btn_clear: "Clear Workspace",
        btn_clear_panel: "Clear Panel",
        btn_prettify: "Prettify",
        btn_sort: "Sort Keys",
        btn_minify: "Minify",
        btn_apply: "Push to Input",
        btn_download: "Export Reconstructed Image",
        btn_read_more: "Read Full Article",
        btn_back_guides: "Back to Guides",
        
        label_main_input: "Main Input (Source String)",
        label_characters: "Characters:",
        label_words: "Words:",
        label_lines: "Lines:",
        label_entropy: "Entropy:",
        
        placeholder_encoder: "Enter your raw text, Base64, or URL-encoded string...",
        placeholder_json: "Paste your unformatted JSON here...",
        placeholder_jwt: "Paste your JWT here (header.payload.signature)...",
        placeholder_url: "Paste your URL here (https://example.com/path?query=val)...",
        placeholder_css: "Paste your CSS here...",
        placeholder_sql: "Paste your SQL here...",
        placeholder_xml: "Paste your XML here...",
        placeholder_yaml: "Paste your YAML here...",
        placeholder_base64: "Paste your raw Base64 image data here...",
        placeholder_html: "Paste your HTML, SVG, or XML snippet here...",
        placeholder_diff_orig: "Original content...",
        placeholder_diff_mod: "Modified content...",
        
        cookie_text: "We use cookies to personalize content and ads, and to analyze our traffic. We also share information about your use of our site with our advertising and analytics partners. ",
        cookie_learn_more: "Learn more",
        cookie_accept: "Accept All",
        cookie_decline: "Decline",

        footer_copyright: "© 2026 Parse Utils - Precision Tools for Modern Engineering. All rights reserved.",
        footer_transform: "Transformation Tools",
        footer_analysis: "Analysis & Formatting",
        footer_trust: "Trust & Transparency"
    },
    ko: {
        nav_brand: "파스 유틸 (Parse Utils)",
        nav_encoder: "인코더",
        nav_json: "JSON",
        nav_base64: "Base64",
        nav_html: "HTML",
        nav_diff: "차이점",
        nav_jwt: "JWT",
        nav_url: "URL",
        nav_css: "CSS",
        nav_sql: "SQL",
        nav_xml: "XML",
        nav_yaml: "YAML",
        nav_more: "더 보기",
        nav_parsers: "파서",
        nav_guides: "가이드",
        nav_resources: "리소스",
        nav_about: "정보",
        nav_privacy: "개인정보",
        nav_contact: "문의",
        nav_news: "소식",
        nav_terms: "약관",
        
        encoder_h1: "전문적인 문자열 인코더 및 디코더",
        encoder_p: "안전한 실시간 데이터 처리를 위해 설계된 다중 형식 변환 엔진입니다. 서버측 대안과 달리 모든 로직이 브라우저의 V8 엔진 내에서 실행되어 민감한 문자열이 로컬 환경을 절대 떠나지 않도록 보장합니다.",
        
        json_h1: "고성능 JSON 분석 및 포맷팅",
        json_p: "JSON 페이로드를 검증, 구조화 및 최적화합니다. 밀리초 단위의 대기 시간으로 대규모 API 응답을 처리하도록 설계되었습니다.",
        
        jwt_h1: "보안 JWT 디버거 및 디코더",
        jwt_p: "JSON 웹 토큰을 로컬에서 디코딩합니다. 외부 서버에 민감한 토큰을 노출하지 않고 헤더, 페이로드 및 서명을 검사합니다.",

        url_h1: "심층 URL 파서 및 분석기",
        url_p: "복잡한 URL을 기본 구성 요소로 분해합니다. 디버깅 및 SEO 최적화를 위해 프로토콜, 쿼리 매개변수 및 프래그먼트를 분석합니다.",

        css_h1: "최신 CSS 포맷터 및 압축기",
        css_p: "스타일시트를 정제하고 최적화합니다. 개발을 위해 정렬하거나 프로덕션 배포를 위해 압축합니다.",

        sql_h1: "시맨틱 SQL 포맷터",
        sql_p: "지저분한 SQL 쿼리를 읽기 쉽고 구조화된 문장으로 변환합니다. 더 나은 데이터베이스 관리를 위해 다양한 SQL 방언을 지원합니다.",

        xml_h1: "전문적인 XML 포맷터 및 뷰티파이어",
        xml_p: "복잡한 XML, SVG 또는 RSS 데이터를 깨끗하고 계층적인 구조로 변환합니다. 로컬 파서를 통해 민감한 데이터를 안전하게 보호합니다.",

        yaml_h1: "전문적인 YAML 파서 및 변환기",
        yaml_p: "YAML 데이터를 검증, 포맷팅 및 JSON으로 변환합니다. Kubernetes 설정, CI/CD 파이프라인 및 애플리케이션 설정 디버깅에 최적화되어 있습니다.",

        base64_h1: "고급 Base64 이미지 재구성",
        base64_p: "바이너리 인코딩된 이미지 데이터를 즉시 시각적 자산으로 렌더링합니다. 이 도구는 PNG, JPEG, SVG, WEBP를 포함한 다양한 MIME 유형을 지원하며, 정확도를 극대화하기 위해 브라우저의 기본 렌더링 파이프라인을 활용합니다.",
        
        html_h1: "시맨틱 HTML 포맷터 및 최적화 도구",
        html_p: "SEO와 유지보수성을 위해 마크업을 정제, 들여쓰기 및 검증합니다. 이 유틸리티는 복잡한 코드를 전문적이고 표준을 준수하는 HTML5로 변환합니다.",
        
        diff_h1: "지능형 텍스트 및 코드 차이점 분석기",
        diff_p: "코드 버전, API 페이로드 또는 텍스트 문서의 나란한 비교를 수행합니다. 우리의 알고리즘은 추가, 삭제 및 수정을 높은 정밀도로 강조 표시합니다.",
        
        resources_h1: "개발자 지식 베이스 및 기술 FAQ",
        resources_p: "일상적인 개발 주기를 지원하기 위해 웹 표준, 보안 프로토콜 및 데이터 엔지니어링 개념의 선별된 저장소입니다.",
        
        about_h1: "파스 유틸 소개",
        about_p: "현대적인 웹을 위한 전문 개발자 유틸리티.",

        privacy_h1: "개인정보 처리방침",
        privacy_p: "최종 업데이트: 2026년 5월",

        terms_h1: "서비스 이용약관",
        terms_p: "유틸리티를 사용하기 전에 이 약관을 주의 깊게 읽어주세요.",

        guides_h1: "개발자 가이드 및 리소스",
        guides_p: "웹 개발 및 데이터 처리를 마스터하는 데 도움이 되는 심층 기술 기사입니다. 모든 콘텐츠는 독창적이며 기술적으로 검증되었습니다.",

        news_h1: "새로운 소식 및 공지사항",
        news_p: "Parse Utils 팀의 최신 개선 사항, 새로운 도구 및 기술 공지사항을 확인하세요.",

        contact_h1: "문의 및 커뮤니티",
        contact_p: "개발자 커뮤니티와 소통하거나 의견을 공유하세요.",

        btn_copy: "복사",
        btn_clear: "작업 공간 비우기",
        btn_clear_panel: "패널 비우기",
        btn_prettify: "정렬하기",
        btn_sort: "키 정렬",
        btn_minify: "압축하기",
        btn_apply: "입력창에 적용",
        btn_download: "재구성된 이미지 내보내기",
        btn_read_more: "전체 기사 읽기",
        btn_back_guides: "가이드로 돌아가기",
        
        label_main_input: "메인 입력 (소스 문자열)",
        label_characters: "글자 수:",
        label_words: "단어 수:",
        label_lines: "줄 수:",
        label_entropy: "엔트로피:",
        
        placeholder_encoder: "원시 텍스트, Base64 또는 URL 인코딩된 문자열을 입력하세요...",
        placeholder_json: "여기에 포맷되지 않은 JSON을 붙여넣으세요...",
        placeholder_jwt: "여기에 JWT를 붙여넣으세요 (header.payload.signature)...",
        placeholder_url: "여기에 URL을 붙여넣으세요 (https://example.com/path?query=val)...",
        placeholder_css: "여기에 CSS를 붙여넣으세요...",
        placeholder_sql: "여기에 SQL을 붙여넣으세요...",
        placeholder_xml: "여기에 XML을 붙여넣으세요...",
        placeholder_yaml: "여기에 YAML을 붙여넣으세요...",
        placeholder_base64: "여기에 원시 Base64 이미지 데이터를 붙여넣으세요...",
        placeholder_html: "여기에 HTML, SVG 또는 XML 스니펫을 붙여넣으세요...",
        placeholder_diff_orig: "원본 내용...",
        placeholder_diff_mod: "수정된 내용...",
        
        cookie_text: "우리는 콘텐츠와 광고를 개인화하고 트래픽을 분석하기 위해 쿠키를 사용합니다. 또한 귀하의 사이트 이용 정보를 광고 및 분석 파트너와 공유합니다. ",
        cookie_learn_more: "자세히 알아보기",
        cookie_accept: "모두 수락",
        cookie_decline: "거부",

        footer_copyright: "© 2026 Parse Utils - 현대적인 엔지니어링을 위한 정밀 도구. 모든 권리 보유.",
        footer_transform: "데이터 변환 도구",
        footer_analysis: "분석 및 포맷팅",
        footer_trust: "신뢰 및 투명성"
    }
};

export function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    document.documentElement.lang = lang;
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? 'KO' : 'EN';
    }
}
