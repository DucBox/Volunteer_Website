const QR_INFO = {
    src: 'assets/images/qr.jpg',
    alt: 'QR quyên góp cho Dự Án Cho EM',
    bank: 'Techcombank',
    account: '9999 5521 44',
    owner: 'DAO VIET THANH',
    note: 'Tên + Ủng hộ Dự Án Cho EM',
};

const THANK_YOU_PAGE = {
    eyebrow: 'Thư cảm ơn',
    title: 'Cảm ơn bạn đã lật tới trang cuối',
    paragraphs: [
        'Nếu bạn muốn tiếp tục đồng hành cùng Dự Án Cho EM, bạn có thể quét mã QR này để ủng hộ hoặc kết nối thêm với chúng mình.',
    ],
    qr: QR_INFO,
    quote: {
        text: 'Mỗi đóng góp nhỏ sẽ giúp cuốn sách này có thêm những chương đẹp hơn ngoài đời thật.',
        cite: '— Dự Án Cho EM',
    },
};

// Unified chapter source — pagination engine splits these into physical pages at runtime
const BOOK_CHAPTERS = [
    {
        variant: 'cover',
        density: 'hard',
        numberLabel: 'Bìa',
        kicker: 'EM Volunteer Journal',
        title: 'Sổ Tay Tình Nguyện',
        lead: 'Một quyển sách nhỏ kể lại cách Dự Án Cho EM kết nối người trẻ với những hành trình tử tế.',
        chips: ['Volunteer', 'Tri thức', 'Cộng đồng', 'Hành trình'],
    },
    {
        variant: 'blank',
    },
    {
        eyebrow: 'Mở đầu',
        title: 'Từ ý tưởng đến chuyến đi thật',
        blocks: [
            { type: 'paragraph', text: 'Cuốn sách này gói lại những điều quan trọng nhất: volunteer là ai, sẽ làm gì, nhận lại gì và vì sao hành trình ấy đáng để bắt đầu ngay bây giờ.' },
            { type: 'paragraph', text: 'Mỗi phần là một chương mới, để người xem có cảm giác đang đi qua một hành trình thật thay vì chỉ lướt một landing page thông thường.' },
            { type: 'quote', text: 'Có những điều chỉ cần lật sang trang là thấy mình muốn đồng hành.', cite: '— Dự Án Cho EM' },
        ],
    },
    {
        eyebrow: 'Mục lục',
        title: 'Cuốn sách này có gì?',
        blocks: [
            { type: 'bullets', items: [
                'Volunteer ở Dự Án Cho EM là ai.',
                'Bạn sẽ làm gì khi tham gia.',
                'Bạn sẽ nhận lại điều gì.',
                'Những hành trình tiêu biểu đã đi qua.',
                'Câu chuyện thật từ người đã đồng hành.',
                'Một lời cảm ơn cuối sách để tiếp tục kết nối cùng dự án.',
            ]},
            { type: 'callout', text: 'Bạn không cần bấm vào mục lục. Chỉ cần lật từng trang để đi hết câu chuyện.' },
        ],
    },
    {
        eyebrow: 'Chương 01',
        title: 'Volunteer ở Dự Án Cho EM là ai?',
        blocks: [
            { type: 'paragraph', text: 'Volunteer không đứng ngoài câu chuyện. Mỗi bạn đều là người cùng chuẩn bị, cùng tổ chức và cùng hiện diện trong trải nghiệm học tập của các em nhỏ.' },
            { type: 'paragraph', text: 'Từ học liệu, hậu cần, vận hành đến việc trực tiếp đồng hành ở điểm trường, mỗi vai trò đều là một mắt xích quan trọng.' },
            { type: 'stats', items: [
                { value: '20+', label: 'Tình nguyện viên' },
                { value: '2+', label: 'Hành trình đã đi' },
            ]},
            { type: 'quote', text: 'Volunteer không đứng ngoài câu chuyện; volunteer là người cùng viết nên câu chuyện ấy.', cite: '— Tinh thần dự án' },
        ],
    },
    {
        eyebrow: 'Chương 02',
        title: 'Bạn sẽ làm gì khi tham gia?',
        blocks: [
            { type: 'paragraph', text: 'Hành trình bắt đầu từ trước chuyến đi, kéo dài trong chuyến đi và còn tiếp tục sau đó bằng việc tổng kết, lưu trữ và giữ nhịp cộng đồng volunteer.' },
            { type: 'cards', items: [
                { title: 'Trước chuyến đi', body: 'Soạn học liệu, chuẩn bị trò chơi, hậu cần, truyền thông và gây quỹ.' },
                { title: 'Trong chuyến đi', body: 'Hỗ trợ lớp học, dẫn hoạt động, kết nối với các em và ghi lại khoảnh khắc.' },
                { title: 'Sau chuyến đi', body: 'Tổng kết, viết recap, lưu trữ tài liệu và giữ nhịp cho cộng đồng volunteer.' },
            ]},
            { type: 'bullets', items: [
                'Hỗ trợ lớp học và hoạt náo.',
                'Điều phối timeline và hậu cần.',
                'Chụp ảnh, quay video, viết recap.',
                'Quản lý quà tặng, danh sách và vận hành.',
            ]},
        ],
    },
    {
        eyebrow: 'Chương 03',
        title: 'Bạn sẽ nhận lại gì?',
        blocks: [
            { type: 'paragraph', text: 'Đây không chỉ là hành trình cho đi. Nó cũng là cách volunteer lớn lên thật rõ rệt qua từng lần tham gia.' },
            { type: 'paragraph', text: 'Kỹ năng, góc nhìn, tình bạn và cảm giác tuổi trẻ của mình được dùng đúng chỗ là những điều đọng lại lâu nhất.' },
            { type: 'bullets', items: [
                'Tự tin hơn khi làm việc nhóm và điều phối hoạt động.',
                'Hiểu hơn về giáo dục, cộng đồng và trách nhiệm cá nhân.',
                'Có thêm những người bạn cùng hệ giá trị.',
                'Mang về cảm giác mình đã làm một điều có ý nghĩa.',
            ]},
            { type: 'quote', text: 'Có chuyến đi kết thúc trên bản đồ, nhưng lại mở ra rất lâu trong lòng người đi cùng.', cite: '— Một volunteer của EM' },
        ],
    },
    {
        eyebrow: 'Chương 04',
        title: 'Những hành trình tiêu biểu',
        blocks: [
            { type: 'paragraph', text: 'Mỗi chuyến đi là một chương khác nhau, nhưng đều chung tinh thần kết nối tri thức, niềm vui và sự hiện diện thật lòng.' },
            { type: 'cards', items: [
                { title: 'Bắc Kạn', body: 'Những buổi học và học bổng đầu tiên đặt nền cho câu chuyện của dự án.' },
                { title: 'Lào Cai', body: 'Một mùa Noel ấm hơn với hoạt động, quà tặng và những tiếng cười rất thật.' },
                { title: 'Điện Biên', body: 'Điểm đến tiếp theo để gọi thêm những người đồng hành mới trên hành trình này.' },
            ]},
            { type: 'callout', text: 'Mỗi địa điểm không chỉ là một "điểm đến", mà là một bối cảnh khác nhau để volunteer trưởng thành.' },
        ],
    },
    {
        eyebrow: 'Chương 05',
        title: 'Câu chuyện từ người thật',
        blocks: [
            { type: 'quote', text: 'Mình từng nghĩ mình chỉ đi hỗ trợ một chương trình ngắn. Nhưng sau chuyến đi, điều ở lại lâu nhất là cảm giác được thuộc về một nhóm người đang thật lòng cố gắng làm điều tử tế.', cite: '— Một thành viên volunteer' },
            { type: 'paragraph', text: 'Đó là lý do section này được làm như một cuốn sách: mỗi trang là một lớp cảm xúc, không chỉ là một khối thông tin.' },
            { type: 'paragraph', text: 'Format book phù hợp với volunteer vì nó kể được hành trình có mở đầu, cao trào và một điểm chạm cảm xúc rõ ràng.' },
            { type: 'bullets', items: [
                'Người xem có cảm giác đang khám phá từng chương.',
                'Nội dung dài vẫn giữ được nhịp đọc gọn và đẹp.',
                'Có thể mở rộng thành nhật ký chuyến đi hoặc yearbook về sau.',
            ]},
        ],
    },
    {
        eyebrow: 'Chương cuối',
        title: 'Nếu bạn muốn trở thành một phần của câu chuyện này',
        blocks: [
            { type: 'paragraph', text: 'Trang cuối không phải để kết thúc, mà để mở ra một lựa chọn rất đơn giản: bắt đầu cùng chúng mình.' },
            { type: 'paragraph', text: 'Bạn có thể dừng lại ở cảm hứng, hoặc biến cảm hứng đó thành một hành động thật.' },
            { type: 'quote', text: 'Một chương đẹp luôn cần thêm người viết cùng.', cite: '— Dự Án Cho EM' },
            { type: 'outroAction', label: 'Khám phá thêm về chúng tôi', href: '#gioi-thieu' },
        ],
    },
    {
        eyebrow: THANK_YOU_PAGE.eyebrow,
        title: THANK_YOU_PAGE.title,
        blocks: [
            { type: 'paragraph', text: THANK_YOU_PAGE.paragraphs[0] },
            { type: 'qr', data: THANK_YOU_PAGE.qr },
            { type: 'quote', text: THANK_YOU_PAGE.quote.text, cite: THANK_YOU_PAGE.quote.cite },
        ],
    },
    {
        variant: 'back-cover',
        density: 'hard',
        kicker: 'EM Volunteer Project',
        title: 'Hẹn gặp bạn ở chương tiếp theo',
        lead: 'Mỗi người đồng hành mới sẽ giúp cuốn sách này có thêm những chương đẹp hơn ngoài đời thật.',
        chips: ['Lan tỏa yêu thương', 'Trao tri thức', 'Đi cùng tuổi trẻ'],
    },
];

