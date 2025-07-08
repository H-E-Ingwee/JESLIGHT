// assets/js/tours.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tours page specific JavaScript loaded.');

    // Filter elements
    const tourTypeFilter = document.getElementById('tour-type');
    const priceRangeFilter = document.getElementById('price-range');
    const priceValueDisplay = document.getElementById('price-value');
    const durationFilter = document.getElementById('duration');
    const sortByFilter = document.getElementById('sort-by');
    const searchBar = document.getElementById('search-bar'); // New search bar
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('clear-filters');

    // Tour listings container
    const tourCardsGrid = document.getElementById('tour-cards-grid');
    const noToursMessage = document.getElementById('no-tours-message');

    // Mobile filter sidebar elements
    const filterSidebar = document.getElementById('filter-sidebar');
    const openFilterSidebarBtn = document.getElementById('open-filter-sidebar');
    const closeFilterSidebarBtn = document.getElementById('close-filter-sidebar');

    let allTours = []; // Store all tours fetched from JSON

    // --- Fetch Tours Data ---
    const fetchTours = async () => {
        try {
            const response = await fetch('../data/tours.json'); // Adjust path if necessary
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allTours = await response.json();
            console.log('Tours data loaded:', allTours);
            applyFiltersAndSort(); // Render tours after fetching
        } catch (error) {
            console.error('Error fetching tours data:', error);
            tourCardsGrid.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative col-span-full" role="alert">
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline">Failed to load tours. Please try again later. Make sure 'data/tours.json' exists and is correctly formatted.</span>
                </div>
            `;
            noToursMessage.classList.add('hidden'); // Hide no tours message if there's a loading error
        }
    };

    // --- Render Tour Cards ---
    const renderTourCards = (toursToRender) => {
        tourCardsGrid.innerHTML = ''; // Clear existing cards

        if (toursToRender.length > 0) {
            toursToRender.forEach(tour => {
                const tourCard = document.createElement('div');
                tourCard.className = 'tour-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group';
                
                // Determine badge (if any)
                let badgeHtml = '';
                if (tour.id === 1) { // Example: Budget Safari is POPULAR
                    badgeHtml = `<div class="absolute top-4 right-4 bg-primary-green text-white px-3 py-1 rounded-full text-xs font-bold z-10">POPULAR</div>`;
                } else if (tour.id === 2) { // Example: Cultural Journey is NEW
                    badgeHtml = `<div class="absolute top-4 right-4 bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-bold z-10">NEW</div>`;
                }

                // Render star ratings
                const renderStars = (rating) => {
                    let starsHtml = '';
                    for (let i = 0; i < Math.floor(rating); i++) {
                        starsHtml += '<i class="fas fa-star"></i>';
                    }
                    if (rating % 1 !== 0) {
                        starsHtml += '<i class="fas fa-star-half-alt"></i>';
                    }
                    return starsHtml;
                };

                // Get review count and average rating (handle cases where reviews might be missing)
                const reviewCount = tour.reviews ? tour.reviews.length : 0;
                const avgRating = tour.reviews && tour.reviews.length > 0
                    ? (tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length).toFixed(1)
                    : 0; // Default to 0 if no reviews

                // Robustly get highlights, ensuring it's an array and taking a slice
                const highlightsToDisplay = Array.isArray(tour.highlights) ? tour.highlights.slice(0, 3) : [];

                tourCard.innerHTML = `
                    ${badgeHtml}
                    <div class="relative h-64 overflow-hidden">
                        <img src="${tour.gallery && tour.gallery.length > 0 ? tour.gallery[0] : 'https://placehold.co/600x400/D1D5DB/6B7280?text=Tour+Image'}" alt="${tour.name}" 
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div class="absolute bottom-4 left-4 text-white">
                            <span class="bg-primary-orange text-white text-xs px-2 py-1 rounded-full">${tour.duration} days</span>
                            <span class="bg-primary-blue text-white text-xs px-2 py-1 rounded-full ml-2">${tour.groupSize.includes('Private') ? 'Private' : 'Group'}</span>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-primary-blue">${tour.name}</h3>
                            <span class="text-primary-orange font-bold text-lg">$${tour.price}</span>
                        </div>
                        
                        <div class="flex items-center mb-3">
                            <div class="flex text-primary-orange">
                                ${renderStars(avgRating)}
                            </div>
                            <span class="text-gray-500 text-sm ml-2">(${reviewCount} reviews)</span>
                        </div>
                        
                        <p class="text-gray-600 mb-4 line-clamp-2">
                            ${tour.tagline}
                        </p>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${highlightsToDisplay.map(h => `
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
                                    <i class="fas fa-info-circle mr-1 text-primary-orange"></i> ${h.split(' ')[0]}
                                </span>
                            `).join('')}
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <a href="tour-detail.html?id=${tour.id}" 
                               class="text-primary-blue hover:text-accent-orange font-medium flex items-center transition">
                                View Details <i class="fas fa-chevron-right ml-1 text-xs"></i>
                            </a>
                            <button class="text-primary-orange hover:text-accent-orange transition" aria-label="Add to wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;
                tourCardsGrid.appendChild(tourCard);
            });
            noToursMessage.classList.add('hidden'); // Hide no tours message
        } else {
            noToursMessage.classList.remove('hidden'); // Show no tours message
        }
    };

    // --- Apply Filters and Sort ---
    const applyFiltersAndSort = () => {
        const selectedType = tourTypeFilter ? tourTypeFilter.value : '';
        const maxPrice = priceRangeFilter ? parseInt(priceRangeFilter.value) : Infinity;
        const minDuration = durationFilter && durationFilter.value !== '' ? parseInt(durationFilter.value) : 0;
        const searchTerm = searchBar ? searchBar.value.toLowerCase() : '';
        const sortBy = sortByFilter ? sortByFilter.value : 'default';

        let filteredTours = allTours.filter(tour => {
            const tourType = tour.type;
            const tourPrice = tour.price;
            const tourDuration = tour.duration;
            const tourName = tour.name.toLowerCase();
            const tourTagline = tour.tagline.toLowerCase();
            const tourLocation = tour.location.toLowerCase();

            const typeMatch = selectedType === '' || tourType === selectedType;
            const priceMatch = tourPrice <= maxPrice;
            const durationMatch = minDuration === 0 || tourDuration >= minDuration;
            const searchMatch = searchTerm === '' || 
                                tourName.includes(searchTerm) || 
                                tourTagline.includes(searchTerm) ||
                                tourLocation.includes(searchTerm);

            return typeMatch && priceMatch && durationMatch && searchMatch;
        });

        // Sort filtered tours
        filteredTours.sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            const durationA = a.duration;
            const durationB = b.duration;

            if (sortBy === 'price-asc') {
                return priceA - priceB;
            } else if (sortBy === 'price-desc') {
                return priceB - priceA;
            } else if (sortBy === 'duration-asc') {
                return durationA - durationB;
            } else if (sortBy === 'duration-desc') {
                return durationB - durationA;
            }
            return 0; // Default or no sorting
        });

        renderTourCards(filteredTours);
    };

    // --- Clear Filters ---
    const clearFilters = () => {
        if (tourTypeFilter) tourTypeFilter.value = '';
        if (priceRangeFilter) {
            priceRangeFilter.value = priceRangeFilter.max;
            priceValueDisplay.textContent = `$${priceRangeFilter.max}`;
        }
        if (durationFilter) durationFilter.value = '';
        if (sortByFilter) sortByFilter.value = 'default';
        if (searchBar) searchBar.value = '';
        applyFiltersAndSort();
    };

    // --- Event Listeners ---
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', applyFiltersAndSort);
    }
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', clearFilters);
    }
    // Apply filters dynamically on input/change for better UX
    if (tourTypeFilter) tourTypeFilter.addEventListener('change', applyFiltersAndSort);
    if (priceRangeFilter) priceRangeFilter.addEventListener('input', applyFiltersAndSort);
    if (durationFilter) durationFilter.addEventListener('input', applyFiltersAndSort);
    if (sortByFilter) sortByFilter.addEventListener('change', applyFiltersAndSort);
    if (searchBar) searchBar.addEventListener('input', applyFiltersAndSort); // Live search

    // --- Mobile Filter Sidebar Toggle ---
    if (openFilterSidebarBtn && closeFilterSidebarBtn && filterSidebar) {
        openFilterSidebarBtn.addEventListener('click', () => {
            filterSidebar.classList.remove('hidden');
            filterSidebar.classList.add('fixed', 'inset-0', 'z-40', 'bg-white', 'overflow-y-auto', 'p-6'); // Make it full screen on mobile
        });

        closeFilterSidebarBtn.addEventListener('click', () => {
            filterSidebar.classList.add('hidden');
            filterSidebar.classList.remove('fixed', 'inset-0', 'z-40', 'bg-white', 'overflow-y-auto', 'p-6');
        });

        // Hide sidebar on larger screens if it was opened on mobile
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) { // Tailwind's 'lg' breakpoint
                filterSidebar.classList.remove('hidden', 'fixed', 'inset-0', 'z-40', 'bg-white', 'overflow-y-auto', 'p-6');
                filterSidebar.classList.add('block'); // Ensure it's block on desktop
            } else {
                filterSidebar.classList.add('hidden'); // Hide on resize down to mobile
                filterSidebar.classList.remove('block');
            }
        });
    }

    // --- Initial Load ---
    fetchTours(); // Fetch and render tours on page load

    // Handle initial URL parameters for filtering (e.g., from homepage category links)
    const urlParams = new URLSearchParams(window.location.search);
    const initialType = urlParams.get('type');
    if (initialType && tourTypeFilter) {
        tourTypeFilter.value = initialType;
        // applyFiltersAndSort will be called after fetchTours completes
    }
});
