
import React from 'react';
import { 
  Layers, 
  ChevronLeft, 
  Smartphone, 
  Monitor, 
  Globe, 
  User, 
  Shield, 
  Zap, 
  Gift, 
  Fingerprint, 
  RefreshCw, 
  Database,
  Share2,
  Cpu,
  Radio
} from 'lucide-react';

interface ModuleCrossPlatformProps {
  onBack: () => void;
}

const FeatureCard = ({ number, title, icon: Icon, description, items, colorClass }: any) => (
  <div className="bg-winf-card border border-white/10 rounded-none p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
    <div className={`absolute top-0 right-0 p-24 ${colorClass} opacity-5 rounded-none blur-3xl group-hover:opacity-10 transition-opacity`}></div>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-black border border-white/10 rounded-none flex items-center justify-center text-xl font-bold text-white shadow-lg">
          {number}
        </div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Icon size={20} className="text-white/40" /> {title}
        </h3>
      </div>
      <p className="text-sm text-white/40 leading-relaxed mb-6 border-b border-white/10 pb-6">
        {description}
      </p>
      <div className="space-y-3">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 p-1 rounded-none bg-white/5 ${item.color}`}>
              <item.icon size={12} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
              <p className="text-xs md:text-[10px] text-white/40">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ModuleCrossPlatform: React.FC<ModuleCrossPlatformProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-sm">
            <ChevronLeft size={16} /> Voltar aos Módulos
          </button>
          <h1 className="text-3xl font-light text-white tracking-tight">INTEGRAÇÃO <span className="font-bold">CROSS-PLATFORM</span><span className="text-xs align-top ml-1 text-white/40">™</span></h1>
          <p className="text-white/40 text-sm mt-1 max-w-2xl">
            Sistema de integração visual e narrativa entre todas as frentes da Winf Partners para uma experiência coesa e imersiva. Um universo, múltiplas dimensões.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-winf-card border border-white/10 px-4 py-3 rounded-none">
          <div className="w-10 h-10 rounded-none bg-zinc-800/30 border border-zinc-700/30 flex items-center justify-center text-white/40 font-bold">
            RA
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Ricardo Alves</h3>
            <p className="text-xs md:text-[10px] text-white/40 font-bold tracking-widest uppercase">Premium User</p>
          </div>
        </div>
      </div>

      {/* Tabs - Static for visual representation */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-white/10">
        {['Visão Geral', 'Plataformas', 'Perfil', 'Recompensas', 'Suporte'].map((tab, idx) => (
          <button 
            key={tab}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${idx === 0 ? 'text-white border-b-2 border-zinc-700' : 'text-white/40 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Hero Visual Section */}
      <div className="bg-winf-card border border-white/10 rounded-none relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-5 md:p-8 group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,30,0),rgba(5,5,5,1))]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Conceptual Visualization */}
        <div className="relative z-10 w-full max-w-3xl aspect-[2/1] flex items-center justify-center">
            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:'transparent', stopOpacity:0}} />
                  <stop offset="50%" style={{stopColor:'#ffffff', stopOpacity:0.5}} />
                  <stop offset="100%" style={{stopColor:'transparent', stopOpacity:0}} />
                </linearGradient>
              </defs>
              {/* Central to Nodes */}
              <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#grad1)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#grad1)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="url(#grad1)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#grad1)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="url(#grad1)" strokeWidth="1" />
              
              {/* Orbit Rings */}
              <ellipse cx="50%" cy="50%" rx="30%" ry="40%" fill="none" stroke="white" strokeOpacity="0.05" />
              <ellipse cx="50%" cy="50%" rx="15%" ry="20%" fill="none" stroke="white" strokeOpacity="0.1" />
            </svg>

            {/* Central Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-none bg-black border-2 border-zinc-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(113,113,122,0.3)] z-20">
               <Cpu size={32} className="text-white/40 mb-2 animate-pulse" />
               <span className="text-xs md:text-[10px] font-bold text-white tracking-widest">ECOSYSTEM</span>
               <span className="text-[10px] md:text-[8px] text-white/40">CORE</span>
            </div>

            {/* Satellite Nodes */}
            <div className="absolute left-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node cursor-pointer">
               <div className="w-12 h-12 rounded-none bg-winf-card border border-white/10 flex items-center justify-center group-hover/node:border-zinc-700 group-hover/node:shadow-[0_0_20px_rgba(113,113,122,0.3)] transition-all">
                  <Monitor size={20} className="text-white/40 group-hover/node:text-white/40" />
               </div>
               <span className="text-xs md:text-[10px] uppercase font-bold text-white/40 group-hover/node:text-white transition-colors">Winf™ Driver</span>
            </div>

            <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node cursor-pointer">
               <div className="w-12 h-12 rounded-none bg-winf-card border border-white/10 flex items-center justify-center group-hover/node:border-zinc-700 group-hover/node:shadow-[0_0_20px_rgba(113,113,122,0.3)] transition-all">
                  <Smartphone size={20} className="text-white/40 group-hover/node:text-white/40" />
               </div>
               <span className="text-xs md:text-[10px] uppercase font-bold text-white/40 group-hover/node:text-white transition-colors">Ascend App</span>
            </div>

            <div className="absolute left-[20%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node cursor-pointer">
               <div className="w-12 h-12 rounded-none bg-winf-card border border-white/10 flex items-center justify-center group-hover/node:border-zinc-700 group-hover/node:shadow-[0_0_20px_rgba(113,113,122,0.3)] transition-all">
                  <Globe size={20} className="text-white/40 group-hover/node:text-white/40" />
               </div>
               <span className="text-xs md:text-[10px] uppercase font-bold text-white/40 group-hover/node:text-white transition-colors">Cuidar & Conectar</span>
            </div>

            <div className="absolute left-[80%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node cursor-pointer">
               <div className="w-12 h-12 rounded-none bg-winf-card border border-white/10 flex items-center justify-center group-hover/node:border-zinc-700 group-hover/node:shadow-[0_0_20px_rgba(113,113,122,0.3)] transition-all">
                  <Zap size={20} className="text-white/40 group-hover/node:text-white/40" />
               </div>
               <span className="text-xs md:text-[10px] uppercase font-bold text-white/40 group-hover/node:text-white transition-colors">W.A.R.P.</span>
            </div>
            
            <div className="absolute left-[50%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node cursor-pointer">
               <div className="w-10 h-10 rounded-none bg-winf-card border border-white/10 flex items-center justify-center group-hover/node:border-gray-300 transition-all">
                  <Share2 size={16} className="text-white/40 group-hover/node:text-white" />
               </div>
               <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-bold text-white/40 group-hover/node:text-white transition-colors">Universo Dark</span>
            </div>
        </div>

        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-8 text-center px-4">
           <div>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-wider">Plataformas Integradas</p>
           </div>
           <div className="w-px h-10 bg-winf-border"></div>
           <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-wider">Pontos de Contato</p>
           </div>
           <div className="w-px h-10 bg-winf-border"></div>
           <div>
              <p className="text-2xl font-bold text-white">87%</p>
              <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-wider">Taxa de Engajamento</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          number="1" 
          title="Single Sign-On" 
          icon={Fingerprint}
          colorClass="bg-zinc-800"
          description="Acesso unificado a todas as plataformas da Winf Partners com autenticação biométrica e segurança avançada."
          items={[
            { icon: Fingerprint, title: "Autenticação Biométrica", desc: "Reconhecimento facial e digital.", color: "text-white/40" },
            { icon: Zap, title: "Acesso Instantâneo", desc: "Transição sem login repetido.", color: "text-white/40" },
            { icon: Shield, title: "Segurança Avançada", desc: "Criptografia ponta a ponta.", color: "text-white/40" },
          ]}
        />
        
        <FeatureCard 
          number="2" 
          title="Perfil Cross-Platform" 
          icon={User}
          colorClass="bg-zinc-800"
          description="Dados e preferências sincronizados entre canais, garantindo uma experiência personalizada em qualquer ponto."
          items={[
            { icon: RefreshCw, title: "Personalização Contínua", desc: "Configs mantidas globalmente.", color: "text-white/40" },
            { icon: Database, title: "Histórico Unificado", desc: "Registro completo de interações.", color: "text-white/40" },
            { icon: Radio, title: "Recomendações AI", desc: "Sugestões baseadas em uso.", color: "text-white/40" },
          ]}
        />

        <FeatureCard 
          number="3" 
          title="Recompensas Integradas" 
          icon={Gift}
          colorClass="bg-zinc-800"
          description="Benefícios que se acumulam em todas as interações com o ecossistema Winf, criando um ciclo virtuoso."
          items={[
            { icon: Database, title: "Pontos Unificados", desc: "Acúmulo global de WinfCoins.", color: "text-white/40" },
            { icon: Shield, title: "Benefícios Exclusivos", desc: "Rewards baseados em Tier.", color: "text-white/40" },
            { icon: Globe, title: "Gamificação Avançada", desc: "Conquistas de ecossistema.", color: "text-white/40" },
          ]}
        />
      </div>

      <div className="bg-gradient-to-r from-black to-winf-card border border-white/10 rounded-none p-6 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-zinc-800/5 rounded-none blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 p-32 bg-zinc-800/10 rounded-none blur-3xl pointer-events-none"></div>
        
        <h2 className="text-3xl font-light text-white mb-4 relative z-10">Um universo, <span className="font-bold">múltiplas dimensões</span></h2>
        <p className="text-white/40 max-w-lg mx-auto mb-8 relative z-10">
           Sua jornada continua em cada plataforma. Conectado ao invisível, em qualquer lugar. Descubra como a integração transforma sua experiência.
        </p>
        
        <button className="bg-white text-black px-8 py-3 rounded-none font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10">
           Acessar Plataformas
        </button>
      </div>

      <footer className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
         <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="font-bold text-white">WINF PARTNERS™</span>
            <a href="#" className="hover:text-white transition-colors">Sobre</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
         </div>
         <div>
            © 2025 Winf Partners™. Todos os direitos reservados.
         </div>
      </footer>
    </div>
  );
};

export default ModuleCrossPlatform;