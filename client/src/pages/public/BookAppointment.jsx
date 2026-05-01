import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader';
import BookingForm from '../../components/booking/BookingForm';
import useScrollReveal from '../../hooks/useScrollReveal';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');
  const { refresh } = useScrollReveal();

  useEffect(() => {
    document.title = "Book Appointment | SmileCare";
    window.scrollTo(0, 0);
    refresh();
  }, [refresh]);

  return (
    <div className="page-wrapper">
      <div className="page-header section-bg-blue">
        <div className="container">
          <SectionHeader 
            title="Book Your Visit" 
            subtitle="Schedule Appointment" 
          />
          <p className="text-center text-secondary max-w-2xl mx-auto">
            Select a convenient date and time for your visit. Our team will ensure you receive the best care possible.
          </p>
        </div>
      </div>

      <section className="section" style={{ marginTop: '-4rem', paddingTop: 0 }}>
        <div className="container">
          <div className="reveal">
            <BookingForm preselectedService={serviceId || ''} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
