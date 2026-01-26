
import React, { useState } from 'react';
import { Search, Menu, User as UserIcon, Wrench, X, ShoppingCart, Home, ShoppingBag } from 'lucide-react';
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const navItemClass = (isActive: boolean) => `
    flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300
    ${isActive ? 'bg-[#D4AF37] text-black font-black' : 'text-white/60 hover:text-white hover:bg-white/5'}
  `;

  return (
    <nav className="sticky top-0 z-[60] glass h-24 flex items-center transition-all bg-black/95 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 flex items-center">
          <div 
            onClick={() => navigateTo('home')}
            className={`flex items-center gap-3 cursor-pointer group transition-opacity ${isSearchActive ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-black italic text-xl">B</div>
            <div>
              <h1 className="text-lg font-black tracking-tighter leading-none group-hover:text-white transition-colors">BLACKBOX</h1>
              <p className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Premium Tech</p>
            </div>
          </div>
        </div>

        {/* Center Nav */}
        <div className={`hidden lg:flex items-center gap-4 text-[13px] font-bold tracking-tight transition-opacity ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button onClick={() => navigateTo('home')} className={navItemClass(view === 'home')}>
            <Home size={20} strokeWidth={2.5} /> Home
          </button>
          
          <button onClick={() => navigateTo('store')} className={navItemClass(view === 'store')}>
            <ShoppingBag size={20} strokeWidth={2.5} /> Products
          </button>
          
          <button onClick={() => navigateTo('repair')} className={navItemClass(view === 'repair')}>
            <Wrench size={20} strokeWidth={2.5} /> Repairs
          </button>
          
          <button 
            onClick={() => navigateTo('cart')} 
            className={`relative ${navItemClass(view === 'cart')}`}
          >
            <ShoppingCart size={20} strokeWidth={2.5} /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#EF4444] text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-black animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => (user ? navigateTo('profile') : navigateTo('auth'))} 
            className={navItemClass(view === 'profile' || view === 'auth')}
          >
            <UserIcon size={20} strokeWidth={2.5} /> Account
          </button>
        </div>

        {/* Search Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center px-8 transition-all duration-300 ${isSearchActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full max-w-2xl relative">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              autoFocus={isSearchActive}
              placeholder="Search for Elite Hardware..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-16 pr-16 py-5 text-base font-medium outline-none focus:border-[#D4AF37] transition-all"
            />
            <button 
              onClick={() => { setIsSearchActive(false); setSearchQuery(''); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <button 
            onClick={() => setIsSearchActive(true)}
            className={`p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all ${isSearchActive ? 'scale-0' : 'scale-100'}`}
          >
            <Search size={22} />
          </button>

          {!user && (
            <button 
              onClick={() => navigateTo('auth')} 
              className={`px-8 py-3.5 bg-[#D4AF37] text-black hover:brightness-110 transition-all rounded-full text-[12px] font-black uppercase tracking-widest ${isSearchActive ? 'hidden' : 'flex'}`}
            >
              Sign In
            </button>
          )}
          
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 text-white/60 hover:text-white hover:bg-white/5 rounded-full">
            <Menu size={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};
