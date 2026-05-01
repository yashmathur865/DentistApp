import React from 'react';

const SectionHeader = ({ title, subtitle, align = 'center', light = false }) => {
  const alignClass = `text-${align}`;
  const titleColor = light ? 'text-inverse' : 'text-primary';
  const subtitleColor = light ? 'style={{ color: "rgba(255,255,255,0.8)" }}' : 'text-secondary';

  return (
    <div className={`section-header reveal ${alignClass} mb-12`}>
      {subtitle && (
        <span className="text-accent font-weight-600 text-uppercase tracking-wide mb-2 d-block text-sm" 
              style={light ? { color: 'var(--accent-secondary-light)'} : { color: 'var(--accent-primary)' }}>
          {subtitle}
        </span>
      )}
      <h2 className={`${titleColor} mb-4`} style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
        {title}
      </h2>
      <div 
        className="header-divider" 
        style={{ 
          height: '4px', 
          width: '60px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '2px',
          margin: align === 'center' ? '0 auto' : '0'
        }} 
      />
    </div>
  );
};

export default SectionHeader;
