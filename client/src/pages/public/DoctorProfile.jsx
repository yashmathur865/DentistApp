import React, { useEffect, useState } from 'react';
import { Award, BookOpen, GraduationCap, Clock } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CTABanner from '../../components/home/CTABanner';
import { doctorAPI } from '../../services/api';
import useScrollReveal from '../../hooks/useScrollReveal';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { refresh } = useScrollReveal();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await doctorAPI.getProfile();
        setDoctor(response.data.doctor);
        document.title = `Meet ${response.data.doctor.name} | SmileCare`;
      } catch (error) {
        console.error('Failed to fetch doctor profile', error);
      } finally {
        setLoading(false);
        setTimeout(refresh, 100);
      }
    };
    
    fetchDoctor();
  }, [refresh]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!doctor) return <div className="container section text-center">Doctor profile not found.</div>;

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header section-bg-blue">
        <div className="container">
          <SectionHeader title={`Meet ${doctor.name}`} subtitle="Our Lead Specialist" />
        </div>
      </div>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="profile-grid">
            
            {/* Left Column: Image and Quick Stats */}
            <div className="profile-sidebar reveal-left">
              <div className="profile-image-container glass-card">
                <img 
                  src="/images/doctor.jpg" 
                  alt={doctor.name} 
                  className="profile-image"
                />
                <div className="profile-sidebar-content">
                  <h2 className="text-center mb-2">{doctor.name}</h2>
                  <p className="text-accent text-center font-weight-600 mb-6">{doctor.specialization}</p>
                  
                  <div className="sidebar-stats">
                    <div className="stat-row">
                      <Clock size={20} className="text-secondary" />
                      <div>
                        <strong>{doctor.experience}+ Years</strong>
                        <span>Experience</span>
                      </div>
                    </div>
                    <div className="stat-row">
                      <GraduationCap size={20} className="text-secondary" />
                      <div>
                        <strong>{doctor.qualifications}</strong>
                        <span>Education</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="profile-main reveal-right">
              <div className="content-block mb-8">
                <h3 className="mb-4 flex-align-center gap-2">
                  <BookOpen size={24} className="text-accent" /> About The Doctor
                </h3>
                <p className="text-secondary line-height-lg">{doctor.about}</p>
                <p className="text-secondary line-height-lg mt-4">
                  With a gentle approach and a commitment to utilizing the latest advancements in dental technology, {doctor.name} ensures that every patient receives personalized, comfortable, and highly effective treatment.
                </p>
              </div>

              <div className="content-block">
                <h3 className="mb-4 flex-align-center gap-2">
                  <Award size={24} className="text-accent" /> Specializations & Expertise
                </h3>
                <div className="expertise-grid">
                  <div className="expertise-card glass-card">
                    <h4>Cosmetic Dentistry</h4>
                    <p>Veneers, Teeth Whitening, Smile Makeovers</p>
                  </div>
                  <div className="expertise-card glass-card">
                    <h4>Restorative Care</h4>
                    <p>Dental Implants, Crowns, Bridges</p>
                  </div>
                  <div className="expertise-card glass-card">
                    <h4>Preventive Care</h4>
                    <p>Comprehensive Exams, Oral Cancer Screenings</p>
                  </div>
                  <div className="expertise-card glass-card">
                    <h4>Orthodontics</h4>
                    <p>Invisalign Clear Aligners</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default DoctorProfile;
