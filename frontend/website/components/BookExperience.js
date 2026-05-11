const BOOK_PAGES = [
    {
        density: 'hard',
        numberLabel: 'Bìa',
        metaTitle: 'Bìa sách',
        variant: 'cover',
        kicker: 'EM Volunteer Journal',
        title: 'Sổ Tay Tình Nguyện',
        lead: 'Một quyển sách nhỏ kể lại cách Dự Án Cho EM kết nối người trẻ với những hành trình tử tế.',
        chips: ['Volunteer', 'Tri thức', 'Cộng đồng', 'Hành trình'],
    },
    {
        numberLabel: '01',
        metaTitle: 'Mở đầu',
        eyebrow: 'Mở đầu',
        title: 'Từ ý tưởng đến chuyến đi thật',
        paragraphs: [
            'Cuốn sách này gói lại những điều quan trọng nhất: volunteer là ai, sẽ làm gì, nhận lại gì và vì sao hành trình ấy đáng để bắt đầu ngay bây giờ.',
            'Mỗi part là một trang mới để người xem có cảm giác đang bước qua từng chương của một hành trình thực tế, không chỉ lướt qua một landing page thông thường.',
        ],
        quote: {
            text: 'Có những điều chỉ cần lật sang trang là thấy mình muốn đồng hành.',
            cite: '— Dự Án Cho EM',
        },
    },
    {
        numberLabel: '02',
        metaTitle: 'Mục lục',
        eyebrow: 'Mục lục',
        title: 'Bản đồ của cuốn sách',
        paragraphs: [
            'Bạn có thể đi tuần tự như đang đọc một quyển sách, hoặc nhảy thẳng đến phần mình quan tâm từ mục lục này.',
        ],
        toc: [
            { label: 'Volunteer là gì?', target: 3 },
            { label: 'Bạn sẽ làm gì?', target: 4 },
            { label: 'Bạn sẽ nhận lại gì?', target: 5 },
            { label: 'Các hành trình tiêu biểu', target: 6 },
            { label: 'Câu chuyện từ người thật', target: 7 },
            { label: 'Cách tham gia cùng chúng mình', target: 8 },
        ],
    },
    {
        numberLabel: '03',
        metaTitle: 'Volunteer là gì?',
        eyebrow: 'Chương 01',
        title: 'Volunteer ở Dự Án Cho EM là gì?',
        paragraphs: [
            'Volunteer ở đây không đứng ngoài câu chuyện. Volunteer là người cùng chuẩn bị, cùng tổ chức, cùng hiện diện và cùng viết nên trải nghiệm học tập có ý nghĩa cho các em nhỏ.',
            'Mỗi bạn tham gia đều trở thành một mắt xích trong hành trình: từ khâu chuẩn bị học liệu, hậu cần, vận hành đến việc trực tiếp đồng hành cùng các em tại điểm trường.',
        ],
        stats: [
            { value: '20+', label: 'Tình nguyện viên' },
            { value: '2+', label: 'Dự án đã đi' },
        ],
        quote: {
            text: 'Volunteer không đứng ngoài câu chuyện; volunteer là người cùng viết nên câu chuyện ấy.',
            cite: '— Tinh thần dự án',
        },
    },
    {
        numberLabel: '04',
        metaTitle: 'Bạn sẽ làm gì?',
        layout: 'compact',
        eyebrow: 'Chương 02',
        title: 'Bạn sẽ làm gì khi tham gia?',
        paragraphs: [
            'Công việc không chỉ diễn ra ở điểm trường. Hành trình bắt đầu từ lúc cả team cùng lên ý tưởng, chia việc, chuẩn bị học liệu và tập dượt hoạt động.',
        ],
        cards: [
            { title: 'Trước chuyến đi', body: 'Soạn học liệu, chuẩn bị trò chơi, hậu cần, truyền thông và gây quỹ.' },
            { title: 'Trong chuyến đi', body: 'Hỗ trợ lớp học, dẫn hoạt động, kết nối với các em và ghi lại khoảnh khắc.' },
            { title: 'Sau chuyến đi', body: 'Tổng kết, viết recap, lưu trữ tài liệu và giữ nhịp cho cộng đồng volunteer.' },
        ],
        bullets: [
            'Bạn thích đứng lớp: hỗ trợ bài học và hoạt náo.',
            'Bạn thích tổ chức: phụ trách vận hành và timeline.',
            'Bạn thích kể chuyện bằng hình ảnh: chụp ảnh, video, recap.',
            'Bạn cẩn thận và bền bỉ: hậu cần, quà tặng, quản lý danh sách.',
        ],
    },
    {
        numberLabel: '05',
        metaTitle: 'Bạn sẽ nhận lại gì?',
        layout: 'compact',
        eyebrow: 'Chương 03',
        title: 'Bạn sẽ nhận lại gì?',
        paragraphs: [
            'Cho đi là một phần rất đẹp, nhưng đây cũng là hành trình giúp chính volunteer lớn lên rõ rệt hơn sau mỗi lần tham gia.',
            'Giá trị nhận lại thường đến theo cách rất thật: kỹ năng tốt hơn, góc nhìn rộng hơn và những mối quan hệ có chiều sâu.',
        ],
        bullets: [
            'Tự tin hơn khi làm việc nhóm và điều phối hoạt động.',
            'Hiểu hơn về giáo dục, cộng đồng và trách nhiệm cá nhân.',
            'Có thêm những người bạn cùng hệ giá trị.',
            'Mang về cảm giác tuổi trẻ của mình đã được dùng cho một điều ý nghĩa.',
        ],
        quote: {
            text: 'Có chuyến đi kết thúc trên bản đồ, nhưng lại mở ra rất lâu trong lòng người đi cùng.',
            cite: '— Một volunteer của EM',
        },
    },
    {
        numberLabel: '06',
        metaTitle: 'Hành trình tiêu biểu',
        layout: 'compact',
        eyebrow: 'Chương 04',
        title: 'Những hành trình tiêu biểu',
        paragraphs: [
            'Mỗi chuyến đi là một chương khác nhau, nhưng đều chung tinh thần kết nối tri thức, niềm vui và sự hiện diện thật lòng.',
        ],
        cards: [
            { title: 'Bắc Kạn', body: 'Những buổi học và học bổng đầu tiên đặt nền cho câu chuyện của dự án.' },
            { title: 'Lào Cai', body: 'Một mùa Noel ấm hơn với hoạt động, quà tặng và những tiếng cười rất thật.' },
            { title: 'Điện Biên', body: 'Điểm đến tiếp theo để gọi thêm những người đồng hành mới trên hành trình này.' },
        ],
        callout: 'Mỗi địa điểm không chỉ là một “điểm đến”, mà là một bối cảnh khác nhau để volunteer trưởng thành.',
    },
    {
        numberLabel: '07',
        metaTitle: 'Câu chuyện từ người thật',
        layout: 'compact',
        eyebrow: 'Chương 05',
        title: 'Câu chuyện từ người thật',
        quote: {
            text: 'Mình từng nghĩ mình chỉ đi hỗ trợ một chương trình ngắn. Nhưng sau chuyến đi, mình nhận ra điều ở lại lâu nhất là cảm giác được thuộc về một nhóm người đang thật lòng cố gắng làm điều tử tế.',
            cite: '— Một thành viên volunteer',
        },
        paragraphs: [
            'Những câu chuyện như vậy là lý do section này nên mang hình hài của một cuốn sách: mỗi trang là một lớp cảm xúc, không chỉ là một khối thông tin.',
            'Format “book” phù hợp với volunteer vì nó kể được một hành trình có mở đầu, cao trào và điểm chạm cảm xúc rõ ràng.',
        ],
        bullets: [
            'Người xem có cảm giác đang khám phá từng chương.',
            'Nội dung dài vẫn có nhịp đọc gọn và đẹp.',
            'Có thể mở rộng thành nhật ký chuyến đi hoặc yearbook về sau.',
        ],
    },
    {
        numberLabel: '08',
        metaTitle: 'Tham gia cùng chúng mình',
        layout: 'compact',
        eyebrow: 'Chương cuối',
        title: 'Nếu bạn muốn trở thành một phần của câu chuyện này',
        paragraphs: [
            'Trang cuối không phải để kết thúc, mà để mở ra một lựa chọn rất đơn giản: bắt đầu cùng chúng mình.',
            'Bạn có thể đọc xong cuốn sách này và dừng lại ở cảm hứng, hoặc biến cảm hứng đó thành một hành động thật.',
        ],
        quote: {
            text: 'Một chương đẹp luôn cần thêm người viết cùng.',
            cite: '— Dự Án Cho EM',
        },
        outroAction: {
            label: 'Khám phá thêm về chúng tôi',
            href: '#gioi-thieu',
        },
    },
    {
        density: 'hard',
        metaTitle: 'Bìa sau',
        variant: 'back-cover',
        kicker: 'EM Volunteer Project',
        title: 'Cảm ơn bạn đã lật tới trang cuối',
        lead: 'Mỗi người đồng hành mới sẽ giúp cuốn sách này có thêm những chương đẹp hơn ngoài đời thật.',
        chips: ['Lan tỏa yêu thương', 'Trao tri thức', 'Đi cùng tuổi trẻ'],
        outroAction: {
            label: 'Khám phá thêm về chúng tôi',
            href: '#gioi-thieu',
        },
    },
];

