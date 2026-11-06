import React, { useState, useMemo } from 'react';
import { UserProfile } from '../types';

interface AccountDashboardProps {
  user: UserProfile;
  onBackToStore: () => void;
  onLogout: () => void;
  onOpenBooking: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

interface GuestRSVP {
  id: string;
  name: string;
  party: number;
  event: 'Wedding' | 'Bridal Shower' | 'Both';
  status: 'Attending' | 'Awaiting' | 'Declined';
}

const ALL_VENDORS = [
  // Page 1 (matches Screenshot 33 exact labels)
  {
    id: 'v1',
    name: 'Bella Flora Studio',
    category: 'Photography',
    price: '$3,500 - $8,000',
    location: 'San Francisco, CA',
    match: '98% match',
    image: '/images/real-wedding-paris.jpg',
  },
  {
    id: 'v2',
    name: 'Bella Flora Studio',
    category: 'Videography',
    price: '$3,500 - $8,000',
    location: 'San Francisco, CA',
    match: '98% match',
    image: '/images/real-wedding-ravello.jpg',
  },
  {
    id: 'v3',
    name: 'Bella Flora Studio',
    category: 'Floral Design',
    price: '$3,500 - $8,000',
    location: 'San Francisco, CA',
    match: '98% match',
    image: '/images/bridal-gown-1.jpg',
  },
  {
    id: 'v4',
    name: 'Bella Flora Studio',
    category: 'Catering',
    price: '$3,500 - $8,000',
    location: 'San Francisco, CA',
    match: '98% match',
    image: '/images/wedding-catering.jpg',
  },
  // Page 2
  {
    id: 'v5',
    name: 'Karen Flagship Atelier',
    category: 'Haute Couture Bridal',
    price: '$4,200 - $12,000',
    location: 'Karen Road, Karen, Nairobi',
    match: '98% match',
    image: '/images/gown-vivienne.jpg',
  },
  {
    id: 'v6',
    name: 'Westlands Styling Suite',
    category: 'Bridal Footwear & Accessories',
    price: '$800 - $2,500',
    location: 'Rhapta Road, Westlands, Nairobi',
    match: '96% match',
    image: '/images/bridal-shoes-sandals.jpg',
  },
  {
    id: 'v7',
    name: 'Gigiri Private Suite',
    category: 'Cathedral Veils & Fine Tulle',
    price: '$650 - $1,800',
    location: 'UN Crescent, Gigiri, Nairobi',
    match: '95% match',
    image: '/images/bridal-veil.jpg',
  },
  {
    id: 'v8',
    name: 'Mombasa Coastal Atelier',
    category: 'Destination Weddings & Jewelry',
    price: '$1,200 - $5,000',
    location: 'Nyali, Mombasa, Kenya',
    match: '94% match',
    image: '/images/pearl-earrings.jpg',
  },
  // Page 3
  {
    id: 'v9',
    name: 'Serena Garden Decor',
    category: 'Ceremony Botanical Architecture',
    price: '$2,800 - $7,500',
    location: 'Nairobi Central, Kenya',
    match: '97% match',
    image: '/images/bridal-gown-2.jpg',
  },
  {
    id: 'v10',
    name: 'Lumière Fine Strings',
    category: 'Acoustic & String Quartet',
    price: '$1,500 - $4,200',
    location: 'Lavington, Nairobi',
    match: '96% match',
    image: '/images/bridal-gown-3.jpg',
  },
  {
    id: 'v11',
    name: 'Maison du Champagne',
    category: 'Private Sommelier & Bar Service',
    price: '$2,200 - $6,000',
    location: 'Karen, Nairobi',
    match: '95% match',
    image: '/images/bridal-clutch.jpg',
  },
  {
    id: 'v12',
    name: 'Heirloom Fine Pearls',
    category: 'Custom Bridal Adornments',
    price: '$950 - $3,800',
    location: 'Westlands, Nairobi',
    match: '93% match',
    image: '/images/jewelry-set.jpg',
  },
];

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  user,
  onBackToStore,
  onLogout,
  onOpenBooking,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vendors' | 'booking' | 'budget' | 'schedule' | 'messages' | 'setting' | 'profile' | 'invitations'>('dashboard');
  const [vendorPage, setVendorPage] = useState<number>(1);
  const [invitationSubTab, setInvitationSubTab] = useState<'all' | 'shower' | 'wedding' | 'rsvp'>('all');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Profile management states
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileRole, setProfileRole] = useState(user.role || 'Bride');
  const [profileWeddingDate, setProfileWeddingDate] = useState(user.weddingDate || '12 December 2026');
  const [profilePartner, setProfilePartner] = useState(user.partnerName || 'David Kamau');
  const [profileVenue, setProfileVenue] = useState(user.venue || 'Karen Blixen Coffee Garden, Nairobi');
  const [profileAvatar, setProfileAvatar] = useState<string | undefined>(user.avatarUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCuratedAvatars, setShowCuratedAvatars] = useState(false);

  React.useEffect(() => {
    setProfileName(user.name);
    setProfileEmail(user.email);
    setProfileRole(user.role || 'Bride');
    setProfileWeddingDate(user.weddingDate || '12 December 2026');
    setProfilePartner(user.partnerName || 'David Kamau');
    setProfileVenue(user.venue || 'Karen Blixen Coffee Garden, Nairobi');
    setProfileAvatar(user.avatarUrl);
  }, [user]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileAvatar(result);
        if (onUpdateUser) {
          onUpdateUser({
            ...user,
            name: profileName,
            email: profileEmail,
            role: profileRole,
            weddingDate: profileWeddingDate,
            partnerName: profilePartner,
            venue: profileVenue,
            avatarUrl: result,
          });
        }
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: profileName.trim() || user.name,
        email: profileEmail.trim() || user.email,
        role: profileRole,
        weddingDate: profileWeddingDate,
        partnerName: profilePartner,
        venue: profileVenue,
        avatarUrl: profileAvatar,
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

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

  const currentVendors = useMemo(() => {
    const start = (vendorPage - 1) * 4;
    return ALL_VENDORS.slice(start, start + 4);
  }, [vendorPage]);

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
            className={`dash-nav-btn ${activeTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendors')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Vendors</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('booking')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Booking</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
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

          <button
            className={`dash-nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Messages</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'setting' ? 'active' : ''}`}
            onClick={() => setActiveTab('setting')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Setting</span>
          </button>

          <button
            className={`dash-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </button>
        </nav>

        <div className="dash-sidebar-footer">
          <button className="dash-logout-btn" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

          <div className="dash-user-badge" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }} title="View & Edit Profile">
            <div className="dash-avatar-circle" style={{ overflow: 'hidden' }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="dash-user-info">
              <div className="dash-user-name">{user.name}</div>
              <div className="dash-user-role">{user.role || 'Bride'} &bull; Nairobi</div>
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
                <p className="dash-section-subtitle">Bridal shower, invites & guest list.</p>
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

            {/* Recommended Vendors (8) (matches Screenshot 33) */}
            <section className="dash-section">
              <div className="dash-section-header">
                <div>
                  <h2 className="dash-section-title">Recommended Vendors (8)</h2>
                  <p className="dash-section-subtitle">Private couture fitting suites and curated wedding professionals</p>
                </div>
                <button className="dash-link-more" onClick={() => setActiveTab('vendors')}>
                  Explore all &or;
                </button>
              </div>

              <div className="dash-vendor-grid">
                {currentVendors.map((vendor) => (
                  <div key={vendor.id} className="dash-vendor-card">
                    <div className="dash-vendor-img-wrap">
                      <span className="dash-match-tag">{vendor.match}</span>
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="dash-vendor-img"
                      />
                    </div>
                    <div className="dash-vendor-body">
                      <h3 className="dash-vendor-name">{vendor.name}</h3>
                      <div className="dash-vendor-type">{vendor.category}</div>
                      <div className="dash-vendor-price">{vendor.price} &bull; {vendor.location}</div>
                      <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vendor Pagination matching Screenshot 33 */}
              <div className="dash-pagination">
                <button
                  type="button"
                  className="dash-page-nav-btn"
                  disabled={vendorPage === 1}
                  onClick={() => setVendorPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`dash-page-num-btn ${vendorPage === num ? 'active' : ''}`}
                    onClick={() => setVendorPage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  className="dash-page-nav-btn"
                  disabled={vendorPage === 3}
                  onClick={() => setVendorPage((p) => Math.min(3, p + 1))}
                >
                  Next
                </button>
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

        {/* TAB: VENDORS */}
        {activeTab === 'vendors' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Wedding Vendors Directory</h2>
                <p className="dash-section-subtitle">Curated photographers, florists, caterers, and private suites</p>
              </div>
              <button className="dash-gold-btn" onClick={onOpenBooking}>
                + Inquire Vendor
              </button>
            </div>
            <div className="dash-vendor-grid">
              {ALL_VENDORS.map((v) => (
                <div key={v.id} className="dash-vendor-card">
                  <div className="dash-vendor-img-wrap">
                    <span className="dash-match-tag">{v.match}</span>
                    <img src={v.image} alt={v.name} className="dash-vendor-img" />
                  </div>
                  <div className="dash-vendor-body">
                    <h3 className="dash-vendor-name">{v.name}</h3>
                    <div className="dash-vendor-type">{v.category}</div>
                    <div className="dash-vendor-price">{v.price} &bull; {v.location}</div>
                    <button className="dash-gold-btn btn-full" onClick={onOpenBooking}>
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: MESSAGES */}
        {activeTab === 'messages' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Messages &amp; Atelier Concierge</h2>
                <p className="dash-section-subtitle">Direct communication with your personal bridal stylists</p>
              </div>
            </div>
            <div className="dash-card-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid #EDF2F7' }}>
                  <div className="dash-avatar-circle" style={{ backgroundColor: '#C89D35', color: '#FFF' }}>E</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1A202C', fontSize: '14px' }}>Elena Vance &bull; Lead Bridal Stylist</div>
                    <div style={{ fontSize: '13px', color: '#4A5568', marginTop: '4px' }}>
                      "Your silk tulle veil has arrived from our Paris atelier! We have scheduled it for your private tasting fitting on Saturday."
                    </div>
                    <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '6px' }}>Yesterday at 3:45 PM</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div className="dash-avatar-circle" style={{ backgroundColor: '#4A5568', color: '#FFF' }}>C</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1A202C', fontSize: '14px' }}>Karen Concierge Desk</div>
                    <div style={{ fontSize: '13px', color: '#4A5568', marginTop: '4px' }}>
                      "Champagne consultation confirmed for 2 guests. We look forward to welcoming you."
                    </div>
                    <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '6px' }}>2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: SETTING */}
        {activeTab === 'setting' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Wedding Settings</h2>
                <p className="dash-section-subtitle">Manage wedding countdown, venue, and notification preferences</p>
              </div>
            </div>
            <div className="dash-card-box" style={{ padding: '24px', maxWidth: '640px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase' }}>Wedding Date</label>
                  <input type="text" readOnly value="12 December 2026" className="dash-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase' }}>Ceremony Venue</label>
                  <input type="text" readOnly value="Karen Blixen Coffee Garden &bull; Nairobi" className="dash-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase' }}>Guest Capacity</label>
                  <input type="text" readOnly value="184 Guests" className="dash-input" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: PROFILE */}
        {activeTab === 'profile' && (
          <section className="dash-section">
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Bride Profile &amp; Photo</h2>
                <p className="dash-section-subtitle">Upload your photo and customize your atelier profile</p>
              </div>
            </div>

            <div className="dash-card-box" style={{ padding: '32px 28px', maxWidth: '640px' }}>
              {saveSuccess && (
                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Profile and photo updated successfully!</span>
                </div>
              )}

              {/* Photo Upload Area */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid #EDF2F7', marginBottom: '24px' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#FAF5EE',
                      border: '3px solid #C89D35',
                      boxShadow: '0 4px 14px rgba(200, 157, 53, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      fontWeight: 600,
                      color: '#C89D35',
                    }}
                  >
                    {profileAvatar ? (
                      <img
                        src={profileAvatar}
                        alt={profileName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      profileName.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />

                  {/* Camera overlay button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: '#C89D35',
                      color: '#FFF',
                      border: '2px solid #FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                    title="Upload new photo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </button>
                </div>

                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1A202C', margin: '0 0 4px' }}>
                    {profileName}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#718096', margin: '0 0 12px' }}>
                    Click below to upload a profile photo from your device.
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="dash-gold-btn"
                      style={{ padding: '7px 14px', fontSize: '12px' }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      <span>Upload Photo</span>
                    </button>

                    {profileAvatar && (
                      <button
                        type="button"
                        className="dash-clean-btn"
                        style={{ padding: '7px 12px', fontSize: '12px', color: '#E53E3E' }}
                        onClick={() => {
                          setProfileAvatar(undefined);
                          if (onUpdateUser) {
                            onUpdateUser({
                              ...user,
                              avatarUrl: undefined,
                            });
                          }
                        }}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick sample bridal portraits to select from */}
              <div style={{ marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowCuratedAvatars((prev) => !prev)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    cursor: 'pointer',
                    color: '#718096',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: showCuratedAvatars ? '12px' : '0',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C89D35')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#718096')}
                >
                  <span>Choose a curated atelier avatar</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showCuratedAvatars ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {showCuratedAvatars && (
                  <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                    {[
                      { label: 'Paris Bride', img: '/images/real-wedding-paris.jpg' },
                      { label: 'Ravello Bride', img: '/images/real-wedding-ravello.jpg' },
                      { label: 'Veil Bride', img: '/images/bridal-veil.jpg' },
                      { label: 'Silk Gown', img: '/images/gown-vivienne.jpg' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setProfileAvatar(preset.img);
                          if (onUpdateUser) {
                            onUpdateUser({
                              ...user,
                              avatarUrl: preset.img,
                            });
                          }
                          setSaveSuccess(true);
                          setTimeout(() => setSaveSuccess(false), 3000);
                        }}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          padding: 0,
                          border: profileAvatar === preset.img ? '2.5px solid #C89D35' : '1px solid #E2E8F0',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease',
                        }}
                        title={preset.label}
                      >
                        <img src={preset.img} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Details Edit Form */}
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Full Name</label>
                    <input
                      type="text"
                      className="dash-input"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Role</label>
                    <input
                      type="text"
                      className="dash-input"
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      className="dash-input"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Partner's Name</label>
                    <input
                      type="text"
                      className="dash-input"
                      value={profilePartner}
                      onChange={(e) => setProfilePartner(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Wedding Date</label>
                    <input
                      type="text"
                      className="dash-input"
                      value={profileWeddingDate}
                      onChange={(e) => setProfileWeddingDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4A5568', textTransform: 'uppercase', marginBottom: '6px' }}>Ceremony Venue / City</label>
                    <input
                      type="text"
                      className="dash-input"
                      value={profileVenue}
                      onChange={(e) => setProfileVenue(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="dash-gold-btn" style={{ padding: '10px 24px', fontSize: '13.5px' }}>
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
