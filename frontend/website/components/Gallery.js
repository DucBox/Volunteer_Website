// Gallery Component — 3D Carousel (desktop) / Scroll-snap (mobile + tablet)
export class Gallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.autoplayEnabled = true;
        this.galleryPath = 'assets/images/gallery/';
        this.resizeTimer = null;
        this.snapResizeTimer = null;
        this.init();
    }

    isMobileOrTablet() {
        // pointer:coarse = touch device (phone/iPad/Android); pointer:fine = mouse/trackpad (Mac/desktop)
        // Falls back to width check for small windows on non-touch devices
        return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024;
    }

    async init() {
        this.showSkeleton();
        await this.loadImages();
        this.hideSkeleton();

        if (this.images.length === 0) return;

        if (this.isMobileOrTablet()) {
            this.renderScrollSnap();
        } else {
            this.render3DCarousel();
            this.attachCarouselControls();
            this.setupResponsive();
            this.resumeAutoPlayIfEnabled();
        }

        this.attachLightboxListeners();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay({ preservePreference: true });
            } else if (!this.isMobileOrTablet()) {
                this.resumeAutoPlayIfEnabled();
            }
        });
    }

    showSkeleton() {
        const carousel = document.querySelector('.gallery-carousel');
        if (!carousel) return;
        const skeleton = document.createElement('div');
        skeleton.id = 'gallerySkeleton';
        skeleton.className = 'gallery-skeleton';
        skeleton.innerHTML = [1, 2, 3, 4, 5].map(() => `<div class="gallery-skeleton-item"></div>`).join('');
        carousel.before(skeleton);
        carousel.style.display = 'none';
    }

    hideSkeleton() {
        document.getElementById('gallerySkeleton')?.remove();
        const carousel = document.querySelector('.gallery-carousel');
        if (carousel) carousel.style.display = '';
    }

    async loadImages() {
        const files = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);
        const results = await Promise.all(
            files.map(async (file, i) => {
                const src = `${this.galleryPath}${file}`;
                const exists = await this.checkImageExists(src);
                return exists ? { src, alt: `Hình ảnh hoạt động ${i + 1}`, caption: `Khoảnh khắc tình nguyện ${i + 1}` } : null;
            })
        );
        const validImages = results.filter(Boolean);
        if (validImages.length === 0) { this.showErrorMessage(); return; }
        this.images = validImages;
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
        const carousel = document.querySelector('.gallery-carousel');
        if (!carousel) return;
        carousel.innerHTML = `
            <div style="text-align:center;padding:60px 20px;color:var(--color-text-secondary)">
                <div style="font-size:56px;margin-bottom:16px">📁</div>
                <h3 style="margin-bottom:10px;color:var(--color-text)">Chưa có ảnh trong Gallery</h3>
                <p>Thêm ảnh vào: <code style="background:rgba(0,0,0,0.1);padding:3px 7px;border-radius:4px">assets/images/gallery/</code></p>
            </div>`;
    }

    // ─── SCROLL-SNAP — mobile + tablet (≤1024px) ────────────────────────────
    renderScrollSnap() {
        const carousel = document.querySelector('.gallery-carousel');
        if (!carousel) return;

        const existingWrap = carousel.querySelector('.gallery-snap-wrap');
        existingWrap?.remove();

        const wrap = document.createElement('div');
        wrap.className = 'gallery-snap-wrap';

        const viewport = document.createElement('div');
        viewport.className = 'gallery-snap-viewport';

        const track = document.createElement('div');
        track.className = 'gallery-snap-track';
        track.id = 'gallerySnapTrack';

        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-snap-slide';
            slide.dataset.index = index;
            slide.innerHTML = `
                <div class="gallery-snap-frame">
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                </div>
            `;
            slide.addEventListener('click', () => this.openLightbox(index));
            track.appendChild(slide);
        });

        const dotWrap = document.createElement('div');
        dotWrap.className = 'gallery-snap-dot-wrap';
        dotWrap.id = 'gallerySnapDots';
        this.images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `gallery-snap-dot${i === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Ảnh ${i + 1}`);
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.currentTarget.blur();
                this.snapTo(i);
            });
            dotWrap.appendChild(dot);
        });

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'gallery-snap-btn';
        prevBtn.innerHTML = '&#8249;';
        prevBtn.setAttribute('aria-label', 'Ảnh trước');
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.blur();
            this.snapTo(Math.max(0, this.currentIndex - 1));
        });

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'gallery-snap-btn';
        nextBtn.innerHTML = '&#8250;';
        nextBtn.setAttribute('aria-label', 'Ảnh sau');
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.blur();
            this.snapTo(Math.min(this.images.length - 1, this.currentIndex + 1));
        });

        const nav = document.createElement('div');
        nav.className = 'gallery-snap-nav';
        nav.append(prevBtn, dotWrap, nextBtn);

        viewport.appendChild(track);
        wrap.append(viewport, nav);
        carousel.prepend(wrap);

        let scrollTimer;
        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => this.updateSnapDots(track), 80);
        });

        window.addEventListener('resize', () => {
            clearTimeout(this.snapResizeTimer);
            this.snapResizeTimer = setTimeout(() => {
                this.snapTo(this.currentIndex, 'auto');
            }, 120);
        });

        this.snapTo(this.currentIndex, 'auto');
    }

    snapTo(index, behavior = 'smooth') {
        const track = document.getElementById('gallerySnapTrack');
        const viewport = document.querySelector('.gallery-snap-viewport');
        if (!track || !viewport) return;

        const maxIndex = this.images.length - 1;
        const safeIndex = Math.max(0, Math.min(index, maxIndex));
        const offset = safeIndex * viewport.clientWidth;

        track.scrollTo({
            left: offset,
            behavior
        });

        this.currentIndex = safeIndex;
        this.updateSnapDots(track);
    }

    updateSnapDots(track) {
        const viewport = document.querySelector('.gallery-snap-viewport');
        if (!viewport) return;

        const slideWidth = viewport.clientWidth || 1;
        const closest = Math.round(track.scrollLeft / slideWidth);
        this.currentIndex = Math.max(0, Math.min(closest, this.images.length - 1));

        document.querySelectorAll('#gallerySnapDots .gallery-snap-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    // ─── 3D CAROUSEL — desktop (>1024px) ────────────────────────────────────
    render3DCarousel() {
        const container = document.getElementById('carouselContainer');
        if (!container || this.images.length === 0) return;
        container.innerHTML = '';

        const imageWidth = 400;
        const minRadius = 500;
        const calculatedRadius = (this.images.length * imageWidth * 0.8) / (2 * Math.PI);
        const finalRadius = this.getResponsiveRadius(Math.max(minRadius, calculatedRadius));
        const angleStep = 360 / this.images.length;

        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = index;
            item.style.transform = `rotateY(${angleStep * index}deg) translateZ(${finalRadius}px)`;
            item.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
            item.addEventListener('click', () => this.openLightbox(index));
            container.appendChild(item);
        });

        this.updateCarousel();
    }

    attachCarouselControls() {
        document.getElementById('prevBtn')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn')?.addEventListener('click', () => this.nextSlide());
        document.getElementById('playPauseBtn')?.addEventListener('click', () => this.toggleAutoPlay());
    }

    getResponsiveRadius(radius) {
        if (window.innerWidth <= 480)  return radius * 0.48;
        if (window.innerWidth <= 768)  return radius * 0.6;
        if (window.innerWidth <= 1024) return radius * 0.82;
        return radius;
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => this.render3DCarousel(), 180);
        });
    }

    updateCarousel() {
        const container = document.getElementById('carouselContainer');
        if (!container) return;
        container.style.transform = `rotateY(${-(360 / this.images.length) * this.currentIndex}deg)`;
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
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000);
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    stopAutoPlay({ preservePreference = false } = {}) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
        this.isPlaying = false;
        if (!preservePreference) this.autoplayEnabled = false;
        this.updatePlayPauseButton();
    }

    resumeAutoPlayIfEnabled() {
        if (!this.autoplayEnabled || this.isMobileOrTablet()) {
            this.isPlaying = false;
            this.updatePlayPauseButton();
            return;
        }
        this.startAutoPlay();
    }

    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.autoplayEnabled = true;
            this.startAutoPlay();
        }
    }

    updatePlayPauseButton() {
        const play  = document.querySelector('.play-icon');
        const pause = document.querySelector('.pause-icon');
        if (!play || !pause) return;
        play.style.display  = this.isPlaying ? 'none'  : 'block';
        pause.style.display = this.isPlaying ? 'block' : 'none';
    }

    // ─── LIGHTBOX ────────────────────────────────────────────────────────────
    attachLightboxListeners() {
        document.getElementById('lightboxClose')?.addEventListener('click', () => this.closeLightbox());
        document.getElementById('lightboxPrev')?.addEventListener('click',  () => this.lightboxPrev());
        document.getElementById('lightboxNext')?.addEventListener('click',  () => this.lightboxNext());
        document.getElementById('lightbox')?.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') this.closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox')?.classList.contains('active')) return;
            if (e.key === 'Escape')      this.closeLightbox();
            else if (e.key === 'ArrowLeft')  this.lightboxPrev();
            else if (e.key === 'ArrowRight') this.lightboxNext();
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        const lightbox = document.getElementById('lightbox');
        const image    = document.getElementById('lightboxImage');
        const caption  = document.getElementById('lightboxCaption');
        if (!lightbox || !image) return;
        const img = this.images[index];
        image.src = img.src;
        image.alt = img.alt;
        if (caption) caption.textContent = img.caption;
        lightbox.classList.add('active');
        window._lockScroll();
        if (!this.isMobileOrTablet()) this.stopAutoPlay({ preservePreference: true });
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        lightbox.classList.remove('active');
        window._unlockScroll();
        if (!this.isMobileOrTablet()) this.resumeAutoPlayIfEnabled();
    }

    lightboxNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }

    lightboxPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const image   = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');
        const img = this.images[this.currentIndex];
        if (image)   { image.src = img.src; image.alt = img.alt; }
        if (caption)   caption.textContent = img.caption;
    }
}
