
import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGemini } from '../services/geminiService';

interface PulseAIProps {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
}

export const PulseAI: React.FC<PulseAIProps> = ({ isOpen, setIsOpen }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    const apiHistory = chatHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await chatWithGemini(apiHistory, chatInput);
    
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ease-in-out ${isOpen ? 'w-full max-w-[400px] h-[600px] sm:right-8 right-0 px-4 sm:px-0' : 'w-20 h-20'}`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="pulse-ring w-20 h-20 bg-white text-black rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <Sparkles size={32} />
        </button>
      ) : (
        <div className="w-full h-full bg-black border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="p-8 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black text-sm pulse-ring">P</div>
               <div>
                  <p className="text-sm font-black uppercase tracking-widest text-white">Pulse AI</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active</p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X size={24}/>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                <Sparkles size={48} />
                <p className="text-xs font-black uppercase tracking-widest">How can I assist your tech journey?</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm ${msg.role === 'user' ? 'bg-white text-black font-bold' : 'bg-white/5 border border-white/10 text-white/70 font-light leading-relaxed'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-[#0A0A0A] border-t border-white/10 flex gap-3">
            <input 
              type="text" 
              placeholder="Message Pulse..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm outline-none text-white focus:border-white/40 transition-all placeholder:text-white/20" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
            />
            <button 
              onClick={handleSendMessage} 
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
              disabled={!chatInput.trim() || isChatLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
