// --- Base64 to Image Tool ---

/**
 * Initializes the Base64 to Image tool.
 */
export function setupBase64ImageTool() {
    const b64Input = document.getElementById('b64-input');
    const b64ClearBtn = document.getElementById('btn-b64-clear');
    const b64PreviewContainer = document.getElementById('b64-preview-container');
    const b64DownloadBtn = document.getElementById('btn-b64-download');
    const b64Status = document.getElementById('b64-status');

    if (!b64Input || !b64PreviewContainer || !b64DownloadBtn) return;

    const updatePreview = () => {
        const rawValue = b64Input.value.trim();
        
        if (!rawValue) {
            b64PreviewContainer.innerHTML = '<p class="placeholder-text">Image preview will appear here.</p>';
            b64DownloadBtn.disabled = true;
            b64Status.textContent = '';
            b64Status.className = 'json-status';
            return;
        }

        let b64String = rawValue;
        
        // Check if it already has a data URI prefix
        if (!b64String.startsWith('data:image/')) {
            // Try to prepend a default prefix if it looks like raw base64
            // We'll try png by default, but browser might be lenient
            b64String = `data:image/png;base64,${b64String}`;
        }

        // Create image element to test
        const img = new Image();
        img.onload = () => {
            b64PreviewContainer.innerHTML = '';
            b64PreviewContainer.appendChild(img);
            b64DownloadBtn.disabled = false;
            b64Status.textContent = 'Valid Image';
            b64Status.className = 'json-status success';
        };

        img.onerror = () => {
            b64PreviewContainer.innerHTML = '<p class="placeholder-text error-text">Invalid Base64 image data.</p>';
            b64DownloadBtn.disabled = true;
            b64Status.textContent = 'Invalid Data';
            b64Status.className = 'json-status error';
        };

        img.src = b64String;
        img.alt = 'Base64 Preview';
        img.className = 'preview-image';
    };

    b64Input.addEventListener('input', updatePreview);

    b64ClearBtn.addEventListener('click', () => {
        b64Input.value = '';
        updatePreview();
    });

    b64DownloadBtn.addEventListener('click', () => {
        const img = b64PreviewContainer.querySelector('img');
        if (!img) return;

        const link = document.createElement('a');
        link.href = img.src;
        
        // Try to guess extension from data URI
        let extension = 'png';
        const match = img.src.match(/^data:image\/(\w+);base64,/);
        if (match && match[1]) {
            extension = match[1];
        }

        link.download = `parse-utils-image.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
