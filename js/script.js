// Multi-page compatible JS features - Enhanced for redesign
// Particles.js CDN
const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
document.head.appendChild(particlesScript);

document.addEventListener('DOMContentLoaded', function() {

    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Load saved theme - DEFAULT DARK
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update navbar for theme change
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            if (newTheme === 'light') {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.95)';
            }
        }
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // 2. Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 3. Navbar Background on Scroll (Desktop)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
    
    // 4. Form Validation (Contact page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            let isValid = true;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                document.getElementById('email').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('email').classList.add('is-valid');
                document.getElementById('email').classList.remove('is-invalid');
            }
            
            // Check required fields
            if (formData.name.length < 2 || formData.subject.length < 2 || formData.message.length < 10) {
                isValid = false;
                alert('Please fill all fields properly.');
            }
            
            if (isValid) {
                // Simulate form submission
                alert('Thank you, ' + formData.name + '! Your message has been sent. I\'ll get back to you soon.');
                contactForm.reset();
            }
        });
        
        // Real-time validation
        ['name', 'email', 'subject', 'message'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                });
            }
        });
    }
    
    // 5. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 6. Counter animations (if needed for stats sections)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter:not(.animated)');
        counters.forEach(counter => {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                }
            }, 20);
        });
    }

    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for fade-in
    document.querySelectorAll('.card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stats Counter Animation Observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounters();
            }
        });
    }, { threshold: 0.7, rootMargin: '-100px 0px -100px 0px' });

    // Observe stats section
    const statsSection = document.querySelector('.stats-number.counter')?.closest('section');
    if (statsSection) {
        statsSection.classList.add('stats-section'); // Add class for targeting
        statsObserver.observe(statsSection);
    }
});


