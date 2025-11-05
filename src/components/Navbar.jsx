import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="navbar">
      <h1>SlotSwapper</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <nav style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ fontWeight: location.pathname === '/dashboard' ? 'bold' : 'normal' }}>
            Dashboard
          </Link>
          <Link to="/marketplace" style={{ fontWeight: location.pathname === '/marketplace' ? 'bold' : 'normal' }}>
            Marketplace
          </Link>
          <Link to="/requests" style={{ fontWeight: location.pathname === '/requests' ? 'bold' : 'normal' }}>
            Requests
          </Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '14px' }}>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
