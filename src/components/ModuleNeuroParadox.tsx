
import React, { useState } from 'react';
import { ChevronLeft, Brain, Loader, Terminal, ShieldAlert, Target, Building2, Car } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useWinf } from '../contexts/WinfContext';
import TextoCriptografado from './TextoCriptografado';
import { ParadoxAnalysis } from '../types';

const ModuleNeuroParadox: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { gamify, setParadoxAnalysis } = useWinf();
  const [scenario, setScenario] = useState('');
  const [analysis, setAnalysis] = useState<ParadoxAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setParadoxAnalysis(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        DIRETRIZ: Analise este cenário de cliente High-Ticket: "${scenario}"
        
        Siga o Protocolo NeuroMesh Alpha:
        1. Verdade Inconveniente: Motivação real (medo, ego, custo).
        2. Risco de Perda: Falha crítica na abordagem.
        3. Conselho Contraintuitivo: Ação tática (Manobra).
        4. Comando de Impacto: Frase curta de efeito.
        5. Célula Sugerida: Escolha a Célula Winf mais adequada (Invisible, BlackPro, dUAL Reflect, AeroCore, NeoSkin, Winf Select™ Noir, AeroCore™ Titanium).
        6. Visual Prompt: Crie um prompt detalhado para geração de imagem de um carro de luxo aplicando a Célula Winf sugerida, focando em estética premium.

        DIRETRIZ AUTOMOTIVA DE LUXO: Para aplicações automotivas de luxo, priorize 'Winf Select™ Noir' para profundidade estética e 'AeroCore™ Titanium' para máxima rejeição térmica e durabilidade.

        TRAVA DE LINGUAGEM: Use termos como 'Jurisdição', 'Célula', 'Blindagem'. PROIBIDO 'Película', 'Insulfilm'.
        FORMATO: JSON. TOM: FRIO, TÁTICO.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              verdade: { type: Type.STRING },
              risco: { type: Type.STRING },
              conselho: { type: Type.STRING },
              copy: { type: Type.STRING },
              celula_sugerida: { type: Type.STRING },
              visual_prompt: { type: Type.STRING }
            },
            required: ['verdade', 'risco', 'conselho', 'copy', 'celula_sugerida', 'visual_prompt']
          }
        }
      });

      const result = JSON.parse(response.text);
      setAnalysis(result);
      setParadoxAnalysis(result);
      gamify('AI_GENERATED');
    } catch (err) {
      setError("FALHA NA CONEXÃO COM O CÓRTEX. TENTE NOVAMENTE.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <div className="border-b border-white/[0.03] pb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
          <ChevronLeft size={14} /> System Hub
        </button>
        <h1 className="text-5xl font-heading font-light text-white tracking-tighter">NEURO<span className="font-bold text-zinc-500">PARADOX</span>™</h1>
        <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest font-mono">Cognitive Warfare Unit // Jurisdição Alpha</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-1">
        <div className="bg-[#080808] border border-white/[0.05] p-5 md:p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
                <Terminal size={14} className="text-zinc-500" />
                <span className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest">Interrogation Input</span>
             </div>
             <span className="text-[10px] md:text-[8px] font-mono text-gray-800 uppercase tracking-widest">Protocol Charlie v3</span>
          </div>
          <textarea 
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="O que o alvo disse? (Ex: 'Não quero mudar o visual do meu prédio')"
            className="flex-1 bg-transparent border-none outline-none text-white/60 text-sm font-mono leading-relaxed resize-none h-64 placeholder:text-gray-800"
          />
          <button 
            onClick={handleAnalyze}
            disabled={isLoading || !scenario.trim()}
            className="w-full py-5 bg-zinc-900 text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all mt-8 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            {isLoading ? <Loader size={14} className="animate-spin" /> : <Brain size={14} />}
            {isLoading ? 'Scanning Psyche...' : 'Interceptar Comportamento'}
          </button>
        </div>

        <div className="bg-[#050505] border border-white/[0.05] p-6 md:p-10 min-h-[450px] flex flex-col relative overflow-hidden shadow-2xl">
          {!analysis && !isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-10">
               <ShieldAlert size={60} className="text-white/40 mb-6" />
               <p className="text-xs md:text-[10px] font-bold uppercase tracking-[0.5em]">Aguardando Captura de Sinal</p>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
               <div className="w-24 h-px bg-zinc-900 animate-[width_2s_ease-in-out_infinite]"></div>
               <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">Descriptografando Medos...</p>
            </div>
          ) : (
            <div className="space-y-10 animate-fade-in relative z-10">
               {/* CELL SUGGESTION HUD */}
               <div className="p-4 bg-zinc-900/10 border border-zinc-700/30 rounded-none flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                     <Building2 size={16} className="text-zinc-500" />
                     <span className="text-xs md:text-[10px] font-black uppercase tracking-widest">Célula de Blindagem Sugerida</span>
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight">{analysis.celula_sugerida}</span>
               </div>

               <div>
                 <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2"><Target size={12}/> Verdade Inconveniente</p>
                 <p className="text-sm text-white/80 font-light leading-relaxed border-l-2 border-zinc-700/50 pl-6 italic">
                    <TextoCriptografado text={analysis.verdade} />
                 </p>
               </div>
               <div>
                 <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-widest mb-2">Manobra Contrarian Recomendada</p>
                 <p className="text-sm text-gray-100 font-bold leading-relaxed border-l-2 border-zinc-700 pl-6">{analysis.conselho}</p>
               </div>
               <div className="pt-8 border-t border-white/[0.05]">
                 <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-widest mb-3">Comando de Impacto (Liberação Territorial)</p>
                 <div className="bg-black border border-white/10 p-6 rounded-none text-white text-base font-light italic leading-relaxed shadow-inner">
                    "{analysis.copy}"
                 </div>
               </div>
               <button onClick={() => { setAnalysis(null); setScenario(''); }} className="w-full text-xs md:text-[10px] md:text-sm md:text-[11px] text-gray-800 hover:text-white uppercase font-bold tracking-[0.4em] pt-6 transition-colors">Reiniciar Interrogatório</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleNeuroParadox;
