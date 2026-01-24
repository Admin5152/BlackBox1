
import React, { useState, useRef } from 'react';
import { Send, Sparkles, Activity, Camera, MapPin, Phone, FileText } from 'lucide-react';
import { User, RepairRequest } from '../types';
import { getDiagnosticHelp } from '../services/geminiService';
import { generateId } from '../lib/utils';

interface RepairProps {
  user: User | null;
  repairs: RepairRequest[];
  setRepairs: (repairs: RepairRequest[]) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
  navigateTo: (view: string) => void;
}

export const Repair: React.FC<RepairProps> = ({ user, repairs, setRepairs, notify, navigateTo }) => {
  const [repairFiles, setRepairFiles] = useState<File[]>([]);
  const [pulseLoading, setPulseLoading] = useState(false);
  const [tempDiagnosis, setTempDiagnosis] = useState<string | null>(null);
  const repairFormRef = useRef<HTMLFormElement>(null);

  const handleAnalyseWithPulse = async () => {
    if (!repairFormRef.current) return;
    const fd = new FormData(repairFormRef.current);
    const device = fd.get('device') as string;
    const issue = fd.get('issue') as string;

    if (!device || !issue) {
      notify('Hardware and issue description required', 'error');
      return;
    }

    setPulseLoading(true);
    notify('Pulse AI initializing remote scan...', 'success');

    let base64Image: string | undefined = undefined;
    if (repairFiles.length > 0) {
      const imageFile = repairFiles.find(f => f.type.startsWith('image/'));
      if (imageFile) {
        const reader = new FileReader();
        base64Image = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(imageFile);
        });
      }
    }

    const diag = await getDiagnosticHelp(device, issue, base64Image);
    setTempDiagnosis(diag);
    setPulseLoading(false);
    notify('Analysis complete.');
  };

  const submitRepairRequest = (diag?: string) => {
    if (!user) { navigateTo('auth'); return; }
    if (!repairFormRef.current) return;
    const fd = new FormData(repairFormRef.current);

    const newRepair: RepairRequest = {
       id: generateId(), userId: user.id, userName: user.name,
       device: fd.get('device') as string, issue: fd.get('issue') as string,
       status: 'Received', date: new Date().toISOString(), aiDiagnosis: diag
    };
    setRepairs([newRepair, ...repairs]);
    setRepairFiles([]);
    setTempDiagnosis(null);
    notify('Lab request successfully submitted.');
    navigateTo('profile');
  };

  return (
    <div className="view-transition max-w-6xl mx-auto px-6 py-20 lg:py-32 space-y-20">
      <div className="text-center space-y-6 animate-fade-in-up">
        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">THE REPAIR <br/> LABORATORY.</h2>
        <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-widest">
          Kumasi's elite technical facility. Analyze with Pulse AI or submit directly to our engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7 space-y-12 animate-fade-in-up delay-100">
          <form ref={repairFormRef} className="space-y-8 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Hardware Identity</label>
              <input name="device" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-base focus:border-white/40 outline-none transition-all" placeholder="e.g. iPhone 15 Pro, M1 MacBook Pro" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Technical Issue</label>
              <textarea name="issue" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-base focus:border-white/40 outline-none resize-none transition-all" placeholder="Describe the malfunction in detail..." />
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <button type="button" onClick={handleAnalyseWithPulse} disabled={pulseLoading} className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-all disabled:opacity-50">
                 {pulseLoading ? 'Analyzing...' : <>Analyze with Pulse <Sparkles size={18}/></>}
               </button>
               <button type="button" onClick={() => submitRepairRequest()} className="flex items-center justify-center gap-3 px-8 py-5 border border-white/20 font-black rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                 Direct Submission <Send size={18}/>
               </button>
            </div>
          </form>

          {tempDiagnosis && (
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 animate-fade-in-up">
               <div className="flex items-center gap-3">
                  <Activity size={24} className="text-green-500" />
                  <h3 className="text-xl font-black uppercase tracking-widest">Pulse Technical Diagnosis</h3>
               </div>
               <p className="text-lg text-white/70 leading-relaxed font-light italic">"{tempDiagnosis}"</p>
               <button onClick={() => submitRepairRequest(tempDiagnosis)} className="w-full py-5 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest hover:scale-105 transition-all">
                 Proceed to Lab Booking
               </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8 animate-fade-in-up delay-200">
           <div className="bg-[#0A0A0A] border border-white/10 p-10 rounded-[2.5rem] space-y-8">
              <div className="text-center space-y-4">
                 <Camera size={48} className="mx-auto text-white/20" />
                 <h4 className="text-xl font-black uppercase tracking-widest">Evidence Upload</h4>
              </div>
              <div className="relative border-2 border-dashed border-white/10 rounded-[2rem] p-12 hover:border-white/30 transition-all text-center">
                 <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setRepairFiles(Array.from(e.target.files))} />
                 <span className="text-sm font-black text-white/30 uppercase tracking-widest">Select Files</span>
                 {repairFiles.length > 0 && <div className="mt-6 flex flex-wrap gap-2 justify-center">{repairFiles.map((f, i) => <div key={i} className="px-3 py-1 bg-white/5 rounded text-[10px] border border-white/10">{f.name.slice(0, 10)}...</div>)}</div>}
              </div>
           </div>

           <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] space-y-6">
              <h4 className="text-lg font-black uppercase tracking-widest border-b border-white/10 pb-4">Lab Locations</h4>
              <div className="space-y-6">
                 <div className="flex gap-4"><MapPin className="text-white/40" size={24}/><div><p className="font-bold">KNUST Main Campus</p><p className="text-xs text-white/40 uppercase tracking-widest">Commercial Area, Kumasi</p></div></div>
                 <div className="flex gap-4"><Phone className="text-white/40" size={24}/><div><p className="font-bold">+233 50 123 4567</p><p className="text-xs text-white/40 uppercase tracking-widest">Support Line</p></div></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
