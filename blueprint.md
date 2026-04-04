# Blueprint: Parse Utils - Modern Developer Utilities

## 1. Overview
Parse Utils is a comprehensive developer utility platform providing fast, secure, and reliable data transformations. All core processing happens entirely in the browser (client-side), ensuring sensitive data privacy. The application is built with vanilla HTML, CSS, and JavaScript, following modern web standards (Baseline).

## 2. Current Features
*   **Encoder/Decoder:** Real-time processing for URL Encode, HTML Escape, Unicode Escape, Base64, Binary, Hex, ROT13, Atbash, and Case transformations (camelCase/snake_case).
*   **JSON Parser & Formatter:** Validate, prettify (2-space), sort keys, and minify JSON data.
*   **HTML Formatter:** Prettify or minify HTML markup with intelligent tag nesting.
*   **Diff Checker:** Side-by-side text comparison with highlighted differences.
*   **Theme Switcher:** Support for Light and Dark modes with persistent storage.
*   **Guides & Articles:** A collection of high-value technical articles and "how-to" guides about web technologies, encoding, and data processing.
*   **Professional About/Privacy:** Detailed information about the platform's mission, technical implementation, and a comprehensive privacy policy.
*   **Contact/Community:** Integration with Disqus for comments and Formspree for private inquiries.

## 3. Architecture & Design
*   **Zero-Dependency Core:** The application uses native Web APIs for all data processing.
*   **Theme Management:** CSS Custom Properties (Variables) and `data-theme` attribute are used for seamless Dark/Light mode transitions.
*   **Client-Side Security:** No user input data is sent to any server. Everything is processed in volatile memory.
*   **Responsive Layout:** A modern grid-based layout that adapts to various screen sizes.

## 4. Removed Features (Optimized for Stability)
*   **Real-time Chat:** Removed Socket.io dependency to prevent network errors and reduce bundle size.
*   **REST API Tester:** Removed non-functional proxy-dependent tool to maintain high quality standards and AdSense compliance.

## 5. Design Guidelines
*   **Aesthetics:** Modern, clean, and interactive.
*   **Interactivity:** High-quality buttons and immediate feedback.
*   **Performance:** Ultra-fast load times through vanilla JS and CSS.
*   **Accessibility:** ARIA standards compliance for all UI elements.
