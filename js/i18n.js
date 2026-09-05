export const translations = {
    en: {
        // Navigation
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
        nav_utilities: "Utilities",
        nav_curl: "cURL Converter",
        nav_hash: "Hash & HMAC",
        nav_cron: "Cron Explainer",
        nav_timestamp: "Timestamp",
        nav_regex: "Regex Tester",
        nav_status_codes: "HTTP Status Codes",
        nav_parsers: "Parsers",
        nav_guides: "Guides",
        nav_resources: "Resources",
        nav_about: "About",
        nav_privacy: "Privacy",
        nav_contact: "Contact",
        nav_news: "News",
        nav_terms: "Terms",
        nav_glossary: "Glossary",

        // Common Buttons & Labels
        btn_copy: "Copy",
        btn_clear: "Clear Workspace",
        btn_clear_panel: "Clear Panel",
        btn_clear_input: "Clear Input",
        btn_prettify: "Prettify",
        btn_sort: "Sort Keys",
        btn_minify: "Minify / Compress",
        btn_apply: "Push to Input",
        btn_download: "Export Image",
        btn_read_more: "Read Full Article",
        btn_back_guides: "Back to Guides",
        btn_parse: "Parse",
        btn_decode: "Decode",
        btn_set_now: "Set to Current Time",
        btn_send_msg: "Send Message",
        btn_reset: "Reset",

        label_main_input: "Main Input (Source String)",
        label_characters: "Characters:",
        label_words: "Words:",
        label_lines: "Lines:",
        label_entropy: "Entropy:",
        label_raw_json: "Raw JSON Payload",
        label_output_json: "Restructured Output",
        label_jwt_token: "JWT Token",
        label_decoded_content: "Decoded Contents",
        label_source_url: "Source URL",
        label_url_components: "URL Components (JSON Output)",
        label_raw_css: "Raw CSS Input",
        label_optimized_css: "Optimized CSS Output",
        label_raw_sql: "Raw SQL Query",
        label_structured_sql: "Structured Statement",
        label_raw_xml: "Raw XML / SVG Source",
        label_beautified_xml: "Beautified XML Output",
        label_source_yaml: "Source YAML",
        label_processed_output: "Processed Output",
        label_raw_markup: "Raw Markup Source",
        label_standardized_markup: "Standardized Output",
        label_original_source: "Original Source (Baseline)",
        label_modified_source: "Modified Version (Comparison)",
        label_diff_analysis: "Structural Delta Analysis",
        label_b64_stream: "Base64 Data Stream",
        label_visual_reconstruct: "Visual Reconstruction",

        label_curl_input: "Raw cURL Command",
        label_target_code: "Target Language Code",
        label_input_msg: "Input Message / Payload",
        label_hmac_key: "Optional HMAC Secret Key",
        label_computed_hashes: "Computed Hashes & Digests",
        label_cron_input: "Cron Expression (5 Fields: Minute Hour Day Month Weekday)",
        label_cron_explanation: "Human-Readable Schedule Explanation",
        label_cron_next_runs: "Next 5 Scheduled Executions",
        label_live_clock: "Current Live Unix Epoch Clock",
        label_convert_ts: "Convert Timestamp / Date Input",
        label_converted_formats: "Converted Time Formats",
        label_iso_string: "ISO 8601 Standard String",
        label_utc_string: "UTC GMT String",
        label_kst_string: "Korea Standard Time (KST / UTC+9)",
        label_relative_time: "Relative Time Elapsed",
        label_regex_pattern: "Regex Pattern & Flags",
        label_sample_text: "Test String / Sample Text",
        label_match_results: "Match Results & Capture Groups",
        label_matches_summary: "Matches Summary (JSON)",

        // Headers & Descriptions
        encoder_h1: "Professional String Encoder & Decoder",
        encoder_p: "A multi-format transformation engine designed for secure, real-time data processing. All logic executes within your browser's V8 engine.",
        
        json_h1: "High-Performance JSON Analytics & Formatting",
        json_p: "Validate, restructure, and optimize your JavaScript Object Notation payloads with millisecond latency.",
        
        jwt_h1: "Secure JWT Debugger & Decoder",
        jwt_p: "Decode JSON Web Tokens locally. Inspect headers, payloads, and signatures without exposing sensitive tokens.",

        url_h1: "Deep URL Parser & Analyzer",
        url_p: "Deconstruct complex URLs into protocol schemes, hostname authorities, query parameters, and fragments.",

        css_h1: "Modern CSS Formatter & Minifier",
        css_p: "Format, structure, and optimize your Cascading Style Sheets (CSS). Prettify for development or minify for production.",

        sql_h1: "Semantic SQL Formatter & Query Prettifier",
        sql_p: "Transform complex SQL queries into clean, standardized, and readable statements.",

        xml_h1: "Professional XML Formatter & Beautifier",
        xml_p: "Transform cluttered XML documents, SVG vector graphics, and RSS feeds into clean hierarchical structures.",

        yaml_h1: "Professional YAML Parser & JSON Converter",
        yaml_p: "Validate, format, and convert YAML data to JSON. Perfect for Kubernetes configs and CI/CD pipelines.",

        base64_h1: "Advanced Base64 to Image Reconstruction Tool",
        base64_p: "Instantly decode and render binary Base64 strings into visual image assets (PNG, JPEG, SVG, WebP).",
        
        html_h1: "Semantic HTML Formatter & Document Optimizer",
        html_p: "Cleanse, indent, and validate your HTML markup for better SEO, accessibility, and Core Web Vitals performance.",
        
        diff_h1: "Intelligent Text & Code Diff Checker",
        diff_p: "Perform line-by-line and character-by-character comparisons of code versions, API payloads, or text documents.",

        curl_h1: "cURL Command to Code Converter",
        curl_p: "Parse raw cURL commands from browser DevTools, Postman, or terminal into clean executable code snippets.",

        hash_h1: "Cryptographic Hash & HMAC Generator",
        hash_p: "Generate cryptographic hashes (SHA-256, SHA-512, SHA-1, MD5) and HMAC signatures locally using the Web Crypto API.",

        cron_h1: "Cron Expression Explainer & Generator",
        cron_p: "Parse 5-part standard Cron expressions into plain human-readable sentences and calculate future execution timelines.",

        timestamp_h1: "Unix Timestamp & Epoch Timezone Converter",
        timestamp_p: "Convert Unix Epoch timestamps (seconds & milliseconds) into ISO 8601, UTC, and KST (Korea Standard Time) formats.",

        regex_h1: "Regex (Regular Expression) Tester & Cheatsheet",
        regex_p: "Test and debug regular expressions in real-time with pattern matching, capture group analysis, and presets.",

        status_h1: "HTTP Status Codes Reference & Troubleshooting Guide",
        status_p: "A comprehensive developer reference of 1xx, 2xx, 3xx, 4xx, and 5xx HTTP response status codes.",

        resources_h1: "Developer Knowledge Base & Technical FAQ",
        resources_p: "A curated repository of web standards, security protocols, and data engineering concepts.",

        glossary_h1: "Technical Glossary",
        glossary_p: "A comprehensive directory of modern web development and data engineering terminology.",

        about_h1: "About Parse Utils",
        about_p: "Professional Developer Utilities for the Modern Web.",

        privacy_h1: "Privacy Policy",
        privacy_p: "Last Updated: May 2026",

        terms_h1: "Terms of Service",
        terms_p: "Please read these terms carefully before using our utilities.",

        guides_h1: "Developer Guides & Resources",
        guides_p: "In-depth technical articles to help you master web development and data processing.",

        news_h1: "What's New & Site Notices",
        news_p: "Stay updated with the latest improvements and new tools from the Parse Utils team.",

        contact_h1: "Contact & Community",
        contact_p: "Get in touch or join the discussion with our developer community.",

        // Placeholders
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
        placeholder_curl: "Paste your cURL command here...",
        placeholder_hash: "Type or paste text to compute cryptographic hashes...",
        placeholder_cron: "e.g. */15 * * * *",
        placeholder_timestamp: "Paste Unix timestamp in seconds or milliseconds...",
        placeholder_regex_test: "Paste sample text to test regular expression matching...",
        placeholder_status_filter: "Search by status code or name (e.g. 401, Unauthorized)...",
        placeholder_glossary_filter: "Filter terms...",

        cookie_text: "We use cookies to personalize content and ads, and to analyze our traffic. We also share information about your use of our site with our advertising and analytics partners.",
        cookie_learn_more: "Learn more",
        cookie_accept: "Accept All",
        cookie_decline: "Decline",

        footer_copyright: "© 2026 Parse Utils - Precision Tools for Modern Engineering.",
        footer_transform: "Transformation Tools",
        footer_analysis: "Analysis & Formatting",
        footer_trust: "Trust & Transparency"
    },
    ko: {
        // Navigation
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
        nav_utilities: "유틸리티",
        nav_curl: "cURL 변환기",
        nav_hash: "해시 & HMAC",
        nav_cron: "Cron 해석기",
        nav_timestamp: "타임스탬프",
        nav_regex: "정규식 검증기",
        nav_status_codes: "HTTP 상태 코드",
        nav_parsers: "파서",
        nav_guides: "가이드",
        nav_resources: "리소스",
        nav_about: "정보",
        nav_privacy: "개인정보",
        nav_contact: "문의",
        nav_news: "소식",
        nav_terms: "약관",
        nav_glossary: "기술 용어집",

        // Common Buttons & Labels
        btn_copy: "복사",
        btn_clear: "작업 공간 비우기",
        btn_clear_panel: "패널 비우기",
        btn_clear_input: "입력창 비우기",
        btn_prettify: "정렬하기",
        btn_sort: "키 정렬",
        btn_minify: "압축하기",
        btn_apply: "입력창에 적용",
        btn_download: "이미지 내보내기",
        btn_read_more: "전체 기사 읽기",
        btn_back_guides: "가이드로 돌아가기",
        btn_parse: "파싱하기",
        btn_decode: "디코딩",
        btn_set_now: "현재 시각으로 설정",
        btn_send_msg: "메시지 전송",
        btn_reset: "초기화",

        label_main_input: "메인 입력 (소스 문자열)",
        label_characters: "글자 수:",
        label_words: "단어 수:",
        label_lines: "줄 수:",
        label_entropy: "엔트로피:",
        label_raw_json: "원시 JSON 페이로드",
        label_output_json: "구조화된 출력 결과",
        label_jwt_token: "JWT 토큰 문자열",
        label_decoded_content: "디코딩된 데이터 내용",
        label_source_url: "소스 URL 주소",
        label_url_components: "URL 구성 요소 (JSON 결과)",
        label_raw_css: "원시 CSS 입력",
        label_optimized_css: "최적화된 CSS 결과",
        label_raw_sql: "원시 SQL 쿼리",
        label_structured_sql: "구조화된 SQL 문장",
        label_raw_xml: "원시 XML / SVG 소스",
        label_beautified_xml: "정렬된 XML 결과",
        label_source_yaml: "소스 YAML 데이터",
        label_processed_output: "처리된 출력 결과",
        label_raw_markup: "원시 마크업 소스",
        label_standardized_markup: "표준화된 출력 결과",
        label_original_source: "원본 소스 (기준)",
        label_modified_source: "수정된 버전 (비교)",
        label_diff_analysis: "구조적 차이점 분석 결과",
        label_b64_stream: "Base64 데이터 스트림",
        label_visual_reconstruct: "시각적 이미지 재구성",

        label_curl_input: "원시 cURL 명령어 입력",
        label_target_code: "변환할 언어 소스코드",
        label_input_msg: "입력 메시지 / 페이로드",
        label_hmac_key: "선택 사항: HMAC 비밀키 (Secret Key)",
        label_computed_hashes: "계산된 암호화 해시 & 디제스트",
        label_cron_input: "Cron 표현식 (5자리: 분 시 일 월 요일)",
        label_cron_explanation: "한국어 실행 스케줄 해석 문장",
        label_cron_next_runs: "향후 5회 실행 예정 타임라인 (UTC)",
        label_live_clock: "현재 실시간 Unix Epoch 시계",
        label_convert_ts: "타임스탬프 / 날짜 변환 입력",
        label_converted_formats: "변환된 날짜/시간 형식",
        label_iso_string: "ISO 8601 표준 문자열",
        label_utc_string: "UTC GMT 시간 문자열",
        label_kst_string: "한국 표준시 (KST / UTC+9)",
        label_relative_time: "경과된 상대적 시간",
        label_regex_pattern: "정규식 패턴 & 플래그",
        label_sample_text: "테스트 텍스트 / 샘플 문자열",
        label_match_results: "매칭 결과 & 캡처 그룹 하이라이트",
        label_matches_summary: "매칭 요약 정보 (JSON)",

        // Headers & Descriptions
        encoder_h1: "전문적인 문자열 인코더 및 디코더",
        encoder_p: "실시간 데이터 처리를 위해 설계된 다중 형식 변환 엔진입니다. 모든 로직이 브라우저의 V8 엔진 내에서 실행되어 민감한 데이터가 안전하게 보호됩니다.",
        
        json_h1: "고성능 JSON 분석 및 포맷팅",
        json_p: "밀리초 단위의 빠른 속도로 JSON 페이로드를 검증, 구조화 및 최적화합니다.",
        
        jwt_h1: "보안 JWT 디버거 및 디코더",
        jwt_p: "JSON 웹 토큰을 로컬에서 디코딩합니다. 외부 서버에 민감한 토큰을 노출하지 않고 헤더, 페이로드 및 서명을 검사합니다.",

        url_h1: "심층 URL 파서 및 분석기",
        url_p: "복잡한 URL을 프로토콜, 호스트, 쿼리 매개변수 및 프래그먼트로 구성 요소를 해체하여 분석합니다.",

        css_h1: "최신 CSS 포맷터 및 압축기",
        css_p: "스타일시트를 정제하고 최적화합니다. 개발용으로 정렬하거나 프로덕션 배포용으로 압축합니다.",

        sql_h1: "시맨틱 SQL 포맷터 및 쿼리 정렬기",
        sql_p: "복잡하고 지저분한 SQL 쿼리를 읽기 쉽고 구조화된 정식 표준 문장으로 변환합니다.",

        xml_h1: "전문적인 XML 포맷터 및 뷰티파이어",
        xml_p: "복잡한 XML 문서, SVG 벡터 그래픽, RSS 피드를 깨끗하고 계층적인 구조로 변환합니다.",

        yaml_h1: "전문적인 YAML 파서 및 JSON 변환기",
        yaml_p: "YAML 데이터를 검증, 포맷팅 및 JSON으로 변환합니다. Kubernetes 설정 및 CI/CD 파이프라인 디버깅에 최적화되어 있습니다.",

        base64_h1: "고급 Base64 이미지 재구성 도구",
        base64_p: "바이너리 인코딩된 이미지 데이터를 PNG, JPEG, SVG, WebP 등 시각적 자산으로 즉시 렌더링합니다.",
        
        html_h1: "시맨틱 HTML 포맷터 및 마크업 최적화 도구",
        html_p: "SEO와 접근성을 위해 마크업을 정제, 들여쓰기 및 검증하여 전문적인 HTML5 표준 코드로 변환합니다.",
        
        diff_h1: "지능형 텍스트 및 코드 차이점 분석기",
        diff_p: "코드 버전, API 페이로드 또는 텍스트 문서의 줄 단위/글자 단위 나란히 비교를 수행합니다.",

        curl_h1: "cURL 명령어 소스코드 변환기",
        curl_p: "브라우저 개발자 도구, Postman, 터미널의 cURL 명령어를 해석하여 JavaScript, Python, Go 실행 코드로 변환합니다.",

        hash_h1: "암호화 해시 및 HMAC 생성기",
        hash_p: "Web Crypto API를 사용하여 브라우저 로컬 메모리에서 암호화 해시(SHA-256, SHA-512, SHA-1, MD5) 및 HMAC 서명을 생성합니다.",

        cron_h1: "Cron 표현식 해석기 및 생성기",
        cron_p: "표준 5자리 Cron 표현식을 쉬운 한국어 문장으로 해석하고 향후 실행 예정 타임라인 스케줄을 계산합니다.",

        timestamp_h1: "Unix 타임스탬프 및 타임존 변환기",
        timestamp_p: "Unix Epoch 타임스탬프(초/밀리초)를 ISO 8601, UTC, KST(한국 표준시) 형식으로 즉시 변환하며 실시간 에폭 시계를 제공합니다.",

        regex_h1: "정규표현식(Regex) 실시간 검증기 및 치트시트",
        regex_p: "패턴 일치 검증, 캡처 그룹 분석, 플래그 토글, 자주 사용하는 정규식 템플릿 프리셋으로 정규표현식을 실시간 테스트합니다.",

        status_h1: "HTTP 상태 코드 백과사전 및 트러블슈팅 가이드",
        status_p: "1xx, 2xx, 3xx, 4xx, 5xx HTTP 응답 상태 코드에 대한 포괄적인 원인 분석 및 프론트엔드/백엔드 조치 가이드를 제공합니다.",

        resources_h1: "개발자 지식 베이스 및 기술 FAQ",
        resources_p: "일상적인 개발 주기를 지원하기 위해 웹 표준, 보안 프로토콜 및 데이터 엔지니어링 개념의 선별된 저장소입니다.",

        glossary_h1: "기술 용어집",
        glossary_p: "현대적인 웹 개발 및 데이터 엔지니어링 용어에 대한 포괄적인 디렉토리입니다.",

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

        // Placeholders
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
        placeholder_curl: "여기에 cURL 명령어를 붙여넣으세요 (예: curl -X POST 'https://api.example.com')...",
        placeholder_hash: "암호화 해시를 계산할 텍스트를 입력하세요...",
        placeholder_cron: "예: */15 * * * *",
        placeholder_timestamp: "초 또는 밀리초 단위의 Unix 타임스탬프를 입력하세요...",
        placeholder_regex_test: "정규표현식 일치를 테스트할 텍스트를 입력하세요...",
        placeholder_status_filter: "상태 코드 또는 이름으로 검색 (예: 401, Unauthorized)...",
        placeholder_glossary_filter: "용어 필터링...",

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
