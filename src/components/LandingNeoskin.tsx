import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ShieldAlert,
  Crosshair,
  ChevronRight,
  Activity,
  Cpu,
} from "lucide-react";

interface LandingNeoskinProps {
  onBack: () => void;
  onNavigateToCatalog?: () => void;
}

const NeoskinPreview: React.FC<{ onEnd: () => void; timeLeft: number }> = ({
  onEnd,
  timeLeft,
}) => {
  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-[#D8D8D8] overflow-y-auto pb-0 selection:bg-[#E33B0E]/30 font-mono">
      {/* Sticky top-bar showing the timer */}
      <div className="fixed top-0 left-0 w-full bg-[#E33B0E] z-[100] px-6 py-2 flex justify-between items-center text-black border-b border-black">
        <div className="flex items-center gap-3">
          <Activity size={16} className="animate-pulse" />
          <span className="text-xs md:text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] hidden sm:inline">
            Status: Survival Mode // Temporary Access
          </span>
          <span className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] sm:hidden">
            Temp Access
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl sm:text-2xl font-black tabular-nums">
            {timeLeft}s
          </span>
          <button
            onClick={onEnd}
            className="bg-black text-[#E33B0E] px-4 py-1.5 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-black tracking-widest hover:bg-[#1A1A1A] hover:text-[#FF4A1A] transition-colors rounded-none"
          >
            Abort
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b-4 border-[#222] pt-16">
        <div className="absolute inset-0 bg-[#0E0E0E] z-0" />
        <img
          src="https://images.unsplash.com/photo-1506544777-62cd39efbf82?q=80&w=2000&auto=format&fit=crop"
          alt="Neoskin Brutal Environment"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale sepia-[0.3] contrast-150"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0E0E0E]/80 to-[#0E0E0E]" />

        {/* Tactical UI Overlay */}
        <div className="absolute top-24 left-6 hidden md:block">
           <div className="w-12 h-12 border-l-2 border-t-2 border-[#E33B0E]/50"></div>
        </div>
        <div className="absolute top-24 right-6 hidden md:block">
           <div className="w-12 h-12 border-r-2 border-t-2 border-[#E33B0E]/50"></div>
        </div>
        <div className="absolute bottom-24 left-6 hidden md:block">
           <div className="w-12 h-12 border-l-2 border-b-2 border-[#E33B0E]/50"></div>
        </div>
        <div className="absolute bottom-24 right-6 hidden md:block">
           <div className="w-12 h-12 border-r-2 border-b-2 border-[#E33B0E]/50"></div>
        </div>

        <div className="relative z-10 px-6 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-0.5 w-12 bg-[#E33B0E]"></div>
            <span className="text-[#E33B0E] text-xs md:text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">
              Armadura Tática PPF
            </span>
            <div className="h-0.5 w-12 bg-[#E33B0E]"></div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.8] text-[#F5F5F5] mix-blend-overlay"
            style={{ textShadow: "4px 4px 0px rgba(227, 59, 14, 0.4)" }}
          >
            NEOSKIN<br/><span className="text-[0.6em] text-[#E33B0E]">BRUTAL</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-xl font-bold text-[#888] mb-12 max-w-3xl leading-relaxed uppercase bg-black/50 p-6 border-l-4 border-[#E33B0E]"
          >
            A película de proteção que sobrevive ao fim do mundo. 
            Desenvolvida para aguentar ambientes apocalípticos, florestas densas, 
            arranhões extremos e as estradas mais destruídas.
          </motion.p>
        </div>
      </section>

      {/* Attributes Section */}
      <section className="py-24 px-6 relative border-y-4 border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="col-span-1 border-r border-[#222] pr-12 hidden lg:block">
              <Crosshair size={48} className="text-[#E33B0E] mb-8" />
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">
                Engenharia <br/>Sobrevivencial
              </h2>
              <p className="text-[#666] uppercase text-xs leading-relaxed font-bold tracking-widest">
                Enquanto o mundo desmorona, a NeoSkin permanece intacta. 
                Uma barreira de sacrifício hiper-resistente para enfrentar o impiedoso.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8 gap-y-16">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-[#E33B0E] text-black text-xs md:text-[10px] font-black uppercase px-2 py-1">Crit_01</span>
                     <h3 className="text-xl font-black uppercase tracking-tighter">Resistência Extrema</h3>
                  </div>
                  <p className="text-xs font-bold text-[#555] leading-relaxed uppercase">
                     Formulada para suportar abrasão de galhos, pedras e detritos. O terreno off-road mais violento não é páreo.
                  </p>
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-[#E33B0E] text-black text-xs md:text-[10px] font-black uppercase px-2 py-1">Crit_02</span>
                     <h3 className="text-xl font-black uppercase tracking-tighter">Auto-Cura Brutal</h3>
                  </div>
                  <p className="text-xs font-bold text-[#555] leading-relaxed uppercase">
                     Arranhões severos curam com calor intenso. A película sofre o dano para que sua pintura continue impecável.
                  </p>
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-[#E33B0E] text-black text-xs md:text-[10px] font-black uppercase px-2 py-1">Crit_03</span>
                     <h3 className="text-xl font-black uppercase tracking-tighter">Barreira Química</h3>
                  </div>
                  <p className="text-xs font-bold text-[#555] leading-relaxed uppercase">
                     Intransponível para fluidos corrosivos, detritos biológicos pesados e agentes químicos degradantes do ambiente externo.
                  </p>
               </div>
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-[#E33B0E] text-black text-xs md:text-[10px] font-black uppercase px-2 py-1">Crit_04</span>
                     <h3 className="text-xl font-black uppercase tracking-tighter">Camuflagem UV</h3>
                  </div>
                  <p className="text-xs font-bold text-[#555] leading-relaxed uppercase">
                     Estabilizadores UV reativos impedem a degradação da película sob o sol escaldante, mantendo estrutura molecular.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arsenal Lineup */}
      <section className="py-32 px-6 relative bg-[url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed">
        <div className="absolute inset-0 bg-[#0E0E0E]/90 bg-blend-multiply" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[#F5F5F5]">
              Arsenal<span className="text-[#E33B0E]">.NeoSkin()</span>
            </h2>
            <div className="h-1 w-32 bg-[#E33B0E]"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "B-200",
                name: "Hazard",
                desc: "150 Microns. A primeira linha de defesa urbana.",
                img: "https://images.unsplash.com/photo-1620319520448-9f37c356ad79?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "B-400",
                name: "Bunker",
                desc: "190 Microns. Resistência severa para rotas não mapeadas.",
                img: "https://images.unsplash.com/photo-1506544777-62cd39efbf82?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "B-800",
                name: "Apocalypse",
                desc: "Grau Militar. A armadura definitiva contra o caos.",
                img: "https://images.unsplash.com/photo-1616056586036-6db8e967261a?auto=format&fit=crop&q=80&w=800"
              }
            ].map((armor, i) => (
               <div key={i} className="group relative bg-[#050505] border-2 border-[#222] hover:border-[#E33B0E] transition-colors p-2 flex flex-col">
                 <div className="relative h-64 overflow-hidden bg-black mb-4">
                    <img src={armor.img} alt={armor.name} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-150 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-2 right-2 bg-[#E33B0E] text-black font-black text-xs md:text-[10px] px-2 py-1 uppercase">{armor.id}</div>
                 </div>
                 <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                       <h3 className="text-3xl font-black uppercase tracking-tighter text-[#F5F5F5] mb-2">{armor.name}</h3>
                       <p className="text-xs text-[#666] font-bold uppercase">{armor.desc}</p>
                    </div>
                    <button className="mt-8 grid grid-cols-[1fr_auto] border-2 border-[#333] hover:border-[#E33B0E] text-[#666] hover:text-[#E33B0E] transition-colors items-center font-black uppercase text-xs">
                       <span className="py-3 px-4">Analisar Blueprint</span>
                       <span className="p-3 border-l-2 border-inherit"><ChevronRight size={14} /></span>
                    </button>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-[#050505] border-t-4 border-[#222] font-mono text-center">
        <div className="text-[#E33B0E] text-2xl font-black tracking-tighter uppercase mb-4">NEOSKIN</div>
        <p className="text-xs md:text-[10px] text-[#444] uppercase font-bold tracking-widest max-w-sm mx-auto">
          Protocolo de Defesa Ativado.<br/>
          (c) {new Date().getFullYear()} NeoSkin Ind. Militech Division.
        </p>
      </footer>
    </div>
  );
};

const LandingNeoskin: React.FC<LandingNeoskinProps> = ({ onBack }) => {
  const [view, setView] = useState<"request" | "login" | "success" | "preview">("request");
  const [timeLeft, setTimeLeft] = useState(20);
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === "preview" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (view === "preview" && timeLeft === 0) {
      setView("request");
      setTimeLeft(20);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [view, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "request") {
      setView("success");
    } else {
      onBack();
    }
  };

  if (view === "preview") {
    return (
      <NeoskinPreview
        onEnd={() => {
          setView("request");
          setTimeLeft(20);
        }}
        timeLeft={timeLeft}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#D8D8D8] font-mono selection:bg-[#E33B0E]/30 relative overflow-hidden flex flex-col justify-between p-6 md:p-10">
      
      {/* Background Grunge */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[#0E0E0E]" />
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grunge-wall.png')]" />
         <div className="absolute w-[1px] h-full bg-[#E33B0E]/10 left-[10%] top-0"></div>
         <div className="absolute w-[1px] h-full bg-[#E33B0E]/10 left-[50%] top-0"></div>
         <div className="absolute w-[1px] h-full bg-[#E33B0E]/10 right-[10%] top-0"></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center w-full max-w-6xl mx-auto mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#666] hover:text-[#E33B0E] transition-colors text-xs md:text-[10px] uppercase tracking-[0.2em] font-black group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Abort Mission
        </button>
        <div className="flex items-center gap-2">
          <ShieldAlert size={14} className="text-[#E33B0E]" />
          <span className="font-black tracking-[0.3em] text-xs md:text-[10px] uppercase text-[#E33B0E]">
            Secure Terminal
          </span>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto border-4 border-[#222] bg-[#0A0A0A] p-6 lg:p-0">
        <div className="w-full grid lg:grid-cols-2 h-full">
           
           {/* Terminal Intro */}
           <div className="hidden lg:flex flex-col justify-center p-16 border-r-4 border-[#222]">
              <Cpu size={32} className="text-[#E33B0E] mb-8" />
              <h1 className="text-7xl font-black tracking-tighter uppercase mb-6 leading-none text-[#F5F5F5]">
                NEOSKIN<br/>BRUTAL
              </h1>
              <div className="w-16 h-2 bg-[#E33B0E] mb-8"></div>
              <p className="text-sm text-[#888] font-bold uppercase leading-relaxed mb-12">
                A armadura tática (PPF) construída para resistir além dos limites. 
                Tecnologia de sacrifício hiper-resistente contra ambientes apocalípticos.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs md:text-[10px] uppercase font-black text-[#555]">
                 <div className="border border-[#333] p-4 flex flex-col gap-2">
                    <span className="text-[#E33B0E]">Status</span>
                    <span>Classified Access</span>
                 </div>
                 <div className="border border-[#333] p-4 flex flex-col gap-2">
                    <span className="text-[#E33B0E]">Integrity</span>
                    <span>100% Guaranteed</span>
                 </div>
              </div>
           </div>

           {/* Access Form */}
           <div className="p-8 md:p-16 flex flex-col justify-center relative bg-[#050505]">
              <AnimatePresence mode="wait">
                 {/* REQUEST ACCESS */}
                 {view === "request" && (
                   <motion.div key="request" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-12">
                         <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 text-[#F5F5F5]">Requisitar Operação</h2>
                         <p className="text-xs text-[#E33B0E] uppercase font-bold tracking-widest">Identificação Necessária</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-xs md:text-[10px] text-[#666] uppercase font-black tracking-widest">Operador (Nome)</label>
                            <input
                              type="text"
                              required
                              className="w-full bg-[#111] border-2 border-[#333] p-4 text-xs text-[#D8D8D8] hover:border-[#555] focus:outline-none focus:border-[#E33B0E] focus:bg-[#1A1A1A] transition-colors font-bold uppercase placeholder-[#444]"
                              placeholder="GHOST PROTOCOL 1"
                              value={formData.nome}
                              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs md:text-[10px] text-[#666] uppercase font-black tracking-widest">Código de Missão (E-mail)</label>
                            <input
                              type="email"
                              required
                              className="w-full bg-[#111] border-2 border-[#333] p-4 text-xs text-[#D8D8D8] hover:border-[#555] focus:outline-none focus:border-[#E33B0E] focus:bg-[#1A1A1A] transition-colors font-bold uppercase placeholder-[#444]"
                              placeholder="ALPHA@SECTOR.COM"
                              value={formData.codigo}
                              onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                            />
                         </div>

                         <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                              type="submit"
                              className="bg-[#E33B0E] text-black font-black uppercase tracking-widest text-xs md:text-[10px] p-4 hover:bg-white transition-colors"
                            >
                              ENVIAR DADOS
                            </button>
                            <button
                              type="button"
                              onClick={() => setView("preview")}
                              className="border-2 border-[#333] text-[#888] font-black uppercase tracking-widest text-xs md:text-[10px] p-4 hover:border-[#E33B0E] hover:text-[#E33B0E] transition-colors"
                            >
                              MODO VISUAL
                            </button>
                         </div>
                      </form>

                      <div className="mt-12 text-center text-[#444] text-xs md:text-[10px] font-bold uppercase tracking-widest">
                         Operador Autorizado? <button onClick={() => setView("login")} className="text-[#E33B0E] hover:text-white underline ml-2 decoration-[#333] underline-offset-4">LOG_IN</button>
                      </div>
                   </motion.div>
                 )}

                 {/* LOGIN VIEW */}
                 {view === "login" && (
                   <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-12">
                         <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 text-[#F5F5F5]">Sistema Restrito</h2>
                         <p className="text-xs text-[#E33B0E] uppercase font-bold tracking-widest">Autenticação Tática</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-xs md:text-[10px] text-[#666] uppercase font-black tracking-widest">Chave Alpha (ID)</label>
                            <input
                              type="email"
                              required
                              className="w-full bg-[#111] border-2 border-[#333] p-4 text-xs text-[#D8D8D8] hover:border-[#555] focus:outline-none focus:border-[#E33B0E] focus:bg-[#1A1A1A] transition-colors font-bold uppercase"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs md:text-[10px] text-[#666] uppercase font-black tracking-widest">Decodificador (Pass)</label>
                            <input
                              type="password"
                              required
                              className="w-full bg-[#111] border-2 border-[#333] p-4 text-xs text-[#D8D8D8] hover:border-[#555] focus:outline-none focus:border-[#E33B0E] focus:bg-[#1A1A1A] transition-colors font-bold uppercase text-[16px] tracking-widest"
                            />
                         </div>

                         <div className="pt-4 grid grid-cols-1 gap-4">
                            <button
                              type="submit"
                              className="w-full bg-white text-black font-black uppercase tracking-widest text-xs md:text-[10px] p-4 hover:bg-[#E33B0E] transition-colors"
                            >
                              ACESSAR_Terminal
                            </button>
                         </div>
                      </form>

                      <div className="mt-12 text-center text-[#444] text-xs md:text-[10px] font-bold uppercase tracking-widest">
                         Sem acesso? <button onClick={() => setView("request")} className="text-[#E33B0E] hover:text-white underline ml-2 decoration-[#333] underline-offset-4">SOLICITAR_REQ</button>
                      </div>
                   </motion.div>
                 )}

                 {/* SUCCESS */}
                 {view === "success" && (
                   <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <div className="w-16 h-16 border-2 border-[#E33B0E] flex items-center justify-center mx-auto mb-8 bg-[#E33B0E]/10">
                         <Activity size={24} className="text-[#E33B0E] animate-pulse" />
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#F5F5F5]">Transmissão Recebida</h2>
                      <p className="text-xs text-[#888] font-bold uppercase leading-relaxed mb-12">
                         O sinal foi enviado aos nossos operadores. 
                         Aguarde comunicação em canais criptografados caso seu perfil seja validado.
                      </p>
                      
                      <button
                        onClick={onBack}
                        className="bg-transparent border-2 border-[#333] text-[#888] font-black uppercase tracking-widest text-xs md:text-[10px] p-4 py-3 hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-colors"
                      >
                        DESCONECTAR
                      </button>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </main>
      <div className="block mt-4"></div>
    </div>
  );
};

export default LandingNeoskin;
