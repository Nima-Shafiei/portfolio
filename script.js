document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.portfolio-card');
    const overlay = document.getElementById('portfolioModalOverlay');
    if (!overlay) return;

    const modalThumb = document.getElementById('portfolioModalThumb');
    const modalCategory = document.getElementById('portfolioModalCategory');
    const modalTitle = document.getElementById('portfolioModalTitle');
    const modalDescription = document.getElementById(
        'portfolioModalDescription',
    );
    const modalTags = document.getElementById('portfolioModalTags');
    const modalLink = document.getElementById('portfolioModalLink');
    const closeBtn = document.getElementById('portfolioModalClose');

    const openModal = card => {
        if (card.dataset.image) {
            modalThumb.innerHTML = `<img src="${card.dataset.image}" alt="${card.dataset.title || ''}">`;
        } else {
            const icon = card.dataset.icon || 'fas fa-code';
            modalThumb.innerHTML = `<i class="${icon}"></i>`;
        }
        modalCategory.textContent = card.dataset.category || '';
        modalTitle.textContent = card.dataset.title || '';
        modalDescription.textContent = card.dataset.description || '';
        modalLink.href = card.dataset.link || '#';

        modalTags.innerHTML = '';
        (card.dataset.tags || '')
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
            .forEach(tag => {
                const span = document.createElement('span');
                span.className = 'portfolio-modal-tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });

        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    cards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
});
