
import React, { useState, useRef } from 'react';
import { 
  Send, Sparkles, Activity, Camera, MapPin, Phone, ShieldCheck, Cpu, 
  Smartphone, Laptop, Tablet, Gamepad2, Watch, LayoutGrid, Check, 
  Battery, Zap, Droplets, Code, AlertTriangle, Calendar, User as UserIcon,
  ChevronRight, ArrowLeft, ArrowRight
} from 'lucide-react';
import { User, RepairRequest } from '../types';
import { getDiagnosticHelp } from '../services/geminiService';
import { generateId, formatCurrency } from '../lib/utils';

interface RepairProps {
  user: User | null;
  repairs: RepairRequest[];
  setRepairs: (repairs: RepairRequest[]) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
  navigateTo: (view: string) => void;
}

export const Repair: React.FC<RepairProps> = ({ user, repairs, setRepairs, notify, navigateTo }) => {
  const [step, setStep] = useState(1);
  const [repairFiles, setRepairFiles] = useState<File[]>([]);
  const [pulseLoading, setPulseLoading] = useState(false);
  const [tempDiagnosis, setTempDiagnosis] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    issueType: '',
    description: '',
    date: '',
    technician: 'Any Available Technician'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyseWithPulse = async () => {
    if (!formData.model || !formData.description) {
      notify('Model and issue description required for Pulse AI', 'error');
      return;
    }

    setPulseLoading(true);
    notify('Pulse AI initializing remote hardware scan...', 'success');

    let base64Image: string | undefined = undefined;
    if (repairFiles.length > 0) {
      const imageFile = repairFiles.find(f => f.type.startsWith('image/'));
      if (imageFile) {
        const reader = new FileReader();
        base64Image = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string));
          reader.readAsDataURL(imageFile);
        });
      }
    }

    const diag = await getDiagnosticHelp(formData.model, formData.description, base64Image);
    setTempDiagnosis(diag);
    setPulseLoading(false);
    notify('Analysis complete.');
  };

  const submitRepairRequest = () => {
    if (!user) { navigateTo('auth'); return; }
    
    if (!formData.model || !formData.description) {
      notify('Please complete the required details', 'error');
      return;
    }

    const newRepair: RepairRequest = {
       id: generateId(), 
       userId: user.id, 
       userName: user.name,
       device: `${formData.brand} ${formData.model}`, 
       issue: formData.description,
       status: 'Received', 
       date: new Date().toISOString(), 
       aiDiagnosis: tempDiagnosis || undefined
    };
    
    setRepairs([newRepair, ...repairs]);
    notify('Lab request successfully transmitted to Black Box engineers.');
    navigateTo('profile');
  };

  const deviceTypes = [
    { id: 'smartphone', label: 'Smartphone', sub: 'iPhone, Android phones', icon: Smartphone },
    { id: 'laptop', label: 'Laptop', sub: 'MacBook, Windows laptops', icon: Laptop },
    { id: 'tablet', label: 'Tablet', sub: 'iPad, Android tablets', icon: Tablet },
    { id: 'gaming', label: 'Gaming Console', sub: 'PlayStation, Xbox, Switch', icon: Gamepad2 },
    { id: 'smartwatch', label: 'Smartwatch', sub: 'Apple Watch, Galaxy Watch', icon: Watch },
    { id: 'other', label: 'Other Device', sub: 'Other electronics', icon: Cpu }
  ];

  const issueTypes = [
    { id: 'screen', label: 'Screen Damage', sub: 'Cracked, broken, or unresponsive', icon: Smartphone },
    { id: 'battery', label: 'Battery Issues', sub: 'Poor battery life or charging', icon: Battery },
    { id: 'charging', label: 'Charging Port', sub: 'Charging port not working', icon: Zap },
    { id: 'water', label: 'Water Damage', sub: 'Device exposed to liquid', icon: Droplets },
    { id: 'software', label: 'Software Issues', sub: 'System errors, crashes, or bugs', icon: Code },
    { id: 'hardware', label: 'Hardware Failure', sub: 'Component malfunction', icon: Cpu },
    { id: 'other', label: 'Other Issue', sub: 'Other problems', icon: AlertTriangle }
  ];

  const technicians = [
    { id: 'any', name: 'Any Available Technician', sub: 'General repairs' },
    { id: 'kwame', name: 'Kwame Asante', sub: 'Apple devices specialist' },
    { id: 'ama', name: 'Ama Osei', sub: 'Android & Samsung expert' },
    { id: 'kofi', name: 'Kofi Mensah', sub: 'Laptop & PC repairs' }
  ];

  return (
    <div className="view-transition max-w-5xl mx-auto px-6 py-16 space-y-16 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Submit Repair Request</h2>
        <p className="text-white/40 text-sm font-medium tracking-wide">Complete the form below to request a device repair service</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-2xl mx-auto relative px-4">
        {/* Progress Lines */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-[#D4AF37] -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>

        {[
          { id: 1, label: 'Device', icon: Check },
          { id: 2, label: 'Issue', icon: AlertTriangle },
          { id: 3, label: 'Schedule', icon: Calendar }
        ].map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-4 border-black ${step >= s.id ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-[#1a1a1a] text-white/20'}`}
            >
              {step > s.id ? <Check size={20} strokeWidth={3} /> : <s.icon size={20} />}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-[#D4AF37]' : 'text-white/20'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Main Form Content */}
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {step === 1 && (
          <div className="space-y-12">
            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Select Device Type <span className="text-red-500">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {deviceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, deviceType: type.id })}
                    className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all group ${formData.deviceType === type.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-black hover:border-white/20'}`}
                  >
                    <div className={`p-3 rounded-xl transition-all ${formData.deviceType === type.id ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40 group-hover:text-white'}`}>
                      <type.icon size={20} />
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-widest ${formData.deviceType === type.id ? 'text-[#D4AF37]' : 'text-white'}`}>{type.label}</p>
                      <p className="text-[10px] text-white/30 mt-1 uppercase tracking-tighter leading-tight">{type.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Device Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Brand <span className="text-red-500">*</span></label>
                  <select 
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-xs font-bold outline-none focus:border-[#D4AF37] transition-all"
                  >
                    <option value="">Select brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="Sony">Sony</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Model <span className="text-red-500">*</span></label>
                  <input 
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., iPhone 15 Pro, MacBook Air M2"
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-xs font-bold outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Device Condition <span className="text-red-500">*</span></h3>
              <div className="space-y-4">
                {['Excellent', 'Good', 'Fair', 'Poor'].map((cond) => (
                  <label key={cond} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer group ${formData.condition === cond ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-black hover:border-white/10'}`}>
                    <input 
                      type="radio" 
                      name="condition" 
                      value={cond} 
                      className="hidden" 
                      onChange={() => setFormData({ ...formData, condition: cond })} 
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.condition === cond ? 'border-[#D4AF37]' : 'border-white/10 group-hover:border-white/30'}`}>
                      {formData.condition === cond && <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">{cond}</p>
                      <p className="text-[10px] text-white/30 uppercase mt-0.5">{cond === 'Excellent' ? 'Minor cosmetic wear only' : cond === 'Good' ? 'Slight signs of use' : cond === 'Fair' ? 'Noticeable wear and tear' : 'Significant damage'}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12">
            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">What's the problem? <span className="text-red-500">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {issueTypes.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setFormData({ ...formData, issueType: issue.id })}
                    className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all group ${formData.issueType === issue.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-black hover:border-white/20'}`}
                  >
                    <div className={`p-3 rounded-xl transition-all ${formData.issueType === issue.id ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40 group-hover:text-white'}`}>
                      <issue.icon size={20} />
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-widest ${formData.issueType === issue.id ? 'text-[#D4AF37]' : 'text-white'}`}>{issue.label}</p>
                      <p className="text-[10px] text-white/30 mt-1 uppercase tracking-tighter leading-tight">{issue.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Describe the Issue <span className="text-red-500">*</span></h3>
              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] italic -mt-4">Please provide detailed information about the issue. When did it start?</p>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#D4AF37] transition-all resize-none placeholder:text-white/10"
                placeholder="Describe the failure symptoms, error messages, or specific incidents..."
              />
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                   <div className="relative border-2 border-dashed border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all text-center group cursor-pointer bg-black/50">
                      <input 
                        type="file" 
                        multiple 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => e.target.files && setRepairFiles(Array.from(e.target.files))} 
                      />
                      <div className="space-y-3">
                        <Camera size={24} className="text-white/20 mx-auto" />
                        <span className="block text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Upload visual evidence</span>
                      </div>
                   </div>
                   {repairFiles.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                       {repairFiles.map((f, i) => (
                         <div key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-[8px] font-bold uppercase tracking-widest border border-white/10">{f.name}</div>
                       ))}
                     </div>
                   )}
                </div>
                <button 
                  onClick={handleAnalyseWithPulse}
                  disabled={pulseLoading}
                  className="px-8 py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/90 transition-all disabled:opacity-30"
                >
                  {pulseLoading ? 'Scanning...' : <>Analyze with Pulse <Sparkles size={16} /></>}
                </button>
              </div>

              {tempDiagnosis && (
                <div className="p-8 bg-black/80 border border-[#D4AF37]/30 rounded-2xl space-y-4 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                   <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Activity size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Verdict</span>
                   </div>
                   <p className="text-sm italic font-light leading-relaxed">{tempDiagnosis}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12">
            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Select Appointment Date <span className="text-red-500">*</span></h3>
              <input 
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full bg-black border border-white/10 rounded-xl px-6 py-5 text-sm outline-none focus:border-[#D4AF37] transition-all text-white"
              />
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Available dates: Tomorrow to 30 days from now</p>
            </div>

            <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-4">Preferred Technician (Optional)</h3>
              <div className="space-y-4">
                {technicians.map((tech) => (
                  <label key={tech.id} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer group ${formData.technician === tech.name ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-black hover:border-white/10'}`}>
                    <input 
                      type="radio" 
                      name="technician" 
                      value={tech.name} 
                      className="hidden" 
                      onChange={() => setFormData({ ...formData, technician: tech.name })} 
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.technician === tech.name ? 'border-[#D4AF37]' : 'border-white/10 group-hover:border-white/30'}`}>
                      {formData.technician === tech.name && <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">{tech.name}</p>
                      <p className="text-[10px] text-white/30 uppercase mt-0.5">{tech.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[#0f0f0f] p-10 rounded-[2.5rem] border border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Zap size={18} />
                    <span className="text-xl font-black italic uppercase tracking-tighter">Estimated Repair Cost</span>
                  </div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">This is a preliminary estimate. Final cost will be confirmed after diagnosis.</p>
               </div>
               <div className="text-right">
                  <p className="text-4xl font-serif-luxury font-black text-[#D4AF37] tracking-tighter">{formatCurrency(300)}</p>
               </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <button 
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-0"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          {step < 3 ? (
            <button 
              onClick={() => {
                if (step === 1 && (!formData.deviceType || !formData.brand || !formData.model || !formData.condition)) {
                  notify('Please fill in all required fields', 'error');
                  return;
                }
                setStep(step + 1);
              }}
              className="flex items-center gap-3 px-12 py-5 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              onClick={submitRepairRequest}
              className="flex items-center gap-3 px-12 py-5 bg-[#D4AF37] text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:brightness-110 shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all"
            >
              Submit Lab Request <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
