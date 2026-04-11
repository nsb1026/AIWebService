# Blueprint: Parse Utils - Modern Developer Utilities

## 1. Overview
Parse Utils is a comprehensive developer utility platform providing fast, secure, and reliable data transformations. All core processing happens entirely in the browser (client-side), ensuring sensitive data privacy. The application is built with vanilla HTML, CSS, and JavaScript, following modern web standards (Baseline).

## 2. Current Features
*   **Encoder/Decoder:** Real-time processing for URL Encode, HTML Escape, Unicode Escape, Base64, Binary, Hex, ROT13, Atbash, and Case transformations (camelCase/snake_case).
*   **Base64 to Image:** Client-side conversion of Base64 strings into viewable and downloadable image files.
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

## 6. Current Task: Base64 to Image Tool
### Goal
Implement a client-side tool to convert Base64 strings (with or without data URI prefix) into viewable images that can be downloaded by the user.

### Action Plan
1.  **UI Addition:** Add "Base64 to Image" to the navigation menu and create a new dedicated view in `index.html`.
2.  **Implementation:** Create `js/base64-image.js` to handle the conversion logic.
3.  **Preview & Download:** Ensure the tool can automatically detect the data URI prefix or add it if missing. Provide a "Download Image" button.
4.  **Integration:** Initialize the tool in `main.js` and add styles to `style.css`.

## 4. Removed Features (Optimized for Stability)
*   **Real-time Chat:** Removed Socket.io dependency to prevent network errors and reduce bundle size.
*   **REST API Tester:** Removed non-functional proxy-dependent tool to maintain high quality standards and AdSense compliance.

## 5. Design Guidelines
*   **Aesthetics:** Modern, clean, and interactive.
*   **Interactivity:** High-quality buttons and immediate feedback.
*   **Performance:** Ultra-fast load times through vanilla JS and CSS.
*   **Accessibility:** ARIA standards compliance for all UI elements.
