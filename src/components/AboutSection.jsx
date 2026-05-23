import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState('heritage'); // 'heritage' or 'director'

  // Auto-rotate the tabs every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === 'heritage' ? 'director' : 'heritage'));
    }, 5000); // 5000 milliseconds = 5 seconds
    
    // Clear interval on unmount or when activeSlide manually changes to reset the timer
    return () => clearInterval(slideInterval);
  }, [activeSlide]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.about-section-inner',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="ambient-glow"></div>
      
      <div className="section-container relative-z about-section-inner">
        
        {/* Slide Controls / Tabs */}
        <div className="about-tabs-container">
          <div className="about-tabs glass-panel">
            <button 
              className={`tab-btn ${activeSlide === 'heritage' ? 'active' : ''}`}
              onClick={() => setActiveSlide('heritage')}
            >
              Our Heritage
            </button>
            <button 
              className={`tab-btn ${activeSlide === 'director' ? 'active' : ''}`}
              onClick={() => setActiveSlide('director')}
            >
              About the Director
            </button>
            <div className={`tab-indicator ${activeSlide}`} />
          </div>
        </div>

        {/* Sliding Viewport */}
        <div className="slides-viewport">
          <div className={`slides-track track-${activeSlide}`}>
            
            {/* =======================
                SLIDE 1: OUR HERITAGE
            ======================= */}
            <div className="slide-item">
              <div className="about-content-grid">
                
                {/* Left: Heritage Image */}
                <div className="about-image-column">
                  <div className="about-archway-wrap">
                    <div className="archway-border-outer">
                      <div className="archway-border-inner">
                        <div className="arch-image-mask">
                          <img src="/saaa_logo.jpg.jpeg" alt="SAAA Heritage" className="about-hero-image logo-contain" />
                          <div className="image-overlay-gradient"></div>
                        </div>
                      </div>
                    </div>
                    <div className="experience-badge">
                      <span className="years text-gradient-gold">2021</span>
                      <span className="label">Established</span>
                    </div>
                  </div>
                </div>

                {/* Right: Heritage Text */}
                <div className="about-text-content custom-scroll-area">
                  <div className="header-group">
                    <p className="section-label-small text-gradient-saffron">Our Heritage</p>
                    <h2 className="section-title text-gradient-gold">Preserving the Divine Art</h2>
                  </div>
                  
                  <div className="about-description">
                    <div className="text-block">
                      <p className="lead-paragraph">
                        <span className="drop-cap text-gradient-gold">S</span>ri Annamacharya Arts Academy (SAAA) was established on December 18, 2021, by <strong>Pasumarthi Sailaja Garu</strong>, a follower of Sanatan Dharma and an admirer of Indian classical arts. The name 'SAAA' draws inspiration from 'Shadjam', the first swaram among the seven swarams of Carnatic Music.
                      </p>
                    </div>

                    <div className="text-block">
                      <p className="body-paragraph">
                        Founded with a visionary mission to preserve and propagate the time-honored musical heritage inspired by Sri Tallapaka Annamacharya’s spiritual legacy, SAAA began with just two students. In a span of five years, the academy has evolved into a distinguished institution with a strength of over a hundred students across India and abroad.
                      </p>
                    </div>

                    <div className="text-block">
                      <p className="body-paragraph">
                        SAAA offers authentic, disciplined, and holistic training across Carnatic Vocal, Kuchipudi Dance, Veena, Carnatic Violin, Flute, Mridangam, and Western courses like Guitar and Keyboard. The academy focuses not only on fine arts, but also on instilling discipline and cultural values among children, including a vibrant annual summer camp.
                      </p>
                    </div>
                  </div>
                  
                  <div className="about-stats-container">
                    <div className="stat-card-float glass-panel">
                      <div className="stat-glow"></div>
                      <h4>100+</h4>
                      <p>Students</p>
                    </div>
                    <div className="stat-card-float glass-panel" style={{ '--animation-delay': '1s' }}>
                      <div className="stat-glow"></div>
                      <h4>Sa to Ni</h4>
                      <p>7 Academies</p>
                    </div>
                    <div className="stat-card-float glass-panel" style={{ '--animation-delay': '2s' }}>
                      <div className="stat-glow"></div>
                      <h4>50k</h4>
                      <p>Artists Vision</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* =======================
                SLIDE 2: DIRECTOR
            ======================= */}
            <div className="slide-item">
              <div className="about-content-grid">
                
                {/* Left: Director Image */}
                <div className="about-image-column">
                  <div className="about-archway-wrap">
                    <div className="archway-border-outer">
                      <div className="archway-border-inner">
                        <div className="arch-image-mask">
                          {/* Image placed here, user will upload to public dir */}
                          <img src="/pranav.jpeg" alt="Director Pranav Garu" className="about-hero-image" />
                          <div className="image-overlay-gradient"></div>
                        </div>
                      </div>
                    </div>
                    <div className="experience-badge">
                      <span className="years text-gradient-gold">DIRECTOR</span>
                      <span className="label">OF SAAA</span>
                    </div>
                  </div>
                </div>

                {/* Right: Director Text */}
                <div className="about-text-content custom-scroll-area">
                  <div className="header-group">
                    <p className="section-label-small text-gradient-saffron">About the Director</p>
                    <h2 className="section-title text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Pasumarthi Sai Narasimha Pranav Garu</h2>
                    <p className="section-label-small" style={{ color: 'var(--color-text)', letterSpacing: '0.1em' }}>Carnatic Vocalist & Multi-Instrumentalist</p>
                  </div>
                  
                  <div className="about-description">
                    <div className="text-block">
                      <p className="lead-paragraph">
                        <span className="drop-cap text-gradient-gold">B</span>orn into the illustrious <em>Pasumarthi</em> lineage of Classical dancers and Carnatic musicians, Pranav Garu carries music as both hereditary sadhana and cultural responsibility. His journey began at age 3 with his father, <strong>Pasumarthi Venkata Ramana Murthi Garu</strong>, learning Annamacharya Keertanas and the basics of Carnatic Music. That early immersion became the spiritual foundation for Sri Annamacharya Arts Academy.
                      </p>
                    </div>

                    <div className="text-block">
                      <h4 style={{ color: 'var(--color-gold)', marginBottom: '10px', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Parampara & Vidya</h4>
                      <p className="body-paragraph">
                        His formal training commenced at age 6 under <strong>Smt. Girija Swaminathan Garu</strong>. In 2016, he advanced to <strong>Shri Mantha Srinivas Garu</strong>, the torchbearer of the Hyderabad Sisters bani, under whose guidance he completed Certification and Diploma courses from Potti Sreeramulu Telugu University. An accomplished multi-instrumentalist, he trained in Keyboard, Guitar, and Violin under various masters, later achieving top international grades from "IStar London."
                      </p>
                    </div>

                    <div className="text-block">
                      <h4 style={{ color: 'var(--color-gold)', marginBottom: '10px', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Recognition & Srujana</h4>
                      <p className="body-paragraph">
                        Honored with the <strong>‘Guru Srestha’</strong> Award in 2022, he deeply explores complex concepts like Graha bhedam and Gati bhedam. As a composer, he creates original Carnatic tunes and western melodies. Heading SAAA’s creative media wing, he records original audio and directs multi-angle dance films showcasing the academy to a global audience.
                      </p>
                    </div>

                    <div className="text-block" style={{ marginTop: '30px' }}>
                      <p className="body-paragraph" style={{ fontStyle: 'italic', color: 'var(--color-gold)', background: 'rgba(212, 175, 55, 0.05)', padding: '20px', borderLeft: '4px solid var(--color-gold)' }}>
                        "Music is the highest form of bhakti marga to reach God. Every lesson taught, every concert performed, and every composition created is an offering on that path."
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
