 // assets/js/contact.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact page specific JavaScript loaded.');

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Function to show error message
    const showError = (element, message) => {
        element.textContent = message;
        element.classList.remove('hidden');
    };

    // Function to hide error message
    const hideError = (element) => {
        element.classList.add('hidden');
    };

    // Validate email format
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                showError(nameError, 'Please enter your name.');
                isValid = false;
            } else {
                hideError(nameError);
            }

            // Validate Email
            if (emailInput.value.trim() === '') {
                showError(emailError, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailError, 'Please enter a valid email address.');
                isValid = false;
            } else {
                hideError(emailError);
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                showError(messageError, 'Please enter your message.');
                isValid = false;
            } else {
                hideError(messageError);
            }

            if (isValid) {
                // In a real application, you would send this data to a backend server.
                // For now, we'll simulate a successful submission.
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('text-red-600');
                formMessage.classList.add('text-primary-green');
                formMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                contactForm.reset(); // Clear the form
                console.log('Form submitted:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                });

                // You could also hide the form and show a success message div
                // contactForm.style.display = 'none';
            } else {
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('text-primary-green');
                formMessage.classList.add('text-red-600');
                formMessage.textContent = 'Please correct the errors in the form.';
            }
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherAnswer.classList.contains('open')) {
                        otherAnswer.classList.remove('open');
                        otherIcon.classList.remove('rotate');
                    }
                }
            });

            // Toggle current FAQ item
            answer.classList.toggle('hidden'); // Toggle visibility
            answer.classList.toggle('open'); // For max-height transition
            icon.classList.toggle('rotate');
        });
    });
});

