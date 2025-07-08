// assets/js/about.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('About Us page specific JavaScript loaded.');

    // No specific dynamic content or complex interactions are currently
    // planned for the About Us page that require extensive JavaScript.
    // Most elements are static content and styling is handled by Tailwind CSS.

    // This file can be used for:
    // - Animations on scroll (e.g., fading in sections as user scrolls)
    // - Dynamic loading of team members (if data was external)
    // - Any interactive elements specific to the About Us page.

    // Example: Simple console log to confirm script is active
    const storySection = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2.gap-8.items-center');
    if (storySection) {
        console.log("About Us story section found.");
    }
});
// Additional features can be added here as needed, such as