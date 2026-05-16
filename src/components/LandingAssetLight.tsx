import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Briefcase, Zap, Building2, MessageCircle } from 'lucide-react';

interface LandingAssetLightProps {
  onBack: () => void;
}

const LandingAssetLight: React.FC<LandingAssetLightProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Olá! Estou muito interessado no modelo ASSET LIGHT SELECT (Nível 01). Gostaria de entender o potencial comercial para minha região e falar com a expansão.");
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
              <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-black text-[#050505]/40">Licenciamento • Nível 01</span>
            </div>
            <h1 className="text-6xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 text-[#050505]">
              ASSET<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">LIGHT.</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-zinc-600 max-w-4xl leading-snug mb-16">
              Para o profissional de alta performance. <b>Você foca na instalação e no atendimento; nós entregamos a máquina de vendas.</b> Receba leads qualificados, estrutura de marketing de precisão e ative sua própria operação (arquitetura e opcional <i>AeroCore</i> automotivo <i>in-house</i>).
            </p>

            <button 
              onClick={handleWhatsAppContact}
              className="group flex items-center gap-4 bg-[#050505] text-white px-8 py-5 hover:bg-black/80 transition-all font-bold text-xs uppercase tracking-widest"
            >
              FALAR COM EXPANSÃO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pillars - Light Grid Layout */}
      <section className="grid lg:grid-cols-3 border-b border-black/5 relative z-10 bg-[#F9F9F9]">
        {[
          { title: "MÁQUINA DE LEADS MENSAL", desc: "A WINF HQ gera fluxo de clientes (arquitetura e residencial) direto para você. Sua região é ativada no WINF OS e você recebe oportunidades qualificadas diariamente.", icon: Zap },
          { title: "KIT START WINF", desc: "Receba materiais oficiais WINF™ de primeira linha e acesso imediato aos nossos sistemas. Tudo configurado e pronto para você operar de maneira autônoma com chancela internacional.", icon: Briefcase },
          { title: "ONE-PAGE EXCLUSIVA & AEROCORE", desc: "Estrutura online própria de conversão. Atenda projetos arquitetônicos e, se desejar, ative o diferencial AeroCore: instalação de alta performance automotiva na garagem do seu cliente VIP.", icon: Building2 }
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
          <div className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-8">OPERAÇÃO INDEPENDENTE E VALIDADA</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-[#050505]">
            Soluções Que<br />Se Vendem.
          </h2>
          <div className="space-y-6 text-zinc-600 font-light text-lg md:text-xl leading-relaxed">
            <p>
              Você não corre mais atrás de clientes disputando preço na rua. Com a estrutura WINF™ habilitada, os clientes finais chegam através de um ecossistema digital maduro, que já educa o público sobre <b>conforto térmico e refrigeração.</b>
            </p>
            <p>
              Ao estar sob a chancela <b>WINF™</b> e certificado nas melhores práticas de instalação (arquitetura e automotivo), você domina a performance na entrega. Operando com ferramentas avançadas, seu foco é executar com excelência e recolher proventos elevados sem perder tempo com o operacional comercial pesado.
            </p>
          </div>
        </div>
        
        <div className="p-10 md:p-24 bg-[#050505] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="space-y-12 relative z-10">
            <div>
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Margem Líquida</div>
              <div className="text-5xl md:text-6xl font-black text-white">~45%</div>
            </div>
            
            <div>
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Payback Estimado (Retorno)</div>
              <div className="text-5xl md:text-6xl font-black text-white">&lt; 30 dias</div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="text-sm md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Setup / Investimento Inicial</div>
              <div className="text-5xl md:text-6xl font-black text-white">12x R$ 1.500<span className="text-lg font-normal text-zinc-500">*</span></div>
              <div className="text-xs md:text-[10px] text-zinc-500 mt-2 lowercase font-normal">*ou R$ 15.000 à vista</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 text-center bg-white relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-[#050505]">
          Sua capacitação tem um novo destino.
        </h2>
        <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto mb-12">
          As licenças Nível 01 são ativadas mediante análise. Nosso foco é dar tração a profissionais exigentes ou quem deseja ingressar forte no setor de Window Film de alta margem.
        </p>
        <button 
          onClick={handleWhatsAppContact}
          className="group inline-flex items-center gap-4 bg-[#050505] text-white px-6 md:px-10 py-6 hover:bg-black/80 transition-all font-bold text-sm uppercase tracking-widest mx-auto shadow-lg"
        >
          <MessageCircle size={18} /> AGENDAR REUNIÃO DE LICENCIAMENTO
        </button>
      </section>

    </div>
  );
};

export default LandingAssetLight;
