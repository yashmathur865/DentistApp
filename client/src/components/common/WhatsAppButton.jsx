import React from 'react';
import './WhatsAppButton.css';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '15551234567' }) => {
  const handleClick = () => {
    // Format number (remove any non-digits)
    const formatted = phoneNumber.replace(/\D/g, '');
    const message = encodeURIComponent('Hello, I would like to book a dental appointment.');
    window.open(`https://wa.me/${formatted}?text=${message}`, '_blank');
  };

  return (
    <button 
      className="whatsapp-float animate-float" 
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
      <div className="whatsapp-icon-wrapper">
        <MessageCircle size={32} />
      </div>
      <div className="whatsapp-pulse"></div>
    </button>
  );
};

export default WhatsAppButton;
