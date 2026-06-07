// Shared ACTIVITIES data — imported by Activities.js (slider) and ProjectDetail.js (detail page)

export const ACTIVITIES = [
    {
        id: 'backan',
        image: 'assets/images/projects/backan.jpg',
        title: 'Hành Trình Đầu Tiên',
        location: 'Bắc Kạn',
        date: '15–16/03/2025',
        status: 'completed',
        shortDesc:
            'Trong chuyến đi đầu tiên của EM, chúng mình đã mang đến — và cũng mang về — thật nhiều điều. Những nụ cười rạng rỡ, ánh mắt háo hức và sự biết ơn từ tận đáy lòng.',
        // Thêm ảnh vào đây để hiển thị section "Khoảnh khắc đáng nhớ"
        gallery: [],
        // Ảnh cảm nhận TNV từ thư mục assets/images/feelings/backan/ (1.jpg, 2.jpg, ...)
        feelingsFolder: 'assets/images/feelings/backan/',
        stats: [
            { value: '50+',  label: 'Em nhỏ' },
            { value: '30+',  label: 'Học bổng' },
            { value: '20+',  label: 'Tình nguyện viên' },
            { value: '2',    label: 'Ngày' },
        ],
        fullDesc: `
            <p>Chuyến đi đầu tiên của Dự Án Cho EM đến với mảnh đất Bắc Kạn vào tháng 3/2025 đã để lại những dấu ấn khó phai trong lòng cả đội và các em nhỏ. Đây là hành trình mở đầu cho một chuỗi những chuyến đi đầy ý nghĩa, nơi tình yêu thương và tri thức được lan tỏa đến những vùng đất còn nhiều khó khăn.</p>
            <h4>🌟 Điểm nổi bật</h4>
            <ul>
                <li>Tổ chức 6 buổi học tiếng Anh vui vẻ và sáng tạo cho hơn 50 em nhỏ</li>
                <li>Trao tặng 30 suất học bổng kèm đồ dùng học tập</li>
                <li>Tổ chức các trò chơi teambuilding gắn kết tình bạn</li>
                <li>Giao lưu văn hóa và ca hát cùng các em</li>
                <li>Thăm hỏi và hỗ trợ các gia đình có hoàn cảnh khó khăn</li>
            </ul>
            <h4>💬 Cảm nhận từ tình nguyện viên</h4>
            <blockquote>
                Nhìn các em háo hức học từng chữ tiếng Anh, mình mới hiểu tại sao mình quyết định tham gia dự án này. Đây thực sự là một trong những kỷ niệm đẹp nhất tuổi trẻ của mình.
                <cite>— Nguyễn Thị Lan, Tình nguyện viên</cite>
            </blockquote>
        `,
    },
    {
        id: 'yty',
        image: 'assets/images/projects/yty.jpg',
        title: 'Noel Cho Em',
        location: 'Lào Cai',
        date: '5–7/12/2025',
        status: 'completed',
        shortDesc:
            'Giáng sinh luôn là mùa của những điều ấm áp. Chúng mình muốn trở thành "ông già Noel" đặc biệt — mang đến niềm vui, sự tò mò và những kỷ niệm đẹp đầu đời cho các em.',
        gallery: [],
        feelingsFolder: 'assets/images/feelings/yty/',
        stats: [
            { value: '100+', label: 'Phần quà Noel' },
            { value: '80+',  label: 'Em nhỏ' },
            { value: '25+',  label: 'Tình nguyện viên' },
            { value: '3',    label: 'Ngày' },
        ],
        fullDesc: `
            <p>Trong không khí Giáng sinh ấm áp, Dự Án Cho EM lần đầu tiên đặt chân đến vùng đất Lào Cai. Những con đường núi quanh co dẫn đến những ngôi trường nhỏ xinh giữa bạt ngàn xanh mướt, nơi các em nhỏ chưa từng được đón một mùa Giáng sinh thực sự.</p>
            <h4>🎄 Ý nghĩa đặc biệt</h4>
            <ul>
                <li>Mang Giáng sinh đến với các em nhỏ vùng cao lần đầu tiên</li>
                <li>Tổ chức đêm hội Noel với đèn hoa lung linh và quà tặng</li>
                <li>Dạy tiếng Anh qua các bài hát Giáng sinh quốc tế</li>
                <li>Trao tặng hơn 100 phần quà Noel ý nghĩa</li>
                <li>Chụp ảnh lưu niệm và tạo những kỷ niệm khó quên</li>
            </ul>
            <h4>💬 Khoảnh khắc khó quên</h4>
            <blockquote>
                Lần đầu tiên trong đời, các em được nhìn thấy ông già Noel. Ánh mắt ngạc nhiên và nụ cười rạng rỡ của các em là món quà lớn nhất với tất cả chúng mình.
                <cite>— Trần Văn Đức, Trưởng nhóm</cite>
            </blockquote>
        `,
    },
    {
        id: 'dienbien',
        image: 'assets/images/projects/dienbien.jpg',
        title: 'Hành Trình Điện Biên',
        location: 'Điện Biên',
        date: 'Sắp công bố • 2026',
        status: 'planning',
        shortDesc:
            'Hành trình tiếp theo sẽ đến với vùng đất lịch sử Điện Biên. Một chuyến đi đặc biệt đang được lên kế hoạch — hãy cùng chờ đón và đăng ký tham gia!',
        gallery: [],
        feelingsFolder: null,
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: 'index.html#tinh-nguyen',
        fullDesc: `
            <div class="pd-coming-soon">
                <div class="pd-coming-soon-icon">🏔️</div>
                <h3>Đang lên kế hoạch...</h3>
                <p>Chuyến hành trình đến Điện Biên đang được chuẩn bị kỹ lưỡng để mang đến những trải nghiệm tốt nhất cho cả tình nguyện viên và các em nhỏ nơi đây.</p>
            </div>
            <h4>🗺️ Dự kiến hoạt động</h4>
            <ul>
                <li>Dạy học tiếng Anh và kỹ năng sống cho các em</li>
                <li>Trao tặng học bổng và đồ dùng học tập</li>
                <li>Giao lưu văn hóa đặc sắc vùng Tây Bắc</li>
                <li>Tham quan các địa danh lịch sử Điện Biên Phủ</li>
            </ul>
            <h4>📞 Muốn tham gia?</h4>
            <p>Đăng ký để được thông báo sớm nhất khi lịch trình được công bố chính thức!</p>
        `,
    },

    // ── PLACEHOLDER — xoá khi có dự án thật ──
    {
        id: 'placeholder1',
        image: 'assets/images/backgrounds/hero-bg.jpg',
        title: '[Sắp Ra Mắt] Hành Trình Mới',
        location: 'Chưa xác định',
        date: 'Cuối năm 2026',
        status: 'planning',
        shortDesc:
            'Một hành trình mới đang được ấp ủ. Chúng mình sẽ sớm công bố điểm đến và kế hoạch chi tiết — hãy theo dõi để không bỏ lỡ!',
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: 'index.html#tinh-nguyen',
        fullDesc: `
            <div class="pd-coming-soon">
                <div class="pd-coming-soon-icon">✨</div>
                <h3>Đang ấp ủ...</h3>
                <p>Một hành trình mới đang được lên kế hoạch tỉ mỉ. Thông tin chi tiết sẽ sớm được công bố!</p>
            </div>
            <h4>📞 Muốn tham gia?</h4>
            <p>Điền form đăng ký quan tâm để được thông báo đầu tiên khi có thông tin mới.</p>
        `,
    },
    {
        id: 'placeholder2',
        image: 'assets/images/backgrounds/hero-bg.jpg',
        title: '[Sắp Ra Mắt] Hành Trình Mới',
        location: 'Chưa xác định',
        date: '2027',
        status: 'planning',
        shortDesc:
            'Chúng mình không dừng lại! Một hành trình khác đang được hoạch định — đồng hành cùng EM để cùng nhau tạo nên những điều kỳ diệu.',
        stats: null,
        ctaText: 'Đăng Ký Quan Tâm',
        ctaHref: 'index.html#tinh-nguyen',
        fullDesc: `
            <div class="pd-coming-soon">
                <div class="pd-coming-soon-icon">🌟</div>
                <h3>Sắp ra mắt...</h3>
                <p>Chúng mình không dừng lại! Hành trình này đang được hoạch định và sẽ sớm được công bố.</p>
            </div>
            <h4>📞 Muốn tham gia?</h4>
            <p>Điền form đăng ký để được cập nhật thông tin sớm nhất.</p>
        `,
    },
];

export const STATUS_LABELS = {
    completed: 'Đã hoàn thành',
    upcoming:  'Sắp diễn ra',
    planning:  'Đang lên kế hoạch',
};
