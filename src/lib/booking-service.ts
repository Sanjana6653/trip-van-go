// In-memory booking service
interface Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  destination: string;
  maxCapacity: number;
}

interface Booking {
  id: string;
  tripId: string;
  tripName: string;
  userName: string;
  selectedDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  price: number;
}

// Predefined trip plans
export const trips: Trip[] = [
  {
    id: '1',
    title: 'Mountain Adventure',
    description: 'Experience breathtaking mountain views, hiking trails, and cozy campfire nights under the stars.',
    price: 299,
    duration: '3 days',
    destination: 'Rocky Mountains',
    maxCapacity: 5
  },
  {
    id: '2',
    title: 'Beach Paradise',
    description: 'Relax on pristine beaches, enjoy water sports, and witness stunning sunsets by the ocean.',
    price: 199,
    duration: '2 days',
    destination: 'Malibu Coast',
    maxCapacity: 5
  },
  {
    id: '3',
    title: 'City Explorer',
    description: 'Discover urban culture, visit museums, enjoy local cuisine, and explore hidden gems in the city.',
    price: 149,
    duration: '1 day',
    destination: 'San Francisco',
    maxCapacity: 5
  },
  {
    id: '4',
    title: 'Desert Safari',
    description: 'Adventure through vast desert landscapes, camel rides, and traditional desert camping experience.',
    price: 399,
    duration: '4 days',
    destination: 'Mojave Desert',
    maxCapacity: 5
  },
  {
    id: '5',
    title: 'Forest Retreat',
    description: 'Immerse yourself in nature with guided forest walks, wildlife spotting, and peaceful meditation.',
    price: 249,
    duration: '2 days',
    destination: 'Redwood National Park',
    maxCapacity: 5
  },
  {
    id: '6',
    title: 'Wine Country Tour',
    description: 'Sample exquisite wines, tour vineyards, and enjoy gourmet dining in beautiful wine country.',
    price: 179,
    duration: '1 day',
    destination: 'Napa Valley',
    maxCapacity: 5
  }
];

// In-memory storage for bookings
let bookings: Booking[] = [];

// Maximum vans available per date
const MAX_VANS_PER_DATE = 5;

export const bookingService = {
  // Get all trips
  getTrips: (): Trip[] => {
    return trips;
  },

  // Get trip by ID
  getTripById: (id: string): Trip | undefined => {
    return trips.find(trip => trip.id === id);
  },

  // Check availability for a specific date
  checkAvailability: (date: string): { available: boolean; vansLeft: number } => {
    const bookingsForDate = bookings.filter(
      booking => booking.selectedDate === date && booking.status === 'confirmed'
    );
    
    const vansLeft = MAX_VANS_PER_DATE - bookingsForDate.length;
    return {
      available: vansLeft > 0,
      vansLeft: Math.max(0, vansLeft)
    };
  },

  // Create a new booking
  createBooking: (tripId: string, userName: string, selectedDate: string): { success: boolean; booking?: Booking; message: string } => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) {
      return { success: false, message: 'Trip not found' };
    }

    const availability = bookingService.checkAvailability(selectedDate);
    if (!availability.available) {
      return { success: false, message: 'No vans available for this date' };
    }

    const booking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tripId,
      tripName: trip.title,
      userName,
      selectedDate,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      price: trip.price
    };

    bookings.push(booking);
    return { success: true, booking, message: 'Booking confirmed successfully!' };
  },

  // Get all bookings (for admin panel)
  getAllBookings: (): Booking[] => {
    return [...bookings].sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime());
  },

  // Get booking by ID
  getBookingById: (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  },

  // Get bookings count for a specific date
  getBookingsCountForDate: (date: string): number => {
    return bookings.filter(
      booking => booking.selectedDate === date && booking.status === 'confirmed'
    ).length;
  }
};