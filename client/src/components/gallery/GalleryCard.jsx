import React from 'react';
import ImageCompare from './ImageCompare';
import './GalleryCard.css';

const GalleryCard = ({ item, index }) => {
  return (
    <div className={`gallery-card reveal stagger-${(index % 3) + 1}`}>
      <div className="gallery-card-image">
        <ImageCompare 
          beforeImage={item.beforeImage} 
          afterImage={item.afterImage} 
        />
        <div className="gallery-category-badge">{item.category}</div>
      </div>
      <div className="gallery-card-content glass-card">
        <h3 className="gallery-title">{item.title}</h3>
        <p className="gallery-desc">{item.description}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
