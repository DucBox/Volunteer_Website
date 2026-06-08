// ===================================
// ADMIN DASHBOARD JAVASCRIPT
// ===================================

// API Configuration
const API_BASE = 'https://volunteerwebsite-production.up.railway.app/api';

// State Management
const state = {
    documents: [],
    currentDocument: null,
    chatMessages: [],
    isLoading: false
};

// ===================================
// ADMIN KEY AUTH
// ===================================
let _adminKey = '';

function getAdminKey() {
    return _adminKey;
}

function adminHeaders(extra = {}) {
    return { 'X-Admin-Key': getAdminKey(), ...extra };
}

function showLoginOverlay() {
    const overlay = document.getElementById('loginOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => document.getElementById('adminKeyInput')?.focus(), 50);
}

function hideLoginOverlay() {
    document.getElementById('loginOverlay').style.display = 'none';
}

async function submitAdminKey() {
    const input = document.getElementById('adminKeyInput');
    const errorEl = document.getElementById('loginError');
    const key = input.value.trim();

    if (!key) {
        errorEl.textContent = 'Vui lòng nhập Admin Key.';
        return;
    }

    errorEl.textContent = '';

    try {
        const res = await fetch(`${API_BASE}/documents`, {
            headers: { 'X-Admin-Key': key }
        });

        if (res.status === 401) {
            errorEl.textContent = 'Admin Key không đúng. Vui lòng thử lại.';
            input.value = '';
            input.focus();
            return;
        }

        _adminKey = key;
        hideLoginOverlay();
        loadDocuments();
        // Dispatch event for module (handles race condition)
        document.dispatchEvent(new CustomEvent('admin-logged-in'));
        // Also call directly if module already loaded
        if (window._initContentManager) window._initContentManager();
    } catch {
        errorEl.textContent = 'Không thể kết nối đến server.';
    }
}

function handleUnauthorized() {
    _adminKey = '';
    document.getElementById('adminKeyInput').value = '';
    document.getElementById('loginError').textContent = 'Phiên đã hết hạn. Vui lòng đăng nhập lại.';
    showLoginOverlay();
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupUploadForm();
    setupDocumentList();
    setupChat();

    // Wire up login overlay actions (no inline handlers in HTML)
    document.getElementById('adminKeySubmitBtn')?.addEventListener('click', submitAdminKey);
    document.getElementById('adminKeyInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitAdminKey();
    });

    showLoginOverlay();
});

// ===================================
// NAVIGATION
// ===================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active to clicked
            item.classList.add('active');
            const sectionId = item.dataset.section;
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// ===================================
// UPLOAD SECTION
// ===================================
function setupUploadForm() {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const uploadBtn = document.getElementById('uploadBtn');
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
        } else {
            fileNameDisplay.textContent = 'Chọn file hoặc kéo thả vào đây';
        }
    });
    
    // Drag and drop
    const fileLabel = document.querySelector('.file-input-label');
    
    fileLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = 'var(--primary)';
    });
    
    fileLabel.addEventListener('dragleave', () => {
        fileLabel.style.borderColor = 'var(--gray-300)';
    });
    
    fileLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = 'var(--gray-300)';
        
        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            fileNameDisplay.textContent = file.name;
        }
    });
    
    // Form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await uploadDocument();
    });
}

async function uploadDocument() {
    const docName = document.getElementById('docName').value.trim();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const statusDiv = document.getElementById('uploadStatus');
    
    if (!docName || !file) {
        showStatus(statusDiv, 'Vui lòng nhập tên và chọn file!', 'error');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['.pdf', '.docx', '.txt'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
        showStatus(statusDiv, 'Chỉ hỗ trợ file PDF, DOCX, TXT!', 'error');
        return;
    }
    
    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showStatus(statusDiv, 'File quá lớn! Tối đa 10MB.', 'error');
        return;
    }
    
    showLoading(true);
    
    const formData = new FormData();
    formData.append('doc_name', docName);
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_BASE}/documents/upload`, {
            method: 'POST',
            headers: adminHeaders(),
            body: formData
        });
        if (response.status === 401) { handleUnauthorized(); return; }
        
        const data = await response.json();
        
        if (response.ok) {
            showStatus(statusDiv, 
                `✓ Upload thành công! Đã tạo ${data.chunks} chunks.`, 
                'success'
            );
            
            // Reset form
            document.getElementById('uploadForm').reset();
            document.getElementById('fileNameDisplay').textContent = 
                'Chọn file hoặc kéo thả vào đây';
            
            // Reload document list
            await loadDocuments();
            
            // Auto clear status after 3s
            setTimeout(() => {
                statusDiv.className = 'status-message';
            }, 3000);
        } else {
            showStatus(statusDiv, data.detail || 'Upload thất bại!', 'error');
        }
    } catch (error) {
        console.error('[Upload] Error:', error);
        showStatus(statusDiv, `Lỗi: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// ===================================
