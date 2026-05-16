import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, PenTool, Share2, Target, Activity, Zap, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useWinf } from '../contexts/WinfContext';

const AGENTS = [
  {
    id: 'brand',
    name: 'BRAND AI™',
    role: 'Guardião da Identidade Visual',
    icon: PenTool,
    color: 'text-white',
    bg: 'bg-white/10',
    tasks: [
      'Manter identidade visual minimalista e premium',
      'Revisar textos e copywriting corporativo',
      'Validar design de materiais da rede',
      'Garantir padrão premium da marca WINF'
    ]
  },
  {
    id: 'content',
    name: 'CONTENT AI™',
    role: 'Fábrica de Conteúdo',
    icon: Megaphone,
    color: 'text-white/40',
    bg: 'bg-zinc-400/10',
    tasks: [
      'Criação de posts e roteiros',
      'Geração de imagens conceituais',
      'Criação de vídeos curtos (Reels/TikTok)',
      'Produção de conteúdo educativo e técnico'
    ]
  },
  {
    id: 'social',
    name: 'SOCIAL DISTRIBUTION AI™',
    role: 'Gestão de Redes e Engajamento',
    icon: Share2,
    color: 'text-zinc-100',
    bg: 'bg-white/10',
    tasks: [
      'Publicação automática multiplataforma',
      'Distribuição de conteúdo em escala',
      'Gestão de comentários e DMs',
      'Análise de engajamento e alcance'
    ]
  },
  {
    id: 'traffic',
    name: 'TRAFFIC AI™',
    role: 'Aquisição e Performance',
    icon: Target,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    tasks: [
      'Gestão de anúncios (Meta/Google Ads)',
      'Otimização de campanhas locais para licenciados',
      'Distribuição de tráfego por território WINF',
      'Análise de ROI e Custo por Lead (CPL)'
    ]
  }
];

const ModuleMarketingAI: React.FC = () => {
  const { user, saveAiGeneration } = useWinf();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const streamResponse = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "Você é o especialista de vendas WINF™. Crie copys para Instagram, roteiros de WhatsApp e argumentos de venda baseados no perfil do cliente. Use um tom premium, persuasivo e focado em tecnologia de elite.",
        }
      });

      let fullText = "";
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);

      for await (const chunk of streamResponse) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = fullText;
          return newMsgs;
        });
      }

      // Save to Firestore history
      await saveAiGeneration({
        tool_used: 'MarketingAI',
        prompt: userMsg,
        output_url: '', // Text only
        media_type: 'text/plain',
        content: fullText
      });

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'O motor de marketing está em manutenção neural. Por favor, tente novamente em breve.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">MARKETING ADVANCED WINDOW FILM™</h1>
          </div>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Departamento de Marketing Automatizado</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-none">
          <Activity className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">Motor Ativo</span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-none overflow-hidden flex flex-col h-[600px]">
        <div className="p-6 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-none">
              <Megaphone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Marketing Engine</h3>
              <p className="text-xs md:text-[10px] font-mono text-white/40 uppercase tracking-widest">IA de Vendas & Copywriting</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bot className="w-12 h-12 text-gray-600" />
              <p className="text-sm text-white/40 max-w-xs uppercase tracking-widest font-mono">Solicite copys, roteiros ou estratégias de marketing</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-cyan-400'}`}>
                  {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-none text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-zinc-800/50 text-white/80 border border-white/5 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-none bg-zinc-800 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-none rounded-tl-none border border-white/5 flex gap-1 items-center">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-none" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-none" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-none" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Descreva o que você precisa criar hoje..."
              className="w-full bg-zinc-800/50 border border-white/10 rounded-none py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-none hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AGENTS.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-none p-5 md:p-8 hover:border-white/20 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-48 h-48 ${agent.bg} rounded-none blur-3xl -mr-20 -mt-20 transition-opacity opacity-30 group-hover:opacity-60`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-none ${agent.bg} border border-white/5`}>
                  <agent.icon className={`w-8 h-8 ${agent.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">{agent.name}</h3>
                  <p className="text-xs md:text-[10px] font-mono text-white/40 uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs md:text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Atribuições do Agente</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {agent.tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/40 p-4 rounded-none border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-none bg-white/50 shrink-0 mt-1.5" />
                      <p className="text-xs text-white/60 leading-relaxed">{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModuleMarketingAI;
