import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { CartItem } from '../types';
import { PINCODES_DATABASE } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  couponCode: string;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  couponCode,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    fullName: 'Pooja Sharma',
    phone: '9876543210',
    email: 'pooja.sharma@example.com',
    pincode: '400001',
    address: 'Flat 402, Lotus Residency, Marine Lines',
    landmark: 'Near Metro Station',
    city: 'Mumbai',
    state: 'Maharashtra',
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('pooja@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 199 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handlePincodeChange = (pin: string) => {
    const cleaned = pin.replace(/\D/g, '').slice(0, 6);
    const matched = PINCODES_DATABASE[cleaned];
    if (matched) {
      setFormData(prev => ({ ...prev, pincode: cleaned, city: matched.city, state: matched.state }));
    } else {
      setFormData(prev => ({ ...prev, pincode: cleaned }));
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `MDZ-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(orderId);
      setIsProcessing(false);
      setStep('confirmed');
      onOrderSuccess(orderId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-lg">MegaDealz Express Checkout</span>
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              256-Bit Encrypted
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Steps Progress */}
        {step !== 'confirmed' && (
          <div className="flex border-b border-slate-100 text-xs font-bold text-center bg-white">
            <div
              className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1.5 ${
                step === 'shipping' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-400'
              }`}
            >
              <span>1. Delivery Address</span>
            </div>
            <div
              className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1.5 ${
                step === 'payment' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-400'
              }`}
            >
              <span>2. Payment & Confirmation</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 flex-1">
          {step === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-pink-600" />
                <span>Shipping Address in India</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Recipient's Name"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Number (+91)</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="10-digit mobile number for order SMS"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">Flat, House no., Building, Apartment</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Street Address"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pincode (6 Digits)</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:border-pink-500 focus:outline-none"
                    placeholder="e.g. 400001"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">City / Town</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="City"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-200">
                <div className="text-xs">
                  <span className="text-slate-500">Order Total: </span>
                  <span className="font-black text-slate-900 text-sm">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-pink-600" />
                <span>Select Payment Method</span>
              </h3>

              <div className="space-y-2.5">
                {/* UPI Option */}
                <label
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 text-pink-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">
                        Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">
                        Fastest
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pay securely directly from your bank app</p>
                    {paymentMethod === 'upi' && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@bank"
                          className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs"
                        />
                        <button
                          type="button"
                          className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold"
                        >
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-pink-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-slate-500 font-semibold">Available for this PIN</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash or UPI directly to delivery agent at your doorstep
                    </p>
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-pink-600"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 text-xs">
                      Credit / Debit Card (Visa, RuPay, MasterCard)
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Extra 10% instant discount on select cards</p>
                  </div>
                </label>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Shipping To:</span>
                  <span className="font-bold text-slate-800">{formData.fullName}, {formData.city} ({formData.pincode})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Items:</span>
                  <span>{items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between font-black text-slate-900 text-sm pt-1 border-t border-slate-200">
                  <span>Amount to Pay:</span>
                  <span className="text-pink-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-700 text-white font-extrabold rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
                      <PackageCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you for shopping on MegaDealz India. We&apos;ve sent a confirmation SMS to +91 {formData.phone}.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold text-pink-600">{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-slate-800">2-3 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold uppercase text-slate-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                  <span>Total Amount Paid/Due:</span>
                  <span className="text-pink-600 font-black">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
