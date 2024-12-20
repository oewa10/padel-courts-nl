// Feature constants
const FEATURES = {
    INDOOR: 'indoor',
    OUTDOOR: 'outdoor',
    LIGHTING: 'lighting',
    SHOWERS: 'showers',
    PARKING: 'parking',
    RESTAURANT: 'restaurant',
    EQUIPMENT_RENTAL: 'equipment-rental',
    PRO_TRAINING: 'pro-training',
    CAFE: 'cafe'
};

// Courts data
const courts = [
    {
        id: 1,
        name: "Padel Factory Amsterdam",
        location: "Amsterdam",
        pricePerHour: 40,
        courtType: FEATURES.INDOOR,
        rating: 4.8,
        reviewCount: 127,
        features: [
            FEATURES.INDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING,
            FEATURES.RESTAURANT
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
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
        courtType: FEATURES.OUTDOOR,
        rating: 4.6,
        reviewCount: 89,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
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
        id: 4,
        name: "Utrecht Padel Academy",
        location: "Utrecht",
        pricePerHour: 42,
        courtType: FEATURES.INDOOR,
        rating: 4.9,
        reviewCount: 203,
        features: [
            FEATURES.INDOOR,
            FEATURES.EQUIPMENT_RENTAL,
            FEATURES.PRO_TRAINING,
            FEATURES.CAFE
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.0907,
            lng: 5.1214
        }
    },
    {
        id: 5,
        name: "Eindhoven Padel Center",
        location: "Eindhoven",
        pricePerHour: 36,
        courtType: FEATURES.OUTDOOR,
        rating: 4.5,
        reviewCount: 167,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.PARKING,
            FEATURES.LIGHTING,
            FEATURES.EQUIPMENT_RENTAL
        ],
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 51.4416,
            lng: 5.4697
        }
    },
    {
        id: 6,
        name: "Groningen Padel Club",
        location: "Groningen",
        pricePerHour: 34,
        courtType: FEATURES.INDOOR,
        rating: 4.7,
        reviewCount: 142,
        features: [
            FEATURES.INDOOR,
            FEATURES.PARKING,
            FEATURES.SHOWERS,
            FEATURES.CAFE
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 53.2194,
            lng: 6.5665
        }
    },
    {
        id: 7,
        name: "Maastricht Padel",
        location: "Maastricht",
        pricePerHour: 37,
        courtType: FEATURES.OUTDOOR,
        rating: 4.6,
        reviewCount: 98,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.PARKING,
            FEATURES.LIGHTING,
            FEATURES.RESTAURANT
        ],
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 50.8514,
            lng: 5.6910
        }
    },
    {
        id: 8,
        name: "Almere Padel Complex",
        location: "Almere",
        pricePerHour: 39,
        courtType: FEATURES.INDOOR,
        rating: 4.4,
        reviewCount: 76,
        features: [
            FEATURES.INDOOR,
            FEATURES.PARKING,
            FEATURES.EQUIPMENT_RENTAL,
            FEATURES.CAFE
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.3508,
            lng: 5.2647
        }
    },
    {
        id: 9,
        name: "padel33",
        location: "Amersfoort",
        pricePerHour: 35,
        courtType: FEATURES.OUTDOOR,
        rating: 4.5,
        reviewCount: 82,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.PARKING,
            FEATURES.SHOWERS,
            FEATURES.EQUIPMENT_RENTAL,
            FEATURES.RESTAURANT
        ],
        description: "Padel33 beschikt over zes outdoor padelbanen. Er zijn kleedkamers en douches beschikbaar voor spelers. Parkeergelegenheid is aanwezig op het terrein. Er is een horecagelegenheid voor eten en drinken. Rackets en ballen zijn te huur.",
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.1917,
            lng: 5.3878
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
        id: 10,
        name: "LTC Vathorst",
        location: "Amersfoort",
        pricePerHour: 32,
        courtType: FEATURES.OUTDOOR,
        rating: 4.4,
        reviewCount: 65,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.PARKING,
            FEATURES.SHOWERS,
            FEATURES.EQUIPMENT_RENTAL,
            FEATURES.CAFE
        ],
        description: "LTC Vathorst heeft vier outdoor padelbanen. Leden kunnen gebruikmaken van kleedkamers en douches. Er is voldoende parkeergelegenheid bij de club. Een clubhuis biedt drankjes en lichte maaltijden. Rackets zijn te huur voor leden en gasten.",
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.1926,
            lng: 5.4021
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

// Reviews data
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
        comment: "Great experience overall. Would be perfect with better parking options.",
        userImage: "https://i.pravatar.cc/150?u=sarah_smith"
    }
];

// Bookings data
const bookings = [];

// Dutch cities data
const dutchCities = [
    "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", 
    "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen", 
    "Enschede", "Apeldoorn", "Haarlem", "Arnhem", "Zaanstad", 
    "Amersfoort", "Haarlemmermeer", "Den Bosch", "Zoetermeer", "Zwolle",
    "Maastricht", "Leiden", "Dordrecht", "Ede", "Leeuwarden",
    "Alphen aan den Rijn", "Alkmaar", "Emmen", "Westland", "Delft",
    "Venlo", "Deventer", "Sittard-Geleen", "Helmond", "Oss"
];

// Initialize the window.padelApp object
window.padelApp = {
    courts,
    reviews,
    bookings,
    dutchCities,
    FEATURES,
    getReviewsForCourt: function(courtId) {
        return reviews.filter(review => review.courtId === courtId);
    },
    getLatestReview: function(courtId) {
        const courtReviews = this.getReviewsForCourt(courtId);
        return courtReviews.length > 0 ? courtReviews[courtReviews.length - 1] : null;
    },
    addReview: function(review) {
        review.id = reviews.length + 1;
        review.date = new Date().toISOString().split('T')[0];
        reviews.push(review);
        
        // Update court rating and review count
        const court = window.padelApp.courts.find(c => c.id === review.courtId);
        if (court) {
            const courtReviews = window.padelApp.getReviewsForCourt(court.id);
            court.rating = (courtReviews.reduce((sum, r) => sum + r.rating, 0) / courtReviews.length).toFixed(1);
            court.reviewCount = courtReviews.length;
        }
        
        return review;
    },
    translateFeature: function(feature) {
        const translations = {
            [FEATURES.INDOOR]: 'Indoor',
            [FEATURES.OUTDOOR]: 'Buiten',
            [FEATURES.LIGHTING]: 'Verlichting',
            [FEATURES.SHOWERS]: 'Douches',
            [FEATURES.PARKING]: 'Parkeergelegenheid',
            [FEATURES.RESTAURANT]: 'Restaurant',
            [FEATURES.EQUIPMENT_RENTAL]: 'Uitrusting Verhuur',
            [FEATURES.PRO_TRAINING]: 'Pro Training',
            [FEATURES.CAFE]: 'Café'
        };
        return translations[feature] || feature;
    },
    openBooking: function(courtId) {
        selectedCourtId = courtId;
        document.getElementById('booking-modal').classList.remove('hidden');
    }
};
