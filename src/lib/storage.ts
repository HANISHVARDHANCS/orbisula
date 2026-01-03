// Simple localStorage-based data store for GlobeTrotter MVP

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  destinations: string[];
  budget: number;
  image: string;
}

export interface User {
  email: string;
  name: string;
}

const TRIPS_KEY = 'globetrotter_trips';
const USER_KEY = 'globetrotter_user';

// Default trips for demo
const defaultTrips: Trip[] = [
  {
    id: '1',
    name: 'Kerala Backwaters Bliss',
    startDate: '2025-02-15',
    endDate: '2025-02-22',
    description: 'Explore the serene backwaters of Kerala with houseboat stays and Ayurvedic spa experiences.',
    destinations: ['Kochi', 'Alleppey', 'Munnar'],
    budget: 45000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Royal Rajasthan Heritage',
    startDate: '2025-03-10',
    endDate: '2025-03-18',
    description: 'Experience the royal heritage of Rajasthan with palace stays and desert safaris.',
    destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
    budget: 65000,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Chennai Cultural Trail',
    startDate: '2025-04-05',
    endDate: '2025-04-10',
    description: 'Discover the rich culture and temples of Tamil Nadu starting from Chennai.',
    destinations: ['Chennai', 'Mahabalipuram', 'Pondicherry'],
    budget: 28000,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
  },
];

export const getTrips = (): Trip[] => {
  const stored = localStorage.getItem(TRIPS_KEY);
  if (!stored) {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(defaultTrips));
    return defaultTrips;
  }
  return JSON.parse(stored);
};

export const saveTrip = (trip: Trip): void => {
  const trips = getTrips();
  const existing = trips.findIndex(t => t.id === trip.id);
  if (existing >= 0) {
    trips[existing] = trip;
  } else {
    trips.push(trip);
  }
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const deleteTrip = (id: string): void => {
  const trips = getTrips().filter(t => t.id !== id);
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const login = (email: string, password: string): User | null => {
  // Fake auth - accept test@test.com / 123
  if (email === 'test@test.com' && password === '123') {
    const user = { email, name: 'Traveler' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Jaipur', 'Udaipur', 'Goa', 'Kochi', 'Alleppey', 'Munnar',
  'Agra', 'Varanasi', 'Rishikesh', 'Shimla', 'Manali', 'Leh',
  'Darjeeling', 'Gangtok', 'Jodhpur', 'Jaisalmer', 'Amritsar', 'Pondicherry',
  'Ooty', 'Coorg', 'Hampi', 'Mysore', 'Ajanta', 'Ellora',
];

export const generateId = (): string => Math.random().toString(36).substr(2, 9);
