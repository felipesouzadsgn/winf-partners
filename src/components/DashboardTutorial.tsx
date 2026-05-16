import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Target, Smartphone, User, Check, X } from 'lucide-react';

interface DashboardTutorialProps {
  onClose: () => void;
  userName: string;
}

const STEPS = [
  {
    icon: Shield,
    title: 'A Ciência da Proteção',
    desc: 'Bem-vindo ao Winf OS. Este é o seu portal central corporativo para gerenciar suas operações com segurança e precisão. Uma experiência digital construída sobre solidez.',
  },
  {
    icon: Target,
    title: 'Monitoramento & Gestão',
    desc: 'Acompanhe seu fluxo corporativo, leads ativos e ticket médio com métricas precisas em tempo real, em um painel estruturado nos padrões das melhores soluções financeiras.',
  },
  {
    icon: Smartphone,
    title: 'Central de Operações',
    desc: 'Acesse instantaneamente o módulo de propostas, captação de clientes, e integrações através de atalhos rápidos e eficientes do seu Hub Organizacional.',
  },
  {
    icon: User,
    title: 'Perfil Elevado',
    desc: 'Configure suas preferências e sincronize suas ferramentas de inteligência de mercado. A plataforma está pronta operante e segura.',
  }
];

export const DashboardTutorial: React.FC<DashboardTutorialProps> = ({ onClose, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const CurrentIcon = STEPS[currentStep].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/90 backdrop-blur-md p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-[#0A0A0A] border border-white/5 w-full max-w-xl overflow-hidden relative shadow-2xl rounded-sm"
        >
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
            <X size={20} />
          </button>

          <div className="p-10 md:p-14">
            <div className="mb-10 text-center">
              <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/40 border border-white/10 px-4 py-1.5 inline-block">
                Winf OS • Autenticação Verificada
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center min-h-[220px]"
              >
                <div className="w-20 h-20 bg-[#111] border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  <CurrentIcon size={32} className="text-white/80" strokeWidth={1} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
                  {currentStep === 0 ? `Olá, ${userName}` : STEPS[currentStep].title}
                </h3>
                <p className="text-sm font-light text-white/50 leading-relaxed max-w-md mx-auto">
                  {STEPS[currentStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
              {/* Progress track */}
              <div className="flex gap-2">
                {STEPS.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 transition-all duration-500 rounded-full ${idx === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/10'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextStep}
                className="bg-white text-black px-6 py-3 text-xs md:text-[10px] uppercase font-black tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2 rounded-sm"
              >
                {currentStep === STEPS.length - 1 ? 'Iniciar Sessão' : 'Avançar'} 
                {currentStep === STEPS.length - 1 ? <Check size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
