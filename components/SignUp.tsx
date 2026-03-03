import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import type { User } from '../interface/interface';
import { signUp, getUserProfile } from '../lib/api';
import { useAppContext } from '../App';

interface SignUpProps {
    onSuccess: (user: User) => void;
    onSwitchToLogin: () => void;
    navigateTo: (view: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onSwitchToLogin, navigateTo }) => {
    const { theme } = useAppContext();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const isDark = theme === 'dark';
    const cardText = isDark ? 'text-white' : 'text-black';
    const cardMuted = isDark ? 'text-white/50' : 'text-black/50';
    const inputBg = isDark ? 'bg-white/5 focus:bg-white/10' : 'bg-[#F5F5F5] focus:bg-white';
    const inputPh = isDark ? 'placeholder:text-white/25' : 'placeholder:text-black/25';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!formData.name || !formData.email || !formData.password) {
                alert("All Fields are Required!!");
                setIsLoading(false);
                return;
            }

            const { user } = await signUp(formData.email, formData.password);

            if (user) {
                const profile = await getUserProfile(user.id);
                const userObj: User = {
                    id: user.id,
                    name: formData.name,
                    email: user.email || '',
                    password: formData.password,
                    role: profile?.role || 'user'
                };

                // Friendly message as requested by the user
                alert("We've sent a verification email to you please verify");

                onSuccess(userObj);
                navigateTo("home");
            }
        } catch (error: any) {
            alert(error.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col h-full ${cardText}`}>
            <div className="mb-4">
                <h2 className="text-lg font-black italic tracking-tighter uppercase">
                    Create an account
                </h2>
                <p className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} mt-0.5 italic`}>
                    Establish your new tech identity
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5 flex-1 min-h-0 flex flex-col">
                <div className="space-y-1">
                    <label htmlFor="signup-name" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Name</label>
                    <div className="relative">
                        <UserIcon className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="signup-name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            autoComplete="name"
                            className={`w-full glow-border ${inputBg} rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold outline-none focus:border-[#CDA032] focus:ring-2 focus:ring-[#CDA032]/20 transition-all ${inputPh} ${cardText}`}
                            placeholder="Your name"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label htmlFor="signup-email" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Email</label>
                    <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="signup-email"
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
                    <label htmlFor="signup-password" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Password</label>
                    <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="signup-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            autoComplete="new-password"
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
                    {isLoading ? 'Processing...' : 'Create account'}
                </button>
            </form>

            <div className="pt-4 mt-auto border-t flex-shrink-0" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} hover:opacity-100 hover:text-[#CDA032] transition-all italic focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDA032] rounded px-1 py-0.5`}
                >
                    Already have an account? <span className="text-[#CDA032] ml-1">Log in</span>
                </button>
            </div>
        </div>
    );
};
