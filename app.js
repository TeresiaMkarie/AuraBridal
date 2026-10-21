
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Aurelia Silk Satin Slip Gown',
    category: 'dresses',
    price: 1250,
    rating: 4.9,
    reviewsCount: 28,
    image: 'images/bridal-gown-1.jpg',
    description: 'A liquid-silk bias cut gown with delicate spaghetti straps, open draped back, and a graceful floor-sweeping train.',
    vibe: 'modern',
    silhouette: 'sheath'
  },
  {
    id: 'p2',
    name: 'Celeste Embellished Tulle Gown',
    category: 'dresses',
    price: 2100,
    rating: 5.0,
    reviewsCount: 14,
    image: 'images/bridal-gown-2.jpg',
    description: 'Intricately hand-beaded ethereal tulle ballgown featuring subtle botanical floral appliques and a sweetheart neckline.',
    vibe: 'classic',
    silhouette: 'a-line'
  },
  {
    id: 'p3',
    name: 'Ophelia Off-Shoulder Mermaid Gown',
    category: 'dresses',
    price: 1850,
    rating: 4.8,
    reviewsCount: 19,
    image: 'images/bridal-gown-3.jpg',
    description: 'Sculptural crepe gown with structured corsetry, dramatic foldover off-the-shoulder sleeves, and fit-and-flare tail.',
    vibe: 'modern',
    silhouette: 'mermaid'
  },
  {
    id: 'p4',
    name: 'Freshwater Pearl Drop Earrings',
    category: 'jewelry',
    price: 180,
    rating: 4.9,
    reviewsCount: 42,
    image: 'images/pearl-earrings.jpg',
    description: '14k solid yellow gold hoops adorned with organic, hand-selected luminous baroque freshwater pearls.',
    vibe: 'classic',
    silhouette: 'accessory'
  },
  {
    id: 'p5',
    name: 'Minimalist Diamond Tennis Bracelet',
    category: 'jewelry',
    price: 450,
    rating: 4.7,
    reviewsCount: 31,
    image: 'images/jewelry-set.jpg',
    description: 'Lab-grown diamond eternity tennis bracelet handcrafted in recycled sterling silver.',
    vibe: 'modern',
    silhouette: 'accessory'
  },
  {
    id: 'p6',
    name: 'Ethereal Cathedral Length Veil',
    category: 'veils',
    price: 290,
    rating: 5.0,
    reviewsCount: 56,
    image: 'images/bridal-veil.jpg',
    description: 'Soft English net tulle veil extending 110 inches with raw edge finish for a weightless, floating silhouette.',
    vibe: 'classic',
    silhouette: 'veil'
  },
  {
    id: 'p7',
    name: 'Satin Bow Pointed Toe Pumps',
    category: 'shoes',
    price: 340,
    rating: 4.6,
    reviewsCount: 22,
    image: 'images/bridal-shoes.jpg',
    description: 'Ivory Italian silk satin stiletto pumps crowned with a removable oversized romantic ankle bow.',
    vibe: 'modern',
    silhouette: 'shoes'
  },
  {
    id: 'p8',
    name: 'Pearl Encrusted Bridal Clutch',
    category: 'accessories',
    price: 220,
    rating: 4.8,
    reviewsCount: 15,
    image: 'images/bridal-clutch.jpg',
    description: 'Hard-shell evening clutch adorned in hand-strung glass seed pearls with detachable gold chain strap.',
    vibe: 'classic',
    silhouette: 'accessory'
  }
];

const CATEGORIES = [
  { id: 'dresses', name: 'Gowns & Dresses', image: 'images/bridal-gown-1.jpg' },
  { id: 'jewelry', name: 'Fine Jewelry', image: 'images/pearl-earrings.jpg' },
  { id: 'veils', name: 'Veils & Combs', image: 'images/bridal-veil.jpg' },
  { id: 'shoes', name: 'Bridal Shoes', image: 'images/bridal-shoes.jpg' }
];

let cart = [];
let wishlist = [];
let compareList = [];
let activeFilters = { search: '', category: 'all', price: 'all', sort: 'featured' };
let quizAnswers = {};

