import React, { useState } from 'react';
import { TrendingUp, Globe, Ship, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const PRODUCTS = [
  { id: 'invisible', name: 'Winf Select™ Invisible', costBR: 1500, costChina: 200 /* 1000 -> 200 is 20% / 1500 -> 300?? User said 1000->200. If 1500 let's use user's proportion: roughly R$ 200 to R$ 300 */, pricePerM2: 280 },
  { id: 'dual', name: 'Winf Select™ Dual Reflect', costBR: 800, costChina: 120, pricePerM2: 160 },
  { id: 'blackpro', name: 'Winf Select™ BlackPro', costBR: 500, costChina: 80, pricePerM2: 140 },
  { id: 'white', name: 'Winf Select™ White', costBR: 800, costChina: 120, pricePerM2: 200 }
];

export const ImportSimulator = () => {
  const [rollsPerMonth, setRollsPerMonth] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const m2PerRoll = 45;

  const revenue = rollsPerMonth * m2PerRoll * selectedProduct.pricePerM2;
  const totalCostBR = rollsPerMonth * selectedProduct.costBR;
  // If user said "Um rolo que no Brasil pago 1000 na china chega a 200" = 20%
  const chinaCostExtrapolated = selectedProduct.costBR * 0.2; 
  const totalCostChina = rollsPerMonth * chinaCostExtrapolated;

  const profitBR = revenue - totalCostBR;
  const profitChina = revenue - totalCostChina;
  const edgeMargin = profitChina - profitBR;

  // Let's make some chart data
  const chartData = [
    { name: 'Mês 1', br: profitBR * 0.8, china: profitChina * 0.8 },
    { name: 'Mês 2', br: profitBR * 0.9, china: profitChina * 0.9 },
    { name: 'Mês 3', br: profitBR * 1.0, china: profitChina * 1.0 },
    { name: 'Mês 4', br: profitBR * 1.2, china: profitChina * 1.2 },
    { name: 'Mês 5', br: profitBR * 1.5, china: profitChina * 1.5 },
  ];

  const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="bg-zinc-900/50 border border-white/5 p-8 relative overflow-hidden mt-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[100px] pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider italic flex items-center gap-2">
            <Globe className="text-green-500" /> Máquina de Escala & Importação Direta
          </h3>
          <p className="text-xs text-white/40 max-w-2xl mt-2">
            Com a entrada de capital, a Winf Partners assumirá a importação direta da Ásia (China / Coréia), cortando distribuidores intermediários no Brasil. Simulador de margem de produtos com importação escala Winf.
          </p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 flex items-center gap-2">
          <Ship size={16} className="text-green-500" />
          <span className="text-xs font-bold text-green-500 tracking-wider">ROTA ASIA-BR ATIVADA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black/40 border border-white/5 p-5">
            <label className="block text-xs md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Linha de Película</label>
            <div className="space-y-2">
              {PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`w-full text-left p-3 text-xs tracking-wider transition-all border ${selectedProduct.id === p.id ? 'bg-zinc-800 border-white/20 text-white' : 'bg-transparent border-white/5 text-zinc-400 hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{p.name}</span>
                    <span>Venda: {formatBRL(p.pricePerM2)}/m²</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-5">
            <div className="flex justify-between mb-2">
              <label className="text-xs md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Volume (Rolos / Mês)</label>
              <span className="text-green-400 font-mono text-xs">{rollsPerMonth} Rolos</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="200" 
              step="1"
              value={rollsPerMonth}
              onChange={(e) => setRollsPerMonth(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-2 text-sm md:text-[11px] md:text-[9px] text-zinc-600 font-mono">
              <span>1 Rolo (45m²)</span>
              <span>200 Rolos/mês</span>
            </div>
          </div>

          <div className="bg-green-500/5 border border-green-500/20 p-5">
             <h4 className="text-xs md:text-[10px] text-green-500 font-bold uppercase tracking-widest mb-1">Spread de Importação</h4>
             <p className="text-sm font-light text-white my-2">Custo BR: <span className="text-red-400">{formatBRL(selectedProduct.costBR)}</span></p>
             <p className="text-sm font-light text-white border-b border-white/10 pb-3 mb-2">Custo China: <span className="text-green-400">{formatBRL(chinaCostExtrapolated)}</span> <span className="text-xs md:text-[10px] text-zinc-500 ml-1">(Chegando no BR com imposto)</span></p>
             <p className="text-sm md:text-[11px] text-green-400/80 leading-tight">A Winf absorve a margem gigantesca dos atravessadores. Um lucro que irriga o ecossistema BlackShop.</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-center">
                 <span className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Receita Instalada ({rollsPerMonth * m2PerRoll}m²)</span>
                 <span className="text-xl font-bold text-white">{formatBRL(revenue)}</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-center">
                 <span className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Custo Insumo (Atual BR)</span>
                 <span className="text-xl font-bold text-red-400">{formatBRL(totalCostBR)}</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-center">
                 <span className="text-xs md:text-[10px] text-green-500 uppercase tracking-widest mb-1">Custo Insumo (China)</span>
                 <span className="text-xl font-bold text-green-400">{formatBRL(totalCostChina)}</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-center border-l-2 border-l-green-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2"><TrendingUp size={16} className="text-green-500/50" /></div>
                 <span className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Lucro Extrapolado</span>
                 <span className="text-xl font-bold text-white">{formatBRL(profitChina)}</span>
              </div>
           </div>

           <div className="bg-black/40 border border-white/5 p-6 flex-1 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-sm md:text-[11px] text-white uppercase tracking-widest font-bold">Projeção Crescimento (+ Demanda Asset Light)</span>
                 <div className="flex items-center gap-4 text-xs md:text-[10px] tracking-wider uppercase font-mono">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-zinc-600 rounded-full"></div> Margem Atual (BR)</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div> Margem China</div>
                 </div>
              </div>
              <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorChina" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBR" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#52525b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#52525b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${(value/1000).toFixed(0)}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px' }}
                        formatter={(val: number) => formatBRL(val)}
                      />
                      <Area type="monotone" dataKey="china" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorChina)" activeDot={{ r: 6, fill: '#22c55e', stroke: '#000', strokeWidth: 2 }} />
                      <Area type="monotone" dataKey="br" stroke="#52525b" strokeWidth={2} fillOpacity={1} fill="url(#colorBR)" activeDot={{ r: 6, fill: '#52525b', stroke: '#000', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
