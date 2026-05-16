import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Shield, Target, LayoutDashboard, Briefcase, ChevronRight } from 'lucide-react';

interface LandingPartnersCorporateProps {
  onBack: () => void;
}

const LandingPartnersCorporate: React.FC<LandingPartnersCorporateProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Olá, acesso restrito pelo portal. Tenho interesse na operação WINF PARTNERS CORPORATE. Gostaria de solicitar análise do meu dossiê.");
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Navbar Minimal */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Retornar
        </button>
        <div className="font-medium tracking-widest text-sm text-white">WINF™ <span className="text-white/50">PARTNERS</span></div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 z-0">
           {/* Minimal glow or no glow for starlink feel */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-transparent text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/70 mb-8">
              <Briefcase size={12} className="text-white/70" />
              Ecossistema B2B de Alta Performance
           </div>
           
           <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
             WINF <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">PARTNERS.</span>
           </h1>

           <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-4xl mx-auto mb-16">
             Formamos a elite do controle térmico B2B no Brasil. <b className="text-white font-medium">Rede neural corporativa</b> exclusiva para investidores e integradores. Apenas convidados ou aprovados em análise de board.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto">
              <button 
                onClick={handleWhatsAppContact}
                className="flex-1 py-5 bg-white text-black shrink-0 text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle size={16} /> Submeter Dossiê
              </button>
              <div className="flex-1 flex flex-col justify-center items-center px-6 py-5 border border-white/20 bg-transparent text-xs md:text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                <span className="text-white/50 mb-1">Acesso Restrito</span>
                <span className="text-lg tracking-[0.2em] font-light">INVITE ONLY</span>
              </div>
           </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-10 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
          {[
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
          ].map((img, i) => (
             <div key={i} className="aspect-[3/4] relative overflow-hidden group border border-white/5">
               <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-[4s] group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80`} style={{backgroundImage: `url(${img})`}}></div>
               <div className="absolute inset-0 bg-black/60 group-hover:bg-white/5 transition-colors"></div>
             </div>
          ))}
        </div>
      </section>

      {/* Corporate Features */}
      <section className="py-32 border-b border-white/10 bg-black">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-20 text-center text-white">Domínio B2B.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center lg:text-left">
              {[
                { icon: LayoutDashboard, title: "Plataforma Connect", desc: "Painel exclusivo para cotação em escala, aprovação de crédito corporativo B2B e emissão de ARTs instantâneas." },
                { icon: Target, title: "Hub de Engenharia", desc: "Acesso direto aos N1 da WINF para elaboração de especificações técnicas para licitações e construtoras." },
                { icon: Shield, title: "Linha Architect Pro", desc: "Acesso restrito The Vault. Portfólio de películas arquitetônicas da linha Elite com bloqueio IR/UV superior." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start group">
                   <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-white group-hover:text-black transition-colors rounded-none">
                     <item.icon size={20} className="text-white group-hover:text-black transition-colors" />
                   </div>
                   <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">{item.title}</h3>
                   <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* VIP Access CTA */}
      <section className="py-40 bg-[#000000] relative overflow-hidden">
         <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1542451313056-b7f525bf40cc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03] grayscale"></div>
         <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
           <div className="text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-8">WINF Executive Board</div>
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-white">Seu network. <br/>Nossa infraestrutura.</h2>
           <p className="text-lg text-white/50 mb-14 font-light leading-relaxed">
             Os parceiros WINF interagem diretamente no W.A.R.P. Command para fechar grandes contratos. Se você possui acessos em empresas de facilities, construtoras e arquitetura corporativa, esta é sua operação.
           </p>
           
           <button 
             onClick={handleWhatsAppContact}
             className="mx-auto px-12 py-5 border border-white/30 text-white shrink-0 text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 backdrop-blur-md"
           >
             <MessageCircle size={16} /> Iniciar Auditoria de Perfil
           </button>
         </div>
      </section>
    </div>
  );
};

export default LandingPartnersCorporate;
