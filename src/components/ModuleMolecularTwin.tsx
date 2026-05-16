import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Sun, 
  Thermometer, 
  Search, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Layers,
  Cpu,
  Eye,
  Settings,
  Database,
  Share2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';

interface MoleculeProps {
  active?: boolean;
  type: 'UV' | 'HEAT' | 'PROTECTION';
  delay?: number;
}

const Molecule: React.FC<MoleculeProps> = ({ active, type, delay = 0 }) => {
  const colors = {
    UV: 'bg-orange-500',
    HEAT: 'bg-red-500',
    PROTECTION: 'bg-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: active ? 1 : 0.2, 
        scale: active ? 1 : 0.5,
        x: active ? [0, 10, -10, 0] : 0,
        y: active ? [0, -10, 10, 0] : 0
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        delay,
        ease: "linear" 
      }}
      className={`w-3 h-3 rounded-none ${colors[type]} blur-[1px]`}
    />
  );
};

const MetricBadge = ({ label, value, unit, color }: any) => (
  <div className="bg-[#0A0A0A]/50 border border-white/10 p-3 rounded-none">
    <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className={`text-xl font-black ${color}`}>{value}</span>
      <span className="text-xs md:text-[10px] font-bold text-white/40">{unit}</span>
    </div>
  </div>
);

