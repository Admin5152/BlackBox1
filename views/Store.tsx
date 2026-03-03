import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Check, Smartphone, Laptop as LaptopIcon, Watch, Gamepad2, LayoutGrid, Info, RefreshCcw, TrendingUp, Filter, X, ChevronDown, Grid3x3, List } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../lib/utils';
import type { Theme } from '../App';

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
  theme?: Theme;
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
  onAddToCart,
  theme,
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isLight = theme === 'light';

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let results = products.filter(p =>
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      p.price >= minPrice && p.price <= maxPrice &&
      (!inStockOnly || p.stock > 0)
    );
    switch (sortBy) {
      case 'Price: Low to High': results = [...results].sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': results = [...results].sort((a, b) => b.price - a.price); break;
      case 'Newest Arrivals': results = [...results].reverse(); break;
    }
    return results;
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, inStockOnly, sortBy]);

  const categoryOptions: { label: string; value: Category | 'All'; icon: React.ReactNode; count?: number }[] = [
    { label: 'ALL PRODUCTS', value: 'All', icon: <LayoutGrid size={14} />, count: products.length },
    { label: 'IPHONE', value: 'iPhone', icon: <Smartphone size={14} />, count: products.filter(p => p.category === 'iPhone').length },
    { label: 'LAPTOP', value: 'Laptop', icon: <LaptopIcon size={14} />, count: products.filter(p => p.category === 'Laptop').length },
    { label: 'ACCESSORIES', value: 'Accessories', icon: <Watch size={14} />, count: products.filter(p => p.category === 'Accessories').length },
    { label: 'GAMING', value: 'Gaming', icon: <Gamepad2 size={14} />, count: products.filter(p => p.category === 'Gaming').length },
  ];

  const activeFiltersCount = [
    selectedCategory !== 'All', minPrice > 0, maxPrice < 15000, inStockOnly
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setMinPrice(0);
    setMaxPrice(15000);
    setInStockOnly(false);
  };

  const pageBg = isLight ? '#FDFCF8' : '#060605';
  const panelBg = isLight ? '#FFFFFF' : '#0d0d0b';
  const inputBg = { backgroundColor: isLight ? '#FFFFFF' : '#0d0d0b' };
  const borderSubtle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)';
  const borderFaint = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
  const textMuted = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)';
  const textMuted2 = isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)';

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBg, color: isLight ? '#000' : '#fff' }}>

      {/* Top Bar */}
      <div style={{ borderBottom: `1px solid ${borderFaint}` }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <span className="text-xs" style={{ color: textMuted }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
          </span>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${borderSubtle}` }}>
              <button
                onClick={() => setViewMode('grid')}
                className="px-2.5 py-2 transition-colors"
                style={{
                  backgroundColor: viewMode === 'grid' ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)') : 'transparent',
                  color: viewMode === 'grid' ? (isLight ? '#000' : '#fff') : textMuted,
                }}
              >
                <Grid3x3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="px-2.5 py-2 transition-colors"
                style={{
                  backgroundColor: viewMode === 'list' ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)') : 'transparent',
                  color: viewMode === 'list' ? (isLight ? '#000' : '#fff') : textMuted,
                }}
              >
                <List size={14} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none border rounded-lg pl-3 pr-7 py-2 text-xs focus:outline-none transition-colors"
                style={{ ...inputBg, borderColor: borderSubtle, color: textMuted, backgroundColor: panelBg }}
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: textMuted2 }} size={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">

          {/* Sidebar */}
          <div className="w-60 min-h-[calc(100vh-49px)] hidden lg:block flex-shrink-0" style={{ borderRight: `1px solid ${borderFaint}` }}>
            <div className="p-5 space-y-7">

              {/* Filter header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className={isLight ? "text-gray-500" : "text-white/30"} />
                  <h2 className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-gray-600" : "text-white/50"}`}>Filters</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className={`text-[10px] font-bold transition-colors uppercase tracking-wider ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/30 hover:text-white'}`}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/25'}`}>Categories</p>
                <div className="space-y-1">
                  {categoryOptions.map(cat => {
                    const isActive = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => cat.value === 'Trades' ? navigateTo('trades') : setSelectedCategory(cat.value)}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-between"
                        style={{
                          backgroundColor: isActive
                            ? (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)')
                            : 'transparent',
                          border: `1px solid ${isActive
                            ? (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.14)')
                            : 'transparent'}`,
                          color: isActive
                            ? (isLight ? '#000' : '#fff')
                            : textMuted,
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 0 10px rgba(0,0,0,0.05)' : '0 0 10px rgba(205,160,50,0.2)';
                            (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(205,160,50,0.3)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                          }
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {cat.icon}
                          <span className="font-semibold">{cat.label}</span>
                        </div>
                        {cat.count !== undefined && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{
                            backgroundColor: isActive
                              ? (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')
                              : (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'),
                            color: isActive ? (isLight ? '#000' : 'rgba(255,255,255,0.8)') : textMuted
                          }}>
                            {cat.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/25'}`}>Price Range</p>
                <div className="space-y-2">
                  <div>
                    <label className={`text-[10px] mb-1 block ${isLight ? 'text-gray-500' : 'text-white/25'}`}>Min Price</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={e => setMinPrice(Number(e.target.value))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors ${isLight ? 'text-gray-900 border-gray-200 focus:border-gray-400 bg-white' : 'text-white border-white/10 bg-[#0d0d0b]'}`}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] mb-1 block ${isLight ? 'text-gray-500' : 'text-white/25'}`}>Max Price</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors ${isLight ? 'text-gray-900 border-gray-200 focus:border-gray-400 bg-white' : 'text-white border-white/10 bg-[#0d0d0b]'}`}
                      placeholder="15000"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/25'}`}>Availability</p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className={`w-3.5 h-3.5 rounded ${isLight ? 'accent-black' : 'accent-white'}`}
                  />
                  <span className={`text-xs ${isLight ? 'text-gray-600' : 'text-white/40'}`}>In Stock Only</span>
                </label>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-4 lg:py-6 lg:pl-6">

            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`lg:hidden w-full mb-4 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${isLight ? 'text-gray-700 hover:text-black bg-white border border-gray-200' : 'text-white/50 hover:text-white bg-white/5 border border-white/10'}`}
            >
              <SlidersHorizontal size={13} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>

            {/* Mobile Filters Drawer */}
            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 z-[120]">
                <div className={`absolute inset-0 backdrop-blur-sm ${isLight ? 'bg-black/20' : 'bg-black/80'}`} onClick={() => setShowMobileFilters(false)} />
                <div className={`absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t p-5 overflow-auto no-scrollbar ${isLight ? 'bg-[#FDFCF8] border-gray-200' : 'bg-[#0d0d0b] border-white/10'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={14} className={isLight ? 'text-gray-500' : 'text-white/40'} />
                      <h2 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-gray-800' : 'text-white/70'}`}>Filters</h2>
                    </div>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className={`p-2 rounded-full border transition-colors ${isLight ? 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200' : 'bg-white/5 border-white/10 text-white/70'}`}
                      aria-label="Close filters"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => { clearAllFilters(); }}
                      className={`w-full mb-5 py-3 rounded-xl border text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${isLight ? 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
                    >
                      Clear all filters
                    </button>
                  )}

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/40'}`}>Categories</p>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryOptions.map(cat => (
                          <button
                            key={cat.value}
                            onClick={() => {
                              if (cat.value === 'Trades') { navigateTo('trades'); return; }
                              setSelectedCategory(cat.value);
                            }}
                            className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between border transition-colors`}
                            style={{
                              backgroundColor: selectedCategory === cat.value ? (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)') : (isLight ? 'white' : 'rgba(255,255,255,0.03)'),
                              borderColor: selectedCategory === cat.value ? (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(205,160,50,0.5)') : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'),
                              color: selectedCategory === cat.value ? (isLight ? '#000' : '#fff') : (isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'),
                            }}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              {cat.icon}
                              <span className="truncate">{cat.label}</span>
                            </span>
                            {cat.count !== undefined && (
                              <span className={`text-[9px] px-2 py-0.5 rounded-full ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-white/50'}`}>
                                {cat.count}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/40'}`}>Price range</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={`text-[10px] mb-1 block ${isLight ? 'text-gray-500' : 'text-white/35'}`}>Min</label>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={e => setMinPrice(Number(e.target.value))}
                            className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#0d0d0b] border-white/10 text-white'}`}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className={`text-[10px] mb-1 block ${isLight ? 'text-gray-500' : 'text-white/35'}`}>Max</label>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                            className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#0d0d0b] border-white/10 text-white'}`}
                            placeholder="15000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-white/40'}`}>Availability</p>
                      <label className={`flex items-center justify-between gap-3 cursor-pointer p-3 rounded-xl border transition-colors ${isLight ? 'bg-white/60 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                        <span className={`text-xs font-bold ${isLight ? 'text-gray-700' : 'text-white/70'}`}>In stock only</span>
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={e => setInStockOnly(e.target.checked)}
                          className={`w-4 h-4 rounded ${isLight ? 'accent-black' : 'accent-[#CDA032]'}`}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-white/10">
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-full py-4 rounded-2xl bg-[#CDA032] text-black text-[11px] font-black uppercase tracking-[0.25em]"
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/30'}`}>No products found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className={`mt-3 text-[10px] transition-colors underline ${isLight ? 'text-gray-500 hover:text-black' : 'text-white/30 hover:text-white'}`}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="group rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
                      backgroundColor: panelBg,
                      boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.03)' : 'none'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(212,175,55,0.4)' : 'rgba(205,160,50,0.4)';
                      (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 10px 30px rgba(0,0,0,0.08)' : '0 0 16px rgba(205,160,50,0.12)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 4px 15px rgba(0,0,0,0.03)' : 'none';
                      (e.currentTarget as HTMLElement).style.transform = 'none';
                    }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={onQuickView}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAddToCart={onAddToCart}
                      isCompared={compareIds.includes(product.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: panelBg,
                      border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.03)' : 'none'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(212,175,55,0.4)' : 'rgba(205,160,50,0.35)';
                      (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 8px 20px rgba(0,0,0,0.06)' : '0 0 14px rgba(205,160,50,0.1)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLElement).style.boxShadow = isLight ? '0 2px 8px rgba(0,0,0,0.03)' : 'none';
                    }}
                  >
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p className={`text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-white/25'}`}>{product.category}</p>
                        <h3 className={`text-sm font-semibold truncate mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>{product.name}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{formatCurrency(product.price)}</span>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-black transition-all hover:brightness-90 hover:scale-105 active:scale-95"
                          style={{ backgroundColor: '#B38B21' }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};