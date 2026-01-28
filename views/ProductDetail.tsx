
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Heart, ShoppingBag, ShieldCheck, ShoppingCart } from 'lucide-react';
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
        <button onClick={() => navigateTo('store')} className="flex items-center gap-3 text-white/40 hover:text-[#D4AF37] transition-colors text-[11px] font-black uppercase tracking-[0.4em] italic">
          <ArrowLeft size={18}/> BACK TO CATALOG
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">BLACK BOX // TECHNICAL REPOSITORY</div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-6 space-y-12 animate-in slide-in-from-left-10 duration-1000">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#D4AF37] italic opacity-60">/ {product.category}</span>
                <button 
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${isWishlisted ? 'text-[#D4AF37]' : 'text-white/20 hover:text-white'}`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-[#D4AF37]' : ''} />
                  {isWishlisted ? 'IN WISHLIST' : 'LOG TO WISHLIST'}
                </button>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] italic uppercase">{product.name}</h1>
            </div>
            
            <div className="max-w-xl space-y-10">
              <p className="text-lg text-white/40 leading-relaxed font-light italic">
                {product.description}
              </p>

              {product.variants && product.variants.map(variant => (
                <div key={variant.name} className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">{variant.name}</label>
                  <div className="flex flex-wrap gap-3">
                    {variant.options.map(option => (
                      <button 
                        key={option}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [variant.name]: option }))}
                        className={`px-8 py-4 rounded-xl border-2 text-[11px] font-black transition-all ${selectedOptions[variant.name] === option ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-lg' : 'border-white/5 hover:border-white/20'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-8">
                   <span className="text-5xl font-black italic tracking-tighter text-[#D4AF37]">{formatCurrency(product.price)}</span>
                   <div className="flex items-center gap-10 bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/40 hover:text-[#D4AF37]"><Minus size={18}/></button>
                    <span className="text-2xl font-black w-8 text-center italic">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-white/40 hover:text-[#D4AF37]"><Plus size={18}/></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button 
                    onClick={() => addToCart(product, selectedOptions, quantity)}
                    className="py-6 border-2 border-[#D4AF37] text-[#D4AF37] font-black text-[11px] rounded-2xl transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#D4AF37] hover:text-black"
                  >
                    <ShoppingCart size={20} /> ADD TO CART
                  </button>
                  <button 
                    onClick={() => { addToCart(product, selectedOptions, quantity); navigateTo('cart'); }}
                    className="py-6 bg-[#D4AF37] text-black font-black text-[11px] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
                  >
                    <ShoppingBag size={20} /> BUY NOW
                  </button>
                </div>
              </div>

              <div className="pt-10 flex items-center gap-6 border-t border-white/5 opacity-20">
                <ShieldCheck size={28} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">Precision Certified // 24 Month Bench Coverage</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-in zoom-in-95 duration-1000">
            <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
            <div className="aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl border border-white/5 group bg-[#0a0a0a] flex items-center justify-center p-16 relative z-10">
              <img 
                src={product.image} 
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" 
                alt={product.name} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">HARDWARE PAIRINGS</h3>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#D4AF37] italic opacity-60">/ COMPLETE YOUR KIT</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(rp => (
              <ProductCard 
                key={rp.id} 
                product={rp} 
                onQuickView={() => {}} 
                isWishlisted={false}
                onToggleWishlist={() => {}}
                onAddToCart={(p) => addToCart(p, {}, 1)}
                isCompared={false}
                onToggleCompare={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
