import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import { ArrowLeft, ArrowRight, Shield, Globe, Leaf, Users, ShieldCheck, Cpu } from 'lucide-react';
import { WINF_CONSTANTS } from '../constants';

// ==========================================
// KOENIGSEGG INSPIRED INTRO
// ==========================================
const IntroExperience = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="flex flex-col items-center relative z-10"
      >
        <span className="text-xs md:text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-medium text-white/50 mb-6 block">Design Acima De Tudo</span>
        <h1 className="text-4xl md:text-6xl font-heading font-light tracking-[0.3em] uppercase text-white">
          WINF<span className="font-bold">™</span>
        </h1>
        <motion.div 
          className="w-px h-12 bg-white/30 mt-8"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 48, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
interface InstitutionalSiteProps {
  territory?: string;
  onBack?: () => void;
  onNavigateToAccess?: (view?: string) => void;
  onNavigateToCatalog?: () => void;
  onNavigateShowroom?: () => void;
  onSelectProduct?: (id: string) => void;
}

const InstitutionalSite: React.FC<InstitutionalSiteProps> = ({ 
  onBack, 
  onNavigateToAccess,
  onNavigateToCatalog,
  onNavigateShowroom,
}) => {
  const [introDone, setIntroDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.2], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Init Lenis Soft Scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.5,
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
    <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      {!introDone && <IntroExperience onComplete={() => setIntroDone(true)} />}

      {/* Clean Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -10 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 w-full z-50 p-6 md:p-8 flex items-center justify-between mix-blend-difference text-white"
      >
        <div className="flex items-center gap-6">
          {onBack && (
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 text-xs md:text-[10px] font-medium uppercase tracking-[0.2em] transition-all bg-transparent hover:bg-white/10 px-6 py-3 rounded-full border border-transparent hover:border-white/20"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK
            </button>
          )}
        </div>
        <div className="font-light tracking-[0.4em] text-[12px] uppercase">
          WINF<span className="font-bold">™</span>
        </div>
      </motion.nav>

      <div className="relative z-10 w-full">
             {/* ================= HERO SECTION ================= */}
        <section className="relative h-screen flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden">
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }} 
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
              alt="High-End Architecture" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          <motion.div 
            className="relative z-20 max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 30 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            <span className="text-xs md:text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-medium text-white/70 mb-6 block">
              Conforto Em Estado Da Arte
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-heading font-bold tracking-tighter uppercase leading-[0.85] text-white">
              EXCELÊNCIA<br />
              <span className="text-white/60">SOBRE A LUZ.</span>
            </h1>
          </motion.div>
        </section>

        {/* ================= IN-HOUSE INNOVATIONS ================= */}
        <section className="relative min-h-screen flex items-center bg-zinc-950 py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-6xl font-heading font-light uppercase tracking-tighter text-white">
                A CIÊNCIA <span className="font-bold">DO CONFORTO</span>
              </h2>
              <div className="w-24 h-1 bg-white/20 mt-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[
                { title: "Estética Inviolável", desc: "A identidade do seu projeto é intocável. Nossa tecnologia domina a energia solar sem escurecer ou alterar a fachada original. A performance absoluta existe sem se fazer notar.", icon: Globe },
                { title: "Eficiência Térmica Suprema", desc: "Prevenir o calor na origem é a verdadeira sofisticação. Repelimos a infravermelha diretamente no vidro, reduzindo drasticamente a carga térmica com engenharia de precisão.", icon: Shield },
                { title: "Proteção do Patrimônio", desc: "A luz natural não deve ser sinônimo de desgaste. Filtramos 99,9% da radiação ultravioleta, preservando móveis, arte e o legado impecável que você idealizou.", icon: Cpu }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className="group"
                >
                  <item.icon size={32} className="text-white/30 mb-8 group-hover:text-white transition-colors duration-500" />
                  <h3 className="text-xl font-heading font-bold uppercase tracking-widest text-white mb-4">{item.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SOBRE A ARQUITETURA ================= */}
        <section className="relative h-[120vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 opacity-80" />
            <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
              alt="Supremacia Arquitetônica" 
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck size={20} className="text-white" />
                <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-bold text-white">O Padrão Oculto do Conforto</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter text-white mb-10 leading-[0.9]">
                ASSUMA O CONTROLE <span className="font-light text-white/60">DO SEU AMBIENTE.</span>
              </h2>
              <div className="space-y-6 text-zinc-300 font-light text-lg md:text-xl leading-relaxed">
                <p>
                  Se o vidro expõe a grandiosidade da sua obra, por que permitir que ele comprometa o conforto interior? Grandes fachadas envidraçadas não precisam mais disputar espaço com o excesso de calor.
                </p>
                <p>
                  Nós entregamos a aliança perfeita entre luxo e bem-estar. Uma trama tecnológica de alta performance que isola o ambiente sem prejudicar a percepção visual. A WINF neutraliza o desconforto térmico, garantindo que o design original seja contemplado exatamente como foi concebido.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SUSTENTABILIDADE & RESPONSABILIDADE ================= */}
        <section className="relative py-32 px-6 md:px-12 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Sustentabilidade */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="flex flex-col group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white transition-colors duration-500">
                <Leaf className="text-white group-hover:text-black transition-colors duration-500" size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white mb-8">
                Sustentabilidade Inteligente.
              </h2>
              <div className="h-px w-full bg-white/10 mb-8" />
              <p className="text-zinc-400 font-light leading-relaxed text-lg mb-6">
                Obras icônicas são pensadas para o futuro. A verdadeira responsabilidade ambiental começa pela redução drástica do consumo. Ao neutralizar o calor radiante, eliminamos a urgência por refrigeração excessiva.
              </p>
              <ul className="space-y-4 text-zinc-500 text-sm tracking-wide">
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full"></div> Redução sensível da pegada de carbono.</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full"></div> Inteligência financeira através do balanço energético.</li>
              </ul>
            </motion.div>

            {/* Responsabilidade Social */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex flex-col group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white transition-colors duration-500">
                <Users className="text-white group-hover:text-black transition-colors duration-500" size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white mb-8">
                Excelência na Execução.
              </h2>
              <div className="h-px w-full bg-white/10 mb-8" />
              <p className="text-zinc-400 font-light leading-relaxed text-lg mb-6">
                A tecnologia mais avançada do mundo exige uma chancela à altura. Contamos com um grupo seleto de especialistas que aplicam nossas soluções com precisão e padrão internacional de qualidade.
              </p>
              <ul className="space-y-4 text-zinc-500 text-sm tracking-wide">
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full"></div> Acabamento impecável em todos os detalhes.</li>
                <li className="flex items-center gap-3"><div className="w-1 h-1 bg-white rounded-full"></div> Intervenção silenciosa, valorizando a harmonia do espaço.</li>
              </ul>
            </motion.div>

          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative py-48 px-6 bg-black flex flex-col items-center justify-center text-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 3 }}
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,1) 70%)`,
            }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-12 leading-[0.9] text-white">
              VIVA A EXPERIÊNCIA<br/>
              <span className="font-light text-white/50">WINF.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <button 
                onClick={onNavigateToCatalog}
                className="group relative overflow-hidden flex items-center justify-center gap-4 bg-white text-black px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs md:text-[10px] hover:bg-zinc-200 transition-all duration-500"
              >
                Catálogo de Soluções <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              {onNavigateShowroom && (
                <button 
                  onClick={onNavigateShowroom}
                  className="group flex items-center justify-center gap-4 bg-transparent text-white border border-white/30 px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs md:text-[10px] hover:bg-white hover:text-black transition-all duration-500"
                >
                  Projetos de Elite
                </button>
              )}
            </div>
          </motion.div>
        </section>
        
        {/* Minimal Footer */}
        <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-white/10 text-xs md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold bg-black">
          <span>© {new Date().getFullYear()} WINF INTERNATIONAL</span>
          <div className="flex items-center gap-8 mt-6 md:mt-0">
            <a href="https://www.instagram.com/winfpartners/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
              INSTAGRAM
            </a>
            <span className="hover:text-white transition-colors cursor-pointer">
              LEGAL
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default InstitutionalSite;

