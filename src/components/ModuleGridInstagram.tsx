
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Grid, 
  Plus, 
  Calendar, 
  Clock, 
  Upload, 
  Trash2, 
  Sparkles, 
  Globe, 
  Eye, 
  Zap, 
  Share2,
  Brain,
  CheckCircle,
  Loader
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { GamificationAction } from '../types';
import { GoogleGenAI } from "@google/genai";
import TextoCriptografado from './TextoCriptografado';

import { getApiKey } from '../lib/gemini';

interface ModuleGridInstagramProps {
  onBack: () => void;
  onGamificationAction: (action: GamificationAction) => void;
}

const ModuleGridInstagram: React.FC<ModuleGridInstagramProps> = ({ onBack, onGamificationAction }) => {
  const { user, socialPosts, fetchSocialPosts, addSocialPost } = useWinf();
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<string | null>(null);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'strategy'>('grid');

  useEffect(() => { if (user?.id) fetchSocialPosts(); }, [user?.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => setFile(reader.result as string);
        reader.readAsDataURL(selectedFile);
    }
  };

  const generateAiCaption = async () => {
    setIsGeneratingCaption(true);
    try {
        const ai = new GoogleGenAI({ apiKey: getApiKey() });
        const prompt = `
            Persona: Social Media Strategist de Luxo para Winf Partners.
            Produto: Blindagem de Células (AeroCore ou NeoSkin).
            Perfil Instagram: @winfpartners.
            Contexto: Post de portfólio para Instagram focado em autoridade técnica e estética impecável.
            Missão: Gere uma legenda curta, magnética e autoritária.
            REGRAS DE LINGUAGEM (FASE CHARLIE):
            - PROIBIDO: Película, Insulfilm, Espelhado.
            - OBRIGATÓRIO: Célula, Blindagem, Jurisdição, Território.
            - Tom: Frio, técnico, premium.
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        setCaption(response.text || "Jurisdição Winf estabelecida. Blindagem de célula completa.");
    } catch (e) {
        setCaption("A autoridade técnica não requer explicações. Célula AeroCore™ ativada.");
    } finally {
        setIsGeneratingCaption(false);
    }
  };

  const handleSchedule = async () => {
      if (!file || !date) return;
      await addSocialPost({ 
          title: 'Premium Asset', 
          caption, 
          scheduled_date: new Date(date).toISOString(), 
          image_url: file, 
          platform: 'Instagram', 
          status: 'SCHEDULED' 
      });
      onGamificationAction('SCHEDULE_POST');
      setCaption(''); setDate(''); setFile(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.03] pb-10 gap-8">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <ChevronLeft size={14} /> Mission Control
                </button>
                <h1 className="text-5xl font-heading font-light text-white tracking-tighter uppercase">PORTFÓLIO <span className="font-bold text-winf-grid">PREMIUM</span></h1>
                <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest font-mono">Grid Dominance Engine // Phase Charlie</p>
            </div>
            
            <div className="flex gap-2 p-1 bg-black border border-white/5 rounded-none">
                <button onClick={() => setViewMode('grid')} className={`px-6 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest rounded-none transition-all ${viewMode === 'grid' ? 'bg-white/5 text-white' : 'text-gray-600 hover:text-white/40'}`}>Visual Grid</button>
                <button onClick={() => setViewMode('strategy')} className={`px-6 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest rounded-none transition-all ${viewMode === 'strategy' ? 'bg-white/5 text-white' : 'text-gray-600 hover:text-white/40'}`}>Estratégia de Post</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
            {/* SCHEDULER SIDEBAR */}
            <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-5 md:p-8 flex flex-col gap-8">
                <div>
                    <h3 className="text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                        <Plus size={14} className="text-winf-grid" /> Registrar Novo Ativo
                    </h3>
                    
                    <div className="space-y-6">
                        <div 
                            className={`aspect-square rounded-none border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group ${file ? 'border-winf-grid/50' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}
                            onClick={() => document.getElementById('grid-upload')?.click()}
                        >
                            {file ? (
                                <img src={file} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                            ) : (
                                <>
                                    <Upload size={32} className="text-gray-700 mb-4 group-hover:text-winf-grid transition-colors" />
                                    <p className="text-xs md:text-[10px] text-gray-600 uppercase font-black tracking-widest">Carregar Mídia</p>
                                </>
                            )}
                            <input type="file" id="grid-upload" className="hidden" onChange={handleFileChange} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Legenda Estratégica</label>
                                <button 
                                    onClick={generateAiCaption}
                                    disabled={isGeneratingCaption}
                                    className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-winf-grid font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    {isGeneratingCaption ? <Loader size={10} className="animate-spin" /> : <Brain size={12} />} 
                                    {isGeneratingCaption ? 'Neural Sync...' : 'Gerar via IA'}
                                </button>
                            </div>
                            <textarea 
                                value={caption} 
                                onChange={e => setCaption(e.target.value)} 
                                placeholder="Aguardando narrativa técnica..." 
                                className="w-full bg-black border border-white/10 p-4 text-white text-xs font-mono focus:border-winf-grid outline-none h-32 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Data de Liberação</label>
                            <input 
                                type="datetime-local" 
                                value={date} 
                                onChange={e => setDate(e.target.value)} 
                                className="w-full bg-black border border-white/10 p-3 text-white text-xs font-mono focus:border-winf-grid outline-none" 
                            />
                        </div>

                        <button 
                            onClick={handleSchedule}
                            disabled={!file || !date}
                            className="w-full py-4 bg-winf-grid text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.4em] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(193,53,132,0.2)] disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Agendar para Grid
                        </button>
                    </div>
                </div>
            </div>

            {/* PREVIEW GRID */}
            <div className="lg:col-span-8 bg-[#050505] border border-white/5 overflow-hidden flex flex-col min-h-[700px]">
                <div className="p-6 border-b border-white/[0.03] bg-white/[0.01] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-winf-grid to-zinc-950 p-[1px]">
                            <div className="w-full h-full rounded-none bg-black flex items-center justify-center">
                                <Globe size={18} className="text-white" />
                            </div>
                        </div>
                        <a href="https://www.instagram.com/winfpartners/" target="_blank" rel="noopener noreferrer">
                            <p className="text-sm md:text-[11px] text-white font-bold uppercase tracking-widest hover:text-winf-grid transition-colors">Winf Partners Official</p>
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-mono font-bold hover:text-white transition-colors">@winfpartners</p>
                        </a>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-xs font-bold text-white">1,248</p>
                            <p className="text-[10px] md:text-[8px] text-gray-600 uppercase">Posts</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-white">45.2k</p>
                            <p className="text-[10px] md:text-[8px] text-gray-600 uppercase">Alvos</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    {socialPosts.length === 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                            {/* Placeholder real do @winfpartners look */}
                            <div className="aspect-square bg-black border border-white/[0.05] overflow-hidden grayscale group hover:grayscale-0 transition-all">
                                <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=500" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-black border border-white/[0.05] overflow-hidden grayscale group hover:grayscale-0 transition-all">
                                <img src="https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?q=80&w=500" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-black border border-white/[0.05] overflow-hidden grayscale group hover:grayscale-0 transition-all">
                                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=500" className="w-full h-full object-cover" />
                            </div>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-square bg-[#080808] border border-white/[0.02] flex items-center justify-center">
                                    <Globe size={14} className="text-gray-900" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                            {socialPosts.map(post => (
                                <div key={post.id} className="aspect-square bg-black border border-white/[0.05] relative group overflow-hidden cursor-pointer">
                                    <img src={post.image_url!} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                                        <Clock size={16} className="text-winf-grid mb-2" />
                                        <p className="text-[10px] md:text-[8px] text-white font-mono uppercase tracking-widest">{new Date(post.scheduled_date!).toLocaleDateString()}</p>
                                        <div className="mt-4 flex gap-2">
                                            <button className="p-2 bg-white/5 rounded-none hover:bg-white/10 transition-colors"><Eye size={12}/></button>
                                            <button className="p-2 bg-white/5 rounded-none hover:bg-white/10 transition-colors"><Trash2 size={12} className="text-red-500" /></button>
                                        </div>
                                    </div>
                                    {post.status === 'SCHEDULED' && (
                                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-winf-grid text-white text-[7px] font-black uppercase rounded-none shadow-lg">
                                            Pendente
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/[0.03] bg-black/40">
                    <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <Zap size={14} className="text-winf-grid animate-pulse" />
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-widest">Sincronização: @winfpartners Hub Active</span>
                         </div>
                         <div className="flex gap-4">
                            <button className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Sincronizar Feed</button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ModuleGridInstagram;
