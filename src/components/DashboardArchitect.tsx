import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Box, 
  TrendingUp, 
  MoreHorizontal, 
  Layers,
  Wand2,
  FolderLock,
  ChevronRight,
  Zap,
  Activity,
  User
} from 'lucide-react';
import { ViewState } from '../types';
import { useWinf } from '../contexts/WinfContext';
import { DashboardTutorial } from './DashboardTutorial';

interface DashboardArchitectProps {
  onChangeView: (view: ViewState) => void;
}

const DashboardArchitect: React.FC<DashboardArchitectProps> = ({ onChangeView }) => {
  const { user } = useWinf();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('winf_architect_tutorial_seen');
    if (!hasSeen) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    localStorage.setItem('winf_architect_tutorial_seen', 'true');
    setShowTutorial(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pb-12 text-white selection:bg-white/20">
      <AnimatePresence>
        {showTutorial && <DashboardTutorial userName={user?.name || 'Arquiteto'} onClose={handleCloseTutorial} />}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Header - Banking/Corp Style */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Architect Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              Acesso Profissional
            </h1>
            <p className="text-white/50 text-sm font-light tracking-wide mt-2">
              Bem-vindo, {user?.name || 'Arquiteto'}. Ambiente de especificação de performance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onChangeView(ViewState.MODULES)}
              className="bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
            >
              <Box size={14} className="text-white/40 group-hover:text-white transition-colors" />
              Ferramentas
            </button>
            <button
              onClick={() => onChangeView(ViewState.MODULE_BLACKSHOP)}
              className="bg-white text-black px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 hover:bg-zinc-200"
            >
              <Zap size={14} className="text-black/60" />
              Blackshop
            </button>
            <div className="w-12 h-12 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center grayscale text-white/30">
               <User size={18} />
            </div>
          </div>
        </header>

        {/* Fluid Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Action - ROI */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => onChangeView(ViewState.MODULE_ARCHITECTURAL)}
            className="md:col-span-8 bg-[#050505] border border-white/5 p-6 md:p-10 rounded-sm cursor-pointer group hover:border-white/20 transition-all relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-105 duration-700">
              <TrendingUp size={180} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-4 flex items-center gap-3">
                  <TrendingUp size={24} className="text-white/40 group-hover:text-white transition-colors" />
                  Calculadora de Eficiência Térmica
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl font-light tracking-wide">
                  Converta dados técnicos de entrada de calor em relatórios numéricos precisos. Demonstre o Retorno sobre o Investimento (ROI) diretamente para seu cliente corporativo.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white group-hover:gap-6 transition-all mt-8">
                Nova Simulação <MoreHorizontal size={14} />
              </div>
            </div>
          </motion.div>

          {/* AI Module */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => onChangeView(ViewState.MODULE_ESCAPE_3D)}
            className="md:col-span-4 bg-[#0A0A0A] border border-white/5 p-5 md:p-8 rounded-sm cursor-pointer group hover:border-white/20 transition-all relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
              <div className="space-y-4">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/30 transition-all mb-6">
                  <Wand2 size={18} />
                </div>
                <h3 className="text-xl font-light tracking-tight">Simulação 3D</h3>
                <p className="text-white/50 text-xs leading-relaxed font-light tracking-wide">
                  Renderize o efeito estético das películas em ambientes 3D avaliando impacto visual.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors mt-8">
                Abrir Workspace <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Catalog */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => onChangeView(ViewState.PRODUCTS_CATALOG)}
            className="md:col-span-4 bg-[#050505] border border-white/5 p-5 md:p-8 rounded-sm cursor-pointer group hover:border-white/20 transition-all shadow-xl"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/30 transition-all mb-6">
                <Layers size={18} />
              </div>
              <h3 className="text-xl font-light tracking-tight mb-2">Lâminas Técnicas</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light tracking-wide">
                Especificações completas e arquivos digitais para a sua biblioteca BIM.
              </p>
              <div className="mt-auto pt-8 flex items-center justify-between text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                Catálogo Digital <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Training */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => onChangeView(ViewState.MODULE_ACADEMY)}
            className="md:col-span-8 bg-[#0A0A0A] border border-white/5 p-5 md:p-8 rounded-sm cursor-pointer group hover:border-white/20 transition-all flex flex-col sm:flex-row items-center justify-between shadow-xl"
          >
            <div className="space-y-4 text-center sm:text-left mb-6 sm:mb-0">
              <div className="inline-flex items-center gap-2">
                <Activity size={14} className="text-white/40" />
                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Cortex Academy</p>
              </div>
              <h3 className="text-2xl font-light tracking-tight max-w-sm">Formação técnica e fundamentos práticos.</h3>
            </div>
            <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ChevronRight size={20} />
            </div>
          </motion.div>
        </div>

        {/* Project Section */}
        <motion.div variants={itemVariants} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 bg-[#050505] border border-white/5 p-6 md:p-12 rounded-sm text-center flex flex-col items-center justify-center min-h-[250px]">
             <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mb-6 text-white/20 bg-white/5">
                <FolderLock size={24} />
             </div>
             <h4 className="text-lg font-light tracking-tight text-white/80 mb-3">Seus Projetos Especificados</h4>
             <p className="text-sm text-white/40 max-w-md font-light leading-relaxed">
               As obras e projetos sob sua assinatura técnica serão rastreadas nesta central com acompanhamento fiduciário rigoroso.
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardArchitect;
