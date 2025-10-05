import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Search, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorData = localStorage.getItem('doctor');
    if (doctorData) {
      setDoctor(JSON.parse(doctorData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('doctor');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Medical Dashboard</h1>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">{doctor ? doctor.name : 'Dr. Who'}</span>
            <span className="user-role">Cardiologist</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
