
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, TrendingUp, CheckCircle, ArrowRight, Shield, Cpu, Zap, Star } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
}

type Persona = 'aplicador' | 'arquiteto' | 'investidor' | 'colaborador' | null;

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, initialTier }) => {
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<Persona>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    experience: ''
  });

  const personas = [
    {
      id: 'aplicador',
      title: 'Aplicador / Técnico',
      desc: 'Busco certificação e acesso ao lineup WINF™ para meus serviços.',
      icon: <Zap size={24} />,
      color: 'blue'
    },
    {
      id: 'arquiteto',
      title: 'Arquiteto / Especificador',
      desc: 'Quero integrar a tecnologia WINF™ em meus projetos de alto padrão.',
      icon: <Building2 size={24} />,
      color: 'purple'
    },
    {
      id: 'investidor',
      title: 'Investidor / Empresário',
      desc: 'Interesse em licenciamento regional ou expansão de unidades.',
      icon: <TrendingUp size={24} />,
      color: 'amber'
    },
    {
      id: 'colaborador',
      title: 'Colaborador / Equipe',
      desc: 'Sou parte de uma unidade licenciada e busco minhas credenciais.',
      icon: <User size={24} />,
      color: 'white'
    }
  ];

  const handlePersonaSelect = (id: Persona) => {
    setPersona(id);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // In a real app, send data to backend/CRM
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-none overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            {/* Header */}
            <div className="absolute top-0 right-0 p-5 md:p-8 z-20">
              <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 md:p-16">
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-white/40 mb-8">
                    <Shield size={10} /> Protocolo de Entrada
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                    Como você quer<br/>operar na WINF™?
                  </h3>
                  <p className="text-white/40 text-sm font-light mb-12">
                    Selecione seu perfil para que possamos direcionar o atendimento técnico correto para o seu nível de atuação.
                  </p>

                  <div className="space-y-4">
                    {personas.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handlePersonaSelect(p.id as Persona)}
                        className="w-full group flex items-center gap-6 p-6 bg-black border border-white/5 rounded-none hover:bg-white/[0.05] hover:border-white/20 transition-all text-left"
                      >
                        <div className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                          {p.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{p.title}</h4>
                          <p className="text-white/30 text-sm md:text-[11px] leading-relaxed">{p.desc}</p>
                        </div>
                        <ArrowRight size={16} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in">
                  <button onClick={() => setStep(1)} className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-8 hover:text-white transition-colors flex items-center gap-2">
                    ← Voltar
                  </button>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    Dados de Acesso
                  </h3>
                  <p className="text-white/40 text-sm font-light mb-10">
                    Preencha os dados para análise do seu perfil {persona}.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Tiago Silva"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">E-mail Profissional</label>
                        <input 
                          required
                          type="email" 
                          placeholder="contato@empresa.com"
                          className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">WhatsApp</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="(00) 00000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Cidade / Estado</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: São Paulo, SP"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>

                    {persona === 'colaborador' && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Unidade / Licenciado Responsável</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Ex: WINF™ São Paulo Sul"
                          className="w-full bg-white/5 border border-white/20 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                    )}
                    
                    <button 
                      type="submit"
                      className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-none hover:bg-white/90 transition-all mt-8"
                    >
                      Solicitar Credenciamento
                    </button>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-6 md:py-10 animate-fade-in">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-white mx-auto mb-10">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                    Protocolo<br/>Registrado.
                  </h3>
                  <p className="text-white/40 text-sm font-light mb-12 max-w-sm mx-auto">
                    Seus dados foram enviados para o W.A.R.P. Command. Um especialista entrará em contato via WhatsApp para os próximos passos da sua jornada WINF™.
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 border border-white/10 text-white font-black text-xs md:text-[10px] uppercase tracking-[0.3em] rounded-none hover:bg-white hover:text-black transition-all"
                  >
                    Fechar Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-none blur-[100px]"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;
