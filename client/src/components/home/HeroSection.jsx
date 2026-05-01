import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Animated Background Shapes */}
      <div className="hero-shape shape-1"></div>
      <div className="hero-shape shape-2"></div>
      <div className="hero-shape shape-3 animate-pulse-glow"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="reveal stagger-1">
            <span className="badge badge-primary mb-4">
              <Star size={14} className="mr-1" /> Top Rated Dental Clinic
            </span>
          </div>
          
          <h1 className="hero-title reveal stagger-2">
            Your Perfect Smile,<br />
            <span className="text-gradient">Our Passion</span>
          </h1>
          
          <p className="hero-subtitle reveal stagger-3">
            Experience world-class dental care in a relaxing environment. 
            We combine state-of-the-art technology with compassionate expertise 
            to give you the smile you've always dreamed of.
          </p>
          
          <div className="hero-actions reveal stagger-4">
            <Link to="/book" className="btn btn-primary btn-lg hover-lift">
              <Calendar size={20} />
              Book Appointment
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg hover-lift">
              Explore Services
              <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="hero-features reveal stagger-5">
            <div className="feature">
              <div className="feature-icon">✨</div>
              <span>Painless Treatment</span>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍⚕️</div>
              <span>Expert Doctors</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <span>100% Safe & Clean</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-wrapper reveal-scale stagger-3">
          <div className="hero-image-inner animate-float">
            <img 
              src="/images/hero.png" 
              alt="Beautiful modern dental clinic" 
              className="hero-img"
            />
          </div>
          {/* Floating Info Card */}
          <div className="floating-card glass-card">
            <div className="floating-card-icon">🦷</div>
            <div className="floating-card-text">
              <strong>Modern Tech</strong>
              <span>Advanced Equipment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
