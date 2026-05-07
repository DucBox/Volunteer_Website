// Impact Counter — animates .impact-number elements with data-count attribute
export class ImpactCounter {
    constructor() {
        this.init();
    }

    init() {
        const numbers = document.querySelectorAll('.impact-number[data-count]');
        if (!numbers.length) return;

        // Set initial display to 0+
        numbers.forEach(el => { el.textContent = '0+'; });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numbers.forEach(el => observer.observe(el));
    }

    animateCount(el) {
        const target   = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start    = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease-out cubic
            const eased  = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + '+';
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }
}
