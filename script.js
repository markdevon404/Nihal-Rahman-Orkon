// ============================================
// PORTFOLIO SCRIPT - ELITE CYBERSECURITY THEME
// ============================================

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Main Initialization Function
function initApp() {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initParticleBackground();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initProjectCards();
    initContactForm();
    initBackToTop();
    initSectionTransitions();
    initResponsiveMenu();
    
    // Start animations
    startHeroAnimations();
    
    console.log('%c🚀 Elite Portfolio Initialized', 'color: #0aff9d; font-size: 16px; font-weight: bold;');
    console.log('%c👨‍💻 Nihal Rahman Orkon | Cybersecurity Expert', 'color: #00e0ff; font-size: 14px;');
}

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading time with realistic cyber boot sequence
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Remove preloader from DOM after fade out
        setTimeout(() => {
            preloader.style.display = 'none';
            // Start particle animation after preloader
            if (window.particles) {
                window.particles.animate();
            }
        }, 500);
    }, 2000); // 2 second loading simulation
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            // Position the cursor dot
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Position the cursor outline with delay for smooth effect
            setTimeout(() => {
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
            }, 50);
        });
        
        // Cursor interaction effects
        document.addEventListener('mousedown', () => {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
        });
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card, .nav-link, .skill-item, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.width = '16px';
                cursorDot.style.height = '16px';
                cursorDot.style.backgroundColor = '#ff00e6';
                cursorOutline.style.borderColor = '#ff00e6';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorDot.style.backgroundColor = '#0aff9d';
                cursorOutline.style.borderColor = '#0aff9d';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
            });
        });
    } else {
        // Hide custom cursor on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    
    // Colors for particles
    const colors = [
        'rgba(10, 255, 157, 0.8)',
        'rgba(0, 224, 255, 0.8)',
        'rgba(255, 0, 230, 0.8)',
        'rgba(255, 255, 255, 0.6)'
    ];
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.originalSize = this.size;
            this.connectionDistance = 150;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            
            // Size pulse effect
            this.size = this.originalSize + Math.sin(Date.now() * 0.002) * 0.5;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation function
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between particles
        drawConnections();
        
        requestAnimationFrame(animateParticles);
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < particles[i].connectionDistance) {
                    const opacity = 1 - (distance / particles[i].connectionDistance);
                    ctx.strokeStyle = `rgba(10, 255, 157, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle count based on screen size
        const newParticleCount = window.innerWidth < 768 ? 30 : 80;
        while (particles.length > newParticleCount) {
            particles.pop();
        }
        while (particles.length < newParticleCount) {
            particles.push(new Particle());
        }
    });
    
    // Start animation
    window.particles = {
        animate: animateParticles
    };
    
    // Don't start immediately, wait for preloader
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to section
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'CYBERSECURITY EXPERT',
        'ETHICAL HACKER',
        'WEB DEVELOPER',
        'APP DEVELOPER',
        'TEAM ANONYMOUS CYBER SHIELD'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if text is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after preloader
    setTimeout(type, 2500);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .section-line, .skill-item, .project-card, .timeline-item, .contact-info, .contact-form');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeUp 0.8s ease forwards;
        }
        
        @keyframes fadeUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPercent = entry.target.getAttribute('data-skill');
                const skillProgress = entry.target.querySelector('.skill-progress');
                const skillPercentElement = entry.target.querySelector('.skill-percent');
                
                // Animate progress bar
                skillProgress.style.width = '0%';
                
                setTimeout(() => {
                    skillProgress.style.width = `${skillPercent}%`;
                    skillProgress.style.transition = 'width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
                    
                    // Animate percentage counter
                    let currentPercent = 0;
                    const interval = setInterval(() => {
                        if (currentPercent >= skillPercent) {
                            clearInterval(interval);
                        } else {
                            currentPercent++;
                            skillPercentElement.textContent = `${currentPercent}%`;
                        }
                    }, 15);
                }, 300);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// ============================================
// PROJECT CARDS INTERACTIONS
// ============================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(100%)';
        });
        
        // Click effect
        card.addEventListener('click', () => {
            // Add a ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(10, 255, 157, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2;
            const y = rect.height / 2;
            
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size / 2}px`;
            ripple.style.top = `${y - size / 2}px`;
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // In a real portfolio, this would open a project modal
            console.log('Project clicked - would open project details modal');
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = contactForm.querySelectorAll('.form-input');
    
    // Form input focus effects
    formInputs.forEach(input => {
        const formLine = input.nextElementSibling;
        
        input.addEventListener('focus', () => {
            formLine.style.width = '100%';
            formLine.style.backgroundColor = '#0aff9d';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                formLine.style.width = '0';
                formLine.style.backgroundColor = '#00e0ff';
            }
        });
        
        // Initialize line width for pre-filled values
        if (input.value) {
            formLine.style.width = '100%';
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
        
        // Simulate form submission
        submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // In a real implementation, you would send data to a server here
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Message sent successfully! I'll get back to you soon.</span>
            `;
            successMessage.style.cssText = `
                background: rgba(10, 255, 157, 0.1);
                border: 1px solid rgba(10, 255, 157, 0.3);
                border-radius: 10px;
                padding: 15px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #0aff9d;
                animation: fadeIn 0.5s ease;
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            this.reset();
            formInputs.forEach(input => {
                const formLine = input.nextElementSibling;
                formLine.style.width = '0';
            });
            
            // Reset button
            submitBtn.querySelector('.btn-text').textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for the button
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: rgba(10, 15, 35, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(10, 255, 157, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0aff9d;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 100;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: rgba(10, 255, 157, 0.1);
            border-color: #0aff9d;
            box-shadow: 0 0 15px rgba(10, 255, 157, 0.5);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(backToTopStyle);
}

// ============================================
// SECTION TRANSITIONS
// ============================================
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    // Add intersection observer for section transitions
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-section');
                
                // Add a subtle glow effect to the active section
                const sectionGlow = document.createElement('div');
                sectionGlow.className = 'section-glow';
                entry.target.appendChild(sectionGlow);
                
                // Remove glow after animation
                setTimeout(() => {
                    sectionGlow.remove();
                }, 1000);
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// RESPONSIVE MOBILE MENU
// ============================================
function initResponsiveMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                toggleMobileMenu();
            }
        });
    });
    
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate menu lines
        const menuLines = document.querySelectorAll('.menu-line');
        if (mobileMenuBtn.classList.contains('active')) {
            menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            menuLines[0].style.transform = 'none';
            menuLines[1].style.opacity = '1';
            menuLines[2].style.transform = 'none';
        }
    }
    
    // Add mobile menu styles
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        @media (max-width: 1024px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(5, 5, 16, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 20px;
                gap: 15px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
                z-index: 999;
                border-top: 1px solid rgba(10, 255, 157, 0.2);
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-btn {
                display: flex;
                z-index: 1000;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
}

// ============================================
// HERO ANIMATIONS
// ============================================
function startHeroAnimations() {
    // Animate hero elements sequentially
    const heroElements = [
        '.hero-badge',
        '.hero-title',
        '.hero-subtitle',
        '.hero-description',
        '.hero-buttons',
        '.hero-visual'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 300 + 500); // Staggered animation
        }
    });
    
    // Animate hexagons in hero visual
    setTimeout(() => {
        const hexagons = document.querySelectorAll('.hexagon');
        hexagons.forEach((hex, i) => {
            setTimeout(() => {
                hex.classList.add('animate');
            }, i * 200);
        });
    }, 2000);
}

