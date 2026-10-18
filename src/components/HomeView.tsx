import React from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  Star,
  CheckCircle2,
  Gift,
  ShieldCheck,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Product, BlogPost } from '../types';
import { HeroCarousel } from './HeroCarousel';
import { ProductCard } from './ProductCard';
import { AdSenseSpace } from './AdSenseSpace';
import { FlashDealTimer } from './FlashDealTimer';
import { TOP_BRANDS } from '../data/products';

interface HomeViewProps {
  products: Product[];
  blogs: BlogPost[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onNavigateToCatalog: (category?: string) => void;
  onNavigateToBlog: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  blogs,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigateToCatalog,
  onNavigateToBlog,
}) => {
  // Filter products for homepage sections
  const flashDeals = products.filter(p => p.isDealOfTheDay);
  const makeupKits = products.filter(p => p.category === 'makeup-kits');
  const skincareProducts = products.filter(p => p.category === 'skincare');
  const lipAndEyeProducts = products.filter(p => p.category === 'lip-eye');
  const clearanceDeals = products.filter(p => p.price <= 99);

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Carousel */}
      <HeroCarousel onShopNow={(cat) => onNavigateToCatalog(cat)} />

      {/* 2. Top Brands Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Top Featured Cosmetic Brands
            </h2>
            <p className="text-xs text-slate-500">Official brand partners with direct authentic warranty</p>
          </div>
          <button
            onClick={() => onNavigateToCatalog('all')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {TOP_BRANDS.map((brand) => (
            <div
              key={brand.name}
              onClick={() => onNavigateToCatalog('all')}
              className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-center hover:border-pink-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="font-extrabold text-sm sm:text-base text-slate-800 tracking-wider font-display group-hover:text-pink-600 transition-colors">
                {brand.logoText}
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-1">
                {brand.discount}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals of the Day (Expires Today) */}
      <section id="deals" className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-rose-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  Limited Time
                </span>
                <FlashDealTimer variant="compact" label="Expires In" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Today&apos;s Flash Mega Deals (Up to 71% OFF)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Steepest price drops on luxury makeup kits, lipsticks, and serums. Stock replenishes at midnight.
              </p>
            </div>

            <button
              onClick={() => onNavigateToCatalog('all')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer self-start sm:self-center shrink-0"
            >
              <span>See All Deals ({flashDeals.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Flash Deal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flashDeals.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Google AdSense Leaderboard Space #1 */}
      <AdSenseSpace
        slotId="98421034"
        format="leaderboard"
        label="Google AdSense Space (Header Placement)"
      />

      {/* 5. Makeup Kits & Vanity Sets Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glamour & Bridal Curation</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Curated Makeup Kits & Vanity Sets
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Complete sets with 18-shade eyeshadow palettes, HD foundation, vegan brushes, and long-stay pigments.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCatalog('makeup-kits')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Kits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {makeupKits.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 6. Skincare & Glow Serums Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dermatological & Ayurvedic Radiance</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bestselling Skincare Serums & Elixirs
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              10% Niacinamide, Kashmiri Saffron Kumkumadi, and 5D Hyaluronic water creams.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCatalog('skincare')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Skincare</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skincareProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 7. AdSense In-Feed / Native Space */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdSenseSpace
            slotId="5210984"
            format="in-feed"
            label="In-Feed Native Ad Slot A"
          />
          <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Special Festive Voucher
              </span>
              <h3 className="text-2xl font-black mt-3">
                Extra 20% Instant Discount on First Purchase
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Apply coupon code <strong className="text-amber-300">MEGA20</strong> during checkout to unlock additional savings on top of existing 60% discounts.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-purple-800/80">
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg">
                Code: MEGA20
              </span>
              <button
                onClick={() => onNavigateToCatalog('all')}
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Lipsticks & Eye Makeup Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Desi Undertone Picks</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trending Matte Lipsticks & 24H Waterproof Kajal
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Transfer-proof velvet textures, kajal duos, and rose-gold eyeshadow palettes.
            </p>
          </div>

          <button
            onClick={() => onNavigateToCatalog('lip-eye')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Lip & Eye</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lipAndEyeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 9. Under ₹99 Budget Steals */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-300/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-black text-slate-900 text-lg">Under ₹99 Super Budget Mega Steals</h3>
                <p className="text-xs text-slate-600">Extremely affordable beauty finds starting at just ₹39, ₹49 and ₹79</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToCatalog('clearance')}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              See All Budget Steals
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {clearanceDeals.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Beauty Magazine & Blog Highlights */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MegaDealz Beauty Magazine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Latest Beauty Guides & Expert Advice
            </h2>
          </div>
          <button
            onClick={onNavigateToBlog}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <div
              key={b.id}
              onClick={onNavigateToBlog}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold text-purple-700 uppercase">{b.category}</div>
                <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {b.title}
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  {b.excerpt}
                </p>
                <div className="mt-3 text-xs font-bold text-pink-600 flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
