
import React from 'react';
import { Search, Menu, User as UserIcon, Wrench, X, ShoppingCart, Home, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { User, CartItem } from '../types';

interface NavbarProps {
  user: User | null;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, cart, searchQuery, setSearchQuery, setIsMobileMenuOpen 
}) => {
  const location = useLocation();
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const navItemClass = (path: string) => `
    flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-widest
    ${location.pathname === path ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}
  `;

  return (
    <nav className="sticky top-0 z-[60] h-24 flex items-center bg-black/95 border-b border-white/5 backdrop-blur-3xl">
      <div className="max-w-[1440px] mx-auto px-8 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group transition-opacity">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center font-black text-black italic text-xl">B</div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black tracking-tighter leading-none">BLACKBOX</h1>
            <p className="text-[9px] font-black text-[#D4AF37]/50 tracking-[0.3em] uppercase">PREMIUM TECH</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/" className={navItemClass('/')}><Home size={16} /> Home</Link>
          <Link to="/store" className={navItemClass('/store')}><ShoppingBag size={16} /> Products</Link>
          <Link to="/repair" className={navItemClass('/repair')}><Wrench size={16} /> Repairs</Link>
          <Link to="/cart" className={navItemClass('/cart')}>
            <ShoppingCart size={16} /> Bag
            {cartCount > 0 && <span className="ml-2 px-2 py-0.5 bg-[#D4AF37] text-black text-[9px] rounded-full">{cartCount}</span>}
          </Link>
          
          <Link 
            to={user ? '/profile' : '/auth'} 
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-widest ml-4
              ${user ? 'bg-white/5 text-white border border-white/10 hover:border-[#D4AF37]/50' : 'bg-[#D4AF37] text-black shadow-lg hover:brightness-110'}
            `}
          >
            <UserIcon size={16} /> {user ? 'Account' : 'Sign In'}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              placeholder="LOG SEARCH..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#D4AF37]/40 transition-all w-48 focus:w-64"
            />
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 text-white/40 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-colors">
            <Menu size={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};
