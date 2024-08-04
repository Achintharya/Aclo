document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.querySelector('input[placeholder="Name"]').value;
        const email = document.querySelector('input[placeholder="Email"]').value;
        const subject = document.querySelector('input[placeholder="Subject"]').value;
        const message = document.querySelector('textarea[placeholder="Message"]').value;

        sendEmail(name, email, subject, message);
    });

    function sendEmail(name, email, subject, message) {
        emailjs.send("service_mhfp306", "template_au181oj", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        }).then(
            function(response) {
                console.log("Email sent successfully", response);
                alert("Message sent successfully!");
            },
            function(error) {
                console.log("Failed to send email", error);
                alert("Failed to send message. Please try again later.");
            }
        );
    }
});