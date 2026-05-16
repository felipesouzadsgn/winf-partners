
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  MessageSquare, 
  Search, 
  MapPin,
  Bot, 
  Send, 
  Zap, 
  Globe,
  Loader,
  // Fix: Added missing ExternalLink icon
  ExternalLink,
  Navigation
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { User as UserType, GamificationAction } from '../types';

interface ModuleConciergeProps {
  onBack: () => void;
  user: UserType;
  onGamificationAction?: (action: GamificationAction) => void;
}

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  grounding?: {
    search?: { title: string; uri: string }[];
    map?: { title: string; uri: string }[];
    chunks?: any[];
  };
};

const ModuleConcierge: React.FC<ModuleConciergeProps> = ({ onBack, user, onGamificationAction }) => {
  const getFirstName = (name: string) => name.split(' ')[0];
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'ai',
      text: `Olá, ${getFirstName(user.name)}. Sou o Winf Concierge™. Estou conectado à rede neural global. Posso localizar serviços automotivos de luxo, verificar tendências de mercado ou auxiliar com dados técnicos do ecossistema. Como posso servir hoje?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Trigger Gamification (Reward for using AI)
    if (onGamificationAction) {
      onGamificationAction('COMMENT'); 
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          tools: [
            { googleSearch: {} }, 
            { googleMaps: {} }
          ],
          systemInstruction: `Você é o Winf Concierge, um assistente de IA ultra-premium e sofisticado do Ecossistema Digital Winf. 
          
          Sua Persona:
          - Profissional, conciso, elegante e altamente eficiente.
          - Você atende investidores, donos de carros de luxo e licenciados da marca.
          - Use terminologia técnica adequada (AeroCore, NanoCeramic, NeoSkin) quando relevante.
          
          Suas Capacidades:
          - Se o usuário perguntar sobre locais (oficinas, restaurantes, eventos), use o Google Maps.
          - Se o usuário perguntar sobre notícias, fatos recentes ou dados de mercado, use o Google Search.
          
          Formatação:
          - Responda sempre em Markdown limpo.
          - Seja direto. Não use introduções longas.`
        }
      });

      // Fix: Access response.text directly
      const generatedText = response.text || "Desculpe, não consegui processar sua solicitação no momento.";
      
      // Extract Grounding Metadata
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const searchLinks: { title: string; uri: string }[] = [];
      const mapLinks: { title: string; uri: string }[] = [];

      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web) {
            searchLinks.push({ title: chunk.web.title, uri: chunk.web.uri });
          }
          // Note: Maps chunks structure varies, often processed via the text referencing, 
          // but if available directly in chunks we can extract them. 
          // For now we rely on the generic chunks for rendering rich cards if specific map data is present.
        });
      }

      // Add AI Message
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: generatedText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grounding: {
          search: searchLinks,
          map: mapLinks,
          chunks: groundingChunks // Store raw chunks for advanced rendering if needed
        }
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Ocorreu uma falha na conexão neural segura. Por favor, tente novamente.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-4 shrink-0 gap-4">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
             <ChevronLeft size={16} /> Voltar
           </button>
           <div>
             <h1 className="text-xl md:text-2xl font-heading font-light text-white tracking-tight">WINF <span className="font-bold text-white/40">CONCIERGE</span><span className="text-xs align-top ml-1 text-white/40">AI</span></h1>
           </div>
        </div>
        <div className="flex items-center gap-4 hidden sm:flex">
             <div className="flex gap-2">
                <span className="px-2 py-1 rounded-none bg-zinc-800/10 border border-zinc-700/30 text-xs md:text-[10px] text-white/40 font-bold flex items-center gap-1"><Globe size={10} /> SEARCH ACTIVE</span>
                <span className="px-2 py-1 rounded-none bg-green-500/10 border border-green-500/30 text-xs md:text-[10px] text-green-400 font-bold flex items-center gap-1"><MapPin size={10} /> MAPS ACTIVE</span>
             </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main Chat Area */}
        <div className="flex-1 bg-winf-card border border-white/10 rounded-none flex flex-col overflow-hidden relative shadow-2xl">
           <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-none bg-black border border-zinc-700 flex items-center justify-center text-white/40 shadow-lg">
                    <Bot size={20} />
                 </div>
                 <div>
                    <h2 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                       GEMINI INTELLIGENCE
                       <span className={`w-1.5 h-1.5 rounded-none ${isLoading ? 'bg-white animate-ping' : 'bg-green-500'}`}></span>
                    </h2>
                    <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-wider font-bold">Powered by Google</p>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
              {messages.map((msg) => (
                 <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 border ${
                       msg.sender === 'user' 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-black border-zinc-700 text-white/40'
                    }`}>
                       {msg.sender === 'user' ? getInitials(user.name) : <Bot size={16} />}
                    </div>
                    <div className={`max-w-[85%] lg:max-w-[70%] space-y-2`}>
                        <div className={`rounded-none p-4 ${
                        msg.sender === 'user'
                            ? 'bg-white/10 text-white rounded-tr-sm'
                            : 'bg-black border border-zinc-700/30 text-white/80 rounded-tl-sm shadow-[0_0_15px_rgba(113,113,122,0.1)]'
                        }`}>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed markdown-body">
                                {msg.text}
                            </div>
                        </div>
                        
                        {/* Rich Grounding Sources - Web Search */}
                        {msg.grounding?.search && msg.grounding.search.length > 0 && (
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {msg.grounding.search.slice(0, 4).map((link, idx) => (
                                    <a 
                                        key={idx} 
                                        href={link.uri} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex flex-col p-3 bg-black/40 border border-white/10 rounded-none hover:border-zinc-700/50 hover:bg-zinc-800/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-2 text-xs md:text-[10px] text-white/40 mb-1">
                                            <Globe size={10} className="text-white/40" /> FONTE
                                        </div>
                                        <span className="text-xs text-white/40 font-medium truncate group-hover:text-white flex items-center gap-1">
                                            {link.title} <ExternalLink size={10} className="opacity-50" />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                        
                         {/* Rich Grounding Sources - Maps (Rendered if chunks indicate map data) */}
                         {msg.grounding?.chunks && msg.grounding.chunks.some(c => c.web?.uri?.includes('google.com/maps') || c.web?.title?.includes('Map')) && (
                            <div className="mt-2 p-3 bg-black/40 border border-green-900/30 rounded-none flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-none text-green-500">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60">Localizações encontradas via Google Maps.</p>
                                    <p className="text-xs md:text-[10px] text-white/40">Verifique os links acima para navegar.</p>
                                </div>
                            </div>
                         )}
                        
                        <div className={`text-xs md:text-[10px] font-mono opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            {msg.timestamp}
                        </div>
                    </div>
                 </div>
              ))}
              {isLoading && (
                  <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-none bg-black border border-zinc-700 text-white/40 flex items-center justify-center shrink-0">
                         <Bot size={16} />
                      </div>
                      <div className="flex items-center gap-1 h-8">
                          <span className="w-1.5 h-1.5 bg-zinc-800 rounded-none animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-800 rounded-none animate-bounce delay-75"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-800 rounded-none animate-bounce delay-150"></span>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
           </div>

           <div className="p-4 bg-winf-card border-t border-white/10">
              <div className="relative flex items-end gap-2 bg-black border border-white/10 rounded-none p-2 focus-within:border-zinc-700/50 transition-colors">
                 <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                       if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                       }
                    }}
                    disabled={isLoading}
                    placeholder="Pergunte sobre notícias, locais ou fatos..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2 px-2 placeholder:text-gray-600 disabled:opacity-50"
                 />
                 <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className={`p-2 rounded-none transition-all duration-200 ${
                       inputValue.trim() && !isLoading
                        ? 'bg-zinc-800 text-white hover:bg-zinc-800 shadow-[0_0_10px_rgba(113,113,122,0.3)] transform active:scale-105 active:bg-zinc-800' 
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                 >
                    {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleConcierge;