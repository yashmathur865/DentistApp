import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { serviceAPI } from '../../services/api';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ServicesPreview.css';

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useScrollReveal();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAll();
        // Take only first 6 for preview
        setServices(response.data.services.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch services', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(refresh, 100);
    }
  }, [loading, refresh]);

  return (
    <section className="section section-bg-light">
      <div className="container">
        <SectionHeader 
          title="Premium Dental Services" 
          subtitle="What We Offer"
        />
        
        {loading ? (
          <div className="services-skeleton">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card skeleton"></div>)}
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service._id} 
                className={`service-preview-card glass-card hover-lift reveal stagger-${(index % 3) + 1}`}
              >
                <div className="service-icon-wrapper">
                  <span className="service-icon">{service.icon}</span>
                </div>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <Link to="/services" className="service-link">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 reveal stagger-2">
          <Link to="/services" className="btn btn-outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
