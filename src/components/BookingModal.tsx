import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (salonName: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [salon, setSalon] = useState('Nairobi Flagship Atelier — Karen, Nairobi');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(salon);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-md"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '36px 32px' }}
      >
        <button
          className="close-modal"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span className="section-kicker" style={{ letterSpacing: '2.5px', fontSize: '9px', textTransform: 'uppercase' }}>
            Aura Bridal appointments
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--color-dark)', margin: '4px 0 6px' }}>
            Book Your Private Fitting
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '12.5px', margin: 0 }}>
            Dedicated private styling session at our Kenya salons.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
              Select Salon
            </label>
            <select
              value={salon}
              onChange={(e) => setSalon(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px' }}
            >
              <option value="Nairobi Flagship Atelier — Karen, Nairobi">
                Nairobi Flagship Atelier &mdash; Karen, Nairobi
              </option>
              <option value="Westlands Salon — Rhapta Road, Westlands, Nairobi">
                Westlands Salon &mdash; Rhapta Road, Westlands
              </option>
              <option value="Gigiri Private Suite — UN Crescent, Gigiri, Nairobi">
                Gigiri Private Suite &mdash; UN Crescent, Gigiri
              </option>
              <option value="Mombasa Coastal Atelier — Nyali, Mombasa">
                Mombasa Coastal Atelier &mdash; Nyali, Mombasa
              </option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wanjiku Kamau"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px' }}
            />
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: 0 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="wanjiku@example.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px' }}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+254 712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
              Wedding Date
            </label>
            <input
              type="date"
              required
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px' }}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '5px', display: 'block' }}>
              Atelier Notes / Silhouette Desires
            </label>
            <textarea
              rows={2}
              placeholder="Preferred silhouettes or special requests"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderColor: 'var(--color-border)', borderRadius: '2px', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: '8px', padding: '12px 20px', letterSpacing: '1.6px', fontSize: '11px', textTransform: 'uppercase' }}
          >
            CONFIRM PRIVATE FITTING
          </button>
        </form>
      </div>
    </div>
  );
};
