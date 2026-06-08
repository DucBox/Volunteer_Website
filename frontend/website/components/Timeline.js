// Timeline — cinematic horizontal journey slider
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
        date: 'Mùa xuân 2026',
        title: 'Trạm Gieo Sách',
        location: '📍 Sơn La',
        status: 'planning',
        icon: '📚',
        image: null,
        stats: null,
        desc: 'Một chuyến đi giả lập để chuẩn bị cho quy mô lớn hơn: mang tủ sách nhỏ, góc đọc và các hoạt động kể chuyện đến với trẻ em vùng cao.',
    },
    {
        date: 'Mùa hè 2026',
        title: 'Ngày Hội Kỹ Năng',
        location: '📍 Hà Giang',
        status: 'planning',
        icon: '🎒',
        image: null,
        stats: null,
        desc: 'Một trạm dừng thử nghiệm cho hành trình tương lai, nơi các em sẽ được học kỹ năng sống, teamwork và những buổi chơi-vừa-học vui vẻ.',
    },
    {
        date: 'Cuối 2026',
        title: 'Chuyến Xe Ánh Sáng',
        location: '📍 Yên Bái',
        status: 'planning',
        icon: '✨',
        image: null,
        stats: null,
        desc: 'Trạm ý tưởng để dự án có thể mở rộng thành một chuyến xe lưu động, ghé từng điểm trường với học liệu, quà tặng và hoạt động cộng đồng.',
    },
    {
        date: '2026',
        title: 'Điện Biên — Sắp Tới',
        location: '📍 Điện Biên',
        status: 'upcoming',
        icon: '🌟',
        image: null,
        stats: null,
        desc: 'Hành trình tiếp theo đang được lên kế hoạch. Bạn có muốn trở thành một phần của chuyến xe này và đồng hành ở trạm kế tiếp không?',
    },
];

const STOP_VARIANTS = [
    'timeline-item--crest',
    'timeline-item--dip',
    'timeline-item--rise',
    'timeline-item--crest',
    'timeline-item--dip',
    'timeline-item--rise',
];

export class Timeline {
    constructor(data) {
        this.items = data || TIMELINE_DATA;
        this.currentIndex = 0;
        this.currentOffset = 0;
        this.progressPosition = 0;
        this.dragStartX = 0;
        this.dragStartOffset = 0;
        this.isDragging = false;
        this.pointerId = null;
        this.wheelLockedUntil = 0;
        this.autoDriveRaf = null;
        this.autoDriveStartedAt = 0;
        this.autoDriveFrom = 0;
        this.autoDriveTo = this.items.length - 1;
        this.isAutoDriving = false;
        this.hasAutoStarted = false;
        this.segmentDuration = 4000; // Slower, more cinematic auto drive
        this.cachedPoints = null;

        this.container = null;
        this.viewport = null;
        this.scene = null;
        this.track = null;
        this.routeSvg = null;
        this.routeGlow = null;
        this.routeLine = null;
        this.routeDash = null;
        this.bus = null;
        this.currentStopLabel = null;
        this.currentStopTitle = null;
        this.progressFill = null;
        this.progressText = null;
        this.dotsWrap = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.startBtn = null;
        this.backdropMountains = null;
        this.backdropForest = null;
        this.backdropTrees = null;

        this.onResize = this.handleResize.bind(this);
        this.render();
    }

