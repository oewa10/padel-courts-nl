class SearchFeature {
    constructor() {
        this.initializeListeners();
        
        // Subscribe to state changes
        AppState.subscribe('filters', () => this.performSearch());
    }
    
    initializeListeners() {
        // Location search
        const locationInput = document.getElementById('location-search');
        if (locationInput) {
            locationInput.addEventListener('input', (e) => {
                AppState.updateFilters({ location: e.target.value });
            });
        }
        
        // Court type filters
        const indoorCheckbox = document.getElementById('indoor-checkbox');
        const outdoorCheckbox = document.getElementById('outdoor-checkbox');
        
        if (indoorCheckbox) {
            indoorCheckbox.addEventListener('change', (e) => {
                AppState.updateFilters({ indoor: e.target.checked });
            });
        }
        
        if (outdoorCheckbox) {
            outdoorCheckbox.addEventListener('change', (e) => {
                AppState.updateFilters({ outdoor: e.target.checked });
            });
        }
        
        // Price filter
        const priceRange = document.getElementById('price-range');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                AppState.updateFilters({ maxPrice: parseInt(e.target.value) });
            });
        }
        
        // Rating filter
        const ratingFilter = document.getElementById('rating-filter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                AppState.updateFilters({ minRating: parseInt(e.target.value) });
            });
        }
        
        // Features filters
        const featureCheckboxes = document.querySelectorAll('[data-feature]');
        featureCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedFeatures = Array.from(featureCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.dataset.feature);
                AppState.updateFilters({ features: selectedFeatures });
            });
        });
    }
    
    performSearch() {
        const { filters } = AppState;
        let filteredCourts = AppState.courts;
        
        // Apply location filter
        if (filters.location && filters.location.trim() !== '') {
            const searchLocation = filters.location.toLowerCase().trim();
            filteredCourts = filteredCourts.filter(court => {
                const courtLocation = court.location.toLowerCase();
                const courtName = court.name.toLowerCase();
                
                // Check if exact match with Dutch city
                const isDutchCity = AppState.dutchCities.some(city => 
                    city.toLowerCase() === searchLocation
                );
                
                if (isDutchCity) {
                    return courtLocation.includes(searchLocation);
                } else {
                    return courtLocation.includes(searchLocation) || 
                           courtName.includes(searchLocation);
                }
            });
        }
        
        // Apply court type filter
        if (filters.indoor && !filters.outdoor) {
            filteredCourts = filteredCourts.filter(court => 
                court.courtType === Constants.FEATURES.INDOOR
            );
        } else if (!filters.indoor && filters.outdoor) {
            filteredCourts = filteredCourts.filter(court => 
                court.courtType === Constants.FEATURES.OUTDOOR
            );
        } else if (!filters.indoor && !filters.outdoor) {
            filteredCourts = [];
        }
        
        // Apply price filter
        if (typeof filters.maxPrice === 'number' && !isNaN(filters.maxPrice)) {
            filteredCourts = filteredCourts.filter(court => 
                court.pricePerHour <= filters.maxPrice
            );
        }
        
        // Apply rating filter
        if (filters.minRating) {
            filteredCourts = filteredCourts.filter(court => 
                court.rating >= filters.minRating
            );
        }
        
        // Apply features filter
        if (filters.features && filters.features.length > 0) {
            filteredCourts = filteredCourts.filter(court => 
                filters.features.every(feature => court.features.includes(feature))
            );
        }
        
        // Update the UI with filtered courts
        this.updateUI(filteredCourts);
    }
    
    updateUI(courts) {
        const courtsList = document.getElementById('courts-list');
        if (!courtsList) return;
        
        if (courts.length === 0) {
            courtsList.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-600">Geen padelbanen gevonden voor deze zoekcriteria.</p>
                </div>
            `;
            return;
        }
        
        courtsList.innerHTML = courts.map(court => `
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
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold">€${court.pricePerHour}/uur</span>
                        <button onclick="App.booking.openBooking(${court.id})" 
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Reserveren
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
