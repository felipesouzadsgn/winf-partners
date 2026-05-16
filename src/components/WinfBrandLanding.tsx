import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Zap,
  Box,
  BarChart,
} from "lucide-react";

const WinfBrandLanding: React.FC<{
  onEnter: () => void;
  onBack?: () => void;
  onNavigateToSynthwave?: () => void;
}> = ({ onEnter, onBack, onNavigateToSynthwave }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black/10">
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors mr-2"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="text-xl md:text-2xl font-black font-heading tracking-tighter cursor-pointer text-black">
            WINF™ BLACKSHOP
          </div>
        </div>
        <button
          onClick={onEnter}
          className="text-xs md:text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold hover:text-zinc-500 transition-colors"
        >
          Acessar a Loja
        </button>
      </nav>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-5xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-zinc-100 text-zinc-500 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] mb-8 font-bold border border-zinc-200">
            WINF™ Lifestyle & Business
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-[8rem] font-heading font-black tracking-tighter uppercase mb-6 leading-[0.9] text-black">
            The Ultimate <br /> Store.
          </h1>
          <p className="text-lg md:text-2xl font-light text-zinc-500 mb-4 tracking-tight max-w-2xl mx-auto">
            O ecossistema definitivo para clientes premium, aspirantes a parceiros e investidores visionários.
          </p>
          <p className="text-sm md:text-base font-light text-zinc-400 mb-12 max-w-2xl mx-auto">
            Do lifestyle WINF™ com produtos de design exclusivo a soluções para se tornar um licenciado oficial ou investir em operações de alta performance. <b>A WINF™ não é apenas uma película. É uma marca.</b>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onEnter}
              className="flex items-center justify-center gap-3 bg-black text-white px-6 md:px-10 py-5 font-bold uppercase text-xs md:text-[10px] tracking-[0.2em] shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all rounded-none w-full sm:w-auto"
            >
              Acessar Blackshop <ShoppingBag size={14} />
            </button>
            {onNavigateToSynthwave && (
              <button
                onClick={onNavigateToSynthwave}
                className="flex items-center justify-center gap-3 bg-white text-black border border-black/10 px-8 py-5 font-bold uppercase text-xs md:text-[10px] tracking-[0.2em] hover:bg-zinc-50 transition-all rounded-none w-full sm:w-auto"
              >
                Explorar SynthWave.FM
              </button>
            )}
          </div>
        </motion.div>

        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-[-1] opacity-5 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </main>

      {/* Feature Showcase Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-zinc-50 rounded-3xl mb-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-black">
            Ecossistema Completo
          </h2>
          <p className="text-zinc-500 font-light max-w-xl mx-auto">
            Desenvolvido como os melhores marketplaces do mundo, direto para sua
            operação.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "WINF™ Lifestyle",
              desc: "Vestuário premium, acessórios e produtos da marca para fãs e clientes VIP.",
              icon: ShoppingBag,
            },
            {
              title: "Seja um Parceiro",
              desc: "Kits de licenciamento, suprimentos iniciais e treinamento oficial WINF™.",
              icon: Box,
            },
            {
              title: "Investidores",
              desc: "Modelos de negócio Kiosk e Studio para equity e lucro rápido.",
              icon: BarChart,
            },
            {
              title: "Masterclass & IA",
              desc: "Consultorias de alta performance, WinfCoins e ferramentas digitais VIP.",
              icon: Zap,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white p-6 md:p-10 border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl relative overflow-hidden flex flex-col items-start hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors text-zinc-900">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight mb-3 text-black">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="h-[60vh] md:h-[80vh] w-full relative mb-24">
        <div className="absolute inset-0 bg-zinc-900">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover mix-blend-luminosity opacity-40 hover:opacity-100 transition-opacity duration-1000"
            alt="White Space"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mix-blend-difference tracking-tighter uppercase px-6 text-center max-w-4xl leading-tight">
            TÃO ELEGANTE QUANTO EFICIENTE
          </h2>
        </div>
      </section>

      <footer className="py-20 text-center flex flex-col items-center justify-center border-t border-zinc-100">
        <div className="text-2xl font-black font-heading tracking-tighter mb-6 text-black">
          WINF™ BLACKSHOP
        </div>
        <p className="text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] font-medium">
          © 2026 WINF INTERNATIONAL GROUP.
        </p>
      </footer>
    </div>
  );
};

export default WinfBrandLanding;
