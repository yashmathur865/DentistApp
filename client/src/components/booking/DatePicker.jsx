import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onSelectDate }) => {
  // Generate next 14 days for the picker
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays (0)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const dates = generateDates();
  
  const formatDate = (date) => {
    const d = date.getDate();
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { d, day, month };
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.getTime() === new Date(selectedDate).getTime();
  };

  const scrollContainer = React.useRef(null);

  const scroll = (dir) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="date-picker-container">
      <h3 className="booking-step-title">1. Select Date</h3>
      
      <div className="date-carousel-wrapper">
        <button type="button" className="date-nav-btn left" onClick={() => scroll(-1)}>
          <ChevronLeft size={20} />
        </button>
        
        <div className="date-carousel hide-scrollbar" ref={scrollContainer}>
          {dates.map((date, i) => {
            const { d, day, month } = formatDate(date);
            return (
              <button
                key={i}
                type="button"
                className={`date-card ${isSelected(date) ? 'selected' : ''}`}
                onClick={() => onSelectDate(date.toISOString())}
              >
                <span className="date-month">{month}</span>
                <span className="date-number">{d}</span>
                <span className="date-day">{day}</span>
              </button>
            );
          })}
        </div>
        
        <button type="button" className="date-nav-btn right" onClick={() => scroll(1)}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
