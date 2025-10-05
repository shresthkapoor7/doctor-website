import React, { useState } from 'react';
import { User, Heart, Footprints, Flame, Milestone } from 'lucide-react';
import './PatientWidgets.css';
import PatientDetail from './PatientDetail';

const formatMetric = (value, unit) => {
  if (value === null || value === undefined || value === '') return 'N/A';
  const num = parseFloat(value);
  if (Number.isNaN(num)) return 'N/A';
  const display = Number.isInteger(num) ? num : num.toFixed(1);
  return `${display} ${unit}`;
};

const PatientWidgets = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  if (!patients || patients.length === 0) {
    return (
      <div className="patient-widgets">
        <h2 className="widget-title">Patient Overview</h2>
        <p>No patients found.</p>
      </div>
    );
  }

  return (
    <div className="patient-overview-container">
      <div className="patient-list-container">
        <h2 className="widget-title">Patient Overview</h2>
        <div className="patients-grid">
          {patients.map((patient) => (
            <div key={patient.id} className="patient-card" onClick={() => setSelectedPatient(patient)}>
              <div className="patient-header">
                <div className="patient-avatar">
                  <User size={20} />
                </div>
                <div className="patient-info">
                  <h3 className="patient-name">{patient.name}</h3>
                  <p className="patient-age">Age: {patient.age}</p>
                </div>
              </div>
              {patient.healthData && (
              <div className="patient-vitals">
                  <div className="vitals-grid">
                      <div className="vital-item">
                        <Footprints size={16} />
                        <span className="vital-label">Step Count</span>
                        <span className="vital-value">{patient.healthData.step_count ?? 'N/A'}</span>
                      </div>
                      <div className="vital-item">
                        <Heart size={16} />
                        <span className="vital-label">Heart Rate</span>
                        <span className="vital-value">{formatMetric(patient.healthData.heart_rate_avg, 'bpm')}</span>
                      </div>
                      <div className="vital-item">
                        <Flame size={16} />
                        <span className="vital-label">Active Energy</span>
                        <span className="vital-value">{formatMetric(patient.healthData.active_energy, 'kcal')}</span>
                      </div>
                      <div className="vital-item">
                        <Milestone size={16} />
                        <span className="vital-label">Distance</span>
                        <span className="vital-value">{formatMetric(patient.healthData.distance, 'km')}</span>
                      </div>
                  </div>
                </div>
              )}
              <div className="patient-footer">
                  <p>Email: {patient.email}</p>
                  <p>Phone: {patient.phone_number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPatient && (
        <div className="patient-detail-container">
          <PatientDetail patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        </div>
      )}
    </div>
  );
};

export default PatientWidgets;
