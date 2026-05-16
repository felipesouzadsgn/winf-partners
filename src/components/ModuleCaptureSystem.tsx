import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Bot as BotIcon,
  Crosshair,
  Radar,
  Store,
  Globe,
  Radio,
  MessageSquare,
  Users,
  Briefcase,
  TrendingUp,
  Inbox,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { Lead } from '../types';
import { LeadItemSkeleton } from './ui/LoadingSkeleton';

const ModuleCaptureSystem: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, leads, publicLeads, fetchLeads, fetchPublicLeads, addLead, gamify, distributeLead, addInstallationJob, isLoading } = useWinf();
  const [revealSensitive, setRevealSensitive] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'radar'>('list');
  const [isScanning, setIsScanning] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'public'>('personal');

  useEffect(() => { 
    if (user?.id) fetchLeads(); 
    fetchPublicLeads();
  }, [user?.id]);

  const canViewSensitive = user?.role === 'Admin' || user?.role === 'Licenciado';

  const handleConvertToSquad = async () => {
    if (!selectedTarget) return;
    setIsConverting(true);
    
    // Simulate Order Creation
    const osId = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 999)}`;
    
    // Create Installation Job
    await addInstallationJob({
      service_order_id: osId,
      customer_name: selectedTarget.name,
      vehicle_model: selectedTarget.interest.includes('AeroCore') ? 'Embarcação/Veículo (Análise)' : 'Projeto Executivo',
      collaborator_id: '1', // Default to first tech for demo
    });

    gamify('SALE_CLOSED');
    alert(`Oportunidade convertida em negócio! Protocolo Operacional ${osId} gerado.`);
    setIsConverting(false);
    setSelectedTarget(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-black border-black bg-white';
    if (score >= 50) return 'text-white border-white/50 bg-white/10';
    return 'text-white/40 border-white/20 bg-transparent';
  };

  const getZoneLabel = (score: number) => {
    if (score >= 80) return 'ALTA CONVERSÃO';
    if (score >= 50) return 'EM TRATATIVA';
    return 'PROSPECÇÃO FRIA';
  };

  const simulateIncomingLead = async () => {
      setIsScanning(true);
      
      setTimeout(async () => {
          const sources = [
              { src: 'Winf TouchPoint (Físico)', interest: 'Solução AeroCore', score: 85 },
              { src: 'Campanha Institucional', interest: 'Película Select', score: 72 },
              { src: 'Indicação Direta', interest: 'Automação Corporativa', score: 90 }
          ];
          const randomSource = sources[Math.floor(Math.random() * sources.length)];
          
          await addLead({
              name: `Cliente Potencial #${Math.floor(Math.random() * 9999)}`,
              contact: '(XX) 9XXXX-XXXX',
              source: randomSource.src,
              interest: randomSource.interest,
              status: 'Aguardando',
              ai_score: 95,
              dominance_score: randomSource.score,
              decay_level: 100
          });
          
          gamify('LEAD_ADDED');
          setIsScanning(false);
          setViewMode('list'); 
      }, 3000);
  };

  const simulateWhatsAppLead = async () => {
      setIsScanning(true);
      const lead = { name: `Lead WhatsApp #${Math.floor(Math.random() * 999)}`, city: 'Santos' };
      
      setTimeout(async () => {
          await distributeLead(lead);
          await addLead({
              name: lead.name,
              contact: '(13) 9XXXX-XXXX',
              source: 'WhatsApp Corporativo',
              interest: 'Orçamento Especializado',
              status: 'Distribuído',
              ai_score: 88,
              dominance_score: 75,
              decay_level: 100
          });
          gamify('LEAD_ADDED');
          setIsScanning(false);
          setViewMode('list');
      }, 2000);
  };

  const sortedLeads = [...leads].sort((a, b) => b.dominance_score - a.dominance_score);

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white">
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                    <ChevronLeft size={14} /> Voltar ao Painel
                </button>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Atendimento
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Módulo de <span className="font-medium text-white/80">Atendimento</span></h1>
                </div>
            </div>
            
            <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${viewMode === 'list' ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > Diretório </button>
                <button 
                  onClick={() => setViewMode('radar')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border flex items-center gap-2 ${viewMode === 'radar' ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > <Radar size={12} /> Omnichannel </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: LIST OR RADAR */}
            <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-sm p-4 h-[700px] flex flex-col relative shadow-2xl">
                
                {viewMode === 'list' && (
                    <>
                        <div className="p-4 border-b border-white/[0.05] flex justify-between items-center mb-4">
                            <div className="flex gap-2 bg-[#0A0A0A] p-1 border border-white/5 rounded-sm">
                                <button 
                                    onClick={() => setActiveTab('personal')}
                                    className={`px-4 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm ${activeTab === 'personal' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                                >
                                    Minha Carteira ({leads.length})
                                </button>
                                <button 
                                    onClick={() => setActiveTab('public')}
                                    className={`px-4 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm ${activeTab === 'public' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                                >
                                    Pool Institucional ({publicLeads.length})
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={simulateIncomingLead} disabled={isScanning} className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/80 uppercase border border-white/10 px-4 py-2 rounded-sm tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                                    {isScanning ? <span className="animate-pulse">Sincronizando...</span> : <><TrendingUp size={12} /> Captar</>}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                            {isLoading ? (
                                <div className="space-y-2">
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                </div>
                            ) : (activeTab === 'personal' ? sortedLeads : publicLeads).length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/20">
                                    <Inbox size={48} className="mb-4 stroke-1" />
                                    <p className="text-xs md:text-[10px] uppercase font-black tracking-widest">Sua carteira está vazia.</p>
                                </div>
                            ) : (
                                (activeTab === 'personal' ? sortedLeads : publicLeads).map((lead) => (
                                    <div 
                                        key={lead.id} 
                                        onClick={() => setSelectedTarget(lead)}
                                        className={`p-4 cursor-pointer transition-all flex items-center gap-6 rounded-sm border ${selectedTarget?.id === lead.id ? 'bg-[#0A0A0A] border-white/20' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-sm border flex flex-col items-center justify-center font-mono ${getScoreColor(lead.dominance_score)}`}>
                                            <span className="text-sm font-light">{lead.dominance_score}</span>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-medium text-sm truncate">{lead.name}</h4>
                                            <div className="flex gap-4 mt-1 items-center">
                                                <p className="text-xs md:text-[10px] text-white/40 font-light truncate">{lead.interest}</p>
                                                <div className="h-[2px] w-[2px] bg-white/20 rounded-full"></div>
                                                <div className="flex items-center gap-1.5 text-xs md:text-[10px] text-white/40 font-light">
                                                    {lead.source.includes('Kiosk') ? <Store size={10} /> : lead.source.includes('Web') || lead.source.includes('Ads') ? <Globe size={10} /> : <Briefcase size={10} />}
                                                    {lead.source}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-[10px] md:text-[8px] font-bold uppercase tracking-[0.2em] mb-1.5 ${lead.dominance_score >= 80 ? 'text-white' : 'text-white/40'}`}>{getZoneLabel(lead.dominance_score)}</p>
                                            <div className="flex gap-0.5 justify-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-3 h-1 rounded-sm ${i < (lead.decay_level / 20) ? 'bg-white' : 'bg-white/10'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {viewMode === 'radar' && (
                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-sm bg-[#0A0A0A]">
                        {/* Elegant Radar Visual */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
                        <div className="relative w-[300px] h-[300px] border border-white/5 rounded-full flex items-center justify-center">
                            <div className="absolute w-[200px] h-[200px] border border-white/5 rounded-full"></div>
                            <div className="absolute w-[100px] h-[100px] border border-white/10 rounded-full bg-black"></div>
                            
                            {/* Scanning Line */}
                            <div className={`absolute top-0 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-white/40 origin-left animate-[spin_4s_linear_infinite] ${isScanning ? 'opacity-100' : 'opacity-0'}`}></div>

                            {/* Center Hub */}
                            <div className="z-10 bg-black border border-white/10 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">
                                <Radio size={16} className={`text-white ${isScanning ? 'animate-pulse' : 'opacity-40'}`} />
                            </div>

                            {/* Detected Nodes */}
                            <div className="absolute top-8 right-16 flex flex-col items-center animate-pulse opacity-60">
                                <Globe size={12} className="text-white mb-1" />
                            </div>
                            <div className="absolute bottom-12 left-12 flex flex-col items-center animate-pulse delay-75 opacity-60">
                                <Store size={12} className="text-white mb-1" />
                            </div>
                            <div className="absolute top-16 left-16 flex flex-col items-center animate-pulse delay-150 opacity-60">
                                <MessageSquare size={12} className="text-white mb-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-12 text-center space-y-3 px-8">
                            <h3 className="text-white font-light text-lg tracking-tight">Canais de Omnichannel</h3>
                            <p className="text-white/40 text-xs font-light max-w-sm mx-auto leading-relaxed">
                                Integração em tempo real com atendimento WhatsApp, totens comerciais e mídia digital para injetar oportunidades instantâneas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                                <button 
                                    onClick={simulateWhatsAppLead}
                                    disabled={isScanning}
                                    className="bg-[#0A0A0A] border border-white/10 text-white px-6 py-3 rounded-sm font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={14} />
                                    {isScanning ? 'Buscando...' : 'Fluxo WhatsApp'}
                                </button>
                                <button 
                                    onClick={simulateIncomingLead}
                                    disabled={isScanning}
                                    className="bg-white text-black px-6 py-3 rounded-sm font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Globe size={14} />
                                    {isScanning ? 'Conectando...' : 'Canais Institucionais'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: LEAD PROFILE */}
            <div className="lg:col-span-4 bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8 flex flex-col relative shadow-2xl">
                {!selectedTarget ? (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-20">
                        <Users size={48} className="mb-4 stroke-1" />
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">Selecione um Cliente</p>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-8 h-full flex flex-col">
                        <div className="border-b border-white/5 pb-6">
                            <h3 className="text-white font-light text-2xl tracking-tight mb-2">{selectedTarget.name}</h3>
                            <div className="flex justify-between items-center">
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                    <CheckCircle size={12} className="text-white" /> 
                                    {selectedTarget.status || 'Ativo'}
                                </p>
                                <span className="text-xs md:text-[10px] text-white/20 font-mono">ID: {selectedTarget.id.slice(0,8)}</span>
                            </div>
                        </div>

                        {/* INFO BOXES */}
                        <div className="space-y-4">
                            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm flex items-start gap-4">
                                <Briefcase className="text-white/40 shrink-0" size={16} />
                                <div>
                                    <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Interesse / Produto</p>
                                    <p className="text-sm text-white font-light">{selectedTarget.interest}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-sm flex items-start gap-4">
                                <Radio className="text-white/40 shrink-0" size={16} />
                                <div>
                                    <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Origem da Captação</p>
                                    <p className="text-sm text-white font-light">{selectedTarget.source}</p>
                                </div>
                            </div>
                        </div>

                        {/* AI ANALYSIS */}
                        <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-sm relative overflow-hidden mt-2">
                            <h4 className="text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <BotIcon size={14} className="text-white" /> Análise Preditiva Winf
                            </h4>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[10px] md:text-[8px] text-white/30 uppercase font-bold tracking-[0.2em] mb-1">Perfil de Consumo</p>
                                    <p className="text-xs text-white/80 font-light leading-relaxed">
                                        {selectedTarget.last_paradox_truth || "Alta probabilidade de conversão para soluções premium corporativas."}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-[8px] text-white/30 uppercase font-bold tracking-[0.2em] mb-1">Próxima Ação Recomendada</p>
                                    <p className="text-sm text-white font-medium tracking-tight">
                                        {selectedTarget.last_paradox_maneuver || "Apresentar estimativa via módulo de Propostas."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-auto pt-6 space-y-3">
                            <button 
                                onClick={handleConvertToSquad}
                                disabled={isConverting}
                                className="w-full py-4 bg-white text-black font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Crosshair size={14} className={isConverting ? 'animate-spin' : ''} />
                                {isConverting ? 'Processando...' : 'Converter em Oportunidade'}
                            </button>
                            <button className="w-full py-4 bg-transparent border border-white/10 text-white/60 font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] rounded-sm hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2">
                                <FileText size={14} /> Relatório do Cliente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ModuleCaptureSystem;
