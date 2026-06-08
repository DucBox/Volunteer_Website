// ===================================
// CONTENT MANAGER — Admin Dashboard
// Handles all CMS operations via /api/content
// ===================================

const BACKEND_BASE  = 'https://volunteerwebsite-production.up.railway.app/api';
const CONTENT_API   = `${BACKEND_BASE}/content`;
const WEBSITE_BASE  = 'https://volunteer-website-self.vercel.app';
let _currentContent = null;

function escAttr(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initMiniEditor(actIdx) {
    const wrapper = document.getElementById(`mini-editor-${actIdx}`);
    if (!wrapper || wrapper.dataset.initialized) return;
    wrapper.dataset.initialized = 'true';
    const content = wrapper.querySelector('.mini-editor-content');
    const initHtml = wrapper.dataset.initHtml || '';
    if (content && initHtml) content.innerHTML = initHtml;
}

window.miniEditorExec = function(actIdx, cmd) {
    const content = document.querySelector(`#mini-editor-${actIdx} .mini-editor-content`);
    if (!content) return;
    content.focus();
    document.execCommand(cmd, false, null);
};

// ---- Helpers ----

function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function cmHeaders(extra = {}) {
    const key = typeof getAdminKey === 'function' ? getAdminKey() : (window.getAdminKey?.() ?? '');
    return { 'X-Admin-Key': key, 'Content-Type': 'application/json', ...extra };
}

function showCmStatus(sectionId, msg, type = 'success') {
    const el = document.getElementById(`cm-status-${sectionId}`);
    if (!el) return;
    el.textContent = msg;
    el.className = `cm-status cm-status--${type}`;
    el.style.display = 'block';
    if (type === 'success') setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function cmLoading(sectionId, loading) {
    const btn = document.getElementById(`cm-save-${sectionId}`);
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
        ? '<i class="fas fa-spinner fa-spin"></i> Đang lưu...'
        : '<i class="fas fa-save"></i> Lưu & Cập Nhật Web';
}

async function fetchContent() {
    // Read directly from the public website (no auth needed, always reflects live content)
    const res = await fetch(`${WEBSITE_BASE}/data/content.json?v=${Date.now()}`);
    if (!res.ok) throw new Error('Cannot fetch content.json from website');
    return res.json();
}

async function saveContent(newContent, section = '') {
    const url = section
        ? `${CONTENT_API}/update?section=${encodeURIComponent(section)}`
        : `${CONTENT_API}/update`;
    const res = await fetch(url, {
        method: 'POST',
        headers: cmHeaders(),
        body: JSON.stringify(newContent),
    });
    if (res.status === 401) { handleUnauthorized(); throw new Error('Unauthorized'); }
    if (!res.ok) throw new Error('Save failed');
    return res.json();
}

async function uploadImage(file, destPath, imageType) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('dest_path', destPath);
    fd.append('image_type', imageType);
    const res = await fetch(`${CONTENT_API}/upload-image`, {
        method: 'POST',
        headers: { 'X-Admin-Key': typeof getAdminKey === 'function' ? getAdminKey() : (window.getAdminKey?.() ?? '') },
        body: fd,
    });
    if (!res.ok) throw new Error('Image upload failed');
    return res.json();
}

// ---- Init: load content and populate all forms ----

export async function initContentManager() {
    try {
        _currentContent = await fetchContent();
        populateHero(_currentContent.hero);
        populateImpact(_currentContent.impact);
        populateVolunteer(_currentContent.volunteer);
        populateFaq(_currentContent.faq);
        populateDonation(_currentContent.donation);
        populateFooter(_currentContent.footer);
        populateMembers(_currentContent.members);
        populateTimeline(_currentContent.timeline);
        populateActivities(_currentContent.activities);
        populatePartners(_currentContent.partners);
        populateMission(_currentContent.mission);
        populateTestimonials(_currentContent.testimonials);
    } catch (e) {
        console.error('Content load failed:', e);
    }
}

// ============================
// SECTION: HERO
// ============================

function populateHero(hero) {
    if (!hero) return;
    document.getElementById('hero-subtitle').value = hero.subtitle || '';
    const container = document.getElementById('hero-stats-list');
    if (!container) return;
    container.innerHTML = (hero.stats || []).map((s, i) => heroStatRow(s, i)).join('');
}

function heroStatRow(s, i) {
    return `<div class="cm-row" id="hero-stat-${i}">
        <input class="form-input" placeholder="Số (vd: 20+)" value="${s.number}" data-field="number" data-index="${i}">
        <input class="form-input" placeholder="Nhãn" value="${s.label}" data-field="label" data-index="${i}">
        <button class="btn-icon btn-danger" onclick="removeHeroStat(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
    </div>`;
}

window.removeHeroStat = function(i) {
    document.getElementById(`hero-stat-${i}`)?.remove();
};

window.addHeroStat = function() {
    const list = document.getElementById('hero-stats-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = heroStatRow({ number: '', label: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.saveHero = async function() {
    cmLoading('hero', true);
    try {
        const subtitle = document.getElementById('hero-subtitle').value.trim();
        const rows = document.querySelectorAll('#hero-stats-list .cm-row');
        const stats = Array.from(rows).map(row => ({
            number: row.querySelector('[data-field="number"]').value.trim(),
            label:  row.querySelector('[data-field="label"]').value.trim(),
        }));
        _currentContent.hero = { subtitle, stats };
        await saveContent(_currentContent, "hero & so lieu");
        showCmStatus('hero', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('hero', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('hero', false);
    }
};

// ============================
// SECTION: IMPACT
// ============================

function populateImpact(impact) {
    const container = document.getElementById('impact-list');
    if (!container) return;
    container.innerHTML = (impact || []).map((item, i) => `
        <div class="cm-row" id="impact-item-${i}">
            <input class="form-input" type="number" placeholder="Con số" value="${item.count}" data-field="count" data-index="${i}">
            <input class="form-input" placeholder="Nhãn (vd: Suất Học Bổng)" value="${item.label}" data-field="label" data-index="${i}">
            <button class="btn-icon btn-danger" onclick="removeImpactItem(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

window.removeImpactItem = function(i) { document.getElementById(`impact-item-${i}`)?.remove(); };

window.addImpactItem = function() {
    const list = document.getElementById('impact-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = `<div class="cm-row" id="impact-item-${i}">
        <input class="form-input" type="number" placeholder="Con số" value="" data-field="count" data-index="${i}">
        <input class="form-input" placeholder="Nhãn" value="" data-field="label" data-index="${i}">
        <button class="btn-icon btn-danger" onclick="removeImpactItem(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
    </div>`;
    list.appendChild(div.firstElementChild);
};

window.saveImpact = async function() {
    cmLoading('impact', true);
    try {
        const rows = document.querySelectorAll('#impact-list .cm-row');
        _currentContent.impact = Array.from(rows).map(row => ({
            count: parseInt(row.querySelector('[data-field="count"]').value) || 0,
            label: row.querySelector('[data-field="label"]').value.trim(),
        }));
        await saveContent(_currentContent, "thanh qua");
        showCmStatus('impact', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('impact', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('impact', false);
    }
};

// ============================
// SECTION: VOLUNTEER
// ============================

function populateVolunteer(vol) {
    if (!vol) return;
    document.getElementById('vol-subtitle').value   = vol.subtitle  || '';
    document.getElementById('vol-form-desc').value  = vol.formDesc  || '';
    document.getElementById('vol-form-link').value  = vol.formLink  || '';
    const list = document.getElementById('vol-benefits-list');
    if (list) list.innerHTML = (vol.benefits || []).map((b, i) => benefitRow(b, i)).join('');
}

function benefitRow(text, i) {
    return `<div class="cm-row" id="vol-benefit-${i}">
        <input class="form-input" placeholder="Quyền lợi..." value="${text}" data-index="${i}">
        <button class="btn-icon btn-danger" onclick="removeVolBenefit(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
    </div>`;
}

window.removeVolBenefit = function(i) { document.getElementById(`vol-benefit-${i}`)?.remove(); };

window.addVolBenefit = function() {
    const list = document.getElementById('vol-benefits-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = benefitRow('', i);
    list.appendChild(div.firstElementChild);
};

window.saveVolunteer = async function() {
    cmLoading('volunteer', true);
    try {
        const rows = document.querySelectorAll('#vol-benefits-list .cm-row');
        _currentContent.volunteer = {
            subtitle: document.getElementById('vol-subtitle').value.trim(),
            benefits: Array.from(rows).map(r => r.querySelector('input').value.trim()).filter(Boolean),
            formDesc: document.getElementById('vol-form-desc').value.trim(),
            formLink: document.getElementById('vol-form-link').value.trim(),
        };
        await saveContent(_currentContent, "tinh nguyen");
        showCmStatus('volunteer', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('volunteer', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('volunteer', false);
    }
};

// ============================
// SECTION: FAQ
// ============================

function populateFaq(faq) {
    const list = document.getElementById('faq-list');
    if (!list) return;
    list.innerHTML = (faq || []).map((item, i) => faqRow(item, i)).join('');
}

function faqRow(item, i) {
    return `<div class="cm-card" id="faq-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">Câu hỏi ${i + 1}</span>
            <button class="btn-icon btn-danger" onclick="removeFaqItem(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-group">
            <label>Câu hỏi</label>
            <input class="form-input" placeholder="Câu hỏi..." value="${escHtml(item.q)}" data-field="q">
        </div>
        <div class="form-group">
            <label>Câu trả lời</label>
            <textarea class="form-input" rows="3" placeholder="Câu trả lời..." data-field="a">${escHtml(item.a)}</textarea>
        </div>
    </div>`;
}

window.removeFaqItem = function(i) { document.getElementById(`faq-item-${i}`)?.remove(); };

window.addFaqItem = function() {
    const list = document.getElementById('faq-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = faqRow({ q: '', a: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.saveFaq = async function() {
    cmLoading('faq', true);
    try {
        const cards = document.querySelectorAll('#faq-list .cm-card');
        _currentContent.faq = Array.from(cards).map(card => ({
            q: card.querySelector('[data-field="q"]').value.trim(),
            a: card.querySelector('[data-field="a"]').value.trim(),
        })).filter(item => item.q);
        await saveContent(_currentContent, "FAQ");
        showCmStatus('faq', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('faq', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('faq', false);
    }
};

// ============================
// SECTION: DONATION
// ============================

function populateDonation(donation) {
    if (!donation) return;
    const t = donation.transfer || {};
    const m = donation.materials || {};
    document.getElementById('don-account').value  = t.accountNumber || '';
    document.getElementById('don-bank').value     = t.bank          || '';
    document.getElementById('don-name').value     = t.accountName   || '';
    document.getElementById('don-content').value  = t.transferContent || '';
    document.getElementById('don-note').value     = t.note          || '';
    document.getElementById('don-qr').value       = t.qrImage       || '';
    document.getElementById('don-hotline1').value = (m.hotlines || [])[0] || '';
    document.getElementById('don-hotline2').value = (m.hotlines || [])[1] || '';

    const itemsList = document.getElementById('don-items-list');
    if (itemsList) {
        itemsList.innerHTML = (m.items || []).map((item, i) => donItemRow(item, i)).join('');
    }
}

function donItemRow(item, i) {
    return `<div class="cm-row" id="don-item-${i}">
        <input class="form-input" placeholder="Tên đồ vật" value="${escHtml(item.name)}" data-field="name">
        <input class="form-input" placeholder="Đường dẫn ảnh" value="${escHtml(item.image)}" data-field="image">
        <button class="btn-icon btn-danger" onclick="removeDonItem(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
    </div>`;
}

window.removeDonItem = function(i) { document.getElementById(`don-item-${i}`)?.remove(); };

window.addDonItem = function() {
    const list = document.getElementById('don-items-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = donItemRow({ name: '', image: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.saveDonation = async function() {
    cmLoading('donation', true);
    try {
        const itemRows = document.querySelectorAll('#don-items-list .cm-row');
        _currentContent.donation = {
            transfer: {
                accountNumber:   document.getElementById('don-account').value.trim(),
                bank:            document.getElementById('don-bank').value.trim(),
                accountName:     document.getElementById('don-name').value.trim(),
                transferContent: document.getElementById('don-content').value.trim(),
                note:            document.getElementById('don-note').value.trim(),
                qrImage:         document.getElementById('don-qr').value.trim(),
            },
            materials: {
                description: _currentContent.donation?.materials?.description || '',
                items: Array.from(itemRows).map(r => ({
                    name:  r.querySelector('[data-field="name"]').value.trim(),
                    image: r.querySelector('[data-field="image"]').value.trim(),
                })).filter(i => i.name),
                hotlines: [
                    document.getElementById('don-hotline1').value.trim(),
                    document.getElementById('don-hotline2').value.trim(),
                ].filter(Boolean),
            },
        };
        await saveContent(_currentContent, "quyen gop");
        showCmStatus('donation', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('donation', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('donation', false);
    }
};

// ============================
// SECTION: FOOTER
// ============================

function populateFooter(footer) {
    if (!footer) return;
    document.getElementById('footer-about').value    = footer.about     || '';
    document.getElementById('footer-email').value    = footer.email     || '';
    document.getElementById('footer-hours').value    = footer.hours     || '';
    document.getElementById('footer-fb').value       = footer.facebook  || '';
    document.getElementById('footer-tt').value       = footer.tiktok    || '';
    document.getElementById('footer-cr').value       = footer.copyright || '';
    document.getElementById('footer-h1').value       = (footer.hotlines || [])[0] || '';
    document.getElementById('footer-h2').value       = (footer.hotlines || [])[1] || '';
}

window.saveFooter = async function() {
    cmLoading('footer', true);
    try {
        _currentContent.footer = {
            about:     document.getElementById('footer-about').value.trim(),
            email:     document.getElementById('footer-email').value.trim(),
            hours:     document.getElementById('footer-hours').value.trim(),
            facebook:  document.getElementById('footer-fb').value.trim(),
            tiktok:    document.getElementById('footer-tt').value.trim(),
            copyright: document.getElementById('footer-cr').value.trim(),
            hotlines: [
                document.getElementById('footer-h1').value.trim(),
                document.getElementById('footer-h2').value.trim(),
            ].filter(Boolean),
        };
        await saveContent(_currentContent, "footer");
        showCmStatus('footer', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('footer', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('footer', false);
    }
};

// ============================
// SECTION: MEMBERS
// ============================

function populateMembers(members) {
    const list = document.getElementById('members-list');
    if (!list) return;
    list.innerHTML = (members || []).map((m, i) => memberCard(m, i)).join('');
}

function memberCard(m, i) {
    return `<div class="cm-card" id="member-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">${escHtml(m.name || 'Thành viên ' + (i+1))}</span>
            <button class="btn-icon btn-danger" onclick="removeMember(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Họ tên</label>
                <input class="form-input" value="${escHtml(m.name)}" data-field="name">
            </div>
            <div class="form-group">
                <label>Vai trò</label>
                <input class="form-input" placeholder="Founder / Co-Founder..." value="${escHtml(m.role)}" data-field="role">
            </div>
        </div>
        <div class="form-group">
            <label>Giới thiệu</label>
            <textarea class="form-input" rows="2" data-field="info">${escHtml(m.info)}</textarea>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Sở thích</label>
                <input class="form-input" value="${escHtml(m.hobbies)}" data-field="hobbies">
            </div>
            <div class="form-group">
                <label>Câu nói yêu thích</label>
                <input class="form-input" value="${escHtml(m.quote)}" data-field="quote">
            </div>
        </div>
        <div class="form-group">
            <label>Ảnh đại diện</label>
            <div class="cm-img-row">
                <input class="form-input" placeholder="assets/images/members/..." value="${escHtml(m.image)}" data-field="image" id="member-img-path-${i}">
                <label class="btn btn-secondary btn-sm cm-upload-btn" title="Upload ảnh mới">
                    <i class="fas fa-upload"></i>
                    <input type="file" accept="image/*" style="display:none" onchange="uploadMemberImg(event, ${i})">
                </label>
            </div>
            ${m.image ? `<img src="https://volunteer-website-self.vercel.app/${m.image}" class="cm-img-preview" onerror="this.style.display='none'">` : ''}
        </div>
    </div>`;
}

window.removeMember = function(i) { document.getElementById(`member-item-${i}`)?.remove(); };

window.addMember = function() {
    const list = document.getElementById('members-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = memberCard({ name: '', role: '', info: '', hobbies: '', quote: '', image: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.uploadMemberImg = async function(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const safeName = `member_${Date.now()}.${ext}`;
    const destPath = `frontend/website/assets/images/members/${safeName}`;
    try {
        const res = await uploadImage(file, destPath, 'member');
        document.getElementById(`member-img-path-${idx}`).value = res.path;
        showCmStatus('members', `✅ Ảnh đã upload: ${res.path}`);
    } catch (e) {
        showCmStatus('members', '❌ Upload thất bại: ' + e.message, 'error');
    }
};

window.saveMembers = async function() {
    cmLoading('members', true);
    try {
        const cards = document.querySelectorAll('#members-list .cm-card');
        _currentContent.members = Array.from(cards).map(card => ({
            name:    card.querySelector('[data-field="name"]').value.trim(),
            role:    card.querySelector('[data-field="role"]').value.trim(),
            info:    card.querySelector('[data-field="info"]').value.trim(),
            hobbies: card.querySelector('[data-field="hobbies"]').value.trim(),
            quote:   card.querySelector('[data-field="quote"]').value.trim(),
            image:   card.querySelector('[data-field="image"]').value.trim(),
        })).filter(m => m.name);
        await saveContent(_currentContent, "thanh vien");
        showCmStatus('members', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('members', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('members', false);
    }
};

// ============================
// SECTION: TIMELINE
// ============================

function populateTimeline(timeline) {
    const list = document.getElementById('timeline-list');
    if (!list) return;
    list.innerHTML = (timeline || []).map((item, i) => timelineCard(item, i)).join('');
}

function timelineCard(item, i) {
    const statusOptions = ['completed', 'upcoming', 'planning'].map(s =>
        `<option value="${s}" ${item.status === s ? 'selected' : ''}>${s}</option>`
    ).join('');
    return `<div class="cm-card" id="timeline-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">${escHtml(item.title || 'Mốc ' + (i+1))}</span>
            <button class="btn-icon btn-danger" onclick="removeTimelineItem(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Tiêu đề</label>
                <input class="form-input" value="${escHtml(item.title)}" data-field="title">
            </div>
            <div class="form-group">
                <label>Ngày / Thời gian</label>
                <input class="form-input" placeholder="Tháng 3, 2025" value="${escHtml(item.date)}" data-field="date">
            </div>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Địa điểm</label>
                <input class="form-input" placeholder="📍 Bắc Kạn" value="${escHtml(item.location)}" data-field="location">
            </div>
            <div class="form-group">
                <label>Trạng thái</label>
                <select class="form-input" data-field="status">${statusOptions}</select>
            </div>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Icon (emoji)</label>
                <input class="form-input" value="${escHtml(item.icon || '')}" data-field="icon">
            </div>
            <div class="form-group">
                <label>Ảnh đại diện (path)</label>
                <input class="form-input" placeholder="assets/images/projects/..." value="${escHtml(item.image || '')}" data-field="image">
            </div>
        </div>
        <div class="form-group">
            <label>Mô tả ngắn</label>
            <textarea class="form-input" rows="2" data-field="desc">${escHtml(item.desc)}</textarea>
        </div>
    </div>`;
}

window.removeTimelineItem = function(i) { document.getElementById(`timeline-item-${i}`)?.remove(); };

window.addTimelineItem = function() {
    const list = document.getElementById('timeline-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = timelineCard({ title: '', date: '', location: '', status: 'planning', icon: '🌟', image: null, stats: null, desc: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.saveTimeline = async function() {
    cmLoading('timeline', true);
    try {
        const cards = document.querySelectorAll('#timeline-list .cm-card');
        _currentContent.timeline = Array.from(cards).map(card => ({
            title:    card.querySelector('[data-field="title"]').value.trim(),
            date:     card.querySelector('[data-field="date"]').value.trim(),
            location: card.querySelector('[data-field="location"]').value.trim(),
            status:   card.querySelector('[data-field="status"]').value,
            icon:     card.querySelector('[data-field="icon"]').value.trim(),
            image:    card.querySelector('[data-field="image"]').value.trim() || null,
            stats:    null,
            desc:     card.querySelector('[data-field="desc"]').value.trim(),
        })).filter(t => t.title);
        await saveContent(_currentContent, "hanh trinh");
        showCmStatus('timeline', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('timeline', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('timeline', false);
    }
};

// ============================
// SECTION: ACTIVITIES
// ============================

function populateActivities(activities) {
    const list = document.getElementById('activities-list');
    if (!list) return;
    list.innerHTML = (activities || []).map((a, i) => activityCard(a, i)).join('');
    (activities || []).forEach((_, i) => initMiniEditor(i));
}

function activityCard(a, i) {
    const statusOptions = ['completed', 'planning', 'upcoming'].map(s =>
        `<option value="${s}" ${a.status === s ? 'selected' : ''}>${s}</option>`
    ).join('');
    const stats = (a.stats || []).map((s, si) =>
        `<div class="cm-row" id="act-stat-${i}-${si}">
            <input class="form-input" placeholder="Giá trị (50+)" value="${escHtml(s.value)}" data-field="value">
            <input class="form-input" placeholder="Nhãn (Em nhỏ)" value="${escHtml(s.label)}" data-field="label">
            <button class="btn-icon btn-danger" onclick="removeActStat(${i},${si})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>`
    ).join('');
    return `<div class="cm-card" id="activity-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">${escHtml(a.title || 'Hoạt động ' + (i+1))}</span>
            <button class="btn-icon btn-danger" onclick="removeActivity(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>ID (duy nhất, không dấu)</label>
                <input class="form-input" placeholder="backan" value="${escHtml(a.id)}" data-field="id">
            </div>
            <div class="form-group">
                <label>Tiêu đề</label>
                <input class="form-input" value="${escHtml(a.title)}" data-field="title">
            </div>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Địa điểm</label>
                <input class="form-input" value="${escHtml(a.location)}" data-field="location">
            </div>
            <div class="form-group">
                <label>Ngày</label>
                <input class="form-input" placeholder="15–16/03/2025" value="${escHtml(a.date)}" data-field="date">
            </div>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Trạng thái</label>
                <select class="form-input" data-field="status">${statusOptions}</select>
            </div>
            <div class="form-group">
                <label>Thư mục ảnh cảm nhận TNV</label>
                <input class="form-input" placeholder="assets/images/feelings/backan/" value="${escHtml(a.feelingsFolder || '')}" data-field="feelingsFolder">
            </div>
        </div>
        <div class="form-group">
            <label>Ảnh bìa dự án</label>
            <div class="cm-img-row">
                <input class="form-input" placeholder="assets/images/projects/..." value="${escHtml(a.image || '')}" data-field="image" id="act-img-path-${i}">
                <label class="btn btn-secondary btn-sm cm-upload-btn" title="Upload ảnh bìa">
                    <i class="fas fa-upload"></i>
                    <input type="file" accept="image/*" style="display:none" onchange="uploadActivityImg(event, ${i})">
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>Mô tả ngắn (card)</label>
            <textarea class="form-input" rows="2" data-field="shortDesc">${escHtml(a.shortDesc)}</textarea>
        </div>
        <div class="form-group">
            <label>Mô tả đầy đủ (trang chi tiết)</label>
            <div class="mini-editor" id="mini-editor-${i}" data-init-html="${escAttr(a.fullDesc || '')}">
                <div class="mini-editor-toolbar">
                    <button type="button" onclick="miniEditorExec(${i},'bold')" title="In đậm"><i class="fas fa-bold"></i></button>
                    <button type="button" onclick="miniEditorExec(${i},'italic')" title="In nghiêng"><i class="fas fa-italic"></i></button>
                    <button type="button" onclick="miniEditorExec(${i},'underline')" title="Gạch chân"><i class="fas fa-underline"></i></button>
                    <span class="mini-editor-sep"></span>
                    <button type="button" onclick="miniEditorExec(${i},'insertUnorderedList')" title="Danh sách chấm"><i class="fas fa-list-ul"></i></button>
                    <button type="button" onclick="miniEditorExec(${i},'insertOrderedList')" title="Danh sách số"><i class="fas fa-list-ol"></i></button>
                    <span class="mini-editor-sep"></span>
                    <button type="button" onclick="miniEditorExec(${i},'removeFormat')" title="Xóa định dạng"><i class="fas fa-eraser"></i></button>
                </div>
                <div class="mini-editor-content" contenteditable="true" data-field="fullDesc" spellcheck="false"
                    style="min-height:140px;padding:12px;outline:none;line-height:1.7;font-size:14px"></div>
            </div>
        </div>
        <div class="form-group">
            <label>Thống kê nhanh</label>
            <div id="act-stats-${i}" class="cm-sub-list">${stats}</div>
            <button class="btn btn-secondary btn-sm" onclick="addActStat(${i})" style="margin-top:8px">
                <i class="fas fa-plus"></i> Thêm stat
            </button>
        </div>
        <div class="form-group">
            <label>Cảm nhận tình nguyện viên — <span id="act-feelings-count-${i}">${(a.feelings||[]).length} card</span></label>
            <div id="act-feelings-list-${i}" class="cm-sub-list">
                ${(a.feelings || []).map((f, fi) => actFeelingCard(f, i, fi)).join('')}
            </div>
            <button class="btn btn-secondary btn-sm" onclick="addActFeeling(${i})" style="margin-top:8px">
                <i class="fas fa-plus"></i> Thêm card cảm nhận
            </button>
        </div>
    </div>`;
}

window.removeActivity = function(i) { document.getElementById(`activity-item-${i}`)?.remove(); };

window.addActivity = function() {
    const list = document.getElementById('activities-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = activityCard({ id: '', title: '', location: '', date: '', status: 'planning', image: '', shortDesc: '', fullDesc: '', stats: [], feelingsFolder: '', gallery: [] }, i);
    list.appendChild(div.firstElementChild);
    initMiniEditor(i);
};

window.removeActStat = function(actIdx, statIdx) { document.getElementById(`act-stat-${actIdx}-${statIdx}`)?.remove(); };

window.addActStat = function(actIdx) {
    const list = document.getElementById(`act-stats-${actIdx}`);
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = `<div class="cm-row" id="act-stat-${actIdx}-${i}">
        <input class="form-input" placeholder="Giá trị (50+)" value="" data-field="value">
        <input class="form-input" placeholder="Nhãn (Em nhỏ)" value="" data-field="label">
        <button class="btn-icon btn-danger" onclick="removeActStat(${actIdx},${i})" title="Xóa"><i class="fas fa-trash"></i></button>
    </div>`;
    list.appendChild(div.firstElementChild);
};

window.uploadActivityImg = async function(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const card = document.getElementById(`activity-item-${idx}`);
    const idVal = card.querySelector('[data-field="id"]').value.trim() || `activity_${idx}`;
    const destPath = `frontend/website/assets/images/projects/${idVal}.jpg`;
    try {
        const res = await uploadImage(file, destPath, 'gallery');
        document.getElementById(`act-img-path-${idx}`).value = res.path;
        showCmStatus('activities', `✅ Ảnh đã upload: ${res.path}`);
    } catch (e) {
        showCmStatus('activities', '❌ Upload thất bại: ' + e.message, 'error');
    }
};

window.uploadFeelingsImages = async function(actIdx) {
    const input = document.getElementById(`act-feelings-input-${actIdx}`);
    const statusEl = document.getElementById(`act-feelings-status-${actIdx}`);
    if (!input.files.length) { statusEl.textContent = 'Chọn ảnh trước'; return; }

    const card = document.getElementById(`activity-item-${actIdx}`);
    const folderPath = card.querySelector('[data-field="feelingsFolder"]').value.trim();
    if (!folderPath) { statusEl.textContent = 'Điền thư mục feelings trước'; return; }

    statusEl.textContent = `Đang upload ${input.files.length} ảnh...`;
    let ok = 0;
    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const destPath = `frontend/website/${folderPath}${i + 1}.jpg`;
        try {
            await uploadImage(file, destPath, 'feelings');
            ok++;
            statusEl.textContent = `Đã upload ${ok}/${input.files.length}...`;
        } catch (e) {
            statusEl.textContent = `Lỗi ảnh ${i+1}: ${e.message}`;
        }
    }
    statusEl.textContent = `✅ Xong! ${ok} ảnh đã upload.`;
};

window.saveActivities = async function() {
    cmLoading('activities', true);
    try {
        const cards = document.querySelectorAll('#activities-list .cm-card');
        _currentContent.activities = Array.from(cards).map((card, ci) => {
            const statRows     = card.querySelectorAll('.cm-sub-list > .cm-row');
            const feelingCards = card.querySelectorAll(`#act-feelings-list-${ci} .cm-card`);
            const editorEl = card.querySelector('.mini-editor-content');
            const fullDesc = editorEl ? editorEl.innerHTML.replace(/<br\s*\/?>/gi, '').trim() : '';
            return {
                id:            card.querySelector('[data-field="id"]').value.trim(),
                title:         card.querySelector('[data-field="title"]').value.trim(),
                location:      card.querySelector('[data-field="location"]').value.trim(),
                date:          card.querySelector('[data-field="date"]').value.trim(),
                status:        card.querySelector('[data-field="status"]').value,
                image:         card.querySelector('[data-field="image"]').value.trim(),
                shortDesc:     card.querySelector('[data-field="shortDesc"]').value.trim(),
                fullDesc,
                feelingsFolder: card.querySelector('[data-field="feelingsFolder"]').value.trim(),
                gallery: [],
                feelings: Array.from(feelingCards).map(fc => ({
                    image: fc.querySelector('[data-field="image"]').value.trim(),
                })).filter(f => f.image),
                stats: Array.from(statRows).map(r => ({
                    value: r.querySelector('[data-field="value"]').value.trim(),
                    label: r.querySelector('[data-field="label"]').value.trim(),
                })).filter(s => s.value),
            };
        }).filter(a => a.id);
        await saveContent(_currentContent, "hoat dong & du an");
        showCmStatus('activities', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('activities', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('activities', false);
    }
};

// ============================
// SECTION: PARTNERS
// ============================

function populatePartners(partners) {
    const list = document.getElementById('partners-list');
    if (!list) return;
    list.innerHTML = (partners || []).map((p, i) => partnerCard(p, i)).join('');
}

function partnerCard(p, i) {
    return `<div class="cm-card" id="partner-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">${escHtml(p.name || 'Đối tác ' + (i+1))}</span>
            <button class="btn-icon btn-danger" onclick="removePartner(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-group">
            <label>Tên tổ chức / đối tác</label>
            <input class="form-input" value="${escHtml(p.name)}" data-field="name">
        </div>
        <div class="form-group">
            <label>Mô tả</label>
            <textarea class="form-input" rows="2" data-field="desc">${escHtml(p.desc)}</textarea>
        </div>
        <div class="form-group">
            <label>Logo</label>
            <div class="cm-img-row">
                <input class="form-input" placeholder="assets/images/sponsors/..." value="${escHtml(p.logo)}" data-field="logo" id="partner-logo-path-${i}">
                <label class="btn btn-secondary btn-sm cm-upload-btn" title="Upload logo">
                    <i class="fas fa-upload"></i>
                    <input type="file" accept="image/*" style="display:none" onchange="uploadPartnerLogo(event, ${i})">
                </label>
            </div>
            ${p.logo ? `<img src="https://volunteer-website-self.vercel.app/${p.logo}" class="cm-img-preview" onerror="this.style.display='none'">` : ''}
        </div>
    </div>`;
}

window.removePartner = function(i) { document.getElementById(`partner-item-${i}`)?.remove(); };

window.addPartner = function() {
    const list = document.getElementById('partners-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = partnerCard({ name: '', desc: '', logo: '' }, i);
    list.appendChild(div.firstElementChild);
};

window.uploadPartnerLogo = async function(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const safeName = `sponsor_${Date.now()}.${ext}`;
    const destPath = `frontend/website/assets/images/sponsors/${safeName}`;
    try {
        const res = await uploadImage(file, destPath, 'gallery');
        document.getElementById(`partner-logo-path-${idx}`).value = res.path;
        showCmStatus('partners', `✅ Logo đã upload: ${res.path}`);
    } catch (e) {
        showCmStatus('partners', '❌ Upload thất bại: ' + e.message, 'error');
    }
};

window.savePartners = async function() {
    cmLoading('partners', true);
    try {
        const cards = document.querySelectorAll('#partners-list .cm-card');
        _currentContent.partners = Array.from(cards).map(card => ({
            name: card.querySelector('[data-field="name"]').value.trim(),
            desc: card.querySelector('[data-field="desc"]').value.trim(),
            logo: card.querySelector('[data-field="logo"]').value.trim(),
        })).filter(p => p.name);
        await saveContent(_currentContent, "doi tac");
        showCmStatus('partners', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('partners', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('partners', false);
    }
};

// ============================
// SECTION: MISSION
// ============================

function populateMission(mission) {
    const list = document.getElementById('mission-list');
    if (!list || !mission?.cards) return;
    list.innerHTML = mission.cards.map((card, i) => missionCard(card, i)).join('');
}

function missionCard(card, i) {
    return `<div class="cm-card" id="mission-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">${card.icon || ''} ${escHtml(card.title || 'Card ' + (i+1))}</span>
        </div>
        <div class="cm-grid-2">
            <div class="form-group">
                <label>Icon (emoji)</label>
                <input class="form-input" value="${escHtml(card.icon || '')}" data-field="icon">
            </div>
            <div class="form-group">
                <label>Tiêu đề</label>
                <input class="form-input" value="${escHtml(card.title)}" data-field="title">
            </div>
        </div>
        <div class="form-group">
            <label>Mô tả mặt trước card</label>
            <textarea class="form-input" rows="2" data-field="frontDesc">${escHtml(card.frontDesc)}</textarea>
        </div>
        <div class="form-group">
            <label>Mô tả mặt sau card</label>
            <textarea class="form-input" rows="2" data-field="backDesc">${escHtml(card.backDesc)}</textarea>
        </div>
        <div class="cm-modal-sections" id="mission-modal-${i}">
            ${(card.modal?.sections || []).map((s, si) => missionSectionRow(s, i, si)).join('')}
        </div>
    </div>`;
}

function missionSectionRow(s, cardIdx, sectionIdx) {
    return `<div class="cm-card cm-card--nested" id="mission-section-${cardIdx}-${sectionIdx}">
        <div class="form-group">
            <label>Tiêu đề phần modal ${sectionIdx + 1}</label>
            <input class="form-input" value="${escHtml(s.heading)}" data-field="heading">
        </div>
        ${s.quote ? `
        <div class="form-group">
            <label>Quote</label>
            <textarea class="form-input" rows="2" data-field="quote-text">${escHtml(s.quote.text)}</textarea>
            <input class="form-input" placeholder="Trích dẫn từ..." value="${escHtml(s.quote.cite)}" data-field="quote-cite" style="margin-top:8px">
        </div>` : `
        <div class="form-group">
            <label>Nội dung (HTML)</label>
            <textarea class="form-input" rows="3" data-field="content">${escHtml(s.content || '')}</textarea>
        </div>`}
    </div>`;
}

window.saveMission = async function() {
    cmLoading('mission', true);
    try {
        const cards = document.querySelectorAll('#mission-list > .cm-card');
        const missionCards = Array.from(cards).map((card, i) => {
            const sectionEls = card.querySelectorAll('.cm-card--nested');
            const sections = Array.from(sectionEls).map(s => {
                const quoteText = s.querySelector('[data-field="quote-text"]');
                if (quoteText) {
                    return {
                        heading: s.querySelector('[data-field="heading"]').value.trim(),
                        quote: {
                            text: quoteText.value.trim(),
                            cite: s.querySelector('[data-field="quote-cite"]').value.trim(),
                        }
                    };
                }
                return {
                    heading: s.querySelector('[data-field="heading"]').value.trim(),
                    content: s.querySelector('[data-field="content"]').value.trim(),
                };
            });
            return {
                key:       (_currentContent.mission?.cards?.[i]?.key) || `card${i}`,
                icon:      card.querySelector('[data-field="icon"]').value.trim(),
                title:     card.querySelector('[data-field="title"]').value.trim(),
                frontDesc: card.querySelector('[data-field="frontDesc"]').value.trim(),
                backDesc:  card.querySelector('[data-field="backDesc"]').value.trim(),
                modal: { sections },
            };
        });
        _currentContent.mission = { cards: missionCards };
        await saveContent(_currentContent, "su menh");
        showCmStatus('mission', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
    } catch (e) {
        showCmStatus('mission', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('mission', false);
    }
};

// ============================
// SECTION: TESTIMONIALS
// ============================

const VERCEL_BASE = WEBSITE_BASE;

function populateTestimonials(testimonials) {
    const list = document.getElementById('testimonials-list');
    if (!list) return;
    list.innerHTML = (testimonials || []).map((t, i) => testimonialCard(t, i)).join('');
    updateTestimonialsCount(testimonials?.length || 0);
}

function updateTestimonialsCount(n) {
    const el = document.getElementById('testimonials-count');
    if (el) el.textContent = `${n} card`;
}

function testimonialCard(t, i) {
    const imgSrc = t.image ? `${VERCEL_BASE}/${t.image}` : '';
    return `<div class="cm-card testimonial-admin-card" id="testimonial-item-${i}">
        <div class="cm-card-header">
            <span class="cm-card-label">Ảnh ${i + 1}</span>
            <button class="btn-icon btn-danger" onclick="removeTestimonial(${i})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 0">
            ${imgSrc
                ? `<img src="${imgSrc}" class="testimonial-admin-preview" onerror="this.src='';this.style.display='none'" alt="preview">`
                : `<div class="testimonial-admin-no-img"><i class="fas fa-image"></i><span>Chưa có ảnh</span></div>`
            }
            <label class="btn btn-secondary btn-sm cm-upload-btn" style="justify-content:center">
                <i class="fas fa-upload"></i> Đổi ảnh
                <input type="file" accept="image/*" style="display:none" onchange="uploadTestimonialImg(event,${i})">
            </label>
            <input class="form-input" style="font-size:12px" placeholder="assets/images/feelings/..." value="${escHtml(t.image || '')}" data-field="image" id="testimonial-img-path-${i}">
        </div>
    </div>`;
}

window.removeTestimonial = function(i) {
    document.getElementById(`testimonial-item-${i}`)?.remove();
    updateTestimonialsCount(document.querySelectorAll('#testimonials-list .cm-card').length);
};

window.addTestimonial = function() {
    const list = document.getElementById('testimonials-list');
    const i = list.children.length;
    const div = document.createElement('div');
    div.innerHTML = testimonialCard({ image: '' }, i);
    list.appendChild(div.firstElementChild);
    updateTestimonialsCount(i + 1);
};

window.uploadTestimonialImg = async function(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    const nextNum = idx + 1;
    const destPath = `frontend/website/assets/images/feelings/${nextNum}.jpg`;
    try {
        showCmStatus('testimonials', `Đang upload ảnh...`, 'info');
        const res = await uploadImage(file, destPath, 'feelings');
        document.getElementById(`testimonial-img-path-${idx}`).value = res.path;
        // Refresh preview
        const card = document.getElementById(`testimonial-item-${idx}`);
        const preview = card.querySelector('.testimonial-admin-preview');
        const noImg   = card.querySelector('.testimonial-admin-no-img');
        if (preview) {
            preview.src = `${VERCEL_BASE}/${res.path}?t=${Date.now()}`;
            preview.style.display = '';
        } else if (noImg) {
            noImg.outerHTML = `<img src="${VERCEL_BASE}/${res.path}" class="testimonial-admin-preview" alt="preview">`;
        }
        showCmStatus('testimonials', `✅ Ảnh đã upload: ${res.path}`);
    } catch (e) {
        showCmStatus('testimonials', '❌ Upload thất bại: ' + e.message, 'error');
    }
};

window.saveTestimonials = async function() {
    cmLoading('testimonials', true);
    try {
        const cards = document.querySelectorAll('#testimonials-list .cm-card');
        _currentContent.testimonials = Array.from(cards).map(card => ({
            image: card.querySelector('[data-field="image"]').value.trim(),
        })).filter(t => t.image);
        await saveContent(_currentContent, "cam nhan TNV");
        showCmStatus('testimonials', '✅ Đã lưu! Web sẽ cập nhật sau ~1-2 phút.');
        updateTestimonialsCount(_currentContent.testimonials.length);
    } catch (e) {
        showCmStatus('testimonials', '❌ Lỗi: ' + e.message, 'error');
    } finally {
        cmLoading('testimonials', false);
    }
};

// Per-activity feelings management
function renderActivityFeelings(actIdx, feelings) {
    const container = document.getElementById(`act-feelings-list-${actIdx}`);
    if (!container) return;
    container.innerHTML = (feelings || []).map((f, fi) => actFeelingCard(f, actIdx, fi)).join('');
}

function actFeelingCard(f, actIdx, feelIdx) {
    const imgSrc = f.image ? `${VERCEL_BASE}/${f.image}` : '';
    return `<div class="cm-card testimonial-admin-card cm-card--nested" id="act-feeling-${actIdx}-${feelIdx}">
        <div class="cm-card-header">
            <span class="cm-card-label">Ảnh ${feelIdx + 1}</span>
            <button class="btn-icon btn-danger" onclick="removeActFeeling(${actIdx},${feelIdx})" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 0">
            ${imgSrc
                ? `<img src="${imgSrc}" class="testimonial-admin-preview" onerror="this.style.display='none'" alt="preview">`
                : `<div class="testimonial-admin-no-img"><i class="fas fa-image"></i><span>Chưa có ảnh</span></div>`
            }
            <label class="btn btn-secondary btn-sm cm-upload-btn" style="justify-content:center">
                <i class="fas fa-upload"></i> Upload ảnh
                <input type="file" accept="image/*" style="display:none" onchange="uploadActFeelingImg(event,${actIdx},${feelIdx})">
            </label>
            <input class="form-input" style="font-size:12px" placeholder="assets/images/feelings/..." value="${escHtml(f.image || '')}" data-field="image" id="act-feeling-img-${actIdx}-${feelIdx}">
        </div>
    </div>`;
}

window.removeActFeeling = function(actIdx, feelIdx) {
    document.getElementById(`act-feeling-${actIdx}-${feelIdx}`)?.remove();
};

window.addActFeeling = function(actIdx) {
    const container = document.getElementById(`act-feelings-list-${actIdx}`);
    if (!container) return;
    const i = container.children.length;
    const div = document.createElement('div');
    div.innerHTML = actFeelingCard({ image: '' }, actIdx, i);
    container.appendChild(div.firstElementChild);
};

window.uploadActFeelingImg = async function(event, actIdx, feelIdx) {
    const file = event.target.files[0];
    if (!file) return;
    const card = document.getElementById(`activity-item-${actIdx}`);
    const folderPath = card?.querySelector('[data-field="feelingsFolder"]')?.value.trim() || '';
    const destPath = folderPath
        ? `frontend/website/${folderPath}${feelIdx + 1}.jpg`
        : `frontend/website/assets/images/feelings/act${actIdx}_${feelIdx + 1}.jpg`;
    try {
        const res = await uploadImage(file, destPath, 'feelings');
        document.getElementById(`act-feeling-img-${actIdx}-${feelIdx}`).value = res.path;
        const preview = document.querySelector(`#act-feeling-${actIdx}-${feelIdx} .testimonial-admin-preview`);
        if (preview) preview.src = `${VERCEL_BASE}/${res.path}?t=${Date.now()}`;
        showCmStatus('activities', `✅ Ảnh đã upload: ${res.path}`);
    } catch (e) {
        showCmStatus('activities', '❌ Upload thất bại: ' + e.message, 'error');
    }
};

