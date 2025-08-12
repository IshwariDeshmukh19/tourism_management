import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Clock, Star, Calendar, IndianRupee } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { TouristSpot } from '../../types';

interface DestinationsPageProps {
  setActiveTab: (tab: string) => void;
}

const DestinationsPage: React.FC<DestinationsPageProps> = ({ setActiveTab }) => {
  const { touristSpots } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const cities = useMemo(() => {
    const citySet = new Set(touristSpots.map(spot => spot.city));
    return Array.from(citySet).sort();
  }, [touristSpots]);

  const categories = [
    { value: 'historical', label: 'Historical' },
    { value: 'natural', label: 'Natural' },
    { value: 'religious', label: 'Religious' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'modern', label: 'Modern' }
  ];

  const filteredSpots = useMemo(() => {
    return touristSpots.filter(spot => {
      const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = !selectedCity || spot.city === selectedCity;
      const matchesCategory = !selectedCategory || spot.category === selectedCategory;
      const matchesRating = spot.rating >= minRating;

      return matchesSearch && matchesCity && matchesCategory && matchesRating;
    });
  }, [touristSpots, searchQuery, selectedCity, selectedCategory, minRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedCategory('');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing places across India with detailed information and booking options
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search destinations, cities, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {(selectedCity || selectedCategory || minRating > 0) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found {filteredSpots.length} destination{filteredSpots.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpots.map((spot) => (
            <div key={spot.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm capitalize">
                  {spot.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{spot.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{spot.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {spot.distance}km from city center
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {spot.openingTime} - {spot.closingTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Best time: {spot.bestTimeToVisit}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {spot.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {spot.amenities.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">
                        +{spot.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-2xl font-bold text-blue-600">
                    {spot.entryFee === 0 ? (
                      'Free Entry'
                    ) : (
                      <>
                        <IndianRupee className="w-5 h-5" />
                        {spot.entryFee}
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;