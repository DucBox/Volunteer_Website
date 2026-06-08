// ContentApplier — injects CMS content into static HTML sections
// Covers: hero, volunteer, donation, partners, footer

export function applyContent(c) {
    applyHero(c.hero);
    applyVolunteer(c.volunteer);
    applyDonation(c.donation);
    applyPartners(c.partners);
    applyFooter(c.footer);
}

function applyHero(hero) {
    if (!hero) return;

    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.innerHTML = `<strong>${hero.subtitle}</strong>`;

    const statItems = document.querySelectorAll('.hero-stats .stat-item');
    hero.stats?.forEach((s, i) => {
        if (!statItems[i]) return;
        const num = statItems[i].querySelector('.stat-number');
        const lbl = statItems[i].querySelector('.stat-label');
        if (num) num.textContent = s.number;
        if (lbl) lbl.textContent = s.label;
    });
}

function applyVolunteer(vol) {
    if (!vol) return;

    const subtitle = document.querySelector('.volunteer-section .section-subtitle strong');
    if (subtitle) subtitle.textContent = vol.subtitle;

    const benefitsList = document.querySelector('.volunteer-benefits');
    if (benefitsList && vol.benefits) {
        benefitsList.innerHTML = vol.benefits.map(b => `<li>${b}</li>`).join('');
    }

    const formDesc = document.querySelector('.volunteer-form-desc');
    if (formDesc) formDesc.textContent = vol.formDesc;

    const formLink = document.querySelector('.volunteer-form .btn-primary');
    if (formLink && vol.formLink) formLink.href = vol.formLink;
}

function applyDonation(donation) {
    if (!donation) return;
    const t = donation.transfer;
    const m = donation.materials;

    // Transfer info
    const bankValues = document.querySelectorAll('.bank-info-item .bank-value');
    const bankLabels = ['accountNumber', 'bank', 'transferContent', 'accountName'];
    bankValues.forEach((el, i) => {
        if (t && bankLabels[i]) el.textContent = t[bankLabels[i]];
    });

    const qrImg = document.querySelector('.qr-code-image');
    if (qrImg && t?.qrImage) qrImg.src = t.qrImage;

    const qrLightboxImg = document.querySelector('.qr-lightbox-img');
    if (qrLightboxImg && t?.qrImage) qrLightboxImg.src = t.qrImage;

    const qrLightboxStk = document.querySelector('.qr-lightbox p strong:first-of-type');
    if (qrLightboxStk && t?.accountNumber) {
        // Update lightbox bank details
        const stk  = document.querySelector('.qr-lightbox p:nth-child(2)');
        const bank = document.querySelector('.qr-lightbox p:nth-child(3)');
        const name = document.querySelector('.qr-lightbox p:nth-child(4)');
        if (stk)  stk.innerHTML  = `<strong>STK:</strong> ${t.accountNumber}`;
        if (bank) bank.innerHTML = `<strong>Ngân hàng:</strong> ${t.bank}`;
        if (name) name.innerHTML = `<strong>Chủ TK:</strong> ${t.accountName}`;
    }

    const noteEl = document.querySelector('.donation-disclaimer em');
    if (noteEl && t?.note) noteEl.textContent = t.note;

    // Materials
    const materialsDesc = document.querySelector('.materials-description strong');
    if (materialsDesc && m?.description) materialsDesc.textContent = m.description;

    const materialsGrid = document.querySelector('.materials-grid');
    if (materialsGrid && m?.items) {
        materialsGrid.innerHTML = m.items.map(item => `
            <div class="material-item">
                <div class="material-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="material-image" loading="lazy">
                </div>
                <span class="material-name">${item.name}</span>
            </div>
        `).join('');
    }

    const materialsContact = document.querySelector('.materials-contact');
    if (materialsContact && m?.hotlines) {
        const [h1, h2] = m.hotlines;
        materialsContact.innerHTML = `Liên hệ:
            <a href="tel:${h1}">${formatPhone(h1)}</a>${h2 ? ` hoặc <a href="tel:${h2}">${formatPhone(h2)}</a>` : ''}
            để được hướng dẫn gửi đồ ủng hộ`;
    }
}

function applyPartners(partners) {
    if (!partners?.length) return;
    const grid = document.querySelector('.partners-grid');
    if (!grid) return;

    // Keep the CTA card, replace real partner cards
    const ctaCard = grid.querySelector('.partner-card-cta');
    grid.innerHTML = partners.map(p => `
        <div class="partner-card">
            <div class="partner-logo">
                <img src="${p.logo}" alt="${p.name}" loading="lazy">
            </div>
            <p class="partner-desc">
                <strong>${p.name}</strong><br>${p.desc}
            </p>
        </div>
    `).join('');

    if (ctaCard) grid.appendChild(ctaCard);
}

function applyFooter(footer) {
    if (!footer) return;

    // About text
    document.querySelectorAll('.footer-section p:first-of-type').forEach((el, i) => {
        if (i === 0) el.textContent = footer.about;
    });

    // Social links
    const fbLink = document.querySelector('.social-link[aria-label="Facebook"]');
    if (fbLink && footer.facebook) fbLink.href = footer.facebook;
    const ttLink = document.querySelector('.social-link[aria-label="TikTok"]');
    if (ttLink && footer.tiktok) ttLink.href = footer.tiktok;

    // Contact info
    const contactSection = document.querySelectorAll('.footer-section')[1];
    if (contactSection && footer.hotlines) {
        const [h1, h2] = footer.hotlines;
        contactSection.innerHTML = `
            <h4>Liên Hệ</h4>
            <p>📞 Hotline: <a href="tel:${h1}">${formatPhone(h1)}</a></p>
            ${h2 ? `<p>📞 Hotline: <a href="tel:${h2}">${formatPhone(h2)}</a></p>` : ''}
            <p>✉️ Email: ${footer.email}</p>
            <p>⏰ ${footer.hours}</p>
        `;
    }

    // Copyright
    document.querySelectorAll('.footer-bottom p').forEach(el => {
        el.innerHTML = `&copy; ${footer.copyright}`;
    });
}

function formatPhone(digits) {
    // "0912503111" → "0912 503 111"
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}
