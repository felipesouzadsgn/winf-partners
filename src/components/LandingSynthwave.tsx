import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Headphones, Radio, Mic, Play } from 'lucide-react';

interface LandingSynthwaveProps {
  onEnter: () => void;
  onBack?: () => void;
}

const LandingSynthwave: React.FC<LandingSynthwaveProps> = ({ onEnter, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-white/20">
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2">
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="text-xl md:text-2xl font-black font-heading tracking-tighter cursor-pointer text-white">
            SYNTH<span className="font-light">WAVE.FM</span>
          </div>
        </div>
        <button
          onClick={onEnter}
          className="text-xs md:text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold hover:text-white/50 transition-colors"
        >
          Acessar Rádio IA
        </button>
      </nav>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center w-full max-w-5xl mx-auto relative z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-white/50 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] mb-8 font-bold border border-white/10">
            Inteligência Auditiva
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-heading font-light tracking-tighter uppercase mb-6 leading-[0.9] text-white">
            O Som da <br/><span className="font-black">Proteção.</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-white/60 mb-4 tracking-tight max-w-2xl mx-auto">
            Playlists de atmosfera premium e debates gerados por IA.
          </p>
          <p className="text-sm md:text-base font-light text-white/40 mb-12 max-w-2xl mx-auto">
            Eduque seus clientes e eleve a experiência no ateliê com trilhas curadas e podcasts autônomos que explicam desde redução de calor até narrativas de sucesso da Winf.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <button onClick={onEnter} className="flex items-center justify-center gap-3 bg-white text-black px-6 md:px-10 py-5 font-bold uppercase text-xs md:text-[10px] tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all rounded-none w-full sm:w-auto">
               Ouvir Agora <Play size={14} className="fill-black" />
             </button>
          </div>
        </motion.div>
      </main>

      {/* Feature Showcase Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-white/5 rounded-3xl mb-24 border border-white/10">
         <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-white">A Frequência do Futuro</h2>
            <p className="text-white/50 font-light max-w-xl mx-auto">Mais do que música. Uma ferramenta de vendas e ambientação contínua para sua operação de alto nível.</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Rádio Autônoma", desc: "Debates diários gerados por IA sobre tecnologias de proteção térmica e mercado.", icon: Radio },
              { title: "Playlists Premium", desc: "Ambientes sonoros minimalistas projetados para a estética AeroCore™ e NeoSkin™.", icon: Headphones },
              { title: "Séries Educativas", desc: "Podcasts que desconstroem argumentos de venda e objeções de alto padrão.", icon: Mic },
              { title: "Foco Profundo", desc: "Batidas cibernéticas e lofi corporativo perfeitos para curar o ambiente durante a instalação.", icon: Play }
            ].map((item, i) => (
              <div key={i} className="group bg-white/5 p-6 md:p-10 border border-white/5 shadow-sm hover:border-white/20 transition-all duration-500 rounded-2xl relative overflow-hidden flex flex-col items-start hover:-translate-y-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors text-white">
                  <item.icon size={20} />
                </div>
                <h3 className="font-bold text-lg tracking-tight mb-3 text-white uppercase">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Image Banner Section */}
      <section className="h-[60vh] md:h-[80vh] w-full relative mb-24 border-y border-white/10">
         <div className="absolute inset-0 bg-black">
             <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-opacity duration-1000 grayscale" alt="Music Studio" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-xs md:text-[10px] hidden md:block uppercase tracking-[0.5em] text-white/50 font-bold mb-6">Educação Inteligente</span>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mix-blend-screen tracking-tighter uppercase px-6 text-center max-w-5xl leading-tight">
                VENDENDO ENQUANTO <br className="hidden md:block" />O CLIENTE ESPERA.
             </h2>
         </div>
      </section>

      <footer className="py-20 text-center flex flex-col items-center justify-center border-t border-white/10">
        <div className="text-2xl font-black font-heading tracking-tighter mb-6 text-white flex items-center gap-2">
           SYNTH<span className="font-light">WAVE.FM</span>
        </div>
        <p className="text-white/30 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] font-medium">
          © 2026 WINF INTERNATIONAL GROUP.
        </p>
      </footer>
    </div>
  );
};

export default LandingSynthwave;
