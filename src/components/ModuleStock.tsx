
import React, { useState, useEffect } from 'react';
import { Package, Plus, Minus, History, TrendingUp, AlertCircle, Search, Filter, ChevronRight, ArrowDownLeft, ArrowUpRight, Scissors, Bot, Trash2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleStockProps {
    onBack?: () => void;
}

const ModuleStock: React.FC<ModuleStockProps> = ({ onBack }) => {
    const { stockItems, stockHistory, retalhos, fetchRetalhos, addRetalho, updateStock, user, gamify, dispatchAgentCommand } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddRetalhoModal, setShowAddRetalhoModal] = useState(false);
    const [selectedRetalhoProduct, setSelectedRetalhoProduct] = useState<any>(null);
    const [isAgentProcessing, setIsAgentProcessing] = useState(false);

    useEffect(() => {
        fetchRetalhos();
    }, [fetchRetalhos]);

    const handleAgentReplenish = async () => {
        const lowStockItems = stockItems.filter(i => i.remaining_meters < 5);
        if (lowStockItems.length === 0) return;

        setIsAgentProcessing(true);
        const itemNames = lowStockItems.map(i => i.product_name).join(', ');
        
        await dispatchAgentCommand({
            type: 'MESSAGE',
            action: `Solicitar reposição de estoque baixo: ${itemNames}`,
            payload: { items: lowStockItems }
        });

        setIsAgentProcessing(false);
        alert(`Agente Neural acionado para reposição de: ${itemNames}`);
    };

    const filteredStock = stockItems.filter(item => 
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayHistory = stockHistory.length > 0 ? stockHistory.slice(0, 5) : [
        { type: 'OUT', product_name: 'Winf Invisible®', amount: 2.4, date: new Date().toISOString(), ref: 'Orçamento #Q-128' },
        { type: 'IN', product_name: 'Winf BlackPro®', amount: 30.0, date: new Date().toISOString(), ref: 'Compra BlackShop' },
        { type: 'OUT', product_name: 'Winf Dual Reflect®', amount: 1.8, date: new Date(Date.now() - 86400000).toISOString(), ref: 'Orçamento #Q-127' },
    ];

    const totalStockValue = stockItems.reduce((acc, item) => acc + (item.remaining_meters * 15), 0); // Mock value per meter

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10 animate-fade-in pb-24 text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]"
                        >
                            <ChevronRight size={14} className="rotate-180" /> VOLTAR AO PAINEL
                        </button>
                    )}
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-2">
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                            Gestão de Ativos
                        </div>
                        <h1 className="text-4xl font-light text-white tracking-tight">WINF <span className="font-medium text-white/80">STOCK™</span></h1>
                        <p className="text-white/40 max-w-2xl text-sm md:text-[11px] font-bold uppercase tracking-[0.1em] leading-relaxed">Controle de entrada, saída e otimização de rolos.</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-white hover:bg-zinc-200 text-black px-8 py-4 font-black flex items-center gap-2 transition-all uppercase tracking-[0.2em] text-xs md:text-[10px]"
                    >
                        <Plus size={16} /> Nova Entrada
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-4">
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em]">Total em Estoque</p>
                    <h3 className="text-4xl font-mono text-white tracking-tighter">{stockItems.reduce((acc, i) => acc + i.remaining_meters, 0).toFixed(1)}m</h3>
                    <div className="flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2 border-t border-white/5 pt-4">
                        <TrendingUp size={12} className="text-white/60" /> +5.2% vs mês anterior
                    </div>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-4">
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em]">Valor Estimado</p>
                    <h3 className="text-4xl font-mono text-white tracking-tighter">R$ {totalStockValue.toLocaleString()}</h3>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2 border-t border-white/5 pt-4">Baseado em custo médio</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-4">
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em]">Rolos Ativos</p>
                    <h3 className="text-4xl font-mono text-white tracking-tighter">{stockItems.length}</h3>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2 border-t border-white/5 pt-4">Prontos para corte</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em]">Alertas de Reposição</p>
                            <h3 className="text-4xl font-mono text-white tracking-tighter">{stockItems.filter(i => i.remaining_meters < 5).length}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs md:text-[10px] text-white font-bold">
                            <AlertCircle size={14} className="text-white/60" />
                        </div>
                    </div>
                    {stockItems.filter(i => i.remaining_meters < 5).length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <button 
                                onClick={handleAgentReplenish}
                                disabled={isAgentProcessing}
                                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white/80 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                <Bot size={14} className={isAgentProcessing ? 'animate-pulse' : ''} />
                                {isAgentProcessing ? 'Acionando Agente...' : 'Solicitar Reposição'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Inventory & Retalhos Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inventory Table */}
                <div className="col-span-2 bg-[#0A0A0A] border border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <h3 className="text-sm md:text-[11px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-3"><Package size={16} className="text-white/40" /> Inventário de Rolos</h3>
                        <div className="relative w-full md:w-80">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input 
                                type="text" 
                                placeholder="Buscar material..." 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-[#050505] border border-white/10 py-3 pl-12 pr-4 text-white text-sm md:text-[11px] font-bold uppercase tracking-widest outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/60">
                            <thead className="bg-[#050505] text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-black tracking-[0.3em] text-white/40">
                                <tr>
                                    <th className="p-6">Material</th>
                                    <th className="p-6">Disponível</th>
                                    <th className="p-6 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredStock.map(item => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <p className="text-white font-light text-lg">{item.product_name}</p>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-white font-mono text-lg">{item.remaining_meters.toFixed(1)}m</span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button 
                                                onClick={() => { setSelectedRetalhoProduct(item); setShowAddRetalhoModal(true); }}
                                                className="p-3 bg-black hover:bg-white/5 transition-all border border-white/10 text-white/40 hover:text-white"
                                            >
                                                <Scissors size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Retalhos Table */}
                <div className="col-span-1 bg-[#0A0A0A] border border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-sm md:text-[11px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-3"><Scissors size={16} className="text-white/40" /> Retalhos</h3>
                    </div>
                    <div className="p-6 space-y-3">
                        {retalhos.map(retalho => (
                            <div key={retalho.id} className="p-4 bg-black border border-white/10 flex justify-between items-center text-xs md:text-[10px] uppercase font-bold tracking-widest">
                                <div>
                                    <p className="text-white">{retalho.product_name}</p>
                                    <p className="text-white/40">{retalho.dimensions}</p>
                                </div>
                                <span className="text-white/80 font-mono tracking-tighter">{retalho.areaM2}m²</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Movements */}
            <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-6">
                    <h3 className="text-sm md:text-[11px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-3"><History size={16} className="text-white/40" /> Movimentações Recentes</h3>
                    <div className="space-y-4">
                        {displayHistory.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-black border border-white/10">
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 flex items-center justify-center border ${m.type === 'IN' ? 'bg-white/5 border-white/20 text-white' : 'bg-transparent border-white/5 text-white/40'}`}>
                                        {m.type === 'IN' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-white font-light text-lg">{m.product_name}</p>
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-widest mt-1">{m.ref || 'Movimentação'} • {new Date(m.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className={`font-mono text-xl ${m.type === 'IN' ? 'text-white/80' : 'text-white/40'}`}>
                                    {m.type === 'IN' ? '+' : '-'}{m.amount}m
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optimization Insight */}
                <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-6 md:p-10 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10">
                        <TrendingUp size={160} className="text-white" />
                    </div>
                    <div className="space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-white flex items-center justify-center text-black">
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="text-3xl font-light text-white tracking-tight">Insight de Otimização</h3>
                        <p className="text-white/60 text-sm md:text-[11px] font-bold uppercase tracking-[0.1em] leading-relaxed max-w-sm">
                            Seu aproveitamento de material subiu <span className="text-white">14%</span> este mês usando o Winf Precision™. Economia de <span className="text-white">R$ 1.240</span> em desperdício evitado.
                        </p>
                    </div>
                    <button className="w-full mt-8 py-5 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-[0.2em] text-xs md:text-[10px] transition-all">
                        Ver Relatório de Desperdício
                    </button>
                </div>
            </div>

            {/* Add Retalho Modal */}
            <AnimatePresence>
                {showAddRetalhoModal && selectedRetalhoProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm w-full max-w-md"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Scissors size={20} className="text-white" /> Registrar Retalho
                            </h3>
                            <p className="text-sm text-white/40 mb-4">
                                Material: <strong className="text-white">{selectedRetalhoProduct.product_name}</strong>
                            </p>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const dimensions = formData.get('dimensions') as string;
                                const areaM2 = parseFloat(formData.get('areaM2') as string);
                                if (dimensions && !isNaN(areaM2)) {
                                    setIsAgentProcessing(true);
                                    await addRetalho({
                                        product_id: selectedRetalhoProduct.id,
                                        product_name: selectedRetalhoProduct.product_name,
                                        dimensions,
                                        areaM2,
                                        is_used: false
                                    });
                                    setIsAgentProcessing(false);
                                    setShowAddRetalhoModal(false);
                                    gamify('SALE_CLOSED', { message: 'Retalho salvo!' });
                                }
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-xs md:text-[10px] uppercase font-black tracking-widest text-white/40 mb-2">Dimensões (Ex: 1.5m x 0.5m)</label>
                                    <input name="dimensions" required placeholder="1.5m x 0.5m" className="w-full bg-[#050505] border border-white/10 p-3 text-white text-sm outline-none focus:border-winf-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-[10px] uppercase font-black tracking-widest text-white/40 mb-2">Área (m²)</label>
                                    <input name="areaM2" required type="number" step="0.01" placeholder="0.75" className="w-full bg-[#050505] border border-white/10 p-3 text-white text-sm outline-none focus:border-winf-primary transition-all" />
                                </div>
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <button type="button" onClick={() => setShowAddRetalhoModal(false)} className="flex-1 py-3 text-white/40 hover:text-white transition-colors font-bold text-sm">
                                        Cancelar
                                    </button>
                                    <button type="submit" disabled={isAgentProcessing} className="flex-1 bg-white hover:bg-white_hover text-winf-background font-bold py-3 transition-all flex items-center justify-center gap-2">
                                        {isAgentProcessing ? <Bot size={16} className="animate-spin" /> : 'Registrar'}
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

export default ModuleStock;
