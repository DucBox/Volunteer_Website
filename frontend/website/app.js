// Main App Entry Point
import { ChatWidget }     from './components/ChatWidget.js';
import { Navbar }         from './components/NavBar.js';
import { Forms }          from './components/Forms.js';
import { Gallery }        from './components/Gallery.js';
import { Members }        from './components/Members.js';
import { Testimonials }   from './components/Testimonials.js';
import { ScrollToTop }    from './components/ScrolltoTop.js';
import { Activities }     from './components/Activities.js';
import { Mission }        from './components/Mission.js';
import { FAQ }            from './components/FAQ.js';
import { Timeline }       from './components/Timeline.js';
import { ImpactCounter }  from './components/ImpactCounter.js';
import { Animations }     from './components/Animations.js';
import { Cursor }         from './components/Cursor.js';

// Save position before reload, restore instantly on load
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('_sy', String(Math.round(window.scrollY)));
});

document.addEventListener('DOMContentLoaded', () => {
    var savedY = parseInt(sessionStorage.getItem('_sy') || '0', 10);
    sessionStorage.removeItem('_sy');
    if (savedY > 0) window.scrollTo({ top: savedY, behavior: 'instant' });

    new Navbar();
    new Forms();
    new Gallery();
    new Members();
    new Testimonials();
    new ScrollToTop();
    new Activities();
    new Mission();
    new FAQ();
    new Timeline();
    new ImpactCounter();
    new Animations();   // last — all dynamic HTML is rendered by this point
    new Cursor();       // initialize custom cursor

    new ChatWidget({
        apiUrl:          'https://volunteerwebsite-production.up.railway.app/api/chat',
        logoPath:        'assets/images/logo-no-bg.jpg',
        botName:         'EM Bot',
        botDescription:  'Trợ lý tình nguyện',
        autoOpen:        window.innerWidth > 768,
        maxHistoryPairs: 5,
    });
});
