import React from 'react';
import { Product, ActiveFilters } from '../types';

interface CatalogProps {
  products: Product[];
  filters: ActiveFilters;
  onFilterChange: (updated: Partial<ActiveFilters>) => void;
  onResetFilters: () => void;
  wishlist: string[];
  compareList: string[];
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onOpenQuickView: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  wishlist,
  compareList,
  onToggleWishlist,
  onToggleCompare,
  onOpenQuickView,
  onAddToCart,
}) => {
  const categoryNames: Record<string, string> = {
    all: 'All Categories',
    dresses: 'Wedding Dresses',
    shoes: 'Bridal Shoes',
    jewelry: 'Fine Jewelry',
    veils: 'Veils & Headpieces',
    accessories: 'Artisan Accessories',
  };

  const priceNames: Record<string, string> = {
    all: 'All Prices',
    under500: 'Under $500',
    '500-1500': '$500 - $1,500',
    over1500: 'Over $1,500',
  };

  const hasActiveFilters =
    Boolean(filters.search) || filters.category !== 'all' || filters.price !== 'all';

  return (
    <section className="section" id="catalog" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-title">
          <span>CURATED COLLECTION</span>
          <h2>Explore All Bridal Creations</h2>
        </div>

        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="filter-group">
            <input
              type="text"
              id="searchInput"
              placeholder="Search gowns, silks, veil lace, shoes..."
              className="search-input"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
            <select
              id="categoryFilter"
              className="filter-select"
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
            >
              <option value="all">All Categories</option>
              <option value="dresses">Wedding Dresses &amp; Gowns</option>
              <option value="jewelry">Fine Jewelry</option>
              <option value="veils">Cathedral Veils &amp; Combs</option>
              <option value="shoes">Bridal Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
            <select
              id="priceFilter"
              className="filter-select"
              value={filters.price}
              onChange={(e) => onFilterChange({ price: e.target.value })}
            >
              <option value="all">All Prices</option>
              <option value="under500">Under $500</option>
              <option value="500-1500">$500 - $1,500</option>
              <option value="over1500">Over $1,500</option>
            </select>
          </div>

          <div className="sort-group">
            <select
              id="sortSelect"
              className="filter-select"
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters Tag List */}
        {hasActiveFilters && (
          <div className="active-tags" id="activeTags">
            {filters.search && (
              <span className="tag">
                Search: "{filters.search}"
                <button
                  type="button"
                  onClick={() => onFilterChange({ search: '' })}
                  title="Remove search"
                >
                  &times;
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="tag">
                {categoryNames[filters.category] || filters.category}
                <button
                  type="button"
                  onClick={() => onFilterChange({ category: 'all' })}
                  title="Clear category filter"
                >
                  &times;
                </button>
              </span>
            )}
            {filters.price !== 'all' && (
              <span className="tag">
                {priceNames[filters.price] || filters.price}
                <button
                  type="button"
                  onClick={() => onFilterChange({ price: 'all' })}
                  title="Clear price filter"
                >
                  &times;
                </button>
              </span>
            )}
            <button
              className="btn btn-sm"
              style={{
                textTransform: 'none',
                letterSpacing: '0.5px',
                padding: '4px 8px',
                color: 'var(--color-muted)',
              }}
              onClick={onResetFilters}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid" id="productsGrid">
          {products.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '56px 20px',
                color: 'var(--color-muted)',
              }}
            >
              <p style={{ fontSize: '16px', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
                No creations found matching your active filters.
              </p>
              <button className="btn btn-outline-dark btn-sm" onClick={onResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            products.map((p) => {
              const isWish = wishlist.includes(p.id);
              const isComp = compareList.includes(p.id);

              return (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    {p.badge && (
                      <span className="card-badge-pill" style={{ bottom: '12px', left: '12px' }}>
                        {p.badge}
                      </span>
                    )}
                    <div className="card-actions">
                      <button
                        className={`icon-btn ${isWish ? 'active' : ''}`}
                        onClick={() => onToggleWishlist(p.id)}
                        title={isWish ? 'Remove Favorite' : 'Save Favorite'}
                        aria-label="Save Favorite"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={isWish ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        className={`icon-btn ${isComp ? 'active' : ''}`}
                        onClick={() => onToggleCompare(p.id)}
                        title={isComp ? 'Remove from Compare' : 'Compare'}
                        aria-label="Compare"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => onOpenQuickView(p.id)}
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-cat">{p.category}</span>
                    <h3 className="product-title">{p.name}</h3>
                    {p.subtitle && (
                      <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                        {p.subtitle}
                      </p>
                    )}
                    <div className="product-rating">
                      ★ {p.rating.toFixed(1)} ({p.reviewsCount} reviews)
                    </div>
                    <div className="product-price-row">
                      <span className="product-price">${p.price.toLocaleString()}</span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onAddToCart(p.id)}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
