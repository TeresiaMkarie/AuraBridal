import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onReserveFitting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onReserveFitting }) => {
  return (
    <section className="hero" id="hero">
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-content">
          <span className="subtitle">2026 ATELIER COLLECTION</span>
          <h1>Pure Form &amp; Ethereal Lace</h1>
          <p>
            Handcrafted French Chantilly and sculptured Mulberry silks, tailored for memorable grace.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-white"
              onClick={onExplore}
            >
              EXPLORE COLLECTION
            </button>
            <button
              className="btn btn-transparent"
              onClick={onReserveFitting}
            >
              RESERVE FITTING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
