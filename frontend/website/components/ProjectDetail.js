// ProjectDetail Component — full project landing page

import { ACTIVITIES, STATUS_LABELS } from '../data/activities.js';

export class ProjectDetail {
    constructor() {
        this.activity       = null;
        this.galleryImages  = [];
        this.galleryIndex   = 0;
        this.feelingsImages = [];
        this.feelingsIndex  = 0;
        this.lightboxImages = [];
        this.lightboxIndex  = 0;
        this.init();
    }

    async init() {
        const id       = new URLSearchParams(window.location.search).get('id');
        const activity = ACTIVITIES.find(a => a.id === id);
        const container = document.getElementById('projectDetailContainer');
        if (!container) return;

        if (!activity) {
            this.renderNotFound(container);
            this.renderOtherActivities();
            return;
        }

        this.activity  = activity;
        this.container = container;
        document.title = `${activity.title} – Dự Án Cho EM`;

        // Render static skeleton first
        this.renderSkeleton(container, activity);
        this.initScrollAnimations();

        // Gallery + feelings sections always render for completed projects
        // (placeholder shown when no data — section must exist for nav links to work)
        if (activity.status === 'completed') {
            this.galleryImages = activity.gallery || [];
            this.renderGallerySection();
            if (this.galleryImages.length > 0) this.initGalleryCarousel();

            if (activity.feelingsFolder) {
                this.feelingsImages = await this.probeImages(activity.feelingsFolder, 30);
            }
            this.renderFeelingsSection();
            if (this.feelingsImages.length > 0) this.initFeelingsCarousel();
        }

        this.initLightbox();
        this.renderOtherActivities();
    }

    // ---- Image probe (same technique as Testimonials.js) ----
    probeImages(folder, max = 30) {
        const extensions = ['jpg', 'jpeg', 'png'];
        const candidates = [];
        for (let i = 1; i <= max; i++) {
            for (const ext of extensions) {
                candidates.push({ src: `${folder}${i}.${ext}`, index: i });
            }
        }
        return Promise.all(
            candidates.map(({ src, index }) =>
                new Promise(resolve => {
                    const img = new Image();
                    img.onload  = () => resolve({ src, index });
                    img.onerror = () => resolve(null);
                    img.src = src;
                    setTimeout(() => resolve(null), 4000);
                })
            )
        ).then(results => {
            const seen = new Set();
            return results
                .filter(Boolean)
                .filter(r => seen.has(r.index) ? false : seen.add(r.index))
                .map(r => r.src);
        });
    }

    // ---- Render static skeleton ----
    renderSkeleton(container, a) {
        const label = STATUS_LABELS[a.status] || '';
        const stats = a.stats
            ? `<div class="pd-stats" id="pd-stats">
                ${a.stats.map(s => `
                    <div class="pd-stat pd-fade-in">
                        <span class="pd-stat-value">${s.value}</span>
                        <span class="pd-stat-label">${s.label}</span>
                    </div>
                `).join('')}
               </div>`
            : '';

        const ctaHref = a.ctaHref || 'index.html#tinh-nguyen';
        const ctaText = a.ctaText || 'Đăng Ký Tình Nguyện';

        container.innerHTML = `
            <!-- Hero -->
            <div class="pd-hero">
                <div class="pd-hero-image">
                    <img src="${a.image}" alt="${a.title}"
                         onerror="this.src='assets/images/backgrounds/hero-bg.jpg'">
                    <div class="pd-hero-overlay"></div>
                </div>
                <div class="pd-hero-content">
                    <span class="act-status-badge act-status--${a.status} pd-hero-badge">${label}</span>
                    <h1 class="pd-hero-title">${a.title}</h1>
                    <div class="pd-hero-meta">
                        <span>📍 ${a.location}</span>
                        <span>📅 ${a.date}</span>
                    </div>
                </div>
            </div>

            <!-- Sticky floating back button -->
            <a href="index.html#hoat-dong" class="pd-back-float" aria-label="Quay lại Hoạt Động">
                ← Hoạt Động
            </a>

            <!-- Overview -->
            <section id="pd-overview" class="pd-section container">
                <p class="pd-lead pd-fade-in">${a.shortDesc}</p>
                ${stats}
            </section>

            <!-- Story -->
            <section id="pd-story" class="pd-section pd-section--alt">
                <div class="container">
                    <h2 class="pd-section-title pd-fade-in">Câu Chuyện Hành Trình</h2>
                    <div class="pd-full-desc pd-fade-in">
                        ${a.fullDesc}
                    </div>
                </div>
            </section>

            <!-- Gallery placeholder (filled if images exist) -->
            <div id="pd-gallery-mount"></div>

            <!-- Feelings placeholder (filled if images exist) -->
            <div id="pd-feelings-mount"></div>

            <!-- CTA -->
            <section class="pd-section pd-cta-section">
                <div class="container">
                    <h2 class="pd-fade-in">Bạn muốn tham gia?</h2>
                    <p class="pd-fade-in">Đồng hành cùng chúng mình trong hành trình mang yêu thương đến những em nhỏ.</p>
                    <a href="${ctaHref}" class="btn btn-primary pd-cta-btn pd-fade-in">${ctaText}</a>
                </div>
            </section>
        `;
    }

