
import React, { useState } from 'react';
import { 
  ChevronLeft, Loader, ArrowRight, User, MapPin, Phone, 
  Mail, Shield, Palette, Box, TrendingUp, MoreHorizontal,
  CheckCircle2, Sparkles, Zap
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { ViewState } from '../types';

interface AccessFormProps {
  onBack: () => void;
  onSuccess?: () => void;
}

const AccessForm: React.FC<AccessFormProps> = ({ onBack, onSuccess }) => {
  const { addLead, gamify } = useWinf();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    state: '',
    whatsapp: '',
    email: '',
    actuaComo: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activationProgress, setActivationProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (name: string) => setFocusedField(name);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!formData.fullName || !formData.city || !formData.state || !formData.whatsapp) {
      setError('Required fields are missing. Please complete the form.');
      setIsSubmitting(false);
      return;
    }

    const leadContact = formData.whatsapp + (formData.email ? ` | ${formData.email}` : '');
    const leadInterest = `Atua como: ${formData.actuaComo || 'Não informado'} | Local: ${formData.city}/${formData.state}`.trim();

    try {
      // Simulate/Add Lead
      await addLead({
        name: formData.fullName,
        contact: leadContact,
        source: 'Partner Onboarding',
        interest: leadInterest,
        status: 'Active',
        ai_score: 95, 
      });

      gamify('LEAD_ADDED');
      
      // Start Immersive Activation
      setIsSubmitting(false);
      setIsActivating(true);
      
      // Progress simulation
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            if (onSuccess) onSuccess();
          }, 800);
        }
        setActivationProgress(progress);
      }, 150);

    } catch (e: any) { 
      setError(`Connection error: ${e.message || 'Check your network connection.'}`);
      setIsSubmitting(false);
    }
  };

  if (isActivating) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-white animate-fade-in relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-winf-primary/20 to-transparent opacity-50" />
               <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Configuring Workspace</h2>
            <p className="text-zinc-500 text-sm">Provisioning your Winf™ environment...</p>
          </div>

          <div className="space-y-6">
            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out"
                style={{ width: `${Math.min(activationProgress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_1s_infinite]" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { threshold: 10, label: `Verifying coordinates in ${formData.city}` },
                { threshold: 45, label: 'Syncing with Alpha Board' },
                { threshold: 80, label: 'Granting Partner Access' }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                    activationProgress > step.threshold 
                      ? 'text-zinc-300 opacity-100 translate-x-0' 
                      : 'text-zinc-700 opacity-0 -translate-x-4'
                  }`}
                >
                  {activationProgress > step.threshold + 15 ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Loader className="w-4 h-4 text-zinc-500 animate-spin" />
                  )}
                  {step.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col font-sans text-white selection:bg-white/30 relative">
      {/* Subtle modern grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40">
          <Zap size={14} className="text-white" />
          <span>Winf™ Partners</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10 w-full animate-fade-in">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          
          {/* Left Column - Copy & Value Prop */}
          <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Acesso Exclusivo
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
                Junte-se ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Ecossistema.</span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed">
                Acesse o hub de elite Winf™. Este formulário não garante aprovação imediata; cada perfil é avaliado estrategicamente.
              </p>
            </div>

            <div className="space-y-6">
              {[
                 { icon: <Shield size={20} />, title: "Licenciamento Restrito", desc: "Apenas parceiros homologados por região." },
                 { icon: <TrendingUp size={20} />, title: "Crescimento Escalável", desc: "Acesso a ferramentas de gestão e IA proprietária." },
                 { icon: <Box size={20} />, title: "Produtos Premium", desc: "Supply chain direto e margens exclusivas." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-zinc-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Atuação Options */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-300">Como você deseja atuar?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { id: 'Aplicador de películas', label: 'Aplicador' },
                      { id: 'Arquiteto/Designer', label: 'Arquiteto' },
                      { id: 'Vidraceiro', label: 'Vidraceiro' },
                      { id: 'Investidor', label: 'Investidor' },
                      { id: 'Outro', label: 'Outro' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, actuaComo: option.id }))}
                        className={`px-4 py-3 text-sm font-medium rounded-none border transition-all duration-200 text-left flex items-center justify-between group ${
                          formData.actuaComo === option.id 
                            ? 'bg-white/10 border-winf-primary/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-zinc-200'
                        }`}
                      >
                        {option.label}
                        {formData.actuaComo === option.id && (
                           <CheckCircle2 size={16} className="text-white animate-in zoom-in" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="fullName" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                          Nome Completo
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('fullName')}
                            onBlur={handleBlur}
                            className={`w-full bg-[#1A1A1A] border rounded-none px-4 py-3 text-sm text-white outline-none transition-all duration-200 ${
                              focusedField === 'fullName' ? 'border-winf-primary/50 ring-2 ring-winf-primary/20' : 'border-white/10 hover:border-white/20'
                            }`}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label htmlFor="whatsapp" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                          WhatsApp
                        </label>
                        <div className="relative group">
                          <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            onFocus={() => handleFocus('whatsapp')}
                            onBlur={handleBlur}
                            className={`w-full bg-[#1A1A1A] border rounded-none px-4 py-3 text-sm text-white outline-none transition-all duration-200 ${
                              focusedField === 'whatsapp' ? 'border-winf-primary/50 ring-2 ring-winf-primary/20' : 'border-white/10 hover:border-white/20'
                            }`}
                            placeholder="(DDD) 90000-0000"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                        Email Profissional
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className={`w-full bg-[#1A1A1A] border rounded-none px-4 py-3 text-sm text-white outline-none transition-all duration-200 ${
                            focusedField === 'email' ? 'border-winf-primary/50 ring-2 ring-winf-primary/20' : 'border-white/10 hover:border-white/20'
                          }`}
                          placeholder="nome@empresa.com"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-[2fr_1fr] gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="city" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onFocus={() => handleFocus('city')}
                          onBlur={handleBlur}
                          className={`w-full bg-[#1A1A1A] border rounded-none px-4 py-3 text-sm text-white outline-none transition-all duration-200 ${
                            focusedField === 'city' ? 'border-winf-primary/50 ring-2 ring-winf-primary/20' : 'border-white/10 hover:border-white/20'
                          }`}
                          placeholder="Sua cidade"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="state" className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                          UF
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          onFocus={() => handleFocus('state')}
                          onBlur={handleBlur}
                          maxLength={2}
                          className={`w-full bg-[#1A1A1A] border rounded-none px-4 py-3 text-sm text-white outline-none transition-all duration-200 uppercase ${
                            focusedField === 'state' ? 'border-winf-primary/50 ring-2 ring-winf-primary/20' : 'border-white/10 hover:border-white/20'
                          }`}
                          placeholder="SP"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-none flex items-start gap-3 text-red-500 text-sm animate-in fade-in slide-in-from-bottom-2">
                    <Loader className="w-5 h-5 shrink-0 rotate-45" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4 flex-col-reverse sm:flex-row">
                  <p className="text-xs text-zinc-500 max-w-[200px] text-center sm:text-left">
                    Suas informações estão seguras e criptografadas de ponta a ponta.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold text-sm rounded-none hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                  >
                    {isSubmitting ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      <>
                        Solicitar Acesso
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessForm;
