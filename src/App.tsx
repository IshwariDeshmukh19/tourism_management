import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import DestinationsPage from './components/Destinations/DestinationsPage';
import BookingPage from './components/Booking/BookingPage';
import AuthPage from './components/Auth/AuthPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user, isAuthenticated } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'destinations':
        return <DestinationsPage setActiveTab={setActiveTab} />;
      case 'booking':
        return <BookingPage setActiveTab={setActiveTab} />;
      case 'auth':
        return isAuthenticated ? <HomePage setActiveTab={setActiveTab} /> : <AuthPage setActiveTab={setActiveTab} />;
      case 'admin':
        return (isAuthenticated && user?.role === 'admin') ? <AdminDashboard /> : <HomePage setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;