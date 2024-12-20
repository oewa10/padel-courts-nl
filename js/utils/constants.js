// Application constants
const Constants = {
    FEATURES: {
        INDOOR: 'indoor',
        OUTDOOR: 'outdoor',
        PARKING: 'parking',
        RESTAURANT: 'restaurant',
        SHOP: 'shop',
        RENTAL: 'rental',
        LESSONS: 'lessons',
        WHEELCHAIR: 'wheelchair'
    },
    
    SORT_OPTIONS: {
        RECOMMENDED: 'recommended',
        PRICE_LOW: 'price-low',
        PRICE_HIGH: 'price-high',
        RATING: 'rating'
    },
    
    // Default values
    DEFAULT_MAX_PRICE: 100,
    DEFAULT_MIN_RATING: 0,
    
    // Time constants
    HOURS: {
        START: 9,
        END: 22
    }
};

// Prevent modifications to the constants
Object.freeze(Constants);
