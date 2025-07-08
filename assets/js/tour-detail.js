// assets/js/tour-detail.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tour Detail page specific JavaScript loaded.');

    // Main content elements
    const breadcrumbTourName = document.getElementById('breadcrumb-tour-name');
    const tourTitleOverlay = document.getElementById('tour-title-overlay');
    const overlayLocation = document.getElementById('overlay-location');
    const overlayDuration = document.getElementById('overlay-duration');
    const overlayGroupSize = document.getElementById('overlay-group-size');
    const overlayPrice = document.getElementById('overlay-price');
    const tourOverview = document.getElementById('tour-overview');
    const tourHighlights = document.getElementById('tour-highlights');
    const tourItinerary = document.getElementById('tour-itinerary');
    const tourInclusions = document.getElementById('tour-inclusions');
    const tourExclusions = document.getElementById('tour-exclusions');
    const tourReviewsContainer = document.getElementById('tour-reviews'); // Renamed to avoid conflict with mock data

    // Booking Widget elements
    const bookingWidgetPrice = document.getElementById('booking-widget-price');
    const bookingTourDateInput = document.getElementById('booking-tour-date');
    const bookingParticipantsSelect = document.getElementById('booking-participants');
    const basePriceCalcDisplay = document.getElementById('base-price-calc');
    const basePriceTotalDisplay = document.getElementById('base-price-total');
    const taxesTotalDisplay = document.getElementById('taxes-total');
    const bookingTotalPriceDisplay = document.getElementById('booking-total-price');
    const bookNowWidgetBtn = document.getElementById('book-now-widget-btn');

    // Quick Facts elements
    const quickFactDuration = document.getElementById('quick-fact-duration');
    const quickFactGroupSize = document.getElementById('quick-fact-group-size');
    const quickFactDestinations = document.getElementById('quick-fact-destinations');
    const quickFactTransport = document.getElementById('quick-fact-transport');
    const quickFactAccommodation = document.getElementById('quick-fact-accommodation');
    const quickFactMeals = document.getElementById('quick-fact-meals');
    const quickFactActivityLevel = document.getElementById('quick-fact-activity-level');

    // AI Packing List elements
    const generatePackingListBtn = document.getElementById('generate-packing-list');
    const packingListLoading = document.getElementById('packing-list-loading');
    const packingListOutput = document.getElementById('packing-list-output');
    const packingListItems = document.getElementById('packing-list-items');
    const packingListError = document.getElementById('packing-list-error');

    // Related Tours elements
    const relatedToursContainer = document.getElementById('related-tours-container');


    let currentTour = null; // Variable to hold the currently loaded tour object

    // --- Mock Tour Data (Expanded with gallery, highlights, more details, and reviews) ---
    const mockTours = [
        {
            id: 1,
            name: "Budget Safari Adventure",
            tagline: "Experience the wild beauty of East Africa's national parks without breaking the bank.",
            type: "safari",
            duration: 5, // days
            nights: 4,
            price: 899,
            location: "Maasai Mara, Amboseli, Kenya",
            groupSize: "2-6 people",
            transport: "Safari minivan with pop-up roof",
            accommodation: "Budget safari camps/lodges",
            meals: "4 Breakfasts, 5 Lunches, 4 Dinners",
            activityLevel: "Moderate",
            gallery: [
                "https://placehold.co/1200x600/27AE60/ffffff?text=Safari+Adventure+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Safari+Adventure+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Safari+Adventure+3",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Safari+Adventure+4"
            ],
            overview: "This 5-day budget safari takes you through the iconic Maasai Mara National Reserve and Amboseli National Park. Known for its abundant wildlife, including the 'Big Five', and stunning views of Mount Kilimanjaro, this tour offers thrilling game drives and authentic cultural experiences. Accommodation will be in comfortable tented camps or budget lodges, providing an immersive safari experience at an affordable price point.",
            highlights: [
                "Game drives in Maasai Mara, home to the Big Five",
                "Visit to a Maasai village for cultural immersion",
                "Amboseli's famous elephant herds with Kilimanjaro views",
                "Small group size for personalized experience",
                "Comfortable budget accommodations in great locations",
                "Expert local guides with extensive wildlife knowledge"
            ],
            itinerary: [
                { day: "Day 1", title: "Nairobi to Maasai Mara", description: "Depart Nairobi early morning and drive to Maasai Mara National Reserve, arriving in time for lunch. Afternoon game drive in search of lions, cheetahs, and other wildlife. Dinner and overnight at our budget safari camp.", meals: "Lunch, Dinner", transport: "5-6 hour drive", accommodation: "Budget safari camp" },
                { day: "Day 2", title: "Full Day in Maasai Mara", description: "Full day of game drives in the Mara with picnic lunch. Explore different areas of the reserve for the best wildlife viewing opportunities. Optional visit to a Maasai village in the late afternoon to learn about this famous pastoralist culture. Return to camp for dinner.", meals: "Breakfast, Lunch, Dinner", transport: "Full day game drives", accommodation: "Budget safari camp", activity: "Maasai village visit (optional)" },
                { day: "Day 3", title: "Maasai Mara to Amboseli", description: "Morning game drive in the Mara, then depart for Amboseli National Park with picnic lunch en route. Arrive in Amboseli in the late afternoon with game viewing as we enter the park. Dinner and overnight at our budget lodge.", meals: "Breakfast, Lunch, Dinner", transport: "6-7 hour drive", accommodation: "Budget lodge", activity: "Kilimanjaro views" },
                { day: "Day 4", title: "Full Day in Amboseli", description: "Morning and afternoon game drives in Amboseli, famous for its large elephant herds and spectacular views of Mount Kilimanjaro. The park's swamps attract many animals, offering excellent photographic opportunities. Lunch at the lodge. Optional visit to a local community project (additional cost).", meals: "Breakfast, Lunch, Dinner", transport: "Game drives", accommodation: "Budget lodge", activity: "Elephant sightings, Photography paradise" },
                { day: "Day 5", title: "Amboseli to Nairobi & Departure", description: "Early morning game drive in Amboseli, then return to Nairobi with picnic lunch en route. Arrive in Nairobi in the late afternoon where the tour ends. Optional airport transfer can be arranged (additional cost).", meals: "Breakfast, Lunch", transport: "4-5 hour drive", activity: "Airport transfer available" }
            ],
            inclusions: [
                "All park entry fees and game drives as per itinerary",
                "4 nights accommodation in budget safari camps/lodges",
                "Meals as specified (B=Breakfast, L=Lunch, D=Dinner)",
                "Transport in custom safari minivan with pop-up roof",
                "Services of professional English-speaking driver/guide",
                "1 liter of mineral water per person per day"
            ],
            exclusions: [
                "International flights and visa fees",
                "Travel insurance (required)",
                "Tips for guides and camp staff",
                "Alcoholic and soft drinks",
                "Optional activities (hot air balloon, village visits, etc.)",
                "Items of personal nature"
            ],
            reviews: [
                { rating: 5, date: "2 weeks ago", text: "This budget safari exceeded all my expectations! We saw all the Big Five and our guide was incredibly knowledgeable. The accommodations were basic but clean and comfortable. Excellent value for money!", author: "Sarah M.", country: "Canada", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=SM" },
                { rating: 4.5, date: "1 month ago", text: "Amazing wildlife sightings and our guide worked hard to find us the best spots. The Maasai village visit was a highlight. Only reason not 5 stars is the long drive days, but that's expected for budget tours covering this distance.", author: "James L.", country: "UK", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=JL" },
                { rating: 5, date: "3 months ago", text: "Truly an unforgettable experience! Every day brought new wonders. The guides were fantastic, and the entire trip was well-organized from start to finish. Highly recommend for anyone wanting an authentic safari.", author: "Emily R.", country: "Australia", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=ER" }
            ]
        },
        {
            id: 2,
            name: "Authentic Cultural Journey",
            tagline: "Connect with local tribes, learn traditional crafts, and experience vibrant community life.",
            type: "cultural",
            duration: 7,
            nights: 6,
            price: 699,
            location: "Arusha, Lake Eyasi, Tanzania",
            groupSize: "Small group (max 8)",
            transport: "Comfortable touring vehicle",
            accommodation: "Guesthouses/Homestays",
            meals: "6 Breakfasts, 6 Lunches, 6 Dinners",
            activityLevel: "Easy to Moderate",
            gallery: [
                "https://placehold.co/1200x600/F2994A/ffffff?text=Cultural+Journey+1",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Cultural+Journey+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Cultural+Journey+3"
            ],
            overview: "This 7-day tour offers an immersive cultural experience, taking you beyond the typical tourist trails to interact with various East African communities. Learn about their traditions, participate in daily activities, and gain a deeper understanding of their way of life. This tour emphasizes responsible and sustainable tourism.",
            highlights: [
                "Maasai village immersion and cultural exchange",
                "Visit to a local coffee plantation",
                "Interaction with Hadza hunter-gatherers",
                "Datoga tribe visit and craft workshops",
                "Authentic homestay experience",
                "Support for local communities"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Arusha, Tanzania", description: "Arrive at Kilimanjaro International Airport (JRO), transfer to your guesthouse in Arusha. Briefing on the cultural tour ahead.", meals: "Dinner", accommodation: "Guesthouse" },
                { day: "Day 2", title: "Maasai Village Immersion", description: "Spend a full day with a Maasai community, learning about their pastoral lifestyle, traditions, and participate in daily chores.", meals: "Breakfast, Lunch, Dinner", activity: "Cultural immersion" },
                { day: "Day 3", title: "Coffee Plantation & Local Market", description: "Visit a local coffee plantation to understand the coffee-making process from bean to cup. Explore a vibrant local market.", meals: "Breakfast, Lunch, Dinner", activity: "Coffee tasting, Market exploration" },
                { day: "Day 4", title: "Hadza Bushmen Experience", description: "Travel to Lake Eyasi and spend time with the Hadza hunter-gatherer tribe, learning their ancient survival techniques.", meals: "Breakfast, Lunch, Dinner", accommodation: "Homestay/Camp" },
                { day: "Day 5", title: "Datoga Tribe Visit & Crafts", description: "Visit the Datoga tribe, known for their metalwork and distinctive clothing. Learn about their crafts and traditions.", meals: "Breakfast, Lunch, Dinner", accommodation: "Homestay/Camp", activity: "Craft workshop" },
                { day: "Day 6", title: "Return to Arusha & Reflection", description: "Drive back to Arusha. Enjoy a farewell dinner and reflect on your cultural experiences.", meals: "Breakfast, Lunch, Dinner", accommodation: "Guesthouse" },
                { day: "Day 7", title: "Departure", description: "Transfer to Kilimanjaro International Airport for your onward flight.", meals: "Breakfast" }
            ],
            inclusions: [
                "6 nights accommodation in guesthouses/homestays",
                "All meals as specified (B, L, D)",
                "All cultural activity fees and community contributions",
                "Professional English-speaking local guide",
                "Transportation in a comfortable vehicle",
                "Bottled water"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Personal expenses"
            ],
            reviews: [
                { rating: 5, date: "3 weeks ago", text: "The cultural tour was truly eye-opening. We felt so welcomed by every community and learned so much. An authentic and respectful way to experience Tanzania.", author: "Maria K.", country: "Germany", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=MK" },
                { rating: 4, date: "2 months ago", text: "A very insightful tour. The interactions with the Hadza and Datoga tribes were highlights. Some parts were a bit rustic, but that's part of the authentic experience.", author: "Tom P.", country: "USA", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=TP" }
            ]
        },
        {
            id: 3,
            name: "Zanzibar Beach Escape",
            tagline: "Relax on the stunning white sands and turquoise waters of Zanzibar's pristine beaches.",
            type: "beach",
            duration: 6,
            nights: 5,
            price: 799,
            location: "Zanzibar, Tanzania",
            groupSize: "Private or small group",
            transport: "Private transfers on Zanzibar",
            accommodation: "Beach resorts/hotels",
            meals: "5 Breakfasts",
            activityLevel: "Relaxed",
            gallery: [
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Zanzibar+Beach+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Zanzibar+Beach+2",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Zanzibar+Beach+3"
            ],
            overview: "Unwind on the idyllic island of Zanzibar with this 6-day beach escape. Enjoy the sun-kissed beaches, crystal-clear waters perfect for snorkeling and diving, and explore the historic Stone Town. This tour offers a perfect blend of relaxation and cultural exploration.",
            highlights: [
                "Relax on pristine white-sand beaches",
                "Explore the historic Stone Town (UNESCO site)",
                "Spice farm tour to discover local aromas",
                "Snorkeling or diving in turquoise waters",
                "Sunset dhow cruise experience",
                "Visit Jozani Forest to see red colobus monkeys"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Zanzibar & Stone Town", description: "Arrive at Zanzibar International Airport (ZNZ), transfer to your hotel in Stone Town. Explore the narrow alleys and rich history of Stone Town.", meals: "None", accommodation: "Stone Town Hotel" },
                { day: "Day 2", title: "Spice Tour & Jozani Forest", description: "Morning spice tour to discover the island's aromatic spices. Afternoon visit to Jozani Forest to see the red colobus monkeys.", meals: "Breakfast", activity: "Spice tasting, Monkey viewing" },
                { day: "Day 3", title: "North Coast Beaches (Nungwi/Kendwa)", description: "Transfer to a beach resort on the north coast. Enjoy the white sandy beaches, swimming, and optional sunset dhow cruise.", meals: "Breakfast", accommodation: "Beach Resort" },
                { day: "Day 4", title: "Beach Relaxation & Water Activities", description: "Full day at leisure on the beach. Optional activities: snorkeling, diving, jet skiing, or simply relaxing by the ocean.", meals: "Breakfast", activity: "Water sports (optional)" },
                { day: "Day 5", title: "South East Coast (Jambiani/Paje)", description: "Transfer to the south-east coast, known for its vibrant kite-surfing scene and serene lagoons. Explore local villages and enjoy the serene atmosphere.", meals: "Breakfast", accommodation: "Beach Resort" },
                { day: "Day 6", title: "Departure", description: "Enjoy a final morning on the beach before transfer to ZNZ for your departure flight.", meals: "Breakfast" }
            ],
            inclusions: [
                "5 nights accommodation in selected hotels/resorts",
                "Daily breakfast",
                "Airport transfers",
                "Stone Town tour, Spice tour, Jozani Forest tour",
                "All ground transportation on Zanzibar"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Lunch and Dinner",
                "Optional water activities",
                "Tips and personal expenses"
            ],
            reviews: [
                { rating: 4.5, date: "1 week ago", text: "Zanzibar was paradise! The beaches were stunning and Stone Town was fascinating. The only minor issue was a slight delay in airport transfer, but overall a fantastic trip.", author: "Chloe S.", country: "France", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=CS" },
                { rating: 5, date: "1 month ago", text: "Perfect relaxation! The resort was beautiful, and the water activities were so much fun. Highly recommend this escape for anyone looking to unwind.", author: "David P.", country: "Canada", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=DP" }
            ]
        },
        {
            id: 4,
            name: "Great Migration Game Drive",
            tagline: "Witness the spectacular Great Migration in the Serengeti or Maasai Mara (seasonal).",
            type: "game-drive",
            duration: 4,
            nights: 3,
            price: 1200,
            location: "Serengeti / Maasai Mara",
            groupSize: "Small group (max 6)",
            transport: "4x4 Safari Vehicle",
            accommodation: "Luxury Tented Camps",
            meals: "3 Breakfasts, 4 Lunches, 3 Dinners",
            activityLevel: "Active Safari",
            gallery: [
                "https://placehold.co/1200x600/27AE60/ffffff?text=Migration+Safari+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Migration+Safari+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Migration+Safari+3"
            ],
            overview: "This intensive 4-day safari focuses on the incredible Great Migration, following millions of wildebeest and zebras across the vast plains. Depending on the season, you'll visit either the Serengeti National Park in Tanzania or the Maasai Mara National Reserve in Kenya. Prepare for unparalleled wildlife viewing opportunities and dramatic predator-prey interactions.",
            highlights: [
                "Witness the world-famous Great Migration (seasonal)",
                "Search for the Big Five and other predators",
                "Experience vast savannah landscapes",
                "Stay in luxurious tented camps",
                "Expert guides for optimal wildlife spotting",
                "Photographic opportunities of a lifetime"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival & Safari Begins", description: "Arrive at the nearest airstrip to the migration (e.g., Kogatende or Kichwa Tembo), meet your guide, and head straight for an afternoon game drive. Settle into your luxury tented camp.", meals: "Lunch, Dinner", accommodation: "Luxury Tented Camp" },
                { day: "Day 2", title: "Full Day Migration Tracking", description: "Spend the entire day tracking the migration, witnessing river crossings (seasonal) and observing the large herds. Enjoy a picnic lunch in the bush amidst the wildlife.", meals: "Breakfast, Lunch, Dinner", activity: "Migration tracking, Game drives" },
                { day: "Day 3", title: "Morning Game Drive & Relaxation", description: "Early morning game drive for last chances to spot wildlife. Afternoon at leisure at the camp, enjoying the wilderness sounds and facilities.", meals: "Breakfast, Lunch, Dinner", accommodation: "Luxury Tented Camp" },
                { day: "Day 4", title: "Departure", description: "After breakfast, transfer back to the airstrip for your flight out, carrying unforgettable memories of the migration.", meals: "Breakfast" }
            ],
            inclusions: [
                "3 nights accommodation in luxury tented camps",
                "All meals as specified (B, L, D)",
                "Park entrance fees",
                "Professional English-speaking safari guide",
                "Transportation in a 4x4 safari vehicle",
                "Bottled water during game drives"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Personal expenses"
            ],
            reviews: [
                { rating: 5, date: "1 month ago", text: "The Great Migration was beyond incredible! Our guide knew exactly where to go. It was a truly privileged experience to witness such a natural spectacle.", author: "Sophie L.", country: "UK", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=SL" },
                { rating: 5, date: "2 months ago", text: "Worth every penny. The camps were fantastic, and the game drives were exhilarating. If you want to see the migration, this is the tour to take!", author: "Robert G.", country: "USA", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=RG" }
            ]
        },
        {
            id: 5,
            name: "Eco-Friendly Community Tour",
            tagline: "Travel responsibly and contribute directly to local conservation and community projects.",
            type: "sustainable",
            duration: 8,
            nights: 7,
            price: 950,
            location: "Nairobi, Rural Communities, Kenya",
            groupSize: "Small group (max 10)",
            transport: "Comfortable touring vehicle",
            accommodation: "Eco-lodges/Homestays",
            meals: "7 Breakfasts, 7 Lunches, 7 Dinners",
            activityLevel: "Moderate",
            gallery: [
                "https://placehold.co/1200x600/F2994A/ffffff?text=Eco+Tour+1",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Eco+Tour+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Eco+Tour+3"
            ],
            overview: "This 8-day tour is designed for the conscious traveler, focusing on sustainable practices and direct community engagement. You'll visit eco-lodges, participate in conservation efforts, and interact with local communities, ensuring your travel has a positive impact. Experience the beauty of East Africa while giving back.",
            highlights: [
                "Participate in tree-planting initiatives",
                "Visit community farms and local schools",
                "Experience rural village homestay",
                "Learn traditional crafts from local artisans",
                "Engage with conservation projects",
                "Support ethical and responsible tourism"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Nairobi & Eco-Lodge Transfer", description: "Arrive in Nairobi, transfer to an eco-friendly lodge on the outskirts. Briefing on sustainable tourism principles and the tour's objectives.", meals: "Dinner", accommodation: "Eco-lodge" },
                { day: "Day 2", title: "Community Farm Visit & Tree Planting", description: "Visit a local community farm, learn about organic farming, and participate in a tree-planting initiative to contribute to reforestation efforts.", meals: "Breakfast, Lunch, Dinner", activity: "Tree planting, Farm visit" },
                { day: "Day 3", title: "Wildlife Sanctuary & Conservation Talk", description: "Explore a local wildlife sanctuary that focuses on rehabilitation and conservation. Attend a talk by conservationists to understand their work.", meals: "Breakfast, Lunch, Dinner", activity: "Conservation education" },
                { day: "Day 4", title: "Rural Village Homestay", description: "Experience a unique overnight homestay in a rural village, sharing meals and stories with a local family, gaining authentic cultural insights.", meals: "Breakfast, Lunch, Dinner", accommodation: "Homestay" },
                { day: "Day 5", title: "Traditional Craft Workshop & School Visit", description: "Participate in a traditional craft workshop, learning from local artisans. Visit a local school supported by tourism initiatives.", meals: "Breakfast, Lunch, Dinner", activity: "Crafts, Community support" },
                { day: "Day 6", title: "Nature Walk & Bird Watching", description: "Enjoy a guided nature walk, learning about local flora and fauna. Opportunities for bird watching in a pristine natural environment.", meals: "Breakfast, Lunch, Dinner", activity: "Nature exploration, Birding" },
                { day: "Day 7", title: "Return to Nairobi & Farewell", description: "Drive back to Nairobi. Enjoy a farewell dinner at a restaurant supporting local produce and reflect on your impactful journey.", meals: "Breakfast, Lunch, Dinner", accommodation: "Hotel" },
                { day: "Day 8", title: "Departure", description: "Transfer to Jomo Kenyatta International Airport for your departure flight, carrying memories of positive impact.", meals: "Breakfast" }
            ],
            inclusions: [
                "7 nights accommodation (eco-lodges, homestay)",
                "All meals as specified (B, L, D)",
                "All community and conservation activity fees",
                "Professional English-speaking guide",
                "Transportation in a comfortable vehicle",
                "Bottled water"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Personal expenses"
            ],
            reviews: [
                { rating: 5, date: "1 month ago", text: "This tour truly changed my perspective on travel. It felt good to contribute directly to the communities and see the impact. The eco-lodges were lovely too!", author: "Jessica T.", country: "Canada", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=JT" },
                { rating: 4.5, date: "2 months ago", text: "An incredibly meaningful trip. The homestay was a highlight. Sometimes the schedule was a bit packed, but it was worth it for the experiences.", author: "Ben W.", country: "UK", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=BW" }
            ]
        },
        {
            id: 6,
            name: "Luxury East Africa Safari",
            tagline: "Indulge in a premium safari experience with exclusive lodges and private game drives.",
            type: "safari",
            duration: 7,
            nights: 6,
            price: 1500,
            location: "Serengeti, Ngorongoro, Tarangire, Tanzania",
            groupSize: "Private or small group (max 4)",
            transport: "Luxury 4x4 Safari Vehicle, Internal flights",
            accommodation: "Luxury Lodges/Tented Camps",
            meals: "6 Breakfasts, 7 Lunches, 6 Dinners",
            activityLevel: "Relaxed Safari",
            gallery: [
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Luxury+Safari+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Luxury+Safari+2",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Luxury+Safari+3"
            ],
            overview: "Embark on an opulent 7-day luxury safari through East Africa's most pristine wilderness areas. Stay in exquisite lodges and camps, enjoy gourmet dining, and experience private game drives with expert guides. This tour offers unparalleled comfort and exclusive wildlife viewing opportunities, ensuring an unforgettable journey.",
            itinerary: [
                { day: "Day 1", title: "Arrival in Arusha & Luxury Lodge", description: "Arrive at Kilimanjaro International Airport (JRO), private transfer to a luxurious lodge near Arusha. Enjoy sundowners with stunning views.", meals: "Dinner", accommodation: "Luxury Lodge" },
                { day: "Day 2", title: "Tarangire National Park", description: "Morning flight to Tarangire. Afternoon game drive, known for its large elephant herds and baobab trees. Overnight in a luxury tented camp.", meals: "Breakfast, Lunch, Dinner", accommodation: "Luxury Tented Camp", activity: "Elephant viewing" },
                { day: "Day 3", title: "Ngorongoro Crater Exploration", description: "Descend into the magnificent Ngorongoro Crater for a full day game drive, a UNESCO World Heritage site teeming with wildlife. Picnic lunch in the crater.", meals: "Breakfast, Lunch, Dinner", activity: "Big Five spotting" },
                { day: "Day 4", title: "Serengeti National Park", description: "Morning flight to Serengeti. Afternoon game drive in the vast plains, famous for its big cats and endless horizons. Stay at a high-end camp.", meals: "Breakfast, Lunch, Dinner", accommodation: "Luxury Tented Camp", activity: "Big cat viewing" },
                { day: "Day 5", title: "Full Day Serengeti Game Drives", description: "Explore different sectors of the Serengeti, seeking out predators and their prey. Optional hot air balloon safari at sunrise for a breathtaking perspective.", meals: "Breakfast, Lunch, Dinner", accommodation: "Luxury Tented Camp", activity: "Hot air balloon (optional)" },
                { day: "Day 6", title: "Serengeti to Arusha & Relaxation", description: "Morning game drive, then fly back to Arusha. Enjoy a relaxing afternoon at your luxury lodge or spa, reflecting on your safari.", meals: "Breakfast, Lunch, Dinner", accommodation: "Luxury Lodge" },
                { day: "Day 7", title: "Departure", description: "Private transfer to Kilimanjaro International Airport for your departure flight, filled with unforgettable luxury safari memories.", meals: "Breakfast" }
            ],
            inclusions: [
                "6 nights accommodation in luxury lodges/camps",
                "Internal flights as per itinerary",
                "All meals as specified (B, L, D)",
                "All park entrance fees",
                "Private 4x4 safari vehicle with expert guide",
                "Unlimited bottled water and selected beverages",
                "Laundry service at camps"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Optional hot air balloon safari",
                "Premium alcoholic beverages"
            ],
            reviews: [
                { rating: 5, date: "1 week ago", text: "The most incredible trip of my life! Every detail was perfect, from the stunning lodges to the incredible wildlife sightings. Pure luxury and adventure.", author: "Eleanor V.", country: "USA", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=EV" },
                { rating: 5, date: "3 weeks ago", text: "Unforgettable. The private game drives were a game-changer, allowing us to spend more time with the animals. The food was exceptional. Worth every penny.", author: "Charles D.", country: "France", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=CD" }
            ]
        },
        {
            id: 7,
            name: "Mount Kilimanjaro Trek",
            tagline: "Conquer Africa's highest peak with experienced guides and breathtaking views.",
            type: "trekking",
            duration: 9,
            nights: 8,
            price: 1800,
            location: "Mount Kilimanjaro, Tanzania",
            groupSize: "Private or small group (max 12)",
            transport: "Walking, Porters",
            accommodation: "Mountain Tents",
            meals: "8 Breakfasts, 9 Lunches, 8 Dinners",
            activityLevel: "Strenuous",
            gallery: [
                "https://placehold.co/1200x600/F2994A/ffffff?text=Kilimanjaro+Trek+1",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Kilimanjaro+Trek+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Kilimanjaro+Trek+3"
            ],
            overview: "Embark on the challenge of a lifetime with our 9-day trek up Mount Kilimanjaro via the Machame Route. This route offers stunning scenery and a good acclimatization profile. You'll be supported by experienced guides, porters, and cooks, ensuring a safe and memorable ascent to Africa's highest point.",
            highlights: [
                "Summit Uhuru Peak, Africa's highest point",
                "Trek through diverse climatic zones (rainforest to alpine desert)",
                "Experience breathtaking panoramic views",
                "Benefit from expert guides and porters for safety",
                "Enjoy delicious and energizing mountain meals",
                "Achieve a personal triumph on a world-famous peak"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Moshi & Briefing", description: "Arrive at Kilimanjaro International Airport (JRO), transfer to your hotel in Moshi. Pre-trek briefing and gear check to ensure you're ready for the climb.", meals: "Dinner", accommodation: "Hotel in Moshi" },
                { day: "Day 2", title: "Machame Gate to Machame Camp", description: "Drive to Machame Gate (1,800m), register, and begin trekking through lush rainforest to Machame Camp (3,000m).", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Rainforest trek" },
                { day: "Day 3", title: "Machame Camp to Shira Camp", description: "Trek through moorland and across a valley to Shira Ridge, then descend slightly to Shira Camp (3,840m), offering stunning views of Kibo peak.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Moorland trek" },
                { day: "Day 4", title: "Shira Camp to Barranco Camp (Acclimatization Day)", description: "Ascend to Lava Tower (4,600m) for acclimatization, then descend to Barranco Camp (3,950m). This 'climb high, sleep low' strategy aids acclimatization.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Acclimatization hike" },
                { day: "Day 5", title: "Barranco Camp to Karanga Camp", description: "Tackle the famous Barranco Wall, a fun scramble (not climbing), then continue trekking through valleys and ridges to Karanga Camp (3,950m).", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Barranco Wall" },
                { day: "Day 6", title: "Karanga Camp to Barafu Camp", description: "Short but steep trek to Barafu Camp (4,600m), the base camp for the summit attempt. Spend the afternoon resting and preparing for the summit push.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Summit preparation" },
                { day: "Day 7", title: "Summit Attempt & Mweka Camp", description: "Begin summit ascent around midnight to Uhuru Peak (5,895m), arriving at sunrise. Descend to Barafu for rest, then continue to Mweka Camp (3,100m).", meals: "Breakfast, Lunch, Dinner", accommodation: "Mountain Tent", activity: "Summit day" },
                { day: "Day 8", title: "Descent to Mweka Gate & Moshi", description: "Final descent through rainforest to Mweka Gate, receive certificates, and transfer back to your hotel in Moshi for a well-deserved shower and celebration.", meals: "Breakfast, Lunch", accommodation: "Hotel in Moshi" },
                { day: "Day 9", title: "Departure", description: "Transfer to JRO for your departure flight, carrying the immense satisfaction of conquering Kilimanjaro.", meals: "Breakfast" }
            ],
            inclusions: [
                "2 nights hotel accommodation in Moshi (pre & post trek)",
                "6 nights mountain accommodation in tents",
                "All meals on the mountain (B, L, D)",
                "Professional English-speaking mountain guides",
                "Porters and cooks",
                "Park fees and rescue fees",
                "Camping equipment (tents, sleeping mats)",
                "Bottled water on first day, then filtered mountain water"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance (mandatory for trekking)",
                "Trekking gear (sleeping bag, warm clothing, boots, etc.)",
                "Tips for guides and porters",
                "Personal expenses"
            ],
            reviews: [
                { rating: 5, date: "1 month ago", text: "A life-changing experience! The guides were incredible and made sure we were safe and well-supported every step of the way. Reaching the summit was an emotional moment.", author: "Chris R.", country: "Germany", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=CR" },
                { rating: 4.5, date: "2 months ago", text: "Challenging but immensely rewarding. The views were spectacular. Be prepared for the cold, but the porters and crew were amazing. Highly recommend JesLights for this trek.", author: "Anna B.", country: "USA", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=AB" }
            ]
        },
        {
            id: 8,
            name: "Uganda Gorilla Trekking",
            tagline: "An exclusive encounter with mountain gorillas in their natural habitat.",
            type: "game-drive", // Categorized under game-drive for simplicity, but specific for gorilla trekking
            duration: 3,
            nights: 2,
            price: 2000, // Note: Gorilla permits alone are expensive
            location: "Bwindi Impenetrable National Park, Uganda",
            groupSize: "Small group (max 8)",
            transport: "Domestic flights, 4x4 vehicle",
            accommodation: "Mid-range/Luxury Lodges",
            meals: "2 Breakfasts, 3 Lunches, 2 Dinners",
            activityLevel: "Moderate to Strenuous",
            gallery: [
                "https://placehold.co/1200x600/27AE60/ffffff?text=Gorilla+Trekking+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Gorilla+Trekking+2",
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Gorilla+Trekking+3"
            ],
            overview: "Embark on an unforgettable 3-day gorilla trekking adventure in Uganda's Bwindi Impenetrable National Park. This intimate experience allows you to spend precious time with endangered mountain gorillas in their natural forest habitat. A truly once-in-a-lifetime wildlife encounter.",
            highlights: [
                "Intimate encounter with mountain gorillas",
                "Trek through ancient Bwindi Impenetrable Forest",
                "Learn about gorilla conservation efforts",
                "Experience Uganda's lush landscapes",
                "Photographic opportunities with gorillas",
                "Contribution to gorilla survival"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Entebbe & Transfer to Bwindi", description: "Arrive at Entebbe International Airport (EBB). Transfer to a domestic flight to Kihihi/Kisoro, then drive to your lodge near Bwindi. Briefing for gorilla trekking.", meals: "Dinner", accommodation: "Lodge near Bwindi" },
                { day: "Day 2", title: "Gorilla Trekking Day!", description: "Early morning start. Head to the park headquarters for briefing, then embark on your gorilla trek. Spend an hour observing a gorilla family. Return to lodge, celebrating your incredible experience.", meals: "Breakfast, Lunch, Dinner", activity: "Gorilla trekking" },
                { day: "Day 3", title: "Departure", description: "After breakfast, transfer back to the airstrip for your flight to Entebbe and onward international departure, carrying unforgettable memories.", meals: "Breakfast" }
            ],
            inclusions: [
                "2 nights accommodation near Bwindi",
                "All meals as specified (B, L, D)",
                "1 Gorilla trekking permit per person",
                "Park entrance fees",
                "Professional English-speaking guide",
                "Ground transportation in Uganda",
                "Bottled water during activities"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Personal expenses",
                "Domestic flights within Uganda" // Often booked separately or part of larger package
            ],
            reviews: [
                { rating: 5, date: "1 month ago", text: "Absolutely breathtaking! Seeing the gorillas up close was a profound experience. The trek was tough but worth every step. Highly professional guides.", author: "Mark J.", country: "Australia", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=MJ" },
                { rating: 4.5, date: "2 months ago", text: "An incredible wildlife encounter. The permit process was smooth, and the lodge was comfortable. The forest is truly impenetrable, but the reward is immense.", author: "Laura P.", country: "Canada", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=LP" }
            ]
        },
        {
            id: 9,
            name: "Kenya Wildlife & Culture",
            tagline: "A blend of thrilling wildlife safaris and immersive cultural experiences in Kenya.",
            type: "safari",
            duration: 6,
            nights: 5,
            price: 1100,
            location: "Amboseli, Lake Naivasha, Maasai Mara, Kenya",
            groupSize: "Small group (max 7)",
            transport: "4x4 Safari Vehicle, Internal flight",
            accommodation: "Mid-range Lodges/Camps",
            meals: "5 Breakfasts, 6 Lunches, 5 Dinners",
            activityLevel: "Moderate",
            gallery: [
                "https://placehold.co/1200x600/2C3E50/ffffff?text=Kenya+Wildlife+Culture+1",
                "https://placehold.co/1200x600/F2994A/ffffff?text=Kenya+Wildlife+Culture+2",
                "https://placehold.co/1200x600/27AE60/ffffff?text=Kenya+Wildlife+Culture+3"
            ],
            overview: "This 6-day tour offers the best of Kenya: classic wildlife safaris combined with authentic cultural encounters. Explore famous national parks like Amboseli with its elephant herds and stunning Kilimanjaro views, and delve into the rich traditions of local communities. A perfect balance of adventure and cultural immersion.",
            highlights: [
                "Game drives in Amboseli with Kilimanjaro views",
                "Boat ride on Lake Naivasha & Crescent Island walk",
                "Thrilling safaris in the iconic Maasai Mara",
                "Cultural exchange with local communities",
                "Opportunity to spot the Big Five",
                "Diverse landscapes from savannahs to lakes"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival in Nairobi & Amboseli Transfer", description: "Arrive at Jomo Kenyatta International Airport (NBO), meet your guide, and drive to Amboseli National Park. Afternoon game drive with Kilimanjaro backdrop.", meals: "Lunch, Dinner", accommodation: "Mid-range Lodge" },
                { day: "Day 2", title: "Full Day Amboseli Safari", description: "Enjoy morning and afternoon game drives in Amboseli, famous for its large elephant population and diverse birdlife. Visit a Maasai village for cultural exchange.", meals: "Breakfast, Lunch, Dinner", activity: "Maasai village visit" },
                { day: "Day 3", title: "Amboseli to Lake Naivasha", description: "After breakfast, drive to Lake Naivasha. Afternoon boat ride on the lake and a walking safari on Crescent Island, known for its wildlife.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mid-range Hotel", activity: "Boat ride, Walking safari" },
                { day: "Day 4", title: "Lake Naivasha to Maasai Mara", description: "Drive to the iconic Maasai Mara National Reserve. Afternoon game drive upon arrival, beginning your search for big cats.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mid-range Camp" },
                { day: "Day 5", title: "Full Day Maasai Mara Game Drives", description: "Spend a full day exploring the Mara, renowned for its 'Big Five' and annual Great Migration (seasonal). Enjoy morning and afternoon game drives.", meals: "Breakfast, Lunch, Dinner", accommodation: "Mid-range Camp", activity: "Full day game drives" },
                { day: "Day 6", title: "Departure", description: "Morning game drive, then transfer to the airstrip for a flight back to Nairobi, connecting to your international departure.", meals: "Breakfast, Lunch" }
            ],
            inclusions: [
                "5 nights accommodation in mid-range lodges/camps",
                "All meals as specified (B, L, D)",
                "Park entrance fees to Amboseli, Lake Naivasha, Maasai Mara",
                "Professional English-speaking safari guide",
                "Transportation in a 4x4 safari vehicle",
                "Boat ride on Lake Naivasha",
                "Maasai village visit",
                "Bottled water during game drives"
            ],
            exclusions: [
                "International flights",
                "Visa fees",
                "Travel insurance",
                "Tips and gratuities",
                "Personal expenses"
            ],
            reviews: [
                { rating: 5, date: "3 weeks ago", text: "A fantastic combination of wildlife and culture. Amboseli was incredible, and the Maasai village visit was very special. Our guide was excellent.", author: "Olivia D.", country: "USA", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=OD" },
                { rating: 4.5, date: "1 month ago", text: "Kenya is stunning! The safari was thrilling, and the cultural aspects added so much depth. The internal flight saved a lot of driving time, which was great.", author: "Peter S.", country: "Germany", avatar: "https://placehold.co/40x40/D1D5DB/6B7280?text=PS" }
            ]
        }
    ];

    // Function to load tour details based on ID from URL
    const loadTourDetails = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const tourId = parseInt(urlParams.get('id'));

        currentTour = mockTours.find(t => t.id === tourId);

        if (currentTour) {
            // Update SEO meta tags dynamically
            document.title = `${currentTour.name} | JesLights Tours & Travel`;
            document.querySelector('meta[name="description"]').setAttribute('content', `Detailed itinerary, pricing, and inclusions for our ${currentTour.name} tour package. ${currentTour.overview.substring(0, 150)}...`);
            document.querySelector('meta[name="keywords"]').setAttribute('content', `${currentTour.name.toLowerCase().replace(/\s/g, ', ')}, ${currentTour.type} safari, ${currentTour.location.toLowerCase().replace(/\s/g, ', ')}, East Africa travel`);
            document.querySelector('meta[property="og:title"]').setAttribute('content', `${currentTour.name} | JesLights Tours & Travel`);
            document.querySelector('meta[property="og:description"]').setAttribute('content', `Detailed information and AI-powered packing list for your ${currentTour.name} adventure.`);
            document.querySelector('meta[property="og:image"]').setAttribute('content', currentTour.gallery[0] || 'https://placehold.co/1200x630/2C3E50/ffffff?text=Tour+Detail');
            document.querySelector('meta[property="twitter:title"]').setAttribute('content', `${currentTour.name} | JesLights Tours & Travel`);
            document.querySelector('meta[property="twitter:description"]').setAttribute('content', `Detailed information and AI-powered packing list for your ${currentTour.name} adventure.`);
            document.querySelector('meta[property="twitter:image"]').setAttribute('content', currentTour.gallery[0] || 'https://placehold.co/1200x675/F2994A/ffffff?text=Tour+Detail');


            // Update Tour Title Overlay
            tourTitleOverlay.textContent = currentTour.name;
            overlayLocation.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i> ${currentTour.location}`;
            overlayDuration.innerHTML = `<i class="fas fa-clock mr-1"></i> ${currentTour.duration} days / ${currentTour.nights} nights`;
            overlayGroupSize.innerHTML = `<i class="fas fa-users mr-1"></i> ${currentTour.groupSize}`;
            overlayPrice.innerHTML = `<i class="fas fa-tag mr-1"></i> From $${currentTour.price} per person`;

            // Update Breadcrumb
            breadcrumbTourName.textContent = currentTour.name;

            // Update Tour Overview
            tourOverview.textContent = currentTour.overview;

            // Populate Tour Highlights
            tourHighlights.innerHTML = '';
            currentTour.highlights.forEach(highlight => {
                const div = document.createElement('div');
                div.className = 'flex items-start p-4 bg-gray-50 rounded-lg';
                div.innerHTML = `<i class="fas fa-check text-primary-green mt-1 mr-3"></i><span>${highlight}</span>`;
                tourHighlights.appendChild(div);
            });

            // Populate Itinerary
            tourItinerary.innerHTML = '';
            currentTour.itinerary.forEach(item => {
                const div = document.createElement('div');
                div.className = 'border-l-4 border-primary-orange pl-6 py-2';
                let mealsHtml = item.meals ? `<span class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"><i class="fas fa-utensils mr-1 text-primary-orange"></i> ${item.meals}</span>` : '';
                let transportHtml = item.transport ? `<span class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"><i class="fas fa-car mr-1 text-primary-orange"></i> ${item.transport}</span>` : '';
                let accommodationHtml = item.accommodation ? `<span class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"><i class="fas fa-bed mr-1 text-primary-orange"></i> ${item.accommodation}</span>` : '';
                let activityHtml = item.activity ? `<span class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"><i class="fas fa-info-circle mr-1 text-primary-orange"></i> ${item.activity}</span>` : '';

                div.innerHTML = `
                    <h3 class="text-xl font-semibold text-primary-blue mb-2">${item.day}: ${item.title}</h3>
                    <p class="text-gray-700 mb-3">${item.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${mealsHtml}
                        ${transportHtml}
                        ${accommodationHtml}
                        ${activityHtml}
                    </div>
                `;
                tourItinerary.appendChild(div);
            });

            // Populate Inclusions
            tourInclusions.innerHTML = '';
            currentTour.inclusions.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `<i class="fas fa-check text-primary-green mt-1 mr-2"></i><span>${item}</span>`;
                tourInclusions.appendChild(li);
            });

            // Populate Exclusions
            tourExclusions.innerHTML = '';
            currentTour.exclusions.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `<i class="fas fa-times text-primary-orange mt-1 mr-2"></i><span>${item}</span>`;
                tourExclusions.appendChild(li);
            });

            // Populate Reviews
            tourReviewsContainer.innerHTML = ''; // Clear existing reviews
            if (currentTour.reviews && currentTour.reviews.length > 0) {
                currentTour.reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'bg-gray-50 p-6 rounded-lg';
                    let starsHtml = '';
                    for (let i = 0; i < Math.floor(review.rating); i++) {
                        starsHtml += '<i class="fas fa-star"></i>';
                    }
                    if (review.rating % 1 !== 0) { // Check for half star
                        starsHtml += '<i class="fas fa-star-half-alt"></i>';
                    }

                    reviewDiv.innerHTML = `
                        <div class="flex items-center mb-4">
                            <div class="text-primary-orange text-2xl mr-2">
                                ${starsHtml}
                            </div>
                            <span class="text-gray-600">Reviewed ${review.date}</span>
                        </div>
                        <p class="text-gray-700 mb-4">"${review.text}"</p>
                        <div class="flex items-center">
                            <img src="${review.avatar}" alt="${review.author} Avatar" class="rounded-full w-10 h-10 object-cover mr-3">
                            <div>
                                <h4 class="font-semibold">${review.author}</h4>
                                <p class="text-sm text-gray-500">${review.country}</p>
                            </div>
                        </div>
                    `;
                    tourReviewsContainer.appendChild(reviewDiv);
                });
            } else {
                tourReviewsContainer.innerHTML = '<p class="text-gray-600">No reviews yet for this tour. Be the first to share your experience!</p>';
            }


            // Populate Booking Widget
            bookingWidgetPrice.textContent = `$${currentTour.price}`;
            basePriceCalcDisplay.textContent = `1`; // Default to 1 participant
            basePriceTotalDisplay.textContent = `$${currentTour.price.toFixed(2)}`;
            const initialTaxes = currentTour.price * 0.05; // Assuming 5% tax
            taxesTotalDisplay.textContent = `$${initialTaxes.toFixed(2)}`;
            bookingTotalPriceDisplay.textContent = `$${(currentTour.price + initialTaxes).toFixed(2)}`;

            // Populate Quick Facts
            quickFactDuration.textContent = `${currentTour.duration} days / ${currentTour.nights} nights`;
            quickFactGroupSize.textContent = currentTour.groupSize;
            quickFactDestinations.textContent = currentTour.location;
            quickFactTransport.textContent = currentTour.transport;
            quickFactAccommodation.textContent = currentTour.accommodation;
            quickFactMeals.textContent = currentTour.meals;
            quickFactActivityLevel.textContent = currentTour.activityLevel;

            // Initialize Glide.js for the image gallery
            const gallerySlides = document.getElementById('gallery-slides');
            gallerySlides.innerHTML = ''; // Clear placeholder
            currentTour.gallery.forEach(imgSrc => {
                const li = document.createElement('li');
                li.className = 'glide__slide';
                li.innerHTML = `<img src="${imgSrc}" alt="${currentTour.name} image" class="w-full h-[400px] md:h-[500px] object-cover">`;
                gallerySlides.appendChild(li);
            });

            new Glide('#tour-gallery', {
                type: 'carousel',
                perView: 1,
                autoplay: 4000,
                hoverpause: true,
                animationDuration: 800,
                gap: 0, // No gap between slides
            }).mount();

            // Store tour details in data attributes for AI packing list generation
            generatePackingListBtn.dataset.tourType = currentTour.type;
            generatePackingListBtn.dataset.tourDuration = currentTour.duration;

            // Set the href for the "Book Now" widget button
            if (bookNowWidgetBtn) {
                bookNowWidgetBtn.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default form submission
                    // Collect data from the booking widget form
                    const selectedDate = bookingTourDateInput.value;
                    const selectedParticipants = parseInt(bookingParticipantsSelect.value);

                    // Basic validation for widget
                    if (!selectedDate) {
                        alert('Please select a departure date.'); // Using alert for simplicity, replace with custom modal
                        return;
                    }
                    if (selectedParticipants < 1 || isNaN(selectedParticipants)) {
                        alert('Number of participants must be at least 1.'); // Using alert for simplicity
                        return;
                    }

                    const bookingData = {
                        tourId: currentTour.id,
                        tourName: currentTour.name,
                        tourPricePerPerson: currentTour.price,
                        tourDuration: currentTour.duration,
                        departureDate: selectedDate,
                        numTravelers: selectedParticipants,
                        // Add other necessary data from the main booking form if pre-filled
                        leadTravelerName: "", // These would be filled on the next page
                        email: "",
                        phone: "",
                        specialRequests: ""
                    };

                    sessionStorage.setItem('currentBookingDetails', JSON.stringify(bookingData));
                    window.location.href = 'booking-form.html?tourId=' + currentTour.id; // Redirect to full booking form
                });
            }

            // Update booking widget price on participants change
            bookingParticipantsSelect.addEventListener('change', () => {
                const participants = parseInt(bookingParticipantsSelect.value);
                const pricePerPerson = currentTour.price;
                const calculatedSubtotal = participants * pricePerPerson;
                const taxesPercentage = 0.05; // 5% taxes and fees
                const calculatedTaxes = calculatedSubtotal * taxesPercentage;
                const calculatedTotal = calculatedSubtotal + calculatedTaxes;

                basePriceCalcDisplay.textContent = participants;
                basePriceTotalDisplay.textContent = `$${calculatedSubtotal.toFixed(2)}`;
                taxesTotalDisplay.textContent = `$${calculatedTaxes.toFixed(2)}`;
                bookingTotalPriceDisplay.textContent = `$${calculatedTotal.toFixed(2)}`;
            });

            // Populate Related Tours
            populateRelatedTours(currentTour.id);


        } else {
            // Handle "Tour Not Found" scenario
            document.title = "Tour Not Found - JesLights Tours & Travel";
            tourTitleOverlay.textContent = "Tour Not Found";
            overlayLocation.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i> Invalid Tour`;
            overlayDuration.innerHTML = ``;
            overlayGroupSize.innerHTML = ``;
            overlayPrice.innerHTML = ``;
            breadcrumbTourName.textContent = "Not Found";
            tourOverview.textContent = "The tour you are looking for does not exist. Please return to the tours page to select a valid tour.";
            tourHighlights.innerHTML = '<p class="text-gray-600">No highlights available.</p>';
            tourItinerary.innerHTML = '<p class="text-gray-600">No itinerary available.</p>';
            tourInclusions.innerHTML = '<li>No inclusions listed.</li>';
            tourExclusions.innerHTML = '<li>No exclusions listed.</li>';
            tourReviewsContainer.innerHTML = '<p class="text-gray-600">No reviews found.</p>'; // Handle reviews for not found

            // Disable all interactive elements
            generatePackingListBtn.disabled = true;
            generatePackingListBtn.textContent = "Tour Not Found";
            generatePackingListBtn.classList.add('opacity-50', 'cursor-not-allowed');
            if (bookNowWidgetBtn) {
                bookNowWidgetBtn.disabled = true;
                bookNowWidgetBtn.textContent = "Tour Not Found";
                bookNowWidgetBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
            bookingWidgetPrice.textContent = "$N/A";
            bookingTourDateInput.disabled = true;
            bookingParticipantsSelect.disabled = true;
            basePriceCalcDisplay.textContent = "N/A";
            basePriceTotalDisplay.textContent = "$N/A";
            taxesTotalDisplay.textContent = "$N/A";
            bookingTotalPriceDisplay.textContent = "$N/A";

            // Clear related tours if tour not found
            if (relatedToursContainer) {
                relatedToursContainer.innerHTML = '';
            }
        }
    };

    // Function to populate related tours
    const populateRelatedTours = (currentTourId) => {
        if (!relatedToursContainer) return; // Exit if container not found

        relatedToursContainer.innerHTML = ''; // Clear existing related tours

        // Filter out the current tour and get up to 3 other tours
        const relatedTours = mockTours.filter(tour => tour.id !== currentTourId)
                                      .sort(() => 0.5 - Math.random()) // Randomize order
                                      .slice(0, 3); // Get top 3

        if (relatedTours.length > 0) {
            relatedTours.forEach(tour => {
                const tourCard = document.createElement('div');
                tourCard.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition';
                tourCard.innerHTML = `
                    <img src="${tour.gallery[0] || 'https://placehold.co/400x250/D1D5DB/6B7280?text=Related+Tour'}" alt="${tour.name}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-primary-blue mb-2">${tour.name}</h3>
                        <p class="text-gray-600 mb-4">${tour.tagline.substring(0, 70)}...</p>
                        <div class="flex justify-between items-center">
                            <span class="text-primary-orange font-bold">From $${tour.price}</span>
                            <span class="text-gray-500">${tour.duration} days</span>
                        </div>
                        <a href="tour-detail.html?id=${tour.id}" class="block mt-4 text-center bg-primary-green hover:bg-accent-green text-white py-2 rounded-md transition">View Details</a>
                    </div>
                `;
                relatedToursContainer.appendChild(tourCard);
            });
        } else {
            relatedToursContainer.innerHTML = '<p class="text-gray-600 text-center col-span-full">No related tours found.</p>';
        }
    };

    // --- AI-Powered Packing List Generator ---
    generatePackingListBtn.addEventListener('click', async () => {
        const tourType = generatePackingListBtn.dataset.tourType;
        const tourDuration = generatePackingListBtn.dataset.tourDuration;

        if (!tourType || !tourDuration) {
            console.error("Tour type or duration not found for packing list generation.");
            packingListError.classList.remove('hidden');
            packingListOutput.classList.remove('hidden'); // Ensure container is visible
            packingListItems.innerHTML = '<li>Error: Tour details missing for packing list.</li>';
            return;
        }

        packingListLoading.classList.remove('hidden');
        packingListOutput.classList.add('hidden'); // Hide previous output
        packingListError.classList.add('hidden'); // Hide previous errors
        packingListItems.innerHTML = ''; // Clear previous list

        const prompt = `Generate a comprehensive packing list for a ${tourDuration}-day ${tourType} tour in East Africa. Consider essentials, clothing suitable for the climate and activities, health items, and any specific gear for this type of trip. Provide the list as bullet points.`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will automatically provide the API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}. This might be due to an issue with API key authentication or permissions in the environment.`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                
                // Parse the bullet points and display them
                const items = text.split('\n').filter(line => line.trim().startsWith('*') || line.trim().startsWith('-')).map(line => line.replace(/^[*-]\s*/, '').trim());
                
                if (items.length > 0) {
                    items.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        packingListItems.appendChild(li);
                    });
                    packingListOutput.classList.remove('hidden');
                } else {
                    packingListError.classList.remove('hidden');
                    packingListOutput.classList.remove('hidden'); // Show container even if list is empty
                    packingListItems.innerHTML = '<li>No items generated. The AI might not have understood the request fully.</li>'; // Fallback message
                }
            } else {
                console.error("Unexpected API response structure:", result);
                packingListError.classList.remove('hidden');
                packingListOutput.classList.remove('hidden');
                packingListItems.innerHTML = '<li>Error: Unexpected response from AI.</li>';
            }
        } catch (error) {
            console.error("Error generating packing list:", error);
            packingListError.classList.remove('hidden');
            packingListOutput.classList.remove('hidden');
            packingListItems.innerHTML = `<li>Error: ${error.message || 'Failed to connect to the AI service.'} Please ensure your environment is correctly configured and try again.</li>`;
        } finally {
            packingListLoading.classList.add('hidden');
        }
    });

    // Load tour details when the page loads
    loadTourDetails();
});
