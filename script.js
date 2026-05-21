// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Particle System
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const cryptoEmojis = ['🐙', '🦑', '₿', '💰', '🪙', '💎', '📈', '💹', '�', '�', '💳', '⚡'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = cryptoEmojis[Math.floor(Math.random() * cryptoEmojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.fontSize = (Math.random() * 15 + 12) + 'px';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Mouse Glow Effect
    function initMouseGlow() {
        const mouseGlow = document.getElementById('mouseGlow');
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseGlow.classList.add('active');
        });
        
        document.addEventListener('mouseleave', () => {
            mouseGlow.classList.remove('active');
        });
        
        function animateGlow() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            mouseGlow.style.left = currentX + 'px';
            mouseGlow.style.top = currentY + 'px';
            
            requestAnimationFrame(animateGlow);
        }
        
        animateGlow();
    }
    
        
    // Magnetic Button Effect
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.cta-button, .buy-button');
        
        buttons.forEach(button => {
            button.classList.add('magnetic-btn');
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
        
    // Parallax Scrolling with Wave Effects
    function initParallax() {
        const layers = document.querySelectorAll('.parallax-layer');
        const waves = document.querySelectorAll('.wave');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Parallax layers
            layers.forEach((layer, index) => {
                const speed = 0.5 + (index * 0.2);
                layer.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Wave scroll interaction
            waves.forEach((wave, index) => {
                const waveSpeed = 0.3 + (index * 0.1);
                const yOffset = scrolled * waveSpeed;
                const rotation = scrolled * 0.01 * (index + 1);
                wave.style.transform = `translateX(${-40 - index * 5}px) translateY(${yOffset}px) rotate(${rotation}deg)`;
            });
        });
    }
    
    // Advanced Typography Animations
    function initAdvancedTypography() {
        // Word reveal for headings
        const headings = document.querySelectorAll('h2, h3');
        
        headings.forEach((heading, index) => {
            const words = heading.textContent.split(' ');
            heading.innerHTML = '';
            
            words.forEach((word, wordIndex) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.animationDelay = `${(wordIndex * 0.1) + (index * 0.2)}s`;
                heading.appendChild(span);
            });
            
            heading.classList.add('word-reveal');
        });
        
        // 3D text hover effects
        const textElements = document.querySelectorAll('.hero h1, h2');
        textElements.forEach(element => {
            element.classList.add('text-3d');
        });
        
        // Enhanced typing animation with cursor
        const taglineElement = document.getElementById('tagline');
        if (taglineElement) {
            taglineElement.classList.add('typing-cursor');
        }
    }
    
    // Scroll Triggered Animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.model-card, .community-link, .metric-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Contract address copy functionality
    const copyBtn = document.getElementById('copyBtn');
    const contractAddress = document.getElementById('contractAddress');
    const copyFeedback = copyBtn.querySelector('.copy-feedback');
    
    if (copyBtn && contractAddress) {
        copyBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const address = contractAddress.textContent.trim();
            
            try {
                // Use modern clipboard API if available
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(address);
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = address;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Show feedback
                copyFeedback.classList.add('show');
                copyBtn.style.background = 'rgba(0, 255, 136, 0.3)';
                copyBtn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                
                // Hide feedback after 2 seconds
                setTimeout(() => {
                    copyFeedback.classList.remove('show');
                    copyBtn.style.background = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
                
                // Optional: Log for debugging
                console.log('Contract address copied to clipboard:', address);
                
            } catch (err) {
                console.error('Failed to copy address:', err);
                // Show error feedback
                copyFeedback.textContent = 'Failed!';
                copyFeedback.style.background = 'rgba(255, 0, 0, 0.8)';
                copyFeedback.classList.add('show');
                
                setTimeout(() => {
                    copyFeedback.classList.remove('show');
                    copyFeedback.textContent = 'Copied!';
                    copyFeedback.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Initialize all visual effects
    createParticles();
    initMouseGlow();
    initMagneticButtons();
    initParallax();
    initAdvancedTypography();
    initScrollAnimations();
    
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
