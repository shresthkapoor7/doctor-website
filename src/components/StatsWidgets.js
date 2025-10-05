import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import './StatsWidgets.css';

const StatsWidgets = ({ appointments }) => {
  const totalAppointments = appointments ? appointments.length : 0;
  const navigate = useNavigate();

  const goToAppointments = () => {
    try { localStorage.setItem('activeTab', 'appointments'); } catch (_) {}
    // Force full refresh so dashboard initializes on the Appointments tab
    window.location.reload();
  };

  const stats = [
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: Calendar,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      onClick: goToAppointments,
    },
    {
      title: 'Completed',
      value: 'N/A',
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Pending',
      value: 'N/A',
      icon: Clock,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Today',
      value: 'N/A',
      icon: TrendingUp,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    }
  ];

  return (
    <div className="stats-widgets">
      <h2 className="stats-title">Appointment Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const clickable = Boolean(stat.onClick);
          return (
            <div key={index} className={`stat-card ${clickable ? 'clickable' : ''}`} onClick={stat.onClick}>
              <div className="stat-header">
                <div
                  className="stat-icon"
                  style={{
                    backgroundColor: stat.bgColor,
                    color: stat.color
                  }}
                >
                  <Icon size={24} />
                </div>
                {stat.change && (
                  <div className={`stat-change ${stat.changeType}`}>
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsWidgets;
