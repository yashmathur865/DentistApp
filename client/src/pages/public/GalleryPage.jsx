import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import GalleryCard from '../../components/gallery/GalleryCard';
import CTABanner from '../../components/home/CTABanner';
import { galleryAPI } from '../../services/api';
import useScrollReveal from '../../hooks/useScrollReveal';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { refresh } = useScrollReveal();

  useEffect(() => {
    document.title = "Smile Gallery | SmileCare";
    const fetchGallery = async () => {
      try {
        const response = await galleryAPI.getVisible();
        setItems(response.data.items);
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, []);

  useEffect(() => {
    refresh();
  }, [filter, items, refresh]);

  const categories = ['All', ...new Set(items.map(i => i.category))];
  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="page-wrapper">
      <div className="page-header section-bg-blue">
        <div className="container">
          <SectionHeader 
            title="Transformations" 
            subtitle="Smile Gallery" 
          />
          <p className="text-center text-secondary max-w-2xl mx-auto mb-8">
            Browse through our gallery of successful treatments. Use the slider on each image to see the before and after results.
          </p>
          
          <div className="service-filters reveal">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className="text-center text-secondary py-12">
              No gallery items found.
            </div>
          ) : (
            <div className="services-page-grid">
              {filteredItems.map((item, index) => (
                <GalleryCard key={item._id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default GalleryPage;
