
import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import { CartItem, Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

interface CartProps {
  cart: CartItem[];
  products: Product[];
  updateQuantity: (id: string, options: Record<string, string> | undefined, delta: number) => void;
  removeFromCart: (uniqueId: string) => void;
  handleCheckout: (total: number) => void;
  navigateTo: (view: string, id?: string) => void;
}

export const Cart: React.FC<CartProps> = ({ 
  cart, 
  products, 
  updateQuantity, 
  removeFromCart, 
  handleCheckout, 
  navigateTo 
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.125; // 12.5% VAT
  const total = subtotal + tax;

  const recommendations = products
    .filter(p => !cart.find(c => c.id === p.id))
    .slice(0, 4);

  return (
    <div className="view-transition max-w-[1440px] mx-auto px-8 py-12 space-y-16 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-6xl font-black italic tracking-tighter uppercase font-serif-luxury">Shopping Cart</h1>
        <p className="text-white/30 text-sm font-bold uppercase tracking-widest italic">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => {
              const uniqueId = `${item.id}-${JSON.stringify(item.selectedOptions)}`;
              return (
                <div key={uniqueId} className="bg-[#121212] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10 group hover:border-white/20 transition-all duration-300">
                  <div className="w-40 h-40 bg-black rounded-2xl p-6 shrink-0 flex items-center justify-center overflow-hidden border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 w-full space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold uppercase tracking-tight line-clamp-2 leading-snug">{item.name}</h3>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic">{item.category}</p>
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-2">In Stock ({item.stock} available)</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                         <span className="text-lg font-black text-[#D4AF37]">{formatCurrency(item.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-8 bg-black border border-white/10 rounded-full px-6 py-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedOptions, -1)}
                          className="text-white/40 hover:text-white transition-colors p-1"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-lg font-black w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedOptions, 1)}
                          className="text-white/40 hover:text-white transition-colors p-1"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Item Total</p>
                          <span className="text-2xl font-black text-[#D4AF37] tracking-tighter">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(uniqueId)}
                          className="text-white/20 hover:text-red-500 transition-all duration-300 hover:scale-110 p-3 bg-white/5 rounded-full"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-40 text-center bg-[#121212] border border-white/5 rounded-[4rem] border-dashed">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={48} className="text-white/10" />
              </div>
              <p className="text-xl font-black uppercase tracking-[0.4em] text-white/20 italic">Your bag is currently empty.</p>
              <button 
                onClick={() => navigateTo('store')} 
                className="mt-8 px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-[#121212] border border-white/5 rounded-[3rem] p-10 shadow-2xl space-y-12">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter font-serif-luxury">Order Summary</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-white font-black">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                <span>Estimated Tax (12.5% VAT)</span>
                <span className="text-white font-black">{formatCurrency(tax)}</span>
              </div>
              
              <div className="h-[1px] bg-white/10 my-8"></div>
              
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-black text-white/30 uppercase tracking-widest italic">Total Amount</p>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black italic uppercase tracking-tighter">Total</span>
                  <span className="text-4xl font-black text-[#D4AF37] tracking-tighter">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleCheckout(total)}
                disabled={cart.length === 0}
                className="w-full py-6 bg-[#D4AF37] text-black rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)]"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigateTo('store')}
                className="w-full py-6 bg-[#1a1a1a] border border-white/5 hover:border-white/20 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-white/5"
              >
                <ArrowLeft size={18} /> Continue Shopping
              </button>
            </div>

            <div className="pt-8 flex items-start gap-5 border-t border-white/5">
              <div className="p-3 bg-green-500/10 rounded-2xl shrink-0">
                <ShieldCheck size={24} className="text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest">Secure Checkout</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Recommendations */}
      <section className="space-y-16 pt-16">
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter font-serif-luxury">You May Also Like</h2>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] italic">Elite hardware curations for your setup</p>
          </div>
          <button onClick={() => navigateTo('store')} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:brightness-125 transition-all flex items-center gap-2">View All <ArrowRight size={14}/></button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onClick={() => navigateTo('product-detail', p.id)}
              onQuickView={() => {}} // Could be wired up similarly
              isWishlisted={false}
              onToggleWishlist={() => {}}
              onAddToCart={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
