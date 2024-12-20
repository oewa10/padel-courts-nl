import { courts } from '../data/courts.js';
import { App } from '../core/app.js';

export class MapFeature {
    constructor() {
        this.map = null;
        this.markers = [];
        this.searchBox = null;
        this.currentInfoWindow = null;
        
        // Expose initMap to window for Google Maps callback
        window.initMap = () => this.initMap();
        
        // If Google Maps is already loaded, initialize immediately
        if (window.google && window.google.maps) {
            this.initMap();
        }
    }
    
    initMap() {
        // Center on Netherlands
        const netherlands = { lat: 52.1326, lng: 5.2913 };
        
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: netherlands,
            mapTypeControl: true,
            fullscreenControl: true,
            streetViewControl: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        // Initialize markers
        this.updateMarkers(courts);
    }
    
    findNearbyCourts(location) {
        return courts.filter(court => {
            const courtLocation = new google.maps.LatLng(court.coordinates.lat, court.coordinates.lng);
            const distance = google.maps.geometry.spherical.computeDistanceBetween(location, courtLocation);
            return distance <= 50000; // Within 50km
        });
    }
    
    createInfoWindowContent(court) {
        const today = new Date().toLocaleString('en-US', { weekday: 'long' });
        return `
            <div class="p-4">
                <h3 class="text-lg font-bold mb-2">${court.name}</h3>
                <p class="text-gray-600 mb-2">${court.location}</p>
                <div class="flex items-center mb-2">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1 font-semibold">${court.rating}</span>
                    <span class="ml-2 text-gray-600">(${court.reviewCount} reviews)</span>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-3">
                    <i class="fas fa-clock mr-2"></i>
                    <span>Vandaag geopend: ${court.openingHours[today].open} - ${court.openingHours[today].close}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold">€${court.pricePerHour}/uur</span>
                    <button onclick="window.App.booking.openBooking(${court.id})" 
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Reserveren
                    </button>
                </div>
            </div>
        `;
    }
    
    updateMarkers(filteredCourts) {
        this.clearMarkers();
        
        filteredCourts.forEach(court => {
            const marker = new google.maps.Marker({
                position: { lat: court.coordinates.lat, lng: court.coordinates.lng },
                map: this.map,
                title: court.name
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: this.createInfoWindowContent(court)
            });
            
            marker.addListener('click', () => {
                if (this.currentInfoWindow) {
                    this.currentInfoWindow.close();
                }
                infoWindow.open(this.map, marker);
                this.currentInfoWindow = infoWindow;
            });
            
            this.markers.push(marker);
        });
    }
    
    clearMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
        if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
            this.currentInfoWindow = null;
        }
    }
}
