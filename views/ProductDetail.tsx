
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  navigateTo: (view: string, id?: string) => void;
  addToCart: (product: Product, options: Record<string, string>, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedProducts, 
  navigateTo, 
  addToCart, 
  isWishlisted, 
  onToggleWishlist 
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="view-transition min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center border-b border-white/5">
        <button onClick={() => navigateTo('store')} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-[0.3em] italic">
          <ArrowLeft size={18}/> Back to Shop
        </button>
        <div className="text-xs font-black uppercase tracking-[0.5em] opacity-20">Black Box // Technical Repository</div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-[0.4em] uppercase opacity-20 italic">/ {product.category}</span>
                <button 
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isWishlisted ? 'text-white' : 'text-white/30 hover:text-white'}`}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
                  {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none italic uppercase">{product.name}</h1>
            </div>
            
            <div className="max-w-md space-y-8">
              <p className="text-base text-white/50 leading-relaxed font-light italic">
                {product.description}
              </p>

              {product.variants && product.variants.map(variant => (
                <div key={variant.name} className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">{variant.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map(option => (
                      <button 
                        key={option}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [variant.name]: option }))}
                        className={`px-5 py-3 rounded-xl border text-[10px] font-black transition-all ${selectedOptions[variant.name] === option ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-6 pt-6">
                <button 
                  onClick={() => addToCart(product, selectedOptions, quantity)}
                  className="flex-1 py-5 bg-white text-black font-black text-[10px] rounded-2xl shadow-2xl hover:bg-white/90 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} /> Buy Now {formatCurrency(product.price)}
                </button>
                <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:opacity-50 text-white/40 hover:text-white"><Minus size={16}/></button>
                  <span className="text-lg font-black w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:opacity-50 text-white/40 hover:text-white"><Plus size={16}/></button>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4 border-t border-white/5 opacity-40">
                <ShieldCheck size={20} />
                <p className="text-[9px] font-black uppercase tracking-[0.2em]">Black Box Precision Warranty // 24 Month Coverage</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative animate-fade-in-up delay-200">
            <div className="aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl border border-white/5 group bg-[#0a0a0a] flex items-center justify-center p-12">
              <img 
                src={product.image} 
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" 
                alt={product.name} 
              />
            </div>
            <div className="absolute -bottom-10 right-0 flex items-center gap-6">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
                 <span>01</span>
                 <div className="w-24 h-[1px] bg-white/10 relative">
                   <div className="absolute top-0 left-0 w-1/3 h-full bg-white"></div>
                 </div>
                 <span>04</span>
               </div>
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all shadow-xl">
                  <ArrowRight size={20} />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Complete Your Kit</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Curated essential hardware pairings</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(rp => (
              <ProductCard 
                key={rp.id} 
                product={rp} 
                onClick={() => navigateTo('product-detail', rp.id)}
                onQuickView={() => {}} 
                isWishlisted={false}
                onToggleWishlist={() => {}}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
