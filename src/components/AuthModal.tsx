import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setSuccessNotice('');
    }
  }, [isOpen, initialMode]);

  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const derivedName = mode === 'signup'
      ? name.trim()
      : email.split('@')[0]
          .split(/[._-]/)
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(' ') || 'Cherished Client';

    const user: UserProfile = {
      name: derivedName,
      email: email.trim(),
      role: 'Bride',
      weddingDate: 'October 2026',
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEmail = email.trim() || 'your email address';
    setSuccessNotice(`Password reset instructions sent to ${targetEmail}`);
    setErrorMessage('');
  };

  return (
    <div
      className={`modal-overlay auth-overlay-clean ${isOpen ? 'active' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="presentation"
    >
      <div
        className="auth-accessory-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bridal Accessory Header - Permanently mounted in DOM */}
        <div className="auth-accessory-header">
          <img
            src="/images/bridal-accessory-header.jpg"
            alt="Aura Bridal Heirloom Pearl Accessory"
            className="auth-accessory-image"
            loading="eager"
            decoding="sync"
          />
          <div className="auth-accessory-gradient-overlay" />
          <button
            type="button"
            className="auth-accessory-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lower Curvature White Sheet Container */}
        <div className="auth-sheet-container">
          <div className="auth-sheet-header">
            <h2 className="auth-sheet-title">
              {mode === 'signin' ? 'Log in' : 'Sign up'}
            </h2>
          </div>

          {errorMessage && (
            <div className="auth-simple-error">
              <span>{errorMessage}</span>
            </div>
          )}

          {successNotice && (
            <div className="auth-simple-success">
              <span>{successNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-clean-form">
            {mode === 'signup' && (
              <div className="auth-underline-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div className="auth-underline-field">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-underline-field password-underline-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                className="auth-eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {mode === 'signin' && (
              <div className="auth-forgot-row">
                <button
                  type="button"
                  className="auth-forgot-text-link"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="auth-gold-btn">
              {mode === 'signin' ? 'Log in' : 'Sign up'}
            </button>
          </form>

          {/* Bottom Switcher: "Don't have an account? Sign up" and vice versa */}
          <div className="auth-bottom-row">
            {mode === 'signin' ? (
              <p className="auth-switch-text">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                    setSuccessNotice('');
                  }}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="auth-switch-text">
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage('');
                    setSuccessNotice('');
                  }}
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
