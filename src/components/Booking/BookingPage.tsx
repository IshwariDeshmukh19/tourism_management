import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface BookingPageProps {
  setActiveTab: (tab: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ setActiveTab }) => {
  const { touristSpots, addBookingRequest } = useData();
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    numberOfPeople: 1,
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpotId) {
      alert('Please select a destination');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addBookingRequest({
      spotId: selectedSpotId,
      ...formData
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      visitDate: '',
      numberOfPeople: 1,
      specialRequirements: ''
    });
    setSelectedSpotId('');
  };

  const selectedSpot = touristSpots.find(spot => spot.id === selectedSpotId);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            We've received your booking request and will contact you within 24 hours to confirm your visit.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Make Another Booking
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Visit
          </h1>
          <p className="text-xl text-gray-600">
            Reserve your spot at amazing destinations across India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Select Destination
                </label>
                <select
                  value={selectedSpotId}
                  onChange={(e) => setSelectedSpotId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a destination</option>
                  {touristSpots.map(spot => (
                    <option key={spot.id} value={spot.id}>
                      {spot.name} - {spot.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Visit Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Visit Date
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of People
                  </label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special accessibility needs, dietary restrictions, or other requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>

          {/* Selected Destination Preview */}
          <div className="space-y-6">
            {selectedSpot ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selectedSpot.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedSpot.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedSpot.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance from center:</span>
                      <span className="font-medium">{selectedSpot.distance}km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Opening Hours:</span>
                      <span className="font-medium">
                        {selectedSpot.openingTime} - {selectedSpot.closingTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entry Fee:</span>
                      <span className="font-medium text-blue-600">
                        {selectedSpot.entryFee === 0 ? 'Free' : `₹${selectedSpot.entryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time to Visit:</span>
                      <span className="font-medium">{selectedSpot.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpot.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select a Destination
                </h3>
                <p className="text-gray-600">
                  Choose a destination from the dropdown to see details and complete your booking
                </p>
              </div>
            )}

            {/* Booking Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Booking Information</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Booking confirmation within 24 hours</li>
                <li>• Free cancellation up to 48 hours before visit</li>
                <li>• Group discounts available for 10+ people</li>
                <li>• Accessibility support available on request</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;