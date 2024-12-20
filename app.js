// Functions to handle filtering and sorting
const filterCourts = (filters = {}) => {
    return window.padelApp.courts.filter(court => {
        if (filters.indoor !== undefined && court.indoor !== filters.indoor) return false;
        if (filters.minRating && court.rating < filters.minRating) return false;
        if (filters.maxPrice && court.pricePerHour > filters.maxPrice) return false;
        if (filters.features && filters.features.length > 0) {
            if (!filters.features.every(feature => court.features.includes(feature))) return false;
        }
        return true;
    });
};

const sortCourts = (courts, sortBy = 'recommended') => {
    return [...courts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.pricePerHour - b.pricePerHour;
            case 'price-high':
                return b.pricePerHour - a.pricePerHour;
            case 'rating':
                return b.rating - a.rating;
            default: // recommended
                return b.rating * b.reviewCount - a.rating * a.reviewCount;
        }
    });
};

const generateTimeSlots = (date, courtId) => {
    const slots = [];
    const startHour = 9;
    const endHour = 22;
    
    for (let hour = startHour; hour < endHour; hour++) {
        slots.push({
            time: `${hour}:00`,
            available: true
        });
    }
    
    return slots;
};

// Add these functions to the window.padelApp object
Object.assign(window.padelApp, {
    filterCourts,
    sortCourts,
    generateTimeSlots
});
