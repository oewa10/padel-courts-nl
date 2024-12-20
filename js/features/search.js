import { AppState, courts } from '../core/app.js';
import { createCourtCard } from '../templates/courtCard.js';

export class SearchFeature {
    constructor() {
        // Initialize with both filters on
        AppState.updateFilters({ 
            indoor: true, 
            outdoor: true,
            sortBy: 'recommended' // Default sort
        });
        
        this.initializeListeners();
        
        // Subscribe to state changes
        AppState.subscribe('filters', () => this.performSearch());
        
        // Perform initial search
        this.performSearch();
    }
    
    initializeListeners() {
        // Welcome screen search form
        const welcomeSearchForm = document.getElementById('welcome-search-form');
        const welcomeLocationInput = document.getElementById('welcome-location-search');
        
        if (welcomeSearchForm) {
            welcomeSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const location = welcomeLocationInput.value;
                if (location) {
                    // Update location in the main search input
                    const locationInput = document.getElementById('location-search');
                    if (locationInput) {
                        locationInput.value = location;
                    }
                    
                    // Update filters with the location
                    AppState.updateFilters({ location });
                    
                    // Hide welcome screen and show search section
                    document.getElementById('welcome-screen').classList.add('hidden');
                    document.getElementById('search-section').classList.remove('hidden');
                    
                    // Perform search
                    this.performSearch();
                }
            });
        }
        
        // Handle welcome screen search form submission
        document.getElementById('welcome-search-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const location = document.getElementById('welcome-location-search').value;
            if (location) {
                // Hide welcome screen and show search section
                document.getElementById('welcome-screen').classList.add('hidden');
                document.getElementById('search-section').classList.remove('hidden');
                
                // Update the main search input with the location
                document.getElementById('location-search').value = location;
                
                // Trigger the search
                window.App.search.performSearch(location);
            }
        });
        
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
        const priceValue = document.getElementById('price-value');
        
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                if (priceValue) {
                    priceValue.textContent = value;
                }
                AppState.updateFilters({ maxPrice: value });
            });
        }
        
        // Rating filter
        const ratingFilter = document.getElementById('rating-filter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', (e) => {
                AppState.updateFilters({ minRating: parseFloat(e.target.value) });
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
        
        // Sort dropdown
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                AppState.updateFilters({ sortBy: e.target.value });
            });
        }
    }
    
    filterCourts(courts, filters) {
        return courts.filter(court => {
            // Location filter
            if (filters.location && !court.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }
            
            // Indoor/Outdoor filter
            if (!filters.indoor && court.features.includes('INDOOR')) {
                return false;
            }
            if (!filters.outdoor && court.features.includes('OUTDOOR')) {
                return false;
            }
            
            // Price filter
            if (filters.maxPrice && court.pricePerHour > filters.maxPrice) {
                return false;
            }
            
            // Rating filter
            if (filters.minRating && court.rating < filters.minRating) {
                return false;
            }
            
            // Features filter
            if (filters.features && filters.features.length > 0) {
                if (!filters.features.every(feature => court.features.includes(feature))) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    sortCourts(courts, sortBy) {
        switch (sortBy) {
            case 'price-low':
                return [...courts].sort((a, b) => a.pricePerHour - b.pricePerHour);
            case 'price-high':
                return [...courts].sort((a, b) => b.pricePerHour - a.pricePerHour);
            case 'rating':
                return [...courts].sort((a, b) => b.rating - a.rating);
            case 'recommended':
            default:
                // For recommended, we'll use a weighted score of rating and review count
                return [...courts].sort((a, b) => {
                    const scoreA = (a.rating * 0.7) + (Math.min(a.reviewCount, 100) / 100 * 0.3);
                    const scoreB = (b.rating * 0.7) + (Math.min(b.reviewCount, 100) / 100 * 0.3);
                    return scoreB - scoreA;
                });
        }
    }
    
    performSearch() {
        const { filters } = AppState;
        let filteredCourts = this.filterCourts(courts, filters);
        
        // Sort courts
        filteredCourts = this.sortCourts(filteredCourts, filters.sortBy);
        
        this.updateCourtsList(filteredCourts);
        
        // Update map markers if map is initialized
        if (window.App?.map?.map) {
            window.App.map.updateMapMarkers(filteredCourts);
        }
    }
    
    updateCourtsList(filteredCourts) {
        const courtsList = document.getElementById('courts-list');
        if (!courtsList) return;
        
        if (filteredCourts.length === 0) {
            courtsList.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">Geen padelbanen gevonden die aan je criteria voldoen.</p>
                </div>
            `;
            return;
        }
        
        courtsList.innerHTML = filteredCourts.map(court => createCourtCard(court)).join('');
    }
}
