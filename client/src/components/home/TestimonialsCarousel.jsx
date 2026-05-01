import React, { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { testimonialAPI } from '../../services/api';
import useScrollReveal from '../../hooks/useScrollReveal';
import './TestimonialsCarousel.css';

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { refresh } = useScrollReveal();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialAPI.getVisible();
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(refresh, 100);
    }
  }, [loading, refresh]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth > 768 ? 400 : current.offsetWidth;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section section-bg-blue">
      <div className="container">
        <SectionHeader 
          title="What Our Patients Say" 
          subtitle="Real Stories"
        />
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-secondary">No testimonials yet.</div>
        ) : (
          <div className="carousel-container reveal">
            <button className="carousel-btn left" onClick={() => scroll('left')} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            
            <div className="carousel-track hide-scrollbar" ref={scrollRef}>
              {testimonials.map((item) => (
                <div key={item._id} className="testimonial-card glass-card hover-lift">
                  <div className="quote-icon">
                    <Quote size={40} />
                  </div>
                  <div className="stars mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < item.rating ? "var(--warning)" : "transparent"} 
                        color={i < item.rating ? "var(--warning)" : "var(--border-light)"}
                      />
                    ))}
                  </div>
                  <p className="testimonial-comment">{item.comment}</p>
                  <div className="testimonial-author mt-6">
                    <div className="author-avatar">
                      {item.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="author-name">{item.patientName}</h4>
                      {item.treatmentType && (
                        <span className="author-treatment">{item.treatmentType}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="carousel-btn right" onClick={() => scroll('right')} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
