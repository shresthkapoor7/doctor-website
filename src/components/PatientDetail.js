import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './PatientDetail.css';
import { supabase } from '../supabaseClient';

const PatientDetail = ({ patient, onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportDraft, setReportDraft] = useState('');
  const [reportValidatedDraft, setReportValidatedDraft] = useState(false);
  const [editingReportId, setEditingReportId] = useState(null);
  const [isSavingReport, setIsSavingReport] = useState(false);

  useEffect(() => {
    if (patient) {
      const fetchPatientData = async () => {
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*')
          .eq('patient_id', patient.id)
          .order('appointment_at', { ascending: false });

        if (appointmentsError) {
          console.error('Error fetching appointments:', appointmentsError);
        } else {
          setAppointments(appointmentsData);
        }

        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select('id, patient_id, ai_summary, doctor_summary, validated, document_id, created_at, documents:document_id(bucket_id, path, file_name, content_type)')
          .eq('patient_id', patient.id)
          .order('created_at', { ascending: false });

        if (reportsError) {
          console.error('Error fetching reports:', reportsError);
        } else {
          const withUrls = (reportsData || []).map((r) => {
            let document_public_url = null;
            if (r?.documents?.bucket_id && r?.documents?.path) {
              const { data: urlData } = supabase
                .storage
                .from(r.documents.bucket_id)
                .getPublicUrl(r.documents.path);
              document_public_url = urlData?.publicUrl || null;
            }
            return { ...r, document_public_url };
          });
          setReports(withUrls);
        }
      };

      fetchPatientData();
    }
  }, [patient]);

  const openNotesModal = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setNotesDraft(appointment.doctor_notes || '');
    setIsNotesOpen(true);
  };

  const closeNotesModal = () => {
    setIsNotesOpen(false);
    setNotesDraft('');
    setEditingAppointmentId(null);
  };

  const saveNotes = async () => {
    if (!editingAppointmentId) return;
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('appointments')
        .update({ doctor_notes: notesDraft })
        .eq('id', editingAppointmentId);

      if (error) {
        console.error('Error saving notes:', error);
      } else {
        setAppointments((prev) => prev.map((apt) => (
          apt.id === editingAppointmentId ? { ...apt, doctor_notes: notesDraft } : apt
        )));
        closeNotesModal();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const openReportModal = (report) => {
    setEditingReportId(report.id);
    setReportDraft(report.doctor_summary || '');
    setReportValidatedDraft(Boolean(report.validated));
    setIsReportOpen(true);
  };

  const closeReportModal = () => {
    setIsReportOpen(false);
    setReportDraft('');
    setReportValidatedDraft(false);
    setEditingReportId(null);
  };

  const saveReport = async () => {
    if (!editingReportId) return;
    try {
      setIsSavingReport(true);
      const { error } = await supabase
        .from('reports')
        .update({ doctor_summary: reportDraft, validated: reportValidatedDraft })
        .eq('id', editingReportId);
      if (error) {
        console.error('Error saving report summary:', error);
      } else {
        setReports((prev) => prev.map((r) => (
          r.id === editingReportId ? { ...r, doctor_summary: reportDraft, validated: reportValidatedDraft } : r
        )));
        closeReportModal();
      }
    } finally {
      setIsSavingReport(false);
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div className="patient-detail">
      <div className="detail-header">
        <h2>{patient.name}</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="detail-content">
        <div className="detail-section">
          <h3>Upcoming Appointments</h3>
          <div className="card-list">
            {(() => {
              const now = new Date();
              const upcoming = (appointments || [])
                .filter(a => new Date(a.appointment_at) > now)
                .sort((a,b) => new Date(a.appointment_at) - new Date(b.appointment_at));
              return upcoming.length > 0 ? (
                upcoming.map(apt => (
                  <div key={apt.id} className="card">
                    <div className="card-row">
                      <p><strong>Date:</strong> {new Date(apt.appointment_at).toLocaleDateString()}</p>
                      <button className="edit-notes-btn" onClick={() => openNotesModal(apt)}>Edit Notes</button>
                    </div>
                    <p><strong>AI Summary:</strong> {apt.ai_summary || 'N/A'}</p>
                    <p><strong>Doctor's Notes:</strong> {apt.doctor_notes || 'N/A'}</p>
                  </div>
                ))
              ) : (
                <p>No upcoming appointments.</p>
              );
            })()}
          </div>
        </div>

        <div className="detail-section">
          <h3>Previous Appointments</h3>
          <div className="card-list">
            {(() => {
              const now = new Date();
              const previous = (appointments || [])
                .filter(a => new Date(a.appointment_at) <= now)
                .sort((a,b) => new Date(b.appointment_at) - new Date(a.appointment_at));
              return previous.length > 0 ? (
                previous.map(apt => (
                  <div key={apt.id} className="card">
                    <div className="card-row">
                      <p><strong>Date:</strong> {new Date(apt.appointment_at).toLocaleDateString()}</p>
                      <button className="edit-notes-btn" onClick={() => openNotesModal(apt)}>Edit Notes</button>
                    </div>
                    <p><strong>AI Summary:</strong> {apt.ai_summary || 'N/A'}</p>
                    <p><strong>Doctor's Notes:</strong> {apt.doctor_notes || 'N/A'}</p>
                  </div>
                ))
              ) : (
                <p>No previous appointments.</p>
              );
            })()}
          </div>
        </div>

        <div className="detail-section">
          <h3>Reports</h3>
          <div className="card-list">
            {reports.length > 0 ? (
              reports.map(report => (
                <div key={report.id} className="card">
                  <div className="card-row">
                    <p><strong>Date:</strong> {new Date(report.created_at).toLocaleDateString()}</p>
                    <div className="card-actions">
                      {report.validated && <span className="badge badge-green">Validated</span>}
                      <button className="edit-notes-btn" onClick={() => openReportModal(report)}>Edit Summary</button>
                      {report.document_public_url && (
                        <button className="btn-secondary" onClick={() => window.open(report.document_public_url, '_blank')}>View PDF</button>
                      )}
                    </div>
                  </div>
                  <p><strong>AI Summary:</strong></p>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report.ai_summary || 'N/A'}</ReactMarkdown>
                  </div>
                  <p><strong>Doctor's Summary:</strong></p>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report.doctor_summary || 'N/A'}</ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <p>No reports found.</p>
            )}
          </div>
        </div>
      </div>

      {isNotesOpen && (
        <div className="modal-overlay" onClick={closeNotesModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Doctor's Notes</h3>
              <button className="close-btn" onClick={closeNotesModal}>×</button>
            </div>
            <div className="modal-body">
              <textarea
                className="modal-textarea"
                rows={8}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Enter doctor's notes..."
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeNotesModal} disabled={isSaving}>Cancel</button>
              <button className="btn-primary" onClick={saveNotes} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {isReportOpen && (
        <div className="modal-overlay" onClick={closeReportModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Doctor's Summary</h3>
              <button className="close-btn" onClick={closeReportModal}>×</button>
            </div>
            <div className="modal-body">
              <textarea
                className="modal-textarea"
                rows={8}
                value={reportDraft}
                onChange={(e) => setReportDraft(e.target.value)}
                placeholder="Enter doctor's summary..."
              />
              <label className="toggle">
                <input type="checkbox" checked={reportValidatedDraft} onChange={(e) => setReportValidatedDraft(e.target.checked)} />
                <span>Validated</span>
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeReportModal} disabled={isSavingReport}>Cancel</button>
              <button className="btn-primary" onClick={saveReport} disabled={isSavingReport}>{isSavingReport ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
