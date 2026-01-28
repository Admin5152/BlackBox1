
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-8 border-t bg-black border-white/5 text-white">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
        <div className="space-y-8">
           <h2 className="text-3xl font-black italic tracking-tighter uppercase">BLACKBOX</h2>
           <p className="text-[10px] leading-relaxed max-w-[240px] font-black uppercase tracking-[0.3em] text-white/20 italic">
             Elite hardware repository & specialized diagnostics. Precision establishes the baseline.
           </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Directory</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            <li><Link to="/repair" className="hover:text-white transition-colors">Lab Diagnostics</Link></li>
            <li><Link to="/store" className="hover:text-white transition-colors">Hardware Bench</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Identity Log</Link></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Branch</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            <li className="flex items-center gap-3 italic"><MapPin size={14}/> KNUST, Kumasi, GH</li>
            <li className="flex items-center gap-3 italic"><Phone size={14}/> +233 50 123 4567</li>
          </ul>
        </div>
        <div className="flex items-end justify-start md:justify-end">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 italic">© 2025 BLACKBOX. EST. KUMASI.</p>
        </div>
      </div>
    </footer>
  );
};
