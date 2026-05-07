// Forms Component - Handles Volunteer Registration and Donations
import { toast } from './Toast.js';

export class Forms {
    constructor() {
        this.selectedAmount = 0;
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Volunteer Form
        const volunteerForm = document.getElementById('volunteerForm');
        volunteerForm?.addEventListener('submit', (e) => this.handleVolunteerSubmit(e));

        // Donation Amount Selection
        document.querySelectorAll('.amount-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                this.selectAmount(e.target, amount);
            });
        });

        // Donation Button
        const donateBtn = document.getElementById('donateBtn');
        donateBtn?.addEventListener('click', () => this.handleDonation());

        // Newsletter Form
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm?.addEventListener('submit', (e) => this.handleNewsletter(e));

        // Form Validation
        this.setupFormValidation();
    }

    selectAmount(element, amount) {
        document.querySelectorAll('.amount-option').forEach(opt => {
            opt.classList.remove('active');
        });
        element.classList.add('active');
        this.selectedAmount = amount;
        const customInput = document.getElementById('customAmount');
        if (customInput) customInput.value = '';
    }

    handleVolunteerSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('name')?.value?.trim();
        toast.success(
            `Cảm ơn <strong>${name}</strong>! Chúng mình sẽ liên hệ với bạn sớm nhất có thể. 🎉`,
            4500
        );
        event.target.reset();
    }

    handleDonation() {
        const customInput  = document.getElementById('customAmount');
        const customAmount = customInput?.value;
        const finalAmount  = customAmount ? parseInt(customAmount) : this.selectedAmount;

        if (!finalAmount || finalAmount <= 0) {
            toast.warning('Vui lòng chọn hoặc nhập số tiền quyên góp!');
            return;
        }

        toast.success(
            `Cảm ơn bạn đã quyên góp <strong>${finalAmount.toLocaleString('vi-VN')} VNĐ</strong>! Mỗi đồng đều tạo nên sự thay đổi 💙`,
            5000
        );
    }

    handleNewsletter(event) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]')?.value;
        toast.success(`Đã đăng ký nhận tin thành công! Email <strong>${email}</strong> đã được thêm vào danh sách.`);
        event.target.reset();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('invalid', (e) => {
                    e.preventDefault();
                    input.classList.add('error');
                    toast.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
                });
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                });
            });
        });
    }
}
