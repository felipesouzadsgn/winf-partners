import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MessageSquare, LineChart, ShieldCheck, Settings, Database, Activity, Network, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useWinf } from '../contexts/WinfContext';
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const AGENTS = [
  {
    id: 'concierge',
    name: 'WINF CONCIERGE AI™',
    role: 'Atendimento Inicial & Qualificação',
    icon: MessageSquare,
    color: 'text-zinc-100',
    bg: 'bg-white/10',
    tasks: [
      'Qualificação de leads em tempo real',
      'Coleta de dados do cliente e veículo/imóvel',
      'Integração direta com WhatsApp',
      'Registro automático no CRM'
    ]
  },
  {
    id: 'sales',
    name: 'WINF SALES AI™',
    role: 'Processo Comercial & Fechamento',
    icon: LineChart,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    tasks: [
      'Apresentação técnica de produtos',
      'Geração de orçamentos dinâmicos',
      'Envio de propostas personalizadas',
      'Agendamento de instalações'
    ]
  },
  {
    id: 'spec',
    name: 'WINF SPEC AI™',
    role: 'Suporte Técnico para Arquitetos',
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    tasks: [
      'Comparação avançada de películas',
      'Explicação técnica (VLT, TSER, IRR)',
      'Geração de relatórios de eficiência energética',
      'Especificação para projetos'
    ]
  },
  {
    id: 'ops',
    name: 'WINF OPS AI™',
    role: 'Operação & Logística da Rede',
    icon: Settings,
    color: 'text-white/40',
    bg: 'bg-zinc-400/10',
    tasks: [
      'Identificação de geolocalização do cliente',
      'Seleção do operador/instalador mais próximo',
      'Organização de agenda e roteirização',
      'Controle de estoque preditivo'
    ]
  },
  {
    id: 'registry',
    name: 'WINF REGISTRY AI™',
    role: 'Registro Oficial & Certificação',
    icon: ShieldCheck,
    color: 'text-zinc-100',
    bg: 'bg-zinc-100/10',
    tasks: [
      'Validação de dados de instalação',
      'Geração do WINF DIGITAL GLASS CERTIFICATE™',
      'Emissão de QR Code único',
      'Registro imutável de garantia'
    ]
  },
  {
    id: 'data',
    name: 'WINF DATA AI™',
    role: 'Inteligência de Rede & BI',
    icon: Database,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    tasks: [
      'Análise preditiva de vendas',
      'Mapeamento de cidades com alta demanda',
      'Relatórios estratégicos para o Board',
      'Análise de performance de instaladores'
    ]
  }
];

