# Blueprint: Parse Utils - Professional Developer Utilities & Learning Hub

## 1. Overview
Parse Utils is a high-performance, decentralized developer utility platform. It provides a robust suite of tools for data transformation and analysis, executing entirely within the user's browser environment. This architecture ensures maximum data sovereignty and privacy, as sensitive payloads never traverse the network.

## 2. Comprehensive Feature Set
*   **Multi-Language Interface:** Dynamic English and Korean localization with persistent user preference storage.
*   **String Transformation Engine:** Multi-format encoding (URL, HTML, Unicode), binary stream analysis, and naming convention normalization (camelCase, snake_case).
*   **Visual Data Reconstruction:** Advanced Base64 to Image converter supporting PNG, JPEG, SVG, and WEBP MIME-type inferencing.
*   **Expanded Parser Suite:** 
    *   **JSON Analytics:** Strict validation, key sorting, and minification.
    *   **JWT Decoder:** Local decoding of headers and payloads.
    *   **URL Parser:** Breakdown of complex URLs into components.
    *   **XML/SVG/RSS Formatter:** Hierarchical structuring and minification of XML-based data.
    *   **YAML Parser & Converter:** Validation, formatting, and YAML-to-JSON conversion utilizing `js-yaml`.
    *   **CSS/HTML Formatter:** Prettifying and minification of stylesheets and markup.
    *   **SQL Formatter:** Semantic restructuring of SQL queries.
*   **Intelligent Delta Analysis:** Precision side-by-side text/code comparison utilizing client-side diffing algorithms.
*   **Technical Learning Hub:** A collection of in-depth, long-form articles (1,000+ words each) on web security (XSS, CSP), API debugging, and data standards (Base64, JSON).
*   **Responsive Navigation:** Optimized navigation with "Parsers" and "More" dropdowns for a clean, developer-focused UI.

## 3. AdSense & Quality Compliance Strategy (Enhanced)
*   **High-Density Content:** Targeting 10-15 deep-dive technical articles (1,000+ words each) to demonstrate authority and expertise.
*   **Professional Structure:** All articles follow a strict Introduction -> Deep Dive -> Conclusion structure with H2/H3 semantic tagging.
*   **News & Updates Section:** Addition of a "Notice" or "What's New" section to show site activity and freshness.
*   **Legal Transparency:** Comprehensive Privacy Policy, Terms of Service, and About pages are already implemented and will be maintained.
*   **Localization Excellence:** Ensuring all new content is perfectly translated in KO and EN to reach a broader audience.
*   **Zero Empty States:** Removing or populating all placeholder sections to ensure the site feels "complete" to crawlers.

## 4. Architectural Design
*   **Modular View System:** Content is segmented into "HTML units" within the `views/` directory, loaded dynamically via Fetch API to reduce file complexity.
*   **Lazy-Loaded Initialization:** JavaScript logic for each tool is initialized only when the corresponding view is first loaded, optimizing memory usage.
*   **Internationalization (i18n) Engine:** Centralized translation dictionary (js/i18n.js) with dynamic DOM injection, compatible with dynamically loaded content.
*   **Hash-Based Routing:** Robust navigation system in `main.js` that handles asynchronous view loading and deep-linking.
*   **Modular Article System:** Centralized article data (js/guides.js) with language-aware injection.

## 5. Design & Identity
*   **Typography:** Precision-focused Inter (UI) and JetBrains Mono (Code) pairings.
*   **Adaptive Theme:** Persistent system-preferred or manual light/dark mode selection.
*   **Bilingual Toggle:** Integrated language switcher for instant global accessibility.

## 6. Implementation Plan (Current Status)
1.  **[DONE] Core Tools:** Encoder, JSON Parser, Base64 to Image, HTML Formatter, Diff Checker.
2.  **[DONE] Parser Expansion:** Added JWT, URL, XML, YAML, CSS, and SQL tools.
3.  **[DONE] UI Refactor:** Implemented dropdown navigation and shortened menu names.
4.  **[DONE] Modularization:** Split monolithic index.html into separate view files for better maintainability.
5.  **Content Expansion:** Expand existing 4 articles and add 6 new high-value guides.
6.  **Glossary Expansion:** Increase the technical glossary to 20+ terms.
