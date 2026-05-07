// Animations Component - Scroll reveal with stagger
export class Animations {
    constructor() {
        this.init();
    }

    init() {
        // Slight delay to let dynamic components (Members, Activities…) finish rendering
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
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        });

        document.querySelectorAll(SELECTORS).forEach(el => {
            // Stagger by sibling position within direct parent
            const siblings = [...el.parentElement.children];
            const localIdx = siblings.indexOf(el);
            el.style.transitionDelay = `${localIdx * 0.1}s`;
            el.classList.add('reveal-ready');
            observer.observe(el);
        });
    }
}
