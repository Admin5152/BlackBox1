import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Us',
            description: 'Our friendly team is here to help.',
            value: 'support@blackbox.com',
            action: 'mailto:support@blackbox.com'
        },
        {
            icon: Phone,
            title: 'Call Us',
            description: 'Mon-Sat from 8am to 6pm.',
            value: '+233 55 123 4567',
            action: 'tel:+233551234567'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            description: 'Come say hello at our retail store.',
            value: 'Tech Hub, KNUST, Kumasi',
            action: 'https://maps.google.com'
        }
    ];

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-8 view-transition">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-wider text-white">
                        Get In <span className="text-[#D4AF37]">Touch</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Have a question about a product, repair, or trade-in? Our team of tech specialists is ready to assist you with premium support.
                    </p>
                </div>

                {/* Two Column Layout for form and info */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">

                    {/* Left Column - Contact Info */}
                    <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1">
                        <h2 className="text-2xl font-heading font-semibold text-white tracking-widest uppercase mb-4 hidden lg:block">
                            Direct Access
                        </h2>

                        <div className="grid gap-6">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.action}
                                    target={method.icon === MapPin ? "_blank" : "_self"}
                                    rel="noreferrer"
                                    className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300">
                                        <method.icon size={20} className="text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-white font-heading font-semibold tracking-wide">{method.title}</h3>
                                        <p className="text-gray-400 text-sm">{method.description}</p>
                                        <p className="text-[#D4AF37] font-medium pt-2 group-hover:text-white transition-colors">{method.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Proof Mini */}
                        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center gap-4">
                            <MessageSquare size={24} className="text-[#D4AF37] flex-shrink-0" />
                            <p className="text-sm text-gray-300 leading-relaxed font-light">
                                <span className="text-white font-medium">Fast Response:</span> We typically reply to all inquiries within 2 hours during business operations.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="relative order-1 lg:order-2">
                        {/* Form Background Styling */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black rounded-3xl border border-gray-800 shadow-2xl transform lg:scale-105"></div>

                        <div className="relative p-8 md:p-10 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wide">
                                    Send a Message
                                </h2>
                                <div className="w-16 h-0.5 bg-[#D4AF37]"></div>
                            </div>

                            {isSuccess ? (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send size={32} className="text-green-500" />
                                    </div>
                                    <h3 className="text-xl text-white font-heading font-bold tracking-widest uppercase">Message Received</h3>
                                    <p className="text-gray-400 text-sm">
                                        Thank you for reaching out to BlackBox. A specialist will be in touch with you shortly.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="pt-4 text-[#D4AF37] text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all duration-300"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all duration-300"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Subject</label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all duration-300"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                                            placeholder="Include all necessary details..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group relative flex items-center justify-center gap-3 bg-[#D4AF37] text-black font-heading font-bold uppercase tracking-widest text-sm py-4 rounded-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-transform hover:scale-[1.02] active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <span className="relative">
                                            {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
                                        </span>
                                        <Send size={16} className={`relative transition-transform ${isSubmitting ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
