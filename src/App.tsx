/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CategoryFilterView } from './components/CategoryFilterView';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactModal } from './components/ContactModal';
import { PRODUCTS, PINCODES_DATABASE } from './data/products';
import { BLOG_POSTS } from './data/blogs';
import { Product, CartItem, ViewMode } from './types';
import { Sparkles, ArrowUp, Zap, Check, Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist State (with localStorage persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('megadealz_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        // Refresh product prices with current catalog
        return parsed.map(item => {
          const fresh = PRODUCTS.find(p => p.id === item.product.id);
          return fresh ? { ...item, product: fresh } : item;
        });
      }
    } catch (e) {
      // fallback
    }
    // Initial friendly default
    return [
      { product: PRODUCTS[0], quantity: 1, selectedShade: 'Bridal Warm Honey' }
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('megadealz_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      // fallback
    }
    return new Set(['prod-2', 'prod-5']);
  });

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState('');

  // Pincode and Location
  const [pincode, setPincode] = useState('400001');
  const [userCity, setUserCity] = useState('Mumbai');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('megadealz_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('megadealz_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {}
  }, [wishlistIds]);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handlePincodeUpdate = (newPin: string) => {
    setPincode(newPin);
    const match = PINCODES_DATABASE[newPin];
    if (match) {
      setUserCity(match.city);
      showToast(`Location set to ${match.city} (${newPin})`);
    } else {
      setUserCity('India');
      showToast(`Pincode set to ${newPin}`);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, shade?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === shade
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedShade: shade || (product.shades ? product.shades[0]?.name : undefined) }];
    });
    showToast(`Added ${product.name.slice(0, 24)}... to bag!`);
  };

  const handleCardAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, 1);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from Wishlist`);
      } else {
        next.add(product.id);
        showToast(`Added to Wishlist ❤️`);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, 1);
  };

  // Instant Buy Now
  const handleBuyNow = (product: Product, quantity = 1, shade?: string) => {
    handleAddToCart(product, quantity, shade);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setCheckoutDiscount(discount);
    setCheckoutCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setCartItems([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-pink-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 border border-slate-700">
          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentView !== 'catalog') {
            setCurrentView('catalog');
          }
        }}
        pincode={pincode}
        onPincodeChange={handlePincodeUpdate}
        userCity={userCity}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Promotional Pricing Showcase Notice */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 py-1.5 px-4 text-center text-[11px] text-amber-900 font-medium">
          <span className="inline-block bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide mr-2">
            Showcase Notice
          </span>
          Sample promotional pricing displayed for website design preview. All final prices and product availability are subject to seller confirmation.
        </div>

        {currentView === 'home' && (
          <HomeView
            products={PRODUCTS}
            blogs={BLOG_POSTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleCardAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToCatalog={(cat) => {
              if (cat) setSelectedCategory(cat);
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToBlog={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'catalog' && (
          <CategoryFilterView
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleCardAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'blog' && (
          <BlogSection
            blogs={BLOG_POSTS}
            products={PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleCardAddToCart}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Slide-overs */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlistIds.has(selectedProduct.id)}
          onToggleWishlist={(p) => handleToggleWishlist(p)}
          userPincode={pincode}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Scroll to Top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900/90 text-white hover:bg-pink-600 shadow-xl backdrop-blur-xs transition-all hover:scale-110"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
