
import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../lib/utils';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  handleCheckout: (total: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, removeFromCart, handleCheckout }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-black border-l border-white/10 shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-12 text-white">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">MY BAG</h2>
            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all"><X size={32} /></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-10 no-scrollbar">
            {cart.map(item => (
              <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-8 group animate-in slide-in-from-right-4">
                <div className="w-24 h-24 bg-[#111] rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg truncate w-40 leading-tight">{item.name}</h4>
                    <button onClick={() => removeFromCart(`${item.id}-${JSON.stringify(item.selectedOptions)}`)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                  </div>
                  <p className="text-xl font-black">{formatCurrency(item.price)}</p>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            {cart.length === 0 && <div className="text-center py-32 text-white/20 italic text-lg font-light uppercase tracking-widest">Bag empty.</div>}
          </div>
          {cart.length > 0 && (
            <div className="pt-12 border-t border-white/10 space-y-10">
               <div className="flex justify-between text-3xl font-black italic uppercase"><span>TOTAL</span><span>{formatCurrency(total)}</span></div>
               <button onClick={() => handleCheckout(total)} className="w-full py-6 bg-white text-black font-black text-[10px] rounded-xl shadow-2xl hover:scale-105 transition-all uppercase tracking-[0.3em]">PROCEED TO CHECKOUT</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
