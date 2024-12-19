from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, time
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI(title="Padel Courts NL API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Court(BaseModel):
    id: int
    name: str
    location: str
    price_per_hour: float
    indoor: bool

class Booking(BaseModel):
    id: int
    court_id: int
    date: datetime
    start_time: time
    end_time: time
    user_id: int

# Temporary data storage (replace with database)
courts = []
bookings = []

@app.get("/")
async def root():
    return {"message": "Welcome to Padel Courts NL API"}

@app.get("/courts")
async def get_courts(location: Optional[str] = None):
    if location:
        return [court for court in courts if location.lower() in court.location.lower()]
    return courts

@app.get("/courts/{court_id}/availability")
async def get_court_availability(court_id: int, date: str):
    # TODO: Implement availability logic
    return {"court_id": court_id, "date": date, "available_slots": []}

@app.post("/bookings")
async def create_booking(booking: Booking):
    # TODO: Implement booking creation logic
    bookings.append(booking)
    return booking

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
