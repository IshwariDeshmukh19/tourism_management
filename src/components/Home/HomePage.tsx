import React from 'react';
import { MapPin, Clock, Star, Users, Award, Globe } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const { touristSpots } = useData();
  
  const featuredSpots = touristSpots.slice(0, 3);
  const stats = [
    { icon: MapPin, label: 'Tourist Spots', value: touristSpots.length.toString() },
    { icon: Users, label: 'Happy Visitors', value: '50K+' },
    { icon: Award, label: 'Awards Won', value: '15' },
    { icon: Globe, label: 'Cities Covered', value: '25+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="block text-yellow-400">Tourist Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explore breathtaking locations, rich cultural heritage, and unforgettable experiences across India
            </p>
            <button
              onClick={() => setActiveTab('destinations')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular tourist spots with incredible experiences waiting for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {spot.city}
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {spot.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{spot.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{spot.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {spot.distance}km from center
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {spot.openingTime} - {spot.closingTime}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {spot.entryFee === 0 ? 'Free' : `₹${spot.entryFee}`}
                    </span>
                    <button
                      onClick={() => setActiveTab('booking')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setActiveTab('destinations')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of travelers who have discovered amazing destinations through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('destinations')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Destinations
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book Your Trip
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;