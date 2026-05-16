
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, ChevronRight, ChevronLeft, Camera, MessageSquare, 
  Mail, Video, User, CheckCircle2, Shield, Zap, Globe, 
  ArrowRight, Sparkles, Smartphone, Award
} from 'lucide-react';
import { ViewState } from '../types';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  content: React.ReactNode;
  actions?: { label: string; action: () => void; primary?: boolean }[];
}

const ModuleDigitalStart: React.FC<{ onBack: () => void, onNavigate: (view: ViewState) => void }> = ({ onBack, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      id: 0,
      title: "Missão: Dominação Digital",
      subtitle: "A sua jornada para o topo começa aqui.",
      icon: Rocket,
      content: (
        <div className="space-y-6">
          <p className="text-white/40 text-lg leading-relaxed">
            Você não está apenas abrindo um Instagram. Você está ativando uma <span className="text-white font-bold">Máquina de Vendas 24/7</span>.
            O ecossistema WINF™ fornece a munição, mas você é o comandante.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 p-6 border border-white/10">
              <Shield className="text-white mb-4" size={24} />
              <h4 className="text-white font-bold text-sm uppercase mb-2">Autoridade</h4>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Siga o padrão Apple de design e comunicação.</p>
            </div>
            <div className="bg-white/5 p-6 border border-white/10">
              <Zap className="text-amber-400 mb-4" size={24} />
              <h4 className="text-white font-bold text-sm uppercase mb-2">Velocidade</h4>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Scripts prontos para converter leads em minutos.</p>
            </div>
            <div className="bg-white/5 p-6 border border-white/10">
              <Globe className="text-blue-400 mb-4" size={24} />
              <h4 className="text-white font-bold text-sm uppercase mb-2">Território</h4>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Domine sua região com SEO e anúncios locais.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Blueprint Social (Instagram)",
      subtitle: "O seu portfólio de luxo no bolso do cliente.",
      icon: Camera,
      content: (
        <div className="space-y-6">
          <p className="text-white/40">O seu Instagram deve transpirar <span className="text-white">tecnologia e exclusividade</span>. Não poste apenas fotos, conte uma história de proteção.</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 bg-white/5 p-4 border border-white/10">
              <CheckCircle2 size={18} className="text-white shrink-0" />
              <div>
                <h4 className="text-white text-sm font-bold uppercase">Foto de Perfil & Bio</h4>
                <p className="text-xs text-white/40 mt-1">Use o avatar premium WINF ou sua foto profissional e a bio estruturada para conversão que fornecemos no Arsenal.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-white/5 p-4 border border-white/10">
              <CheckCircle2 size={18} className="text-white shrink-0" />
              <div>
                <h4 className="text-white text-sm font-bold uppercase">Grade Visual (Arsenal)</h4>
                <p className="text-xs text-white/40 mt-1">Baixe os 9 primeiros posts fixados para dar autoridade imediata ao seu perfil novo.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-white/5 p-4 border border-white/10">
              <CheckCircle2 size={18} className="text-white shrink-0" />
              <div>
                <h4 className="text-white text-sm font-bold uppercase">Highligts (Destaques)</h4>
                <p className="text-xs text-white/40 mt-1">Capas minimalistas: Tecnologias, Obras, ROI, Quem somos.</p>
              </div>
            </li>
          </ul>
        </div>
      ),
      actions: [
        { label: "Baixar Kit Instagram", action: () => onNavigate(ViewState.MODULE_ARSENAL), primary: true },
        { label: "Solicitar Criação via Blackshop", action: () => onNavigate(ViewState.MODULE_BLACKSHOP) }
      ]
    },
    {
      id: 2,
      title: "WhatsApp AI Engine",
      subtitle: "O seu assistente que nunca dorme.",
      icon: MessageSquare,
      content: (
        <div className="space-y-6">
          <p className="text-white/40">Configuraremos seu WhatsApp para triagem automática usando nossa IA treinada.</p>
          <div className="bg-black/40 p-6 border border-winf-primary/20 relative">
             <div className="absolute -top-3 left-6 px-3 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase">Configuração Central</div>
             <p className="text-xs text-white font-mono mb-4">MENSAGEM DE SAUDAÇÃO SUGERIDA:</p>
             <p className="text-xs italic text-white/60 bg-white/5 p-4 border border-white/10 mb-4">
               "Olá! Sou a IA de atendimento da [Sua Unidade] WINF™. Como posso ajudar você a proteger seu patrimônio hoje? Digite 1 para Residencial ou 2 para Automotivo."
             </p>
             <button className="text-xs md:text-[10px] font-black uppercase text-white hover:underline">Copiar para o WhatsApp</button>
          </div>
          <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20">
             <Smartphone size={20} className="text-blue-400" />
             <p className="text-xs md:text-[10px] text-blue-400 font-bold uppercase">Integração Direta com WINF OS™: Todos os leads do seu site caem direto no seu App.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Identidade Profissional",
      subtitle: "E-mail e Comunicação de Elite.",
      icon: Mail,
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-5 md:p-8 bg-gradient-to-r from-zinc-900 to-black border border-white/5">
             <div className="w-16 h-16 bg-white/5 flex items-center justify-center">
                <User size={32} className="text-gray-600" />
             </div>
             <div>
                <h4 className="text-white font-bold text-lg">seu.nome@AdvancedWinf.net</h4>
                <p className="text-xs text-white uppercase tracking-widest font-black">E-mail Corporativo Ativo</p>
             </div>
          </div>
          <p className="text-xs text-white/40 leading-relaxed">
            Utilize seu e-mail profissional para todas as propostas enviadas pelo sistema. Isso aumenta sua conversão em up-front em até 40% comparado a e-mails genéricos.
          </p>
          <div className="space-y-3">
             <h5 className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40">Entregáveis de Marca:</h5>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className="p-3 bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] text-left uppercase font-bold text-white/40 hover:text-white transition-all">Assinatura de E-mail</button>
                <button className="p-3 bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] text-left uppercase font-bold text-white/40 hover:text-white transition-all">Cartão de Visita Digital</button>
                <button className="p-3 bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] text-left uppercase font-bold text-white/40 hover:text-white transition-all">Papel Timbrado (Propostas)</button>
                <button className="p-3 bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] text-left uppercase font-bold text-white/40 hover:text-white transition-all">Fundo para Zoom/Meeting</button>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "LIGAÇÃO DO SISTEMA",
      subtitle: "Pronto para o primeiro disparo.",
      icon: Sparkles,
      content: (
        <div className="flex flex-col items-center text-center space-y-8 py-6 md:py-10">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center relative">
             <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
             <Award size={48} className="text-white" />
          </div>
          <div className="max-w-md space-y-4">
             <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">SISTEMA EM SINCRO!</h3>
             <p className="text-white/40">
               Parabéns, Comandante. Sua estrutura digital básica está configurada. Agora o foco é <span className="text-white">PRODUÇÃO E DISTRIBUIÇÃO</span>.
             </p>
             <p className="text-xs text-white/40">
               Vá ao Arsenal diariamente para pegar o conteúdo do "Status do Dia" e mantenha sua rede ativa.
             </p>
          </div>
        </div>
      ),
      actions: [
        { label: "Ir para o Dashboard", action: () => onNavigate(ViewState.DASHBOARD_WINF), primary: true },
        { label: "Pegar Munição no Arsenal", action: () => onNavigate(ViewState.MODULE_ARSENAL) }
      ]
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-24 px-4 md:px-0">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <button onClick={onBack} className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all flex items-center gap-2">
          <ChevronLeft size={14} /> Sair do Tutorial
        </button>
        <div className="flex gap-2">
           {steps.map((_, i) => (
             <div key={i} className={`h-1 transition-all duration-500 ${i === currentStep ? 'w-8 bg-white' : i < currentStep ? 'w-4 bg-white/40' : 'w-4 bg-white/10'}`}></div>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-zinc-950 border border-white/5 rounded-none overflow-hidden shadow-2xl relative">
        {/* Step Indicator */}
        <div className="absolute top-0 right-0 p-5 md:p-8">
           <span className="text-[40px] font-black text-white/5 select-none leading-none">0{currentStep + 1}</span>
        </div>

        <div className="p-8 md:p-12">
            <header className="mb-12 space-y-4">
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center text-white border border-winf-primary/20 mb-6">
                 {React.createElement(currentStepData.icon as any, { size: 32 })}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                 {currentStepData.title}
              </h2>
              <p className="text-white text-xs md:text-[10px] font-black uppercase tracking-[0.4em]">{currentStepData.subtitle}</p>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-[300px]"
              >
                {currentStepData.content}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
               <div className="flex gap-2">
                 {currentStepData.actions?.map((btn, i) => (
                   <button 
                    key={i} 
                    onClick={btn.action}
                    className={`px-6 py-3 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${btn.primary ? 'bg-white text-black hover:bg-zinc-200' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                   >
                     {btn.label}
                   </button>
                 ))}
               </div>

               <div className="flex gap-4 w-full md:w-auto">
                 {currentStep > 0 && (
                   <button 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex-1 md:flex-none px-8 py-4 bg-white/5 text-white text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                   >
                     <ChevronLeft size={16} /> Voltar
                   </button>
                 )}
                 <button 
                  onClick={() => currentStep < steps.length - 1 ? setCurrentStep(prev => prev + 1) : onNavigate(ViewState.DASHBOARD_WINF)}
                  className="flex-1 md:flex-none px-12 py-4 bg-white text-black text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
                 >
                   {currentStep === steps.length - 1 ? 'Finalizar' : 'Continuar'} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>
        </div>
      </div>

      {/* Footer Support */}
      <div className="flex items-center justify-center gap-6 opacity-30 group hover:opacity-100 transition-opacity">
        <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WINF™ OPERATIONAL ONBOARDING</p>
        <div className="w-12 h-[1px] bg-white/20"></div>
        <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">2026 DIGITAL PROTOCOLS</p>
      </div>
    </div>
  );
};

export default ModuleDigitalStart;
