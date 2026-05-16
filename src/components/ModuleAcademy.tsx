
import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Star, 
  Trophy, 
  Zap, 
  ChevronRight, 
  Lock, 
  Search,
  Coins,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import AcademyCertificate from './AcademyCertificate';
import { ViewState } from '../types';

const ModuleAcademy: React.FC<{ onNavigate?: (view: ViewState) => void }> = ({ onNavigate }) => {
    const { user, gamify } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [showCertificate, setShowCertificate] = useState(false);

    const courses = [
        {
            id: 'c1',
            title: 'Winf Cut™: Otimização de Corte',
            desc: 'Aprenda a reduzir o desperdício em até 40% usando nossa ferramenta de plano de corte.',
            duration: '45 min',
            lessons: 8,
            level: 'Iniciante',
            category: 'Técnico',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
            reward: 50,
            completed: true
        },
        {
            id: 'c2',
            title: 'Vendas de Elite: O Método Winf',
            desc: 'Como vender valor, não preço. Técnicas de fechamento para arquitetura e automotivo.',
            duration: '1h 20min',
            lessons: 12,
            level: 'Intermediário',
            category: 'Vendas',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            reward: 100,
            completed: false
        },
        {
            id: 'c3',
            title: 'Instalação de Invisible® Series',
            desc: 'Técnicas avançadas para aplicação de películas de alta performance sem marcas.',
            duration: '2h 15min',
            lessons: 15,
            level: 'Avançado',
            category: 'Instalação',
            thumbnail: 'https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?auto=format&fit=crop&q=80&w=800',
            reward: 250,
            completed: false
        },
        {
            id: 'c4',
            title: 'Gestão de Estoque com Winf Stock™',
            desc: 'Domine o controle de rolos e evite rupturas de estoque em sua operação.',
            duration: '30 min',
            lessons: 5,
            level: 'Iniciante',
            category: 'Gestão',
            thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
            reward: 30,
            completed: false
        },
        {
            id: 'c5',
            title: 'Atendimento Humanizado & Especializado',
            desc: 'Aprenda o fluxo avançado Winf™ de alta conversão. O roteiro do "Especialista" pra aumentar suas vendas organicamente.',
            duration: '1h 45min',
            lessons: 5,
            level: 'Avançado',
            category: 'Vendas',
            thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
            reward: 350,
            completed: false,
            modules: [
                { id: 'm1', title: 'O Mindset do Especialista Winf™', duration: '15 min' },
                { id: 'm2', title: 'Abordagem Humanizada: A Quebra de Gelo', duration: '20 min' },
                { id: 'm3', title: 'Diagnóstico de Precisão: Fotos e Medidas', duration: '25 min' },
                { id: 'm4', title: 'Liderando a Conversa e Simplificando Escolhas', duration: '20 min' },
                { id: 'm5', title: 'O Fechamento Premium e Sincronização WhatsApp', duration: '25 min' }
            ]
        },
        {
            id: 'c6',
            title: 'Blindagem Térmica Arquitetônica: Fachadas e Engenharia',
            desc: 'Aprenda a lidar com grandes projetos, cálculos de TSER e normas técnicas para edifícios corporativos.',
            duration: '3h 10min',
            lessons: 7,
            level: 'Avançado',
            category: 'Instalação',
            thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            reward: 450,
            completed: false,
            modules: [
                { id: 'm1', title: 'Análise de Stress Térmico em Vidros Laminados', duration: '25 min' },
                { id: 'm2', title: 'Cálculo de ROI Energético para o Cliente', duration: '30 min' },
                { id: 'm3', title: 'Logística de Instalação em Altura', duration: '20 min' },
                { id: 'm4', title: 'Especificações Técnicas e Normas ABNT', duration: '35 min' }
            ]
        },
        {
            id: 'c7',
            title: 'Neuromarketing: A Psicologia do Fechamento Winf™',
            desc: 'Entenda os gatilhos mentais que levam clientes de alto padrão a ignorarem o preço e focarem no valor.',
            duration: '2h 00min',
            lessons: 6,
            level: 'Avançado',
            category: 'Vendas',
            thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
            reward: 300,
            completed: false,
            modules: [
                { id: 'm1', title: 'Gatilhos de Autoridade e Escassez Tática', duration: '20 min' },
                { id: 'm2', title: 'A Ciência da Decisão Rápida', duration: '25 min' },
                { id: 'm3', title: 'Criando Valor Invisível no Atendimento', duration: '30 min' }
            ]
        },
        {
            id: 'c8',
            title: 'NeoSkin PPF: Proteção de Carroceria Nível 5',
            desc: 'Domine a arte da aplicação de PPF (Paint Protection Film) sem estiramento ou marcas de adesivo.',
            duration: '4h 45min',
            lessons: 10,
            level: 'Avançado',
            category: 'Instalação',
            thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
            reward: 600,
            completed: false,
            modules: [
                { id: 'm1', title: 'Preparação Química de Superfície', duration: '30 min' },
                { id: 'm2', title: 'Termoformagem de Curvas Complexas', duration: '45 min' },
                { id: 'm3', title: 'Técnicas de Corte "Ghost" no local', duration: '40 min' }
            ]
        },
        {
            id: 'c9',
            title: 'W-Rank Growth: Parcerias de Elite com Arquitetos',
            desc: 'Como prospectar e manter uma rede de arquitetos gerando projetos recorrentes para sua unidade.',
            duration: '1h 30min',
            lessons: 5,
            level: 'Intermediário',
            category: 'Vendas',
            thumbnail: 'https://images.unsplash.com/photo-1503387762-592dea58f2af?auto=format&fit=crop&q=80&w=800',
            reward: 280,
            completed: false,
            modules: [
                { id: 'm1', title: 'O Pitch de Vendas para Escritórios de Luxo', duration: '20 min' },
                { id: 'm2', title: 'Sistema de Comissionamento e Fidelity', duration: '15 min' },
                { id: 'm3', title: 'Demonstração Técnica da Grade Molecular', duration: '25 min' }
            ]
        },
        {
            id: 'c10',
            title: 'Especialista em Termoformagem: Vidros Convexos',
            desc: 'Domine o calor e controle o estiramento para vidros de altíssima complexidade (Ex: Porsche Curvos).',
            duration: '2h 15min',
            lessons: 8,
            level: 'Avançado',
            category: 'Instalação',
            thumbnail: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800',
            reward: 400,
            completed: false,
            modules: [
                { id: 'm1', title: 'Distribuição Térmica Controlada', duration: '25 min' },
                { id: 'm2', title: 'Uso de Espátulas de Precisão Winf™', duration: '20 min' },
                { id: 'm3', title: 'Prevenção de Efeito Lente', duration: '30 min' }
            ]
        }
    ];

    // Add modules to other courses to avoid errors
    courses.forEach(c => {
        if (!c.modules) {
            c.modules = Array.from({ length: c.lessons }).map((_, i) => ({
                id: `m${i}`,
                title: `Módulo de Introdução ${i + 1}`,
                duration: '10 min'
            }));
        }
    });

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCompleteLesson = () => {
        gamify('ACADEMY_COMPLETED');
        setActiveLesson(null);
        setShowCertificate(true);
    };

    if (activeLesson) {
        return (
            <div className="fixed inset-0 z-[60] bg-[#050505] flex flex-col animate-fade-in">
                <div className="bg-[#0A0A0A] border-b border-white/10 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setActiveLesson(null)} className="p-2 hover:bg-[#050505] rounded-none text-white/40 transition-all">
                            <ChevronRight className="rotate-180" size={20} />
                        </button>
                        <div>
                            <p className="text-xs md:text-[10px] text-white font-black uppercase tracking-widest">Aula em curso</p>
                            <h2 className="text-sm font-bold text-white">{selectedCourse.title}</h2>
                        </div>
                    </div>
                    <button onClick={handleCompleteLesson} className="bg-white text-winf-background px-6 py-2 rounded-none text-xs font-bold hover:bg-white_hover transition-all">
                        Finalizar Treinamento
                    </button>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Content Area */}
                    <div className="flex-[2] overflow-y-auto p-6 lg:p-12 custom-scrollbar">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="aspect-video bg-black rounded-none overflow-hidden shadow-2xl relative group border border-white/10">
                                <img src={selectedCourse.thumbnail} className="w-full h-full object-cover opacity-60" alt="Lesson" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center text-white border border-winf-primary/30 animate-pulse">
                                            <PlayCircle size={40} />
                                        </div>
                                        <p className="text-white font-bold text-sm tracking-widest uppercase">Conteúdo Neural Disponível</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <h1 className="text-3xl font-bold text-white">{selectedCourse.title}</h1>
                                <p className="text-white/80 leading-relaxed">
                                    Nesta aula, vamos mergulhar no segredo do atendimento Winf™ de alta performance. 
                                    O fluxo que você verá em seguida foi desenhado para converter curiosos em clientes fiéis através da autoridade e empatia.
                                </p>

                                {selectedCourse.id === 'c5' && (
                                    <div className="space-y-8 mt-12 bg-[#0A0A0A] p-5 md:p-8 rounded-none border border-white/10">
                                        <h3 className="text-white font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Zap size={18} /> Protocolos Atendimento Tiago™
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                            <div className="space-y-4">
                                                <p className="text-white font-bold text-sm">1. Abertura Premium</p>
                                                <div className="bg-[#050505] p-4 rounded-none italic text-xs text-white/40 border-l-2 border-winf-primary">
                                                    "Muito bom dia ☀️ Que o nosso dia seja abençoado 🙏 Meu nome é Tiago e eu vou cuidar do seu atendimento..."
                                                </div>
                                                <p className="text-sm md:text-[11px] text-white/80 italic">Dica: O "Eu vou cuidar" transmite segurança imediata.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-white font-bold text-sm">2. Diagnóstico de Precisão</p>
                                                <div className="bg-[#050505] p-4 rounded-none italic text-xs text-white/40 border-l-2 border-winf-primary">
                                                    "Pra te orientar com precisão 👍 Você já tem as medidas ou prefere me enviar uma foto/vídeo?"
                                                </div>
                                                <p className="text-sm md:text-[11px] text-white/80 italic">Dica: A palavra PRECISÃO eleva seu nível de autoridade.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-white font-bold text-sm">3. Recomendação Direta</p>
                                                <div className="bg-[#050505] p-4 rounded-none italic text-xs text-white/40 border-l-2 border-winf-primary">
                                                    "Pelo seu caso, o ideal é essa solução aqui 👇 Porque ela resolve exatamente isso..."
                                                </div>
                                                <p className="text-sm md:text-[11px] text-white/80 italic">Dica: Não dê 10 opções. Seja o líder que simplifica a escolha.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-white font-bold text-sm">4. O Fechamento</p>
                                                <div className="bg-[#050505] p-4 rounded-none italic text-xs text-white/40 border-l-2 border-winf-primary">
                                                    "Vou te montar um orçamento bem alinhado ao seu projeto 👍 Se fizer sentido, já organizamos a aplicação."
                                                </div>
                                                <p className="text-sm md:text-[11px] text-white/80 italic">Dica: "Se fizer sentido" remove a pressão e facilita o SIM.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Player */}
                    <div className="flex-1 bg-[#0A0A0A] border-l border-white/10 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">Resumo do Curso</h4>
                            <div className="flex items-center justify-between text-sm md:text-[11px] text-white/40">
                                <span>{selectedCourse.modules.length} Módulos</span>
                                <span>{selectedCourse.duration} totais</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {selectedCourse.modules.map((mod: any, i: number) => (
                                <div key={mod.id} className="flex items-center gap-4 p-4 bg-[#050505]/50 rounded-none border border-transparent hover:border-winf-primary/20 transition-all cursor-pointer group">
                                    <div className="w-8 h-8 rounded-none bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-xs md:text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{mod.title}</p>
                                        <p className="text-xs md:text-[10px] text-white/40">{mod.duration}</p>
                                    </div>
                                    {i === 0 ? <PlayCircle className="text-white" size={16} /> : <Lock size={12} className="text-white/40" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-white tracking-tight">WINF <span className="font-bold text-white">ASCEND™</span></h1>
                    <p className="text-white/40 text-sm">Plataforma de Treinamento de Elite // Evolução Winf™.</p>
                </div>
                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-6 py-3 rounded-none">
                    <div className="text-right">
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Winf™ Knowledge</p>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-[#050505] rounded-none overflow-hidden">
                                <div className="w-1/4 h-full bg-white"></div>
                            </div>
                            <p className="text-white font-bold text-sm">{user?.winf_knowledge || 0} XP</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-winf-border"></div>
                    <div className="text-right">
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Nível</p>
                        <p className="text-white font-bold text-sm">MEMBRO QUALIFICADO</p>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {showCertificate && selectedCourse && (
                    <AcademyCertificate 
                        courseTitle={selectedCourse.title}
                        userName={user?.name || 'Membro Winf'}
                        date={new Date().toLocaleDateString()}
                        onClose={() => setShowCertificate(false)}
                    />
                )}
            </AnimatePresence>

            {/* Featured Course */}
            {!selectedCourse && (
                <div className="relative h-80 rounded-none overflow-hidden group cursor-pointer" onClick={() => setSelectedCourse(courses[1])}>
                    <img 
                        src="/input_file_3.png" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt="Featured"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-winf-background via-winf-background/40 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 space-y-4 max-w-xl">
                        <div className="flex items-center gap-2">
                            <span className="bg-[#0A0A0A] text-white text-xs md:text-[10px] font-black px-3 py-1 rounded-none uppercase tracking-widest">Destaque</span>
                            <span className="bg-white/10 backdrop-blur-md text-white text-xs md:text-[10px] font-black px-3 py-1 rounded-none uppercase tracking-widest flex items-center gap-1">
                                <Coins size={10} /> +100 WinfCoins
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-white leading-tight">Vendas de Elite: O Método Winf</h2>
                        <p className="text-white/80 text-sm">Domine a psicologia de vendas aplicada a películas de alta performance e aumente seu ticket médio.</p>
                        <button className="bg-white text-winf-background px-8 py-3 rounded-none font-bold text-sm flex items-center gap-2 hover:bg-white_hover transition-all">
                            <PlayCircle size={18} /> Começar Agora
                        </button>
                    </div>
                </div>
            )}

            {/* Evolution Banner */}
            <div className="bg-gradient-to-r from-winf-primary/20 to-transparent border border-winf-primary/30 rounded-none p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white uppercase tracking-widest">
                        <TrendingUp size={12} /> Trajetória de Sucesso
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">PRONTO PARA EVOLUIR SUA LICENÇA?</h3>
                    <p className="text-white/80 text-xs leading-relaxed max-w-lg">
                        Conhecimento é a base, mas ferramentas são o acelerador. Veja como os planos <span className="text-white font-bold">Nível 1, 2 e 3</span> podem transformar seu faturamento mensal na Blackshop.
                    </p>
                </div>
                <button 
                  onClick={() => onNavigate?.(ViewState.MODULE_BLACKSHOP)}
                  className="relative z-10 bg-white text-black px-8 py-4 rounded-none font-black text-xs uppercase tracking-widest hover:bg-white_hover transition-all flex items-center gap-2"
                >
                    Explorar Upgrades <ArrowRight size={16} />
                </button>
            </div>

            {/* Course Grid */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2"><BookOpen size={20} className="text-white/40" /> Cursos Disponíveis</h3>
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input 
                            type="text" 
                            placeholder="Buscar cursos..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 py-2.5 pl-12 pr-4 rounded-none text-white text-sm outline-none focus:border-winf-primary transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <motion.div 
                            key={course.id}
                            whileHover={{ y: -5 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden flex flex-col group cursor-pointer"
                            onClick={() => setSelectedCourse(course)}
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img 
                                    src={course.thumbnail} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4 bg-[#050505]/60 backdrop-blur-md text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-black px-2 py-1 rounded-none uppercase">
                                    {course.category}
                                </div>
                                {course.completed && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-winf-background p-1 rounded-none">
                                        <CheckCircle2 size={14} />
                                    </div>
                                )}
                            </div>
                            <div className="p-5 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    <h4 className="text-white font-bold text-sm group-hover:text-white transition-colors">{course.title}</h4>
                                    <p className="text-white/80 text-sm md:text-[11px] leading-relaxed line-clamp-2">{course.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-xs md:text-[10px] text-white/40">
                                        <span className="flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                                        <span className="flex items-center gap-1"><Award size={10} /> {course.level}</span>
                                    </div>
                                    <div className="text-white/80 font-bold text-xs flex items-center gap-1">
                                        <Coins size={12} /> {course.reward}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Course Detail Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCourse(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="h-64 md:h-auto relative">
                                    <img 
                                        src={selectedCourse.thumbnail} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-winf-surface to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-white rounded-none flex items-center justify-center text-winf-background shadow-xl shadow-white/10 hover:scale-110 transition-transform">
                                            <PlayCircle size={32} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-widest">{selectedCourse.category}</span>
                                            <span className="text-winf-border">•</span>
                                            <span className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-widest">{selectedCourse.level}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{selectedCourse.title}</h3>
                                        <p className="text-white/80 text-sm leading-relaxed">{selectedCourse.desc}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#050505]/40 p-4 rounded-none border border-white/10">
                                            <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Aulas</p>
                                            <p className="text-white font-bold">{selectedCourse.lessons}</p>
                                        </div>
                                        <div className="bg-[#050505]/40 p-4 rounded-none border border-white/10">
                                            <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest">Recompensa</p>
                                            <p className="text-white/80 font-bold flex items-center gap-1"><Coins size={14} /> {selectedCourse.reward}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-white">Conteúdo do Curso</p>
                                        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                            {selectedCourse.modules.map((mod: any, i: number) => (
                                                <div key={mod.id} className="flex items-center justify-between p-3 bg-[#050505]/50 rounded-none text-xs text-white/80 border border-transparent hover:border-winf-primary/30 transition-all cursor-pointer group">
                                                    <span className="flex items-center gap-3">
                                                        <span className="text-white/40 font-mono">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                                                        <span className="group-hover:text-white transition-colors">{mod.title}</span>
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs md:text-[10px] text-white/40">{mod.duration}</span>
                                                        <Lock size={12} className="text-white/40" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button 
                                            onClick={() => setSelectedCourse(null)}
                                            className="flex-1 py-3 bg-[#050505]/50 hover:bg-[#050505] text-white font-bold rounded-none transition-all border border-white/10"
                                        >
                                            Fechar
                                        </button>
                                        <button 
                                            onClick={() => setActiveLesson(selectedCourse.modules[0])}
                                            className="flex-1 py-3 bg-white hover:bg-white_hover text-winf-background font-bold rounded-none transition-all shadow-lg shadow-white/5"
                                        >
                                            Iniciar Aula
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModuleAcademy;
