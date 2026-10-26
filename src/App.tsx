import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Product, CartItem, ActiveFilters, UserProfile } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AtelierIcons } from './components/AtelierIcons';
import { SavoirFaire } from './components/SavoirFaire';
import { EditorialQuote } from './components/EditorialQuote';
import { Catalog } from './components/Catalog';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['p-icon-1', 'p-icon-2']);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aura_atelier_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const [filters, setFilters] = useState<ActiveFilters>({
    search: '',
    category: 'all',
    price: 'all',
    sort: 'featured',
  });

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);


  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let items = [...PRODUCTS];

    if (filters.category !== 'all') {
      items = items.filter((p) => p.category === filters.category);
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    }

    if (filters.price !== 'all') {
      if (filters.price === 'under500') {
        items = items.filter((p) => p.price < 500);
      } else if (filters.price === '500-1500') {
        items = items.filter((p) => p.price >= 500 && p.price <= 1500);
      } else if (filters.price === 'over1500') {
        items = items.filter((p) => p.price > 1500);
      }
    }

    if (filters.sort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [filters]);

  // Cart operations
  const handleAddToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: productId, qty: 1 }];
    });
    const product = PRODUCTS.find((p) => p.id === productId);
    showToast(`Added "${product?.name || 'Creation'}" to Shopping Bag`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Saved Favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Favorites');
        return [...prev, productId];
      }
    });
  };

  // Compare operations
  const handleToggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from comparison');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare up to 3 creations at a time');
          return prev;
        }
        showToast('Added to side-by-side comparison');
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('aura_atelier_user', JSON.stringify(profile));
    showToast(`✨ Bienvenue, ${profile.name}. Your atelier account is active.`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aura_atelier_user');
    showToast('You have signed out of your atelier account.');
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="app-root">
      {/* Haute Couture Navbar */}
      <Navbar
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        cartCount={totalCartCount}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => {
          scrollToSection('catalog');
          setTimeout(() => document.getElementById('searchInput')?.focus(), 400);
        }}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigate={scrollToSection}
      />


      <main>
        {/* Section 1: Hero Banner */}
        <Hero
          onExplore={() => scrollToSection('icons-section')}
          onReserveFitting={() => setIsBookingOpen(true)}
        />

        {/* Section 2: The Atelier Icons (High Couture Showcase) */}
        <AtelierIcons
          products={PRODUCTS}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onOpenQuickView={(id) => setQuickViewProductId(id)}
          onAddToCart={handleAddToCart}
          onViewAllCreations={() => scrollToSection('catalog')}
        />

        {/* Section 3: Atelier Savoir-Faire (Heritage Craftsmanship) */}
        <SavoirFaire onRequestBespoke={() => setIsBookingOpen(true)} />

        {/* Section 4: Editorial Testimonial */}
        <EditorialQuote />

        {/* Section 5: Complete Catalogue */}
        <Catalog
          products={filteredProducts}
          filters={filters}
          onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          onResetFilters={() => setFilters({ search: '', category: 'all', price: 'all', sort: 'featured' })}
          wishlist={wishlist}
          compareList={compareList}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onOpenQuickView={(id) => setQuickViewProductId(id)}
          onAddToCart={handleAddToCart}
        />

        {/* Section 6: Interactive Signature Style Quiz */}
        <Quiz
          onAddToCart={handleAddToCart}
          onOpenQuickView={(id) => setQuickViewProductId(id)}
        />
      </main>

      {/* Flagship Salons & Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenQuiz={() => scrollToSection('quiz')}
        onShowToast={showToast}
      />

      {/* Private Salon Fitting Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={(salonName) =>
          showToast(`🍾 Private fitting & Champagne tasting confirmed for ${salonName}!`)
        }
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onProceedCheckout={() => {
          if (cart.length === 0) {
            showToast('Your shopping bag is empty.');
            return;
          }
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onMoveToBag={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={handleAddToCart}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        productId={quickViewProductId}
        onClose={() => setQuickViewProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={() => {
          setCart([]);
          showToast('🎉 Commission Authorized! Welcome to the Aura Haute Couture Atelier family.');
        }}
      />

      {/* Atelier Account Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authInitialMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Notification Toast */}
      <Toast message={toastMessage} />

    </div>
  );
};

export default App;
