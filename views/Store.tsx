
import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Check, Smartphone, Laptop as LaptopIcon, Watch, Gamepad2, LayoutGrid, Info } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../lib/utils';

interface StoreProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  navigateTo: (view: string, id?: string) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  compareIds: string[];
  onToggleCompare: (productId: string) => void;
  onAddToCart: (p: Product) => void;
}

export const Store: React.FC<StoreProps> = ({ 
  products, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  navigateTo,
  onQuickView,
  wishlist,
  toggleWishlist,
  compareIds,
  onToggleCompare,
  onAddToCart
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Most Popular');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => 
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      p.price >= minPrice && p.price <= maxPrice &&
      (!inStockOnly || p.stock > 0)
    );
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, inStockOnly]);

  const categoryOptions: { label: string, value: Category | 'All', icon: React.ReactNode }[] = [
    { label: 'ALL PRODUCTS', value: 'All', icon: <LayoutGrid size={16} /> },
    { label: 'IPHONE', value: 'iPhone', icon: <Smartphone size={16} /> },
    { label: 'LAPTOP', value: 'Laptop', icon: <LaptopIcon size={16} /> },
    { label: 'ACCESSORIES', value: 'Accessories', icon: <Watch size={16} /> },
    { label: 'GAMING', value: 'Gaming', icon: <Gamepad2 size={16} /> },
  ];

  return (
    <div className="view-transition bg-black min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sidebar Filter - Redesigned to match screenshot */}
        <aside className="lg:col-span-3">
          <div className="sticky top-32 space-y-12">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SlidersHorizontal size={22} className="text-white" />
                <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">FILTERS</h2>
              </div>
              <span className="text-[12px] font-black text-white/30 tracking-widest">11</span>
            </div>

            <div className="h-[1px] bg-white/5"></div>

            {/* Category Selector */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">CATEGORIES</h3>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map(cat => (
                  <button 
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`flex items-center gap-3 px-8 py-5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                      selectedCategory === cat.value 
                        ? 'bg-white text-black italic' 
                        : 'bg-white/5 text-white/40 border border-white/5 hover:border-white/20'
                    }`}
                  >
                     {cat.icon}
                     {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">PRICE RANGE</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-4">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-2">MIN</p>
                   <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl px-6 py-5 focus-within:border-[#D4AF37]/40 transition-all">
                      <input 
                        type="number" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="bg-transparent text-lg font-black w-full outline-none text-white italic" 
                      />
                   </div>
                </div>
                <div className="pt-8">
                  <div className="w-4 h-[2px] bg-white/10"></div>
                </div>
                <div className="flex-1 space-y-4">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-2">MAX</p>
                   <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl px-6 py-5 focus-within:border-[#D4AF37]/40 transition-all">
                      <input 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="bg-transparent text-lg font-black w-full outline-none text-white italic" 
                      />
                   </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">AVAILABILITY</h3>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div 
                  className={`w-7 h-7 rounded-xl border-2 transition-all flex items-center justify-center ${inStockOnly ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/10 bg-black/40'}`}
                  onClick={() => setInStockOnly(!inStockOnly)}
                >
                  {inStockOnly && <Check size={18} className="text-black stroke-[4]" />}
                </div>
                <span className="text-[12px] font-black text-white/40 group-hover:text-white transition-colors italic">In Stock Only</span>
              </label>
            </div>

            {/* Sort By at Bottom */}
            <div className="space-y-8 pt-10 border-t border-white/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">SORT BY</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-8 py-5 text-[11px] font-black uppercase tracking-widest outline-none text-white focus:border-[#D4AF37] transition-all appearance-none cursor-pointer italic"
              >
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-10">
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                placeholder="SEARCH REPOSITORY..." 
                value={searchQuery}
                onChange={(e) => navigateTo('store', e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-full pl-16 pr-8 py-5 text-[11px] font-black uppercase tracking-widest outline-none focus:border-[#D4AF37]/40 transition-all"
              />
            </div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 italic">
              Showing {filteredProducts.length} hardware units
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onQuickView={onQuickView}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
                isCompared={compareIds.includes(p.id)}
                onToggleCompare={onToggleCompare}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-40 text-center space-y-6 opacity-20">
              <Info size={64} className="mx-auto text-white/10" />
              <p className="text-sm font-black uppercase tracking-[0.5em] italic">NO HARDWARE UNITS MATCH YOUR SIGNAL.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