export class BookExperience {
    constructor() {
        this.pages = [];
        this.mobilePages = [];
        this.probe = null;
        this.pageFlip = null;
        this.isOpen = false;
        this.isInteractive = false;
        this.pendingUpdate = false;
        this.currentIndex = 0;
        this.mobileIndex = 0;
        this.lastDesktopContentH = 0;
        this.resizeTimer = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.handleResize = this.onResize.bind(this);
        this.handleKeydown = this.onKeydown.bind(this);

        this.init();
    }

    getLastNumberLabel(pages) {
        return [...pages].reverse().find((p) => p.numberLabel && p.numberLabel !== 'Bìa')?.numberLabel || '00';
    }

    // ─── Pagination engine ────────────────────────────────────────────────────

    createProbe() {
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;pointer-events:none;overflow:hidden;';
        document.body.appendChild(el);
        return el;
    }

    renderBlock(block, isMobile) {
        switch (block.type) {
            case 'paragraph':
                return `<p class="volunteer-book-page-copy">${block.text}</p>`;
            case 'stats':
                return `<div class="volunteer-book-stat-grid">${block.items.map((s) => `
                    <div class="volunteer-book-stat"><strong>${s.value}</strong><span>${s.label}</span></div>
                `).join('')}</div>`;
            case 'cards':
                return `<div class="volunteer-book-card-list">${block.items.map((c) => `
                    <article class="volunteer-book-mini-card"><h5>${c.title}</h5><p>${c.body}</p></article>
                `).join('')}</div>`;
            case 'bullets':
                return `<ul class="volunteer-book-bullet-list">${block.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
            case 'callout':
                return `<div class="volunteer-book-callout">${block.text}</div>`;
            case 'qr':
                return this.renderQrBlock(block.data, isMobile);
            case 'quote':
                return `<blockquote class="volunteer-book-quote"><p>${block.text}</p><cite>${block.cite}</cite></blockquote>`;
            case 'outroAction':
                return `<div class="volunteer-book-cta-list volunteer-book-cta-list--outro">
                    <a href="${block.href}" class="btn btn-primary volunteer-book-cta-link volunteer-book-cta-link--outro" data-book-href="${block.href}">${block.label}</a>
                </div>`;
            default:
                return '';
        }
    }

    buildDynamicPages(isMobile) {
        const SAFETY_MARGIN = 24; // buffer for measurement imprecision between probe and real page
        const probeW = isMobile ? 380 : 480;
        // Use window-derived height so probe matches the actual rendered page size at current viewport
        const probeH = isMobile
            ? Math.min(window.innerHeight * 0.72, 680)
            : this.estimateViewportDimensions().height;

        this.probe.className = isMobile ? 'volunteer-book-mobile-paper' : 'volunteer-book-paper';
        this.probe.style.width = `${probeW}px`;
        this.probe.style.height = `${probeH}px`;
        this.probe.innerHTML = '';

        const probeBody = document.createElement('div');
        probeBody.className = 'volunteer-book-page-body';
        this.probe.appendChild(probeBody);

        // clientHeight reflects the CSS calc(100% - --page-footer-space) value, minus safety buffer
        const availH = probeBody.clientHeight - SAFETY_MARGIN;

        const result = [];
        let contentPageNum = 0;

        for (const chapter of BOOK_CHAPTERS) {
            if (chapter.variant) {
                result.push({ ...chapter });
                continue;
            }

            const allBlocks = chapter.blocks || [];
            let remaining = [...allBlocks];
            let isFirst = true;

            do {
                probeBody.innerHTML = '';

                if (isFirst) {
                    if (chapter.eyebrow) probeBody.insertAdjacentHTML('beforeend', `<p class="volunteer-book-page-eyebrow">${chapter.eyebrow}</p>`);
                    if (chapter.title) probeBody.insertAdjacentHTML('beforeend', `<h4 class="volunteer-book-page-heading">${chapter.title}</h4>`);
                }

                const fittedBlocks = [];
                let j = 0;

                while (j < remaining.length) {
                    const block = remaining[j];
                    probeBody.insertAdjacentHTML('beforeend', this.renderBlock(block, isMobile));

                    if (probeBody.scrollHeight > availH && fittedBlocks.length > 0) {
                        // Last inserted block caused overflow — remove it and break
                        probeBody.removeChild(probeBody.lastElementChild);
                        break;
                    }

                    fittedBlocks.push(block);
                    j++;
                }

                remaining = remaining.slice(j);
                contentPageNum++;

                result.push({
                    numberLabel: String(contentPageNum).padStart(2, '0'),
                    eyebrow: isFirst ? chapter.eyebrow : undefined,
                    title: isFirst ? chapter.title : undefined,
                    blocks: fittedBlocks,
                });

                isFirst = false;
            } while (remaining.length > 0);
        }

        // Ensure back-cover lands on the left side of the final spread (even index = left page)
        const backCoverIdx = result.findIndex(p => p.variant === 'back-cover');
        if (backCoverIdx !== -1 && backCoverIdx % 2 !== 0) {
            result.splice(backCoverIdx, 0, { variant: 'blank' });
        }

        return result;
    }

    // ─── Init ────────────────────────────────────────────────────────────────

    init() {
        this.probe = this.createProbe();
        this.pages = this.buildDynamicPages(false);
        this.mobilePages = this.buildDynamicPages(true);
        this.renderShell();
        this.cacheElements();
        this.attachEvents();
        this.mountFlipbook();
    }

    renderShell() {
        const container = document.getElementById('volunteerBookContainer');
        if (!container) return;
        const coverChapter = BOOK_CHAPTERS.find((c) => c.variant === 'cover') || BOOK_CHAPTERS[0];

        container.innerHTML = `
            <h2 class="section-title">Sổ Tay Tình Nguyện</h2>
            <p class="section-subtitle">Một quyển sách nhỏ kể lại cách Dự Án Cho EM kết nối người trẻ với những hành trình tử tế.</p>

            <div class="volunteer-book-launchpad">
                <button class="volunteer-book-teaser" id="volunteerBookOpen" type="button" aria-haspopup="dialog" aria-controls="volunteerBookOverlay" aria-label="Mở Volunteer Book">
                    <span class="volunteer-book-teaser-glow" aria-hidden="true"></span>
                    <span class="volunteer-book-teaser-rays" aria-hidden="true"></span>
                    <span class="volunteer-book-teaser-sparkles" aria-hidden="true">
                        ${Array.from({length: 10}, (_, i) => `<span class="volunteer-book-teaser-sparkle" data-i="${i}"></span>`).join('')}
                    </span>
                    <span class="volunteer-book-teaser-stack" aria-hidden="true"></span>
                    <span class="volunteer-book-teaser-book" aria-hidden="true">
                        <span class="volunteer-book-teaser-spine"></span>
                        <span class="volunteer-book-teaser-cover">
                            <span class="volunteer-book-teaser-kicker">${coverChapter.kicker}</span>
                            <span class="volunteer-book-teaser-title">${coverChapter.title}</span>
                            <span class="volunteer-book-teaser-lead">${coverChapter.lead}</span>
                            <span class="volunteer-book-teaser-chip-row">
                                ${coverChapter.chips.map((chip) => `<span class="volunteer-book-teaser-chip">${chip}</span>`).join('')}
                            </span>
                            <span class="volunteer-book-teaser-mark">Dự Án Cho EM</span>
                        </span>
                    </span>
                </button>
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
                                <div class="volunteer-book-reader-viewport" id="volunteerBookViewport">
                                    <div class="volunteer-book-desktop-shell" id="volunteerBookDesktopShell">
                                        <div class="volunteer-book-root" id="volunteerBookRoot">
                                            ${this.pages.map((page, index) => this.renderPage(page, index)).join('')}
                                        </div>
                                    </div>
                                    <div class="volunteer-book-mobile-reader" id="volunteerBookMobileReader"></div>
                                </div>
                            </div>
                        </div>

                        <div class="volunteer-book-footer">
                            <button class="volunteer-book-nav-btn volunteer-book-nav-btn--prev" id="volunteerBookPrev" aria-label="Trang trước">
                                <span aria-hidden="true">←</span>
                            </button>

                            <div class="volunteer-book-progress-wrap">
                                <div class="volunteer-book-progress-head">
                                    <span class="volunteer-book-progress-count" id="volunteerBookProgressText">Bìa / ${this.getLastNumberLabel(this.pages)}</span>
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

    cacheElements() {
        this.container = document.getElementById('volunteerBookContainer');
        this.openBtn = document.getElementById('volunteerBookOpen');
        this.overlay = document.getElementById('volunteerBookOverlay');
        this.closeBtn = document.getElementById('volunteerBookClose');
        this.stage = document.getElementById('volunteerBookStage');
        this.readerViewport = document.getElementById('volunteerBookViewport');
        this.root = document.getElementById('volunteerBookRoot');
        this.mobileReader = document.getElementById('volunteerBookMobileReader');
        this.prevBtn = document.getElementById('volunteerBookPrev');
        this.nextBtn = document.getElementById('volunteerBookNext');
        this.progressText = document.getElementById('volunteerBookProgressText');
        this.progressFill = document.getElementById('volunteerBookProgressFill');
    }

    attachEvents() {
        this.openBtn?.addEventListener('click', () => this.openReader());
        this.closeBtn?.addEventListener('click', () => this.closeReader());
        this.prevBtn?.addEventListener('click', () => this.flipPrev());
        this.nextBtn?.addEventListener('click', () => this.flipNext());

        this.container?.addEventListener('click', (event) => {
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

            if (!this.isOpen || this.pendingUpdate || this.isMobileViewport()) return;
            if (event.target.closest('a, button, .volunteer-book-nav-btn')) return;

            const clickedPaper = event.target.closest('.volunteer-book-paper');
            if (!clickedPaper || !this.root) return;

            const rect = this.root.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const centerX = rect.width / 2;

            if (clickX >= centerX) this.flipNext();
            else this.flipPrev();
        });

        this.stage?.addEventListener('mouseenter', () => { this.isInteractive = true; });
        this.stage?.addEventListener('mouseleave', () => { this.isInteractive = false; });
        this.stage?.addEventListener('focusin', () => { this.isInteractive = true; });
        this.stage?.addEventListener('focusout', () => { this.isInteractive = false; });

        // Mobile: swipe left/right + tap left/right half to navigate
        let touchStartX = 0;
        let touchStartY = 0;
        this.mobileReader?.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        this.mobileReader?.addEventListener('touchend', (e) => {
            if (!this.isMobileViewport()) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;

            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                // Swipe gesture
                if (dx < 0) this.flipNext();
                else this.flipPrev();
            } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
                // Tap — use left/right half
                const rect = this.mobileReader.getBoundingClientRect();
                const tapX = e.changedTouches[0].clientX - rect.left;
                if (tapX > rect.width / 2) this.flipNext();
                else this.flipPrev();
            }
        }, { passive: true });

        document.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('resize', this.handleResize, { passive: true });
    }

