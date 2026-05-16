import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Pause } from 'lucide-react';

interface LandingBriefingProps {
  onEnter: () => void;
  onNavigateShowroom?: () => void;
  onNavigateUniversoDark?: () => void;
  onNavigatePublicConsultancy?: () => void;
  onNavigateManual?: () => void;
}

const LandingBriefing: React.FC<LandingBriefingProps> = ({ onEnter, onNavigateShowroom, onNavigateUniversoDark, onNavigatePublicConsultancy, onNavigateManual }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black/10 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-10 w-full">
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter text-black">
          WINF™ PARTNERS
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-10 max-w-6xl mx-auto w-full pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="text-xs md:text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-6">
            W I N F   P A R T N E R S
          </div>
          
          <h2 className="text-5xl md:text-[7rem] font-heading font-black tracking-tighter uppercase leading-[0.9] mb-8">
            <span className="text-black block">O PODER EXIGE</span>
            <span className="text-white/40 italic block mt-2">EXCLUSIVIDADE.</span>
          </h2>

          <p className="text-lg md:text-2xl font-light text-black/60 mb-12 max-w-2xl leading-relaxed">
            Se você chegou até aqui, é porque já possui o perfil para monopolizar o alto padrão. Mas a supremacia exige exclusividade. As frentes de atuação são escassas e a seleção é impiedosa. Reivindique o domínio da sua região antes que as portas se tranquem e a oportunidade caia nas mãos do seu adversário.
          </p>

          <div className="flex flex-col gap-6 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {/* CTA Button */}
              <button 
                onClick={onEnter}
                className="flex-1 bg-black text-white flex items-center justify-between px-8 py-6 hover:bg-black/90 transition-colors group border border-transparent hover:border-black/20 delay-100 shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
              >
                <span className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-left">
                  Acessar o Briefing
                </span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform shrink-0 ml-4" />
              </button>
              
              {onNavigateShowroom && (
                <button 
                  onClick={onNavigateShowroom}
                  className="sm:w-auto bg-white text-black flex items-center justify-center px-8 py-6 hover:bg-black/5 transition-colors group border border-black/10"
                >
                  <span className="font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
                    Ver Arsenal de Soluções
                  </span>
                </button>
              )}

              {onNavigatePublicConsultancy && (
                <button 
                  onClick={onNavigatePublicConsultancy}
                  className="w-full bg-[#050505] text-white border border-zinc-500 flex items-center justify-center px-8 py-4 hover:bg-zinc-900 transition-all group"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.3em] font-black">
                    Visão do Cliente
                  </span>
                </button>
              )}

              {onNavigateUniversoDark && (
                <button 
                  onClick={onNavigateUniversoDark}
                  className="w-full bg-transparent text-zinc-500 border border-zinc-200 flex items-center justify-center px-8 py-4 hover:text-black hover:border-zinc-500 transition-all group"
                >
                  <span className="font-mono text-xs md:text-[10px] uppercase tracking-[0.4em]">
                    Acesso Dark Pool (Investidores)
                  </span>
                </button>
              )}
            </div>

            {/* Audio Player Fake */}
            <div className="w-full bg-black text-white border border-black/10 flex flex-col shadow-2xl overflow-hidden mt-6 relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <div className="p-6 md:p-8 flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-14 h-14 rounded-none border flex items-center justify-center transition-all shrink-0 ${isPlaying ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[0.98]' : 'bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5'}`}
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                
                <div className="flex-1 flex items-center gap-[3px]">
                  {/* Simulated Waveform */}
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-[2px] rounded-none ${isPlaying ? 'bg-white' : 'bg-white/30'}`} 
                      style={{ 
                        height: isPlaying ? `${Math.max(12, Math.random() * 32)}px` : `${i % 2 === 0 ? 16 : 10}px`,
                        transition: 'height 0.1s ease'
                      }}
                    />
                  ))}
                </div>

                <div className="shrink-0 flex flex-col justify-center text-right">
                  <span className="text-xs md:text-[10px] uppercase font-black tracking-[0.3em] text-white mb-1 leading-tight flex flex-col">
                    <span>Briefing</span>
                    <span className="text-white/40">Estratégico</span>
                  </span>
                  <span className="text-[10px] md:text-[8px] uppercase tracking-widest text-green-500 font-mono mt-1 flex items-center justify-end gap-1.5">
                    {isPlaying && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>}
                    01:15 AUDIO INTRO
                  </span>
                </div>
              </div>
              
              {/* Transcript */}
              {isPlaying && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-6 md:px-8 pb-8 text-sm md:text-[11px] md:text-xs font-mono text-white/50 leading-relaxed border-t border-white/10 pt-6"
                >
                  <p className="mb-4 text-white/80">
                    <span className="text-white font-bold">&gt;</span> "O amadorismo implora por atenção, o poder dita as regras do jogo. Se você está aqui, percebeu que a liderança não é discutida, é imposta. Enquanto o restante se digladia por migalhas e destrói margens, os que possuem a verdadeira visão estratégica monopolizam o território."
                  </p>
                  <p className="mb-4">
                    <span className="text-white font-bold">&gt;</span> "Não formamos revendedores; nós armamos impérios. Entregamos a artilharia pesada — tecnologia inatingível e infraestrutura de elite — para que você aniquile a concorrência e se torne a única escolha incontestável do alto nível."
                  </p>
                  <p className="mb-6">
                    <span className="text-white font-bold">&gt;</span> "A hesitação é o declínio. Nossas alianças são escassas, letais e territoriais. Se as portas se fecharem na sua região, você estará irrevogavelmente fora. E pior: nós estaremos do lado do seu maior adversário."
                  </p>
                  <p className="text-white font-bold tracking-widest">
                    <span className="text-green-500">&gt;</span> "Se você possui a fome e a disciplina do poder, o momento de agir é agora. O topo aguarda apenas os implacáveis."
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingBriefing;
