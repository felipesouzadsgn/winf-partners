
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Users, 
  Award, 
  TrendingUp, 
  Gauge, 
  ShieldCheck, 
  Star, 
  Zap, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  Camera,
  Video,
  FileText,
  Smartphone,
  Mail,
  UserPlus,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

const ModuleSquadPerformance: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { 
    user, 
    members, 
    installationJobs, 
    updateInstallationJob, 
    completeJobAndGenerateWarranty,
    addInstallationJob 
  } = useWinf();

  const [activeView, setActiveView] = useState<'roster' | 'jobs' | 'plan'>('roster');
  const [isInviting, setIsInviting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const [newCollab, setNewCollab] = useState({ name: '', email: '', level: '01' });
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [showWarrantySuccess, setShowWarrantySuccess] = useState<string | null>(null);

  const careerLevels = [
    { id: '01', title: 'Nível 01: Operador AeroCore™', pay: 'R$ 30,00/m²', req: 'Iniciante / Treinamento Básico', color: 'text-white/40' },
    { id: '02', title: 'Nível 02: Especialista Técnico', pay: 'R$ 35,00/m²', req: '500m² aplicados + CRM Proficiency', color: 'text-white/40' },
    { id: '03', title: 'Nível 03: Master Applicator Elite', pay: 'R$ 40,00/m²', req: '1.500m² + Taxa Retorno Zero', color: 'text-white/40' }
  ];

  const collaborators = members.filter(m => m.role === 'Collaborator' || m.role === 'Member');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setIsRegistering(false);
    setInviteLink(`https://winf.com/invite/collab/${Math.random().toString(36).substring(7)}`);
    setNewCollab({ name: '', email: '', level: '01' });
  };

  const handleSendInvite = () => {
    setInviteLink(`https://winf.com/invite/restricted/${Math.random().toString(36).substring(7)}`);
  };

  const handleCompleteJob = async (jobId: string) => {
    setIsCompleting(true);
    // Simulate heavy processing for engineering feel
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const result = await completeJobAndGenerateWarranty(jobId);
    setIsCompleting(false);
    
    if (result.success) {
      setShowWarrantySuccess(result.warrantyId || 'W-TEMP-001');
      setSelectedJob(null);
    }
  };

  const currentJob = installationJobs.find(j => j.id === selectedJob);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-xs font-mono uppercase tracking-widest">
            <ChevronLeft size={14} /> Back to Mission Control
          </button>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            SQUAD <span className="text-white">PERFORMANCE</span>
          </h1>
          <p className="text-white/40 text-xs md:text-[10px] mt-1 font-mono uppercase tracking-[0.3em] opacity-60">
            Logística Técnica, Carreira & Gestão de Instalações
          </p>
        </div>
        <div className="flex gap-2 bg-black border border-white/10 p-1 rounded-none">
            {[
              { id: 'roster', label: 'Time & Níveis', icon: Users },
              { id: 'jobs', label: 'Instalações Ativas', icon: Zap },
              { id: 'plan', label: 'Plano de Carreira', icon: Award }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)} 
                className={`px-6 py-2.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeView === tab.id ? 'bg-white text-white shadow-lg shadow-white/20' : 'text-white/40 hover:text-white/60'}`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-6">
          
          {activeView === 'roster' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Colaboradores Ativos</h2>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className="bg-white/10 text-white hover:bg-white hover:text-white px-4 py-2 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> Novo Cadastro
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborators.map(collab => (
                  <div key={collab.id} className="bg-[#0A0A0A] border border-white/5 rounded-none p-6 relative overflow-hidden group hover:border-winf-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center text-white font-black text-xl">
                          {collab.avatar ? <img src={collab.avatar} className="w-full h-full object-cover rounded-none" /> : collab.name[0]}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{collab.name}</h3>
                          <div className="flex items-center gap-2">
                             <span className="text-xs md:text-[10px] font-black text-white uppercase tracking-widest">
                              {collab.collaborator_level || 'Operador'} AeroCore™
                             </span>
                             <span className="w-1 h-1 bg-gray-700 rounded-none"></span>
                             <div className="flex items-center gap-1 text-white/40">
                               <Star size={10} fill="currentColor" />
                               <span className="text-xs md:text-[10px] font-bold">9.8</span>
                             </div>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-600 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                      <div className="p-3 bg-black rounded-none border border-white/5">
                        <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-black tracking-widest mb-1">M² Mes</p>
                        <p className="text-lg font-mono text-white font-bold">145m</p>
                      </div>
                      <div className="p-3 bg-black rounded-none border border-white/5">
                        <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-black tracking-widest mb-1">Carros</p>
                        <p className="text-lg font-mono text-white font-bold">12</p>
                      </div>
                      <div className="p-3 bg-black rounded-none border border-white/5">
                        <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-black tracking-widest mb-1">Economia</p>
                        <p className="text-lg font-mono text-white/40 font-bold">98%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase text-white/40 tracking-widest">
                        <span>Progresso p/ Próximo Nível</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-none overflow-hidden p-0.5">
                        <div className="h-full bg-white rounded-none shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{width: '72%'}}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsInviting(true)}
                className="w-full py-6 border-2 border-dashed border-white/5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white hover:border-winf-primary/30 transition-all flex items-center justify-center gap-3 group"
              >
                <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                Gerar Convite de Acesso Restrito (Alimentação de Sistema)
              </button>
            </div>
          )}

          {activeView === 'jobs' && (
            <div className="space-y-6">
              {!selectedJob ? (
                <div className="grid grid-cols-1 gap-4">
                  {installationJobs.map(job => (
                    <div 
                      key={job.id}
                      onClick={() => setSelectedJob(job.id)}
                      className="bg-[#0A0A0A] border border-white/5 p-6 rounded-none flex items-center justify-between hover:border-winf-primary/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-none flex items-center justify-center ${job.status === 'in_progress' ? 'bg-white/10 text-white' : 'bg-zinc-900 text-gray-600'}`}>
                          <Zap size={24} className={job.status === 'in_progress' ? 'animate-pulse' : ''} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-white font-bold uppercase tracking-tight">{job.vehicle_model}</h4>
                            <span className="text-xs md:text-[10px] font-mono text-gray-600">{job.service_order_id}</span>
                          </div>
                          <p className="text-xs text-white/40">Cliente: <span className="text-white/60">{job.customer_name}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status</p>
                          <span className={`text-xs md:text-[10px] font-black uppercase tracking-widest ${job.status === 'in_progress' ? 'text-white' : 'text-white/40'}`}>
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>
                        <ArrowRight size={20} className="text-gray-700 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden"
                >
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/5 rounded-none transition-colors">
                        <ChevronLeft size={20} />
                      </button>
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Execução de Ordem de Serviço</h3>
                        <p className="text-xs text-white/40 font-mono">{currentJob?.service_order_id} // {currentJob?.vehicle_model}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-white rounded-none animate-pulse"></div>
                       <span className="text-xs md:text-[10px] font-black text-white uppercase tracking-widest">Sincronização Ativa</span>
                    </div>
                  </div>

                  <div className="p-8 space-y-10">
                    {/* Checklist Section */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-white" /> Checklist de Qualidade
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          'Limpeza Molecular Concluída',
                          'Corte Preciso Winf Cut™',
                          'Termo-encolhimento Uniforme',
                          'Acabamento de Bordas OK',
                          'Teste de Rejeição Térmica',
                          'Remoção de Resíduos'
                        ].map(item => (
                          <label key={item} className="flex items-center gap-3 p-4 bg-black border border-white/5 rounded-none cursor-pointer hover:border-winf-primary/30 transition-all">
                            <input type="checkbox" className="w-4 h-4 rounded-none bg-zinc-900 border-white/10 text-white focus:ring-winf-primary" />
                            <span className="text-xs text-white/40 font-bold uppercase">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Measurements Section */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                        <FileText size={16} className="text-white" /> 1. Medições & Dimensões
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {['Para-brisa', 'Laterais', 'Traseiro', 'Teto'].map(part => (
                          <div key={part} className="space-y-2">
                            <label className="text-xs md:text-[10px] font-bold text-gray-600 uppercase">{part}</label>
                            <input 
                              placeholder="0.0m x 0.0m"
                              className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-winf-primary/50 outline-none transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Media Capture Section */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                        <Camera size={16} className="text-white" /> 2. Registro Visual (Fotos & Vídeos)
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="aspect-square bg-zinc-900 border border-dashed border-white/10 rounded-none flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-white hover:border-winf-primary/30 transition-all">
                          <Camera size={24} />
                          <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase">Registrar Foto</span>
                        </button>
                        <button className="aspect-square bg-zinc-900 border border-dashed border-white/10 rounded-none flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-white hover:border-winf-primary/30 transition-all">
                          <Video size={24} />
                          <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase">Registrar Vídeo</span>
                        </button>
                        <div className="aspect-square bg-black border border-white/5 rounded-none flex items-center justify-center">
                           <span className="text-[10px] md:text-[8px] text-gray-700 uppercase font-black">Slot Vazio</span>
                        </div>
                        <div className="aspect-square bg-black border border-white/5 rounded-none flex items-center justify-center">
                           <span className="text-[10px] md:text-[8px] text-gray-700 uppercase font-black">Slot Vazio</span>
                        </div>
                      </div>
                    </div>

                    {/* Observations */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                        <MessageSquare size={16} className="text-white" /> 3. Observações Finais
                      </h4>
                      <textarea 
                        placeholder="Descreva detalhes da instalação, dificuldades ou observações importantes para a garantia..."
                        className="w-full bg-black border border-white/10 rounded-none p-6 text-sm text-white focus:border-winf-primary/50 outline-none transition-all h-32"
                      />
                    </div>

                    {/* Completion Action */}
                    <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={32} className="text-white" />
                        <div>
                          <p className="text-sm font-bold text-white">Garantia Automática Winf™</p>
                          <p className="text-xs md:text-[10px] text-white/40">Ao dar o "OK Final", o sistema gera a garantia baseada nos dados alimentados.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCompleteJob(currentJob!.id)}
                        disabled={isCompleting}
                        className={`w-full md:w-auto px-12 py-4 rounded-none font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isCompleting ? 'bg-gray-800 text-white/40 cursor-not-allowed' : 'bg-white hover:bg-white_hover text-black shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}
                      >
                        {isCompleting ? (
                          <>
                            <Clock size={20} className="animate-spin" />
                            Gerando Garantia...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={20} />
                            Dar OK Final & Gerar Garantia
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeView === 'plan' && (
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-5 md:p-8 space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white">
                  <Award size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Estrutura de Patentes Elite</h3>
                  <p className="text-xs text-white/40">O valor por metro quadrado é desbloqueado através de certificações e volume.</p>
                </div>
              </div>

              <div className="space-y-4">
                {careerLevels.map((lvl, i) => (
                   <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-black border border-white/5 rounded-none hover:border-winf-primary/30 transition-all group">
                      <div className="mb-4 md:mb-0">
                         <h4 className={`text-lg font-black uppercase tracking-tight ${lvl.color}`}>{lvl.title}</h4>
                         <p className="text-xs text-white/40 font-mono">{lvl.req}</p>
                      </div>
                      <div className="text-left md:text-right">
                         <p className="text-2xl font-mono text-white font-bold">{lvl.pay}</p>
                         <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-gray-600 font-black uppercase tracking-widest">Valor Base Sugerido</span>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Performance Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-winf-primary/20 to-transparent border border-winf-primary/30 p-5 md:p-8 rounded-none relative overflow-hidden group">
            <h3 className="text-white font-black text-xs md:text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
              Unit Efficiency <Gauge size={16} className="text-white" />
            </h3>
            
            <div className="text-center mb-10">
               <div className="text-6xl font-mono font-bold text-white mb-2 tabular-nums">R$ 580</div>
               <div className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Lucro Operacional / Hora</div>
            </div>

            <div className="flex justify-between items-center px-4 py-3 bg-black/40 rounded-none border border-white/5">
                <div className="flex items-center gap-2 text-white/40">
                    <TrendingUp size={14} />
                    <span className="text-xs md:text-[10px] font-black uppercase tracking-widest">+12% vs. Last Month</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-600" />
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 p-5 md:p-8 rounded-none space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-white font-black text-xs md:text-[10px] uppercase tracking-[0.3em]">Convite Rápido</h3>
               <Smartphone size={16} className="text-gray-600" />
            </div>
            
            <p className="text-xs text-white/40 leading-relaxed">
              Envie um convite de acesso restrito para um novo colaborador. Ele poderá apenas alimentar o sistema com dados de instalação.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  placeholder="E-mail do colaborador"
                  className="w-full bg-black border border-white/10 rounded-none pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-winf-primary/50 transition-all"
                />
              </div>
              <select className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-xs text-white outline-none focus:border-winf-primary/50 transition-all appearance-none">
                <option>Nível 01: Operador</option>
                <option>Nível 02: Especialista</option>
                <option>Nível 03: Master</option>
              </select>
              <button 
                onClick={handleSendInvite}
                className="w-full bg-white text-black py-4 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white_hover transition-all"
              >
                Enviar Convite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {inviteLink && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInviteLink(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-white/10 rounded-none flex items-center justify-center text-white mx-auto mb-6">
                <UserPlus size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter text-center mb-2">Convite Gerado</h3>
              <p className="text-xs text-white/40 text-center mb-8 uppercase tracking-widest leading-relaxed">
                Envie o link abaixo para o colaborador. O acesso será restrito conforme o nível selecionado.
              </p>
              
              <div className="bg-black border border-white/10 rounded-none p-4 mb-8 flex items-center justify-between gap-4">
                <code className="text-xs md:text-[10px] text-white font-mono truncate">{inviteLink}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    alert("Link copiado!");
                  }}
                  className="text-white hover:text-white transition-colors"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <button 
                onClick={() => setInviteLink(null)}
                className="w-full bg-white text-black py-4 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white_hover transition-all"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}

        {showWarrantySuccess && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWarrantySuccess(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-zinc-700/50 rounded-none p-6 md:p-12 shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-winf-primary to-transparent"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white text-white rounded-none flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <ShieldCheck size={40} />
                </div>
                
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Certificado Gerado</h3>
                <p className="text-white/40 text-xs font-mono uppercase tracking-[0.3em] mb-12">WINF™ MOLECULAR PROTECTION WARRANTY</p>
                
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest">ID da Garantia</p>
                    <p className="text-xl font-mono text-white font-bold">{showWarrantySuccess}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest">Status de Ativação</p>
                    <p className="text-xl font-mono text-white/40 font-bold uppercase">Sincronizado</p>
                  </div>
                </div>

                <div className="w-full p-6 bg-black border border-white/5 rounded-none mb-12 text-left">
                   <p className="text-xs md:text-[10px] text-white/40 leading-relaxed italic">
                     "Este certificado atesta que a instalação foi realizada seguindo os protocolos MIL-SPEC de blindagem térmica Winf™, garantindo a integridade molecular e a rejeição de calor conforme laudo técnico."
                   </p>
                </div>

                <div className="flex gap-4 w-full">
                  <button className="flex-1 bg-white text-black py-4 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    <FileText size={14} /> Imprimir PDF
                  </button>
                  <button 
                    onClick={() => setShowWarrantySuccess(null)}
                    className="flex-1 bg-white text-black py-4 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white_hover transition-all"
                  >
                    Concluir Missão
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {isRegistering && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegistering(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Cadastrar Colaborador</h3>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest">Nome Completo</label>
                  <input 
                    required
                    value={newCollab.name}
                    onChange={e => setNewCollab(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-winf-primary/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest">E-mail Corporativo</label>
                  <input 
                    required
                    type="email"
                    value={newCollab.email}
                    onChange={e => setNewCollab(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-winf-primary/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest">Nível Inicial</label>
                  <select 
                    value={newCollab.level}
                    onChange={e => setNewCollab(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-winf-primary/50 outline-none appearance-none"
                  >
                    {careerLevels.map(lvl => (
                      <option key={lvl.id} value={lvl.id}>{lvl.title}</option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="flex-1 py-4 border border-white/10 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-white text-black py-4 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white_hover transition-all"
                  >
                    Confirmar Cadastro
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSquadPerformance;
