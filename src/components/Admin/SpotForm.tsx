import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { TouristSpot } from '../../types';

interface SpotFormProps {
  spot: TouristSpot | null;
  onClose: () => void;
}

const SpotForm: React.FC<SpotFormProps> = ({ spot, onClose }) => {
  const { addTouristSpot, updateTouristSpot } = useData();
  const [formData, setFormData] = useState({
    name: spot?.name || '',
    city: spot?.city || '',
    category: spot?.category || 'historical',
    description: spot?.description || '',
    image: spot?.image || '',
    distance: spot?.distance || 0,
    openingTime: spot?.openingTime || '09:00',
    closingTime: spot?.closingTime || '17:00',
    entryFee: spot?.entryFee || 0,
    rating: spot?.rating || 4.0,
    coordinates: {
      lat: spot?.coordinates.lat || 0,
      lng: spot?.coordinates.lng || 0
    },
    amenities: spot?.amenities.join(', ') || '',
    bestTimeToVisit: spot?.bestTimeToVisit || ''
  });

  const categories = [
    { value: 'historical', label: 'Historical' },
    { value: 'natural', label: 'Natural' },
    { value: 'religious', label: 'Religious' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'modern', label: 'Modern' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: parseFloat(value) || 0
        }
      }));
    } else if (name === 'distance' || name === 'entryFee' || name === 'rating') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const spotData = {
      ...formData,
      category: formData.category as TouristSpot['category'],
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
    };

    if (spot) {
      updateTouristSpot(spot.id, spotData);
    } else {
      addTouristSpot(spotData);
    }

    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {spot ? 'Edit Tourist Spot' : 'Add New Tourist Spot'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="https://images.pexels.com/..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance from City Center (km) *
                </label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Time *
                </label>
                <input
                  type="time"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Time *
                </label>
                <input
                  type="time"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Fee (₹) *
              </label>
              <input
                type="number"
                name="entryFee"
                value={formData.entryFee}
                onChange={handleInputChange}
                min="0"
                required
                placeholder="Enter 0 for free entry"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  name="lat"
                  value={formData.coordinates.lat}
                  onChange={handleInputChange}
                  step="any"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  name="lng"
                  value={formData.coordinates.lng}
                  onChange={handleInputChange}
                  step="any"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder="Parking, Guide Available, Cafeteria (comma separated)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best Time to Visit *
              </label>
              <input
                type="text"
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleInputChange}
                required
                placeholder="October to March"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {spot ? 'Update Spot' : 'Create Spot'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpotForm;