import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Brain, Globe2, Terminal, MessageCircle, Cpu, Zap, Activity } from 'lucide-react';
import ModuleWinfBrain from './ModuleWinfBrain';
import ModuleWinfWorld from './ModuleWinfWorld';
import ModuleMissionControl from './ModuleMissionControl';
import ModuleWhatsAppHub from './ModuleWhatsAppHub';
import ModuleCoreAI from './ModuleCoreAI'; 
import WhatsAppAgentSimulator from './WhatsAppAgentSimulator';
import ModuleNeuralBridge from './ModuleNeuralBridge';
import { useWinf } from '../contexts/WinfContext';

const TABS = [
  { id: 'brain', label: 'WINF Brain', icon: Brain, description: 'Terminal Central Neural', adminOnly: false },
  { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageCircle, description: 'Central de Conversão WINF™', adminOnly: false },
  { id: 'mission', label: 'Mission Control', icon: Terminal, description: 'Radar de Leads e Atribuição', adminOnly: true },
  { id: 'bridge', label: 'Neural Bridge', icon: Network, description: 'Sincronização Sistêmica', adminOnly: true },
  { id: 'simulator', label: 'Simulador Chats', icon: Zap, description: 'Simulador Inteligente', adminOnly: true },
  { id: 'world', label: 'The Governor', icon: Globe2, description: 'Organismo Vivo & Orquestração', adminOnly: true },
  { id: 'agents', label: 'Protocolo de Agentes', icon: Network, description: 'Dashboard Core AI', adminOnly: true },
];

const ModuleNexusAI: React.FC = () => {
  const { effectiveRole, user } = useWinf();
  const currentRole = effectiveRole || user?.role || 'Guest';
  const isAdmin = currentRole.toLowerCase() === 'admin';
  
  const [activeTab, setActiveTab] = useState('brain');

  const visibleTabs = TABS.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-black text-white">
      {/* Nexus Header */}
      <div className="flex-none p-6 pb-0 border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Cpu className="w-8 h-8 text-cyan-500" />
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Inteligência WINF</h1>
            </div>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Plataforma Unificada de Agentes Autônomos</p>
          </div>
          <div className="flex items-center gap-2 bg-cyan-900/20 border border-cyan-500/20 px-4 py-2 rounded-none">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Nexus Online</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-px">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-none px-6 py-4 border-b-2 transition-all flex items-center gap-3 ${
                activeTab === tab.id 
                  ? 'border-cyan-400 bg-cyan-950/20 text-white' 
                  : 'border-transparent text-white/40 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-cyan-400' : ''} />
              <div className="text-left">
                <p className="text-sm md:text-[11px] font-bold uppercase tracking-widest leading-none mb-1">{tab.label}</p>
                <p className={`text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-wider font-mono ${activeTab === tab.id ? 'text-cyan-600' : 'text-gray-600'}`}>{tab.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 overflow-y-auto"
          >
            {activeTab === 'brain' && <ModuleWinfBrain />}
            {activeTab === 'bridge' && <ModuleNeuralBridge />}
            {activeTab === 'mission' && <ModuleMissionControl />}
            {activeTab === 'whatsapp' && <ModuleWhatsAppHub />}
            {activeTab === 'simulator' && <WhatsAppAgentSimulator />}
            {activeTab === 'world' && <ModuleWinfWorld />}
            {activeTab === 'agents' && <ModuleCoreAI />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModuleNexusAI;
