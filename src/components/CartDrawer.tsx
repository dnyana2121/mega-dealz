import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalTotal = items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const totalSavings = originalTotal - subtotal;

  const FREE_SHIPPING_THRESHOLD = 199;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 49;

  let promoDiscount = 0;
  if (appliedCoupon === 'MEGA20') {
    promoDiscount = Math.round(subtotal * 0.20);
  } else if (appliedCoupon === 'GLOW100') {
    promoDiscount = Math.min(Math.round(subtotal * 0.25), 40);
  }

  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (code === 'MEGA20' || code === 'GLOW100') {
      setAppliedCoupon(code);
    } else {
      setCouponError('Invalid coupon. Try "MEGA20" or "GLOW100"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Your Shopping Cart</h2>
              <p className="text-xs text-slate-500">{items.length} items in bag</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-gradient-to-r from-pink-50 to-amber-50 p-3 border-b border-pink-100 text-xs">
          {remainingForFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-pink-600" />
                  Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>FREE Delivery!</strong>
                </span>
                <span className="text-[11px] text-pink-600 font-bold">
                  {Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>🎉 Congratulations! You have qualified for FREE Express Delivery!</span>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Your Bag is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Explore our festive makeup kits and skincare mega deals with up to 70% discount.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedShade || 'default'}`}
                className="p-3 bg-white rounded-xl border border-slate-200 flex gap-3 shadow-xs hover:border-pink-200 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover border border-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-pink-600 uppercase">
                      {item.product.brand}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedShade && (
                      <span className="inline-block text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded mt-0.5">
                        Shade: {item.selectedShade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-slate-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400">
                          (₹{item.product.price} each)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-slate-800 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Breakdown */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Coupon Code Section */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. MEGA20)"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-1.5 text-xs uppercase font-semibold text-slate-800 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="mt-1 flex items-center justify-between text-[11px] text-green-700 font-bold bg-green-50 px-2 py-1 rounded">
                  <span>Code &apos;{appliedCoupon}&apos; Applied! (₹{promoDiscount} Saved)</span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>
              )}
              {couponError && (
                <div className="mt-1 text-[11px] text-rose-600 font-semibold">{couponError}</div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-2">
              <div className="flex justify-between">
                <span>Total MRP:</span>
                <span className="line-through">₹{originalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Product Discount:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-pink-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon}):</span>
                  <span>- ₹{promoDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Final Payable Amount:</span>
                <span className="text-base text-pink-700">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(promoDiscount, appliedCoupon || '')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-700 hover:to-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Safe & Secure Indian Gateway (UPI, COD, Cards)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
