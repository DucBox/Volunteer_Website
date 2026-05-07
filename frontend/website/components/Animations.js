// Animations Component - Scroll reveal with stagger, re-triggers every pass
export class Animations {
    constructor() {
        this.init();
    }

    init() {
        setTimeout(() => this.setupScrollAnimations(), 120);
        this.setupTypewriterEffect();
        this.setupScrollTypewriters();
    }

    setupTypewriterEffect() {
        const title = document.querySelector('.hero-title');
        const subtitle = document.querySelector('.hero-subtitle');
        if (!title || !subtitle) return;

        const titleText = "DỰ ÁN CHO EM";
        const subtitleText = "Hành trình mang yêu thương đến những em nhỏ vùng khó khăn!";
        
        title.textContent = '';
        subtitle.textContent = '';
        subtitle.style.opacity = '1'; // ensure it's visible if it had opacity 0

        // Create a blinking cursor element
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.className = 'typewriter-cursor';

        // Create spans for text to avoid overwriting cursor
        const titleTextSpan = document.createElement('span');
        const subtitleTextSpan = document.createElement('span');
        
        title.appendChild(titleTextSpan);
        subtitle.appendChild(subtitleTextSpan);

        let i = 0;
        let j = 0;

        function typeSubtitle() {
            if (j < subtitleText.length) {
                subtitleTextSpan.textContent += subtitleText.charAt(j);
                j++;
                setTimeout(typeSubtitle, 30);
            } else {
                subtitle.appendChild(cursor);
            }
        }

        function typeTitle() {
            if (i < titleText.length) {
                titleTextSpan.textContent += titleText.charAt(i);
                title.appendChild(cursor);
                i++;
                setTimeout(typeTitle, 80);
            } else {
                // Move cursor to subtitle and start typing subtitle
                cursor.remove();
                subtitle.appendChild(cursor);
                setTimeout(typeSubtitle, 300);
            }
        }

        // Start typing after a short delay
        setTimeout(typeTitle, 500);
    }

    setupScrollTypewriters() {
        const targets = document.querySelectorAll('.section-title, .section-subtitle, .section-desc');
        
        targets.forEach(target => {
            // Check if it already has the class to avoid double-wrapping
            if(target.classList.contains('typewriter-processed')) return;
            target.classList.add('typewriter-processed');

            // Wrap text nodes in spans
            const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null, false);
            const nodesToReplace = [];
            let node;
            while(node = walker.nextNode()) {
                if(node.nodeValue.trim() !== '') {
                    nodesToReplace.push(node);
                }
            }
            
            let charIndex = 0;
            nodesToReplace.forEach(textNode => {
                const text = textNode.nodeValue;
                const fragment = document.createDocumentFragment();
                // Split by spaces but preserve them in the array
                const words = text.split(/(\s+)/);
                
                words.forEach(word => {
                    if (word.trim() === '') {
                        // It's a space or multiple spaces
                        const spaceSpan = document.createElement('span');
                        spaceSpan.innerHTML = word.replace(/ /g, '&nbsp;');
                        spaceSpan.className = 'scroll-typewriter-char';
                        spaceSpan.style.opacity = '0';
                        spaceSpan.style.transition = 'opacity 0.05s ease';
                        fragment.appendChild(spaceSpan);
                    } else {
                        // It's a word. Wrap in inline-block to prevent breaking mid-word
                        const wordSpan = document.createElement('span');
                        wordSpan.style.display = 'inline-block';
                        for(let i=0; i<word.length; i++) {
                            const span = document.createElement('span');
                            span.textContent = word[i];
                            span.className = 'scroll-typewriter-char';
                            span.style.opacity = '0';
                            span.style.transition = 'opacity 0.05s ease';
                            wordSpan.appendChild(span);
                        }
                        fragment.appendChild(wordSpan);
                    }
                });
                textNode.parentNode.replaceChild(fragment, textNode);
            });
        });

        // Observer to trigger typing
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Only type once
                    if(el.dataset.typed === 'true') return;
                    el.dataset.typed = 'true';
                    
                    const chars = el.querySelectorAll('.scroll-typewriter-char');
                    let current = 0;
                    
                    function type() {
                        if(current < chars.length) {
                            chars[current].style.opacity = '1';
                            current++;
                            // type faster for long texts
                            const speed = chars.length > 50 ? 10 : 25;
                            setTimeout(type, speed);
                        }
                    }
                    setTimeout(type, 150); // slight delay after intersection
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        targets.forEach(t => observer.observe(t));
    }

    setupScrollAnimations() {
        const SELECTORS = [
            '.mission-card-flip',
            '.impact-card',
            '.mem-card',
            '.partner-card',
            '.donation-card',
            '.activity-card',
            '.timeline-item',
            '.faq-item',
            '.stat-item',
        ].join(', ');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    // Reset so next scroll-into-view re-animates
                    entry.target.classList.remove('revealed');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        });

        document.querySelectorAll(SELECTORS).forEach(el => {
            const siblings  = [...el.parentElement.children];
            const localIdx  = siblings.indexOf(el);
            el.style.transitionDelay = `${localIdx * 0.1}s`;
            el.classList.add('reveal-ready');
            observer.observe(el);

            // Spotlight Hover Effect
            if (el.matches('.act-card, .mem-card, .donation-card')) {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    el.style.setProperty('--mouse-x', `${x}px`);
                    el.style.setProperty('--mouse-y', `${y}px`);
                });
            }

            // 3D Tilt Effect
            if (el.matches('.impact-card, .donation-card, .mission-card-flip')) {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;
                    
                    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    el.style.transition = 'transform 0.1s ease-out';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.transform = '';
                    el.style.transition = 'transform 0.5s ease';
                    // Reset inline style after transition to allow CSS hover states to work
                    setTimeout(() => { el.style.transition = ''; }, 500);
                });
            }
        });
    }
}
