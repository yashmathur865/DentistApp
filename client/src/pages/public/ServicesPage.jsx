import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ServiceCard from '../../components/services/ServiceCard';
import CTABanner from '../../components/home/CTABanner';
import { serviceAPI } from '../../services/api';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { refresh } = useScrollReveal();

  useEffect(() => {
    document.title = "Our Services | SmileCare";
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAll();
        setServices(response.data.services);
      } catch (error) {
        console.error('Failed to fetch services', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  useEffect(() => {
    refresh(); // Refresh animations when filter changes
  }, [filter, services, refresh]);

  // Extract unique categories
  const categories = ['All', ...new Set(services.map(s => s.category))];

  // Filter services
  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="page-wrapper">
      <div className="page-header section-bg-blue">
        <div className="container">
          <SectionHeader 
            title="Comprehensive Dental Care" 
            subtitle="Our Services" 
          />
          <p className="text-center text-secondary max-w-2xl mx-auto mb-8">
            From routine cleanings to advanced cosmetic procedures, we offer a full spectrum of dental services designed to keep your smile healthy and beautiful.
          </p>
          
          {/* Category Filter */}
          <div className="service-filters reveal">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="text-center text-secondary py-12">
              No services found for this category.
            </div>
          ) : (
            <div className="services-page-grid">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default ServicesPage;
