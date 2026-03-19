# Blueprint: Parse Utils - Modern Developer Utilities

## 1. Overview
Parse Utils is a comprehensive developer utility platform providing fast, secure, and reliable data transformations. All core processing happens entirely in the browser (client-side), ensuring sensitive data privacy. The application is built with vanilla HTML, CSS, and JavaScript, following modern web standards (Baseline).

## 2. Current Features
*   **Encoder/Decoder:** Real-time processing for URL Encode, HTML Escape, Unicode Escape, Base64, Binary, Hex, ROT13, Atbash, and Case transformations (camelCase/snake_case).
*   **JSON Parser & Formatter:** Validate, prettify (2-space), sort keys, and minify JSON data.
*   **HTML Formatter:** Prettify or minify HTML markup with intelligent tag nesting.
*   **Diff Checker:** Side-by-side text comparison with highlighted differences.
*   **REST API Tester:** Modern, full-featured tool for testing REST APIs with custom methods, headers, and body. Includes a proxy backend to bypass CORS restrictions.
*   **About/Privacy:** Information about the platform's mission and data handling.
*   **Contact/Community:** Integration with Disqus for comments and Formspree for private inquiries.

## 3. Implementation Details: REST API Tester
The REST API Tester provides a robust environment for testing web services directly from the browser.

### UI/UX Features
*   **Method Selection:** Support for GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD.
*   **URL & Params Sync:** Dedicated **Params** tab to manage query parameters. Changes in the URL sync with the params table and vice-versa.
*   **Authorization Type:** Support for No Auth, API Key, Bearer Token, and Basic Auth with dedicated configuration fields.
*   **Flexible Body:** Support for **None**, **Raw (JSON)**, and **Raw (Text)** body types.
*   **JSON Tools:** Built-in **Prettify** and **Sort** for JSON request bodies.
*   **Header Management:** Dynamic addition and removal of request headers.
*   **Response Monitoring:** Real-time display of status codes, execution time, response headers, and formatted body output.

### Proxy Architecture
A Node.js/Express backend (`server.js`) handles the requests to bypass CORS limitations. 

**Key improvements:**
*   **CORS Support:** The proxy server now includes `cors` middleware, allowing it to be called from any domain.
*   **Multi-method Support:** The `/api/proxy` endpoint now supports both `GET` and `POST` methods.
*   **Intuitive Request Routing:** The client (`main.js`) now uses `GET` for proxy calls when the target request is `GET` or `HEAD`, passing parameters via query string. For other methods (POST, PUT, etc.), it uses `POST` with a JSON body.
*   **SSL Verification Toggle:** Users can now toggle SSL certificate verification for target requests.

## 4. Design Guidelines
*   **Aesthetics:** Modern, clean, and interactive.
*   **Interactivity:** High-quality buttons, status badges, and tabbed components.
*   **Performance:** Fast execution and lightweight client-side logic.
*   **Accessibility:** Ensure all new components follow ARIA standards.
