import React, { useState } from 'react';
import type { User } from '../interface/interface';
import { signUp as signUpApi, getUserProfile } from '../lib/api';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

interface SignUpProps {
    setUser: (user: User) => void;
    navigateTo: (view: string) => void;
    isDark: boolean;
    cardText: string;
    cardMuted: string;
    inputBg: string;
    inputPh: string;
}

export const SignUp: React.FC<SignUpProps> = ({
    setUser,
    navigateTo,
    isDark,
    cardText,
    cardMuted,
    inputBg,
    inputPh,
}) => {
    const [role, setRole] = useState<'user' | 'admin'>('user');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus('loading');
        setStatusMessage('');

        if (!formData.name || !formData.email || !formData.password) {
            setStatus('error');
            setStatusMessage('All Fields are Required!!');
            return;
        }

        try {
            const { user } = await signUpApi(formData.email, formData.password, formData.name, role);

            if (user) {
                // We show the success message regardless of profile fetch success
                // because auth succeeded and verification email is sent.
                setStatus('success');
                setStatusMessage("We've sent a verification email to you please verify");

                try {
                    const profile = await getUserProfile(user.id);
                    if (profile) {
                        const userObj: User = {
                            id: user.id,
                            name: formData.name,
                            email: user.email || '',
                            password: formData.password,
                            role: profile?.role || 'user',
                        };
                        setUser(userObj);
                    }
                } catch (profileError) {
                    console.warn('Could not fetch profile, but user auth succeeded:', profileError);
                }

                // If it's a success, we might want to stay on this screen to show the message
                // but if we want to navigate, we should probably add a timeout.
                // For now, let's keep the user on the screen to read the verification message.
            } else {
                setStatus('error');
                setStatusMessage('Authentication failed');
            }
        } catch (error: any) {
            setStatus('error');
            setStatusMessage(error.message || 'Authentication failed');
        }
    };

    return (
        <>
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
                    <label htmlFor="auth-name" className={`text-[10px] font-black uppercase tracking-widest ${cardMuted} ml-1 block`}>Name</label>
                    <div className="relative">
                        <UserIcon className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${cardMuted}`} size={16} aria-hidden />
                        <input
                            id="auth-name"
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
                {status === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider text-center">
                            {statusMessage}
                        </p>
                    </div>
                )}

                {status === 'success' ? (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl space-y-2">
                        <p className="text-[11px] text-green-500 font-black uppercase tracking-widest text-center leading-relaxed">
                            {statusMessage}
                        </p>
                        <button
                            type="button"
                            onClick={() => navigateTo('login')}
                            className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
                        >
                            Return to Login
                        </button>
                    </div>
                ) : (
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 bg-[#CDA032] text-black font-black rounded-xl text-xs uppercase tracking-[0.15em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDA032] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Creating identity...' : 'Create account'}
                    </button>
                )}
            </form>
        </>
    );
};
