/**
 * Members Component
 * Handles member display, pagination, and lightbox functionality
 */

export class Members {
    constructor() {
        this.currentPage = 1;
        this.membersPerPage = 3; // Default: 3 members per page on desktop
        this.members = []; // Will be populated with member data
        this.lightbox = null;
        
        this.init();
    }
    
    init() {
        // Load member data
        this.loadMemberData();
        
        // Create lightbox
        this.createLightbox();
        
        // Render initial page
        this.renderMembers();
        
        // Setup navigation
        this.setupNavigation();
        
        // Update members per page based on screen size
        this.updateMembersPerPage();
        window.addEventListener('resize', () => this.updateMembersPerPage());
    }
    
    /**
     * Load member data - YOU CAN CONFIGURE THIS
     * Add your members here with their information
     */
    loadMemberData() {
        this.members = [
            {
                image: 'assets/images/members/tdao.jpg',
                role: 'Founder',
                name: 'Đào Việt Thanh',
                info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội. Người sáng lập dự án với nhiều năm kinh nghiệm trong lĩnh vực từ thiện và phát triển cộng đồng.',
                hobbies: 'Đọc sách, Đánh cầu, Du lịch',
                quote: 'Tuổi trẻ vất vả một chút.'
            },
            {
                image: 'assets/images/members/thảo.jpg',
                role: 'Co-Founder',
                name: 'Tạ Thanh Thảo',
                info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội. Đồng sáng lập và chịu trách nhiệm về các hoạt động trong công tác hậu cần.',
                hobbies: 'Ngủ, Xem phim, Lướt Tiktok',
                quote: 'The more you give, the more you receive.'
            },
            {
                image: 'assets/images/members/thư.png',
                role: 'Co-Founder',
                name: 'Nguyễn Minh Thư',
                info: 'Cựu Sinh viên Học viện Tài chính. Tình nguyện viên tích cực với niềm đam mê giúp đỡ trẻ em vùng cao.',
                hobbies: 'Ăn, Ngủ',
                quote: 'Làm hết sức, chơi hết mình.'
            },
            {
                image: 'assets/images/members/htrang.jpg',
                role: 'Co-Founder',
                name: 'Dương Hà Trang',
                info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội. ',
                hobbies: 'Nấu ăn, Dạy học',
                quote: 'Khi chúng ta dạy học, chúng ta không chỉ truyền đạt kiến thức, mà còn truyền đạt cả hi vọng.'
            },
            {
                image: 'assets/images/members/member5.jpg',
                role: 'Member',
                name: 'Hoàng Văn E',
                info: 'Giáo viên tình nguyện, giảng dạy miễn phí cho trẻ em có hoàn cảnh khó khăn.',
                hobbies: 'Chơi cờ, xem phim, viết blog',
                quote: 'Giáo dục là cánh cửa mở ra tương lai tươi sáng cho mọi đứa trẻ.'
            },
            {
                image: 'assets/images/members/member6.jpg',
                role: 'Member',
                name: 'Vũ Thị F',
                info: 'Nhiếp ảnh gia tình nguyện, ghi lại những khoảnh khắc ý nghĩa của dự án.',
                hobbies: 'Nhiếp ảnh, du lịch, cafe',
                quote: 'Mỗi bức ảnh là một câu chuyện, mỗi câu chuyện là một tình cảm.'
            }
        ];
    }
    
    /**
     * Update members per page based on screen width
     */
    updateMembersPerPage() {
        const width = window.innerWidth;
        if (width <= 768) {
            this.membersPerPage = 1; // Mobile: 1 member
        } else if (width <= 1024) {
            this.membersPerPage = 2; // Tablet: 2 members
        } else {
            this.membersPerPage = 3; // Desktop: 3 members
        }
        
        // Reset to first page and re-render
        this.currentPage = 1;
        this.renderMembers();
    }
    
    /**
     * Get total number of pages
     */
    getTotalPages() {
        return Math.ceil(this.members.length / this.membersPerPage);
    }
    
    /**
     * Get members for current page
     */
    getCurrentPageMembers() {
        const startIndex = (this.currentPage - 1) * this.membersPerPage;
        const endIndex = startIndex + this.membersPerPage;
        return this.members.slice(startIndex, endIndex);
    }
    
