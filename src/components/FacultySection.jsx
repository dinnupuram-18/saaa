import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanityClient } from '../sanityClient';
import { urlFor } from '../sanityImage';
import { faculty as fallbackFaculty } from '../data/academyData';
import './FacultySection.css';

gsap.registerPlugin(ScrollTrigger);

const FacultySection = () => {
  const [faculty, setFaculty] = useState(fallbackFaculty);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "faculty"] | order(order asc)`);
        if (data && data.length > 0) {
          setFaculty(data);
          // Refresh ScrollTrigger to account for new content height
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }
      } catch (error) {
        console.error("Error fetching faculty:", error);
      }
    };
    fetchFaculty();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (faculty.length > 0) {
        gsap.fromTo('.faculty-card',
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: '.faculty-grid',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [faculty]);

  return (
    <section className="faculty-section" id="faculty" ref={sectionRef}>
      <div className="section-container">
        <p className="section-subtitle">Guiding Your Art</p>
        <h2 className="section-title text-gradient-gold">Meet Our Faculty</h2>
        
        <div className="faculty-grid">
          {faculty.map((member) => (
            <div className="faculty-card glass-panel" key={member._id || member.id}>
              <div className="faculty-image-container">
                {member.image ? (
                  <img 
                    src={typeof member.image === 'string' ? member.image : urlFor(member.image).width(400).height(500).url()} 
                    alt={member.name} 
                    className="faculty-image" 
                  />
                ) : (
                  <div className="image-placeholder"></div>
                )}
                <div className="image-overlay"></div>
              </div>
              <div className="faculty-info">
                <h3 className="faculty-name">{member.name || 'Faculty Member'}</h3>
                <p className="faculty-role">{member.role || 'Acharya'}</p>
                <p className="faculty-bio">{member.bio || 'Preserving the heritage of Carnatic arts.'}</p>
                <div className="social-links">
                  {member.expertise && member.expertise.map(tag => (
                    <span className="expertise-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
