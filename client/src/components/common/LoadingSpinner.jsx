import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const containerClass = fullScreen ? 'spinner-container-full' : 'spinner-container';
  
  return (
    <div className={containerClass}>
      <div className={`spinner spinner-${size}`}>
        <div className="spinner-tooth">🦷</div>
        <div className="spinner-ring"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
