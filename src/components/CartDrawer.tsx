import React from 'react';
import { CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);

  const subtotal = cart.reduce((acc, item) => {
    const p = PRODUCTS.find((prod) => prod.id === item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);

  const freeShippingThreshold = 500;
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="drawer-overlay" id="cartDrawer" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>
            Shopping Bag (<span id="cartDrawerCount">{totalItems}</span>)
          </h3>
          <button
            className="close-drawer"
            id="closeCartBtn"
            onClick={onClose}
            aria-label="Close Shopping Bag"
          >
            &times;
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-bar-container">
          <p id="shippingBarText">
            {subtotal >= freeShippingThreshold
              ? 'You have unlocked Free Worldwide Shipping!'
              : `Add $${remainingForFreeShipping.toLocaleString()} more for Free Worldwide Shipping`}
          </p>
          <div className="shipping-progress">
            <div
              className="shipping-progress-fill"
              id="shippingProgressFill"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>

        <div className="drawer-body" id="cartDrawerBody">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginTop: '40px' }}>
              Your shopping bag is currently empty.
            </p>
          ) : (
            cart.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <div key={item.id} className="cart-item">
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-title">{product.name}</div>
                    <div className="cart-item-price">
                      ${product.price.toLocaleString()} &times; {item.qty} = $
                      {(product.price * item.qty).toLocaleString()}
                    </div>
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(product.id, -1)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ minWidth: '18px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(product.id, 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-line">
              <span>Subtotal</span>
              <span id="cartSubtotal">${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-line" style={{ color: 'var(--color-muted)' }}>
              <span>Estimated Shipping</span>
              <span id="cartShipping">
                {subtotal >= freeShippingThreshold ? 'Free Worldwide Shipping' : '$25.00'}
              </span>
            </div>
            <div className="summary-line total-line">
              <span>Total Investment</span>
              <span id="cartTotal">
                $
                {(
                  subtotal + (subtotal >= freeShippingThreshold ? 0 : 25)
                ).toLocaleString()}
              </span>
            </div>
            <button
              className="btn btn-primary btn-block"
              id="proceedCheckoutBtn"
              onClick={onProceedCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
