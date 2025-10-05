import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets,
  Eye,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import './PatientWidgets.css';

const PatientWidgets = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getVitalIcon = (type) => {
    switch (type) {
      case 'heartRate': return Heart;
      case 'bloodPressure': return Activity;
      case 'temperature': return Thermometer;
      case 'oxygen': return Droplets;
      case 'vision': return Eye;
      default: return Activity;
    }
  };

  const getVitalStatus = (value, type) => {
    switch (type) {
      case 'heartRate':
        return value > 100 || value < 60 ? 'warning' : 'normal';
      case 'bloodPressure':
        const [systolic, diastolic] = value.split('/').map(Number);
        return systolic > 140 || diastolic > 90 ? 'warning' : 'normal';
      case 'temperature':
        return value > 37.5 || value < 36.1 ? 'warning' : 'normal';
      case 'oxygen':
        return value < 95 ? 'warning' : 'normal';
      default:
        return 'normal';
    }
  };

  const PatientCard = ({ patient }) => {
    const latestVitals = patient.vitals[patient.vitals.length - 1];
    const hasWarnings = Object.entries(latestVitals).some(([type, value]) => 
      getVitalStatus(value, type) === 'warning'
    );

    return (
      <div 
        className={`patient-card ${hasWarnings ? 'has-warnings' : ''}`}
        onClick={() => setSelectedPatient(patient)}
      >
        <div className="patient-header">
          <div className="patient-avatar">
            <User size={20} />
          </div>
          <div className="patient-info">
            <h3 className="patient-name">{patient.name}</h3>
            <p className="patient-age">Age: {patient.age} • {patient.gender}</p>
          </div>
          <div className="patient-status">
            {hasWarnings ? (
              <AlertCircle className="warning-icon" size={20} />
            ) : (
              <CheckCircle className="normal-icon" size={20} />
            )}
            <ChevronRight size={16} />
          </div>
        </div>
        
        <div className="patient-vitals">
          <div className="vitals-grid">
            {Object.entries(latestVitals).map(([type, value]) => {
              const Icon = getVitalIcon(type);
              const status = getVitalStatus(value, type);
              return (
                <div key={type} className={`vital-item ${status}`}>
                  <Icon size={16} />
                  <span className="vital-label">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="vital-value">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="patient-footer">
          <div className="last-visit">
            <Calendar size={14} />
            <span>Last visit: {patient.lastVisit}</span>
          </div>
          <div className="next-appointment">
            Next: {patient.nextAppointment}
          </div>
        </div>
      </div>
    );
  };

  const PatientDetail = ({ patient }) => {
    if (!patient) return null;

    return (
      <div className="patient-detail">
        <div className="detail-header">
          <h2>{patient.name}</h2>
          <button 
            className="close-btn"
            onClick={() => setSelectedPatient(null)}
          >
            ×
          </button>
        </div>
        
        <div className="detail-content">
          <div className="detail-section">
            <h3>Patient Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">{patient.age}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender:</span>
                <span className="info-value">{patient.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{patient.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{patient.email}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Medical History</h3>
            <div className="history-list">
              {patient.medicalHistory.map((condition, index) => (
                <div key={index} className="history-item">
                  <span className="condition">{condition.condition}</span>
                  <span className="date">{condition.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Current Medications</h3>
            <div className="medications-list">
              {patient.medications.map((med, index) => (
                <div key={index} className="medication-item">
                  <span className="med-name">{med.name}</span>
                  <span className="med-dosage">{med.dosage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="patient-widgets">
      <h2 className="widget-title">Patient Overview</h2>
      
      {selectedPatient ? (
        <PatientDetail patient={selectedPatient} />
      ) : (
        <div className="patients-grid">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientWidgets;
