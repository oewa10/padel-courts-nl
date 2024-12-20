// Functions to handle filtering and sorting
const filterCourts = (filters = {}) => {
    return window.padelApp.courts.filter(court => {
        // Location filter
        if (filters.location && filters.location.trim() !== '') {
            const searchLocation = filters.location.toLowerCase().trim();
            const courtLocation = court.location.toLowerCase();
            const courtName = court.name.toLowerCase();
            
            // Check if the location matches exactly any of our Dutch cities
            const isDutchCity = window.padelApp.dutchCities.some(city => 
                city.toLowerCase() === searchLocation
            );
            
            // If it's a Dutch city, only match the location exactly
            if (isDutchCity) {
                if (!courtLocation.includes(searchLocation)) {
                    return false;
                }
            } else {
                // If it's not a Dutch city, do a partial match on both name and location
                if (!courtLocation.includes(searchLocation) && !courtName.includes(searchLocation)) {
                    return false;
                }
            }
        }

        // Court type filter (indoor/outdoor)
        if (filters.indoor && !filters.outdoor) {
            if (court.courtType !== window.padelApp.FEATURES.INDOOR) return false;
        } else if (!filters.indoor && filters.outdoor) {
            if (court.courtType !== window.padelApp.FEATURES.OUTDOOR) return false;
        } else if (!filters.indoor && !filters.outdoor) {
            return false;
        }

        // Price filter
        if (typeof filters.maxPrice === 'number' && !isNaN(filters.maxPrice)) {
            if (court.pricePerHour > filters.maxPrice) return false;
        }

        // Rating filter
        if (filters.minRating && court.rating < filters.minRating) return false;

        // Features filter
        if (filters.features && filters.features.length > 0) {
            for (const feature of filters.features) {
                if (!court.features.includes(feature)) {
                    return false;
                }
            }
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

// Populate Dutch cities datalist
function populateDutchCities() {
    const datalist = document.getElementById('dutch-cities');
    window.padelApp.dutchCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });
}

// Add these functions to the window.padelApp object
Object.assign(window.padelApp, {
    filterCourts,
    sortCourts,
    generateTimeSlots,
    populateDutchCities
});
