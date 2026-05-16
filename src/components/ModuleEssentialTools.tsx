
import React, { useState, useEffect } from 'react';
import { 
  PackageSearch, 
  Music, 
  Link as LinkIcon, 
  Scissors, 
  FileSpreadsheet, 
  ChevronLeft,
  ArrowUpRight,
  Zap,
  PlayCircle,
  Award,
  MessageSquare,
  Globe,
  Monitor,
  Share2,
  ShieldCheck,
  Terminal,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';

interface ModuleEssentialToolsProps {
  onBack: () => void;
  onNavigate: (view: ViewState) => void;
}

const EssentialToolCard = ({ title, desc, icon: Icon, onClick, color, badge }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, translateY: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative group p-6 bg-[#0A0A0A] border border-white/10 rounded-none text-left overflow-hidden transition-all hover:bg-[#0A0A0A]_hover hover:border-winf-primary/40 shadow-xl"
  >
    <div className="absolute top-0 right-0 p-5 md:p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500">
      <Icon size={120} />
    </div>
    
    <div className="relative z-10">
      <div className={`w-12 h-12 bg-[#050505] border border-white/5 rounded-none flex items-center justify-center mb-6 group-hover:border-winf-primary/20 transition-colors ${color}`}>
        <Icon size={24} />
      </div>
      
      {badge && (
        <span className="inline-block px-2 py-0.5 bg-white/10 text-white text-[10px] md:text-[8px] font-black uppercase tracking-widest mb-3 border border-winf-primary/20">
          {badge}
        </span>
      )}
      
      <h3 className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-white transition-colors mb-2 italic">
        {title}
      </h3>
      <p className="text-sm text-white/80 leading-relaxed max-w-[200px]">
        {desc}
      </p>
    </div>
    
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
      <ArrowUpRight size={18} className="text-white/40" />
    </div>
  </motion.button>
);

const ModuleEssentialTools: React.FC<ModuleEssentialToolsProps> = ({ onBack, onNavigate }) => {
  const [auditMode, setAuditMode] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    if (auditMode) {
      // Generate some fake audit logs over time
      const logs = [
        { time: new Date(Date.now() - 50000).toISOString(), event: 'AUTH_VERIFIED', tool: 'Winf Precision', status: 'SUCCESS', ip: '192.168.1.104' },
        { time: new Date(Date.now() - 120000).toISOString(), event: 'PDF_GENERATED', tool: 'Novo Orçamento', status: 'SUCCESS', ip: '192.168.1.104' },
        { time: new Date(Date.now() - 300000).toISOString(), event: 'UNAUTHORIZED_ACCESS_ATTEMPT', tool: 'Garantia Digital', status: 'BLOCKED', ip: '172.16.254.1' },
      ];
      setAuditLogs(logs);

      const interval = setInterval(() => {
        setAuditLogs(prev => [
          { time: new Date().toISOString(), event: 'SYSTEM_PING', tool: 'Global', status: 'OK', ip: '127.0.0.1' },
          ...prev
        ].slice(0, 10));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [auditMode]);

  const essentialTools = [
    {
      id: 'catalog',
      title: 'Catálogo Oficial',
      desc: 'Fichas técnicas, especificações e comparativos de produtos.',
      icon: PackageSearch,
      viewState: ViewState.PRODUCTS_CATALOG,
      color: 'text-white',
      badge: 'TECHNICAL'
    },
    {
      id: 'audio',
      title: 'Atmosfera e Áudios',
      desc: 'Playlists para ambientação e scripts de venda otimizados.',
      icon: Music,
      viewState: ViewState.MODULE_SYNTHWAVE,
      color: 'text-white/80',
      badge: 'SALES FORCE'
    },
    {
      id: 'links',
      title: 'Links Úteis',
      desc: 'Central de portfolio digital, consultoria e contatos táticos.',
      icon: LinkIcon,
      viewState: ViewState.MODULE_CONSULTANCY_LINK,
      color: 'text-white/80',
      badge: 'MARKETING'
    },
    {
      id: 'precision',
      title: 'Winf Precision™',
      desc: 'Calculadora de corte e desperdício zero para orçamentos.',
      icon: Scissors,
      viewState: ViewState.MODULE_WINF_CUT,
      color: 'text-white',
      badge: 'OPERATIONAL'
    },
    {
      id: 'quotes',
      title: 'Novo Orçamento',
      desc: 'Gerador automático de propostas elite com PDF.',
      icon: FileSpreadsheet,
      viewState: ViewState.MODULE_QUOTES,
      color: 'text-white',
      badge: 'SALES'
    },
    {
      id: 'warranty',
      title: 'Garantia Digital',
      desc: 'Emissão de certificados rastreáveis pós-serviço.',
      icon: Award,
      viewState: ViewState.WARRANTY,
      color: 'text-white',
      badge: 'TRACEABILITY'
    },
    {
      id: 'consultancy',
      title: 'Modo Apresentação',
      desc: 'Consultoria técnica para grandes telas e tablets.',
      icon: Monitor,
      viewState: ViewState.PUBLIC_CONSULTANCY,
      color: 'text-white/80',
      badge: 'CLIENT SIDE'
    }
  ];

  const helperSteps = [
    { number: '01', title: 'Atmosfera', desc: 'Ative os áudios e abra o catálogo.', viewState: ViewState.MODULE_SYNTHWAVE },
    { number: '02', title: 'Consultoria', desc: 'Apresente os benefícios técnicos.', viewState: ViewState.MODULE_CONSULTANCY_LINK },
    { number: '03', title: 'Orçamento', desc: 'Simule o corte e gere a proposta.', viewState: ViewState.MODULE_QUOTES },
    { number: '04', title: 'Gestão', desc: 'Compartilhe com o agente e agende.', viewState: ViewState.MODULE_INSTALLATIONS },
    { number: '05', title: 'Garantia', desc: 'Certificado oficial rastreável.', viewState: ViewState.WARRANTY }
  ];

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-10 animate-fade-in pb-20 relative overflow-hidden">
      {auditMode && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)] pointer-events-none z-0"></div>
      )}

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack} 
              className="p-3 bg-white/5 rounded-none hover:bg-white/10 transition-all border border-white/5"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
                Ferramentas <span className="text-white">Essenciais</span>
                {auditMode && <ShieldCheck className="text-green-500" size={32} />}
              </h1>
              <p className="text-white/40 text-xs md:text-[10px] font-black uppercase tracking-[0.4em] mt-2">
                {auditMode ? 'AUDITORIA DE SEGURANÇA ATIVADA' : 'Sales Presence & Operational Support HUB'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAuditMode(!auditMode)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-none transition-colors ${auditMode ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-[#111] border-white/10 text-white/40 hover:text-white'}`}
            >
              <Activity size={14} />
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest">{auditMode ? 'Auditando...' : 'Iniciar Auditoria'}</span>
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-winf-primary/20 rounded-none">
              <Zap size={14} className="text-white animate-pulse" />
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Modo Atendimento Ativado</span>
            </div>
          </div>
        </div>

        {/* Audit Dashboard Overlay */}
        {auditMode && (
          <div className="bg-[#0A0A0A] border border-green-500/30 p-6 flex flex-col md:flex-row gap-8 shadow-[0_0_30px_rgba(0,255,0,0.05)] animate-fade-in">
            <div className="w-full md:w-1/3 space-y-4 border-r border-white/5 pr-6">
               <h3 className="text-green-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Terminal size={14} /> System Logs
               </h3>
               <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar pr-2 font-mono text-xs md:text-[10px] md:text-sm md:text-[11px]">
                 {auditLogs.map((log, i) => (
                   <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-2">
                     <div className="flex justify-between text-white/40">
                       <span>{new Date(log.time).toLocaleTimeString()}</span>
                       <span className={log.status === 'BLOCKED' ? 'text-red-500' : 'text-green-500'}>{log.status}</span>
                     </div>
                     <div className="text-white">[{log.tool}] {log.event}</div>
                     <div className="text-white/20">IP: {log.ip}</div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-[#111] p-4 border border-white/5">
                   <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase mb-2">Integridade</div>
                   <div className="text-xl text-green-500 font-black">100%</div>
                 </div>
                 <div className="bg-[#111] p-4 border border-white/5">
                   <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase mb-2">Acessos Revogados</div>
                   <div className="text-xl text-white font-black">12</div>
                 </div>
                 <div className="bg-[#111] p-4 border border-white/5">
                   <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase mb-2">Ferramentas Ativas</div>
                   <div className="text-xl text-white font-black">{essentialTools.length}</div>
                 </div>
                 <div className="bg-[#111] p-4 border border-white/5">
                   <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase mb-2">WINF CHAIN</div>
                   <div className="text-xl text-green-500 font-black">SYNCED</div>
                 </div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 p-4">
                 <p className="text-green-400 text-xs md:text-[10px] uppercase font-mono tracking-widest">
                   &gt; Todos os módulos de ferramentas estruturais operando sob criptografia. <br/>
                   &gt; Nenhum vazamento de dados detectado.<br/>
                   &gt; Auditoria em tempo real conectada à I-Blockchain.
                 </p>
              </div>
            </div>
          </div>
        )}

        {/* Essential Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essentialTools.map(tool => (
            <EssentialToolCard 
              key={tool.id}
              {...tool}
              onClick={() => onNavigate(tool.viewState)}
            />
          ))}
        </div>

        {/* Journey Map */}
        <div className="bg-[#080808] border border-white/5 p-5 md:p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.02] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">A Jornada do <span className="text-white">Avatar Ideal</span></h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Protocolo Winf OS™ de Vendas</p>
            </div>
            <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block"></div>
            <button 
              onClick={() => onNavigate(ViewState.MODULE_AVATAR_JOURNEY)}
              className="flex items-center gap-2 text-white text-xs md:text-[10px] bg-white/10 px-4 py-2 font-black uppercase tracking-widest hover:opacity-100 hover:bg-white hover:text-black transition-all"
            >
              <PlayCircle size={16} /> Mapa da Jornada
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {helperSteps.map((step, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate(step.viewState)}
                className="space-y-4 relative group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">{step.number}</span>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-white transition-colors">{step.title}</h4>
                <p className="text-xs text-white/30 leading-relaxed font-medium group-hover:text-white/60 transition-colors uppercase tracking-tight">{step.desc}</p>
                {idx < helperSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 translate-x-1/2 -translate-y-1/2">
                    <ChevronLeft className="rotate-180 text-white/10 group-hover:text-white/20 transition-colors" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 rounded-none flex items-center justify-between group cursor-pointer hover:border-winf-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Falar com Suporte Técnico</h4>
                <p className="text-xs text-white/40">Dúvidas sobre aplicação ou material?</p>
              </div>
            </div>
            <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 rounded-none flex items-center justify-between group cursor-pointer hover:border-winf-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-none flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                <Share2 size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Compartilhar Portfolio</h4>
                <p className="text-xs text-white/40">Envie o deck de portfólio oficial.</p>
              </div>
            </div>
            <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEssentialTools;
