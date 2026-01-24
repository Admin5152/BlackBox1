
import React, { useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

interface StoreProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  navigateTo: (view: string, id?: string) => void;
}

export const Store: React.FC<StoreProps> = ({ products, searchQuery, selectedCategory, setSelectedCategory, navigateTo }) => {
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => 
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="view-transition max-w-7xl mx-auto px-6 py-24 space-y-16">
      <div className="flex items-end justify-between border-b border-white/10 pb-8 animate-fade-in-up">
        <h2 className="text-5xl font-black tracking-tighter italic uppercase">THE SHOP.</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Phones', 'Laptops', 'Audio', 'Consoles', 'Accessories'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/40'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={() => navigateTo('product-detail', p.id)} />)}
      </div>
    </div>
  );
};