    /**
     * Render members grid
     */
    renderMembers() {
        const grid = document.querySelector('.members-grid');
        if (!grid) return;
        
        // Add transitioning class for fade out
        grid.classList.add('page-transitioning');
        
        // Wait for fade out, then update content
        setTimeout(() => {
            const currentMembers = this.getCurrentPageMembers();
            
            grid.innerHTML = currentMembers.map((member, index) => `
                <div class="member-card" data-member-index="${(this.currentPage - 1) * this.membersPerPage + index}">
                    <div class="member-image">
                        <img src="${member.image}" alt="${member.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.member-image-placeholder').style.display='flex';">
                        <div class="member-image-placeholder" style="display: none;">
                            ${this.getInitials(member.name)}
                        </div>
                    </div>
                    <div class="member-info">
                        <span class="member-role">${member.role}</span>
                        <h3 class="member-name">${member.name}</h3>
                        <p class="member-info-text">${this.truncate(member.info, 800)}</p>
                        <p class="member-hobbies">❤️ ${member.hobbies}</p>
                        <p class="member-quote">"${this.truncate(member.quote, 600)}"</p>
                    </div>
                </div>
            `).join('');
            
            // Remove transitioning class and add transition-in
            grid.classList.remove('page-transitioning');
            grid.classList.add('page-transition-in');
            
            // Remove transition-in class after animation
            setTimeout(() => {
                grid.classList.remove('page-transition-in');
            }, 400);
            
            // Add click listeners to cards
            grid.querySelectorAll('.member-card').forEach(card => {
                card.addEventListener('click', () => {
                    const memberIndex = parseInt(card.dataset.memberIndex);
                    this.openLightbox(memberIndex);
                });
            });
            
            // Update navigation buttons
            this.updateNavigation();
        }, 300);
    }
    
    /**
     * Setup navigation buttons
     */
    setupNavigation() {
        const prevBtn = document.getElementById('membersPrevBtn');
        const nextBtn = document.getElementById('membersNextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }
    
    /**
     * Update navigation state
     */
    updateNavigation() {
        const prevBtn = document.getElementById('membersPrevBtn');
        const nextBtn = document.getElementById('membersNextBtn');
        const pageInfo = document.getElementById('membersPageInfo');
        
        const totalPages = this.getTotalPages();
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
        
        if (pageInfo) {
            pageInfo.textContent = `${this.currentPage} / ${totalPages}`;
        }
    }
    
    /**
     * Go to previous page
     */
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderMembers();
        }
    }
    
    /**
     * Go to next page
     */
    nextPage() {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
            this.renderMembers();
        }
    }
    
    /**
     * Create lightbox element
     */
    createLightbox() {
        const lightboxHTML = `
            <div class="members-lightbox" id="membersLightbox">
                <div class="members-lightbox-content">
                    <button class="members-lightbox-close" id="membersLightboxClose">✕</button>
                    <img class="lightbox-member-image" id="lightboxMemberImage" src="" alt="">
                    <div class="lightbox-member-info">
                        <span class="lightbox-member-role" id="lightboxMemberRole"></span>
                        <h2 class="lightbox-member-name" id="lightboxMemberName"></h2>
                        
                        <div class="lightbox-info-section">
                            <div class="lightbox-info-label">Thông tin</div>
                            <div class="lightbox-info-value" id="lightboxMemberInfo"></div>
                        </div>
                        
                        <div class="lightbox-info-section">
                            <div class="lightbox-info-label">Sở thích</div>
                            <div class="lightbox-info-value" id="lightboxMemberHobbies"></div>
                        </div>
                        
                        <div class="lightbox-member-quote">
                            <p id="lightboxMemberQuote"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        this.lightbox = document.getElementById('membersLightbox');
        
        // Setup close button
        const closeBtn = document.getElementById('membersLightboxClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        
        // Close on backdrop click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }
    
    /**
     * Open lightbox with member details
     */
    openLightbox(memberIndex) {
        const member = this.members[memberIndex];
        if (!member || !this.lightbox) return;
        
        // Populate lightbox content
        document.getElementById('lightboxMemberImage').src = member.image;
        document.getElementById('lightboxMemberRole').textContent = member.role;
        document.getElementById('lightboxMemberName').textContent = member.name;
        document.getElementById('lightboxMemberInfo').textContent = member.info;
        document.getElementById('lightboxMemberHobbies').textContent = member.hobbies;
        document.getElementById('lightboxMemberQuote').textContent = `"${member.quote}"`;
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close lightbox
     */
    closeLightbox() {
        if (!this.lightbox) return;
        
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Utility: Get initials from name
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
    
    /**
     * Utility: Truncate text
     */
    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}