const BOOK_NOTES = [
    {
        title: 'Một lời nhắn trước khi mở',
        label: 'Lời nhắn',
        angle: '-7deg',
        body: 'Cuốn sách này không chỉ để đọc, mà để cảm được nhịp của một hành trình volunteer thật sự.',
    },
    {
        title: 'Cách xem nhanh nhất',
        label: 'Gợi ý',
        angle: '5deg',
        body: 'Bạn có thể bấm trực tiếp vào nửa trái hoặc nửa phải trang sách, hoặc dùng phím mũi tên để lật.',
    },
    {
        title: 'Điều đáng giữ lại',
        label: 'Thông điệp',
        angle: '-4deg',
        body: 'Mỗi trang là một lát cắt nhỏ về con người, chuyến đi và cảm giác được đồng hành cùng nhau.',
    },
];

export class BookExperience {
    constructor() {
        this.pages = BOOK_PAGES;
        this.notes = BOOK_NOTES;
        this.pageFlip = null;
        this.isInteractive = false;
        this.isOpen = false;
        this.activeNoteIndex = null;
        this.currentIndex = 0;
        this.mobileDirection = 'next';
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.handleResize = this.onResize.bind(this);
        this.handleKeydown = this.onKeydown.bind(this);

        this.init();
    }

    init() {
        this.renderShell();
        this.cacheElements();
        this.attachEvents();
        this.mountFlipbook();
    }

