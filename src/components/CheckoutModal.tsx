import React, { useState } from 'react';
import { CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cart.reduce((acc, i) => {
    const p = PRODUCTS.find((prod) => prod.id === i.id);
    return acc + (p ? p.price * i.qty : 0);
  }, 0);

  const shipping = subtotal >= 500 ? 0 : 25;
  const grandTotal = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderSuccess();
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-overlay" id="checkoutModal" onClick={onClose}>
      <div
        className="modal-content modal-md"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        <button
          className="close-modal"
          id="closeCheckoutBtn"
          onClick={onClose}
          aria-label="Close Checkout"
        >
          &times;
        </button>

        <div className="checkout-steps">
          <span className={`checkout-step-tag ${step === 1 ? 'active' : ''}`} id="stepTag1">
            1. Shipping
          </span>
          <span className={`checkout-step-tag ${step === 2 ? 'active' : ''}`} id="stepTag2">
            2. Payment
          </span>
          <span className={`checkout-step-tag ${step === 3 ? 'active' : ''}`} id="stepTag3">
            3. Review
          </span>
        </div>

        <form id="checkoutForm" onSubmit={handlePlaceOrder}>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="checkout-step-content" id="checkoutStep1">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '16px' }}>
                Atelier Client &amp; Delivery Address
              </h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="custName"
                  required
                  placeholder="Wanjiku Kamau"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="custEmail"
                  required
                  placeholder="wanjiku@example.co.ke"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  id="custAddress"
                  required
                  placeholder="Karen Plains Road, Karen"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    id="custCity"
                    required
                    placeholder="Nairobi"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="zip"
                    id="custZip"
                    required
                    placeholder="00100"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="toStep2Btn"
                onClick={() => setStep(2)}
              >
                Continue to Payment &rarr;
              </button>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {step === 2 && (
            <div className="checkout-step-content" id="checkoutStep2">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '16px' }}>
                Secure Payment
              </h3>
              <div className="form-group">
                <label>Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  id="cardName"
                  required
                  placeholder="Wanjiku Kamau"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  required
                  placeholder="•••• •••• •••• ••••"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    id="cardExp"
                    required
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>CVC / CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    id="cardCvc"
                    required
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => setStep(1)}
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  id="toStep3Btn"
                  onClick={() => setStep(3)}
                >
                  Review Order &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="checkout-step-content" id="checkoutStep3">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '16px' }}>
                Order Summary
              </h3>
              <div className="order-review-box">
                <p>
                  <strong>Client:</strong> {formData.name || 'Wanjiku Kamau'} ({formData.email || 'wanjiku@example.co.ke'})
                </p>
                <p>
                  <strong>Delivery To:</strong> {formData.address || 'Karen Plains Road, Karen'}, {formData.city || 'Nairobi'} {formData.zip || '00100'}
                </p>
                <p>
                  <strong>Payment Card:</strong> Ending in {formData.cardNumber.slice(-4) || '8892'}
                </p>
                <div className="review-divider"></div>
                <div className="summary-line">
                  <span>Selected Pieces ({totalItems}):</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-line">
                  <span>Insured Shipping:</span>
                  <span>{shipping === 0 ? 'Free Worldwide Shipping' : '$25.00'}</span>
                </div>
                <div className="summary-line total-line">
                  <span>Total Amount:</span>
                  <span style={{ color: 'var(--color-dark)' }}>${grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => setStep(2)}
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  id="placeOrderBtn"
                >
                  Authorize Commission (${grandTotal.toLocaleString()})
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
