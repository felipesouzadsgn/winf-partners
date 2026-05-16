
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Settings,
  Calendar,
  CheckCircle,
  Users,
  Car,
  Layers,
  ArrowUpRight,
  Search,
  PieChart
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, CartesianGrid, Pie, Cell } from 'recharts';
import { useWinf } from '../contexts/WinfContext';
import { Skeleton } from './ui/LoadingSkeleton';

const FILM_OPTIONS = [
    'AeroCore™ Nano-Ceramic',
    'Winf Select™ Architectural',
    'NeoSkin™ PPF Gloss',
    'NeoSkin™ PPF Matte',
    'Standard Carbon Dyed',
    'Outros Serviços'
];

interface Client {
    id: string;
    name: string;
    vehicle: string;
    phone: string;
}

// Dados simulados baseados no Manual V5 (Mix de Produtos)
const MONTHLY_PROJECTION = [
    { name: 'Sem 1', revenue: 8500, cost: 950 },
    { name: 'Sem 2', revenue: 9200, cost: 1100 },
    { name: 'Sem 3', revenue: 11500, cost: 1050 },
    { name: 'Sem 4', revenue: 11300, cost: 1100 },
];

const REVENUE_MIX = [
    { name: 'BlackPro', value: 16200, color: '#ffffff' }, // 3 rolos
    { name: 'Dual Reflect', value: 12600, color: '#a1a1aa' }, // 2 rolos
    { name: 'Invisible', value: 11700, color: '#71717a' }, // 1 rolo
];

