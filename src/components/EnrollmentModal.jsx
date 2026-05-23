import React, { useState } from 'react';
import './EnrollmentModal.css';
import { sanityClient } from '../sanityClient';
import { academyInfo } from '../data/academyData';

const EnrollmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    course: '',
    level: 'beginner'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Trigger Automation Webhook (Make.com)
      const makeWebhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
      
      if (makeWebhookUrl && makeWebhookUrl !== 'YOUR_MAKE_WEBHOOK_URL_HERE') {
        await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            source: 'SAAA Website',
            timestamp: new Date().toISOString(),
          }),
        });
        alert("Thank you! Your application has been received. Our team will contact you shortly via WhatsApp.");
      } else {
        // Fallback to manual WhatsApp if no webhook is configured
        console.warn('Make.com Webhook URL not configured. Falling back to manual WhatsApp.');
        const primaryNumber = academyInfo.phoneNumbers[0].replace(/\D/g, ''); 
        const message = `Hello SAAA! 👋%0A%0A*New Enrollment Application*%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phoneNumber}%0A*Email:* ${formData.email}%0A*Course:* ${formData.course}%0A*Level:* ${formData.level}`;
        window.open(`https://wa.me/${primaryNumber}?text=${message}`, '_blank');
        alert("Thank you! Your application has been recorded. Redirecting you to WhatsApp for final confirmation.");
      }
      
      onClose();
    } catch (error) {
      console.error('Enrollment error:', error);
      alert("There was an error submitting your application. Please try again or contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="enrollment-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2 className="text-gradient-gold">Start Your Journey</h2>
          <p>Join the Sri Annamacharya Arts Academy</p>
        </div>

        <form className="enrollment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              name="fullName"
              type="text" 
              required 
              placeholder="Enter your name" 
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              name="email"
              type="email" 
              required 
              placeholder="email@example.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              name="phoneNumber"
              type="tel" 
              required 
              placeholder="+91 XXXXX XXXXX" 
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Interested Course</label>
            <select 
              name="course" 
              required 
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select a course</option>
              <option value="vocal">Carnatic Vocal</option>
              <option value="dance">Kuchipudi Dance</option>
              <option value="keyboard">Keyboard</option>
              <option value="guitar">Guitar</option>
              <option value="flute">Flute</option>
              <option value="slokas">Slokas & Chants</option>
              <option value="mridangam">Mridangam</option>
              <option value="veena">Veena</option>
            </select>
          </div>

          <div className="form-group">
            <label>Experience Level</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="level" 
                  value="beginner" 
                  checked={formData.level === 'beginner'} 
                  onChange={handleChange} 
                /> Beginner
              </label>
              <label>
                <input 
                  type="radio" 
                  name="level" 
                  value="intermediate" 
                  checked={formData.level === 'intermediate'} 
                  onChange={handleChange} 
                /> Intermediate
              </label>
              <label>
                <input 
                  type="radio" 
                  name="level" 
                  value="advanced" 
                  checked={formData.level === 'advanced'} 
                  onChange={handleChange} 
                /> Advanced
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn text-gradient-gold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
