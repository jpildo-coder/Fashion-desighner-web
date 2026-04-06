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

// 3. Form Submission Handling (Frontend Mockup)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        
        // Simulating sending state
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        setTimeout(() => {
            // Success State
            btn.textContent = 'Inquiry Sent Successfully';
            btn.style.backgroundColor = '#f9f9f9';
            btn.style.color = '#050505';
            btn.style.opacity = '1';
            
            // clear form
            contactForm.reset();
            
            // Revert back after a few seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#f9f9f9';
                btn.disabled = false;
            }, 4000);
        }, 1500);
    });
}
