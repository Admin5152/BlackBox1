
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Activity } from 'lucide-react';
import { Product, User, CartItem, Category, RepairRequest, Order } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { ProductDetail } from './views/ProductDetail';
import { Repair } from './views/Repair';
import { Store } from './views/Store';
import { Auth } from './views/Auth';
import { Profile } from './views/Profile';
import { PulseAI } from './components/PulseAI';
import { CartSidebar } from './components/CartSidebar';
import { generateId } from './lib/utils';

const STORAGE_KEYS = {
  PRODUCTS: 'bb_products_v2',
  USER: 'bb_user_v2',
  CART: 'bb_cart_v2',
  ORDERS: 'bb_orders_v2',
  REPAIRS: 'bb_repairs_v2'
};

export default function App() {
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    const localProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const localUser = localStorage.getItem(STORAGE_KEYS.USER);
    const localCart = localStorage.getItem(STORAGE_KEYS.CART);
    const localOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const localRepairs = localStorage.getItem(STORAGE_KEYS.REPAIRS);

    setProducts(localProducts ? JSON.parse(localProducts) : INITIAL_PRODUCTS);
    setUser(localUser ? JSON.parse(localUser) : null);
    setCart(localCart ? JSON.parse(localCart) : []);
    setOrders(localOrders ? JSON.parse(localOrders) : []);
    setRepairs(localRepairs ? JSON.parse(localRepairs) : []);
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairs));
  }, [products, user, cart, orders, repairs]);

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navigateTo = (newView: string, productId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (productId) setSelectedProductId(productId);
    setView(newView);
    setIsMobileMenuOpen(false);
  };

  const addToCart = (product: Product, options: Record<string, string>, qty: number) => {
    setCart(prev => {
      const existingId = `${product.id}-${JSON.stringify(options)}`;
      const existing = prev.find(p => `${p.id}-${JSON.stringify(p.selectedOptions)}` === existingId);
      if (existing) {
        return prev.map(p => `${p.id}-${JSON.stringify(p.selectedOptions)}` === existingId ? { ...p, quantity: p.quantity + qty } : p);
      }
      return [...prev, { ...product, quantity: qty, selectedOptions: options }];
    });
    setIsCartOpen(true);
    notify(`${product.name} added to bag`);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(p => `${p.id}-${JSON.stringify(p.selectedOptions)}` !== uniqueId));
  };

  const handleCheckout = (total: number) => {
    if (!user) {
      navigateTo('auth');
      setIsCartOpen(false);
      return;
    }
    const newOrder: Order = {
      id: generateId(),
      userId: user.id,
      userName: user.name,
      items: [...cart],
      total,
      status: 'Pending',
      date: new Date().toISOString(),
      paymentMethod: 'Momo'
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    navigateTo('profile');
    notify('Order Placed Successfully!', 'success');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    notify(`Order ${orderId} status: ${status}`, 'success');
  };

  const currentProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-black text-white selection:bg-white selection:text-black">
      <Navbar 
        view={view} 
        user={user} 
        cart={cart} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        navigateTo={navigateTo} 
        setIsCartOpen={setIsCartOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 overflow-hidden">
        {view === 'home' && (
          <Home 
            products={products} 
            navigateTo={navigateTo} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        {view === 'product-detail' && currentProduct && (
          <ProductDetail 
            product={currentProduct} 
            relatedProducts={products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4)}
            navigateTo={navigateTo}
            addToCart={addToCart}
          />
        )}
        {view === 'store' && (
          <Store 
            products={products} 
            searchQuery={searchQuery} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            navigateTo={navigateTo}
          />
        )}
        {view === 'repair' && (
          <Repair 
            user={user} 
            repairs={repairs} 
            setRepairs={setRepairs} 
            notify={notify} 
            navigateTo={navigateTo}
          />
        )}
        {view === 'auth' && <Auth setUser={setUser} navigateTo={navigateTo} />}
        {view === 'profile' && (
          <Profile 
            user={user} 
            repairs={repairs} 
            orders={orders} 
            setUser={setUser} 
            navigateTo={navigateTo} 
            updateOrderStatus={updateOrderStatus}
          />
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        removeFromCart={removeFromCart} 
        handleCheckout={handleCheckout} 
      />

      <PulseAI isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <X size={32}/>
          </button>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-12 opacity-50">BLACKBOX</h1>
          <div className="flex flex-col gap-10 text-3xl font-black italic uppercase tracking-widest">
            {['home', 'store', 'repair', 'about'].map((v) => (
              <button 
                key={v} 
                onClick={() => navigateTo(v)} 
                className="hover:translate-x-4 transition-transform duration-300"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed top-24 right-8 z-[110] px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-10 duration-500 flex items-center gap-5 ${notification.type === 'success' ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>
          {notification.type === 'success' ? <CheckCircle2 size={18}/> : <Activity size={18}/>}
          <p className="font-black text-sm uppercase tracking-widest">{notification.msg}</p>
        </div>
      )}

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

