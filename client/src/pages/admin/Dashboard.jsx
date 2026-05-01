import React, { useEffect, useState } from 'react';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { appointmentAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | Admin Panel";
    
    const fetchStats = async () => {
      try {
        const res = await appointmentAPI.getStats();
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!stats) return <div className="p-8">Failed to load dashboard.</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p className="text-secondary">Welcome back to your clinic administration panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper blue">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.totalPatients}</h3>
            <span>Total Patients</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper green">
            <Calendar size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.todayCount}</h3>
            <span>Today's Appointments</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper purple">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.pendingCount}</h3>
            <span>Pending Requests</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper orange">
            <CheckCircle size={24} />
          </div>
          <div className="stat-details">
            <h3>{stats.completedCount}</h3>
            <span>Completed (Total)</span>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="dashboard-schedule glass-card mt-8">
        <div className="schedule-header">
          <h2>Today's Schedule</h2>
        </div>
        
        {stats.todayAppointments.length === 0 ? (
          <div className="empty-schedule text-secondary">
            No appointments scheduled for today.
          </div>
        ) : (
          <div className="schedule-list">
            {stats.todayAppointments.map(apt => (
              <div key={apt._id} className="schedule-item">
                <div className="time-badge">
                  <Clock size={14} />
                  {apt.timeSlot}
                </div>
                <div className="patient-info">
                  <h4>{apt.patientId?.name || 'Unknown Patient'}</h4>
                  <span className="text-secondary">{apt.patientId?.phone || 'No phone'}</span>
                </div>
                <div className="service-info text-secondary">
                  {apt.serviceId?.name || 'General Checkup'}
                </div>
                <div className={`status-badge status-${apt.status}`}>
                  {apt.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
