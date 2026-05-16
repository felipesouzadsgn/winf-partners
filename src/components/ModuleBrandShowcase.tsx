import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Play, Maximize, Droplets, Sun, Activity, Zap, Shield, Sparkles, Navigation } from 'lucide-react';

interface ModuleBrandShowcaseProps {
  onBack: () => void;
}

const PRODUCTS = [
  {
    id: 'invisible',
    name: 'Winf Select™ Invisible',
    subtitle: 'O Poder Que Você Não Vê, Mas Sente.',
    description: 'Aeronáutica e Nanocerâmica fundidas. Transparência cristalina com bloqueio térmico absoluto. A visão pura do alto luxo.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2400',
    color: '#ffffff',
    glowColor: 'rgba(255,255,255,0.3)',
    stats: [
      { label: 'Visibilidade', value: '70% / 80%' },
      { label: 'Rejeição IR', value: 'Até 86%' },
      { label: 'Garantia', value: '10 Anos' }
    ],
    icon: Sparkles
  },
  {
    id: 'dualreflect',
    name: 'Winf Select™ Dual Reflect',
    subtitle: 'O Equilíbrio Perfeito entre Luz e Sombras.',
    description: 'Arquitetura envidraçada de alto padrão. Reflexão espelhada calibrada com máxima rejeição térmica e privacidade diurna.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400',
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.4)',
    stats: [
      { label: 'Rejeição Térmica', value: 'Até 81%' },
      { label: 'Linhas', value: 'DR15 / DR35' },
      { label: 'Acabamento', value: 'Espelhado' }
    ],
    icon: Zap
  },
  {
    id: 'blackpro',
    name: 'Winf Select™ BlackPro',
    subtitle: 'Privacidade Absoluta. Proteção Impenetrável.',
    description: 'Desenvolvido para máxima absorção térmica. Nanotecnologia com polissacarídeos escuros para a estética mais agressiva e luxuosa.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2400',
    color: '#00FF00',
    glowColor: 'rgba(0, 255, 0, 0.4)',
    stats: [
      { label: 'Rejeição UV', value: '99%' },
      { label: 'Privacidade', value: 'Extrema' },
      { label: 'Linhas', value: 'B5 / B20' }
    ],
    icon: Shield
  },
  {
    id: 'seguranca',
    name: 'Winf Select™ Segurança',
    subtitle: 'Proteção Anti-Vandalismo e Impacto.',
    description: 'Camadas espessas de poliéster de altíssima tensão projetadas para absorver impactos e manter vidros estilhaçados em seus aros. Blindagem invisível de alto calibre.',
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2400',
    color: '#FFCC00',
    glowColor: 'rgba(255, 204, 0, 0.4)',
    stats: [
      { label: 'Espessura', value: '4 Mil a 8 Mil' },
      { label: 'Proteção UV', value: '99%' },
      { label: 'Resistência', value: 'Extrema' }
    ],
    icon: Shield
  },
  {
    id: 'white',
    name: 'Winf Select™ White',
    subtitle: 'Luminosidade Total. Calor Zero.',
    description: 'Estética minimalista para projetos que exigem fachadas translúcidas com alta incidência de luz natural e rejeição térmica avançada.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2400',
    color: '#E0E0E0',
    glowColor: 'rgba(224, 224, 224, 0.6)',
    stats: [
      { label: 'Luminosidade', value: 'Máxima' },
      { label: 'Rejeição IR', value: 'Até 90%' },
      { label: 'Corrente', value: 'Clear' }
    ],
    icon: Sun
  },
  {
    id: 'aerocore',
    name: 'AeroCore™',
    subtitle: 'Nascida em Laboratório. Feita para Dominar.',
    description: 'Alta tecnologia aeroespacial para performance incomparável. Nanocerâmica criptográfica para regulação térmica extrema no seu veículo, iate ou jato.',
    image: 'https://images.unsplash.com/photo-1543226862-39202f29696f?auto=format&fit=crop&q=80&w=2400',
    color: '#0066FF',
    glowColor: 'rgba(0, 102, 255, 0.5)',
    stats: [
      { label: 'Performance', value: 'Militar' },
      { label: 'Espectro', value: 'Amplo Controle' },
      { label: 'Privacidade', value: 'Criptográfica' }
    ],
    icon: Navigation
  },
  {
    id: 'neoskin',
    name: 'NeoX / NeoSkin™ Brutal',
    subtitle: 'A Barreira de Sacrifício Hiper-Resistente.',
    description: 'A armadura tática (PPF) construída para resistir além dos limites. Tecnologia de sacrifício contra ambientes apocalípticos e terrenos extremos.',
    image: 'https://images.unsplash.com/photo-1506544777-62cd39efbf82?q=80&w=2670&auto=format&fit=crop',
    color: '#E33B0E',
    glowColor: 'rgba(227, 59, 14, 0.4)',
    stats: [
      { label: 'Microns', value: '150 a 800' },
      { label: 'Auto-Cura', value: 'Térmica' },
      { label: 'Proteção', value: 'Ambiental' }
    ],
    icon: Shield
  }
];

