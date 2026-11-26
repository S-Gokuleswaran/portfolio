
// Active Navigation Highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            window.scrollY >= top - 150 &&
            window.scrollY < top + height - 150
        ) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// Contact Form - Formspree Integration
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const status = document.getElementById("status");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.innerText;

        status.innerText = "Sending...";
        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        try {
            const response = await fetch(
                "https://formspree.io/f/mdegbjaw",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (response.ok) {
                status.innerText = "✅ Message sent successfully! Thank you for contacting me.";
                contactForm.reset();
            } else {
                status.innerText =
                    result.errors?.map(error => error.message).join(", ") ||
                    "❌ Unable to send your message. Please try again.";
            }

        } catch (error) {
            console.error("Formspree error:", error);
            status.innerText =
                "❌ Connection failed. Please check your internet and try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.innerText = originalButtonText;
        }
    });
}
