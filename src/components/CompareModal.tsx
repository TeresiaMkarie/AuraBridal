import React from 'react';
import { PRODUCTS } from '../data/products';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: string[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const items = compareList.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="modal-overlay" id="compareModal" onClick={onClose}>
      <div
        className="modal-content modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-modal"
          id="closeCompare"
          onClick={onClose}
          aria-label="Close Comparison"
        >
          &times;
        </button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '8px' }}>
          Compare Selected Items
        </h2>

        <div className="compare-table-wrapper" id="compareTableWrapper">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-muted)' }}>
              <p style={{ marginBottom: '12px' }}>
                Select up to 3 items from the catalog using the compare icon to compare them side-by-side.
              </p>
              <button className="btn btn-outline-dark btn-sm" onClick={onClose}>
                Browse Catalog
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="compare-table">
                <thead>
                  <tr>
                    <th style={{ width: '140px' }}>Feature</th>
                    {items.map((p) => (
                      <th key={p!.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{p!.name}</span>
                          <button
                            onClick={() => onRemoveFromCompare(p!.id)}
                            style={{
                              fontSize: '18px',
                              lineHeight: 1,
                              color: 'var(--color-muted)',
                              marginLeft: '8px',
                            }}
                            title="Remove"
                          >
                            &times;
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Preview</strong></td>
                    {items.map((p) => (
                      <td key={p!.id}>
                        <img src={p!.image} alt={p!.name} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Price</strong></td>
                    {items.map((p) => (
                      <td key={p!.id} style={{ fontWeight: 600 }}>
                        ${p!.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Category</strong></td>
                    {items.map((p) => (
                      <td key={p!.id} style={{ textTransform: 'capitalize' }}>
                        {p!.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Style / Vibe</strong></td>
                    {items.map((p) => (
                      <td key={p!.id} style={{ textTransform: 'capitalize' }}>
                        {p!.vibe}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Silhouette</strong></td>
                    {items.map((p) => (
                      <td key={p!.id} style={{ textTransform: 'capitalize' }}>
                        {p!.silhouette}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Rating</strong></td>
                    {items.map((p) => (
                      <td key={p!.id} style={{ color: '#E6A100' }}>
                        ★ {p!.rating.toFixed(1)} ({p!.reviewsCount} reviews)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Action</strong></td>
                    {items.map((p) => (
                      <td key={p!.id}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            onAddToCart(p!.id);
                          }}
                        >
                          Add to Bag
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
