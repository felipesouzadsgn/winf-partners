import React from 'react';
import { Leaf, Droplets, Wind, Share2, MessageCircle, Award, Target, Users, Zap, ChevronLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { GamificationAction, User } from '../types';
import { useWinf } from '../contexts/WinfContext';

interface ModuleEcoTechProps {
  onBack: () => void;
  onGamificationAction: (action: GamificationAction) => void;
}

// Mock Data (será substituído por dados Supabase de 'eco_activities' e 'eco_impact_metrics')
const impactData = [
  { name: 'Jan', co2: 1200, trees: 400 },
  { name: 'Fev', co2: 1900, trees: 800 },
  { name: 'Mar', co2: 3200, trees: 1200 },
  { name: 'Abr', co2: 4100, trees: 1800 },
  { name: 'Mai', co2: 6500, trees: 2400 },
  { name: 'Jun', co2: 8720, trees: 3100 },
];

const feedData = [
  {
    initial: 'M',
    name: 'Marcos Oliveira',
    time: '2h atrás',
    content: 'Acabei de completar minha 10ª instalação de película AeroCore™ este mês. Orgulhoso em contribuir para a redução de 320kg de CO₂!',
    action: 'Parabenizar'
  },
  {
    initial: 'C',
    name: 'Carla Mendes',
    time: '5h atrás',
    content: 'Participei do workshop de sustentabilidade ontem. As novas técnicas de aplicação realmente reduzem o desperdício em até 30%!',
    action: 'Comentar'
  },
  {
    initial: 'R',
    name: 'Rafael Costa',
    time: '1d atrás',
    content: 'Minha loja atingiu o nível Platinum de sustentabilidade! Obrigado a todos os clientes que escolheram produtos eco-friendly.',
    action: 'Ver certificado'
  }
];

const ModuleEcoTech: React.FC<ModuleEcoTechProps> = ({ onBack, onGamificationAction }) => {
  const { user } = useWinf(); // Usar o user do contexto para dados do perfil

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header & User Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-sm">
            <ChevronLeft size={16} /> Voltar aos Módulos
          </button>
          <h1 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            CUIDAR & CONECTAR<span className="text-green-400 text-sm align-top">™</span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl mt-2 leading-relaxed">
            Iniciativa social futurista que combina sustentabilidade, tecnologia e impacto social de forma cinematográfica. Protegemos mais que vidros, protegemos o futuro.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-winf-card border border-white/10 px-6 py-4 rounded-none shadow-lg">
          <div className="w-12 h-12 rounded-none bg-green-900/30 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-lg">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'US'}
          </div>
          <div>
            <h3 className="text-white font-medium">{user?.name || 'Usuário'}</h3>
            <p className="text-xs md:text-[10px] text-green-400 font-bold tracking-widest uppercase flex items-center gap-1">
              <Leaf size={10} /> Eco Ambassador
            </p>
          </div>
        </div>
      </div>

      {/* Hero / Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-winf-card border border-white/10 rounded-none p-5 md:p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-none blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                <Leaf size={24} className="text-green-400" /> IMPACTO AMBIENTAL
              </h3>
              <p className="text-sm text-white/40">Métricas acumuladas nos últimos 12 meses</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-3xl font-bold text-white">
                87% <span className="text-lg text-green-500">⟳</span>
              </div>
              <p className="text-xs md:text-[10px] text-green-400 uppercase tracking-widest font-bold">Impacto Positivo Acumulado</p>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#666', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="co2" name="Kg CO₂" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="space-y-4">
          <div className="bg-winf-card border border-white/10 rounded-none p-6 flex flex-col justify-center h-[calc(33.33%-10px)] hover:border-green-500/30 transition-colors group relative overflow-hidden">
            <div className="absolute right-0 top-0 p-5 md:p-8 bg-green-500/5 rounded-none blur-xl group-hover:bg-green-500/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-green-500/10 rounded-none text-green-400"><Leaf size={20} /></div>
              <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Árvores Preservadas</span>
            </div>
            <span className="text-3xl font-bold text-white relative z-10">12.450</span>
          </div>
          
          <div className="bg-winf-card border border-white/10 rounded-none p-6 flex flex-col justify-center h-[calc(33.33%-10px)] hover:border-zinc-700/30 transition-colors group relative overflow-hidden">
             <div className="absolute right-0 top-0 p-5 md:p-8 bg-zinc-800/5 rounded-none blur-xl group-hover:bg-zinc-800/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-zinc-800/10 rounded-none text-white/40"><Wind size={20} /></div>
              <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Kg CO₂ Evitados</span>
            </div>
            <span className="text-3xl font-bold text-white relative z-10">8.720</span>
          </div>

          <div className="bg-winf-card border border-white/10 rounded-none p-6 flex flex-col justify-center h-[calc(33.33%-10px)] hover:border-zinc-700/30 transition-colors group relative overflow-hidden">
             <div className="absolute right-0 top-0 p-5 md:p-8 bg-zinc-800/5 rounded-none blur-xl group-hover:bg-zinc-800/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-zinc-800/10 rounded-none text-white/40"><Droplets size={20} /></div>
              <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Litros Água Econom.</span>
            </div>
            <span className="text-3xl font-bold text-white relative z-10">3.890</span>
          </div>
        </div>
      </div>

      {/* Community & Strategy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Social Feed */}
        <div className="bg-winf-card border border-white/10 rounded-none overflow-hidden shadow-lg">
          <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><MessageCircle size={18} /> Comunidade Conectada</h3>
            <button 
              onClick={() => onGamificationAction('POST')} // Usar 'POST' para simular uma publicação na comunidade
              className="text-xs bg-green-500 text-black font-bold px-4 py-2 rounded-none hover:bg-green-400 transition-all shadow-[0_0_10px_rgba(74,222,128,0.2)]"
            >
              + Nova Publicação
            </button>
          </div>
          
          <div className="p-4 bg-green-500/5 border-b border-white/10 text-xs text-white/40 flex items-center gap-2">
            <Award size={14} className="text-green-400" />
            <span>Interaja com a comunidade e ganhe <strong>WinfCoins</strong> diárias!</span>
          </div>

          <div className="p-6 space-y-6">
            {feedData.map((post, idx) => ( // Mocked feed data
              <div key={idx} className="flex gap-4 border-b border-white/10 last:border-0 pb-6 last:pb-0 hover:bg-white/5 p-4 -mx-4 rounded-none transition-colors">
                <div className="w-10 h-10 rounded-none bg-gradient-to-br from-gray-700 to-black border border-gray-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                  {post.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{post.name}</span>
                    <span className="text-xs md:text-[10px] text-white/40 uppercase tracking-wide">{post.time}</span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-3">
                    {post.content}
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button 
                      onClick={() => onGamificationAction('COMMENT')}
                      className="text-xs text-green-400 hover:text-white hover:bg-white/5 px-3 py-1.5 -ml-2 rounded-none transition-all flex items-center gap-2 font-medium"
                    >
                       <MessageCircle size={14} />
                       {post.action}
                    </button>
                    <button 
                      onClick={() => onGamificationAction('SHARE')}
                      className="text-xs text-white/40 hover:text-white/40 hover:bg-zinc-800/10 px-3 py-1.5 rounded-none transition-all flex items-center gap-2 font-medium group"
                      title="Compartilhar com a rede"
                    >
                       <Share2 size={14} className="group-hover:scale-110 transition-transform" /> 
                       Compartilhar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Elements */}
        <div className="space-y-6">
            <h3 className="text-white font-light text-xl">Elementos <span className="font-bold">Estratégicos</span></h3>
          <div className="bg-winf-card border border-white/10 rounded-none p-6 relative overflow-hidden group hover:border-zinc-700/30 transition-colors">
             <div className="absolute top-0 right-0 p-16 bg-zinc-800/5 rounded-none blur-2xl group-hover:bg-zinc-800/10 transition-colors"></div>
             <div className="relative z-10 flex gap-4">
                <div className="w-12 h-12 bg-black border border-white/10 rounded-none flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-lg">1</div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Rastreador de Impacto</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                    Visualização em tempo real do impacto ambiental positivo gerado pelos produtos Winf e ações do programa. Métricas personalizadas e certificação verificada.
                    </p>
                </div>
             </div>
          </div>

          <div className="bg-winf-card border border-white/10 rounded-none p-6 relative overflow-hidden group hover:border-zinc-700/30 transition-colors">
             <div className="absolute top-0 right-0 p-16 bg-zinc-800/5 rounded-none blur-2xl group-hover:bg-zinc-800/10 transition-colors"></div>
             <div className="relative z-10 flex gap-4">
                <div className="w-12 h-12 bg-black border border-white/10 rounded-none flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-lg">2</div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Comunidade Conectada</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                    Rede social exclusiva para participantes, conectando pessoas comprometidas. Feed personalizado, grupos temáticos e eventos exclusivos.
                    </p>
                </div>
             </div>
          </div>

          <div className="bg-winf-card border border-white/10 rounded-none p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors">
             <div className="absolute top-0 right-0 p-16 bg-green-500/5 rounded-none blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
             <div className="relative z-10 flex gap-4">
                <div className="w-12 h-12 bg-black border border-white/10 rounded-none flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-lg">3</div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Gamificação Social</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                    Sistema de recompensas por ações positivas. Desafios semanais, progressão de níveis e recompensas tangíveis na Blackshop.
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/10 pt-12 mt-8 text-center bg-gradient-to-b from-transparent to-green-900/10 rounded-none pb-12">
         <h2 className="text-3xl font-light text-white mb-3">Protegemos mais que vidros, <span className="font-bold text-green-400">protegemos o futuro</span>.</h2>
         <p className="text-white/40 mb-8 text-sm max-w-2xl mx-auto">Faça parte da comunidade que está transformando o futuro através de ações sustentáveis.</p>
         <button 
           onClick={() => onGamificationAction('LOGIN')} // Ação de gamificação
           className="bg-white text-black font-bold py-4 px-6 md:px-10 rounded-none hover:bg-green-400 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.2)] transform hover:scale-105"
         >
           Participar Agora
         </button>
      </div>
    </div>
  );
};

export default ModuleEcoTech;