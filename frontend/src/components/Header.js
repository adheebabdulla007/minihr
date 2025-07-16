// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../firebase/auth';
import '../styles/Header.css';

const Header = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          MiniHR
        </Link>
        {user && role === 'hr' && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/add-employee">Add Employee</Link>
          </>
        )}
        {user && role === 'employee' && <Link to="/employee-dashboard">My Profile</Link>}
      </div>
      <div className="navbar-right">
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
