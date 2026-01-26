
import React, { useState } from 'react';
import { 
  LogOut, Package, Wrench, Clock, CheckCircle2, 
  MapPin, Mail, ChevronRight, Activity, Shield, CreditCard,
  Truck, XCircle, User as UserIcon, Settings, Heart, Sliders, HelpCircle,
  Eye, RefreshCw, Smartphone, Trash2
} from 'lucide-react';
import { User, RepairRequest, Order, Product } from '../types';
import { formatDate, formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

interface ProfileProps {
  user: User | null;
  repairs: RepairRequest[];
  orders: Order[];
  wishlist: string[];
  products: Product[];
  setUser: (u: User | null) => void;
  navigateTo: (v: string, id?: string) => void;
  toggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  user, repairs, orders, wishlist, products, setUser, navigateTo, toggleWishlist, onAddToCart 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'orders' | 'repairs' | 'address' | 'payment' | 'wishlist' | 'preferences'>('overview');

  if (!user) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <button onClick={() => navigateTo('auth')} className="px-12 py-5 bg-[#D4AF37] text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all">
        Sign In to View Repository
      </button>
    </div>
  );

  const activeRepairsCount = repairs.filter(r => r.status !== 'Completed').length;
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const menuItems = [
    { id: 'overview', icon: Sliders, label: 'Overview' },
    { id: 'orders', icon: Package, label: 'Order History', badge: orders.length > 0 ? orders.length : null },
    { id: 'repairs', icon: Wrench, label: 'Repair Requests', badge: activeRepairsCount > 0 ? activeRepairsCount : null },
    { id: 'wishlist', icon: Heart, label: 'Wishlist', badge: wishlist.length > 0 ? wishlist.length : null },
    { id: 'settings', icon: UserIcon, label: 'Profile Settings' },
    { id: 'address', icon: MapPin, label: 'Address Book' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
    { id: 'preferences', icon: Settings, label: 'Preferences' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Greeting Banner */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl">
              <div className="z-10 space-y-3">
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Good evening, {user.name}!</h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/20 italic">Member since {formatDate(new Date().toISOString())}</p>
              </div>
              <div className="z-10 bg-green-500/10 border border-green-500/20 px-6 py-2.5 rounded-full flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Verified Identity</span>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'orders', label: 'Recent Orders', value: orders.length, sub: 'Hardware acquisitions', icon: Package },
                { id: 'repairs', label: 'Active Repairs', value: activeRepairsCount, sub: 'Technical Bench Status', icon: Wrench },
                { id: 'wishlist', label: 'Wishlist Items', value: wishlist.length, sub: 'Saved for later', icon: Heart, color: 'text-red-500' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveTab(stat.id as any)}
                  className="dashboard-card p-10 rounded-[2.5rem] space-y-8 cursor-pointer relative group bg-[#0f0f0f] border border-white/5"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <stat.icon size={22} className={stat.color || "text-[#D4AF37]"} />
                    </div>
                    <ChevronRight size={18} className="text-white/10 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">{stat.label}</p>
                    <p className="text-5xl font-black italic tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest pt-2 italic">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
             <div className="p-10 border-b border-white/5">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Order Repository</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 pt-1 italic">Authorized acquisitions and hardware receipts</p>
             </div>
             
             {orders.length > 0 ? (
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="text-[10px] font-black uppercase tracking-widest text-white/20 border-b border-white/5">
                     <tr>
                       <th className="px-10 py-6">Order ID</th>
                       <th className="px-6 py-6">Date</th>
                       <th className="px-6 py-6">Status</th>
                       <th className="px-6 py-6">Items</th>
                       <th className="px-6 py-6">Total</th>
                       <th className="px-10 py-6 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="text-[11px] font-bold uppercase tracking-widest">
                     {orders.map(order => (
                       <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                         <td className="px-10 py-8 font-black">#{order.id}</td>
                         <td className="px-6 py-8 text-white/30 italic">{formatDate(order.date)}</td>
                         <td className="px-6 py-8">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black ${
                             order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                             order.status === 'Shipped' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 
                             'bg-white/10 text-white/50'
                           }`}>
                             {order.status}
                           </span>
                         </td>
                         <td className="px-6 py-8 text-white/30">{order.items.length} units</td>
                         <td className="px-6 py-8 text-[#D4AF37] font-black">{formatCurrency(order.total)}</td>
                         <td className="px-10 py-8 text-right space-x-6">
                           <button className="text-white/20 hover:text-white transition-colors"><Eye size={18}/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             ) : (
               <div className="py-24 text-center opacity-20">
                 <Package size={48} className="mx-auto mb-4" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">No order history detected</p>
               </div>
             )}
          </div>
        );

      case 'repairs':
        return (
          <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
             <div className="p-10 border-b border-white/5">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Laboratory Status</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 pt-1 italic">Active diagnostic bench sessions and repair logs</p>
             </div>
             
             {repairs.length > 0 ? (
               <div className="p-10 space-y-4">
                 {repairs.map(repair => (
                   <div key={repair.id} className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[#D4AF37]/30 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-[#D4AF37]">
                          <Smartphone size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-widest">{repair.device}</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest italic truncate max-w-[200px]">{repair.issue}</p>
                          <p className="text-[9px] text-white/10 font-black uppercase tracking-widest">Logged {formatDate(repair.date)}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                           <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Bench Status</p>
                           <span className="px-4 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-black rounded-full uppercase tracking-widest border border-[#D4AF37]/20">
                             {repair.status}
                           </span>
                        </div>
                        <button className="p-3 bg-white/5 rounded-full text-white/20 hover:text-white transition-all"><ChevronRight size={18}/></button>
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-24 text-center opacity-20">
                 <Wrench size={48} className="mx-auto mb-4" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">No laboratory requests found</p>
               </div>
             )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#0f0f0f] p-10 border border-white/5 rounded-[2.5rem]">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Wishlist Collection</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 pt-1 italic">Curated hardware units for future acquisition</p>
            </div>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistedProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onClick={() => navigateTo('product-detail', p.id)}
                    onQuickView={() => {}} 
                    isWishlisted={true}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] opacity-20">
                <Heart size={48} className="mx-auto mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Your curated collection is empty</p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-16 text-center animate-in fade-in duration-500">
             <Settings size={48} className="mx-auto mb-8 opacity-10" />
             <h3 className="text-xl font-black uppercase italic tracking-tighter text-white/30">Feature under technical maintenance</h3>
             <p className="text-[10px] font-bold uppercase tracking-widest text-white/10 mt-2 italic">Repository update v3.1 coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="view-transition max-w-[1440px] mx-auto px-8 py-12 flex flex-col md:flex-row gap-10 min-h-[85vh] bg-black">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[320px] shrink-0">
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-4 flex flex-col shadow-2xl sticky top-32">
          {/* User Profile Summary */}
          <div className="p-6 pb-8 border-b border-white/5 space-y-4">
             <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center font-black text-black italic text-3xl shadow-2xl">
               {user.name.charAt(0)}
             </div>
             <div>
                <h4 className="text-lg font-black italic tracking-tighter uppercase leading-none">{user.name}</h4>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic mt-1">{user.email}</p>
             </div>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-[#D4AF37] text-black font-black' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={18} className={activeTab === item.id ? 'text-black' : 'text-white/20 group-hover:text-white'} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${activeTab === item.id ? 'bg-black text-white' : 'bg-[#EF4444] text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="h-[1px] bg-white/5 my-6 mx-6"></div>
          
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-4 px-6 py-4 text-white/40 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
              <HelpCircle size={18} className="text-white/20" />
              Technical Help
            </button>
            <button 
              onClick={() => { setUser(null); navigateTo('home'); }}
              className="flex items-center gap-4 px-6 py-4 text-red-500/60 hover:text-red-500 text-[11px] font-black uppercase tracking-widest transition-colors"
            >
              <LogOut size={18} />
              Sever Connection
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-[600px]">
        {renderContent()}
      </main>
    </div>
  );
};
