
import React, { useState } from 'react';
import { ChevronLeft, Share2, Map, Users, ArrowUpRight, TrendingUp, DollarSign, Target, Globe, Shield, Store, MousePointer2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useWinf } from '../contexts/WinfContext';

const TRAFFIC_DATA = [
  { name: 'Organic (Santos)', value: 45, color: '#71717a' },
  { name: 'Online Partners', value: 30, color: '#3f3f46' },
  { name: 'Kiosk Referrals', value: 25, color: '#a1a1aa' },
];

const ModuleNeuralFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user } = useWinf();
  const [activeTab, setActiveTab] = useState<'topology' | 'financial' | 'hosting'>('topology');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-xs font-mono uppercase tracking-widest">
            <ChevronLeft size={14} /> Back to Hub
          </button>
          <h1 className="text-4xl font-heading font-light text-white tracking-tight">NEURAL<span className="font-bold text-white/40">FLOW</span>™</h1>
          <p className="text-white/40 text-sm mt-1 font-mono uppercase tracking-wider opacity-60">Traffic Attribution & Yield Management // v2.0</p>
        </div>
        <div className="flex gap-2 bg-black border border-white/10 p-1 rounded-none">
           <button onClick={() => setActiveTab('topology')} className={`px-4 py-2 text-xs md:text-[10px] font-bold uppercase tracking-widest rounded-none transition-all ${activeTab === 'topology' ? 'bg-zinc-800 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}>Topologia</button>
           <button onClick={() => setActiveTab('financial')} className={`px-4 py-2 text-xs md:text-[10px] font-bold uppercase tracking-widest rounded-none transition-all ${activeTab === 'financial' ? 'bg-zinc-800 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}>Split Financeiro</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Visualization */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-winf-card border border-white/10 rounded-none p-5 md:p-8 relative overflow-hidden min-h-[500px]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            
            {activeTab === 'topology' && (
              <div className="relative h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                   <div>
                      <h3 className="text-xl font-bold text-white mb-1">Mapeamento Geofencing: {user?.territory || 'Santos'}</h3>
                      <p className="text-xs text-white/40">Fluxo de atribuição em tempo real baseado em geolocalização e link-referral.</p>
                   </div>
                   <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-none text-xs md:text-[10px] font-bold uppercase tracking-widest">
                      Protocolo W.A.R.P Ativo
                   </div>
                </div>

                {/* Central Node Visual */}
                <div className="flex-1 flex items-center justify-center relative">
                   {/* Lines (SVG) */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                      <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#71717a" strokeWidth="2" strokeDasharray="5,5" className="animate-[pulse_2s_infinite]" />
                      <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#3f3f46" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#a1a1aa" strokeWidth="2" />
                   </svg>

                   <div className="w-40 h-40 rounded-none bg-black border-4 border-zinc-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(113,113,122,0.3)] z-10 relative group">
                      <div className="absolute inset-0 bg-zinc-800/10 rounded-none animate-ping"></div>
                      <Shield size={40} className="text-white/40 mb-2" />
                      <span className="text-xs md:text-[10px] font-bold text-white">HUB SANTOS</span>
                      <span className="text-[10px] md:text-[8px] text-white/40 uppercase">STUDIO ALPHA</span>
                   </div>

                   {/* Satellites */}
                   <div className="absolute top-[10%] left-[10%] flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-none bg-black border border-zinc-700/50 flex items-center justify-center text-white/40 shadow-lg">
                         <Globe size={24} />
                      </div>
                      <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase">Tráfego Orgânico</span>
                   </div>

                   <div className="absolute top-[10%] right-[10%] flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-none bg-black border border-zinc-700/50 flex items-center justify-center text-white/40 shadow-lg">
                         <MousePointer2 size={24} />
                      </div>
                      <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase">Licenciados Online</span>
                   </div>

                   <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-none bg-black border border-zinc-700/50 flex items-center justify-center text-white/40 shadow-lg">
                         <Store size={24} />
                      </div>
                      <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase">Kiosk Referral</span>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-end">
                   <div>
                      <h3 className="text-xl font-bold text-white mb-1">Split de Receita (Yield)</h3>
                      <p className="text-xs text-white/40">Distribuição automática de comissões e taxas de execução.</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs md:text-[10px] text-white/40 uppercase font-bold tracking-widest">Yield Estimado (Mês)</p>
                      <p className="text-2xl font-mono text-white/40 font-bold">R$ 12.450,00</p>
                   </div>
                </div>

                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={TRAFFIC_DATA}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                         >
                            {TRAFFIC_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', fontSize: '12px'}} />
                      </PieChart>
                   </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {TRAFFIC_DATA.map(item => (
                      <div key={item.name} className="p-4 bg-white/5 border border-white/10 rounded-none">
                         <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-none" style={{backgroundColor: item.color}}></div>
                            <span className="text-xs md:text-[10px] font-bold text-white/40 uppercase">{item.name}</span>
                         </div>
                         <p className="text-lg font-mono text-white font-bold">{item.value}%</p>
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Tactical Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0A0A0A] border border-zinc-700/30 p-6 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-5 md:p-8 bg-zinc-800/5 rounded-none blur-xl"></div>
              <h4 className="text-white/40 text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Hospedagem de Execução</h4>
              <p className="text-xs text-white/40 leading-relaxed mb-6">
                Você tem <strong>3 serviços pendentes</strong> originados por licenciados online.
              </p>
              <div className="space-y-3">
                 {[
                   { partner: 'Leo Digital', car: 'BMW M3', fee: 'R$ 800' },
                   { partner: 'Ana Online', car: 'Porsche Macan', fee: 'R$ 1.200' },
                 ].map((job, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-none border border-white/5 hover:border-zinc-700/30 transition-all cursor-pointer group">
                       <div>
                          <p className="text-xs md:text-[10px] text-white/40 uppercase font-bold">{job.partner}</p>
                          <p className="text-sm font-bold text-white">{job.car}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-xs md:text-[10px] text-white/40 font-bold tracking-tighter">FEE: {job.fee}</p>
                          <ArrowUpRight size={14} className="text-gray-700 group-hover:text-white transition-colors" />
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 bg-zinc-800 text-white rounded-none text-xs md:text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                Abrir Agenda de Execução
              </button>
           </div>

           <div className="bg-winf-card border border-white/10 p-6 rounded-none">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Store size={14} className="text-white/40" /> Feed do Kiosk (Santos)
              </h4>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-1 h-8 bg-zinc-700 rounded-none"></div>
                    <div>
                       <p className="text-xs md:text-[10px] text-white/40 uppercase">Referral Gerado</p>
                       <p className="text-xs text-white/60">Cliente interessado em NeoSkin™ (Porsche 911).</p>
                    </div>
                 </div>
                 <div className="flex gap-3 opacity-50">
                    <div className="w-1 h-8 bg-gray-700 rounded-none"></div>
                    <div>
                       <p className="text-xs md:text-[10px] text-white/40 uppercase">Venda Direta (Gadget)</p>
                       <p className="text-xs text-white/60">Proteção de Tela AeroCore™ MOBILE.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleNeuralFlow;
