// Forms Component - Handles Volunteer Registration and Donations
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
        // Remove active class from all options
        document.querySelectorAll('.amount-option').forEach(opt => {
            opt.classList.remove('active');
        });
        // Add active class to selected option
        element.classList.add('active');
        this.selectedAmount = amount;
        // Clear custom amount input
        const customInput = document.getElementById('customAmount');
        if (customInput) customInput.value = '';
    }

    handleVolunteerSubmit(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            city: document.getElementById('city')?.value,
            interest: document.getElementById('interest')?.value,
            message: document.getElementById('message')?.value
        };

        console.log('Volunteer registration:', formData);
        alert(`Cảm ơn ${formData.name} đã đăng ký!\n\nChúng tôi sẽ liên hệ với bạn qua email ${formData.email} trong thời gian sớm nhất.`);
        event.target.reset();
    }

    handleDonation() {
        const customInput = document.getElementById('customAmount');
        const customAmount = customInput?.value;
        const finalAmount = customAmount ? parseInt(customAmount) : this.selectedAmount;

        if (finalAmount <= 0) {
            alert('Vui lòng chọn hoặc nhập số tiền quyên góp!');
            return;
        }

        alert(`Cảm ơn bạn đã quyên góp ${finalAmount.toLocaleString('vi-VN')} VNĐ!\n\nBạn sẽ được chuyển đến trang thanh toán...`);
        // Redirect to payment page
        // window.location.href = '/payment?amount=' + finalAmount;
    }

    handleNewsletter(event) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]')?.value;
        alert(`Cảm ơn bạn đã đăng ký nhận tin!\n\nEmail ${email} đã được thêm vào danh sách.`);
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
                });

                input.addEventListener('input', () => {
                    input.classList.remove('error');
                });
            });
        });
    }
}