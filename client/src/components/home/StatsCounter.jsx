import React from 'react';
import useCountUp from '../../hooks/useCountUp';
import './StatsCounter.css';

const StatItem = ({ end, label, suffix = '', prefix = '' }) => {
  const [count, ref] = useCountUp(end, 2000);

  return (
    <div className="stat-item reveal-scale" ref={ref}>
      <div className="stat-number text-gradient">
        {prefix}{count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid glass-card">
          <StatItem end={5000} label="Happy Patients" suffix="+" />
          <StatItem end={15} label="Years Experience" suffix="+" />
          <StatItem end={24} label="Expert Doctors" />
          <StatItem end={100} label="Success Rate" suffix="%" />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