    mountFlipbook() {
        if (!this.root) return;

        if (!window.St?.PageFlip) {
            this.root.classList.add('is-fallback');
            this.renderMobileReader();
            this.syncStatus();
            return;
        }

        this.updateReaderViewport();

        this.pageFlip = new window.St.PageFlip(this.root, {
            width: 480,
            height: 660,
            size: 'stretch',
            minWidth: 260,
            maxWidth: 520,
            minHeight: 420,
            maxHeight: 720,
            drawShadow: true,
            maxShadowOpacity: 0.16,
            flippingTime: this.prefersReducedMotion.matches ? 0 : 720,
            usePortrait: true,
            autoSize: true,
            showCover: false,
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

        this.pageFlip.loadFromHTML(this.root.querySelectorAll('.volunteer-book-leaf'));
        this.renderMobileReader();
        this.syncStatus(0, this.pageFlip.getOrientation());
    }

    isMobileViewport() {
        return window.innerWidth <= 768;
    }

    getActivePages() {
        return this.isMobileViewport() ? this.mobilePages : this.pages;
    }

    getActiveIndex() {
        return this.isMobileViewport() ? this.mobileIndex : this.currentIndex;
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
            if (event.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        }

        if (event.key === 'ArrowRight') { event.preventDefault(); this.flipNext(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); this.flipPrev(); }
    }

    // ─── Viewport sizing ─────────────────────────────────────────────────────

    estimateViewportDimensions() {
        // Calculates stage-based viewport size using window dims (usable before overlay is visible)
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // overlay padding 16px each side → shell width = min(1240, vw - 32)
        // shell padding h: 28+20=48px, stage padding: 24px each side
        // footer row approx 90px, gap 16px
        const shellW = Math.min(1240, vw - 32);
        const stageW = shellW - 48;
        const stageH = vh - 32 - 48 - 90 - 16 - 48; // dvh-based estimate

        const VERTICAL_INSET = 32;
        const desktopRatio = 960 / 660;
        const maxW = Math.min(stageW, 1120);
        const maxH = Math.min(Math.max(stageH, 360) - VERTICAL_INSET, 720);

        let width = maxW;
        let height = width / desktopRatio;
        if (height > maxH) {
            height = maxH;
            width = height * desktopRatio;
        }

        return { width: Math.floor(width), height: Math.floor(height) };
    }

    updateReaderViewport() {
        if (!this.stage || !this.readerViewport) return;

        if (this.isMobileViewport()) {
            this.readerViewport.style.width = '';
            this.readerViewport.style.height = '';
            return;
        }

        const stageWidth = Math.max(0, this.stage.clientWidth);
        const stageHeight = Math.max(0, this.stage.clientHeight);

        if (!stageWidth || !stageHeight) {
            // Overlay not visible yet — use window-based estimate
            const dim = this.estimateViewportDimensions();
            this.readerViewport.style.width = `${dim.width}px`;
            this.readerViewport.style.height = `${dim.height}px`;
            return;
        }

        const VERTICAL_INSET = 32; // leaves 16px ear top + bottom inside the bookcase
        const desktopRatio = 960 / 660;
        const maxW = Math.min(stageWidth, 1120);
        const maxH = Math.min(stageHeight - VERTICAL_INSET, 720);

        let width = maxW;
        let height = width / desktopRatio;
        if (height > maxH) {
            height = maxH;
            width = height * desktopRatio;
        }

        this.readerViewport.style.width = `${Math.floor(width)}px`;
        this.readerViewport.style.height = `${Math.floor(height)}px`;
    }

    // ─── Open / close ─────────────────────────────────────────────────────────

    openReader() {
        if (this.isOpen || !this.overlay) return;

        // Pin portal origin to the book's center in the viewport
        const rect = this.openBtn.getBoundingClientRect();
        const cx = ((rect.left + rect.width  / 2) / window.innerWidth  * 100).toFixed(1);
        const cy = ((rect.top  + rect.height / 2) / window.innerHeight * 100).toFixed(1);
        this.overlay.style.setProperty('--book-cx', `${cx}%`);
        this.overlay.style.setProperty('--book-cy', `${cy}%`);

        // Pre-size viewport before overlay becomes visible
        if (!this.isMobileViewport()) {
            const dim = this.estimateViewportDimensions();
            if (this.readerViewport) {
                this.readerViewport.style.width  = `${dim.width}px`;
                this.readerViewport.style.height = `${dim.height}px`;
            }
        }

        this.isOpen = true;
        this.pendingUpdate = true;

        const doOpen = () => {
            this.overlay.classList.add('is-open');
            this.overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('has-volunteer-book-open');
            window._chatWidget?.closeChat?.();
            window._lockScroll?.();

            requestAnimationFrame(() => {
                this.isInteractive = true;
                this.updateReaderViewport();
                this.clampIndexes();
                this.renderMobileReader();
                this.syncStatus();
                this.stage?.focus();
                if (typeof this.pageFlip?.update === 'function') this.pageFlip.update();
                this.pendingUpdate = false;
            });
        };

        if (this.isMobileViewport()) {
            // Mobile: no pre-animation, open instantly
            doOpen();
        } else {
            // Desktop: book burst → portal expand
            this.openBtn.classList.add('is-opening');
            setTimeout(() => {
                this.openBtn.classList.remove('is-opening');
                doOpen();
            }, 280);
        }
    }

    closeReader({ restoreFocus = true } = {}) {
        if (!this.isOpen || !this.overlay) return;

        this.isOpen = false;
        this.isInteractive = false;
        this.overlay.classList.remove('is-open');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('has-volunteer-book-open');
        window._unlockScroll?.();

        if (restoreFocus) this.openBtn?.focus();
    }

    clampIndexes() {
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.pages.length - 1));
        this.mobileIndex = Math.max(0, Math.min(this.mobileIndex, this.mobilePages.length - 1));
    }

