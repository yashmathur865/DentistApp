import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import { useToast } from '../../components/common/Toast';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ContactPage.css';

const ContactPage = () => {
  const toast = useToast();
  const { refresh } = useScrollReveal();

  useEffect(() => {
    document.title = "Contact Us | SmileCare";
    refresh();
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send an email or save to DB
    toast.success("Message sent successfully! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="page-wrapper">
      <div className="page-header section-bg-blue">
        <div className="container">
          <SectionHeader 
            title="Get in Touch" 
            subtitle="Contact Us" 
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Info */}
            <div className="contact-info reveal-left">
              <h3 className="mb-6">We'd love to hear from you</h3>
              <p className="text-secondary mb-8 line-height-lg">
                Whether you have a question about our services, need to schedule an appointment, or just want to say hello, our team is ready to answer all your questions.
              </p>
              
              <div className="contact-details">
                <div className="contact-item glass-card hover-lift">
                  <div className="contact-icon-wrapper">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Visit Us</h4>
                    <p className="text-secondary">123 Marine Drive, Suite 200<br/>Mumbai, MH 400058</p>
                  </div>
                </div>

                <div className="contact-item glass-card hover-lift">
                  <div className="contact-icon-wrapper">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Call Us</h4>
                    <p className="text-secondary">
                      <a href="tel:+912223456789" className="contact-link">+91 22-2345-6789</a>
                    </p>
                  </div>
                </div>

                <div className="contact-item glass-card hover-lift">
                  <div className="contact-icon-wrapper">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email Us</h4>
                    <p className="text-secondary">
                      <a href="mailto:dr.ananya@smilecare.com" className="contact-link">dr.ananya@smilecare.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-item glass-card hover-lift">
                  <div className="contact-icon-wrapper">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>Opening Hours</h4>
                    <p className="text-secondary">Mon - Sat: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper glass-card reveal-right">
              <h3 className="mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="input-group">
                  <label className="input-label" htmlFor="name">Your Name</label>
                  <input type="text" id="name" required className="input-field" placeholder="John Doe" />
                </div>
                
                <div className="input-group">
                  <label className="input-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" required className="input-field" placeholder="john@example.com" />
                </div>
                
                <div className="input-group">
                  <label className="input-label" htmlFor="subject">Subject</label>
                  <input type="text" id="subject" required className="input-field" placeholder="How can we help?" />
                </div>
                
                <div className="input-group">
                  <label className="input-label" htmlFor="message">Message</label>
                  <textarea id="message" required className="input-field" rows="5" placeholder="Your message here..."></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mt-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section reveal">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.7047067823!2d72.7483664326574!3d19.037571343750055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3a25b1f3c3%3A0x6b44358bbd4e7e65!2sMarine%20Drive%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714495200000!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Clinic Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
