import React, { useEffect, useState } from 'react';
import { 
  Activity,
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Zap,
  FileText, 
  ChevronRight,
  Scissors,
  Award,
  Search,
  MessageSquare,
  PackageSearch,
  Clock,
  Target,
  ShoppingBag,
  Headphones,
  Briefcase,
  Filter,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { ViewState } from '../types';
import { MetricSkeleton, LeadItemSkeleton } from './ui/LoadingSkeleton';
import { DashboardTutorial } from './DashboardTutorial';

interface DashboardWinfProps {
    user: any;
    data: any;
    onChangeView: (view: ViewState) => void;
}

const ProtocolStep = ({ icon: Icon, label, status, onClick, isActive }: any) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex-1 min-w-[140px] p-6 border transition-all relative overflow-hidden flex flex-col items-start group rounded-sm text-left ${isActive ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'bg-[#050505] border-white/10 hover:border-white/30 text-white hover:bg-[#0A0A0A]'}`}
  >
    <div className={`w-10 h-10 flex items-center justify-center mb-5 rounded-full border transition-colors ${isActive ? 'border-black/20 text-black' : 'border-white/10 text-white/40 group-hover:text-white'}`}>
      <Icon size={18} strokeWidth={1.5} />
    </div>
    <div className="space-y-1 w-full relative z-10">
      <p className={`text-[10px] md:text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-black/50' : 'text-white/40 group-hover:text-white/60'}`}>{status}</p>
      <h3 className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-black' : 'text-white'}`}>{label}</h3>
    </div>
    <ArrowUpRight size={14} className={`absolute top-6 right-6 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isActive ? 'text-black/40' : 'text-white/20 group-hover:text-white'}`} />
  </motion.button>
);

const MetricSmall = ({ label, value, icon: Icon, isLoading, onClick }: any) => {
  if (isLoading) return <div className="h-24 bg-[#050505] animate-pulse border border-white/5 rounded-sm"></div>;
  
  const isClickable = !!onClick;
  
  return (
    <div 
      onClick={isClickable ? onClick : undefined}
      className={`bg-[#050505] border border-white/5 p-6 flex flex-col justify-between rounded-sm min-h-[100px] ${isClickable ? 'cursor-pointer hover:border-white/30 hover:bg-[#0A0A0A] transition-all group relative overflow-hidden' : ''}`}
    >
      <div className="flex justify-between items-start mb-2 relative z-10">
        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">{label}</p>
        <Icon size={16} className={`text-white/20 ${isClickable ? 'group-hover:text-white transition-colors' : ''}`} />
      </div>
      <p className="text-2xl font-light tracking-tight text-white relative z-10">{value}</p>
      
      {isClickable && (
          <div className="mt-3 flex items-center text-[10px] md:text-[8px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white transition-colors relative z-10">
              <ArrowUpRight size={10} className="mr-1" /> Acessar Módulo
          </div>
      )}
    </div>
  );
};

