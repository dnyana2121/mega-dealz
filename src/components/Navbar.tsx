import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Sparkles,
  MapPin,
  Menu,
  X,
  Flame,
  ChevronDown,
  BookOpen,
  PhoneCall,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Product, ViewMode } from '../types';
import { FlashDealTimer } from './FlashDealTimer';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenContact: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  pincode: string;
  onPincodeChange: (pin: string) => void;
  userCity: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenContact,
  searchQuery,
  onSearchChange,
  pincode,
  onPincodeChange,
  userCity,
  products,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      onPincodeChange(tempPincode.trim());
      setPincodeModalOpen(false);
    }
  };

  const navCategories = [
    { id: 'all', label: 'All Deals' },
    { id: 'makeup-kits', label: 'Makeup Kits & Vanity' },
    { id: 'skincare', label: 'Skincare Serums' },
    { id: 'lip-eye', label: 'Lipsticks & Kajal' },
    { id: 'haircare', label: 'Hair Growth' },
    { id: 'fragrance', label: 'Perfumes & Mists' },
    { id: 'clearance', label: 'Under ₹99 Deals' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-600 to-amber-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Sample Promotional Showcase
            </span>
            <span className="hidden sm:inline">🇮🇳 Free Express Delivery across India on orders above ₹199</span>
            <span className="sm:hidden">🇮🇳 Free Delivery ₹199+</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-300" />
              <span>Use Code: <strong className="underline text-amber-200">MEGA20</strong> for Extra 20% Off</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenContact}
                className="hover:underline text-[11px] flex items-center gap-1 text-rose-100"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Help & Track Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onNavigate('home');
                onSelectCategory('all');
              }}
              className="text-left flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                    MegaDealz
                  </span>
                  <span className="bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold text-[11px] px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wide hidden sm:block">
                  BEAUTY • MAKEUP KITS • SUPER SAVER DEALS
                </p>
              </div>
            </button>
          </div>

          {/* Location / Pincode Selector */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setPincodeModalOpen(true)}
              className="flex items-center gap-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg text-slate-700 transition-colors"
            >
              <MapPin className="w-4 h-4 text-pink-600 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Deliver To</div>
                <div className="font-semibold text-slate-800 line-clamp-1">{userCity} ({pincode})</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bridal makeup kits, Lakmé, serums, lipsticks..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-pink-500 focus:bg-white focus:outline-none rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setShowSearchDropdown(false)}
              >
                <div className="p-2 text-xs font-bold text-slate-400 uppercase bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <span>Matching Products ({searchResults.length})</span>
                  <span className="text-[10px] text-pink-600">Click to view details</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchDropdown(false);
                      }}
                      className="w-full p-2.5 flex items-center gap-3 hover:bg-pink-50/50 transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-pink-600">{product.brand}</div>
                        <div className="text-sm font-bold text-slate-800 truncate">{product.name}</div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-slate-900">₹{product.price}</span>
                          <span className="line-through text-slate-400">₹{product.originalPrice}</span>
                          <span className="text-green-600 font-bold">{product.discountPercentage}% Off</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Cart & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-pink-600 font-extrabold px-1.5 py-0.5 rounded-full text-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-pink-600 rounded-xl md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search makeup kits, lipstick, serums..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSearchDropdown(true);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar / Category Tabs */}
      <nav className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 py-1.5 whitespace-nowrap">
            {navCategories.map((cat) => {
              const isActive = (currentView === 'home' || currentView === 'catalog') && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50/70'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Beauty Blogs & Buying Guides Link */}
            <button
              onClick={() => onNavigate('blog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-purple-700 text-white'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Beauty Guides & Blog</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 py-1">
            <FlashDealTimer variant="badge" label="Flash Deals" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase text-slate-400">Navigation Menu</span>
            <button
              onClick={() => setPincodeModalOpen(true)}
              className="text-xs text-pink-600 font-semibold flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{userCity} ({pincode})</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onNavigate('catalog');
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-lg font-medium border ${
                  selectedCategory === cat.id
                    ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('blog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Beauty Guides & Blog</span>
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-pink-600" />
              <span>Help Center & Order Tracking</span>
            </button>
          </div>
        </div>
      )}

      {/* Pincode Change Modal */}
      {pincodeModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPincodeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Check Delivery Pincode</h3>
                <p className="text-xs text-slate-500">Fast express delivery across 28,000+ Indian pincodes</p>
              </div>
            </div>

            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 6-Digit Indian Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 400001, 110001, 560001"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full border border-slate-300 rounded-xl p-3 text-base font-mono tracking-widest text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  Popular Metros with 24-48h Delivery:
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { pin: '400001', city: 'Mumbai' },
                    { pin: '110001', city: 'Delhi' },
                    { pin: '560001', city: 'Bengaluru' },
                    { pin: '700001', city: 'Kolkata' },
                    { pin: '600001', city: 'Chennai' },
                    { pin: '302001', city: 'Jaipur' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.pin}
                      onClick={() => setTempPincode(m.pin)}
                      className="px-2 py-1 bg-white border border-slate-200 rounded text-[11px] hover:border-pink-500 hover:text-pink-600"
                    >
                      {m.city} ({m.pin})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPincodeModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tempPincode.trim().length !== 6}
                  className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
                >
                  Update Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
