// Project Detail Page — Entry Point

import { ACTIVITIES }    from './data/activities.js';
import { loadContent }   from './data/ContentLoader.js';
import { applyContent }  from './components/ContentApplier.js';
import { Navbar }        from './components/NavBar.js';
import { ScrollToTop }   from './components/ScrolltoTop.js';
import { ProjectDetail } from './components/ProjectDetail.js';
document.addEventListener('DOMContentLoaded', async () => {
    requestAnimationFrame(() => {
        document.documentElement.style.visibility = '';
        requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
        });
    });

    const content = await loadContent();

    // Merge activities from content.json over static fallback
    const activities = content.activities || ACTIVITIES;

    const id       = new URLSearchParams(window.location.search).get('id');
    const activity = activities.find(a => a.id === id);

    const navItems = [
        { label: 'Tổng Quan',  href: '#pd-overview' },
        { label: 'Câu Chuyện', href: '#pd-story'     },
    ];

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
    new ProjectDetail(activities);
    applyContent(content);   // footer, etc.
});
