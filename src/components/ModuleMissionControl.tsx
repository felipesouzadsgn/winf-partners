
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Users, 
  MapPin, 
  Zap, 
  Search, 
  Filter, 
  ChevronRight, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Globe, 
  MousePointer2,
  AlertCircle,
  ArrowRightLeft,
  Send,
  PhoneCall,
  Map as MapIcon
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

const ModuleMissionControl: React.FC = () => {
    const { leads, publicLeads, members, updateLead } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [showDistributeModal, setShowDistributeModal] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState('');

    // Filter leads that are "Unassigned" or in the "Global Inbox"
    // For demo, we'll show leads with user_id 'system-public-inbox' or similar
    const unassignedLeads = [...leads, ...publicLeads].filter(l => 
        (l.user_id === 'system-public-inbox' || !l.user_id) &&
        (l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.source.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDistribute = async () => {
        if (!selectedLead || !selectedMemberId) return;
        
        const member = members.find(m => m.id === selectedMemberId);
        if (!member) return;

        const success = await updateLead(selectedLead.id, { 
            user_id: selectedMemberId,
            status: 'Zona de Ataque' // Reset status for the new owner
        });

        if (success) {
            alert(`Lead "${selectedLead.name}" distribuído com sucesso para ${member.name}.`);
            setShowDistributeModal(false);
            setSelectedLead(null);
        }
    };

    const handleCallLead = async (lead: any) => {
        const confirm = window.confirm(`Iniciar atendimento via WhatsApp com ${lead.name}?`);
        if (confirm) {
            // Se for o próprio adm atendendo, atribui pra si mesmo se já não tiver dono
            await updateLead(lead.id, { status: 'Em Atendimento' });
            window.open(`https://wa.me/${lead.contact?.replace(/\D/g, '') || ''}?text=Olá ${lead.name}, vi que solicitou contato conosco! Aqui é da Winf.`, '_blank');
        }
    };

    const getSourceIcon = (source: string) => {
        const s = source.toLowerCase();
        if (s.includes('instagram')) return <Share2 size={16} className="text-pink-500" />;
        if (s.includes('facebook')) return <Globe size={16} className="text-white/40" />;
        if (s.includes('search') || s.includes('google')) return <Search size={16} className="text-white" />;
        return <Globe size={16} className="text-white/40" />;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-white tracking-tight">MISSION <span className="font-bold text-white/40">CONTROL™</span></h1>
                    <p className="text-white/40 text-sm">Distribuição Inteligente: Gestão de Leads Entrantes e Alocação de Território.</p>
                </div>
                <div className="flex items-center gap-4 bg-zinc-800/10 border border-zinc-700/20 px-6 py-3 rounded-none">
                    <div className="text-right">
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Leads Pendentes</p>
                        <p className="text-white font-bold text-xl">{unassignedLeads.length}</p>
                    </div>
                    <div className="w-px h-8 bg-zinc-700/20"></div>
                    <div className="text-right">
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Tempo Médio Resposta</p>
                        <p className="text-white font-bold text-xl">14m</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-none flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-none flex items-center justify-center text-pink-500">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Instagram Ads</p>
                        <h3 className="text-xl font-bold text-white">42 Leads <span className="text-xs md:text-[10px] text-green-500">+12%</span></h3>
                    </div>
                </div>
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-none flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800/50 rounded-none flex items-center justify-center text-white/40">
                        <Globe size={24} />
                    </div>
                    <div>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Facebook Meta</p>
                        <h3 className="text-xl font-bold text-white">28 Leads <span className="text-xs md:text-[10px] text-zinc-500">Estável</span></h3>
                    </div>
                </div>
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-none flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white">
                        <MousePointer2 size={24} />
                    </div>
                    <div>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">W.A.R.P Search</p>
                        <h3 className="text-xl font-bold text-white">15 Leads <span className="text-xs md:text-[10px] text-white/40">-5%</span></h3>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Geolocation Map Center */}
                <div className="lg:col-span-12 bg-black border border-white/5 rounded-none overflow-hidden relative h-[400px]">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/87/Equirectangular_projection_SW.jpg')] bg-cover opacity-20 grayscale sepia-[0.2] hue-rotate-[180deg]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
                    
                    <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10 pointer-events-none">
                        <MapIcon size={20} className="text-zinc-500"/>
                        <h3 className="font-bold tracking-tight">Radar Geo-Espacial: Leads Identificados</h3>
                        <span className="text-xs md:text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 ml-2 font-black tracking-widest uppercase animate-pulse">Live</span>
                    </div>

                    {/* Interactive Map Nodes for actual leads */}
                    {unassignedLeads.slice(0, 5).map((lead, index) => {
                        // Mock positions for demo based on index to spread them out on the map
                        const positions = [
                            { top: '40%', left: '30%' },
                            { top: '60%', left: '45%' },
                            { top: '35%', left: '55%' },
                            { top: '70%', left: '35%' },
                            { top: '50%', left: '20%' },
                        ];
                        const pos = positions[index % positions.length];

                        return (
                            <div key={lead.id} className="absolute" style={{ top: pos.top, left: pos.left }}>
                                <motion.div animate={{scale: [1,1.5,1], opacity:[0.5,1,0.5]}} transition={{repeat: Infinity, duration: 2, delay: index * 0.5}} className="w-16 h-16 bg-white/5 rounded-full absolute -top-8 -left-8 pointer-events-none"></motion.div>
                                <div className="w-2 h-2 bg-white rounded-full relative z-10 shadow-[0_0_10px_white]"></div>
                                <div 
                                    className="absolute top-4 left-4 bg-black/80 border border-white/20 p-3 hover:bg-zinc-900 transition-colors cursor-pointer backdrop-blur-md min-w-[200px]"
                                    onClick={() => handleCallLead(lead)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs md:text-[10px] font-bold text-white uppercase tracking-widest">{lead.name.substring(0, 15)}...</p>
                                        <span className="text-[10px] md:text-[8px] bg-red-500 px-1 text-white uppercase font-black">Aguardando</span>
                                    </div>
                                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 mb-2">{lead.interest}</p>
                                    <button className="w-full py-1.5 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-1">
                                        <PhoneCall size={10} /> Chamar Agora
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Inbox */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-none overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="text-white font-bold flex items-center gap-2"><Target size={18} className="text-white/40" /> Inbox Global de Leads</h3>
                            <div className="relative w-full md:w-80">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar lead ou fonte..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-black border border-white/10 py-2.5 pl-12 pr-4 rounded-none text-white text-sm outline-none focus:border-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {unassignedLeads.length === 0 ? (
                                <div className="p-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center mx-auto text-gray-700">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <p className="text-white/40 text-sm">Nenhum lead pendente de distribuição no momento.</p>
                                </div>
                            ) : (
                                unassignedLeads.map(lead => (
                                    <div 
                                        key={lead.id} 
                                        className="p-6 hover:bg-white/5 transition-colors group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-zinc-800 rounded-none flex items-center justify-center text-white/40">
                                                {getSourceIcon(lead.source)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-white font-bold">{lead.name}</h4>
                                                    <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] bg-zinc-800 text-white px-2 py-0.5 rounded-none uppercase font-black">Novo</span>
                                                    <span className={`text-xs md:text-[10px] md:text-sm md:text-[11px] px-2 py-0.5 rounded uppercase font-black ${lead.ai_score > 80 ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-white'}`}>
                                                        Score: {lead.ai_score}
                                                    </span>
                                                </div>
                                                <p className="text-xs md:text-[10px] text-white/40 flex items-center gap-1">
                                                    <Clock size={10} /> Recebido há 12 min via {lead.source}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                                            <div className="text-right hidden md:block">
                                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Interesse</p>
                                                <p className="text-white text-xs font-bold">{lead.interest}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setShowDistributeModal(true);
                                                    }}
                                                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-none text-xs md:text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2"
                                                    title="Distribuir / Delegar"
                                                >
                                                    <ArrowRightLeft size={14} /> 
                                                </button>
                                                <button 
                                                    onClick={() => handleCallLead(lead)}
                                                    className="bg-white hover:bg-zinc-200 text-black px-6 py-2.5 rounded-none text-xs md:text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                                >
                                                    <PhoneCall size={14} /> Iniciar Atendimento
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-none p-6 space-y-6">
                        <h3 className="text-white font-bold flex items-center gap-2"><Users size={18} className="text-white/40" /> Ranking de Conversão</h3>
                        <div className="space-y-4">
                            {members.slice(0, 5).map((m, i) => (
                                <div key={m.id} className="flex items-center justify-between p-3 bg-black/20 rounded-none border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-none bg-zinc-800 flex items-center justify-center text-xs md:text-[10px] font-bold text-white">
                                            #{i+1}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-xs">{m.name}</p>
                                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40">{m.address?.city || 'Brasil'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-500 font-bold text-xs">84%</p>
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40">Taxa de Fechamento</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-none text-xs font-bold transition-all">
                            Ver Relatório Completo
                        </button>
                    </div>

                    {/* Distribution Insight */}
                    <div className="bg-zinc-800/10 border border-zinc-700/20 rounded-none p-6 space-y-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded-none flex items-center justify-center text-white">
                            <Zap size={20} />
                        </div>
                        <h4 className="text-white font-bold">Smart Distribution</h4>
                        <p className="text-white/40 text-xs leading-relaxed">
                            O sistema recomenda distribuir os próximos leads para a região de <span className="text-white font-bold">Santos/SP</span> devido à alta demanda e baixa concorrência atual.
                        </p>
                    </div>
                </div>
            </div>

            {/* Distribution Modal */}
            <AnimatePresence>
                {showDistributeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDistributeModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-sm p-5 md:p-8 space-y-8 shadow-2xl"
                        >
                            <div className="space-y-2">
                                <h3 className="text-2xl font-light tracking-tight text-white">Distribuir Lead</h3>
                                <p className="text-white/40 text-sm">Selecione o membro que receberá o lead: <span className="text-white font-bold">{selectedLead?.name}</span></p>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input 
                                        type="text" 
                                        placeholder="Filtrar membros por nome ou cidade..." 
                                        className="w-full bg-[#0A0A0A] border border-white/5 py-3 pl-12 pr-4 rounded-sm text-white text-xs outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                                    />
                                </div>

                                <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                    {members.map(member => (
                                        <button 
                                            key={member.id}
                                            onClick={() => setSelectedMemberId(member.id)}
                                            className={`w-full flex items-center justify-between p-4 rounded-sm border transition-all ${selectedMemberId === member.id ? 'bg-[#0A0A0A] border-white/30' : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-[#0A0A0A]'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`} className="w-10 h-10 rounded-sm" />
                                                <div className="text-left">
                                                    <p className="text-white font-medium text-sm mb-1">{member.name}</p>
                                                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold">{member.address?.city || 'Brasil'}</p>
                                                </div>
                                            </div>
                                            {selectedMemberId === member.id && <CheckCircle2 size={18} className="text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-6 border-t border-white/5">
                                <button 
                                    onClick={() => setShowDistributeModal(false)}
                                    className="flex-1 py-4 bg-transparent border border-white/10 hover:border-white/30 hover:text-white text-white/40 font-bold rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] transition-all"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleDistribute}
                                    disabled={!selectedMemberId}
                                    className="flex-1 py-4 bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={14} /> Confirmar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModuleMissionControl;
