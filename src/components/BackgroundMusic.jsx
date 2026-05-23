import React, { useState, useRef, useEffect } from 'react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // High-quality, atmospheric Carnatic Flute placeholder (Royalty-free style)
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'; // Generic placeholder for logic testing

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Autoplay blocked, user interaction required:', err));
    }
    setIsPlaying(!isPlaying);
  };

  // Attempt to play on first interaction anywhere on the document
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.volume = 0.3; // Set comfortable background volume
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        document.removeEventListener('click', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  return (
    <div className="audio-controller">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
      />
      <button 
        className={`audio-toggle-btn glass-panel ${isPlaying ? 'playing' : ''}`} 
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        aria-label="Toggle Background Music"
      >
        <div className="visualizer">
          <span className="bar x-short"></span>
          <span className="bar short"></span>
          <span className="bar medium"></span>
          <span className="bar tall"></span>
          <span className="bar short"></span>
        </div>
        <span className="audio-status-text">{isPlaying ? 'Experience On' : 'Immersive Experience'}</span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
