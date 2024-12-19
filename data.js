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
    },
    // Add more reviews for each court...
];

// Additional courts data
const additionalCourts = [
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

// Functions to handle reviews
function getReviewsForCourt(courtId) {
    return reviews.filter(review => review.courtId === courtId);
}

function addReview(review) {
    review.id = reviews.length + 1;
    review.date = new Date().toISOString().split('T')[0];
    reviews.push(review);
    
    // Update court rating and review count
    const court = window.padelApp.courts.find(c => c.id === review.courtId);
    if (court) {
        const courtReviews = getReviewsForCourt(court.id);
        court.rating = (courtReviews.reduce((sum, r) => sum + r.rating, 0) / courtReviews.length).toFixed(1);
        court.reviewCount = courtReviews.length;
    }
    
    return review;
}

// Extend the existing padelApp object
window.padelApp = {
    ...window.padelApp,
    reviews,
    getReviewsForCourt,
    addReview
};
