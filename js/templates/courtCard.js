// Feature icons mapping
const FEATURE_ICONS = {
    INDOOR: 'fa-warehouse',
    OUTDOOR: 'fa-sun',
    LIGHTING: 'fa-lightbulb',
    SHOWERS: 'fa-shower',
    PARKING: 'fa-parking',
    RESTAURANT: 'fa-utensils'
};

// Feature labels in Dutch
const FEATURE_LABELS = {
    INDOOR: 'Indoor',
    OUTDOOR: 'Outdoor',
    LIGHTING: 'Verlichting',
    SHOWERS: 'Douches',
    PARKING: 'Parkeren',
    RESTAURANT: 'Restaurant'
};

// Court card template
function createCourtCard(court) {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' });
    
    // Create feature badges
    const featureBadges = court.features.map(feature => `
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
            <i class="fas ${FEATURE_ICONS[feature]} mr-1"></i>
            ${FEATURE_LABELS[feature]}
        </span>
    `).join('');
    
    return `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="${court.imageUrl}" alt="${court.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-bold mb-2">${court.name}</h3>
                <p class="text-gray-600 mb-2">${court.location}</p>
                <div class="flex items-center mb-2">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1 font-semibold">${court.rating}</span>
                    <span class="ml-2 text-gray-600">(${court.reviewCount} reviews)</span>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-3">
                    <i class="fas fa-clock mr-2"></i>
                    <span>Vandaag geopend: ${court.openingHours[today].open} - ${court.openingHours[today].close}</span>
                </div>
                <div class="flex flex-wrap mb-3">
                    ${featureBadges}
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold">€${court.pricePerHour}/uur</span>
                    <button onclick="App.booking.openBooking(${court.id})" 
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Reserveren
                    </button>
                </div>
            </div>
        </div>
    `;
}

export { createCourtCard };
