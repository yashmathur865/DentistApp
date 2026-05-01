import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = ({ 
  clinicName = "SmileCare Dental Clinic",
  address = "123 Marine Drive, Suite 200, Mumbai, MH 400058",
  phone = "+91 22-2345-6789",
  email = "dr.ananya@smilecare.com"
}) => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          
          <div className="footer-brand reveal">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🦷</span>
              <span>{clinicName}</span>
            </Link>
            <p className="footer-desc mt-4">
              Premium dental care in a relaxing environment. We combine state-of-the-art technology with compassionate care to give you the perfect smile you deserve.
            </p>
            <div className="social-links mt-6">
              <a href="#" aria-label="Facebook" className="social-link"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram" className="social-link"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="social-link"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-links reveal stagger-1">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/doctor">Meet The Doctor</Link></li>
              <li><Link to="/gallery">Smile Gallery</Link></li>
              <li><Link to="/reviews">Patient Reviews</Link></li>
            </ul>
          </div>

          <div className="footer-services reveal stagger-2">
            <h4 className="footer-heading">Our Services</h4>
            <ul>
              <li><Link to="/services">Comprehensive Exams</Link></li>
              <li><Link to="/services">Teeth Whitening</Link></li>
              <li><Link to="/services">Dental Implants</Link></li>
              <li><Link to="/services">Invisalign</Link></li>
              <li><Link to="/services">Porcelain Veneers</Link></li>
            </ul>
          </div>

          <div className="footer-contact reveal stagger-3">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>{address}</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <Clock size={18} className="contact-icon" />
                <span>Mon-Sat: 9:00 AM - 6:00 PM<br/>Sun: Closed</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} {clinicName}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/admin/login" className="admin-link">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
