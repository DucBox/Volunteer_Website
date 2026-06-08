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

        const iconEl = document.createElement('span');
        iconEl.className = 'toast-icon';
        iconEl.textContent = icons[type] ?? icons.info;

        const msgEl = document.createElement('span');
        msgEl.className = 'toast-message';
        msgEl.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.setAttribute('aria-label', 'Đóng');
        closeBtn.textContent = '✕';

        const progressEl = document.createElement('div');
        progressEl.className = 'toast-progress';
        progressEl.style.animation = `toastProgress ${duration}ms linear forwards`;

        toast.append(iconEl, msgEl, closeBtn, progressEl);
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
