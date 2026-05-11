export class Cursor {
    constructor() {
        // Do not init on mobile
        if (window.innerWidth <= 768 || 'ontouchstart' in window) return;
        this.init();
    }

    init() {
        this.createCursorElements();
        this.bindEvents();
    }

    createCursorElements() {
        this.cursorDot = document.createElement('div');
        this.cursorDot.classList.add('custom-cursor-dot');
        
        this.cursorRing = document.createElement('div');
        this.cursorRing.classList.add('custom-cursor-ring');

        document.body.appendChild(this.cursorDot);
        document.body.appendChild(this.cursorRing);

        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.dotX = this.mouseX;
        this.dotY = this.mouseY;
        this.ringX = this.mouseX;
        this.ringY = this.mouseY;

        this.render();
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Immediately update dot for zero latency
            this.cursorDot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
        });

        // Hover effect for interactive elements
        const iteractives = document.querySelectorAll('a, button, .btn, .mem-card, .act-card, .donation-card, .mission-card-flip, input, textarea');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorRing.classList.add('cursor-hover');
                this.cursorDot.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursorRing.classList.remove('cursor-hover');
                this.cursorDot.classList.remove('cursor-hover');
            });
        });

    }

    render() {
        // Smooth follow for the ring
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        this.cursorRing.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
        
        requestAnimationFrame(this.render.bind(this));
    }
}
