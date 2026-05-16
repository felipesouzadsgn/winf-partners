import React, { useState } from 'react';
import { Network, Database, Cpu, Lock, CheckCircle2, ChevronLeft, Globe, Activity, FileKey2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const ModuleWinfChain: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { user } = useWinf();
  const [activeTab, setActiveTab] = useState<'explorer' | 'contracts'>('explorer');

  // Simulated blockchain data
  const latestBlocks = Array.from({length: 6}, (_, i) => ({
    number: 14859000 + i,
    hash: '0x' + Array.from({length: 20}, () => Math.floor(Math.random()*16).toString(16)).join(''),
    transactions: Math.floor(Math.random() * 50) + 1,
    time: `${Math.floor(Math.random() * 60)}s ago`,
    validator: ['Node-Alpha', 'Node-Select', 'Node-Nexus', 'Node-Armor'][Math.floor(Math.random()*4)]
  })).reverse();

  const recentTransactions = Array.from({length: 8}, (_, i) => ({
    txHash: '0x' + Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join(''),
    type: ['BlackShop Purchase', 'License Minting', 'Coin Transfer', 'Warranty Registration'][Math.floor(Math.random()*4)],
    value: `${Math.floor(Math.random() * 5000) + 100} WNC`,
    status: 'Confirmed'
  }));

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-winf-primary/20 pb-8">
        <div className="space-y-4">
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-2 text-winf-primary/60 hover:text-winf-primary transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
              <ChevronLeft size={14} /> Voltar ao Painel
            </button>
          )}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-winf-primary/5 border border-winf-primary/20 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-winf-primary mb-4">
              <span className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-ping"></span>
              Mainnet Online
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Módulo <span className="font-medium text-winf-primary">I-Blockchain</span></h1>
          </div>
        </div>

        <div className="flex bg-[#0A0A0A] p-1.5 border border-winf-primary/10 shadow-2xl">
            <button onClick={() => setActiveTab("explorer")} className={`flex items-center gap-2 px-6 py-2.5 text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === "explorer" ? "bg-winf-primary/10 text-winf-primary" : "text-white/40 hover:text-winf-primary/60"}`}>
                <Database size={14} /> BLOCK EXPLORER
            </button>
            <button onClick={() => setActiveTab("contracts")} className={`flex items-center gap-2 px-6 py-2.5 text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === "contracts" ? "bg-winf-primary/10 text-winf-primary" : "text-white/40 hover:text-winf-primary/60"}`}>
                <FileKey2 size={14} /> SMART CONTRACTS
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-[#050505] border border-winf-primary/20 p-6 flex flex-col gap-2">
          <span className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest">Network Status</span>
          <div className="text-xl text-winf-primary flex items-center gap-2"><Globe size={20} /> 100% Uptime</div>
        </div>
        <div className="bg-[#050505] border border-winf-primary/20 p-6 flex flex-col gap-2">
          <span className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest">TPS (Transactions/sec)</span>
          <div className="text-xl text-white flex items-center gap-2"><Activity size={20} className="text-winf-primary" /> 1,204</div>
        </div>
        <div className="bg-[#050505] border border-winf-primary/20 p-6 flex flex-col gap-2">
          <span className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest">Total Blocks</span>
          <div className="text-xl text-white flex items-center gap-2"><Database size={20} className="text-winf-primary" /> 14,859,005</div>
        </div>
        <div className="bg-[#050505] border border-winf-primary/20 p-6 flex flex-col gap-2">
          <span className="text-xs md:text-[10px] text-white/50 uppercase tracking-widest">Connected Nodes</span>
          <div className="text-xl text-white flex items-center gap-2"><Network size={20} className="text-winf-primary" /> 342 Nodes</div>
        </div>
      </div>

      {activeTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8">
             <h3 className="text-lg text-white mb-6 uppercase tracking-widest border-b border-winf-primary/20 pb-4">Latest Blocks</h3>
             <div className="space-y-4">
                {latestBlocks.map((block, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-[#111] border border-white/5 hover:border-winf-primary/30 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-winf-primary/10 text-winf-primary flex items-center justify-center">
                           <Database size={16} />
                        </div>
                        <div>
                           <div className="text-winf-primary text-sm font-bold">#{block.number}</div>
                           <div className="text-xs md:text-[10px] text-white/40">{block.time} • Validated by {block.validator}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-sm text-white">{block.transactions} txns</div>
                        <div className="text-xs md:text-[10px] text-white/40 truncate w-24">{block.hash}...</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8">
             <h3 className="text-lg text-white mb-6 uppercase tracking-widest border-b border-winf-primary/20 pb-4">Recent Transactions</h3>
             <div className="space-y-4">
                {recentTransactions.map((tx, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-[#111] border border-white/5 hover:border-winf-primary/30 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 text-winf-primary flex items-center justify-center">
                           <CheckCircle2 size={16} />
                        </div>
                        <div>
                           <div className="text-white text-sm truncate w-32">{tx.txHash}...</div>
                           <div className="text-xs md:text-[10px] text-white/40">{tx.type}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-bold text-winf-primary">{tx.value}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="bg-[#0A0A0A] border border-white/5 p-5 md:p-8">
          <div className="max-w-3xl mx-auto space-y-6 text-center py-12 border border-winf-primary/20 bg-[#050505]">
             <Cpu size={48} className="text-winf-primary mx-auto mb-4" />
             <h3 className="text-2xl text-white uppercase tracking-tighter">Smart Contracts Library</h3>
             <p className="text-white/50 text-sm">Deploy automated rules for warranties, licensing distribution, and royalties directly on the Winf I-Blockchain.</p>
             <div className="pt-6">
                <button className="px-6 py-3 border border-winf-primary text-winf-primary text-xs md:text-[10px] font-bold uppercase tracking-widest hover:bg-winf-primary hover:text-black transition-colors">
                  Create New Contract
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleWinfChain;
