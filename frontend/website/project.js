// Project Detail Page — Entry Point

import { ACTIVITIES }   from './data/activities.js';
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

    // Read project id synchronously to build the correct nav items
    const id       = new URLSearchParams(window.location.search).get('id');
    const activity = ACTIVITIES.find(a => a.id === id);

    const navItems = [
        { label: 'Tổng Quan',  href: '#pd-overview' },
        { label: 'Câu Chuyện', href: '#pd-story'     },
    ];

    // Only completed projects have gallery + feelings sections
    if (activity?.status === 'completed') {
        navItems.push({ label: 'Khoảnh Khắc', href: '#pd-gallery'      });
        navItems.push({ label: 'Cảm Nhận',    href: '#pd-testimonials' });
    }

    navItems.push({ label: 'Quyên Góp', href: 'index.html#quyen-gop', isCtaButton: true });

    const sectionIds = navItems
        .filter(i => i.href.startsWith('#'))
        .map(i => i.href.slice(1));

    new Navbar({ homeUrl: 'index.html', navItems, sectionIds });
    new ScrollToTop();
    new ProjectDetail();
    new Cursor();
});
