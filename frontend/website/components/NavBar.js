// Navbar Component
export class Navbar {
    // options.homeUrl   — where the logo navigates (for detail pages)
    // options.navItems  — array of { label, href, isCtaButton? } for custom pages
    // options.sectionIds — IDs to track for active-link highlighting
    constructor(options = {}) {
        this.homeUrl    = options.homeUrl    || null;
        this.navItems   = options.navItems   || null;
        this.sectionIds = options.sectionIds || ['gioi-thieu', 'hoat-dong', 'tinh-nguyen', 'quyen-gop', 'lien-he'];
        this.init();
    }

    init() {
        this.applyStoredTheme();
        this.render();
        this.attachEventListeners();
        this.handleScroll();
        this.trackActiveSection();
    }

    // ---- Theme: run before render to avoid flicker ----
    applyStoredTheme() {
        const saved = localStorage.getItem('theme');
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', saved || preferred);
    }

    render() {
        const navContainer = document.getElementById('navbarContainer');
        if (!navContainer) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        navContainer.innerHTML = `
            <nav class="navbar" id="mainNavbar">
                <div class="nav-container">
                    <a href="#" class="logo" id="logoLink">
                        <img src="assets/images/logo-transparent.png" alt="Logo EM" class="logo-icon">
                        <span class="logo-text">Educational Missions</span>
                    </a>

                    <button class="menu-toggle" id="menuToggle" aria-label="Mở menu" aria-expanded="false">
                        ☰
                    </button>

                    <ul class="nav-menu" id="navMenu" role="menubar">
                        ${this.buildNavItems()}
                        <li role="none" style="display:flex;align-items:center;">
                            <button class="dark-mode-toggle" id="darkModeToggle"
                                aria-label="${isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}">
                                <span class="toggle-thumb">${isDark ? '☀️' : '🌙'}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
    }

    buildNavItems() {
        if (this.navItems) {
            return this.navItems.map(item => {
                const sectionId = item.href.startsWith('#') ? item.href.slice(1) : item.href;
                const cls = item.isCtaButton ? 'btn-donate-nav' : 'nav-link';
                return `<li role="none"><a href="${item.href}" class="${cls}" data-section="${sectionId}" role="menuitem">${item.label}</a></li>`;
            }).join('');
        }
        return `
            <li role="none"><a href="#gioi-thieu"  class="nav-link" data-section="gioi-thieu"  role="menuitem">Giới Thiệu</a></li>
            <li role="none"><a href="#hoat-dong"   class="nav-link" data-section="hoat-dong"   role="menuitem">Hoạt Động</a></li>
            <li role="none"><a href="#tinh-nguyen" class="nav-link" data-section="tinh-nguyen" role="menuitem">Tình Nguyện</a></li>
            <li role="none"><a href="#lien-he"     class="nav-link" data-section="lien-he"     role="menuitem">Liên Hệ</a></li>
            <li role="none"><a href="#quyen-gop"   class="btn-donate-nav" data-section="quyen-gop" role="menuitem">Quyên Góp</a></li>
        `;
    }

    attachEventListeners() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu    = document.getElementById('navMenu');
        const darkToggle = document.getElementById('darkModeToggle');
        const logoLink   = document.getElementById('logoLink');

        // Mobile menu toggle
        menuToggle?.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Nav link clicks: smooth-scroll for in-page anchors, normal navigation otherwise
        document.querySelectorAll('.nav-link, .btn-donate-nav').forEach(link => {
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                if (href?.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const navbarH = document.querySelector('.navbar')?.offsetHeight || 72;
                        const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 8;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }
                // Full URLs (e.g. index.html#quyen-gop) handled by browser
                navMenu?.classList.remove('active');
                menuToggle?.setAttribute('aria-expanded', 'false');
                menuToggle && (menuToggle.textContent = '☰');
            });
        });

        // Logo → scroll to top (or navigate home on detail pages)
        logoLink?.addEventListener('click', e => {
            e.preventDefault();
            if (this.homeUrl) {
                window.location.href = this.homeUrl;
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            navMenu?.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
            menuToggle && (menuToggle.textContent = '☰');
        });

        // Close mobile menu on outside click
        document.addEventListener('click', e => {
            if (navMenu?.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                e.target !== menuToggle) {
                navMenu.classList.remove('active');
                menuToggle?.setAttribute('aria-expanded', 'false');
                menuToggle && (menuToggle.textContent = '☰');
            }
        });

        // Dark mode toggle
        darkToggle?.addEventListener('click', () => this.toggleDarkMode());
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            navbar?.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });
    }

    // ---- Active nav link based on scroll position ----
    trackActiveSection() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                document.querySelectorAll('.nav-link, .btn-donate-nav').forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            });
        }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

        this.sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    }

    // ---- Dark mode ----
    toggleDarkMode() {
        const current = document.documentElement.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        const toggle = document.getElementById('darkModeToggle');
        const thumb  = toggle?.querySelector('.toggle-thumb');
        if (thumb) thumb.textContent = next === 'dark' ? '☀️' : '🌙';
        toggle?.setAttribute('aria-label',
            next === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
    }
}
