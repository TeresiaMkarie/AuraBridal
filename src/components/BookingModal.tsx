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
  const [dateError, setDateError] = useState('');

  // Enforce valid wedding date: not in the past, and within 1 year from today
  const { minDate, maxDate } = React.useMemo(() => {
    const today = new Date();
    const formatLocalDate = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    const min = formatLocalDate(today);
    const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const max = formatLocalDate(oneYearLater);
    return { minDate: min, maxDate: max };
  }, []);

  if (!isOpen) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWeddingDate(val);
    if (!val) {
      setDateError('');
      return;
    }
    if (val < minDate) {
      setDateError('Please select an upcoming date. Dates in the past cannot be scheduled.');
    } else if (val > maxDate) {
      setDateError('Please select a date within the next 12 months for atelier fittings.');
    } else {
      setDateError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingDate) {
      setDateError('Please select your wedding date.');
      return;
    }
    if (weddingDate < minDate) {
      setDateError('Please select an upcoming date. Dates in the past cannot be scheduled.');
      return;
    }
    if (weddingDate > maxDate) {
      setDateError('Please select a date within the next 12 months for atelier fittings.');
      return;
    }
    setDateError('');
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
              <label style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted)', margin: 0, display: 'block' }}>
                Wedding Date
              </label>
              <span style={{ fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.3px', fontWeight: 400 }}>
                (Upcoming within 12 months)
              </span>
            </div>
            <input
              type="date"
              required
              min={minDate}
              max={maxDate}
              value={weddingDate}
              onChange={handleDateChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '13px',
                borderColor: dateError ? '#b91c1c' : 'var(--color-border)',
                backgroundColor: dateError ? '#fef2f2' : undefined,
                borderRadius: '2px',
                outline: 'none',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
            />
            {dateError && (
              <div style={{ color: '#b91c1c', fontSize: '11px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px', lineHeight: 1.3 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{dateError}</span>
              </div>
            )}
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
