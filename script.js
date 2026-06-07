// ===== HAMBURGER MENU =====
document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    const btn = form.querySelector('button');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('لطفاً همه فیلدها را کامل کنید');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'در حال ارسال...';

        emailjs.send('service_2e0imff', 'template_ugoh1s3', {
            name: name,
            email: email,
            message: message,
        })
        .then(() => {
            alert('پیام با موفقیت ارسال شد 🚀');
            form.reset();
        })
        .catch((error) => {
            console.error(error);
            alert('خطا در ارسال پیام');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'ارسال پیام';
        });
    });

});

// ===== SMOOTH SCROLL WITH OFFSET FOR FIXED HEADER =====
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
