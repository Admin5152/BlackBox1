
import React from 'react';
import { ShoppingBag, User as UserIcon, Search, Menu } from 'lucide-react';
import { User, CartItem } from '../types';

interface NavbarProps {
  view: string;
  user: User | null;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  navigateTo: (view: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  view, user, cart, searchQuery, setSearchQuery, navigateTo, setIsCartOpen, setIsMobileMenuOpen 
}) => {
  return (
    <nav className="sticky top-0 z-[60] backdrop-blur-xl border-b border-white/5 h-20 flex items-center transition-all bg-black/80 text-white">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-14">
          <h1 onClick={() => navigateTo('home')} className="text-2xl font-black tracking-tighter cursor-pointer italic hover:scale-105 transition-transform uppercase">
            BLACKBOX
          </h1>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
            <button onClick={() => navigateTo('home')} className={view === 'home' ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}>Home</button>
            <button onClick={() => navigateTo('store')} className={view === 'store' ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}>Shop</button>
            <button onClick={() => navigateTo('repair')} className={view === 'repair' ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}>Repairs</button>
            <button onClick={() => navigateTo('about')} className={view === 'about' ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}>About</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 border border-white/10 px-6 py-2 rounded-full transition-all bg-white/5 focus-within:border-white/40">
            <Search size={18} className="opacity-20" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm font-bold w-32 focus:w-48 transition-all placeholder:opacity-30"
              value={searchQuery}
              onChange={(e) => { 
                setSearchQuery(e.target.value);
                if (view !== 'store') navigateTo('store');
              }}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:bg-white/10 rounded-full transition-all">
            <ShoppingBag size={22}/>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 text-[9px] font-black rounded-full flex items-center justify-center bg-white text-black animate-in zoom-in">
                {cart.reduce((a,c)=>a+c.quantity,0)}
              </span>
            )}
          </button>
          <button onClick={() => (user ? navigateTo('profile') : navigateTo('auth'))} className="p-2.5 hover:bg-white/10 rounded-full transition-all">
            <UserIcon size={22}/>
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2.5"><Menu size={22}/></button>
        </div>
      </div>
    </nav>
  );
};
