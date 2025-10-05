import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import StatsWidgets from './StatsWidgets';
import PatientWidgets from './PatientWidgets';
import AppointmentsCalendar from './AppointmentsCalendar';
import { supabase } from '../supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem('activeTab');
      return saved || 'overview';
    } catch (_) {
      return 'overview';
    }
  });
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try { localStorage.setItem('activeTab', activeTab); } catch (_) {}
    const doctorData = localStorage.getItem('doctor');
    if (!doctorData) {
      navigate('/login');
      return;
    }

    const doctor = JSON.parse(doctorData);

    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctor.id);

      if (error) {
        console.error('Error fetching appointments:', error);
      } else {
        setAppointments(data);
      }
    };

    const fetchPatients = async () => {
      const { data: patientsData, error: patientsError } = await supabase
        .from('patient')
        .select('*')
        .eq('doctor_id', doctor.id);

      if (patientsError) {
        console.error('Error fetching patients:', patientsError);
        return;
      }

      if (patientsData) {
        const patientsWithHealthData = await Promise.all(
          patientsData.map(async (patient) => {
            const { data: healthData, error: healthError } = await supabase
              .from('patient_health_data')
              .select('step_count, heart_rate_avg, active_energy, distance')
              .eq('patient_id', patient.id)
              .order('recorded_at', { ascending: false })
              .limit(1);

            if (healthError) {
              console.error(`Error fetching health data for patient ${patient.id}:`, healthError);
              return { ...patient, healthData: null };
            }

            return { ...patient, healthData: healthData && healthData.length > 0 ? healthData[0] : null };
          })
        );
        setPatients(patientsWithHealthData);
      }
    };

    fetchAppointments();
    fetchPatients();
  }, [navigate, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-content">
            <StatsWidgets appointments={appointments} />
            <div className="dashboard-grid">
              <PatientWidgets patients={patients} />
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="dashboard-content">
            <PatientWidgets patients={patients} />
          </div>
        );
      case 'appointments':
        return (
          <div className="dashboard-content">
            <AppointmentsCalendar appointments={appointments} patients={patients} />
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
