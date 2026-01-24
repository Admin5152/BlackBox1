
import React, { useState } from 'react';
import { 
  LogOut, Package, Wrench, Clock, CheckCircle2, 
  MapPin, Mail, ChevronRight, Activity, Shield, CreditCard,
  Truck, XCircle
} from 'lucide-react';
import { User, RepairRequest, Order } from '../types';
import { formatDate, formatCurrency } from '../lib/utils';

interface ProfileProps {
  user: User | null;
  repairs: RepairRequest[];
  orders: Order[];
  setUser: (u: User | null) => void;
  navigateTo: (v: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, repairs, orders, setUser, navigateTo, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'repairs'>('orders');

  if (!user) return null;

  const totalSpent = orders.reduce((acc, curr) => acc + curr.total, 0);
  const activeRepairs = repairs.filter(r => r.status !== 'Completed').length;

  const handleTrackOrder = (orderId: string) => {
    if (window.confirm("Simulate order transit update? This will set status to 'Shipped'.")) {
      updateOrderStatus(orderId, 'Shipped');
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to terminate this order? This action is irreversible.")) {
      updateOrderStatus(orderId, 'Cancelled');
    }
  };

  return (
    <div className="view-transition max-w-7xl mx-auto px-6 py-12 lg:py-16 space-y-12">
      {/* Identity Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white text-black text-4xl font-black rounded-full flex items-center justify-center shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">{user.name}</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Verified Member // Black Box Kumasi</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <span className="flex items-center gap-2 text-[11px] text-white/50 uppercase tracking-widest"><Mail size={12}/> {user.email}</span>
              <span className="flex items-center gap-2 text-[11px] text-white/50 uppercase tracking-widest"><MapPin size={12}/> KNUST, Kumasi</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Account Status</span>
              <Shield size={16} className="text-green-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-bold uppercase tracking-widest">Premium Core</span>
            </div>
          </div>
          <button 
            onClick={() => { setUser(null); navigateTo('home'); }}
            className="w-full py-4 border border-white/5 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <LogOut size={16}/> Terminate Session
          </button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up">
        {[
          { label: 'Total Invested', value: formatCurrency(totalSpent), icon: CreditCard },
          { label: 'Orders Placed', value: orders.length, icon: Package },
          { label: 'Active Repairs', value: activeRepairs, icon: Wrench },
          { label: 'Lab Priority', value: 'High', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-2 group hover:bg-white/10 transition-all">
            <stat.icon size={16} className="text-white/20 group-hover:text-white transition-colors" />
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">{stat.label}</p>
              <p className="text-xl font-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Control */}
      <div className="flex items-center justify-center p-1.5 bg-white/5 border border-white/5 rounded-2xl w-fit mx-auto animate-fade-in-up">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
          Activity Log
        </button>
        <button 
          onClick={() => setActiveTab('repairs')}
          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'repairs' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
          Laboratory
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="animate-fade-in-up">
        {activeTab === 'orders' ? (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <EmptyState icon={Package} text="No recent purchase records." btnText="Access Store" onBtnClick={() => navigateTo('store')} />
            ) : (
              orders.map((order) => {
                const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
                return (
                  <div key={order.id} className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 hover:border-white/20 transition-all">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                      <Package size={24} className="text-white/20" />
                    </div>
                    <div className="flex-1 space-y-1 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                        <h4 className="text-lg font-black uppercase tracking-tight">Order #{order.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                          'bg-white/5 text-white/40'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{formatDate(order.date)} // {order.items.length} Items</p>
                    </div>

                    {isActive && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleTrackOrder(order.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                          <Truck size={14}/> Track Order
                        </button>
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/5 border border-red-500/10 text-red-500/60 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                        >
                          <XCircle size={14}/> Cancel
                        </button>
                      </div>
                    )}

                    <div className="text-center md:text-right shrink-0 min-w-[120px]">
                      <p className="text-2xl font-black">{formatCurrency(order.total)}</p>
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">
                        {order.status === 'Cancelled' ? 'Transaction Revoked' : 'Transaction Success'}
                      </p>
                    </div>
                    <button className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {repairs.length === 0 ? (
              <EmptyState icon={Wrench} text="No hardware diagnostic records." btnText="Initiate Repair" onBtnClick={() => navigateTo('repair')} />
            ) : (
              repairs.map((repair) => (
                <div key={repair.id} className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all">
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-white/5 pb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-2xl font-black italic tracking-tighter uppercase">{repair.device}</h4>
                          <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{repair.status}</span>
                        </div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Lab ID: {repair.id.slice(0, 8)} // {formatDate(repair.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-widest text-white/40">Estimated Cost</p>
                        <p className="text-xl font-black">{repair.estimatedCost || 'Calculating...'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Client Description</p>
                        <p className="text-sm text-white/60 font-light leading-relaxed italic">"{repair.issue}"</p>
                      </div>
                      
                      {repair.aiDiagnosis && (
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-2">
                          <div className="flex items-center gap-2">
                            <Activity size={12} className="text-green-500" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Pulse AI Verdict</p>
                          </div>
                          <p className="text-xs text-white/80 font-bold italic leading-relaxed">"{repair.aiDiagnosis}"</p>
                        </div>
                      )}
                    </div>

                    {/* Hardware Stage Slider */}
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/20">
                        <span>Intake</span>
                        <span>Lab Work</span>
                        <span>Quality Control</span>
                        <span>Ready</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                          style={{ 
                            width: repair.status === 'Completed' ? '100%' : 
                                   repair.status === 'Ready' ? '90%' : 
                                   repair.status === 'In Repair' ? '60%' : 
                                   repair.status === 'Diagnosing' ? '30%' : '10%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, text, btnText, onBtnClick }: any) => (
  <div className="py-24 text-center space-y-6 bg-white/5 border border-white/5 rounded-[3rem] animate-in fade-in zoom-in duration-500">
    <Icon size={48} className="mx-auto text-white/10" />
    <p className="text-sm font-black uppercase tracking-[0.4em] text-white/30">{text}</p>
    <button onClick={onBtnClick} className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
      {btnText}
    </button>
  </div>
);
