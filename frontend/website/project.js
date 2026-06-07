// Project Detail Page — Entry Point

import { Navbar }        from './components/NavBar.js';
import { ScrollToTop }   from './components/ScrolltoTop.js';
import { ProjectDetail } from './components/ProjectDetail.js';
import { Cursor }        from './components/Cursor.js';

document.addEventListener('DOMContentLoaded', () => {
    // Reveal page (same anti-FOUC logic as app.js)
    requestAnimationFrame(() => {
        document.documentElement.style.visibility = '';
        requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
        });
    });

    // homeUrl tells the Navbar to navigate to index.html instead of smooth-scrolling in-page
    new Navbar({ homeUrl: 'index.html' });
    new ScrollToTop();
    new ProjectDetail();
    new Cursor();
});