// ============================================
// ADDITIONAL ANIMATION KEYFRAMES
// ============================================
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        /* Preloader animations */
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            from { transform: scale(0.8); opacity: 0.7; }
            to { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes scan {
            0% { transform: translateX(-100%) translateY(0); }
            100% { transform: translateX(100%) translateY(0); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes badgeGlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Typing cursor blink */
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* Glitch effect */
        @keyframes glitch-anim {
            0% { clip: rect(31px, 9999px, 94px, 0); }
            5% { clip: rect(112px, 9999px, 76px, 0); }
            10% { clip: rect(85px, 9999px, 77px, 0); }
            15% { clip: rect(27px, 9999px, 97px, 0); }
            20% { clip: rect(64px, 9999px, 98px, 0); }
            25% { clip: rect(61px, 9999px, 85px, 0); }
            30% { clip: rect(99px, 9999px, 114px, 0); }
            35% { clip: rect(1px, 9999px, 13px, 0); }
            40% { clip: rect(28px, 9999px, 133px, 0); }
            45% { clip: rect(54px, 9999px, 65px, 0); }
            50% { clip: rect(22px, 9999px, 104px, 0); }
            55% { clip: rect(122px, 9999px, 68px, 0); }
            60% { clip: rect(18px, 9999px, 102px, 0); }
            65% { clip: rect(98px, 9999px, 114px, 0); }
            70% { clip: rect(7px, 9999px, 22px, 0); }
            75% { clip: rect(109px, 9999px, 81px, 0); }
            80% { clip: rect(29px, 9999px, 90px, 0); }
            85% { clip: rect(55px, 9999px, 62px, 0); }
            90% { clip: rect(11px, 9999px, 23px, 0); }
            95% { clip: rect(34px, 9999px, 73px, 0); }
            100% { clip: rect(44px, 9999px, 56px, 0); }
        }
        
        @keyframes glitch-anim2 {
            0% { clip: rect(65px, 9999px, 119px, 0); }
            5% { clip: rect(52px, 9999px, 101px, 0); }
            10% { clip: rect(49px, 9999px, 144px, 0); }
            15% { clip: rect(101px, 9999px, 132px, 0); }
            20% { clip: rect(20px, 9999px, 103px, 0); }
            25% { clip: rect(131px, 9999px, 74px, 0); }
            30% { clip: rect(140px, 9999px, 92px, 0); }
            35% { clip: rect(32px, 9999px, 52px, 0); }
            40% { clip: rect(33px, 9999px, 71px, 0); }
            45% { clip: rect(141px, 9999px, 65px, 0); }
            50% { clip: rect(5px, 9999px, 83px, 0); }
            55% { clip: rect(28px, 9999px, 25px, 0); }
            60% { clip: rect(133px, 9999px, 71px, 0); }
            65% { clip: rect(112px, 9999px, 25px, 0); }
            70% { clip: rect(91px, 9999px, 32px, 0); }
            75% { clip: rect(17px, 9999px, 138px, 0); }
            80% { clip: rect(108px, 9999px, 85px, 0); }
            85% { clip: rect(31px, 9999px, 122px, 0); }
            90% { clip: rect(111px, 9999px, 86px, 0); }
            95% { clip: rect(22px, 9999px, 78px, 0); }
            100% { clip: rect(44px, 9999px, 56px, 0); }
        }
        
        /* Hexagon animation */
        @keyframes hexFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        /* Code line animation */
        @keyframes codeFlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Fade in animation */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animation keyframes
addAnimationKeyframes();

// ============================================
// WINDOW LOAD COMPLETION
// ============================================
window.addEventListener('load', function() {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
    
    // Start particle animation if not already started
    if (window.particles && !window.particles.started) {
        window.particles.animate();
        window.particles.started = true;
    }
    // Initialize EmailJS
(function () {
  emailjs.init("La4M_DfsDNUTEwQzQ"); // ✅ Your PUBLIC KEY
})();

const form = document.getElementById("reviewForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.innerText = "⏳ Sending review...";
  statusText.style.color = "#00f7ff";

  emailjs.send(
    "service_bmhl2hr",      // ✅ SERVICE ID
    "template_w7t9mbt",     // ✅ TEMPLATE ID
    {
      user_name: document.getElementById("name").value,
      user_message: document.getElementById("message").value
    }
  )
  .then(() => {
    statusText.innerText = "✅ Review sent successfully! Thank you 🙌";
    statusText.style.color = "#00ff9d";
    form.reset();
  })
  .catch((error) => {
    statusText.innerText = "❌ Failed to send review. Try again!";
    statusText.style.color = "red";
    console.error("EmailJS Error:", error);
  });
});
});
