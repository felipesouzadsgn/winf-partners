import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Thermometer, 
  ArrowRight, 
  CheckCircle, 
  ChevronLeft,
  Layers,
  PlayCircle,
  Download,
  Globe2,
  MessageCircle,
  Bot,
  X,
  Send,
  Share2,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINF_CONSTANTS } from '../constants';
import FilmVisualizer from './FilmVisualizer';
import SimulatorTechnicalCharts from './SimulatorTechnicalCharts';
import { GoogleGenAI } from "@google/genai";
import Lenis from 'lenis';

import { getApiKey } from '../lib/gemini';

interface PublicConsultancyProps {
  partnerName?: string;
  partnerPhone?: string;
  onBack?: () => void;
  onAccessSystem?: () => void;
}

const LUXURY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
];

const PublicConsultancy: React.FC<PublicConsultancyProps> = ({ 
  partnerName = "WINF™ Oficial", 
  partnerPhone = "5513999191510",
  onBack
}) => {
  const [sunIntensity, setSunIntensity] = useState(85);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Olá. Sou o Neuromesh AI™, assistente virtual da WINF™. Como posso ajudar no seu projeto hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filmId] = useState('select-pro');
  const [area] = useState(50);

  const externalTemp = Math.round(25 + (sunIntensity * 0.15));
  const commonTemp = Math.round(20 + (sunIntensity * 0.21));
  const winfTemp = Math.round(20 + (sunIntensity * 0.035));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: getApiKey() });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Você é o Neuromesh AI, assistente virtual da WINF (marca de películas de alta performance). Responda de forma curta, técnica e premium. O usuário perguntou: ${userMsg}`
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Processamento concluído.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sistemas ocupados. Por favor, contate um especialista humano.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LUXURY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(`Olá! Estou visualizando a consultoria digital da WINF™ e gostaria de mais informações.`);
    window.open(`https://wa.me/${partnerPhone}?text=${msg}`, '_blank');
  };

  const FilmCard = ({ item }: any) => {
    const assetUrl = (WINF_CONSTANTS as any).assets?.[item.id] || `https://picsum.photos/seed/${item.id}/800/600`;

    return (
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden group hover:border-white/20 transition-all duration-700 flex flex-col h-full relative shadow-sm hover:shadow-xl"
      >
        <div className="relative h-48 md:h-72 overflow-hidden">
          <img 
            src={assetUrl} 
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/90 drop-shadow-md">WINF™ SELECT SERIES</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none uppercase group-hover:text-white transition-colors duration-500 drop-shadow-lg">
              {item.name}
            </h3>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col bg-[#050505]">
          <p className="text-zinc-400 text-sm leading-relaxed font-light mb-8">{item.desc}</p>
          
          <div className="space-y-4 mb-10">
            {item.specs.map((spec: string, idx: number) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 group/spec">
                <span className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover/spec:text-zinc-300 transition-colors">Spec {idx + 1}</span>
                <span className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-200">{spec}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={sendToWhatsApp}
            className="w-full py-4 bg-[#111] border border-white/10 text-white rounded-none text-xs md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 mt-auto flex items-center justify-center gap-3 active:scale-95"
          >
             Solicitar Orçamento <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    );
  };

  const customerLines = WINF_CONSTANTS.portfolio.lines.filter(
    line => line.id === 'select' || line.id === 'select-white'
  );
  
  const [activeLine, setActiveLine] = useState(customerLines[0]?.id);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans selection:bg-white/10 overflow-x-hidden relative">
      
      {/* Dark Theme Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full z-[80] border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl h-20 flex items-center transition-all duration-500 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-none">
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-white">
                <span className="font-black tracking-tighter text-xl uppercase">WINF™</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-[10px] md:text-[8px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Consultor WINF™</span>
              <span className="text-xs md:text-[10px] font-black text-white uppercase tracking-widest">{partnerName}</span>
            </div>
            <button onClick={sendToWhatsApp} className="bg-white text-black px-6 py-2.5 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-md">
              Falar com Especialista
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#030303] min-h-[85vh] flex flex-col justify-center border-b border-white/5">
        <div className="max-w-[1500px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-8 bg-white/20"></div>
              <span className="text-zinc-400 text-xs md:text-[10px] font-black uppercase tracking-[0.3em]">
                Alta tecnologia em proteção solar
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white">
                A CIÊNCIA DA <br/>
                <span className="text-zinc-500">PROTEÇÃO <br/> TÉRMICA.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
                Controle térmico absoluto e proteção UV para quem não faz concessões. Proteja sua família, seus móveis e sua vista com a engenharia molecular invisível WINF™.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={sendToWhatsApp} className="flex-1 sm:flex-none uppercase tracking-[0.3em] text-xs md:text-[10px] font-black bg-white text-black px-8 py-5 hover:bg-zinc-200 transition-all shadow-xl">
                  Iniciar Projeto
                </button>
                <button onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 sm:flex-none uppercase tracking-[0.3em] text-xs md:text-[10px] font-black bg-[#111] border border-white/10 text-white px-8 py-5 hover:bg-white/5 transition-all">
                  Testar Simulador
                </button>
              </div>
            </motion.div>
          </div>

          {/* Luxury Imagery / Hero Abstract */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden shadow-2xl bg-[#0a0a0a]"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale-[0.5] opacity-80"
                alt="Modern Interior"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-[#0a0a0a]/80 backdrop-blur p-6 shadow-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield size={16} className="text-white" />
                    <span className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white">WINF OS™ Active</span>
                  </div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">100% Bloqueio UV</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Benefits Section */}
      <section className="py-24 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">
              A luz não precisa aquecer. <br/><span className="text-zinc-500">O sol não deve ofuscar.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto">
              Acreditamos que você deve aproveitar a vista e a luz natural na sua casa, sem sofrer com o calor radiante e o desconforto visual.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Thermometer, title: "Equilíbrio Térmico", desc: "Sua casa impecavelmente fresca, independente de quão forte esteja o sol lá fora. Reduza gastos com ar-condicionado." },
              { icon: Target, title: "Silêncio Visual", desc: "Aproveite a vista da sua sacada sem ofuscamentos. Visão cristalina e relaxante que não atrapalha telas de TV." },
              { icon: Shield, title: "Preservação UV Total", desc: "Bloqueio de 99,9% da radiação UV nociva. Seus móveis, tapetes, pisos e obras de arte a salvo do desbotamento." },
              { icon: Layers, title: "Elegância Minimalista", desc: `"Invisível ao olhar, máximo no conforto." Sua casa mais valorizada e protegida com as películas nanocerâmicas.` }
            ].map((benefit, idx) => (
              <div key={idx} className="p-8 border border-white/5 rounded-none bg-[#0a0a0a] hover:bg-[#111] transition-all group">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-black mb-8 rounded-none">
                  <benefit.icon size={22} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-white">{benefit.title}</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VSL Section - Educational */}
      <section className="py-32 px-6 bg-[#020202] text-white relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-transparent text-white/60 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
            WINF™ MASTERCLASS
          </div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-12">
            A Verdade Sobre <br/><span className="italic text-zinc-500">Proteção Solar</span>
          </h2>
          
          <div className="relative aspect-video rounded-none overflow-hidden bg-black shadow-2xl group cursor-pointer max-w-4xl mx-auto border border-white/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-1000 grayscale-[0.5]"></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-transform">
                <PlayCircle size={32} className="ml-2" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-left">
               <span className="text-xs font-black uppercase tracking-widest bg-white text-black px-3 py-1">Assista ao Vídeo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Problema vs Solução */}
      <section className="py-24 px-6 bg-[#030303] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white mb-6">
              O Momento do Seu Contato
            </h2>
            <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto">
              Compare como é viver sem a proteção térmica da WINF™ e descubra a experiência de um ambiente inteligente e blindado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* O Ordinário */}
            <div className="p-10 md:p-12 border border-white/10 bg-[#0a0a0a] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10"></div>
              <h3 className="text-2xl font-black uppercase text-white mb-8 tracking-tight">Viver no Ordinário</h3>
              <ul className="space-y-6">
                {[
                  "Clima instável e conta de luz altíssima com ar-condicionado operando no máximo.",
                  "Luminosidade ofuscante que atrapalha telas de TV e notebooks, gerando reflexos ruins.",
                  "Móveis, tapetes e pisos de madeira desbotados e danificados pela radiação UV.",
                  "Varanda ou sala impossíveis de usar durante a tarde devido ao calor intenso."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-400 text-sm md:text-base font-light">
                    <X size={18} className="text-red-500 mt-1 shrink-0" /> <span className="leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* A Experiência Winf */}
            <div className="p-10 md:p-12 border border-white/20 bg-[#111] relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
              <h3 className="text-2xl font-black uppercase text-white mb-8 tracking-tight flex items-center gap-3">
                <Shield size={24} className="text-white" />
                A Experiência WINF™
              </h3>
              <ul className="space-y-6">
                {[
                  "Clima perfeitamente agradável em todos os cômodos, permitindo que o ar-condicionado trabalhe no mínimo.",
                  "Luz natural filtrada, suave e perfeita, bloqueando o excesso de brilho sem escurecer o ambiente.",
                  "Preservação absoluta do investimento em sua decoração, barrando 99,9% dos raios nocivos.",
                  "Seu espaço 100% habitável, elegante e termicamente confortável em qualquer horário do dia."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-300 text-sm md:text-base font-light">
                    <CheckCircle size={18} className="text-white mt-1 shrink-0" /> <span className="leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Simulator Section */}
      <section id="simulator" className="py-24 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-[#0a0a0a] text-zinc-400 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
                SIMULADOR TÉRMICO
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white">
                Veja o calor <br/><span className="text-zinc-500 italic">Desaparecer.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
                Arraste o medidor para aumentar a força do sol lá fora. Compare visualmente como a película WINF™ bloqueia o calor radiante enquanto um vidro comum absorve e transfere a temperatura direto para o ambiente.
              </p>

              <div className="bg-[#0a0a0a] border border-white/10 p-5 md:p-8 md:p-10 w-full mb-10 shadow-xl">
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <label className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Temperatura Externa (O Sol)</label>
                    <span className="text-2xl font-mono font-black text-white">{externalTemp}°C</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sunIntensity} 
                    onChange={(e) => setSunIntensity(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-500">
                      <Thermometer size={14} />
                      <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">Vidro Comum</span>
                    </div>
                    <div className="text-3xl font-black tracking-tighter text-white">{commonTemp}°C</div>
                    <div className="w-full h-1 bg-red-950 overflow-hidden">
                      <motion.div animate={{ width: `${(commonTemp / 50) * 100}%` }} className="h-full bg-red-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white">
                      <Shield size={14} />
                      <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">Proteção WINF™</span>
                    </div>
                    <div className="text-3xl font-black tracking-tighter text-white">{winfTemp}°C</div>
                    <div className="w-full h-1 bg-white/10 overflow-hidden">
                      <motion.div animate={{ width: `${(winfTemp / 50) * 100}%` }} className="h-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Glass Demo */}
            <div className="relative aspect-square overflow-hidden border border-white/10 group bg-[#0a0a0a] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale-[0.2]"></div>
              
              {/* Heat Overlay based on slider */}
              <motion.div 
                animate={{ opacity: sunIntensity / 100 * 0.7 }}
                className="absolute inset-0 bg-red-500 mix-blend-color"
              />

              {/* Glass Split */}
              <div className="absolute inset-0 flex border-2 border-white/20 lg:border-transparent">
                <div className="w-1/2 h-full border-r-2 border-white/60 relative">
                  <div className="absolute inset-0 bg-red-500/10"></div>
                  <div className="absolute top-6 left-4 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] text-white/90 drop-shadow-md">SEM PROTEÇÃO</div>
                </div>
                <div className="w-1/2 h-full relative overflow-hidden backdrop-brightness-[0.6] backdrop-contrast-125">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute top-6 right-4 flex flex-col items-end text-right drop-shadow-md">
                    <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] text-white mb-2">BLINDAGEM WINF™</div>
                    <div className="flex flex-col gap-1 items-end pt-1">
                      <div className="text-[7px] font-black text-white/80 uppercase tracking-widest">Rejeição de Calor</div>
                      <div className="text-sm font-black text-white leading-none mb-1">99.9%</div>
                      <div className="text-[7px] font-black text-white/80 uppercase tracking-widest">Bloqueio UV</div>
                      <div className="text-sm font-black text-white leading-none">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
             <SimulatorTechnicalCharts intensity={sunIntensity} filmId={filmId} area={area.toString()} />
          </div>
        </div>
      </section>

      {/* 6. Aplicações Section */}
      <section className="py-24 px-6 bg-[#020202] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">
              Onde Aplicamos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Residências High-End", desc: "Sustentabilidade térmica na fachada, sem corromper a estética das esquadrias da sua casa." },
              { title: "Apartamentos & Sacadas", desc: "Varandas integradas frescas com excelente luz natural e redução de calor extrema na sala." },
              { title: "Escritórios & Corporativo", desc: "Performance energética e redução da fadiga visual dos colaboradores em frente às telas." },
              { title: "Veículos Auto Premium", desc: "Privacidade e segurança para sua família com redução brutal do calor dentro do carro." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/10 bg-[#0a0a0a] hover:border-white/30 transition-all group shadow-sm hover:shadow-md">
                <div className="text-sm font-black text-white/20 mb-6 group-hover:text-white transition-colors">0{idx + 1}.</div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4">{item.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Film Visualizer (Interactive Tool) */}
      <section id="film-visualizer" className="py-24 md:py-32 px-6 bg-[#050505] border-b border-white/5 text-white">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/20 bg-transparent text-white/60 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.4em] mb-6">
              SIMULADOR VISUAL REALISTA
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Teste no Vidro.
            </h2>
          </div>
          <FilmVisualizer />
        </div>
      </section>

      {/* 8. Estética / Carousel */}
      <section className="py-24 px-6 bg-[#030303] overflow-hidden relative border-b border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={LUXURY_IMAGES[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.3]"
                  alt="Arquitetura WINF"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-8 uppercase text-white">
                Performance Térmica <br/> <span className="text-zinc-500">que você não vê.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                As películas de nanocerâmica resolvem o problema de aquecimento da sua casa ou sacada de forma completamente invisível. A estética original do seu imóvel é garantida, mantendo as cores e a naturalidade da arquitetura intactas.
              </p>
              <button onClick={sendToWhatsApp} className="px-8 py-4 bg-white text-black text-xs md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-colors inline-flex items-center gap-3">
                Agendar Visita Técnica <ArrowRight size={14} />
              </button>
            </div>
        </div>
      </section>

      {/* 9. Product Lineup (Catálogo de Soluções) */}
      <section id="portfolio" className="py-32 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">Linha de Soluções</h2>
            <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto">
              Nossas películas nanocerâmicas WINF™ Select, prontas para instalação.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {customerLines.map((line) => (
              <button 
                key={line.id}
                onClick={() => setActiveLine(line.id)}
                className={`px-8 py-4 text-xs md:text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                  activeLine === line.id 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-[#0a0a0a] text-zinc-500 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {line.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {customerLines.find(l => l.id === activeLine)?.items.map((item) => (
                  <FilmCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-20 text-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#0a0a0a] border border-white/10 text-white text-xs md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              <Download size={16} /> Baixar Catálogo em PDF
            </button>
          </div>
        </div>
      </section>

      {/* 10. Official Guarantee */}
      <section className="py-24 px-6 bg-[#030303] text-white border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-[#0a0a0a] shadow-sm text-zinc-400 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] mb-8">
                <Shield size={12} className="text-white" /> PORTAL DA GARANTIA E CONFIANÇA
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-[1.1]">
                Um sistema de garantia <br/>
                <span className="text-zinc-500">Totalmente seguro.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
                Na WINF™, garantias não são papéis que se perdem. Sua garantia é um certificado digital emitido online, atrelado ao DNA e número de série da sua película.
              </p>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                De 5 a 10 anos de cobertura total contra desbotamentos e bolhas, que você pode consultar online a qualquer instante no sistema.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Certificado de Autenticidade" },
                  { title: "Cobertura de até 10 Anos contra falhas" },
                  { title: "Sistema Online de Verificação" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <CheckCircle size={18} className="text-white" />
                    <span className="font-bold text-sm text-zinc-200">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* The Certificate Visual */}
            <div className="p-10 md:p-14 bg-[#111] text-white shadow-2xl relative border border-white/5">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-white/5">
                        <Shield size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-[8px] font-black uppercase tracking-[0.3em] text-white/60">Status do Sistema</div>
                      <div className="text-xs items-center gap-2 flex font-black uppercase tracking-widest text-emerald-400">
                         Garantia Ativa
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm tracking-widest text-white/80">WINF-5029-XA</div>
                  </div>
                </div>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-8">CERTIFICADO <br/>OFICIAL</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Tecnologia Ativa</div>
                    <div className="text-sm font-black text-white">Select Pro NanoCerâmica</div>
                  </div>
                  <div>
                    <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Concessão</div>
                    <div className="text-sm font-black text-white truncate">{partnerName}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">Perguntas Frequentes</h2>
            <p className="text-zinc-400 text-lg font-light">Dúvidas comuns sobre instalação e películas WINF™.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "A película WINF VAI ESCURECER A MINHA SALA OU SACADA?", a: "Não. A tecnologia de ponta WINF™ Select em nanocerâmica rejeita drasticamente os raios solares (Infravermelho) bloqueando o calor, mas mantendo a cor e a transparência intactas do seu vidro sem escurecê-lo." },
              { q: "COMO FUNCIONA A INSTALAÇÃO NA MINHA RESIDÊNCIA?", a: "Nós enviamos Instaladores Certificados com treinamento de luxo até a sua casa. O processo é limpo, silencioso, não deixa cheiro ruim, nem a necessidade de desocupar a sala." },
              { q: "REDUZ O ESFORÇO E GASTO DO AR CONDICIONADO?", a: "Sim. A tecnologia cria um escudo térmico, mantendo seu ambiente frio de forma mais rápida, e forçando o motor do ar condicionado a trabalhar em potências baixas, o que causa economia expressiva de energia." },
              { q: "A PELÍCULA PROTEGE MESMO CONTRA DESBOTAMENTO DO CHÃO?", a: "Com certeza. Nossos materiais são calibrados para barrar rigorosamente mais de 99.9% de toda a radiação U.V nociva, salvando seu assoalho e mobília de maneira imediata." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-black text-xs md:text-sm uppercase tracking-tight text-white pr-4">{faq.q}</span>
                  <ChevronLeft className={`text-zinc-500 transition-transform shrink-0 ${openFaq === idx ? '-rotate-90' : 'rotate-180'}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-zinc-400 text-sm font-light leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="py-24 px-6 bg-[#020202] text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-black text-2xl tracking-tighter uppercase text-white">WINF™</span>
              </div>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                Sua consultoria premium em soluções térmicas integradas para arquitetura e automóveis de alto padrão.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"><Share2 size={16} /></a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"><Globe2 size={16} /></a>
              </div>
            </div>

            <div className="text-left md:text-right w-full md:w-auto">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Viva a Experiência.</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8 max-w-xs md:ml-auto">
                Eleve o padrão de conforto de sua família com uma blindagem térmica completa e silenciosa.
              </p>
              <button onClick={sendToWhatsApp} className="w-full md:w-auto bg-white text-black px-6 md:px-10 py-5 text-xs md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Solicite seu Projeto 
              </button>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 text-center md:text-left">
              © {new Date().getFullYear()} WINF™ // {partnerName}
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[90]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendToWhatsApp}
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl relative group"
        >
          <div className="absolute -inset-2 bg-[#25D366]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
      </div>

      {/* Neuromesh AI FAB */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90]">
        <AnimatePresence>
          {aiOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[350px] md:w-[400px] h-[500px] md:h-[600px] border border-white/10 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              <div className="p-4 md:p-6 border-b border-white/10 bg-[#111] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center text-black">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">NEUROMESH™</h3>
                    <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Assistente IA Online</span>
                  </div>
                </div>
                <button onClick={() => setAiOpen(false)} className="p-2 hover:bg-white/10 transition-colors text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-4 text-[12px] leading-relaxed ${
                      msg.role === 'ai' 
                        ? 'bg-[#111] text-zinc-300' 
                        : 'bg-white text-black font-bold'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#111] p-4 text-white">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="relative">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua dúvida..."
                    className="w-full bg-[#111] border border-white/20 px-4 py-4 text-xs focus:outline-none focus:border-white transition-all text-white placeholder:text-zinc-600"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-zinc-200 transition-all font-bold"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAiOpen(!aiOpen)}
          className="w-14 h-14 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
        >
          {aiOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Bot className="w-6 h-6 md:w-7 md:h-7" />}
        </motion.button>
      </div>

    </div>
  );
};

export default PublicConsultancy;
