import React, { useState, useMemo } from 'react';
import { UserProfile } from '../types';

interface AccountDashboardProps {
  user: UserProfile;
  onBackToStore: () => void;
  onLogout: () => void;
  onOpenBooking: () => void;
}

interface GuestRSVP {
  id: string;
  name: string;
  party: number;
  event: 'Wedding' | 'Bridal Shower' | 'Both';
  status: 'Attending' | 'Awaiting' | 'Declined';
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  user,
  onBackToStore,
  onLogout,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'invitations' | 'booking' | 'budget' | 'schedule'>('dashboard');
  const [invitationSubTab, setInvitationSubTab] = useState<'all' | 'shower' | 'wedding' | 'rsvp'>('all');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Guests RSVP sample list
  const [guests, setGuests] = useState<GuestRSVP[]>([
    { id: '1', name: 'Wanjiku & Brian Kamau', party: 2, event: 'Both', status: 'Attending' },
    { id: '2', name: 'Dr. Amina Mohamed', party: 1, event: 'Wedding', status: 'Attending' },
    { id: '3', name: 'David & Sharon Omondi', party: 2, event: 'Wedding', status: 'Attending' },
    { id: '4', name: 'Grace Muthoni', party: 1, event: 'Bridal Shower', status: 'Attending' },
    { id: '5', name: 'Kevin Mutua', party: 2, event: 'Wedding', status: 'Awaiting' },
    { id: '6', name: 'Faith Chebet', party: 1, event: 'Bridal Shower', status: 'Awaiting' },
    { id: '7', name: 'Marcus Otieno', party: 1, event: 'Wedding', status: 'Declined' },
  ]);

  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEvent, setNewGuestEvent] = useState<'Wedding' | 'Bridal Shower' | 'Both'>('Wedding');

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    const newG: GuestRSVP = {
      id: String(Date.now()),
      name: newGuestName.trim(),
      party: 1,
      event: newGuestEvent,
      status: 'Awaiting',
    };
    setGuests([newG, ...guests]);
    setNewGuestName('');
  };

  const handleCopyLink = (type: string) => {
    setCopyFeedback(`${type} invitation link copied!`);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const attendingCount = guests.filter((g) => g.status === 'Attending').reduce((acc, g) => acc + g.party, 0);
  const awaitingCount = guests.filter((g) => g.status === 'Awaiting').reduce((acc, g) => acc + g.party, 0);

  const firstName = user.name.split(' ')[0] || 'Alexandra';

  return (
    <div className="dash-container">
      {/* LEFT SIDEBAR (matches Screenshot 33) */}
      <aside className="dash-sidebar">
        <div className="dash-logo-box" onClick={onBackToStore} title="Return to Boutique">
          <div className="dash-logo-title">AURA BRIDAL</div>
          <div className="dash-logo-subtitle">ATELIER NAIROBI</div>
        </div>

        <div className="dash-menu-kicker">MAIN MENU</div>
        <nav className="dash-nav-list">
          <button
            className={`dash-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'invitations' ? 'active' : ''}`}
            onClick={() => setActiveTab('invitations')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span>Invitation Cards</span>
            <span className="dash-badge-pulse">New</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('booking')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Fittings & Salons</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Budget Planner</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Calendar</span>
          </button>
        </nav>

        <div className="dash-sidebar-footer">
          <button className="dash-store-btn" onClick={onBackToStore}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Return to Boutique</span>
          </button>

          <button className="dash-logout-btn" onClick={onLogout}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dash-main">
        {/* Top Header Bar */}
        <header className="dash-header">
          <div>
            <h1 className="dash-welcome">Welcome back, {firstName}</h1>
            <div className="dash-progress-wrap">
              <div className="dash-progress-labels">
                <span>120 days left</span>
                <span>65% complete</span>
              </div>
              <div className="dash-progress-bar">
                <div className="dash-progress-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          <div className="dash-user-badge">
            <div className="dash-avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="dash-user-info">
              <div className="dash-user-name">{user.name}</div>
              <div className="dash-user-role">Bride &bull; Nairobi</div>
            </div>
          </div>
        </header>

        {copyFeedback && (
          <div className="dash-alert-toast">
            ✓ {copyFeedback}
          </div>
        )}

        {/* 4 STAT CARDS (matches Screenshot 33) */}
        <section className="dash-stats-grid">
          <div className="dash-stat-card">
            <div className="dash-stat-icon-wrap icon-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
            </div>
            <div className="dash-stat-content">
              <div className="dash-stat-label">Total Budget</div>
              <div className="dash-stat-value">$45,200</div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon-wrap icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="dash-stat-content">
              <div className="dash-stat-label">Booked Salons & Vendors</div>
              <div className="dash-stat-value">12</div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon-wrap icon-gray">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="dash-stat-content">
              <div className="dash-stat-label">Pending Tasks</div>
              <div className="dash-stat-value">08</div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon-wrap icon-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="dash-stat-content">
              <div className="dash-stat-label">Guest Count &bull; Confirmed</div>
              <div className="dash-stat-value">{attendingCount} / {attendingCount + awaitingCount}</div>
            </div>
          </div>
        </section>

        {/* TAB 1: INVITATION CARDS (requested by user) */}
        {activeTab === 'invitations' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Invitation Cards Suite</h2>
                <p className="dash-section-subtitle">Bridal shower, official wedding cards, and live RSVP tracking.</p>
              </div>
              <div className="dash-subtabs">
                <button
                  className={`dash-subtab-btn ${invitationSubTab === 'all' ? 'active' : ''}`}
                  onClick={() => setInvitationSubTab('all')}
                >
                  All Cards
                </button>
                <button
                  className={`dash-subtab-btn ${invitationSubTab === 'shower' ? 'active' : ''}`}
                  onClick={() => setInvitationSubTab('shower')}
                >
                  Bridal Shower
                </button>
                <button
                  className={`dash-subtab-btn ${invitationSubTab === 'wedding' ? 'active' : ''}`}
                  onClick={() => setInvitationSubTab('wedding')}
                >
                  Wedding Card
                </button>
                <button
                  className={`dash-subtab-btn ${invitationSubTab === 'rsvp' ? 'active' : ''}`}
                  onClick={() => setInvitationSubTab('rsvp')}
                >
                  RSVP Tracker
                </button>
              </div>
            </div>

            <div className="dash-cards-grid">
              {/* Card 1: Bridal Shower Invitation */}
              {(invitationSubTab === 'all' || invitationSubTab === 'shower') && (
                <div className="invite-preview-card">
                  <div className="invite-card-top-accent invite-shower-accent">
                    <span className="invite-type-tag">BRIDAL SHOWER INVITATION</span>
                  </div>
                  <div className="invite-card-body">
                    <div className="invite-floral-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.6">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                        <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
                      </svg>
                    </div>
                    <div className="invite-headline">Champagne & Pearls Bridal Shower</div>
                    <div className="invite-honoree">In honor of {firstName}</div>
                    <div className="invite-details-list">
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        <span>Saturday, 14 November 2026 &bull; 2:00 PM</span>
                      </div>
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span>Karen Country Club &bull; Nairobi, Kenya</span>
                      </div>
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        <span>Dress Code: Soft Blush & Pearls</span>
                      </div>
                    </div>

                    <div className="invite-actions">
                      <button className="dash-gold-btn" onClick={() => handleCopyLink('Bridal Shower')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>Copy Share Link</span>
                      </button>
                      <button className="dash-clean-btn" onClick={() => handleCopyLink('Bridal Shower Digital')}>
                        <span>Preview Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Official Wedding Invitation */}
              {(invitationSubTab === 'all' || invitationSubTab === 'wedding') && (
                <div className="invite-preview-card">
                  <div className="invite-card-top-accent invite-wedding-accent">
                    <span className="invite-type-tag">OFFICIAL WEDDING INVITATION</span>
                  </div>
                  <div className="invite-card-body">
                    <div className="invite-floral-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-dark)" strokeWidth="1.6">
                        <circle cx="9" cy="12" r="6" />
                        <circle cx="15" cy="12" r="6" />
                      </svg>
                    </div>
                    <div className="invite-headline">The Wedding of {firstName} &amp; Partner</div>
                    <div className="invite-honoree">Together with their families</div>
                    <div className="invite-details-list">
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        <span>Saturday, 12 December 2026 &bull; 11:00 AM</span>
                      </div>
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span>Karen Blixen Coffee Garden &bull; Nairobi, Kenya</span>
                      </div>
                      <div className="invite-detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        <span>RSVP by 15 November 2026</span>
                      </div>
                    </div>

                    <div className="invite-actions">
                      <button className="dash-gold-btn" onClick={() => handleCopyLink('Wedding Card')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>Copy Share Link</span>
                      </button>
                      <button className="dash-clean-btn" onClick={() => handleCopyLink('Digital RSVP Link')}>
                        <span>Preview Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RSVP Tracker Section */}
            {(invitationSubTab === 'all' || invitationSubTab === 'rsvp') && (
              <div className="dash-rsvp-box">
                <div className="dash-rsvp-header">
                  <div>
                    <h3 className="dash-sub-title">Live RSVP Responses</h3>
                    <p className="dash-sub-text">Track attending guests for Bridal Shower &amp; Wedding Day.</p>
                  </div>
                  <form onSubmit={handleAddGuest} className="dash-add-guest-form">
                    <input
                      type="text"
                      placeholder="Add guest name..."
                      value={newGuestName}
                      onChange={(e) => setNewGuestName(e.target.value)}
                      className="dash-input"
                    />
                    <select
                      value={newGuestEvent}
                      onChange={(e) => setNewGuestEvent(e.target.value as any)}
                      className="dash-select"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Bridal Shower">Bridal Shower</option>
                      <option value="Both">Both Events</option>
                    </select>
                    <button type="submit" className="dash-gold-btn">
                      + Add Guest
                    </button>
                  </form>
                </div>

                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Guest Name</th>
                        <th>Party Size</th>
                        <th>Event</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((g) => (
                        <tr key={g.id}>
                          <td style={{ fontWeight: 500, color: 'var(--color-dark)' }}>{g.name}</td>
                          <td>{g.party}</td>
                          <td>
                            <span className="dash-tag-event">{g.event}</span>
                          </td>
                          <td>
                            <span className={`dash-status-pill status-${g.status.toLowerCase()}`}>
                              {g.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB: DASHBOARD (Overview - Matches Screenshot 33 Recommended Vendors + Schedule + Budget) */}
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Invitation Shortcut Banner */}
            <div className="dash-invite-banner" onClick={() => setActiveTab('invitations')}>
              <div className="dash-invite-banner-left">
                <div className="dash-sparkle-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <div className="dash-invite-banner-title">Digital Invitations &amp; RSVP Live</div>
                  <div className="dash-invite-banner-desc">Manage your Bridal Shower &amp; Wedding invitation cards with guest response tracking.</div>
                </div>
              </div>
              <button className="dash-clean-btn">
                <span>View Cards &rarr;</span>
              </button>
            </div>

            {/* Recommended Salons & Vendors (matches Screenshot 33) */}
            <section className="dash-section">
              <div className="dash-section-header">
                <div>
                  <h2 className="dash-section-title">Recommended Salons &amp; Ateliers (4)</h2>
                  <p className="dash-section-subtitle">Private couture fitting suites across Kenya</p>
                </div>
                <button className="dash-link-more" onClick={onOpenBooking}>
                  Explore all &or;
                </button>
              </div>

              <div className="dash-vendor-grid">
                {/* Vendor 1 */}
                <div className="dash-vendor-card">
                  <div className="dash-vendor-img-wrap">
                    <span className="dash-match-tag">98% match</span>
                    <img
                      src="/images/bridal-gown-mulberry.jpg"
                      alt="Karen Flagship Atelier"
                      className="dash-vendor-img"
                    />
                  </div>
                  <div className="dash-vendor-body">
                    <h3 className="dash-vendor-name">Karen Flagship Atelier</h3>
                    <div className="dash-vendor-type">Haute Couture Bridal &bull; Private Suite</div>
                    <div className="dash-vendor-price">Karen Road, Karen, Nairobi</div>
                    <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Vendor 2 */}
                <div className="dash-vendor-card">
                  <div className="dash-vendor-img-wrap">
                    <span className="dash-match-tag">96% match</span>
                    <img
                      src="/images/bridal-shoes-sandals.jpg"
                      alt="Westlands Styling Suite"
                      className="dash-vendor-img"
                    />
                  </div>
                  <div className="dash-vendor-body">
                    <h3 className="dash-vendor-name">Westlands Styling Suite</h3>
                    <div className="dash-vendor-type">Bridal Footwear &bull; Accessories</div>
                    <div className="dash-vendor-price">Rhapta Road, Westlands, Nairobi</div>
                    <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Vendor 3 */}
                <div className="dash-vendor-card">
                  <div className="dash-vendor-img-wrap">
                    <span className="dash-match-tag">95% match</span>
                    <img
                      src="/images/bridal-veil-cathedral.jpg"
                      alt="Gigiri Private Suite"
                      className="dash-vendor-img"
                    />
                  </div>
                  <div className="dash-vendor-body">
                    <h3 className="dash-vendor-name">Gigiri Private Suite</h3>
                    <div className="dash-vendor-type">Cathedral Veils &bull; Fine Tulle</div>
                    <div className="dash-vendor-price">UN Crescent, Gigiri, Nairobi</div>
                    <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Vendor 4 */}
                <div className="dash-vendor-card">
                  <div className="dash-vendor-img-wrap">
                    <span className="dash-match-tag">94% match</span>
                    <img
                      src="/images/bridal-jewelry-earrings.jpg"
                      alt="Mombasa Coastal Atelier"
                      className="dash-vendor-img"
                    />
                  </div>
                  <div className="dash-vendor-body">
                    <h3 className="dash-vendor-name">Mombasa Coastal Atelier</h3>
                    <div className="dash-vendor-type">Destination Weddings &bull; Jewelry</div>
                    <div className="dash-vendor-price">Nyali, Mombasa, Kenya</div>
                    <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Row: Budget Tracker & Schedule (matches Screenshot 33) */}
            <div className="dash-bottom-grid">
              {/* Budget Tracker */}
              <div className="dash-card-box">
                <div className="dash-box-header">
                  <h3 className="dash-box-title">Budget Tracker</h3>
                  <span className="dash-chart-icon">↗</span>
                </div>
                <div className="dash-donut-wrap">
                  <div className="dash-donut-visual">
                    <div className="dash-donut-center">
                      <span className="dash-donut-val">65%</span>
                      <span className="dash-donut-sub">Committed</span>
                    </div>
                  </div>
                </div>
                <div className="dash-bar-row">
                  <div className="dash-bar-item">
                    <div className="dash-bar-desc">
                      <span>Gowns &amp; Veil Couture</span>
                      <span>45%</span>
                    </div>
                    <div className="dash-bar-track">
                      <div className="dash-bar-fill bar-gold" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="dash-bar-item">
                    <div className="dash-bar-desc">
                      <span>Venue &amp; Private Fitting</span>
                      <span>30%</span>
                    </div>
                    <div className="dash-bar-track">
                      <div className="dash-bar-fill bar-pink" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div className="dash-bar-item">
                    <div className="dash-bar-desc">
                      <span>Invitations &amp; Decor</span>
                      <span>55%</span>
                    </div>
                    <div className="dash-bar-track">
                      <div className="dash-bar-fill bar-blue" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="dash-card-box">
                <div className="dash-box-header">
                  <h3 className="dash-box-title">Schedule</h3>
                  <button className="dash-dots-btn" onClick={onOpenBooking}>&vellip;</button>
                </div>
                <div className="dash-schedule-list">
                  <div className="dash-schedule-item">
                    <div className="dash-schedule-time">01:30 PM</div>
                    <div className="dash-schedule-body">
                      <div className="dash-schedule-name">&bull; Cake Tasting &amp; Veil Fitting</div>
                      <div className="dash-schedule-type">Booking Reminder &bull; Karen Atelier</div>
                    </div>
                  </div>
                  <div className="dash-schedule-item highlight">
                    <div className="dash-schedule-time">08:00 PM</div>
                    <div className="dash-schedule-body">
                      <div className="dash-schedule-name">&bull; Grand Wedding Date</div>
                      <div className="dash-schedule-type">Wedding Highlight &bull; Nairobi</div>
                    </div>
                  </div>
                  <div className="dash-schedule-item">
                    <div className="dash-schedule-time">09:00 AM</div>
                    <div className="dash-schedule-body">
                      <div className="dash-schedule-name">&bull; Floral Design &amp; Silhouette Review</div>
                      <div className="dash-schedule-type">Atelier Appointment &bull; Westlands</div>
                    </div>
                  </div>
                </div>
                <button className="dash-gold-btn btn-full" style={{ marginTop: '20px' }} onClick={onOpenBooking}>
                  Book Private Atelier Fitting
                </button>
              </div>
            </div>
          </>
        )}

        {/* TAB: FITTINGS / BOOKING */}
        {activeTab === 'booking' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Private Atelier Fittings</h2>
                <p className="dash-section-subtitle">Dedicated appointments at Karen, Westlands, Gigiri, and Mombasa</p>
              </div>
              <button className="dash-gold-btn" onClick={onOpenBooking}>
                + Book New Fitting
              </button>
            </div>
            <div className="dash-card-box">
              <div className="dash-schedule-item">
                <div className="dash-schedule-time">Karen Atelier</div>
                <div className="dash-schedule-body">
                  <div className="dash-schedule-name">Private Silk Gown &amp; Veil Styling Session</div>
                  <div className="dash-schedule-type">Karen Road, Nairobi &bull; Champagne Consultation Included</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: BUDGET */}
        {activeTab === 'budget' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Wedding Budget Planner</h2>
                <p className="dash-section-subtitle">Total estimated budget: $45,200</p>
              </div>
            </div>
            <div className="dash-card-box">
              <div className="dash-bar-row">
                <div className="dash-bar-item">
                  <div className="dash-bar-desc">
                    <span>Haute Couture Gowns &amp; Veils</span>
                    <span>$18,500</span>
                  </div>
                  <div className="dash-bar-track"><div className="dash-bar-fill bar-gold" style={{ width: '60%' }}></div></div>
                </div>
                <div className="dash-bar-item">
                  <div className="dash-bar-desc">
                    <span>Jewelry &amp; Heirloom Accessories</span>
                    <span>$6,200</span>
                  </div>
                  <div className="dash-bar-track"><div className="dash-bar-fill bar-pink" style={{ width: '40%' }}></div></div>
                </div>
                <div className="dash-bar-item">
                  <div className="dash-bar-desc">
                    <span>Invitations &amp; Stationery</span>
                    <span>$2,800</span>
                  </div>
                  <div className="dash-bar-track"><div className="dash-bar-fill bar-blue" style={{ width: '30%' }}></div></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: SCHEDULE */}
        {activeTab === 'schedule' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Calendar &amp; Timeline</h2>
                <p className="dash-section-subtitle">Upcoming appointments &amp; key milestones</p>
              </div>
              <button className="dash-gold-btn" onClick={onOpenBooking}>
                + Add Appointment
              </button>
            </div>
            <div className="dash-card-box">
              <div className="dash-schedule-item">
                <div className="dash-schedule-time">14 Nov 2026</div>
                <div className="dash-schedule-body">
                  <div className="dash-schedule-name">Bridal Shower &bull; Karen Country Club</div>
                  <div className="dash-schedule-type">Champagne &amp; Pearls Reception</div>
                </div>
              </div>
              <div className="dash-schedule-item highlight">
                <div className="dash-schedule-time">12 Dec 2026</div>
                <div className="dash-schedule-body">
                  <div className="dash-schedule-name">Official Wedding Ceremony &bull; Nairobi</div>
                  <div className="dash-schedule-type">Karen Blixen Gardens</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
