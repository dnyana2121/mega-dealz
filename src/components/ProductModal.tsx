import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Heart,
  Check,
  Zap,
  MapPin,
  Sparkles,
  Share2,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { PINCODES_DATABASE } from '../data/products';
import { AdSenseSpace } from './AdSenseSpace';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, shade?: string) => void;
  onBuyNow: (product: Product, quantity: number, shade?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  userPincode: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  userPincode,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.galleryImages[0] || product.image);
  const [selectedShade, setSelectedShade] = useState(product.shades ? product.shades[0]?.name : undefined);
  const [quantity, setQuantity] = useState(1);
  const [inputPincode, setInputPincode] = useState(userPincode);
  const [pinCheckResult, setPinCheckResult] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlights' | 'ingredients' | 'howToUse' | 'reviews'>('highlights');

  const savings = product.originalPrice - product.price;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = inputPincode.trim();
    if (pin.length !== 6) {
      setPinCheckResult('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    const matched = PINCODES_DATABASE[pin];
    if (matched) {
      setPinCheckResult(`✅ Express Delivery available to ${matched.city}, ${matched.state} within ${matched.days} days! COD eligible.`);
    } else {
      setPinCheckResult(`✅ Standard Delivery available to PIN ${pin} within 3-4 days! Cash on Delivery available.`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const sampleReviews = [
    {
      name: 'Ritu Sen Sharma',
      city: 'Kolkata',
      rating: 5,
      date: '3 days ago',
      text: 'Absolutely blown away by the pigment and buttery texture! The warm tones blend like butter on Indian skin. Packaging arrived in pristine condition with bubble wrap.',
      verified: true
    },
    {
      name: 'Sneha Patel',
      city: 'Ahmedabad',
      rating: 5,
      date: '1 week ago',
      text: 'Ordered during the flash sale at 60% off. 100% genuine sealed product. The lipstick stayed on through Diwali dinner and snacks!',
      verified: true
    },
    {
      name: 'Dr. Meenakshi K.',
      city: 'Bengaluru',
      rating: 4,
      date: '2 weeks ago',
      text: 'Non-comedogenic and didn’t trigger any breakouts on my sensitive skin. Highly recommend grabbing this deal before stock runs out.',
      verified: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Top Header sticky bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-pink-600 uppercase">{product.categoryLabel}</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">{product.brand}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors text-xs flex items-center gap-1"
              title="Share deal"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 mb-3 group shadow-xs">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  {product.discountPercentage}% MEGA DISCOUNT
                </span>
              </div>

              {/* Thumbnail Bar */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img ? 'border-pink-600 ring-2 ring-pink-100 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100% Authentic Product:</strong> Sourced directly from brand authorized distributor.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Free Express Shipping:</strong> Across India on orders above ₹199.</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>7-Day Returns:</strong> Hassle-free refund or replacement if damaged.</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-1">
                  {product.brand}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.name}
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  {product.tagline}
                </p>

                {/* Star rating & Reviews badge */}
                <div className="flex items-center gap-3 my-3">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">|</span>
                    <span>{product.reviewCount.toLocaleString('en-IN')} Verified Reviews</span>
                  </div>
                  {product.isDealOfTheDay && (
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-lg">
                      ⚡ Deal of the Day
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/70 to-pink-50/50 border border-pink-200/60 my-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-base text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      Save ₹{savings.toLocaleString('en-IN')} ({product.discountPercentage}% Off)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Inclusive of all taxes. Free Cash on Delivery available.
                  </div>
                  <div className="text-[10px] text-amber-800 bg-amber-100/70 rounded px-2 py-1 mt-2 font-medium">
                    * Sample promotional price for website design preview. Availability and final prices are confirmed by the seller upon dispatch.
                  </div>
                </div>

                {/* Shade Swatches */}
                {product.shades && product.shades.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                      <span>Select Shade / Tone: <strong className="text-pink-600">{selectedShade}</strong></span>
                      <span className="text-[11px] text-slate-400">Indian Undertone Matches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.shades.map((shade) => {
                        const isChosen = selectedShade === shade.name;
                        return (
                          <button
                            key={shade.name}
                            type="button"
                            onClick={() => setSelectedShade(shade.name)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                              isChosen
                                ? 'border-pink-600 bg-pink-50 text-pink-700 ring-2 ring-pink-200'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: shade.hex }}
                            />
                            <span>{shade.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-xs text-slate-900 bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                  {product.stockCount && (
                    <span className="text-xs text-rose-600 font-semibold">
                      Hurry, only {product.stockCount} left in stock!
                    </span>
                  )}
                </div>

                {/* Pincode Delivery Checker */}
                <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-pink-600" />
                    <span>Check Delivery & Cash on Delivery (COD):</span>
                  </div>
                  <form onSubmit={handlePincodeCheck} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={inputPincode}
                      onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-pink-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Check
                    </button>
                  </form>
                  {pinCheckResult && (
                    <div className="mt-2 text-[11px] font-semibold text-slate-700 animate-in fade-in">
                      {pinCheckResult}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedShade);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onBuyNow(product, quantity, selectedShade);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-700 hover:to-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/25 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details, Ingredients, Reviews Tabs */}
          <div className="mt-10 border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 gap-4 overflow-x-auto">
              {[
                { id: 'highlights', label: 'Key Highlights' },
                { id: 'ingredients', label: 'Key Ingredients & Formula' },
                { id: 'howToUse', label: 'How to Use' },
                { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-pink-600 text-pink-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeTab === 'highlights' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Active Ingredients:</h4>
                  {product.keyIngredients && product.keyIngredients.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {product.keyIngredients.map((item, idx) => (
                        <span key={idx} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold border border-pink-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">Cruelty-free, dermatologically tested hypoallergenic active formula.</p>
                  )}
                </div>
              )}

              {activeTab === 'howToUse' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-slate-800 font-medium">
                    {product.howToUse || 'Apply as directed on the packaging for best long-lasting festive radiance.'}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-900">{product.rating}</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-slate-500 text-xs">Based on {product.reviewCount} verified ratings</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {sampleReviews.map((r, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{r.name} ({r.city})</span>
                          <span className="text-slate-400 text-[11px]">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            {[...Array(r.rating)].map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                          {r.verified && (
                            <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.2 rounded font-semibold">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AdSense Placement inside Product Detail View */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <AdSenseSpace
              slotId="8932410"
              format="in-feed"
              label="Sponsored Product Recommendation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
