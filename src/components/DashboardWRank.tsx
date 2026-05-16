
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Hexagon, 
  Shield, 
  Zap, 
  Layers, 
  Trophy, 
  ArrowUpRight, 
  Star, 
  Target, 
  Coins, 
  CheckCircle, 
  ChevronRight, 
  Clock,
  BookOpen,
  Users,
  Globe
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { Achievement, WRankMission } from '../types';

// Mock Data para W-Rank (será substituído por dados do Supabase)
const W_RANK_LEVELS = [
  { level: 'Initiate', xpThreshold: 0, bonusCoins: 50 },
  { level: 'Operador', xpThreshold: 1000, bonusCoins: 100 },
  { level: 'Elite', xpThreshold: 2500, bonusCoins: 200 },
  { level: 'Master', xpThreshold: 5000, bonusCoins: 500 },
  { level: 'Legend', xpThreshold: 10000, bonusCoins: 1000 },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blindagem', name: 'Primeira Blindagem', description: 'Registro da primeira garantia no sistema.', icon: 'Shield', xpReward: 100, winfCoinsReward: 50, unlocked: true },
  { id: 'ai-initiate', name: 'NeuroMesh Initiate', description: 'Gerou 5 assets visuais com NeuroMesh AI.', icon: 'Zap', xpReward: 75, winfCoinsReward: 40, unlocked: true },
  { id: 'academy-novice', name: 'Academy Novice', description: 'Completou o Módulo 1 da Winf Academy.', icon: 'BookOpen', xpReward: 50, winfCoinsReward: 30, unlocked: true },
  { id: 'social-poster', name: 'Social Dominator', description: 'Realizou 10 publicações agendadas no Grid.', icon: 'Users', xpReward: 120, winfCoinsReward: 60, unlocked: false },
  { id: 'lead-hunter', name: 'Lead Hunter', description: 'Gerou 20 leads qualificados no Capture System.', icon: 'Target', xpReward: 150, winfCoinsReward: 80, unlocked: false },
  { id: 'master-sales', name: 'Master Closer', description: 'Faturou R$ 50.000 em vendas Blackshop.', icon: 'Coins', xpReward: 300, winfCoinsReward: 150, unlocked: false },
];

const MOCK_MISSIONS: WRankMission[] = [
  { id: 'mission-001', title: 'Blindagens Semanais', description: 'Registre 3 novas garantias esta semana.', xpReward: 50, winfCoinsReward: 25, progress: 66, completed: false },
  { id: 'mission-002', title: 'Atendimento AI', description: 'Utilize o Concierge AI 5 vezes.', xpReward: 30, winfCoinsReward: 15, progress: 100, completed: true },
  { id: 'mission-003', title: 'Feedback de Clientes', description: 'Obtenha 2 feedbacks "Nota 10" no FaceCar.', xpReward: 70, winfCoinsReward: 35, progress: 0, completed: false },
];

