import React, { useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanityClient } from '../sanityClient';
import { courses as fallbackCourses } from '../data/academyData';
import './CoursesSection.css';

gsap.registerPlugin(ScrollTrigger);



const CoursesSection = ({ onEnrollClick }) => {
  const [courses, setCourses] = useState(fallbackCourses);
  const [activeCourse, setActiveCourse] = useState(null);
  
  // Forcing component refresh to clear old cached initial state from Vite HMR

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "course"]`);
        if (data && data.length > 0) {
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (courses.length > 0) {
        gsap.fromTo('.course-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.courses-grid',
              start: 'top 85%',
            }
          }
        );

        gsap.fromTo('.courses-header',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: '.courses-header', start: 'top 90%' }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [courses]);

  return (
    <section className="courses-section" id="courses">
      <div className="courses-inner">
        
        <div className="courses-header">
          <p className="section-label">Academic Excellence</p>
          <h2 className="courses-heading">Our Curriculum</h2>
          <p className="section-subtitle">
            Expertly crafted programs tailored for all ages and skill levels.
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card glass-panel" key={course._id || course.id}>
              <div className="course-icon-wrap" style={{ '--course-color': course.color }}>
                <span className="course-emoji">{course.icon}</span>
                <div className="course-glow" style={{ background: course.color }}></div>
              </div>
              <div className="course-content">
                <div className="course-meta-top">
                  <span className="course-category" style={{ color: course.color }}>
                    {course.category}
                  </span>
                  {course.price && <span className="course-price-tag">{course.price}</span>}
                </div>
                <h3 className="course-title">{course.name}</h3>
                <p className="course-desc">{course.description}</p>
                <button 
                  className="btn-learn-more" 
                  style={{ '--hover-color': course.color }}
                  onClick={() => setActiveCourse(course)}
                >
                  View Details & Pricing <span className="arrow">→</span>
                </button>
              </div>
              <div className="card-border-bottom" style={{ background: course.color }}></div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Overlay for Course Details */}
      {activeCourse && (
        <div className="course-modal-backdrop" onClick={() => setActiveCourse(null)}>
          <div className="course-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCourse(null)}>✕</button>
            
            <div className="modal-header">
              <span className="modal-icon">{activeCourse.icon}</span>
              <div>
                <span className="modal-category" style={{ color: activeCourse.color }}>{activeCourse.category}</span>
                <h2 className="modal-title">{activeCourse.name}</h2>
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-desc">{activeCourse.description}</p>
              
              <div className="modal-features">
                <div className="feature">
                  <h4>Investement</h4>
                  <p>{activeCourse.price || 'Contact us'}</p>
                </div>
                <div className="feature">
                  <h4>Mode</h4>
                  <p>Offline & Online</p>
                </div>
                <div className="feature">
                  <h4>Syllabus</h4>
                  <p>Certified</p>
                </div>
              </div>

              {activeCourse.features && (
                <ul className="modal-feature-list">
                  {activeCourse.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              )}
              
              <div className="modal-actions">
                <button className="btn-enroll-now btn-primary" onClick={() => { onEnrollClick(); setActiveCourse(null); }}>
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CoursesSection;
