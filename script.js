// Mobile Menu Toggle with Enhanced Functionality
function setupMobileMenu() {
    const menu = document.querySelector("nav ul");
    const hamburger = document.querySelector(".hamburger");
    
    function toggleMenu(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        // Toggle hamburger icon
        if (menu.classList.contains("active")) {
            hamburger.innerHTML = "✕";
        } else {
            hamburger.innerHTML = "☰";
        }
    }
    
    function closeMenu() {
        menu.classList.remove("active");
        hamburger.innerHTML = "☰";
    }
    
    hamburger.addEventListener("click", toggleMenu);
    
    document.addEventListener("click", closeMenu);
    
    menu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
    
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

// Initialize Swiper with Responsive Settings
function initProjectSlider() {
    return new Swiper('.projects-swiper', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        }
    });
}

// Initialize Particles.js with Performance Optimization
function initParticles() {
    const isMobile = window.innerWidth < 768;
    
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: isMobile ? 30 : 60,
                density: { 
                    enable: true, 
                    value_area: isMobile ? 400 : 800 
                }
            },
            color: { value: "#00ffcc" },
            shape: { type: "circle" },
            opacity: { 
                value: 0.5,
                random: true,
                anim: { 
                    enable: true, 
                    speed: 1, 
                    opacity_min: 0.1 
                }
            },
            size: { 
                value: 3,
                random: true,
                anim: { 
                    enable: true, 
                    speed: 2, 
                    size_min: 0.1 
                }
            },
            line_linked: { 
                enable: !isMobile,
                distance: 150,
                color: "#00ffcc",
                opacity: 0.4,
                width: 1
            },
            move: { 
                enable: true,
                speed: isMobile ? 1.5 : 2.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce"
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: !isMobile,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// EmailJS Contact Form with Improved Handling
function setupContactForm() {
    emailjs.init("u4yBOVMQWrRcYqBTd");
    
    const contactForm = document.getElementById("contactForm");
    const statusMessage = document.getElementById("statusMessage");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const sendButton = document.querySelector(".send-btn-compact");
        
        if (!name || !email || !message) {
            showStatus("Please fill all required fields", "error");
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showStatus("Please enter a valid email address", "error");
            return;
        }
        
        try {
            sendButton.disabled = true;
            sendButton.innerHTML = 'Sending <i class="fas fa-spinner fa-spin"></i>';
            
            const response = await emailjs.send(
                "sid_0407", 
                "template_4276ye9", 
                {
                    from_name: name,
                    from_email: email,
                    to_email: "siddharthponraj@gmail.com",
                    message: message,
                    reply_to: email
                }
            );
            
            if (response.status === 200) {
                showStatus("Message sent successfully! I'll get back to you soon.", "success");
                contactForm.reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Email sending failed:", error);
            
            // More detailed error handling
            if (error.text && error.text.includes("Invalid login")) {
                showStatus("Email service not configured properly. Please contact me directly at siddharthponraj@gmail.com", "error");
            } else if (error.text && error.text.includes("Template not found")) {
                showStatus("Email template not found. Please contact me directly at siddharthponraj@gmail.com", "error");
            } else {
                showStatus("Failed to send message. Please try again or contact me directly at siddharthponraj@gmail.com", "error");
            }
        } finally {
            sendButton.disabled = false;
            sendButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }
    });
    
    function showStatus(message, type) {
        if (!statusMessage) return;
        
        statusMessage.textContent = message;
        statusMessage.className = `status-message-compact ${type}`;
        statusMessage.style.display = "block";
        
        setTimeout(() => {
            statusMessage.textContent = "";
            statusMessage.style.display = "none";
            statusMessage.className = "status-message-compact";
        }, 5000);
    }
}

// Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                const progressBar = entry.target.querySelector('.skill-progress');
                
                setTimeout(() => {
                    progressBar.style.width = level + '%';
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Animate Journey Cards
function animateJourneyCards() {
    const journeyCards = document.querySelectorAll('.journey-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    journeyCards.forEach(card => {
        observer.observe(card);
    });
}

// Animate About Cards
function animateAboutCards() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    aboutCards.forEach(card => {
        observer.observe(card);
    });
}

// Scroll Reveal Animation
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .about-card, .contact-main-card, .skill-category, .journey-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Navigation Scroll Effect
function setupNavigationScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Improved Active Navigation Link
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    // Function to update active link
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Fallback for home section when at top
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update on scroll with throttle
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateActiveLink, 10);
    });
    
    // Update on page load
    updateActiveLink();
}

// Improved Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for same-page anchors
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const offsetTop = targetSection.offsetTop - headerHeight - 10;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if open
                    const menu = document.querySelector("nav ul");
                    if (menu.classList.contains("active")) {
                        menu.classList.remove("active");
                        document.querySelector(".hamburger").innerHTML = "☰";
                    }
                }
            }
        });
    });
}

// Handle Window Resize Events
function handleResize() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroy();
    }
    initParticles();
    
    if (window.innerWidth > 768) {
        const menu = document.querySelector("nav ul");
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            document.querySelector(".hamburger").innerHTML = "☰";
            document.body.style.overflow = "";
        }
    }
}

// Main Initialization Function
document.addEventListener("DOMContentLoaded", function() {
    setupMobileMenu();
    initProjectSlider();
    initParticles();
    setupContactForm();
    setupScrollAnimations();
    animateSkills();
    animateJourneyCards();
    animateAboutCards();
    setupNavigationScroll();
    setupActiveNavigation();
    setupSmoothScrolling();
    
    window.addEventListener("resize", handleResize);
});

// Fallback for particles if window.onload already used
if (document.readyState === "complete") {
    initParticles();
} else {
    window.addEventListener("load", initParticles);
}
