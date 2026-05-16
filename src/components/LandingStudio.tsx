import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Building2, Crown, LayoutTemplate, MessageCircle } from 'lucide-react';

interface LandingStudioProps {
  onBack: () => void;
}

const LandingStudio: React.FC<LandingStudioProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Olá, acessei a página e tenho interesse absoluto na operação FLAGSHIP STUDIO (Nível 3). Exijo exclusividade regional. Como agendar uma call?");
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black selection:bg-black selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Navigation - Ultra Minimal */}
      <nav className="fixed top-0 w-full z-50 p-6 md:p-8 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#F9F9F9] to-transparent">
        <div className="flex items-center gap-6 pointer-events-auto">
          {onBack && (
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest text-[#050505]/50 hover:text-[#050505] transition-colors bg-white px-4 py-2 border border-black/5 rounded-none shadow-sm"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> VOLTAR
            </button>
          )}
        </div>
        <div className="font-bold tracking-widest text-sm md:text-base uppercase text-[#050505] bg-white/80 px-4 py-2 border border-black/5 backdrop-blur-sm pointer-events-auto">WINF™ LICENSING</div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-24 px-6 md:px-12 border-b border-black/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full -mt-96 -mr-96 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#050505]"></div>
              <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-black text-[#050505]/40">Operação Nível 03 • Domínio Regional</span>
            </div>
            <h1 className="text-6xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 text-[#050505]">
              FLAGSHIP<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">STUDIO.</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-zinc-600 max-w-4xl leading-snug mb-16">
              O ecossistema definitivo. Projetado para atuar como o Hub de Elite da WINF™ na sua capital. Um santuário de arquitetura de alta performance e exclusividade absoluta nas linhas automotivas <i>AeroCore™</i>.
            </p>

            <button 
              onClick={handleWhatsAppContact}
              className="group flex items-center gap-4 bg-[#050505] text-white px-8 py-5 hover:bg-black/80 transition-all font-bold text-xs uppercase tracking-widest"
            >
              SOLICITAR CALL ESTRATÉGICA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pillars - Light Grid Layout */}
      <section className="grid lg:grid-cols-3 border-b border-black/5 relative z-10 bg-[#F9F9F9]">
        {[
          { title: "EQUITY UNIVERSE", desc: "Licenciados Master recebem opções de compra (stock options) da marca global após atingirem o cap de faturamento operacional validado.", icon: Crown },
          { title: "ZONE CONTROL", desc: "Bloqueio de raio total. Você é o único ponto oficial de distribuição e instalação da capital ou região especificada (Público Final & Corporativo).", icon: Building2 },
          { title: "SHOWROOM WINF", desc: "Design interior pré-fabricado da WINF™ Labs: Displays flutuantes, iluminação clínica, piso epóxi militar e um lounge focado em fechar negócios corporativos.", icon: LayoutTemplate }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 md:p-16 border-b lg:border-b-0 border-black/5 bg-white hover:bg-[#F9F9F9] transition-colors ${idx !== 2 ? 'lg:border-r' : ''}`}>
            <item.icon size={28} className="text-[#050505]/40 mb-8" />
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-[#050505]">{item.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Mechanics - Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black/5 bg-white relative z-10">
        <div className="p-10 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/5">
          <div className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-8">UNIDADE HÍBRIDA: AUTO + ARQUITETURA</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-[#050505]">
            Potência <br />Multicanal.
          </h2>
          <div className="space-y-6 text-zinc-600 font-light text-lg md:text-xl leading-relaxed">
            <p>
              Ao ancorar um <b>WINF™ Flagship Studio</b>, você não opera mais uma simples "loja". Você centraliza a demanda corporativa da sua capital e atrai supercarros para o ecossistema <i>AeroCore</i>.
            </p>
            <p>
              A operação permite receber clientes de alto ticket em um ambiente ultra luxuoso, pulverizar a concorrência visualmente e fechar contratos de performance térmica enquanto as equipes WINF™ OS operam do sistema.
            </p>
          </div>
        </div>
        
        <div className="p-10 md:p-24 bg-[#050505] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="space-y-12 relative z-10">
            <div>
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Margem Líquida Alvo (Automotivo + Arquitetura)</div>
              <div className="text-5xl md:text-6xl font-black text-white">&gt; 35%</div>
            </div>
            
            <div>
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Payback Estimado (Retorno de Caixa)</div>
              <div className="text-5xl md:text-6xl font-black text-white">24-36 Meses</div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Capex Base (Investimento de Infraestrutura)</div>
              <div className="text-5xl md:text-6xl font-black text-white">R$ 250.000<span className="text-lg font-normal text-zinc-500">*</span></div>
              <div className="text-xs md:text-[10px] text-[#050505] bg-white/80 px-2 py-0.5 mt-2 rounded inline-block uppercase font-bold tracking-widest">Acesso a linhas de crédito especiais</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 text-center bg-white relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-[#050505]">
          Não vendemos franquias.<br/> Aceitamos parceiros.
        </h2>
        <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto mb-12">
          O nível Flagship passa por uma rigorosa análise de crédito, perfil agressivo de negócios e alinhamento cultural com o WINF Board antes de ceder o direito territorial.
        </p>
        <button 
          onClick={handleWhatsAppContact}
          className="group inline-flex items-center gap-4 bg-[#050505] text-white px-6 md:px-10 py-6 hover:bg-black/80 transition-all font-bold text-sm uppercase tracking-widest mx-auto shadow-lg"
        >
          <MessageCircle size={18} /> SOLICITAR AUDIÊNCIA PRESENCIAL
        </button>
      </section>

    </div>
  );
};

export default LandingStudio;
