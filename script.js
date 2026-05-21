// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Add glow effect on mouse move for hero title
    const heroTitle = document.querySelector('.hero h1');
    
    document.addEventListener('mousemove', (e) => {
        if (heroTitle) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const intensity = Math.sqrt(x * x + y * y) / Math.sqrt(2);
            heroTitle.style.filter = `brightness(${1 + intensity * 0.3})`;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Model card hover effect with glow
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
        });
    });

    // Step number animation on scroll
    const stepNumbers = document.querySelectorAll('.step-number');
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                number.style.animation = 'bounceIn 0.6s ease';
            }
        });
    }, { threshold: 0.5 });

    stepNumbers.forEach(number => {
        stepObserver.observe(number);
    });

    // Community link staggered animation
    const communityLinks = document.querySelectorAll('.community-link');
    
    communityLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.style.animation = 'fadeInUp 0.8s ease forwards';
        link.style.opacity = '0';
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% {
                transform: scale(0.3);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Mobile menu toggle (if needed for responsive design)
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    navContainer.appendChild(mobileMenuBtn);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
    });
    
    // Add mobile menu styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border-top: 1px solid rgba(0, 212, 255, 0.2);
            }
            
            .nav-menu.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(mobileStyle);

    // Typing effect for hero tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                tagline.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add floating particles effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${10 + Math.random() * 20}s linear infinite;
            `;
            heroSection.appendChild(particle);
        }
        
        // Add floating animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes float {
                from {
                    transform: translateY(100vh) rotate(0deg);
                }
                to {
                    transform: translateY(-100px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    // Console Easter egg
    console.log('%c◈ $OCTOPUS', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cThe anomaly is real...', 'color: #ff00ff; font-size: 14px;');
});

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