const ModuleCoreAI: React.FC = () => {
  const { user, leads, stockItems, installations } = useWinf();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ id?: string, role: 'user' | 'ai', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from Firestore
  useEffect(() => {
    if (!user?.id || user.id.startsWith('proto-')) return;

    const loadHistory = async () => {
      try {
        const q = query(
          collection(db, 'core_ai_chats'),
          where('user_id', '==', user.id),
          orderBy('created_at', 'asc')
        );
        const snapshot = await getDocs(q);
        const history = snapshot.docs.map(doc => ({
          id: doc.id,
          role: doc.data().role as 'user' | 'ai',
          text: doc.data().text,
        }));
        
        if (history.length > 0) {
          setMessages(history);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadHistory();
  }, [user?.id]);

  const generateSystemPrompt = () => {
    const pendingLeads = leads.filter(l => ['Novo', 'Em Atendimento', 'pending', 'open'].includes(l.status)).length;
    const stockSummary = stockItems.filter(s => s.remaining_meters > 0).map(s => `${s.remaining_meters}m de ${s.product_name}`).join(', ');
    const installationsCount = installations.length;

    return `Você é o WINF CORE AI™, o cérebro central e assistente principal do parceiro WINF.
Você tem memória e contexto total do parceiro. Nunca responda de forma genérica. Use o contexto abaixo para personalizar todas as suas respostas.

CONTEXTO DO PARCEIRO:
- Nome: ${user?.name || 'Parceiro'}
- Nível/Licença: ${user?.role || 'Licenciado'}
- Modelo de Negócio: ${user?.businessModel || 'Não definido'}
- Estoque Atual: ${stockSummary || 'Nenhum item em estoque'}
- Leads Pendentes: ${pendingLeads}
- Histórico de Vendas/Instalações: ${installationsCount} instalações realizadas

Exemplo de postura: "Olá ${user?.name}, vi que você tem ${pendingLeads} leads abertos e ${stockSummary ? stockSummary : 'pouco estoque'}. Quer que eu gere uma proposta agora?"

Seja proativo, técnico, estratégico e focado em gerar resultados para o parceiro. Sempre chame o parceiro pelo nome e referencie os dados reais dele quando fizer sentido.`;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Save user message to Firestore
      if (user?.id && !user.id.startsWith('proto-')) {
        await addDoc(collection(db, 'core_ai_chats'), {
          user_id: user.id,
          role: 'user',
          text: userMsg,
          created_at: serverTimestamp()
        });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Initialize chat with history
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: generateSystemPrompt(),
        },
        history: messages.map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }))
      });

      const streamResponse = await chat.sendMessageStream({ message: userMsg });

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

      // Save AI response to Firestore
      if (user?.id && !user.id.startsWith('proto-')) {
        await addDoc(collection(db, 'core_ai_chats'), {
          user_id: user.id,
          role: 'ai',
          text: fullText,
          created_at: serverTimestamp()
        });
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Desculpe, o sistema neural está temporariamente offline. Por favor, tente novamente em alguns instantes.' }]);
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
            <Network className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">WINF CORE AI™</h1>
          </div>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Sistema Nervoso Central da Rede WINF</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-none">
          <Activity className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Core Online</span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-none overflow-hidden flex flex-col h-[600px]">
        <div className="p-6 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-none">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Neural Interface</h3>
              <p className="text-xs md:text-[10px] font-mono text-white/40 uppercase tracking-widest">Conectado ao WINF CORE™</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bot className="w-12 h-12 text-gray-600" />
              <p className="text-sm text-white/40 max-w-xs uppercase tracking-widest font-mono">Inicie uma consulta técnica com o Core AI</p>
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
                <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-purple-400'}`}>
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
                <div className="w-8 h-8 rounded-none bg-zinc-800 text-purple-400 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-none rounded-tl-none border border-white/5 flex gap-1 items-center">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-purple-400 rounded-none" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-400 rounded-none" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-400 rounded-none" />
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
              placeholder="Pergunte sobre especificações, cálculos ou películas..."
              className="w-full bg-zinc-800/50 border border-white/10 rounded-none py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-none p-5 md:p-8 hover:border-white/20 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${agent.bg} rounded-none blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-none ${agent.bg} border border-white/5`}>
                  <agent.icon className={`w-6 h-6 ${agent.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{agent.name}</h3>
                  <p className="text-xs md:text-[10px] font-mono text-white/40 uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Responsabilidades</p>
                {agent.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-none bg-white/30 shrink-0 mt-1.5" />
                    <p className="text-sm text-white/60">{task}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-black/40 border border-white/10 rounded-none p-5 md:p-8">
        <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-white/40" /> Fluxo Neural de Operação
        </h3>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {['Captação (Concierge)', 'Venda (Sales)', 'Logística (Ops)', 'Execução (Tech)', 'Registro (Registry)'].map((step, i) => (
              <div key={i} className="bg-zinc-900 border border-white/10 p-4 rounded-none text-center">
                <div className="w-8 h-8 rounded-none bg-white text-black font-bold flex items-center justify-center mx-auto mb-3 text-xs">
                  {i + 1}
                </div>
                <p className="text-xs font-bold text-white uppercase tracking-widest">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCoreAI;
