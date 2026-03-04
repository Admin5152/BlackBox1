import React, { useState, useEffect } from 'react';
import { getOrders, getUsers } from '../lib/api';
import { useAppContext } from '../App';
import type { Order } from '../types';
import type { User } from '../interface/interface';
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Eye,
  Search,
  Filter,
  LogOut,
  Menu,
  X,
  Home,
<<<<<<< HEAD
  Settings,
  FileText,
  ArrowLeft
=======
  LayoutDashboard,
  ArrowLeft,
  FileText
>>>>>>> main
} from 'lucide-react';

interface AdminProps {
  setUser?: (user: User) => void;
  navigateTo?: (view: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ setUser, navigateTo }) => {
  const { theme } = useAppContext();
  const isDark = theme === 'dark';

  const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'customers' | 'products'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Theme Constants
  const pageBg = isDark ? '#060605' : '#F4F4F4';
  const panelBg = isDark ? '#0d0d0b' : '#FFFFFF';
  const sidebarBg = isDark ? 'from-[#0a0a0a] to-[#050505]' : 'from-white to-[#F9F9F9]';
  const borderSubtle = isDark ? 'border-white/5' : 'border-black/5';
  const borderFaint = isDark ? 'border-white/10' : 'border-black/10';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const textSecondary = isDark ? 'text-white/60' : 'text-black/60';
  const textMuted = isDark ? 'text-white/40' : 'text-black/40';
  const inputBg = isDark ? 'bg-[#0d0d0b]' : 'bg-[#F9F9F9]';
  const cardBg = isDark ? 'from-[#0a0a0a] to-[#050505]' : 'from-white to-[#FDFDFD]';
  const rowHover = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, usersData] = await Promise.all([
          getOrders(),
          getUsers()
        ]);
        setOrders(ordersData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = users.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Filter orders based on search
  const filteredOrders = orders.filter(order =>
    order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter customers based on search
  const filteredCustomers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    if (setUser) setUser(null as any);
    if (navigateTo) navigateTo('auth');
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(179,139,33,0.15)] transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B38B21] to-[#D4AF37] rounded-2xl flex items-center justify-center">
              <DollarSign size={24} className="text-black" />
            </div>
            <TrendingUp size={20} className="text-[#B38B21]" />
          </div>
          <h3 className={`text-2xl font-black ${textPrimary} mb-1`}>${totalRevenue.toLocaleString()}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Total Revenue</p>
        </div>

        <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(179,139,33,0.15)] transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B38B21] to-[#D4AF37] rounded-2xl flex items-center justify-center">
              <ShoppingCart size={24} className="text-black" />
            </div>
            <BarChart3 size={20} className="text-[#B38B21]" />
          </div>
          <h3 className={`text-2xl font-black ${textPrimary} mb-1`}>{totalOrders}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Total Orders</p>
        </div>

        <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(179,139,33,0.15)] transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B38B21] to-[#D4AF37] rounded-2xl flex items-center justify-center">
              <Users size={24} className="text-black" />
            </div>
            <TrendingUp size={20} className="text-[#B38B21]" />
          </div>
          <h3 className={`text-2xl font-black ${textPrimary} mb-1`}>{totalCustomers}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Total Customers</p>
        </div>

        <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(179,139,33,0.15)] transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B38B21] to-[#D4AF37] rounded-2xl flex items-center justify-center">
              <Package size={24} className="text-black" />
            </div>
            <DollarSign size={20} className="text-[#B38B21]" />
          </div>
          <h3 className={`text-2xl font-black ${textPrimary} mb-1`}>${avgOrderValue.toFixed(0)}</h3>
          <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Avg Order Value</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-8 shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
<<<<<<< HEAD
          <h2 className="text-xl font-black italic uppercase tracking-tight text-white">Recent Orders</h2>
=======
          <h2 className={`text-xl font-black italic uppercase tracking-tight ${textPrimary}`}>Recent Orders</h2>
>>>>>>> main
          <button
            onClick={() => setActiveSection('orders')}
            className="text-[10px] font-black uppercase tracking-widest text-[#B38B21] hover:text-[#D4AF37] transition-colors"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className={`${isDark ? 'bg-black/30' : 'bg-black/5'} border ${borderSubtle} rounded-2xl p-4 hover:border-[#B38B21]/30 transition-all`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#B38B21]/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart size={16} className="text-[#B38B21]" />
                  </div>
                  <div>
                    <p className={`text-sm font-black ${textPrimary}`}>{order.user.name}</p>
                    <p className={`text-[10px] ${textMuted}`}>{order.items.length} items • ${order.total}</p>
                  </div>
                </div>
                <div className="text-right">
<<<<<<< HEAD
                  <p className="text-xs font-black text-white/60">{order.date.toLocaleDateString()}</p>
=======
                  <p className={`text-xs font-black ${textSecondary}`}>{order.date.toLocaleDateString()}</p>
>>>>>>> main
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-8 shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-black italic uppercase tracking-tight ${textPrimary}`}>All Orders</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 ${isDark ? 'bg-black/30' : 'bg-black/5'} border ${borderFaint} rounded-xl ${textPrimary} text-sm focus:border-[#B38B21]/50 focus:outline-none transition-all`}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${borderFaint}`}>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Order ID</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Customer</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Items</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Total</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Date</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Status</th>
                <th className={`text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`border-b ${borderSubtle} ${rowHover} transition-all`}>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-black ${textPrimary}`}>#{order.id.slice(-6)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className={`text-sm font-black ${textPrimary}`}>{order.user.name}</p>
                      <p className={`text-[10px] ${textMuted}`}>{order.user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className={`text-xs ${textSecondary}`}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-black ${textPrimary}`}>${order.total + order.shipping}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs ${textSecondary}`}>{order.date.toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#B38B21] hover:text-[#D4AF37] transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-8 shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-black italic uppercase tracking-tight ${textPrimary}`}>All Customers</h2>
          <div className="relative">
            <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 ${isDark ? 'bg-black/30' : 'bg-black/5'} border ${borderFaint} rounded-xl ${textPrimary} text-sm focus:border-[#B38B21]/50 focus:outline-none transition-all`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => {
            const customerOrders = orders.filter(order => order.userId === customer.id);
            const customerSpent = customerOrders.reduce((sum, order) => sum + order.total + order.shipping, 0);

            return (
              <div key={customer.id} className={`${isDark ? 'bg-black/30' : 'bg-black/5'} border ${borderSubtle} rounded-2xl p-6 hover:border-[#B38B21]/30 transition-all`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B38B21] to-[#D4AF37] rounded-2xl flex items-center justify-center">
                    <span className="text-black font-black text-lg">{customer.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-black ${textPrimary}`}>{customer.name}</h3>
                    <p className={`text-[10px] ${textMuted}`}>{customer.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${textMuted}`}>Orders</span>
                    <span className={`text-sm font-black ${textPrimary}`}>{customerOrders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${textMuted}`}>Total Spent</span>
                    <span className="text-sm font-black text-[#B38B21]">${customerSpent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-black flex flex-col lg:flex-row pt-16 sm:pt-20 lg:pt-24">
=======
    <div className={`min-h-screen flex transition-colors duration-300`} style={{ backgroundColor: pageBg }}>
>>>>>>> main
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-[70] ${isDark ? 'bg-black/70' : 'bg-black/20'} backdrop-blur-sm`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-16 sm:top-20 lg:top-24 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] inset-y-0 left-0 z-[80]
          ${isSidebarOpen ? 'translate-x-0 w-72 sm:w-80 lg:w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
<<<<<<< HEAD
          bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-r border-white/5
          transition-transform duration-300 flex flex-col shrink-0
        `}
      >
        <div className="p-6 border-b border-white/5 hidden lg:block">
=======
          bg-gradient-to-b ${sidebarBg} border-r ${borderSubtle}
          transition-all duration-300 flex flex-col
        `}
      >
        <div className={`p-6 border-b ${borderSubtle}`}>
>>>>>>> main
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
              {/* <div className="w-8 h-8 bg-[#B38B21] rounded flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M25 40V28C25 26.3431 26.3431 25 28 25H40" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M60 25H72C73.6569 25 75 26.3431 75 28V40" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M75 60V72C75 73.6569 73.6569 75 72 75H60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M40 75H28C26.3431 75 25 73.6569 25 72V60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  <rect x="38" y="44" width="24" height="12" rx="6" fill="currentColor"/>
                </svg>
              </div> */}
              {isSidebarOpen && (
                <span className={`text-sm font-black tracking-widest ${textPrimary} uppercase italic`}>MENU</span>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`${textMuted} hover:${textPrimary} transition-colors`}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'store', label: 'Store', icon: ArrowLeft, action: () => navigateTo?.('home') },
            { id: 'overview', label: 'Overview', icon: Home },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'products', label: 'Products', icon: Package },
          ].map((item: any) => (
            <button
              key={item.id}
<<<<<<< HEAD
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setActiveSection(item.id as any);
                }
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeSection === item.id
                ? 'bg-[#B38B21] text-black'
                : 'text-white/40 hover:text-white hover:bg-white/5'
=======
              onClick={() => { setActiveSection(item.id as any); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeSection === item.id
                ? 'bg-[#B38B21] text-black shadow-lg shadow-[#B38B21]/20'
                : `${textMuted} hover:${textPrimary} hover:bg-black/5`
>>>>>>> main
                }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && (
                <span className="text-sm font-black uppercase tracking-wider">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={`p-4 border-t ${borderSubtle}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl ${textMuted} hover:text-red-500 hover:bg-red-500/10 transition-all`}
          >
            <LogOut size={20} />
            {isSidebarOpen && (
              <span className="text-sm font-black uppercase tracking-wider">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: pageBg }}>
        {/* Sticky Search/Header Bar - Matching Store.tsx */}
        <div className={`sticky top-0 z-40 border-b ${borderSubtle} backdrop-blur-md`} style={{ backgroundColor: `${panelBg}F2` }}>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border ${borderFaint} ${inputBg} text-[#B38B21] transition-all hover:border-[#B38B21]/50 active:scale-95`}
                >
                  <Menu size={20} />
                </button>
                <div className="flex flex-col">
                  <h1 className={`text-xl font-black italic uppercase tracking-tight ${textPrimary} leading-none`}>
                    Dashboard
                  </h1>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B38B21] mt-1">
                    Terminal Access // Admin
                  </p>
                </div>
              </div>
<<<<<<< HEAD
              <div className="w-10 h-10 bg-gradient-to-br from-[#000000] to-[#000000] rounded-2xl flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M25 40V28C25 26.3431 26.3431 25 28 25H40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <path d="M60 25H72C73.6569 25 75 26.3431 75 28V40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <path d="M75 60V72C75 73.6569 73.6569 75 72 75H60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <path d="M40 75H28C26.3431 75 25 73.6569 25 72V60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <rect x="38" y="44" width="24" height="12" rx="6" fill="currentColor" />
                </svg>
=======

              <div className="flex-1 max-w-xl w-full">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} size={18} />
                  <input
                    type="text"
                    placeholder={`Search ${activeSection}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all ${inputBg} border ${borderSubtle} focus:border-[#B38B21]/50 ${textPrimary}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <p className={`text-xs font-black ${textPrimary} uppercase tracking-wider`}>Stanley Sam</p>
                  <p className={`text-[9px] ${textMuted} font-bold uppercase tracking-widest leading-none`}>Root Admin</p>
                </div>
>>>>>>> main
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'orders' && renderOrders()}
          {activeSection === 'customers' && renderCustomers()}
          {activeSection === 'products' && (
            <div className={`bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-8 shadow-2xl`}>
              <h2 className={`text-xl font-black italic uppercase tracking-tight ${textPrimary} mb-4`}>Products</h2>
              <p className={textMuted}>Product management coming soon...</p>
            </div>
          )}
        </main>

<<<<<<< HEAD
      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} className="text-white" />
            </button>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-white mb-2">Order #{selectedOrder.id.slice(-6)}</h3>
                <div className="flex items-center gap-4">
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${selectedOrder.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    selectedOrder.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      selectedOrder.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {selectedOrder.status}
                  </span>
                  <span className="text-xs text-white/40">{selectedOrder.date.toLocaleDateString()}</span>
=======
        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className={`${isDark ? 'bg-black/95' : 'bg-black/20'} absolute inset-0 backdrop-blur-3xl`} onClick={() => setSelectedOrder(null)} />
            <div className={`relative w-full max-w-2xl bg-gradient-to-br ${cardBg} border ${borderSubtle} rounded-3xl p-8 shadow-2xl`}>
              <button
                onClick={() => setSelectedOrder(null)}
                className={`absolute top-6 right-6 p-2 ${isDark ? 'bg-white/5' : 'bg-black/5'} hover:${isDark ? 'bg-white/10' : 'bg-black/10'} rounded-full transition-all`}
              >
                <X size={20} className={textPrimary} />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-black ${textPrimary} mb-2`}>Order #{selectedOrder.id.slice(-6)}</h3>
                  <div className="flex items-center gap-4">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${selectedOrder.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      selectedOrder.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        selectedOrder.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {selectedOrder.status}
                    </span>
                    <span className={`text-xs ${textMuted}`}>{selectedOrder.date.toLocaleDateString()}</span>
                  </div>
>>>>>>> main
                </div>

                <div className={`border-t ${borderFaint} pt-4`}>
                  <h4 className={`text-sm font-black ${textPrimary} mb-3`}>Customer</h4>
                  <div className={`${isDark ? 'bg-black/30' : 'bg-black/5'} rounded-2xl p-4`}>
                    <p className={`text-sm font-black ${textPrimary}`}>{selectedOrder.user.name}</p>
                    <p className={`text-xs ${textMuted}`}>{selectedOrder.user.email}</p>
                  </div>
                </div>

                <div className={`border-t ${borderFaint} pt-4`}>
                  <h4 className={`text-sm font-black ${textPrimary} mb-3`}>Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className={`${isDark ? 'bg-black/30' : 'bg-black/5'} rounded-2xl p-4 flex items-center justify-between`}>
                        <div>
                          <p className={`text-sm font-black ${textPrimary}`}>{item.name}</p>
                          <p className={`text-xs ${textMuted}`}>{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black ${textPrimary}`}>${item.price} × {item.quantity}</p>
                          <p className={`text-xs ${textMuted}`}>${item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`border-t ${borderFaint} pt-4`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${textMuted}`}>Subtotal</span>
                      <span className={`text-sm font-black ${textPrimary}`}>${selectedOrder.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${textMuted}`}>Shipping</span>
                      <span className={`text-sm font-black ${textPrimary}`}>${selectedOrder.shipping}</span>
                    </div>
                    <div className={`flex justify-between items-center pt-2 border-t ${borderFaint}`}>
                      <span className={`text-sm font-black ${textPrimary}`}>Total</span>
                      <span className="text-lg font-black text-[#B38B21]">${selectedOrder.total + selectedOrder.shipping}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
