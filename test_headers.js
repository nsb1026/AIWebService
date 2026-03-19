const nodeFetch = require('node-fetch');

async function testHeaderForwarding() {
    console.log("--- Testing Proxy Header Forwarding ---");
    
    // 1. Start the proxy server logic locally (simulated)
    const testUrl = 'https://httpbin.org/headers';
    const testHeaders = {
        'Authorization': 'Bearer test-token-123',
        'X-Custom-Header': 'CustomValue'
    };
    
    console.log(`Target URL: ${testUrl}`);
    console.log(`Sending Headers:`, testHeaders);

    try {
        // Simulate what server.js does
        const fetchOptions = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0...',
                ...testHeaders
            }
        };
        
        const response = await nodeFetch(testUrl, fetchOptions);
        const data = await response.json();
        
        console.log("\n--- Response from httpbin.org (what the target API received) ---");
        console.log(JSON.stringify(data.headers, null, 2));
        
        if (data.headers['Authorization'] === 'Bearer test-token-123' && 
            data.headers['X-Custom-Header'] === 'CustomValue') {
            console.log("\n✅ Success: Headers were correctly forwarded!");
        } else {
            console.log("\n❌ Failure: Headers were missing or incorrect.");
        }
    } catch (error) {
        console.error("Test failed:", error);
    }
}

testHeaderForwarding();
