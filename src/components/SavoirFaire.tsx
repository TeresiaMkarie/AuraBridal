import React from 'react';

interface SavoirFaireProps {
  onRequestBespoke: () => void;
}

export const SavoirFaire: React.FC<SavoirFaireProps> = ({ onRequestBespoke }) => {
  return (
    <section className="section savoir-faire-section" id="savoir-faire">
      <div className="container">
        <div className="savoir-faire-grid">
          {/* Left Column: Editorial Manifesto */}
          <div className="savoir-faire-text">
            <span className="section-kicker">ATELIER SAVOIR-FAIRE</span>
            <h2 className="section-heading">Bespoke Tailoring by Master Couturiers</h2>
            <p>
              Every Aura creation is meticulously cut, fitted, and hand-finished in our European ateliers using heritage techniques preserved through generations.
            </p>
            <div className="savoir-faire-action-row">
              <button
                className="btn btn-primary"
                onClick={onRequestBespoke}
              >
                REQUEST BESPOKE
              </button>
              <span className="production-timeline">
                10 &ndash; 12 Weeks Production
              </span>
            </div>
          </div>

          {/* Right Column: 2x2 Pillars Grid */}
          <div className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                {/* Spindle / Loom Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Made in France &amp; Italy</h3>
              <p>Centuries of woven silk mastery from Lyon and Lake Como.</p>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                {/* Champagne glass / tasting icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 22h8M12 15v7M17 3l-5 9-5-9z" />
                  <path d="M7 6h10" />
                </svg>
              </div>
              <h3>Reserve Tastings</h3>
              <p>Vintage champagne paired with an intimate bridal salon experience.</p>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                {/* Scissors icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3" />
                  <path d="M8.12 8.12L12 12m0 0l5.88 5.88M20 4L8.12 15.88" />
                  <circle cx="6" cy="18" r="3" />
                </svg>
              </div>
              <h3>Unlimited Tailoring</h3>
              <p>Precision silhouette adjustments up to your wedding morning.</p>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                {/* 3D Silhouette / View Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3>3D Silhouette Previews</h3>
              <p>Precision custom drape mapping before first stitch.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
