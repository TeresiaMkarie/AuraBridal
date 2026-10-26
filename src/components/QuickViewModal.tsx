import React from 'react';
import { PRODUCTS } from '../data/products';

interface QuickViewModalProps {
  productId: string | null;
  onClose: () => void;
  onAddToCart: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  productId,
  onClose,
  onAddToCart,
}) => {
  if (!productId) return null;

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  return (
    <div className="modal-overlay" id="quickViewModal" onClick={onClose}>
      <div
        className="modal-content modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '860px' }}
      >
        <button
          className="close-modal"
          id="closeQuickView"
          onClick={onClose}
          aria-label="Close Quick View"
        >
          &times;
        </button>

        <div className="quickview-body" id="quickViewBody">
          {/* Media side */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
              <img
                src={product.image}
                className="quickview-img"
                alt={product.name}
              />
              {product.badge && (
                <span className="card-badge-pill" style={{ bottom: '16px', left: '16px' }}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details side */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="product-cat">{product.category}</span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                margin: '8px 0 4px',
                color: 'var(--color-dark)',
              }}
            >
              {product.name}
            </h2>
            {product.subtitle && (
              <p style={{ fontSize: '13px', color: 'var(--color-accent)', marginBottom: '8px', fontStyle: 'italic' }}>
                {product.subtitle}
              </p>
            )}
            <div className="product-rating" style={{ marginBottom: '14px' }}>
              ★ {product.rating.toFixed(1)} ({product.reviewsCount} verified reviews)
            </div>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px', lineHeight: 1.7, fontSize: '13.5px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'var(--color-dark)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                ${product.price.toLocaleString()}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                Complimentary insured worldwide white-glove delivery
              </span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                onAddToCart(product.id);
                onClose();
              }}
            >
              Add to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
