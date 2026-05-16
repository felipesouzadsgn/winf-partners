
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Wand2, Loader, Shield, Zap, Sparkles, Building2, Car, Lock, Activity, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useWinf } from '../contexts/WinfContext';

const PRESETS = [
    { 
        id: 'select-platinum', 
        name: 'WINF SELECT™ PLATINUM', 
        division: 'ARCH',
        icon: Building2,
        desc: 'Alta rejeição infravermelha com transparência cristalina.',
        prompt: 'Fachada de prédio corporativo ultra-moderno em São Paulo, vidros com leve reflexo azulado-platina, céu claro, 8k fotorrealista.'
    },
    { 
        id: 'dualreflect-titanium', 
        name: 'WINF DUAL REFLECT™ TITANIUM', 
        division: 'ARCH',
        icon: Shield,
        desc: 'Privacidade externa com baixa refletividade interna.',
        prompt: 'Interior de apartamento de luxo, vista para o mar através de vidros refletivos fumê, sol de final de tarde, zero reflexo interno.'
    },
    { 
        id: 'invisible-shield', 
        name: 'WINF INVISIBLE SHIELD™', 
        division: 'ARCH',
        icon: Zap,
        desc: 'Blindagem térmica invisível para vitrines e museus.',
        prompt: 'Vitrine de loja de grife iluminada, vidro completamente invisível, clareza absoluta, proteção contra desbotamento.'
    },
    { 
        id: 'white-matter', 
        name: 'WHITE MATTER® — ETCHED GLASS', 
        division: 'ARCH',
        icon: Sparkles,
        desc: 'Estética jateada de alta precisão para privacidade.',
        prompt: 'Divisória de vidro em consultório médico, textura jateada perfeita, luz difusa retroiluminada, design minimalista.'
    }
];

const ModuleNeuroMesh: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, saveAiGeneration } = useWinf();
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [molecularZoom, setMolecularZoom] = useState(false);

  const handleGenerate = async () => {
      if (!prompt) return;
      setLoading(true); setResult(null);

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const zoomContext = molecularZoom ? "MOLECULAR ZOOM, EXTREME DETAIL, NANOSTRUCTURE VISIBLE" : "CINEMATOGRAPHIC VIEW";
          const finalPrompt = `${prompt}. ESTILO: ${activePreset.prompt}. ${zoomContext}. TRAVA: SEM TEXTO. 8K.`;

          const response = await ai.models.generateImages({ 
              model: 'imagen-3.0-generate-002', 
              prompt: finalPrompt,
              config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '16:9'
              }
          });
          
          if (response.generatedImages?.[0]?.image?.imageBytes) {
              const url = `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`;
              setResult(url);
              await saveAiGeneration({ tool_used: 'Vision', prompt: finalPrompt, output_url: url, media_type: 'image/jpeg' });
          }
      } catch (e: any) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
        <div className="flex justify-between items-center border-b border-white/5 pb-10">
            <div>
                <button onClick={onBack} className="flex gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-widest mb-4">
                    <ChevronLeft size={14} /> Mission Control
                </button>
                <h1 className="text-5xl font-heading font-light text-white tracking-tighter">NEUROMESH <span className="font-bold">VISION</span>™</h1>
                <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest font-mono">Neural Asset Deployment // Phase Charlie</p>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => window.open('https://wa.me/5513999191510', '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-none transition-all text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest group"
                >
                    <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                    Suporte Técnico
                </button>
                <div className="bg-zinc-900/10 border border-winf-darkpurple/30 px-6 py-3 rounded-none flex items-center gap-3">
                    <Sparkles size={16} className="text-zinc-500 animate-pulse" />
                    <span className="text-xs md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Multi-Division Render Ready</span>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-[#080808] border border-white/5 p-6 md:p-10 flex flex-col gap-10">
                <div>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-[0.4em] mb-6">01 // Ativar Célula de Blindagem</p>
                    <div className="grid grid-cols-1 gap-2">
                        {PRESETS.map(p => (
                            <button 
                                key={p.id}
                                onClick={() => setActivePreset(p)}
                                className={`text-left p-6 rounded-none border transition-all flex items-center justify-between group ${activePreset.id === p.id ? 'bg-white/[0.03] border-zinc-700 text-white shadow-lg' : 'bg-transparent border-white/5 text-gray-600 hover:border-white/10'}`}
                            >
                                <div className="flex items-center gap-6">
                                   <p.icon size={24} className={activePreset.id === p.id ? 'text-white/40' : 'text-gray-800'} />
                                   <div>
                                       <h4 className="text-xs md:text-[10px] font-black uppercase tracking-widest">{p.name}</h4>
                                       <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] opacity-40 mt-1">{p.desc}</p>
                                   </div>
                                </div>
                                {p.id === 'dualreflect' && <Lock size={12} className="text-gray-800" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-[0.4em] mb-4">02 // Definir Jurisdição Visual</p>
                    <textarea 
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)} 
                        className="w-full bg-black border border-white/10 p-6 text-white text-sm focus:border-zinc-700 outline-none h-32 placeholder:text-gray-800" 
                        placeholder="Descreva o ambiente ou fachada de vidro..." 
                    />
                </div>

                <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-none">
                    <div className="flex items-center gap-3">
                        <Activity size={16} className={molecularZoom ? 'text-white' : 'text-gray-600'} />
                        <div>
                            <p className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Molecular Zoom™</p>
                            <p className="text-[10px] md:text-[8px] text-gray-600 uppercase">Renderização de ultra-detalhe nanométrico</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setMolecularZoom(!molecularZoom)}
                        className={`w-12 h-6 rounded-none transition-all relative ${molecularZoom ? 'bg-white' : 'bg-zinc-800'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-none bg-white transition-all ${molecularZoom ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>

                <button 
                    onClick={handleGenerate} 
                    disabled={loading} 
                    className="w-full py-5 bg-zinc-800 text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(74,144,226,0.3)] disabled:opacity-50"
                >
                    {loading ? <Loader size={14} className="animate-spin" /> : <Wand2 size={14} />}
                    {loading ? 'Engaging Matrix...' : 'Gerar Blindagem Visual'}
                </button>
            </div>
            
            <div className="bg-black border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[550px] shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                {result ? (
                    <img src={result} className="max-h-full object-contain animate-fade-in" alt="Winf AI Render" />
                ) : (
                    <div className="text-center opacity-10 flex flex-col items-center">
                        <Building2 size={80} className="mb-6" />
                        <p className="text-xs md:text-[10px] uppercase font-black tracking-[0.8em]">Aguardando Comando</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
export default ModuleNeuroMesh;
