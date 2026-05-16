import React, { useState } from 'react';
import { ArrowLeft, Building2, Send, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArchitectRegistrationProps {
  onBack: () => void;
}

const ArchitectRegistration: React.FC<ArchitectRegistrationProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    office: '',
    cau: '',
  });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fallback if they click without filling out the form
    let message = `Olá, Equipe Winf Partners! Gostaria de cadastrar meu escritório de arquitetura na plataforma.`;
    
    if (formData.name) {
      if (formData.office) {
        message = `Olá, Equipe Winf Partners! Sou ${formData.name} do escritório ${formData.office}. Gostaria de solicitar meu cadastro gratuito na plataforma WINF para arquitetos.`;
      } else {
        message = `Olá, Equipe Winf Partners! Sou ${formData.name}. Gostaria de solicitar meu cadastro gratuito na plataforma WINF para arquitetos.`;
      }
    }
    
    if (formData.cau) {
        message += ` Meu CAU é o ${formData.cau}.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5513999191510"; // Comercial WhatsApp from your other modules
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between border-b border-white/5 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-xs md:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-white/40" />
          <span className="text-xs md:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40">Portal do Arquiteto</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
          
          {/* Left Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-8 w-fit">
              <Building2 size={12} /> Partner Program
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 italic leading-[0.9]">
              ACESSO <span className="text-white/40">EXCLUSIVO</span> <br/> PARA ARQUITETOS.
            </h1>
            
            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-8">
              O ecossistema WINF™ Partners conecta seu escritório à tecnologia de ponta em engenharia molecular. Ofereça blindagem e controle solar de alta performance, maximize a lucratividade dos seus projetos e destaque-se no mercado.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm md:text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-none"></div>
                Catálogo de Especificações 3D
              </div>
              <div className="flex items-center gap-4 text-sm md:text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-none"></div>
                Cálculo Automático de ROI Energético
              </div>
              <div className="flex items-center gap-4 text-sm md:text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-none"></div>
                Programa de Benefícios W-Partners
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 relative"
          >
            {/* Form Glitch Effects */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/20"></div>

            <div className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-2">Solicitar Cadastro</h2>
              <p className="text-xs text-white/40 font-medium">Preencha rapidamente para direcionarmos seu fluxo via WhatsApp diretamente com a matriz WINF™.</p>
            </div>

            <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block">Seu Nome / Arquiteto Responsável</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: João Silva"
                  className="w-full bg-[#111] border border-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block">Nome do Escritório</label>
                <input 
                  type="text" 
                  required
                  value={formData.office}
                  onChange={e => setFormData({ ...formData, office: e.target.value })}
                  placeholder="Ex: Studio JS Arquitetura"
                  className="w-full bg-[#111] border border-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block">CAU (Opcional)</label>
                <input 
                  type="text" 
                  value={formData.cau}
                  onChange={e => setFormData({ ...formData, cau: e.target.value })}
                  placeholder="Número de Registro"
                  className="w-full bg-[#111] border border-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black py-4 mt-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 group"
              >
                Falar com a Central WINF™
                <Zap size={14} className="group-hover:scale-110 transition-transform" />
              </button>

              <div className="pt-6 border-t border-white/5 flex items-start gap-4">
                <ShieldCheck size={20} className="text-white/20 shrink-0" />
                <p className="text-xs md:text-[10px] text-white/40 leading-relaxed">Ao prosseguir, você será redirecionado para o WhatsApp Comercial da WINF Partners para concluir sua triagem e aprovação de parceiro.</p>
              </div>
            </form>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default ArchitectRegistration;
