import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Zap,
  Diamond,
  CheckCircle2,
  MessageSquare,
  Send,
  Bot,
  Loader2,
  TrendingUp,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Shield,
  Shirt,
  Coins,
  Megaphone,
  BarChart,
} from "lucide-react";
import { useWinf } from "../contexts/WinfContext";
import { GoogleGenAI } from "@google/genai";
import ModuleProducts from "./ModuleProducts";

const LICENSING_PLANS = [
  {
    id: "asset-light",
    title: "Asset Light Select",
    subtitle: "NÍVEL 1 • CONSULTORIA VIRTUAL",
    price: 15000,
    icon: Diamond,
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20",
    description:
      "Venda direta para o cliente final (residencial e corporativo) com operação enxuta sem necessidade de loja física.",
    benefits: [
      "Acesso ao Portfólio",
      "WINF OS™ CRM",
      "Academy 360",
      "Mentoria",
      "Marketing Hub",
    ],
  },
  {
    id: "kiosk",
    title: "Kiosk",
    subtitle: "NÍVEL 2 • PONTO DE EXPERIÊNCIA",
    price: 120000,
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    description:
      "Ilhas imersivas para shoppings de luxo. Máquina de captação de leads físicos.",
    benefits: [
      "Tudo do Asset Light",
      "Projeto Arquitetônico",
      "Displays Térmicos",
      "Hardware VR",
      "Exclusividade",
    ],
  },
  {
    id: "flagship",
    title: "Flagship + Total",
    subtitle: "NÍVEL 3 • DISTRIBUIÇÃO REGIONAL",
    price: 250000,
    icon: Shield,
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20",
    description:
      "Estúdios de Luxo Flagship, com direitos de master e distribuição regional.",
    benefits: [
      "Tudo do Nível Kiosk",
      "Projeto Flagship",
      "Licença de Distribuição",
      "Prioridade VIP",
      "Mentoria Board",
    ],
  },
];

const SHOP_ITEMS = [
  {
    id: "m5",
    category: "merch",
    name: "Óculos de Sol WINF™ DarkMode",
    desc: "Construção em acetato premium. Lentes com bloqueio UV oficial Winf.",
    price: 490,
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m6",
    category: "merch",
    name: "Jaqueta Corta-Vento W-Pro",
    desc: "Tecido tecnológico impermeável. Logo refletivo, design minimalista e tático.",
    price: 380,
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m1",
    category: "merch",
    name: "Uniforme Técnico WINF™",
    desc: "Camisa manga longa dry-fit de alta performance para o parceiro avançado.",
    price: 180,
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "m2",
    category: "merch",
    name: "Boné Performance WINF™",
    desc: "Aba curva respirável. O clássico headwear dos instaladores elite.",
    price: 85,
    img: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s1",
    category: "supplies",
    name: "Winf Select Nano® (Residencial)",
    desc: "Rolo 1.52m x 30m. Película de nano cerâmica para residências. Proteção e luxo.",
    price: 3200,
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s2",
    category: "supplies",
    name: "Winf AeroCore™ (Automotivo)",
    desc: "Para o partner: Rolo automotivo alta performance. Bloqueio IR 99%.",
    price: 4500,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "d1",
    category: "digital",
    name: "Pack 1000 WinfCoins",
    desc: "Moeda digital do ecossistema. Use para Masterclasses e Mentoria.",
    price: 900,
    icon: Coins,
    color: "text-yellow-400",
  },
  {
    id: "i1",
    category: "investor",
    name: "Cota de Licenciamento KIOSK",
    desc: "Reserve sua ilha imersiva Ponto de Venda. Alta conversão física.",
    price: 120000,
    icon: BarChart,
    color: "text-emerald-400",
  },
  {
    id: "i2",
    category: "investor",
    name: "Franquia Regional STUDIO",
    desc: "Buscamos pioneiros. Estúdio arquitetônico premium e ponto hub distribuidor.",
    price: 250000,
    icon: Diamond,
    color: "text-blue-400",
  },
];

import CheckoutBlackshop from './CheckoutBlackshop';

interface ModuleBlackshopProps {
  onBack?: () => void;
  onNavigateToChain?: () => void;
}

