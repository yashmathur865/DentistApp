import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { appointmentAPI } from '../../services/api';
import './TimeSlotGrid.css';

const TimeSlotGrid = ({ selectedDate, selectedSlot, onSelectSlot }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await appointmentAPI.getSlots(selectedDate);
        setSlots(response.data.slots);
      } catch (error) {
        console.error('Failed to fetch slots', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  if (!selectedDate) {
    return null;
  }

  return (
    <div className="time-slot-container">
      <h3 className="booking-step-title">2. Select Time</h3>
      
      {loading ? (
        <div className="slots-loading">Loading available slots...</div>
      ) : (
        <div className="slots-grid">
          {slots.map((slot) => (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              className={`slot-btn ${selectedSlot === slot.time ? 'selected' : ''} ${!slot.available ? 'booked' : ''}`}
              onClick={() => slot.available && onSelectSlot(slot.time)}
            >
              <Clock size={14} className="slot-icon" />
              <span>{slot.time}</span>
              {!slot.available && <span className="slot-status">Booked</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlotGrid;
