import React from 'react';
import { Clock, IndianRupee, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, index }) => {
  return (
    <div className={`service-card glass-card hover-lift reveal stagger-${(index % 3) + 1}`}>
      <div className="service-card-header">
        <div className="service-card-icon">{service.icon}</div>
        <div className="service-card-badge">{service.category}</div>
      </div>
      
      <h3 className="service-card-title">{service.name}</h3>
      <p className="service-card-desc">{service.description}</p>
      
      <div className="service-card-meta">
        <div className="meta-item">
          <Clock size={16} />
          <span>{service.duration}</span>
        </div>
        <div className="meta-item">
          <IndianRupee size={16} />
          <span>From ₹{service.price}</span>
        </div>
      </div>
      
      <div className="service-card-footer">
        <Link to={`/book?service=${service._id}`} className="btn btn-outline btn-full">
          Book This Service
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