    // ─── Navigation ──────────────────────────────────────────────────────────

    flipPrev() {
        if (this.isMobileViewport()) {
            if (this.mobileIndex <= 0) return;
            this.mobileIndex -= 1;
            this.renderMobileReader('prev');
            this.syncStatus();
            return;
        }
        if (!this.pageFlip || this.pageFlip.getCurrentPageIndex() <= 0) return;
        this.pageFlip.flipPrev('top');
    }

    flipNext() {
        if (this.isMobileViewport()) {
            if (this.mobileIndex >= this.mobilePages.length - 1) return;
            this.mobileIndex += 1;
            this.renderMobileReader('next');
            this.syncStatus();
            return;
        }
        if (!this.pageFlip || this.pageFlip.getCurrentPageIndex() >= this.pages.length - 1) return;
        this.pageFlip.flipNext('top');
    }

    syncStatus(index = null, orientation = null) {
        const pages = this.getActivePages();
        const activeIndex = index ?? this.getActiveIndex();
        const currentPage = pages[activeIndex] || pages[0];
        const currentOrientation = orientation ?? (this.isMobileViewport() ? 'portrait' : this.pageFlip?.getOrientation?.()) ?? 'portrait';
        const lastNumberedPage = this.getLastNumberLabel(pages);

        if (this.progressText) {
            this.progressText.textContent = `${currentPage.numberLabel || 'Bìa'} / ${lastNumberedPage}`;
        }

        if (this.progressFill) {
            const progress = (activeIndex / Math.max(1, pages.length - 1)) * 100;
            this.progressFill.style.width = `${progress}%`;
        }

        if (this.prevBtn) this.prevBtn.disabled = activeIndex <= 0;
        if (this.nextBtn) this.nextBtn.disabled = activeIndex >= pages.length - 1;

        if (!this.isMobileViewport() && currentOrientation === 'portrait') {
            this.stage?.setAttribute('data-book-mode', 'portrait');
        } else {
            this.stage?.setAttribute('data-book-mode', 'landscape');
        }
    }

