import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from './DatePicker';
import TimeSlotGrid from './TimeSlotGrid';
import { serviceAPI, appointmentAPI } from '../../services/api';
import { useToast } from '../common/Toast';
import './BookingForm.css';

const BookingForm = ({ preselectedService = '' }) => {
  const timeSlotRef = React.useRef(null);
  const detailsRef = React.useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: preselectedService,
    problem: '',
  });
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Handlers for smooth scrolling when a step is completed
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedSlot(''); // Reset slot when date changes
    setTimeout(() => {
      timeSlotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        setServices(res.data.services);
      } catch (error) {
        console.error('Failed to load services', error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceId: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot) {
      toast.error('Please select both a date and a time slot.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        date: selectedDate,
        timeSlot: selectedSlot,
      };
      
      await appointmentAPI.book(payload);
      toast.success('Appointment booked successfully! We will contact you soon.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to book appointment. The slot might be taken.');
      // Refresh slots if it was a double-booking conflict
      if (error.status === 409) {
        setSelectedSlot('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-wrapper glass-card">
      <form onSubmit={handleSubmit}>
        <DatePicker 
          selectedDate={selectedDate} 
          onSelectDate={handleSelectDate} 
        />
        
        <div ref={timeSlotRef} className={`step-container ${selectedDate ? 'step-visible' : 'step-hidden'}`}>
          <TimeSlotGrid 
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        </div>

        <div ref={detailsRef} className={`step-container ${selectedSlot ? 'step-visible' : 'step-hidden'}`}>
          <div className="patient-details-section">
          <h3 className="booking-step-title">3. Your Details</h3>
          
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 555-0000"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="serviceId">Service Needed</label>
              <select
                id="serviceId"
                name="serviceId"
                className="input-field"
                value={formData.serviceId}
                onChange={handleChange}
              >
                <option value="">General Checkup / Not Sure</option>
                {services.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group full-width">
              <label className="input-label" htmlFor="problem">Describe Your Problem (Optional)</label>
              <textarea
                id="problem"
                name="problem"
                className="input-field"
                value={formData.problem}
                onChange={handleChange}
                rows="3"
                placeholder="Briefly describe any pain or specific needs..."
              ></textarea>
            </div>
          </div>
        </div>
        </div>

        <div className={`step-container ${selectedSlot ? 'step-visible' : 'step-hidden'}`}>
          <button 
            type="submit" 
            className="btn btn-primary submit-btn mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
