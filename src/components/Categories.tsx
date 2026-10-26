import React from 'react';
import { CATEGORIES } from '../data/products';

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section className="section categories-section" id="categories">
      <div className="container">
        <div className="section-title">
          <span>CURATED SELECTIONS</span>
          <h2>Shop By Category</h2>
        </div>
        <div className="categories-grid" id="categoriesGrid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="cat-overlay">
                <h3>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