const DashboardWinf: React.FC<DashboardWinfProps> = ({ user, onChangeView }) => {
  const { leads, fetchUserPerformanceMetrics, isLoading, effectiveRole } = useWinf();
  const [showTutorial, setShowTutorial] = useState(false);
  
  const currentRole = effectiveRole || user?.role || 'Guest';
  const isAdmin = currentRole === 'Admin';
  const isLicenciado = currentRole === 'Licenciado';
  const isAuthorized = isAdmin || isLicenciado;
  
  useEffect(() => { 
    fetchUserPerformanceMetrics(); 
    const hasSeen = localStorage.getItem('winf_tutorial_seen');
    if (!hasSeen) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    localStorage.setItem('winf_tutorial_seen', 'true');
    setShowTutorial(false);
  };

  const highPriorityLeads = leads.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {showTutorial && <DashboardTutorial userName={user?.name || 'Parceiro'} onClose={handleCloseTutorial} />}
      </AnimatePresence>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 pb-12"
      >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-4 bg-white/5 px-3 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Sistema Operante
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Hub Corporativo
              </h1>
              <p className="text-white/50 text-sm font-light mt-2 tracking-wide">Bem-vindo, {user?.name}. Aqui você tem a visão gerencial da sua operação.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-1/2">
              <MetricSmall label="Faturamento Mensal" value="R$ 42.5k" icon={DollarSign} isLoading={isLoading} onClick={() => onChangeView(ViewState.MODULE_FINANCIAL)} />
              <MetricSmall label="Negócios Ativos" value={leads.length} icon={Briefcase} isLoading={isLoading} onClick={() => onChangeView(ViewState.MODULE_CAPTURE)} />
              <MetricSmall label="Ticket Médio" value="R$ 2.4K" icon={Target} isLoading={isLoading} />
            </div>
          </div>

          {/* Primary Flow */}
          <motion.div variants={itemVariants} className="space-y-5">
             <div className="flex items-center gap-4">
                <h3 className="text-xs md:text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Fluxo Operacional WINF™</h3>
                <div className="flex-1 h-px bg-white/5"></div>
             </div>
             <div className="flex flex-wrap lg:flex-nowrap gap-4">
                <ProtocolStep 
                  icon={Search} 
                  label="Start Digital" 
                  status="CAPTAÇÃO" 
                  onClick={() => onChangeView(ViewState.MODULE_CAPTURE)} 
                  isActive={leads.some(l => l.status === 'Novo')}
                />
                <ProtocolStep 
                  icon={FileText} 
                  label="Contratos Elite" 
                  status="ORÇAMENTOS" 
                  onClick={() => onChangeView(ViewState.MODULE_QUOTES)} 
                />
                <ProtocolStep 
                  icon={Scissors} 
                  label="Precision" 
                  status="OTIMIZAÇÃO" 
                  onClick={() => onChangeView(ViewState.MODULE_WINF_CUT)} 
                />
                <ProtocolStep 
                  icon={Clock} 
                  label="Deployment" 
                  status="LOGÍSTICA" 
                  onClick={() => onChangeView(ViewState.MODULE_INSTALLATIONS)} 
                  isActive={true}
                />
                <ProtocolStep 
                  icon={Award} 
                  label="Garantia" 
                  status="CERTIFICAÇÃO" 
                  onClick={() => onChangeView(ViewState.WARRANTY)} 
                />
             </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Quick Access Kit - Bento Grid Style */}
              <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
                  <div className="bg-[#050505] border border-white/5 p-4 md:p-6 rounded-[2rem] overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-[-10%] w-64 h-64 bg-zinc-900/50 blur-[80px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center mb-6 pl-2">
                       <h3 className="text-xl font-medium tracking-tight text-white">Central WINF</h3>
                       <span className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full">OS v2.0</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                      {[
                        { 
                          title: 'Vendas & CRM', 
                          subtitle: 'Funil de Alta Conversão', 
                          stat: '14 Novos', 
                          icon: Filter, 
                          view: ViewState.SALES_FUNNEL, 
                          colSpan: 2, 
                          gradient: 'from-green-500/20 via-green-500/5 to-transparent',
                          border: 'border-green-500/30'
                        },
                        { 
                          title: 'Caixa', 
                          subtitle: 'Fluxo 24h', 
                          icon: DollarSign, 
                          view: ViewState.MODULE_FINANCIAL,
                          gradient: 'from-white/10 to-transparent',
                          border: 'border-white/10'
                        },
                        { 
                          title: 'Agenda', 
                          subtitle: 'Instalações', 
                          icon: Clock, 
                          view: ViewState.MODULE_INSTALLATIONS,
                          gradient: 'from-white/10 to-transparent',
                          border: 'border-white/10'
                        },
                        { 
                          title: 'Tático', 
                          subtitle: 'Estratégia Local', 
                          icon: Zap, 
                          view: ViewState.MODULE_ARSENAL,
                          gradient: 'from-zinc-900 to-black',
                          border: 'border-white/10'
                        },
                        { 
                          title: 'Estoque', 
                          subtitle: 'Bobinas & Kits', 
                          icon: Package, 
                          view: ViewState.MODULE_STOCK,
                          gradient: 'from-zinc-900 to-black',
                          border: 'border-white/10'
                        },
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => onChangeView(item.view)}
                          className={`flex flex-col text-left transition-all rounded-3xl border ${item.border} bg-gradient-to-br ${item.gradient} overflow-hidden group hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60 focus:outline-none focus:ring-2 focus:ring-green-500/30 ${
                            item.colSpan === 2 ? 'col-span-2 p-5 pb-6' : 'p-4 pb-5 md:p-5 md:pb-6'
                          }`}
                        >
                          <div className={`mb-auto w-full flex justify-between items-start ${item.colSpan === 2 ? 'mb-6' : 'mb-4'}`}>
                            <div className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 group-hover:bg-black/80 transition-colors">
                              <item.icon size={item.colSpan === 2 ? 24 : 22} className={`${item.colSpan === 2 ? 'text-green-400' : 'text-white/80 group-hover:text-white'} transition-colors`} />
                            </div>
                            {item.stat && (
                              <span className="text-sm md:text-[11px] font-bold tracking-wider text-green-400 bg-green-500/10 px-3 py-1 rounded-full uppercase border border-green-500/20">
                                {item.stat}
                              </span>
                            )}
                          </div>
                          
                          <div className="w-full">
                            <span className={`block font-medium tracking-tight mb-1 ${item.colSpan === 2 ? 'text-xl sm:text-2xl text-white' : 'text-base sm:text-lg text-white/90 group-hover:text-white'}`}>
                              {item.title}
                            </span>
                            <span className={`block text-xs ${item.colSpan === 2 ? 'text-green-500/80 font-medium' : 'text-white/50 group-hover:text-white/70'}`}>
                              {item.subtitle}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Secondary Tools Area */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {[
                        { title: 'Catálogo PRO', icon: ShoppingBag, view: ViewState.PRODUCTS_CATALOG },
                        { title: 'Winf Labs', icon: PackageSearch, view: ViewState.MODULES },
                      ].map((sub, idx) => (
                        <button
                          key={`sub-${idx}`}
                          onClick={() => onChangeView(sub.view)}
                          className="flex items-center gap-3 p-4 bg-zinc-900/40 hover:bg-zinc-800/80 rounded-[1.5rem] border border-white/5 transition-all group"
                        >
                          <sub.icon size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                          <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{sub.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ADMIN EXCLUSIVE: EXPANSION & MISSION CONTROL */}
                  {isAdmin && (
                    <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={64}/></div>
                      <h3 className="text-xl font-light tracking-tight text-white mb-2 relative z-10 flex items-center gap-2">
                        Painel da Matriz
                      </h3>
                      <p className="text-xs text-white/40 font-light mb-6">Gestão avançada e Hunting de Licenciados</p>
                      
                      <div className="space-y-3 relative z-10">
                        <button 
                          onClick={() => onChangeView(ViewState.MODULE_MEMBERS)}
                          className="w-full p-4 flex items-center justify-between bg-black/50 border border-white/10 hover:border-white/30 transition-all group/item rounded-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-white/40 group-hover/item:text-white transition-colors">
                              <Target size={16} className="text-red-400" />
                            </div>
                            <span className="text-xs font-medium tracking-wide text-white/90 group-hover/item:text-white transition-colors">Winf CRM (Expansão)</span>
                          </div>
                          <ArrowUpRight size={14} className="text-white/20 group-hover/item:text-white transition-colors" />
                        </button>
                        
                        <button 
                          onClick={() => onChangeView(ViewState.MODULE_MISSION_CONTROL)}
                          className="w-full p-4 flex items-center justify-between bg-black/50 border border-white/10 hover:border-white/30 transition-all group/item rounded-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-white/40 group-hover/item:text-white transition-colors">
                              <Activity size={16} className="text-blue-400" />
                            </div>
                            <span className="text-xs font-medium tracking-wide text-white/90 group-hover/item:text-white transition-colors">Mission Control (Leads)</span>
                          </div>
                          <ArrowUpRight size={14} className="text-white/20 group-hover/item:text-white transition-colors" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Monthly Goal Tracker */}
                  <div className="bg-[#050505] border border-white/5 p-5 md:p-8 rounded-sm">
                     <div className="flex justify-between items-center mb-6">
                       <h4 className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Meta de Faturamento</h4>
                       <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/50 bg-white/5 px-2 py-1 rounded-sm">R$ 58.000 / R$ 80.000</span>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-3xl font-light tracking-tight">72%</span>
                          <span className="text-xs text-white/40 tracking-wide font-light">Fechamento</span>
                        </div>
                        <div className="w-full h-1 bg-[#1A1A1A] overflow-hidden rounded-full">
                          <motion.div 
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: '72%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                     </div>
                  </div>
              </motion.div>

              {/* Radar Activity */}
              <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h3 className="text-lg font-light text-white tracking-tight">Oportunidades em Abertas</h3>
                      <button onClick={() => onChangeView(ViewState.MODULE_CAPTURE)} className="text-xs md:text-[10px] text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest">Ver Todas</button>
                  </div>
                  <div className="bg-[#050505] border border-white/5 shadow-2xl flex-1 rounded-sm overflow-hidden">
                      {isLoading ? (
                          <div className="divide-y divide-white/[0.03]">
                              <LeadItemSkeleton />
                              <LeadItemSkeleton />
                              <LeadItemSkeleton />
                          </div>
                      ) : (
                          <div className="divide-y divide-white/5">
                            {highPriorityLeads.map((lead) => (
                                <div 
                                    key={lead.id} 
                                    onClick={() => onChangeView(ViewState.MODULE_CAPTURE)}
                                    className="p-6 flex items-center justify-between hover:bg-[#0A0A0A] transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-2 h-2 rounded-full ${lead.dominance_score > 80 ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'bg-white/20'}`}></div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors tracking-wide truncate">{lead.name}</p>
                                            <p className="text-xs md:text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1.5 truncate">{lead.interest} • {lead.source}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-lg font-light text-white leading-none">{lead.dominance_score}%</p>
                                            <p className="text-[10px] md:text-[8px] text-white/40 font-bold uppercase tracking-widest mt-1">Acerto</p>
                                        </div>
                                        <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            ))}
                          </div>
                      )}
                  </div>

                  {/* Neural Feed - Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                    <div className="bg-[#0A0A0A] border border-white/5 p-6 flex items-center gap-5 rounded-sm relative overflow-hidden">
                      <div className="w-10 h-10 bg-[#111] rounded-full flex items-center justify-center text-white/40 z-10 border border-white/5">
                        <Activity size={18} />
                      </div>
                      <div className="relative z-10 flex-1">
                        <h5 className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Intelligence Insight</h5>
                        <p className="text-xs text-white/70 tracking-wide font-light">"Porsche 911": Potencial elevado. Aplicar Consultoria AeroCore™.</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onChangeView(ViewState.MODULES)}
                      className="bg-[#0A0A0A] border border-white/5 p-6 flex items-center justify-between group hover:border-white/20 transition-all rounded-sm text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#111] rounded-full border border-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                          <PackageSearch size={18} />
                        </div>
                        <div>
                          <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Catálogo Módulos</p>
                          <h4 className="text-sm font-light text-white tracking-wide">Acessar Toolbox Winf™</h4>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </button>
                  </div>
              </motion.div>
          </div>
      </motion.div>
    </>
  );
};

export default DashboardWinf;