const ModuleMolecularTwin: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { products: contextProducts } = useWinf();
  const [activeProduct, setActiveProduct] = useState('');
  const [simulationActive, setSimulationActive] = useState(false);
  const [viewMode, setViewMode] = useState<'CLIENT' | 'EXPERT'>('CLIENT');

  // Map context products to a format compatible with this view
  const twinProducts = contextProducts.map(p => ({
    id: p.id,
    name: p.name,
    vlt: p.tech_specs?.vlt || '0%',
    irr: p.tech_specs?.irr || '0%',
    uvr: p.tech_specs?.uvr || '0%',
    tser: p.tech_specs?.tser || '0%',
    color: p.line?.includes('AeroCore') ? 'text-white' : p.line?.includes('Black') ? 'text-white/40' : 'text-blue-400',
    line: p.line || 'WINF SERIES™'
  }));

  const currentProduct = twinProducts.find(p => p.name === activeProduct) || twinProducts[0] || {
    id: 'default',
    name: 'Seleção Inteligente',
    vlt: '0%',
    irr: '0%',
    uvr: '0%',
    tser: '0%',
    color: 'text-white',
    line: 'WINF™'
  };

  useEffect(() => {
    if (twinProducts.length > 0 && !activeProduct) {
      setActiveProduct(twinProducts[0].name);
    }
  }, [twinProducts, activeProduct]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]/30 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-none text-white/40 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Gêmeo Molecular™ WINF</h1>
            <p className="text-xs md:text-[10px] font-bold text-white tracking-widest uppercase">Inteligência de Isolamento Térmico</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 bg-[#050505] border border-white/10 rounded-none">
          <button 
            onClick={() => setViewMode('CLIENT')}
            className={`px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'CLIENT' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-white/40 hover:text-white'}`}
          >
            Visão Executiva
          </button>
          <button 
            onClick={() => setViewMode('EXPERT')}
            className={`px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'EXPERT' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-white/40 hover:text-white'}`}
          >
            Matemática Avançada
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Simulation Stage */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden p-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Vulnerable Zone */}
            <div className="flex-1 bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/10 rounded-none p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-none text-red-500">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Zona Vulnerável</h2>
                    <p className="text-xs md:text-[10px] text-red-500 font-bold uppercase">Radiação Desprotegida</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-red-500 rounded-none animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>

              <div className="flex-1 flex flex-wrap gap-4 items-center justify-center p-6 md:p-12">
                {[...Array(24)].map((_, i) => (
                  <Molecule key={i} type={i % 2 === 0 ? 'UV' : 'HEAT'} active={true} delay={i * 0.1} />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-none">
                  <span className="text-[10px] md:text-[8px] font-bold text-red-500 uppercase block mb-1">Penetração UV</span>
                  <span className="text-lg font-black text-white">100%</span>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-none">
                  <span className="text-[10px] md:text-[8px] font-bold text-red-500 uppercase block mb-1">Impacto Térmico</span>
                  <span className="text-lg font-black text-white">+42°C</span>
                </div>
              </div>
            </div>

            {/* Transition Barrier */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-4">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-winf-border to-transparent" />
              <button 
                onClick={() => setSimulationActive(!simulationActive)}
                className={`w-14 h-14 rounded-none flex items-center justify-center border-4 border-winf-background shadow-2xl transition-all z-10 ${simulationActive ? 'bg-white text-black' : 'bg-[#0A0A0A] text-white/40'}`}
              >
                <Zap size={24} className={simulationActive ? 'animate-pulse' : ''} />
              </button>
              <div className="w-px h-full bg-gradient-to-b from-transparent via-winf-border to-transparent" />
            </div>

            {/* Protected Zone */}
            <div className={`flex-1 transition-all duration-700 rounded-none p-6 flex flex-col border ${simulationActive ? 'bg-gradient-to-b from-green-500/5 to-transparent border-green-500/30' : 'bg-[#0A0A0A]/30 border-white/10'}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-none transition-colors ${simulationActive ? 'bg-green-500/20 text-green-500' : 'bg-[#050505] text-white/40'}`}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Zona Protegida</h2>
                    <p className={`text-xs md:text-[10px] font-bold uppercase transition-colors ${simulationActive ? 'text-green-500' : 'text-white/40'}`}>
                      {simulationActive ? 'Proteção Ativa' : 'Desconectado'}
                    </p>
                  </div>
                </div>
                {simulationActive && (
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-green-500 rounded-none animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                )}
              </div>

              <div className="flex-1 relative flex flex-wrap gap-4 items-center justify-center p-6 md:p-12">
                <AnimatePresence>
                  {simulationActive ? (
                    [...Array(24)].map((_, i) => (
                      <Molecule key={i} type="PROTECTION" active={true} delay={i * 0.05} />
                    ))
                  ) : (
                    <div className="text-center opacity-10">
                      <Layers size={80} strokeWidth={0.5} />
                    </div>
                  )}
                </AnimatePresence>

                {/* Spectral Chart Line */}
                <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden opacity-30 pointer-events-none">
                   <svg viewBox="0 0 400 100" className="w-full h-full">
                     <motion.path
                       d="M 0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50"
                       fill="none"
                       stroke={simulationActive ? "#22c55e" : "#444"}
                       strokeWidth="2"
                       animate={{ x: [0, -100] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     />
                   </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className={`border p-3 rounded-none transition-all ${simulationActive ? 'bg-green-500/5 border-green-500/10' : 'bg-[#050505] border-white/10'}`}>
                  <span className={`text-[10px] md:text-[8px] font-bold uppercase block mb-1 ${simulationActive ? 'text-green-500' : 'text-white/40'}`}>Bloqueio Total</span>
                  <span className="text-lg font-black text-white">{simulationActive ? currentProduct.irr : '0.0%'}</span>
                </div>
                <div className={`border p-3 rounded-none transition-all ${simulationActive ? 'bg-green-500/5 border-green-500/10' : 'bg-[#050505] border-white/10'}`}>
                  <span className={`text-[10px] md:text-[8px] font-bold uppercase block mb-1 ${simulationActive ? 'text-green-500' : 'text-white/40'}`}>Equilíbrio Térmico</span>
                  <span className="text-lg font-black text-white">{simulationActive ? '24.5°C' : '--'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Tech Specs */}
        <div className="w-full lg:w-96 bg-[#0A0A0A] border-l border-white/10 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Product Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <Database size={14} /> Database de Películas
              </h3>
              <div className="space-y-2">
                {twinProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(p.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-none border transition-all text-left ${activeProduct === p.name ? 'bg-white/10 border-winf-primary/30' : 'bg-[#050505] border-white/10 hover:border-white/20'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-none bg-[#0A0A0A] border border-white/10 flex items-center justify-center ${activeProduct === p.name ? p.color : 'text-white/40'}`}>
                        <Layers size={16} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block">{p.name}</span>
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-black">{p.line || 'WINF SELECT'}</span>
                      </div>
                    </div>
                    {activeProduct === p.name && <CheckCircle2 size={16} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <Cpu size={14} /> Especificação Técnica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <MetricBadge label="Transmissão (VLT)" value={currentProduct.vlt} unit="" color="text-white" />
                <MetricBadge label="Rejeição IR" value={currentProduct.irr} unit="" color="text-white" />
                <MetricBadge label="Proteção UV" value={currentProduct.uvr} unit="" color="text-blue-500" />
                <MetricBadge label="Fator TSER" value={currentProduct.tser} unit="" color="text-orange-500" />
              </div>
            </div>

            {/* Diagnosis */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-none">
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-white" />
                <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Lote de Diagnóstico</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                A tecnologia <span className="text-white font-bold">{currentProduct.name}</span> utiliza uma grade molecular de nano-cerâmica avançada, filtrando <span className="text-white font-bold">{currentProduct.irr}</span> da radiação infravermelha sem bloquear o sinal GPS ou Celular. O gêmeo digital confirma estabilidade de <span className="text-white font-bold">99.8%</span> em exposição contínua.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <button className="flex flex-col items-center gap-2 p-3 bg-[#050505] border border-white/10 rounded-none hover:bg-[#0A0A0A] hover:border-winf-primary/30 transition-all group">
                <Share2 size={16} className="text-white/40 group-hover:text-white" />
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase text-white">Gerar Relatório</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-white text-black rounded-none hover:bg-white/90 transition-all font-black">
                <Eye size={16} />
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase">Ver em 3D</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleMolecularTwin;
