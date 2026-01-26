
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ArrowRight, ChevronLeft, 
  Smartphone, Laptop as LaptopIcon, Gamepad2, 
  Sparkles, CheckCircle2, Zap 
} from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  navigateTo: (view: string, id?: string) => void;
  setSelectedCategory: (cat: Category | 'All') => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  onAddToCart: (p: Product) => void;
}

interface CategoryCard {
  id: string;
  name: Category;
  description: string;
  image: string;
  icon: React.ElementType;
  count: number;
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
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Featured products for the hero slider
  const featuredProducts = products.filter(p => p.id === 'BB-106' || p.id === 'BB-105' || p.id === 'BB-101' || p.id === 'BB-104');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

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

  const currentHero = featuredProducts[currentHeroIndex];

  const handleNext = () => setCurrentHeroIndex((prev) => (prev + 1) % featuredProducts.length);
  const handlePrev = () => setCurrentHeroIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  const categories: CategoryCard[] = [
    {
      id: "cat-1",
      name: "iPhone",
      description: "Latest iPhone models and premium hardware",
      image: "https://images.unsplash.com/photo-1722710682948-22b556b528ce",
      icon: Smartphone,
      count: products.filter(p => p.category === 'iPhone').length
    },
    {
      id: "cat-2",
      name: "Laptop",
      description: "Elite MacBooks and pro performance machines",
      image: "https://images.unsplash.com/photo-1671777560821-707c83d0305f",
      icon: LaptopIcon,
      count: products.filter(p => p.category === 'Laptop').length
    },
    {
      id: "cat-3",
      name: "Gaming",
      description: "Next-gen consoles and immersive controllers",
      image: "https://images.unsplash.com/photo-1688735533160-6125c4834485",
      icon: Gamepad2,
      count: products.filter(p => p.category === 'Gaming').length
    },
    {
      id: "cat-4",
      name: "Accessories",
      description: "Essential gear and specialized tech tools",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200",
      icon: Sparkles,
      count: products.filter(p => p.category === 'Accessories').length
    }
  ];

  return (
    <div className="view-transition bg-black overflow-hidden">
      {/* Precision Hero Slider */}
      <section className="relative h-[85vh] flex items-center hero-gradient">
        <button 
          onClick={handlePrev}
          className="absolute left-8 z-20 p-5 bg-white/5 hover:bg-white hover:text-black rounded-full text-white/40 transition-all hidden md:flex items-center justify-center border border-white/5 hover:border-white shadow-2xl active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-8 z-20 p-5 bg-white/5 hover:bg-white hover:text-black rounded-full text-white/40 transition-all hidden md:flex items-center justify-center border border-white/5 hover:border-white shadow-2xl active:scale-90"
        >
          <ChevronRight size={28} />
        </button>

        <div className="max-w-[1440px] mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-12 relative">
          <div key={`content-${currentHeroIndex}`} className="flex-1 space-y-10 z-10 animate-in fade-in slide-in-from-left-8 duration-1000 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-[6.5rem] font-serif-luxury font-black tracking-tighter leading-[0.95] text-white uppercase italic drop-shadow-2xl">
                {currentHero.name.split(' ').slice(0, 2).join('\n')}
                <br/>
                <span className="text-[#D4AF37]">{currentHero.name.split(' ').slice(2, 4).join(' ')}</span>
              </h1>
              <p className="text-white/40 text-lg md:text-xl font-black uppercase tracking-[0.4em] italic flex items-center justify-center md:justify-start gap-4">
                <span className="w-8 h-[1px] bg-white/20"></span> Mind-blowing. Head-turning.
              </p>
            </div>
            
            <p className="text-base md:text-lg text-white/50 max-w-sm font-light leading-relaxed mx-auto md:mx-0 italic">
              {currentHero.description}
            </p>

            <div className="pt-4 flex items-center justify-center md:justify-start gap-6">
              <button 
                onClick={() => navigateTo('product-detail', currentHero.id)}
                className="px-12 py-5 bg-[#D4AF37] text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
              >
                Explore {currentHero.category} <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div key={`image-${currentHeroIndex}`} className="flex-1 relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="absolute w-[120%] h-[120%] bg-white/5 blur-[150px] rounded-full"></div>
            <img 
              src={currentHero.image} 
              className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.8)] relative z-10"
              alt={currentHero.name}
            />
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {featuredProducts.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentHeroIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${currentHeroIndex === i ? 'w-16 bg-[#D4AF37]' : 'w-4 bg-white/10 hover:bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-32 px-8 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-serif-luxury font-black italic tracking-tighter uppercase leading-none">Shop by Category</h2>
            <div className="flex items-center justify-center gap-4">
               <div className="w-12 h-[1px] bg-white/10"></div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] italic">Explore our specialized hardware repositories</p>
               <div className="w-12 h-[1px] bg-white/10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => { setSelectedCategory(category.name); navigateTo('store'); }}
                className="group relative h-[450px] bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-700 shadow-2xl"
              >
                {/* Image Background */}
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-30 group-hover:opacity-60 scale-100 group-hover:scale-110 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                      <category.icon size={28} strokeWidth={1.5} />
                    </div>
                    <span className="bg-white/10 backdrop-blur-md text-[10px] font-black px-4 py-2 rounded-full border border-white/5 uppercase tracking-widest text-white/60">
                      {category.count} Units
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{category.name}</h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest italic">{category.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Enter Lab <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-32 px-8 max-w-[1440px] mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif-luxury font-black italic tracking-tighter uppercase leading-none">Curated Selection</h2>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] italic">Authorized Premium Hardware Acquisitions</p>
          </div>
          <button 
            onClick={() => navigateTo('store')}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] flex items-center gap-2 hover:translate-x-2 transition-transform"
          >
            Explore Full Inventory <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
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
              <span className="text-white text-xs font-black uppercase tracking-[0.6em] flex items-center gap-4 opacity-40 italic">
                <div className="w-12 h-[1px] bg-white"></div> Specialized Diagnostics
              </span>
              <h3 className="text-5xl md:text-7xl font-serif-luxury font-black italic tracking-tighter leading-none uppercase">The Lab <br/> Benchmark.</h3>
              <p className="text-xl text-white/40 font-light leading-relaxed max-w-xl italic">
                Every component verified. Every circuit precision-mapped. Our Kumasi facility establishes the absolute standard for hardware integrity in Ghana.
              </p>
              <button 
                onClick={() => navigateTo('repair')} 
                className="px-10 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-[#D4AF37] active:scale-95 transition-all shadow-2xl"
              >
                Schedule Diagnostic Bench <ChevronRight size={14} className="inline ml-2"/>
              </button>
           </div>
           <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full group-hover:bg-white/10 transition-colors"></div>
              <img 
                src="https://images.unsplash.com/photo-1517336714467-d13a2323485d?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[3rem] w-full object-cover aspect-video grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1.5s]"
                alt="Lab Bench"
              />
              <div className="absolute top-8 right-8 bg-[#D4AF37] text-black p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                <Zap size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Bench Status: Active</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
