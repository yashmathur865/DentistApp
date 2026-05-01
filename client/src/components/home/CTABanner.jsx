import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import './CTABanner.css';

const CTABanner = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-wrapper reveal-scale">
          <div className="cta-content">
            <h2>Ready for Your Best Smile?</h2>
            <p>Book your appointment today and take the first step towards perfect dental health.</p>
            <Link to="/book" className="btn cta-btn">
              <Calendar size={20} />
              Book Your Visit
            </Link>
          </div>
          {/* Decorative shapes */}
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