    // ─── Resize ──────────────────────────────────────────────────────────────

    onResize() {
        this.clampIndexes();

        if (this.isMobileViewport()) {
            this.updateReaderViewport();
            this.renderMobileReader();
            this.syncStatus();
            return;
        }

        this.updateReaderViewport();

        if (this.pageFlip) {
            if (this.pageFlip.getCurrentPageIndex() !== this.currentIndex) {
                this.pageFlip.turnToPage(this.currentIndex);
            }
            this.pageFlip.update();
        }

        this.syncStatus(this.pageFlip?.getCurrentPageIndex() ?? this.currentIndex, this.pageFlip?.getOrientation?.() ?? 'landscape');

        // Re-paginate if the available content height changed significantly
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.rebuildIfNeeded(), 400);
    }

    rebuildIfNeeded() {
        // Measure current desktop content height via probe
        this.probe.className = 'volunteer-book-paper';
        this.probe.style.width = '480px';
        this.probe.style.height = '660px';
        this.probe.innerHTML = '';
        const testBody = document.createElement('div');
        testBody.className = 'volunteer-book-page-body';
        this.probe.appendChild(testBody);
        const currentContentH = testBody.clientHeight;

        if (Math.abs(currentContentH - this.lastDesktopContentH) < 40) return;
        this.lastDesktopContentH = currentContentH;

        const savedIndex = this.currentIndex;

        this.pages = this.buildDynamicPages(false);
        this.mobilePages = this.buildDynamicPages(true);

        if (this.root) {
            this.root.innerHTML = this.pages.map((page, i) => this.renderPage(page, i)).join('');
        }

        if (this.pageFlip) {
            this.pageFlip.destroy();
            this.pageFlip = null;
        }

        this.mountFlipbook();
        this.currentIndex = Math.min(savedIndex, this.pages.length - 1);

        if (this.pageFlip) {
            this.pageFlip.turnToPage(this.currentIndex);
        }

        if (this.progressText) {
            this.progressText.textContent = `Bìa / ${this.getLastNumberLabel(this.pages)}`;
        }

        this.syncStatus(this.currentIndex, this.pageFlip?.getOrientation?.() ?? 'landscape');
    }

    // ─── Rendering ───────────────────────────────────────────────────────────

    renderPage(page, index) {
        const densityAttr = page.density ? ` data-density="${page.density}"` : '';
        const variantClass = page.variant ? ` volunteer-book-leaf--${page.variant}` : '';

        return `
            <article class="volunteer-book-leaf${variantClass}"${densityAttr} data-page-index="${index}">
                <div class="volunteer-book-paper">
                    ${this.renderPageBody(page, false)}
                    ${page.numberLabel ? `<span class="volunteer-book-page-number">${page.numberLabel}</span>` : ''}
                </div>
            </article>
        `;
    }

    renderMobileReader(direction = 'none') {
        if (!this.mobileReader) return;

        const page = this.mobilePages[this.mobileIndex] || this.mobilePages[0];
        const variantClass = page.variant ? ` volunteer-book-mobile-page--${page.variant}` : '';

        const buildHTML = (extraClass = '') => `
            <article class="volunteer-book-mobile-page${variantClass}${extraClass}">
                <div class="volunteer-book-mobile-paper">
                    ${this.renderPageBody(page, true)}
                    ${page.numberLabel ? `<span class="volunteer-book-mobile-page-number">${page.numberLabel}</span>` : ''}
                </div>
            </article>`;

        if (direction === 'none' || this.prefersReducedMotion.matches) {
            this.mobileReader.innerHTML = buildHTML();
            return;
        }

        const foldOutClass  = direction === 'next' ? 'mobile-flip-fold-out'     : 'mobile-flip-fold-out-rev';
        const unfoldInClass = direction === 'next' ? 'mobile-flip-unfold-in'    : 'mobile-flip-unfold-in-rev';
        const FOLD_MS = 170; // slightly under CSS 180ms — swap at ~90° edge

        const current = this.mobileReader.firstElementChild;
        if (current) {
            current.style.willChange = 'transform, opacity';
            current.classList.add(foldOutClass);
        }

        setTimeout(() => {
            // Insert new page without animation class first, force a paint, then animate
            this.mobileReader.innerHTML = buildHTML();
            const incoming = this.mobileReader.firstElementChild;
            if (incoming) {
                incoming.style.willChange = 'transform, opacity';
                incoming.getBoundingClientRect(); // force layout so animation starts clean
                incoming.classList.add(unfoldInClass);
            }
        }, FOLD_MS);
    }

    renderPageBody(page, isMobile) {
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
                    <div class="volunteer-book-cover-seal">See you on the next journey</div>
                </div>
            `;
        }

        if (page.variant === 'blank') {
            return `
                <div class="volunteer-book-page-body volunteer-book-page-body--blank" aria-hidden="true">
                    <span class="volunteer-book-page-blank-mark">.</span>
                </div>
            `;
        }

        return `
            <div class="volunteer-book-page-body">
                ${page.eyebrow ? `<p class="volunteer-book-page-eyebrow">${page.eyebrow}</p>` : ''}
                ${page.title ? `<h4 class="volunteer-book-page-heading">${page.title}</h4>` : ''}
                ${(page.blocks || []).map((block) => this.renderBlock(block, isMobile)).join('')}
            </div>
        `;
    }

    renderQrBlock(qr, isMobile) {
        return `
            <div class="volunteer-book-qr-card${isMobile ? ' is-mobile' : ''}">
                <img class="volunteer-book-qr-image" src="${qr.src}" alt="${qr.alt}">
                <div class="volunteer-book-qr-copy">
                    <strong>Quét mã để đồng hành</strong>
                    <p><span>STK:</span> ${qr.account}</p>
                    <p><span>Ngân hàng:</span> ${qr.bank}</p>
                    <p><span>Chủ TK:</span> ${qr.owner}</p>
                    <p><span>Nội dung:</span> ${qr.note}</p>
                </div>
            </div>
        `;
    }
}
