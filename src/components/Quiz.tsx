import React, { useState } from 'react';
import { Product, QuizAnswers } from '../types';
import { PRODUCTS } from '../data/products';

interface QuizProps {
  onAddToCart: (productId: string) => void;
  onOpenQuickView: (productId: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onAddToCart, onOpenQuickView }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSelectOption = (key: keyof QuizAnswers, value: any) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(1);
    setShowResult(false);
  };

  // Recommendations calculation
  let recommended: Product[] = [];
  if (showResult) {
    recommended = PRODUCTS.filter(
      (p) => p.vibe === answers.vibe || p.silhouette === answers.silhouette
    );
    if (recommended.length === 0) {
      recommended = PRODUCTS.slice(0, 3);
    }
  }

  // Dynamic recommendation summary text
  const getRecommendationSummary = () => {
    if (answers.vibe === 'modern') {
      return 'Based on your choices, we recommend modern liquid Mulberry silk silhouettes with minimalist pearl embellishments and sculptural architectural corsetry.';
    } else if (answers.vibe === 'classic') {
      return 'Based on your choices, we recommend timeless handcrafted French Chantilly lace ballgowns, cathedral tulle veils, and luminous heirloom freshwater pearls.';
    } else {
      return 'Based on your choices, we recommend romantic botanical tulles, effortless bias-cut sheath lines, and organic pearl accents.';
    }
  };

  return (
    <section className="section quiz-section" id="quiz">
      <div className="container">
        <div className="quiz-card">
          <div className="section-title" style={{ marginBottom: '24px' }}>
            <span>PERSONALIZED RECOMMENDATION</span>
            <h2>Find Your Signature Bridal Style</h2>
          </div>
          <p className="quiz-intro">
            Answer 3 simple questions to unlock a curated atelier selection tailored specifically to your venue, aesthetic, and budget.
          </p>

          {!showResult ? (
            <div className="quiz-wizard" id="quizWizard">
              {/* Step indicator */}
              <div className="quiz-progress-bar-wrapper">
                <div className="quiz-steps-indicators">
                  <span className={`quiz-step-dot ${currentStep >= 1 ? 'active' : ''}`}>1. Venue</span>
                  <span className="quiz-step-divider">&mdash;</span>
                  <span className={`quiz-step-dot ${currentStep >= 2 ? 'active' : ''}`}>2. Silhouette</span>
                  <span className="quiz-step-divider">&mdash;</span>
                  <span className={`quiz-step-dot ${currentStep >= 3 ? 'active' : ''}`}>3. Budget</span>
                </div>
              </div>

              {/* Step 1: Dream Venue */}
              {currentStep === 1 && (
                <div className="quiz-step active" data-step="1">
                  <h3>1. What best describes your dream wedding venue?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('vibe', 'classic')}
                    >
                      <span className="quiz-opt-title">Grand Cathedral or Estate</span>
                      <span className="quiz-opt-desc">Historic architecture &amp; sweeping classic grandeur</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('vibe', 'modern')}
                    >
                      <span className="quiz-opt-title">Modern Gallery or Rooftop</span>
                      <span className="quiz-opt-desc">Minimalist clean lines &amp; contemporary skyline</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('vibe', 'boho')}
                    >
                      <span className="quiz-opt-title">Botanical Garden or Beach</span>
                      <span className="quiz-opt-desc">Sun-drenched nature, sea breeze &amp; organic romance</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Silhouette */}
              {currentStep === 2 && (
                <div className="quiz-step active" data-step="2">
                  <h3>2. Which silhouette speaks to you most?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('silhouette', 'a-line')}
                    >
                      <span className="quiz-opt-title">Classic A-Line &amp; Ballgown</span>
                      <span className="quiz-opt-desc">Timeless cinched corsetry &amp; regal graceful volume</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('silhouette', 'sheath')}
                    >
                      <span className="quiz-opt-title">Sleek Sheath &amp; Column</span>
                      <span className="quiz-opt-desc">Fluid body-skimming bias-cut Mulberry silk slip</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('silhouette', 'mermaid')}
                    >
                      <span className="quiz-opt-title">Dramatic Mermaid &amp; Fit</span>
                      <span className="quiz-opt-desc">Sculpted structure with dramatic fit-and-flare tail</span>
                    </button>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => setCurrentStep(1)}
                    >
                      &larr; Back to Venue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {currentStep === 3 && (
                <div className="quiz-step active" data-step="3">
                  <h3>3. What is your preferred gown budget range?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('budget', 'under1000')}
                    >
                      <span className="quiz-opt-title">Under $1,000</span>
                      <span className="quiz-opt-desc">Curated atelier jewelry, fine veils &amp; accessories</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('budget', '1000-2500')}
                    >
                      <span className="quiz-opt-title">$1,000 &ndash; $2,500</span>
                      <span className="quiz-opt-desc">Handcrafted Mulberry silk gowns &amp; tailored slips</span>
                    </button>
                    <button
                      className="quiz-opt"
                      onClick={() => handleSelectOption('budget', 'over2500')}
                    >
                      <span className="quiz-opt-title">$2,500+</span>
                      <span className="quiz-opt-desc">Haute couture runway editions &amp; bespoke creations</span>
                    </button>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => setCurrentStep(2)}
                    >
                      &larr; Back to Silhouette
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-result" id="quizResult">
              <span className="section-kicker">CURATED FOR YOUR CELEBRATION</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginTop: '6px' }}>
                Your Signature Style Curation
              </h3>
              <p id="quizResultText" style={{ color: 'var(--color-muted)', margin: '14px auto 32px', maxWidth: '640px', lineHeight: 1.7 }}>
                {getRecommendationSummary()}
              </p>
              
              <div className="quiz-recommended-grid" id="quizRecommendedGrid">
                {recommended.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="product-card"
                    style={{ textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => onOpenQuickView(p.id)}
                  >
                    <div className="product-img-wrapper">
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ aspectRatio: '3/4', objectFit: 'cover', width: '100%' }}
                      />
                      {p.badge && (
                        <span className="card-badge-pill" style={{ bottom: '10px', left: '10px' }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px' }}>
                      <span className="product-cat">{p.category}</span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '18px',
                          margin: '4px 0 6px',
                          color: 'var(--color-dark)',
                        }}
                      >
                        {p.name}
                      </h4>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginTop: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--color-border-subtle)',
                        }}
                      >
                        <span>${p.price.toLocaleString()}</span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p.id);
                          }}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px' }}>
                <button
                  className="btn btn-outline-dark"
                  id="resetQuizBtn"
                  onClick={handleReset}
                >
                  RETAKE STYLE QUIZ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
