import React, { useState } from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  wishlistCount: number;
  compareCount: number;
  cartCount: number;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onLogout: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  cartCount,
  user,
  onOpenAuth,
  onLogout,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenBooking,
  onOpenDashboard,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        Free Worldwide Shipping | Book Your Bridal Styling Session
      </div>

      {/* Main Haute Couture Header */}
      <header className="navbar">
        <div className="nav-container">
          {/* Left Column: Editorial Links (Desktop) & Hamburger (Mobile) */}
          <div className="nav-left">
            <button
              className="mobile-toggle"
              id="mobileToggle"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav className="nav-links" id="navLinks">
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('icons-section');
                }}
              >
                Collections
              </a>
              <a
                href="#savoir-faire"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('savoir-faire');
                }}
              >
                Our Savoir-Faire
              </a>
              <a
                href="#quiz"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('quiz');
                }}
              >
                Style Match
              </a>
            </nav>
          </div>

          {/* Center Column: Perfectly Centered Brand Wordmark */}
          <div className="brand-wrapper">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('hero');
              }}
              className="brand-logo"
            >
              AURA BRIDAL
            </a>
            <span className="brand-subtitle">
              ATELIER NAIROBI <span className="brand-subtitle-dot">&bull;</span> KENYA
            </span>
          </div>

          {/* Right Column: Search, Wishlist, Bag, Login, Book Fitting */}
          <div className="nav-actions">
            {/* Search Trigger */}
            <button
              className="action-link-btn"
              onClick={onOpenSearch}
              title="Search Collection"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>SEARCH</span>
            </button>

            {/* Wishlist */}
            <button
              className="action-link-btn"
              onClick={onOpenWishlist}
              title="Saved Favorites"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={wishlistCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>WISHLIST</span>
              {wishlistCount > 0 && <span className="wishlist-dot" />}
            </button>

            {/* Cart Icon & Count */}
            <button
              className="action-link-btn cart-indicator"
              onClick={onOpenCart}
              title="Shopping Bag"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>({cartCount})</span>
            </button>

            {/* When logged in: direct DASHBOARD & SIGN OUT; when not logged in: GET STARTED */}
            {user ? (
              <div className="nav-user-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {onOpenDashboard && (
                  <button
                    type="button"
                    className="action-link-btn"
                    onClick={onOpenDashboard}
                    title="Open Wedding Dashboard"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontWeight: 600,
                      letterSpacing: '1.2px',
                      color: 'var(--color-accent-gold, #C5A880)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                    <span>DASHBOARD</span>
                  </button>
                )}
                <button
                  type="button"
                  className="action-link-btn"
                  onClick={onLogout}
                  title="Sign Out"
                  style={{
                    fontSize: '10.5px',
                    letterSpacing: '1px',
                    color: '#9CA3AF',
                  }}
                >
                  <span>SIGN OUT</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-get-started"
                onClick={() => onOpenAuth('signin')}
                title="Get Started"
              >
                GET STARTED
              </button>
            )}

            {/* Book Private Fitting (right-most CTA) */}
            <button
              className="btn-book-fitting"
              onClick={onOpenBooking}
            >
              BOOK PRIVATE FITTING
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-links">
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('icons-section');
                }}
              >
                Collections
              </a>
              <a
                href="#savoir-faire"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('savoir-faire');
                }}
              >
                Our Savoir-Faire
              </a>
              <a
                href="#quiz"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('quiz');
                }}
              >
                Style Match
              </a>
              {onOpenDashboard && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--color-accent-gold, #C5A880)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '8px 0',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Wedding Dashboard
                </button>
              )}
            </div>

            <div className="mobile-nav-bottom">
              <button
                className="mobile-cta-fitting"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
              >
                BOOK PRIVATE FITTING
              </button>
              {user ? (
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  {onOpenDashboard && (
                    <button
                      type="button"
                      className="mobile-get-started-btn"
                      style={{ flex: 1, backgroundColor: '#C5A880', color: '#FFFFFF', textAlign: 'center' }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenDashboard();
                      }}
                    >
                      DASHBOARD
                    </button>
                  )}
                  <button
                    type="button"
                    className="mobile-logout-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="mobile-get-started-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                >
                  GET STARTED
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
