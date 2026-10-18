import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  Star,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { AdSenseSpace } from './AdSenseSpace';
import { CATEGORIES } from '../data/products';

interface CategoryFilterViewProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const CategoryFilterView: React.FC<CategoryFilterViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand)));
    return ['all', ...list];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      // Discount filter
      if (product.discountPercentage < minDiscount) {
        return false;
      }
      // Rating filter
      if (product.rating < minRating) {
        return false;
      }
      // Price range
      if (priceRange === 'under49' && product.price > 49) return false;
      if (priceRange === '50to99' && (product.price < 50 || product.price > 99)) return false;
      if (priceRange === '100to149' && (product.price < 100 || product.price > 149)) return false;
      if (priceRange === '150to199' && (product.price < 150 || product.price > 199)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedBrand, minDiscount, priceRange, minRating, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setMinDiscount(0);
    setPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    onSelectCategory('all');
  };

  const activeCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory) || {
    name: 'All Mega Deals & Beauty Products',
    id: 'all'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Title & Summary */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-pink-600 font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MegaDealz Curated Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {activeCategoryInfo.name}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Showing {filteredProducts.length} authentic beauty products & kits with verified discounts
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white"
          >
            <Filter className="w-4 h-4 text-pink-600" />
            <span>Filters ({selectedCategory !== 'all' || minDiscount > 0 ? 'Active' : 'All'})</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-pink-500 shadow-xs cursor-pointer"
            >
              <option value="featured">Featured / Best Value</option>
              <option value="discount">Biggest Discount (%)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className={`${showMobileFilter ? 'block' : 'hidden md:block'} space-y-6 md:sticky md:top-24 md:self-start bg-white p-5 rounded-2xl border border-slate-200 shadow-xs`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-pink-600" />
              <span>Refine Deals</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Categories
            </h4>
            <div className="space-y-1.5 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-pink-50 text-pink-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Price Budget
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'all', label: 'All Budgets (₹39 - ₹199)' },
                { id: 'under49', label: 'Under ₹49 (Pocket Steals)' },
                { id: '50to99', label: '₹50 - ₹99 (Popular Picks)' },
                { id: '100to149', label: '₹100 - ₹149 (Value Combos)' },
                { id: '150to199', label: '₹150 - ₹199 (Vanity Kits)' },
              ].map((range) => (
                <label key={range.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === range.id}
                    onChange={() => setPriceRange(range.id)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Discount Filter */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Minimum Discount
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { pct: 0, label: 'All Discounts' },
                { pct: 50, label: '50% Off or more' },
                { pct: 60, label: '60% Off or more' },
                { pct: 70, label: '70% Off or more (Flash Steals)' },
              ].map((disc) => (
                <label key={disc.pct} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="minDiscount"
                    checked={minDiscount === disc.pct}
                    onChange={() => setMinDiscount(disc.pct)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span>{disc.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Brand
            </h4>
            <div className="space-y-1.5 text-xs max-h-44 overflow-y-auto">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === b}
                    onChange={() => setSelectedBrand(b)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="truncate">{b === 'all' ? 'All Brands' : b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sidebar Google AdSense Box */}
          <div className="pt-4 border-t border-slate-100">
            <AdSenseSpace
              slotId="4820193"
              format="rectangle"
              label="Sponsored Sidebar Partner"
            />
          </div>
        </div>

        {/* Product Cards Grid & In-Feed AdSense */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No deals match your filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing minimum discount filters to see more results.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2.5 bg-pink-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-pink-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product, idx) => (
                  <React.Fragment key={product.id}>
                    <ProductCard
                      product={product}
                      onSelect={onSelectProduct}
                      onAddToCart={onAddToCart}
                      isWishlisted={wishlistIds.has(product.id)}
                      onToggleWishlist={onToggleWishlist}
                    />

                    {/* Insert In-Feed Google AdSense slot after product 3 */}
                    {idx === 2 && (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                        <AdSenseSpace
                          slotId="9914205"
                          format="leaderboard"
                          label="Featured Shopping Deal Sponsor"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
