import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings'; 
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setPage('dashboard');
    setAuthView('login');
  };

  if (!user) {
    return authView === 'login' ? (
      <Login onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} switchToRegister={() => setAuthView('register')} />
    ) : (
      <Register switchToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30">
      <Navbar user={user} onLogout={handleLogout} setPage={setPage} />
      <main className="max-w-7xl mx-auto px-6 py-10">
        {page === 'dashboard' && <Dashboard />}
        {page === 'create-event' && user.role === 'admin' && <CreateEvent setPage={setPage} />}
        {page === 'admin-approvals' && user.role === 'admin' && <AdminDashboard />}
        
       
        {page === 'my-bookings' && user.role === 'user' && <MyBookings />}
      </main>
    </div>
  );
}

export default App;