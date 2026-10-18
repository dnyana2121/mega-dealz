import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, Sparkles, ShoppingBag } from 'lucide-react';
import { BlogPost, Product } from '../types';
import { AdSenseSpace } from './AdSenseSpace';

interface BlogSectionProps {
  blogs: BlogPost[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>MegaDealz Beauty Magazine & Buying Guides</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Expert Makeup Routines, Swatches & Buying Guides
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Discover proven tips for Indian skin tones, bridal trousseau checklists, and active skincare breakdowns.
        </p>
      </div>

      {/* AdSense Top Slot */}
      <AdSenseSpace
        slotId="7382910"
        format="leaderboard"
        label="Google AdSense Banner (Magazine Top)"
      />

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {blogs.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-purple-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-pink-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 text-xs font-bold text-pink-600 group-hover:translate-x-1 transition-transform">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-slate-100 text-slate-700 rounded-full shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="bg-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2 inline-block">
                    {selectedPost.category}
                  </span>
                  <h1 className="text-xl sm:text-3xl font-black leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                    <span>By {selectedPost.author}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Article Content */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedPost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Mid-Article AdSense Placement */}
              <div className="my-6">
                <AdSenseSpace
                  slotId="6104928"
                  format="in-feed"
                  label="In-Article Sponsored Ad Placement"
                />
              </div>

              {/* Mentioned Products in Guide */}
              {selectedPost.relatedProductIds.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    <span>Featured Deals Recommended in this Guide:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPost.relatedProductIds.map((pid) => {
                      const prod = getProduct(pid);
                      if (!prod) return null;
                      return (
                        <div
                          key={prod.id}
                          className="p-3 bg-pink-50/60 rounded-xl border border-pink-200 flex gap-3 items-center justify-between"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="text-[10px] font-bold text-pink-700 uppercase">{prod.brand}</div>
                            <div className="text-xs font-bold text-slate-800 truncate">{prod.name}</div>
                            <div className="text-xs font-black text-slate-900 mt-0.5">
                              ₹{prod.price} <span className="line-through text-slate-400 font-normal text-[10px]">₹{prod.originalPrice}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedPost(null);
                              onSelectProduct(prod);
                            }}
                            className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shrink-0"
                          >
                            View Deal
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