    render() {
        const container = document.getElementById('timelineContainer');
        if (!container) return;
        this.container = container;

        container.innerHTML = `
            <div class="timeline-journey">
                <div class="timeline-toolbar">
                    <div class="timeline-active-stop">
                        <span class="timeline-toolbar-label" id="timelineCurrentStopLabel">Trạm 01</span>
                        <strong class="timeline-toolbar-title" id="timelineCurrentStopTitle">${this.items[0].title}</strong>
                    </div>

                    <div class="timeline-progress-meta">
                        <div class="timeline-progress-track" aria-hidden="true">
                            <span class="timeline-progress-fill" id="timelineProgressFill"></span>
                        </div>
                        <span class="timeline-progress-text" id="timelineProgressText">1 / ${this.items.length}</span>
                    </div>

                    <div class="timeline-controls">
                        <button class="timeline-start-btn" id="timelineStartBtn" aria-label="Khởi hành chuyến xe">Khởi Hành</button>
                    </div>
                </div>

                <div class="timeline-viewport" id="timelineViewport">
                    <div class="timeline-backdrop">
                        <div class="timeline-backdrop-sky"></div>
                        <div class="timeline-backdrop-mountains" id="timelineBackdropMountains"></div>
                        <div class="timeline-backdrop-forest" id="timelineBackdropForest"></div>
                        <div class="timeline-backdrop-trees" id="timelineBackdropTrees"></div>
                        <div class="timeline-backdrop-road"></div>
                    </div>

                    <div class="timeline-scene" id="timelineScene">
                        <svg class="timeline-route" id="timelineRoute" aria-hidden="true">
                            <path class="timeline-route-glow"></path>
                            <path class="timeline-route-line"></path>
                            <path class="timeline-route-dash"></path>
                        </svg>

                        <ol class="timeline-track" id="timelineTrack" role="list">
                            ${this.items.map((item, index) => this.itemHTML(item, index)).join('')}
                        </ol>

                        <div class="timeline-bus" id="timelineBus" aria-hidden="true">
                            <span class="timeline-bus-icon">🚌</span>
                        </div>
                    </div>
                </div>

                <div class="timeline-nav">
                    <button class="timeline-control-btn" id="timelinePrev" aria-label="Đi về trạm trước">&#8249;</button>
                    <div class="timeline-dots" id="timelineDots">
                        ${this.items.map((_, index) => `
                            <button class="timeline-dot${index === 0 ? ' active' : ''}" data-index="${index}" aria-label="Đi tới trạm ${String(index + 1).padStart(2, '0')}"></button>
                        `).join('')}
                    </div>
                    <button class="timeline-control-btn" id="timelineNext" aria-label="Đi tới trạm tiếp">&#8250;</button>
                </div>
            </div>
        `;

        this.cacheElements();
        this.attachEvents();

        requestAnimationFrame(() => {
            this.layoutScene();
            this.renderFrame(false);
        });

        // Tự động khởi hành khi cuộn tới Timeline — chỉ trên desktop
        const isMobile = () => window.innerWidth <= 768;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isMobile() && !this.isAutoDriving && !this.hasAutoStarted) {
                        this.hasAutoStarted = true;
                        this.startAutoDrive();
                    }
                } else {
                    if (this.isAutoDriving) {
                        this.stopAutoDrive();
                        this.hasAutoStarted = false;
                    }
                }
            });
        }, { threshold: 0.2 });
        
        if (this.viewport) observer.observe(this.viewport);
    }

    cacheElements() {
        this.viewport = this.container.querySelector('#timelineViewport');
        this.scene = this.container.querySelector('#timelineScene');
        this.track = this.container.querySelector('#timelineTrack');
        this.routeSvg = this.container.querySelector('#timelineRoute');
        this.routeGlow = this.container.querySelector('.timeline-route-glow');
        this.routeLine = this.container.querySelector('.timeline-route-line');
        this.routeDash = this.container.querySelector('.timeline-route-dash');
        this.bus = this.container.querySelector('#timelineBus');
        this.currentStopLabel = this.container.querySelector('#timelineCurrentStopLabel');
        this.currentStopTitle = this.container.querySelector('#timelineCurrentStopTitle');
        this.progressFill = this.container.querySelector('#timelineProgressFill');
        this.progressText = this.container.querySelector('#timelineProgressText');
        this.dotsWrap = this.container.querySelector('#timelineDots');
        this.prevBtn = this.container.querySelector('#timelinePrev');
        this.nextBtn = this.container.querySelector('#timelineNext');
        this.startBtn = this.container.querySelector('#timelineStartBtn');
        this.backdropMountains = this.container.querySelector('#timelineBackdropMountains');
        this.backdropForest = this.container.querySelector('#timelineBackdropForest');
        this.backdropTrees = this.container.querySelector('#timelineBackdropTrees');
    }

    attachEvents() {
        this.prevBtn?.addEventListener('click', () => {
            this.stopAutoDrive();
            this.goTo(this.currentIndex - 1);
        });

        this.nextBtn?.addEventListener('click', () => {
            this.stopAutoDrive();
            this.goTo(this.currentIndex + 1);
        });

        this.startBtn?.addEventListener('click', () => this.toggleAutoDrive());

        this.dotsWrap?.addEventListener('click', (event) => {
            const dot = event.target.closest('.timeline-dot');
            if (!dot) return;
            this.stopAutoDrive();
            this.goTo(Number(dot.dataset.index));
        });

        window.addEventListener('resize', this.onResize, { passive: true });
    }

    handleResize() {
        this.cachedPoints = null;
        this.layoutScene();
        this.renderFrame(false);
    }

    onPointerDown(event) {
        if (!this.viewport || (event.pointerType === 'mouse' && event.button !== 0)) return;

        this.stopAutoDrive();
        this.isDragging = true;
        this.pointerId = event.pointerId;
        this.dragStartX = event.clientX;
        this.dragStartOffset = this.currentOffset;

        this.viewport.classList.add('is-dragging');
        this.scene.classList.add('is-dragging');
        this.viewport.setPointerCapture(event.pointerId);
    }

    onPointerMove(event) {
        if (!this.isDragging || event.pointerId !== this.pointerId) return;

        const deltaX = event.clientX - this.dragStartX;
        const nextOffset = this.clampOffset(this.dragStartOffset - deltaX);

        this.currentOffset = nextOffset;
        this.applySceneOffset(nextOffset, false);
        this.updateBackdrop(nextOffset);
    }

    onPointerUp(event) {
        if (!this.isDragging || event.pointerId !== this.pointerId) return;

        const deltaX = event.clientX - this.dragStartX;
        const traveledEnough = Math.abs(deltaX) > 56;
        this.resetDrag();

        if (traveledEnough) {
            this.goTo(this.currentIndex + (deltaX < 0 ? 1 : -1));
        } else {
            this.renderFrame(true);
        }
    }

    resetDrag() {
        if (!this.viewport || !this.scene) return;
        this.isDragging = false;
        this.pointerId = null;
        this.viewport.classList.remove('is-dragging');
        this.scene.classList.remove('is-dragging');
    }

    onWheel(event) {
        if (!this.viewport) return;

        const now = Date.now();
        // Only intercept horizontal scroll (trackpad swipe); let vertical scroll pass through
        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) return;

        const delta = event.deltaX;
        if (Math.abs(delta) < 18 || now < this.wheelLockedUntil) return;

        event.preventDefault();
        this.stopAutoDrive();
        this.wheelLockedUntil = now + 420;
        this.goTo(this.currentIndex + (delta > 0 ? 1 : -1));
    }

    toggleAutoDrive() {
        if (this.isAutoDriving) {
            this.stopAutoDrive();
            return;
        }

        if (this.progressPosition >= this.items.length - 1) {
            this.progressPosition = 0;
            this.currentIndex = 0;
            this.renderFrame(false);
        }

        this.startAutoDrive();
    }

    startAutoDrive() {
        this.stopAutoDrive(false);
        this.isAutoDriving = true;
        this.autoDriveStartedAt = 0;
        this.autoDriveFrom = this.progressPosition;
        this.autoDriveTo = this.items.length - 1;
        this.startBtn?.classList.add('is-running');
        if (this.startBtn) this.startBtn.textContent = 'Tạm Dừng';
        this.autoDriveRaf = requestAnimationFrame((timestamp) => this.autoDriveStep(timestamp));
    }

    stopAutoDrive(updateButton = true) {
        this.isAutoDriving = false;
        if (this.autoDriveRaf) cancelAnimationFrame(this.autoDriveRaf);
        this.autoDriveRaf = null;

        if (!updateButton || !this.startBtn) return;
        this.startBtn.classList.remove('is-running');
        this.startBtn.textContent = this.progressPosition >= this.items.length - 1 ? 'Chạy Lại' : 'Khởi Hành';
    }

    autoDriveStep(timestamp) {
        if (!this.isAutoDriving) return;

        if (!this.autoDriveStartedAt) this.autoDriveStartedAt = timestamp;

        const elapsed = timestamp - this.autoDriveStartedAt;
        const movedSegments = elapsed / this.segmentDuration;
        const nextPosition = Math.min(this.autoDriveTo, this.autoDriveFrom + movedSegments);

        this.progressPosition = nextPosition;
        this.currentIndex = this.getActiveIndexFromProgress(nextPosition);
        this.renderFrame(false);

        if (nextPosition >= this.autoDriveTo) {
            this.progressPosition = this.autoDriveTo;
            this.currentIndex = this.autoDriveTo;
            this.renderFrame(false);
            this.stopAutoDrive();
            return;
        }

        this.autoDriveRaf = requestAnimationFrame((nextTimestamp) => this.autoDriveStep(nextTimestamp));
    }

    goTo(index) {
        const boundedIndex = Math.max(0, Math.min(index, this.items.length - 1));
        this.currentIndex = boundedIndex;
        this.progressPosition = boundedIndex;
        this.renderFrame(true);
    }

    layoutScene() {
        if (!this.scene || !this.track || !this.routeSvg || !this.routeLine || !this.routeGlow || !this.routeDash) return;

        const width = Math.ceil(this.track.scrollWidth);
        const height = Math.ceil(this.track.offsetHeight);

        this.scene.style.width = `${width}px`;
        this.scene.style.height = `${height}px`;
        this.routeSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        this.routeSvg.setAttribute('width', String(width));
        this.routeSvg.setAttribute('height', String(height));

        this.renderRoute();
    }

    renderRoute() {
        const points = this.getNodePoints();
        if (points.length < 2) return;

        const pathD = this.buildSmoothPath(points);
        this.routeGlow.setAttribute('d', pathD);
        this.routeLine.setAttribute('d', pathD);
        this.routeDash.setAttribute('d', pathD);
    }

    getNodePoints() {
        if (this.cachedPoints) return this.cachedPoints;
        if (!this.scene) return [];

        const sceneRect = this.scene.getBoundingClientRect();
        this.cachedPoints = [...this.scene.querySelectorAll('.timeline-stop-node')].map((node) => {
            const rect = node.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - sceneRect.left,
                y: rect.top + rect.height / 2 - sceneRect.top,
            };
        });
        return this.cachedPoints;
    }

    buildSmoothPath(points) {
        let path = `M ${points[0].x} ${points[0].y}`;

        for (let index = 1; index < points.length; index += 1) {
            const prev = points[index - 1];
            const curr = points[index];
            const deltaX = curr.x - prev.x;
            const curve = Math.min(132, Math.abs(deltaX) * 0.42);

            path += ` C ${prev.x + curve} ${prev.y}, ${curr.x - curve} ${curr.y}, ${curr.x} ${curr.y}`;
        }

        return path;
    }

    getPointAtProgress(progress) {
        const points = this.getNodePoints();
        if (!points.length) return null;
        if (points.length === 1) return { ...points[0], angle: 0 };

        const safeProgress = Math.max(0, Math.min(progress, this.items.length - 1));
        const lastIndex = points.length - 1;
        const segmentIndex = Math.min(lastIndex - 1, Math.floor(safeProgress));
        const localProgress = Math.min(1, safeProgress - segmentIndex);
        const from = points[segmentIndex];
        const to = points[segmentIndex + 1] || from;
        const x = from.x + (to.x - from.x) * localProgress;
        const y = from.y + (to.y - from.y) * localProgress;
        const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

        return { x, y, angle };
    }

    renderFrame(animateScene = true) {
        const anchorPoint = this.getPointAtProgress(this.progressPosition);
        const busPoint = this.getPointAtProgress(this.getBusDisplayProgress(this.progressPosition));
        if (!anchorPoint || !busPoint || !this.viewport) return;

        const targetOffset = this.clampOffset(anchorPoint.x - this.viewport.clientWidth / 2);
        this.currentOffset = targetOffset;
        this.applySceneOffset(targetOffset, animateScene);
        this.updateBackdrop(targetOffset);
        this.updateActiveState();
        this.updateProgress();
        this.updateBusPosition(busPoint);
    }

    applySceneOffset(offset, animate) {
        if (!this.scene) return;
        this.scene.classList.toggle('is-animated', animate);
        this.scene.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }

    updateBackdrop(offset) {
        this.backdropMountains?.style.setProperty('transform', `translate3d(${-offset * 0.12}px, 0, 0)`);
        this.backdropForest?.style.setProperty('transform', `translate3d(${-offset * 0.2}px, 0, 0)`);
        this.backdropTrees?.style.setProperty('transform', `translate3d(${-offset * 0.34}px, 0, 0)`);
    }

    getMaxOffset() {
        if (!this.viewport || !this.scene) return 0;
        return Math.max(0, this.scene.offsetWidth - this.viewport.clientWidth);
    }

    clampOffset(offset) {
        return Math.max(0, Math.min(offset, this.getMaxOffset()));
    }

    getActiveIndexFromProgress(progress) {
        const normalized = progress - Math.floor(progress);
        const base = Math.floor(progress);
        return Math.max(0, Math.min(this.items.length - 1, normalized >= 0.55 ? base + 1 : base));
    }

    updateActiveState() {
        const items = this.container.querySelectorAll('.timeline-item');
        const dots = this.container.querySelectorAll('.timeline-dot');

        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
            item.classList.toggle('is-complete', index < this.currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        const current = this.items[this.currentIndex];
        const stopLabel = `Trạm ${String(this.currentIndex + 1).padStart(2, '0')}`;
        if (this.currentStopLabel) this.currentStopLabel.textContent = stopLabel;
        if (this.currentStopTitle) this.currentStopTitle.textContent = current.title;

        if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0 && !this.isAutoDriving;
        if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.items.length - 1 && !this.isAutoDriving;
    }

    updateProgress() {
        const max = Math.max(1, this.items.length - 1);
        const progressPercent = (this.progressPosition / max) * 100;
        if (this.progressFill) this.progressFill.style.width = `${progressPercent}%`;
        if (this.progressText) {
            this.progressText.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
        }
    }

    updateBusPosition(point) {
        if (!this.bus || !point) return;
        const offset = this.getBusVisualOffset(point.angle);
        const x = point.x + offset.x;
        const y = point.y + offset.y;
        this.bus.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${point.angle}deg)`;
    }

    getBusVisualOffset(angle) {
        const viewportWidth = this.viewport?.clientWidth || window.innerWidth;
        const isSnappedToStop = Math.abs(this.progressPosition - Math.round(this.progressPosition)) < 0.04;

        let distance = 0;
        if (viewportWidth <= 480) {
            distance = isSnappedToStop ? 26 : 18;
        } else if (viewportWidth <= 768) {
            distance = isSnappedToStop ? 16 : 10;
        }

        if (!distance) return { x: 0, y: 0 };

        const radians = angle * (Math.PI / 180);
        return {
            x: Math.sin(radians) * distance,
            y: -Math.cos(radians) * distance,
        };
    }

    getBusDisplayProgress(progress) {
        const viewportWidth = this.viewport?.clientWidth || window.innerWidth;
        const lastIndex = this.items.length - 1;
        if (viewportWidth > 768) return progress;

        const snappedStop = Math.round(progress);
        if (Math.abs(progress - snappedStop) >= 0.04) return progress;

        if (snappedStop <= 0) return Math.min(lastIndex, progress + 0.16);
        if (snappedStop >= lastIndex) return Math.max(0, progress - 0.16);
        return Math.max(0, progress - 0.16);
    }

    itemHTML(item, index) {
        const stopNumber = String(index + 1).padStart(2, '0');
        const isDone = item.status === 'completed';
        const statusLabel = isDone ? 'Đã ghé thăm' : item.status === 'upcoming' ? 'Sắp khởi hành' : 'Đang lên kế hoạch';
        const variantClass = STOP_VARIANTS[index % STOP_VARIANTS.length];

        const statsBlock = item.stats
            ? `<div class="timeline-stats">
                   ${item.stats.map((stat) => `
                       <div class="timeline-stat">
                           <span class="timeline-stat-value">${stat.value}</span>
                           <span class="timeline-stat-label">${stat.label}</span>
                       </div>
                   `).join('')}
               </div>`
            : `<a href="#tinh-nguyen" class="btn btn-primary timeline-cta">Đăng ký tham gia</a>`;

        return `
            <li class="timeline-item ${variantClass} timeline-item--${item.status}" data-index="${index}">
                <div class="timeline-stop-anchor">
                    <span class="timeline-step-index">${stopNumber}</span>
                    <div class="timeline-stop-node ${item.status === 'upcoming' ? 'upcoming' : ''}">
                        <span>${item.icon}</span>
                    </div>
                </div>

                <div class="timeline-stop-cardwrap">
                    <div class="timeline-stop-header">
                        <span class="timeline-step-label">Điểm dừng ${stopNumber}</span>
                        <span class="timeline-badge ${item.status}">${statusLabel}</span>
                    </div>

                    <div class="timeline-card">
                        <div class="timeline-card-body">
                            <div class="timeline-date">${item.date}</div>
                            <h3 class="timeline-title">${item.title}</h3>
                            <p class="timeline-location">${item.location}</p>
                            <p class="timeline-desc">${item.desc}</p>
                            ${statsBlock}
                        </div>
                    </div>
                </div>
            </li>
        `;
    }
}
