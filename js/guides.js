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
                <pre><code>plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // JJWT 0.12.5 Modern Library
    implementation 'io.jsonwebtoken:jjwt-api:0.12.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.5'
}</code></pre>

                <h2>2. Application Configuration (application.yml)</h2>
                <p>Define your 256-bit HMAC secret key and token expiration times in <code>application.yml</code>:</p>
                <pre><code>jwt:
  secret: "v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp" # Min 256-bit secret
  access-token-expiration: 1800000   # 30 Minutes in Milliseconds
  refresh-token-expiration: 604800000 # 7 Days in Milliseconds</code></pre>

                <h2>3. JWT Utility Class (JwtTokenProvider.java)</h2>
                <p>Create a token provider using JJWT 0.12.x fluent builder and parser APIs:</p>
                <pre><code>package com.example.config.jwt;

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

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long accessTokenExpiration;

    public JwtTokenProvider(
            @Value("\${jwt.secret}") String secret,
            @Value("\${jwt.access-token-expiration}") long accessTokenExpiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = accessTokenExpiration;
    }

    // 1. Generate JWT Access Token (JJWT 0.12.x Builder)
    public String createAccessToken(String username, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(validity)
                .signWith(secretKey)
                .compact();
    }

    // 2. Validate JWT Signature &amp; Expiration
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Token expired or tampered
        }
    }

    // 3. Extract Spring Security Authentication
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String username = claims.getSubject();
        String role = claims.get("role", String.class);
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        User principal = new User(username, "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }
}</code></pre>

                <h2>4. Custom Security Filter (JwtAuthenticationFilter.java)</h2>
                <p>Intercept HTTP requests to extract the Bearer token and populate the SecurityContext:</p>
                <pre><code>package com.example.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);

        if (StringUtils.hasText(token) &amp;&amp; tokenProvider.validateToken(token)) {
            Authentication auth = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) &amp;&amp; bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}</code></pre>

                <h2>5. Spring Security 6 Config (SecurityConfig.java)</h2>
                <p>Configure stateless session policy and register the JWT filter using Spring Security 6 Lambda DSL:</p>
                <pre><code>package com.example.config;

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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -&gt; csrf.disable())
            .sessionManagement(session -&gt; session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -&gt; auth
                .requestMatchers("/api/auth/**", "/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}</code></pre>

                <h2>6. Authentication Controller (AuthController.java)</h2>
                <p>Expose REST endpoints for authenticating user credentials and issuing JWT tokens:</p>
                <pre><code>package com.example.controller;

import com.example.config.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider tokenProvider;

    public AuthController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity&lt;?&gt; login(@RequestBody Map&lt;String, String&gt; loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        if ("admin".equals(username) &amp;&amp; "password123".equals(password)) {
            String token = tokenProvider.createAccessToken(username, "ADMIN");
            return ResponseEntity.ok(Map.of(
                "token_type", "Bearer",
                "access_token", token,
                "expires_in", 1800
            ));
        }

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
                <pre><code>plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // JJWT 0.12.5 최신 암호화 라이브러리
    implementation 'io.jsonwebtoken:jjwt-api:0.12.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.5'
}</code></pre>

                <h2>2단계: application.yml 서명 키 및 만료시간 설정</h2>
                <p>최소 256비트 이상의 HMAC SHA-256 비밀키와 토큰 유효 기간을 설정합니다:</p>
                <pre><code>jwt:
  secret: "v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp" # 최소 256비트 암호키
  access-token-expiration: 1800000   # 30분 (밀리초)
  refresh-token-expiration: 604800000 # 7일 (밀리초)</code></pre>

                <h2>3단계: JwtTokenProvider.java (토큰 생성, 검증 및 추출)</h2>
                <p>JJWT 0.12.x의 최신 파서 및 빌더 API를 사용하여 토큰 컴포넌트를 구현합니다:</p>
                <pre><code>package com.example.config.jwt;

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

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long accessTokenExpiration;

    public JwtTokenProvider(
            @Value("\${jwt.secret}") String secret,
            @Value("\${jwt.access-token-expiration}") long accessTokenExpiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = accessTokenExpiration;
    }

    // 1. JWT Access Token 발급 (JJWT 0.12.x 빌더)
    public String createAccessToken(String username, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(validity)
                .signWith(secretKey)
                .compact();
    }

    // 2. JWT 서명 및 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false; // 만료되었거나 변조된 토큰
        }
    }

    // 3. 토큰에서 Spring Security Authentication 인증 객체 생성
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String username = claims.getSubject();
        String role = claims.get("role", String.class);
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        User principal = new User(username, "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }
}</code></pre>

                <h2>4단계: JwtAuthenticationFilter.java (Spring Security 필터)</h2>
                <p>HTTP 요청 헤더의 <code>Authorization: Bearer &lt;token&gt;</code>을 추출하고 검증하여 보안 컨텍스트에 등록합니다:</p>
                <pre><code>package com.example.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);

        if (StringUtils.hasText(token) &amp;&amp; tokenProvider.validateToken(token)) {
            Authentication auth = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) &amp;&amp; bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}</code></pre>

                <h2>5단계: SecurityConfig.java (Spring Security 6 Lambda DSL 설정)</h2>
                <p>무상태 세션 정책과 JWT 필터를 등록하는 보안 체인을 구성합니다:</p>
                <pre><code>package com.example.config;

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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -&gt; csrf.disable()) // REST API 무상태 설정
            .sessionManagement(session -&gt; session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -&gt; auth
                .requestMatchers("/api/auth/**", "/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}</code></pre>

                <h2>6단계: AuthController.java (로그인 REST API 컨트롤러)</h2>
                <p>사용자 인증 후 JWT 토큰을 발급하는 REST 엔드포인트를 구현합니다:</p>
                <pre><code>package com.example.controller;

import com.example.config.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider tokenProvider;

    public AuthController(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity&lt;?&gt; login(@RequestBody Map&lt;String, String&gt; loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        if ("admin".equals(username) &amp;&amp; "password123".equals(password)) {
            String token = tokenProvider.createAccessToken(username, "ADMIN");
            return ResponseEntity.ok(Map.of(
                "token_type", "Bearer",
                "access_token", token,
                "expires_in", 1800
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
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

@Getter
@NoArgsConstructor
public class LoginRequestDto {

    @NotBlank(message = "Username is required")
    private String username;

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

@Getter
@Builder
public class JwtTokenResponseDto {
    private String grantType;     // "Bearer"
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiresIn; // Milliseconds
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

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .map(user -> new User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/signup").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
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

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public JwtTokenResponseDto login(LoginRequestDto loginDto) {
        // 1. Authenticate user credentials against Spring Security Provider
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 2. Generate Access & Refresh Tokens upon successful authentication
        String accessToken = tokenProvider.createAccessToken(authentication.getName(), "USER");
        String refreshToken = tokenProvider.createRefreshToken(authentication.getName());

        return JwtTokenResponseDto.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .accessTokenExpiresIn(1800000L) // 30 minutes
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

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

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

@Getter
@NoArgsConstructor
public class LoginRequestDto {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String username;

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

@Getter
@Builder
public class JwtTokenResponseDto {
    private String grantType;     // "Bearer"
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiresIn; // 만료 시간 (밀리초)
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

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .map(user -> new User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/signup").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
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

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public JwtTokenResponseDto login(LoginRequestDto loginDto) {
        // 1. 사용자 ID/PW로 Spring Security 인증 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // 2. 인증 수행 (CustomUserDetailsService.loadUserByUsername 호출 및 BCrypt 검증)
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. 인증 성공 시 Access Token & Refresh Token 생성
        String accessToken = tokenProvider.createAccessToken(authentication.getName(), "USER");
        String refreshToken = tokenProvider.createRefreshToken(authentication.getName());

        return JwtTokenResponseDto.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .accessTokenExpiresIn(1800000L) // 30분
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

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponseDto> login(@Valid @RequestBody LoginRequestDto loginDto) {
        JwtTokenResponseDto tokenResponse = authService.login(loginDto);
        return ResponseEntity.ok(tokenResponse);
    }
}</code></pre>
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

