// Constants for features
export const FEATURES = {
    INDOOR: 'INDOOR',
    OUTDOOR: 'OUTDOOR',
    LIGHTING: 'LIGHTING',
    SHOWERS: 'SHOWERS',
    PARKING: 'PARKING',
    RESTAURANT: 'RESTAURANT'
};

// Court data
export const courts = [
    {
        id: 1,
        name: "Padel Factory Amsterdam",
        location: "Amsterdam",
        pricePerHour: 40,
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
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 2,
        name: "Rotterdam Padel Club",
        location: "Rotterdam",
        pricePerHour: 35,
        rating: 4.6,
        reviewCount: 89,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 51.9225,
            lng: 4.4792
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 3,
        name: "Padel Utrecht",
        location: "Utrecht",
        pricePerHour: 38,
        rating: 4.7,
        reviewCount: 95,
        features: [
            FEATURES.INDOOR,
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.0907,
            lng: 5.1214
        },
        openingHours: {
            Monday: { open: "08:00", close: "23:00" },
            Tuesday: { open: "08:00", close: "23:00" },
            Wednesday: { open: "08:00", close: "23:00" },
            Thursday: { open: "08:00", close: "23:00" },
            Friday: { open: "08:00", close: "23:00" },
            Saturday: { open: "09:00", close: "21:00" },
            Sunday: { open: "09:00", close: "21:00" }
        }
    },
    {
        id: 4,
        name: "The Hague Padel Center",
        location: "Den Haag",
        pricePerHour: 42,
        rating: 4.5,
        reviewCount: 78,
        features: [
            FEATURES.INDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING,
            FEATURES.RESTAURANT
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.0705,
            lng: 4.3007
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 5,
        name: "Eindhoven Padel Center",
        location: "Eindhoven",
        pricePerHour: 36,
        rating: 4.4,
        reviewCount: 62,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 51.4416,
            lng: 5.4697
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 6,
        name: "Groningen Padel",
        location: "Groningen",
        pricePerHour: 34,
        rating: 4.6,
        reviewCount: 45,
        features: [
            FEATURES.INDOOR,
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 53.2194,
            lng: 6.5665
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 7,
        name: "Tilburg Padel Club",
        location: "Tilburg",
        pricePerHour: 35,
        rating: 4.3,
        reviewCount: 38,
        features: [
            FEATURES.OUTDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 51.5719,
            lng: 5.0672
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    },
    {
        id: 8,
        name: "Almere Padel",
        location: "Almere",
        pricePerHour: 37,
        rating: 4.4,
        reviewCount: 29,
        features: [
            FEATURES.INDOOR,
            FEATURES.LIGHTING,
            FEATURES.SHOWERS,
            FEATURES.PARKING,
            FEATURES.RESTAURANT
        ],
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
        coordinates: {
            lat: 52.3508,
            lng: 5.2647
        },
        openingHours: {
            Monday: { open: "09:00", close: "22:00" },
            Tuesday: { open: "09:00", close: "22:00" },
            Wednesday: { open: "09:00", close: "22:00" },
            Thursday: { open: "09:00", close: "22:00" },
            Friday: { open: "09:00", close: "22:00" },
            Saturday: { open: "09:00", close: "20:00" },
            Sunday: { open: "10:00", close: "18:00" }
        }
    }
];

export default courts;
