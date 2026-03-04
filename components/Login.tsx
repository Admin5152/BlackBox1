import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { User } from '../interface/interface';
import { signIn, getUserProfile } from '../lib/api';
import { useNotifications } from '../contexts/NotificationContext';

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
    const { addNotification } = useNotifications();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            addNotification({
                type: 'error',
                title: 'Validation Error',
                message: 'All fields are required!!'
            });
            return;
        }

        setIsLoading(true);

        try {
            // Try Supabase authentication first
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

                addNotification({
                    type: 'success',
                    title: 'Login Successful!',
                    message: `Welcome back, ${userObj.name}!`
                });

                setUser(userObj);
                
                // Navigate based on user role
                if (userObj.role === 'admin') {
                    navigateTo('admin');
                } else {
                    navigateTo('home');
                }
            } else {
                addNotification({
                    type: 'error',
                    title: 'Login Failed',
                    message: 'Invalid email or password'
                });
            }
        } catch (error: any) {
            addNotification({
                type: 'error',
                title: 'Login Failed',
                message: error.message || 'Authentication failed'
            });
        } finally {
            setIsLoading(false);
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
                    disabled={isLoading}
                    className="w-full py-3 bg-[#CDA032] text-black font-black rounded-xl text-xs uppercase tracking-[0.15em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDA032] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Login now'}
                </button>
            </form>
        </>
    );
};
