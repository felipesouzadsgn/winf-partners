import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  MapPin, 
  ArrowRight, 
  Bot, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal,
  Phone,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import WhatsAppAgentSimulator from './WhatsAppAgentSimulator';

const ModuleWhatsAppHub: React.FC = () => {
  const { whatsappConfigs, activeChats, distributeLead, agentState } = useWinf();
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'configs' | 'history'>('overview');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateLead = async () => {
    setIsSimulating(true);
    const cities = ['Santos', 'São Paulo', 'Curitiba', 'Rio de Janeiro'];
    const names = ['André Martins', 'Juliana Costa', 'Roberto Alves', 'Fernanda Lima'];
    
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    await distributeLead({ name: randomName, city: randomCity });
    setIsSimulating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
            <MessageSquare className="text-white" size={32} />
            Agente <span className="text-white">WhatsApp</span>
          </h1>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Central de Conversão WINF™
          </p>
        </div>

        <div className="flex bg-[#0A0A0A] rounded-none p-1 border border-white/5">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`px-6 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
           >
             Dashboard
           </button>
           <button 
             onClick={() => setActiveTab('simulator')}
             className={`px-6 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'simulator' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
           >
             Simulador Inteligente
           </button>
        </div>
      </div>

      {activeTab === 'simulator' && (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-3xl mx-auto"
        >
          <WhatsAppAgentSimulator />
        </motion.div>
      )}

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Chats Ativos', value: activeChats.length, icon: MessageSquare, color: 'text-white/40' },
          { label: 'Cidades Atendidas', value: whatsappConfigs.length - 1, icon: MapPin, color: 'text-green-500' },
          { label: 'Taxa de Automação', value: '94%', icon: Bot, color: 'text-white/40' },
          { label: 'Tempo Médio Resposta', value: '1.2s', icon: Clock, color: 'text-white' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0A0A0A] border border-white/5 p-6 rounded-none relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Distribution Flow */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-white" />
                Fluxo de Atendimento em Tempo Real
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse"></div>
                <span className="text-xs md:text-[10px] font-mono text-white/40">LIVE_MONITOR</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {activeChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-black border border-white/5 p-4 rounded-none flex items-center justify-between hover:border-winf-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-none bg-zinc-900 flex items-center justify-center text-white font-black border border-white/5">
                        {chat.customerName[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{chat.customerName}</h4>
                        <p className="text-xs text-white/40 italic">"{chat.lastMessage}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1 justify-end">
                          <MapPin size={10} className="text-white" />
                          <span className="text-xs md:text-[10px] font-black text-white/40 uppercase">{chat.city || 'Central'}</span>
                        </div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-mono text-gray-600">{new Date(chat.timestamp).toLocaleTimeString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {chat.status === 'bot_handling' && (
                          <span className="px-3 py-1 bg-zinc-800/10 text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest rounded-none border border-zinc-700/20 flex items-center gap-1">
                            <Bot size={10} className="animate-bounce" /> Agente IA
                          </span>
                        )}
                        {chat.status === 'routed' && (
                          <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest rounded-none border border-green-500/20 flex items-center gap-1">
                            <CheckCircle2 size={10} /> Encaminhado
                          </span>
                        )}
                        {chat.status === 'waiting' && (
                          <span className="px-3 py-1 bg-white/10 text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest rounded-none border border-white/20 flex items-center gap-1">
                            <Clock size={10} className="animate-spin" /> Aguardando
                          </span>
                        )}
                        <button className="p-2 text-gray-600 hover:text-white transition-colors">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {activeChats.length === 0 && (
                <div className="py-12 text-center">
                  <MessageSquare size={48} className="mx-auto text-gray-800 mb-4" />
                  <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">Nenhum chat ativo no momento</p>
                </div>
              )}
            </div>
          </div>

          {/* Distribution Logic Visualization */}
          <div className="bg-gradient-to-br from-winf-primary/10 to-transparent border border-winf-primary/20 p-5 md:p-8 rounded-none">
            <h3 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Zap className="text-white" />
              Lógica de Distribuição Neural
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block"></div>
              
              <div className="bg-black/40 border border-white/10 p-6 rounded-none relative z-10">
                <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center mb-4">
                  <Phone size={20} className="text-white" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">1. Central Hub</h4>
                <p className="text-xs md:text-[10px] text-white/40 leading-relaxed">Lead entra pelo WhatsApp Central unificado da região.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-none relative z-10">
                <div className="w-10 h-10 bg-zinc-800 rounded-none flex items-center justify-center mb-4">
                  <Bot size={20} className="text-white" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">2. Qualificação IA</h4>
                <p className="text-xs md:text-[10px] text-white/40 leading-relaxed">Agente identifica intenção, serviço e localização do lead.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-none relative z-10">
                <div className="w-10 h-10 bg-green-500 rounded-none flex items-center justify-center mb-4">
                  <Share2 size={20} className="text-white" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">3. Roteamento</h4>
                <p className="text-xs md:text-[10px] text-white/40 leading-relaxed">Lead é transferido para o WhatsApp oficial da cidade detectada.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Regional Configs & Logs */}
        <div className="space-y-6">
          {/* Regional WhatsApps */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-black">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <MapPin size={16} className="text-white" />
                Terminais Regionais
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {whatsappConfigs.map((config) => (
                <div 
                  key={config.id}
                  className={`p-4 rounded-none border transition-all ${
                    config.isCentral 
                      ? 'bg-white/5 border-winf-primary/20' 
                      : 'bg-black border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs md:text-[10px] font-black uppercase tracking-widest ${config.isCentral ? 'text-white' : 'text-white/40'}`}>
                      {config.city}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-none ${config.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className="text-[10px] md:text-[8px] font-mono text-gray-600 uppercase">{config.status}</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white mb-1">{config.phoneNumber}</p>
                  <div className="flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-mono">
                    <Bot size={10} /> {config.agentName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Logs (Neural Bridge Integration) */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-black">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} className="text-white" />
                Logs de Distribuição
              </h3>
            </div>
            <div className="p-4 h-64 overflow-y-auto font-mono text-xs md:text-[10px] md:text-sm md:text-[11px] space-y-2 custom-scrollbar">
              {agentState.logs.filter(l => l.includes('[WHATSAPP]')).length > 0 ? (
                agentState.logs.filter(l => l.includes('[WHATSAPP]')).map((log, i) => (
                  <div key={i} className="text-white/40 border-l border-winf-primary/30 pl-2 py-1">
                    <span className="text-white/50">[{new Date().toLocaleTimeString()}]</span> {log.replace('[WHATSAPP] ', '')}
                  </div>
                ))
              ) : (
                <div className="text-gray-700 italic py-4 text-center">Nenhuma atividade de distribuição registrada.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default ModuleWhatsAppHub;
