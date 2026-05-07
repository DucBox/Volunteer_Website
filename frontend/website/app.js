// Main App Entry Point
import { ChatWidget }  from './components/ChatWidget.js';
import { Navbar }      from './components/NavBar.js';
import { Forms }       from './components/Forms.js';
import { Animations }  from './components/Animations.js';
import { Gallery }     from './components/Gallery.js';
import { Members }     from './components/Members.js';
import { Testimonials} from './components/Testimonials.js';
import { ScrollToTop } from './components/ScrolltoTop.js';
import { Activities }  from './components/Activities.js';
import { Mission }     from './components/Mission.js';

document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
    new Forms();
    new Animations();
    new Gallery();
    new Members();
    new Testimonials();
    new ScrollToTop();
    new Activities();
    new Mission();

    new ChatWidget({
        apiUrl:        'https://volunteerwebsite-production.up.railway.app/api/chat',
        logoPath:      'assets/images/logo.jpg',
        botName:       'EM Bot',
        botDescription:'Trợ lý tình nguyện',
        autoOpen:      true,
        maxHistoryPairs: 5,
    });
});
