// assets/js/booking-confirm.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Booking Confirmation page specific JavaScript loaded.');

    const summaryTourName = document.getElementById('summary-tour-name');
    const summaryTourDuration = document.getElementById('summary-tour-duration');
    const summaryDepartureDate = document.getElementById('summary-departure-date');
    const summaryTravelers = document.getElementById('summary-travelers');
    const summaryLeadTraveler = document.getElementById('summary-lead-traveler');
    const summaryEmail = document.getElementById('summary-email');
    const summaryPhone = document.getElementById('summary-phone');
    const summarySpecialRequests = document.getElementById('summary-special-requests');

    const pricePerPerson = document.getElementById('price-per-person');
    const numTravelers = document.getElementById('num-travelers');
    const subtotal = document.getElementById('subtotal');
    const taxesFees = document.getElementById('taxes-fees');
    const totalAmount = document.getElementById('total-amount');
    const mobileMoneyAmount = document.getElementById('mobile-money-amount'); // For M-Pesa amount display

    const proceedToPaymentBtn = document.getElementById('proceed-to-payment-btn');
    const paymentMessage = document.getElementById('payment-message');

    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const creditCardDetails = document.getElementById('credit-card-details');
    const mobileMoneyDetails = document.getElementById('mobile-money-details');
    const bankTransferDetails = document.getElementById('bank-transfer-details');

    let currentBookingData = null; // To store data retrieved from sessionStorage

    // Function to populate booking summary details from sessionStorage
    const populateBookingSummary = () => {
        const storedData = sessionStorage.getItem('currentBookingDetails');
        if (storedData) {
            currentBookingData = JSON.parse(storedData);
            console.log("Retrieved booking data from sessionStorage:", currentBookingData);

            if (summaryTourName) summaryTourName.textContent = currentBookingData.tourName;
            if (summaryTourDuration) summaryTourDuration.textContent = `${currentBookingData.tourDuration} Days`;
            
            // Format date for display
            if (summaryDepartureDate) {
                const date = new Date(currentBookingData.departureDate);
                summaryDepartureDate.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            
            if (summaryTravelers) summaryTravelers.textContent = `${currentBookingData.numTravelers} Adults`;
            if (summaryLeadTraveler) summaryLeadTraveler.textContent = currentBookingData.leadTravelerName;
            if (summaryEmail) summaryEmail.textContent = currentBookingData.email;
            if (summaryPhone) summaryPhone.textContent = currentBookingData.phone;
            if (summarySpecialRequests) summarySpecialRequests.textContent = currentBookingData.specialRequests || 'None';

            // Calculate price breakdown
            const taxesPercentage = 0.05; // 5% taxes and fees
            const calculatedSubtotal = currentBookingData.tourPricePerPerson * currentBookingData.numTravelers;
            const calculatedTaxesFees = calculatedSubtotal * taxesPercentage;
            const calculatedTotal = calculatedSubtotal + calculatedTaxesFees;

            if (pricePerPerson) pricePerPerson.textContent = `$${currentBookingData.tourPricePerPerson.toFixed(2)}`;
            if (numTravelers) numTravelers.textContent = currentBookingData.numTravelers;
            if (subtotal) subtotal.textContent = `$${calculatedSubtotal.toFixed(2)}`;
            if (taxesFees) taxesFees.textContent = `$${calculatedTaxesFees.toFixed(2)}`;
            if (totalAmount) totalAmount.textContent = `$${calculatedTotal.toFixed(2)}`;
            if (mobileMoneyAmount) mobileMoneyAmount.textContent = `$${calculatedTotal.toFixed(2)}`; // Set amount for mobile money

        } else {
            // Fallback if no data in sessionStorage (e.g., user directly accessed page)
            console.warn("No booking data found in sessionStorage. Displaying placeholder data.");
            summaryTourName.textContent = "N/A";
            summaryTourDuration.textContent = "N/A";
            summaryDepartureDate.textContent = "N/A";
            summaryTravelers.textContent = "N/A";
            summaryLeadTraveler.textContent = "N/A";
            summaryEmail.textContent = "N/A";
            summaryPhone.textContent = "N/A";
            summarySpecialRequests.textContent = "N/A";
            totalAmount.textContent = "$0.00";
            proceedToPaymentBtn.disabled = true;
            proceedToPaymentBtn.textContent = "Booking Data Missing";
            proceedToPaymentBtn.classList.add('opacity-50', 'cursor-not-allowed');
            paymentMessage.classList.remove('hidden');
            paymentMessage.classList.add('text-red-600');
            paymentMessage.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> No booking details found. Please start from the <a href="tours.html" class="text-primary-orange hover:underline">Tours page</a>.';
        }
    };

    // Function to toggle payment method details visibility
    const togglePaymentDetails = () => {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

        // Hide all details sections first
        creditCardDetails.classList.add('hidden');
        mobileMoneyDetails.classList.add('hidden');
        bankTransferDetails.classList.add('hidden');

        // Show the selected method's details
        if (selectedMethod === 'credit-card') {
            creditCardDetails.classList.remove('hidden');
        } else if (selectedMethod === 'mobile-money') {
            mobileMoneyDetails.classList.remove('hidden');
        } else if (selectedMethod === 'bank-transfer') {
            bankTransferDetails.classList.remove('hidden');
        }
    };

    // Event listeners for payment method radios
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });

    // Simulate payment processing
    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener('click', () => {
            // In a real application, you would collect payment details from the form
            // and send them to your backend for processing via a payment gateway API.
            // For this mock-up, we'll just simulate success/failure.

            proceedToPaymentBtn.disabled = true;
            proceedToPaymentBtn.textContent = 'Processing Payment...';
            proceedToPaymentBtn.classList.add('opacity-50', 'cursor-not-allowed');
            paymentMessage.classList.remove('hidden');
            paymentMessage.classList.remove('text-red-600', 'text-primary-green'); // Clear previous states
            paymentMessage.classList.add('text-gray-700');
            paymentMessage.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Your payment is being processed. Please wait...';

            // Simulate API call delay
            setTimeout(() => {
                const paymentSuccessful = Math.random() > 0.1; // 90% chance of success

                if (paymentSuccessful) {
                    paymentMessage.classList.remove('text-gray-700', 'text-red-600');
                    paymentMessage.classList.add('text-primary-green');
                    paymentMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Payment Successful! Your booking is confirmed. Redirecting...';
                    // Clear sessionStorage after successful booking
                    sessionStorage.removeItem('currentBookingDetails');
                    // In a real app, redirect to a success page, possibly with a booking ID
                    setTimeout(() => {
                        window.location.href = 'booking-success.html';
                    }, 2000);
                } else {
                    paymentMessage.classList.remove('text-gray-700', 'text-primary-green');
                    paymentMessage.classList.add('text-red-600');
                    paymentMessage.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Payment Failed. Please try again or contact support.';
                    proceedToPaymentBtn.disabled = false;
                    proceedToPaymentBtn.textContent = 'Proceed to Payment';
                    proceedToPaymentBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }, 3000); // Simulate 3-second payment processing
        });
    }

    // Populate summary and initialize payment details visibility on page load
    populateBookingSummary();
    togglePaymentDetails(); // Set initial visibility based on default checked radio
});
