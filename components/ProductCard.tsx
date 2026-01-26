
import React from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  onQuickView, 
  isWishlisted, 
  onToggleWishlist,
  onAddToCart
}) => {
  const oldPrice = product.discount ? product.price / (1 - product.discount / 100) : null;

  return (
    <div 
      className="group bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col h-full cursor-pointer relative"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.new && (
          <span className="bg-white text-black text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">New</span>
        )}
        {product.discount && (
          <span className="bg-[#EF4444] text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">-{product.discount}%</span>
        )}
      </div>

      <button 
        className={`absolute top-4 right-4 z-20 transition-all p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 hover:scale-110 active:scale-95 ${isWishlisted ? 'text-white' : 'text-white/40 hover:text-white'}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
      >
        <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
      </button>

      {/* Image Area */}
      <div className="aspect-[4/5] relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick View Overlay (Appears on Hover) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-2xl"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 italic">{product.category}</p>
          <h3 className="text-[13px] font-bold text-white transition-colors leading-snug line-clamp-2 uppercase italic">{product.name}</h3>
          
          <div className="flex items-center gap-1.5 pt-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className={i < Math.floor(product.rating || 4) ? 'fill-white text-white' : 'text-white/10'} />
              ))}
            </div>
            <span className="text-[10px] text-white/30 font-bold italic">({product.reviewCount || 0})</span>
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white tracking-tight">{formatCurrency(product.price)}</span>
            {oldPrice && (
              <span className="text-[10px] text-white/20 line-through font-medium">{formatCurrency(oldPrice)}</span>
            )}
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-4 bg-white hover:bg-white/90 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
