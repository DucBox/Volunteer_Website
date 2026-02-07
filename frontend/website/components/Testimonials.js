/**
 * Testimonials Component - Feelings Gallery
 * Auto-slide carousel with neon effects
 */

export class Testimonials {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.isPlaying = true;
        this.slideSpeed = 4000; // 4 seconds
        this.feelingsPath = 'assets/images/feelings/';
        
        this.init();
    }
    
    async init() {
        console.log('[Testimonials] Khởi tạo component...');
        await this.loadImages();
        
        if (this.images.length > 0) {
            this.render();
            this.attachEventListeners();
            this.startAutoSlide();
            this.setupResponsive();
            console.log('[Testimonials] ✓ Khởi tạo hoàn tất!');
        } else {
            console.error('[Testimonials] ✗ Không có ảnh!');
            this.showEmptyState();
        }
    }
    
    async loadImages() {
        console.log('[Testimonials] Đang tải ảnh từ feelings/...');
        
        const possibleFiles = [];
        const extensions = ['jpg'];
        
        // Thử từ 1 đến 30 file
        for (let i = 1; i <= 10; i++) {
            for (const ext of extensions) {
                possibleFiles.push(`${i}.${ext}`);
            }
        }
        
        const validImages = [];
        
        for (const file of possibleFiles) {
            try {
                const exists = await this.checkImageExists(`${this.feelingsPath}${file}`);
                if (exists) {
                    validImages.push({
                        src: `${this.feelingsPath}${file}`,
                        alt: `Cảm nhận ${validImages.length + 1}`
                    });
                    console.log(`[Testimonials] ✓ Tìm thấy: ${file}`);
                }
            } catch (err) {
                // Bỏ qua file không tồn tại
            }
            
            if (validImages.length >= 20) break;
        }
        
        this.images = validImages;
        console.log(`[Testimonials] ✓ Đã load ${this.images.length} ảnh`);
    }
    
    checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            setTimeout(() => resolve(false), 2000);
        });
    }
    
    render() {
        const container = document.querySelector('.testimonials-section .container');
        if (!container) return;
        
        // Clear existing content
        const existingGrid = container.querySelector('.testimonials-grid');
        if (existingGrid) {
            existingGrid.remove();
        }
        
        // Create new structure
        const wrapper = document.createElement('div');
        wrapper.className = 'testimonials-carousel-wrapper';
        wrapper.innerHTML = `
            <div class="testimonials-carousel">
                <div class="testimonials-track" id="testimonialsTrack">
                    ${this.images.map((img, index) => `
                        <div class="testimonial-card-new" data-index="${index}">
                            <div class="card-image-wrapper">
                                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                                <div class="card-shimmer"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="testimonials-controls">
                <button class="testimonials-nav-btn prev" id="testimonialsPrev">‹</button>
                <button class="testimonials-play-pause" id="testimonialsPlayPause">
                    <span class="play-icon" style="display: none;">▶</span>
                    <span class="pause-icon">❚❚</span>
                </button>
                <button class="testimonials-nav-btn next" id="testimonialsNext">›</button>
            </div>
            
            <div class="testimonials-dots" id="testimonialsDots"></div>
        `;
        
        container.appendChild(wrapper);
        
        // Render dots
        this.renderDots();
        this.updateActiveDot();
    }
    
    renderDots() {
        const dotsContainer = document.getElementById('testimonialsDots');
        if (!dotsContainer) return;
        
        const cardsPerView = this.getCardsPerView();
        const totalPages = Math.ceil(this.images.length / cardsPerView);
        
        dotsContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => 
            `<button class="testimonial-dot" data-page="${i}"></button>`
        ).join('');
        
        // Attach dot click handlers
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index * cardsPerView;
                this.updateCarousel();
                this.resetAutoSlide();
            });
        });
    }
    
    updateActiveDot() {
        const dots = document.querySelectorAll('.testimonial-dot');
        const cardsPerView = this.getCardsPerView();
        const currentPage = Math.floor(this.currentIndex / cardsPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
    getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }
    
    setupResponsive() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.renderDots();
                this.updateCarousel();
            }, 250);
        });
    }
    
    updateCarousel() {
        const track = document.getElementById('testimonialsTrack');
        if (!track) return;
        
        const cardsPerView = this.getCardsPerView();
        
        // Calculate offset based on card + margin width
        // Each card takes: (100% / cardsPerView) of container width
        const cardPercentage = 100 / cardsPerView;
        const offset = -(this.currentIndex * cardPercentage);
        
        track.style.transform = `translateX(${offset}%)`;
        this.updateActiveDot();
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) return;
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideSpeed);
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    toggleAutoSlide() {
        if (this.isPlaying) {
            this.stopAutoSlide();
        } else {
            this.startAutoSlide();
        }
    }
    
    updatePlayPauseButton() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        if (playIcon && pauseIcon) {
            playIcon.style.display = this.isPlaying ? 'none' : 'block';
            pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
        }
    }
    
    nextSlide() {
        const cardsPerView = this.getCardsPerView();
        const maxIndex = this.images.length - cardsPerView;
        
        if (this.currentIndex >= maxIndex) {
            this.currentIndex = 0; // Loop back
        } else {
            this.currentIndex += cardsPerView;
        }
        
        this.updateCarousel();
    }
    
    prevSlide() {
        const cardsPerView = this.getCardsPerView();
        
        if (this.currentIndex <= 0) {
            const maxIndex = this.images.length - cardsPerView;
            this.currentIndex = Math.max(0, maxIndex);
        } else {
            this.currentIndex -= cardsPerView;
        }
        
        this.updateCarousel();
    }
    
    openLightbox(index) {
        // Reuse lightbox from Gallery or create new one
        const lightboxHTML = `
            <div class="testimonials-lightbox active" id="testimonialsLightbox">
                <button class="lightbox-close" id="testimonialsLightboxClose">✕</button>
                <button class="lightbox-prev" id="testimonialsLightboxPrev">‹</button>
                <button class="lightbox-next" id="testimonialsLightboxNext">›</button>
                <img class="lightbox-image" src="${this.images[index].src}" alt="${this.images[index].alt}">
            </div>
        `;
        
        // Remove existing lightbox if any
        const existing = document.getElementById('testimonialsLightbox');
        if (existing) existing.remove();
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        document.body.style.overflow = 'hidden';
        
        this.currentLightboxIndex = index;
        this.attachLightboxListeners();
    }
    
    closeLightbox() {
        const lightbox = document.getElementById('testimonialsLightbox');
        if (lightbox) {
            lightbox.remove();
            document.body.style.overflow = '';
        }
    }
    
    updateLightboxImage(index) {
        const img = document.querySelector('#testimonialsLightbox .lightbox-image');
        if (img && this.images[index]) {
            img.src = this.images[index].src;
            img.alt = this.images[index].alt;
            this.currentLightboxIndex = index;
        }
    }
    
    attachLightboxListeners() {
        const closeBtn = document.getElementById('testimonialsLightboxClose');
        const prevBtn = document.getElementById('testimonialsLightboxPrev');
        const nextBtn = document.getElementById('testimonialsLightboxNext');
        const lightbox = document.getElementById('testimonialsLightbox');
        
        closeBtn?.addEventListener('click', () => this.closeLightbox());
        
        prevBtn?.addEventListener('click', () => {
            const newIndex = (this.currentLightboxIndex - 1 + this.images.length) % this.images.length;
            this.updateLightboxImage(newIndex);
        });
        
        nextBtn?.addEventListener('click', () => {
            const newIndex = (this.currentLightboxIndex + 1) % this.images.length;
            this.updateLightboxImage(newIndex);
        });
        
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('testimonialsLightbox')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') prevBtn?.click();
            if (e.key === 'ArrowRight') nextBtn?.click();
        });
    }
    
    attachEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('testimonialsPrev');
        const nextBtn = document.getElementById('testimonialsNext');
        const playPauseBtn = document.getElementById('testimonialsPlayPause');
        
        prevBtn?.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });
        
        nextBtn?.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });
        
        playPauseBtn?.addEventListener('click', () => {
            this.toggleAutoSlide();
        });
        
        // Card click to open lightbox
        document.querySelectorAll('.testimonial-card-new').forEach((card) => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.openLightbox(index);
                this.stopAutoSlide();
            });
        });
        
        // Pause on hover
        const track = document.getElementById('testimonialsTrack');
        track?.addEventListener('mouseenter', () => {
            if (this.isPlaying) this.stopAutoSlide();
        });
        
        track?.addEventListener('mouseleave', () => {
            if (!this.isPlaying) this.startAutoSlide();
        });
    }
    
    showEmptyState() {
        const container = document.querySelector('.testimonials-section .container');
        if (!container) return;
        
        container.innerHTML += `
            <div style="text-align: center; padding: 60px 20px; color: var(--color-text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📸</div>
                <h3 style="margin-bottom: 12px; color: var(--color-text);">Chưa có ảnh cảm nhận</h3>
                <p>Vui lòng thêm ảnh vào: <code style="background: rgba(0,0,0,0.1); padding: 4px 8px; border-radius: 4px;">assets/images/feelings/</code></p>
            </div>
        `;
    }
}