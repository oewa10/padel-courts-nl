// In-memory data store
const courts = [
    {
        id: 1,
        name: "Padel Factory Amsterdam",
        location: "Amsterdam",
        pricePerHour: 40,
        indoor: true,
        rating: 4.8,
        reviewCount: 127,
        features: ["indoor", "lighting", "showers", "parking", "restaurant"],
        imageUrl: "https://padelfactory.nl/wp-content/uploads/2023/01/padel-factory-amsterdam.jpg",
        coordinates: {
            lat: 52.3676,
            lng: 4.9041
        },
        popularTimes: {
            "Monday": [20, 30, 40, 45, 50, 60, 70, 80, 85, 80, 70, 60, 50, 40],
            "Tuesday": [25, 35, 45, 50, 55, 65, 75, 85, 90, 85, 75, 65, 55, 45],
            "Wednesday": [30, 40, 50, 55, 60, 70, 80, 90, 95, 90, 80, 70, 60, 50],
            "Thursday": [35, 45, 55, 60, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55],
            "Friday": [40, 50, 60, 65, 70, 80, 90, 100, 100, 100, 90, 80, 70, 60],
            "Saturday": [45, 55, 65, 70, 75, 85, 95, 100, 100, 100, 95, 85, 75, 65],
            "Sunday": [35, 45, 55, 60, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55]
        }
    },
    {
        id: 2,
        name: "Padel Club Rotterdam",
        location: "Rotterdam",
        pricePerHour: 38,
        indoor: false,
        rating: 4.6,
        reviewCount: 89,
        features: ["outdoor", "lighting", "parking"],
        imageUrl: "https://www.padelclub.rotterdam/wp-content/uploads/2023/02/padel-rotterdam.jpg",
        coordinates: {
            lat: 51.9225,
            lng: 4.4792
        },
        popularTimes: {
            "Monday": [15, 25, 35, 40, 45, 55, 65, 75, 80, 75, 65, 55, 45, 35],
            "Tuesday": [20, 30, 40, 45, 50, 60, 70, 80, 85, 80, 70, 60, 50, 40],
            "Wednesday": [25, 35, 45, 50, 55, 65, 75, 85, 90, 85, 75, 65, 55, 45],
            "Thursday": [30, 40, 50, 55, 60, 70, 80, 90, 95, 90, 80, 70, 60, 50],
            "Friday": [35, 45, 55, 60, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55],
            "Saturday": [40, 50, 60, 65, 70, 80, 90, 100, 100, 100, 90, 80, 70, 60],
            "Sunday": [30, 40, 50, 55, 60, 70, 80, 90, 95, 90, 80, 70, 60, 50]
        }
    },
    {
        id: 3,
        name: "The Padel Hub Utrecht",
        location: "Utrecht",
        pricePerHour: 42,
        indoor: true,
        rating: 4.7,
        reviewCount: 156,
        features: ["indoor", "lighting", "showers", "parking", "restaurant"],
        imageUrl: "https://padelhub-utrecht.nl/wp-content/uploads/2023/03/padel-utrecht.jpg",
        coordinates: {
            lat: 52.0907,
            lng: 5.1214
        },
        popularTimes: {
            "Monday": [20, 30, 40, 45, 50, 60, 70, 80, 85, 80, 70, 60, 50, 40],
            "Tuesday": [25, 35, 45, 50, 55, 65, 75, 85, 90, 85, 75, 65, 55, 45],
            "Wednesday": [30, 40, 50, 55, 60, 70, 80, 90, 95, 90, 80, 70, 60, 50],
            "Thursday": [35, 45, 55, 60, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55],
            "Friday": [40, 50, 60, 65, 70, 80, 90, 100, 100, 100, 90, 80, 70, 60],
            "Saturday": [45, 55, 65, 70, 75, 85, 95, 100, 100, 100, 95, 85, 75, 65],
            "Sunday": [35, 45, 55, 60, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55]
        }
    }
];

const reviews = [
    {
        id: 1,
        courtId: 1,
        userId: "john_doe",
        rating: 5,
        date: "2024-12-15",
        comment: "Excellent facilities and very friendly staff. The indoor courts are well-maintained.",
        userImage: "https://i.pravatar.cc/150?u=john_doe"
    },
    {
        id: 2,
        courtId: 1,
        userId: "sarah_smith",
        rating: 4,
        date: "2024-12-14",
        comment: "Geweldige banen en goede service. Parkeren is wel soms lastig.",
        userImage: "https://i.pravatar.cc/150?u=sarah_smith"
    },
    {
        id: 3,
        courtId: 2,
        userId: "peter_jansen",
        rating: 5,
        date: "2024-12-16",
        comment: "Perfecte locatie en super banen. Aanrader!",
        userImage: "https://i.pravatar.cc/150?u=peter_jansen"
    }
];

const bookings = [];

// Feature translations
const featureTranslations = {
    'indoor': 'Binnen',
    'outdoor': 'Buiten',
    'lighting': 'Verlichting',
    'showers': 'Douches',
    'lockers': 'Kluisjes',
    'parking': 'Parkeren',
    'restaurant': 'Restaurant',
    'shop': 'Winkel',
    'wheelchair_accessible': 'Rolstoeltoegankelijk',
    'coaching': 'Training beschikbaar'
};

// Translate a single feature
function translateFeature(feature) {
    return featureTranslations[feature] || feature;
}

// Generate time slots between 9:00 and 22:00
function generateTimeSlots(date, courtId) {
    const existingBookings = bookings.filter(b => b.courtId === courtId && b.date === date);
    const slots = [];
    
    for (let hour = 9; hour < 22; hour++) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
        if (!existingBookings.some(b => b.startTime === timeSlot)) {
            slots.push(timeSlot);
        }
    }
    
    return slots;
}

