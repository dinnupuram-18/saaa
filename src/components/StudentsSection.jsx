import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanityClient } from '../sanityClient';
import { urlFor } from '../sanityImage';
import './StudentsSection.css';

gsap.registerPlugin(ScrollTrigger);

const mockStudents = [
  {
    id: 'student-arjun',
    name: 'Arjun Muralidhar',
    instrument: 'Mridangam',
    quote: 'The depth of rhythmic understanding I gained at SAAA has transformed my musical perspective.',
    achievement: 'National Youth Scholar 2024',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=350&fit=crop',
  },
  {
    id: 'student-ananya',
    name: 'Ananya Sastry',
    instrument: 'Kuchipudi',
    quote: 'From my first step to my Arangetram, the gurus here have been my strongest pillars.',
    achievement: 'Performed at UNESCO Heritage Meet',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&h=350&fit=crop',
  },
  {
    id: 'student-vikram',
    name: 'Vikram K.',
    instrument: 'Veena & Vocal',
    quote: 'The connection between voice and strings and the sacredness of the art is preserved here truly.',
    achievement: 'Gold Medalist - Inter-University Arts',
    image: 'https://images.unsplash.com/photo-1507838596018-bd7c568a7e94?w=500&h=350&fit=crop',
  },
];

const StudentsSection = ({ onEnrollClick }) => {
  const [students, setStudents] = useState(mockStudents);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "achievement"]`);
        if (data && data.length > 0) {
          // Map Sanity data to expected structure, handling image URL
          const formattedData = data.map(item => ({
            id: item._id,
            name: item.name,
            instrument: item.instrument,
            quote: item.quote,
            achievement: item.achievement,
            image: item.image ? urlFor(item.image).width(500).height(350).url() : null
          }));
          setStudents(formattedData);
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.student-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.students-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [students]);

  return (
    <section className="students-section" ref={sectionRef}>
      <div className="section-container">
        <p className="section-subtitle">Excellence in Arts</p>
        <h2 className="section-title text-gradient-gold">Achievements</h2>
        
        <div className="students-grid">
          {students.map((student) => (
            <div className="student-card glass-panel" key={student.id}>
              <div className="student-image-wrap">
                <img 
                  src={student.image || '/saaa_logo.jpg.jpeg'} 
                  alt={student.name} 
                  className="student-image" 
                  onError={(e) => { e.target.src = '/saaa_logo.jpg.jpeg'; }}
                />
                <div className="achievement-badge">{student.achievement}</div>
              </div>
              <div className="student-info">
                <div className="quote-icon">“</div>
                <p className="student-quote">{student.quote}</p>
                <div className="student-meta">
                  <h3 className="student-name">{student.name}</h3>
                  <span className="student-instrument">{student.instrument}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="students-cta">
          <p>The next chapter of this legacy could be yours.</p>
          <button className="btn-primary" onClick={onEnrollClick}>
            Join the Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentsSection;
