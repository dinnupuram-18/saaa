import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CanvasScrollSequence from './components/CanvasScrollSequence'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CoursesSection from './components/CoursesSection'
import FacultySection from './components/FacultySection'
import StudentsSection from './components/StudentsSection'
import PerformanceGallery from './components/PerformanceGallery'
import FooterCTA from './components/FooterCTA'
import EnrollmentModal from './components/EnrollmentModal'
import LoginModal from './components/LoginModal'

function App() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const openEnrollModal = () => setIsEnrollModalOpen(true);
  const closeEnrollModal = () => setIsEnrollModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar onEnrollClick={openEnrollModal} onLoginClick={openLoginModal} theme={theme} toggleTheme={toggleTheme} />
      <Hero onEnrollClick={openEnrollModal} toggleTheme={toggleTheme} />
      <CanvasScrollSequence onEnrollClick={openEnrollModal} />
      <AboutSection />
      <CoursesSection onEnrollClick={openEnrollModal} />
      <FacultySection />
      <StudentsSection onEnrollClick={openEnrollModal} />
      <PerformanceGallery />
      <FooterCTA onEnrollClick={openEnrollModal} />
      
      <EnrollmentModal 
        isOpen={isEnrollModalOpen} 
        onClose={closeEnrollModal} 
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
      />
    </div>
  )
}

export default App
