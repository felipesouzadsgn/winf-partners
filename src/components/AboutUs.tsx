import React, { useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowLeft, Shield, Globe, Cpu, Users, Leaf, Zap, Diamond, Target, Building2, User } from 'lucide-react';
import Lenis from 'lenis';
import { SubtleCinematicScene, AstronautBackground } from './shared/CinematicEffects';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const canvasOpacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    [1, 0, 0, 1]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FAFAFA] text-[#050505] selection:bg-[#050505] selection:text-[#FAFAFA] font-sans overflow-x-hidden">
      
      {/* Backgrounds */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
        style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />
      
      <motion.div style={{ opacity: canvasOpacity }} className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
          <Suspense fallback={null}>
            <SubtleCinematicScene />
          </Suspense>
        </Canvas>
      </motion.div>

      <AstronautBackground />

      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse pointer-events-none z-0" />

      {/* Navbar Minimal */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 w-full z-50 p-6 md:p-8 flex items-center justify-between pointer-events-none mix-blend-difference text-white"
      >
        <button 
          onClick={onBack}
          className="pointer-events-auto group flex items-center gap-3 text-xs md:text-[10px] md:text-sm md:text-[11px] font-medium uppercase tracking-[0.2em] transition-all bg-transparent hover:bg-white/10 px-6 py-3 rounded-full"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> VOLTAR
        </button>
        <div className="font-light tracking-[0.4em] text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase pointer-events-auto">
          SOBRE NÓS
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center pb-24 px-6 md:px-12 border-b border-[#050505]/5 overflow-hidden pt-32 pointer-events-none">
        <motion.div style={{ y: yHero }} className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <div className="mb-12 flex items-center justify-center gap-4">
              <div className="w-1.5 h-1.5 bg-[#050505] rounded-full"></div>
              <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-medium text-[#050505]/50">Do Brasil para o Mundo</span>
              <div className="w-1.5 h-1.5 bg-[#050505] rounded-full"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-medium tracking-tighter uppercase leading-[0.8] mb-12 text-[#050505]">
              Nossa <br />
              <span className="font-light text-zinc-400">História.</span>
            </h1>

            <div className="pointer-events-auto">
              <p className="text-xl md:text-3xl font-light text-zinc-500 max-w-4xl mx-auto leading-relaxed">
                A Winf™ não nasceu de uma teoria. Ela é o resultado de 30 anos de experiência no mercado de alta performance. Unimos décadas de know-how com uma visão inovadora para criar um negócio que não apenas atende, mas define o futuro do nosso setor.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-b border-[#050505]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#050505]/40 mb-6">A EXCELÊNCIA COMO META</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-[#050505] leading-[0.9]">Nossa<br/><span className="font-light text-zinc-400">Visão.</span></h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed">
                Ser a marca global sinônimo de inteligência, proteção e valorização de superfícies, liderando a inovação em conforto e eficiência para um mundo em constante evolução.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <div className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#050505]/40 mb-6">A RAZÃO DE EXISTIR</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-[#050505] leading-[0.9]">Nossa<br/><span className="font-light text-zinc-400">Missão.</span></h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed">
                Oferecer soluções tecnológicas de ponta através de um ecossistema de parceiros de elite, proporcionando uma experiência impecável que transforma a maneira como as pessoas interagem com seus ambientes e bens mais valiosos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DNA Winf / Pillars */}
      <section className="py-24 bg-[#FAFAFA] border-b border-[#050505]/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <div className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#050505]/40 mb-4">O DNA WINF™</div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#050505] leading-[0.9]">
                Nossos<br/><span className="font-light text-zinc-400">Pilares.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Diamond, title: "Excelência Obsessiva", desc: "Não nos contentamos com o 'bom'. Buscamos a perfeição em cada produto, em cada aplicação e em cada interação..." },
              { icon: Zap, title: "Tecnologia Invisível", desc: "Acreditamos que a melhor tecnologia é aquela que se sente, mas não se vê. Soluções elegantes." },
              { icon: Target, title: "Design como Filosofia", desc: "A estética não é um detalhe, é parte da solução. Valorizamos a beleza e a harmonia visual." },
              { icon: Users, title: "Parceria de Elite", desc: "Selecionamos e capacitamos os melhores profissionais do mercado, criando uma rede de especialistas." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white/60 backdrop-blur-sm p-6 md:p-10 border border-[#050505]/5 hover:border-[#050505]/20 hover:bg-white transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#050505]/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <item.icon size={26} className="text-[#050505]/20 mb-8 group-hover:text-[#050505] transition-colors duration-700" />
                <h3 className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-[#050505]">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
                <div className="mt-8 w-8 h-px bg-[#050505]/10 group-hover:w-16 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-[#050505]/5 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium bg-white/50 backdrop-blur-md relative z-10">
        <span>© 2026 WINF INTERNATIONAL</span>
        <div className="flex items-center gap-8 mt-6 md:mt-0">
          <a href="https://www.instagram.com/winfpartners/" target="_blank" rel="noopener noreferrer" className="hover:text-[#050505] transition-colors flex items-center gap-3">
            INSTAGRAM
          </a>
          <span className="flex items-center gap-2 text-[#050505]/60">
            <div className="w-1.5 h-1.5 bg-green-500/80 rounded-full" /> 
            SISTEMA OPERACIONAL
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

