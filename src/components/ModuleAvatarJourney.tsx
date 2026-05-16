import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';
import { PlayCircle, Shield, FileText, Settings, Award, Volume2, ArrowRight } from 'lucide-react';

interface ModuleAvatarJourneyProps {
  onNavigate: (view: ViewState) => void;
  onBack: () => void;
}

const steps = [
  { 
    id: '01', 
    title: 'Atmosfera & Imersão', 
    subscript: 'SYNTHWAVE MODULE',
    desc: 'Ative a engenharia sonora e posicione o cliente no estado ideal de percepção.',
    icon: Volume2,
    viewState: ViewState.MODULE_SYNTHWAVE,
    color: 'text-purple-500',
    borderColor: 'border-purple-500/30'
  },
  { 
    id: '02', 
    title: 'Diagnóstico & Consultoria', 
    subscript: 'ARCHITECTURAL / CONSULTANCY',
    desc: 'Apresente diagramas térmicos e comparativos práticos. Revele a dor e a solução WINF.',
    icon: Shield,
    viewState: ViewState.MODULE_CONSULTANCY_LINK,
    color: 'text-blue-500',
    borderColor: 'border-blue-500/30'
  },
  { 
    id: '03', 
    title: 'Oferta & Orçamento', 
    subscript: 'QUOTATION SYSTEM',
    desc: 'Desenhe o projeto em tempo real. Simule cortes e otimização para elevar o ticket médio.',
    icon: FileText,
    viewState: ViewState.MODULE_QUOTES,
    color: 'text-emerald-500',
    borderColor: 'border-emerald-500/30'
  },
  { 
    id: '04', 
    title: 'Gestão de Produção', 
    subscript: 'INSTALLATION CRM',
    desc: 'Aprove a proposta e inicie o workflow técnico (Inspeção, Aplicação, Finalização).',
    icon: Settings,
    viewState: ViewState.MODULE_INSTALLATIONS,
    color: 'text-orange-500',
    borderColor: 'border-orange-500/30'
  },
  { 
    id: '05', 
    title: 'Certificação Oficial', 
    subscript: 'WINF DIGITAL WARRANTY',
    desc: 'Entregue o certificado digital rastreável Blackshop. Concretize a lealdade do cliente.',
    icon: Award,
    viewState: ViewState.WARRANTY,
    color: 'text-yellow-500',
    borderColor: 'border-yellow-500/30'
  }
];

const ModuleAvatarJourney: React.FC<ModuleAvatarJourneyProps> = ({ onNavigate, onBack }) => {
  return (
    <div className="min-h-screen bg-[#050505] p-6 animate-fade-in relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 relative z-10 p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
              Jornada do <span className="italic text-white">Avatar</span>
            </h1>
            <p className="text-white/40 text-xs md:text-sm font-light tracking-widest uppercase">
              O Protocolo WINF OS™ para o Ciclo Perfeito de Vendas
            </p>
          </div>
          <button 
            onClick={onBack}
            className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors border border-white/10 px-4 py-2 bg-white/5"
          >
            VOLTAR
          </button>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 py-10 px-4 md:px-12 flex flex-col justify-center">
          <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
          
          <div className="space-y-16 relative z-10 w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative pl-12 md:pl-32 group cursor-pointer"
                  onClick={() => onNavigate(step.viewState)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-5px] md:left-[51px] top-4 w-3 h-3 rounded-full bg-black border-2 border-white/30 group-hover:bg-white group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]`} />
                  
                  {/* Step Card */}
                  <div className={`bg-[#0A0A0A] border ${step.borderColor} p-6 hover:bg-[#111] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden relative group`} >
                    
                    {/* Number Background */}
                    <div className="absolute -right-8 -top-8 text-[120px] font-black italic text-white/[0.02] pointer-events-none select-none transition-all duration-500 group-hover:scale-110 group-hover:text-white/[0.04]">
                      {step.id}
                    </div>

                    <div className={`w-16 h-16 rounded-none flex items-center justify-center shrink-0 border border-white/10 bg-black`}>
                      <Icon className={`w-8 h-8 ${step.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white/40 font-mono text-xs font-bold leading-none">{step.id}</span>
                        <h3 className="text-xl font-black uppercase tracking-wide text-white leading-none">{step.title}</h3>
                      </div>
                      <div className="text-xs md:text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-3">
                        {step.subscript}
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed font-light max-w-xl">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 shrink-0">
                      <button className="flex items-center gap-2 text-xs font-black uppercase text-white/40 tracking-widest group-hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-3">
                        <span>Iniciar Fase</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModuleAvatarJourney;