// Filter courts based on criteria
function filterCourts(filters = {}) {
    return courts.filter(court => {
        if (filters.indoor !== undefined && court.indoor !== filters.indoor) return false;
        if (filters.minPrice !== undefined && court.pricePerHour < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && court.pricePerHour > filters.maxPrice) return false;
        if (filters.minRating !== undefined && court.rating < filters.minRating) return false;
        if (filters.location && !court.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.features && !filters.features.every(f => court.features.includes(f))) return false;
        return true;
    });
}

// Sort courts by different criteria
function sortCourts(courts, sortBy = 'recommended') {
    const sortedCourts = [...courts];
    switch (sortBy) {
        case 'price_low':
            return sortedCourts.sort((a, b) => a.pricePerHour - b.pricePerHour);
        case 'price_high':
            return sortedCourts.sort((a, b) => b.pricePerHour - a.pricePerHour);
        case 'rating':
            return sortedCourts.sort((a, b) => b.rating - a.rating);
        case 'recommended':
        default:
            return sortedCourts.sort((a, b) => {
                // Complex sorting algorithm considering multiple factors
                const ratingScore = (b.rating * 2) - (a.rating * 2);
                const reviewScore = (Math.log(b.reviewCount) - Math.log(a.reviewCount)) * 0.5;
                const priceScore = (a.pricePerHour - b.pricePerHour) * 0.01;
                return ratingScore + reviewScore + priceScore;
            });
    }
}

// Add a booking
function addBooking(booking) {
    booking.id = bookings.length + 1;
    booking.status = 'confirmed';
    booking.confirmationNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    booking.createdAt = new Date().toISOString();
    bookings.push(booking);
    return booking;
}

// Get popular times for a court
function getPopularTimes(courtId, dayOfWeek) {
    const court = courts.find(c => c.id === courtId);
    return court ? court.popularTimes[dayOfWeek] : null;
}

// Get reviews for a specific court
function getReviewsForCourt(courtId) {
    return reviews.filter(review => review.courtId === courtId);
}

// Get the latest review for a court
function getLatestReview(courtId) {
    const courtReviews = getReviewsForCourt(courtId);
    return courtReviews.length > 0 ? courtReviews[0] : null;
}

// Add a new review
function addReview(review) {
    review.id = reviews.length + 1;
    review.date = new Date().toISOString().split('T')[0];
    reviews.unshift(review); // Add to beginning of array
    
    // Update court rating and review count
    const court = courts.find(c => c.id === review.courtId);
    if (court) {
        const courtReviews = getReviewsForCourt(court.id);
        court.rating = (courtReviews.reduce((sum, r) => sum + r.rating, 0) / courtReviews.length).toFixed(1);
        court.reviewCount = courtReviews.length;
    }
    
    return review;
}

// Update the court template feature mapping
function getCourtTemplate(court, latestReview) {
    const fallbackImage = 'https://via.placeholder.com/800x600?text=Padelbaan';
    const stars = '★'.repeat(Math.floor(court.rating)) + '☆'.repeat(5 - Math.floor(court.rating));
    const features = court.features.map(feature => translateFeature(feature));
    
    return `
        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" id="court-${court.id}">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1">
                    <img src="${court.imageUrl}" 
                         alt="${court.name}" 
                         class="w-full h-48 object-cover rounded"
                         onerror="this.onerror=null; this.src='${fallbackImage}';">
                    <div class="mt-2">
                        <div class="text-sm text-gray-600">Populaire tijden vandaag:</div>
                        <div class="popular-times-graph flex items-end h-16 space-x-1 mt-1">
                            <!-- Popular times bars will be inserted here -->
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">${court.name}</h3>
                        <div class="flex items-center">
                            <div class="text-yellow-400">${stars}</div>
                            <span class="ml-2 text-gray-600">(${court.reviewCount})</span>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-2">${court.location}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${features.map(feature => 
                            `<span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">${feature}</span>`
                        ).join('')}
                    </div>
                    ${latestReview ? `
                        <div class="bg-gray-50 p-4 rounded-lg mb-4">
                            <div class="text-sm text-gray-600 mb-2">Laatste beoordeling:</div>
                            <div class="flex items-start space-x-3">
                                <img src="${latestReview.userImage}" 
                                     alt="Reviewer" 
                                     class="w-10 h-10 rounded-full"
                                     onerror="this.onerror=null; this.src='https://via.placeholder.com/40x40?text=U';">
                                <div>
                                    <div class="font-medium text-gray-900">${latestReview.userId}</div>
                                    <div class="text-yellow-400 text-sm my-1">${'★'.repeat(latestReview.rating)}${'☆'.repeat(5-latestReview.rating)}</div>
                                    <p class="text-gray-600">${latestReview.comment}</p>
                                </div>
                            </div>
                        </div>
                    ` : '<p class="text-sm text-gray-500">Nog geen beoordelingen</p>'}
                    <div class="flex items-center justify-between mt-4">
                        <div>
                            <span class="text-2xl font-bold">€${court.pricePerHour}</span>
                            <span class="text-gray-600">/uur</span>
                        </div>
                        <button 
                            onclick="openBooking(${court.id})" 
                            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Nu Boeken
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Export for use in other files
window.padelApp = {
    courts,
    reviews,
    generateTimeSlots,
    addBooking,
    filterCourts,
    sortCourts,
    getPopularTimes,
    getReviewsForCourt,
    getLatestReview,
    addReview,
    getCourtTemplate
};
