import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animações refinadas (suavidade e performance)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black"
    >
      {/* Background Layer com proteção de contraste */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 bg-black"
      >
        <img
          src="https://images.unsplash.com/photo-1600607687940-4e524cb35797?q=80&w=2070&auto=format&fit=crop"
          alt="Winf - Proteção Molecular"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        {/* Overlays Absolutos para Preto Profundo */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-12 relative z-10 pt-20">
        <motion.div style={{ y: contentY, opacity }} className="max-w-5xl">
          {/* Tagline / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="text-amber-300 text-sm md:text-base tracking-[6px] font-medium uppercase">
              WINF™ // Engineering
            </span>
          </motion.div>

          {/* Headline Monumental */}
          <motion.h1
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] leading-[0.85] font-light tracking-tight text-white mb-8 drop-shadow-2xl"
          >
            PROTEÇÃO<br />
            <span className="text-amber-300 font-medium drop-shadow-xl">
              MOLECULAR
            </span>
          </motion.h1>

          {/* Subheadline com Contraste Elevado */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-3xl text-gray-100 max-w-2xl leading-relaxed mb-12 drop-shadow-lg font-light"
          >
            Películas de alto desempenho para arquitetura de alto padrão. Engenharia invisível que transforma ambientes e protege patrimônios.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap gap-6"
          >
            <button className="group px-6 md:px-10 py-5 sm:px-12 sm:py-6 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              Explorar Coleção
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button className="px-10 py-5 sm:px-12 sm:py-6 bg-white/5 border border-white/20 hover:border-white text-white uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 backdrop-blur-sm lg:hover:bg-white lg:hover:text-black">
              Seja um Parceiro
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator Cinemático */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.4em] text-white/50 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
