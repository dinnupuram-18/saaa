import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Student Profile Access: This feature is currently in maintenance mode as we migrate student data. Please contact the administration for urgent access.");
    onClose();
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={onClose}>&times;</button>
        
        <div className="login-header">
          <div className="login-logo-wrap">
            <img src="/saaa_logo.jpg.jpeg" alt="SAAA Logo" className="login-logo" />
          </div>
          <h2 className="text-gradient-gold">Student Portal</h2>
          <p>Access your classes, materials, and certificates</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID / Email</label>
            <input type="text" required placeholder="SAAA-2024-XXXX" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" required placeholder="••••••••" />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-submit btn-primary">
            Sign In to Portal
          </button>
        </form>

        <div className="login-footer">
          <p>Not an enrolled student yet? <a href="#courses" onClick={onClose}>Browse Courses</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
