class BookingFeature {
    constructor() {
        this.initializeListeners();
        
        // Subscribe to current court changes
        AppState.subscribe('currentCourt', () => this.updateBookingModal());
    }
    
    initializeListeners() {
        // Close modal button
        const closeButton = document.querySelector('#booking-modal .close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeBooking());
        }
        
        // Close on background click
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeBooking();
                }
            });
        }
    }
    
    openBooking(courtId) {
        const court = AppState.courts.find(c => c.id === courtId);
        if (!court) return;
        
        AppState.setCurrentCourt(court);
        
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
        // Set today's date as default
        const datePicker = document.getElementById('booking-date');
        if (datePicker) {
            const today = new Date().toISOString().split('T')[0];
            datePicker.value = today;
            this.loadAvailability(courtId, today);
        }
    }
    
    closeBooking() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        AppState.setCurrentCourt(null);
    }
    
    loadAvailability(courtId, date) {
        const timeSlots = this.generateTimeSlots(date);
        this.updateTimeSlotsUI(timeSlots);
    }
    
    generateTimeSlots(date) {
        const slots = [];
        for (let hour = Constants.HOURS.START; hour < Constants.HOURS.END; hour++) {
            slots.push({
                time: `${hour}:00`,
                available: true
            });
        }
        return slots;
    }
    
    updateTimeSlotsUI(slots) {
        const slotsContainer = document.getElementById('time-slots');
        if (!slotsContainer) return;
        
        slotsContainer.innerHTML = slots.map(slot => `
            <button class="time-slot ${slot.available ? 'available' : 'unavailable'}"
                    ${!slot.available ? 'disabled' : ''}>
                ${slot.time}
            </button>
        `).join('');
    }
    
    updateBookingModal() {
        const court = AppState.currentCourt;
        if (!court) return;
        
        const modalContent = document.querySelector('#booking-modal .modal-content');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-4">${court.name}</h3>
                <div class="mb-4">
                    <h4 class="font-semibold mb-2">Selecteer een datum</h4>
                    <input type="date" id="booking-date" class="w-full p-2 border rounded" 
                        onchange="App.booking.loadAvailability(${court.id}, this.value)">
                </div>
                <div id="time-slots" class="grid grid-cols-4 gap-2">
                    <!-- Time slots will be loaded here -->
                </div>
            </div>
        `;
        
        // Set today's date and load availability
        const today = new Date().toISOString().split('T')[0];
        const datePicker = document.getElementById('booking-date');
        if (datePicker) {
            datePicker.value = today;
            this.loadAvailability(court.id, today);
        }
    }
}