const ModuleFinancial: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { transactions, fetchTransactions, addTransaction, isLoading } = useWinf();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'clients' | 'config'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ type: 'income', amount: '', description: '', category: 'Aplicação', paymentMethod: 'Pix' });
  
  // Total simulado do mês (Baseado no Manual V5)
  const simulatedTotalRevenue = 40500;
  const simulatedTotalCost = 4200;

  useEffect(() => { fetchTransactions(); }, []);

  // Use real transactions if available, otherwise use simulation for dashboard look
  const useSimulated = transactions.length === 0;
  const displayTransactions = useSimulated ? [
      { id: 't1', description: 'Aplicação Invisible (Residência Alphaville)', amount: 5800, type: 'income', paymentMethod: 'Pix', date: new Date().toISOString() },
      { id: 't2', description: 'Aplicação BlackPro (Escritório)', amount: 2400, type: 'income', paymentMethod: 'Credit', date: new Date().toISOString() },
      { id: 't3', description: 'Compra Estoque (1x Invisible)', amount: 1400, type: 'expense', paymentMethod: 'Boleto', date: new Date().toISOString() },
  ] : transactions;

  const realIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const realExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  const totalRevenue = useSimulated ? simulatedTotalRevenue : realIncome;
  const totalCost = useSimulated ? simulatedTotalCost : realExpense;
  const netProfit = totalRevenue - totalCost;

  const handleAddTx = async () => {
    if(!newTx.description || !newTx.amount) return;
    await addTransaction({
        type: newTx.type,
        amount: Number(newTx.amount),
        description: newTx.description,
        category: newTx.category,
        paymentMethod: newTx.paymentMethod,
        date: new Date().toISOString()
    });
    setShowAddModal(false);
    setNewTx({ type: 'income', amount: '', description: '', category: 'Aplicação', paymentMethod: 'Pix' });
  };

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
                     Inteligência de Capital
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Núcleo <span className="font-medium text-white/80">Estratégico Financeiro</span></h1>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 items-end">
                <div className="flex bg-[#0A0A0A] p-1 rounded-sm border border-white/5">
                    <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>PANORAMA MACRO</button>
                    <button onClick={() => setActiveTab('transactions')} className={`px-6 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'transactions' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>FLUXO DE CAIXA</button>
                </div>
            </div>
        </div>

        {activeTab === 'dashboard' && (
            <div className="space-y-6">
                {/* KPI Cards based on V5 Manual Projection */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-5 md:p-8 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-5 md:p-8 bg-white/5 rounded-none blur-xl"></div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em] mb-4">Faturamento Bruto</p>
                        <div className="flex items-baseline gap-2 relative z-10">
                           <span className="text-3xl font-mono text-white tracking-tighter">R$ {totalRevenue.toLocaleString()}</span>
                           <TrendingUp size={14} className="text-white/60" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-5 md:p-8 group">
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em] mb-4">Custo Operacional (CMV)</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-mono text-white tracking-tighter">R$ {totalCost.toLocaleString()}</span>
                        </div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2">{totalRevenue ? ((totalCost/totalRevenue)*100).toFixed(1) : 0}% OVERHEAD</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-5 md:p-8 group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-white/20"></div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em] mb-4">Lucro Operacional</p>
                        <div className="flex items-baseline gap-2 relative z-10">
                           <span className="text-3xl font-mono text-white tracking-tighter">R$ {netProfit.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-5 md:p-8 group">
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-[0.3em] mb-4">Ticket Médio (m²)</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-mono text-white tracking-tighter">R$ 173,00</span>
                        </div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2">Mix: Black/Dual/Invisible</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Chart Area */}
                    <div className="lg:col-span-8 bg-[#0A0A0A] border border-white/10 p-5 md:p-8">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                           <h3 className="text-sm md:text-[11px] font-black uppercase tracking-[0.2em] text-white">Curva de Crescimento</h3>
                           <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
                              <Plus size={14} /> Registrar Transação
                           </button>
                        </div>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={MONTHLY_PROJECTION}>
                                 <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                                 <XAxis dataKey="name" stroke="#333" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                                 <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #111', fontSize: '10px'}} />
                                 <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                                 <Area type="monotone" dataKey="cost" stroke="#52525b" strokeWidth={2} fillOpacity={0} />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Mix */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0A0A0A] border border-white/[0.03] p-5 md:p-8 rounded-none h-full flex flex-col">
                           <h3 className="text-gray-600 font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] mb-8">Mix de Receita</h3>
                           <div className="flex-1 min-h-[200px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={REVENUE_MIX} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {REVENUE_MIX.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-bold">Total</p>
                                    <p className="text-sm text-white font-bold">R$ 40.5k</p>
                                </div>
                           </div>
                           <div className="space-y-3 mt-4">
                                {REVENUE_MIX.map(item => (
                                    <div key={item.name} className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-none" style={{backgroundColor: item.color}}></div>
                                            <span className="text-white/40">{item.name}</span>
                                        </div>
                                        <span className="font-mono font-bold text-white">R$ {item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                           </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Transactions List */}
                <div className="bg-[#080808] border border-white/[0.05] p-5 md:p-8 rounded-none">
                    <h3 className="text-gray-600 font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em] mb-6">Lançamentos Recentes</h3>
                    <div className="space-y-1">
                        {isLoading ? (
                            <div className="space-y-4 p-4">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        ) : displayTransactions.length === 0 ? (
                            <div className="p-12 text-center text-gray-600">
                                <DollarSign size={32} className="mx-auto mb-4 opacity-20" />
                                <p className="text-xs uppercase font-black tracking-widest">Nenhuma transação registrada.</p>
                            </div>
                        ) : (
                            displayTransactions.map((t: any) => (
                                <div key={t.id} className="flex justify-between items-center p-4 hover:bg-black border-b border-white/[0.02] last:border-0 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded bg-white/5 ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                            <DollarSign size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-white/40 transition-colors">{t.description}</p>
                                            <p className="text-xs md:text-[10px] text-gray-600 uppercase tracking-widest">{new Date(t.date).toLocaleDateString()} • {t.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <span className={`font-mono font-bold ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                        {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
        
        {/* Full Transactions View */}
        {activeTab === 'transactions' && (
            <div className="bg-[#080808] border border-white/[0.05] p-5 md:p-8 rounded-none">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-gray-600 font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.3em]">Histórico Completo</h3>
                    <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-winf-ascend_green text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                       <Plus size={14} /> Registrar Transação
                    </button>
                </div>
                <div className="space-y-1">
                    {isLoading ? (
                        <div className="space-y-4 p-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : displayTransactions.length === 0 ? (
                        <div className="p-12 text-center text-gray-600">
                            <DollarSign size={32} className="mx-auto mb-4 opacity-20" />
                            <p className="text-xs uppercase font-black tracking-widest">Nenhuma transação registrada.</p>
                        </div>
                    ) : (
                        displayTransactions.map((t: any) => (
                            <div key={t.id} className="flex justify-between items-center p-4 hover:bg-black border-b border-white/[0.02] last:border-0 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded bg-white/5 ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                        <DollarSign size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-white/40 transition-colors">{t.description}</p>
                                        <p className="text-xs md:text-[10px] text-gray-600 uppercase tracking-widest">{new Date(t.date).toLocaleDateString()} • {t.paymentMethod} • {t.category}</p>
                                    </div>
                                </div>
                                <span className={`font-mono font-bold ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )}
        
        {/* Placeholder for Add Modal */}
        {showAddModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                <div className="w-full max-w-md bg-[#080808] border border-white/5 p-5 md:p-8 rounded-none relative z-10 animate-slide-up shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em]">Nova Operação</h3>
                        <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">&times;</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <button 
                                onClick={() => setNewTx({...newTx, type: 'income'})}
                                className={`py-3 text-xs font-bold uppercase tracking-wider rounded ${newTx.type === 'income' ? 'bg-winf-ascend_green/20 text-winf-ascend_green border border-winf-ascend_green/40' : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'}`}
                            >
                                Receita
                            </button>
                            <button 
                                onClick={() => setNewTx({...newTx, type: 'expense'})}
                                className={`py-3 text-xs font-bold uppercase tracking-wider rounded ${newTx.type === 'expense' ? 'bg-red-500/20 text-red-500 border border-red-500/40' : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'}`}
                            >
                                Despesa
                            </button>
                        </div>

                        <div>
                            <label className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Descrição</label>
                            <input 
                                type="text"
                                value={newTx.description}
                                onChange={(e) => setNewTx({...newTx, description: e.target.value})}
                                placeholder="Ex: Película AeroCore"
                                className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:border-winf-primary focus:outline-none placeholder-gray-800"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Valor (R$)</label>
                                <input 
                                    type="number"
                                    value={newTx.amount}
                                    onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                                    placeholder="0.00"
                                    className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:border-winf-primary focus:outline-none placeholder-gray-800"
                                />
                            </div>
                            <div>
                                <label className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Método</label>
                                <select 
                                    value={newTx.paymentMethod}
                                    onChange={(e) => setNewTx({...newTx, paymentMethod: e.target.value})}
                                    className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:border-winf-primary focus:outline-none appearance-none"
                                >
                                    <option value="Pix">Pix</option>
                                    <option value="Credit">Cartão Crédito</option>
                                    <option value="Debit">Cartão Débito</option>
                                    <option value="Cash">Dinheiro</option>
                                    <option value="BankTransfer">Transferência</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Categoria</label>
                            <select 
                                value={newTx.category}
                                onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-none p-3 text-sm text-white focus:border-winf-primary focus:outline-none appearance-none"
                            >
                                <option value="Aplicação">Aplicação</option>
                                <option value="Estoque">Material / Estoque</option>
                                <option value="Marketing">Marketing / Tráfego</option>
                                <option value="Impostos">Impostos</option>
                                <option value="Software">Software</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button 
                                onClick={handleAddTx} 
                                disabled={!newTx.description || !newTx.amount}
                                className="w-full py-4 bg-white hover:bg-white/90 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.2em] rounded-none transition-colors"
                            >
                                Confirmar Registro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ModuleFinancial;
