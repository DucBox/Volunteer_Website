// Scroll lock utility — prevents layout shift when opening modals
window._lockScroll = () => {
    const w = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (w > 0) document.body.style.paddingRight = `${w}px`;
};
window._unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

// Main App Entry Point
import { ChatWidget }     from './components/ChatWidget.js';
import { Navbar }         from './components/NavBar.js';
import { Forms }          from './components/Forms.js';
import { Members }        from './components/Members.js';
import { Testimonials }   from './components/Testimonials.js';
import { ScrollToTop }    from './components/ScrolltoTop.js';
import { Activities }     from './components/Activities.js';
import { Mission }        from './components/Mission.js';
import { FAQ }            from './components/FAQ.js';
import { Timeline }       from './components/Timeline.js';
import { ImpactCounter }  from './components/ImpactCounter.js';
import { Animations }     from './components/Animations.js';
import { loadContent }    from './data/ContentLoader.js';
import { applyContent }   from './components/ContentApplier.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Restore scroll position instantly, then reveal page
    const savedY = parseInt(sessionStorage.getItem('_sy') || '0', 10);
    sessionStorage.removeItem('_sy');
    if (savedY > 0) window.scrollTo({ top: savedY, behavior: 'instant' });

    requestAnimationFrame(() => {
        document.documentElement.style.visibility = '';
        requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
        });
    });

    // Load content.json first, then init all components with live data
    const content = await loadContent();

    new Navbar();
    new Forms();
    new Members(content.members);
    new Testimonials(content.testimonials);
    new ScrollToTop();
    new Activities(content.activities);
    new Mission(content.mission);
    new FAQ(content.faq);
    new Timeline(content.timeline);
    new ImpactCounter(content.impact);
    applyContent(content);    // inject hero, volunteer, donation, partners, footer
    new Animations();         // last — all dynamic HTML is rendered by this point

    new ChatWidget({
        apiUrl:          'https://volunteerwebsite-production.up.railway.app/api/chat',
        logoPath:        'assets/images/logo-transparent.png',
        botName:         'EM Bot',
        botDescription:  'Trợ lý tình nguyện',
        autoOpen:        window.innerWidth > 768,
        maxHistoryPairs: 5,
    });
});
