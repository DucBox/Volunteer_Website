// Activities Component — Carousel + lightweight modal preview

import { ACTIVITIES, STATUS_LABELS } from '../data/activities.js';

export class Activities {
    constructor(data) {
        this.activities   = data || ACTIVITIES;
        this.currentIndex = 0;
        this.autoTimer    = null;
        this.isDragging   = false;
        this.dragStartX   = 0;
        this.init();
    }

    // ---- Responsive helper ----
    get visibleCount() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth >= 640)  return 2;
        return 1;
    }

    get maxIndex() {
        return Math.max(0, this.activities.length - this.visibleCount);
    }

    // ---- Initialization ----
    init() {
        this.renderSlider();
        this.renderModal();
        this.attachEvents();
        this.renderDots();
        this.updateSlider();
        this.updateNavButtons();
        this.startAuto();

        window.addEventListener('resize', () => {
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.renderDots();
            this.updateSlider();
            this.updateNavButtons();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.stopAuto();
            else this.startAuto();
        });
    }

    // ---- Render slider ----
    renderSlider() {
        const container = document.getElementById('activitiesSliderContainer');
        if (!container) return;

        const cards = this.activities.map((a, i) => this.cardHTML(a, i)).join('');

        container.innerHTML = `
            <div class="act-slider-wrapper">
                <div class="act-slider-viewport">
                    <div class="act-slider-track" id="actTrack">${cards}</div>
                </div>
            </div>
            <div class="act-controls" id="actControls">
                <button class="act-slider-btn act-prev" id="actPrev" aria-label="Trước">&#8249;</button>
                <div class="act-dots" id="actDots"></div>
                <button class="act-slider-btn act-next" id="actNext" aria-label="Tiếp">&#8250;</button>
            </div>
        `;
    }

    renderDots() {
        const dotsContainer = document.getElementById('actDots');
        const controls = document.getElementById('actControls');
        if (!dotsContainer) return;
        const count = this.maxIndex + 1;
        if (count <= 1) {
            if (controls) controls.style.display = 'none';
            return;
        }
        if (controls) controls.style.display = '';
        dotsContainer.innerHTML = Array.from({ length: count }, (_, i) =>
            `<button class="act-dot${i === this.currentIndex ? ' active' : ''}" data-index="${i}" aria-label="Đến slide ${i + 1}"></button>`
        ).join('');
    }

    cardHTML(activity, index) {
        const label = STATUS_LABELS[activity.status] || '';
        return `
            <div class="act-card" data-index="${index}">
                <div class="act-card-image">
                    <img src="${activity.image}" alt="${activity.title}" loading="lazy"
                         onerror="this.src='assets/images/volunteers.jpg'">
                    <span class="act-status-badge act-status--${activity.status}">${label}</span>
                </div>
                <div class="act-card-body">
                    <h3 class="act-card-title">${activity.title}</h3>
                    <div class="act-card-meta">
                        <span>📍 ${activity.location}</span>
                        <span>📅 ${activity.date}</span>
                    </div>
                    <p class="act-card-desc">${activity.shortDesc}</p>
                    <div class="act-card-actions">
                        <button class="btn btn-outline act-preview-btn" data-id="${activity.id}">Xem nhanh</button>
                        <a href="project.html?id=${activity.id}" class="btn btn-primary act-detail-link">Xem Chi Tiết →</a>
                    </div>
                </div>
            </div>
        `;
    }

    // ---- Render modal (once) ----
    renderModal() {
        document.getElementById('activityModal')?.remove();
        const modal = document.createElement('div');
        modal.id = 'activityModal';
        modal.className = 'act-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="act-modal-content" id="actModalContent">
                <button class="act-modal-close" id="actModalClose" aria-label="Đóng">✕</button>
                <div id="actModalBody" style="display:contents"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // ---- Open modal (lightweight preview only) ----
    openModal(id) {
        const a = this.activities.find(x => x.id === id);
        if (!a) return;

        const label = STATUS_LABELS[a.status] || '';
        const stats = a.stats
            ? `<div class="modal-stats">${a.stats.map(s => `
                    <div class="modal-stat"><span>${s.value}</span><small>${s.label}</small></div>
               `).join('')}</div>`
            : '';

        document.getElementById('actModalBody').innerHTML = `
            <div class="act-modal-info act-modal-info--solo">
                <span class="act-status-badge act-status--${a.status} act-modal-status-badge">${label}</span>
                <h2 class="act-modal-title">${a.title}</h2>
                <div class="act-card-meta act-modal-meta">
                    <span>📍 ${a.location}</span>
                    <span>📅 ${a.date}</span>
                </div>
                ${stats}
                <p class="act-modal-short-desc">${a.shortDesc}</p>
                <a href="project.html?id=${a.id}" class="btn btn-primary act-modal-detail-btn">
                    Xem Trang Chi Tiết →
                </a>
            </div>
        `;

        const modal = document.getElementById('activityModal');
        modal.classList.add('active');
        window._lockScroll();
    }

    closeModal() {
        document.getElementById('activityModal')?.classList.remove('active');
        window._unlockScroll();
    }

    // ---- Slider logic ----
    updateSlider() {
        const track = document.getElementById('actTrack');
        if (!track) return;
        const card = track.querySelector('.act-card');
        if (!card) return;

        // offsetWidth may be 0 before first paint — defer one frame
        if (card.offsetWidth === 0) {
            requestAnimationFrame(() => this.updateSlider());
            return;
        }

        const gap    = 24;
        const offset = this.currentIndex * (card.offsetWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        this.updateDots();
    }

    updateDots() {
        document.querySelectorAll('.act-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    updateNavButtons() {
        // Circular — always enabled (no dead-end)
        const prev = document.getElementById('actPrev');
        const next = document.getElementById('actNext');
        if (prev) prev.disabled = false;
        if (next) next.disabled = false;
    }

    goTo(index) {
        // Wrap around both directions
        const total = this.activities.length;
        this.currentIndex = ((index % total) + total) % total;
        // Clamp so we don't show empty space past last card
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
        this.updateSlider();
        this.updateNavButtons();
    }

    next() {
        const nextIndex = this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1;
        this.goTo(prevIndex);
    }

    startAuto() {
        this.autoTimer = setInterval(() => this.next(), 5000);
    }
    stopAuto() { clearInterval(this.autoTimer); }

    // ---- Events ----
    attachEvents() {
        // Prev / Next
        document.getElementById('actPrev')?.addEventListener('click', () => {
            this.stopAuto(); this.prev(); this.startAuto();
        });
        document.getElementById('actNext')?.addEventListener('click', () => {
            this.stopAuto(); this.next(); this.startAuto();
        });

        // Dots
        document.getElementById('actDots')?.addEventListener('click', e => {
            const dot = e.target.closest('.act-dot');
            if (!dot) return;
            this.stopAuto();
            this.goTo(parseInt(dot.dataset.index, 10));
            this.startAuto();
        });

        // "Xem nhanh" preview button → open modal
        document.getElementById('activitiesSliderContainer')?.addEventListener('click', e => {
            const btn = e.target.closest('.act-preview-btn');
            if (btn) this.openModal(btn.dataset.id);
        });

        // Modal close — button or backdrop
        document.addEventListener('click', e => {
            if (e.target.id === 'actModalClose' || e.target.id === 'activityModal') {
                this.closeModal();
            }
        });

        // ESC key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Touch / swipe on mobile
        const viewport = document.querySelector('.act-slider-viewport');
        if (viewport) {
            viewport.addEventListener('touchstart', e => {
                this.dragStartX = e.touches[0].clientX;
            }, { passive: true });
            viewport.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - this.dragStartX;
                if (Math.abs(dx) > window.innerWidth * 0.08) {
                    this.stopAuto();
                    dx < 0 ? this.next() : this.prev();
                    this.startAuto();
                }
            }, { passive: true });
        }
    }
}
