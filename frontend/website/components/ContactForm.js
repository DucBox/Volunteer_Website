// ContactForm — gửi thắc mắc về Gmail dự án qua EmailJS
//
// SETUP (làm 1 lần):
//   1. Tạo tài khoản miễn phí tại https://www.emailjs.com
//   2. Email Services → Add New Service → chọn Gmail → kết nối info.duanem@gmail.com
//   3. Email Templates → Create New Template, dùng các biến bên dưới:
//        Subject : Câu hỏi từ {{from_name}} — Website EM
//        Body    : Họ tên: {{from_name}}
//                  Email : {{from_email}}
//                  SĐT   : {{phone}}
//                  ---
//                  {{message}}
//   4. Account → API Keys → copy Public Key
//   5. Điền 3 giá trị vào EMAILJS_CONFIG bên dưới rồi lưu lại.

import { toast } from './Toast.js';

const EMAILJS_CONFIG = {
    publicKey:  'YOUR_PUBLIC_KEY',    // Account → API Keys
    serviceId:  'YOUR_SERVICE_ID',    // Email Services → Service ID
    templateId: 'YOUR_TEMPLATE_ID',   // Email Templates → Template ID
};

export class ContactForm {
    constructor() {
        this._initEmailJS();
        this._attachEvents();
    }

    _initEmailJS() {
        if (typeof emailjs === 'undefined') {
            console.warn('[ContactForm] EmailJS chưa load — kiểm tra CDN trong index.html');
            return;
        }
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    _attachEvents() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', (e) => this._handleSubmit(e));

        // Real-time clear error state
        form.querySelectorAll('input, textarea').forEach(el => {
            el.addEventListener('input', () => el.classList.remove('cf-error'));
        });
    }

    async _handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (!this._validate(form)) return;

        if (typeof emailjs === 'undefined') {
            toast.error('Dịch vụ gửi mail chưa sẵn sàng. Vui lòng thử lại sau hoặc liên hệ qua hotline.');
            return;
        }

        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
            toast.warning('EmailJS chưa được cấu hình — xem hướng dẫn trong ContactForm.js');
            return;
        }

        this._setLoading(true);

        try {
            const params = {
                from_name:  form.querySelector('#cf-name').value.trim(),
                from_email: form.querySelector('#cf-email').value.trim(),
                phone:      form.querySelector('#cf-phone').value.trim() || 'Không cung cấp',
                message:    form.querySelector('#cf-message').value.trim(),
            };

            await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, params);

            toast.success(
                `Gửi thành công! Chúng mình sẽ phản hồi qua <strong>${params.from_email}</strong> sớm nhất có thể 💙`,
                5000
            );
            form.reset();
        } catch (err) {
            console.error('[ContactForm] Lỗi gửi mail:', err);
            toast.error('Gửi không thành công. Vui lòng thử lại hoặc liên hệ qua hotline 0912 503 111.');
        } finally {
            this._setLoading(false);
        }
    }

    _validate(form) {
        let valid = true;
        const required = [
            { id: 'cf-name',    msg: 'Vui lòng nhập họ và tên.' },
            { id: 'cf-email',   msg: 'Vui lòng nhập địa chỉ email hợp lệ.' },
            { id: 'cf-message', msg: 'Vui lòng nhập câu hỏi của bạn.' },
        ];

        required.forEach(({ id, msg }) => {
            const el = form.querySelector(`#${id}`);
            if (!el) return;
            const empty = !el.value.trim();
            const invalidEmail = id === 'cf-email' && !empty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);

            if (empty || invalidEmail) {
                el.classList.add('cf-error');
                if (valid) {
                    toast.error(msg);
                    el.focus();
                }
                valid = false;
            }
        });

        return valid;
    }

    _setLoading(on) {
        const btn      = document.getElementById('cfSubmitBtn');
        const btnText  = btn?.querySelector('.cf-btn-text');
        const btnLoad  = btn?.querySelector('.cf-btn-loading');
        if (!btn) return;

        btn.disabled              = on;
        if (btnText) btnText.style.display = on ? 'none'  : '';
        if (btnLoad) btnLoad.style.display = on ? 'inline' : 'none';
    }
}
