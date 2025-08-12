import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TouristSpot, BookingRequest } from '../types';

interface DataContextType {
  touristSpots: TouristSpot[];
  bookingRequests: BookingRequest[];
  addTouristSpot: (spot: Omit<TouristSpot, 'id'>) => void;
  updateTouristSpot: (id: string, spot: Partial<TouristSpot>) => void;
  deleteTouristSpot: (id: string) => void;
  addBookingRequest: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: BookingRequest['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const initialTouristSpots: TouristSpot[] = [
  {
    id: '1',
    name: 'Red Fort',
    city: 'Delhi',
    category: 'historical',
    description: 'A historic fortified palace of the Mughal emperors of India',
    image: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg',
    distance: 5,
    openingTime: '09:30',
    closingTime: '16:30',
    entryFee: 50,
    rating: 4.5,
    coordinates: { lat: 28.6562, lng: 77.2410 },
    amenities: ['Parking', 'Guide Available', 'Cafeteria'],
    bestTimeToVisit: 'October to March'
  },
  {
    id: '2',
    name: 'Taj Mahal',
    city: 'Agra',
    category: 'historical',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna',
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
    distance: 3,
    openingTime: '06:00',
    closingTime: '18:30',
    entryFee: 50,
    rating: 4.9,
    coordinates: { lat: 27.1751, lng: 78.0421 },
    amenities: ['Parking', 'Guide Available', 'Gift Shop', 'Wheelchair Access'],
    bestTimeToVisit: 'October to March'
  },
  {
    id: '3',
    name: 'Golden Temple',
    city: 'Amritsar',
    category: 'religious',
    description: 'The holiest Gurdwara and the most important pilgrimage site of Sikhism',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg',
    distance: 2,
    openingTime: '04:00',
    closingTime: '22:00',
    entryFee: 0,
    rating: 4.8,
    coordinates: { lat: 31.6200, lng: 74.8765 },
    amenities: ['Free Meals', 'Parking', 'Accommodation'],
    bestTimeToVisit: 'November to March'
  },
  {
    id: '4',
    name: 'Gateway of India',
    city: 'Mumbai',
    category: 'historical',
    description: 'An arch-monument built in the early 20th century in Mumbai',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg',
    distance: 1,
    openingTime: '00:00',
    closingTime: '23:59',
    entryFee: 0,
    rating: 4.3,
    coordinates: { lat: 18.9220, lng: 72.8347 },
    amenities: ['Parking', 'Boat Rides', 'Street Food'],
    bestTimeToVisit: 'November to February'
  },
  {
    id: '5',
    name: 'Valley of Flowers',
    city: 'Uttarakhand',
    category: 'natural',
    description: 'An Indian national park known for its meadows of endemic alpine flowers',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    distance: 15,
    openingTime: '06:00',
    closingTime: '18:00',
    entryFee: 600,
    rating: 4.7,
    coordinates: { lat: 30.7268, lng: 79.6009 },
    amenities: ['Trekking Guide', 'Rest Houses'],
    bestTimeToVisit: 'July to September'
  },
  {
    id: '6',
    name: 'Mysore Palace',
    city: 'Mysore',
    category: 'historical',
    description: 'A historical palace and a royal residence in Mysore',
    image: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg',
    distance: 2,
    openingTime: '10:00',
    closingTime: '17:30',
    entryFee: 70,
    rating: 4.6,
    coordinates: { lat: 12.3052, lng: 76.6553 },
    amenities: ['Audio Guide', 'Photography', 'Gift Shop'],
    bestTimeToVisit: 'October to March'
  }
];

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>(initialTouristSpots);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);

  const addTouristSpot = (spot: Omit<TouristSpot, 'id'>) => {
    const newSpot: TouristSpot = {
      ...spot,
      id: Date.now().toString()
    };
    setTouristSpots([...touristSpots, newSpot]);
  };

  const updateTouristSpot = (id: string, updates: Partial<TouristSpot>) => {
    setTouristSpots(spots => 
      spots.map(spot => spot.id === id ? { ...spot, ...updates } : spot)
    );
  };

  const deleteTouristSpot = (id: string) => {
    setTouristSpots(spots => spots.filter(spot => spot.id !== id));
  };

  const addBookingRequest = (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setBookingRequests([...bookingRequests, newBooking]);
  };

  const updateBookingStatus = (id: string, status: BookingRequest['status']) => {
    setBookingRequests(bookings => 
      bookings.map(booking => booking.id === id ? { ...booking, status } : booking)
    );
  };

  const value: DataContextType = {
    touristSpots,
    bookingRequests,
    addTouristSpot,
    updateTouristSpot,
    deleteTouristSpot,
    addBookingRequest,
    updateBookingStatus
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};