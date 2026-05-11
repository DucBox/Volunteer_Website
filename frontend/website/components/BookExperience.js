const QR_INFO = {
    src: 'assets/images/qr.jpg',
    alt: 'QR quyên góp cho Dự Án Cho EM',
    bank: 'Techcombank',
    account: '9999 5521 44',
    owner: 'DAO VIET THANH',
    note: 'Tên + Ủng hộ Dự Án Cho EM',
};

const DESKTOP_BOOK_PAGES = [
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
            'Mỗi phần là một chương mới, để người xem có cảm giác đang đi qua một hành trình thật thay vì chỉ lướt một landing page thông thường.',
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
        title: 'Cuốn sách này có gì?',
        bullets: [
            'Volunteer ở Dự Án Cho EM là ai.',
            'Bạn sẽ làm gì khi tham gia.',
            'Bạn sẽ nhận lại điều gì.',
            'Những hành trình tiêu biểu đã đi qua.',
            'Câu chuyện thật từ người đã đồng hành.',
            'Một lời cảm ơn cuối sách kèm mã QR để kết nối tiếp.',
        ],
        callout: 'Bạn không cần bấm vào mục lục. Chỉ cần lật từng trang để đi hết câu chuyện.',
    },
    {
        numberLabel: '03',
        metaTitle: 'Volunteer là gì?',
        eyebrow: 'Chương 01',
        title: 'Volunteer ở Dự Án Cho EM là ai?',
        paragraphs: [
            'Volunteer không đứng ngoài câu chuyện. Mỗi bạn đều là người cùng chuẩn bị, cùng tổ chức và cùng hiện diện trong trải nghiệm học tập của các em nhỏ.',
            'Từ học liệu, hậu cần, vận hành đến việc trực tiếp đồng hành ở điểm trường, mỗi vai trò đều là một mắt xích quan trọng.',
        ],
        stats: [
            { value: '20+', label: 'Tình nguyện viên' },
            { value: '2+', label: 'Hành trình đã đi' },
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
            'Hành trình bắt đầu từ trước chuyến đi, kéo dài trong chuyến đi và còn tiếp tục sau đó bằng việc tổng kết, lưu trữ và giữ nhịp cộng đồng volunteer.',
        ],
        cards: [
            { title: 'Trước chuyến đi', body: 'Soạn học liệu, chuẩn bị trò chơi, hậu cần, truyền thông và gây quỹ.' },
            { title: 'Trong chuyến đi', body: 'Hỗ trợ lớp học, dẫn hoạt động, kết nối với các em và ghi lại khoảnh khắc.' },
            { title: 'Sau chuyến đi', body: 'Tổng kết, viết recap, lưu trữ tài liệu và giữ nhịp cho cộng đồng volunteer.' },
        ],
        bullets: [
            'Hỗ trợ lớp học và hoạt náo.',
            'Điều phối timeline và hậu cần.',
            'Chụp ảnh, quay video, viết recap.',
            'Quản lý quà tặng, danh sách và vận hành.',
        ],
    },
    {
        numberLabel: '05',
        metaTitle: 'Bạn sẽ nhận lại gì?',
        layout: 'compact',
        eyebrow: 'Chương 03',
        title: 'Bạn sẽ nhận lại gì?',
        paragraphs: [
            'Đây không chỉ là hành trình cho đi. Nó cũng là cách volunteer lớn lên thật rõ rệt qua từng lần tham gia.',
            'Kỹ năng, góc nhìn, tình bạn và cảm giác tuổi trẻ của mình được dùng đúng chỗ là những điều đọng lại lâu nhất.',
        ],
        bullets: [
            'Tự tin hơn khi làm việc nhóm và điều phối hoạt động.',
            'Hiểu hơn về giáo dục, cộng đồng và trách nhiệm cá nhân.',
            'Có thêm những người bạn cùng hệ giá trị.',
            'Mang về cảm giác mình đã làm một điều có ý nghĩa.',
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
        metaTitle: 'Câu chuyện thật',
        layout: 'compact',
        eyebrow: 'Chương 05',
        title: 'Câu chuyện từ người thật',
        quote: {
            text: 'Mình từng nghĩ mình chỉ đi hỗ trợ một chương trình ngắn. Nhưng sau chuyến đi, điều ở lại lâu nhất là cảm giác được thuộc về một nhóm người đang thật lòng cố gắng làm điều tử tế.',
            cite: '— Một thành viên volunteer',
        },
        paragraphs: [
            'Đó là lý do section này được làm như một cuốn sách: mỗi trang là một lớp cảm xúc, không chỉ là một khối thông tin.',
            'Format book phù hợp với volunteer vì nó kể được hành trình có mở đầu, cao trào và một điểm chạm cảm xúc rõ ràng.',
        ],
        bullets: [
            'Người xem có cảm giác đang khám phá từng chương.',
            'Nội dung dài vẫn giữ được nhịp đọc gọn và đẹp.',
            'Có thể mở rộng thành nhật ký chuyến đi hoặc yearbook về sau.',
        ],
    },
    {
        numberLabel: '08',
        metaTitle: 'Đồng hành cùng chúng mình',
        layout: 'compact',
        eyebrow: 'Chương cuối',
        title: 'Nếu bạn muốn trở thành một phần của câu chuyện này',
        paragraphs: [
            'Trang cuối không phải để kết thúc, mà để mở ra một lựa chọn rất đơn giản: bắt đầu cùng chúng mình.',
            'Bạn có thể dừng lại ở cảm hứng, hoặc biến cảm hứng đó thành một hành động thật.',
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
        numberLabel: '09',
        metaTitle: 'Thư cảm ơn',
        layout: 'compact',
        variant: 'letter',
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
        title: 'Hẹn gặp bạn ở chương tiếp theo',
        lead: 'Mỗi người đồng hành mới sẽ giúp cuốn sách này có thêm những chương đẹp hơn ngoài đời thật.',
        chips: ['Lan tỏa yêu thương', 'Trao tri thức', 'Đi cùng tuổi trẻ'],
    },
];

const MOBILE_BOOK_PAGES = [
    {
        numberLabel: 'Bìa',
        metaTitle: 'Bìa sách',
        variant: 'cover',
        kicker: 'EM Volunteer Journal',
        title: 'Sổ Tay Tình Nguyện',
        lead: 'Một quyển sách nhỏ kể lại cách Dự Án Cho EM kết nối người trẻ với những hành trình tử tế.',
        chips: ['Volunteer', 'Tri thức', 'Cộng đồng'],
    },
    {
        numberLabel: '01',
        metaTitle: 'Mở đầu',
        eyebrow: 'Mở đầu',
        title: 'Từ ý tưởng đến chuyến đi thật',
        paragraphs: [
            'Cuốn sách này gói lại những điều quan trọng nhất: volunteer là ai, sẽ làm gì, nhận lại gì và vì sao hành trình ấy đáng để bắt đầu ngay bây giờ.',
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
        title: 'Cuốn sách này có gì?',
        bullets: [
            'Volunteer là ai.',
            'Bạn sẽ làm gì.',
            'Bạn nhận lại gì.',
            'Những hành trình tiêu biểu.',
            'Câu chuyện từ người thật.',
            'Thư cảm ơn + mã QR.',
        ],
    },
    {
        numberLabel: '03',
        metaTitle: 'Volunteer là gì?',
        eyebrow: 'Chương 01',
        title: 'Volunteer ở Dự Án Cho EM là ai?',
        paragraphs: [
            'Volunteer không đứng ngoài câu chuyện. Mỗi bạn đều là người cùng chuẩn bị, cùng tổ chức và cùng hiện diện trong trải nghiệm học tập của các em nhỏ.',
        ],
        stats: [
            { value: '20+', label: 'Tình nguyện viên' },
            { value: '2+', label: 'Hành trình đã đi' },
        ],
    },
    {
        numberLabel: '04',
        metaTitle: 'Volunteer là gì?',
        eyebrow: 'Chương 01',
        title: 'Vai trò trong hành trình',
        paragraphs: [
            'Từ học liệu, hậu cần, vận hành đến việc trực tiếp đồng hành ở điểm trường, mỗi vai trò đều là một mắt xích quan trọng.',
        ],
        quote: {
            text: 'Volunteer là người cùng viết nên câu chuyện ấy.',
            cite: '— Tinh thần dự án',
        },
    },
    {
        numberLabel: '05',
        metaTitle: 'Bạn sẽ làm gì?',
        eyebrow: 'Chương 02',
        title: 'Bạn sẽ làm gì?',
        cards: [
            { title: 'Trước chuyến đi', body: 'Soạn học liệu, chuẩn bị trò chơi, hậu cần và truyền thông.' },
            { title: 'Trong chuyến đi', body: 'Hỗ trợ lớp học, dẫn hoạt động và kết nối với các em.' },
        ],
    },
    {
        numberLabel: '06',
        metaTitle: 'Bạn sẽ làm gì?',
        eyebrow: 'Chương 02',
        title: 'Hành trình còn tiếp tục sau đó',
        cards: [
            { title: 'Sau chuyến đi', body: 'Tổng kết, viết recap, lưu trữ tài liệu và giữ nhịp cộng đồng volunteer.' },
        ],
        bullets: [
            'Hỗ trợ lớp học và hoạt náo.',
            'Điều phối timeline và hậu cần.',
            'Chụp ảnh, quay video, viết recap.',
            'Quản lý quà tặng và vận hành.',
        ],
    },
    {
        numberLabel: '07',
        metaTitle: 'Bạn sẽ nhận lại gì?',
        eyebrow: 'Chương 03',
        title: 'Bạn sẽ nhận lại gì?',
        paragraphs: [
            'Đây không chỉ là hành trình cho đi. Nó cũng là cách volunteer lớn lên thật rõ rệt qua từng lần tham gia.',
        ],
        bullets: [
            'Tự tin hơn khi làm việc nhóm.',
            'Hiểu hơn về giáo dục và cộng đồng.',
            'Có thêm bạn bè cùng hệ giá trị.',
        ],
    },
    {
        numberLabel: '08',
        metaTitle: 'Bạn sẽ nhận lại gì?',
        eyebrow: 'Chương 03',
        title: 'Điều đọng lại lâu nhất',
        paragraphs: [
            'Kỹ năng, góc nhìn, tình bạn và cảm giác tuổi trẻ của mình được dùng đúng chỗ là những điều đọng lại lâu nhất.',
        ],
        quote: {
            text: 'Có chuyến đi kết thúc trên bản đồ, nhưng lại mở ra rất lâu trong lòng người đi cùng.',
            cite: '— Một volunteer của EM',
        },
    },
    {
        numberLabel: '09',
        metaTitle: 'Hành trình tiêu biểu',
        eyebrow: 'Chương 04',
        title: 'Những hành trình tiêu biểu',
        cards: [
            { title: 'Bắc Kạn', body: 'Những buổi học và học bổng đầu tiên đặt nền cho câu chuyện của dự án.' },
            { title: 'Lào Cai', body: 'Một mùa Noel ấm hơn với hoạt động, quà tặng và tiếng cười rất thật.' },
            { title: 'Điện Biên', body: 'Điểm đến tiếp theo để gọi thêm người đồng hành mới.' },
        ],
    },
    {
        numberLabel: '10',
        metaTitle: 'Câu chuyện thật',
        eyebrow: 'Chương 05',
        title: 'Câu chuyện từ người thật',
        quote: {
            text: 'Điều ở lại lâu nhất là cảm giác được thuộc về một nhóm người đang thật lòng làm điều tử tế.',
            cite: '— Một thành viên volunteer',
        },
        paragraphs: [
            'Đó là lý do section này được làm như một cuốn sách: mỗi trang là một lớp cảm xúc, không chỉ là một khối thông tin.',
        ],
    },
    {
        numberLabel: '11',
        metaTitle: 'Đồng hành cùng chúng mình',
        eyebrow: 'Chương cuối',
        title: 'Nếu bạn muốn trở thành một phần của câu chuyện này',
        paragraphs: [
            'Bạn có thể dừng lại ở cảm hứng, hoặc biến cảm hứng đó thành một hành động thật cùng chúng mình.',
        ],
        outroAction: {
            label: 'Khám phá thêm về chúng tôi',
            href: '#gioi-thieu',
        },
    },
    {
        numberLabel: '12',
        metaTitle: 'Thư cảm ơn',
        variant: 'letter',
        eyebrow: 'Thư cảm ơn',
        title: 'Cảm ơn bạn đã lật tới trang cuối',
        paragraphs: [
            'Nếu bạn muốn tiếp tục đồng hành cùng Dự Án Cho EM, bạn có thể quét mã QR này để ủng hộ hoặc kết nối thêm với chúng mình.',
        ],
        qr: QR_INFO,
        outroAction: {
            label: 'Khám phá thêm về chúng tôi',
            href: '#gioi-thieu',
        },
    },
    {
        metaTitle: 'Bìa sau',
        variant: 'back-cover',
        kicker: 'EM Volunteer Project',
        title: 'Hẹn gặp bạn ở chương tiếp theo',
        lead: 'Mỗi người đồng hành mới sẽ giúp cuốn sách này có thêm những chương đẹp hơn ngoài đời thật.',
        chips: ['Lan tỏa yêu thương', 'Trao tri thức'],
    },
];

export class BookExperience {
    constructor() {
        this.pages = DESKTOP_BOOK_PAGES;
        this.mobilePages = MOBILE_BOOK_PAGES;
        this.pageFlip = null;
        this.isOpen = false;
        this.isInteractive = false;
        this.currentIndex = 0;
        this.mobileIndex = 0;
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
                                    <span class="volunteer-book-progress-count" id="volunteerBookProgressText">Bìa / 09</span>
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

            if (!this.isOpen || this.isMobileViewport()) return;
            if (event.target.closest('a, button, .volunteer-book-nav-btn')) return;

            const clickedPaper = event.target.closest('.volunteer-book-paper');
            if (!clickedPaper || !this.root) return;

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
            this.syncStatus();
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
            maxShadowOpacity: 0.16,
            flippingTime: this.prefersReducedMotion.matches ? 0 : 720,
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

        this.pageFlip.loadFromHTML(this.root.querySelectorAll('.volunteer-book-leaf'));
        this.renderMobileReader(false);
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

    fitPages() {
        if (!this.root) return;

        this.root.querySelectorAll('.volunteer-book-paper').forEach((paper) => {
            const content = paper.querySelector('.volunteer-book-page-body, .volunteer-book-cover');
            if (!content) return;

            paper.style.setProperty('--page-scale', '1');
            paper.classList.remove('is-scaled');

            const availableHeight = Math.max(0, paper.clientHeight - 58);
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
        this.overlay.classList.add('is-open');
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('has-volunteer-book-open');
        window._chatWidget?.closeChat?.();
        window._lockScroll?.();

        requestAnimationFrame(() => {
            this.isInteractive = true;
            if (typeof this.pageFlip?.update === 'function') {
                this.pageFlip.update();
            }
            this.clampIndexes();
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
        window._unlockScroll?.();

        if (restoreFocus) {
            this.openBtn?.focus();
        }
    }

    clampIndexes() {
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.pages.length - 1));
        this.mobileIndex = Math.max(0, Math.min(this.mobileIndex, this.mobilePages.length - 1));
    }

    flipPrev() {
        if (this.isMobileViewport()) {
            if (this.mobileIndex <= 0) return;
            this.mobileIndex -= 1;
            this.renderMobileReader(false);
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
            this.renderMobileReader(false);
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
        const lastNumberedPage = [...pages].reverse().find((page) => page.numberLabel && page.numberLabel !== 'Bìa')?.numberLabel || '00';

        if (this.progressText) {
            const currentLabel = currentPage.numberLabel || 'Bìa';
            this.progressText.textContent = `${currentLabel} / ${lastNumberedPage}`;
        }

        if (this.progressFill) {
            const progress = (activeIndex / Math.max(1, pages.length - 1)) * 100;
            this.progressFill.style.width = `${progress}%`;
        }

        if (this.prevBtn) {
            this.prevBtn.disabled = activeIndex <= 0;
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = activeIndex >= pages.length - 1;
        }

        if (!this.isMobileViewport() && currentOrientation === 'portrait') {
            this.stage?.setAttribute('data-book-mode', 'portrait');
        } else {
            this.stage?.setAttribute('data-book-mode', 'landscape');
        }
    }

    onResize() {
        this.clampIndexes();

        if (this.isMobileViewport()) {
            this.renderMobileReader(false);
            this.syncStatus();
            return;
        }

        if (this.pageFlip) {
            if (this.pageFlip.getCurrentPageIndex() !== this.currentIndex) {
                this.pageFlip.turnToPage(this.currentIndex);
            }
            this.pageFlip.update();
        }

        this.fitPages();
        this.syncStatus(this.pageFlip?.getCurrentPageIndex() ?? this.currentIndex, this.pageFlip?.getOrientation?.() ?? 'landscape');
    }

    renderPage(page, index) {
        const densityAttr = page.density ? ` data-density="${page.density}"` : '';
        const variantClass = page.variant ? ` volunteer-book-leaf--${page.variant}` : '';
        const layoutClass = page.layout ? ` volunteer-book-leaf--${page.layout}` : '';

        return `
            <article class="volunteer-book-leaf${variantClass}${layoutClass}"${densityAttr} data-page-index="${index}">
                <div class="volunteer-book-paper">
                    ${this.renderPageBody(page, false)}
                    ${page.numberLabel ? `<span class="volunteer-book-page-number">${page.numberLabel}</span>` : ''}
                </div>
            </article>
        `;
    }

    renderMobileReader() {
        if (!this.mobileReader) return;

        const page = this.mobilePages[this.mobileIndex] || this.mobilePages[0];
        const variantClass = page.variant ? ` volunteer-book-mobile-page--${page.variant}` : '';
        const layoutClass = page.layout ? ` volunteer-book-mobile-page--${page.layout}` : '';

        this.mobileReader.innerHTML = `
            <article class="volunteer-book-mobile-page${variantClass}${layoutClass}">
                <div class="volunteer-book-mobile-paper">
                    ${this.renderPageBody(page, true)}
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

        const availableHeight = Math.max(0, paper.clientHeight - 56);
        const naturalHeight = content.scrollHeight;
        if (availableHeight === 0 || naturalHeight <= availableHeight) return;

        const scale = Math.max(0.84, Math.min(1, availableHeight / naturalHeight));
        paper.style.setProperty('--mobile-page-scale', scale.toFixed(3));
        paper.classList.add('is-scaled');
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
                ${page.callout ? `<div class="volunteer-book-callout">${page.callout}</div>` : ''}
                ${page.qr ? this.renderQrBlock(page.qr, isMobile) : ''}
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
