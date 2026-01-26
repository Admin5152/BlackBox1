
import React from 'react';
import { X, ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';

interface CompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ 
  products, 
  isOpen, 
  onClose, 
  onRemove, 
  onAddToCart 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-[90vw] bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-500 max-h-[90vh]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter font-serif-luxury">Hardware Comparison</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Comparing {products.length} units</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all border border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar p-8">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
              <p className="text-sm font-black uppercase tracking-[0.3em]">No products selected for comparison.</p>
            </div>
          ) : (
            <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
              {/* Labels Column */}
              <div className="flex flex-col">
                <div className="h-64 p-6 bg-black flex items-end">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Unit Visuals</span>
                </div>
                {[
                  'Category',
                  'Price',
                  'Rating',
                  'Stock Status',
                  'Key Specs',
                ].map(label => (
                  <div key={label} className="p-6 bg-black border-t border-white/5 flex items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{label}</span>
                  </div>
                ))}
                <div className="flex-1 bg-black p-6"></div>
              </div>

              {/* Product Columns */}
              {products.map((p) => (
                <div key={p.id} className="flex flex-col bg-[#0f0f0f] relative group">
                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemove(p.id)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-red-500 text-white/40 hover:text-white rounded-full transition-all z-10"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="h-64 p-8 flex items-center justify-center bg-black/40 border-l border-white/5">
                    <img src={p.image} className="w-full h-full object-contain" alt={p.name} />
                  </div>

                  <div className="p-6 border-t border-white/5 flex flex-col justify-center h-[72px] border-l">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">{p.category}</p>
                  </div>

                  <div className="p-6 border-t border-white/5 flex flex-col justify-center h-[72px] border-l">
                    <p className="text-xl font-black text-[#D4AF37] tracking-tighter">{formatCurrency(p.price)}</p>
                  </div>

                  <div className="p-6 border-t border-white/5 flex items-center h-[72px] border-l gap-2">
                    <CheckCircle2 size={14} className="text-[#D4AF37]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{p.rating || '4.5'}/5.0</p>
                  </div>

                  <div className="p-6 border-t border-white/5 flex flex-col justify-center h-[72px] border-l">
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{p.stock > 0 ? `Ready (${p.stock})` : 'Out of Stock'}</p>
                  </div>

                  <div className="p-6 border-t border-white/5 flex flex-col border-l space-y-2 min-h-[120px]">
                    {p.specs?.map((spec, i) => (
                      <p key={i} className="text-[10px] font-medium text-white/40 uppercase tracking-wide italic leading-tight">• {spec}</p>
                    )) || <p className="text-[10px] text-white/10 italic">No specs provided</p>}
                  </div>

                  <div className="p-8 border-t border-white/5 border-l bg-black/20 flex-1">
                    <button 
                      onClick={() => onAddToCart(p)}
                      className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                    >
                      <ShoppingCart size={14} /> Acquisition
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
