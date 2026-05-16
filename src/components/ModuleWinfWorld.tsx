import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  ThermometerSun, 
  MapPin, 
  CloudRain, 
  Zap, 
  Brain, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Database,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';

const CITIES = [
  { id: 'sp', name: 'São Paulo', temp: 32, condition: 'sun', trend: 'Alta Radiação UV', active: true },
  { id: 'rj', name: 'Rio de Janeiro', temp: 36, condition: 'sun', trend: 'Onda de Calor', active: true },
  { id: 'ctba', name: 'Curitiba', temp: 18, condition: 'rain', trend: 'Alta Umidade', active: false },
  { id: 'bsb', name: 'Brasília', temp: 28, condition: 'sun', trend: 'Clima Seco', active: true },
];

const SPECIALISTS = [
  { id: 'sales', name: 'WINF Sales Agent', role: 'Vendas & CRM', status: 'Processando 12 leads', icon: Bot },
  { id: 'marketing', name: 'WINF Content Agent', role: 'Marketing Localizado', status: 'Gerando 4 campanhas (Calor)', icon: TrendingUp },
  { id: 'stock', name: 'WINF Logistics Agent', role: 'Abastecimento', status: 'Alertando 2 faltas de estoque', icon: Database },
  { id: 'finance', name: 'WINF Financial Agent', role: 'Cobrança', status: 'Monitorando Inadimplência', icon: Activity },
];

const ModuleWinfWorld: React.FC = () => {
  const [pulseLine, setPulseLine] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLine(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
            <Globe2 className="text-white" size={32} />
            WINF™ <span className="text-white">WORLD</span>
          </h1>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Organismo Vivo & Orquestração Global
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-[#005c4b]/20 border border-[#00a884]/30 rounded-none flex items-center gap-2">
            <div className={`w-2 h-2 rounded-none bg-[#00a884] ${pulseLine ? 'scale-150 opacity-50' : 'scale-100 opacity-100'} transition-all duration-500`}></div>
            <span className="text-xs font-bold text-[#00a884] tracking-widest uppercase">The Governor Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Camadas da Direita (Core) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* L4: The Governor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-winf-primary/20 via-black to-black border border-winf-primary/30 rounded-none p-5 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10">
              <Brain size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-none border border-winf-primary/30">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Camada 4</span>
                  <h2 className="text-2xl font-black text-white uppercase">The Governor</h2>
                </div>
              </div>
              <p className="text-sm text-white/40 max-w-xl leading-relaxed mb-6">
                Cérebro central baseado em Claude AI. Observa o ecossistema WINF globalmente. 
                Se uma campanha converte muito no Rio de Janeiro devido ao calor, ele instrui o Agente de Marketing a replicar para outras regiões ensolaradas automaticamente.
              </p>
              
              <div className="flex items-center gap-4 bg-black/50 p-4 rounded-none border border-white/5">
                <Network className="text-white" size={20} />
                <div className="flex-1">
                  <p className="text-xs md:text-[10px] font-mono text-white/40">ÚLTIMA DECISÃO GLOBAL</p>
                  <p className="text-xs text-white">"Onda de calor detectada no sudeste. Instruindo Agentes Locais de SP e RJ a dispararem campanha de Película Nano Cerâmica TSER alto via WhatsApp Hub."</p>
                </div>
                <span className="text-xs md:text-[10px] text-gray-600">Agora mesmo</span>
              </div>
            </div>
          </motion.div>

          {/* L3: Agentes Especialistas */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Camada 3</span>
              <h2 className="text-lg font-black text-white uppercase">Agentes Especialistas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPECIALISTS.map(spec => (
                <div key={spec.id} className="bg-[#0A0A0A] border border-white/5 p-5 rounded-none flex items-start gap-4 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                    <spec.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{spec.name}</h3>
                    <p className="text-xs md:text-[10px] uppercase tracking-wider text-white/40 mb-2">{spec.role}</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/10 text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase rounded-none">
                      <Zap size={10} /> {spec.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Camadas da Esquerda (Ambiente) */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* L1: Sensores do Mundo Real */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/5 rounded-none p-6"
          >
            <div className="mb-6">
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-cyan-500">Camada 1</span>
              <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <ThermometerSun className="text-cyan-500" size={20} />
                Sensores Locais
              </h2>
            </div>
            
            <div className="space-y-3">
              {CITIES.map(city => (
                <div key={city.id} className="flex items-center justify-between p-3 bg-white/5 rounded-none border border-white/5">
                  <div className="flex items-center gap-3">
                    {city.condition === 'sun' ? <ThermometerSun size={16} className="text-white" /> : <CloudRain size={16} className="text-blue-400" />}
                    <div>
                      <h4 className="text-xs font-bold text-white">{city.name}</h4>
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40">{city.trend}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white">{city.temp}°</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* L2: Agentes Locais */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black border border-white/10 rounded-none p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="mb-6 relative z-20">
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-green-500">Camada 2</span>
              <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <MapPin className="text-green-500" size={20} />
                Agentes de Cidade
              </h2>
            </div>

            <div className="space-y-4 relative z-20">
              {CITIES.filter(c => c.active).map(city => (
                <div key={`agent-${city.id}`} className="border-l-2 border-green-500 pl-4 py-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Bot size={12} className="text-green-500" /> Agent {city.name}
                  </h4>
                  <p className="text-xs md:text-[10px] text-white/40 mt-1">
                    {city.condition === 'sun' 
                      ? 'Acionado. Preparando lote de leads baseados na alta radiação UV.' 
                      : 'Standby. Convertendo agendamentos.'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ModuleWinfWorld;
