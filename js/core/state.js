// Application state management
const AppState = {
    // Data
    courts: [],
    dutchCities: [],
    
    // UI State
    filters: {
        location: '',
        indoor: true,
        outdoor: true,
        maxPrice: null,
        minRating: null,
        features: []
    },
    currentCourt: null,
    
    // Listeners for state changes
    listeners: {},
    
    // Initialize the state
    initialize() {
        // Load initial data
        this.courts = window.courts || [];
        this.dutchCities = window.dutchCities || [];
        
        // Clean up global variables
        delete window.courts;
        delete window.dutchCities;
    },
    
    // State update methods
    updateFilters(newFilters) {
        this.filters = { ...this.filters, ...newFilters };
        this.notifyListeners('filters');
    },
    
    setCurrentCourt(court) {
        this.currentCourt = court;
        this.notifyListeners('currentCourt');
    },
    
    // Observer pattern methods
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        
        // Return unsubscribe function
        return () => {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        };
    },
    
    notifyListeners(event) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback());
    }
};

// Prevent modifications to the state structure
Object.freeze(AppState);
