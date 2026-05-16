import React, { useState } from 'react';
import { Activity, MapPin, Users, Package, Zap, TrendingUp, Shield, Server, Box, Crosshair, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const METRICS_NORDESTE = [
  { month: 'Jan', revenue: 120, leads: 400 },
  { month: 'Fev', revenue: 155, leads: 520 },
  { month: 'Mar', revenue: 210, leads: 700 },
  { month: 'Abr', revenue: 280, leads: 850 },
  { month: 'Mai', revenue: 390, leads: 1100 },
  { month: 'Jun', revenue: 520, leads: 1600 },
];

export const HubNordeste: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'operacao' | 'tech'>('operacao');

  return (
    <div className="space-y-6 animate-fade-in w-full text-white">
      {/* Header Hub Nordeste */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-zinc-900 border border-white/10 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-sm font-medium text-zinc-400">Dark Pool Investments</h2>
            <span className="bg-green-500/20 text-green-500 text-xs md:text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm border border-green-500/20">W12 Cadeira 02</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tighter uppercase mb-1 flex items-center gap-2">
            <MapPin className="text-green-500" /> Hub Nordeste
          </div>
          <p className="text-xs text-white/40 max-w-xl">
            Base Founder Asset Light: Campina Grande (PB). Centro de inteligência tecnológica (Winf OS) operado pelo Asset Light e Founder Tiago (Tech).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
           <button 
             onClick={() => setActiveSubTab('operacao')}
             className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest rounded-lg border ${activeSubTab === 'operacao' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-transparent text-white/40 hover:bg-white/5'}`}
           >
             Cadeia de Operação
           </button>
           <button 
             onClick={() => setActiveSubTab('tech')}
             className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest rounded-lg border ${activeSubTab === 'tech' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-transparent text-white/40 hover:bg-white/5'}`}
           >
             Tech Center (QG)
           </button>
        </div>
      </div>

      {activeSubTab === 'operacao' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-black border border-white/10 p-6 rounded-xl relative overflow-hidden">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <TrendingUp size={14} className="text-green-500" /> Crescimento da Rede (Nordeste)
               </div>
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 text-xs md:text-[10px] text-zinc-500 uppercase font-mono"><span className="w-2 h-2 rounded-full bg-green-500"></span> Faturamento (k)</div>
                 <div className="flex items-center gap-1 text-xs md:text-[10px] text-zinc-500 uppercase font-mono"><span className="w-2 h-2 rounded-full bg-zinc-600"></span> Aplicações Ativas</div>
               </div>
             </div>
             
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={METRICS_NORDESTE} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', fontSize: '12px' }}
                      itemStyle={{ color: '#white' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="leads" stroke="#52525b" strokeWidth={2} fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             
             <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                <div>
                  <p className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Asset Lights Ativos</p>
                  <p className="text-2xl font-mono font-bold text-white">42</p>
                </div>
                <div>
                  <p className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Kiosks Flagship</p>
                  <p className="text-2xl font-mono font-bold text-white">03</p>
                </div>
                <div>
                  <p className="text-xs md:text-[10px] text-green-500 uppercase font-bold tracking-widest mb-1">Dividendos (Este mês)</p>
                  <p className="text-xl font-mono font-bold text-green-500">R$ 18.5K</p>
                </div>
             </div>
          </div>

          {/* Right Column: Estratégia de Expansão */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl">
               <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                 <Crosshair size={14} className="text-white" /> Estratégia de Capilaridade
               </h3>
               
               <div className="space-y-4">
                 <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
                   <h4 className="text-sm md:text-[11px] font-bold text-white uppercase mb-1">Passo 1: Domínio da PB</h4>
                   <p className="text-xs md:text-[10px] text-zinc-400">Consolidação do ecossistema a partir de Campina Grande. Validação de modelos de IA aplicados a estufas regionais (sol forte).</p>
                 </div>
                 <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
                   <h4 className="text-sm md:text-[11px] font-bold text-white uppercase mb-1">Passo 2: Invasão Litorânea</h4>
                   <p className="text-xs md:text-[10px] text-zinc-400">Abertura de Kiosks Flagship em Recife, Natal e Fortaleza. Áreas críticas devido à salinidade e calor excessivo.</p>
                 </div>
                 <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
                   <h4 className="text-sm md:text-[11px] font-bold text-white uppercase mb-1">Passo 3: Distribuição BlackShop</h4>
                   <p className="text-xs md:text-[10px] text-zinc-400">Criação de um Mini-Centro de Distribuição (Cross-docking) na região para agilizar entregas para a rede Asset Light Nordeste.</p>
                 </div>
               </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center">
               <Activity className="text-green-500 mx-auto mb-3" size={24} />
               <p className="text-sm font-bold text-green-500 uppercase tracking-widest mb-2">Máquina Refinada</p>
               <p className="text-sm md:text-[11px] text-green-500/80 leading-relaxed font-mono">
                 O Hub Nordeste tem como meta se tornar a segunda maior operação em faturamento do Brasil até o Q4 2026, aproveitando as condições climáticas extremas da região que exigem película no setor imobiliário e automotivo.
               </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'tech' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <div className="bg-black border border-white/10 p-8 rounded-xl flex flex-col justify-center items-center text-center">
            <Server size={48} className="text-zinc-600 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">QG de Inteligência & IA</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Campina Grande não é apenas um polo administrativo. É o coração do desenvolvimento de Software, Big Data e Algoritmos Preditivos da Winf. Daqui saem as análises de calor que direcionam onde abrir o próximo Kiosk.
            </p>
            
            <div className="mt-8 space-y-3 w-full max-w-sm">
              <div className="flex justify-between items-center p-3 border border-white/10 bg-white/5 rounded-lg">
                <span className="text-xs font-mono text-zinc-300">Winf OS Core (Uptime)</span>
                <span className="text-xs font-mono text-green-500">99.99%</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-white/10 bg-white/5 rounded-lg">
                <span className="text-xs font-mono text-zinc-300">Processamento IA (leads/dia)</span>
                <span className="text-xs font-mono text-white">4.5M Ops</span>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-xl">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Roadmap Tech Nordeste</h3>
             <ul className="space-y-6 relative border-l border-white/10 pl-4 ml-2">
               <li className="relative">
                 <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                 <p className="text-sm md:text-[11px] font-mono text-green-500 mb-1">DEPLOYED</p>
                 <p className="text-sm font-bold text-white mb-1">Sinf-Chain Alpha</p>
                 <p className="text-xs text-zinc-400">Implementação inicial do mapeamento geo-espacial da rede e registro de Asset Lights.</p>
               </li>
               <li className="relative">
                 <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                 <p className="text-sm md:text-[11px] font-mono text-blue-500 mb-1">IN PROGRESS</p>
                 <p className="text-sm font-bold text-white mb-1">Automação de D2C (BlackShop)</p>
                 <p className="text-xs text-zinc-400">Integração do hub logístico com a API de suprimentos para despacho ultra-rápido.</p>
               </li>
               <li className="relative">
                 <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-600"></span>
                 <p className="text-sm md:text-[11px] font-mono text-zinc-500 mb-1">UPCOMING (Q3 2026)</p>
                 <p className="text-sm font-bold text-white mb-1">Thermal Vision Analytics</p>
                 <p className="text-xs text-zinc-400">Ferramenta que analisa satélites meteorológicos para prever demanda de estética térmica em cidades específicas.</p>
               </li>
             </ul>
          </div>
        </div>
      )}
    </div>
  );
};
