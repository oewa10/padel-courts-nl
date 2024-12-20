// Main application
const App = {
    // Feature instances
    search: null,
    booking: null,
    
    // Initialize the application
    initialize() {
        // Initialize state
        AppState.initialize();
        
        // Initialize features
        this.search = new SearchFeature();
        this.booking = new BookingFeature();
        
        // Populate Dutch cities datalist
        this.populateDutchCities();
        
        // Initial search
        this.search.performSearch();
    },
    
    // Helper methods
    populateDutchCities() {
        const datalist = document.getElementById('dutch-cities');
        if (!datalist) return;
        
        AppState.dutchCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.initialize();
});
