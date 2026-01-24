
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  navigateTo: (view: string, id?: string) => void;
  addToCart: (product: Product, options: Record<string, string>, qty: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts, navigateTo, addToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="view-transition min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center border-b border-white/5">
        <button onClick={() => navigateTo('store')} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-[0.3em]">
          <ArrowLeft size={18}/> Back to Shop
        </button>
        <div className="text-xs font-black uppercase tracking-[0.5em] opacity-30">Black Box // Tech Specs</div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.4em] uppercase opacity-20">/ {product.category}</span>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none italic uppercase">{product.name}</h1>
            </div>
            
            <div className="max-w-md space-y-8">
              <p className="text-base text-white/50 leading-relaxed font-light">
                {product.description}
              </p>

              {product.variants && product.variants.map(variant => (
                <div key={variant.name} className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{variant.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map(option => (
                      <button 
                        key={option}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [variant.name]: option }))}
                        className={`px-4 py-2 rounded-lg border text-[10px] font-black transition-all ${selectedOptions[variant.name] === option ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30'}`}
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
                  className="flex-1 py-4 bg-white text-black font-black text-[10px] rounded-lg shadow-2xl hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-[0.2em]"
                >
                  Buy {formatCurrency(product.price)}
                </button>
                <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:opacity-50 text-white/40 hover:text-white"><Minus size={14}/></button>
                  <span className="text-sm font-black w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:opacity-50 text-white/40 hover:text-white"><Plus size={14}/></button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative animate-fade-in-up delay-200">
            <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 group">
              <img 
                src={product.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={product.name} 
              />
            </div>
            <div className="absolute -bottom-10 right-0 flex items-center gap-6">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                 <span>01</span>
                 <div className="w-24 h-[1px] bg-white/10 relative">
                   <div className="absolute top-0 left-0 w-1/3 h-full bg-white"></div>
                 </div>
                 <span>04</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all">
                  <ArrowRight size={20} />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-center text-white/20 tracking-[0.2em]">UPGRADE YOUR GEAR.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(rp => <ProductCard key={rp.id} product={rp} onClick={() => navigateTo('product-detail', rp.id)} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
