// Import dependencies
import { courts } from '../data/courts.js';
import { dutchCities } from '../utils/constants.js';
import { SearchFeature } from '../features/search.js';
import { BookingFeature } from '../features/booking.js';
import { MapFeature } from '../features/map.js';
import { createCourtCard } from '../templates/courtCard.js';

// Application state
const AppState = {
    filters: {
        location: '',
        indoor: false,
        outdoor: false,
        maxPrice: 50,
        minRating: 0,
        features: []
    },
    
    // State observers
    observers: {},
    
    // Update filters and notify observers
    updateFilters(newFilters) {
        this.filters = { ...this.filters, ...newFilters };
        this.notifyObservers('filters');
    },
    
    // Observer pattern methods
    subscribe(event, callback) {
        if (!this.observers[event]) {
            this.observers[event] = [];
        }
        this.observers[event].push(callback);
    },
    
    notifyObservers(event) {
        if (this.observers[event]) {
            this.observers[event].forEach(callback => callback());
        }
    }
};

// Main application
const App = {
    // Feature instances
    search: null,
    booking: null,
    map: null,
    
    // Current view state
    currentView: 'list',
    
    // Initialize the application
    initialize() {
        // Initialize features
        this.search = new SearchFeature();
        this.booking = new BookingFeature();
        this.map = new MapFeature();
        
        // Initial data load
        this.loadInitialData();
        
        // Set initial view
        this.switchView('list');
    },
    
    loadInitialData() {
        // Populate Dutch cities datalist
        this.populateDutchCities();
        
        // Initial search
        this.search.performSearch();
    },
    
    populateDutchCities() {
        const datalist = document.getElementById('dutch-cities');
        if (!datalist) return;
        
        dutchCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },
    
    // View switching functionality
    switchView(view) {
        // Update current view
        this.currentView = view;
        
        // Get view elements
        const mapView = document.getElementById('map-view');
        const listView = document.getElementById('list-view');
        const mapBtn = document.getElementById('map-view-btn');
        const listBtn = document.getElementById('list-view-btn');
        
        // Toggle views
        if (view === 'map') {
            mapView.classList.remove('hidden');
            listView.classList.add('hidden');
            mapBtn.classList.add('bg-blue-600', 'text-white');
            listBtn.classList.remove('bg-blue-600', 'text-white');
            
            // Trigger resize event to fix Google Maps display
            if (this.map && this.map.map) {
                google.maps.event.trigger(this.map.map, 'resize');
            }
        } else {
            listView.classList.remove('hidden');
            mapView.classList.add('hidden');
            listBtn.classList.add('bg-blue-600', 'text-white');
            mapBtn.classList.remove('bg-blue-600', 'text-white');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.initialize();
});

// Make App globally available
window.App = App;

// Export for use in other modules
export { App, AppState, courts };
