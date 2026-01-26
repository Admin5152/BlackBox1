
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
import { Cart } from './views/Cart';
import { PulseAI } from './components/PulseAI';
import { CartSidebar } from './components/CartSidebar';
import { QuickViewModal } from './components/QuickViewModal';
import { generateId } from './lib/utils';

const STORAGE_KEYS = {
  PRODUCTS: 'bb_products_v2',
  USER: 'bb_user_v2',
  CART: 'bb_cart_v2',
  ORDERS: 'bb_orders_v2',
  REPAIRS: 'bb_repairs_v2',
  WISHLIST: 'bb_wishlist_v2'
};

export default function App() {
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    try {
      const localProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const localUser = localStorage.getItem(STORAGE_KEYS.USER);
      const localCart = localStorage.getItem(STORAGE_KEYS.CART);
      const localOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      const localRepairs = localStorage.getItem(STORAGE_KEYS.REPAIRS);
      const localWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);

      if (localProducts) setProducts(JSON.parse(localProducts));
      if (localUser) setUser(JSON.parse(localUser));
      if (localCart) setCart(JSON.parse(localCart));
      if (localOrders) setOrders(JSON.parse(localOrders));
      if (localRepairs) setRepairs(JSON.parse(localRepairs));
      if (localWishlist) setWishlist(JSON.parse(localWishlist));
    } catch (e) {
      console.error("Local storage synchronization failure:", e);
    }
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairs));
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [products, user, cart, orders, repairs, wishlist]);

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navigateTo = (newView: string, productId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (productId) setSelectedProductId(productId);
    setView(newView);
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  };

  const addToCart = (product: Product, options: Record<string, string> = {}, qty: number = 1) => {
    setCart(prev => {
      const existingId = `${product.id}-${JSON.stringify(options)}`;
      const existingIndex = prev.findIndex(p => `${p.id}-${JSON.stringify(p.selectedOptions)}` === existingId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { ...product, quantity: qty, selectedOptions: options }];
    });
    notify(`${product.name} added to your bag`);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        notify('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        notify('Added to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(p => `${p.id}-${JSON.stringify(p.selectedOptions)}` !== uniqueId));
  };

  const updateQuantity = (id: string, options: Record<string, string> | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      const matchesId = item.id === id;
      const matchesOptions = JSON.stringify(item.selectedOptions) === JSON.stringify(options);
      if (matchesId && matchesOptions) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = (total: number) => {
    if (!user) {
      navigateTo('auth');
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
    navigateTo('profile');
    notify('Elite Shipment Authorized!', 'success');
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (view !== 'store') {
      setView('store');
    }
  };

  const currentProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-black text-white selection:bg-white selection:text-black">
      <Navbar 
        view={view} 
        user={user} 
        cart={cart} 
        searchQuery={searchQuery} 
        setSearchQuery={handleSearch} 
        navigateTo={navigateTo} 
        setIsCartOpen={() => setIsCartOpen(true)}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 overflow-hidden">
        {view === 'home' && (
          <Home 
            products={products} 
            navigateTo={navigateTo} 
            setSelectedCategory={setSelectedCategory} 
            onQuickView={handleQuickView}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onAddToCart={(p) => addToCart(p)}
          />
        )}
        {view === 'cart' && (
          <Cart 
            cart={cart}
            products={products}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
            navigateTo={navigateTo}
          />
        )}
        {view === 'product-detail' && currentProduct && (
          <ProductDetail 
            product={currentProduct} 
            relatedProducts={products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4)}
            navigateTo={navigateTo}
            addToCart={addToCart}
            isWishlisted={wishlist.includes(currentProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {view === 'store' && (
          <Store 
            products={products} 
            searchQuery={searchQuery} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            navigateTo={navigateTo}
            onQuickView={handleQuickView}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onAddToCart={(p) => addToCart(p)}
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
            wishlist={wishlist}
            products={products}
            setUser={setUser} 
            navigateTo={navigateTo} 
            toggleWishlist={toggleWishlist}
            onAddToCart={(p) => addToCart(p)}
          />
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        handleCheckout={handleCheckout}
      />

      <QuickViewModal 
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={quickViewProduct}
        onAddToCart={addToCart}
      />

      <PulseAI isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <X size={32}/>
          </button>
          <div className="flex flex-col gap-10 text-3xl font-black italic uppercase tracking-widest">
            {['home', 'store', 'cart', 'repair', 'profile'].map((v) => (
              <button 
                key={v} 
                onClick={() => navigateTo(v === 'profile' ? 'profile' : v)} 
                className="hover:text-white/40 transition-colors"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[130] px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500 flex items-center gap-5 glass bg-black/90 border border-white/10`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} className="text-white"/> : <Activity size={18} className="text-red-500"/>}
          <p className="font-bold text-[10px] uppercase tracking-widest">{notification.msg}</p>
        </div>
      )}

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
