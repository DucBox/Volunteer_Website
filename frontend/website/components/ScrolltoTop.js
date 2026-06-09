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
    }
    
    createButton() {
        const buttonHTML = `
            <button class="scroll-to-top" id="scrollToTopBtn" aria-label="Scroll to top">
                <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
                    <circle class="progress-ring__circle" stroke="currentColor" stroke-width="3" fill="transparent" r="22" cx="24" cy="24"/>
                </svg>
                <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
        this.button = document.getElementById('scrollToTopBtn');
        this.circle = this.button.querySelector('.progress-ring__circle');
        if(this.circle) {
            const radius = this.circle.r.baseVal.value;
            this.circumference = radius * 2 * Math.PI;
            this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
            this.circle.style.strokeDashoffset = this.circumference;
        }
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
        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        
        if (scrollPosition > this.scrollThreshold) {
            this.button?.classList.add('visible');
        } else {
            this.button?.classList.remove('visible');
        }

        if (this.circle && maxScroll > 0) {
            const scrollPercent = scrollPosition / maxScroll;
            const offset = this.circumference - scrollPercent * this.circumference;
            this.circle.style.strokeDashoffset = offset;
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}