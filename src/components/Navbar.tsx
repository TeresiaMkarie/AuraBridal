import React, { useState, useRef, useEffect } from 'react';
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
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <span className="brand-subtitle">ATELIER NAIROBI.KENYA</span>
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

            {/* Login / Sign Up or Account Menu (right before Book Private Fitting) */}
            {user ? (
              <div className="nav-user-menu" ref={userMenuRef}>
                <button
                  className="action-link-btn nav-user-trigger"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  title={`Account: ${user.name}`}
                >
                  <span className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-nav-name">{user.name.split(' ')[0]}</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown-card">
                    <div className="user-dropdown-header">
                      <div className="user-dropdown-salutation">ATELIER MEMBER</div>
                      <div className="user-dropdown-name">{user.name}</div>
                      <div className="user-dropdown-email">{user.email}</div>
                      {user.role && <div className="user-dropdown-role">{user.role}</div>}
                      {user.weddingDate && (
                        <div className="user-dropdown-meta">
                          Wedding: <strong>{user.weddingDate}</strong>
                        </div>
                      )}
                    </div>
                    <div className="user-dropdown-menu-items">
                      <button
                        className="user-menu-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenWishlist();
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>My Wishlist ({wishlistCount})</span>
                      </button>
                      <button
                        className="user-menu-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenBooking();
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Book Private Fitting</span>
                      </button>
                      <div className="user-menu-divider" />
                      <button
                        className="user-menu-item signout-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-group">
                <button
                  type="button"
                  className="action-link-btn nav-auth-link"
                  onClick={() => onOpenAuth('signin')}
                  title="Sign In to Atelier"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>LOGIN</span>
                </button>
                <span className="auth-separator" aria-hidden="true">·</span>
                <button
                  type="button"
                  className="action-link-btn nav-auth-link nav-signup-link"
                  onClick={() => onOpenAuth('signup')}
                  title="Create Atelier Account"
                >
                  <span>SIGN UP</span>
                </button>
              </div>
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
                <div className="mobile-user-row">
                  <span className="mobile-user-label">
                    Signed in as <strong>{user.name}</strong>
                  </span>
                  <button
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
                <div className="mobile-auth-group">
                  <button
                    type="button"
                    className="mobile-login-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signin');
                    }}
                  >
                    LOGIN
                  </button>
                  <button
                    type="button"
                    className="mobile-signup-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                  >
                    SIGN UP
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