const DashboardWRank: React.FC = () => {
  const { user, recentActivities } = useWinf();

  // Calcula o progresso para o próximo nível
  const { currentLevel, nextLevel, progressPercentage, xpToNextLevel } = useMemo(() => {
    const sortedLevels = [...W_RANK_LEVELS].sort((a, b) => a.xpThreshold - b.xpThreshold);
    let current = sortedLevels[0];
    let next = sortedLevels[0];

    for (let i = 0; i < sortedLevels.length; i++) {
      if (user!.w_rank_xp >= sortedLevels[i].xpThreshold) {
        current = sortedLevels[i];
      }
      if (user!.w_rank_xp < sortedLevels[i].xpThreshold) {
        next = sortedLevels[i];
        break;
      }
      if (i === sortedLevels.length - 1) { // Já está no nível máximo
        next = sortedLevels[i]; // Next é o próprio nível máximo
      }
    }

    const xpForCurrentLevel = current.xpThreshold;
    const xpForNextLevel = next.xpThreshold;
    const xpInCurrentSegment = user!.w_rank_xp - xpForCurrentLevel;
    const totalXpSegment = xpForNextLevel - xpForCurrentLevel;

    let percentage = 0;
    let xpNeeded = 0;

    if (current.level === next.level) { // Already at max level
      percentage = 100;
      xpNeeded = 0;
    } else {
      percentage = (xpInCurrentSegment / totalXpSegment) * 100;
      xpNeeded = totalXpSegment - xpInCurrentSegment;
    }

    return {
      currentLevel: current,
      nextLevel: next,
      progressPercentage: Math.min(100, Math.max(0, percentage)),
      xpToNextLevel: Math.max(0, xpNeeded)
    };
  }, [user]);

  const recentXpActivities = recentActivities.filter(activity => activity.type === 'XP_EARNED').slice(0, 5);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Initiate': return 'text-white/40';
      case 'Operador': return 'text-white/40';
      case 'Elite': return 'text-white/40';
      case 'Master': return 'text-green-400';
      case 'Legend': return 'text-white';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
            <div>
                <h1 className="text-3xl font-light text-white tracking-tight">W-RANK <span className="font-bold text-white/40">PROTOCOLS</span></h1>
                <p className="text-white/40 text-sm mt-1">Seu status de elite no ecossistema Winf. Conquiste, Evolua, Domine.</p>
            </div>
            <div className="bg-gradient-to-r from-winf-aerocore_blue/20 to-black border border-zinc-700/40 px-6 py-3 rounded-none flex items-center gap-3 shadow-lg shadow-winf-aerocore_blue/20">
                <Hexagon size={20} className="text-white/40 animate-pulse" />
                <span className="text-white font-bold text-lg uppercase tracking-wider">{user?.w_rank_level.toUpperCase()}</span>
            </div>
        </div>

        {/* XP Progression & Current Level */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-zinc-700/30 rounded-none p-6 md:p-10 relative overflow-hidden group shadow-2xl">
            {/* Background Orb */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-zinc-800/10 rounded-none blur-[100px] group-hover:bg-zinc-800/20 transition-all duration-700"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-zinc-800/10 rounded-none blur-[80px] group-hover:bg-zinc-800/20 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-[0.4em] mb-4">Seu Progresso de Elite</p>
                
                {/* Circular Progress Bar */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      className="text-gray-800" 
                      strokeWidth="8" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="64" 
                      cx="80" 
                      cy="80" 
                    />
                    <circle 
                      className="text-white/40" 
                      strokeWidth="8" 
                      strokeDasharray={2 * Math.PI * 64} 
                      strokeDashoffset={2 * Math.PI * 64 * (1 - progressPercentage / 100)} 
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="64" 
                      cx="80" 
                      cy="80" 
                      style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-xs md:text-[10px] text-white/40 uppercase font-black">XP</p>
                      <p className="text-4xl font-mono font-bold text-white">{user?.w_rank_xp.toLocaleString()}</p>
                  </div>
                </div>

                <div className="h-1 w-32 bg-zinc-800/50 mx-auto my-6 rounded-none shadow-lg shadow-winf-aerocore_blue/20"></div>

                <div className="flex items-center gap-4 mb-6">
                    <p className={`text-xl font-bold uppercase tracking-wider ${getLevelColor(currentLevel.level)}`}>{currentLevel.level}</p>
                    <ArrowUpRight size={20} className="text-white/40" />
                    <p className={`text-xl font-bold uppercase tracking-wider ${getLevelColor(nextLevel.level)}`}>{nextLevel.level}</p>
                </div>
                
                {currentLevel.level !== nextLevel.level && (
                    <p className="text-sm text-white/40 font-light">
                      Faltam <span className="font-bold text-white">{xpToNextLevel.toLocaleString()} XP</span> para alcançar o nível <span className={`font-bold ${getLevelColor(nextLevel.level)}`}>{nextLevel.level}</span>.
                    </p>
                )}
                {currentLevel.level === nextLevel.level && (
                    <p className="text-sm text-white/40 font-light">
                      Você atingiu o nível máximo de W-Rank!
                    </p>
                )}
            </div>
        </div>

        {/* Missões Ativas & Atividades Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-8">
            {/* Missões Ativas */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-zinc-800/5 rounded-none blur-3xl"></div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Target size={24} className="text-white/40" /> Missões Ativas
                </h3>
                <div className="space-y-4">
                    {MOCK_MISSIONS.map(mission => (
                        <div key={mission.id} className="p-5 bg-black border border-white/5 rounded-none flex items-center justify-between group hover:border-zinc-700/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-none flex items-center justify-center ${mission.completed ? 'bg-green-500/20 text-green-500' : 'bg-zinc-800/10 text-white/40'}`}>
                                    {mission.completed ? <CheckCircle size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{mission.title}</p>
                                    <p className="text-xs text-white/40">{mission.description}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">+{mission.xpReward} XP</p>
                                <p className="text-sm font-mono text-white/40 flex items-center gap-1 justify-end">
                                    <Coins size={12} /> {mission.winfCoinsReward} WC
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Atividades Recentes de XP */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock size={24} className="text-white/40" /> Atividade Recente
                </h3>
                <div className="space-y-4">
                    {recentXpActivities.map((activity, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-black border border-white/5 rounded-none">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-none bg-white/5 flex items-center justify-center text-white/40">
                                    <ArrowUpRight size={14} />
                                </div>
                                <div>
                                    <p className="text-sm text-white font-bold">{activity.description}</p>
                                    <p className="text-xs md:text-[10px] text-white/40">{new Date(activity.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <span className="text-sm font-mono text-white/40 font-bold">+25 XP</span> {/* Mock XP value for now */}
                        </div>
                    ))}
                    {recentXpActivities.length === 0 && (
                        <p className="text-center text-white/40 py-8 text-sm">Nenhuma atividade recente contribuindo para XP.</p>
                    )}
                </div>
            </div>
        </div>
        
        {/* Conquistas (Achievements) */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Trophy size={24} className="text-white" /> Suas Conquistas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ACHIEVEMENTS.map(ach => (
                    <div key={ach.id} className={`p-5 rounded-none border flex flex-col items-center text-center transition-all ${ach.unlocked ? 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-black border-gray-800 opacity-50 grayscale'}`}>
                        <div className={`w-16 h-16 rounded-none flex items-center justify-center mb-4 ${ach.unlocked ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-600'}`}>
                            {ach.icon === 'Shield' && <Shield size={32} />}
                            {ach.icon === 'Zap' && <Zap size={32} />}
                            {ach.icon === 'BookOpen' && <BookOpen size={32} />}
                            {ach.icon === 'Users' && <Users size={32} />}
                            {ach.icon === 'Target' && <Target size={32} />}
                            {ach.icon === 'Coins' && <Coins size={32} />}
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{ach.name}</h4>
                        <p className="text-xs md:text-[10px] text-white/40 leading-relaxed mb-3">{ach.description}</p>
                        <div className="flex items-center gap-2 text-xs md:text-[10px] font-bold uppercase tracking-widest mt-2">
                           <span className="text-white/40">+{ach.xpReward} XP</span>
                           <span className="text-white">+{ach.winfCoinsReward} WC</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Global Leaderboard */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-white/10 rounded-none p-5 md:p-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 bg-winf-aerocore_blue/5 rounded-none blur-3xl"></div>
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe size={24} className="text-winf-aerocore_blue" /> Global W-Rank Leaderboard
             </h3>
             <div className="space-y-4 relative z-10">
                {[
                   { rank: 1, name: "Unidade Piloto Santos", level: "Legend", xp: "145,200", isCurrentUser: true },
                   { rank: 2, name: "Winf Select SP", level: "Master", xp: "112,050", isCurrentUser: false },
                   { rank: 3, name: "Studio Master Sul", level: "Master", xp: "98,400", isCurrentUser: false },
                   { rank: 4, name: "AeroCore Rio", level: "Elite", xp: "45,300", isCurrentUser: false },
                   { rank: 5, name: "Elite Floripa", level: "Operador", xp: "12,100", isCurrentUser: false },
                ].map(leader => (
                    <div key={leader.rank} className={`flex items-center justify-between p-4 rounded-none border ${leader.isCurrentUser ? 'bg-winf-aerocore_blue/10 border-winf-aerocore_blue/30 shadow-[0_0_15px_rgba(0,191,255,0.1)]' : 'bg-black border-white/5'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-sm ${leader.rank === 1 ? 'bg-white text-black' : leader.rank === 2 ? 'bg-gray-300 text-black' : leader.rank === 3 ? 'bg-amber-600 text-black' : 'bg-zinc-800 text-white/40'}`}>
                                {leader.rank}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white flex items-center gap-2">
                                  {leader.name} {leader.isCurrentUser && <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest text-winf-aerocore_blue">(Você)</span>}
                                </p>
                                <p className={`text-xs md:text-[10px] font-black uppercase tracking-widest ${getLevelColor(leader.level)}`}>{leader.level}</p>
                            </div>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-mono font-bold text-white">{leader.xp}</p>
                           <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-widest">XP Total</p>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    </div>
  );
};
export default DashboardWRank;
