import React, { useState, useEffect } from 'react';
import {
  ChevronRight, ChevronLeft, ArrowRight, Smartphone, Laptop as LaptopIcon, Gamepad2, Package, Settings,
  Users, Award, TrendingUp, Star, Quote, ArrowLeftRight, Wrench, Mail, Phone, MapPin, Search, Heart, Eye
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getImagesForTheme, getPositionClasses, getBlurClasses } from '../data/heroImages';

interface HomeProps {
  products: Product[];
  setSelectedCategory: (cat: Category | 'All') => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  onAddToCart: (p: Product) => void;
  compareIds: string[];
  onToggleCompare: (productId: string) => void;
  user: any;
  theme: 'light' | 'dark';
}

export const Home: React.FC<HomeProps> = ({
  products, setSelectedCategory, onQuickView, wishlist, toggleWishlist, onAddToCart, compareIds, onToggleCompare, user, theme
}) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images for current theme
  const themeImages = getImagesForTheme(theme);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    if (themeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % themeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [themeImages]);

  const [currentHighlightsIndex, setCurrentHighlightsIndex] = useState(0);
  const highlights = products.filter(p => ['Accessories', 'Gaming', 'Audio', 'iPhone'].includes(p.category)).slice(0, 6);

  const nextHighlight = () => setCurrentHighlightsIndex((prev) => (prev + 1) % highlights.length);
  const prevHighlight = () => setCurrentHighlightsIndex((prev) => (prev - 1 + highlights.length) % highlights.length);

  if (!products || products.length === 0) return null;

  const categories = [
    {
      name: "iPhone" as Category,
      desc: "Latest iPhone models and premium hardware",
      img: "https://images.unsplash.com/photo-1722710682948-22b556b528ce",
      icon: Smartphone,
      products: products.filter(p => p.category === 'iPhone').slice(0, 3)
    },
    {
      name: "Laptop" as Category,
      desc: "Elite MacBooks and pro performance machines",
      img: "https://images.unsplash.com/photo-1671777560821-707c83d0305f",
      icon: LaptopIcon,
      products: products.filter(p => p.category === 'Laptop').slice(0, 3)
    },
    {
      name: "Gaming" as Category,
      desc: "Next-gen consoles and immersive controllers",
      img: "https://images.unsplash.com/photo-1606813907291-d86ebb9474ad",
      icon: Gamepad2,
      products: products.filter(p => p.category === 'Gaming').slice(0, 3)
    },
    {
      name: "Accessories" as Category,
      desc: "Premium accessories and tech essentials",
      img: "https://images.unsplash.com/photo-1556656793-062ff987b50d",
      icon: Package,
      products: products.filter(p => p.category === 'Accessories').slice(0, 3)
    }
  ];

  const customerReviews = [
    { name: "Kwame Asante", text: "Excellent service and quality products. BlackBox is my go-to for all tech needs.", rating: 5 },
    { name: "Ama Mensah", text: "Professional repair service and fair trade-in values. Highly recommended!", rating: 5 },
    { name: "Kojo Osei", text: "Great customer service and authentic products. The best tech store in Kumasi.", rating: 5 },
    { name: "Yaa Boakye", text: "Fast repairs and reasonable prices. I'm very satisfied with their service.", rating: 5 },
    { name: "Kwame Boateng", text: "Amazing experience! Got exactly what I needed at a great price.", rating: 5 }
  ];

  return (
    <div className="view-transition bg-black overflow-hidden no-print">
      {/* Main Content */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-8 overflow-hidden">
        {/* Background with tech accessories */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black subtle-texture"></div>

          {/* Single Background Image with Slideshow */}
          {themeImages.length > 0 && (
            <div className="absolute inset-0 overflow-hidden">
              {themeImages.map((img, index) => (
                <img
                  key={img.filename}
                  src={`/${img.filename}`}
                  alt={img.description}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-2000 ease-in-out ${index === currentImageIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                    }`}
                  style={{
                    filter: `${theme === 'light' && img.filename === 'BlackBox.jpeg' ? 'invert(1) brightness(1.2)' : ''
                      }`,
                    transform: index === currentImageIndex ? 'scale(1)' : 'scale(1.1)'
                  }}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Dark overlay for text readability */}
          <div className={`absolute inset-0 ${theme === 'dark'
              ? 'bg-gradient-to-r from-black/60 via-transparent to-black/40'
              : 'bg-gradient-to-r from-black/20 via-transparent to-black/10'
            }`}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Main Content */}
            <div className="space-y-8">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-heading font-bold tracking-wider leading-[1.1] lg:leading-[0.9] lg:min-h-[2.7em] ${theme === 'dark' ? 'text-off-white' : 'text-gray-900'
                }`}>
                Redefining Your
                <br />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === 'dark'
                    ? 'from-[#D4AF37] to-[#F4E4C1]'
                    : 'from-[#B38B21] to-[#D4AF37]'
                  }`}>
                  Tech Experience
                </span>
              </h1>

              <div className="space-y-4 max-w-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-100 stagger-2">
                <p className={`text-lg font-light leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Premium tech products, expert repairs, and seamless trade-ins for the modern enthusiast.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200 stagger-3">
                <Link
                  to="/store"
                  className={`btn-press inline-flex px-12 py-5 rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] active:scale-95 ${theme === 'dark'
                      ? 'bg-white text-black hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)]'
                      : 'bg-black text-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
                    }`}
                >
                  Browse Products
                  <ArrowRight className="transition-transform group-hover:translate-x-2" size={18} />
                </Link>

                <Link
                  to="/profile"
                  className={`btn-press inline-flex px-12 py-5 rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 ${theme === 'dark'
                      ? 'bg-black text-off-white border-2 border-white/20 hover:bg-white hover:text-black'
                      : 'bg-white text-black border-2 border-black/20 hover:bg-black hover:text-white'
                    }`}
                >
                  About Us
                  <ArrowRight className="transition-transform group-hover:translate-x-2" size={18} />
                </Link>
              </div>
            </div>

            {/* Right Side - Empty space for visual balance */}
            <div className="relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
              <div className="w-full h-96 flex items-center justify-center">
                {/* Subtle glow effect */}
                <div className="w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retail Section */}
      <section className="py-12 md:py-16 px-8 bg-gradient-to-b from-black to-gray-950 section-connector">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-wider mb-4">
              Featured Products
            </h2>
            <div className="w-32 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our curated selection of premium tech products
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-500 font-heading font-semibold tracking-wider">LIMITED STOCK</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[#D4AF37]/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                    <category.icon size={20} className="text-white group-hover:text-black" />
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-heading font-semibold text-white tracking-wide">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {category.desc}
                  </p>
                  <div className="pt-4">
                    <Link
                      to="/store"
                      onClick={() => setSelectedCategory(category.name)}
                      className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F4E4C1] transition-colors text-sm font-heading font-medium"
                    >
                      Explore {category.name}
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/store"
              className="relative inline-flex px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-3 transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:scale-105 group"
            >
              <ArrowRight className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" size={16} />
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access / Accessories Slider */}
      <section className={`py-6 md:py-10 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-[#f5f5f7]'}`}>
        <div className="max-w-screen-2xl mx-auto">

          <div className="flex items-center justify-end mb-6 px-4 md:px-8 gap-3">
            <button
              onClick={() => document.getElementById('accessories-slider')?.scrollBy({ left: -400, behavior: 'smooth' })}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => document.getElementById('accessories-slider')?.scrollBy({ left: 400, behavior: 'smooth' })}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div id="accessories-slider" className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-8 pb-8" style={{ scrollPaddingLeft: 'max(1rem, env(safe-area-inset-left))' }}>
            {/* Promo Card */}
            <div className={`w-[300px] md:w-[400px] min-h-[400px] md:min-h-[500px] ${theme === 'dark' ? 'bg-[#111]' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'} p-8 md:p-12 rounded-[2rem] flex flex-col justify-between snap-start flex-shrink-0 shadow-sm border border-black/5 dark:border-white/5`}>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Take a peek</h2>
                <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>The accessories you love.<br />In a fresh mix of colors.</p>
              </div>
              <div className="flex justify-center mt-8">
                <img src="/cases.jpeg" alt="Accessories" className="h-40 md:h-56 object-cover rounded-2xl drop-shadow-xl" />
              </div>
            </div>

            {/* Product Cards */}
            {products.filter(p => p.category === 'Accessories' || p.category === 'iPhone').slice(0, 8).map(p => (
              <div
                key={p.id}
                onClick={() => onQuickView(p)}
                className={`w-[260px] md:w-[300px] h-[360px] md:h-[420px] rounded-[2rem] snap-start flex-shrink-0 flex flex-col group cursor-pointer overflow-hidden relative shadow-lg ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#ffffff]'}`}
              >
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className={`absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 rounded-bl-[1.5rem] transition-colors ${theme === 'dark' ? 'border-white/20' : 'border-[#B38B21]/40'}`} />
                  <div className={`absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 rounded-br-[1.5rem] transition-colors ${theme === 'dark' ? 'border-white/20' : 'border-[#B38B21]/40'}`} />
                </div>

                <div className="absolute top-0 inset-x-0 h-[60%] pt-8 px-8 transform group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-lg" />
                </div>

                <div className="absolute top-4 right-4 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-md z-20 rounded-full px-4 py-2 hover:bg-black/20 dark:hover:bg-white/20">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <Search size={12} /> View
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col z-20 bg-gradient-to-t from-black/5 to-transparent dark:from-black/80 dark:to-transparent">
                  <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={`${i < Math.floor(p.rating || 4) ? 'text-[#CDA032] fill-current' : theme === 'dark' ? 'text-white/20' : 'text-black/20'}`} />
                    ))}
                    <span className={`text-[9px] font-bold ml-1 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>({p.reviewCount || 678})</span>
                  </div>

                  <h3 className={`font-black uppercase italic tracking-wider text-sm leading-tight mb-1 line-clamp-2 drop-shadow-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {p.name}
                  </h3>

                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <span className={`text-[9px] mb-0.5 block uppercase tracking-widest italic ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{p.category}</span>
                      <p className="font-black text-xl tracking-tighter text-[#CDA032] drop-shadow-sm">
                        {formatCurrency(p.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); if (navigateTo) navigateTo('product', p.id); }}
                        className={`w-10 h-10 rounded-full backdrop-blur-md transition-all flex items-center justify-center border hover:border-transparent hover:scale-110 active:scale-95 group/nav ${theme === 'dark' ? 'bg-black/40 text-white hover:bg-[#CDA032] border-white/20' : 'bg-white/40 text-black hover:bg-[#CDA032] border-black/10 shadow-sm'}`}
                      >
                        <ArrowRight size={16} className="group-hover/nav:-rotate-45 transition-transform" />
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B38B21] backdrop-blur-md text-white hover:text-black transition-all flex items-center justify-center group/btn border border-white/20 hover:border-transparent hover:scale-110 active:scale-95"
                      >
                        <ShoppingCart size={16} className="group-hover/btn:-translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 px-4">
            <Link
              to="/store"
              search={{ category: 'Accessories' } as any}
              className="group inline-flex items-center gap-4 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all w-full md:w-auto justify-center"
            >
              View All Accessories
              <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access / Laptop Slider */}
      <section className={`py-6 md:py-10 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-screen-2xl mx-auto">

          <div className="flex items-center justify-end mb-6 px-4 md:px-8 gap-3">
            <button
              onClick={() => document.getElementById('laptop-slider')?.scrollBy({ left: -400, behavior: 'smooth' })}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => document.getElementById('laptop-slider')?.scrollBy({ left: 400, behavior: 'smooth' })}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div id="laptop-slider" className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-8 pb-8" style={{ scrollPaddingLeft: 'max(1rem, env(safe-area-inset-left))' }}>
            {/* Promo Card */}
            <div className={`w-[300px] md:w-[400px] min-h-[400px] md:min-h-[500px] ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F2F4F7]'} ${theme === 'dark' ? 'text-white' : 'text-black'} p-8 md:p-12 rounded-[2rem] flex flex-col justify-between snap-start flex-shrink-0 shadow-sm border border-black/5 dark:border-white/5 relative overflow-hidden group`}>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight mb-4">Laptops.</h2>
                <p className={`text-lg md:text-xl font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Elite MacBooks and<br />Performance machines.</p>
              </div>
              <div className="flex justify-center mt-8 relative z-10 transform group-hover:scale-110 transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1517336714467-d13a2323485d?q=80&w=800&auto=format&fit=crop"
                  alt="Laptops"
                  className="h-40 md:h-56 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#CDA032]/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000"></div>
            </div>

            {/* Product Cards */}
            {products.filter(p => p.category === 'Laptop').map(p => (
              <div
                key={p.id}
                onClick={() => onQuickView(p)}
                className={`w-[260px] md:w-[300px] h-[360px] md:h-[420px] rounded-[2rem] snap-start flex-shrink-0 flex flex-col group cursor-pointer overflow-hidden relative shadow-lg ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#ffffff]'}`}
              >
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className={`absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 rounded-bl-[1.5rem] transition-colors ${theme === 'dark' ? 'border-white/20' : 'border-[#CDA032]/40'}`} />
                  <div className={`absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 rounded-br-[1.5rem] transition-colors ${theme === 'dark' ? 'border-white/20' : 'border-[#CDA032]/40'}`} />
                </div>

                <div className="absolute top-0 inset-x-0 h-[60%] pt-8 px-8 transform group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-lg" />
                </div>

                <div className="absolute top-4 right-4 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-md z-20 rounded-full px-4 py-2 hover:bg-black/20 dark:hover:bg-white/20">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <Search size={12} /> View
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col z-20 bg-gradient-to-t from-black/5 to-transparent dark:from-black/80 dark:to-transparent">
                  <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={`${i < Math.floor(p.rating || 4) ? 'text-[#CDA032] fill-current' : theme === 'dark' ? 'text-white/20' : 'text-black/20'}`} />
                    ))}
                    <span className={`text-[9px] font-bold ml-1 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>({p.reviewCount || 678})</span>
                  </div>

                  <h3 className={`font-black uppercase italic tracking-wider text-sm leading-tight mb-1 line-clamp-2 drop-shadow-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {p.name}
                  </h3>

                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <span className={`text-[9px] mb-0.5 block uppercase tracking-widest italic ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{p.category}</span>
                      <p className="font-black text-xl tracking-tighter text-[#CDA032] drop-shadow-sm">
                        {formatCurrency(p.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); if (navigateTo) navigateTo('product', p.id); }}
                        className={`w-10 h-10 rounded-full backdrop-blur-md transition-all flex items-center justify-center border hover:border-transparent hover:scale-110 active:scale-95 group/nav ${theme === 'dark' ? 'bg-black/40 text-white hover:bg-[#CDA032] border-white/20' : 'bg-white/40 text-black hover:bg-[#CDA032] border-black/10 shadow-sm'}`}
                      >
                        <ArrowRight size={16} className="group-hover/nav:-rotate-45 transition-transform" />
                      </button>

                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                        className={`w-10 h-10 rounded-full backdrop-blur-md transition-all flex items-center justify-center group/btn border hover:border-transparent hover:scale-110 active:scale-95 ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-[#CDA032] hover:text-black border-white/20' : 'bg-black/5 text-black hover:bg-[#CDA032] border-black/10 shadow-sm'}`}
                      >
                        <ShoppingCart size={16} className="group-hover/btn:-translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-8 text-[#D4AF37]/10">
            <ArrowLeftRight size={200} className="transform rotate-45" />
          </div>
        </div>

      {/* Trade-In Section */}
      <section className="py-12 md:py-16 px-8 relative overflow-hidden bg-black text-white">
        {/* Decorative Background Icons */}
        <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 opacity-10 -rotate-12 pointer-events-none">
          <ArrowLeftRight size={300} className="text-[#CDA032]" />
        </div>
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-10 rotate-12 pointer-events-none">
          <ArrowLeftRight size={300} className="text-[#CDA032]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Trade-In & Upgrade
          </h2>
          <div className="w-32 h-0.5 bg-[#D4AF37] mx-auto"></div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#D4AF37] font-heading font-semibold">
              Get up to GHC500 toward your next upgrade
            </p>
            <p className="text-lg text-gray-300">
              Your old tech has value. Trade in eligible devices and save instantly.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/trades"
              className="relative inline-flex px-12 py-5 bg-[#D4AF37] text-black rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)] active:scale-95 group"
            >
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-xs text-red-600 font-heading font-bold">HOT</span>
              </div>
              Let's Trade
              <ArrowRight className="transition-transform group-hover:translate-x-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Repair Section */}
      <section className={`relative flex flex-col lg:flex-row min-h-[600px] w-full overflow-hidden border-t ${theme === 'dark' ? 'bg-[#0a0a0a] border-white/5' : 'bg-[#F4F4F4] border-black/5'}`}>
        {/* Left Content */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:px-24 lg:py-20 flex flex-col justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Settings size={500} className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-wider">
                Expert Repair Services
              </h2>
              <div className="w-24 h-0.5 bg-[#D4AF37]"></div>

              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  KNUST-certified diagnostics with precision circuit mapping.
                </p>
                <p className="text-gray-400">
                  Genuine parts, industry standards, certified technicians.
                </p>
              </div>

              <Link
                to="/repair"
                className="inline-flex px-12 py-5 bg-[#D4AF37] text-black rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)] active:scale-95"
              >
                Schedule Repair
                <Wrench size={18} />
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517336714467-d13a2323485d"
                className="rounded-2xl w-full object-cover aspect-video"
                alt="Repair Service"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Grid Section (Bento-Box Layout) */}
      <section className={`py-12 md:py-16 px-8 overflow-hidden transition-colors duration-500 ${theme === 'light' ? 'bg-[#F2F4F7]' : 'bg-[#0A0A0A]'
        }`}>
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2 ${theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                Explore Collection
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37]"></div>
            </div>
            {/* Filters / Navigation */}
            <div className={`flex flex-wrap items-center gap-2 md:gap-4 p-2 rounded-full border ${theme === 'light' ? 'bg-white border-black/10' : 'bg-[#111] border-white/10'
              }`}>
              {['All Gear', 'Pro Series', 'Essentials'].map((filter) => {
                const isActive = exploreFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setExploreFilter(filter as any)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                      ? (theme === 'light' ? 'bg-black text-white shadow-lg' : 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]')
                      : (theme === 'light' ? 'text-gray-500 hover:text-black hover:bg-black/5' : 'text-white/40 hover:text-white hover:bg-white/5')
                      }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-[auto] gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]">

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-semibold text-[#D4AF37]">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We care about you and your devices, treating each with precision and respect.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-semibold text-[#D4AF37]">Our Vision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your reliable home for innovation, keeping you ahead with the latest tech improvements.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden flex justify-end">
                  <img src="/macbook.jpeg" alt="MacBook Promo" className="h-full object-cover transform scale-110 origin-right group-hover:scale-[1.15] transition-transform duration-[1.5s] mix-blend-multiply opacity-90" />
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-black/40 hover:bg-white transition-colors cursor-pointer z-20">
                  <ArrowRight size={16} />
                </div>
              </Link>
            )}

            {(exploreFilter === 'All Gear' || exploreFilter === 'Essentials') && (
              <Link to="/trades" className={`col-span-1 md:col-span-1 row-span-1 rounded-[2rem] p-8 relative overflow-hidden group transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-end ${theme === 'light' ? 'bg-[#F9FAFB] shadow-inner' : 'bg-[#111] shadow-inner border border-white/5'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#CDA032]/20 to-transparent z-20 mix-blend-overlay"></div>
                <img src="/iPhone.jpeg" alt="Trade In Promo" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] z-0 filter saturate-150" />
                <div className="relative z-30 transform group-hover:-translate-y-1 transition-transform">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-block mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Avid Offers</span>
                  </div>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase text-white shadow-black drop-shadow-lg">
                    Trade-In Bonus
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/40">
                  <Heart size={14} />
                </div>
              </Link>
            )}

            {(exploreFilter === 'All Gear' || exploreFilter === 'Pro Series') && (
              <div className={`col-span-1 md:col-span-1 row-span-1 rounded-[2rem] p-6 flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-[#111] border border-white/5'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'light' ? 'text-black' : 'text-white'}`}>Highlights</span>
                  <div className="flex gap-1">
                    <button
                      onClick={prevHighlight}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'} text-[#CDA032]`}
                    >
                      <ChevronLeft size={12} />
                    </button>
                    <button
                      onClick={nextHighlight}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'} text-[#CDA032]`}
                    >
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex gap-3 pb-2 overflow-hidden relative">
                  <div
                    className="flex gap-3 transition-transform duration-500 ease-out h-full w-full"
                    style={{ transform: `translateX(-${currentHighlightsIndex * 50}%)` }}
                  >
                    {highlights.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onQuickView(p)}
                        className={`min-w-[45%] rounded-2xl overflow-hidden relative group/mini cursor-pointer ${theme === 'light' ? 'bg-gray-100' : 'bg-[#050505]'} border border-white/5`}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2 group-hover/mini:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/mini:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye size={12} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('store')}
                  className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors ${theme === 'light' ? 'bg-gray-100 text-black hover:bg-[#CDA032]' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  See All
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/profile"
                  className="inline-flex px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full text-sm font-heading font-semibold tracking-wider items-center gap-2 transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
                >
                  <Mail size={16} />
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                    <Package size={48} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">BlackBox</h3>
                  <p className="text-gray-400">Premium Tech Repository</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Us Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-wider mb-4">
              Trusted by Thousands
            </h2>
            <div className="w-32 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join our community of satisfied customers who trust BlackBox for their tech needs
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 stagger-1">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[#D4AF37]">
                10,000+
              </div>
              <p className="text-gray-400 font-heading tracking-wide">Satisfied Customers Since 2019</p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#D4AF37] fill-current" />
                ))}
              </div>
            </div>
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 stagger-2">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[#D4AF37]">
                5+
              </div>
              <p className="text-gray-400 font-heading tracking-wide">Years of Excellence</p>
              <p className="text-sm text-gray-500">KNUST Certified</p>
            </div>
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 stagger-3">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[#D4AF37]">
                98%
              </div>
              <p className="text-gray-400 font-heading tracking-wide">Customer Recommendation Rate</p>
              <p className="text-sm text-gray-500">Industry Leading</p>
            </div>
          </div>

          {/* Customer Reviews Carousel */}
          <div className="carousel-container relative overflow-hidden">
            <div className="flex space-x-6 transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentReviewIndex * 336}px)` }}>
              {[...customerReviews, ...customerReviews].map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 review-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-[#D4AF37] fill-current" />
                    ))}
                  </div>
                  <Quote className="text-[#D4AF37]/20 mb-4" size={28} />
                  <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                    "{review.text}"
                  </p>
                  <p className="text-off-white font-modern font-semibold text-lg">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Manual Navigation Controls */}
            <button
              className="carousel-btn prev"
              onClick={() => setCurrentReviewIndex((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1))}
              aria-label="Previous review"
            >
              <ChevronRight size={24} className="text-black rotate-180" />
            </button>

            <button
              className="carousel-btn next"
              onClick={() => setCurrentReviewIndex((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1))}
              aria-label="Next review"
            >
              <ChevronRight size={24} className="text-black" />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {customerReviews.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentReviewIndex ? 'active' : ''}`}
                onClick={() => setCurrentReviewIndex(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
