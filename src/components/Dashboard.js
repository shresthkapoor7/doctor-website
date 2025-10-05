import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import StatsWidgets from './StatsWidgets';
import PatientWidgets from './PatientWidgets';
import AIInsights from './AIInsights';
import { sampleData } from '../data/sampleData';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [patients] = useState(sampleData.patients);
  const [appointments] = useState(sampleData.appointments);
  const [aiInsights] = useState(sampleData.aiInsights);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-content">
            <StatsWidgets appointments={appointments} />
            <div className="dashboard-grid">
              <PatientWidgets patients={patients} />
              <AIInsights insights={aiInsights} />
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="dashboard-content">
            <PatientWidgets patients={patients} />
          </div>
        );
      case 'insights':
        return (
          <div className="dashboard-content">
            <AIInsights insights={aiInsights} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
