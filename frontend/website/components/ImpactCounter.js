// Impact Counter — re-animates every time section scrolls into view
export class ImpactCounter {
    constructor() {
        this.init();
    }

    init() {
        const numbers = document.querySelectorAll('.impact-number[data-count]');
        if (!numbers.length) return;

        // Start all at 0+
        numbers.forEach(el => { el.textContent = '0+'; });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                } else {
                    // Cancel any in-flight animation and reset to 0
                    if (entry.target._countRaf) {
                        cancelAnimationFrame(entry.target._countRaf);
                        entry.target._countRaf = null;
                    }
                    entry.target.textContent = '0+';
                }
            });
        }, { threshold: 0.5 });

        numbers.forEach(el => observer.observe(el));
    }

    animateCount(el) {
        // Cancel previous animation if still running
        if (el._countRaf) {
            cancelAnimationFrame(el._countRaf);
            el._countRaf = null;
        }

        const target   = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start    = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target) + '+';

            if (progress < 1) {
                el._countRaf = requestAnimationFrame(update);
            } else {
                el._countRaf = null;
            }
        };

        el._countRaf = requestAnimationFrame(update);
    }
}
