import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { appointmentAPI } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './Dashboard.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  
  const toast = useToast();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      
      const res = await appointmentAPI.getAll(params);
      setAppointments(res.data.appointments || []);
      setTotalPages(res.data.pages || 1);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
      toast.error('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Appointments | Admin Panel";
    fetchAppointments();
  }, [page, statusFilter]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await appointmentAPI.updateStatus(id, { status: newStatus });
      toast.success(`Appointment marked as ${newStatus}`);
      fetchAppointments();
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header flex-between align-center">
        <div>
          <h1>All Appointments</h1>
          <p className="text-secondary">Manage and update patient bookings.</p>
        </div>
        
        <div>
          <select 
            className="input-field" 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-card dashboard-card">
        {loading ? (
          <LoadingSpinner />
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center text-secondary">No appointments found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                <th style={{ padding: '1rem' }}>Patient</th>
                <th style={{ padding: '1rem' }}>Date & Time</th>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{apt.patientId?.name || 'N/A'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{apt.patientId?.phone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{format(new Date(apt.date), 'MMM dd, yyyy')}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{apt.timeSlot}</div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {apt.serviceId?.name || 'General'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`status-badge status-${apt.status}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {apt.status === 'pending' && (
                        <>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                            onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {apt.status === 'confirmed' && (
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', backgroundColor: 'var(--success)' }}
                          onClick={() => handleStatusUpdate(apt._id, 'completed')}
                        >
                          Mark Completed
                        </button>
                      )}

                      {(apt.status === 'completed' || apt.status === 'cancelled') && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          No actions available
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            <button 
              className="btn btn-outline" 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              style={{ padding: '0.5rem 1rem' }}
            >
              Previous
            </button>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
              Page {page} of {totalPages}
            </span>
            <button 
              className="btn btn-outline" 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              style={{ padding: '0.5rem 1rem' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
