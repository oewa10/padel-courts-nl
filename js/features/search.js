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
                const value = parseInt(e.target.value);
                document.getElementById('price-value').textContent = value;
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
    
    performSearch() {
        const { filters } = AppState;
        let filteredCourts = this.filterCourts(courts, filters);
        
        // Sort courts
        filteredCourts = this.sortCourts(filteredCourts, filters.sortBy);
        
        this.updateCourtsList(filteredCourts);
        
        // Update map markers
        if (window.App?.updateMapMarkers) {
            window.App.updateMapMarkers(filteredCourts);
        }
    }

    sortCourts(courts, sortBy) {
        switch (sortBy) {
            case 'price-asc':
                return [...courts].sort((a, b) => a.pricePerHour - b.pricePerHour);
            case 'price-desc':
                return [...courts].sort((a, b) => b.pricePerHour - a.pricePerHour);
            case 'rating-desc':
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
    
    filterCourts(courts, filters) {
        return courts.filter(court => {
            // Location filter
            if (filters.location && !court.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }
            
            // Indoor/Outdoor filter - show courts based on selected types only
            if (!filters.indoor && !filters.outdoor) {
                return false; // Show no courts if neither type is selected
            }
            
            // Check if the court matches any of the selected types
            const isIndoorMatch = filters.indoor && court.features.includes('INDOOR');
            const isOutdoorMatch = filters.outdoor && court.features.includes('OUTDOOR');
            
            if (!isIndoorMatch && !isOutdoorMatch) {
                return false;
            }
            
            // Price filter
            if (filters.maxPrice && court.pricePerHour > filters.maxPrice) return false;
            
            // Rating filter
            if (filters.minRating && court.rating < filters.minRating) return false;
            
            // Features filter
            if (filters.features && filters.features.length > 0) {
                if (!filters.features.every(feature => court.features.includes(feature))) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    updateCourtsList(courts) {
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
        
        courtsList.innerHTML = courts.map(court => createCourtCard(court)).join('');
    }
}
