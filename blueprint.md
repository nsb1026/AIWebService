# Blueprint: Parse Utils - Modern Developer Utilities

## 1. Overview
Parse Utils is a comprehensive developer utility platform providing fast, secure, and reliable data transformations. All core processing happens entirely in the browser (client-side), ensuring sensitive data privacy. The application is built with vanilla HTML, CSS, and JavaScript, following modern web standards (Baseline).

## 2. Current Features
*   **Encoder/Decoder:** Real-time processing for URL Encode, HTML Escape, Unicode Escape, Base64, Binary, Hex, ROT13, Atbash, and Case transformations (camelCase/snake_case).
*   **JSON Parser & Formatter:** Validate, prettify (2-space), sort keys, and minify JSON data.
*   **HTML Formatter:** Prettify or minify HTML markup with intelligent tag nesting.
*   **Diff Checker:** Side-by-side text comparison with highlighted differences.
*   **REST API Tester:** Modern, full-featured tool for testing REST APIs with custom methods, headers, and body. Includes a proxy backend to bypass CORS restrictions.
*   **Real-time Chat:** A collaborative space for developers to communicate in real-time using WebSockets.
*   **Guides & Articles:** A collection of high-value technical articles and "how-to" guides about web technologies, encoding, and API testing to provide unique, high-quality content for users and search engines.
*   **Professional About/Privacy:** Detailed information about the platform's mission, technical implementation, and a comprehensive privacy policy.
*   **Contact/Community:** Integration with Disqus for comments and Formspree for private inquiries.

## 3. AdSense Compliance & Content Strategy
To resolve "Low value content" and "No content" flags from Google AdSense, the platform implements:
*   **Technical Guides:** In-depth articles on topics like "Understanding Base64 Encoding," "JSON Best Practices," and "Debugging REST APIs."
*   **Tool Documentation:** Each utility now includes a "How to use" and "Technical details" section providing context beyond the interactive elements.
*   **Comprehensive Privacy Policy:** A detailed disclosure of data handling, cookies, and third-party integrations (AdSense, Disqus).
*   **Professional About Page:** A multi-section page describing the project's origin, the "client-side only" security model, and our commitment to developer privacy.

## 4. Implementation Details: REST API Tester
The REST API Tester provides a robust environment for testing web services directly from the browser.

### UI/UX Features
*   **Method Selection:** Support for GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD.
*   **URL Normalization:** Automatically prepends `https://` if the protocol is missing, ensuring valid requests even for simple domains like `google.com`.
*   **URL & Params Sync:** Bi-directional sync between the URL query string and the **Params** tab. Robust logic prevents premature clearing of the params list while typing.
*   **Authorization Type:** Support for No Auth, API Key, Bearer Token, and Basic Auth with dynamic UI toggles for configuration fields.
*   **Flexible Body:** Support for **None**, **Raw (JSON)**, and **Raw (Text)** body types with automatic `Content-Type` header management.
*   **JSON Tools:** Built-in **Prettify** and **Sort** for JSON request bodies.
*   **Header Management:** Dynamic addition and removal of request headers, with proper initialization for default rows.
*   **Response Monitoring:** Real-time display of status codes, execution time, response size, and headers.
*   **Response Views:** Multiple views for response data: **Pretty** (formatted JSON/Text), **Raw** (original response), **Preview** (HTML rendering in sandbox with `<base>` tag injection to fix relative links), and **Headers**.
*   **History:** Automatic persistence of the last 50 requests in local storage, allowing quick reloading of previous test configurations.
*   **Improved Interactivity:** Ensured all buttons have proper event listeners and are not blocked by layout overlaps using global `box-sizing: border-box`.

### Proxy Architecture & Cloudflare Compatibility
A Node.js/Express backend (`server.js`) handles the requests to bypass CORS limitations.

**Key improvements for Stability:**
*   **Always-POST Communication:** To avoid Cloudflare's URL length limits (414 Request-URI Too Large) and WAF triggers, the client always communicates with the proxy using a `POST` request with a JSON body, regardless of the target API's method.
*   **Browser-Mimicking Headers:** The proxy server now sends a modern Chrome `User-Agent` and other standard browser headers to avoid being blocked by target servers or WAFs.
*   **Header Filtering:** Sophisticated filtering of both request and response headers to remove restricted headers (like `Host`, `Connection`) and security headers (like `CSP`, `X-Frame-Options`) that might interfere with the browser's ability to display the results.
*   **SSL Verification Toggle:** Users can disable SSL certificate verification for testing local or self-signed services.

## 4. Tools Implementation
*   **Encoder/Decoder:** Fully implemented with real-time updates for URL, HTML, Unicode, Base64, Hex, Binary, ROT13, Atbash, and Case transforms.
*   **JSON Parser:** Support for prettifying, sorting, and minifying JSON with live validation.
*   **HTML Formatter:** Intelligent indentation logic for prettifying messy HTML code.
*   **Diff Checker:** Line-by-line comparison with visual highlighting of additions and removals.
*   **Real-time Chat:** Powered by Socket.io, allowing users to exchange messages instantly. It maintains a history of the last 30 messages for context upon joining.

## 4. Design Guidelines
*   **Aesthetics:** Modern, clean, and interactive.
*   **Interactivity:** High-quality buttons, status badges, and tabbed components.
*   **Performance:** Fast execution and lightweight client-side logic.
*   **Accessibility:** Ensure all new components follow ARIA standards.
