// Activities Component — Carousel + Modal

const ACTIVITIES = [
    {
        id: 'backan',
        image: 'assets/images/projects/backan.jpg',
        title: 'Hành Trình Đầu Tiên',
        location: 'Bắc Kạn',
        date: '15–16/03/2025',
        status: 'completed',
        shortDesc:
            'Trong chuyến đi đầu tiên của EM, chúng mình đã mang đến — và cũng mang về — thật nhiều điều. Những nụ cười rạng rỡ, ánh mắt háo hức và sự biết ơn từ tận đáy lòng.',
        stats: [
            { value: '50+',  label: 'Em nhỏ' },
            { value: '30+',  label: 'Học bổng' },
            { value: '20+',  label: 'Tình nguyện viên' },
            { value: '2',    label: 'Ngày' },
        ],
        fullDesc: `
            <p>Chuyến đi đầu tiên của Dự Án Cho EM đến với mảnh đất Bắc Kạn vào tháng 3/2025 đã để lại những dấu ấn khó phai trong lòng cả đội và các em nhỏ. Đây là hành trình mở đầu cho một chuỗi những chuyến đi đầy ý nghĩa, nơi tình yêu thương và tri thức được lan tỏa đến những vùng đất còn nhiều khó khăn.</p>
            <h4>🌟 Điểm nổi bật</h4>
            <ul>
                <li>Tổ chức 6 buổi học tiếng Anh vui vẻ và sáng tạo cho hơn 50 em nhỏ</li>
                <li>Trao tặng 30 suất học bổng kèm đồ dùng học tập</li>
                <li>Tổ chức các trò chơi teambuilding gắn kết tình bạn</li>
                <li>Giao lưu văn hóa và ca hát cùng các em</li>
                <li>Thăm hỏi và hỗ trợ các gia đình có hoàn cảnh khó khăn</li>
            </ul>
            <h4>💬 Cảm nhận từ tình nguyện viên</h4>
            <blockquote>
                Nhìn các em háo hức học từng chữ tiếng Anh, mình mới hiểu tại sao mình quyết định tham gia dự án này. Đây thực sự là một trong những kỷ niệm đẹp nhất tuổi trẻ của mình.
                <cite>— Nguyễn Thị Lan, Tình nguyện viên</cite>
            </blockquote>
        `,
    },
    {
        id: 'yty',
        image: 'assets/images/projects/yty.jpg',
        title: 'Noel Cho Em',
        location: 'Lào Cai',
        date: '5–7/12/2025',
        status: 'completed',
        shortDesc:
            'Giáng sinh luôn là mùa của những điều ấm áp. Chúng mình muốn trở thành "ông già Noel" đặc biệt — mang đến niềm vui, sự tò mò và những kỷ niệm đẹp đầu đời cho các em.',
        stats: [
            { value: '100+', label: 'Phần quà Noel' },
            { value: '80+',  label: 'Em nhỏ' },
            { value: '25+',  label: 'Tình nguyện viên' },
            { value: '3',    label: 'Ngày' },
        ],
        fullDesc: `
            <p>Trong không khí Giáng sinh ấm áp, Dự Án Cho EM lần đầu tiên đặt chân đến vùng đất Lào Cai. Những con đường núi quanh co dẫn đến những ngôi trường nhỏ xinh giữa bạt ngàn xanh mướt, nơi các em nhỏ chưa từng được đón một mùa Giáng sinh thực sự.</p>
            <h4>🎄 Ý nghĩa đặc biệt</h4>
            <ul>
                <li>Mang Giáng sinh đến với các em nhỏ vùng cao lần đầu tiên</li>
                <li>Tổ chức đêm hội Noel với đèn hoa lung linh và quà tặng</li>
                <li>Dạy tiếng Anh qua các bài hát Giáng sinh quốc tế</li>
                <li>Trao tặng hơn 100 phần quà Noel ý nghĩa</li>
                <li>Chụp ảnh lưu niệm và tạo những kỷ niệm khó quên</li>
            </ul>
            <h4>💬 Khoảnh khắc khó quên</h4>
            <blockquote>
                Lần đầu tiên trong đời, các em được nhìn thấy ông già Noel. Ánh mắt ngạc nhiên và nụ cười rạng rỡ của các em là món quà lớn nhất với tất cả chúng mình.
                <cite>— Trần Văn Đức, Trưởng nhóm</cite>
            </blockquote>
        `,
    },
    {
        id: 'dienbien',
        image: 'assets/images/projects/dienbien.jpg',
        title: 'Hành Trình Điện Biên',
        location: 'Điện Biên',
        date: 'Sắp công bố • 2026',
        status: 'planning',
        shortDesc:
            'Hành trình tiếp theo sẽ đến với vùng đất lịch sử Điện Biên. Một chuyến đi đặc biệt đang được lên kế hoạch — hãy cùng chờ đón và đăng ký tham gia!',
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: '#tinh-nguyen',
        fullDesc: `
            <div class="modal-coming-soon">
                <div class="coming-soon-icon">🏔️</div>
                <h3>Đang lên kế hoạch...</h3>
                <p>Chuyến hành trình đến Điện Biên đang được chuẩn bị kỹ lưỡng để mang đến những trải nghiệm tốt nhất cho cả tình nguyện viên và các em nhỏ nơi đây.</p>
            </div>
            <h4>🗺️ Dự kiến hoạt động</h4>
            <ul>
                <li>Dạy học tiếng Anh và kỹ năng sống cho các em</li>
                <li>Trao tặng học bổng và đồ dùng học tập</li>
                <li>Giao lưu văn hóa đặc sắc vùng Tây Bắc</li>
                <li>Tham quan các địa danh lịch sử Điện Biên Phủ</li>
            </ul>
            <h4>📞 Muốn tham gia?</h4>
            <p>Đăng ký để được thông báo sớm nhất khi lịch trình được công bố chính thức!</p>
        `,
    },

    // ── PLACEHOLDER — xoá khi có dự án thật ──
    {
        id: 'placeholder1',
        image: 'assets/images/backgrounds/hero-bg.jpg',
        title: '[Sắp Ra Mắt] Hành Trình Mới',
        location: 'Chưa xác định',
        date: 'Cuối năm 2026',
        status: 'planning',
        shortDesc:
            'Một hành trình mới đang được ấp ủ. Chúng mình sẽ sớm công bố điểm đến và kế hoạch chi tiết — hãy theo dõi để không bỏ lỡ!',
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: '#tinh-nguyen',
        fullDesc: `
            <div class="modal-coming-soon">
                <div class="coming-soon-icon">✨</div>
                <h3>Đang ấp ủ...</h3>
                <p>Một hành trình mới đang được lên kế hoạch tỉ mỉ. Thông tin chi tiết sẽ sớm được công bố!</p>
            </div>
            <h4>📞 Muốn tham gia?</h4>
            <p>Điền form đăng ký quan tâm để được thông báo đầu tiên khi có thông tin mới.</p>
        `,
    },
    {
        id: 'placeholder2',
        image: 'assets/images/backgrounds/hero-bg.jpg',
        title: '[Sắp Ra Mắt] Hành Trình Mới',
        location: 'Chưa xác định',
        date: '2027',
        status: 'planning',
        shortDesc:
            'Chúng mình không dừng lại! Một hành trình khác đang được hoạch định — đồng hành cùng EM để cùng nhau tạo nên những điều kỳ diệu.',
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: '#tinh-nguyen',
        fullDesc: `
            <div class="modal-coming-soon">
                <div class="coming-soon-icon">🌟</div>
                <h3>Sắp ra mắt...</h3>
                <p>Chúng mình không dừng lại! Hành trình này đang được hoạch định và sẽ sớm được công bố.</p>
            </div>
            <h4>📞 Muốn tham gia?</h4>
            <p>Điền form đăng ký để được cập nhật thông tin sớm nhất.</p>
        `,
    },
];

