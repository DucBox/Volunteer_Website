// Animations Component - Scroll reveal with stagger, re-triggers every pass
export class Animations {
    constructor() {
        this.init();
    }

    init() {
        setTimeout(() => this.setupScrollAnimations(), 120);
    }

    setupScrollAnimations() {
        const SELECTORS = [
            '.mission-card-flip',
            '.impact-card',
            '.mem-card',
            '.partner-card',
            '.donation-card',
            '.activity-card',
            '.timeline-item',
            '.faq-item',
            '.stat-item',
        ].join(', ');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    // Reset so next scroll-into-view re-animates
                    entry.target.classList.remove('revealed');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        });

        document.querySelectorAll(SELECTORS).forEach(el => {
            const siblings  = [...el.parentElement.children];
            const localIdx  = siblings.indexOf(el);
            el.style.transitionDelay = `${localIdx * 0.1}s`;
            el.classList.add('reveal-ready');
            observer.observe(el);
        });
    }
}
