// Mobile Menu Toggle with Enhanced Functionality
function setupMobileMenu() {
    const menu = document.querySelector("nav ul");
    const hamburger = document.querySelector(".hamburger");
    
    function toggleMenu(e) {
        e.stopPropagation(); // Prevent immediate closing
        menu.classList.toggle("active");
    }
    
    function closeMenu() {
        menu.classList.remove("active");
    }
    
    // Event listeners
    hamburger.addEventListener("click", toggleMenu);
    
    // Close when clicking anywhere else
    document.addEventListener("click", closeMenu);
    
    // Prevent closing when clicking inside menu
    menu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
    
    // Close menu when clicking links
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
    // Initialize EmailJS with your Public Key
    emailjs.init("u4yBOVMQWrRcYqBTd");
    
    const contactForm = document.getElementById("contactForm");
    const statusMessage = document.getElementById("statusMessage");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const sendButton = document.querySelector(".send-btn");
        
        // Validate inputs
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
            sendButton.textContent = "Sending...";
            
            // Replace with your actual Service ID and Template ID
            const response = await emailjs.send(
                "sid_0407", 
                "template_4276ye9", 
                {
                    from_name: name,
                    from_email: email,
                    message: message
                }
            );
            
            if (response.status === 200) {
                showStatus("Message sent successfully!", "success");
                contactForm.reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Email sending failed:", error);
            showStatus("Failed to send message. Please try again later.", "error");
        } finally {
            sendButton.disabled = false;
            sendButton.textContent = "Send Message";
        }
    });
    
    function showStatus(message, type) {
        if (!statusMessage) return;
        
        statusMessage.textContent = message;
        statusMessage.className = type; // Adds class for styling
        statusMessage.style.display = "block";
        
        setTimeout(() => {
            statusMessage.textContent = "";
            statusMessage.style.display = "none";
            statusMessage.className = "";
        }, 5000);
    }
}

// Scroll Reveal Animation
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .about-content, .contact-container'
    );
    
    // Initial state
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
    revealOnScroll(); // Initial check
}

// Handle Window Resize Events
function handleResize() {
    // Reinitialize particles on resize
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroy();
    }
    initParticles();
    
    // Close mobile menu if open when resizing to desktop
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
    
    window.addEventListener("resize", handleResize);
});

// Fallback for particles if window.onload already used
if (document.readyState === "complete") {
    initParticles();
} else {
    window.addEventListener("load", initParticles);
}
