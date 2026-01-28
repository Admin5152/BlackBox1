
import React, { useState } from 'react';
import { 
  Send, Activity, Camera, Cpu, Smartphone, Laptop, Tablet, Gamepad2, Watch, Check, 
  ArrowLeft, ArrowRight, Calendar, AlertCircle
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { RepairRequest } from '../types';
import { generateId, formatCurrency } from '../lib/utils';
import { useAppContext } from '../App';

export const Repair: React.FC = () => {
  const { user, repairs, setRepairs, notify } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    description: '',
    date: ''
  });

  const submitRepairRequest = () => {
    if (!user) { navigate({ to: '/auth' }); return; }
    const newRepair: RepairRequest = {
       id: generateId(), userId: user.id, userName: user.name,
       device: `${formData.brand} ${formData.model}`, issue: formData.description,
       status: 'Received', date: new Date().toISOString()
    };
    setRepairs([newRepair, ...repairs]);
    notify('Request Logged.');
    navigate({ to: '/profile' });
  };

  const deviceTypes = [
    { id: 'smartphone', label: 'SMARTPHONE', desc: 'IPHONE, ANDROID PHONES', icon: Smartphone },
    { id: 'laptop', label: 'LAPTOP', desc: 'MACBOOK, WINDOWS LAPTOPS', icon: Laptop },
    { id: 'tablet', label: 'TABLET', desc: 'IPAD, ANDROID TABLETS', icon: Tablet },
    { id: 'gaming', label: 'GAMING CONSOLE', desc: 'PLAYSTATION, XBOX, SWITCH', icon: Gamepad2 },
    { id: 'smartwatch', label: 'SMARTWATCH', desc: 'APPLE WATCH, GALAXY WATCH', icon: Watch },
    { id: 'other', label: 'OTHER DEVICE', desc: 'OTHER ELECTRONICS', icon: Cpu }
  ];

  const conditions = [
    { id: 'excellent', label: 'EXCELLENT', desc: 'MINOR COSMETIC WEAR ONLY' },
    { id: 'good', label: 'GOOD', desc: 'SLIGHT SIGNS OF USE' },
    { id: 'fair', label: 'FAIR', desc: 'NOTICEABLE WEAR AND TEAR' },
    { id: 'poor', label: 'POOR', desc: 'SIGNIFICANT DAMAGE' }
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Microsoft', 'Nintendo', 'HP', 'Dell', 'Other'];

  return (
    <div className="view-transition bg-black min-h-screen text-white py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">SUBMIT REPAIR REQUEST</h1>
          <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em]">Complete the form below to request a device repair service</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center max-w-2xl mx-auto relative px-4">
          <div className="absolute top-[22px] left-0 w-full h-[2px] bg-white/10 -translate-y-1/2"></div>
          <div className="absolute top-[22px] left-0 h-[2px] bg-[#D4AF37] -translate-y-1/2 transition-all duration-700 shadow-[0_0_15px_#D4AF37]" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[
            { id: 1, label: 'DEVICE', icon: Check },
            { id: 2, label: 'ISSUE', icon: AlertCircle },
            { id: 3, label: 'SCHEDULE', icon: Calendar }
          ].map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-4 bg-black px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 ${step >= s.id ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-black text-white/20 border-white/10'}`}>
                {step > s.id ? <Check size={20} strokeWidth={3} /> : <s.icon size={20} />}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-[#D4AF37]' : 'text-white/20'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div className="max-w-4xl mx-auto bg-[#0f0f0f] rounded-[3rem] p-10 border border-white/5 space-y-12 shadow-2xl">
          
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="space-y-8">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">SELECT DEVICE TYPE <span className="text-red-500">*</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deviceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, deviceType: type.id })}
                      className={`flex items-center gap-5 p-6 rounded-2xl border text-left transition-all ${formData.deviceType === type.id ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.deviceType === type.id ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40'}`}>
                        <type.icon size={24} />
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-[11px] font-black uppercase tracking-widest ${formData.deviceType === type.id ? 'text-white' : 'text-white/60'}`}>{type.label}</p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-tight">{type.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-black italic uppercase tracking-tighter">BRAND <span className="text-red-500">*</span></h3>
                  <select 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none focus:border-[#D4AF37] transition-all appearance-none text-white/60"
                  >
                    <option value="">Select brand</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-black italic uppercase tracking-tighter">MODEL <span className="text-red-500">*</span></h3>
                  <input 
                    placeholder="e.g., iPhone 15 Pro, MacBook Air M2"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-8 border-t border-white/5 pt-12">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">DEVICE CONDITION <span className="text-red-500">*</span></h3>
                <div className="space-y-4">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setFormData({ ...formData, condition: cond.id })}
                      className={`w-full flex items-center gap-6 p-6 rounded-2xl border text-left transition-all ${formData.condition === cond.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.condition === cond.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/10'}`}>
                        {formData.condition === cond.id && <Check size={14} strokeWidth={4} className="text-black" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-[11px] font-black uppercase tracking-widest ${formData.condition === cond.id ? 'text-white' : 'text-white/60'}`}>{cond.label}</p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest italic">{cond.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="space-y-4">
                 <h3 className="text-xl font-black italic uppercase tracking-tighter">DESCRIBE THE ISSUE <span className="text-red-500">*</span></h3>
                 <textarea 
                    placeholder="Provide details about the malfunction, symptoms, or requested service..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={8}
                    className="w-full bg-black border border-white/10 rounded-[2rem] p-8 text-sm font-light italic leading-relaxed outline-none focus:border-[#D4AF37]/40 transition-all resize-none"
                 />
              </div>
              <div className="space-y-4">
                 <h3 className="text-sm font-black italic uppercase tracking-tighter">ATTACH MEDIA (OPTIONAL)</h3>
                 <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:bg-white/5 transition-all cursor-pointer">
                    <Camera className="mx-auto mb-4 opacity-20" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Drag & drop or click to upload photos of damage</p>
                 </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-12 animate-in fade-in duration-500 text-center py-12">
               <div className="space-y-6">
                 <div className="w-24 h-24 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                   <Calendar size={40} />
                 </div>
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">SELECT PREFERRED DATE</h3>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] max-w-sm mx-auto">Authorized technical staff will contact you to confirm the exact bench slot</p>
               </div>
               <div className="max-w-sm mx-auto">
                 <input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-8 py-5 text-xl font-black outline-none text-white focus:border-[#D4AF37] transition-all text-center"
                 />
               </div>
               <div className="pt-12 flex items-center justify-center gap-6 text-[11px] font-black uppercase tracking-widest italic text-white/20">
                 <span className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Same-day Diagnostics</span>
                 <span className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> Genuine Spares</span>
               </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-between items-center pt-10 border-t border-white/5">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all ${step === 1 ? 'opacity-0 invisible' : 'text-white/40 hover:text-white'}`}
            >
              <ArrowLeft size={16} /> BACKWARD
            </button>
            
            {step < 3 ? (
              <button 
                onClick={() => {
                  if (step === 1 && (!formData.deviceType || !formData.brand || !formData.model || !formData.condition)) {
                    notify('All required fields must be complete.', 'error');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="px-12 py-5 bg-[#D4AF37] text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                NEXT PHASE <ArrowRight size={16} className="inline ml-2" />
              </button>
            ) : (
              <button 
                onClick={submitRepairRequest}
                className="px-12 py-5 bg-[#D4AF37] text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                AUTHORIZE REQUEST <Send size={16} className="inline ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
