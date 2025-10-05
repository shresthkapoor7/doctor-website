import React from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import './StatsWidgets.css';

const StatsWidgets = ({ appointments }) => {
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toDateString();
    return new Date(apt.date).toDateString() === today;
  }).length;

  const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;

  const stats = [
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: Calendar,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Completed',
      value: completedAppointments,
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#d1fae5',
      change: `+${completionRate}%`,
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: pendingAppointments,
      icon: Clock,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Today',
      value: todayAppointments,
      icon: TrendingUp,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      change: '+3',
      changeType: 'positive'
    }
  ];

  return (
    <div className="stats-widgets">
      <h2 className="stats-title">Appointment Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
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
                <div className={`stat-change ${stat.changeType}`}>
                  {stat.change}
                </div>
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