const ModuleBrandShowcase: React.FC<ModuleBrandShowcaseProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const index = Math.round((scrollTop / (scrollHeight - clientHeight)) * (PRODUCTS.length));
      setActiveSegment(Math.min(index, PRODUCTS.length - 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] text-white flex overflow-hidden">
      
      {/* Global Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 p-5 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white text-white/50 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar ao Sistema
        </button>
        <div className="flex gap-2">
          {PRODUCTS.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-1 transition-all duration-500 rounded-full ${idx <= activeSegment ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
             />
          ))}
        </div>
      </nav>

      {/* Main Snap Scrolling Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory hide-scrollbar relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        
        {/* Intro Slide */}
        <section className="h-screen w-full snap-center relative flex items-center justify-center p-5 md:p-8 lg:p-24">
           <img 
             src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
             className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
           
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="relative z-10 text-center max-w-4xl"
           >
             <h4 className="text-xs md:text-[10px] font-bold tracking-[0.6em] text-white/50 uppercase mb-6">A Reinvenção da Proteção Solar</h4>
             <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
               WINF™ <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">Digital Experience</span>
             </h1>
             <p className="text-xl md:text-2xl text-white/40 font-light max-w-3xl mx-auto leading-relaxed">
               Não vendemos película. Oferecemos controle absoluto sobre o ambiente.
             </p>
             
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="mt-24 opacity-50 flex flex-col items-center justify-center"
             >
                <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.4em] mb-4">Desça para Explorar</div>
               <ChevronDown size={24} />
             </motion.div>
           </motion.div>
        </section>

        {/* Product Slides */}
        {PRODUCTS.map((prod, idx) => (
          <section key={prod.id} className="h-screen w-full snap-start relative flex items-center overflow-hidden">
            {/* Background Image with Parallax effect feeling */}
            <div className="absolute inset-0 z-0">
               <motion.div 
                 className="w-full h-full"
                 style={{ 
                    backgroundImage: `url(${prod.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                 }}
               />
            </div>
            
            {/* Gradients to blend content */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            
            {/* Content Left Side */}
            <div className="relative z-20 w-full lg:w-1/2 p-5 md:p-8 md:p-24 flex flex-col justify-center h-full">
               
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
               >
                 <div className="flex items-center gap-4 mb-4">
                    <prod.icon size={24} className="opacity-80" style={{ color: prod.color }} />
                    <span className="text-xs md:text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: prod.color }}>{prod.id} Series</span>
                 </div>
                 
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
                   {prod.name.replace('Winf Select™ ', '')}
                 </h2>
                 <h3 className="text-xl md:text-2xl font-light text-white/80 tracking-tight mb-8">
                   {prod.subtitle}
                 </h3>
                 
                 <p className="text-base text-white/40 font-light leading-relaxed mb-12 max-w-lg">
                   {prod.description}
                 </p>
                 
                 {/* Tech Specs */}
                 <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-lg mb-12">
                   {prod.stats.map((stat, i) => (
                     <div key={i} className="flex flex-col">
                       <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">{stat.label}</span>
                       <span className="text-xl font-medium tracking-tight text-white">{stat.value}</span>
                     </div>
                   ))}
                 </div>
                 
                 {/* Action Button */}
                 <button 
                   className="group relative px-8 py-5 border border-white/20 uppercase text-xs md:text-[10px] tracking-[0.3em] font-bold overflow-hidden bg-black/50 backdrop-blur-md transition-all hover:border-white w-full sm:w-auto text-left"
                   style={{ 
                     boxShadow: `0 0 40px ${prod.glowColor}` 
                   }}
                 >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-between">
                      Simular Ambiente <ArrowLeft size={16} className="rotate-180 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </span>
                 </button>
               </motion.div>

            </div>
          </section>
        ))}

        {/* Closing Slide */}
        <section className="min-h-screen w-full snap-start relative flex flex-col items-center justify-center p-5 md:p-8 bg-[#050505]">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-600">
              PRONTO PARA ELEVAR SUA ARQUITETURA?
            </h2>
            <p className="text-zinc-500 font-light text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Inicie a análise na WINF Core ou converse com nossa equipe de concierge técnico sobre como as tecnologias Winf Select™ e AeroCore™ podem se integrar ao seu projeto.
            </p>
            
            <button 
               onClick={onBack}
               className="bg-white text-black px-12 py-6 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gray-200 transition-colors shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              Acessar Painel Central
            </button>
          </div>
        </section>

      </div>
      
      {/* Decorative lines & elements */}
      <div className="absolute bottom-12 right-12 text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold rotate-[-90deg] origin-bottom-right pointer-events-none hidden md:block">
        WINF INTERNATIONAL • EXPERIÊNCIA {new Date().getFullYear()}
      </div>
      
    </div>
  );
};

export default ModuleBrandShowcase;
