import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeader from '../common/SectionHeader';
import './LocationSection.css';

const LocationSection = () => {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader 
          title="Find Our Clinic" 
          subtitle="Location" 
          align="center" 
        />
        
        <div className="reveal">
          <div className="map-integration-card">
            {/* Header */}
            <div className="map-card-header">
              <div className="map-pin-icon">
                <MapPin size={24} color="#e91e63" fill="#e91e63" />
              </div>
              <div className="map-card-info">
                <h3 className="map-clinic-name">SmileCare Dental Clinic</h3>
                <p className="map-clinic-address">123 Marine Drive, Suite 200, Mumbai, MH 400058</p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="map-card-body">
              <a 
                href="https://www.google.com/maps?q=Marine+Drive,+Mumbai" 
                target="_blank" 
                rel="noreferrer" 
                className="map-open-btn"
              >
                Open in Maps <ExternalLink size={16} />
              </a>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.7047067823!2d72.7483664326574!3d19.037571343750055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3a25b1f3c3%3A0x6b44358bbd4e7e65!2sMarine%20Drive%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714495200000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="map-iframe"
              ></iframe>
            </div>

            {/* Footer */}
            <div className="map-card-footer">
              <a 
                href="https://www.google.com/maps/dir//Marine+Drive,+Mumbai" 
                target="_blank" 
                rel="noreferrer"
                className="map-directions-link"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
