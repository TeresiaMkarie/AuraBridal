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

  // Sync mode with initialMode whenever modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setResetNotice('');
    }
  }, [isOpen, initialMode]);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up fields
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [role, setRole] = useState<'Bride' | 'Bridesmaid'>('Bride');
  const [weddingDate, setWeddingDate] = useState('');

  // Status & Notifications
  const [errorMessage, setErrorMessage] = useState('');
  const [resetNotice, setResetNotice] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetNotice('');

    if (!signInEmail.trim() || !signInPassword.trim()) {
      setErrorMessage('Please enter your email and password to access your atelier account.');
      return;
    }

    const derivedName = signInEmail.split('@')[0]
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Cherished Client';

    const user: UserProfile = {
      name: derivedName,
      email: signInEmail.trim(),
      role: 'Bride',
      weddingDate: 'October 2026',
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetNotice('');

    if (!name.trim()) {
      setErrorMessage('Please provide your full name for atelier fittings.');
      return;
    }
    if (!signUpEmail.trim() || !signUpPassword.trim()) {
      setErrorMessage('Please provide your email address and password.');
      return;
    }
    if (signUpPassword.length < 6) {
      setErrorMessage('For security, passwords must be at least 6 characters.');
      return;
    }

    const user: UserProfile = {
      name: name.trim(),
      email: signUpEmail.trim(),
      role: role,
      weddingDate: weddingDate.trim() || undefined,
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEmail = signInEmail.trim() || 'your email';
    setResetNotice(`Password recovery instructions have been sent to ${targetEmail}.`);
    setErrorMessage('');
  };

  return (
    <div className="modal-overlay auth-modal-backdrop" onClick={onClose}>
      <div
        className="auth-modal-card luxury-auth-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle decorative gold corner frame */}
        <div className="auth-card-border-ornament" aria-hidden="true" />

        {/* Elegant Close Button */}
        <button
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header with Haute Couture Seal */}
        <div className="auth-modal-header">
          <div className="auth-atelier-seal">
            <span className="seal-monogram">AB</span>
            <span className="seal-star">✦</span>
          </div>
          <span className="auth-pre-title">AURA BRIDAL • ATELIER NAIROBI</span>
          <h2 className="auth-title">
            {mode === 'signin' ? 'Welcome to the Atelier' : 'Begin Your Bridal Journey'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'signin'
              ? 'Sign in to access your fitting appointments, bespoke silhouette profile & private party portal.'
              : 'Create your private atelier account for personalized fittings, custom sizing & direct stylist guidance.'}
          </p>
        </div>

        {/* Editorial Segmented Switcher */}
        <div className="auth-tabs-luxury">
          <button
            type="button"
            className={`auth-tab-luxury ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setMode('signin');
              setErrorMessage('');
              setResetNotice('');
            }}
          >
            SIGN IN
          </button>
          <button
            type="button"
            className={`auth-tab-luxury ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
              setResetNotice('');
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Informational Alerts */}
        {errorMessage && (
          <div className="auth-error-notice">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {resetNotice && (
          <div className="auth-success-notice">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{resetNotice}</span>
          </div>
        )}

        {/* Form Content */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="auth-form luxury-form">
            <div className="auth-field">
              <label htmlFor="signin-email">EMAIL ADDRESS</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="e.g. bride@aurabridal.co.ke"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="signin-password">PASSWORD</label>
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signin-password"
                  type={showSignInPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                  title={showSignInPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignInPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-options-row">
              <label className="auth-remember-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this atelier session</span>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn-luxury">
              <span>SIGN IN TO ATELIER</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="auth-form luxury-form">
            {/* Bridal Role Selector */}
            <div className="auth-field">
              <label>I AM PLANNING AS</label>
              <div className="auth-role-selector">
                <button
                  type="button"
                  className={`auth-role-btn ${role === 'Bride' ? 'active' : ''}`}
                  onClick={() => setRole('Bride')}
                >
                  <span className="role-emoji">👰</span>
                  <span className="role-text">Bride</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-btn ${role === 'Bridesmaid' ? 'active' : ''}`}
                  onClick={() => setRole('Bridesmaid')}
                >
                  <span className="role-emoji">💐</span>
                  <span className="role-text">Bridesmaid / Party</span>
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-name">FULL NAME</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Wanjiku Kamau"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">EMAIL ADDRESS</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="e.g. wanjiku@aurabridal.co.ke"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">PASSWORD (6+ CHARACTERS)</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signup-password"
                  type={showSignUpPassword ? 'text' : 'password'}
                  placeholder="Create a confidential password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                  title={showSignUpPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignUpPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-date">ESTIMATED WEDDING DATE (OPTIONAL)</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  id="signup-date"
                  type="text"
                  placeholder="e.g. October 2026 or Spring 2027"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn-luxury">
              <span>CREATE ATELIER ACCOUNT</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        )}

        {/* Exclusive Atelier Privileges Ribbon */}
        <div className="auth-perks-ribbon">
          <div className="auth-perk-item">
            <span className="perk-bullet">✦</span>
            <span>Private Salon Champagne Reception</span>
          </div>
          <div className="auth-perk-item">
            <span className="perk-bullet">✦</span>
            <span>Bespoke Silhouette & Measurement Records</span>
          </div>
          <div className="auth-perk-item">
            <span className="perk-bullet">✦</span>
            <span>Dedicated Nairobi Stylist Concierge</span>
          </div>
        </div>

        {/* Discreet Atelier Security Note */}
        <div className="auth-footer-note">
          <span>Confidential & Bespoke Atelier Access • Nairobi, Kenya</span>
        </div>
      </div>
    </div>
  );
};
