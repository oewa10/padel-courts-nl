import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Types
interface Court {
  id: number;
  name: string;
  location: string;
  pricePerHour: number;
  indoor: boolean;
}

interface Booking {
  id: number;
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
  userId: number;
}

// In-memory storage (will be replaced with a database later)
const courts: Court[] = [
  {
    id: 1,
    name: "Padel Factory Amsterdam",
    location: "Amsterdam",
    pricePerHour: 40,
    indoor: true,
  },
  {
    id: 2,
    name: "Rotterdam Padel Club",
    location: "Rotterdam",
    pricePerHour: 35,
    indoor: false,
  },
];

const bookings: Booking[] = [];

const app = new Application();
const router = new Router();

// Routes
router.get("/", (ctx) => {
  ctx.response.body = "Welcome to Padel Courts NL API";
});

router.get("/courts", (ctx) => {
  ctx.response.body = courts;
});

router.get("/courts/:id", (ctx) => {
  const id = parseInt(ctx.params.id!);
  const court = courts.find((c) => c.id === id);
  if (court) {
    ctx.response.body = court;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Court not found" };
  }
});

router.get("/courts/:id/availability", (ctx) => {
  const id = parseInt(ctx.params.id!);
  const date = ctx.request.url.searchParams.get("date");
  
  const courtBookings = bookings.filter(
    (b) => b.courtId === id && b.date === date
  );
  
  // Generate available time slots (9:00 - 22:00)
  const timeSlots = [];
  for (let hour = 9; hour < 22; hour++) {
    const startTime = `${hour}:00`;
    const isBooked = courtBookings.some(
      (b) => b.startTime === startTime
    );
    if (!isBooked) {
      timeSlots.push(startTime);
    }
  }
  
  ctx.response.body = { 
    courtId: id, 
    date, 
    availableSlots: timeSlots 
  };
});

router.post("/bookings", async (ctx) => {
  const body = await ctx.request.body().value;
  const booking: Booking = {
    id: bookings.length + 1,
    ...body,
  };
  bookings.push(booking);
  ctx.response.body = booking;
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