// DOCUMENTS SECTION
// ===================================
function setupDocumentList() {
    const refreshBtn = document.getElementById('refreshBtn');
    const searchInput = document.getElementById('searchInput');
    
    refreshBtn.addEventListener('click', () => loadDocuments());
    
    searchInput.addEventListener('input', (e) => {
        filterDocuments(e.target.value);
    });
}

async function loadDocuments() {
    showLoading(true);

    try {
        const response = await fetch(`${API_BASE}/documents`, {
            headers: adminHeaders()
        });
        if (response.status === 401) { handleUnauthorized(); showLoading(false); return; }
        const data = await response.json();

        state.documents = data;
        renderDocumentList(data);
        updateDocumentCount(data.length);
    } catch (error) {
        showStatus(
            document.getElementById('documentList'),
            'Không thể tải danh sách tài liệu!',
            'error'
        );
    } finally {
        showLoading(false);
    }
}

function renderDocumentList(documents) {
    const listContainer = document.getElementById('documentList');
    
    if (documents.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray-700);">
                <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 16px; color: var(--gray-300);"></i>
                <p>Chưa có tài liệu nào</p>
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = documents.map(doc => `
        <div class="document-item" data-doc-id="${doc.doc_id}">
            <div class="doc-header">
                <div>
                    <div class="doc-name">${doc.doc_name}</div>
                    <div class="doc-meta">
                        <span><i class="fas fa-file"></i> ${doc.file_name}</span>
                    </div>
                </div>
                <div class="doc-actions">
                    <button class="btn-icon view" title="Xem nội dung" data-doc-id="${doc.doc_id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon delete" title="Xóa" data-doc-id="${doc.doc_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Attach event listeners
    listContainer.querySelectorAll('.document-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-icon')) {
                const docId = item.dataset.docId;
                viewDocument(docId);
            }
        });
    });
    
    listContainer.querySelectorAll('.btn-icon.view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const docId = btn.dataset.docId;
            viewDocument(docId);
        });
    });
    
    listContainer.querySelectorAll('.btn-icon.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const docId = btn.dataset.docId;
            deleteDocument(docId);
        });
    });
}

function filterDocuments(query) {
    const filtered = state.documents.filter(doc => 
        doc.doc_name.toLowerCase().includes(query.toLowerCase()) ||
        doc.file_name.toLowerCase().includes(query.toLowerCase())
    );
    renderDocumentList(filtered);
}

async function viewDocument(docId) {
    // Highlight selected document
    document.querySelectorAll('.document-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-doc-id="${docId}"]`).classList.add('active');
    
    const viewer = document.getElementById('documentViewer');
    viewer.innerHTML = `
        <div class="viewer-placeholder">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Đang tải nội dung...</p>
        </div>
    `;
    
    try {
        const response = await fetch(`${API_BASE}/documents/${docId}/content`, {
            headers: adminHeaders()
        });
        if (response.status === 401) { handleUnauthorized(); return; }
        const data = await response.json();
        
        if (response.ok) {
            const doc = state.documents.find(d => d.doc_id === docId);
            viewer.innerHTML = `
                <div class="viewer-header">
                    <h3 class="viewer-title">${doc.doc_name}</h3>
                    <div class="viewer-meta">
                        <span><i class="fas fa-file"></i> ${doc.file_name}</span>
                        <span><i class="fas fa-puzzle-piece"></i> ${data.total_chunks} chunks</span>
                    </div>
                </div>
                <div class="viewer-content">${escapeHtml(data.content)}</div>
            `;
            state.currentDocument = doc;
        } else {
            viewer.innerHTML = `
                <div class="viewer-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Không thể tải nội dung tài liệu!</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('[Document] View error:', error);
        viewer.innerHTML = `
            <div class="viewer-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Lỗi: ${error.message}</p>
            </div>
        `;
    }
}

async function deleteDocument(docId) {
    const doc = state.documents.find(d => d.doc_id === docId);
    
    if (!confirm(`Xác nhận xóa tài liệu "${doc.doc_name}"?\nHành động này không thể hoàn tác!`)) {
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/documents/${docId}`, {
            method: 'DELETE',
            headers: adminHeaders()
        });
        if (response.status === 401) { handleUnauthorized(); showLoading(false); return; }

        if (response.ok) {
            
            // If viewing deleted doc, clear viewer
            if (state.currentDocument?.doc_id === docId) {
                document.getElementById('documentViewer').innerHTML = `
                    <div class="viewer-placeholder">
                        <i class="fas fa-file-alt"></i>
                        <p>Chọn một tài liệu để xem nội dung</p>
                    </div>
                `;
                state.currentDocument = null;
            }
            
            // Reload list
            await loadDocuments();
        } else {
            alert('Không thể xóa tài liệu!');
        }
    } catch (error) {
        console.error('[Document] Delete error:', error);
        alert(`Lỗi: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

function updateDocumentCount(count) {
    document.getElementById('totalDocs').textContent = count;
}

// ===================================
// CHAT SECTION
// ===================================
function setupChat() {
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const clearBtn = document.getElementById('clearChatBtn');
    
    sendBtn.addEventListener('click', () => sendMessage());
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    chatInput.addEventListener('input', (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    });
    
    clearBtn.addEventListener('click', () => {
        if (confirm('Xóa toàn bộ lịch sử chat?')) {
            clearChat();
        }
    });
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Add user message
    addChatMessage('user', question);
    input.value = '';
    input.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (response.ok) {
            addChatMessage('bot', data.answer);
        } else {
            addChatMessage('bot', `⚠️ Lỗi: ${data.detail || 'Không thể xử lý câu hỏi'}`);
        }
    } catch (error) {
        console.error('[Chat] Error:', error);
        removeTypingIndicator();
        addChatMessage('bot', `⚠️ Lỗi kết nối: ${error.message}`);
    }
}

function addChatMessage(role, content) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}`;
    
    const icon = role === 'user' ? 
        '<i class="fas fa-user"></i>' : 
        '<i class="fas fa-robot"></i>';
    
    // Parse markdown for bot messages
    const messageContent = role === 'bot' && typeof marked !== 'undefined'
        ? (typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(marked.parse(content)) : escapeHtml(content))
        : escapeHtml(content);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${icon}</div>
        <div class="message-content">
            <div class="message-text markdown-content">${messageContent}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollChatToBottom();
    
    state.chatMessages.push({ role, content, timestamp: new Date() });
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-text">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator?.remove();
}

function clearChat() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = `
        <div class="chat-message bot">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text markdown-content">
                    <p>Xin chào! Tôi là EM Bot. Hỏi tôi bất cứ điều gì về các tài liệu đã upload.</p>
                </div>
                <div class="message-time">Bây giờ</div>
            </div>
        </div>
    `;
    state.chatMessages = [];
}

function scrollChatToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
    state.isLoading = show;
}

function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `status-message ${type}`;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// MAIN FEELINGS UPLOAD (trang chủ)
// ===================================
window.uploadMainFeelings = async function() {
    const input = document.getElementById('main-feelings-input');
    const statusEl = document.getElementById('main-feelings-status');
    if (!input.files.length) { statusEl.textContent = 'Chọn ảnh trước'; return; }

    statusEl.textContent = `Đang upload ${input.files.length} ảnh...`;
    let ok = 0;
    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('dest_path', `frontend/website/assets/images/feelings/${Date.now()}_${i + 1}.jpg`);
        fd.append('image_type', 'feelings');
        try {
            const res = await fetch(`${API_BASE}/content/upload-image`, {
                method: 'POST',
                headers: { 'X-Admin-Key': getAdminKey() },
                body: fd,
            });
            if (res.ok) ok++;
            statusEl.textContent = `Đã upload ${ok}/${input.files.length}...`;
        } catch (e) {
            statusEl.textContent = `Lỗi ảnh ${i + 1}: ${e.message}`;
        }
    }
    statusEl.textContent = `✅ Xong! ${ok} ảnh đã upload. Vercel sẽ rebuild sau ~1-2 phút.`;
};

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('[Global Error]', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('[Unhandled Promise]', e.reason);
});

