
import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, Shield, ArrowLeft } from 'lucide-react';

interface AuthProps {
  setUser: (user: User) => void;
  navigateTo: (view: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ setUser, navigateTo }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email,
      role: 'user'
    };
    setUser(mockUser);
    navigateTo('home');
  };

  return (
    <div className="view-transition min-h-[85vh] flex items-center justify-center px-6 py-12 bg-black overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[440px] w-full bg-[#0a0a0a] border border-white/10 p-8 md:p-14 rounded-[3rem] text-center space-y-10 shadow-2xl relative z-10 animate-view-in">
        
        {/* Header from Screenshot */}
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">IDENTITY</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
            {mode === 'login' ? 'Authentication Required' : 'Establish New Identity'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Full Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                <input 
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-white transition-all placeholder:text-white/10"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-white transition-all placeholder:text-white/10"
                placeholder="identity@blackbox.gh"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Password</label>
              {mode === 'login' && (
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Forgot?</button>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:border-white transition-all placeholder:text-white/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full py-5 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              {mode === 'login' ? 'SIGN IN TO BLACK BOX' : 'ESTABLISH IDENTITY'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center"><span className="px-4 bg-[#0a0a0a] text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Hardware Verification</span></div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all italic flex items-center justify-center gap-2"
            >
              {mode === 'login' ? (
                <>New to the Repository? <span className="text-white border-b border-white/20 pb-0.5">Create Account</span></>
              ) : (
                <>Already verified? <span className="text-white border-b border-white/20 pb-0.5">Sign In</span></>
              )}
            </button>
            <p className="text-[9px] text-white/10 uppercase font-black tracking-[0.4em]">PREMIUM ACCESS ONLY</p>
          </div>
        </div>

        {/* Security badge at bottom */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20">
          <Shield size={14} />
          <span className="text-[8px] font-black uppercase tracking-widest">Encrypted Identity Link // Black Box Sec-v3</span>
        </div>
      </div>

      {/* Footer navigation shortcut */}
      <button 
        onClick={() => navigateTo('home')}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all italic"
      >
        <ArrowLeft size={14} /> Back to Homepage
      </button>
    </div>
  );
};
