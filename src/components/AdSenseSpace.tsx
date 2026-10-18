import React, { useState } from 'react';
import { Sparkles, Info, ExternalLink, Code2, Check, X } from 'lucide-react';

interface AdSenseSpaceProps {
  slotId: string;
  format: 'leaderboard' | 'in-feed' | 'rectangle' | 'banner';
  label?: string;
  className?: string;
}

export const AdSenseSpace: React.FC<AdSenseSpaceProps> = ({
  slotId,
  format,
  label = 'Sponsored Advertisement',
  className = ''
}) => {
  const [showCodeDetails, setShowCodeDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const codeSnippet = `<!-- Google AdSense Unit: ${format.toUpperCase()} (MegaDealz India) -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXX"
     data-ad-slot="${slotId}"
     data-ad-format="${format === 'leaderboard' ? 'horizontal' : format === 'rectangle' ? 'rectangle' : 'auto'}"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const copySnippet = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (format === 'leaderboard') {
    return (
      <div className={`relative my-6 mx-auto w-full max-w-6xl px-4 ${className}`}>
        <div className="flex items-center justify-between pb-1.5 px-2 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="uppercase tracking-wider font-semibold text-slate-600">Google AdSense Space</span>
            <span className="text-slate-400">| Slot #{slotId}</span>
          </div>
          <button
            onClick={() => setShowCodeDetails(!showCodeDetails)}
            className="flex items-center gap-1 text-pink-600 hover:text-pink-700 cursor-pointer font-semibold"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCodeDetails ? 'Hide Ad Code' : 'AdSense Tag Info'}</span>
          </button>
        </div>

        {showCodeDetails && (
          <div className="mb-3 p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono relative overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
              <span className="text-pink-400 font-semibold">Ready-to-Deploy Google AdSense Code Snippet</span>
              <button
                onClick={copySnippet}
                className="flex items-center gap-1 bg-pink-600 hover:bg-pink-500 text-white px-2 py-1 rounded text-[11px]"
              >
                {copied ? <Check className="w-3 h-3 text-green-300" /> : null}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-wrap">{codeSnippet}</pre>
          </div>
        )}

        {/* Ad Container */}
        <div className="relative overflow-hidden rounded-xl border border-dashed border-amber-300/80 bg-gradient-to-r from-amber-50/70 via-rose-50/50 to-orange-50/70 shadow-xs hover:border-amber-400 transition-all p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    AdSense Ready • 728x90 / Mobile
                  </span>
                  <span className="text-slate-400 text-xs hidden md:inline">Verified Google Partner Placement</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base mt-0.5">
                  Mega Festive Deals on SBI & HDFC Credit Cards: Extra 10% Instant Cashback
                </h4>
                <p className="text-slate-500 text-xs line-clamp-1">
                  Apply during checkout on makeup kits & luxury perfumes. T&C Apply. Sponsored Placement.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#deals"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-pink-600 transition-colors shadow-xs"
              >
                <span>Check Partner Offers</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsDismissed(true)}
                title="Dismiss ad preview"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (format === 'in-feed') {
    return (
      <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-pink-300 bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-white p-5 flex flex-col justify-between shadow-xs ${className}`}>
        <div>
          <div className="flex items-center justify-between mb-3 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            <span className="flex items-center gap-1 text-pink-700">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              Google AdSense In-Feed Ad
            </span>
            <span className="text-slate-400">Slot #{slotId}</span>
          </div>

          <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200 group">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
              alt="Sponsored Beauty Brand"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              Sponsored
            </div>
          </div>

          <h4 className="font-bold text-slate-900 text-base mb-1 line-clamp-1">
            Nykaa Fashion & Runway Festival 2026
          </h4>
          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-3">
            Explore 500+ designer beauty launches with 48-hour delivery across India. Use exclusive code NYKMEGA.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between pt-3 border-t border-pink-100">
            <span className="text-[11px] font-semibold text-pink-600">Sponsored Ad</span>
            <button
              onClick={() => setShowCodeDetails(!showCodeDetails)}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline font-medium"
            >
              {showCodeDetails ? 'Close Tag' : 'View Ad Tag'}
            </button>
          </div>

          {showCodeDetails && (
            <div className="mt-2 p-2 bg-slate-900 text-slate-200 rounded text-[10px] font-mono">
              data-ad-slot=&quot;{slotId}&quot;
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rectangle format (300x250 sidebar / box)
  return (
    <div className={`p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 text-center ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
        <span>AdSense Box (300x250)</span>
        <span>#{slotId}</span>
      </div>
      <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs flex flex-col items-center">
        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded mb-2">
          ADVERTISEMENT
        </span>
        <h5 className="font-bold text-slate-800 text-sm mb-1">
          Exclusive Ayurvedic Beauty Subscription
        </h5>
        <p className="text-slate-500 text-xs mb-3">
          Get 5 miniature luxury serums & oils delivered every month for only ₹499.
        </p>
        <button className="px-4 py-1.5 bg-pink-600 text-white rounded-md text-xs font-semibold hover:bg-pink-700 transition-colors w-full">
          Learn More
        </button>
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Future Google AdSense integration slot</p>
    </div>
  );
};
