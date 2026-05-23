import React from 'react';
import { academyInfo, courses } from '../data/academyData';
import './FooterCTA.css';

const FooterCTA = ({ onEnrollClick }) => (
  <section className="footer-cta-section" id="contact">
    <div className="footer-cta-inner">
      {/* Decorative top Logo */}
      <div className="footer-logo-wrap">
        <img src="/saaa_logo.jpg.jpeg" alt="SAAA Logo" className="footer-logo" />
      </div>

      <p className="footer-label">{academyInfo.name}</p>
      <h2 className="footer-heading text-gradient-gold">
        Begin Your Arts Journey
      </h2>
      
      <div className="footer-contact-info">
        <div className="contact-item glass-panel">
          <span className="contact-icon">📍</span>
          <div className="contact-text">
            <h4>Visit the Academy</h4>
            <p>{academyInfo.address}</p>
            <a href={academyInfo.locationUrl} target="_blank" rel="noreferrer" className="map-link">View Achievement Map →</a>
          </div>
        </div>
        
        <div className="contact-item glass-panel">
          <span className="contact-icon">📞</span>
          <div className="contact-text">
            <h4>Call for Admissions</h4>
            <div className="phone-numbers">
              {academyInfo.phoneNumbers.map(num => (
                <p key={num} className="phone-number">{num}</p>
              ))}
            </div>
            <span className="availability-tag">Admissions Open — Join Now</span>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn-primary" id="btn-enroll" onClick={onEnrollClick}>
          Enroll Now
        </button>
      </div>

      <div className="footer-curriculum-tags">
        {courses.map(course => (
          <span key={course._id} className="footer-tag glass-panel">{course.name}</span>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2024 {academyInfo.name} · Secunderabad</p>
        <p className="footer-quote">"{academyInfo.tagline}"</p>
      </div>
    </div>

    {/* Background radial glow */}
    <div className="footer-glow"></div>
  </section>
);

export default FooterCTA;
