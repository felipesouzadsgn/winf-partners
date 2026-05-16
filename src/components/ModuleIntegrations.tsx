import React, { useState } from 'react';
import { 
  Zap, 
  Calendar, 
  Mail, 
  MessageCircle, 
  Share2, 
  CreditCard, 
  BarChart2, 
  MessageSquare,
  CheckCircle2,
  XCircle,
  Settings,
  RefreshCw,
  ExternalLink,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Webhook receptor para qualquer automação externa',
    icon: Zap,
    status: 'connected',
    category: 'Automação',
    color: 'text-[#FF4A00]'
  },
  {
    id: 'make',
    name: 'Make.com',
    description: 'Cenários visuais para integrações não-técnicas',
    icon: Zap, // using generic
    status: 'disconnected',
    category: 'Automação',
    color: 'text-[#8719E0]'
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Orquestrador principal de agentes e workflows complexos',
    icon: Bot,
    status: 'connected',
    category: 'Automação',
    color: 'text-[#FF6D5A]'
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Agendamento de visitas técnicas pelo agente Claude',
    icon: Calendar,
    status: 'connected',
    category: 'Produtividade',
    color: 'text-[#4285F4]'
  },
  {
    id: 'gmail',
    name: 'Gmail / SMTP',
    description: 'Envio de propostas e follow-ups por email',
    icon: Mail,
    status: 'connected',
    category: 'Comunicação',
    color: 'text-[#EA4335]'
  },
  {
    id: 'instagram',
    name: 'Instagram Graph API',
    description: 'Publicação automática de conteúdo visual gerado',
    icon: Share2,
    status: 'disconnected',
    category: 'Marketing',
    color: 'text-[#E1306C]'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Pagamentos e assinaturas dos licenciados',
    icon: CreditCard,
    status: 'connected',
    category: 'Financeiro',
    color: 'text-[#635BFF]'
  },
  {
    id: 'analytics',
    name: 'Google Analytics',
    description: 'Rastreamento de eventos de conversão de leads',
    icon: BarChart2,
    status: 'connected',
    category: 'Dados',
    color: 'text-[#F9AB00]'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Alertas internos para a equipe WINF™',
    icon: MessageSquare,
    status: 'disconnected',
    category: 'Comunicação',
    color: 'text-[#4A154B]'
  }
];

const ModuleIntegrations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))];

  const filteredIntegrations = activeCategory === 'Todos' 
    ? INTEGRATIONS 
    : INTEGRATIONS.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
            <Zap className="text-white" size={32} />
            Central de <span className="text-white">Integrações</span>
          </h1>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Webhooks, APIs e Orquestração de Agentes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-white/10 border border-winf-primary/20 rounded-none flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-white animate-pulse"></div>
            <span className="text-xs font-bold text-white tracking-widest uppercase">API Sync Active</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === category 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-[#0A0A0A] border rounded-none p-6 relative overflow-hidden group transition-all ${
               integration.status === 'connected' ? 'border-white/10 hover:border-winf-primary/50' : 'border-white/5 opacity-70 hover:opacity-100'
            }`}
          >
            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              {integration.status === 'connected' ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-none text-green-500">
                  <CheckCircle2 size={12} />
                  <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">Conectado</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-none text-white/40">
                  <XCircle size={12} />
                  <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">Desconectado</span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-none bg-white/5 border border-white/10 flex items-center justify-center ${integration.color}`}>
                <integration.icon size={28} />
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-white mb-1">{integration.name}</h3>
                <span className="text-xs md:text-[10px] font-mono text-white/40 uppercase tracking-widest">{integration.category}</span>
              </div>
            </div>

            <p className="text-sm text-white/40 mb-8 min-h-[40px] leading-relaxed">
              {integration.description}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
               {integration.status === 'connected' ? (
                 <>
                   <button className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors">
                     <Settings size={14} />
                     Configurar
                   </button>
                   <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-white/80 transition-colors">
                     <RefreshCw size={14} />
                     Sincronizar
                   </button>
                 </>
               ) : (
                 <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-none text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                   Conectar Agora <ExternalLink size={14} />
                 </button>
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModuleIntegrations;
