import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="section experience-section" id="about">
      <div className="container grid-2">
        <div className="exp-text">
          <span>THE AURA EXPERIENCE</span>
          <h2>Crafted for the Modern, Discerning Bride</h2>
          <p>
            Every piece in our boutique is thoughtfully designed or selected from ethical atelier partners. We believe shopping for your wedding should be calm, effortless, and filled with joy.
          </p>
          <ul className="exp-list">
            <li>
              <strong>Bespoke Sizing & Fit:</strong> Detailed measurement guides & custom fitting advice.
            </li>
            <li>
              <strong>Eco-Conscious Packaging:</strong> Sustainable luxury storage boxes and garment bags.
            </li>
            <li>
              <strong>At-Home Try-On:</strong> Select gowns eligible for sample home fittings.
            </li>
          </ul>
        </div>
        <div className="exp-img-wrapper">
          <img
            src="/images/bridal-gown-1.jpg"
            alt="Aura Bridal Atelier"
            className="exp-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
