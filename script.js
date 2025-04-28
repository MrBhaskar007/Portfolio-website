document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            // Optional: Change burger icon to 'X'
            if (navUl.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; // Use a close icon/symbol
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.innerHTML = '☰'; // Hamburger icon
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when a link is clicked (optional)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // --- Smooth Scrolling for Nav Links ---
    // Already handled by CSS `scroll-behavior: smooth;` but this can be a fallback or enhancement
    // document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if(targetElement) {
    //              // Consider header height if fixed
    //              const headerOffset = document.querySelector('header').offsetHeight || 70;
    //              const elementPosition = targetElement.getBoundingClientRect().top;
    //              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    //              window.scrollTo({
    //                  top: offsetPosition,
    //                  behavior: "smooth"
    //              });
    //         }
    //     });
    // });


    // --- Animate Elements on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for skills or similar items
                const delay = entry.target.classList.contains('skill-tag') ? index * 50 : 0;
                // entry.target.style.transitionDelay = `${delay}ms`; // Apply delay inline

                 // Set custom property for CSS staggering (better approach)
                entry.target.style.setProperty('--animation-order', index);


                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to re-animate if scrolling up
                 // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        rootMargin: '0px', // Margin around the viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
