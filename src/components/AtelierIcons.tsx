import React, { useState } from 'react';
import { Product } from '../types';

interface AtelierIconsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenQuickView: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onViewAllCreations: () => void;
}

export const AtelierIcons: React.FC<AtelierIconsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
  onViewAllCreations,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter based on the tabs shown in screenshot:
  // "All Creations", "A-Line & Ballgowns", "Mulberry Silk Slips", "Corsetry", "Veils"
  const getFilteredIcons = () => {
    if (activeTab === 'aline') {
      return products.filter((p) => p.silhouette === 'a-line');
    }
    if (activeTab === 'slips') {
      return products.filter((p) => p.silhouette === 'sheath');
    }
    if (activeTab === 'corset') {
      return products.filter((p) => p.name.includes('Corset') || p.name.includes('Ophelia'));
    }
    if (activeTab === 'veils') {
      return products.filter((p) => p.category === 'veils' || p.category === 'jewelry');
    }
    // Default: show the 3 featured icons or top creations
    const icons = products.filter((p) => p.isIcon);
    return icons.length >= 3 ? icons.slice(0, 3) : products.slice(0, 3);
  };

  const currentItems = getFilteredIcons();

  return (
    <section className="section" id="icons-section">
      <div className="container">
        {/* Section Header Split */}
        <div className="section-header-split">
          <div>
            <span className="section-kicker">HIGH COUTURE</span>
            <h2 className="section-heading">The Atelier Icons</h2>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Creations
            </button>
            <button
              className={`filter-tab ${activeTab === 'aline' ? 'active' : ''}`}
              onClick={() => setActiveTab('aline')}
            >
              A-Line &amp; Ballgowns
            </button>
            <button
              className={`filter-tab ${activeTab === 'slips' ? 'active' : ''}`}
              onClick={() => setActiveTab('slips')}
            >
              Mulberry Silk Slips
            </button>
            <button
              className={`filter-tab ${activeTab === 'corset' ? 'active' : ''}`}
              onClick={() => setActiveTab('corset')}
            >
              Corsetry
            </button>
            <button
              className={`filter-tab ${activeTab === 'veils' ? 'active' : ''}`}
              onClick={() => setActiveTab('veils')}
            >
              Veils
            </button>
          </div>
        </div>

        {/* 3-Column Product Showcase */}
        <div className="icons-grid">
          {currentItems.map((p) => {
            const isWish = wishlist.includes(p.id);

            return (
              <div
                key={p.id}
                className="icon-card"
                onClick={() => onOpenQuickView(p.id)}
              >
                <div className="icon-card-media">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                  />

                  {/* Badge pill in bottom-left */}
                  {p.badge && (
                    <span className="card-badge-pill">
                      {p.badge}
                    </span>
                  )}

                  {/* Wishlist toggle circle in top-right */}
                  <button
                    className={`card-wishlist-circle ${isWish ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(p.id);
                    }}
                    title={isWish ? 'Remove Favorite' : 'Save Favorite'}
                    aria-label="Wishlist"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={isWish ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  {/* Quick Action on hover */}
                  <div className="card-quick-actions">
                    <button
                      className="btn btn-white btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p.id);
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>

                <div className="card-meta">
                  <div className="card-title-row">
                    <h3 className="card-title">{p.name}</h3>
                    <span className="card-price">${p.price.toLocaleString()}</span>
                  </div>
                  <p className="card-subtitle">
                    {p.subtitle || p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Creations link */}
        <div className="view-all-creations-wrapper">
          <button
            className="link-arrow"
            onClick={onViewAllCreations}
          >
            <span>VIEW ALL {products.length} CREATIONS</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
