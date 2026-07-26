document.addEventListener('DOMContentLoaded', () => {

    // Remove the no-js fallback class if present (progressive enhancement)
    document.documentElement.classList.remove('no-js');

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    if (hamburger && navLinks) {

        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        };

        hamburger.addEventListener('click', toggleMenu);

        // Keyboard accessibility (Enter / Space)
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close menu when a link is clicked (mobile UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu if user clicks outside it
        document.addEventListener('click', (e) => {
            const isClickInside = hamburger.contains(e.target) || navLinks.contains(e.target);
            if (!isClickInside) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Contact form basic client-side handling (no backend wired yet)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out. We will get back to you soon.');
            contactForm.reset();
        });
    }

    // ================= SCROLL-REVEAL ANIMATIONS =================

    const revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

    if ('IntersectionObserver' in window && revealTargets.length) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        revealTargets.forEach(target => revealObserver.observe(target));

    } else {

        // No IntersectionObserver support — just show everything
        revealTargets.forEach(target => target.classList.add('reveal-active'));

    }

    // ================= HEADER SCROLL STATE =================

    if (header) {

        const onScroll = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

    }

});
