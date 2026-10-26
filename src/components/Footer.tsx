import React, { useState } from 'react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onShowToast(`✨ Thank you. You are now subscribed to The Gazette with ${email}.`);
    setEmail('');
  };

  return (
    <footer className="footer" id="salons-section">
      <div className="container footer-grid">
        {/* Col 1: Brand & Craft */}
        <div className="footer-col">
          <h3 className="footer-logo">AURA BRIDAL</h3>
          <p>
            Haute couture bridal atelier crafting timeless romantic silhouettes for the modern bride.
          </p>
          <div className="footer-cities">
            NAIROBI &bull; WESTLANDS &bull; KAREN &bull; MOMBASA
          </div>
        </div>

        {/* Col 2: Salons */}
        <div className="footer-col">
          <h4>KENYA SALONS</h4>
          <div className="footer-address">
            <strong>Karen Flagship</strong> &mdash; Karen Road, Nairobi
          </div>
          <div className="footer-address">
            <strong>Westlands Salon</strong> &mdash; Rhapta Road, Nairobi
          </div>
          <div className="footer-address">
            <strong>Gigiri Suite</strong> &mdash; UN Crescent, Nairobi
          </div>
          <div className="footer-address">
            <strong>Mombasa Coastal</strong> &mdash; Nyali, Mombasa
          </div>
        </div>

        {/* Col 3: Client Care */}
        <div className="footer-col">
          <h4>CLIENT CARE</h4>
          <button
            className="footer-link"
            onClick={onOpenBooking}
          >
            Private Appointments
          </button>
          <button
            className="footer-link"
            onClick={() => onShowToast('Every bespoke gown receives dedicated 10-12 week artisan couture construction.')}
          >
            Bespoke Process
          </button>
          <button
            className="footer-link"
            onClick={() => onShowToast('Complimentary acid-free archival storage preservation included with every gown.')}
          >
            Care &amp; Preservation
          </button>
          <button
            className="footer-link"
            onClick={() => onShowToast('Complimentary fitting adjustments across all our Kenya salons.')}
          >
            Complimentary Alterations
          </button>
          <button
            className="footer-link"
            onClick={onOpenQuiz}
          >
            Signature Style Match
          </button>
        </div>

        {/* Col 4: The Gazette */}
        <div className="footer-col">
          <h4>THE GAZETTE</h4>
          <p>Invitations to private trunk shows and debut collections.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              JOIN
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; 2026 Aura Bridal Atelier Kenya Ltd. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#hero" onClick={(e) => { e.preventDefault(); onShowToast('Privacy Policy: All client fittings and data remain strictly confidential.'); }}>
            Privacy Policy
          </a>
          <a href="#hero" onClick={(e) => { e.preventDefault(); onShowToast('Terms of Service: Atelier bespoke terms and salon appointment protocol.'); }}>
            Terms of Service
          </a>
          <a href="#hero" onClick={(e) => { e.preventDefault(); onShowToast('Accessibility: WCAG AA standards maintained across all digital salons.'); }}>
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
};