    // ---- Gallery section ----
    renderGallerySection() {
        const mount = document.getElementById('pd-gallery-mount');
        if (!mount) return;

        const hasImages = this.galleryImages.length > 0;
        const inner = hasImages
            ? `<div class="pd-gallery-carousel">
                   <div class="pd-gallery-viewport">
                       <div class="pd-gallery-track" id="pdGalleryTrack">
                           ${this.galleryImages.map((src, i) => `
                               <div class="pd-gallery-card pd-fade-in" data-lightbox-gallery data-index="${i}">
                                   <img src="${src}" alt="Ảnh ${i + 1}" loading="lazy">
                                   <div class="pd-gallery-card-hover">🔍</div>
                               </div>`).join('')}
                       </div>
                   </div>
                   <div class="pd-gallery-controls">
                       <button class="pd-gallery-btn" id="pdGalleryPrev" aria-label="Trước">&#8249;</button>
                       <div class="pd-gallery-dots" id="pdGalleryDots"></div>
                       <button class="pd-gallery-btn" id="pdGalleryNext" aria-label="Tiếp">&#8250;</button>
                   </div>
               </div>`
            : `<div class="pd-placeholder pd-fade-in">
                   <div class="pd-placeholder-icon">📸</div>
                   <p>Ảnh khoảnh khắc sẽ sớm được cập nhật.</p>
               </div>`;

        mount.innerHTML = `
            <section id="pd-gallery" class="pd-section pd-gallery-section">
                <div class="container">
                    <h2 class="pd-section-title pd-fade-in">Khoảnh Khắc Đáng Nhớ</h2>
                    ${inner}
                </div>
            </section>
        `;

        if (hasImages) this.renderGalleryDots();
    }

    renderGalleryDots() {
        const dotsEl = document.getElementById('pdGalleryDots');
        if (!dotsEl) return;
        const pages = Math.ceil(this.galleryImages.length / this.galleryPerView());
        dotsEl.innerHTML = Array.from({ length: pages }, (_, i) =>
            `<button class="pd-gallery-dot${i === 0 ? ' active' : ''}" data-page="${i}"></button>`
        ).join('');
    }

    galleryPerView() {
        if (window.innerWidth > 1024) return 4;
        if (window.innerWidth >= 640)  return 2;
        return 1;
    }

