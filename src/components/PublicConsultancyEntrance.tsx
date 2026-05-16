import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import Lenis from 'lenis';

interface PublicConsultancyEntranceProps {
  onEnterExperiences: () => void;
  onBack: () => void;
}

const PublicConsultancyEntrance: React.FC<PublicConsultancyEntranceProps> = ({ onEnterExperiences, onBack }) => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#050505] selection:bg-[#050505] selection:text-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Dynamic Background Pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
        style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      {/* Abstract Gradient Blurs - Softening the environment */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse pointer-events-none z-0" />

      {/* Intro Overlay */}
      {!introDone && (
         <motion.div 
           className="absolute inset-0 z-50 bg-[#FAFAFA]"
           initial={{ opacity: 1 }}
           animate={{ opacity: 0 }}
           transition={{ duration: 1.5, ease: 'easeInOut' }}
         />
      )}

      {/* Header */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 w-full z-20 p-6 md:p-8 flex items-center justify-between"
      >
        <div className="flex flex-col">
          <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-1">Acesso Restrito</span>
          <span className="text-sm font-black text-[#050505] uppercase tracking-widest leading-none">Portal do Cliente</span>
        </div>
        <button 
          onClick={onBack}
          className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-[#050505] transition-colors py-2 px-4 border border-transparent hover:border-[#050505]/10 rounded-full"
        >
          Voltar
        </button>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center mt-20 md:mt-0">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-12 flex justify-center items-center gap-4"
        >
          <div className="w-1.5 h-1.5 bg-[#050505] rounded-full"></div>
          <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-medium text-[#050505]/50">Elegância e Proteção</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="text-5xl md:text-8xl lg:text-[130px] font-medium tracking-tighter uppercase leading-[0.8] mb-12 text-[#050505]"
        >
          WINF™ <br/>
          <span className="font-light text-zinc-400 block mt-4 md:mt-6 text-3xl md:text-6xl lg:text-[70px] tracking-tight">
            Consultoria Técnica.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="text-xl md:text-2xl font-light text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-16"
        >
          Conheça as linhas de alta performance. Realize testes em simuladores térmicos interativos e conecte-se com seu consultor especialista.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <button 
             onClick={onEnterExperiences}
             className="group relative px-12 py-5 bg-[#050505] text-white text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden hover:bg-[#1a1a1a] transition-all duration-500 shadow-2xl mx-auto inline-flex items-center justify-center"
          >
             <span className="relative z-10 flex items-center gap-4">
               Consultor Winf <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
             </span>
          </button>
        </motion.div>

      </div>
      
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2, delay: 1 }}
           className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"
         >
            <Shield size={10} className="text-zinc-400" /> Tecnologia patenteada WINF OS™
         </motion.div>
      </div>
    </div>
  );
};

export default PublicConsultancyEntrance;
