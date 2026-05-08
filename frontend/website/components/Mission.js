// Mission Component — Flip cards + detail modal

const MISSION_DETAILS = {
    knowledge: {
        icon: '🎯',
        title: 'Tri Thức',
        sections: [
            {
                heading: 'Tại sao Tri Thức?',
                content: `<p>Ở những vùng núi xa xôi, các em nhỏ không thiếu thông minh — các em thiếu cơ hội. Một buổi học tiếng Anh vui vẻ có thể mở ra cả một chân trời mới: từ sự tự tin khi giao tiếp, đến khả năng tiếp cận thông tin toàn cầu.</p>`
            },
            {
                heading: 'Chúng mình làm gì?',
                content: `<ul>
                    <li>Tổ chức các buổi học tiếng Anh qua trò chơi, bài hát và hoạt động sáng tạo</li>
                    <li>Dạy kỹ năng sống: tư duy phản biện, làm việc nhóm, tự học</li>
                    <li>Trao tặng đồ dùng học tập và học bổng cho các em có hoàn cảnh khó khăn</li>
                    <li>Kết nối các em với tài nguyên học tập phù hợp lứa tuổi</li>
                </ul>`
            },
            {
                heading: 'Câu chuyện thực tế',
                quote: {
                    text: 'Lần đầu tiên em nói được một câu tiếng Anh hoàn chỉnh, em cứ cười mãi không thôi. Cô giáo bảo em giỏi lắm — đó là lần đầu tiên em nghĩ mình cũng làm được.',
                    cite: '— Em học sinh tại Bắc Kạn, 10 tuổi'
                }
            }
        ]
    },
    inspire: {
        icon: '🤝',
        title: 'Truyền Cảm Hứng',
        sections: [
            {
                heading: 'Ai cũng có thể là người thầy',
                content: `<p>Tình nguyện viên của EM đến từ mọi ngành nghề: sinh viên đại học, kỹ sư, designer, nhân viên văn phòng. Điểm chung duy nhất là sẵn sàng chia sẻ — một kỹ năng, một câu chuyện, một nụ cười.</p>`
            },
            {
                heading: 'Cảm hứng lan toả như thế nào?',
                content: `<ul>
                    <li>Tổ chức đêm văn nghệ, trò chơi vận động và hoạt động nhóm sôi nổi</li>
                    <li>Kể chuyện về thế giới bên ngoài — về đại học, về nghề nghiệp, về ước mơ</li>
                    <li>Làm "bạn lớn" — lắng nghe, động viên và đồng hành cùng các em</li>
                    <li>Chứng minh rằng: học tập là niềm vui, không phải gánh nặng</li>
                </ul>`
            },
            {
                heading: 'Từ tình nguyện viên',
                quote: {
                    text: 'Mình nghĩ mình đến để dạy các em, nhưng thực ra chính các em đã dạy mình rất nhiều — về sự biết ơn, về niềm vui giản đơn và về ý nghĩa của việc cho đi.',
                    cite: '— Nguyễn Thị Lan, Tình nguyện viên 2025'
                }
            }
        ]
    },
    give: {
        icon: '💡',
        title: 'Cho Đi',
        sections: [
            {
                heading: 'Khi cho đi, ta nhận lại',
                content: `<p>Mỗi chuyến đi là một hành trình trưởng thành. Tình nguyện viên không chỉ trao quà — họ trao đi một phần con tim và nhận về những điều không thể mua được: tình bạn chân thật, kỷ niệm không phai và cái nhìn sâu sắc hơn về cuộc sống.</p>`
            },
            {
                heading: 'Bạn sẽ nhận lại gì?',
                content: `<ul>
                    <li>Tình bạn bền chặt với những con người cùng chí hướng</li>
                    <li>Kỹ năng lãnh đạo, tổ chức sự kiện và làm việc nhóm thực tế</li>
                    <li>Góc nhìn mới về cuộc sống và những điều thực sự quan trọng</li>
                    <li>Ký ức đẹp từ những vùng đất, con người và văn hoá mới</li>
                    <li>Cảm giác bình yên khi biết rằng mình đã làm một điều có ý nghĩa</li>
                </ul>`
            },
            {
                heading: 'Truyền thống cho đi',
                quote: {
                    text: 'Trên chuyến xe về, ai cũng im lặng — không phải vì buồn, mà vì trong lòng đang rất đầy. Đầy ắp những khuôn mặt trẻ thơ, những tiếng cười và cả những giọt nước mắt hạnh phúc.',
                    cite: '— Trần Văn Đức, Trưởng nhóm chuyến Lào Cai 2025'
                }
            }
        ]
    }
};

export class Mission {
    constructor() {
        this.init();
    }

    init() {
        this.renderModal();
        this.attachFlipEvents();
        this.attachModalEvents();
    }

    renderModal() {
        document.getElementById('missionModal')?.remove();
        const el = document.createElement('div');
        el.id        = 'missionModal';
        el.className = 'mission-modal-overlay';
        el.innerHTML = `
            <div class="mission-modal-content" id="missionModalContent">
                <div class="mission-modal-header" id="missionModalHeader">
                    <span class="mission-modal-header-icon" id="missionModalIcon"></span>
                    <h2 id="missionModalTitle"></h2>
                    <button class="mission-modal-close" id="missionModalClose" aria-label="Đóng">✕</button>
                </div>
                <div class="mission-modal-body" id="missionModalBody"></div>
            </div>
        `;
        document.body.appendChild(el);
    }

    attachFlipEvents() {
        document.querySelectorAll('.mission-card-flip').forEach(card => {
            // Toggle flip on click (except the detail button)
            card.addEventListener('click', e => {
                if (e.target.closest('.mission-detail-btn')) return;
                card.classList.toggle('flipped');
            });

            // Detail button → open modal
            card.querySelector('.mission-detail-btn')?.addEventListener('click', e => {
                e.stopPropagation();
                this.openModal(card.dataset.mission);
            });
        });
    }

    attachModalEvents() {
        document.addEventListener('click', e => {
            if (e.target.id === 'missionModal' || e.target.id === 'missionModalClose') {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal(key) {
        const data = MISSION_DETAILS[key];
        if (!data) return;

        document.getElementById('missionModalIcon').textContent  = data.icon;
        document.getElementById('missionModalTitle').textContent = data.title;

        document.getElementById('missionModalBody').innerHTML = data.sections.map(s => `
            <h4>${s.heading}</h4>
            ${s.content || ''}
            ${s.quote ? `
                <div class="mission-modal-quote">
                    <p>"${s.quote.text}"</p>
                    <cite>${s.quote.cite}</cite>
                </div>
            ` : ''}
        `).join('');

        document.getElementById('missionModal').classList.add('active');
        window._lockScroll();
    }

    closeModal() {
        document.getElementById('missionModal')?.classList.remove('active');
        window._unlockScroll();
    }
}