    renderShell() {
        const container = document.getElementById('volunteerBookContainer');
        if (!container) return;
        const coverPage = this.pages.find((page) => page.variant === 'cover') || this.pages[0];

        container.innerHTML = `
            <div class="volunteer-book-launchpad">
                <div class="volunteer-book-note-rail volunteer-book-note-rail--left">
                    ${this.notes.slice(0, 2).map((note, index) => this.renderNoteButton(note, index)).join('')}
                </div>

                <button class="volunteer-book-teaser" id="volunteerBookOpen" type="button" aria-haspopup="dialog" aria-controls="volunteerBookOverlay" aria-label="Mở Volunteer Book">
                    <span class="volunteer-book-teaser-glow" aria-hidden="true"></span>
                    <span class="volunteer-book-teaser-stack" aria-hidden="true"></span>
                    <span class="volunteer-book-teaser-book" aria-hidden="true">
                        <span class="volunteer-book-teaser-spine"></span>
                        <span class="volunteer-book-teaser-cover">
                            <span class="volunteer-book-teaser-kicker">${coverPage.kicker}</span>
                            <span class="volunteer-book-teaser-title">${coverPage.title}</span>
                            <span class="volunteer-book-teaser-lead">${coverPage.lead}</span>
                            <span class="volunteer-book-teaser-chip-row">
                                ${coverPage.chips.map((chip) => `<span class="volunteer-book-teaser-chip">${chip}</span>`).join('')}
                            </span>
                            <span class="volunteer-book-teaser-mark">Dự Án Cho EM</span>
                        </span>
                    </span>
                    <span class="volunteer-book-teaser-caption">
                        <span class="volunteer-book-teaser-caption-label">Bấm để khám phá</span>
                    </span>
                </button>

                <div class="volunteer-book-note-rail volunteer-book-note-rail--right">
                    ${this.notes.slice(2).map((note, index) => this.renderNoteButton(note, index + 2)).join('')}
                </div>

                <div class="volunteer-book-note-popover" id="volunteerBookNotePopover" hidden></div>
            </div>

            <div class="volunteer-book-overlay" id="volunteerBookOverlay" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Volunteer Book Reader">
                <div class="volunteer-book-overlay-backdrop" data-book-close="true"></div>
                <div class="volunteer-book-overlay-shell">
                    <button class="volunteer-book-overlay-close" id="volunteerBookClose" type="button" aria-label="Đóng Volunteer Book">
                        <span class="volunteer-book-overlay-close-text">Đóng</span>
                        <span aria-hidden="true">✕</span>
                    </button>

                    <div class="volunteer-book-shell">
                        <div class="volunteer-book-reader-glow" aria-hidden="true"></div>
                        <div class="volunteer-book-stage" id="volunteerBookStage" tabindex="0" aria-label="Sổ tay volunteer">
                            <div class="volunteer-book-bookcase">
                                <div class="volunteer-book-frame" aria-hidden="true"></div>
                                <div class="volunteer-book-desktop-shell" id="volunteerBookDesktopShell">
                                    <div class="volunteer-book-root" id="volunteerBookRoot">
                                        ${this.pages.map((page, index) => this.renderPage(page, index)).join('')}
                                    </div>
                                </div>
                                <div class="volunteer-book-mobile-reader" id="volunteerBookMobileReader"></div>
                            </div>
                        </div>

                        <div class="volunteer-book-footer">
                            <button class="volunteer-book-nav-btn volunteer-book-nav-btn--prev" id="volunteerBookPrev" aria-label="Trang trước">
                                <span aria-hidden="true">←</span>
                            </button>

                            <div class="volunteer-book-progress-wrap">
                                <div class="volunteer-book-progress-head">
                                    <span class="volunteer-book-progress-count" id="volunteerBookProgressText">Bìa / 08</span>
                                </div>
                                <div class="volunteer-book-progress-track" aria-hidden="true">
                                    <span class="volunteer-book-progress-fill" id="volunteerBookProgressFill"></span>
                                </div>
                            </div>

                            <button class="volunteer-book-nav-btn volunteer-book-nav-btn--next" id="volunteerBookNext" aria-label="Trang tiếp theo">
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderNoteButton(note, index) {
        return `
            <button class="volunteer-book-note" type="button" data-note-index="${index}" style="--note-angle: ${note.angle};" aria-label="${note.label}">
                <span class="volunteer-book-note-label">${note.label}</span>
                <strong>${note.title}</strong>
            </button>
        `;
    }

    renderNotePopover() {
        if (!this.notePopover) return;

        if (this.activeNoteIndex === null) {
            this.notePopover.hidden = true;
            this.notePopover.innerHTML = '';
            return;
        }

        const note = this.notes[this.activeNoteIndex];
        if (!note) return;

        this.notePopover.hidden = false;
        this.notePopover.innerHTML = `
            <div class="volunteer-book-note-card">
                <button class="volunteer-book-note-close" type="button" data-note-close="true" aria-label="Đóng lời nhắn">✕</button>
                <span class="volunteer-book-note-card-label">${note.label}</span>
                <h3>${note.title}</h3>
                <p>${note.body}</p>
            </div>
        `;
    }

    cacheElements() {
        this.container = document.getElementById('volunteerBookContainer');
        this.openBtn = document.getElementById('volunteerBookOpen');
        this.overlay = document.getElementById('volunteerBookOverlay');
        this.closeBtn = document.getElementById('volunteerBookClose');
        this.notePopover = document.getElementById('volunteerBookNotePopover');
        this.stage = document.getElementById('volunteerBookStage');
        this.root = document.getElementById('volunteerBookRoot');
        this.desktopShell = document.getElementById('volunteerBookDesktopShell');
        this.mobileReader = document.getElementById('volunteerBookMobileReader');
        this.prevBtn = document.getElementById('volunteerBookPrev');
        this.nextBtn = document.getElementById('volunteerBookNext');
        this.currentLabel = document.getElementById('volunteerBookCurrentLabel');
        this.modeLabel = document.getElementById('volunteerBookModeLabel');
        this.progressText = document.getElementById('volunteerBookProgressText');
        this.progressFill = document.getElementById('volunteerBookProgressFill');
        this.renderNotePopover();
    }

    attachEvents() {
        this.openBtn?.addEventListener('click', () => this.openReader());
        this.closeBtn?.addEventListener('click', () => this.closeReader());
        this.prevBtn?.addEventListener('click', () => this.flipPrev());
        this.nextBtn?.addEventListener('click', () => this.flipNext());

        this.container?.addEventListener('click', (event) => {
            const noteTrigger = event.target.closest('[data-note-index]');
            if (noteTrigger) {
                event.preventDefault();
                const noteIndex = Number(noteTrigger.dataset.noteIndex);
                this.activeNoteIndex = this.activeNoteIndex === noteIndex ? null : noteIndex;
                this.renderNotePopover();
                return;
            }

            if (event.target.closest('[data-note-close]')) {
                event.preventDefault();
                this.activeNoteIndex = null;
                this.renderNotePopover();
                return;
            }

            if (event.target.closest('[data-book-close]')) {
                event.preventDefault();
                this.closeReader();
                return;
            }

            const link = event.target.closest('[data-book-href]');
            if (link) {
                event.preventDefault();
                const target = document.querySelector(link.dataset.bookHref);
                this.closeReader({ restoreFocus: false });
                if (target) {
                    requestAnimationFrame(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                }
                return;
            }

            if (!this.isOpen) return;
            if (this.isMobileViewport()) return;

            const clickedPaper = event.target.closest('.volunteer-book-paper');
            if (!clickedPaper) return;
            if (event.target.closest('a, button, .volunteer-book-toc-item, .volunteer-book-nav-btn')) return;
            if (!this.root) return;

            const rect = this.root.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const centerX = rect.width / 2;

            if (clickX >= centerX) this.flipNext();
            else this.flipPrev();
        });

        this.stage?.addEventListener('mouseenter', () => {
            this.isInteractive = true;
        });
        this.stage?.addEventListener('mouseleave', () => {
            this.isInteractive = false;
        });
        this.stage?.addEventListener('focusin', () => {
            this.isInteractive = true;
        });
        this.stage?.addEventListener('focusout', () => {
            this.isInteractive = false;
        });

        document.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('resize', this.handleResize, { passive: true });
    }

    mountFlipbook() {
        if (!this.root) return;

        if (!window.St?.PageFlip) {
            this.root.classList.add('is-fallback');
            this.fitPages();
            this.renderMobileReader(false);
            this.syncStatus(0, 'portrait');
            return;
        }

        this.fitPages();

        this.pageFlip = new window.St.PageFlip(this.root, {
            width: 480,
            height: 660,
            size: 'stretch',
            minWidth: 260,
            maxWidth: 520,
            minHeight: 420,
            maxHeight: 720,
            drawShadow: true,
            maxShadowOpacity: 0.18,
            flippingTime: this.prefersReducedMotion.matches ? 0 : 820,
            usePortrait: true,
            autoSize: true,
            showCover: true,
            mobileScrollSupport: true,
            swipeDistance: 24,
            clickEventForward: false,
            useMouseEvents: false,
            startZIndex: 10,
        });

        this.pageFlip.on('init', (event) => {
            this.currentIndex = event.data.page;
            this.syncStatus(event.data.page, event.data.mode);
        });

        this.pageFlip.on('flip', (event) => {
            this.currentIndex = event.data;
            this.syncStatus(event.data, this.pageFlip.getOrientation());
        });

        this.pageFlip.on('changeOrientation', (event) => {
            this.syncStatus(this.pageFlip.getCurrentPageIndex(), event.data);
        });

        this.pageFlip.on('changeState', () => {
            this.syncStatus();
        });

        this.pageFlip.loadFromHTML(this.root.querySelectorAll('.volunteer-book-leaf'));
        this.renderMobileReader(false);
        this.syncStatus(0, this.pageFlip.getOrientation());
    }

    isMobileViewport() {
        return window.innerWidth <= 768;
    }

    fitPages() {
        if (!this.root) return;

        this.root.querySelectorAll('.volunteer-book-paper').forEach((paper) => {
            const content = paper.querySelector('.volunteer-book-page-body, .volunteer-book-cover');
            if (!content) return;

            paper.style.setProperty('--page-scale', '1');
            paper.classList.remove('is-scaled');

            const availableHeight = Math.max(0, paper.clientHeight - 64);
            const naturalHeight = content.scrollHeight;

            if (availableHeight === 0 || naturalHeight <= availableHeight) return;

            const scale = Math.max(0.8, Math.min(1, availableHeight / naturalHeight));
            paper.style.setProperty('--page-scale', scale.toFixed(3));
            paper.classList.add('is-scaled');
        });
    }

    onKeydown(event) {
        if (!this.isOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeReader();
            return;
        }

        if (event.target instanceof HTMLElement) {
            const tag = event.target.tagName;
            if (event.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
                return;
            }
        }

        if (this.isMobileViewport()) {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                this.flipNext();
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                this.flipPrev();
            }
            return;
        }

        if (!this.pageFlip) return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.flipNext();
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.flipPrev();
        }
    }

    openReader() {
        if (this.isOpen || !this.overlay) return;

        this.isOpen = true;
        this.activeNoteIndex = null;
        this.renderNotePopover();
        this.overlay.classList.add('is-open');
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('has-volunteer-book-open');
        document.body.classList.add('native-book-cursor');
        window._chatWidget?.closeChat?.();
        window._lockScroll?.();

        requestAnimationFrame(() => {
            this.isInteractive = true;
            if (typeof this.pageFlip?.update === 'function') {
                this.pageFlip.update();
            }
            this.fitPages();
            this.renderMobileReader(false);
            this.syncStatus();
            this.stage?.focus();
        });
    }

    closeReader({ restoreFocus = true } = {}) {
        if (!this.isOpen || !this.overlay) return;

        this.isOpen = false;
        this.isInteractive = false;
        this.overlay.classList.remove('is-open');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('has-volunteer-book-open');
        document.body.classList.remove('native-book-cursor');
        window._unlockScroll?.();
        if (restoreFocus) {
            this.openBtn?.focus();
        }
    }

    flipPrev() {
        if (this.isMobileViewport()) {
            if (this.currentIndex <= 0) return;
            this.mobileDirection = 'prev';
            this.currentIndex -= 1;
            this.renderMobileReader();
            this.syncStatus(this.currentIndex, 'portrait');
            return;
        }

        if (!this.pageFlip || this.pageFlip.getCurrentPageIndex() <= 0) return;
        this.pageFlip.flipPrev('top');
    }

    flipNext() {
        if (this.isMobileViewport()) {
            if (this.currentIndex >= this.pages.length - 1) return;
            this.mobileDirection = 'next';
            this.currentIndex += 1;
            this.renderMobileReader();
            this.syncStatus(this.currentIndex, 'portrait');
            return;
        }

        if (!this.pageFlip || this.pageFlip.getCurrentPageIndex() >= this.pages.length - 1) return;
        this.pageFlip.flipNext('top');
    }

    flipTo(index) {
        const safeIndex = Math.max(0, Math.min(index, this.pages.length - 1));

        if (this.isMobileViewport()) {
            this.mobileDirection = safeIndex >= this.currentIndex ? 'next' : 'prev';
            this.currentIndex = safeIndex;
            this.renderMobileReader();
            this.syncStatus(this.currentIndex, 'portrait');
            return;
        }

        if (!this.pageFlip || Number.isNaN(index)) return;
        if (safeIndex === this.pageFlip.getCurrentPageIndex()) return;

        this.pageFlip.flip(safeIndex, 'top');
    }

    syncStatus(index = null, orientation = null) {
        const currentIndex = index ?? (this.isMobileViewport() ? this.currentIndex : this.pageFlip?.getCurrentPageIndex()) ?? 0;
        const currentPage = this.pages[currentIndex] || this.pages[0];
        const currentOrientation = orientation ?? (this.isMobileViewport() ? 'portrait' : this.pageFlip?.getOrientation?.()) ?? 'portrait';
        const lastNumberedPage = [...this.pages].reverse().find((page) => page.numberLabel && page.numberLabel !== 'Bìa')?.numberLabel || '00';

        this.currentIndex = currentIndex;

        if (this.currentLabel) {
            this.currentLabel.textContent = currentPage.metaTitle || 'Volunteer Book';
        }

        if (this.modeLabel) {
            this.modeLabel.textContent = currentOrientation === 'landscape' ? '2 trang' : '1 trang';
        }

        if (this.progressText) {
            const currentLabel = currentPage.numberLabel || 'Bìa';
            this.progressText.textContent = `${currentLabel} / ${lastNumberedPage}`;
        }

        if (this.progressFill) {
            const progress = (currentIndex / Math.max(1, this.pages.length - 1)) * 100;
            this.progressFill.style.width = `${progress}%`;
        }

        if (this.prevBtn) {
            this.prevBtn.disabled = currentIndex <= 0;
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = currentIndex >= this.pages.length - 1;
        }
    }

    onResize() {
        if (this.isMobileViewport()) {
            this.renderMobileReader(false);
            this.syncStatus(this.currentIndex, 'portrait');
            return;
        }

        if (this.pageFlip && this.pageFlip.getCurrentPageIndex() !== this.currentIndex) {
            this.pageFlip.turnToPage(this.currentIndex);
        }

        this.syncStatus(this.pageFlip?.getCurrentPageIndex() ?? this.currentIndex, this.pageFlip?.getOrientation?.() ?? 'landscape');
    }

    renderPage(page, index) {
        const densityAttr = page.density ? ` data-density="${page.density}"` : '';
        const variantClass = page.variant ? ` volunteer-book-leaf--${page.variant}` : '';
        const layoutClass = page.layout ? ` volunteer-book-leaf--${page.layout}` : '';

        return `
            <article class="volunteer-book-leaf${variantClass}${layoutClass}"${densityAttr} data-page-index="${index}">
                <div class="volunteer-book-paper">
                    ${this.renderPageBody(page)}
                    ${page.numberLabel ? `<span class="volunteer-book-page-number">${page.numberLabel}</span>` : ''}
                </div>
            </article>
        `;
    }

    renderMobileReader(animate = true) {
        if (!this.mobileReader) return;

        const page = this.pages[this.currentIndex] || this.pages[0];
        const variantClass = page.variant ? ` volunteer-book-mobile-page--${page.variant}` : '';
        const layoutClass = page.layout ? ` volunteer-book-mobile-page--${page.layout}` : '';
        const animationClass = animate && !this.prefersReducedMotion.matches
            ? ` is-entering is-${this.mobileDirection}`
            : '';

        this.mobileReader.innerHTML = `
            <article class="volunteer-book-mobile-page${variantClass}${layoutClass}${animationClass}">
                <div class="volunteer-book-mobile-paper">
                    ${this.renderPageBody(page)}
                    ${page.numberLabel ? `<span class="volunteer-book-mobile-page-number">${page.numberLabel}</span>` : ''}
                </div>
            </article>
        `;

        this.fitMobilePage();
    }

    fitMobilePage() {
        const paper = this.mobileReader?.querySelector('.volunteer-book-mobile-paper');
        const content = paper?.querySelector('.volunteer-book-page-body, .volunteer-book-cover');
        if (!paper || !content) return;

        paper.style.setProperty('--mobile-page-scale', '1');
        paper.classList.remove('is-scaled');

        const availableHeight = Math.max(0, paper.clientHeight - 64);
        const naturalHeight = content.scrollHeight;

        if (availableHeight === 0 || naturalHeight <= availableHeight) return;

        const scale = Math.max(0.82, Math.min(1, availableHeight / naturalHeight));
        paper.style.setProperty('--mobile-page-scale', scale.toFixed(3));
        paper.classList.add('is-scaled');
    }

    renderPageBody(page) {
        if (page.variant === 'cover') {
            return `
                <div class="volunteer-book-cover">
                    <p class="volunteer-book-cover-kicker">${page.kicker}</p>
                    <h3 class="volunteer-book-cover-title">${page.title}</h3>
                    <p class="volunteer-book-cover-lead">${page.lead}</p>
                    <div class="volunteer-book-chip-row">
                        ${page.chips.map((chip) => `<span class="volunteer-book-chip">${chip}</span>`).join('')}
                    </div>
                    <div class="volunteer-book-cover-mark">Dự Án Cho EM</div>
                </div>
            `;
        }

        if (page.variant === 'back-cover') {
            return `
                <div class="volunteer-book-cover volunteer-book-cover--back">
                    <p class="volunteer-book-cover-kicker">${page.kicker}</p>
                    <h3 class="volunteer-book-cover-title">${page.title}</h3>
                    <p class="volunteer-book-cover-lead">${page.lead}</p>
                    <div class="volunteer-book-chip-row">
                        ${page.chips.map((chip) => `<span class="volunteer-book-chip">${chip}</span>`).join('')}
                    </div>
                    ${page.outroAction ? `
                        <a href="${page.outroAction.href}" class="btn btn-primary volunteer-book-outro-link" data-book-href="${page.outroAction.href}">
                            ${page.outroAction.label}
                        </a>
                    ` : ''}
                    <div class="volunteer-book-cover-seal">See you on the next journey</div>
                </div>
            `;
        }

        return `
            <div class="volunteer-book-page-body">
                ${page.eyebrow ? `<p class="volunteer-book-page-eyebrow">${page.eyebrow}</p>` : ''}
                ${page.title ? `<h4 class="volunteer-book-page-heading">${page.title}</h4>` : ''}
                ${page.paragraphs?.length ? page.paragraphs.map((paragraph) => `<p class="volunteer-book-page-copy">${paragraph}</p>`).join('') : ''}
                ${page.stats?.length ? `
                    <div class="volunteer-book-stat-grid">
                        ${page.stats.map((stat) => `
                            <div class="volunteer-book-stat">
                                <strong>${stat.value}</strong>
                                <span>${stat.label}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${page.cards?.length ? `
                    <div class="volunteer-book-card-list">
                        ${page.cards.map((card) => `
                            <article class="volunteer-book-mini-card">
                                <h5>${card.title}</h5>
                                <p>${card.body}</p>
                            </article>
                        `).join('')}
                    </div>
                ` : ''}
                ${page.bullets?.length ? `
                    <ul class="volunteer-book-bullet-list">
                        ${page.bullets.map((item) => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
                ${page.toc?.length ? `
                    <div class="volunteer-book-toc">
                        ${page.toc.map((item, itemIndex) => `
                            <div class="volunteer-book-toc-item" aria-label="${item.label}">
                                <span>${String(itemIndex + 1).padStart(2, '0')}</span>
                                <strong>${item.label}</strong>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${page.callout ? `<div class="volunteer-book-callout">${page.callout}</div>` : ''}
                ${page.quote ? `
                    <blockquote class="volunteer-book-quote">
                        <p>${page.quote.text}</p>
                        <cite>${page.quote.cite}</cite>
                    </blockquote>
                ` : ''}
                ${page.outroAction ? `
                    <div class="volunteer-book-cta-list volunteer-book-cta-list--outro">
                        <a href="${page.outroAction.href}" class="btn btn-primary volunteer-book-cta-link volunteer-book-cta-link--outro" data-book-href="${page.outroAction.href}">
                            ${page.outroAction.label}
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }
}
