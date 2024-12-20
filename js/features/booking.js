import { courts } from '../core/app.js';

export class BookingFeature {
    constructor() {
        this.currentCourt = null;
    }
    
    openBooking(courtId) {
        const court = courts.find(c => c.id === courtId);
        if (!court) return;
        
        this.currentCourt = court;
        this.updateModalContent(court);
        this.showModal();
    }
    
    updateModalContent(court) {
        const modalTitle = document.querySelector('#booking-modal h2');
        const modalContent = document.querySelector('#booking-modal .modal-content');
        
        if (!modalTitle || !modalContent) return;
        
        modalTitle.textContent = `Reserveren - ${court.name}`;
        
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dutchDays = {
            'Monday': 'Maandag',
            'Tuesday': 'Dinsdag',
            'Wednesday': 'Woensdag',
            'Thursday': 'Donderdag',
            'Friday': 'Vrijdag',
            'Saturday': 'Zaterdag',
            'Sunday': 'Zondag'
        };
        
        const openingHoursHtml = days.map(day => `
            <div class="flex justify-between py-1">
                <span class="font-medium">${dutchDays[day]}</span>
                <span>${court.openingHours[day].open} - ${court.openingHours[day].close}</span>
            </div>
        `).join('');
        
        modalContent.innerHTML = `
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="booking-date">
                    Datum
                </label>
                <input type="date" id="booking-date" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="booking-time">
                    Tijd
                </label>
                <select id="booking-time" class="w-full p-2 border rounded">
                    <option value="">Selecteer eerst een datum</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="booking-duration">
                    Duur
                </label>
                <select id="booking-duration" class="w-full p-2 border rounded">
                    <option value="1">1 uur</option>
                    <option value="2">2 uur</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="booking-players">
                    Aantal Spelers
                </label>
                <select id="booking-players" class="w-full p-2 border rounded">
                    <option value="2">2 spelers</option>
                    <option value="4">4 spelers</option>
                </select>
            </div>
            <div class="mt-6">
                <h3 class="text-lg font-bold mb-2">Openingstijden</h3>
                <div class="bg-gray-50 p-3 rounded">
                    ${openingHoursHtml}
                </div>
            </div>
        `;
        
        // Add event listener to date input
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            dateInput.min = new Date().toISOString().split('T')[0];
            dateInput.addEventListener('change', () => this.loadAvailability(dateInput.value));
        }
    }
    
    loadAvailability(date) {
        if (!this.currentCourt) return;
        
        const timeSelect = document.getElementById('booking-time');
        if (!timeSelect) return;
        
        // Get day of week
        const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
        const openingHours = this.currentCourt.openingHours[dayOfWeek];
        
        // Generate time slots
        const slots = this.generateTimeSlots(openingHours.open, openingHours.close);
        
        timeSelect.innerHTML = slots.map(time => 
            `<option value="${time}">${time}</option>`
        ).join('');
    }
    
    generateTimeSlots(openTime, closeTime) {
        const slots = [];
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = closeTime.split(':').map(Number);
        
        let currentHour = openHour;
        let currentMinute = openMinute;
        
        while (currentHour < closeHour || (currentHour === closeHour && currentMinute < closeMinute)) {
            slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
            
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute = 0;
            }
        }
        
        return slots;
    }
    
    showModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    closeModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    submitBooking() {
        // TODO: Implement booking submission
        alert('Booking functionality will be implemented soon!');
        this.closeModal();
    }
}
