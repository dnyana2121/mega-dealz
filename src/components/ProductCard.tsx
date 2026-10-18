import React from 'react';
import { Heart, Star, ShoppingBag, Eye, Zap, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const savings = product.originalPrice - product.price;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Box */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-md tracking-tight flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            {product.discountPercentage}% OFF
          </span>
          {product.isBestSeller && (
            <span className="bg-amber-500 text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.stockCount && product.stockCount <= 10 && (
            <span className="bg-red-500/90 text-white font-medium text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              Only {product.stockCount} Left!
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-md scale-110'
              : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-0 bottom-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full py-1.5 px-3 bg-black/75 hover:bg-black text-white text-xs font-semibold rounded-lg backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-pink-600 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[11px] font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-slate-500 text-xs line-clamp-1 mt-1">
            {product.tagline}
          </p>

          {/* Shade Swatches Preview */}
          {product.shades && product.shades.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="text-[10px] text-slate-400 font-semibold">Shades:</span>
              <div className="flex items-center gap-1">
                {product.shades.map((shade, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600">
              Save ₹{savings.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs group/btn cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
