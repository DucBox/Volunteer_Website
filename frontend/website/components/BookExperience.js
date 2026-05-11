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
        chips: ['Đăng ký tình nguyện', 'Quyên góp', 'Theo dõi hành trình'],
        ctaList: [
            { label: 'Đăng Ký Tình Nguyện', href: '#tinh-nguyen', style: 'primary' },
            { label: 'Quyên Góp Ngay', href: '#quyen-gop', style: 'secondary' },
            { label: 'Xem Hành Trình', href: '#hanh-trinh', style: 'ghost' },
        ],
        quote: {
            text: 'Một chương đẹp luôn cần thêm người viết cùng.',
            cite: '— Dự Án Cho EM',
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
    },
];

export class BookExperience {
    constructor() {
        this.pages = BOOK_PAGES;
        this.pageFlip = null;
        this.isInteractive = false;
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

        container.innerHTML = `
            <div class="volunteer-book-intro">
                <p class="volunteer-book-kicker">Section mới</p>
                <h2 class="section-title volunteer-book-title">Volunteer Book</h2>
                <p class="section-subtitle volunteer-book-subtitle">
                    <strong>Một quyển sách giới thiệu hành trình volunteer theo đúng tinh thần “đọc từng chương”: mượt, có mục lục rõ ràng và giống sách hơn thay vì chỉ là một hiệu ứng lật card.</strong>
                </p>
            </div>

            <div class="volunteer-book-shell">
                <div class="volunteer-book-meta">
                    <div>
                        <span class="volunteer-book-meta-label">Trải nghiệm đọc</span>
                        <strong class="volunteer-book-meta-value">2 trang như sách thật trên desktop, 1 trang tối ưu riêng cho mobile</strong>
                    </div>
                    <div>
                        <span class="volunteer-book-meta-label">Cách khám phá</span>
                        <strong class="volunteer-book-meta-value">Mở mục lục, lật từng chương, vuốt nhẹ hoặc dùng nút điều hướng</strong>
                    </div>
                    <div>
                        <span class="volunteer-book-meta-label">Đang đọc</span>
                        <strong class="volunteer-book-meta-value" id="volunteerBookCurrentLabel">Bìa sách</strong>
                    </div>
                </div>

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
                    <button class="volunteer-book-nav-btn" id="volunteerBookPrev" aria-label="Trang trước">
                        <span aria-hidden="true">←</span>
                        <span>Prev</span>
                    </button>

                    <div class="volunteer-book-progress-wrap">
                        <div class="volunteer-book-progress-head">
                            <span class="volunteer-book-progress-label" id="volunteerBookModeLabel">2 trang</span>
                            <span class="volunteer-book-progress-count" id="volunteerBookProgressText">Bìa / 08</span>
                        </div>
                        <div class="volunteer-book-progress-track" aria-hidden="true">
                            <span class="volunteer-book-progress-fill" id="volunteerBookProgressFill"></span>
                        </div>
                    </div>

                    <button class="volunteer-book-nav-btn" id="volunteerBookNext" aria-label="Trang tiếp theo">
                        <span>Next</span>
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        `;
    }

    cacheElements() {
        this.container = document.getElementById('volunteerBookContainer');
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
    }

    attachEvents() {
        this.prevBtn?.addEventListener('click', () => this.flipPrev());
        this.nextBtn?.addEventListener('click', () => this.flipNext());

        this.container?.addEventListener('click', (event) => {
            const gotoTrigger = event.target.closest('[data-book-target]');
            if (gotoTrigger) {
                event.preventDefault();
                this.flipTo(Number(gotoTrigger.dataset.bookTarget));
                return;
            }

            const link = event.target.closest('[data-book-href]');
            if (link) {
                event.preventDefault();
                const target = document.querySelector(link.dataset.bookHref);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }

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
        if (!this.isInteractive || !this.pageFlip) return;

        if (event.target instanceof HTMLElement) {
            const tag = event.target.tagName;
            if (event.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
                return;
            }
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.flipNext();
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.flipPrev();
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
                            <button class="volunteer-book-toc-item" type="button" data-book-target="${item.target}">
                                <span>${String(itemIndex + 1).padStart(2, '0')}</span>
                                <strong>${item.label}</strong>
                            </button>
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
                ${page.ctaList?.length ? `
                    <div class="volunteer-book-cta-list">
                        ${page.ctaList.map((item) => `
                            <a href="${item.href}" class="btn ${this.getCtaClass(item.style)} volunteer-book-cta-link" data-book-href="${item.href}">
                                ${item.label}
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    getCtaClass(style) {
        if (style === 'secondary') return 'btn-secondary';
        if (style === 'ghost') return 'btn-outline';
        return 'btn-primary';
    }
}
