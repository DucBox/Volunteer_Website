// Timeline — Hành trình của dự án
const TIMELINE_DATA = [
    {
        date: 'Tháng 3, 2025',
        title: 'Hành Trình Đầu Tiên',
        location: '📍 Bắc Kạn',
        status: 'completed',
        icon: '🌱',
        image: 'assets/images/projects/backan.jpg',
        stats: [
            { value: '20+', label: 'Tình nguyện viên' },
            { value: '50+', label: 'Em nhỏ' },
            { value: '30+', label: 'Học bổng' },
        ],
        desc: 'Chuyến đi khai sinh của Dự Án Cho EM — dạy tiếng Anh, trao học bổng và mang niềm vui đến hơn 50 em nhỏ tại vùng núi Bắc Kạn.',
    },
    {
        date: 'Tháng 12, 2025',
        title: 'Noel Cho Em',
        location: '📍 Lào Cai',
        status: 'completed',
        icon: '🎄',
        image: 'assets/images/projects/yty.jpg',
        stats: [
            { value: '25+', label: 'Tình nguyện viên' },
            { value: '80+', label: 'Em nhỏ' },
            { value: '100+', label: 'Phần quà' },
        ],
        desc: 'Mang Giáng Sinh lên vùng cao — trao 100+ phần quà, tổ chức đêm văn nghệ và thắp sáng ước mơ cho các em nhỏ tại Lào Cai.',
    },
    {
        date: '2026',
        title: 'Điện Biên — Sắp Tới',
        location: '📍 Điện Biên',
        status: 'upcoming',
        icon: '🌟',
        image: null,
        stats: null,
        desc: 'Hành trình tiếp theo đang được lên kế hoạch. Bạn có muốn trở thành một phần của câu chuyện này không?',
    },
];

export class Timeline {
    constructor() {
        this.render();
    }

    render() {
        const container = document.getElementById('timelineContainer');
        if (!container) return;

        container.innerHTML = `
            <ul class="timeline-list" role="list">
                ${TIMELINE_DATA.map((item, i) => this.itemHTML(item, i)).join('')}
            </ul>
        `;
    }

    itemHTML(item, index) {
        const imgBlock = item.image
            ? `<div class="timeline-img-wrapper">
                   <img src="${item.image}" alt="${item.title}" loading="lazy">
               </div>`
            : `<div class="timeline-img-placeholder">${item.icon}</div>`;

        const statsBlock = item.stats
            ? `<div class="timeline-stats">
                   ${item.stats.map(s => `
                       <div class="timeline-stat">
                           <span class="timeline-stat-value">${s.value}</span>
                           <span class="timeline-stat-label">${s.label}</span>
                       </div>
                   `).join('')}
               </div>`
            : `<a href="#tinh-nguyen" class="btn btn-primary" style="font-size:14px;padding:10px 20px;">Đăng ký tham gia</a>`;

        const card = `
            <div class="timeline-card">
                ${imgBlock}
                <div class="timeline-card-body">
                    <span class="timeline-badge ${item.status}">
                        ${item.status === 'completed' ? '✓ Đã hoàn thành' : '⏳ Sắp diễn ra'}
                    </span>
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-location">${item.location}</p>
                    <p class="timeline-desc">${item.desc}</p>
                    ${statsBlock}
                </div>
            </div>
        `;

        return `
            <li class="timeline-item">
                ${index % 2 === 0
                    ? `${card}<div class="timeline-dot ${item.status === 'upcoming' ? 'upcoming' : ''}">${item.icon}</div><div class="timeline-empty"></div>`
                    : `<div class="timeline-empty"></div><div class="timeline-dot ${item.status === 'upcoming' ? 'upcoming' : ''}">${item.icon}</div>${card}`
                }
            </li>
        `;
    }
}
