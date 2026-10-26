import React from 'react';

export const EditorialQuote: React.FC = () => {
  return (
    <section className="quote-section" id="quote-section">
      <div className="quote-content">
        <blockquote className="quote-text">
          &ldquo;Finding my gown at Aura Bridal felt like stepping into an intimate Parisian salon. Unmatched grace, breathtaking fabrics, and pure couture craftsmanship.&rdquo;
        </blockquote>
        <div style={{ textAlign: 'center' }}>
          <span className="quote-author">ELEANOR MONTGOMERY</span>
          <span className="quote-location">Villa Cimbrone, Ravello Bride</span>
        </div>
      </div>
    </section>
  );
};
