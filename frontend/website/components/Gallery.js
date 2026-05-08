// Gallery Component - 3D Carousel with Lightbox
export class Gallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.galleryPath = 'assets/images/gallery/';
        this.resizeTimer = null;
        
        this.init();
    }

    async init() {
        console.log('[Gallery] Khởi tạo Gallery component...');
        this.showSkeleton();
        await this.loadImages();
        this.hideSkeleton();

        if (this.images.length > 0) {
            this.render3DCarousel();
            this.attachEventListeners();
            this.setupResponsive();
            this.startAutoPlay();
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) this.stopAutoPlay();
                else this.startAutoPlay();
            });
            console.log('[Gallery] ✓ Khởi tạo hoàn tất!');
        } else {
            console.error('[Gallery] ✗ Không thể khởi tạo: Không có ảnh!');
        }
    }

    showSkeleton() {
        const carousel = document.querySelector('.gallery-carousel');
        if (!carousel) return;
        const skeleton = document.createElement('div');
        skeleton.id = 'gallerySkeleton';
        skeleton.className = 'gallery-skeleton';
        skeleton.innerHTML = [1, 2, 3, 4, 5].map(() =>
            `<div class="gallery-skeleton-item"></div>`
        ).join('');
        carousel.before(skeleton);
        carousel.style.display = 'none';
    }

    hideSkeleton() {
        document.getElementById('gallerySkeleton')?.remove();
        const carousel = document.querySelector('.gallery-carousel');
        if (carousel) carousel.style.display = '';
    }

    async loadImages() {
        console.log('[Gallery] Đang tải ảnh từ folder gallery...');

        const files = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);

        // Check song song — tránh lỗi timeout tuần tự trên Chrome cold cache
        const results = await Promise.all(
            files.map(async (file, i) => {
                const src = `${this.galleryPath}${file}`;
                const exists = await this.checkImageExists(src);
                if (exists) console.log(`[Gallery] ✓ Tìm thấy: ${file}`);
                return exists ? { src, alt: `Hình ảnh hoạt động ${i + 1}`, caption: `Khoảnh khắc tình nguyện ${i + 1}` } : null;
            })
        );

        const validImages = results.filter(Boolean);

        if (validImages.length === 0) {
            console.error('[Gallery] ✗ Không tìm thấy ảnh nào!');
            this.showErrorMessage();
            return;
        }

        this.images = validImages;
        console.log(`[Gallery] ✓ Đã load ${this.images.length} ảnh thành công!`);
    }

    checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            setTimeout(() => resolve(false), 5000);
        });
    }

    showErrorMessage() {
        this.hideSkeleton();
        const container = document.getElementById('carouselContainer');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--color-text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📁</div>
                <h3 style="margin-bottom: 12px; color: var(--color-text);">Chưa có ảnh trong Gallery</h3>
                <p>Vui lòng thêm ảnh vào thư mục: <code style="background: rgba(0,0,0,0.1); padding: 4px 8px; border-radius: 4px;">assets/images/gallery/</code></p>
                <p style="margin-top: 12px; font-size: 14px;">Tên file: 1.jpg, 2.jpg, 3.jpg, ...</p>
            </div>
        `;
    }

    render3DCarousel() {
        const container = document.getElementById('carouselContainer');
        if (!container) {
            console.error('[Gallery] Không tìm thấy carouselContainer element!');
            return;
        }
        
        if (this.images.length === 0) {
            console.warn('[Gallery] Không có ảnh để hiển thị');
            return;
        }

        console.log(`[Gallery] Đang render ${this.images.length} ảnh vào 3D carousel...`);
        container.innerHTML = '';
        
        // Tính radius động dựa trên số ảnh và kích thước màn hình
        const imageWidth = 400;
        const minRadius = 500;
        const radiusPerImage = imageWidth * 0.8; // Khoảng cách tối thiểu giữa các ảnh
        const calculatedRadius = (this.images.length * radiusPerImage) / (2 * Math.PI);
        const radius = Math.max(minRadius, calculatedRadius);
        const finalRadius = this.getResponsiveRadius(radius);
        
        console.log(`[Gallery] Radius: ${finalRadius.toFixed(0)}px (${this.images.length} ảnh)`);
        
        const angleStep = 360 / this.images.length;

        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = index;

            const angle = angleStep * index;
            const rotateY = angle;
            const translateZ = finalRadius;

            item.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;

            item.innerHTML = `
                <img src="${image.src}" 
                     alt="${image.alt}" 
                     loading="lazy">
            `;

            // Click to open lightbox
            item.addEventListener('click', () => {
                console.log(`[Gallery] Mở lightbox cho ảnh ${index + 1}`);
                this.openLightbox(index);
            });

            container.appendChild(item);
        });

        this.updateCarousel();
        console.log('[Gallery] ✓ Render 3D carousel hoàn tất!');
    }

    getResponsiveRadius(radius) {
        if (window.innerWidth <= 480) return radius * 0.48;
        if (window.innerWidth <= 768) return radius * 0.6;
        if (window.innerWidth <= 1024) return radius * 0.82;
        return radius;
    }

    rebuildCarousel() {
        if (!this.images.length) return;
        this.render3DCarousel();
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.rebuildCarousel();
            }, 180);
        });
    }

    updateCarousel() {
        const container = document.getElementById('carouselContainer');
        if (!container) return;

        const angleStep = 360 / this.images.length;
        const rotateY = -angleStep * this.currentIndex;

        container.style.transform = `rotateY(${rotateY}deg)`;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // 3 giây tự động chuyển
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    updatePlayPauseButton() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    openLightbox(index) {
        this.currentIndex = index;
        const lightbox = document.getElementById('lightbox');
        const image = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');

        if (!lightbox || !image) return;

        const currentImage = this.images[index];
        image.src = currentImage.src;
        image.alt = currentImage.alt;
        caption.textContent = currentImage.caption;

        lightbox.classList.add('active');
        window._lockScroll(); // Disable scroll
        
        this.stopAutoPlay(); // Pause carousel when lightbox open
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('active');
        window._unlockScroll();
        
        this.startAutoPlay(); // Resume carousel
    }

    lightboxNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        const image = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');
        
        const currentImage = this.images[this.currentIndex];
        image.src = currentImage.src;
        image.alt = currentImage.alt;
        caption.textContent = currentImage.caption;
    }

    lightboxPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        const image = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');
        
        const currentImage = this.images[this.currentIndex];
        image.src = currentImage.src;
        image.alt = currentImage.alt;
        caption.textContent = currentImage.caption;
    }

    attachEventListeners() {
        // Carousel navigation
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');

        prevBtn?.addEventListener('click', () => this.prevSlide());
        nextBtn?.addEventListener('click', () => this.nextSlide());
        playPauseBtn?.addEventListener('click', () => this.toggleAutoPlay());

        // Lightbox controls
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightbox = document.getElementById('lightbox');

        lightboxClose?.addEventListener('click', () => this.closeLightbox());
        lightboxPrev?.addEventListener('click', () => this.lightboxPrev());
        lightboxNext?.addEventListener('click', () => this.lightboxNext());

        // Close lightbox on background click
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox?.classList.contains('active')) return;

            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.lightboxPrev();
            } else if (e.key === 'ArrowRight') {
                this.lightboxNext();
            }
        });

        // Pause on hover
        const carouselContainer = document.getElementById('carouselContainer');
        carouselContainer?.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.stopAutoPlay();
            }
        });

        carouselContainer?.addEventListener('mouseleave', () => {
            if (!this.isPlaying) {
                this.startAutoPlay();
            }
        });
    }
}
