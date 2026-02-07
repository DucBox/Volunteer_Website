// Navbar Component
export class Navbar {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.handleScroll();
    }

    render() {
        const navContainer = document.getElementById('navbarContainer');
        if (!navContainer) return;

        navContainer.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="#" class="logo">
                        <img src="assets/images/logo-no-bg.jpg" alt="Logo" class="logo-icon" style="object-fit: cover;">
                        <span>Educational Missions - Dự Án Cho EM</span>
                    </a>
                    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                        ☰
                    </button>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="#gioi-thieu" class="nav-link">Giới Thiệu</a></li>
                        <li><a href="#hoat-dong" class="nav-link">Hoạt Động</a></li>
                        <li><a href="#tinh-nguyen" class="nav-link">Tình Nguyện</a></li>
                        <li><a href="#lien-he" class="nav-link">Liên Hệ</a></li>
                        <li><a href="#quyen-gop" class="btn-donate-nav">Quyên Góp</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }

    attachEventListeners() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        // Mobile menu toggle
        menuToggle?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
        });

        // Smooth scroll for nav links
        document.querySelectorAll('.nav-link, .btn-donate-nav, .logo').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu
                        navMenu?.classList.remove('active');
                    }
                } else if (link.classList.contains('logo')) {
                    // Logo scroll to top
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navMenu?.classList.remove('active');
                }
            });
        });
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Thêm shadow khi scroll xuống
            if (currentScroll > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
    }
}
