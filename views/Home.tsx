
import React from 'react';
import { ArrowRight, ChevronRight, Smartphone, Laptop, Headphones, Gamepad2, Zap, ShieldCheck, Activity, Truck } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  navigateTo: (view: string, id?: string) => void;
  setSelectedCategory: (cat: any) => void;
}

const CategoryIcon = ({ cat, icon: Icon, onClick }: { cat: string, icon: any, onClick: () => void }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-4 group cursor-pointer">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0A0A0A] border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-white/40 transition-all group-hover:scale-110">
      <Icon size={32} className="text-white/40 group-hover:text-white transition-colors" />
    </div>
    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{cat}</span>
  </div>
);

export const Home: React.FC<HomeProps> = ({ products, navigateTo, setSelectedCategory }) => {
  return (
    <div className="view-transition space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-60 grayscale"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black"></div>
        </div>
        <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase italic animate-fade-in-up">
            MODERN PROBLEMS. <br/> REQUIRE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">MODERN SOLUTIONS.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100 uppercase tracking-widest">
            Elite Hardware & Master-Level Laboratory in Kumasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 animate-fade-in-up delay-200">
            <button onClick={() => navigateTo('store')} className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black text-sm rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl">
              Browse Store <ArrowRight size={22} />
            </button>
            <button onClick={() => navigateTo('repair')} className="w-full sm:w-auto px-12 py-5 border border-white/20 font-black text-sm rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest">
              Repair Lab
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 animate-fade-in-up delay-300">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-24 py-12 border-y border-white/5">
          <CategoryIcon cat="Phones" icon={Smartphone} onClick={() => { setSelectedCategory('Phones'); navigateTo('store'); }} />
          <CategoryIcon cat="Laptops" icon={Laptop} onClick={() => { setSelectedCategory('Laptops'); navigateTo('store'); }} />
          <CategoryIcon cat="Audio" icon={Headphones} onClick={() => { setSelectedCategory('Audio'); navigateTo('store'); }} />
          <CategoryIcon cat="Consoles" icon={Gamepad2} onClick={() => { setSelectedCategory('Consoles'); navigateTo('store'); }} />
          <CategoryIcon cat="Accessories" icon={Zap} onClick={() => { setSelectedCategory('Accessories'); navigateTo('store'); }} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex items-end justify-between gap-8 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Curated Inventory</p>
            <h2 className="text-5xl font-black tracking-tighter italic uppercase">BEST SELLERS.</h2>
          </div>
          <button onClick={() => navigateTo('store')} className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:gap-5 transition-all text-white/40 hover:text-white">
            View All Collection <ChevronRight size={18}/>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onClick={() => navigateTo('product-detail', p.id)} />
          ))}
        </div>
      </section>

      {/* Lab Trust Card */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0A0A0A] p-16 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center gap-16 group">
           <div className="md:w-1/2 space-y-8">
              <h3 className="text-6xl font-black italic tracking-tighter leading-none uppercase">THE REPAIR <br/> STANDARD.</h3>
              <p className="text-xl text-white/50 font-light leading-relaxed">
                Ghana's leading diagnostics facility. Logic board level precision for iPhone, MacBook, and Gaming consoles. Located at the heart of KNUST, Kumasi.
              </p>
              <button onClick={() => navigateTo('repair')} className="px-12 py-5 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest hover:scale-105 transition-all">
                Book Lab Priority
              </button>
           </div>
           <div className="md:w-1/2 grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Official Parts", desc: "Genuine certified components." },
                { icon: Zap, title: "Pulse AI", desc: "Advanced remote diagnostics." },
                { icon: Activity, title: "Real-time", desc: "Live tracking of your hardware." },
                { icon: Truck, title: "Safe Ship", desc: "Secure cross-regional logistics." }
              ].map((item, idx) => (
                <div key={item.title} className={`bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-3 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2`}>
                   <item.icon size={28} className="text-white/40"/>
                   <h4 className="text-lg font-bold">{item.title}</h4>
                   <p className="text-[11px] text-white/30 font-light uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};
