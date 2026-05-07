// FAQ — Accordion component
const FAQ_DATA = [
    {
        q: 'Điều kiện tham gia tình nguyện là gì?',
        a: 'Bạn từ 18 tuổi trở lên, có tinh thần tình nguyện và sẵn sàng dành 2–3 ngày cho chuyến đi. Không yêu cầu kinh nghiệm — chỉ cần một trái tim nhiệt huyết và mong muốn đóng góp!',
    },
    {
        q: 'Chi phí tham gia một chuyến đi là bao nhiêu?',
        a: 'Tình nguyện viên chỉ cần tự chi trả chi phí di chuyển đến điểm tập kết. Toàn bộ chi phí ăn uống, chỗ ở và hoạt động trong chuyến đi được dự án hỗ trợ.',
    },
    {
        q: 'Chuyến đi thường kéo dài bao lâu?',
        a: 'Mỗi chuyến thường kéo dài 2–3 ngày cuối tuần. Lịch cụ thể được thông báo trước để bạn chủ động sắp xếp công việc cá nhân.',
    },
    {
        q: 'Tôi không biết dạy học, có tham gia được không?',
        a: 'Hoàn toàn được! EM không yêu cầu bạn phải là giáo viên hay có kinh nghiệm dạy học. Các buổi học được thiết kế vui vẻ qua trò chơi và bài hát — bất kỳ ai cũng có thể tham gia và đóng góp theo cách riêng của mình.',
    },
    {
        q: 'Làm thế nào để đăng ký tham gia?',
        a: 'Rất đơn giản! Bạn điền form đăng ký trực tuyến (xem phần Tình Nguyện phía trên), hoặc liên hệ trực tiếp qua hotline 0912 503 111 / 0945 513 426 để được tư vấn chi tiết.',
    },
    {
        q: 'Dự án đã hoạt động ở những tỉnh nào?',
        a: 'Hiện EM đã tổ chức các chuyến tại Bắc Kạn (03/2025) và Lào Cai (12/2025). Chuyến tiếp theo đang được lên kế hoạch tại Điện Biên — danh sách địa điểm sẽ tiếp tục được mở rộng!',
    },
];

export class FAQ {
    constructor() {
        this.render();
        this.attachEvents();
    }

    render() {
        const container = document.getElementById('faqContainer');
        if (!container) return;

        container.innerHTML = `
            <ul class="faq-list" role="list">
                ${FAQ_DATA.map((item, i) => `
                    <li class="faq-item" data-index="${i}">
                        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
                            <span class="faq-question-text">${item.q}</span>
                            <span class="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div class="faq-answer" id="faq-answer-${i}" role="region">
                            <div class="faq-answer-inner">${item.a}</div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    attachEvents() {
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item      = btn.closest('.faq-item');
                const isOpen    = item.classList.contains('open');

                // Close all others
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}
