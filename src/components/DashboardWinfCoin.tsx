import React, { useEffect, useState } from 'react';
import { Coins, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight, Megaphone, Globe, CheckCircle2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion } from 'framer-motion';

const DashboardWinfCoin: React.FC<{user: any, onRedeem: any}> = ({ user, onRedeem }) => {
  const { coinLedger, fetchCoinLedger } = useWinf();
  const [loading, setLoading] = useState(false);
  useEffect(() => { fetchCoinLedger(); }, []);

  const handleRedeem = async (serviceName: string, cost: number) => {
    setLoading(true);
    await onRedeem(cost, serviceName);
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10 max-w-4xl mx-auto pb-12 text-white">
        
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 pb-8 border-b border-white/5">
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span> WINF COIN LEDGER
             </div>
             <h2 className="text-4xl font-light tracking-tight">Financial <span className="font-medium text-white/70">Hub</span></h2>
             <p className="text-white/40 text-sm font-light tracking-wide">Plataforma de incentivos de performance WINF™.</p>
          </div>
          
          <div className="bg-[#050505] border border-white/5 p-6 rounded-sm min-w-[250px]">
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-[0.2em] mb-2">Seu Saldo Consolidado</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-light tracking-tighter leading-none">{user?.winfCoins || 0}</span>
              <span className="text-xs font-bold text-white/40 mb-1 tracking-widest">WC</span>
            </div>
          </div>
        </div>
        
        {/* Marketing Activations Section */}
        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8">
            <h3 className="text-sm font-light tracking-wide text-white mb-6 flex items-center gap-2">
                <Megaphone size={16} /> Ativação de Marketing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-sm">
                    <div className="mb-4 text-white/30"><Globe size={24}/></div>
                    <h4 className="text-sm font-medium text-white mb-1">OnePage Oficial</h4>
                    <p className="text-xs text-white/50 mb-4">Página de conversão dedicada.</p>
                    <button 
                        disabled={loading || (user?.winfCoins || 0) < 1000}
                        onClick={() => handleRedeem('OnePage Oficial', 1000)}
                        className="w-full py-2 bg-white text-black text-xs md:text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        Trocar por 1000 WC
                    </button>
                </div>
                <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-sm">
                    <div className="mb-4 text-white/30"><Megaphone size={24}/></div>
                    <h4 className="text-sm font-medium text-white mb-1">Gestão Redes Sociais</h4>
                    <p className="text-xs text-white/50 mb-4">Configuração e gestão de redes.</p>
                    <button 
                        disabled={loading || (user?.winfCoins || 0) < 500}
                        onClick={() => handleRedeem('Gestão Redes Sociais', 500)}
                        className="w-full py-2 bg-white text-black text-xs md:text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        Trocar por 500 WC
                    </button>
                </div>
            </div>
        </motion.div>

        {/* Ledger */}
        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8">
            <h3 className="text-sm font-light tracking-wide text-white mb-6">Extrato de Transações</h3>
            
            <div className="space-y-2">
                {coinLedger.length === 0 ? (
                  <div className="p-12 text-center text-white/30 text-sm font-light border border-white/5 border-dashed rounded-sm">
                    Nenhuma transação registrada.
                  </div>
                ) : (
                  coinLedger.map((entry) => (
                      <div key={entry.id} className="flex justify-between items-center p-5 bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors rounded-sm group">
                          <div className="flex items-center gap-5">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${entry.amount > 0 ? 'bg-white/5 border-white/10 text-white/80' : 'bg-transparent border-white/5 text-white/30'}`}>
                                {entry.amount > 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                              </div>
                              <div>
                                  <p className="text-sm font-medium text-white mb-1 group-hover:text-white transition-colors">{entry.description}</p>
                                  <p className="text-xs md:text-[10px] text-white/40 font-mono tracking-widest uppercase">{new Date(entry.created_at).toLocaleString('pt-BR')}</p>
                              </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-lg font-light tracking-tight ${entry.amount > 0 ? 'text-white' : 'text-white/50'}`}>
                                {entry.amount > 0 ? '+' : ''}{entry.amount}
                            </span>
                          </div>
                      </div>
                  ))
                )}
            </div>
        </motion.div>
    </motion.div>
  );
};
export default DashboardWinfCoin;
