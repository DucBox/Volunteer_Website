// Project Detail Page — Entry Point

import { Navbar }        from './components/NavBar.js';
import { ScrollToTop }   from './components/ScrolltoTop.js';
import { ProjectDetail } from './components/ProjectDetail.js';
import { Cursor }        from './components/Cursor.js';

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        document.documentElement.style.visibility = '';
        requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
        });
    });

    new Navbar({
        homeUrl: 'index.html',
        navItems: [
            { label: 'Tổng Quan',   href: '#pd-overview'      },
            { label: 'Câu Chuyện',  href: '#pd-story'         },
            { label: 'Khoảnh Khắc', href: '#pd-gallery'       },
            { label: 'Cảm Nhận',    href: '#pd-testimonials'  },
            { label: 'Quyên Góp',   href: 'index.html#quyen-gop', isCtaButton: true },
        ],
        sectionIds: ['pd-overview', 'pd-story', 'pd-gallery', 'pd-testimonials'],
    });

    new ScrollToTop();
    new ProjectDetail();
    new Cursor();
});