document.addEventListener('DOMContentLoaded', () => {
  initCategories();
  renderProducts();
  setupEventListeners();
});

// CATEGORIES INIT
function initCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="setCategoryFilter('${cat.id}')">
      <img src="${cat.image}" alt="${cat.name}">
      <div class="cat-overlay">
        <h3>${cat.name}</h3>
      </div>
    </div>
  `).join('');
}

// RENDER PRODUCTS
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  let items = [...PRODUCTS];

  // Filtering
  if (activeFilters.category !== 'all') {
    items = items.filter(p => p.category === activeFilters.category);
  }
  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    items = items.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (activeFilters.price !== 'all') {
    if (activeFilters.price === 'under500') items = items.filter(p => p.price < 500);
    else if (activeFilters.price === '500-1500') items = items.filter(p => p.price >= 500 && p.price <= 1500);
    else if (activeFilters.price === 'over1500') items = items.filter(p => p.price > 1500);
  }

  // Sorting
  if (activeFilters.sort === 'price-low') items.sort((a, b) => a.price - b.price);
  else if (activeFilters.sort === 'price-high') items.sort((a, b) => b.price - a.price);
  else if (activeFilters.sort === 'rating') items.sort((a, b) => b.rating - a.rating);

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--color-muted);">No products found matching your active filters.</div>`;
    return;
  }

  grid.innerHTML = items.map(p => {
    const isWish = wishlist.includes(p.id);
    const isComp = compareList.includes(p.id);

    return `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}">
          <div class="card-actions">
            <button class="icon-btn ${isWish ? 'active' : ''}" onclick="toggleWishlist('${p.id}')" title="Save Favorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button class="icon-btn ${isComp ? 'active' : ''}" onclick="toggleCompare('${p.id}')" title="Compare">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <button class="icon-btn" onclick="openQuickView('${p.id}')" title="Quick View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-cat">${p.category}</span>
          <h3 class="product-title">${p.name}</h3>
          <div class="product-rating">★ ${p.rating} (${p.reviewsCount})</div>
          <div class="product-price-row">
            <span class="product-price">$${p.price.toLocaleString()}</span>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">Add to Bag</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateBadges();
}

// FILTER HANDLERS
function setCategoryFilter(cat) {
  activeFilters.category = cat;
  document.getElementById('categoryFilter').value = cat;
  renderProducts();
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    activeFilters.search = e.target.value;
    renderProducts();
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    activeFilters.category = e.target.value;
    renderProducts();
  });

  document.getElementById('priceFilter').addEventListener('change', (e) => {
    activeFilters.price = e.target.value;
    renderProducts();
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    activeFilters.sort = e.target.value;
    renderProducts();
  });

  // Mobile Toggle
  document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('show');
  });

  // Drawers & Modals Toggle
  document.getElementById('openCartBtn').addEventListener('click', () => openDrawer('cartDrawer'));
  document.getElementById('closeCartBtn').addEventListener('click', () => closeDrawer('cartDrawer'));

  document.getElementById('openWishlistBtn').addEventListener('click', () => {
    renderWishlist();
    openDrawer('wishlistDrawer');
  });
  document.getElementById('closeWishlistBtn').addEventListener('click', () => closeDrawer('wishlistDrawer'));

  document.getElementById('openCompareBtn').addEventListener('click', () => {
    renderCompareTable();
    openModal('compareModal');
  });
  document.getElementById('closeCompare').addEventListener('click', () => closeModal('compareModal'));

  document.getElementById('closeQuickView').addEventListener('click', () => closeModal('quickViewModal'));

  // Style Quiz Trigger
  document.getElementById('openQuizBtn').addEventListener('click', () => {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('heroQuizBtn').addEventListener('click', () => {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  });

  // Quiz Options Click
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      const val = e.target.dataset.val;
      quizAnswers[key] = val;

      const currentStep = e.target.closest('.quiz-step');
      const stepNum = parseInt(currentStep.dataset.step);

      currentStep.classList.remove('active');
      const nextStep = document.querySelector(`.quiz-step[data-step="${stepNum + 1}"]`);
      
      if (nextStep) {
        nextStep.classList.add('active');
      } else {
        showQuizResults();
      }
    });
  });

  document.getElementById('resetQuizBtn').addEventListener('click', () => {
    quizAnswers = {};
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizWizard').style.display = 'block';
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelector('.quiz-step[data-step="1"]').classList.add('active');
  });

  // Checkout Flow
  document.getElementById('proceedCheckoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }
    closeDrawer('cartDrawer');
    openModal('checkoutModal');
  });

  document.getElementById('closeCheckoutBtn').addEventListener('click', () => closeModal('checkoutModal'));

  document.getElementById('toStep2Btn').addEventListener('click', () => {
    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';
    document.getElementById('stepTag1').classList.remove('active');
    document.getElementById('stepTag2').classList.add('active');
  });

  document.getElementById('backToStep1Btn').addEventListener('click', () => {
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('stepTag2').classList.remove('active');
    document.getElementById('stepTag1').classList.add('active');
  });

  document.getElementById('toStep3Btn').addEventListener('click', () => {
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutStep3').style.display = 'block';
    document.getElementById('stepTag2').classList.remove('active');
    document.getElementById('stepTag3').classList.add('active');
    renderCheckoutSummary();
  });

  document.getElementById('backToStep2Btn').addEventListener('click', () => {
    document.getElementById('checkoutStep3').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';
    document.getElementById('stepTag3').classList.remove('active');
    document.getElementById('stepTag2').classList.add('active');
  });

  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    cart = [];
    updateCartUI();
    closeModal('checkoutModal');
    showToast('🎉 Order Placed Successfully! Thank you for choosing Aura Bridal.');
  });
}

// CART MANAGEMENT
function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  updateCartUI();
  showToast('Item added to Shopping Bag');
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById('cartCount').innerText = totalItems;
  document.getElementById('cartDrawerCount').innerText = totalItems;

  const container = document.getElementById('cartDrawerBody');
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--color-muted); margin-top: 40px;">Your shopping bag is currently empty.</p>`;
  } else {
    container.innerHTML = cart.map(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      subtotal += p.price * item.qty;
      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${p.name}</div>
            <div class="cart-item-price">$${p.price.toLocaleString()}</div>
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateCartQty('${p.id}', -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${p.id}', 1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('cartSubtotal').innerText = `$${subtotal.toLocaleString()}`;
  document.getElementById('cartTotal').innerText = `$${subtotal.toLocaleString()}`;

  // Free shipping progress
  const target = 500;
  const pct = Math.min(100, (subtotal / target) * 100);
  document.getElementById('shippingProgressFill').style.width = `${pct}%`;
  
  if (subtotal >= target) {
    document.getElementById('shippingBarText').innerText = `You have unlocked Free Worldwide Shipping!`;
  } else {
    const diff = target - subtotal;
    document.getElementById('shippingBarText').innerText = `Add $${diff.toLocaleString()} more for Free Worldwide Shipping`;
  }
}

// WISHLIST & COMPARE
function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    showToast('Removed from Favorites');
  } else {
    wishlist.push(productId);
    showToast('Saved to Favorites');
  }
  renderProducts();
}

function renderWishlist() {
  const container = document.getElementById('wishlistDrawerBody');
  document.getElementById('wishlistDrawerCount').innerText = wishlist.length;

  if (wishlist.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--color-muted); margin-top: 40px;">No saved items yet.</p>`;
    return;
  }

  container.innerHTML = wishlist.map(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-details">
          <div class="cart-item-title">${p.name}</div>
          <div class="cart-item-price">$${p.price.toLocaleString()}</div>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">Move to Bag</button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleCompare(productId) {
  if (compareList.includes(productId)) {
    compareList = compareList.filter(id => id !== productId);
    showToast('Removed from comparison');
  } else {
    if (compareList.length >= 3) {
      showToast('You can compare up to 3 items at a time');
      return;
    }
    compareList.push(productId);
    showToast('Added to comparison');
  }
  renderProducts();
}

function renderCompareTable() {
  const container = document.getElementById('compareTableWrapper');
  if (compareList.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--color-muted);">Select up to 3 items from the catalog to compare side-by-side.</p>`;
    return;
  }

  const items = compareList.map(id => PRODUCTS.find(p => p.id === id));
  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Feature</th>
          ${items.map(p => `<th>${p.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Preview</td>
          ${items.map(p => `<td><img src="${p.image}"></td>`).join('')}
        </tr>
        <tr>
          <td>Price</td>
          ${items.map(p => `<td>$${p.price.toLocaleString()}</td>`).join('')}
        </tr>
        <tr>
          <td>Category</td>
          ${items.map(p => `<td>${p.category}</td>`).join('')}
        </tr>
        <tr>
          <td>Style / Vibe</td>
          ${items.map(p => `<td>${p.vibe}</td>`).join('')}
        </tr>
        <tr>
          <td>Rating</td>
          ${items.map(p => `<td>★ ${p.rating}</td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;
}

// QUICK VIEW MODAL
function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  const body = document.getElementById('quickViewBody');

  body.innerHTML = `
    <div>
      <img src="${p.image}" class="quickview-img" alt="${p.name}">
    </div>
    <div style="display:flex; flex-direction:column; justify-content:center;">
      <span class="product-cat">${p.category}</span>
      <h2 style="font-family:var(--font-heading); font-size: 28px; margin: 8px 0;">${p.name}</h2>
      <div class="product-rating" style="margin-bottom: 12px;">★ ${p.rating} (${p.reviewsCount} reviews)</div>
      <p style="color:var(--color-muted); margin-bottom: 20px;">${p.description}</p>
      <div style="font-size: 22px; font-weight: 500; margin-bottom: 24px;">$${p.price.toLocaleString()}</div>
      <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add to Shopping Bag</button>
    </div>
  `;
  openModal('quickViewModal');
}

// STYLE QUIZ LOGIC
function showQuizResults() {
  document.getElementById('quizWizard').style.display = 'none';
  const resultContainer = document.getElementById('quizResult');
  resultContainer.style.display = 'block';

  let filtered = PRODUCTS.filter(p => p.vibe === quizAnswers.vibe || p.silhouette === quizAnswers.silhouette);
  if (filtered.length === 0) filtered = PRODUCTS.slice(0, 3);

  document.getElementById('quizRecommendedGrid').innerHTML = filtered.slice(0, 3).map(p => `
    <div class="product-card">
      <img src="${p.image}" style="aspect-ratio:3/4; object-fit:cover;">
      <div style="padding: 12px;">
        <h4 style="font-family:var(--font-heading);">${p.name}</h4>
        <div style="font-size:12px; font-weight:500; margin-top:4px;">$${p.price.toLocaleString()}</div>
      </div>
    </div>
  `).join('');
}

// CHECKOUT SUMMARY
function renderCheckoutSummary() {
  const box = document.getElementById('checkoutSummaryBox');
  const subtotal = cart.reduce((acc, i) => {
    const p = PRODUCTS.find(prod => prod.id === i.id);
    return acc + p.price * i.qty;
  }, 0);

  box.innerHTML = `
    <div style="margin-top:16px; background:var(--color-bg); padding:16px; border-radius:var(--radius);">
      <p><strong>Total Items:</strong> ${cart.reduce((a, b) => a + b.qty, 0)}</p>
      <p><strong>Total Amount:</strong> $${subtotal.toLocaleString()}</p>
    </div>
  `;
}

// BADGE COUNTS
function updateBadges() {
  document.getElementById('wishlistCount').innerText = wishlist.length;
  document.getElementById('compareCount').innerText = compareList.length;
}

// UTILS
function openDrawer(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeDrawer(id) {
  document.getElementById(id).style.display = 'none';
}
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.style.display = 'block';
  setTimeout(() => {
    t.style.display = 'none';
  }, 3000);
}
