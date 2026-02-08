/**
 * Testimonials Component - Responsive Carousel
 * Desktop: 3 cards | Tablet: 2 cards | Mobile: 1 card
 */

export class Testimonials {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.isPlaying = true;
        this.slideSpeed = 4000;
        this.feelingsPath = 'assets/images/feelings/';
        this.cardsPerView = this.getCardsPerView();
        
        this.init();
    }
    
    // ✅ Responsive cards per view
    getCardsPerView() {
        const width = window.innerWidth;
        if (width > 1024) return 3;  // Desktop
        if (width > 768) return 2;   // Tablet
        return 1;                     // Mobile
    }
    
    getGapSize() {
        const width = window.innerWidth;
        if (width > 1024) return 32;
        if (width > 768) return 24;
        return 16;
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
        const extensions = ['jpg', 'jpeg', 'png'];
        
        for (let i = 1; i <= 20; i++) {
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
                // Skip
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
        
        const existingGrid = container.querySelector('.testimonials-grid');
        if (existingGrid) existingGrid.remove();
        
        const existingWrapper = container.querySelector('.testimonials-carousel-wrapper');
        if (existingWrapper) existingWrapper.remove();
        
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
        
        this.renderDots();
        this.updateActiveDot();
    }
    
    renderDots() {
        const dotsContainer = document.getElementById('testimonialsDots');
        if (!dotsContainer) return;
        
        const totalPages = Math.ceil(this.images.length / this.cardsPerView);
        
        dotsContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => 
            `<button class="testimonial-dot" data-page="${i}"></button>`
        ).join('');
        
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index * this.cardsPerView;
                this.updateCarousel();
                this.resetAutoSlide();
            });
        });
    }
    
    updateActiveDot() {
        const dots = document.querySelectorAll('.testimonial-dot');
        const currentPage = Math.floor(this.currentIndex / this.cardsPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
    setupResponsive() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                
                // Only re-render if cardsPerView changed
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.currentIndex = 0; // Reset to first page
                    this.renderDots();
                }
                
                this.updateCarousel();
            }, 250);
        });
    }
    
    updateCarousel() {
        const track = document.getElementById('testimonialsTrack');
        if (!track) return;
        
        const carousel = track.parentElement;
        const carouselWidth = carousel.offsetWidth;
        const gap = this.getGapSize();
        const cardsPerView = this.cardsPerView;
        
        // Calculate card width
        const totalGaps = (cardsPerView - 1) * gap;
        const cardWidth = (carouselWidth - totalGaps) / cardsPerView;
        
        // Slide distance
        const slideDistance = cardWidth + gap;
        const translateX = -(slideDistance * this.currentIndex);
        
        track.style.transform = `translateX(${translateX}px)`;
        this.updateActiveDot();
        
        console.log(`[Testimonials] Slide ${this.currentIndex}: cardsPerView=${cardsPerView}, cardWidth=${cardWidth.toFixed(1)}px`);
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
        const playIcon = document.querySelector('#testimonialsPlayPause .play-icon');
        const pauseIcon = document.querySelector('#testimonialsPlayPause .pause-icon');
        
        if (playIcon && pauseIcon) {
            playIcon.style.display = this.isPlaying ? 'none' : 'block';
            pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
        }
    }
    
    nextSlide() {
        const maxIndex = this.images.length - this.cardsPerView;
        
        if (this.currentIndex >= maxIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex += this.cardsPerView;
            // Don't exceed max
            if (this.currentIndex > maxIndex) {
                this.currentIndex = maxIndex;
            }
        }
        
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.currentIndex <= 0) {
            const maxIndex = this.images.length - this.cardsPerView;
            this.currentIndex = Math.max(0, maxIndex);
        } else {
            this.currentIndex -= this.cardsPerView;
            if (this.currentIndex < 0) this.currentIndex = 0;
        }
        
        this.updateCarousel();
    }
    
    openLightbox(index) {
        const lightboxHTML = `
            <div class="testimonials-lightbox active" id="testimonialsLightbox">
                <button class="lightbox-close" id="testimonialsLightboxClose">✕</button>
                <button class="lightbox-prev" id="testimonialsLightboxPrev">‹</button>
                <button class="lightbox-next" id="testimonialsLightboxNext">›</button>
                <img class="lightbox-image" src="${this.images[index].src}" alt="${this.images[index].alt}">
            </div>
        `;
        
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
        
        const keyHandler = (e) => {
            if (!document.getElementById('testimonialsLightbox')) {
                document.removeEventListener('keydown', keyHandler);
                return;
            }
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') prevBtn?.click();
            if (e.key === 'ArrowRight') nextBtn?.click();
        };
        
        document.addEventListener('keydown', keyHandler);
    }
    
    attachEventListeners() {
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
        
        document.querySelectorAll('.testimonial-card-new').forEach((card) => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.openLightbox(index);
                this.stopAutoSlide();
            });
        });
        
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