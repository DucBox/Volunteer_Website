// Main App Entry Point
import { ChatWidget } from './components/ChatWidget.js';
import { Navbar } from './components/NavBar.js';
import { Forms } from './components/Forms.js';
import { Animations } from './components/Animations.js';
import { Gallery } from './components/Gallery.js';
import { Members } from './components/Members.js';
import { Testimonials } from './components/Testimonials.js';
import { ScrollToTop } from './components/ScrolltoTop.js'; 

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navbar
    const navbar = new Navbar();
    
    // Initialize Forms (volunteer, donation, newsletter)
    const forms = new Forms();
    
    // Initialize Animations (scroll effects)
    const animations = new Animations();
    
    // Initialize Gallery (3D carousel with lightbox)
    const gallery = new Gallery();
    
    // Initialize Members (team showcase with pagination)
    const members = new Members();
    
    // Initialize Testimonials (feelings gallery with auto-slide)
    const testimonials = new Testimonials();
    
    // Initialize Scroll To Top button ✅ THÊM MỚI
    const scrollToTop = new ScrollToTop();
    
    // Initialize Chat Widget
    const chatWidget = new ChatWidget({
        apiUrl: 'https://volunteerwebsite-production.up.railway.app/api/chat',
        logoPath: 'assets/images/logo.jpg',
        botName: 'EM Bot',
        botDescription: 'Trợ lý tình nguyện',
        autoOpen: true
    });
    
    console.log('All components initialized successfully!');
});