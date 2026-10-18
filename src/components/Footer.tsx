import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Truck,
  RotateCcw,
  PhoneCall,
  BadgePercent
} from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCategory: (cat: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenContact,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-900/60 via-purple-900/40 to-slate-900 border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-pink-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>VIP Festive Access Club</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get ₹150 Flat Discount On Your First Order
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Subscribe for exclusive flash deals, midnight beauty drops and AdSense partner giveaways.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Coupon code WELCOME150 sent to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                >
                  Claim ₹150 Off
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                ⚡
              </div>
              <span className="text-xl font-black text-white tracking-tight">MegaDealz India</span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4 text-xs">
              India’s trusted online destination for authentic makeup kits, skincare serums, beauty combos and daily lightning deals with Pan-India express delivery and verified Google AdSense partner promotions.
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Sealed Products • Pan-India COD</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('makeup-kits');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Bridal Makeup Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('skincare');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Skincare & Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('lip-eye');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Matte Lipsticks & Kajal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('haircare');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Anti-Hair Fall Combos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('fragrance');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Royal Oudh & Perfumes
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Shopping & Guides</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-pink-400 transition-colors cursor-pointer">
                  Beauty Guides & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('clearance');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Under ₹99 Clearance Steals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    onSelectCategory('combos');
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Festive 6-in-1 Bumper Sets
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-pink-400 transition-colors cursor-pointer">
                  Help Center & Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & AdSense info */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">AdSense & Policies</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="text-slate-400">Google AdSense Partner Ready</span>
              </li>
              <li>
                <span className="text-slate-400">Sample Promotional Pricing Showcase</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy & Cookie Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Affiliate Disclosure</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <button onClick={onOpenContact} className="text-pink-400 font-semibold hover:underline">
                  Advertise With Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MegaDealz India. All rights reserved. Made for Indian shoppers with ❤️.
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Accepted Payments:</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
              UPI / GPay / PhonePe
            </span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
              RuPay
            </span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
              Visa
            </span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
              MasterCard
            </span>
            <span className="bg-slate-900 border border-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
