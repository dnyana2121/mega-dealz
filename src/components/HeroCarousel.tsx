import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgePercent,
  Flame,
  ArrowRight
} from 'lucide-react';
import { FlashDealTimer } from './FlashDealTimer';

interface HeroCarouselProps {
  onShopNow: (category?: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'FESTIVE BRIDAL EDIT 2026',
      title: 'Grand Bridal Makeup Kits & Luxury Vanity Boxes',
      highlight: 'Now Just ₹199 (MRP ₹499) • 60% OFF',
      subtitle: 'Waterproof 18-shade palettes, sweat-resistant HD foundation, vegan brushes & lip trios tailored for Indian skin tones.',
      cta: 'Explore Makeup Kits @ ₹199',
      category: 'makeup-kits',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      tagColor: 'bg-rose-500 text-white',
      accentBg: 'from-rose-950/90 via-slate-900/80 to-transparent'
    },
    {
      id: 2,
      badge: 'VIRAL SKINCARE CARNIVAL',
      title: 'Ayurvedic Kumkumadi Gold & Niacinamide Serums',
      highlight: 'Starting @ Just ₹59 (Up to 70% OFF)',
      subtitle: 'Clear blemishes, shrink open pores, and get translucent glass skin with 100% authentic active botanicals.',
      cta: 'Shop Skincare Serums @ ₹59+',
      category: 'skincare',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      tagColor: 'bg-amber-500 text-slate-900',
      accentBg: 'from-amber-950/90 via-slate-900/80 to-transparent'
    },
    {
      id: 3,
      badge: 'SUPER SAVER BUMPER DEALS',
      title: 'Festive 6-in-1 Beauty Bumper Combos & Lip Trios',
      highlight: 'Lip Trios ₹79 | 6-in-1 Combos ₹199',
      subtitle: 'Primer + Foundation + Kajal + Lip Mousse + Beauty Blender. Complete makeover sets with Cash on Delivery.',
      cta: 'Grab Combos @ ₹199',
      category: 'combos',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
      tagColor: 'bg-pink-600 text-white',
      accentBg: 'from-pink-950/90 via-slate-900/80 to-transparent'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Banner Slides */}
      <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center brightness-90"
            />
            {/* Dark overlay for contrast */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentBg}`}></div>

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 sm:px-10 py-10 text-white">
              <div className="max-w-2xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md ${slide.tagColor}`}>
                    {slide.badge}
                  </span>
                  <FlashDealTimer variant="compact" label="Deal Ends Today" />
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {slide.title}
                </h1>

                <div className="inline-block bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent text-xl sm:text-2xl font-black">
                  {slide.highlight}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onShopNow(slide.category)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onShopNow('clearance')}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Budget Steals from ₹39
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
          title="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
          title="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-pink-500' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Guarantees Strip */}
      <div className="bg-slate-900 border-t border-slate-800 text-slate-300 py-3 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">100% Genuine Brands</div>
              <div className="text-[11px] text-slate-400">Direct warehouse dispatch</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Pan-India Express COD</div>
              <div className="text-[11px] text-slate-400">Free delivery on ₹499+</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <RotateCcw className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-bold text-white">7-Day Easy Returns</div>
              <div className="text-[11px] text-slate-400">No questions asked guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <BadgePercent className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <div className="font-bold text-white">MegaDealz Price Match</div>
              <div className="text-[11px] text-slate-400">Lowest prices on cosmetics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
