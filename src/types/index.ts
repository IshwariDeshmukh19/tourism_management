export interface TouristSpot {
  id: string;
  name: string;
  city: string;
  category: 'historical' | 'natural' | 'religious' | 'adventure' | 'cultural' | 'modern';
  description: string;
  image: string;
  distance: number; // in km from city center
  openingTime: string;
  closingTime: string;
  entryFee: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  bestTimeToVisit: string;
}

export interface BookingRequest {
  id: string;
  spotId: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  numberOfPeople: number;
  specialRequirements?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}