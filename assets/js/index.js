// assets/js/index.js

/*
    This file contains JavaScript specific to the homepage (index.html).
    It's intended for dynamic functionalities like hero carousels,
    interactive elements, or any other script that should only run on the homepage.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Homepage specific JavaScript loaded.');

    // --- Testimonial Slider Initialization (Glide.js) ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        new Glide(testimonialSlider, {
            type: 'carousel',
            perView: 1,
            gap: 32, // Space between slides
            autoplay: 5000, // Auto-play every 5 seconds
            hoverpause: true, // Pause on hover
            animationDuration: 800, // Smooth transition
            breakpoints: {
                768: { // md breakpoint
                    perView: 2,
                    gap: 24
                },
                1024: { // lg breakpoint
                    perView: 3,
                    gap: 24
                }
            }
        }).mount();
    }

    // --- Wishlist button functionality ---
    document.querySelectorAll('[aria-label="Add to wishlist"]').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) { // If it's an empty heart
                icon.classList.replace('far', 'fas'); // Fill it
                icon.classList.add('text-red-500'); // Make it red
                // In a real app, you would add this tour to the user's wishlist in a backend/storage
                console.log('Added to wishlist!');
            } else { // If it's a filled heart
                icon.classList.replace('fas', 'far'); // Empty it
                icon.classList.remove('text-red-500'); // Remove red color
                // In a real app, you would remove this tour from the user's wishlist
                console.log('Removed from wishlist!');
            }
        });
    });

    // Any other homepage-specific interactive elements can be added here.
});
