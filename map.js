let map;
let markers = [];

function initMap() {
    // Wait for the DOM to be fully loaded
    if (!document.getElementById('map')) {
        console.error('Map container not found');
        return;
    }

    // Center on Netherlands
    const netherlands = [52.1326, 5.2913];
    
    // Initialize the map with specific options
    map = L.map('map', {
        center: netherlands,
        zoom: 8,
        minZoom: 6,
        maxZoom: 18,
        scrollWheelZoom: true,
        zoomControl: true
    });
    
    // Add OpenStreetMap tiles with proper attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Add markers for each court
    window.padelApp.courts.forEach(court => {
        addMarker(court, customIcon);
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

function addMarker(court, customIcon) {
    if (!court.coordinates || !court.coordinates.lat || !court.coordinates.lng) {
        console.error('Invalid coordinates for court:', court.name);
        return;
    }

    const marker = L.marker([court.coordinates.lat, court.coordinates.lng], {
        icon: customIcon,
        title: court.name
    }).addTo(map);

    const popupContent = `
        <div class="p-4 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2">${court.name}</h3>
            <p class="text-gray-600 mb-2">${court.location}</p>
            <div class="flex items-center mb-2">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 font-semibold">${court.rating}</span>
                <span class="ml-2 text-gray-600">(${court.reviewCount})</span>
            </div>
            <p class="mb-3">
                <span class="font-bold">€${court.pricePerHour}</span>
                <span class="text-gray-600">/uur</span>
            </p>
            <button 
                onclick="window.padelApp.openBooking(${court.id})"
                class="w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors"
            >
                Nu Boeken
            </button>
        </div>
    `;

    marker.bindPopup(popupContent, {
        maxWidth: 300,
        minWidth: 200,
        className: 'court-popup'
    });

    markers.push(marker);
}

function updateMarkers(filteredCourts) {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    // Add new markers
    filteredCourts.forEach(court => {
        addMarker(court);
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Add custom styles for the popup
const style = document.createElement('style');
style.textContent = `
    .court-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        padding: 0;
    }
    .court-popup .leaflet-popup-content {
        margin: 0;
    }
    .court-popup .leaflet-popup-tip-container {
        margin-top: -1px;
    }
`;
document.head.appendChild(style);

// Initialize map when the page loads
document.addEventListener('DOMContentLoaded', initMap);

// Expose functions to window
window.padelApp = {
    ...window.padelApp,
    initMap,
    updateMarkers
};
