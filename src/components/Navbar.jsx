import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ onEnrollClick, onLoginClick, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['about', 'courses', 'faculty', 'gallery', 'contact'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="nav-container">
        <div className="logo text-gradient-gold">
          <img src="/saaa_logo.jpg.jpeg" alt="SAAA Logo" className="logo-image" />
          <span className="logo-text">SAAA</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#courses" className={activeSection === 'courses' ? 'active' : ''}>Courses</a></li>
          <li><a href="#faculty" className={activeSection === 'faculty' ? 'active' : ''}>Faculty</a></li>
          <li><a href="#gallery" className={activeSection === 'gallery' ? 'active' : ''}>Gallery</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="login-link" onClick={onLoginClick}>
            Student Login
          </button>
          <button className="cta-button glass-panel" onClick={onEnrollClick}>
            Enroll Now
          </button>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