    initGalleryCarousel() {
        const updateGallery = () => {
            const track = document.getElementById('pdGalleryTrack');
            if (!track) return;
            const card = track.querySelector('.pd-gallery-card');
            if (!card || card.offsetWidth === 0) { requestAnimationFrame(updateGallery); return; }

            const perView = this.galleryPerView();
            const gap = 16;
            const offset = this.galleryIndex * (card.offsetWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;

            // dots
            const pages = Math.ceil(this.galleryImages.length / perView);
            const currentPage = Math.floor(this.galleryIndex / perView);
            document.querySelectorAll('.pd-gallery-dot').forEach((d, i) =>
                d.classList.toggle('active', i === Math.min(currentPage, pages - 1))
            );
        };

        const maxIndex = () => Math.max(0, this.galleryImages.length - this.galleryPerView());

        document.getElementById('pdGalleryNext')?.addEventListener('click', () => {
            this.galleryIndex = this.galleryIndex >= maxIndex() ? 0 : this.galleryIndex + this.galleryPerView();
            this.galleryIndex = Math.min(this.galleryIndex, maxIndex());
            updateGallery();
        });
        document.getElementById('pdGalleryPrev')?.addEventListener('click', () => {
            this.galleryIndex = this.galleryIndex <= 0 ? maxIndex() : Math.max(0, this.galleryIndex - this.galleryPerView());
            updateGallery();
        });
        document.getElementById('pdGalleryDots')?.addEventListener('click', e => {
            const dot = e.target.closest('.pd-gallery-dot');
            if (!dot) return;
            this.galleryIndex = parseInt(dot.dataset.page) * this.galleryPerView();
            this.galleryIndex = Math.min(this.galleryIndex, maxIndex());
            updateGallery();
        });

        // Click to lightbox
        document.getElementById('pdGalleryTrack')?.addEventListener('click', e => {
            const card = e.target.closest('[data-lightbox-gallery]');
            if (card) {
                this.lightboxImages = this.galleryImages;
                this.openLightbox(parseInt(card.dataset.index));
            }
        });

        window.addEventListener('resize', () => {
            this.galleryIndex = 0;
            this.renderGalleryDots();
            updateGallery();
        });

        requestAnimationFrame(updateGallery);
    }

    // ---- Feelings / Testimonials section ----
    renderFeelingsSection() {
        const mount = document.getElementById('pd-feelings-mount');
        if (!mount) return;

        const hasImages = this.feelingsImages.length > 0;
        const inner = hasImages
            ? `<p class="pd-section-sub pd-fade-in">Những chia sẻ từ những người đã trực tiếp tham gia hành trình</p>
               <div class="pd-feelings-carousel">
                   <div class="pd-feelings-viewport">
                       <div class="testimonials-track" id="pdFeelingsTrack">
                           ${this.feelingsImages.map((src, i) => `
                               <div class="testimonial-card-new pd-feelings-card pd-fade-in" data-lightbox-feelings data-index="${i}">
                                   <div class="card-image-wrapper">
                                       <img src="${src}" alt="Cảm nhận ${i + 1}" loading="lazy">
                                       <div class="card-shimmer"></div>
                                   </div>
                               </div>`).join('')}
                       </div>
                   </div>
                   <div class="pd-feelings-controls">
                       <button class="testimonials-nav-btn prev" id="pdFeelingsPrev">&#8249;</button>
                       <div class="testimonials-dots" id="pdFeelingsDots"></div>
                       <button class="testimonials-nav-btn next" id="pdFeelingsNext">&#8250;</button>
                   </div>
               </div>`
            : `<div class="pd-placeholder pd-fade-in">
                   <div class="pd-placeholder-icon">💬</div>
                   <p>Cảm nhận từ tình nguyện viên sẽ sớm được cập nhật.</p>
               </div>`;

        mount.innerHTML = `
            <section id="pd-testimonials" class="pd-section pd-section--alt pd-feelings-section">
                <div class="container">
                    <h2 class="pd-section-title pd-fade-in">Cảm Nhận Từ Tình Nguyện Viên</h2>
                    ${inner}
                </div>
            </section>
        `;

        if (hasImages) this.renderFeelingsDots();
    }

    feelingsPerView() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth >= 640)  return 2;
        return 1;
    }

    renderFeelingsDots() {
        const dotsEl = document.getElementById('pdFeelingsDots');
        if (!dotsEl) return;
        const pages = Math.ceil(this.feelingsImages.length / this.feelingsPerView());
        dotsEl.innerHTML = Array.from({ length: pages }, (_, i) =>
            `<button class="testimonial-dot${i === 0 ? ' active' : ''}" data-page="${i}"></button>`
        ).join('');
    }

    initFeelingsCarousel() {
        const updateFeelings = () => {
            const track = document.getElementById('pdFeelingsTrack');
            if (!track) return;
            const card = track.querySelector('.pd-feelings-card');
            if (!card || card.offsetWidth === 0) { requestAnimationFrame(updateFeelings); return; }

            const perView = this.feelingsPerView();
            const gap = window.innerWidth > 1024 ? 32 : window.innerWidth > 768 ? 24 : 16;
            const cardWidth = card.offsetWidth;
            track.style.transform = `translateX(-${this.feelingsIndex * (cardWidth + gap)}px)`;

            const pages = Math.ceil(this.feelingsImages.length / perView);
            const currentPage = Math.floor(this.feelingsIndex / perView);
            document.querySelectorAll('#pdFeelingsDots .testimonial-dot').forEach((d, i) =>
                d.classList.toggle('active', i === Math.min(currentPage, pages - 1))
            );
        };

        const perView  = () => this.feelingsPerView();
        const maxIndex = () => Math.max(0, this.feelingsImages.length - perView());

        document.getElementById('pdFeelingsNext')?.addEventListener('click', () => {
            this.feelingsIndex = this.feelingsIndex >= maxIndex() ? 0 : Math.min(this.feelingsIndex + perView(), maxIndex());
            updateFeelings();
        });
        document.getElementById('pdFeelingsPrev')?.addEventListener('click', () => {
            this.feelingsIndex = this.feelingsIndex <= 0 ? maxIndex() : Math.max(0, this.feelingsIndex - perView());
            updateFeelings();
        });
        document.getElementById('pdFeelingsDots')?.addEventListener('click', e => {
            const dot = e.target.closest('.testimonial-dot');
            if (!dot) return;
            this.feelingsIndex = parseInt(dot.dataset.page) * perView();
            this.feelingsIndex = Math.min(this.feelingsIndex, maxIndex());
            updateFeelings();
        });

        // Click to lightbox
        document.getElementById('pdFeelingsTrack')?.addEventListener('click', e => {
            const card = e.target.closest('[data-lightbox-feelings]');
            if (card) {
                this.lightboxImages = this.feelingsImages;
                this.openLightbox(parseInt(card.dataset.index));
            }
        });

        window.addEventListener('resize', () => {
            this.feelingsIndex = 0;
            this.renderFeelingsDots();
            requestAnimationFrame(updateFeelings);
        });

        requestAnimationFrame(updateFeelings);
    }

    // ---- Shared Lightbox ----
    initLightbox() {
        const lb = document.createElement('div');
        lb.id = 'pdLightbox';
        lb.className = 'pd-lightbox';
        lb.innerHTML = `
            <button class="pd-lightbox-close" id="pdLightboxClose" aria-label="Đóng">✕</button>
            <button class="pd-lightbox-prev"  id="pdLightboxPrev"  aria-label="Trước">‹</button>
            <button class="pd-lightbox-next"  id="pdLightboxNext"  aria-label="Tiếp">›</button>
            <img class="pd-lightbox-img" id="pdLightboxImg" src="" alt="">
            <div class="pd-lightbox-counter" id="pdLightboxCounter"></div>
        `;
        document.body.appendChild(lb);

        lb.addEventListener('click', e => { if (e.target === lb) this.closeLightbox(); });
        document.getElementById('pdLightboxClose')?.addEventListener('click', () => this.closeLightbox());
        document.getElementById('pdLightboxPrev')?.addEventListener('click',  () => this.lightboxNav(-1));
        document.getElementById('pdLightboxNext')?.addEventListener('click',  () => this.lightboxNav(+1));
        document.addEventListener('keydown', e => {
            if (!document.getElementById('pdLightbox')?.classList.contains('active')) return;
            if (e.key === 'Escape')      this.closeLightbox();
            if (e.key === 'ArrowLeft')  this.lightboxNav(-1);
            if (e.key === 'ArrowRight') this.lightboxNav(+1);
        });
    }

    openLightbox(index) {
        this.lightboxIndex = index;
        this.updateLightboxImage();
        document.getElementById('pdLightbox')?.classList.add('active');
        window._lockScroll?.();
    }

    closeLightbox() {
        document.getElementById('pdLightbox')?.classList.remove('active');
        window._unlockScroll?.();
    }

    lightboxNav(dir) {
        const total = this.lightboxImages.length;
        this.lightboxIndex = ((this.lightboxIndex + dir) + total) % total;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const img = document.getElementById('pdLightboxImg');
        const ctr = document.getElementById('pdLightboxCounter');
        const src = this.lightboxImages[this.lightboxIndex];
        if (img) { img.src = src; img.alt = `Ảnh ${this.lightboxIndex + 1}`; }
        if (ctr) ctr.textContent = `${this.lightboxIndex + 1} / ${this.lightboxImages.length}`;
    }

    // ---- Scroll animations ----
    initScrollAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pd-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        // Observe existing fade-in elements + watch for dynamically added ones
        const observe = () => document.querySelectorAll('.pd-fade-in:not(.pd-visible)')
            .forEach(el => observer.observe(el));

        observe();
        // Re-scan after async sections render
        setTimeout(observe, 1000);
        setTimeout(observe, 3000);
    }

    // ---- Other activities section (above footer) ----
    renderOtherActivities() {
        const mount = document.getElementById('pdOtherActivities');
        if (!mount) return;

        const currentId  = this.activity?.id;
        const others     = ACTIVITIES.filter(a => !a.id.startsWith('placeholder') && a.id !== currentId);
        if (!others.length) return;

        const STATUS_LABEL = { completed: 'Đã hoàn thành', upcoming: 'Sắp diễn ra', planning: 'Lên kế hoạch' };
        const STATUS_DOT   = { completed: 'completed', upcoming: 'upcoming', planning: 'planning' };

        const cards = others.map(a => `
            <a href="project.html?id=${a.id}" class="pd-oa-card">
                <div class="pd-oa-card-img">
                    <img src="${a.image}" alt="${a.title}" loading="lazy"
                         onerror="this.src='assets/images/backgrounds/hero-bg.jpg'">
                    <div class="pd-oa-card-overlay"></div>
                    <span class="act-status-badge act-status--${a.status}">${STATUS_LABEL[a.status] || ''}</span>
                </div>
                <div class="pd-oa-card-body">
                    <h3 class="pd-oa-card-title">${a.title}</h3>
                    <div class="pd-oa-card-meta">
                        <span>📍 ${a.location}</span>
                        <span>📅 ${a.date}</span>
                    </div>
                    <p class="pd-oa-card-desc">${a.shortDesc}</p>
                    <span class="pd-oa-card-cta">Xem chi tiết →</span>
                </div>
            </a>
        `).join('');

        mount.innerHTML = `
            <section class="pd-oa-section">
                <div class="container">
                    <h2 class="pd-section-title pd-fade-in">Khám Phá Thêm</h2>
                    <div class="pd-oa-grid">
                        ${cards}
                    </div>
                </div>
            </section>
        `;

        // Trigger scroll animation observer on new elements
        document.querySelectorAll('.pd-oa-card').forEach(el => {
            el.classList.add('pd-fade-in');
        });
        document.querySelectorAll('.pd-fade-in:not(.pd-visible)').forEach(el => {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pd-visible'); obs.unobserve(e.target); } });
            }, { threshold: 0.08 });
            obs.observe(el);
        });
    }

    // ---- Not found ----
    renderNotFound(container) {
        document.title = 'Không tìm thấy – Dự Án Cho EM';
        container.innerHTML = `
            <div class="pd-not-found container">
                <div class="pd-not-found-icon">🔍</div>
                <h2>Không tìm thấy dự án</h2>
                <p>Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xoá.</p>
                <a href="index.html#hoat-dong" class="btn btn-primary">Xem tất cả hoạt động</a>
            </div>
        `;
    }
}
