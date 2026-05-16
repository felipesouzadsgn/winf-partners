
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { Zap, Thermometer, TrendingDown, Activity } from 'lucide-react';

interface SimulatorTechnicalChartsProps {
  intensity: number;
  filmId: string;
  area: string;
}

const SimulatorTechnicalCharts: React.FC<SimulatorTechnicalChartsProps> = ({ intensity, filmId, area }) => {
  const { products } = useWinf();
  const areaValue = parseFloat(area) || 100;
  
  // Find selected film from context
  const selectedProduct = products.find(item => item.id === filmId) || products[0];

  // Helper to get numeric percentage from strings like "99%" or "99.8%"
  const getNumericValue = (val: string | undefined, fallback: number) => {
    if (!val) return fallback;
    return parseFloat(val.replace('%', '')) || fallback;
  };

  const irrValue = getNumericValue(selectedProduct?.tech_specs?.irr, 70);
  const uvrValue = getNumericValue(selectedProduct?.tech_specs?.uvr, 99);

  // Data generation based on intensity and film efficiency
  const generateThermalData = () => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
      const time = `${i * 10}min`;
      const commonHeat = Math.round((intensity * 0.8) * (i / 10) * 5);
      // Winf heat reduction based on film specs
      // 100% - irrValue is what passes through
      const reductionFactor = (100 - irrValue) / 100;
      const winfHeat = Math.round((intensity * 0.8 * reductionFactor) * (i / 10) * 5);
      data.push({ time, common: commonHeat, winf: winfHeat });
    }
    return data;
  };

  const generateEnergyData = () => {
    const baseCost = 450 * (areaValue / 100); // Scale by area
    const reduction = Math.round((intensity / 100) * 280 * (areaValue / 100)); // Scale by area
    return [
      { name: 'Sem Proteção', cost: baseCost, color: '#ef4444' },
      { name: 'Blindagem WINF™', cost: baseCost - reduction, color: '#050505' }
    ];
  };

  const thermalData = generateThermalData();
  const energyData = generateEnergyData();

  const monthlySavings = Math.round((intensity / 100) * 280 * (areaValue / 100));
  const estimatedInvestment = (selectedProduct as any)?.price ? (selectedProduct as any).price * areaValue : 3500 * (areaValue / 100);
  const paybackMonths = Math.ceil(estimatedInvestment / Math.max(1, monthlySavings));


  const generateLifeSpanData = () => {
    const data = [];
    for (let year = 0; year <= 10; year++) {
      // Common film loses 15% efficiency per year
      const commonEfficiency = Math.max(0, 100 - (year * 15));
      // Winf loses 0.5% efficiency per year
      const winfEfficiency = 100 - (year * 0.5);
      data.push({ year: `Ano ${year}`, common: commonEfficiency, winf: winfEfficiency });
    }
    return data;
  };

  const lifeSpanData = generateLifeSpanData();

  return (
    <div className="mt-20 lg:mt-32 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="max-w-xl">
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Proteção em <span className="text-white italic">Tempo Real</span>
          </h3>
          <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed uppercase tracking-widest">
            Simulação termodinâmica comprovando a rejeição de calor que você sentirá na pele.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white/[0.03] border border-white/10 rounded-none flex items-center gap-3">
            <Activity size={16} className="text-white animate-pulse" />
            <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/60">Live Data Sync</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thermal Load Chart */}
        <div className="bg-black border border-white/5 rounded-none p-5 md:p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-none bg-red-500/10 flex items-center justify-center">
              <Thermometer size={20} className="text-red-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Sensação de Calor no Ambiente</h4>
              <p className="text-xs md:text-[10px] text-white/20 uppercase tracking-widest">Como o ambiente esquenta ao longo do dia</p>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermalData}>
                <defs>
                  <linearGradient id="colorCommon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWinf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="#ffffff20" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="common" 
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCommon)" 
                  name="Vidro Comum"
                />
                <Area 
                  type="monotone" 
                  dataKey="winf" 
                  stroke="#ffffff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorWinf)" 
                  name="Blindagem WINF™"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.01] rounded-none border border-white/5 text-center">
              <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-widest mb-1">Diferença Real</p>
              <p className="text-xl font-black text-white/80">+{Math.round(intensity * 0.4)}%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-none border border-winf-primary/20 text-center">
              <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white uppercase font-black tracking-widest mb-1">Conforto Térmico</p>
              <p className="text-xl font-black text-white">92.4%</p>
            </div>
          </div>
        </div>

        {/* Energy Savings Chart */}
        <div className="bg-black border border-white/5 rounded-none p-5 md:p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Economia na Conta de Luz</h4>
              <p className="text-xs md:text-[10px] text-white/20 uppercase tracking-widest">Menos uso do ar-condicionado é dinheiro no bolso</p>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData} layout="vertical" margin={{ left: 0 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff40" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Bar dataKey="cost" radius={[0, 10, 10, 0]} barSize={24}>
                  {energyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 bg-white/10 border border-winf-primary/20 rounded-none flex items-center justify-between">
            <div>
              <p className="text-xs md:text-[10px] text-white uppercase font-black tracking-widest mb-1">Economia Anual Projetada</p>
              <p className="text-3xl font-black text-white tracking-tighter">R$ {Math.round(monthlySavings * 12).toLocaleString('pt-BR')}</p>
            </div>
            <div className="w-12 h-12 rounded-none bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <TrendingDown size={24} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* ROI & Life Span Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payback Tracker */}
        <div className="lg:col-span-1 bg-black border border-white/5 rounded-none p-5 md:p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Investimento Inteligente</h4>
            <p className="text-xs md:text-[10px] text-white/20 uppercase tracking-widest mb-8">Seu conforto térmico se paga sozinho</p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-widest">Investimento Est.</span>
                <span className="text-lg font-black text-white">R$ {estimatedInvestment.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                <div className="h-full bg-white/20 w-1/3"></div>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black tracking-widest">Economia Mensal</span>
                <span className="text-lg font-black text-white">R$ {monthlySavings.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-none overflow-hidden">
                <div className="h-full bg-white w-2/3"></div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-white text-black rounded-none text-center">
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest mb-1">Retorno Estimado</p>
            <p className="text-4xl font-black tracking-tighter">12 a {Math.max(12, paybackMonths)} <span className="text-sm uppercase tracking-widest">Meses</span></p>
            <p className="text-[10px] md:text-[8px] font-bold uppercase tracking-widest mt-2 opacity-40">*Baseado em uso médio de Ar-condicionado</p>
          </div>
        </div>

        {/* Molecular Life Span Chart */}
        <div className="lg:col-span-2 bg-black border border-white/5 rounded-none p-5 md:p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Durabilidade Extrema</h4>
              <p className="text-xs md:text-[10px] text-white/20 uppercase tracking-widest">Sem desbotar ou perder eficiência térmica</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-none bg-red-500"></div>
                <span className="text-[10px] md:text-[8px] text-white/40 uppercase font-black tracking-widest">Comum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-none bg-white"></div>
                <span className="text-[10px] md:text-[8px] text-white/40 uppercase font-black tracking-widest">WINF™</span>
              </div>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lifeSpanData}>
                <XAxis dataKey="year" hide />
                <YAxis hide domain={[0, 100]} />
                <Area type="monotone" dataKey="common" stroke="#ef4444" strokeWidth={2} fill="#ef4444" fillOpacity={0.02} />
                <Area type="monotone" dataKey="winf" stroke="#ffffff" strokeWidth={2} fill="#ffffff" fillOpacity={0.02} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-white/5 border border-winf-primary/10 rounded-none">
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white text-center uppercase tracking-[0.2em] font-bold leading-relaxed">
              Enquanto películas comuns ressecam e perdem a cor em 1 ou 2 anos, a proteção WINF™ continua 
              bloqueando o calor de forma idêntica ao primeiro dia por mais de uma década.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorTechnicalCharts;
