// components/ChatWidget.js

export class ChatWidget {
    constructor(config = {}) {
        this.config = {
            apiUrl: config.apiUrl || 'https://volunteerwebsite-production.up.railway.app/api/chat',
            logoPath: config.logoPath || 'assets/images/logo.png',
            botName: config.botName || 'EM Bot',
            botDescription: config.botDescription || 'Trợ lý tình nguyện',
            autoOpen: config.autoOpen !== undefined ? config.autoOpen : true,
            maxHistoryPairs: config.maxHistoryPairs || 5  // Giới hạn 5 cặp hội thoại (10 messages)
        };
        
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.render();
        this.attachEventListeners();
        
        // Add welcome message (marked as system message)
        this.addMessage('assistant', 
            'Xin chào! Tôi là ' + this.config.botName + '. Tôi có thể giúp bạn tìm hiểu về dự án tình nguyện. Bạn cần hỏi gì không?',
            true  // isWelcome flag
        );
        
        // Auto open on first visit
        if (this.config.autoOpen) {
            setTimeout(() => this.openChat(), 500);
        }
    }
    
    render() {
        const container = document.getElementById('chatWidgetContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="chat-widget">
                <!-- Toggle Button -->
                <button class="chat-toggle-btn" id="chatToggleBtn">
                    <img src="${this.config.logoPath}" alt="Logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2216%22 fill=%22%23667eea%22/%3E%3Ctext x=%2216%22 y=%2220%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2216%22 font-weight=%22bold%22%3EEM%3C/text%3E%3C/svg%3E'">
                    <span>Ask ${this.config.botName}</span>
                </button>
                
                <!-- Chat Box -->
                <div class="chat-box-container" id="chatBoxContainer">
                    <!-- Header -->
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <img src="${this.config.logoPath}" alt="Bot Avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%2220%22 fill=%22%23667eea%22/%3E%3Ctext x=%2220%22 y=%2225%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2218%22 font-weight=%22bold%22%3EEM%3C/text%3E%3C/svg%3E'">
                            <div class="chat-header-text">
                                <h3>${this.config.botName}</h3>
                                <p>${this.config.botDescription}</p>
                            </div>
                        </div>
                        <button class="chat-close-btn" id="chatCloseBtn">✕</button>
                    </div>
                    
                    <!-- Messages -->
                    <div class="chat-messages" id="chatMessages">
                        <!-- Messages will be added dynamically -->
                    </div>
                    
                    <!-- Input -->
                    <div class="chat-input-container">
                        <textarea 
                            class="chat-input" 
                            id="chatInput" 
                            placeholder="Nhập câu hỏi của bạn..."
                            rows="1"
                        ></textarea>
                        <button class="chat-send-btn" id="chatSendBtn">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const toggleBtn = document.getElementById('chatToggleBtn');
        const closeBtn = document.getElementById('chatCloseBtn');
        const sendBtn = document.getElementById('chatSendBtn');
        const input = document.getElementById('chatInput');
        
        toggleBtn?.addEventListener('click', () => this.toggleChat());
        closeBtn?.addEventListener('click', () => this.closeChat());
        sendBtn?.addEventListener('click', () => this.sendMessage());
        
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        input?.addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const chatBox = document.getElementById('chatBoxContainer');
        chatBox?.classList.add('active');
        this.isOpen = true;
        
        // Focus input
        setTimeout(() => {
            document.getElementById('chatInput')?.focus();
        }, 300);
    }
    
    closeChat() {
        const chatBox = document.getElementById('chatBoxContainer');
        chatBox?.classList.remove('active');
        this.isOpen = false;
    }
    
    /**
     * Build formatted prompt with history
     */
    buildFormattedPrompt(currentQuestion) {
        let formattedPrompt = "";
        
        // Filter chat history (exclude welcome message)
        const chatHistory = this.messages.filter(
            msg => !msg.isWelcome
        );
        
        // Add history if exists
        if (chatHistory.length > 0) {
            formattedPrompt += "[LỊCH SỬ HỘI THOẠI]\n";
            
            // Get last N pairs (maxHistoryPairs * 2 messages)
            const maxMessages = this.config.maxHistoryPairs * 2;
            const recentHistory = chatHistory.slice(-maxMessages);
            
            for (const msg of recentHistory) {
                if (msg.role === 'user') {
                    formattedPrompt += `Người dùng: ${msg.content}\n`;
                } else if (msg.role === 'assistant') {
                    formattedPrompt += `AI Bot: ${msg.content}\n`;
                }
            }
            
            formattedPrompt += "\n";
        }
        
        // Add current question
        formattedPrompt += "[CÂU HỎI HIỆN TẠI]\n";
        formattedPrompt += currentQuestion;
        
        return formattedPrompt;
    }
    
    async sendMessage() {
        const input = document.getElementById('chatInput');
        const question = input?.value.trim();
        
        if (!question || this.isTyping) return;
        
        // Add user message to UI
        this.addMessage('user', question);
        input.value = '';
        input.style.height = 'auto';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Build formatted prompt with history
            const formattedPrompt = this.buildFormattedPrompt(question);
            
            console.log('[ChatWidget] Sending request:', {
                question: question,
                formatted_prompt_preview: formattedPrompt.substring(0, 200) + '...'
            });
            
            // Send to backend
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    question: question,  // Raw question for embedding
                    formatted_prompt: formattedPrompt  // Full prompt with history
                })
            });
            
            const data = await response.json();
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            if (response.ok) {
                this.addMessage('assistant', data.answer);
            } else {
                this.addMessage('assistant', data.detail || 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('assistant', 'Xin lỗi, không thể kết nối đến server. Vui lòng thử lại sau.');
            console.error('[ChatWidget] Error:', error);
        }
    }
    
    addMessage(role, content, isWelcome = false) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        
        const avatar = role === 'user' ? '👤' : '🤖';
        
        // Parse markdown for assistant messages, escape HTML for user messages
        const messageContent = role === 'assistant' && typeof marked !== 'undefined'
            ? marked.parse(content)
            : this.escapeHtml(content);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-wrapper">
                <div class="message-content markdown-content">${messageContent}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store in history (with metadata)
        this.messages.push({ 
            role, 
            content, 
            isWelcome,
            timestamp: new Date() 
        });
        
        console.log('[ChatWidget] Message added. Total messages:', this.messages.length);
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        
        // Disable send button
        const sendBtn = document.getElementById('chatSendBtn');
        if (sendBtn) sendBtn.disabled = true;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator?.remove();
        this.isTyping = false;
        
        // Enable send button
        const sendBtn = document.getElementById('chatSendBtn');
        if (sendBtn) sendBtn.disabled = false;
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}