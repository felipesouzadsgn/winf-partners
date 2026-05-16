import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    Crosshair, 
    ShieldCheck, 
    MessageSquare, 
    Trash2, 
    UserPlus,
    Target,
    Activity
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

// Mock list of inactive prospects for the CRM
const mockInactiveProspects = [
    { id: 'p1', name: 'Carlos Automotivo', city: 'São Paulo, SP', status: 'Frio', phone: '11999999999' },
    { id: 'p2', name: 'Estética Premium', city: 'Curitiba, PR', status: 'Abordado', phone: '41999999999' },
    { id: 'p3', name: 'Roberto Window Film', city: 'Campinas, SP', status: 'Negociando', phone: '19999999999' },
    { id: 'p4', name: 'Design & Películas', city: 'Rio de Janeiro, RJ', status: 'Frio', phone: '21999999999' },
];

const ModuleMemberManagement: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, members, fetchMembers, deleteProfile } = useWinf();
  const [activeTab, setActiveTab] = useState<'ativos' | 'hunting'>('hunting');
  const [prospects, setProspects] = useState(mockInactiveProspects);

  useEffect(() => { 
      if (user?.role === 'Admin') fetchMembers(); 
  }, [user]);

  if (user?.role !== 'Admin') return <div className="text-white p-5 md:p-8">Acesso Restrito. Painel Exclusivo da Matriz.</div>;

  const handleContactProspect = (prospect: any) => {
      const text = `Fala ${prospect.name}, tudo bem? Aqui é o Tiago da Winf. Vi que você estava interessado em estruturar e elevar o nível da sua operação. Podemos conversar rápido?`;
      window.open(`https://wa.me/55${prospect.phone}?text=${encodeURIComponent(text)}`, '_blank');
      
      // Update status locally for UI feedback
      setProspects(prev => prev.map(p => p.id === prospect.id ? { ...p, status: 'Abordado' } : p));
  };

  const handleApproveProspect = (prospect: any) => {
      if(window.confirm(`Deseja aprovar e enviar convite de Licença para ${prospect.name}?`)) {
          alert("Link de acesso exclusivo copiado e enviado para o CRM!");
          setProspects(prev => prev.filter(p => p.id !== prospect.id));
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Frio': return 'bg-zinc-800 text-white/40 border-zinc-700';
          case 'Abordado': return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
          case 'Negociando': return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
          default: return 'bg-white/5 text-white/50 border-white/10';
      }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 text-white">
        {/* Superior Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                    <ChevronLeft size={14} /> Voltar ao Painel Corporativo
                </button>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                     Winf Expansion CRM
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Expansão de <span className="font-medium text-white/80">Rede</span></h1>
                </div>
            </div>
            
            <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('hunting')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border flex items-center gap-2 ${activeTab === 'hunting' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > 
                    <Target size={14} /> Hunting (Prospecção) 
                </button>
                <button 
                  onClick={() => setActiveTab('ativos')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border flex items-center gap-2 ${activeTab === 'ativos' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > 
                    <ShieldCheck size={14} /> Licenciados Ativos 
                </button>
            </div>
        </div>

        {/* Tab: Hunting / Inactive Prospects */}
        {activeTab === 'hunting' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Stats */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#050505] border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-white/20 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Crosshair size={64}/></div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Base de Leads Inativos</p>
                        <p className="text-4xl font-light">{prospects.length}</p>
                        <p className="text-xs text-white/30 mt-4 leading-relaxed font-light">Leads que demonstraram interesse no licenciamento mas esfriaram. Sua missão é convertê-los.</p>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-3">
                    <div className="bg-[#050505] border border-white/5 rounded-sm overflow-hidden p-2">
                        <table className="w-full text-left text-sm font-light">
                            <thead className="bg-[#0A0A0A] text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                                <tr>
                                    <th className="p-4 rounded-tl-sm">Prospect / Loja</th>
                                    <th className="p-4">Região</th>
                                    <th className="p-4">Status Térmico</th>
                                    <th className="p-4 text-right rounded-tr-sm">Plano de Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {prospects.map(p => (
                                    <tr key={p.id} className="hover:bg-black transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-white group-hover:text-white transition-colors">{p.name}</p>
                                        </td>
                                        <td className="p-4 text-white/60">{p.city}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 border rounded-sm text-[10px] md:text-[8px] font-black uppercase tracking-[0.2em] ${getStatusColor(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleContactProspect(p)}
                                                    className="bg-[#0A0A0A] hover:bg-[#25D366]/20 hover:text-[#25D366] hover:border-[#25D366]/50 border border-white/10 text-white/60 px-4 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                                    title="Acionar no WhatsApp"
                                                >
                                                    <MessageSquare size={12} /> Abordar
                                                </button>
                                                {p.status === 'Negociando' && (
                                                    <button 
                                                        onClick={() => handleApproveProspect(p)}
                                                        className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                                    >
                                                        <UserPlus size={12} /> Aprovar
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {prospects.length === 0 && (
                            <div className="p-12 text-center text-white/40">
                                <Activity size={32} className="mx-auto mb-4 opacity-50" />
                                <p className="text-sm font-light">Todas as oportunidades da base foram tratadas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Tab: Membros da Rede Ativa */}
        {activeTab === 'ativos' && (
            <div className="bg-[#050505] border border-white/5 rounded-sm overflow-hidden p-2">
                <table className="w-full text-left text-sm font-light">
                    <thead className="bg-[#0A0A0A] text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                        <tr>
                            <th className="p-4 rounded-tl-sm">Operador / Gestor</th>
                            <th className="p-4">Email de Acesso</th>
                            <th className="p-4">Credencial</th>
                            <th className="p-4 text-right rounded-tr-sm">Protocolos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {members.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-white/20">Nenhum membro ativo cadastrado.</td></tr>
                        ) : (
                            members.map(m => (
                                <tr key={m.id} className="hover:bg-black transition-colors">
                                    <td className="p-4 font-medium text-white">{m.name}</td>
                                    <td className="p-4 text-white/60">{m.email}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-none ${
                                                m.role === 'Admin' ? 'bg-white shadow-[0_0_8px_white]' : 
                                                m.role === 'Licenciado' ? 'bg-blue-400' : 'bg-zinc-500'
                                            }`} />
                                            <span className={`px-2 py-0.5 border rounded-sm text-[10px] md:text-[8px] font-black uppercase tracking-widest ${
                                                m.role === 'Admin' ? 'bg-white/10 text-white border-white/20' : 
                                                m.role === 'Licenciado' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                                'bg-zinc-500/10 text-white/40 border-zinc-500/20'
                                            }`}>
                                                {m.role === 'Admin' ? 'Matriz (Admin)' : m.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => deleteProfile(m.id)} 
                                            className="text-white/20 hover:text-red-400 transition-colors p-2"
                                            title="Revogar Acesso"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
};

export default ModuleMemberManagement;
