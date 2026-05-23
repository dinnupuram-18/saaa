import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { instruments } from '../data/academyData';
import './InstrumentsSection.css';

gsap.registerPlugin(ScrollTrigger);

const InstrumentsSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.instrument-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      gsap.fromTo('.instruments-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: { trigger: '.instruments-heading', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="instruments-section" id="instruments" ref={sectionRef}>
      <div className="instruments-inner">
        <p className="section-label">The Sacred Ensemble</p>
        <h2 className="instruments-heading">Voices of the Tradition</h2>
        <p className="section-subtitle">
          Focused training on the primary instruments of the Indian tradition.
        </p>

        <div className="instruments-grid">
          {instruments.map((inst) => (
            <div className="instrument-card glass-panel" key={inst.id} id={`instrument-${inst.id}`}>
              <div className="instrument-icon" style={{ '--accent': inst.color }}>
                <span>{inst.emoji}</span>
                <div className="icon-glow" style={{ background: inst.color }}></div>
              </div>
              <div className="instrument-label" style={{ color: inst.color }}>
                {inst.role}
              </div>
              <h3 className="instrument-name">{inst.name}</h3>
              <p className="instrument-desc">{inst.description}</p>
              <div className="card-accent-line" style={{ background: inst.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstrumentsSection;
