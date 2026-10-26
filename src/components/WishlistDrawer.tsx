import React from 'react';
import { PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  onMoveToBag: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onMoveToBag,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" id="wishlistDrawer" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>
            Saved Favorites (<span id="wishlistDrawerCount">{wishlist.length}</span>)
          </h3>
          <button
            className="close-drawer"
            id="closeWishlistBtn"
            onClick={onClose}
            aria-label="Close Favorites"
          >
            &times;
          </button>
        </div>

        <div className="drawer-body" id="wishlistDrawerBody">
          {wishlist.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginTop: '40px' }}>
              No saved items yet. Click the heart icon on any product to save it here.
            </p>
          ) : (
            wishlist.map((id) => {
              const product = PRODUCTS.find((p) => p.id === id);
              if (!product) return null;

              return (
                <div key={id} className="cart-item">
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-title">{product.name}</div>
                    <div className="cart-item-price">
                      ${product.price.toLocaleString()}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onMoveToBag(product.id)}
                      >
                        Move to Bag
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => onRemoveFromWishlist(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