const STATUS_LABELS = {
    completed: 'Đã hoàn thành',
    upcoming:  'Sắp diễn ra',
    planning:  'Đang lên kế hoạch',
};

export class Activities {
    constructor() {
        this.activities   = ACTIVITIES;
        this.currentIndex = 0;
        this.autoTimer    = null;
        this.isDragging   = false;
        this.dragStartX   = 0;
        this.init();
    }

    // ---- Responsive helper ----
    get visibleCount() {
        if (window.innerWidth >= 1024) return 3;
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
        this.updateSlider();
        this.updateNavButtons();
        this.startAuto();

        window.addEventListener('resize', () => {
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateSlider();
            this.updateNavButtons();
        });
    }

    // ---- Render slider ----
    renderSlider() {
        const container = document.getElementById('activitiesSliderContainer');
        if (!container) return;

        const cards = this.activities
            .map((a, i) => this.cardHTML(a, i))
            .join('');

        const dots = this.activities
            .map((_, i) => `<button class="act-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Đến slide ${i + 1}"></button>`)
            .join('');

        container.innerHTML = `
            <div class="act-slider-wrapper">
                <button class="act-slider-btn act-prev" id="actPrev" aria-label="Trước">&#8249;</button>
                <div class="act-slider-viewport">
                    <div class="act-slider-track" id="actTrack">${cards}</div>
                </div>
                <button class="act-slider-btn act-next" id="actNext" aria-label="Tiếp">&#8250;</button>
            </div>
            <div class="act-dots" id="actDots">${dots}</div>
        `;
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
                    <button class="btn btn-primary act-see-more" data-id="${activity.id}">Xem Thêm</button>
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

    // ---- Open modal ----
    openModal(id) {
        const a = this.activities.find(x => x.id === id);
        if (!a) return;

        const label  = STATUS_LABELS[a.status] || '';
        const stats  = a.stats
            ? `<div class="modal-stats">${a.stats.map(s => `
                    <div class="modal-stat"><span>${s.value}</span><small>${s.label}</small></div>
               `).join('')}</div>`
            : '';
        const cta    = a.ctaHref
            ? `<div style="text-align:center;margin-top:24px">
                   <a href="${a.ctaHref}" class="btn btn-primary" id="actModalCta">${a.ctaText || 'Tham Gia'}</a>
               </div>`
            : '';

        document.getElementById('actModalBody').innerHTML = `
            <div class="act-modal-image-wrap">
                <img src="${a.image}" alt="${a.title}"
                     onerror="this.src='assets/images/volunteers.jpg'">
                <span class="act-status-badge act-status--${a.status}">${label}</span>
            </div>
            <div class="act-modal-info">
                <h2 class="act-modal-title">${a.title}</h2>
                <div class="act-card-meta act-modal-meta">
                    <span>📍 ${a.location}</span>
                    <span>📅 ${a.date}</span>
                </div>
                ${stats}
                <div class="act-modal-full-desc">${a.fullDesc}</div>
                ${cta}
            </div>
        `;

        const modal = document.getElementById('activityModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        document.getElementById('actModalCta')?.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        document.getElementById('activityModal')?.classList.remove('active');
        document.body.style.overflow = '';
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

        // "Xem Thêm" buttons
        document.getElementById('activitiesSliderContainer')?.addEventListener('click', e => {
            const btn = e.target.closest('.act-see-more');
            if (btn) this.openModal(btn.dataset.id);
        });

        // Modal close — button
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
                if (Math.abs(dx) > 40) {
                    this.stopAuto();
                    dx < 0 ? this.next() : this.prev();
                    this.startAuto();
                }
            }, { passive: true });
        }
    }
}
