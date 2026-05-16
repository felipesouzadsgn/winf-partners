import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Smartphone, Home, Building2, ChevronRight, ArrowLeft, ArrowRight,
  Eye, View, Mountain, MoveHorizontal, Columns, LayoutGrid, Box, Ruler, Maximize,
  ThermometerSun, Flame, Activity, Zap
} from 'lucide-react';

interface ModuleKioskModeProps {
  onBack: () => void;
}

// Helper: Haptic Feedback
const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (type === 'light') navigator.vibrate(10);
    if (type === 'medium') navigator.vibrate(25);
    if (type === 'heavy') navigator.vibrate([30, 50, 30]);
  }
};

// Animated Number Component
const AnimatedNumber = ({ value, suffix = '' }: { value: number | string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const target = typeof value === 'number' ? value : parseInt(value as string) || 0;
  
  useEffect(() => {
    if (typeof value !== 'number' && isNaN(target)) return;
    
    let start = 0;
    const duration = 1500; 
    const increment = target / (duration / 16); 
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, value]);

  if (typeof value !== 'number' && isNaN(target)) return <>{value}</>;
  return <>{count}{suffix}</>;
};

const ENVIRONMENTS = [
  {
    id: 'ocean-ap',
    name: 'Cobertura Alto Padrão',
    viewBg: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=2400',
    outBg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400'
  },
  {
    id: 'forest-house',
    name: 'Mansão na Floresta',
    viewBg: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=2400', 
    outBg: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=2400'
  },
  {
    id: 'street-house',
    name: 'Residência Urbana',
    viewBg: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2400',
    outBg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2400'
  }
];

const REFLECTIONS = {
  in: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2400',
  out: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2400'
};

const FILMS = [
  { 
    id: 'invisible', name: 'Winf Select™ Invisible', type: 'NanoCeramic', 
    vlt: 70, irr: 86, uvr: 100,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    desc: 'Transparência cristalina e rejeição térmica extrema ativada por nanocerâmica em camadas atômicas.',
    tint: 'rgba(20, 25, 30, 0.08)', reflectionOut: 0.15, reflectionIn: 0.1
  },
  { 
    id: 'dualreflect', name: 'Winf Select™ DualReflect', type: 'DualReflective', 
    vlt: 15, irr: 81, uvr: 99, 
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    desc: 'Controle bioclimático de alto impacto. Reflexão calibrada para privacidade sem comprometer a visibilidade interna.',
    tint: 'rgba(10, 15, 20, 0.60)', reflectionOut: 0.85, reflectionIn: 0.15
  },
  { 
    id: 'blackpro', name: 'Winf Select™ BlackPro', type: 'Carbon', 
    vlt: 5, irr: 73, uvr: 99, 
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    desc: 'Privacidade impenetrável estruturada em NanoCarbono. Absorção de luz máxima com eliminação rigorosa de reflexos.',
    tint: 'rgba(5, 5, 5, 0.85)', reflectionOut: 0.1, reflectionIn: 0.1
  },
  { 
    id: 'safeguard', name: 'Winf Select™ SafeGuard', type: 'Shield-S', 
    vlt: 80, irr: 45, uvr: 99, 
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    desc: 'Armadura balística de tenacidade molecular. Mantém a resiliência do vidro sob pressões críticas sem distorção óptica.',
    tint: 'rgba(0, 0, 0, 0.03)', reflectionOut: 0.1, reflectionIn: 0.1
  },
  { 
    id: 'white', name: 'Winf Select™ White', type: 'Decorative', 
    vlt: 0, irr: '--', uvr: 99, 
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    desc: 'Privacidade absoluta com difusão luminosa. Branco fosco purista que transfigura a luz direta em ambientação suave.',
    tint: 'rgba(255, 255, 255, 0.8)', isFrosted: true, reflectionOut: 0.1, reflectionIn: 0.1
  }
];

const ModuleKioskMode: React.FC<ModuleKioskModeProps> = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [projectType, setProjectType] = useState<'casa' | 'empresa' | null>(null);
  const [glassType, setGlassType] = useState<string | null>(null);
  const [projectSize, setProjectSize] = useState<{ id: string, label: string } | null>(null);
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

  // Simulator States
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'IN' | 'OUT'>('IN');
  const [thermalMode, setThermalMode] = useState(false);
  const [envIndex, setEnvIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetKiosk = () => {
    setStep(0);
    setLead({ name: '', phone: '' });
    setProjectType(null);
    setGlassType(null);
    setProjectSize(null);
    setSelectedFilmId(null);
    setSliderPos(50);
    setThermalMode(false);
  };

  const advanceTo = (s: number) => {
    triggerHaptic('medium');
    setStep(s);
  };

  const handleFinish = () => {
    triggerHaptic('heavy');
    setStep(7);
    setTimeout(() => resetKiosk(), 10000);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleInteract = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(percent, 100));
    setSliderPos(percent);
  };

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (step === 6) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    }
    if (isDragging) handleInteract(e.clientX);
  };

  const handleGlobalTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleInteract(e.touches[0].clientX);
  };

  const selectedFilm = FILMS.find(f => f.id === selectedFilmId);
  const activeEnv = ENVIRONMENTS[envIndex];

  return (
    <div 
      className="fixed inset-0 bg-[#000] z-[500] font-sans text-white overflow-hidden select-none flex flex-col antialiased"
      onMouseMove={handleGlobalMouseMove}
      onTouchMove={handleGlobalTouchMove}
    >
      {/* Global Exit */}
      <button 
        onClick={onBack}
        className="absolute top-6 right-6 z-[600] p-4 opacity-10 hover:opacity-100 transition-opacity pointer-events-auto rounded-none hover:bg-white/10"
      >
        <X size={28} className="text-white" />
      </button>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: ATTRACTOR SCREEN */}
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(20px)' }} transition={{ duration: 1.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center cursor-pointer group"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400)` }}
            onClick={() => advanceTo(1)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#050505]"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-none pointer-events-none transition-opacity duration-1000 group-hover:opacity-50"></div>
            
            <div className="text-center relative z-10 p-6 md:p-12">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                className="text-7xl md:text-9xl font-extralight tracking-[0.1em] mb-4 text-white drop-shadow-2xl"
              >
                WINF<span className="font-medium tracking-normal opacity-90 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">™</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                className="text-sm font-light uppercase tracking-[0.6em] text-white/50 mb-24"
              >
                The Sensory Experience
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="bg-white/5 text-white px-16 py-6 rounded-none border border-white/10 text-xs font-medium uppercase tracking-[0.4em] inline-flex items-center gap-6 backdrop-blur-xl group-hover:bg-white/10 group-hover:border-white/30 transition-all shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                Toque para Iniciar a Configuração <Zap size={18} className="opacity-70 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STEP 1: LEAD CAPTURE */}
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col p-5 md:p-8 md:p-24 max-w-5xl mx-auto w-full justify-center bg-black/40"
          >
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-none pointer-events-none"></div>

            <button onClick={() => advanceTo(0)} className="absolute top-12 left-12 flex items-center gap-4 text-white/40 hover:text-white text-xs font-bold uppercase tracking-[0.3em] transition-colors z-20">
              <ArrowLeft size={16} /> Cancelar
            </button>

            <div className="relative z-10 w-full md:w-2/3">
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-2 leading-tight">Engenharia Exclusiva.</h2>
              <p className="text-xl text-white/40 font-light mb-20 tracking-wide">Como nossos arquitetos devem chamar você?</p>

              <div className="space-y-10 mb-16">
                <div className="relative group">
                  <span className="absolute -top-4 left-0 text-xs md:text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">Identidade</span>
                  <input 
                    type="text" autoComplete="off" placeholder="Nome e Sobrenome" value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-3xl font-light text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-all rounded-none"
                  />
                </div>
                <div className="relative group">
                   <span className="absolute -top-4 left-0 text-xs md:text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">Contato Direto</span>
                   <input 
                    type="tel" autoComplete="off" placeholder="WhatsApp (DDD)" value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-3xl font-light text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-all rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  disabled={lead.name.length < 3 || lead.phone.length < 9}
                  onClick={() => advanceTo(2)} 
                  className="w-full bg-white text-black py-6 rounded-none text-sm font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex justify-between items-center px-6 md:px-10 disabled:opacity-20 disabled:bg-white/5 disabled:text-white disabled:cursor-not-allowed"
                >
                  Continuar Experiência <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => { setLead({ name: 'Visitante VIP', phone: '' }); advanceTo(2); }} 
                  className="w-full py-4 text-sm md:text-[11px] text-white/30 font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
                >
                  Explorar de forma anônima
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2 & 3: APPLICATION TYPE & ELEMENT */}
        {(step === 2 || step === 3) && (
          <motion.div 
            key={`step${step}`}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col p-5 md:p-8 md:p-24 w-full h-full justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#0a0a0a] to-[#111]"></div>
            
            <button onClick={() => advanceTo(step - 1)} className="absolute top-12 left-12 flex items-center gap-4 text-white/40 hover:text-white text-xs font-bold uppercase tracking-[0.3em] transition-all z-20">
              <ArrowLeft size={16} /> Voltar
            </button>

            <div className="relative z-10 mb-16 text-center max-w-4xl mx-auto">
              <div className="text-xs md:text-[10px] text-blue-400 font-bold uppercase tracking-[0.4em] mb-4">Mapeamento de Projeto</div>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4">
                {step === 2 ? `Para onde é o projeto, ${lead.name.split(' ')[0]}?` : 'Foco principal da aplicação:'}
              </h2>
            </div>

            {step === 2 ? (
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
                <button onClick={() => { setProjectType('casa'); advanceTo(3); }} className="group relative overflow-hidden border border-white/10 hover:border-white transition-all flex flex-col items-center justify-center p-16 bg-black">
                   <Home size={40} strokeWidth={1} className="text-white/30 mb-8 group-hover:text-white transition-colors group-hover:scale-110 duration-500" />
                   <h3 className="text-2xl font-light uppercase tracking-[0.2em] text-white">Residencial</h3>
                </button>
                <button onClick={() => { setProjectType('empresa'); advanceTo(3); }} className="group relative overflow-hidden border border-white/10 hover:border-white transition-all flex flex-col items-center justify-center p-16 bg-black">
                   <Building2 size={40} strokeWidth={1} className="text-white/30 mb-8 group-hover:text-white transition-colors group-hover:scale-110 duration-500" />
                   <h3 className="text-2xl font-light uppercase tracking-[0.2em] text-white">Corporativo</h3>
                </button>
              </div>
            ) : (
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
                {[
                  { id: 'Varanda Premium', icon: Columns },
                  { id: 'Janelas Residenciais', icon: LayoutGrid },
                  { id: 'Portas em Vidro', icon: Box },
                  { id: 'Fachada', icon: Building2 },
                ].map(glass => (
                  <button key={glass.id} onClick={() => { setGlassType(glass.id); advanceTo(4); }} className="group relative border border-white/5 hover:border-white transition-all flex flex-col items-center justify-center py-20 px-4 bg-black">
                    <glass.icon size={36} strokeWidth={1} className="text-white/30 mb-6 group-hover:text-white transition-all group-hover:-translate-y-2" />
                    <h3 className="text-sm font-light uppercase tracking-[0.1em] text-white/80 group-hover:text-white">{glass.id}</h3>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 4: SCALE */}
        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col p-6 md:p-12 max-w-7xl mx-auto w-full justify-center"
          >
            <button onClick={() => advanceTo(3)} className="absolute top-12 left-12 flex items-center gap-4 text-white/40 hover:text-white text-xs font-bold uppercase tracking-[0.3em] transition-all z-20">
              <ArrowLeft size={16} /> Voltar
            </button>

            <div className="text-center mb-16">
              <div className="text-xs md:text-[10px] text-blue-400 font-bold uppercase tracking-[0.4em] mb-4">Dimensão Geométrica</div>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4">Qual é a escala do projeto?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'S', label: 'Essencial', size: 'Até 10m²', desc: 'Acabamentos pontuais' },
                { id: 'M', label: 'Elegance', size: '10m² - 30m²', desc: 'Sacadas completas' },
                { id: 'L', label: 'Prestige', size: '30m² - 60m²', desc: 'Múltiplos ambientes' },
                { id: 'XL', label: 'Master', size: '+60m²', desc: 'Projetos Arquitetônicos' }
              ].map(sz => (
                <button
                  key={sz.id}
                  onClick={() => { setProjectSize({ id: sz.id, label: sz.label }); advanceTo(5); }}
                  className="group flex flex-col items-center justify-center p-6 md:p-12 bg-[#050505] border border-white/5 hover:border-white transition-all text-center hover:bg-[#0A0A0A] hover:-translate-y-2 duration-500"
                >
                  <div className="text-5xl font-extralight text-white/20 group-hover:text-white transition-colors mb-4 font-mono">{sz.id}</div>
                  <h3 className="text-xl font-medium tracking-widest uppercase text-white mb-1">{sz.label}</h3>
                  <div className="text-sm text-blue-400 font-bold tracking-[0.2em] mb-4">{sz.size}</div>
                  <div className="w-8 h-[1px] bg-white/20 mb-4 group-hover:w-16 group-hover:bg-blue-500 transition-all"></div>
                  <p className="text-xs md:text-[10px] uppercase tracking-[0.1em] text-white/40">{sz.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => { setProjectSize({ id: 'ukn', label: 'Indefinido' }); advanceTo(5); }}
                className="text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
              >
                Pular esta etapa / Não tenho certeza
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: CATALOG - Apple-style Carousel */}
        {step === 5 && (
           <motion.div 
            key="step5"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col pt-24 pb-12 bg-[#000]"
          >
            <div className="absolute top-12 left-12 right-12 flex justify-between items-center z-20">
               <button onClick={() => advanceTo(4)} className="flex items-center gap-4 text-white/40 hover:text-white text-xs font-bold uppercase tracking-[0.3em] transition-all">
                <ArrowLeft size={16} /> Voltar
               </button>
               <div className="text-right">
                  <h2 className="text-xl font-light uppercase tracking-[0.3em] text-white">Select™ Collection</h2>
                  <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-blue-400 font-bold uppercase tracking-[0.4em] mt-1">Selecione e inicie a Simulação</p>
               </div>
            </div>

            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center snap-x snap-mandatory px-[10vw] gap-[5vw]">
              {FILMS.map(film => {
                const isSelected = selectedFilmId === film.id;
                return (
                  <div 
                    key={film.id}
                    onClick={() => {
                      if (isSelected) advanceTo(6);
                      else { setSelectedFilmId(film.id); triggerHaptic('light'); }
                    }}
                    className={`relative min-w-[320px] md:min-w-[400px] h-[65vh] snap-center cursor-pointer transition-all duration-700 transform flex flex-col justify-end p-6 md:p-10 overflow-hidden rounded-none ${isSelected ? 'scale-105 z-20 shadow-[0_40px_100px_rgba(255,255,255,0.05)] ring-1 ring-white/50' : 'scale-90 opacity-40 hover:opacity-80 z-10'}`}
                  >
                    <div className="absolute inset-0 bg-black">
                      <img src={film.img} alt={film.name} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-end">
                      <div className="mb-auto font-mono text-xs md:text-[10px] text-white/30 uppercase tracking-widest">{film.id.toUpperCase()}</div>
                      
                      <div className="transform transition-transform duration-500">
                        <p className="text-xs md:text-[10px] text-blue-400 font-bold uppercase tracking-[0.4em] mb-2">{film.type}</p>
                        <h3 className="text-3xl font-extralight text-white tracking-tight mb-4">{film.name.replace('Winf Select™ ', '')}</h3>
                        <p className="text-xs text-white/50 font-light leading-relaxed mb-8 pr-4">{film.desc}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
                           <div className="flex flex-col border-l border-white/10 pl-3">
                             <span className="text-[10px] md:text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Visão (VLT)</span>
                             <span className="text-lg text-white font-medium">{film.vlt}%</span>
                           </div>
                           <div className="flex flex-col border-l border-white/10 pl-3">
                             <span className="text-[10px] md:text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Calor (IRR)</span>
                             <span className="text-lg text-white font-medium">{film.irr}{film.irr !== '--' ? '%' : ''}</span>
                           </div>
                           <div className="flex flex-col border-l border-white/10 pl-3">
                             <span className="text-[10px] md:text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Raios (UVR)</span>
                             <span className="text-lg text-white font-medium">{film.uvr}%</span>
                           </div>
                        </div>

                        <div className={`w-full py-4 text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-center rounded-none transition-all duration-500 border ${isSelected ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-transparent border-white/20 text-white/60'}`}>
                          {isSelected ? 'Lançar Simulador Sensorial' : 'Inspecionar Variante'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 6: SENSORY SIMULATOR */}
        {step === 6 && selectedFilm && activeEnv && (
          <motion.div 
            key="step6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute inset-0 z-50 bg-black cursor-ew-resize overflow-hidden"
            ref={containerRef}
            onMouseDown={(e) => { setIsDragging(true); handleInteract(e.clientX); triggerHaptic('light'); }}
            onTouchStart={(e) => { setIsDragging(true); handleInteract(e.touches[0].clientX); triggerHaptic('light'); }}
          >
            {/* Core Immersive Environment (The View) */}
            <div 
              className="absolute inset-[-10%] transition-transform duration-100 ease-out z-0"
              style={{ transform: `scale(1.05) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
            >
              {/* Layer 0: Raw Background (Right side) */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                  style={{ backgroundImage: `url(${viewMode === 'IN' ? activeEnv.viewBg : activeEnv.outBg})` }}
                >
                  {/* THERMAL OVERLAY VULNERABLE SIDE (HOT) */}
                  {thermalMode && (
                    <div className="absolute inset-0 mix-blend-color animate-pulse pointer-events-none transition-opacity duration-1000" style={{ backdropFilter: 'saturate(200%) hue-rotate(330deg)', backgroundColor: 'rgba(255, 50, 0, 0.4)' }}></div>
                  )}

                  {/* Sun Glare rays */}
                  {viewMode === 'IN' && !thermalMode && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent opacity-60 mix-blend-screen pointer-events-none"></div>
                  )}
                </div>
              </div>

              {/* Layer 1: Protected View (Left side - Winf Film Applied) */}
              <div 
                className="absolute inset-0 overflow-hidden shadow-[inset_0_0_200px_rgba(0,0,0,0.5)] z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                  style={{ backgroundImage: `url(${viewMode === 'IN' ? activeEnv.viewBg : activeEnv.outBg})` }}
                >
                   {/* THERMAL OVERLAY PROTECTED SIDE (COOL) */}
                   {thermalMode && (
                    <div className="absolute inset-0 mix-blend-color pointer-events-none transition-opacity duration-1000" style={{ backdropFilter: 'saturate(150%) hue-rotate(180deg)', backgroundColor: 'rgba(0, 100, 255, 0.4)' }}></div>
                  )}

                  {!thermalMode && (
                    <>
                      {selectedFilm.isFrosted && <div className="absolute inset-0 backdrop-blur-2xl bg-white/20"></div>}
                      <div className="absolute inset-0 transition-colors duration-1000" style={{ backgroundColor: selectedFilm.tint }}></div>
                      <div 
                        className="absolute inset-0 bg-cover bg-center mix-blend-screen transition-opacity duration-1000"
                        style={{ 
                          backgroundImage: `url(${viewMode === 'IN' ? REFLECTIONS.in : REFLECTIONS.out})`,
                          opacity: viewMode === 'OUT' ? selectedFilm.reflectionOut : selectedFilm.reflectionIn
                        }}
                      ></div>
                    </>
                  )}
                </div>
                {/* Edge line */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-r from-transparent to-white/30" style={{ right: 0 }}></div>
              </div>
            </div>

            {/* FOREGROUND: Luxury 3D Room Overlay (Only shows in 'IN' mode) */}
            {viewMode === 'IN' && (
              <div className="absolute inset-0 pointer-events-none z-10">
                 <div className="absolute top-0 w-full h-[15%] bg-gradient-to-b from-[#11100f] to-[#1a1918] shadow-[0_30px_60px_rgba(0,0,0,0.9)]"></div>
                 
                 <div className="absolute bottom-0 w-full h-[25%] bg-gradient-to-t from-[#0a0a0a] to-[#222120] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t-[8px] border-[#050505] flex items-end justify-center px-12 md:px-32 pb-0">
                    <div className="w-[800px] h-32 md:h-48 bg-[#1a1816] rounded-none-3xl shadow-[0_-15px_50px_rgba(0,0,0,0.9)] opacity-95 border-t border-white/5 relative flex justify-center">
                       <div className="absolute -top-6 w-[200px] h-6 bg-[#2a2826] rounded-none-md opacity-80 border-t border-white/10 hidden md:block"></div>
                    </div>
                 </div>
                 
                 <div className="absolute left-0 h-full w-[15%] bg-gradient-to-r from-[#11100f] to-[#1a1918] shadow-[30px_0_60px_rgba(0,0,0,0.9)] border-r-[16px] border-[#050505]"></div>
                 <div className="absolute right-0 h-full w-[15%] bg-gradient-to-l from-[#11100f] to-[#1a1918] shadow-[-30px_0_60px_rgba(0,0,0,0.9)] border-l-[16px] border-[#050505]"></div>
                 
                 <div className="absolute top-[15%] bottom-[25%] left-[15%] right-[15%] flex border-[12px] border-[#0a0a0a] shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]">
                   <div className="flex-1 border-r-[12px] border-[#0a0a0a] shadow-[10px_0_20px_rgba(0,0,0,0.6)]"></div>
                   <div className="flex-1 border-r-[12px] border-[#0a0a0a] shadow-[10px_0_20px_rgba(0,0,0,0.6)]"></div>
                   <div className="flex-1"></div>
                 </div>
              </div>
            )}

            {/* SLIDER HANDLE */}
            <div 
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none transition-all duration-75"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="h-full w-[2px] bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-28 bg-black/60 backdrop-blur-2xl border border-white/50 rounded-none flex items-center justify-center pointer-events-auto shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-grab hover:scale-110 active:scale-95 transition-transform flex-col gap-2">
                  <div className="w-1 h-2 bg-white/30 rounded-none"></div>
                  <MoveHorizontal size={20} className={thermalMode ? "text-red-400" : "text-white"} />
                  <div className="w-1 h-2 bg-white/30 rounded-none"></div>
                </div>
              </div>
            </div>

            {/* HIGH-TECH HUD OVERLAYS */}
            <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-6 md:p-12">
              
              {/* TOP HUD: Film Data */}
              <div className="flex justify-between items-start pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-3xl border border-white/10 p-6 rounded-none flex flex-col w-80 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
                   <p className="text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-1">{selectedFilm.type}</p>
                   <h3 className="text-2xl font-light text-white mb-4">{selectedFilm.name.replace('Winf Select™ ', '')}</h3>
                   
                   <div className="flex justify-between pt-4 border-t border-white/10">
                     <div className="flex flex-col text-center">
                       <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] mb-1">LUZ (VLT)</span>
                       <span className="text-xl text-white font-medium"><AnimatedNumber value={selectedFilm.vlt} suffix="%" /></span>
                     </div>
                     <div className="flex flex-col text-center">
                       <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] mb-1">CALOR (IRR)</span>
                       <span className={`text-xl font-medium transition-colors ${thermalMode ? 'text-red-400' : 'text-white'}`}>
                          <AnimatedNumber value={selectedFilm.irr} suffix={selectedFilm.irr !== '--' ? '%' : ''} />
                       </span>
                     </div>
                     <div className="flex flex-col text-center">
                       <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] mb-1">RAIOS (UVR)</span>
                       <span className="text-xl text-purple-400 font-medium"><AnimatedNumber value={selectedFilm.uvr} suffix="%" /></span>
                     </div>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => advanceTo(5)} className="bg-black/60 shadow-xl backdrop-blur-3xl border border-white/10 p-4 rounded-none hover:bg-white/10 transition-colors hidden md:block">
                    <ArrowLeft size={20} className="text-white/60" />
                  </button>
                  <button onClick={handleFinish} className="bg-white text-black px-6 md:px-10 py-5 rounded-none text-xs md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    Gerar Proposta
                  </button>
                </div>
              </div>

              {/* BOTTOM HUD: Thermal Vision & Views */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-auto">
                 
                 {/* Thermal Mode Toggle */}
                 <button 
                   onClick={() => { triggerHaptic('medium'); setThermalMode(!thermalMode); }}
                   className={`relative flex items-center gap-4 px-6 py-4 rounded-none border transition-all duration-500 overflow-hidden ${thermalMode ? 'bg-black/90 border-red-500/50 shadow-[0_0_40px_rgba(255,0,0,0.3)]' : 'bg-black/60 backdrop-blur-3xl border-white/10 hover:bg-white/10'}`}
                 >
                   {thermalMode && <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-500 animate-[pulse_2s_ease-in-out_infinite]"></div>}
                   
                   <div className={`p-2 rounded-none ${thermalMode ? 'bg-gradient-to-br from-red-500 to-orange-600' : 'bg-white/5'}`}>
                     {thermalMode ? <Flame size={18} className="text-white" /> : <ThermometerSun size={18} className="text-white/50" />}
                   </div>
                   <div className="text-left">
                     <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">Análise Térmica</div>
                     <div className={`text-sm font-medium tracking-wide ${thermalMode ? 'text-red-400' : 'text-white'}`}>
                       {thermalMode ? 'Modo Visão Térmica' : 'Espectro Visível'}
                     </div>
                   </div>
                 </button>

                 <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.5em] font-bold text-white/40 bg-black/60 backdrop-blur-md px-6 py-3 rounded-none hidden lg:block border border-white/5 shadow-2xl animate-pulse">
                   &larr; <span className="mx-2">Deslize para Comparar Proteção Térmica</span> &rarr;
                 </div>

                 <div className="flex gap-2">
                   <div className="flex bg-black/80 backdrop-blur-3xl border border-white/10 rounded-none p-1 shadow-2xl">
                     <button 
                       onClick={() => { setViewMode('IN'); triggerHaptic(); }} 
                       className={`px-5 py-3 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 ${viewMode === 'IN' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                     >
                       <Eye size={14} /> Interior
                     </button>
                     <button 
                       onClick={() => { setViewMode('OUT'); triggerHaptic(); }} 
                       className={`px-5 py-3 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 ${viewMode === 'OUT' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                     >
                       <View size={14} /> Exterior
                     </button>
                   </div>
                   
                   <button 
                     onClick={() => { setEnvIndex((envIndex + 1) % ENVIRONMENTS.length); triggerHaptic(); }} 
                     className="px-6 py-3 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-none text-xs md:text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/10 transition-all flex items-center shadow-2xl"
                   >
                     <Mountain size={14} className="mr-2 text-blue-400" /> {activeEnv.name} <ArrowRight size={10} className="ml-2 opacity-50" />
                   </button>
                 </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* STEP 7: SUCCESS */}
        {step === 7 && (
          <motion.div 
            key="step7"
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 bg-[#000] z-[600]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#000]"></div>

            <div className="w-px h-32 bg-gradient-to-b from-transparent to-white/20 mb-16 relative z-10"></div>
            
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight text-center relative z-10 w-full max-w-4xl">
              Análise Concluída, <br/><span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{lead.name !== 'Visitante VIP' && lead.name !== 'Visitante' ? lead.name.split(' ')[0] : 'Visitante'}.</span>
            </h2>
            
            <div className="text-lg text-white/40 max-w-2xl text-center leading-relaxed font-light mb-20 tracking-wide relative z-10">
              {lead.name !== 'Visitante VIP' && lead.name !== 'Visitante' ? (
                <>
                  <p className="mb-4">
                    Dimensionamento <strong className="text-white font-medium uppercase tracking-widest">{projectType === 'casa' ? 'Residencial' : 'Corporativo'}</strong> estruturado.
                  </p>
                  <p>
                    Nossa engenharia processará a solução de <strong>{selectedFilm?.name}</strong> para <strong className="text-white font-medium">{glassType}</strong>. Os dados foram enviados ao seu consultor Winf.
                  </p>
                </>
              ) : (
                <p>O simulador entrou em modo de suspensão. Para calibrar uma blindagem térmica real, acione nossa arquitetura.</p>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-blue-400 uppercase tracking-[0.4em] relative z-10 border border-blue-500/20 bg-blue-500/5 px-6 py-3 rounded-none">
              <Activity size={16} className="animate-pulse" />
              Sistema Encerrando
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ModuleKioskMode;
