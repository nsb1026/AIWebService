// --- Gemini AI Assistant Logic ---

export const setupAiAssistant = () => {
    const btnSubmit = document.getElementById('btn-ai-submit');
    const btnSaveKey = document.getElementById('btn-save-key');
    const inputKey = document.getElementById('gemini-api-key');
    const inputPrompt = document.getElementById('ai-input');
    const outputArea = document.getElementById('ai-output');
    const modelSelect = document.getElementById('gemini-model');
    const presetSelect = document.getElementById('ai-preset');
    const loader = document.getElementById('ai-loader');

    // Load saved key
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        inputKey.value = savedKey;
    }

    // Save Key logic
    btnSaveKey.addEventListener('click', () => {
        const key = inputKey.value.trim();
        if (key) {
            localStorage.setItem('gemini_api_key', key);
            alert('API Key saved locally!');
        } else {
            localStorage.removeItem('gemini_api_key');
            alert('API Key cleared.');
        }
    });

    // Preset logic
    presetSelect.addEventListener('change', () => {
        const val = presetSelect.value;
        const currentText = inputPrompt.value;
        
        const presets = {
            'extract-json': 'Extract all JSON objects from the following text and format them nicely:\n\n',
            'fix-html': 'The following HTML is broken or poorly formatted. Please fix the structure and indent it correctly:\n\n',
            'explain-code': 'Please explain what this code does in simple terms for a developer:\n\n',
            'convert-format': 'Convert the following data into a clean JSON array of objects:\n\n'
        };

        if (presets[val]) {
            inputPrompt.value = presets[val] + currentText;
        }
    });

    // Submit to Gemini API
    btnSubmit.addEventListener('click', async () => {
        const key = inputKey.value.trim();
        const prompt = inputPrompt.value.trim();
        const model = modelSelect.value;

        if (!key) {
            alert('Please enter your Gemini API Key first.');
            return;
        }
        if (!prompt) {
            alert('Please enter a prompt or data.');
            return;
        }

        loader.style.display = 'block';
        outputArea.value = 'Gemini is thinking...';

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            const aiText = data.candidates[0].content.parts[0].text;
            outputArea.value = aiText;

        } catch (error) {
            console.error('AI Error:', error);
            outputArea.value = `Error: ${error.message}\n\nPlease check your API key and network connection.`;
        } finally {
            loader.style.display = 'none';
        }
    });
};
