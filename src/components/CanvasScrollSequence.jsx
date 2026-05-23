import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './CanvasScrollSequence.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CanvasScrollSequence = ({ onEnrollClick }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const frameCount = 240;

  // URL-encode the folder name to handle the spaces
  const currentFrame = index =>
    `/SAAA%20frames/ezgif-frame-${(index + 1)
      .toString()
      .padStart(3, '0')}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = new Array(frameCount);
    const obj = { frame: 0 };
    let loaded = 0;

    const drawFrame = () => {
      const img = images[Math.round(obj.frame)];
      if (!img || !img.complete) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Load all frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loaded++;
        const progress = Math.round((loaded / frameCount) * 100);
        setLoadProgress(progress);
        if (i === 0) drawFrame(); // draw first frame immediately
        if (loaded === frameCount) {
          setIsReady(true);
          initScrollAnimation();
        }
      };
      img.onerror = () => {
        // still count as "loaded" so progress doesn't stall
        loaded++;
        const progress = Math.round((loaded / frameCount) * 100);
        setLoadProgress(progress);
        if (loaded === frameCount) {
          setIsReady(true);
          initScrollAnimation();
        }
      };
      images[i] = img;
    }

    const initScrollAnimation = () => {
      // Fade out the scroll hint immediately on start
      gsap.to('.story-scroll-hint', {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100',
          scrub: true
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      tl.to(obj, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: drawFrame,
      });

      // Story section animations tied to scroll position - 6 distinct phases
      const storyPhases = [
        { selector: '.phase-1', start: '2% top', end: '15% top' },   // The Journey Awaits
        { selector: '.phase-2', start: '18% top', end: '32% top' },  // Sri Annamacharya Arts Academy
        { selector: '.phase-3', start: '35% top', end: '49% top' },  // A Harmonious Blend of Arts
        { selector: '.phase-4', start: '52% top', end: '66% top' },  // Learn from the Masters
        { selector: '.phase-5', start: '69% top', end: '83% top' },  // Perform with Devotion
        { selector: '.phase-6', start: '86% top', end: 'bottom bottom' }, // Join the Legacy
      ];

      storyPhases.forEach(({ selector, start, end }) => {
        const el = containerRef.current.querySelector(selector);
        if (!el) return;

        // Force hide immediately on mount
        gsap.set(el, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          end,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, overwrite: 'auto' }),
          onLeave: () => gsap.to(el, { opacity: 0, y: -40, duration: 0.6, overwrite: 'auto' }),
          onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, y: 40, duration: 0.6, overwrite: 'auto' }),
        });
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleExploreClick = (e) => {
    e.stopPropagation(); // Prevent any parent events from firing
    
    // 1. Fade out the UI box immediately
    gsap.to('.phase-1', { 
      opacity: 0, 
      y: -20, 
      duration: 0.8, 
      pointerEvents: 'none',
      ease: "power2.out"
    });
    
    // 2. Calculate coordinates
    const targetSection = document.getElementById('courses');
    if (!targetSection) return;
    
    const targetY = targetSection.getBoundingClientRect().top + window.pageYOffset;

    // 3. Begin the slow, cinematic journey
    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 8, // Extended to 8 seconds for a truly slow, premium feel
      ease: "power1.inOut"
    });
  };

  return (
    <div className="canvas-sequence-container" ref={containerRef}>
      {/* Loading screen */}
      {!isReady && (
        <div className="loading-screen">
          <div className="loading-om">ॐ</div>
          <p className="loading-label">Loading the Sacred Journey</p>
          <div className="loading-bar-wrap">
            <div className="loading-bar" style={{ width: `${loadProgress}%` }}></div>
          </div>
          <p className="loading-pct">{loadProgress}%</p>
        </div>
      )}

      {/* Sticky canvas and overlays container */}
      <div className="canvas-sticky-wrapper">
        <canvas ref={canvasRef} id="sequence-canvas"></canvas>
        <div className="vignette-overlay"></div>

        {/* Scroll down indicator that fades out */}
        <div className="scroll-indicator story-scroll-hint">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Story overlays — 6 phases properly nested inside sticky wrapper */}
        <div className="story-overlay">

          <div className="story-phase phase-1 phase-center">
            <div className="golden-glass-frame">
              <span className="phase-tag">Join SAAA</span>
              <h2>The Journey Awaits</h2>
              <button className="btn-golden" onClick={handleExploreClick}>
                Explore Our Courses
              </button>
            </div>
          </div>

          <div className="story-phase phase-2">
            <span className="phase-tag">Our Legacy</span>
            <h2>Sri Annamacharya Arts Academy</h2>
            <p className="phase-sub">Preserving and passing down sacred traditions.</p>
          </div>

          <div className="story-phase phase-3 phase-right">
            <span className="phase-tag">Our Curriculum</span>
            <h2>A Harmonious Blend of Arts</h2>
            <p className="phase-sub">From traditional Carnatic & Kuchipudi to modern Keyboard & Guitar.</p>
          </div>

          <div className="story-phase phase-4">
            <span className="phase-tag">Expert Faculty</span>
            <h2>Learn from the Masters</h2>
            <p className="phase-sub">Guided by seasoned musicians and performing artists.</p>
          </div>

          <div className="story-phase phase-5 phase-right">
            <span className="phase-tag">Student Stages</span>
            <h2>Perform with Devotion</h2>
            <p className="phase-sub">Experience the joy of performing on grand traditional stages.</p>
          </div>

          <div className="story-phase phase-6 phase-center">
            <span className="phase-tag">Begin Tomorrow</span>
            <h2>Your Vision, Our Tradition</h2>
            <p className="phase-sub">The next chapter of the SAAA legacy belongs to you.</p>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={onEnrollClick}>
              Join the Legacy
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CanvasScrollSequence;
