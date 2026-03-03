import React, { useState } from 'react';
import type { User } from '../interface/interface';
import { users } from '../data/userInfo';
import { signIn, getUserProfile } from '../lib/api';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LoginProps {
    setUser: (user: User) => void;
    navigateTo: (view: string) => void;
    isDark: boolean;
    cardText: string;
    cardMuted: string;
    inputBg: string;
    inputPh: string;
}

export const Login: React.FC<LoginProps> = ({
    setUser,
    navigateTo,
    isDark,
    cardText,
    cardMuted,
    inputBg,
    inputPh,
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for admin credentials (no account creation)
        if (formData.email === 'BlackBox@gmail.com' && formData.password === 'BlackBox') {
            const adminUser: User = {
                id: 'admin-001',
                name: 'Admin User',
                email: 'BlackBox@gmail.com',
                password: 'BlackBox',
                role: 'admin',
            };
            setUser(adminUser);
            navigateTo('/admin');
            return;
        }

        if (!formData.email || !formData.password) {
            alert('All Fields are Required!!');
            return;
        }

        try {
            // Check against local static users list first
            const localUser = users.find(
                (u) => u.email === formData.email && u.password === formData.password
            );

            if (localUser) {
                setUser(localUser);
                navigateTo('home');
                return;
            }

            const { user } = await signIn(formData.email, formData.password);

            if (user) {
                const profile = await getUserProfile(user.id);
                const userObj: User = {
                    id: user.id,
                    name: profile?.name || user.email?.split('@')[0] || 'User',
                    email: user.email || '',
                    password: formData.password,
                    role: profile?.role || 'user',
                };
                setUser(userObj);
                navigateTo('home');
            }
        } catch (error: any) {
            alert(error.message || 'Authentication failed');
        }
    };

    return (
        <>
            <div className="mb-4">
                <h2 className="text-lg font-black italic tracking-tighter uppercase">
                    Login to your account
                </h2>
                <p className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} mt-0.5 italic`}>
                    Welcome back to Blackbox
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5 flex-1 min-h-0 flex flex-col">
                <div className="space-y-1">
                    <label htmlFor="auth-email" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Email</label>
                    <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="auth-email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                            className={`w-full glow-border ${inputBg} rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold outline-none focus:border-[#CDA032] focus:ring-2 focus:ring-[#CDA032]/20 transition-all ${inputPh} ${cardText}`}
                            placeholder="identity@blackbox.gh"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label htmlFor="auth-password" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Password</label>
                    <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="auth-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            className={`w-full glow-border ${inputBg} rounded-xl pl-9 pr-9 py-2.5 text-sm font-bold outline-none focus:border-[#CDA032] focus:ring-2 focus:ring-[#CDA032]/20 transition-all ${inputPh} ${cardText}`}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${cardMuted} hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDA032] transition-colors`}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-[#CDA032] text-black font-black rounded-xl text-xs uppercase tracking-[0.15em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDA032] focus-visible:ring-offset-2"
                >
                    Login now
                </button>
            </form>
        </>
    );
};
