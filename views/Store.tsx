
import React, { useMemo, useState } from 'react';
import { Search, Grid, List, SlidersHorizontal, Check, Smartphone, Laptop as LaptopIcon, Watch, Gamepad2, LayoutGrid } from 'lucide-react';
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
    { label: 'All Products', value: 'All', icon: <LayoutGrid size={14} /> },
    { label: 'iPhone', value: 'iPhone', icon: <Smartphone size={14} /> },
    { label: 'Laptop', value: 'Laptop', icon: <LaptopIcon size={14} /> },
    { label: 'Accessories', value: 'Accessories', icon: <Watch size={14} /> },
    { label: 'Gaming', value: 'Gaming', icon: <Gamepad2 size={14} /> },
  ];

  return (
    <div className="view-transition max-w-[1440px] mx-auto px-8 py-12 md:py-20 bg-black">
      <div className="space-y-2 mb-16">
        <h1 className="text-5xl md:text-[5.5rem] font-serif-luxury font-black italic tracking-tighter uppercase leading-none">Product Catalog</h1>
        <p className="text-white/40 text-sm md:text-lg font-light tracking-wide italic">Discover our premium collection of tech products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <aside className="w-full lg:w-[300px] bg-[#0f0f0f]/50 p-8 rounded-[2rem] border border-white/5 space-y-10 shrink-0 shadow-2xl">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-white" />
            <h2 className="text-lg font-black uppercase tracking-tighter italic">Filters</h2>
            <span className="text-xs font-bold text-white/40 ml-auto">11</span>
          </div>

          <div className="h-[1px] bg-white/5"></div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Categories</h3>
            <div className="flex flex-wrap gap-2.5">
              {categoryOptions.map(cat => (
                <button 
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.value ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                   {cat.icon}
                   {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Price Range</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-2">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Min</span>
                <div className="bg-black border border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-white transition-colors">
                  <input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="bg-transparent text-xs font-black w-full outline-none text-white" 
                  />
                </div>
              </div>
              <div className="pt-6 text-white/20">—</div>
              <div className="flex-1 space-y-2">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Max</span>
                <div className="bg-black border border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-white transition-colors">
                  <input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="bg-transparent text-xs font-black w-full outline-none text-white" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Availability</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${inStockOnly ? 'bg-white border-white' : 'border-white/10 group-hover:border-white/20'}`}
                onClick={() => setInStockOnly(!inStockOnly)}
              >
                {inStockOnly && <Check size={14} className="text-black stroke-[4]" />}
              </div>
              <span className="text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">In Stock Only</span>
            </label>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Sort By</h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest outline-none text-white focus:border-white appearance-none transition-colors cursor-pointer"
            >
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onClick={() => navigateTo('product-detail', p.id)}
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
            <div className="py-40 text-center space-y-4 opacity-30">
              <Search size={48} className="mx-auto mb-6" />
              <p className="text-sm font-black uppercase tracking-[0.3em] italic">No hardware units found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
