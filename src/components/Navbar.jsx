import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ onEnrollClick, onLoginClick, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="nav-container">
        <div className="logo text-gradient-gold" onClick={toggleTheme}>
          <img src="/saaa_logo.jpg.jpeg" alt="SAAA Logo" className="logo-image" />
          <span className="logo-text">SAAA</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#faculty">Faculty</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
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
