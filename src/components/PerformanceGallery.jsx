import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanityClient } from '../sanityClient';
import { urlFor } from '../sanityImage';
import { galleryPosts } from '../data/academyData';
import './PerformanceGallery.css';

gsap.registerPlugin(ScrollTrigger);

const PerformanceGallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "post"] | order(date desc)`);
        if (data && data.length > 0) {
          // Filter logic for Sanity data
          if (activeTab === 'All') {
            setFilteredPosts(data);
          } else {
            setFilteredPosts(data.filter(post => post.category === activeTab));
          }
          // Refresh ScrollTrigger to account for new content height
          setTimeout(() => ScrollTrigger.refresh(), 100);
        } else {
          // Fallback to local data if Sanity is empty
          const localData = activeTab === 'All' 
            ? galleryPosts 
            : galleryPosts.filter(post => post.category === activeTab);
          setFilteredPosts(localData);
        }
      } catch (error) {
        console.error("Error fetching gallery posts:", error);
        // Fallback to local data on error
        const localData = activeTab === 'All' 
          ? galleryPosts 
          : galleryPosts.filter(post => post.category === activeTab);
        setFilteredPosts(localData);
      }
    };
    fetchPosts();
  }, [activeTab]);

  useEffect(() => {
    if (filteredPosts.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.gallery-item', 
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1, 
            scale: 1,
            y: 0, 
            stagger: 0.08, 
            duration: 0.6, 
            ease: "expo.out",
            scrollTrigger: {
              trigger: '.gallery-grid',
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }, galleryRef);
      return () => ctx.revert();
    }
  }, [filteredPosts]); 

  // Helper function to handle broken images
  const handleImageError = (e) => {
    e.target.src = '/saaa_logo.jpg.jpeg'; // Use Academy Logo as high-quality fallback
    e.target.className = 'gallery-image logo-fallback'; // Optional: add a class for specific fallback styling
  };

  if (galleryPosts.length === 0 && filteredPosts.length === 0) return null;

  return (
    <section className="performance-gallery" id="gallery" ref={galleryRef}>
      <div className="gallery-container">
        <div className="gallery-header">
          <p className="section-label">Moments in Time</p>
          <h2 className="section-title text-gradient-gold">Academy Chronicles</h2>
          <p className="section-subtitle">A glimpse into our performances, workshops, and legacy.</p>
        </div>

        {/* Sliding Tabs UI */}
        <div className="gallery-tabs-container">
          <div className="gallery-tabs glass-panel">
            {['All', 'Performances', 'Clips'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            <div className={`tab-indicator tab-${activeTab.toLowerCase()}`} />
          </div>
        </div>

        <div className="gallery-grid">
          {filteredPosts.map((post) => (
            <div key={post._id} className={`gallery-item ${post.featured ? 'featured' : ''} glass-panel`}>
              <div className="media-container">
                {post.mediaType === 'photo' ? (
                  <img 
                    src={post.image?.asset ? urlFor(post.image).width(post.featured ? 800 : 400).url() : post.image} 
                    alt={post.title} 
                    className="gallery-image"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="video-placeholder">
                    <span className="play-icon">▶</span>
                    <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
                      Watch Video
                    </a>
                  </div>
                )}
                <div className="media-overlay">
                  <h3 className="post-title">{post.title}</h3>
                  {post.date && <span className="post-date">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceGallery;
