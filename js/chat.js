// --- Real-time Chat Module ---

export function setupChat() {
    const chatView = document.getElementById('chat-view');
    if (!chatView) return;

    const socket = io(); // Connects to the same host that served the page

    const messageList = document.getElementById('chat-messages');
    const userInput = document.getElementById('chat-username');
    const msgInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('btn-chat-send');
    const connectionStatus = document.getElementById('connection-status');

    // --- Socket Events ---

    socket.on('connect', () => {
        updateStatus('Connected', 'online');
        console.log('[Chat] Connected to server.');
    });

    socket.on('disconnect', () => {
        updateStatus('Disconnected', 'offline');
        console.warn('[Chat] Disconnected from server.');
    });

    socket.on('message history', (history) => {
        messageList.innerHTML = '';
        if (history.length === 0) {
            messageList.innerHTML = '<div class="placeholder-text">No messages yet. Start the conversation!</div>';
        } else {
            history.forEach(appendMessage);
        }
        scrollToBottom();
    });

    socket.on('chat message', (msg) => {
        // Remove placeholder if it exists
        const placeholder = messageList.querySelector('.placeholder-text');
        if (placeholder) placeholder.remove();

        appendMessage(msg);
        scrollToBottom();
    });

    // --- UI Actions ---

    function sendMessage() {
        const text = msgInput.value.trim();
        const user = userInput.value.trim() || 'Anonymous';

        if (text) {
            socket.emit('chat message', { user, text });
            msgInput.value = '';
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    msgInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // --- Helpers ---

    function appendMessage(msg) {
        const item = document.createElement('div');
        item.classList.add('message-item');
        
        const timestamp = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        item.innerHTML = `
            <div class="msg-meta">
                <span class="msg-user">${escapeHTML(msg.user)}</span>
                <span class="msg-time">${timestamp}</span>
            </div>
            <div class="msg-text">${escapeHTML(msg.text)}</div>
        `;
        
        messageList.appendChild(item);
    }

    function scrollToBottom() {
        messageList.scrollTop = messageList.scrollHeight;
    }

    function updateStatus(text, className) {
        const statusText = connectionStatus.querySelector('.status-text');
        statusText.textContent = text;
        connectionStatus.className = `status-indicator ${className}`;
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }
}
