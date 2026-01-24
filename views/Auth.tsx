
import React from 'react';
import { User } from '../types';

interface AuthProps {
  setUser: (user: User) => void;
  navigateTo: (view: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ setUser, navigateTo }) => {
  return (
    <div className="view-transition min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-[360px] w-full bg-[#0A0A0A] border border-white/10 p-12 rounded-[3rem] text-center space-y-10 shadow-2xl animate-fade-in-up">
         <h2 className="text-3xl font-black italic tracking-tighter uppercase">IDENTITY</h2>
         <div className="space-y-4">
           <button onClick={() => { setUser({ id: 'U-01', name: 'Kwame', email: 'kwame@gh.com', role: 'user' }); navigateTo('home'); }} className="w-full py-5 bg-white text-black font-black rounded-xl text-sm hover:scale-105 transition-all uppercase tracking-widest shadow-2xl">Sign In to Black Box</button>
           <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Premium access only</p>
         </div>
      </div>
    </div>
  );
};
