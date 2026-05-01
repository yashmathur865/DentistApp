import React, { useEffect } from 'react';
import HeroSection from '../../components/home/HeroSection';
import StatsCounter from '../../components/home/StatsCounter';
import ServicesPreview from '../../components/home/ServicesPreview';
import GalleryPreview from '../../components/home/GalleryPreview';
import DoctorPreview from '../../components/home/DoctorPreview';
import TestimonialsCarousel from '../../components/home/TestimonialsCarousel';
import LocationSection from '../../components/home/LocationSection';
import CTABanner from '../../components/home/CTABanner';
import useScrollReveal from '../../hooks/useScrollReveal';

const HomePage = () => {
  const { refresh } = useScrollReveal();

  useEffect(() => {
    // Refresh scroll reveal when component mounts or updates
    refresh();
    document.title = "SmileCare Dental Clinic | Premium Dental Services";
  }, [refresh]);

  return (
    <>
      <HeroSection />
      <StatsCounter />
      <ServicesPreview />
      <GalleryPreview />
      <DoctorPreview />
      <TestimonialsCarousel />
      <LocationSection />
      <CTABanner />
    </>
  );
};

export default HomePage;
