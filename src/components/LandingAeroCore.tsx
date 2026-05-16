import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Shield,
  Lock,
  ChevronRight,
  CheckCircle2,
  Eye,
  Timer,
  Play
} from "lucide-react";

interface LandingAeroCoreProps {
  onBack: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateToNeoskin?: () => void;
}

const AeroCorePreview: React.FC<{ onEnd: () => void; timeLeft: number; onNavigateToNeoskin?: () => void }> = ({
  onEnd,
  timeLeft,
  onNavigateToNeoskin
}) => {
  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-y-auto pb-0 selection:bg-white/20">
      {/* Sticky top-bar showing the timer */}
      <div className="fixed top-0 left-0 w-full bg-red-600/90 backdrop-blur-md z-[100] px-6 py-3 flex justify-between items-center text-white border-b border-red-500/50">
        <div className="flex items-center gap-3">
          <Timer size={16} className="animate-pulse" />
          <span className="text-xs md:text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] hidden sm:inline">
            Sessão de Degustação - Acesso Temporário
          </span>
          <span className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] sm:hidden">
            Acesso Temporário
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl sm:text-2xl font-mono font-black tabular-nums">
            {timeLeft}s
          </span>
          <button
            onClick={onEnd}
            className="bg-black/50 px-3 py-1.5 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-bold tracking-widest hover:bg-black transition-colors rounded-none"
          >
            Encerrar
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/10 pt-16">
        <div className="absolute inset-0 bg-black z-0" />
        <img
          src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000&auto=format&fit=crop"
          alt="AeroCore Aviation"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/50 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] mb-8"
          >
            Elite Stealth Technology
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter uppercase mb-6 leading-[0.85] text-white mix-blend-overlay"
          >
            AEROCORE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-lg font-light text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            O ápice da tecnologia de proteção solar, desenvolvida originalmente
            para aplicações militares classificadas e agora disponível
            exclusivamente para um seleto grupo de clientes por convite.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-black/50 border border-white/10 p-4 rounded-none backdrop-blur-xl w-full max-w-sm">
               <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3 text-left flex items-center gap-2">
                 <Play size={10} className="text-white" /> Manifesto Aerocore (Áudio)
               </p>
               <audio controls className="w-full h-8 opacity-80" controlsList="nodownload">
                 <source src={undefined} type="audio/mpeg" />
                 Seu navegador não suporta o elemento de áudio.
               </audio>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro & Philosophy (Replacing generic icons with typographic focus and minimal layout) */}
      <section className="py-24 px-6 relative border-b border-white/5 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Exclusividade <br/> <span className="text-white/40">Absoluta</span>
              </h2>
              <div className="h-px w-24 bg-white/20 mb-8"></div>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Nossa tecnologia proprietária oferece proteção invisível com 
                performance superior comprovada, garantindo durabilidade 
                excepcional e estética impecável para os veículos, aeronaves e 
                embarcações mais exclusivos do mundo.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 gap-y-12">
               <div>
                  <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">01</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Lifetime Guarantee™</h3>
                  <p className="text-xs font-light text-white/50 leading-relaxed">Garantia vitalícia em todos os produtos, transferível para o próximo proprietário.</p>
               </div>
               <div>
                  <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">02</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Tecnologia Militar</h3>
                  <p className="text-xs font-light text-white/50 leading-relaxed">Desenvolvida originalmente para aplicações militares classificadas de alta performance.</p>
               </div>
               <div>
                  <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">03</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Escudo Invisível</h3>
                  <p className="text-xs font-light text-white/50 leading-relaxed">Proteção molecular avançada praticamente imperceptível sob inspeção detalhada.</p>
               </div>
               <div>
                  <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">04</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Acesso Restrito</h3>
                  <p className="text-xs font-light text-white/50 leading-relaxed">Disponível exclusivamente por convite e aplicada por laboratórios certificados.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universe Section - Focus on Imagery over large icons */}
      <section className="py-32 px-6 bg-[#020202] relative border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
                Universo AEROCORE™
              </h2>
              <p className="text-white/50 max-w-2xl text-base font-light leading-relaxed">
                Linha completa de soluções para veículos de ultra-luxo, aeronaves, 
                embarcações marrons e brancas e grandes fachadas arquitetônicas.
              </p>
            </div>
            
            {onNavigateToNeoskin && (
              <button
                onClick={onNavigateToNeoskin}
                className="group flex flex-col items-start md:items-end"
              >
                <div className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                  Proteção Brutal PPF
                </div>
                <div className="flex items-center gap-2 text-white hover:text-[#E33B0E] transition-colors">
                  <span className="text-xl font-black uppercase tracking-tighter">Explore NeoSkin</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "01",
                name: "Automotive Elite",
                desc: "Auto-regeneração e rejeição de 99.9% de IV para hipercarros.",
                img: "https://images.unsplash.com/photo-1503376713601-383b7aa36cc2?auto=format&fit=crop&q=80&w=800"
              },
              {
                num: "02",
                name: "Aircraft Stealth",
                desc: "Proteção térmica excepcional para jatos em altas altitudes.",
                img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800"
              },
              {
                num: "03",
                name: "Marine Shield",
                desc: "Resistência extrema ao salitre em iates e lanchas de luxo.",
                img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800"
              },
              {
                num: "04",
                name: "Glass + Home",
                desc: "Privacidade absoluta sem alterar a fachada lumínica.",
                img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800"
              }
            ].map((cat, i) => (
               <div key={i} className="group relative h-[450px] overflow-hidden bg-[#0A0A0A] border border-white/5">
                 <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                 
                 <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                    <div className="mb-auto text-xl font-light font-mono text-white/50">{cat.num}</div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-3">{cat.name}</h3>
                    <p className="text-sm md:text-[11px] text-white/60 font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {cat.desc}
                    </p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section: Performance Suprema */}
      <section className="flex flex-col lg:flex-row min-h-[70vh] border-b border-white/5">
         <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200" alt="Tech" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-40" />
            <div className="absolute inset-0 bg-black/50" />
         </div>
         <div className="w-full lg:w-1/2 bg-[#050505] p-6 md:p-12 lg:p-24 flex flex-col justify-center">
            <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.4em] font-black text-white/40 mb-6">Especificação Técnica</div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">Performance Suprema</h2>
            <div className="space-y-6 text-white/60 font-light text-sm md:text-base leading-relaxed">
              <p>O estado da arte em proteção térmica e visual. Oferecemos conforto inigualável para passageiros de primeira classe e motoristas mais exigentes.</p>
              <p>Rejeição de até <strong>99,9% dos raios UV e IR</strong>, protegendo não só a pele, mas todo o interior precioso em couro e fibra de carbono.</p>
              <p>Estrutura molecular livre de metais garante sinal perfeito de GPS, RF e telecomunicações.</p>
            </div>
         </div>
      </section>

      {/* Gallery & Studios - Application + Works */}
      <section className="py-32 px-6 bg-[#020202] relative border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              Studio & Aplicação Exclusiva
            </h2>
            <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">
              Apenas Master Applicators certificados em nossos laboratórios estão autorizados 
              a instalar a película AEROCORE™. Um ambiente clínico para projetos de alto nível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-24">
             {/* Application Video/Photo 1 */}
             <div className="relative aspect-[4/3] bg-zinc-900 group overflow-hidden md:col-span-2">
                 <img src="https://images.unsplash.com/photo-1610433290610-8dc407de3eaf?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Studio Application" />
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                 <div className="absolute top-6 left-6 flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full">
                    <Play size={16} className="fill-white translate-x-0.5" />
                 </div>
                 <div className="absolute bottom-6 left-6">
                    <div className="text-xs md:text-[10px] uppercase font-black tracking-[0.2em] bg-white text-black px-3 py-1 inline-block mb-3">Master Studio</div>
                    <h3 className="text-2xl font-light tracking-wide">Aplicação Dinâmica</h3>
                 </div>
             </div>
             
             {/* Studio Lab */}
             <div className="relative aspect-[4/3] group overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Laboratory" />
                 <div className="absolute bottom-6 left-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Laboratório Clean Room</h3>
                 </div>
             </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6 text-center">Portfólio Global</h3>
          </div>

          {/* Gallery Works */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
             {[
               { title: "PORSCHE 911 GT3 RS", img: "https://images.unsplash.com/photo-1503376713601-383b7aa36cc2?auto=format&fit=crop&q=80&w=1000" },
               { title: "GULFSTREAM G650", img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000" },
               { title: "FERRETTI YACHT", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1000" },
               { title: "PENTHOUSE GLASS", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000" },
               { title: "LAMBORGHINI REVUELTO", img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000" },
               { title: "EMBRAER PHENOM", img: "https://images.unsplash.com/photo-1559082260-26462c161be0?auto=format&fit=crop&q=80&w=1000" }
             ].map((item, i) => (
                <div key={i} className="relative aspect-video group overflow-hidden bg-[#0A0A0A]">
                   <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <h3 className="text-white font-medium tracking-[0.2em] text-xs uppercase text-center px-4">{item.title}</h3>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-40 px-6 relative flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-[#020202]/80" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <p className="font-light text-2xl md:text-4xl text-white leading-snug mb-12">
             "Após instalar a película AEROCORE™ em minha residência à beira-mar, a diferença foi imediatamente perceptível. 
             O conforto térmico é excepcional, e a privacidade é absoluta. Verdadeiramente revolucionário."
           </p>
           <div className="text-sm md:text-[11px] uppercase tracking-[0.3em] font-black text-white mb-2">Alexandre Monteiro</div>
           <div className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold">CEO, Monteiro Investments</div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-16 px-6 bg-[#050505] text-center border-t border-white/10 mt-auto">
        <div className="text-2xl font-black uppercase tracking-[0.4em] mb-8 text-white/80">AEROCORE™</div>
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/40">
           <a href="#" className="hover:text-white transition-colors">Produtos</a>
           <a href="#" className="hover:text-white transition-colors">Laboratórios</a>
           <a href="#" className="hover:text-white transition-colors">Tecnologia</a>
           <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/20 uppercase tracking-[0.2em]">
           © {new Date().getFullYear()} AEROCORE™. Todos os Direitos Reservados. Parte do Ecossistema Winf™.
        </div>
      </footer>
    </div>
  );
};

const LandingAeroCore: React.FC<LandingAeroCoreProps> = ({ onBack, onNavigateToNeoskin }) => {
  const [view, setView] = useState<"request" | "login" | "success" | "preview">("request");
  const [timeLeft, setTimeLeft] = useState(20);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    veiculo: "",
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
      // Simulate login
      onBack();
    }
  };

  if (view === "preview") {
    return (
      <AeroCorePreview
        onEnd={() => {
          setView("request");
          setTimeLeft(20);
        }}
        timeLeft={timeLeft}
        onNavigateToNeoskin={onNavigateToNeoskin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-white/20 relative overflow-hidden flex flex-col justify-between">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000&auto=format&fit=crop"
          alt="AeroCore Aviation"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black rounded-full blur-[100px] pointer-events-none" />
      </div>

      <nav className="relative z-50 p-6 md:p-10 flex justify-between items-center w-full max-w-[1600px] mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs md:text-[10px] uppercase tracking-[0.2em] font-black group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Retornar
        </button>
        <div className="flex items-center gap-3">
          <Shield size={14} className="text-white/30" />
          <span className="font-black tracking-[0.3em] text-xs uppercase text-white/50">
            Secure Module
          </span>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center p-6 w-full max-w-[1600px] mx-auto">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
          {/* Left Side - Typography & Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 text-white/70 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 w-fit backdrop-blur-sm">
              <Lock size={10} /> Restrito para Convidados
            </div>

            <h1 className="text-6xl xl:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white">
              AEROCORE™
            </h1>

            <div className="h-px w-24 bg-gradient-to-r from-white/40 to-transparent mb-8"></div>

            <h2 className="text-xl xl:text-2xl font-light text-white/80 mb-6 tracking-wide leading-relaxed">
              Elite Stealth Technology
              <br />
              <span className="text-white/50">
                Exclusividade Absoluta em Proteção Solar
              </span>
            </h2>

            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-sm text-white/60 font-light tracking-wide">
                <CheckCircle2 size={16} className="text-white/40" />
                Lifetime Guarantee™ | Certificação Global
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 font-light tracking-wide">
                <CheckCircle2 size={16} className="text-white/40" />
                Desenvolvida com Tecnologia Militar Classificada
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 font-light tracking-wide">
                <CheckCircle2 size={16} className="text-white/40" />
                Acesso Exclusivo a Clientes Premium e Parceiros
              </li>
            </ul>
          </motion.div>

          {/* Right Side - Form Module */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0 relative"
          >
            {/* Form Container */}
            <div className="bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-5 md:p-8 md:p-12 shadow-2xl relative overflow-hidden w-full">
              {/* Glass reflection */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <AnimatePresence mode="wait">
                {/* REQUEST ACCESS VIEW */}
                {view === "request" && (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10 text-center lg:hidden">
                      <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        AEROCORE™
                      </h2>
                      <p className="text-xs md:text-[10px] uppercase tracking-widest text-white/50 font-bold">
                        Elite Stealth Technology
                      </p>
                    </div>

                    <div className="mb-10">
                      <h3 className="text-2xl font-light tracking-tight mb-2">
                        Solicitar Acesso
                      </h3>
                      <p className="text-sm md:text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                        Credenciais restritas por convite
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Nome Completo"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="E-mail Corporativo ou Pessoal"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Empresa / Organização"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                          value={formData.empresa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              empresa: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Veículo, Aeronave ou Projeto Principal"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                          value={formData.veiculo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              veiculo: e.target.value,
                            })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-[10px] py-4 mt-2 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
                      >
                        Solicitar Convite{" "}
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => setView("preview")}
                        className="w-full bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.1em] text-xs md:text-[10px] py-4 mt-2 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
                      >
                        <Eye size={14} /> Degustação Rápida{" "}
                        <span className="text-white/50">(20s)</span>
                      </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                      <button
                        onClick={() => setView("login")}
                        className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest font-bold hover:text-white transition-colors"
                      >
                        Já possui acesso?{" "}
                        <strong className="text-white border-b border-white/30 pb-0.5 ml-1">
                          Entrar
                        </strong>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* LOGIN VIEW */}
                {view === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10 text-center lg:hidden">
                      <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        AEROCORE™
                      </h2>
                      <p className="text-xs md:text-[10px] uppercase tracking-widest text-white/50 font-bold">
                        Elite Stealth Technology
                      </p>
                    </div>

                    <div className="mb-10">
                      <h3 className="text-2xl font-light tracking-tight mb-2">
                        Portal Restrito
                      </h3>
                      <p className="text-sm md:text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                        Autenticação necessária
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="AeroCore™ ID (E-mail)"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          required
                          placeholder="Chave de Acesso"
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-[10px] py-4 mt-4 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
                      >
                        Acessar Sistema <Lock size={12} className="ml-1" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setView("preview")}
                        className="w-full bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.1em] text-xs md:text-[10px] py-4 mt-2 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
                      >
                        <Eye size={14} /> Degustação Rápida{" "}
                        <span className="text-white/50">(20s)</span>
                      </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                      <button
                        onClick={() => setView("request")}
                        className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest font-bold hover:text-white transition-colors"
                      >
                        Não possui convite?{" "}
                        <strong className="text-white border-b border-white/30 pb-0.5 ml-1">
                          Solicitar
                        </strong>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS VIEW */}
                {view === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 md:py-10"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                      <CheckCircle2 size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-light tracking-tight mb-4 text-white">
                      Solicitação Recebida
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed font-light mb-8 max-w-xs mx-auto">
                      Seus dados foram criptografados e enviados para nossa
                      central de aprovação. Em breve, enviaremos as credenciais
                      exclusivas caso o perfil seja aprovado.
                    </p>
                    <button
                      onClick={onBack}
                      className="bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs md:text-[10px] px-8 py-4 hover:bg-white hover:text-black transition-colors"
                    >
                      Retornar ao Início
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal deco below form */}
            <div className="mt-6 flex items-center justify-between px-2 text-[10px] md:text-[8px] font-mono uppercase tracking-widest text-white/20">
              <span>END-TO-END ENCRYPTED</span>
              <span>VER: 4.8.2_AC</span>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-50 p-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold max-w-[1600px] mx-auto w-full">
        <div>© {new Date().getFullYear()} AEROCORE™. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white/60 transition-colors">
            Termos
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Ajuda
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingAeroCore;
