// Toast Notification Component
export class Toast {
    constructor() {
        this.container = null;
        this._init();
    }

    _init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'false');
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3800) {
        const icons = {
            success: '✅',
            error:   '❌',
            info:    'ℹ️',
            warning: '⚠️',
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] ?? icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Đóng">✕</button>
            <div class="toast-progress" style="animation: toastProgress ${duration}ms linear forwards"></div>
        `;

        this.container.appendChild(toast);

        // Trigger enter animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('toast-active'));
        });

        const dismiss = () => {
            toast.classList.add('toast-hiding');
            toast.classList.remove('toast-active');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', dismiss);
        const timer = setTimeout(dismiss, duration);

        // Stop progress animation on hover
        toast.addEventListener('mouseenter', () => {
            clearTimeout(timer);
            toast.querySelector('.toast-progress')?.remove();
        });
    }

    success(msg, duration) { this.show(msg, 'success', duration); }
    error(msg, duration)   { this.show(msg, 'error',   duration); }
    info(msg, duration)    { this.show(msg, 'info',    duration); }
    warning(msg, duration) { this.show(msg, 'warning', duration); }
}

// Singleton instance shared across the app
export const toast = new Toast();
