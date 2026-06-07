// ProjectDetail Component — renders a full project detail page based on ?id= URL param

import { ACTIVITIES, STATUS_LABELS } from '../data/activities.js';

export class ProjectDetail {
    constructor() {
        this.init();
    }

    init() {
        const id = new URLSearchParams(window.location.search).get('id');
        const activity = ACTIVITIES.find(a => a.id === id);
        const container = document.getElementById('projectDetailContainer');
        if (!container) return;

        if (!activity) {
            this.renderNotFound(container);
            return;
        }

        document.title = `${activity.title} – Dự Án Cho EM`;
        this.render(container, activity);
        this.initAnimations();
    }

    render(container, a) {
        const label = STATUS_LABELS[a.status] || '';
        const stats = a.stats
            ? `<div class="pd-stats">
                ${a.stats.map(s => `
                    <div class="pd-stat">
                        <span class="pd-stat-value">${s.value}</span>
                        <span class="pd-stat-label">${s.label}</span>
                    </div>
                `).join('')}
               </div>`
            : '';

        const cta = a.ctaHref
            ? `<div class="pd-cta-section">
                   <h3>Bạn muốn tham gia?</h3>
                   <p>Đồng hành cùng chúng mình trong hành trình mang yêu thương đến những em nhỏ.</p>
                   <a href="${a.ctaHref}" class="btn btn-primary pd-cta-btn">${a.ctaText || 'Tham Gia'}</a>
               </div>`
            : `<div class="pd-cta-section">
                   <h3>Bạn muốn tham gia?</h3>
                   <p>Đồng hành cùng chúng mình trong những hành trình tiếp theo.</p>
                   <a href="index.html#tinh-nguyen" class="btn btn-primary pd-cta-btn">Đăng Ký Tình Nguyện</a>
               </div>`;

        container.innerHTML = `
            <!-- Hero Banner -->
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

            <!-- Back button -->
            <div class="pd-back-wrap">
                <div class="container">
                    <a href="index.html#hoat-dong" class="pd-back-btn">
                        ← Quay lại Hoạt Động
                    </a>
                </div>
            </div>

            <!-- Main Content -->
            <div class="pd-body container">

                <!-- Short description lead -->
                <p class="pd-lead">${a.shortDesc}</p>

                ${stats}

                <!-- Full description -->
                <div class="pd-full-desc">
                    ${a.fullDesc}
                </div>

                ${cta}
            </div>
        `;
    }

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

    initAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pd-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.pd-stat, .pd-full-desc, .pd-lead, .pd-cta-section').forEach(el => {
            el.classList.add('pd-fade-in');
            observer.observe(el);
        });
    }
}
