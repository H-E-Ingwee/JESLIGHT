// assets/js/booking-form.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Booking Form page specific JavaScript loaded.');

    // Elements for displaying selected tour details
    const selectedTourDisplay = document.getElementById('selected-tour-display');
    const selectedTourDurationDisplay = document.getElementById('selected-tour-duration-display');
    const selectedTourPriceDisplay = document.getElementById('selected-tour-price-display');
    
    // Hidden inputs to store tour data for passing
    const tourIdHidden = document.getElementById('tour-id');
    const tourNameHidden = document.getElementById('tour-name-hidden');
    const tourPriceHidden = document.getElementById('tour-price-hidden');
    const tourDurationHidden = document.getElementById('tour-duration-hidden');

    // Form elements
    const bookingForm = document.getElementById('booking-form');
    const leadTravelerNameInput = document.getElementById('lead-traveler-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const numTravelersInput = document.getElementById('num-travelers');
    const departureDateInput = document.getElementById('departure-date');
    const specialRequestsInput = document.getElementById('special-requests');
    const termsAgreeCheckbox = document.getElementById('terms-agree');

    // Error message elements
    const leadTravelerNameError = document.getElementById('lead-traveler-name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const numTravelersError = document.getElementById('num-travelers-error');
    const departureDateError = document.getElementById('departure-date-error');
    const termsAgreeError = document.getElementById('terms-agree-error');
    const formSubmissionMessage = document.getElementById('form-submission-message');

    // --- Mock Tour Data (same as in tour-detail.js) ---
    const mockTours = [
        { id: 1, name: "Budget Safari Adventure", type: "safari", duration: 5, price: 899, image: "https://placehold.co/800x500/27AE60/ffffff?text=Safari+Adventure", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 2, name: "Authentic Cultural Journey", type: "cultural", duration: 7, price: 699, image: "https://placehold.co/800x500/F2994A/ffffff?text=Cultural+Journey", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 3, name: "Zanzibar Beach Escape", type: "beach", duration: 6, price: 799, image: "https://placehold.co/800x500/2C3E50/ffffff?text=Zanzibar+Beach", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 4, name: "Great Migration Game Drive", type: "game-drive", duration: 4, price: 1200, image: "https://placehold.co/800x500/27AE60/ffffff?text=Game+Drive+Migration", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 5, name: "Eco-Friendly Community Tour", type: "sustainable", duration: 8, price: 950, image: "https://placehold.co/800x500/F2994A/ffffff?text=Sustainable+Travel", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 6, name: "Luxury East Africa Safari", type: "safari", duration: 7, price: 1500, image: "https://placehold.co/800x500/2C3E50/ffffff?text=Luxury+Safari", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 7, name: "Mount Kilimanjaro Trek", type: "trekking", duration: 9, price: 1800, image: "https://placehold.co/800x500/F2994A/ffffff?text=Kilimanjaro+Trek", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 8, name: "Uganda Gorilla Trekking", type: "game-drive", duration: 3, price: 2000, image: "https://placehold.co/800x500/27AE60/ffffff?text=Gorilla+Trekking", overview: "...", itinerary: [], inclusions: [], exclusions: [] },
        { id: 9, name: "Kenya Wildlife & Culture", type: "safari", duration: 6, price: 1100, image: "https://placehold.co/800x500/2C3E50/ffffff?text=Kenya+Wildlife+Culture", overview: "...", itinerary: [], inclusions: [], exclusions: [] }
    ];

    // Function to load selected tour details from URL
    const loadSelectedTour = () => {
        console.log('Current URL Search Params:', window.location.search); // Log full URL params
        const urlParams = new URLSearchParams(window.location.search);
        const tourId = parseInt(urlParams.get('tourId'));
        console.log('Extracted tourId:', tourId); // Log extracted tourId

        const tour = mockTours.find(t => t.id === tourId);
        console.log('Found tour object:', tour); // Log the found tour object

        if (tour) {
            selectedTourDisplay.textContent = tour.name;
            selectedTourDurationDisplay.textContent = `${tour.duration} Days`;
            selectedTourPriceDisplay.textContent = `$${tour.price.toFixed(2)}`; // Ensure price is formatted
            
            // Store data in hidden inputs for easy retrieval later
            tourIdHidden.value = tour.id;
            tourNameHidden.value = tour.name;
            tourPriceHidden.value = tour.price;
            tourDurationHidden.value = tour.duration;

        } else {
            selectedTourDisplay.textContent = "Tour Not Selected";
            selectedTourDurationDisplay.textContent = "Please return to Tours page.";
            selectedTourPriceDisplay.textContent = "$N/A";
            // Disable form if no tour is selected
            if (bookingForm) { // Ensure bookingForm exists before manipulating
                bookingForm.innerHTML = '<p class="text-red-600 text-center text-lg">No tour selected. Please go back to the <a href="tours.html" class="text-primary-orange hover:underline">Tours page</a> to choose a tour.</p>';
            }
        }
    };

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

    // Validate phone number (basic check for digits and minimum length)
    const isValidPhone = (phone) => {
        const re = /^\+?[0-9\s-]{7,20}$/; // Allows +, digits, spaces, hyphens, 7-20 chars
        return re.test(String(phone));
    };

    // Validate date (ensure it's not in the past)
    const isValidDate = (dateString) => {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        return selectedDate >= today;
    };

    // --- Form Submission and Data Transfer ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Clear previous messages
            formSubmissionMessage.classList.add('hidden');
            formSubmissionMessage.textContent = '';

            // Validate fields
            if (leadTravelerNameInput.value.trim() === '') {
                showError(leadTravelerNameError, 'Please enter your full name.');
                isValid = false;
            } else {
                hideError(leadTravelerNameError);
            }

            if (emailInput.value.trim() === '') {
                showError(emailError, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailError, 'Please enter a valid email address.');
                isValid = false;
            } else {
                hideError(emailError);
            }

            if (phoneInput.value.trim() === '') {
                showError(phoneError, 'Please enter your phone number.');
                isValid = false;
            } else if (!isValidPhone(phoneInput.value.trim())) {
                showError(phoneError, 'Please enter a valid phone number (e.g., +254 7XX XXX XXXX).');
                isValid = false;
            } else {
                hideError(phoneError);
            }

            if (parseInt(numTravelersInput.value) < 1 || isNaN(parseInt(numTravelersInput.value))) {
                showError(numTravelersError, 'Number of travelers must be at least 1.');
                isValid = false;
            } else {
                hideError(numTravelersError);
            }

            if (departureDateInput.value.trim() === '') {
                showError(departureDateError, 'Please select a departure date.');
                isValid = false;
            } else if (!isValidDate(departureDateInput.value)) {
                showError(departureDateError, 'Departure date cannot be in the past.');
                isValid = false;
            } else {
                hideError(departureDateError);
            }

            if (!termsAgreeCheckbox.checked) {
                showError(termsAgreeError, 'You must agree to the terms and conditions.');
                isValid = false;
            } else {
                hideError(termsAgreeError);
            }

            if (isValid) {
                // Collect all booking data
                const bookingData = {
                    tourId: tourIdHidden.value,
                    tourName: tourNameHidden.value,
                    tourPricePerPerson: parseFloat(tourPriceHidden.value),
                    tourDuration: parseInt(tourDurationHidden.value),
                    leadTravelerName: leadTravelerNameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    numTravelers: parseInt(numTravelersInput.value),
                    departureDate: departureDateInput.value, // YYYY-MM-DD
                    specialRequests: specialRequestsInput.value.trim(),
                };

                // Store booking data in sessionStorage
                sessionStorage.setItem('currentBookingDetails', JSON.stringify(bookingData));
                console.log('Booking details stored in sessionStorage:', bookingData);

                // Redirect to booking confirmation page
                window.location.href = 'booking-confirm.html';

            } else {
                formSubmissionMessage.classList.remove('hidden');
                formSubmissionMessage.classList.remove('text-primary-green');
                formSubmissionMessage.classList.add('text-red-600');
                formSubmissionMessage.textContent = 'Please correct the errors in the form before proceeding.';
            }
        });
    }

    // Initialize the form with selected tour details on page load
    loadSelectedTour();
});
