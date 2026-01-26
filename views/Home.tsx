
import React from 'react';
import { ChevronRight, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  navigateTo: (view: string, id?: string) => void;
  setSelectedCategory: (cat: any) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  onAddToCart: (p: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  products, 
  navigateTo, 
  setSelectedCategory, 
  onQuickView, 
  wishlist, 
  toggleWishlist,
  onAddToCart
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Initializing Black Box...</p>
        </div>
      </div>
    );
  }

  const heroProduct = products.find(p => p.id === 'BB-106') || products[0];

  return (
    <div className="view-transition bg-black">
      {/* Precision Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden hero-gradient">
        <button className="absolute left-8 z-20 p-4 bg-white/5 hover:bg-white hover:text-black rounded-full text-white/40 transition-all hidden md:block">
          <ChevronLeft size={32} />
        </button>
        <button className="absolute right-8 z-20 p-4 bg-white/5 hover:bg-white hover:text-black rounded-full text-white/40 transition-all hidden md:block">
          <ChevronRightIcon size={32} />
        </button>

        <div className="max-w-[1440px] mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-10 z-10 animate-view-in text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-[7rem] font-serif-luxury font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                {heroProduct.name.split(' ').slice(0, 2).join('\n')}
                <br/>
                {heroProduct.name.split(' ').slice(2, 4).join(' ')}
              </h1>
              <p className="text-[#D4AF37] text-xl font-black uppercase tracking-[0.2em] italic">
                Play has no limits.
              </p>
            </div>
            
            <p className="text-lg text-white/50 max-w-sm font-light leading-relaxed mx-auto md:mx-0">
              {heroProduct.description}
            </p>

            <div className="pt-4">
              <button 
                onClick={() => navigateTo('product-detail', heroProduct.id)}
                className="px-12 py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 mx-auto md:mx-0 hover:bg-white/90 active:scale-95 transition-all shadow-2xl"
              >
                Discover Gaming <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center animate-view-in delay-200">
            <div className="absolute w-[120%] h-[120%] bg-white/5 blur-[150px] rounded-full"></div>
            <img 
              src={heroProduct.image} 
              className="w-full max-w-[800px] h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative z-10"
              alt={heroProduct.name}
            />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-12 h-1.5 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-32 px-8 max-w-[1440px] mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif-luxury font-black italic tracking-tighter uppercase leading-none">The Collection</h2>
            <p className="text-white/30 text-sm font-bold uppercase tracking-[0.4em]">Elite Hardware Solutions</p>
          </div>
          <button 
            onClick={() => navigateTo('store')}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-2 hover:translate-x-2 transition-transform opacity-60 hover:opacity-100"
          >
            Explore All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.slice(0, 3).map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onClick={() => navigateTo('product-detail', p.id)}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onAddToCart={onAddToCart}
              isCompared={false}
              onToggleCompare={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Repair Banner */}
      <section className="px-8 pb-32">
        <div className="max-w-[1440px] mx-auto bg-[#0f0f0f] rounded-[4rem] p-16 md:p-32 flex flex-col md:flex-row items-center gap-20 overflow-hidden relative border border-white/5 group">
           <div className="flex-1 space-y-10 z-10">
              <span className="text-white text-xs font-black uppercase tracking-[0.6em] flex items-center gap-4 opacity-40">
                <div className="w-12 h-[1px] bg-white"></div> Expert Lab Support
              </span>
              <h3 className="text-5xl md:text-7xl font-serif-luxury font-black italic tracking-tighter leading-none uppercase">The Lab <br/> Standard.</h3>
              <p className="text-xl text-white/40 font-light leading-relaxed max-w-xl">
                Every component verified. Every repair precision-mapped. Our Kumasi facility sets the standard for hardware integrity.
              </p>
              <button 
                onClick={() => navigateTo('repair')} 
                className="px-10 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-white/90 active:scale-95 transition-all shadow-2xl"
              >
                Book Diagnostic Session <ChevronRightIcon size={14} className="inline ml-2"/>
              </button>
           </div>
           <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full group-hover:bg-white/10 transition-colors"></div>
              <img 
                src="https://images.unsplash.com/photo-1517336714467-d13a2323485d?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[3rem] w-full object-cover aspect-video grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1.5s]"
                alt="Lab"
              />
           </div>
        </div>
      </section>
    </div>
  );
};
