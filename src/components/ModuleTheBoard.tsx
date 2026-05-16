
import React, { useState } from 'react';
import { Users, Shield, Map, CreditCard, Search, MoreVertical, CheckCircle, XCircle, Mail, Phone, ExternalLink, Award, Zap, ChevronRight, Package, TrendingUp, DollarSign } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleTheBoardProps {
    onBack?: () => void;
}

const ModuleTheBoard: React.FC<ModuleTheBoardProps> = ({ onBack }) => {
    const { members, updateUserCoins } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'MEMBERS' | 'STOCK'>('MEMBERS');

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGrantCoins = async (memberId: string) => {
        const amount = prompt("Quantidade de WinfCoins a conceder:");
        if (amount && !isNaN(parseInt(amount))) {
            alert(`Concedendo ${amount} WinfCoins para o membro.`);
        }
    };

    const renderStockTab = () => {
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none">
                        <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white mb-4">
                            <Package size={24} />
                        </div>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Rolos Consumidos (Mês)</p>
                        <h3 className="text-3xl font-bold text-white">1.450</h3>
                        <p className="text-xs text-green-500 mt-2 flex items-center gap-1"><TrendingUp size={12} /> +12% vs Mês Passado</p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none">
                        <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white mb-4">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Metragem Consumida (m²)</p>
                        <h3 className="text-3xl font-bold text-white">65.250 m²</h3>
                        <p className="text-xs text-white/80 mt-2">Equivalente a 4.000 veículos</p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-winf-primary/30 p-6 rounded-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <DollarSign size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center text-winf-background mb-4">
                                <DollarSign size={24} />
                            </div>
                            <p className="text-xs md:text-[10px] text-white uppercase font-black tracking-widest mb-1">Royalties Arrecadados (Mês)</p>
                            <h3 className="text-3xl font-bold text-white">R$ 130.500,00</h3>
                            <p className="text-xs text-white/80 mt-2">Custo zero fixo para a rede</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-white font-bold flex items-center gap-2"><Package size={18} className="text-white/40" /> Solicitações WinfStock</h3>
                        <button className="text-xs md:text-[10px] uppercase font-black tracking-widest text-white hover:text-white transition-colors">Aprovar Todos</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="bg-[#050505] text-xs md:text-[10px] uppercase font-black tracking-widest text-white/40">
                                <tr>
                                    <th className="p-6">Franqueado</th>
                                    <th className="p-6">Pedido</th>
                                    <th className="p-6">Quantidade</th>
                                    <th className="p-6">Royalties Embutidos</th>
                                    <th className="p-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-winf-border">
                                {[
                                    { partner: 'Node Santos-Alpha', item: 'Winf Invisible Cerâmico', qty: '4 Rolos', roy: 'R$ 360,00', status: 'Aguardando Despacho' },
                                    { partner: 'São Paulo Studio', item: 'Dual Reflect Arquitetura', qty: '10 Rolos', roy: 'R$ 900,00', status: 'Em Trânsito' },
                                    { partner: 'Campinas Mobile', item: 'NeoSkin PPF', qty: '2 Rolos', roy: 'R$ 500,00', status: 'Aguardando Pagamento' }
                                ].map((req, i) => (
                                    <tr key={i} className="hover:bg-[#050505]/40 transition-colors">
                                        <td className="p-6 text-white font-bold">{req.partner}</td>
                                        <td className="p-6">{req.item}</td>
                                        <td className="p-6 font-mono text-xs">{req.qty}</td>
                                        <td className="p-6 text-green-500 font-mono text-xs">{req.roy}</td>
                                        <td className="p-6 text-right">
                                            <span className="px-3 py-1 rounded-none bg-[#050505]/40 text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest font-bold">
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="p-3 bg-[#0A0A0A] hover:bg-[#0A0A0A]_hover rounded-none transition-all text-white/40 hover:text-white"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                    )}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light text-white tracking-tight">THE <span className="font-bold text-white/40">BOARD™</span></h1>
                        <p className="text-white/40 text-sm">Controle Central: Gestão de Membros, Territórios e Performance de Rede.</p>
                    </div>
                </div>
                
                <div className="flex bg-[#0A0A0A] rounded-none p-1 border border-white/10">
                    <button 
                        onClick={() => setActiveTab('MEMBERS')}
                        className={`px-6 py-2 rounded-none text-xs font-bold transition-all ${activeTab === 'MEMBERS' ? 'bg-[#050505] text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
                    >
                        Rede de Franqueados
                    </button>
                    <button 
                        onClick={() => setActiveTab('STOCK')}
                        className={`px-6 py-2 rounded-none text-xs font-bold transition-all ${activeTab === 'STOCK' ? 'bg-[#050505] text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
                    >
                        Master WinfStock
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            {activeTab === 'MEMBERS' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Members List */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="text-white font-bold flex items-center gap-2"><Users size={18} className="text-white/40" /> Rede de Parceiros</h3>
                            <div className="relative w-full md:w-80">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar por nome, email ou cidade..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 py-2.5 pl-12 pr-4 rounded-none text-white text-sm outline-none focus:border-winf-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-white/80">
                                <thead className="bg-[#050505] text-xs md:text-[10px] uppercase font-black tracking-widest text-white/40">
                                    <tr>
                                        <th className="p-6">Membro</th>
                                        <th className="p-6">Plano</th>
                                        <th className="p-6">Território</th>
                                        <th className="p-6">Performance</th>
                                        <th className="p-6 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-winf-border">
                                    {filteredMembers.map(member => (
                                        <tr 
                                            key={member.id} 
                                            onClick={() => setSelectedMember(member)}
                                            className={`hover:bg-[#050505]/40 transition-colors cursor-pointer ${selectedMember?.id === member.id ? 'bg-[#050505]/60' : ''}`}
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`} className="w-10 h-10 rounded-none border border-white/10" />
                                                    <div>
                                                        <p className="text-white font-bold">{member.name}</p>
                                                        <p className="text-xs md:text-[10px] text-white/40">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-2 py-1 rounded text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest ${member.role === 'Admin' ? 'bg-white/10 text-white' : 'bg-[#050505]/40 text-white/40'}`}>
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs">
                                                {member.address?.city || 'N/A'}, {member.address?.state || 'N/A'}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1 bg-[#050505] rounded-none overflow-hidden w-16">
                                                        <div className="h-full bg-white" style={{ width: '75%' }}></div>
                                                    </div>
                                                    <span className="text-xs md:text-[10px] font-bold text-white">75%</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="p-2 hover:bg-[#050505]/60 rounded-none transition-colors text-white/40 hover:text-white">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Member Detail Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {selectedMember ? (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 space-y-8 sticky top-6"
                        >
                            <div className="text-center space-y-4">
                                <img src={selectedMember.avatar || `https://ui-avatars.com/api/?name=${selectedMember.name}&background=random`} className="w-24 h-24 rounded-none border-2 border-white/10 mx-auto" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                                    <p className="text-white/40 text-sm">{selectedMember.company || 'Autônomo'}</p>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <span className="bg-white/10 text-white text-xs md:text-[10px] font-black px-3 py-1 rounded-none flex items-center gap-1">
                                        <Award size={10} /> {selectedMember.w_rank_level}
                                    </span>
                                    <span className="bg-[#050505] text-white text-xs md:text-[10px] font-black px-3 py-1 rounded-none border border-white/10">
                                        XP {selectedMember.w_rank_xp}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#050505]/40 p-4 rounded-none border border-white/10 text-center">
                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">WinfCoins</p>
                                    <p className="text-white font-bold text-lg">W$ {selectedMember.winfCoins.toLocaleString()}</p>
                                </div>
                                <div className="bg-[#050505]/40 p-4 rounded-none border border-white/10 text-center">
                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Status</p>
                                    <p className="text-white font-bold text-lg flex items-center justify-center gap-1">
                                        <CheckCircle size={14} /> Ativo
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Shield size={14} className="text-white/40" /> Ações de Gestão
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <button onClick={() => handleGrantCoins(selectedMember.id)} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-none text-xs font-bold transition-all flex items-center justify-center gap-2 border border-winf-primary/20">
                                        <Zap size={14} /> Conceder WinfCoins
                                    </button>
                                    <button className="w-full py-3 bg-[#050505]/40 hover:bg-[#050505]/60 text-white/40 rounded-none text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
                                        <Shield size={14} /> Alterar Permissões
                                    </button>
                                    <button className="w-full py-3 bg-[#050505]/40 hover:bg-[#050505]/60 text-white rounded-none text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
                                        <Mail size={14} /> Enviar Credenciais
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Phone size={14} className="text-white/40" /> Contato
                                </h4>
                                <div className="space-y-2 text-sm text-white/80">
                                    <div className="flex items-center gap-3"><Mail size={14} /> {selectedMember.email}</div>
                                    <div className="flex items-center gap-3"><Phone size={14} /> {selectedMember.phone || 'Não informado'}</div>
                                    <div className="flex items-center gap-3"><Map size={14} /> {selectedMember.address?.city}, {selectedMember.address?.state}</div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-[#0A0A0A] border border-dashed border-white/10 rounded-none p-6 md:p-12 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[400px]">
                            <Users size={48} className="text-white/40/30" />
                            <p className="text-white/40 text-sm">Selecione um membro para visualizar detalhes e gerenciar conta.</p>
                        </div>
                    )}
                </div>
            </div>
            ) : (
                renderStockTab()
            )}
        </div>
    );
};

export default ModuleTheBoard;
