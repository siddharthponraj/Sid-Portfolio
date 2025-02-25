document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("u4yBOVMQWrRcYqBTd"); // Your actual public key

    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const statusMessage = document.getElementById("statusMessage");
        const sendButton = document.querySelector(".send-btn");

        if (!name || !email || !message) {
            statusMessage.innerText = "Please fill all fields.";
            statusMessage.style.color = "red";
            statusMessage.style.display = "block"; // Make sure it's visible
            statusMessage.classList.add("error"); // Error animation
            setTimeout(() => statusMessage.classList.remove("error"), 500);
            return;
        }

        // Disable button to prevent multiple clicks
        sendButton.disabled = true;

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send("sid_0407", "template_4276ye9", templateParams)
            .then(function (response) {
                statusMessage.innerText = "Message sent successfully!";
                statusMessage.style.color = "green";
                statusMessage.style.display = "block"; // Ensure it's visible
                statusMessage.classList.add("success"); // Success animation

                // Clear the form
                document.getElementById("contactForm").reset();

                // Re-enable button
                sendButton.disabled = false;

                // Hide success message after 3 seconds
                setTimeout(() => {
                    statusMessage.classList.remove("success");
                    statusMessage.innerText = "";
                    statusMessage.style.display = "none"; // Hide completely
                }, 3000);

            }, function (error) {
                statusMessage.innerText = "Failed to send message. Please try again.";
                statusMessage.style.color = "red";
                statusMessage.style.display = "block";
                statusMessage.classList.add("error");

                console.error("Error:", error);

                setTimeout(() => {
                    statusMessage.classList.remove("error");
                }, 500);

                sendButton.disabled = false; // Re-enable button after error
            });
    });
});


// Rest of your existing script (unchanged)
let items = document.querySelectorAll('.slider .project-card');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 1; // Start with the second project in focus

function loadShow() {
    let index = 0;
    items.forEach((item, i) => {
        let offset = i - active;
        item.style.transform = `translateX(${offset * 80}px) scale(${1 - Math.abs(offset) * 0.15})`; // Increased scale size
        item.style.zIndex = -Math.abs(offset);
        item.style.opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3;
    });
}

loadShow();

next.onclick = function () {
    if (active < items.length - 1) {
        active++;
        loadShow();
    }
};

prev.onclick = function () {
    if (active > 0) {
        active--;
        loadShow();
    }
};

// Smooth pop-in effect for project cards
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".project-card");

    function showCards() {
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add("show");
            }, i * 150); // Staggered animation
        });
    }

    function resetAnimation() {
        cards.forEach((card) => card.classList.remove("show"));
        setTimeout(showCards, 200); // Restart animation after delay
    }

    next.addEventListener("click", resetAnimation);
    prev.addEventListener("click", resetAnimation);

    showCards(); // Initial pop-in effect on page load
});
function toggleMenu() {
    document.querySelector("nav ul").classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    let slider = document.querySelector(".slider-track");
    let isDown = false;
    let startX;
    let scrollLeft;

    // Only apply swipe functionality in mobile view
    function enableSwipe() {
        if (window.innerWidth <= 768) {
            slider.addEventListener("touchstart", (e) => {
                isDown = true;
                startX = e.touches[0].pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener("touchmove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; 
                slider.scrollLeft = scrollLeft - walk;
            });

            slider.addEventListener("touchend", () => {
                isDown = false;
            });

            // Reset Opacity for all cards
            document.querySelectorAll(".project-card").forEach((card) => {
                card.style.opacity = "1"; // Ensures full visibility
            });
        }
    }

    enableSwipe();
});

