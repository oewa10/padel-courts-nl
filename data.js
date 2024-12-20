// Courts data
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
        id: 4,
        name: "Utrecht Padel Academy",
        location: "Utrecht",
        pricePerHour: 42,
        indoor: true,
        rating: 4.9,
        reviewCount: 203,
        features: ["Indoor Courts", "Free Parking", "Pro Training", "Equipment Rental", "Cafe"],
        imageUrl: "https://images.unsplash.com/photo-1632505084024-79f79943e5d3?w=800&auto=format",
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
        indoor: false,
        rating: 4.5,
        reviewCount: 167,
        features: ["Outdoor Courts", "Free Parking", "Night Lighting", "Equipment Rental"],
        imageUrl: "https://images.unsplash.com/photo-1632505084024-79f79943e5d3?w=800&auto=format",
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
        indoor: true,
        rating: 4.7,
        reviewCount: 142,
        features: ["Indoor Courts", "Free Parking", "Showers", "Pro Shop"],
        imageUrl: "https://images.unsplash.com/photo-1632505084024-79f79943e5d3?w=800&auto=format",
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
        indoor: false,
        rating: 4.6,
        reviewCount: 98,
        features: ["Outdoor Courts", "Parking", "Night Lighting", "Restaurant"],
        imageUrl: "https://images.unsplash.com/photo-1632505084024-79f79943e5d3?w=800&auto=format",
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
        indoor: true,
        rating: 4.4,
        reviewCount: 76,
        features: ["Indoor Courts", "Free Parking", "Equipment Rental", "Cafe"],
        imageUrl: "https://images.unsplash.com/photo-1632505084024-79f79943e5d3?w=800&auto=format",
        coordinates: {
            lat: 52.3508,
            lng: 5.2647
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

// Initialize the window.padelApp object
window.padelApp = {
    courts,
    reviews,
    bookings,
    getReviewsForCourt: function(courtId) {
        return reviews.filter(review => review.courtId === courtId);
    },
    getLatestReview: function(courtId) {
        const courtReviews = this.getReviewsForCourt(courtId);
        return courtReviews.length > 0 ? courtReviews[0] : null;
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
            'indoor': 'Overdekt',
            'outdoor': 'Buiten',
            'lighting': 'Verlichting',
            'showers': 'Douches',
            'parking': 'Parkeren',
            'restaurant': 'Restaurant'
        };
        return translations[feature] || feature;
    },
    openBooking: function(courtId) {
        selectedCourtId = courtId;
        document.getElementById('booking-modal').classList.remove('hidden');
    }
};