const ModuleBlackshop: React.FC<ModuleBlackshopProps> = ({ onBack, onNavigateToChain }) => {
  const { user } = useWinf();
  const [activeTab, setActiveTab] = useState<
    "storefront" | "catalog" | "licensing"
  >("storefront");
  const [showAiOverlay, setShowAiOverlay] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);

  // AI Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleAiAsk = async (planId?: string) => {
    setShowAiOverlay(true);
    if (!planId) return;
    const plan = LICENSING_PLANS.find((p) => p.id === planId);
    if (!plan) return;
    const initialAsk = `Quero comparar o plano ${plan.title} com os outros. O que ele tem de melhor para o meu momento?`;
    await processAiResponse(initialAsk);
  };

  const processAiResponse = async (text: string) => {
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setIsAiTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `Você é o WINF UPGRADE AI™, assistente especialista em expansão de negócios da rede WINF.`,
        },
      });
      const response = await chat.sendMessage({ message: text });
      setChatMessages((prev) => [...prev, { role: "ai", text: response.text }]);
    } catch (e) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "O terminal neural está offline ou API não configurada corretamente.",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handlePurchase = (item: any) => {
    if (item.price === 0) {
      alert(`Itens gratuitos resgatados: ${item.name}`);
      return;
    }
    setCheckoutItem([item]);
  };

  const renderStorefrontGrid = (title: string, items: any[]) => (
    <div className="mb-16">
      <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#080808] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col group cursor-pointer"
          >
            {item.img ? (
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                {item.price === 0 && (
                  <div className="absolute top-2 left-2 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest px-2 py-1">
                    Gratuito
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-white/5 to-[#050505] flex items-center justify-center relative">
                <item.icon
                  size={48}
                  strokeWidth={1}
                  className={`${item.color} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}
                />
                {item.price === 0 && (
                  <div className="absolute top-2 left-2 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest px-2 py-1">
                    Gratuito
                  </div>
                )}
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                {item.name}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">
                {item.desc}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-light text-white">
                  {item.price === 0
                    ? "Grátis"
                    : `R$ ${item.price.toLocaleString("pt-BR")}`}
                </span>
                <button
                  onClick={() => handlePurchase(item)}
                  className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  {item.price === 0 ? "Resgatar" : "Adicionar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (checkoutItem) {
    return (
      <div className="animate-fade-in w-full">
        <CheckoutBlackshop 
          items={checkoutItem} 
          onBack={() => setCheckoutItem(null)} 
          onSuccess={() => {
            setCheckoutItem(null);
            if (onNavigateToChain) onNavigateToChain();
          }} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white">
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                {onBack && (
                  <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                      <ChevronLeft size={14} /> Voltar ao Painel
                  </button>
                )}
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Winf Store
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Módulo <span className="font-medium text-white/80">BlackShop</span></h1>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 items-end">
                <div className="flex bg-[#0A0A0A] p-1.5 border border-white/5 shadow-2xl overflow-x-auto max-w-full">
                    <button onClick={() => setActiveTab("storefront")} className={`flex items-center gap-2 px-6 py-2.5 whitespace-nowrap text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === "storefront" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>
                        LOJA
                    </button>
                    <button onClick={() => setActiveTab("catalog")} className={`flex items-center gap-2 px-6 py-2.5 whitespace-nowrap text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === "catalog" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>
                        CATÁLOGO TÉCNICO
                    </button>
                    <button onClick={() => setActiveTab("licensing")} className={`flex items-center gap-2 px-6 py-2.5 whitespace-nowrap text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === "licensing" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>
                        LICENCIAMENTO
                    </button>
                </div>
            </div>
        </div>

      <AnimatePresence mode="popLayout">
        {activeTab === "storefront" && (
          <motion.div
            key="storefront"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Vibe BLACKSHOP (based on provided image) */}
            <div className="py-12 md:py-20 text-left">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-6 leading-tight tracking-tight">
                UMA MARCA.<br />UM LIFESTYLE.
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-16 font-light">
                Para clientes que exigem o melhor. Para parceiros e investidores que querem dominar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
                <div className="bg-[#dfdfdf] aspect-square flex items-center justify-center p-6 md:p-12">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
                    className="w-full h-full object-contain filter grayscale contrast-125 mix-blend-multiply"
                    alt="Exclusive Item"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-widest">
                    O CÓDIGO WINF™
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed font-light">
                    O ecosistema Blackshop conecta clientes VIP ao universo da marca. Se você já tem a tecnologia em seus vidros, pode vestir a nossa estética. Se quer fazer parte do futuro, torne-se um licenciado ou invista em nossos Kiosks e Studios.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24">
                <button 
                  onClick={() => {
                    document.getElementById('storefront-items')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-5 border border-white/30 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors text-sm"
                >
                  Explorar Catálogo
                </button>
                <button 
                  onClick={() => setActiveTab('licensing')}
                  className="py-5 border border-white/30 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors text-sm"
                >
                  Saiba Mais
                </button>
              </div>

              <div className="mb-24">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white mb-6 leading-tight tracking-tight">
                  DESENVOLVIDO PARA<br />A ELITE.
                </h2>
                <p className="text-lg md:text-xl text-white/70 font-light">
                  Explore nossas coleções, suprimentos técnicos certificados e passe para o próximo nível.
                </p>
              </div>
            </div>

            <div id="storefront-items">
              {renderStorefrontGrid(
                "WINF™ Lifestyle & Merchandising",
                SHOP_ITEMS.filter((i) => i.category === "merch"),
              )}
              {renderStorefrontGrid(
                "Películas Oficiais (Rolo)",
                SHOP_ITEMS.filter((i) => i.category === "supplies"),
              )}
              {renderStorefrontGrid(
                "Oportunidades de Investimento",
                SHOP_ITEMS.filter((i) => i.category === "investor"),
              )}
              {renderStorefrontGrid(
                "Serviços Digitais & Vantagens",
                SHOP_ITEMS.filter((i) => i.category === "digital"),
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "catalog" && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ModuleProducts />
          </motion.div>
        )}

        {activeTab === "licensing" && (
          <motion.div
            key="licensing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {/* Intro Hero */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-5 md:p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] group-hover:bg-white/10 transition-all"></div>
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white uppercase tracking-[0.2em]">
                  <TrendingUp size={12} /> Roadmap de Carreira
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                  EVOLUA SEU NEGÓCIO <br />
                  PARA O{" "}
                  <span className="text-white">PRÓXIMO NÍVEL.</span>
                </h2>
                <p className="text-white/40 text-sm md:text-lg leading-relaxed">
                  A Blackshop é o portal de evolução da rede. Escolha seu
                  licenciamento e desbloqueie ferramentas de marketing, suporte
                  estratégico e prioridade de leads.
                </p>
                <button
                  onClick={() => handleAiAsk()}
                  className="flex items-center gap-3 bg-white text-black px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all group"
                >
                  <Bot size={18} /> Conversar com Winf Upgrade AI™
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LICENSING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#0A0A0A] border ${plan.border} p-5 md:p-8 flex flex-col h-full hover:scale-[1.02] transition-all duration-500 group relative`}
                >
                  {plan.id === "asset-light" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1.5 text-[10px] md:text-[8px] font-black uppercase tracking-widest shadow-xl shadow-white/20">
                      Entrada Estratégica
                    </div>
                  )}

                  <div className="mb-8">
                    <div
                      className={`p-4 ${plan.bg} ${plan.color} w-fit mb-6 border border-white/5`}
                    >
                      <plan.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tighter uppercase mb-1">
                      {plan.title}
                    </h3>
                    <p
                      className={`text-xs md:text-[10px] font-bold uppercase tracking-widest ${plan.color}`}
                    >
                      {plan.subtitle}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-xs text-white/40">R$</span>
                      <span className="text-3xl font-black text-white">
                        {plan.price.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/40 text-xs leading-relaxed mb-8 grow">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {plan.benefits.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs md:text-[10px] text-white/60 uppercase font-medium tracking-wide"
                      >
                        <CheckCircle2 size={12} className={plan.color} /> {b}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <button
                      onClick={() => setCheckoutItem([{ name: plan.title, category: 'Licenciamento', price: plan.price, img: null }])}
                      className={`w-full py-4 font-black text-xs md:text-[10px] uppercase tracking-widest transition-all ${plan.id === "asset-light" ? "bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black" : "bg-white text-black hover:bg-zinc-200 shadow-lg"}`}
                    >
                      Adquirir Licença
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {showAiOverlay && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#050505] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 bg-[#080808] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tighter">
                    WINF UPGRADE AI™
                  </h3>
                  <p className="text-xs md:text-[10px] text-white font-bold uppercase tracking-widest">
                    Consultor de Evolução
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiOverlay(false)}
                className="text-white/40 hover:text-white p-2"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {chatMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <MessageSquare size={40} className="text-gray-600" />
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">
                    Qual a sua dúvida sobre <br /> as licenças WINF™?
                  </p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-[13px] leading-relaxed ${msg.role === "user" ? "bg-white text-black" : "bg-[#111] text-white/60 border border-white/5"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#111] p-4 border border-white/5 flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1.5 h-1.5 bg-white"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-white"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-white"
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-[#080808] border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    chatInput.trim() &&
                    !isAiTyping &&
                    processAiResponse(chatInput)
                  }
                  placeholder="Tire suas dúvidas..."
                  className="w-full bg-black border border-white/10 py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-winf-primary transition-all"
                />
                <button
                  onClick={() => {
                    if (chatInput.trim() && !isAiTyping)
                      processAiResponse(chatInput);
                    setChatInput("");
                  }}
                  disabled={!chatInput.trim() || isAiTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-white_hover disabled:opacity-50 transition-all font-bold"
                >
                  {isAiTyping ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleBlackshop;
