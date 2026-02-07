/**
 * ScrollToTop Component
 * Smooth scroll to top button with auto show/hide
 */

export class ScrollToTop {
    constructor() {
        this.button = null;
        this.scrollThreshold = 300; // Show button after 300px scroll
        
        this.init();
    }
    
    init() {
        this.createButton();
        this.attachEventListeners();
        console.log('[ScrollToTop] ✓ Initialized');
    }
    
    createButton() {
        const buttonHTML = `
            <button class="scroll-to-top" id="scrollToTopBtn" aria-label="Scroll to top">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
        this.button = document.getElementById('scrollToTopBtn');
    }
    
    attachEventListeners() {
        // Scroll event to show/hide button
        window.addEventListener('scroll', () => {
            this.toggleButtonVisibility();
        });
        
        // Click event to scroll to top
        this.button?.addEventListener('click', () => {
            this.scrollToTop();
        });
    }
    
    toggleButtonVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > this.scrollThreshold) {
            this.button?.classList.add('visible');
        } else {
            this.button?.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}