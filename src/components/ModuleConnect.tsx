
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Trophy, 
  Award, 
  Zap, 
  Star, 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Camera, 
  Plus, 
  MoreHorizontal,
  ShieldCheck,
  TrendingUp,
  Target,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';

interface ModuleConnectProps {
    onBack?: () => void;
}

const ModuleConnect: React.FC<ModuleConnectProps> = ({ onBack }) => {
    const { user, members, gamify, dispatchAgentCommand } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'ranking'>('feed');
    const [postContent, setPostContent] = useState('');
    const [isAgentProcessing, setIsAgentProcessing] = useState(false);

    const handlePost = () => {
        if (!postContent.trim()) return;
        gamify('POST');
        setPostContent('');
        alert("Publicação realizada com sucesso!");
    };

    const handleAgentSchedule = async () => {
        if (!postContent.trim() || isAgentProcessing) return;
        
        setIsAgentProcessing(true);
        await dispatchAgentCommand({
            type: 'SCHEDULE',
            action: `Agendar postagem automática: "${postContent.substring(0, 30)}..."`,
            payload: { content: postContent, channels: ['Instagram', 'Facebook', 'Winf Connect'] }
        });
        
        setIsAgentProcessing(false);
        setPostContent('');
        alert("Agente Neural agendou sua postagem em todos os canais!");
    };

    const handleCompleteChallenge = (name: string) => {
        gamify('POST'); // Using POST as a generic action for now
        alert(`Desafio "${name}" concluído! Você ganhou WinfPoints.`);
    };

    const posts = [
        {
            id: 'p1',
            author: 'Tiago (Winf Elite)',
            avatar: 'https://ui-avatars.com/api/?name=Tiago&background=ef4444&color=fff',
            content: 'Acabamos de finalizar esse Porsche 911 com a Invisible® Series. O resultado ficou impecável, proteção total sem alterar a estética original.',
            image: 'https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?auto=format&fit=crop&q=80&w=1200',
            likes: 42,
            comments: 8,
            time: '2h atrás',
            location: 'Santos, SP'
        },
        {
            id: 'p2',
            author: 'Marcos (Winf Premium)',
            avatar: 'https://ui-avatars.com/api/?name=Marcos&background=3b82f6&color=fff',
            content: 'Projeto residencial em Alphaville entregue hoje. Redução de 99% de UV e 90% de calor com a Select IR-99. Cliente extremamente satisfeito!',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
            likes: 28,
            comments: 5,
            time: '5h atrás',
            location: 'Barueri, SP'
        },
        {
            id: 'p3',
            author: 'Ana (Winf Studio)',
            avatar: 'https://ui-avatars.com/api/?name=Ana&background=ec4899&color=fff',
            content: 'Dica do dia: Use o Winf Cut™ para planejar o corte antes de abrir o rolo. Economizei 2 metros de material hoje só com o planejamento!',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
            likes: 56,
            comments: 12,
            time: '1 dia atrás',
            location: 'Curitiba, PR'
        }
    ];

    const leaderboard = [
        { id: 'l1', name: 'Tiago (Winf Elite)', score: 12500, installs: 42, conversion: '92%', rank: 1 },
        { id: 'l2', name: 'Marcos (Winf Premium)', score: 10800, installs: 38, conversion: '88%', rank: 2 },
        { id: 'l3', name: 'Ana (Winf Studio)', score: 9500, installs: 35, conversion: '85%', rank: 3 },
        { id: 'l4', name: 'Ricardo (Winf Pro)', score: 8200, installs: 30, conversion: '82%', rank: 4 },
        { id: 'l5', name: 'Juliana (Winf Design)', score: 7800, installs: 28, conversion: '80%', rank: 5 }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-none transition-all text-white/40 hover:text-white"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                    )}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light text-white tracking-tight">WINF <span className="font-bold text-white/40">CONNECT™</span></h1>
                        <p className="text-white/40 text-sm">Comunidade de Elite: Conectando os Melhores Instaladores do Brasil.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 p-1.5 rounded-none">
                    <button 
                        onClick={() => setActiveTab('feed')}
                        className={`px-6 py-2.5 rounded-none text-xs font-bold transition-all ${activeTab === 'feed' ? 'bg-zinc-800 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Feed
                    </button>
                    <button 
                        onClick={() => setActiveTab('members')}
                        className={`px-6 py-2.5 rounded-none text-xs font-bold transition-all ${activeTab === 'members' ? 'bg-zinc-800 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Membros
                    </button>
                    <button 
                        onClick={() => setActiveTab('ranking')}
                        className={`px-6 py-2.5 rounded-none text-xs font-bold transition-all ${activeTab === 'ranking' ? 'bg-zinc-800 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Ranking
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {activeTab === 'feed' && (
                        <div className="space-y-8">
                            {/* Create Post */}
                            <div className="bg-zinc-900/30 border border-white/5 rounded-none p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-12 h-12 rounded-none" />
                                    <input 
                                        type="text" 
                                        placeholder="Compartilhe um resultado ou dica com a rede..." 
                                        value={postContent}
                                        onChange={e => setPostContent(e.target.value)}
                                        className="flex-1 bg-black/40 border border-white/10 py-3 px-6 rounded-none text-white text-sm outline-none focus:border-red-500 transition-all"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                            <Camera size={16} className="text-red-500" /> Foto/Vídeo
                                        </button>
                                        <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                            <MapPin size={16} className="text-white/40" /> Localização
                                        </button>
                                        <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                            <Zap size={16} className="text-white" /> Insight
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={handleAgentSchedule}
                                            disabled={isAgentProcessing || !postContent.trim()}
                                            className="bg-zinc-800 hover:bg-zinc-700 text-white/60 px-6 py-2.5 rounded-none text-xs font-bold transition-all flex items-center gap-2 border border-white/5"
                                        >
                                            <Bot size={14} className={isAgentProcessing ? 'animate-pulse text-red-500' : 'text-red-500'} />
                                            {isAgentProcessing ? 'Agendando...' : 'Agendar via Agente'}
                                        </button>
                                        <button 
                                            onClick={handlePost}
                                            className="bg-red-600 hover:bg-red-500 text-white px-8 py-2.5 rounded-none text-xs font-bold transition-all"
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Posts Feed */}
                            <div className="space-y-8">
                                {posts.map(post => (
                                    <motion.div 
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-zinc-900/30 border border-white/5 rounded-none overflow-hidden"
                                    >
                                        <div className="p-6 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <img src={post.avatar} className="w-12 h-12 rounded-none" />
                                                <div>
                                                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                                                        {post.author}
                                                        <ShieldCheck size={14} className="text-white/40" />
                                                    </h4>
                                                    <p className="text-xs md:text-[10px] text-white/40 flex items-center gap-1">
                                                        <Clock size={10} /> {post.time} • <MapPin size={10} /> {post.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="text-white/40 hover:text-white transition-all">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                        <div className="px-6 pb-4">
                                            <p className="text-white/60 text-sm leading-relaxed">{post.content}</p>
                                        </div>
                                        <div className="relative h-96">
                                            <img 
                                                src={post.image} 
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        <div className="p-6 flex items-center justify-between border-t border-white/5">
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                                    <Heart size={18} /> {post.likes}
                                                </button>
                                                <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                                    <MessageSquare size={18} /> {post.comments}
                                                </button>
                                                <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-all">
                                                    <Share2 size={18} /> Compartilhar
                                                </button>
                                            </div>
                                            <button className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-widest hover:underline">
                                                Ver Detalhes do Projeto
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="text-white font-bold text-xl">Membros da Rede</h3>
                                <div className="relative w-full md:w-80">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar membros..." 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full bg-zinc-900/50 border border-white/10 py-2.5 pl-12 pr-4 rounded-none text-white text-sm outline-none focus:border-white transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {members.map(member => (
                                    <div key={member.id} className="bg-zinc-900/30 border border-white/5 rounded-none p-6 flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer group">
                                        <img src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`} className="w-16 h-16 rounded-none" />
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold group-hover:text-white transition-colors">{member.name}</h4>
                                            <p className="text-xs md:text-[10px] text-white/40 flex items-center gap-1 uppercase font-black tracking-widest">
                                                <MapPin size={10} /> {member.address?.city || 'Brasil'}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] bg-zinc-800 text-white px-2 py-0.5 rounded-none uppercase font-black">Elite</span>
                                                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] bg-zinc-800 text-white px-2 py-0.5 rounded-none uppercase font-black">Verificado</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-700 group-hover:text-white transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ranking' && (
                        <div className="space-y-6">
                            <div className="bg-zinc-900/30 border border-white/5 rounded-none overflow-hidden">
                                <div className="p-8 bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="space-y-2 text-center md:text-left">
                                        <h3 className="text-3xl font-bold text-white">Installer of the Month</h3>
                                        <p className="text-white/40 text-sm">O membro com maior performance em conversão e qualidade técnica.</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center border border-white/20 relative">
                                                <img src="https://ui-avatars.com/api/?name=Tiago&background=fff&color=000" className="w-16 h-16 rounded-none" />
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-none flex items-center justify-center text-white border-4 border-zinc-900">
                                                    <Trophy size={14} />
                                                </div>
                                            </div>
                                            <p className="text-white font-bold text-xs mt-4">Tiago (Elite)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-2">
                                        {leaderboard.map(item => (
                                            <div key={item.id} className="flex items-center justify-between p-4 bg-black/20 rounded-none border border-white/5 hover:bg-white/5 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-xs ${item.rank === 1 ? 'bg-white text-white' : item.rank === 2 ? 'bg-zinc-400 text-white' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-zinc-800 text-white/40'}`}>
                                                        {item.rank}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-sm">{item.name}</p>
                                                        <p className="text-xs md:text-[10px] text-white/40">{item.installs} Instalações • {item.conversion} Conversão</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-bold text-sm">{item.score.toLocaleString()}</p>
                                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">WinfPoints</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Stats */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-none p-6 space-y-6">
                        <h3 className="text-white font-bold flex items-center gap-2"><TrendingUp size={18} className="text-white/40" /> Sua Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/40 p-4 rounded-none border border-white/5">
                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">WinfPoints</p>
                                <p className="text-white font-bold text-xl">4.250</p>
                            </div>
                            <div className="bg-black/40 p-4 rounded-none border border-white/5">
                                <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Sua Posição</p>
                                <p className="text-white font-bold text-xl">#12</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs md:text-[10px] uppercase font-black tracking-widest">
                                    <span className="text-white/40">Próximo Nível: Master</span>
                                    <span className="text-white">750 pts faltantes</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-none overflow-hidden">
                                    <div className="w-3/4 h-full bg-zinc-700"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-none p-6 space-y-6">
                        <h3 className="text-white font-bold flex items-center gap-2"><Award size={18} className="text-white/40" /> Desafios da Semana</h3>
                        <div className="space-y-4">
                            <div 
                                onClick={() => handleCompleteChallenge('Mestre do Corte')}
                                className="p-4 bg-black/20 rounded-none border border-white/5 space-y-3 cursor-pointer hover:border-white/50 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs md:text-[10px] bg-zinc-800 text-white px-2 py-0.5 rounded-none uppercase font-black">Ativo</span>
                                    <span className="text-white font-bold text-xs md:text-[10px]">+200 pts</span>
                                </div>
                                <h4 className="text-white font-bold text-xs group-hover:text-white transition-colors">Mestre do Corte</h4>
                                <p className="text-xs md:text-[10px] text-white/40">Realize 5 planos de corte no Winf Cut™ com menos de 5% de desperdício.</p>
                                <div className="w-full h-1.5 bg-white/5 rounded-none overflow-hidden">
                                    <div className="w-2/5 h-full bg-zinc-700"></div>
                                </div>
                            </div>
                            <div className="p-4 bg-black/20 rounded-none border border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs md:text-[10px] bg-zinc-800 text-white/40 px-2 py-0.5 rounded-none uppercase font-black">Em breve</span>
                                    <span className="text-white font-bold text-xs md:text-[10px]">+500 pts</span>
                                </div>
                                <h4 className="text-white font-bold text-xs">Visionário AI</h4>
                                <p className="text-xs md:text-[10px] text-white/40">Gere 10 simulações no Winf Vision™ e compartilhe no Connect™.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-zinc-800/10 border border-zinc-700/20 rounded-none p-6 space-y-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded-none flex items-center justify-center text-white">
                            <Zap size={20} />
                        </div>
                        <h4 className="text-white font-bold">Winf Insight</h4>
                        <p className="text-white/40 text-xs leading-relaxed">
                            Membros que compartilham pelo menos 2 projetos por semana no Connect™ recebem <span className="text-white font-bold">15% mais leads</span> do Mission Control™.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleConnect;
