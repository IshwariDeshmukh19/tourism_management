import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, Users, MapPin } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { TouristSpot } from '../../types';
import SpotForm from './SpotForm';

const AdminDashboard: React.FC = () => {
  const { touristSpots, bookingRequests, deleteTouristSpot, updateBookingStatus } = useData();
  const [activeView, setActiveView] = useState<'overview' | 'spots' | 'bookings'>('overview');
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [editingSpot, setEditingSpot] = useState<TouristSpot | null>(null);

  const handleEditSpot = (spot: TouristSpot) => {
    setEditingSpot(spot);
    setShowSpotForm(true);
  };

  const handleDeleteSpot = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tourist spot?')) {
      deleteTouristSpot(id);
    }
  };

  const handleCloseForm = () => {
    setShowSpotForm(false);
    setEditingSpot(null);
  };

  const stats = [
    { label: 'Total Spots', value: touristSpots.length, icon: MapPin },
    { label: 'Pending Bookings', value: bookingRequests.filter(b => b.status === 'pending').length, icon: Calendar },
    { label: 'Total Bookings', value: bookingRequests.length, icon: Users },
    { label: 'Cities Covered', value: new Set(touristSpots.map(s => s.city)).size, icon: Eye }
  ];

  if (showSpotForm) {
    return (
      <SpotForm
        spot={editingSpot}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage tourist spots and bookings
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'spots', label: 'Tourist Spots' },
              { id: 'bookings', label: 'Bookings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                </div>
                <div className="p-6">
                  {bookingRequests.slice(0, 5).map(booking => {
                    const spot = touristSpots.find(s => s.id === booking.spotId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{booking.name}</p>
                          <p className="text-sm text-gray-600">{spot?.name}</p>
                          <p className="text-xs text-gray-500">{booking.visitDate}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Popular Destinations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Popular Destinations</h3>
                </div>
                <div className="p-6">
                  {touristSpots
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5)
                    .map(spot => (
                      <div key={spot.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{spot.name}</p>
                          <p className="text-sm text-gray-600">{spot.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{spot.rating}★</p>
                          <p className="text-xs text-gray-500">{spot.category}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tourist Spots Management */}
        {activeView === 'spots' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Tourist Spots</h2>
              <button
                onClick={() => setShowSpotForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Spot
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entry Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {touristSpots.map(spot => (
                      <tr key={spot.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{spot.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{spot.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                            {spot.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{spot.rating}★</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {spot.entryFee === 0 ? 'Free' : `₹${spot.entryFee}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditSpot(spot)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSpot(spot.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Management */}
        {activeView === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Booking Requests</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visit Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        People
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookingRequests.map(booking => {
                      const spot = touristSpots.find(s => s.id === booking.spotId);
                      return (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                              <div className="text-sm text-gray-500">{booking.email}</div>
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{spot?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{spot?.city}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.visitDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.numberOfPeople}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;