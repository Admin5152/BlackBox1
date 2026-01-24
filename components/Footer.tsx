
import React from 'react';
import { MapPin, Phone } from 'lucide-react';

interface FooterProps {
  navigateTo: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="py-24 px-6 border-t bg-[#050505] border-white/5 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
           <h2 className="text-3xl font-black italic tracking-tighter uppercase">BLACKBOX</h2>
           <p className="text-xs leading-relaxed max-w-[240px] font-light uppercase tracking-widest text-white/30">
             The elite Ghanaian destination for hardware sales & specialized diagnostics. Precision is our baseline.
           </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Services</h4>
          <ul className="space-y-3 text-xs font-medium uppercase tracking-widest text-white/50">
            <li className="hover:opacity-100 cursor-pointer transition-opacity" onClick={() => navigateTo('repair')}>Lab Diagnostic</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity" onClick={() => navigateTo('store')}>Hardware Shop</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Location</h4>
          <ul className="space-y-3 text-xs font-medium uppercase tracking-widest text-white/50">
            <li className="flex items-center gap-3"><MapPin size={16}/> KNUST, Kumasi, GH</li>
            <li className="flex items-center gap-3"><Phone size={16}/> +233 50 123 4567</li>
          </ul>
        </div>
        <div className="space-y-6 text-right md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">© 2024 BLACKBOX GHANA. EST. KUMASI.</p>
        </div>
      </div>
    </footer>
  );
};
