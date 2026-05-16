import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Rocket, 
  MapPin, 
  Target, 
  Lock, 
  Zap, 
  Globe, 
  Radar, 
  Loader, 
  Diamond, 
  ShieldCheck, 
  LayoutGrid,
  Maximize2,
  Building2,
  Car,
  AlertTriangle,
  CheckCircle,
  Store,
  MousePointer2
} from 'lucide-react';
/* Import useWinf to access user data */
import { useWinf } from '../contexts/WinfContext';

type Division = 'AUTOMOTIVE' | 'ARCHITECTURAL' | 'RETAIL_KIOSK';
type Tab = 'war-room' | 'intelligence' | 'disputes';

const CITIES = [
  { 
    name: 'SANTOS', 
    region: 'SP',
    auto: { aerocore: 'LOCKED', neoskin: 'LOCKED', ppf: 'LOCKED' },
    arch: { invisible: 'LOCKED', blackpro: 'DISPUTED', dualreflect: 'AVAILABLE' },
    retail: { mall_praiamar: 'LOCKED', mall_miramar: 'AVAILABLE', mall_litoral: 'DISPUTED' },
    demand: 94
  },
  { 
    name: 'SÃO PAULO (ALPHA)', 
    region: 'SP',
    auto: { aerocore: 'LOCKED', neoskin: 'DISPUTED', ppf: 'LOCKED' },
    arch: { invisible: 'LOCKED', blackpro: 'LOCKED', dualreflect: 'LOCKED' },
    retail: { mall_iguatemi: 'LOCKED', mall_jk: 'LOCKED', mall_cidade: 'DISPUTED' },
    demand: 99
  },
  { 
    name: 'BALNEÁRIO CAMBORIÚ', 
    region: 'SC',
    auto: { aerocore: 'LOCKED', neoskin: 'AVAILABLE', ppf: 'AVAILABLE' },
    arch: { invisible: 'AVAILABLE', blackpro: 'AVAILABLE', dualreflect: 'AVAILABLE' },
    retail: { mall_bc: 'AVAILABLE', mall_atlantico: 'AVAILABLE' },
    demand: 88
  }
];

