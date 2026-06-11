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

// Contact Form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const status = document.getElementById("status");

        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        try {
            status.innerText = "Sending...";

            const response = await fetch(
                "http://localhost:5000/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (result.success) {
                status.innerText = "✅ Message sent successfully!";
                contactForm.reset();
            } else {
                status.innerText = result.message || "❌ Failed to send message.";
            }

        } catch (error) {
            console.error(error);
            status.innerText = "❌ Server connection failed.";
        }
    });
}