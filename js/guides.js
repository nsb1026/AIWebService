// --- Guides Content & Logic ---
import { switchView } from './utils.js';

const guidesData = {
    'base64': {
        en: {
            title: 'Understanding Base64 Encoding: Deep Dive',
            content: `
                <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's one of the most common ways to transmit binary data over protocols that are designed to handle text, such as HTTP, SMTP, or even embedding data directly into HTML and CSS.</p>
                
                <h2>How Base64 Works Internally</h2>
                <p>The term "Base64" comes from the fact that it uses a set of 64 unique characters to represent data. These characters typically include:</p>
                <ul>
                    <li>Uppercase letters (A-Z)</li>
                    <li>Lowercase letters (a-z)</li>
                    <li>Numbers (0-9)</li>
                    <li>Two additional symbols (usually + and /)</li>
                    <li>The = character is used for padding at the end of the string</li>
                </ul>
                <p>Every three bytes of binary data (24 bits) are divided into four 6-bit chunks. Each 6-bit chunk is then mapped to one of the 64 characters in the Base64 alphabet. This process ensures that binary data can be handled by systems that might otherwise interpret certain binary sequences as control characters.</p>

                <div class="technical-note">
                    <strong>Developer Tip:</strong> The padding character (=) is used when the input data is not a multiple of 3 bytes. This allows the decoder to know exactly how many bits of data are trailing.
                </div>

                <blockquote>
                    Important: Base64 is <strong>NOT encryption</strong>. It is a form of encoding. Anyone can easily decode a Base64 string back to its original binary form using standard tools. Never use it to secure sensitive information like passwords or API keys.
                </blockquote>

                <h2>Common Use Cases in Modern Web Development</h2>
                <ol>
                    <li><strong>Data URIs:</strong> Embedding small images or fonts directly into HTML or CSS using <code>data:image/png;base64,...</code>. This reduces the number of HTTP requests, which can improve performance for sites with many small assets.</li>
                    <li><strong>Basic Authentication:</strong> Transmitting credentials in HTTP headers. While standard, this should always be done over encrypted HTTPS connections to prevent interception.</li>
                    <li><strong>Email Attachments:</strong> Legacy email systems often handle only 7-bit ASCII, so binary attachments must be encoded to pass through these systems safely.</li>
                    <li><strong>JSON & XML Payloads:</strong> Including binary data (like a small profile picture or a document) inside a JSON object or XML file where raw binary would break the structure.</li>
                </ol>

                <h2>Performance and Security Trade-offs</h2>
                <p>While Base64 is convenient, it comes with a significant cost. Encoding data into Base64 increases the file size by approximately <strong>33%</strong>. For large files, this overhead can significantly impact load times, memory usage, and bandwidth costs. As a rule of thumb, only use Base64 for very small assets (under 10KB) or when necessary for protocol compatibility.</p>
                <p>From a security perspective, always remember that Base64 is transparent. If you see a string starting with <code>eyJ</code>, it's almost certainly a Base64-encoded JSON object (like a JWT). Security through obscurity (like Base64 encoding a secret) is no security at all.</p>
            `
        },
        ko: {
            title: 'Base64 인코딩 이해하기: 심층 분석',
            content: `
                <p>Base64는 바이너리 데이터를 ASCII 문자열 형식으로 표현하는 이진-텍스트 인코딩 스키마입니다. 이는 HTTP, SMTP와 같이 텍스트를 처리하도록 설계된 프로토콜을 통해 바이너리 데이터를 전송하거나, HTML 및 CSS에 데이터를 직접 삽입하는 가장 일반적인 방법 중 하나입니다.</p>
                
                <h2>Base64의 내부 작동 원리</h2>
                <p>"Base64"라는 용어는 데이터를 표현하기 위해 64개의 고유한 문자 세트를 사용한다는 사실에서 유래되었습니다. 이러한 문자에는 일반적으로 다음이 포함됩니다:</p>
                <ul>
                    <li>대문자 (A-Z)</li>
                    <li>소문자 (a-z)</li>
                    <li>숫자 (0-9)</li>
                    <li>두 개의 추가 기호 (보통 + 및 /)</li>
                    <li>패딩을 위해 문자열 끝에 사용되는 = 문자</li>
                </ul>
                <p>바이너리 데이터의 모든 3바이트(24비트)는 4개의 6비트 청크로 나뉩니다. 각 6비트 청크는 Base64 알파벳의 64개 문자 중 하나에 매핑됩니다. 이 프로세스를 통해 바이너리 시퀀스를 제어 문자로 해석할 수 있는 시스템에서도 바이너리 데이터를 안전하게 처리할 수 있습니다.</p>

                <div class="technical-note">
                    <strong>개발자 팁:</strong> 패딩 문자(=)는 입력 데이터가 3바이트의 배수가 아닐 때 사용됩니다. 이를 통해 디코더는 마지막에 몇 비트의 데이터가 남아 있는지 정확히 알 수 있습니다.
                </div>

                <blockquote>
                    중요: Base64는 <strong>암호화가 아닙니다</strong>. 이는 인코딩의 한 형태일 뿐입니다. 누구나 표준 도구를 사용하여 Base64 문자열을 원래의 바이너리 형태로 쉽게 디코딩할 수 있습니다. 비밀번호나 API 키와 같은 민감한 정보를 보호하는 데 절대 사용하지 마세요.
                </blockquote>

                <h2>현대 웹 개발에서의 일반적인 사용 사례</h2>
                <ol>
                    <li><strong>데이터 URI (Data URIs):</strong> <code>data:image/png;base64,...</code>를 사용하여 작은 이미지나 폰트를 HTML 또는 CSS에 직접 삽입합니다. 이는 HTTP 요청 수를 줄여 작은 자산이 많은 사이트의 성능을 향상시킬 수 있습니다.</li>
                    <li><strong>기본 인증 (Basic Authentication):</strong> HTTP 헤더에 자격 증명을 전송합니다. 표준 방식이지만, 도청을 방지하기 위해 항상 암호화된 HTTPS 연결을 통해 수행해야 합니다.</li>
                    <li><strong>이메일 첨부 파일:</strong> 레거시 이메일 시스템은 7비트 ASCII만 처리하는 경우가 많으므로, 바이너리 첨부 파일은 이러한 시스템을 안전하게 통과하기 위해 인코딩되어야 합니다.</li>
                    <li><strong>JSON 및 XML 페이로드:</strong> 원시 바이너리가 구조를 깨뜨릴 수 있는 JSON 객체 또는 XML 파일 내부에 바이너리 데이터(예: 작은 프로필 사진 또는 문서)를 포함합니다.</li>
                </ol>

                <h2>성능 및 보안 고려 사항</h2>
                <p>Base64는 편리하지만 상당한 비용이 따릅니다. 데이터를 Base64로 인코딩하면 파일 크기가 약 <strong>33%</strong> 증가합니다. 대용량 파일의 경우 이러한 오버헤드는 로드 시간, 메모리 사용량 및 대역폭 비용에 상당한 영향을 미칠 수 있습니다. 일반적으로 10KB 미만의 매우 작은 자산에만 Base64를 사용하거나 프로토콜 호환성을 위해 필요한 경우에만 사용하는 것이 좋습니다.</p>
                <p>보안 관점에서 Base64는 투명하다는 점을 항상 기억하세요. <code>eyJ</code>로 시작하는 문자열을 본다면 그것은 거의 확실히 Base64로 인코딩된 JSON 객체(예: JWT)입니다. 비밀을 Base64 인코딩하는 것과 같은 모호함을 통한 보안은 전혀 보안이 아닙니다.</p>
            `
        }
    },
    'api-debugging': {
        en: {
            title: 'REST API Debugging: A Comprehensive Guide',
            content: `
                <p>Debugging APIs is a core skill for modern web developers. When a request fails, the cause can range from a simple typo in the URL to complex authentication issues, CORS restrictions, or server-side logic crashes.</p>
                
                <h2>1. Mastering HTTP Status Codes</h2>
                <p>HTTP status codes are the primary mechanism servers use to communicate the result of a request. Understanding the semantics of these codes can save hours of investigation:</p>
                <ul>
                    <li><strong>2xx (Success):</strong> <code>200 OK</code> (standard success), <code>201 Created</code> (resource created), <code>204 No Content</code> (success but no body to return).</li>
                    <li><strong>3xx (Redirection):</strong> <code>301 Moved Permanently</code>, <code>304 Not Modified</code> (use browser cache).</li>
                    <li><strong>4xx (Client Errors):</strong> The issue lies with the requester. <code>400 Bad Request</code> (syntax error in JSON), <code>401 Unauthorized</code> (missing credentials), <code>403 Forbidden</code> (authenticated but no permission), <code>404 Not Found</code>.</li>
                    <li><strong>5xx (Server Errors):</strong> The server failed to process a valid request. <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code> (upstream issue), <code>503 Service Unavailable</code> (overloaded).</li>
                </ul>

                <h2>2. Deep Inspection of Headers and Payload</h2>
                <p>Headers contain critical metadata that defines how data is exchanged. When debugging, pay close attention to:</p>
                <ul>
                    <li><code>Content-Type</code>: Does the server expect <code>application/json</code>, <code>application/x-www-form-urlencoded</code>, or <code>multipart/form-data</code>?</li>
                    <li><code>Accept</code>: Telling the server what format you can process.</li>
                    <li><code>Authorization</code>: Verify the <code>Bearer</code> token is valid and not expired.</li>
                    <li><code>CORS (Cross-Origin Resource Sharing)</code>: Look for <code>Access-Control-Allow-Origin</code> headers if your browser is blocking the request.</li>
                </ul>

                <h2>3. Essential Tooling for API Engineers</h2>
                <p>While browser developer tools are powerful, professional workflows often require more specialized environments:</p>
                <ol>
                    <li><strong>Browser Network Tab:</strong> Perfect for inspecting real-time traffic, timing, and response headers.</li>
                    <li><strong>Parse Utils Suite:</strong> Use our <strong>Encoder</strong> and <strong>JSON Parser</strong> to sanitize and validate payloads before sending them.</li>
                    <li><strong>CLI Tools (cURL):</strong> Essential for testing in server environments where a GUI is unavailable.</li>
                    <li><strong>Proxy Tools (Charles/Fiddler):</strong> For inspecting traffic from mobile apps or non-browser clients.</li>
                </ol>

                <blockquote>
                    Pro Tip: Always use a "Contract First" approach. Define your API specification (OpenAPI/Swagger) before writing code to ensure client and server stay in sync.
                </blockquote>
            `
        },
        ko: {
            title: 'REST API 디버깅: 포괄적 가이드',
            content: `
                <p>API 디버깅은 현대 웹 개발자의 핵심 기술입니다. 요청이 실패할 때 그 원인은 URL의 단순한 오타부터 복잡한 인증 문제, CORS 제한 또는 서버 측 로직 충돌까지 다양할 수 있습니다.</p>
                
                <h2>1. HTTP 상태 코드 마스터하기</h2>
                <p>HTTP 상태 코드는 서버가 요청 결과를 전달하는 데 사용하는 기본 메커니즘입니다. 이러한 코드의 의미를 이해하면 조사 시간을 수 시간 단축할 수 있습니다:</p>
                <ul>
                    <li><strong>2xx (성공):</strong> <code>200 OK</code> (표준 성공), <code>201 Created</code> (리소스 생성됨), <code>204 No Content</code> (성공했지만 반환할 본문이 없음).</li>
                    <li><strong>3xx (리다이렉션):</strong> <code>301 Moved Permanently</code>, <code>304 Not Modified</code> (브라우저 캐시 사용).</li>
                    <li><strong>4xx (클라이언트 오류):</strong> 요청자에게 문제가 있습니다. <code>400 Bad Request</code> (JSON 구문 오류), <code>401 Unauthorized</code> (자격 증명 누락), <code>403 Forbidden</code> (인증되었으나 권한 없음), <code>404 Not Found</code>.</li>
                    <li><strong>5xx (서버 오류):</strong> 서버가 유효한 요청을 처리하지 못했습니다. <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code> (업스트림 문제), <code>503 Service Unavailable</code> (과부하).</li>
                </ul>

                <h2>2. 헤더 및 페이로드 정밀 검사</h2>
                <p>헤더에는 데이터가 교환되는 방식을 정의하는 중요한 메타데이터가 포함되어 있습니다. 디버깅할 때 다음 사항에 주의를 기울이세요:</p>
                <ul>
                    <li><code>Content-Type</code>: 서버가 <code>application/json</code>, <code>application/x-www-form-urlencoded</code> 또는 <code>multipart/form-data</code>를 기대합니까?</li>
                    <li><code>Accept</code>: 처리할 수 있는 형식을 서버에 알립니다.</li>
                    <li><code>Authorization</code>: <code>Bearer</code> 토큰이 유효하고 만료되지 않았는지 확인합니다.</li>
                    <li><code>CORS (교차 출처 리소스 공유)</code>: 브라우저가 요청을 차단하는 경우 <code>Access-Control-Allow-Origin</code> 헤더를 확인하세요.</li>
                </ul>

                <h2>3. API 엔지니어를 위한 필수 도구</h2>
                <p>브라우저 개발자 도구는 강력하지만, 전문적인 워크플로우에는 더 전문화된 환경이 필요한 경우가 많습니다:</p>
                <ol>
                    <li><strong>브라우저 네트워크 탭:</strong> 실시간 트래픽, 타이밍 및 응답 헤더를 검사하는 데 적합합니다.</li>
                    <li><strong>Parse Utils Suite:</strong> 페이로드를 보내기 전에 <strong>인코더</strong> 및 <strong>JSON 파서</strong>를 사용하여 페이로드를 정리하고 검증하세요.</li>
                    <li><strong>CLI 도구 (cURL):</strong> GUI를 사용할 수 없는 서버 환경에서 테스트하는 데 필수적입니다.</li>
                </ol>

                <blockquote>
                    전문가 팁: 항상 "컨트랙트 우선(Contract First)" 접근 방식을 사용하세요. 코드를 작성하기 전에 API 사양(OpenAPI/Swagger)을 정의하여 클라이언트와 서버가 동기화된 상태를 유지하도록 하세요.
                </blockquote>
            `
        }
    },
    'json': {
        en: {
            title: 'JSON: Mastering the Backbone of Web Data',
            content: `
                <p>JSON (JavaScript Object Notation) has evolved from a simple subset of JavaScript into the world's most popular data interchange format. Its rise coincided with the decline of XML, driven by JSON's lightweight nature and native compatibility with modern programming languages.</p>
                
                <h2>The Structural Philosophy of JSON</h2>
                <p>JSON is built on two universal data structures:</p>
                <ul>
                    <li><strong>A collection of name/value pairs:</strong> Realized as an object, record, struct, or dictionary in various languages.</li>
                    <li><strong>An ordered list of values:</strong> Realized as an array, vector, list, or sequence.</li>
                </ul>

                <h2>Advanced Validation Concepts</h2>
                <p>Many developers treat JSON as a "loose" format, but the RFC 8259 specification is quite strict. Professional JSON management involves:</p>
                <ul>
                    <li><strong>Strict Typing:</strong> Distinguishing between integers and floating-point numbers, though JSON represents both as "numbers".</li>
                    <li><strong>Schema Validation:</strong> Using JSON Schema to define expected structures, mandatory fields, and data formats (e.g., email or date-time).</li>
                    <li><strong>Normalization:</strong> Alphabetizing keys to ensure deterministic signatures for caching or hashing.</li>
                </ul>

                <pre><code>// Optimized & Normalized JSON
{
  "api_version": "2.1",
  "data": {
    "id": 101,
    "status": "active"
  },
  "metadata": {
    "timestamp": "2026-05-11T12:00:00Z"
  }
}</code></pre>

                <h2>Minification vs. Beautification</h2>
                <p>While human-readable JSON is great for debugging, every byte counts in high-traffic APIs. <strong>Minification</strong> removes all insignificant whitespace, reducing the payload size significantly. For instance, a 100KB JSON file can often be reduced to 70KB just by stripping whitespace and newlines. Our <strong>JSON Parser</strong> provides a one-click solution for both operations.</p>
            `
        },
        ko: {
            title: 'JSON: 웹 데이터의 중추 마스터하기',
            content: `
                <p>JSON (JavaScript Object Notation)은 JavaScript의 단순한 하위 집합에서 세계에서 가장 인기 있는 데이터 교환 형식으로 진화했습니다. JSON의 부상은 XML의 쇠퇴와 맞물려 있으며, 이는 JSON의 가벼운 특성과 현대 프로그래밍 언어와의 기본 호환성에 의해 주도되었습니다.</p>
                
                <h2>JSON의 구조적 철학</h2>
                <p>JSON은 두 가지 보편적인 데이터 구조를 기반으로 합니다:</p>
                <ul>
                    <li><strong>이름/값 쌍의 컬렉션:</strong> 다양한 언어에서 객체, 레코드, 구조체 또는 딕셔너리로 구현됩니다.</li>
                    <li><strong>값의 정렬된 목록:</strong> 배열, 벡터, 리스트 또는 시퀀스로 구현됩니다.</li>
                </ul>

                <h2>고급 검증 개념</h2>
                <p>많은 개발자가 JSON을 "느슨한" 형식으로 취급하지만 RFC 8259 사양은 상당히 엄격합니다. 전문적인 JSON 관리에는 다음이 포함됩니다:</p>
                <ul>
                    <li><strong>엄격한 타이핑:</strong> 정수와 부동 소수점을 구분합니다(JSON은 둘 다 "숫자"로 표현하지만).</li>
                    <li><strong>스키마 검증:</strong> JSON Schema를 사용하여 예상 구조, 필수 필드 및 데이터 형식(예: 이메일 또는 날짜/시간)을 정의합니다.</li>
                    <li><strong>정규화 (Normalization):</strong> 캐싱 또는 해싱을 위한 결정론적 서명을 보장하기 위해 키를 알파벳 순으로 정렬합니다.</li>
                </ul>

                <pre><code>// 최적화 및 정규화된 JSON
{
  "api_version": "2.1",
  "data": {
    "id": 101,
    "status": "active"
  },
  "metadata": {
    "timestamp": "2026-05-11T12:00:00Z"
  }
}</code></pre>

                <h2>압축(Minification) vs. 가독성(Beautification)</h2>
                <p>가독성이 좋은 JSON은 디버깅에 좋지만, 트래픽이 많은 API에서는 모든 바이트가 중요합니다. <strong>압축(Minification)</strong>은 모든 무의미한 공백을 제거하여 페이로드 크기를 크게 줄입니다. 예를 들어, 100KB JSON 파일은 공백과 줄바꿈만 제거해도 70KB로 줄어드는 경우가 많습니다. 우리의 <strong>JSON 파서</strong>는 이 두 가지 작업을 위한 원클릭 솔루션을 제공합니다.</p>
            `
        }
    },
    'xss': {
        en: {
            title: 'Defensive Engineering: HTML Escaping & XSS',
            content: `
                <p>Cross-Site Scripting (XSS) remains one of the top security risks in web development. It allows attackers to inject malicious scripts into web pages viewed by other users. Understanding the defense mechanisms is critical for any full-stack engineer.</p>
                
                <h2>The Mechanics of an XSS Attack</h2>
                <p>There are three main types of XSS:</p>
                <ol>
                    <li><strong>Stored XSS:</strong> The malicious script is permanently stored on the target server (e.g., in a database or comment field).</li>
                    <li><strong>Reflected XSS:</strong> The script is "reflected" off a web application to the victim's browser, usually via a URL parameter.</li>
                    <li><strong>DOM-based XSS:</strong> The vulnerability exists in client-side code rather than server-side code.</li>
                </ol>

                <h2>The Role of HTML Escaping</h2>
                <p>HTML Escaping (or Output Encoding) is the process of converting special characters into their HTML entity equivalents. This ensures that the browser interprets the characters as text rather than as a signal to start an HTML tag or execute a script.</p>
                <ul>
                    <li><code>&lt;</code> (less than) &rarr; <code>&amp;lt;</code></li>
                    <li><code>&gt;</code> (greater than) &rarr; <code>&amp;gt;</code></li>
                    <li><code>&amp;</code> (ampersand) &rarr; <code>&amp;amp;</code></li>
                    <li><code>"</code> (double quote) &rarr; <code>&amp;quot;</code></li>
                </ul>

                <h2>Beyond Escaping: Content Security Policy (CSP)</h2>
                <p>While escaping is vital, a modern defense-in-depth strategy includes <strong>CSP</strong>. A Content Security Policy is an HTTP header that allows site operators to restrict the resources (such as JavaScript, CSS, Images) that a browser is allowed to load for a given page. This can prevent XSS attacks from successfully exfiltrating data even if an injection occurs.</p>

                <blockquote>
                    Security Rule: Always escape data based on the context. Data being placed in an HTML attribute requires different escaping than data being placed in a <code>&lt;script&gt;</code> block.
                </blockquote>
            `
        },
        ko: {
            title: '방어적 엔지니어링: HTML 이스케이핑 및 XSS',
            content: `
                <p>교차 사이트 스크립팅(XSS)은 웹 개발에서 여전히 최상위 보안 위험 중 하나입니다. 이를 통해 공격자는 다른 사용자가 보는 웹 페이지에 악성 스크립트를 삽입할 수 있습니다. 모든 풀스택 엔지니어에게 방어 메커니즘을 이해하는 것은 매우 중요합니다.</p>
                
                <h2>XSS 공격의 메커니즘</h2>
                <p>XSS에는 세 가지 주요 유형이 있습니다:</p>
                <ol>
                    <li><strong>저장형 XSS (Stored XSS):</strong> 악성 스크립트가 대상 서버에 영구적으로 저장됩니다(예: 데이터베이스 또는 댓글 필드).</li>
                    <li><strong>반사형 XSS (Reflected XSS):</strong> 스크립트가 주로 URL 매개변수를 통해 웹 애플리케이션에서 피해자의 브라우저로 "반사"됩니다.</li>
                    <li><strong>DOM 기반 XSS (DOM-based XSS):</strong> 취약점이 서버 측 코드가 아닌 클라이언트 측 코드에 존재합니다.</li>
                </ol>

                <h2>HTML 이스케이핑의 역할</h2>
                <p>HTML 이스케이핑(또는 출력 인코딩)은 특수 문자를 해당 HTML 엔티티로 변환하는 프로세스입니다. 이를 통해 브라우저는 문자를 HTML 태그를 시작하거나 스크립트를 실행하라는 신호가 아닌 텍스트로 해석하게 됩니다.</p>
                <ul>
                    <li><code>&lt;</code> (미만) &rarr; <code>&amp;lt;</code></li>
                    <li><code>&gt;</code> (초과) &rarr; <code>&amp;gt;</code></li>
                    <li><code>&amp;</code> (앰퍼샌드) &rarr; <code>&amp;amp;</code></li>
                    <li><code>"</code> (큰따옴표) &rarr; <code>&amp;quot;</code></li>
                </ul>

                <h2>이스케이핑 그 이상: 콘텐츠 보안 정책 (CSP)</h2>
                <p>이스케이핑도 중요하지만, 현대적인 심층 방어 전략에는 <strong>CSP</strong>가 포함됩니다. 콘텐츠 보안 정책은 사이트 운영자가 브라우저가 해당 페이지에 대해 로드할 수 있는 리소스(JavaScript, CSS, 이미지 등)를 제한할 수 있도록 하는 HTTP 헤더입니다. 이는 주입이 발생하더라도 XSS 공격이 성공적으로 데이터를 탈취하는 것을 방지할 수 있습니다.</p>

                <blockquote>
                    보안 규칙: 항상 컨텍스트에 따라 데이터를 이스케이트하세요. HTML 속성에 배치되는 데이터는 <code>&lt;script&gt;</code> 블록에 배치되는 데이터와 다른 이스케이핑이 필요합니다.
                </blockquote>
            `
        }
    },
    'security-checklist': {
        en: {
            title: 'Web Security Checklist for 2026',
            content: `
                <p>Building a secure web application requires a multi-layered approach. This checklist outlines the essential steps every developer should take to protect their users and infrastructure.</p>
                
                <h2>1. Communication Security</h2>
                <ul>
                    <li><strong>Enforce HTTPS:</strong> Use TLS 1.3 for all traffic. Obtain certificates from trusted authorities like Let's Encrypt.</li>
                    <li><strong>HSTS (HTTP Strict Transport Security):</strong> Tell browsers to only communicate with your site via HTTPS.</li>
                    <li><strong>Secure Cookies:</strong> Set the <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite=Strict</code> flags on all sensitive cookies.</li>
                </ul>

                <h2>2. Content Control</h2>
                <ul>
                    <li><strong>Content Security Policy (CSP):</strong> Implement a strict CSP to mitigate XSS and data injection attacks.</li>
                    <li><strong>X-Content-Type-Options:</strong> Set this header to <code>nosniff</code> to prevent the browser from interpreting files as a different MIME type.</li>
                    <li><strong>Permissions Policy:</strong> Restrict access to browser features like camera, microphone, and geolocation.</li>
                </ul>

                <h2>3. Authentication & Authorization</h2>
                <ul>
                    <li><strong>Multi-Factor Authentication (MFA):</strong> Encourage or require MFA for all user accounts.</li>
                    <li><strong>Password Hashing:</strong> Use modern algorithms like Argon2 or bcrypt. Never store passwords in plain text.</li>
                    <li><strong>JWT Security:</strong> Sign tokens with a strong secret or private key. Always set an expiration time (exp).</li>
                </ul>

                <div class="technical-note">
                    <strong>Note:</strong> Security is a process, not a destination. Regularly audit your dependencies and perform penetration testing to identify new vulnerabilities.
                </div>
            `
        },
        ko: {
            title: '2026년 웹 보안 체크리스트',
            content: `
                <p>안전한 웹 애플리케이션을 구축하려면 다층적인 접근 방식이 필요합니다. 이 체크리스트는 모든 개발자가 사용자 및 인프라를 보호하기 위해 취해야 할 필수 단계를 설명합니다.</p>
                
                <h2>1. 통신 보안</h2>
                <ul>
                    <li><strong>HTTPS 강제 적용:</strong> 모든 트래픽에 TLS 1.3을 사용하세요. Let's Encrypt와 같은 신뢰할 수 있는 기관에서 인증서를 받으세요.</li>
                    <li><strong>HSTS (HTTP Strict Transport Security):</strong> 브라우저가 HTTPS를 통해서만 사이트와 통신하도록 설정하세요.</li>
                    <li><strong>보안 쿠키:</strong> 모든 민감한 쿠키에 <code>Secure</code>, <code>HttpOnly</code>, <code>SameSite=Strict</code> 플래그를 설정하세요.</li>
                </ul>

                <h2>2. 콘텐츠 제어</h2>
                <ul>
                    <li><strong>콘텐츠 보안 정책 (CSP):</strong> XSS 및 데이터 주입 공격을 완화하기 위해 엄격한 CSP를 구현하세요.</li>
                    <li><strong>X-Content-Type-Options:</strong> 브라우저가 파일을 다른 MIME 유형으로 해석하지 못하도록 이 헤더를 <code>nosniff</code>로 설정하세요.</li>
                    <li><strong>권한 정책 (Permissions Policy):</strong> 카메라, 마이크, 위치 정보와 같은 브라우저 기능에 대한 액세스를 제한하세요.</li>
                </ul>

                <h2>3. 인증 및 권한 부여</h2>
                <ul>
                    <li><strong>다요소 인증 (MFA):</strong> 모든 사용자 계정에 대해 MFA를 권장하거나 요구하세요.</li>
                    <li><strong>비밀번호 해싱:</strong> Argon2 또는 bcrypt와 같은 현대적인 알고리즘을 사용하세요. 비밀번호를 일반 텍스트로 저장하지 마세요.</li>
                    <li><strong>JWT 보안:</strong> 강력한 비밀 키 또는 개인 키로 토큰을 서명하세요. 항상 만료 시간(exp)을 설정하세요.</li>
                </ul>

                <div class="technical-note">
                    <strong>참고:</strong> 보안은 목적지가 아니라 과정입니다. 정기적으로 종속성을 감사하고 침투 테스트를 수행하여 새로운 취약점을 식별하세요.
                </div>
            `
        }
    },
    'optimization': {
        en: {
            title: 'Minification vs. Compression: Performance Secrets',
            content: `
                <p>Web performance is a critical factor in user retention and SEO. Two common techniques used to improve speed are minification and compression. While they sound similar, they serve different purposes.</p>
                
                <h2>What is Minification?</h2>
                <p>Minification is the process of removing unnecessary characters from source code without changing its functionality. This includes:</p>
                <ul>
                    <li>Whitespace characters (spaces, tabs, newlines)</li>
                    <li>Comments</li>
                    <li>Block delimiters</li>
                    <li>Shortening variable names (obfuscation)</li>
                </ul>
                <p>Minification reduces the file size that needs to be downloaded, but the browser still parses the code as-is.</p>

                <h2>What is Compression?</h2>
                <p>Compression (like Gzip or Brotli) happens at the server level. The server compresses the file before sending it over the network, and the browser decompresses it before execution. This can reduce the transfer size by up to 70-90%.</p>

                <h2>Why You Need Both</h2>
                <p>Minification and compression work together. Minification cleans the code and prepares it for more efficient compression. For example, removing repetitive comments or long variable names allows compression algorithms to find more patterns and achieve higher ratios.</p>

                <blockquote>
                    Performance Tip: Use tools like our <strong>HTML Formatter</strong> (which includes a minification engine) as part of your build pipeline to ensure your assets are as lean as possible.
                </blockquote>
            `
        },
        ko: {
            title: '압축(Minification) vs. 압축(Compression): 성능의 비밀',
            content: `
                <p>웹 성능은 사용자 유지 및 SEO의 핵심 요소입니다. 속도를 향상시키기 위해 사용되는 두 가지 일반적인 기술은 Minification과 Compression입니다. 비슷하게 들리지만 목적은 다릅니다.</p>
                
                <h2>Minification이란 무엇인가요?</h2>
                <p>Minification은 기능을 변경하지 않고 소스 코드에서 불필요한 문자를 제거하는 프로세스입니다. 여기에는 다음이 포함됩니다:</p>
                <ul>
                    <li>공백 문자 (공백, 탭, 줄바꿈)</li>
                    <li>주석</li>
                    <li>블록 구분 기호</li>
                    <li>변수 이름 축소 (난독화)</li>
                </ul>
                <p>Minification은 다운로드해야 하는 파일 크기를 줄여주지만, 브라우저는 여전히 코드를 그대로 파싱합니다.</p>

                <h2>Compression이란 무엇인가요?</h2>
                <p>Compression (Gzip 또는 Brotli 등)은 서버 수준에서 발생합니다. 서버는 네트워크를 통해 파일을 보내기 전에 파일을 압축하고, 브라우저는 실행 전에 압축을 해제합니다. 이는 전송 크기를 70-90%까지 줄일 수 있습니다.</p>

                <h2>왜 둘 다 필요한가요?</h2>
                <p>Minification과 Compression은 함께 작동합니다. Minification은 코드를 정리하고 더 효율적인 압축을 위해 준비합니다. 예를 들어, 반복되는 주석이나 긴 변수 이름을 제거하면 압축 알고리즘이 더 많은 패턴을 찾아내어 더 높은 압축률을 달성할 수 있습니다.</p>

                <blockquote>
                    성능 팁: 빌드 파이프라인의 일부로 <strong>HTML 포맷터</strong>(압축 엔진 포함)와 같은 도구를 사용하여 자산을 최대한 가볍게 유지하세요.
                </blockquote>
            `
        }
    },
    'jwt-security': {
        en: {
            title: 'JWT Security Best Practices: Beyond Decoding',
            content: `
                <p>JSON Web Tokens (JWT) are a popular choice for stateless authentication. However, their simplicity can lead to dangerous security flaws if not implemented correctly.</p>
                
                <h2>1. Never Store Sensitive Data in the Payload</h2>
                <p>As our <strong>JWT Decoder</strong> demonstrates, the payload of a JWT is merely Base64Url encoded. It is <strong>not encrypted</strong>. Anyone who intercepts the token can read the payload. Never store passwords, social security numbers, or other PII (Personally Identifiable Information) in a JWT.</p>

                <h2>2. Use Strong Signing Algorithms</h2>
                <p>Always prefer asymmetric algorithms like <code>RS256</code> (RSA Signature with SHA-256) over symmetric ones like <code>HS256</code>. RS256 uses a private key to sign the token and a public key to verify it, which is much more secure for distributed systems.</p>

                <h2>3. Validate the 'exp' and 'iat' Claims</h2>
                <p>A JWT should always have an expiration time (<code>exp</code>). Without it, a stolen token could be used forever. Also, validate the "issued at" (<code>iat</code>) time to ensure the token is not being reused from an old session.</p>

                <h2>4. Handle Token Revocation</h2>
                <p>Since JWTs are stateless, revoking them before they expire is difficult. Common strategies include:</p>
                <ul>
                    <li>Short-lived access tokens and longer-lived refresh tokens.</li>
                    <li>A database "allow-list" or "deny-list" of active token IDs (jti).</li>
                    <li>Rotating signing keys periodically.</li>
                </ul>
            `
        },
        ko: {
            title: 'JWT 보안 모범 사례: 디코딩 그 이상',
            content: `
                <p>JSON 웹 토큰(JWT)은 상태 비저장(stateless) 인증에 널리 사용되는 선택지입니다. 하지만 제대로 구현하지 않으면 그 단순함이 위험한 보안 결함으로 이어질 수 있습니다.</p>
                
                <h2>1. 페이로드에 민감한 데이터를 저장하지 마세요</h2>
                <p>우리의 <strong>JWT 디코더</strong>가 보여주듯이, JWT의 페이로드는 단지 Base64Url로 인코딩된 것입니다. <strong>암호화된 것이 아닙니다</strong>. 토큰을 가로챈 사람은 누구나 페이로드를 읽을 수 있습니다. 비밀번호, 주민등록번호 또는 기타 PII(개인 식별 정보)를 JWT에 저장하지 마세요.</p>

                <h2>2. 강력한 서명 알고리즘 사용</h2>
                <p><code>HS256</code>과 같은 대칭형 알고리즘보다 <code>RS256</code>(SHA-256을 사용한 RSA 서명)과 같은 비대칭 알고리즘을 선호하세요. RS256은 개인 키를 사용하여 토큰에 서명하고 공개 키를 사용하여 검증하므로 분산 시스템에서 훨씬 더 안전합니다.</p>

                <h2>3. 'exp' 및 'iat' 클레임 검증</h2>
                <p>JWT에는 항상 만료 시간(<code>exp</code>)이 있어야 합니다. 이것이 없으면 도난당한 토큰이 영원히 사용될 수 있습니다. 또한 "발급 시간"(<code>iat</code>)을 검증하여 이전 세션의 토큰이 재사용되지 않도록 하세요.</p>

                <h2>4. 토큰 취소 처리</h2>
                <p>JWT는 상태 비저장이므로 만료되기 전에 취소하는 것이 어렵습니다. 일반적인 전략은 다음과 같습니다:</p>
                <ul>
                    <li>수명이 짧은 액세스 토큰과 수명이 긴 리프레시 토큰 사용.</li>
                    <li>활성 토큰 ID(jti)의 데이터베이스 "허용 목록" 또는 "거부 목록" 관리.</li>
                    <li>정기적으로 서명 키 교체.</li>
                </ul>
            `
        }
    },
    'sql-best-practices': {
        en: {
            title: 'SQL Formatting & Security: Preventing Injections',
            content: `
                <p>Structured Query Language (SQL) is the lifeblood of most data-driven applications. Maintaining clean SQL and preventing injections are two sides of the same coin: clarity and safety.</p>
                
                <h2>The Danger of SQL Injection</h2>
                <p>SQL Injection occurs when an attacker can interfere with the queries that an application makes to its database. This can result in unauthorized data access, deletion, or even full server takeover.</p>
                <p><strong>Wrong Way:</strong> <code>SELECT * FROM users WHERE id = ' + userInput + ';</code></p>
                <p><strong>Right Way (Prepared Statements):</strong> <code>SELECT * FROM users WHERE id = ?;</code></p>

                <h2>Why Semantic Formatting Matters</h2>
                <p>Clean SQL isn't just about aesthetics. Our <strong>SQL Formatter</strong> helps you identify structural issues in your queries by properly indenting JOINs, WHERE clauses, and subqueries. Well-formatted SQL is easier to review, which means security flaws are more likely to be caught during development.</p>

                <h2>Database Security Best Practices</h2>
                <ul>
                    <li><strong>Principle of Least Privilege:</strong> The database user used by your application should only have the permissions it absolutely needs.</li>
                    <li><strong>Input Validation:</strong> Never trust user input. Even with prepared statements, validate the type, length, and format of the data.</li>
                    <li><strong>Encryption at Rest:</strong> Ensure your database files are encrypted on the disk to protect against physical theft.</li>
                </ul>
            `
        },
        ko: {
            title: 'SQL 포맷팅 및 보안: 인젝션 방지',
            content: `
                <p>구조화된 쿼리 언어(SQL)는 대부분의 데이터 기반 애플리케이션의 핵심입니다. 깨끗한 SQL 유지와 인젝션 방지는 명확성과 안전이라는 동전의 양면과 같습니다.</p>
                
                <h2>SQL 인젝션의 위험성</h2>
                <p>SQL 인젝션은 공격자가 애플리케이션이 데이터베이스에 수행하는 쿼리를 방해할 수 있을 때 발생합니다. 이는 무단 데이터 액세스, 삭제 또는 서버 전체 장악으로 이어질 수 있습니다.</p>
                <p><strong>잘못된 방식:</strong> <code>SELECT * FROM users WHERE id = ' + userInput + ';</code></p>
                <p><strong>올바른 방식 (준비된 문구):</strong> <code>SELECT * FROM users WHERE id = ?;</code></p>

                <h2>시맨틱 포맷팅이 중요한 이유</h2>
                <p>깨끗한 SQL은 단순히 미적인 문제가 아닙니다. 우리의 <strong>SQL 포맷터</strong>는 JOIN, WHERE 절 및 서브쿼리를 적절하게 들여쓰기하여 쿼리의 구조적 문제를 식별하는 데 도움을 줍니다. 잘 포맷된 SQL은 검토하기 쉬우며, 이는 개발 과정에서 보안 결함이 발견될 가능성이 높음을 의미합니다.</p>

                <h2>데이터베이스 보안 모범 사례</h2>
                <ul>
                    <li><strong>최소 권한 원칙:</strong> 애플리케이션에서 사용하는 데이터베이스 사용자는 꼭 필요한 권한만 가져야 합니다.</li>
                    <li><strong>입력 검증:</strong> 사용자 입력을 절대 신뢰하지 마세요. 준비된 문구를 사용하더라도 데이터의 유형, 길이 및 형식을 검증하세요.</li>
                    <li><strong>저장 데이터 암호화:</strong> 물리적 도난으로부터 보호하기 위해 디스크의 데이터베이스 파일이 암호화되어 있는지 확인하세요.</li>
                </ul>
            `
        }
    },
    'url-encoding': {
        en: {
            title: 'Mastering URL Encoding (RFC 3986)',
            content: `
                <p>The Uniform Resource Locator (URL) is the address system of the web. Because URLs are sent over the network as plain text, certain characters have special meanings and must be encoded to avoid ambiguity.</p>
                
                <h2>Reserved vs. Unreserved Characters</h2>
                <p>RFC 3986 defines which characters are safe to use in a URL and which are reserved. Reserved characters like <code>?</code>, <code>&</code>, <code>=</code>, and <code>#</code> are used as delimiters for query parameters and fragments.</p>
                <p>If you need to include a reserved character as actual data (e.g., a search query containing an ampersand), it must be percent-encoded:</p>
                <ul>
                    <li><code>&</code> &rarr; <code>%26</code></li>
                    <li><code>=</code> &rarr; <code>%3D</code></li>
                    <li>Space &rarr; <code>%20</code> (or <code>+</code> in some contexts)</li>
                </ul>

                <h2>The Anatomy of a URL</h2>
                <p>Our <strong>URL Parser</strong> breaks down a URL into its constituent parts:</p>
                <ol>
                    <li><strong>Scheme:</strong> The protocol (e.g., <code>https</code>).</li>
                    <li><strong>Authority:</strong> The domain name and port.</li>
                    <li><strong>Path:</strong> The specific resource on the server.</li>
                    <li><strong>Query:</strong> Key-value pairs providing additional parameters.</li>
                    <li><strong>Fragment:</strong> An internal anchor within the resource.</li>
                </ol>

                <blockquote>
                    SEO Tip: Keep your URLs clean, descriptive, and use hyphens instead of underscores for better search engine indexing.
                </blockquote>
            `
        },
        ko: {
            title: 'URL 인코딩 마스터하기 (RFC 3986)',
            content: `
                <p>URL(Uniform Resource Locator)은 웹의 주소 체계입니다. URL은 네트워크를 통해 일반 텍스트로 전송되므로 일부 문자는 특별한 의미를 가지며 모호함을 피하기 위해 인코딩되어야 합니다.</p>
                
                <h2>예약된 문자 vs. 예약되지 않은 문자</h2>
                <p>RFC 3986은 URL에서 사용하기 안전한 문자와 예약된 문자를 정의합니다. <code>?</code>, <code>&</code>, <code>=</code>, <code>#</code>와 같은 예약된 문자는 쿼리 매개변수 및 프래그먼트의 구분 기호로 사용됩니다.</p>
                <p>예약된 문자를 실제 데이터로 포함해야 하는 경우(예: 앰퍼샌드가 포함된 검색 쿼리), 퍼센트 인코딩을 해야 합니다:</p>
                <ul>
                    <li><code>&</code> &rarr; <code>%26</code></li>
                    <li><code>=</code> &rarr; <code>%3D</code></li>
                    <li>공백 &rarr; <code>%20</code> (또는 일부 컨텍스트에서는 <code>+</code>)</li>
                </ul>

                <h2>URL의 구조</h2>
                <p>우리의 <strong>URL 파서</strong>는 URL을 다음과 같은 구성 요소로 분해합니다:</p>
                <ol>
                    <li><strong>Scheme:</strong> 프로토콜 (예: <code>https</code>).</li>
                    <li><strong>Authority:</strong> 도메인 이름 및 포트.</li>
                    <li><strong>Path:</strong> 서버의 특정 리소스.</li>
                    <li><strong>Query:</strong> 추가 매개변수를 제공하는 키-값 쌍.</li>
                    <li><strong>Fragment:</strong> 리소스 내의 내부 앵커.</li>
                </ol>

                <blockquote>
                    SEO 팁: 검색 엔진 인덱싱을 개선하려면 URL을 깨끗하고 설명적으로 유지하고 밑줄 대신 하이픈을 사용하세요.
                </blockquote>
            `
        }
    },
    'modern-css': {
        en: {
            title: 'Modern CSS Baseline: Container Queries & Beyond',
            content: `
                <p>CSS has undergone a revolution in recent years. Features that once required JavaScript are now natively supported in CSS, leading to better performance and more maintainable styles.</p>
                
                <h2>1. Container Queries (@container)</h2>
                <p>For a decade, we relied on media queries based on the viewport size. Container queries allow a component to respond to the size of its <strong>parent container</strong>. this is a game-changer for modular, reusable components.</p>

                <h2>2. The :has() Selector</h2>
                <p>Known as the "parent selector," <code>:has()</code> allows you to style an element based on its children. For example, you can style a form field differently if it contains an invalid input.</p>

                <h2>3. Logical Properties</h2>
                <p>Properties like <code>margin-inline-start</code> and <code>padding-block-end</code> allow your styles to adapt automatically to different writing modes (like Right-to-Left languages) without changing the CSS.</p>

                <h2>4. Modern Color Functions</h2>
                <p>Functions like <code>oklch()</code> provide access to a wider range of colors that are perceptually uniform, making it easier to create accessible color palettes.</p>

                <div class="technical-note">
                    <strong>Developer Tip:</strong> Use our <strong>CSS Formatter</strong> to keep your modern CSS organized and readable. We support the latest syntax, including nesting and custom properties.
                </div>
            `
        },
        ko: {
            title: '현대적인 CSS 베이스라인: 컨테이너 쿼리 그 이상',
            content: `
                <p>CSS는 최근 몇 년 동안 혁신을 거듭해 왔습니다. 한때 JavaScript가 필요했던 기능들이 이제 CSS에서 기본적으로 지원되어 더 나은 성능과 유지보수가 쉬운 스타일을 제공합니다.</p>
                
                <h2>1. 컨테이너 쿼리 (@container)</h2>
                <p>지난 10년 동안 우리는 뷰포트 크기에 따른 미디어 쿼리에 의존해 왔습니다. 컨테이너 쿼리는 구성 요소가 <strong>부모 컨테이너</strong>의 크기에 반응하도록 합니다. 이는 모듈식 재사용 가능 구성 요소의 게임 체인저입니다.</p>

                <h2>2. :has() 선택자</h2>
                <p>"부모 선택자"로 알려진 <code>:has()</code>를 사용하면 자식 요소를 기반으로 요소를 스타일링할 수 있습니다. 예를 들어, 유효하지 않은 입력이 포함된 경우 양식 필드를 다르게 스타일링할 수 있습니다.</p>

                <h2>3. 논리적 속성 (Logical Properties)</h2>
                <p><code>margin-inline-start</code> 및 <code>padding-block-end</code>와 같은 속성을 사용하면 CSS를 변경하지 않고도 다양한 쓰기 모드(예: 오른쪽에서 왼쪽으로 쓰는 언어)에 스타일을 자동으로 적응시킬 수 있습니다.</p>

                <h2>4. 현대적인 색상 함수</h2>
                <p><code>oklch()</code>와 같은 함수는 지각적으로 균일한 더 넓은 범위의 색상에 대한 액세스를 제공하여 접근성 있는 색상 팔레트를 더 쉽게 만들 수 있도록 합니다.</p>

                <div class="technical-note">
                    <strong>개발자 팁:</strong> 현대적인 CSS를 체계적이고 읽기 쉽게 유지하려면 우리의 <strong>CSS 포맷터</strong>를 사용하세요. 중첩 및 사용자 정의 속성을 포함한 최신 구문을 지원합니다.
                </div>
            `
        }
    },
    'core-web-vitals': {
        en: {
            title: 'Core Web Vitals: Measuring User Experience',
            content: `
                <p>In 2026, Core Web Vitals remain the most important metrics for measuring the real-world user experience of a web page. Google uses these signals as key ranking factors, making them essential for SEO and user retention.</p>
                
                <h2>1. Largest Contentful Paint (LCP)</h2>
                <p>LCP measures loading performance. To provide a good user experience, LCP should occur within <strong>2.5 seconds</strong> of when the page first starts loading.</p>

                <h2>2. Interaction to Next Paint (INP)</h2>
                <p>INP is the successor to FID (First Input Delay). It measures the overall responsiveness of a page to user interactions throughout its entire lifecycle. A good INP score is <strong>200 milliseconds</strong> or less.</p>

                <h2>3. Cumulative Layout Shift (CLS)</h2>
                <p>CLS measures visual stability. It quantifies how much the page layout "jumps" as resources load. A good CLS score is <strong>0.1</strong> or less.</p>

                <h2>Optimization Strategies</h2>
                <ul>
                    <li><strong>Image Optimization:</strong> Always include width and height attributes to prevent layout shifts. Use modern formats like WEBP or AVIF.</li>
                    <li><strong>Critical CSS:</strong> Inline the CSS required for above-the-fold content to improve LCP.</li>
                    <li><strong>JavaScript Execution:</strong> Break up long tasks to keep the main thread responsive, improving INP.</li>
                </ul>

                <div class="technical-note">
                    <strong>Note:</strong> You can test your site's Vitals using our <strong>Resource Hub</strong> links or directly in Chrome DevTools under the "Lighthouse" or "Performance" tabs.
                </div>
            `
        },
        ko: {
            title: '코어 웹 바이탈 (Core Web Vitals): 사용자 경험 측정하기',
            content: `
                <p>2026년에도 코어 웹 바이탈은 웹 페이지의 실제 사용자 경험을 측정하는 가장 중요한 지표로 남아 있습니다. 구글은 이러한 신호를 주요 랭킹 요소로 사용하므로 SEO와 사용자 유지에 필수적입니다.</p>
                
                <h2>1. 최대 콘텐츠풀 페인트 (LCP)</h2>
                <p>LCP는 로딩 성능을 측정합니다. 좋은 사용자 경험을 제공하려면 페이지 로딩 시작 후 <strong>2.5초</strong> 이내에 LCP가 발생해야 합니다.</p>

                <h2>2. 다음 페인트와의 상호작용 (INP)</h2>
                <p>INP는 FID(최초 입력 지연)의 후속 지표입니다. 전체 수명 동안 사용자 상호작용에 대한 페이지의 전반적인 응답성을 측정합니다. 좋은 INP 점수는 <strong>200밀리초</strong> 이하입니다.</p>

                <h2>3. 누적 레이아웃 이동 (CLS)</h2>
                <p>CLS는 시각적 안정성을 측정합니다. 리소스가 로드됨에 따라 페이지 레이아웃이 얼마나 "튀는지" 수치화합니다. 좋은 CLS 점수는 <strong>0.1</strong> 이하입니다.</p>

                <h2>최적화 전략</h2>
                <ul>
                    <li><strong>이미지 최적화:</strong> 레이아웃 이동을 방지하기 위해 항상 width와 height 속성을 포함하세요. WEBP 또는 AVIF와 같은 최신 형식을 사용하세요.</li>
                    <li><strong>Critical CSS:</strong> LCP를 개선하기 위해 페이지 상단(above-the-fold) 콘텐츠에 필요한 CSS를 인라인으로 처리하세요.</li>
                    <li><strong>JavaScript 실행:</strong> 메인 스레드의 응답성을 유지하여 INP를 개선하기 위해 긴 작업을 분할하세요.</li>
                </ul>

                <div class="technical-note">
                    <strong>참고:</strong> 우리의 <strong>리소스 허브</strong> 링크를 사용하거나 크롬 개발자 도구의 "Lighthouse" 또는 "Performance" 탭에서 직접 사이트의 바이탈을 테스트할 수 있습니다.
                </div>
            `
        }
    },
    'spring-boot-jwt': {
        en: {
            title: 'Spring Boot 3.3 + Java 21 LTS: Modern JWT Security Implementation Guide',
            content: `
                <p>In modern enterprise web architecture, stateless authentication using JSON Web Tokens (JWT) combined with <strong>Spring Boot 3.3.x</strong>, <strong>Spring Security 6.3.x</strong>, and <strong>Java 21 LTS</strong> represents the gold standard for microservices and RESTful API backends.</p>
                
                <h2>Technical Environment &amp; Architecture Overview</h2>
                <ul>
                    <li><strong>JDK Version:</strong> Java 21 LTS (Virtual Threads &amp; Pattern Matching)</li>
                    <li><strong>Framework:</strong> Spring Boot 3.3.x / Spring Framework 6.1.x</li>
                    <li><strong>Security Engine:</strong> Spring Security 6.3.x (Lambda DSL &amp; SecurityFilterChain)</li>
                    <li><strong>JWT Library:</strong> JJWT 0.12.5 (io.jsonwebtoken)</li>
                </ul>

                <h2>1. Dependency Configuration (build.gradle)</h2>
                <p>Add Spring Security and modern JJWT 0.12.5 dependencies to your <code>build.gradle</code> file:</p>
                <pre><code class="language-groovy">// [build.gradle] Spring Boot 3.3.0 & Java 21 LTS Project Dependencies Configuration
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0' // Spring Boot 3.3 Framework Plugin
    id 'io.spring.dependency-management' version '1.1.5' // Spring Dependency Management
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21) // Force JDK 21 LTS Toolchain
    }
}

dependencies {
    // Spring Boot Starter Web (Embedded Tomcat, RESTful APIs, Spring MVC)
    implementation 'org.springframework.boot:spring-boot-starter-web'
    // Spring Boot Starter Security (Authentication, Authorization, Filter Chains)
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // JJWT 0.12.5 Modern JWT Token Specification Libraries
    implementation 'io.jsonwebtoken:jjwt-api:0.12.5'     // JJWT API Interface Layer
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.5'    // JJWT Runtime Implementation
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.5' // Jackson JSON Parser integration
}</code></pre>

                <h2>2. Application Configuration (application.yml)</h2>
                <p>Define your 256-bit HMAC secret key and token expiration times in <code>application.yml</code>:</p>
                <pre><code class="language-yaml"># [application.yml] Spring Boot Environment & JWT Token Properties Configuration
jwt:
  # Secret key used for signing HMAC-SHA256 JWT signatures (Must be at least 256 bits / 32 characters)
  secret: "v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp"
  # Access Token Expiration Time: 1,800,000 ms = 30 Minutes
  access-token-expiration: 1800000   
  # Refresh Token Expiration Time: 604,800,000 ms = 7 Days
  refresh-token-expiration: 604800000</code></pre>

                <h2>3. JWT Utility Class (JwtTokenProvider.java)</h2>
                <p>Create a token provider using JJWT 0.12.x fluent builder and parser APIs:</p>
                <pre><code class="language-java">package com.example.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

// [@Component] Registered as a Spring Bean for JWT creation, validation, and parsing operations
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;          // HMAC-SHA Cryptographic Key Object
    private final long accessTokenExpiration;   // Token Lifespan in Milliseconds

    // Constructor Injection: Read YAML configuration values and generate SecretKey
    public JwtTokenProvider(
            @Value("\${jwt.secret}") String secret,
            @Value("\${jwt.access-token-expiration}") long accessTokenExpiration) {
        // Transform plain string secret into SecretKey object using Keys.hmacShaKeyFor
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = accessTokenExpiration;
    }

    // 1. Generate JWT Access Token (JJWT 0.12.x Fluent Builder API)
    public String createAccessToken(String username, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(username)                  // Registered claim 'sub': Username / User ID
                .claim("role", role)                // Custom claim: User Role (e.g. USER, ADMIN)
                .issuedAt(now)                      // Registered claim 'iat': Issue Timestamp
                .expiration(validity)               // Registered claim 'exp': Expiration Timestamp
                .signWith(secretKey)                // Sign with HMAC-SHA256 SecretKey
                .compact();                         // Compact claims into URL-safe JWT string
    }

    // 2. Validate JWT Signature & Expiration Date
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)          // Configure verification key
                    .build()
                    .parseSignedClaims(token);       // Parse and verify token signature/expiration
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token expired, signature tampered, malformed format, or unsupported algorithm
            return false;
        }
    }

    // 3. Extract Spring Security Authentication Object from Claims
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();                       // Retrieve verified Claims Payload

        String username = claims.getSubject();       // Extract subject (username)
        String role = claims.get("role", String.class); // Extract custom role claim
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        // Construct User Principal and UsernamePasswordAuthenticationToken for SecurityContext
        User principal = new User(username, "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }
}</code></pre>

                <h2>4. Custom Security Filter (JwtAuthenticationFilter.java)</h2>
                <p>Intercept HTTP requests to extract the Bearer token and populate the SecurityContext:</p>
                <pre><code class="language-java">package com.example.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// [OncePerRequestFilter] Guarantees single execution per HTTP request in Spring Security chain
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // Intercept incoming HTTP request, parse JWT, and store authentication in SecurityContext
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        // 1. Extract bearer token from HTTP Authorization header
        String token = resolveToken(request);

        // 2. Validate token presence and cryptographic integrity
        if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            // 3. Obtain Spring Security Authentication object from token claims
            Authentication auth = tokenProvider.getAuthentication(token);
            // 4. Store Authentication in SecurityContextHolder (Authenticates user for request lifecycle)
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 5. Continue execution to next filter in the security filter chain
        filterChain.doFilter(request, response);
    }

    // Extract Bearer token prefix ("Bearer <token>") from Authorization Header
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " prefix (7 characters)
        }
        return null;
    }
}</code></pre>

                <h2>5. Spring Security 6 Config (SecurityConfig.java)</h2>
                <p>Configure stateless session policy and register the JWT filter using Spring Security 6 Lambda DSL:</p>
                <pre><code class="language-java">package com.example.config;

import com.example.config.jwt.JwtAuthenticationFilter;
import com.example.config.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// [@Configuration & @EnableWebSecurity] Spring Security 6 Configuration Bean Class
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // [@Bean SecurityFilterChain] Configures HTTP Security, Session Policy, & URL Authorization rules
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF protection (Not needed for stateless REST APIs using JWT tokens)
            .csrf(csrf -> csrf.disable())
            // Configure Session Creation Policy as STATELESS (Do not create HTTP sessions)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Define Request Authorization rules using Spring Security 6.3 Lambda DSL
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/public/**").permitAll() // Public endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")        // Admin only endpoints
                .anyRequest().authenticated()                             // All other endpoints require JWT
            )
            // Add custom JwtAuthenticationFilter before default UsernamePasswordAuthenticationFilter
            .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // [@Bean PasswordEncoder] BCrypt Password Encoder for hashing and validating passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}</code></pre>

                <h2>6. Authentication Controller (AuthController.java)</h2>
                <p>Expose REST endpoints for authenticating user credentials and issuing JWT tokens:</p>
                <pre><code class="language-java">package com.example.controller;

import com.example.config.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// [@RestController] REST API Controller handling User Authentication & JWT token issuance
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider tokenProvider;

    public AuthController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // [POST /api/auth/login] Validates credentials and returns Bearer access token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // Simple authentication check (Replace with UserDetailsService / AuthenticationManager in production)
        if ("admin".equals(username) && "password123".equals(password)) {
            String token = tokenProvider.createAccessToken(username, "ADMIN");
            return ResponseEntity.ok(Map.of(
                "token_type", "Bearer",
                "access_token", token,
                "expires_in", 1800
            ));
        }

        // Return HTTP 401 Unauthorized for invalid credentials
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}</code></pre>
            `
        },
        ko: {
            title: 'Spring Boot 3.3 + Java 21 LTS: Spring Security 6 기반 JWT 토큰 인증 완전 정복 가이드',
            content: `
                <p>현대 엔터프라이즈 웹 아키텍처 및 마이크로서비스(MSA) 백엔드에서 <strong>Spring Boot 3.3.x</strong>, <strong>Spring Security 6.3.x</strong>, <strong>Java 21 LTS</strong> 및 무상태(Stateless) <strong>JWT 토큰 인증</strong> 조합은 가장 안정적이고 표준화된 보안 아키텍처입니다.</p>
                
                <h2>최신 기술 환경 명세 (2026 Baseline)</h2>
                <ul>
                    <li><strong>JDK 버전:</strong> Java 21 LTS (Virtual Threads, Pattern Matching, Sealed Classes 지원)</li>
                    <li><strong>프레임워크:</strong> Spring Boot 3.3.x / Spring Framework 6.1.x</li>
                    <li><strong>보안 엔진:</strong> Spring Security 6.3.x (Lambda DSL 및 SecurityFilterChain 빈 구성)</li>
                    <li><strong>JWT 라이브러리:</strong> io.jsonwebtoken (JJWT 0.12.5) - 최신 Fluent Builder/Parser API</li>
                </ul>

                <h2>1단계: 프로젝트 의존성 설정 (build.gradle)</h2>
                <p>최신 Spring Security 6 및 JJWT 0.12.5 라이브러리를 <code>build.gradle</code>에 추가합니다:</p>
                <pre><code class="language-groovy">// [build.gradle] Spring Boot 3.3.0 & Java 21 LTS 의존성 설정 파일
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'        // Spring Boot 3.3 프레임워크 플러그인
    id 'io.spring.dependency-management' version '1.1.5' // Spring 의존성 버전 관리
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21) // JDK 21 LTS 빌드 툴체인 강제 지정
    }
}

dependencies {
    // Spring Boot Starter Web (내장 톰캣, RESTful API 지원, Spring MVC)
    implementation 'org.springframework.boot:spring-boot-starter-web'
    // Spring Boot Starter Security (인증/인가 보안 프레임워크 및 필터 체인)
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // JJWT 0.12.5 최신 암호화 및 JWT 토큰 라이브러리 모듈
    implementation 'io.jsonwebtoken:jjwt-api:0.12.5'     // JJWT API 인터페이스
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.5'    // JJWT 런타임 구현체
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.5' // Jackson JSON 파서 연동
}</code></pre>

                <h2>2단계: application.yml 서명 키 및 만료시간 설정</h2>
                <p>최소 256비트 이상의 HMAC SHA-256 비밀키와 토큰 유효 기간을 설정합니다:</p>
                <pre><code class="language-yaml"># [application.yml] JWT 암호키 및 토큰 유효시간 설정
jwt:
  # HMAC-SHA256 암호화에 사용되는 256비트(32자 이상) 비밀키 문자열
  secret: "v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp"
  # Access Token 만료 시간: 1,800,000 밀리초 = 30분
  access-token-expiration: 1800000   
  # Refresh Token 만료 시간: 604,800,000 밀리초 = 7일
  refresh-token-expiration: 604800000</code></pre>

                <h2>3단계: JwtTokenProvider.java (토큰 생성, 검증 및 추출)</h2>
                <p>JJWT 0.12.x의 최신 파서 및 빌더 API를 사용하여 토큰 컴포넌트를 구현합니다:</p>
                <pre><code class="language-java">package com.example.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

// [@Component] Spring Container Bean으로 등록되어 토큰 생성, 검증, 파싱 기능 제공
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;          // HMAC-SHA 규격 암호화 키 객체
    private final long accessTokenExpiration;   // 토큰 유효시간 (밀리초)

    // 생성자 주입: application.yml에서 암호키와 유효시간을 읽어와 SecretKey 객체 생성
    public JwtTokenProvider(
            @Value("\${jwt.secret}") String secret,
            @Value("\${jwt.access-token-expiration}") long accessTokenExpiration) {
        // 문자열 키를 HMAC-SHA 비밀키 객체로 변환 (Keys.hmacShaKeyFor API)
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = accessTokenExpiration;
    }

    // 1. JWT Access Token 발급 (JJWT 0.12.x 빌더 패턴 적용)
    public String createAccessToken(String username, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(username)                  // Registered Claim 'sub': 사용자 식별자(ID)
                .claim("role", role)                // Custom Claim: 사용자 권한 (USER, ADMIN 등)
                .issuedAt(now)                      // Registered Claim 'iat': 발급 시각
                .expiration(validity)               // Registered Claim 'exp': 만료 시각
                .signWith(secretKey)                // 256비트 SecretKey로 디지털 서명 생성
                .compact();                         // URL-safe 형태의 JWT 토큰 문자열로 직렬화
    }

    // 2. JWT 서명 검증 및 만료 여부 판별
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)          // 검증할 HMAC SecretKey 설정
                    .build()
                    .parseSignedClaims(token);       // 토큰 서명 및 만료시간 검증 수행
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰 서명 위변조, 만료, 형식 오류 등 예외 발생 시 false 반환
            return false;
        }
    }

    // 3. 검증된 토큰 클레임(Claims)에서 Spring Security Authentication 인증 객체 추출
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();                       // 검증이 완료된 Payload(Claims) 반환

        String username = claims.getSubject();       // 사용자 ID 추출
        String role = claims.get("role", String.class); // 권한 정보 추출
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        // SecurityContext에 등록할 User Principal 및 UsernamePasswordAuthenticationToken 생성
        User principal = new User(username, "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }
}</code></pre>

                <h2>4단계: JwtAuthenticationFilter.java (Spring Security 커스텀 필터)</h2>
                <p>HTTP 요청 헤더의 <code>Authorization: Bearer &lt;token&gt;</code>을 추출하고 검증하여 보안 컨텍스트에 등록합니다:</p>
                <pre><code class="language-java">package com.example.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// [OncePerRequestFilter] 클라이언트의 매 HTTP 요청마다 단 1회만 전위 실행되는 보안 전처리 필터
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    // [의존성 주입] JWT 토큰 검증 및 Authentication 객체 생성을 담당하는 JwtTokenProvider 전달받음
    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // [필터 내부 동작 메서드] 요청 헤더에서 JWT를 검증하고 SecurityContextHolder에 인증 정보 등록
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        // 1. HTTP 요청의 'Authorization' 헤더에서 'Bearer <token>' 토큰 문자열 추출
        String token = resolveToken(request);

        // 2. 토큰이 존재하고 서명 및 만료일시 검증(validateToken)을 정상 통과한 경우
        if (StringUtils.hasText(token) &amp;&amp; tokenProvider.validateToken(token)) {
            // 3. 토큰 내부 클레임(Claims) 정보를 바탕으로 Spring Security Authentication 객체 생성
            Authentication auth = tokenProvider.getAuthentication(token);
            
            // 4. SecurityContextHolder에 인증 객체 저장 (현재 스레드 전역에서 로그인 유저로 인정)
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 5. 필터 체인의 다음 보안 필터로 요청 계속 전달 (필수: 미호출 시 컨트롤러에 도달하지 않음)
        filterChain.doFilter(request, response);
    }

    // [Authorization 헤더 'Bearer ' 접두사 파싱 메서드]
    private String resolveToken(HttpServletRequest request) {
        // HTTP 요청 헤더: Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
        String bearerToken = request.getHeader("Authorization");
        
        // 'Bearer ' 7글자 접두사 제거 후 순수 JWT 토큰 문자열만 반환
        if (StringUtils.hasText(bearerToken) &amp;&amp; bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}</code></pre>

                <h2>5단계: SecurityConfig.java (Spring Security 6 Lambda DSL 설정)</h2>
                <p>무상태 세션 정책과 JWT 필터를 등록하는 보안 체인을 구성합니다:</p>
                <pre><code class="language-java">package com.example.config;

import com.example.config.jwt.JwtAuthenticationFilter;
import com.example.config.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// [@Configuration &amp; @EnableWebSecurity] Spring Security 6.x 보안 설정 빈 등록 선언
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // [@Bean SecurityFilterChain] HTTP 보안 규칙 및 체인을 등록하는 핵심 설정 메서드
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // [1. CSRF 비활성화] REST API는 무상태 JWT를 사용하므로 CSRF 보조 토큰 불필요
            .csrf(csrf -&gt; csrf.disable())
            
            // [2. 무상태 세션 정책] 서버 측 HttpSession을 생성하지 않고 완전히 Stateless하게 동작
            .sessionManagement(session -&gt; session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // [3. URL 경로별 접근 인가 규칙 설정] (Spring Security 6.3 Lambda DSL 방식)
            .authorizeHttpRequests(auth -&gt; auth
                // 로그인, 회원가입, 공개 엔드포인트는 인증 없이 누구나 접근 허용
                .requestMatchers("/api/auth/**", "/public/**").permitAll()
                // /api/admin/** 관리자 경로는 'ADMIN' 권한 보유자만 접근 허용
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // 나머지 모든 API 요청은 인증(JWT 토큰 보유) 완료된 사용자만 접근 허용
                .anyRequest().authenticated()
            )
            
            // [4. 커스텀 JWT 필터 배치] 
            // 폼 로그인 전용 UsernamePasswordAuthenticationFilter 실행 직전에 JwtAuthenticationFilter 배치
            .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // [비밀번호 암호화 인코더 빈] BCrypt 해시 알고리즘 기반 단방향 비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}</code></pre>

                <h2>6단계: AuthController.java (로그인 REST API 컨트롤러)</h2>
                <p>사용자 인증 후 JWT 토큰을 발급하는 REST 엔드포인트를 구현합니다:</p>
                <pre><code class="language-java">package com.example.controller;

import com.example.config.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// [@RestController & @RequestMapping] 로그인 및 토큰 발급 전용 REST API 컨트롤러
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider tokenProvider;

    // 생성자 주입 방식으로 JwtTokenProvider 의존성 전달받음
    public AuthController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // [POST /api/auth/login] 사용자 로그인 검증 및 Bearer Access Token 반환 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // [사용자 인증 수행] ID/PW 일치 여부 확인 (실운영 환경에서는 AuthenticationManager 연동)
        if ("admin".equals(username) && "password123".equals(password)) {
            // 인증 성공 시 ADMIN 권한을 부여한 30분 유효 JWT 토큰 생성
            String token = tokenProvider.createAccessToken(username, "ADMIN");
            
            // HTTP 200 OK와 함께 Bearer 토큰 정보 JSON 응답
            return ResponseEntity.ok(Map.of(
                "token_type", "Bearer",
                "access_token", token,
                "expires_in", 1800
            ));
        }

        // 인증 실패 시 HTTP 401 Unauthorized 오류 응답
        return ResponseEntity.status(401).body(Map.of("error", "아이디 또는 비밀번호가 올바르지 않습니다."));
    }
}</code></pre>
            `
        }
    },
    'spring-security-login': {
        en: {
            title: 'Spring Boot 3.3 + Spring Security 6: Complete User Authentication & Login REST API Integration',
            content: `
                <p>Learn how to connect Spring Security 6 authentication mechanisms with standard REST API login endpoints in Spring Boot 3.3.x and Java 21 LTS. This guide walks through <code>AuthenticationManager</code>, custom <code>UserDetailsService</code>, password hashing via <code>BCryptPasswordEncoder</code>, and JWT token issuance.</p>
                
                <div class="technical-note" style="background: rgba(99, 102, 241, 0.1); border-left: 4px solid #6366f1; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>Key Architecture Concept:</strong> Spring Security 6 handles authentication via <code>AuthenticationManager</code>, which delegates credential validation to a <code>DaoAuthenticationProvider</code>. If credentials match the hashed password, an <code>Authentication</code> object is returned and stored in the <code>SecurityContextHolder</code>.
                </div>

                <h2>1. Login Request & Token Response DTOs</h2>
                <p>Define immutable Data Transfer Objects (DTOs) for receiving credentials and returning tokens:</p>
                <pre><code class="language-java">package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

// [@Getter & @NoArgsConstructor] Request DTO carrying user credentials for authentication
@Getter
@NoArgsConstructor
public class LoginRequestDto {

    // [@NotBlank] Validates that username is not null and contains non-whitespace characters
    @NotBlank(message = "Username is required")
    private String username;

    // [@NotBlank] Validates that password is not null and non-empty
    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}</code></pre>

                <p>Token Response DTO:</p>
                <pre><code class="language-java">package com.example.dto;

import lombok.Builder;
import lombok.Getter;

// [@Getter & @Builder] Immutable Token Response DTO returned to client upon successful login
@Getter
@Builder
public class JwtTokenResponseDto {
    private String grantType;           // Authorization Scheme Header (e.g. "Bearer")
    private String accessToken;         // Signed JWT Access Token for authenticating API requests
    private String refreshToken;        // Long-lived JWT Refresh Token for renewing access tokens
    private long accessTokenExpiresIn;   // Expiration duration in milliseconds (1,800,000 ms = 30 mins)
}</code></pre>

                <h2>2. Custom UserDetails & UserDetailsService</h2>
                <p>Implement <code>UserDetailsService</code> to fetch user credentials and granted authorities from your Database or User Domain repository:</p>
                <pre><code class="language-java">package com.example.security;

import com.example.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// [@Service] Custom UserDetailsService implementation bridge between DB Repository and Spring Security
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Called by AuthenticationProvider during credential check to retrieve DB User details
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .map(user -> new User(
                user.getUsername(),                                                 // DB Username
                user.getPassword(),                                                 // Hashed DB Password
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))      // Granted Authority Role
            ))
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}</code></pre>

                <h2>3. Security Config with AuthenticationManager (SecurityConfig.java)</h2>
                <p>Configure password encoding and expose the <code>AuthenticationManager</code> bean for your REST login service in Spring Security 6.3:</p>
                <pre><code class="language-java">package com.example.config;

import com.example.config.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// [@Configuration & @EnableWebSecurity] Configures Security Beans and Spring Security Filter Chain
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // [@Bean PasswordEncoder] Uses BCrypt strong hashing algorithm for safe password encoding/verification
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // [@Bean AuthenticationManager] Exposes AuthenticationManager Spring bean required by AuthService
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // [@Bean SecurityFilterChain] Configures HTTP stateless rules and URL permission matchers
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless REST architecture
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/signup").permitAll() // Public login/signup APIs
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")                     // Admin endpoints
                .anyRequest().authenticated()                                                  // Authenticated requests
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}</code></pre>

                <h2>4. Login Service & REST Controller (AuthController.java)</h2>
                <p>Execute authentication using <code>AuthenticationManager</code>, set the Security Context, and return JWT Tokens:</p>
                <pre><code class="language-java">package com.example.service;

import com.example.config.jwt.JwtTokenProvider;
import com.example.dto.LoginRequestDto;
import com.example.dto.JwtTokenResponseDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

// [@Service] Business Logic Service executing credential validation and issuing JWT Tokens
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public JwtTokenResponseDto login(LoginRequestDto loginDto) {
        // 1. Wrap unauthenticated username and password into Spring Security token object
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // 2. Delegate authentication check to AuthenticationManager (Triggers CustomUserDetailsService + BCrypt)
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. Generate Access Token and Refresh Token upon successful authentication
        String accessToken = tokenProvider.createAccessToken(authentication.getName(), "USER");
        String refreshToken = tokenProvider.createRefreshToken(authentication.getName());

        // 4. Return formatted JwtTokenResponseDto
        return JwtTokenResponseDto.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .accessTokenExpiresIn(1800000L) // 30 minutes expiration
            .build();
    }
}</code></pre>

                <p>Auth REST Controller Endpoint:</p>
                <pre><code class="language-java">package com.example.controller;

import com.example.dto.LoginRequestDto;
import com.example.dto.JwtTokenResponseDto;
import com.example.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// [@RestController & @RequestMapping] User Login REST Endpoint Controller
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // [POST /api/v1/auth/login] Validates Request DTO and executes user login authentication
    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponseDto> login(@Valid @RequestBody LoginRequestDto loginDto) {
        JwtTokenResponseDto tokenResponse = authService.login(loginDto);
        return ResponseEntity.ok(tokenResponse);
    }
}</code></pre>
            `
        },
        ko: {
            title: 'Spring Boot 3.3 + Spring Security 6: 사용자 인증 연동 및 로그인(Login) REST API 완전 구현 가이드',
            content: `
                <p>Spring Boot 3.3.x 및 Java 21 LTS 환경에서 Spring Security 6 인증 프레임워크와 REST API 로그인 요청을 안전하게 연동하는 방법을 설명합니다. <code>AuthenticationManager</code>, 커스텀 <code>UserDetailsService</code>, <code>BCryptPasswordEncoder</code> 비밀번호 암호화 및 JWT 토큰 발급까지 실전 코드 위주로 학습합니다.</p>
                
                <div class="technical-note" style="background: rgba(99, 102, 241, 0.1); border-left: 4px solid #6366f1; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>핵심 아키텍처 개념:</strong> Spring Security 6에서 로그인 요청이 들어오면 <code>AuthenticationManager</code>가 <code>DaoAuthenticationProvider</code>를 통해 사용자 정보(Username)와 비밀번호(Hashed Password)를 검증합니다. 검증이 성공하면 인증 객체(<code>Authentication</code>)가 생성되며, 이를 기반으로 무상태(Stateless) JWT 토큰을 생성하여 클라이언트에 응답합니다.
                </div>

                <h2>1단계: 로그인 요청 및 토큰 응답 DTO 정의</h2>
                <p>클라이언트 로그인 요청 데이터 검증 및 토큰 응답을 위한 DTO 클래스 작성:</p>
                <pre><code class="language-java">package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

// [@Getter & @NoArgsConstructor] 클라이언트 로그인 요청 바디 데이터를 받는 요청 DTO
@Getter
@NoArgsConstructor
public class LoginRequestDto {

    // [@NotBlank] 아이디 입력 필수 검증 (null, 빈문자열, 공백만 있는 문자열 차단)
    @NotBlank(message = "아이디를 입력해주세요.")
    private String username;

    // [@NotBlank] 비밀번호 입력 필수 검증
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}</code></pre>

                <p>JWT 토큰 응답 DTO:</p>
                <pre><code class="language-java">package com.example.dto;

import lombok.Builder;
import lombok.Getter;

// [@Getter & @Builder] 인증 성공 시 클라이언트에 전달되는 무상태(Stateless) JWT 토큰 응답 DTO
@Getter
@Builder
public class JwtTokenResponseDto {
    private String grantType;           // 인증 헤더 타입 (예: "Bearer")
    private String accessToken;         // API 요청 인증용 Access Token 문자열
    private String refreshToken;        // Access Token 재발급용 Refresh Token 문자열
    private long accessTokenExpiresIn;   // Access Token 만료 유효시간 (밀리초 단위, 1,800,000 = 30분)
}</code></pre>

                <h2>2단계: Custom UserDetails 및 UserDetailsService 구현</h2>
                <p>데이터베이스의 사용자 엔티티를 조회하여 Spring Security 인증 시스템과 연결하는 <code>UserDetailsService</code> 구현:</p>
                <pre><code class="language-java">package com.example.security;

import com.example.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// [@Service] DB의 사용자 계정 정보를 조회하여 Spring Security 표준 UserDetails로 변환하는 서비스
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // AuthenticationProvider에서 비밀번호 검증 시 호출하여 DB 사용자 객체를 가져옴
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .map(user -> new User(
                user.getUsername(),                                                 // 사용자 로그인 ID
                user.getPassword(),                                                 // DB에 저장된 BCrypt 암호화 비밀번호
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))      // Spring Security 권한 (ROLE_USER, ROLE_ADMIN)
            ))
            .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));
    }
}</code></pre>

                <h2>3단계: PasswordEncoder 및 AuthenticationManager 설정 (SecurityConfig.java)</h2>
                <p>Spring Security 6.3 Lambda DSL 설정 클래스에서 비밀번호 암호화 빈과 <code>AuthenticationManager</code> 빈을 등록합니다:</p>
                <pre><code class="language-java">package com.example.config;

import com.example.config.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// [@Configuration & @EnableWebSecurity] Spring Security 6 람다 DSL 구성 빈 클래스
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // [@Bean PasswordEncoder] 비밀번호 해시 암호화에 BCrypt 알고리즘 사용 빈 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // [@Bean AuthenticationManager] 사용자 로그인 인증 처리의 핵심 컴포넌트를 Spring Bean으로 노출
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // [@Bean SecurityFilterChain] HTTP 보안 정책, 무상태 세션 및 URL 인가 규칙 정의
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // REST API 무상태 환경이므로 CSRF 보안 비활성화
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/signup").permitAll() // 로그인/회원가입은 누구나 허용
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")                     // 관리자 전용 경로
                .anyRequest().authenticated()                                                  // 나머지는 인증 필수
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}</code></pre>

                <h2>4단계: 로그인 비즈니스 로직 및 REST Controller (AuthController.java)</h2>
                <p><code>AuthenticationManager</code>로 인증 절차를 수행하고 JWT 토큰을 생성하여 반환합니다:</p>
                <pre><code class="language-java">package com.example.service;

import com.example.config.jwt.JwtTokenProvider;
import com.example.dto.LoginRequestDto;
import com.example.dto.JwtTokenResponseDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

// [@Service] 로그인 요청 인증 검증 및 JWT Access/Refresh 토큰 생성 비즈니스 서비스
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public JwtTokenResponseDto login(LoginRequestDto loginDto) {
        // 1. 미인증 상태의 Username과 Password를 담은 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // 2. AuthenticationManager에게 인증 위임 (CustomUserDetailsService.loadUserByUsername + BCrypt 비밀번호 비교)
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. 인증 성공 시 사용자 ID 정보 기반으로 Access Token & Refresh Token 생성
        String accessToken = tokenProvider.createAccessToken(authentication.getName(), "USER");
        String refreshToken = tokenProvider.createRefreshToken(authentication.getName());

        // 4. DTO 빌더 형태로 토큰 응답 구성하여 반환
        return JwtTokenResponseDto.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .accessTokenExpiresIn(1800000L) // 30분 유효기간
            .build();
    }
}</code></pre>

                <p>로그인 REST API 컨트롤러:</p>
                <pre><code class="language-java">package com.example.controller;

import com.example.dto.LoginRequestDto;
import com.example.dto.JwtTokenResponseDto;
import com.example.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// [@RestController & @RequestMapping] 로그인 REST API 요청 처리 컨트롤러
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // [POST /api/v1/auth/login] LoginRequestDto를 검증하고 AuthService.login 호출하여 토큰 반환
    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponseDto> login(@Valid @RequestBody LoginRequestDto loginDto) {
        JwtTokenResponseDto tokenResponse = authService.login(loginDto);
        return ResponseEntity.ok(tokenResponse);
    }
}</code></pre>
            `
        }
    },
    'spring-file-upload-download': {
        en: {
            title: 'Spring Boot 3.3 + JavaScript: File Upload & Download (Frontend & Backend) Implementation Guide',
            content: `
                <p>Complete end-to-end architecture guide for building secure, high-performance file upload and download systems in Spring Boot 3.3.x (Backend) and HTML5 / Vanilla JavaScript (Frontend). Includes drag-and-drop UI, upload progress bars, file sanitization, directory traversal protection, and Blob streaming downloads.</p>
                
                <div style="text-align: center; margin: 2rem 0;">
                    <img src="/images/spring_file_upload_download_demo.png" alt="Spring File Upload & Download Interface Preview" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">[Visual Example Architecture &amp; UI Dashboard for File Upload / Download Systems]</p>
                </div>

                <div class="technical-note" style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid #0ea5e9; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>Architecture Division:</strong>
                    <br><strong>Backend:</strong> Handles multipart data parsing, storage directory initialization, path traversal sanitization, UUID filename allocation, and HTTP <code>Content-Disposition</code> attachment response headers.
                    <br><strong>Frontend:</strong> Handles HTML5 drag-and-drop events, client-side size validation, asynchronous <code>FormData</code> AJAX upload, real-time progress events, and browser Blob URL triggering.
                </div>

                <h2>PART 1: Backend Implementation (Spring Boot 3.3.x & Java 21)</h2>

                <h3>1-1. application.yml Multipart & Storage Directory Config</h3>
                <pre><code class="language-yaml">spring:
  servlet:
    multipart:
      enabled: true
      max-file-size: 50MB
      max-request-size: 50MB
      file-size-threshold: 2KB

file:
  upload-dir: ./uploads</code></pre>

                <h3>1-2. FileUploadResponseDto.java</h3>
                <pre><code class="language-java">package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadResponseDto {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
}</code></pre>

                <h3>1-3. FileStorageService.java (Path Sanitization & Resource Loading)</h3>
                <pre><code class="language-java">package com.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("\${file.upload-dir:./uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create directory where uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // 1. Security Check: Block Path Traversal (e.g. filename containing '..')
            if (originalFileName.contains("..")) {
                throw new IllegalArgumentException("Filename contains invalid path sequence: " + originalFileName);
            }

            // 2. Generate Unique Filename to prevent overwriting
            String extension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i >= 0) {
                extension = originalFileName.substring(i);
            }
            String storedFileName = UUID.randomUUID().toString() + extension;

            // 3. Copy file to target location
            Path targetLocation = this.fileStorageLocation.resolve(storedFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return storedFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found: " + fileName, ex);
        }
    }
}</code></pre>

                <h3>1-4. FileController.java (Upload & Download REST Endpoints)</h3>
                <pre><code class="language-java">package com.example.controller;

import com.example.dto.FileUploadResponseDto;
import com.example.service.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/files/download/")
                .path(fileName)
                .toUriString();

        FileUploadResponseDto response = new FileUploadResponseDto(
                fileName,
                fileDownloadUri,
                file.getContentType(),
                file.getSize()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            contentType = "application/octet-stream";
        }
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}</code></pre>

                <h2>PART 2: Frontend Implementation (HTML5 Drag & Drop + Vanilla JS)</h2>

                <h3>2-1. HTML5 Markup for Drag-and-Drop & Progress Bar</h3>
                <pre><code class="language-html">&lt;div class="upload-container"&gt;
    &lt;div id="drop-zone" class="drop-zone"&gt;
        &lt;div class="drop-zone-content"&gt;
            &lt;span class="upload-icon"&gt;📁&lt;/span&gt;
            &lt;p&gt;Drag &amp; drop files here or &lt;span class="browse-btn"&gt;browse&lt;/span&gt;&lt;/p&gt;
            &lt;input type="file" id="file-input" hidden&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div id="progress-container" class="progress-container" style="display: none;"&gt;
        &lt;div class="file-info"&gt;
            &lt;span id="file-name"&gt;filename.pdf&lt;/span&gt;
            &lt;span id="upload-percent"&gt;0%&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="progress-bar-bg"&gt;
            &lt;div id="progress-bar-fill" class="progress-bar-fill" style="width: 0%;"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div id="upload-result" class="upload-result" style="display: none;"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

                <h3>2-2. JavaScript Upload & Blob Download Logic</h3>
                <pre><code class="language-javascript">// 1. Handle Drag & Drop Events & File Input
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-active');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    if (e.dataTransfer.files.length > 0) {
        uploadFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        uploadFile(fileInput.files[0]);
    }
});

// 2. Upload File via XMLHttpRequest for progress tracking
function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    const progressContainer = document.getElementById('progress-container');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const uploadPercent = document.getElementById('upload-percent');

    progressContainer.style.display = 'block';

    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressBarFill.style.width = percent + '%';
            uploadPercent.textContent = percent + '%';
        }
    });

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                renderUploadResult(response);
            } else {
                alert('Upload failed: ' + xhr.statusText);
            }
        }
    };

    xhr.open('POST', '/api/v1/files/upload', true);
    xhr.send(formData);
}

// 3. Trigger Binary File Download in Frontend
async function downloadFile(fileName) {
    try {
        const response = await fetch(\`/api/v1/files/download/\${fileName}\`);
        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
        console.error('File download error:', err);
    }
}</code></pre>
            `
        },
        ko: {
            title: 'Spring Boot 3.3 + JavaScript: 파일 업로드 및 다운로드 (Frontend & Backend) 완전 구현 가이드',
            content: `
                <p>Spring Boot 3.3.x (백엔드)와 HTML5 Drag & Drop / JavaScript Fetch API (프론트엔드)를 활용한 보안성과 성능을 갖춘 파일 업로드 및 다운로드 시스템 구현 가이드입니다. 드래그앤드롭 UI, 실시간 업로드 프로그레스 바, 경로 이탈(Path Traversal) 방지 보안 및 바이너리 Blob 다운로드까지 전 과정을 설명합니다.</p>

                <div style="text-align: center; margin: 2rem 0;">
                    <img src="/images/spring_file_upload_download_demo.png" alt="스프링 파일 업로드 및 다운로드 UI 아키텍처 예시" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">[파일 업로드 / 다운로드 대시보드 UI 및 데이터 흐름 예시 이미지]</p>
                </div>

                <div class="technical-note" style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid #0ea5e9; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>프론트엔드 및 백엔드역할 분담:</strong>
                    <br><strong>백엔드 (Backend):</strong> Multipart 파싱, 저장 디렉토리 자동 생성, 파일명 정제 및 UUID 변환(중복 방지), 경로 이탈 보안 검증 및 <code>Content-Disposition</code> 스트리밍 다운로드 처리.
                    <br><strong>프론트엔드 (Frontend):</strong> HTML5 드래그앤드롭 이벤트 처리, 비동기 <code>FormData</code> AJAX 전송, 실시간 진행률 프로그레스 바 표시 및 <code>URL.createObjectURL(blob)</code> 다운로드 트리거.
                </div>

                <h2>PART 1: 백엔드 구현 (Spring Boot 3.3.x & Java 21)</h2>

                <h3>1-1. application.yml 파일 용량 및 저장 경로 설정</h3>
                <pre><code class="language-yaml">spring:
  servlet:
    multipart:
      enabled: true            # [Multipart 활성화] HTTP POST multipart/form-data 요청 처리 허용
      max-file-size: 50MB      # [단일 파일 최대 용량] 업로드 가능한 1개 파일의 최대 제한 크기 (50MB)
      max-request-size: 50MB   # [요청 전체 최대 용량] 1회 HTTP 요청 시 포함될 수 있는 전체 파일 크기 합계 (50MB)
      file-size-threshold: 2KB # [메모리 버퍼 임계값] 2KB를 초과하는 파일은 메모리 대신 디스크 임시 파일로 수용

# [사용자 정의 저장 디렉토리] 파일이 실제로 저장될 서버 내부 상대/절대 경로
file:
  upload-dir: ./uploads</code></pre>

                <h3>1-2. FileUploadResponseDto.java (응답 DTO)</h3>
                <pre><code class="language-java">package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// [업로드 성공 응답 DTO] 업로드된 파일의 식별명, 다운로드 URL, MIME 타입, 파일 용량을 클라이언트에 반환
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadResponseDto {
    private String fileName;        // DB/서버에 저장된 UUID 파일명
    private String fileDownloadUri; // 클라이언트가 다운로드할 수 있는 API URL (예: /api/v1/files/download/uuid.png)
    private String fileType;        // MIME 타입 (예: image/png, application/pdf)
    private long size;              // 바이트(Byte) 단위 파일 크기
}</code></pre>

                <h3>1-3. FileStorageService.java (보안 검증 및 파일 저장 서비스)</h3>
                <pre><code class="language-java">package com.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    // [@Value] application.yml의 file.upload-dir 경로 주입 및 저장 디렉터리 자동 생성
    public FileStorageService(@Value("\${file.upload-dir:./uploads}") String uploadDir) {
        // [Paths.get().toAbsolutePath().normalize()] 상대 경로를 서버 물리 절대 경로로 정규화
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            // [Files.createDirectories] 업로드 디렉토리가 존재하지 않는 경우 자동으로 폴더 생성
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("업로드 디렉토리를 생성할 수 없습니다.", ex);
        }
    }

    // [파일 저장 핵심 메서드] 보안 검증, UUID 변환 및 파일 저장 처리
    public String storeFile(MultipartFile file) {
        // [StringUtils.cleanPath] 경로 구분자(/, \) 정제 처리
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // [1. 경로 이탈(Path Traversal) 보안 방어]
            // '../' 등 상위 디렉터리 접근 시도를 차단하여 웹 셸 업로드 및 서버 파일 덮어쓰기 공격 방지
            if (originalFileName.contains("..")) {
                throw new IllegalArgumentException("파일명에 부적절한 경로 문자가 포함되어 있습니다: " + originalFileName);
            }

            // [2. UUID 고유 파일명 생성]
            // 파일명 중복으로 인한 기존 파일 덮어쓰기 방지 및 한글/특수문자 깨짐을 원천 차단
            String extension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i >= 0) {
                extension = originalFileName.substring(i); // 확장자 추출 (.png, .pdf 등)
            }
            String storedFileName = UUID.randomUUID().toString() + extension; // 36자리 UUID + 확장자

            // [3. 디렉토리에 파일 저장]
            Path targetLocation = this.fileStorageLocation.resolve(storedFileName);
            // [StandardCopyOption.REPLACE_EXISTING] 동명 파일이 존재할 경우 덮어쓰기
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return storedFileName;
        } catch (IOException ex) {
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다: " + originalFileName, ex);
        }
    }

    // [파일 다운로드용 Resource 로딩 메서드]
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            // [UrlResource] 물리 파일 경로를 Spring Resource 객체로 래핑하여 파일 스트리밍 반환
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("파일을 찾을 수 없거나 읽을 수 없습니다: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("파일 경로 오류: " + fileName, ex);
        }
    }
}</code></pre>

                <h3>1-4. FileController.java (업로드 및 다운로드 REST API)</h3>
                <pre><code class="language-java">package com.example.controller;

import com.example.dto.FileUploadResponseDto;
import com.example.service.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    // [단일 파일 업로드 API] POST /api/v1/files/upload
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        // [ServletUriComponentsBuilder] 현재 요청 도메인 기준 동적 다운로드 URL 조합
        // 예: http://localhost:8080/api/v1/files/download/550e8400-e29b-41d4-a716-446655440000.png
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/files/download/")
                .path(fileName)
                .toUriString();

        FileUploadResponseDto response = new FileUploadResponseDto(
                fileName,
                fileDownloadUri,
                file.getContentType(),
                file.getSize()
        );

        return ResponseEntity.ok(response);
    }

    // [파일 다운로드 API] GET /api/v1/files/download/{fileName}
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // [파일 MIME 타입 자동 감지]
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            contentType = "application/octet-stream";
        }
        if (contentType == null) {
            contentType = "application/octet-stream"; // 미감지 시 기본 범용 바이너리 타입 지정
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                // [Content-Disposition 헤더] attachment; filename="..." 설정으로 브라우저 다운로드 창 유발
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}</code></pre>

                <h2>PART 2: 프론트엔드 구현 (HTML5 Drag & Drop + JavaScript)</h2>

                <h3>2-1. HTML5 마크업 (드롭존 & 프로그레스 바)</h3>
                <pre><code class="language-html">&lt;div class="upload-container"&gt;
    &lt;!-- [드래그 앤 드롭 영역] --&gt;
    &lt;div id="drop-zone" class="drop-zone"&gt;
        &lt;div class="drop-zone-content"&gt;
            &lt;span class="upload-icon"&gt;📁&lt;/span&gt;
            &lt;p&gt;파일을 여기에 드래그하거나 &lt;span class="browse-btn"&gt;클릭하여 선택&lt;/span&gt;하세요&lt;/p&gt;
            &lt;!-- 실제 파일 선택 창을 띄울 숨겨진 file input --&gt;
            &lt;input type="file" id="file-input" hidden&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- [실시간 업로드 진행률 프로그레스 바 레이아웃] --&gt;
    &lt;div id="progress-container" class="progress-container" style="display: none;"&gt;
        &lt;div class="file-info"&gt;
            &lt;span id="file-name"&gt;filename.pdf&lt;/span&gt;
            &lt;span id="upload-percent"&gt;0%&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="progress-bar-bg"&gt;
            &lt;!-- width 스타일 프로퍼티로 퍼센트 진행률 시각화 --&gt;
            &lt;div id="progress-bar-fill" class="progress-bar-fill" style="width: 0%;"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div id="upload-result" class="upload-result" style="display: none;"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

                <h3>2-2. JavaScript 업로드 전송 & 다운로드 트리거 로직</h3>
                <pre><code class="language-javascript">// 1. 드래그 앤 드롭 및 파일 선택 이벤트 핸들링
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

// [dragover] 마우스 드래그 중 기본 브라우저 동작(파일 직접 열기) 중단
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-active');
});

// [drop] 파일 드롭 시 드롭된 파일 가져오기
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    if (e.dataTransfer.files.length > 0) {
        uploadFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        uploadFile(fileInput.files[0]);
    }
});

// 2. XMLHttpRequest 기반 실시간 진행률 추적 비동기 업로드
function uploadFile(file) {
    // [FormData] multipart/form-data 규격 폼 데이터 생성
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    const progressContainer = document.getElementById('progress-container');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const uploadPercent = document.getElementById('upload-percent');

    progressContainer.style.display = 'block';

    // [xhr.upload.onprogress] 업로드 전송 이벤트 추적
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            // [전송 퍼센트 산출] (현재 전송된 바이트 / 전체 파일 크기) * 100
            const percent = Math.round((e.loaded / e.total) * 100);
            progressBarFill.style.width = percent + '%';
            uploadPercent.textContent = percent + '%';
        }
    });

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                alert('파일 업로드 성공! 서버 저장 파일명: ' + response.fileName);
            } else {
                alert('업로드 실패: ' + xhr.statusText);
            }
        }
    };

    xhr.open('POST', '/api/v1/files/upload', true);
    xhr.send(formData);
}

// 3. 바이너리 Blob 가상 URL 생성 1-클릭 다운로드 트리거
async function downloadFile(fileName) {
    try {
        // [fetch API] 백엔드 다운로드 REST API 호출
        const response = await fetch(\`/api/v1/files/download/\${fileName}\`);
        if (!response.ok) throw new Error('다운로드 실패');

        // [response.blob()] 바이너리 스트림 데이터를 Blob 객체로 수신
        const blob = await response.blob();
        
        // [window.URL.createObjectURL] 인메모리 Blob 데이터를 참조하는 임시 URL 생성
        const downloadUrl = window.URL.createObjectURL(blob);
        
        // 동적 <a> 태그를 생성하여 1-클릭 다운로드 실행 후 메모리 해제
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        // [revokeObjectURL] 생성된 메모리 가상 URL 해제 (메모리 누수 방지)
        window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
        console.error('파일 다운로드 오류:', err);
    }
}</code></pre>
            `
        }
    },
    'spring-db-jpa-mybatis': {
        en: {
            title: 'Spring Boot 3.3 + MariaDB & Oracle DB: Complete JPA & MyBatis Guide for Users, Posts & File Attachments',
            content: `
                <p>Learn how to connect Spring Boot 3.3.x to <strong>MariaDB</strong> and <strong>Oracle DB</strong>, implementing relational domain models for Users, Board Posts, and File Attachments using both <strong>Spring Data JPA</strong> and <strong>MyBatis 3</strong>. Easily switch databases by modifying configuration properties in <code>application.yml</code>.</p>
                
                <div style="text-align: center; margin: 2rem 0;">
                    <img src="/images/spring_db_jpa_mybatis_demo.png" alt="Spring DB JPA & MyBatis ERD Diagram Preview" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">[Database Architecture, ERD Schema &amp; Spring Boot JPA / MyBatis Data Layer Diagram]</p>
                </div>

                <div class="technical-note" style="background: rgba(234, 88, 12, 0.1); border-left: 4px solid #ea580c; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>Database Portability Concept:</strong> Switching between MariaDB and Oracle DB requires only updating the <code>driver-class-name</code>, JDBC <code>url</code>, and Hibernate <code>dialect</code> in <code>application.yml</code>. The domain logic and REST API remain 100% reusable.
                </div>

                <h2>1. Dependencies & Connection Settings (application.yml)</h2>
                <p>Gradle Dependencies (<code>build.gradle</code>):</p>
                <pre><code class="language-groovy">dependencies {
    // Spring Boot Starters
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3'

    // Database Drivers (MariaDB & Oracle)
    runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'
    runtimeOnly 'com.oracle.database.jdbc:ojdbc11'

    // Lombok & Utilities
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}</code></pre>

                <h3>1-1. MariaDB Connection Configuration (application.yml)</h3>
                <pre><code class="language-yaml">spring:
  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: jdbc:mariadb://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&characterEncoding=UTF-8
    username: root
    password: mariadb_password
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      idle-timeout: 300000
      pool-name: MariaDB-HikariPool

  jpa:
    database-platform: org.hibernate.dialect.MariaDBDialect
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate.format_sql: true

mybatis:
  mapper-locations: classpath:mappers/**/*.xml
  type-aliases-package: com.example.domain</code></pre>

                <h3>1-2. Oracle DB Connection Configuration (application.yml)</h3>
                <pre><code class="language-yaml">spring:
  datasource:
    driver-class-name: oracle.jdbc.OracleDriver
    url: jdbc:oracle:thin:@localhost:1521/XEPDB1
    username: myuser
    password: oracle_password
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      idle-timeout: 300000
      pool-name: Oracle-HikariPool

  jpa:
    database-platform: org.hibernate.dialect.OracleDialect
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate.format_sql: true

mybatis:
  mapper-locations: classpath:mappers/**/*.xml
  type-aliases-package: com.example.domain</code></pre>

                <h2>2. Relational Database Schemas (DDL)</h2>
                
                <h3>2-1. MariaDB DDL Schema</h3>
                <pre><code class="language-sql">-- Users Table
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Board Posts Table
CREATE TABLE posts (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    view_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- File Attachments Table
CREATE TABLE attachments (
    attachment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attachments_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;</code></pre>

                <h3>2-2. Oracle DB DDL Schema (12c+ Identity)</h3>
                <pre><code class="language-sql">-- Users Table
CREATE TABLE USERS (
    USER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    USERNAME VARCHAR2(50) NOT NULL UNIQUE,
    PASSWORD VARCHAR2(255) NOT NULL,
    EMAIL VARCHAR2(100) NOT NULL,
    ROLE VARCHAR2(20) DEFAULT 'ROLE_USER',
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Board Posts Table
CREATE TABLE POSTS (
    POST_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    USER_ID NUMBER NOT NULL,
    TITLE VARCHAR2(200) NOT NULL,
    CONTENT CLOB NOT NULL,
    VIEW_COUNT NUMBER DEFAULT 0,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_POSTS_USER FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- File Attachments Table
CREATE TABLE ATTACHMENTS (
    ATTACHMENT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    POST_ID NUMBER NOT NULL,
    ORIGINAL_NAME VARCHAR2(255) NOT NULL,
    STORED_NAME VARCHAR2(255) NOT NULL,
    FILE_PATH VARCHAR2(500) NOT NULL,
    FILE_SIZE NUMBER NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_ATTACHMENTS_POST FOREIGN KEY (POST_ID) REFERENCES POSTS(POST_ID) ON DELETE CASCADE
);</code></pre>

                <h2>3. JPA Implementation (Entities, Repositories & Service)</h2>

                <h3>3-1. JPA Entities</h3>
                <pre><code class="language-java">package com.example.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder.Default
    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Attachment> attachments = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void addAttachment(Attachment attachment) {
        attachments.add(attachment);
        attachment.setPost(this);
    }
}</code></pre>

                <h3>3-2. Spring Data JPA Repositories & Service</h3>
                <pre><code class="language-java">package com.example.repository;

import com.example.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    
    @Query("SELECT p FROM Post p JOIN FETCH p.author LEFT JOIN FETCH p.attachments WHERE p.id = :id")
    Optional<Post> findByIdWithDetails(@Param("id") Long id);
}</code></pre>

                <h2>4. MyBatis Implementation (Mapper XML & Java Interface)</h2>

                <h3>4-1. PostMapper.java Interface</h3>
                <pre><code class="language-java">package com.example.mapper;

import com.example.dto.PostDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {
    
    List<PostDto> selectAllPosts();
    
    PostDto selectPostById(@Param("postId") Long postId);
    
    int insertPost(PostDto postDto);
    
    int insertAttachment(@Param("postId") Long postId, @Param("originalName") String originalName, 
                         @Param("storedName") String storedName, @Param("filePath") String filePath, 
                         @Param("fileSize") long fileSize);
}</code></pre>

                <h3>4-2. PostMapper.xml (XML Mapper Query)</h3>
                <pre><code class="language-xml">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;

&lt;mapper namespace="com.example.mapper.PostMapper"&gt;

    &lt;resultMap id="PostResultMap" type="com.example.dto.PostDto"&gt;
        &lt;id property="postId" column="post_id"/&gt;
        &lt;result property="title" column="title"/&gt;
        &lt;result property="content" column="content"/&gt;
        &lt;result property="authorName" column="username"/&gt;
        &lt;result property="createdAt" column="created_at"/&gt;
        &lt;collection property="attachments" ofType="com.example.dto.AttachmentDto"&gt;
            &lt;id property="attachmentId" column="attachment_id"/&gt;
            &lt;result property="originalName" column="original_name"/&gt;
            &lt;result property="storedName" column="stored_name"/&gt;
            &lt;result property="fileSize" column="file_size"/&gt;
        &lt;/collection&gt;
    &lt;/resultMap&gt;

    &lt;select id="selectPostById" resultMap="PostResultMap"&gt;
        SELECT 
            p.post_id, p.title, p.content, p.created_at,
            u.username,
            a.attachment_id, a.original_name, a.stored_name, a.file_size
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        LEFT JOIN attachments a ON p.post_id = a.post_id
        WHERE p.post_id = #{postId}
    &lt;/select&gt;

    &lt;insert id="insertPost" useGeneratedKeys="true" keyProperty="postId" keyColumn="post_id"&gt;
        INSERT INTO posts (user_id, title, content, view_count, created_at)
        VALUES (#{userId}, #{title}, #{content}, 0, CURRENT_TIMESTAMP)
    &lt;/insert&gt;

&lt;/mapper&gt;</code></pre>

                <h2>5. Frontend UI Sample (HTML5 + JavaScript Board Dashboard)</h2>
                <pre><code class="language-html">&lt;div class="board-container"&gt;
    &lt;h2&gt;📋 Community Board &amp; File Attachments&lt;/h2&gt;

    &lt;!-- Post Creation Form --&gt;
    &lt;form id="post-form" class="card-form"&gt;
        &lt;input type="text" id="post-title" placeholder="Post Title" required&gt;
        &lt;textarea id="post-content" placeholder="Write your post content..." required&gt;&lt;/textarea&gt;
        &lt;input type="file" id="post-file" multiple&gt;
        &lt;button type="submit" class="btn-submit"&gt;Submit Post&lt;/button&gt;
    &lt;/form&gt;

    &lt;!-- Posts List --&gt;
    &lt;div id="posts-list" class="posts-list"&gt;
        &lt;div class="loading"&gt;Loading posts from Database...&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
async function fetchPosts() {
    const res = await fetch('/api/v1/posts');
    const posts = await res.json();
    const listEl = document.getElementById('posts-list');
    
    listEl.innerHTML = posts.map(p => \`
        &lt;div class="post-card"&gt;
            &lt;h3&gt;\${p.title} &lt;small&gt;by \${p.authorName}&lt;/small&gt;&lt;/h3&gt;
            &lt;p&gt;\${p.content}&lt;/p&gt;
            \${p.attachments.length ? \`
                &lt;div class="attachments"&gt;
                    📁 Attachments: 
                    \${p.attachments.map(a => \`
                        &lt;a href="/api/v1/files/download/\${a.storedName}" download&gt;\${a.originalName}&lt;/a&gt;
                    \`).join(', ')}
                &lt;/div&gt;
            \` : ''}
        &lt;/div&gt;
    \`).join('');
}
fetchPosts();
&lt;/script&gt;</code></pre>
            `
        },
        ko: {
            title: 'Spring Boot 3.3 + MariaDB & Oracle DB: 사용자, 게시판, 파일 첨부 완전 구현 가이드 (JPA & MyBatis)',
            content: `
                <p>Spring Boot 3.3.x 환경에서 대표적인 관계형 데이터베이스인 <strong>MariaDB</strong>와 <strong>Oracle DB</strong>를 연동하고, 사용자, 게시글, 파일 첨부 시스템을 <strong>Spring Data JPA</strong>와 <strong>MyBatis 3</strong> 두 가지 방식으로 완전 구현하는 가이드입니다. <code>application.yml</code> 설정 정보만 변경하면 DB를 즉시 전환하여 실행할 수 있습니다.</p>

                <div style="text-align: center; margin: 2rem 0;">
                    <img src="/images/spring_db_jpa_mybatis_demo.png" alt="Spring DB JPA & MyBatis ERD 및 아키텍처 다이어그램" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">[MariaDB / Oracle DB ERD 데이터 모델 및 JPA &amp; MyBatis 데이터 레이어 다이어그램]</p>
                </div>

                <div class="technical-note" style="background: rgba(234, 88, 12, 0.1); border-left: 4px solid #ea580c; padding: 1rem; margin: 1.5rem 0; border-radius: 4px;">
                    <strong>데이터베이스 유연성 (DB Portability):</strong>
                    스프링 부트의 추상화된 <code>DataSource</code> 구조 덕분에 <code>application.yml</code>에서 MariaDB와 Oracle의 <code>driver-class-name</code>, JDBC <code>url</code>, Hibernate <code>dialect</code> 정보만 스위칭하면 동일한 비즈니스 소스코드로 DB를 전환하여 실행할 수 있습니다.
                </div>

                <h2>1단계: 프로젝트 의존성 및 DB 접속 설정 (application.yml)</h2>
                <p>Gradle 의존성 추가 (<code>build.gradle</code>):</p>
                <pre><code class="language-groovy">dependencies {
    // [Spring Boot 웹 스타터] RESTful API 구축 및 톰캣(Tomcat) 내장 서버 포함
    implementation 'org.springframework.boot:spring-boot-starter-web'
    
    // [Spring Data JPA 스타터] ORM 기반 데이터베이스 객체 매핑 및 Repositories 기능 제공
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    
    // [MyBatis 스타터] SQL Mapper 기반 데이터 영속성 계층 프레임워크 (Spring Boot 3.3 전용 3.0.3)
    implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3'

    // [MariaDB JDBC 드라이버] MariaDB 데이터베이스 통신 드라이버
    runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'
    
    // [Oracle DB JDBC 드라이버] Oracle 19c/21c 호환 ojdbc11 드라이버
    runtimeOnly 'com.oracle.database.jdbc:ojdbc11'

    // [Lombok 라이브러리] @Getter, @Setter, @Builder 등 컴파일 시 보일러플레이트 코드 자동 생성
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}</code></pre>

                <h3>1-1. MariaDB 연동 설정 (application.yml)</h3>
                <pre><code class="language-yaml">spring:
  datasource:
    # [JDBC 드라이버] MariaDB 3.x 전용 공식 드라이버 클래스
    driver-class-name: org.mariadb.jdbc.Driver
    
    # [JDBC 접속 URL] 포트 3306, DB명 mydb, UTF-8 문자셋 및 UTC 타임존 강제 지정
    url: jdbc:mariadb://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&characterEncoding=UTF-8
    
    # [DB 인증 계정 및 비밀번호]
    username: root
    password: mariadb_password
    
    # [HikariCP 고성능 커넥션 풀 설정]
    hikari:
      maximum-pool-size: 10   # [최대 커넥션 개수] 동시에 동시 처리할 DB 커넥션 풀 최대 크기
      minimum-idle: 5        # [최소 유휴 커넥션] 사용되지 않더라도 풀에 유지할 최소 커넥션 수
      idle-timeout: 300000   # [유휴 타임아웃] 5분(300초) 동안 미사용 시 커넥션 반환
      pool-name: MariaDB-HikariPool # [풀 식별 이름] 스레드 덤프 및 모니터링 시 표시될 이름

  jpa:
    # [JPA 방언 설정] MariaDB 전용 SQL 쿼리(LIMIT, AUTO_INCREMENT 등) 생성 dialect 지정
    database-platform: org.hibernate.dialect.MariaDBDialect
    
    hibernate:
      # [DDL 자동 생성 전략] update: Entity 변경 시 테이블 자동 업데이트 (개발 환경 전용)
      ddl-auto: update
    
    show-sql: true # [SQL 로깅] 실행되는 JPA SQL 쿼리를 콘솔에 출력
    properties:
      hibernate.format_sql: true # [SQL 포맷팅] 콘솔 출력 SQL을 가독성 있게 들여쓰기 정렬

# [MyBatis 프레임워크 설정]
mybatis:
  # [XML 매퍼 위치] src/main/resources/mappers 디렉터리 하위의 모든 .xml 매퍼 파일 자동 스캔
  mapper-locations: classpath:mappers/**/*.xml
  
  # [타입 별칭 패키지] XML에서 com.example.domain.Post 대신 Post 단축 클래스명 사용 허용
  type-aliases-package: com.example.domain</code></pre>

                <h3>1-2. Oracle DB 연동 설정 (application.yml)</h3>
                <pre><code class="language-yaml">spring:
  datasource:
    # [Oracle JDBC 드라이버] Oracle 19c/21c ojdbc11 공식 드라이버 클래스
    driver-class-name: oracle.jdbc.OracleDriver
    
    # [Oracle Thin 접속 URL] 포트 1521, PDB(플러그러블 DB) 서비스명 XEPDB1 지정
    url: jdbc:oracle:thin:@localhost:1521/XEPDB1
    
    # [Oracle 인증 계정]
    username: myuser
    password: oracle_password
    
    # [HikariCP 커넥션 풀 설정]
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      idle-timeout: 300000
      pool-name: Oracle-HikariPool

  jpa:
    # [Oracle 전용 JPA 방언] Oracle SQL (FETCH FIRST n ROWS, Sequence 등) dialect 지정
    database-platform: org.hibernate.dialect.OracleDialect
    
    hibernate:
      ddl-auto: update # 개발 환경 DDL 자동 업데이트
    
    show-sql: true
    properties:
      hibernate.format_sql: true

mybatis:
  mapper-locations: classpath:mappers/**/*.xml
  type-aliases-package: com.example.domain</code></pre>

                <h2>2단계: 데이터베이스 테이블 생성 (DDL 스크립트)</h2>
                
                <h3>2-1. MariaDB DDL 스크립트</h3>
                <pre><code class="language-sql">-- [사용자 테이블 생성 DDL]
-- AUTO_INCREMENT: 사용자 생성 시 user_id PK 값을 1씩 자동 증가
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY, -- [기본키] 사용자 고유 식별자 ID
    username VARCHAR(50) NOT NULL UNIQUE,       -- [로그인 ID] 중복 방지를 위한 UNIQUE 제약조건
    password VARCHAR(255) NOT NULL,              -- [비밀번호] BCrypt 암호화 해시 문자열 저장
    email VARCHAR(100) NOT NULL,                 -- [이메일 주소]
    role VARCHAR(20) DEFAULT 'ROLE_USER',        -- [권한] 기본값 ROLE_USER (ROLE_ADMIN 등)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- [가입일시] 레코드 생성 시 현재 시간 자동 입력
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- [게시글 테이블 생성 DDL]
CREATE TABLE posts (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY, -- [기본키] 게시글 고유 식별자 ID
    user_id BIGINT NOT NULL,                    -- [외래키 참조] 작성자 users.user_id
    title VARCHAR(200) NOT NULL,                -- [게시글 제목]
    content TEXT NOT NULL,                      -- [게시글 본문 내용]
    view_count INT DEFAULT 0,                   -- [조회수] 기본값 0
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- [작성일시]
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- [수정일시] UPDATE 시 자동 갱신
    -- [외래키 제약조건] ON DELETE CASCADE: 사용자 탈퇴/삭제 시 해당 작성자의 게시글 모두 자동 삭제
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- [첨부파일 테이블 생성 DDL]
CREATE TABLE attachments (
    attachment_id BIGINT AUTO_INCREMENT PRIMARY KEY, -- [기본키] 첨부파일 고유 ID
    post_id BIGINT NOT NULL,                         -- [외래키 참조] 속한 게시글 posts.post_id
    original_name VARCHAR(255) NOT NULL,             -- [원본 파일명] 사용자 업로드 시 파일명 (예: 보고서.pdf)
    stored_name VARCHAR(255) NOT NULL,               -- [저장 파일명] UUID 기반 중복 방지 파일명
    file_path VARCHAR(500) NOT NULL,                 -- [저장 경로] 서버 파일 시스템 물리 경로
    file_size BIGINT NOT NULL,                       -- [파일 용량] 바이트(Byte) 단위 크기
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    -- [업로드일시]
    -- [외래키 제약조건] ON DELETE CASCADE: 게시글 삭제 시 속한 첨부파일 정보도 자동 삭제
    CONSTRAINT fk_attachments_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;</code></pre>

                <h3>2-2. Oracle DB DDL 스크립트 (12c 이상 IDENTITY)</h3>
                <pre><code class="language-sql">-- [Oracle 사용자 테이블 DDL]
-- GENERATED BY DEFAULT AS IDENTITY: Oracle 12c 이상에서 제공되는 자동 증가 PK 기능
CREATE TABLE USERS (
    USER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, -- [PK] 사용자 ID
    USERNAME VARCHAR2(50) NOT NULL UNIQUE,                       -- [UNIQUE] 아이디 중복 금지
    PASSWORD VARCHAR2(255) NOT NULL,                              -- [암호화 비밀번호]
    EMAIL VARCHAR2(100) NOT NULL,                                 -- [이메일]
    ROLE VARCHAR2(20) DEFAULT 'ROLE_USER',                        -- [권한 기본값]
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP                -- [생성일시]
);

-- [Oracle 게시글 테이블 DDL]
CREATE TABLE POSTS (
    POST_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, -- [PK] 게시글 ID
    USER_ID NUMBER NOT NULL,                                     -- [FK] 작성자 ID
    TITLE VARCHAR2(200) NOT NULL,                                -- [제목]
    CONTENT CLOB NOT NULL,                                       -- [대용량 본문] Oracle 대용량 텍스트 CLOB 사용
    VIEW_COUNT NUMBER DEFAULT 0,                                 -- [조회수]
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,               -- [작성일]
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,               -- [수정일]
    CONSTRAINT FK_POSTS_USER FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- [Oracle 첨부파일 테이블 DDL]
CREATE TABLE ATTACHMENTS (
    ATTACHMENT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, -- [PK] 파일 ID
    POST_ID NUMBER NOT NULL,                                           -- [FK] 게시글 ID
    ORIGINAL_NAME VARCHAR2(255) NOT NULL,                           -- [원본 파일명]
    STORED_NAME VARCHAR2(255) NOT NULL,                             -- [UUID 저장 파일명]
    FILE_PATH VARCHAR2(500) NOT NULL,                               -- [물리 경로]
    FILE_SIZE NUMBER NOT NULL,                                     -- [파일 크기]
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                 -- [등록일시]
    CONSTRAINT FK_ATTACHMENTS_POST FOREIGN KEY (POST_ID) REFERENCES POSTS(POST_ID) ON DELETE CASCADE
);</code></pre>

                <h2>3단계: Spring Data JPA 연동 구현</h2>

                <h3>3-1. JPA Entity 클래스 작성</h3>
                <pre><code class="language-java">package com.example.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// [@Entity] JPA가 관리하는 데이터베이스 테이블 매핑 클래스 선언
@Entity
// [@Table] 매핑될 DB 테이블 이름 지정
@Table(name = "posts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 기본 생성자 생성 (외부 접근 제한)
@AllArgsConstructor
@Builder
public class Post {

    // [@Id] 테이블의 Primary Key(기본키) 필드 지정
    @Id
    // [@GeneratedValue] DB의 AUTO_INCREMENT / IDENTITY 자동 증가 채번 사용
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    // [@ManyToOne] N:1 관계 매핑 (게시글 N개 : 사용자 1명)
    // [FetchType.LAZY] 지연 로딩 설정: 필요할 때만 작성자 객체를 조회하여 N+1 쿼리 방지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder.Default
    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // [@OneToMany] 1:N 연관관계 매핑 (게시글 1개 : 첨부파일 N개)
    // [mappedBy = "post"] Attachment 엔티티의 post 필드에 의해 매핑됨을 명시
    // [cascade = CascadeType.ALL] 게시글 저장/삭제 시 속한 첨부파일 엔티티도 함께 저장/삭제
    // [orphanRemoval = true] 게시글에서 첨부파일 객체 제거 시 DB에서도 자동 삭제 (고아 객체 제거)
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Attachment> attachments = new ArrayList<>();

    // [@PrePersist] JPA 엔티티가 최초로 DB에 저장(Persist)되기 직전에 현재 시간 자동 입력
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // [양방향 연관관계 편의 메서드] 게시글과 첨부파일 연관관계를 양쪽 객체 모두에 안전하게 추가
    public void addAttachment(Attachment attachment) {
        attachments.add(attachment);
        attachment.setPost(this);
    }
}</code></pre>

                <h3>3-2. Spring Data JPA Repository 인터페이스</h3>
                <pre><code class="language-java">package com.example.repository;

import com.example.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

// [JpaRepository<엔티티, PK타입>] 기본 CRUD (save, findById, delete 등) 메서드 자동 생성
public interface PostRepository extends JpaRepository<Post, Long> {

    // [@Query JPQL & Fetch Join] N+1 조회 성능 문제를 방지하기 위해 
    // 작성자(author) 및 첨부파일(attachments) 객체를 1번의 조인 쿼리로 한꺼번에 영속성 컨텍스트에 로드
    @Query("SELECT p FROM Post p JOIN FETCH p.author LEFT JOIN FETCH p.attachments WHERE p.id = :id")
    Optional<Post> findByIdWithDetails(@Param("id") Long id);
}</code></pre>

                <h2>4단계: MyBatis 연동 구현 (Mapper XML & Java Interface)</h2>

                <h3>4-1. PostMapper.java 인터페이스</h3>
                <pre><code class="language-java">package com.example.mapper;

import com.example.dto.PostDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

// [@Mapper] MyBatis 매퍼 인터페이스임을 선언 (Spring이 구현체를 다이내믹 프록시로 자동 생성)
@Mapper
public interface PostMapper {
    
    // [게시글 전체 목록 조회]
    List<PostDto> selectAllPosts();
    
    // [특정 게시글 상세 및 첨부파일 조회] @Param으로 XML 매퍼 파라미터명 지정
    PostDto selectPostById(@Param("postId") Long postId);
    
    // [신규 게시글 등록] 등록 후 생성된 PK(postId)가 postDto에 자동으로 저장됨
    int insertPost(PostDto postDto);
    
    // [첨부파일 정보 등록]
    int insertAttachment(@Param("postId") Long postId, @Param("originalName") String originalName, 
                         @Param("storedName") String storedName, @Param("filePath") String filePath, 
                         @Param("fileSize") long fileSize);
}</code></pre>

                <h3>4-2. PostMapper.xml (SQL 매퍼 매핑 XML)</h3>
                <pre><code class="language-xml">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;

&lt;!-- [namespace] 연결될 Java 인터페이스의 풀 패키지 경로 지정 --&gt;
&lt;mapper namespace="com.example.mapper.PostMapper"&gt;

    &lt;!-- [<resultMap>] DB의 복잡한 JOIN 결과를 Java DTO 복합 객체 구조로 매핑 정의 --&gt;
    &lt;resultMap id="PostResultMap" type="com.example.dto.PostDto"&gt;
        &lt;!-- <id>: PK 기본키 컬럼 매핑 --&gt;
        &lt;id property="postId" column="post_id"/&gt;
        &lt;!-- <result>: 일반 DB 컬럼과 Java 객체 필드 매핑 --&gt;
        &lt;result property="title" column="title"/&gt;
        &lt;result property="content" column="content"/&gt;
        &lt;result property="authorName" column="username"/&gt;
        &lt;result property="createdAt" column="created_at"/&gt;
        
        &lt;!-- [<collection>] 1:N 쿼리 결과를 List<AttachmentDto> 리스트 필드에 자동으로 묶어서 바인딩 --&gt;
        &lt;collection property="attachments" ofType="com.example.dto.AttachmentDto"&gt;
            &lt;id property="attachmentId" column="attachment_id"/&gt;
            &lt;result property="originalName" column="original_name"/&gt;
            &lt;result property="storedName" column="stored_name"/&gt;
            &lt;result property="fileSize" column="file_size"/&gt;
        &lt;/collection&gt;
    &lt;/resultMap&gt;

    &lt;!-- [게시글 및 첨부파일 JOIN 상세 조회 쿼리] --&gt;
    &lt;select id="selectPostById" resultMap="PostResultMap"&gt;
        SELECT 
            p.post_id, p.title, p.content, p.created_at,
            u.username,
            a.attachment_id, a.original_name, a.stored_name, a.file_size
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        LEFT JOIN attachments a ON p.post_id = a.post_id
        WHERE p.post_id = #{postId}
    &lt;/select&gt;

    &lt;!-- [게시글 등록 쿼리] --&gt;
    &lt;!-- useGeneratedKeys="true": DB에서 생성된 자동증가 PK 값을 가져옴 --&gt;
    &lt;!-- keyProperty="postId": 가져온 PK 값을 postDto.setPostId()에 자동으로 설정 --&gt;
    &lt;insert id="insertPost" useGeneratedKeys="true" keyProperty="postId" keyColumn="post_id"&gt;
        INSERT INTO posts (user_id, title, content, view_count, created_at)
        VALUES (#{userId}, #{title}, #{content}, 0, CURRENT_TIMESTAMP)
    &lt;/insert&gt;

&lt;/mapper&gt;</code></pre>

                <h2>5단계: 화면단 샘플 UI (HTML5 + JavaScript 대시보드)</h2>
                <pre><code class="language-html">&lt;div class="board-container"&gt;
    &lt;h2&gt;📋 게시판 &amp; 파일 첨부 샘플 화면&lt;/h2&gt;

    &lt;!-- 게시글 작성 폼 --&gt;
    &lt;form id="post-form" class="card-form"&gt;
        &lt;input type="text" id="post-title" placeholder="게시글 제목을 입력하세요" required&gt;
        &lt;textarea id="post-content" placeholder="게시글 내용을 작성하세요..." required&gt;&lt;/textarea&gt;
        &lt;input type="file" id="post-file" multiple&gt;
        &lt;button type="submit" class="btn-submit"&gt;게시글 등록&lt;/button&gt;
    &lt;/form&gt;

    &lt;!-- 게시글 목록이 동적으로 삽입될 레이아웃 영역 --&gt;
    &lt;div id="posts-list" class="posts-list"&gt;
        &lt;div class="loading"&gt;데이터베이스에서 게시글을 조회 중입니다...&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
// [비동기 API 데이터 조회 메서드]
async function fetchPosts() {
    // 1. Spring REST Controller (/api/v1/posts) 호출하여 DB 조회 결과 수신
    const res = await fetch('/api/v1/posts');
    const posts = await res.json();
    const listEl = document.getElementById('posts-list');
    
    // 2. JS Array.map()을 활용해 수신된 DB 쿼리 데이터를 동적 HTML 카드로 바인딩
    listEl.innerHTML = posts.map(p => \`
        &lt;div class="post-card"&gt;
            &lt;h3&gt;\${p.title} &lt;small&gt;작성자: \${p.authorName}&lt;/small&gt;&lt;/h3&gt;
            &lt;p&gt;\${p.content}&lt;/p&gt;
            \${p.attachments.length ? \`
                &lt;div class="attachments"&gt;
                    📁 첨부파일: 
                    \${p.attachments.map(a => \`
                        &lt;a href="/api/v1/files/download/\${a.storedName}" download&gt;\${a.originalName}&lt;/a&gt;
                    \`).join(', ')}
                &lt;/div&gt;
            \` : ''}
        &lt;/div&gt;
    \`).join('');
}
// 페이지 초기화 시 데이터 로드 실행
fetchPosts();
&lt;/script&gt;</code></pre>
            `
        }
    }
};

