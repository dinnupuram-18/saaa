import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = ({ onEnrollClick, toggleTheme }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      )
      .fromTo('.hero-subtitle', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          "-=1.2"
      )
      .fromTo('.hero-actions',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          "-=1.0"
      )
      .fromTo('.hero-cta',
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title text-gradient-gold">Sri Annamacharya<br/>Arts Academy</h1>
        <p className="hero-subtitle">Where tradition meets perfection</p>
        
        <div className="hero-actions">
          <button className="btn-enroll btn-primary" onClick={onEnrollClick}>
            Enroll Now
          </button>
          <button className="btn-explore glass-panel" onClick={scrollToNext}>
            Explore the Journey
          </button>
        </div>
        
        <div className="hero-cta">
          <div className="scroll-indicator">
            <div className="mouse" onClick={toggleTheme}>
              <div className="wheel"></div>
            </div>
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Particles effect overlay */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--left': `${Math.random() * 100}%`,
            '--top': `${Math.random() * 100}%`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${5 + Math.random() * 5}s`,
            '--opacity': `${0.2 + Math.random() * 0.5}`
          }}></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
