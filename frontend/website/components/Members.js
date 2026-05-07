/**
 * Members Component — Track-based Carousel
 * Desktop: 3 cards | Tablet: 2 cards | Mobile: 1 card
 */

const MEMBERS_DATA = [
    {
        image: 'assets/images/members/tdao.jpg',
        role: 'Founder',
        name: 'Đào Việt Thanh',
        info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội. Người sáng lập dự án với nhiều năm kinh nghiệm trong lĩnh vực từ thiện và phát triển cộng đồng.',
        hobbies: 'Đọc sách, Đánh cầu, Du lịch',
        quote: 'Tuổi trẻ vất vả một chút.'
    },
    {
        image: 'assets/images/members/thao.jpg',
        role: 'Co-Founder',
        name: 'Tạ Thanh Thảo',
        info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội. Đồng sáng lập và chịu trách nhiệm về các hoạt động trong công tác hậu cần.',
        hobbies: 'Ngủ, Xem phim, Lướt Tiktok',
        quote: 'The more you give, the more you receive.'
    },
    {
        image: 'assets/images/members/thư.jpg',
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
        info: 'Cựu Sinh viên khoa Tiếng Anh, trường ĐHSP Hà Nội.',
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

export class Members {
    constructor() {
        this.members      = MEMBERS_DATA;
        this.currentIndex = 0;
        this.autoTimer    = null;
        this.dragStartX   = 0;
        this.init();
    }

    get visibleCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640)  return 2;
        return 1;
    }

    get maxIndex() {
        return Math.max(0, this.members.length - this.visibleCount);
    }

    init() {
        this.renderSlider();
        this.renderLightbox();
        this.attachEvents();
        this.updateSlider();
        this.startAuto();

        window.addEventListener('resize', () => {
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateSlider();
        });
    }

    renderSlider() {
        const container = document.getElementById('membersSliderContainer');
        if (!container) return;

        const cards = this.members.map((m, i) => this.cardHTML(m, i)).join('');
        const dots  = this.members.map((_, i) =>
            `<button class="mem-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
        ).join('');

        container.innerHTML = `
            <div class="mem-slider-wrapper">
                <button class="mem-slider-btn mem-prev" id="memPrev" aria-label="Trước">&#8249;</button>
                <div class="mem-slider-viewport">
                    <div class="mem-slider-track" id="memTrack">${cards}</div>
                </div>
                <button class="mem-slider-btn mem-next" id="memNext" aria-label="Tiếp">&#8250;</button>
            </div>
            <div class="mem-dots" id="memDots">${dots}</div>
        `;
    }

    cardHTML(member, index) {
        const initials = member.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        return `
            <div class="mem-card" data-index="${index}">
                <div class="mem-card-image">
                    <img src="${member.image}" alt="${member.name}"
                         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div class="mem-card-placeholder">${initials}</div>
                </div>
                <div class="mem-card-body">
                    <span class="mem-role">${member.role}</span>
                    <h3 class="mem-name">${member.name}</h3>
                    <p class="mem-info">${member.info}</p>
                    <p class="mem-hobbies">❤️ ${member.hobbies}</p>
                    <p class="mem-quote">"${member.quote}"</p>
                </div>
            </div>
        `;
    }

    updateSlider() {
        const track = document.getElementById('memTrack');
        if (!track) return;
        const card = track.querySelector('.mem-card');
        if (!card) return;

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
        document.querySelectorAll('.mem-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    goTo(index) {
        const total = this.members.length;
        this.currentIndex = ((index % total) + total) % total;
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
        this.updateSlider();
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
        this.autoTimer = setInterval(() => this.next(), 6000);
    }

    stopAuto() { clearInterval(this.autoTimer); }

    attachEvents() {
        document.getElementById('memPrev')?.addEventListener('click', () => {
            this.stopAuto(); this.prev(); this.startAuto();
        });
        document.getElementById('memNext')?.addEventListener('click', () => {
            this.stopAuto(); this.next(); this.startAuto();
        });

        document.getElementById('memDots')?.addEventListener('click', e => {
            const dot = e.target.closest('.mem-dot');
            if (!dot) return;
            this.stopAuto();
            this.goTo(parseInt(dot.dataset.index, 10));
            this.startAuto();
        });

        document.getElementById('membersSliderContainer')?.addEventListener('click', e => {
            const card = e.target.closest('.mem-card');
            if (card) this.openLightbox(parseInt(card.dataset.index));
        });

        const viewport = document.querySelector('.mem-slider-viewport');
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

        document.getElementById('membersLightboxClose')?.addEventListener('click', () => this.closeLightbox());
        document.getElementById('membersLightbox')?.addEventListener('click', e => {
            if (e.target.id === 'membersLightbox') this.closeLightbox();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeLightbox();
        });
    }

    renderLightbox() {
        document.getElementById('membersLightbox')?.remove();
        document.body.insertAdjacentHTML('beforeend', `
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
        `);
    }

    openLightbox(index) {
        const member = this.members[index];
        if (!member) return;

        document.getElementById('lightboxMemberImage').src   = member.image;
        document.getElementById('lightboxMemberRole').textContent    = member.role;
        document.getElementById('lightboxMemberName').textContent    = member.name;
        document.getElementById('lightboxMemberInfo').textContent    = member.info;
        document.getElementById('lightboxMemberHobbies').textContent = member.hobbies;
        document.getElementById('lightboxMemberQuote').textContent   = `"${member.quote}"`;

        document.getElementById('membersLightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('membersLightbox')?.classList.remove('active');
        document.body.style.overflow = '';
    }
}
