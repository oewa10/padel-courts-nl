let map;
let markers = [];
let searchBox;
let currentInfoWindow = null;

function initMap() {
    // Center on Netherlands
    const netherlands = { lat: 52.1326, lng: 5.2913 };
    
    map = new google.maps.Map(document.getElementById("map"), {
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

    // Initialize search box
    const input = document.getElementById("location-search");
    searchBox = new google.maps.places.SearchBox(input);

    // Bias SearchBox results towards current map's viewport
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) return;

        // For each place, get the location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) return;

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        
        map.fitBounds(bounds);
        // Update nearby courts
        findNearbyCourts(places[0].geometry.location);
    });

    // Load courts and add markers
    loadCourtsAndMarkers();
}

function findNearbyCourts(location) {
    const courts = window.padelApp.courts || [];
    courts.forEach(court => {
        const courtLocation = new google.maps.LatLng(court.coordinates.lat, court.coordinates.lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(location, courtLocation) / 1000; // Convert to km
        
        // Update court distance
        court.distance = Math.round(distance * 10) / 10;
    });

    // Sort courts by distance
    courts.sort((a, b) => a.distance - b.distance);

    // Update markers to show distance
    updateMarkers(courts);
}

function loadCourtsAndMarkers() {
    const courts = window.padelApp.courts || [];
    updateMarkers(courts);
}

function createInfoWindowContent(court) {
    const features = court.features.map(feature => 
        `<span class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">${feature}</span>`
    ).join('');
    
    const distanceText = court.distance ? `<p class="text-sm text-gray-600 mb-2">Afstand: ${court.distance} km</p>` : '';
    
    return `
        <div class="p-4 max-w-sm">
            <div class="mb-4">
                <img src="${court.imageUrl}" alt="${court.name}" class="w-full h-32 object-cover rounded">
            </div>
            <h3 class="font-bold text-lg mb-2">${court.name}</h3>
            <p class="text-gray-600 mb-2">${court.location}</p>
            ${distanceText}
            <div class="flex items-center mb-2">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 font-semibold">${court.rating}</span>
                <span class="ml-2 text-gray-600">(${court.reviewCount})</span>
            </div>
            <p class="mb-3">
                <span class="font-bold">€${court.pricePerHour}</span>
                <span class="text-gray-600">/uur</span>
            </p>
            <div class="mb-3 flex flex-wrap gap-1">
                ${features}
            </div>
            <button 
                onclick="window.padelApp.openBooking(${court.id})"
                class="w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors"
            >
                Nu Boeken
            </button>
        </div>
    `;
}

function updateMarkers(courts) {
    // Clear existing markers
    clearMarkers();

    // Add new markers
    courts.forEach(court => {
        const marker = new google.maps.Marker({
            position: { lat: court.coordinates.lat, lng: court.coordinates.lng },
            map: map,
            title: court.name,
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(court),
            maxWidth: 320
        });

        marker.addListener("click", () => {
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });

        markers.push(marker);
    });

    // Fit bounds to show all markers if we're not searching
    if (!courts[0]?.distance && markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
    }
}

// Expose functions to window
window.padelApp = {
    ...window.padelApp,
    initMap,
    findNearbyCourts,
    updateMapMarkers: updateMarkers
};