export function setupGuides() {
    const guideCards = document.querySelectorAll('.guide-card');
    const backBtn = document.getElementById('btn-back-to-guides');

    if (guideCards.length > 0) {
        guideCards.forEach(card => {
            const readMoreBtn = card.querySelector('.btn-read-more');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => {
                    const articleId = card.getAttribute('data-article');
                    const lang = document.documentElement.lang || 'en';
                    const articleData = guidesData[articleId];
                    
                    if (articleData && articleData[lang]) {
                        injectArticle(articleData[lang]);
                        window.location.hash = `article-${articleId}`;
                    } else if (articleData && articleData['en']) {
                        injectArticle(articleData['en']);
                        window.location.hash = `article-${articleId}`;
                    }
                });
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.hash = 'guides-view';
        });
    }
}

export function injectArticle(data) {
    const content = document.getElementById('full-article-content');
    if (!content) return;
    
    content.innerHTML = `
        <h1 class="article-title">${data.title}</h1>
        <div class="article-meta">
            <span class="read-time">Read time: ~12 min</span> | 
            <span class="category">Spring Boot 3.3 &amp; Security</span>
        </div>
        <div class="article-body">
            ${data.content}
        </div>
    `;
    // Update document title
    document.title = `${data.title} | Parse Utils`;
}

export function getArticleData(id) {
    return guidesData[id];
}

