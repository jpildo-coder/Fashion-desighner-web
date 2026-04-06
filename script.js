// 1. Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve to trigger only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
animatedElements.forEach(el => observer.observe(el));

// 3. Form Submission Handling (Google Forms Integration)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Prevent default POST redirection
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn');
        const originalText = 'Send Inquiry';
        
        if (btn) {
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            // Do not fully disable the button immediately as some old browsers might cancel the event
            btn.style.pointerEvents = 'none';
        }
        
        const formData = new FormData(contactForm);
        const url = contactForm.action;
        
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).then(() => {
            if (btn) {
                // Success State
                btn.textContent = 'Inquiry Sent Successfully';
                btn.style.backgroundColor = '#f9f9f9';
                btn.style.color = '#050505';
                btn.style.opacity = '1';
                
                contactForm.reset();
                
                // Revert back after a few seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = '#f9f9f9';
                    btn.style.pointerEvents = 'auto';
                }, 4000);
            }
        }).catch((err) => {
            console.error('Form submission error:', err);
            if (btn) {
                btn.textContent = 'Error Sending';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    });
}