const ModuleWarp: React.FC<{onBack: () => void}> = ({ onBack }) => {
  /* Use the user object from WinfContext to get the territory */
  const { user } = useWinf();
  const [division, setDivision] = useState<Division>('AUTOMOTIVE');
  const [activeTab, setActiveTab] = useState<Tab>('war-room');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const getStatusColor = (status: string) => {
    if (status === 'LOCKED') return 'bg-zinc-900/40 text-zinc-500 border-zinc-800/50';
    if (status === 'DISPUTED') return 'bg-zinc-800/20 text-white/40 border-zinc-700/40';
    return 'bg-white/5 text-white border-white/10';
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.05] pb-10 gap-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <ChevronLeft size={14} /> Mission Control
          </button>
          <h1 className="text-5xl font-heading font-light text-white tracking-tighter">W.A.R.P. <span className="font-bold text-winf-warp">COMMAND</span> v2.0</h1>
          <p className="text-white/40 text-xs mt-4 uppercase tracking-widest font-mono">Global Territory Control // GCM-256 Secured</p>
        </div>

        <div className="flex gap-2 p-1 bg-black border border-white/10 rounded-none">
            <button 
              onClick={() => setDivision('AUTOMOTIVE')}
              className={`px-6 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-2 ${division === 'AUTOMOTIVE' ? 'bg-zinc-800 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              <Car size={12} /> Auto
            </button>
            <button 
              onClick={() => setDivision('ARCHITECTURAL')}
              className={`px-6 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-2 ${division === 'ARCHITECTURAL' ? 'bg-zinc-800 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              <Building2 size={12} /> Arch
            </button>
            <button 
              onClick={() => setDivision('RETAIL_KIOSK')}
              className={`px-6 py-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-2 ${division === 'RETAIL_KIOSK' ? 'bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-white/40 hover:text-white/60'}`}
            >
              <Store size={12} /> Kiosk Fleet
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <div className="lg:col-span-8 bg-[#080808] border border-white/10 flex flex-col h-[700px]">
           <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                 <Radar size={16} className={scanning ? 'animate-spin text-white/40' : 'text-white/40'} />
                 Grid Territorial // {division}
              </h3>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              {CITIES.map(city => (
                <div key={city.name} className="bg-black/40 border border-white/[0.05] p-5 md:p-8 rounded-none hover:border-white/15 transition-all">
                   <div className="flex justify-between items-start mb-8">
                      <div>
                        <h4 className="text-white font-bold text-2xl tracking-tighter uppercase">{city.name}</h4>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-mono mt-1 font-bold">ZONA DE INTERESSE: {city.demand}%</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {division === 'RETAIL_KIOSK' ? (
                        <>
                          {Object.entries(city.retail || {}).map(([mall, status]) => (
                            <CellCard key={mall} label={mall.replace('mall_', '').toUpperCase()} status={status} color={getStatusColor(status as string)} tag="MALL POINT" />
                          ))}
                        </>
                      ) : division === 'AUTOMOTIVE' ? (
                        <>
                          <CellCard label="AeroCore™" status={city.auto.aerocore} color={getStatusColor(city.auto.aerocore)} />
                          <CellCard label="NeoSkin™" status={city.auto.neoskin} color={getStatusColor(city.auto.neoskin)} />
                        </>
                      ) : (
                        <>
                          <CellCard label="Winf™ Invisible" status={city.arch.invisible} color={getStatusColor(city.arch.invisible)} tag="STEALTH" />
                          <CellCard label="Winf™ BlackPro" status={city.arch.blackpro} color={getStatusColor(city.arch.blackpro)} tag="DOMINANCE" />
                        </>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 bg-[#050505] border border-white/10 p-6 md:p-10 space-y-10">
           <div>
              <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Inteligência de Varejo</p>
              <h3 className="text-3xl font-heading font-light text-white leading-tight">EXPANSÃO <br/><span className="font-bold text-white/40">MODULAR</span></h3>
           </div>

           <div className="space-y-6">
              <div className="bg-zinc-800/5 border border-zinc-700/20 p-6 rounded-none">
                 <div className="flex items-center gap-3 mb-4 text-white/40">
                    <MousePointer2 size={14} />
                    <span className="text-xs md:text-[10px] font-bold uppercase tracking-widest">Protocolo Kiosk Elite</span>
                 </div>
                 <p className="text-xs text-white/40 font-light leading-relaxed">
                    /* Fix: use user?.territory instead of undefined territory variable */
                    Identificamos um ponto de 12m² disponível no shopping de alto tráfego em {user?.territory || 'sua região'}. Taxa de ocupação ideal para o modelo Kiosk Retail.
                 </p>
                 <button className="w-full mt-6 py-4 bg-zinc-800 text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all">
                    Bloquear Localização
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const CellCard = ({ label, status, color, tag }: any) => (
  <div className={`p-5 rounded-none border flex flex-col gap-4 relative overflow-hidden group transition-all cursor-pointer ${color}`}>
     <div className="flex justify-between items-center">
        <span className="text-sm md:text-[11px] font-bold tracking-wider">{label}</span>
        {status === 'LOCKED' ? <Lock size={12} /> : status === 'DISPUTED' ? <Loader size={12} className="animate-spin" /> : <Maximize2 size={12} />}
     </div>
     <div className="flex justify-between items-end">
        <span className="text-[7px] font-black uppercase tracking-widest opacity-80">{status}</span>
        {tag && <span className="text-[7px] font-black bg-white/15 px-2 py-0.5 rounded-none text-white">{tag}</span>}
     </div>
  </div>
);

export default ModuleWarp;