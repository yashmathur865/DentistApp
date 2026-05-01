import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { doctorAPI } from '../../services/api';
import './DoctorPreview.css';

const DoctorPreview = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await doctorAPI.getProfile();
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Failed to fetch doctor profile', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctor();
  }, []);

  if (loading) return null; // Don't show anything while loading
  if (!doctor) return null; // Fallback if no doctor found

  return (
    <section className="section">
      <div className="container">
        <div className="doctor-preview-container">
          <div className="doctor-image-col reveal-left">
            <div className="doctor-image-wrapper">
              <img 
                src="/images/doctor.jpg" 
                alt={doctor.name} 
                className="doctor-img"
              />
            </div>
            <div className="experience-badge animate-float">
              <span className="exp-number text-gradient">{doctor.experience}+</span>
              <span className="exp-text">Years of<br/>Excellence</span>
            </div>
          </div>
          
          <div className="doctor-content-col reveal-right">
            <SectionHeader 
              title={`Meet ${doctor.name}`} 
              subtitle="Expert Care"
              align="left"
            />
            
            <h3 className="doctor-specialization text-primary mb-4">
              {doctor.specialization}
            </h3>
            
            <p className="doctor-about mb-6">
              {doctor.about}
            </p>
            
            <div className="doctor-qualifications mb-8">
              <div className="qual-item">
                <CheckCircle2 size={20} className="text-accent" />
                <span>{doctor.qualifications}</span>
              </div>
              <div className="qual-item">
                <CheckCircle2 size={20} className="text-accent" />
                <span>Advanced Cosmetic Dentistry</span>
              </div>
              <div className="qual-item">
                <CheckCircle2 size={20} className="text-accent" />
                <span>Painless Treatment Specialist</span>
              </div>
            </div>
            
            <Link to="/doctor" className="btn btn-primary">
              View Full Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorPreview;
