import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import './Header.css';

const Header = () => {
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
            <span className="user-name">Dr. Sarah Johnson</span>
            <span className="user-role">Cardiologist</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
