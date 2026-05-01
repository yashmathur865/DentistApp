import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { galleryAPI } from '../../services/api';
import SectionHeader from '../common/SectionHeader';
import GalleryCard from '../gallery/GalleryCard';
import './GalleryPreview.css';

const GalleryPreview = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryAPI.getVisible();
        // Show only first 3 items for preview
        setItems(response.data.items.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section className="section section-bg-light">
      <div className="container">
        <SectionHeader 
          title="Check Out Our Results" 
          subtitle="Smile Gallery" 
          align="center" 
        />

        <div className="results-grid mb-12">
          {items.map((item, index) => (
            <GalleryCard key={item._id} item={item} index={index} />
          ))}
        </div>

        <div className="text-center reveal">
          <Link to="/gallery" className="btn btn-outline hover-lift">
            See All Results
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
