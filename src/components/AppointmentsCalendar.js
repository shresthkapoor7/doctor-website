import React, { useMemo, useState } from 'react';
import './AppointmentsCalendar.css';

function startOfMonth(date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0,0,0,0);
  return d;
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const AppointmentsCalendar = ({ appointments, patients = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const patientById = useMemo(() => {
    const map = {};
    (patients || []).forEach((p) => { map[p.id] = p; });
    return map;
  }, [patients]);

  const byDay = useMemo(() => {
    const map = {};
    (appointments || []).forEach((apt) => {
      const date = new Date(apt.appointment_at);
      const key = formatYMD(date);
      if (!map[key]) map[key] = [];
      map[key].push(apt);
    });
    return map;
  }, [appointments]);

  const days = useMemo(() => {
    const first = startOfMonth(currentMonth);
    const startWeekday = first.getDay(); // 0-6
    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();

    const grid = [];
    for (let i = 0; i < startWeekday; i++) grid.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(first.getFullYear(), first.getMonth(), day);
      grid.push(d);
    }
    return grid;
  }, [currentMonth]);

  const selectedKey = selectedDate ? formatYMD(selectedDate) : null;
  const selectedAppointments = selectedKey ? (byDay[selectedKey] || []) : [];

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-wrap">
      <div className="calendar-header">
        <button className="cal-btn" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>{'<'}</button>
        <h2>{monthName}</h2>
        <button className="cal-btn" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</button>
      </div>

      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="cal-dow">{d}</div>
        ))}
        {days.map((d, idx) => {
          if (!d) return <div key={`empty-${idx}`} className="cal-cell empty" />;
          const key = formatYMD(d);
          const items = byDay[key] || [];
          const isSelected = selectedKey === key;
          return (
            <div key={key} className={`cal-cell day ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedDate(d)}>
              <div className="cal-daynum">{d.getDate()}</div>
              {items.length > 0 && <div className="cal-badge">{items.length}</div>}
            </div>
          );
        })}
      </div>

      <div className="calendar-list">
        <h3>{selectedDate ? `Appointments on ${selectedDate.toLocaleDateString()}` : 'Select a date'}</h3>
        {selectedAppointments.length === 0 ? (
          <p className="muted">No appointments.</p>
        ) : (
          <ul className="apt-list">
            {selectedAppointments.map((apt) => {
              const p = patientById[apt.patient_id];
              return (
                <li key={apt.id} className="apt-item">
                  <span className="time">{new Date(apt.appointment_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className="apt-main">
                    <div className="apt-title">{p ? p.name : 'Unknown patient'}</div>
                    <div className="apt-sub">
                      {p?.email ? <span>{p.email}</span> : null}
                      {p?.phone_number ? <span> · {p.phone_number}</span> : null}
                    </div>
                    <div className="apt-summary">{apt.ai_summary || 'Appointment'}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
