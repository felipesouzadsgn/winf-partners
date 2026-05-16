import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Zap,
  Globe,
  Check,
  Lock,
  Cpu,
  TrendingUp,
  Diamond,
  ShieldCheck,
  Store,
  Box,
  Users,
  Briefcase,
  Target,
  Info,
  CheckCircle,
  Hexagon,
  Microscope,
  Factory,
  Fingerprint,
  Building2,
  Share2,
  Smartphone,
  GalleryVerticalEnd,
  Star,
  X,
  Loader,
  DollarSign,
  Activity,
  FileText,
  Wand2,
  FileSpreadsheet,
  Layers,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState } from "../types";
import { WINF_CONSTANTS } from "../constants";
import { useWinf } from "../contexts/WinfContext";
import LicensingPlans from "./LicensingPlans";

interface LandingPageContainerProps {
  onEnter: () => void;
  onNavigateToMarketingPage: (view: ViewState, options?: { menuOpen?: boolean }) => void;
  defaultMenuOpen?: boolean;
}

// --- DATA STRUCTURE FOR BUSINESS MODELS ---
const MODELS_DATA = [
  {
    id: "nivel1",
    title: "ASSET LIGHT™",
    subtitle: "NÍVEL 1 • CONSULTORIA",
    price: 15000,
    color: "text-white",
    border: "border-white/5",
    bg: "bg-white/[0.01]",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000",
    description:
      "Acesso ao ecossistema digital Winf™ com baixo investimento e alta agilidade operacional.",
    payback: "1-2 Meses",
    deliverables: [
      "Acesso ao Portal Winf™ PARTNERS",
      "Gestão Completa via WINF OS™",
      "Diagnóstico Digital (Winf Precision)",
      "Linha American Technology",
      "Marketing de Geração de Leads",
    ],
    scenarios: [
      { name: "Conservador", revenue: 15000 },
      { name: "Moderado", revenue: 35000 },
      { name: "Agressivo", revenue: 65000 },
    ],
    investment_breakdown: [
      "Licenciamento Asset Light",
      "Acesso à Plataforma OS",
      "Suporte Estratégico",
    ],
    operational_steps: [
      "1. Credenciamento.",
      "2. Setup Digital.",
      "3. Treinamento de Vendas.",
      "4. Ativação de Leads.",
    ],
    financials: {
      scenario: "Consultoria Estratégica",
      monthly_potential: "R$ 30k",
      profit_margin: "75%",
      note: "Foco em execução técnica e autoridade local.",
    },
    demand: "Alta",
    territory: "Global",
    status: "DISPONÍVEL",
  },
  {
    id: "nivel2",
    title: "HIGH VELOCITY™",
    subtitle: "NÍVEL 2 • TACTICAL HUB",
    price: 120000,
    color: "text-white",
    border: "border-white/10",
    bg: "bg-black",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
    description:
      "Operação de fluxo em shoppings Classe A. Venda recorrente de acessórios Winf™ PARTNERS.",
    payback: "12-18M",
    deliverables: [
      "Tudo do Nível 1",
      "Hardware Retail Winf™",
      "Totem Imersivo VR / Térmico",
      "Autoridade Física Imediata",
      "Triagem Técnica Pro",
    ],
    scenarios: [
      { name: "Fluxo Moderado", revenue: 85000 },
      { name: "Fluxo Alto", revenue: 150000 },
      { name: "Ponto Premium", revenue: 250000 },
    ],
    investment_breakdown: [
      "Licenciamento High Velocity",
      "Totem Imersivo VR",
      "Projeto de Quiosque",
      "Treinamento de Equipe",
    ],
    operational_steps: [
      "1. Seleção de Ponto.",
      "2. Instalação do Hub.",
      "3. Setup de Fluxo VR.",
      "4. Início de Operação Varejo.",
    ],
    financials: {
      scenario: "Retail Machine",
      monthly_potential: "R$ 60k",
      profit_margin: "R$ 144/m²",
      note: "Foco em gestão de território e rede de aplicadores.",
    },
    demand: "Alta Visibilidade",
    territory: "Shopping Classe A",
    status: "OPERACIONAL",
  },
  {
    id: "nivel3",
    title: "TOTAL AUTHORITY™",
    subtitle: "NÍVEL 3 • EXPERIÊNCIA",
    price: 250000,
    color: "text-white",
    border: "border-white/20",
    bg: "bg-white/[0.05]",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000",
    description:
      "Foco estratégico em dominação regional e ultra-exclusividade AeroCore™ Flagship.",
    payback: "18-24M",
    deliverables: [
      "Flagship Studio AeroCore™",
      "Exclusividade Territorial",
      "Rede de Distribuição",
      "Equity: Ações WINF",
      "Mentoria CEO",
    ],
    scenarios: [
      { name: "Standard", revenue: 150000 },
      { name: "Premium", revenue: 350000 },
      { name: "Enterprise", revenue: 750000 },
    ],
    investment_breakdown: [
      "Licenciamento Nível 3",
      "Projeto Studio de Luxo",
      "Estoque de Lançamento",
      "Estratégia GEOFENCING",
    ],
    operational_steps: [
      "1. Análise de Cidades Polo.",
      "2. Projeto Flagship.",
      "3. Formação Squad Board.",
      "4. Inauguração de Impacto.",
    ],
    financials: {
      scenario: "Studio Flagship",
      monthly_potential: "R$ 500k+",
      profit_margin: "R$ 3.5k (Ticket)",
      note: "Foco estratégico em dominação regional.",
    },
    demand: "Exclusiva",
    territory: "Cidades Polo",
    status: "LIMITADO",
  },
];

const ModelDetailModal: React.FC<{
  model: any;
  onClose: () => void;
  onProceed: (model: any) => void;
}> = ({ model, onClose, onProceed }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center p-0 md:p-8 bg-[#050505]/98 backdrop-blur-3xl overflow-y-auto pt-0 md:pt-12 lg:pt-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full bg-[#0A0A0A] border-0 md:border md:border-white/5 rounded-none-0 md:rounded-none overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)] min-h-screen md:min-h-0 mb-0 md:mb-20"
      >
        {/* Enhanced Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 z-50 w-10 h-10 md:w-14 md:h-14 bg-white text-black rounded-none flex items-center justify-center text-black transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          <X size={24} className="md:w-7 md:h-7" />
        </button>

        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0">
          <div className="text-[12rem] font-bold text-white whitespace-nowrap tracking-tighter mix-blend-overlay">
            WINF PARTNERS
          </div>
        </div>

        {loading ? (
          <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-2 border-white/10 rounded-none"></div>
              <div className="absolute inset-0 border-t-2 border-white rounded-none animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-none animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.5em] text-white/40 animate-pulse mb-2">
                Autenticando Acesso
              </p>
              <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                Preparando Dossiê de Performance...
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row min-h-[80vh]"
          >
            {/* Left: Visual & Info */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="md:w-1/2 relative bg-[#0d0d0d] p-6 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5"
            >
              <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
                <img
                  src={model.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
              </div>

              <div className="relative z-10">
                <button
                  onClick={onClose}
                  className="mb-8 md:mb-12 flex items-center gap-3 text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors group"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />{" "}
                  Voltar ao Radar
                </button>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-tight md:leading-none">
                  {model.title}
                </h2>
                <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-md">
                  {model.description}
                </p>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6">
                    <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 w-auto sm:w-20 md:w-24 shrink-0">
                      Investimento
                    </div>
                    <div className="hidden sm:block h-px flex-1 bg-white/5"></div>
                    <div className="text-xl md:text-2xl font-black text-white tracking-tighter">
                      R$ {model.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6">
                    <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 w-auto sm:w-20 md:w-24 shrink-0">
                      Payback Est.
                    </div>
                    <div className="hidden sm:block h-px flex-1 bg-white/5"></div>
                    <div className="text-xl md:text-2xl font-black text-white tracking-tighter">
                      {model.payback}
                    </div>
                  </div>
                  {model.availabilityNote && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-none bg-white/5 border border-white/20"
                    >
                      <div className="flex items-start gap-3 text-white/50">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-none animate-pulse mt-1.5 shrink-0"></div>
                        <span className="text-xs md:text-[10px] font-black uppercase tracking-widest leading-relaxed">
                          {model.availabilityNote}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="relative z-10 mt-12 md:mt-16">
                <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 md:mb-6">
                  Entregáveis Premium
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {model.deliverables.map((item: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 md:gap-3 text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/60 uppercase tracking-widest"
                    >
                      <div className="w-1 h-1 bg-white rounded-none"></div>{" "}
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Financial Scenarios */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="md:w-1/2 p-6 md:p-16 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  Projeção de Performance
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-none animate-pulse"></div>
                  <span className="text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-green-500 uppercase tracking-widest">
                    Live Data Simulation
                  </span>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 flex-1">
                {model.scenarios.map((scenario: any, i: number) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h5 className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                        Cenário {scenario.name}
                      </h5>
                      <div className="text-lg md:text-xl font-black text-white tracking-tighter">
                        R$ {scenario.revenue.toLocaleString()}{" "}
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] text-white/20 font-bold uppercase tracking-widest ml-1">
                          /mês
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 md:h-2 bg-white/5 rounded-none overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(scenario.revenue / 100000) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.2 }}
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      />
                    </div>
                    <div className="mt-2 md:mt-3 flex justify-between text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/20 uppercase tracking-widest">
                      <span>Lucro Líquido Est.</span>
                      <span className="text-white/40">
                        R$ {(scenario.revenue * 0.4).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/5">
                <button
                  onClick={() => onProceed(model)}
                  className="w-full py-5 md:py-6 bg-white text-black font-black text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.5em] rounded-none hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-4 md:mb-6"
                >
                  Solicitar Credenciamento
                </button>
                <p className="text-center text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">
                  Sujeito a análise de perfil e disponibilidade territorial.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const LandingPage: React.FC<LandingPageContainerProps> = ({
  onEnter,
  onNavigateToMarketingPage,
  defaultMenuOpen,
}) => {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(defaultMenuOpen || false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
    (WINF_CONSTANTS as any).assets.aerocoreStudio,
    (WINF_CONSTANTS as any).assets.architects,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenModel = (modelId: string) => {
    const model = MODELS_DATA.find((m) => m.id === modelId);
    if (model) setSelectedModel(model);
  };

  const handleProceed = () => {
    // Dependendo do modelo, redirecionamos para as páginas de nível correspondentes
    if (selectedModel?.id === "nivel1") {
      onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_NIVEL1);
    } else if (selectedModel?.id === "nivel2") {
      onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_NIVEL2);
    } else if (selectedModel?.id === "nivel3") {
      onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_NIVEL3);
    } else {
      onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_NIVEL1);
    }
    setSelectedModel(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-x-hidden relative transition-colors duration-300">
      {/* Global Overlays - Refined Aesthetic */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      ></div>

      {/* System Status Bar - Simplified */}
      <div className="fixed top-0 w-full z-[90] h-0.5 bg-white/5 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedModel && (
          <ModelDetailModal
            model={selectedModel}
            onClose={() => setSelectedModel(null)}
            onProceed={handleProceed}
          />
        )}
      </AnimatePresence>

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Navigation - System Command bar */}
      <nav className="fixed top-6 left-0 right-0 z-[80] transition-all duration-500 flex justify-center px-4">
        <div
          className={`relative w-full max-w-[1400px] border border-white/5 rounded-none overflow-hidden transition-all duration-700 ${isMenuOpen ? "bg-[#050505] h-[85vh]" : "bg-black/40 backdrop-blur-2xl h-16 md:h-20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

          <div className="relative h-16 md:h-20 px-4 md:px-10 w-full flex justify-between items-center z-10">
            <div
              className="flex items-center gap-2 md:gap-4 group cursor-pointer shrink-0"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-sm md:text-base uppercase text-white">
                  WINF™ PARTNERS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button
                onClick={() =>
                  onNavigateToMarketingPage(ViewState.PUBLIC_CONSULTANCY)
                }
                className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-none border border-white/10 text-xs md:text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white hover:border-white/20 transition-all font-mono"
              >
                <Smartphone size={14} /> Visão do Cliente
              </button>

              <div className="h-6 w-px bg-white/5 hidden sm:block"></div>

              <button
                onClick={onEnter}
                className="hidden sm:flex bg-white text-black px-4 md:px-8 py-2 md:py-2.5 rounded-none text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 items-center gap-1.5 md:gap-2 whitespace-nowrap font-mono"
              >
                <Lock size={12} /> Board Access
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 md:w-10 md:h-10 flex flex-col items-center justify-center gap-1 md:gap-1.5 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <motion.div
                  animate={
                    isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  className="w-4 md:w-5 h-0.5 bg-white origin-center transition-all"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-4 md:w-5 h-0.5 bg-white transition-all"
                />
                <motion.div
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  className="w-4 md:w-5 h-0.5 bg-white origin-center transition-all"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Content - Advanced Layout */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pt-20 flex flex-col p-5 md:p-8 bg-black"
              >
                <div className="flex-1 grid grid-cols-1 gap-3 overflow-y-auto no-scrollbar pr-1">
                  {[
                    {
                      name: "A Marca",
                      view: ViewState.INSTITUTIONAL_SITE,
                      desc: "Engenharia de Alta Performance",
                    },
                    {
                      name: "Blackshop",
                      view: ViewState.WINF_BRAND_LANDING,
                      desc: "Storefront Luxury B2B",
                    },
                    {
                      name: "SynthWave.FM",
                      view: ViewState.LANDING_SYNTHWAVE,
                      desc: "Rádio Autônoma & Podcasts IA",
                    },
                    {
                      name: "Sobre Nós",
                      view: ViewState.ABOUT_US,
                      desc: "Squad Winf",
                    },
                    {
                      name: "Catálogo",
                      view: ViewState.PRODUCTS_CATALOG,
                      desc: "Lineup Select™",
                    },
                    {
                      name: "Asset Light",
                      view: ViewState.LANDING_ASSET_LIGHT,
                      desc: "Nível 1 Select",
                    },
                    {
                      name: "AEROCORE",
                      view: ViewState.LANDING_AEROCORE,
                      desc: "High Tech",
                    },
                    {
                      name: "NEOSKIN",
                      view: ViewState.LANDING_NEOSKIN,
                      desc: "Brutal PPF",
                    },
                    {
                      name: "Universo Dark",
                      view: ViewState.LANDING_UNIVERSO_DARK,
                      desc: "Capital & Advisory",
                    },
                    {
                      name: "Galeria",
                      view: ViewState.LANDING_GALLERY,
                      desc: "Dominância Social",
                    },
                  ].map(
                    (
                      item: {
                        name: string;
                        view?: any;
                        desc: string;
                        href?: string;
                      },
                      idx,
                    ) => (
                      <motion.button
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          if (item.view) onNavigateToMarketingPage(item.view, { menuOpen: true });
                          if (item.href) window.location.href = item.href;
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center justify-between p-4 md:p-6 rounded-none bg-white/[0.03] border border-white/5 hover:bg-white/5 group"
                      >
                        <div className="text-left w-full overflow-hidden">
                          <div className="text-base md:text-lg font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5 truncate">
                            {item.desc}
                          </div>
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-zinc-800 group-hover:text-white transition-all shrink-0 ml-2"
                        />
                      </motion.button>
                    ),
                  )}

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      onNavigateToMarketingPage(ViewState.PUBLIC_CONSULTANCY);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-4 md:p-6 rounded-none bg-white/5 border border-white/20 hover:bg-white/10 transition-colors group"
                  >
                    <Smartphone
                      className="text-white shrink-0 group-hover:text-white/80"
                      size={20}
                    />
                    <div className="text-left overflow-hidden">
                      <div className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">
                        Visão do Cliente
                      </div>
                      <div className="text-[10px] md:text-[8px] md:text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/50 uppercase tracking-widest truncate">
                        Portal de suporte e garantias
                      </div>
                    </div>
                  </motion.button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <button
                    onClick={() => {
                      onEnter();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-6 bg-white text-black rounded-none font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    Portal do Parceiro Winf™
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,#050505_80%)]"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-110 brightness-75"
              style={{
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
              }}
            />
          </AnimatePresence>

          {/* Elite Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505]"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-none blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-none blur-[120px] animate-pulse delay-1000"></div>

          {/* Mission Control Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Terminal Data Stream Effect - Removed for sophistication */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.01] pointer-events-none">
            <div className="absolute top-0 left-10 h-full w-px bg-white/10"></div>
            <div className="absolute top-0 right-10 h-full w-px bg-white/20"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 border border-white/20 bg-transparent text-white/50 text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12"
          >
            <span>NÚCLEO ESTRATÉGICO</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="relative mb-6 md:mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase text-white">
              WINF™ PARTNERS
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-12 md:mb-16 relative"
          >
            <h2 className="text-base md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] text-white/70 uppercase max-w-4xl mx-auto leading-relaxed">
              <span className="font-medium text-white">
                Tecnologia Invisível.
              </span>{" "}
              Domínio Absoluto.
            </h2>
            <p className="text-xs md:text-[10px] md:text-xs font-medium text-white/50 uppercase tracking-[0.4em] mt-6">
              Fim da competição. <span className="text-white">Domine.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto"
          >
            <button
              onClick={() => {
                document
                  .getElementById("licensing-plans")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-white text-black px-6 md:px-10 md:px-12 py-4 md:py-4 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all text-center flex items-center justify-center gap-3"
            >
              Explorar Modelos{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() =>
                onNavigateToMarketingPage(ViewState.INSTITUTIONAL_SITE)
              }
              className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-6 md:px-10 md:px-12 py-4 md:py-4 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Conhecer a Marca
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <button
              onClick={() =>
                onNavigateToMarketingPage(ViewState.LANDING_PARTNERS_CORPORATE)
              }
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-xs md:text-[10px] text-white/50 font-bold uppercase tracking-[0.4em] transition-all group-hover:text-white group-hover:tracking-[0.5em]">
                Acessar Protocolo WINF
              </span>
              <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-500"></div>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] md:text-[8px] font-black uppercase tracking-[0.6em] text-white/20">
            Mission Control
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
        </motion.div>
      </header>

      {/* VSL Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2"
            >
              <div className="w-8 h-[1px] bg-white/20"></div>A Engenharia do
              Posicionamento
              <div className="w-8 h-[1px] bg-white/20"></div>
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white tracking-tight"
            >
              Onde o mercado enxerga preço, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                Nós construímos valor inquestionável.
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg max-w-3xl mx-auto mt-6 leading-relaxed"
            >
              A verdadeira liderança não se conquista disputando orçamentos, mas
              redefinindo o padrão. Enquanto o mercado comum dilui margens para
              sobreviver, entregamos a você a infraestrutura, a tecnologia e a
              exclusividade para se tornar a única escolha lógica no segmento
              premium. Pare de competir. Comece a dominar.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-none overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group"
          >
            {/* Video Placeholder / VSL UI */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920)",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 md:w-32 md:h-32 bg-white text-black rounded-none flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.5)] transition-all"
              >
                <ArrowRight size={40} className="ml-2" />
              </motion.button>
              <div className="text-center">
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white mb-2">
                  Manifesto Winf™
                </p>
                <p className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Análise Estratégica: 4:20 min
                </p>
              </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-white rounded-none animate-pulse"></div>
                <span className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Winf™ Partners Ecosystem Overview
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-1 w-32 bg-white/10 rounded-none overflow-hidden">
                  <div className="h-full w-1/3 bg-white"></div>
                </div>
                <span className="text-xs md:text-[10px] font-mono text-white/40">
                  01:24 / 04:20
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => onNavigateToMarketingPage(ViewState.ACCESS_FORM)}
              className="bg-white text-black px-12 py-5 rounded-none text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:bg-zinc-200"
            >
              Aplicar para Membro Partner <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
      </section>

      <div
        id="licensing-plans"
        className="bg-black border-t border-white/5 pt-12 pb-24"
      >
        <LicensingPlans onNavigate={onNavigateToMarketingPage} />
      </div>

      {/* STRATEGIC PILLARS SECTION */}
      <section
        id="models"
        className="py-24 bg-[#050505] relative border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] mb-4"
            >
              Diferenciação Absoluta
            </motion.h2>
            <h3 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter">
              HIERARQUIA DE{" "}
              <span className="text-white/70 italic font-medium">PODER</span>.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp size={24} />,
                title: "Blindagem de Valor",
                desc: "Desconecte-se da guerra de preços. Nosso ecossistema estabelece um posicionamento onde margens premium são a única realidade aceitável.",
                tag: "Controle Absoluto",
              },
              {
                icon: <Star size={24} />,
                title: "Transferência de Autoridade",
                desc: "A percepção molda o julgamento. Ao absorver a assinatura WINF™, seu negócio adquire instantaneamente o status e a reverência do luxo.",
                tag: "Ancoragem de Prestígio",
              },
              {
                icon: <Zap size={24} />,
                title: "A Força Oculta",
                desc: "Opere com a retaguarda de um império. Uma engenharia avançada e silenciosa trabalhando nos bastidores para orquestrar sua expansão.",
                tag: "Vantagem Assimétrica",
              },
              {
                icon: <Cpu size={24} />,
                title: "Presciência Operacional",
                desc: "A inteligência do WINF OS™ atua como uma extensão da sua visão, decodificando o mercado e o comportamento do cliente antes mesmo que se formem.",
                tag: "Supremacia de Dados",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-none bg-black border border-white/5 hover:border-white/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <div className="text-[10px] md:text-[8px] font-bold text-white/50 uppercase tracking-[0.4em] mb-3">
                  {pillar.tag}
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tighter mb-4 group-hover:text-white/80 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm md:text-[11px] text-white/40 uppercase tracking-widest leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* TRACEABLE WARRANTY SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 border-t border-white/5 pt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-8">
                  <ShieldCheck size={12} /> Exclusividade Absoluta
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                  O FIM DO ACHISMO.
                </h2>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-white/20">
                  GARANTIA RASTREÁVEL.
                </h2>
                <div className="space-y-6 text-sm text-white/60 font-light leading-relaxed max-w-xl">
                  <p>
                    No mercado tradicional, garantias são promessas verbais ou
                    papéis que se perdem. Na WINF™, sua garantia é um ativo
                    digital imutável, atrelado ao número de série da sua
                    película.
                  </p>
                  <p>
                    Acesse o nosso <strong>Portal do Cliente</strong> a qualquer
                    momento, digite o número de série e valide a autenticidade e
                    a cobertura do seu projeto em tempo real. Transparência
                    técnica de ponta a ponta.
                  </p>
                </div>
                <div className="mt-12 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 bg-black shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">
                        Validação em Tempo Real
                      </h4>
                      <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                        Consulte o status da sua blindagem online de forma
                        autônoma em nossa plataforma.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 bg-black shrink-0">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">
                        Certificado de Autenticidade
                      </h4>
                      <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                        Cada metro quadrado WINF™ possui um DNA digital
                        verificado na blockchain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Representation of the Certificate */}
              <div className="bg-[#050505] border border-white/10 p-5 md:p-8 md:p-12 relative group flex flex-col justify-center min-h-[500px]">
                <div className="absolute top-0 right-0 p-6 md:p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <ShieldCheck size={200} />
                </div>
                <div className="relative z-10 border border-white/10 bg-[#0A0A0A] p-5 md:p-8 md:p-12 shadow-2xl">
                  <div className="flex justify-between items-start mb-16">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 border border-white/20 flex items-center justify-center shrink-0">
                        <ShieldCheck size={18} className="text-white/40" />
                      </div>
                      <div>
                        <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-1">
                          Status do Projeto
                        </div>
                        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] xl:text-xs md:text-[10px] uppercase tracking-[0.3em] font-black text-[#00E5A3] flex items-center gap-2">
                          AUTENTICADO{" "}
                          <div className="w-1.5 h-1.5 bg-[#00E5A3] rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-1">
                        Garantia Nº
                      </div>
                      <div className="text-xs xl:text-sm uppercase tracking-[0.2em] font-mono text-white/80">
                        WINF-1744-XA
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl xl:text-4xl text-white font-bold tracking-tighter italic leading-none mb-4">
                    CERTIFICADO
                    <br />
                    OFICIAL
                  </h3>
                  <p className="text-[10px] md:text-[8px] xl:text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/60 font-black uppercase tracking-[0.5em] mb-16">
                    Engineering & Architecture
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
                    <div>
                      <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-2">
                        Tecnologia Ativa
                      </div>
                      <div className="text-xs xl:text-sm font-bold tracking-[0.1em] text-white">
                        SELECT PRO
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-2">
                        Vencimento
                      </div>
                      <div className="text-xs xl:text-sm font-bold tracking-[0.1em] text-white">
                        DEZ 2036
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-2">
                        Aplicação
                      </div>
                      <div className="text-xs xl:text-sm font-bold tracking-[0.1em] text-white">
                        FACHADA CORPORATE
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] xl:text-[10px] md:text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mb-2">
                        Concessão
                      </div>
                      <div className="text-xs xl:text-sm font-bold tracking-[0.1em] text-white">
                        WINF™ OFICIAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ARCHITECTS SPECIAL SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-6 md:p-12 md:p-20 rounded-none border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 p-6 md:p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Building2 size={300} />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-none border border-white/20 bg-transparent text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] text-white/50 mb-8">
                  Portal do Especificador // Architects
                </div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 italic leading-[0.9]">
                  É ARQUITETO? <br />
                  <span className="text-white">CADASTRE-SE GRÁTIS.</span>
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed max-w-xl mb-12 uppercase tracking-widest">
                  Tenha acesso exclusivo ao nosso ecossistema de engenharia
                  molecular. Utilize nossas ferramentas de simulação AI, cálculo
                  de ROI energético e especificações técnicas para elevar o
                  padrão dos seus projetos.
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <button
                    onClick={() =>
                      onNavigateToMarketingPage(
                        ViewState.ARCHITECT_REGISTRATION,
                      )
                    }
                    className="bg-white text-black px-12 py-5 rounded-none text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3 group"
                  >
                    Registrar Gratuitamente{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <div className="flex items-center gap-4 px-6 py-3 rounded-none border border-white/10 bg-black">
                    <CheckCircle size={16} className="text-white/50" />
                    <span className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                      Acesso sob Análise
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Wand2 size={24} />,
                    title: "Simulação AI",
                    desc: "Fachadas em tempo real.",
                  },
                  {
                    icon: <FileSpreadsheet size={24} />,
                    title: "Dossiê ROI",
                    desc: "Dados de eficiência.",
                  },
                  {
                    icon: <Layers size={24} />,
                    title: "Arquivos BIM",
                    desc: "Especificação pronta.",
                  },
                  {
                    icon: <Shield size={24} />,
                    title: "Suporte Pro",
                    desc: "Engenharia dedicada.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-none border border-white/5 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all"
                  >
                    <div className="text-white/50 mb-4">{item.icon}</div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-[10px] text-white/30 leading-relaxed uppercase font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT RADAR SECTION (ELITE REFINEMENT) */}
      <section
        id="budget"
        className="py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.6em] mb-6"
            >
              DADOS NÃO MENTEM // Q2-2026
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-[5rem] font-bold text-white uppercase tracking-tighter leading-[0.8] mb-12"
            >
              O PREÇO DA{" "}
              <span className="text-white/80 italic font-medium">
                AUTORIDADE.
              </span>
            </motion.h3>
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-3 px-6 py-2 rounded-none border border-white/20 bg-transparent">
                <Activity size={16} className="text-white/50" />
                <span className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.5em]">
                  VALORIZAÇÃO IMPLÍCITA // ATIVA
                </span>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-sm md:text-xl max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-widest"
            >
              "Assuma o controle do seu valor de mercado." Compare as modelagens
              operacionais e alcance a soberania no seu segmento. Ignoramos
              conjecturas; operamos com engenharia de lucro exata e previsível.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Nível Tiers Comparison */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black border border-white/5 rounded-none p-6 md:p-10 md:p-16 relative overflow-hidden group w-full"
            >
              <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={80} className="text-white" />
              </div>

              <h4 className="text-2xl font-bold text-white mb-12 flex items-center gap-4 uppercase tracking-tighter">
                <div className="w-1.5 h-1.5 bg-white rounded-none"></div>A
                ENGENHARIA DO LUCRO: EFEITO MULTIPLICADOR
              </h4>

              <div className="space-y-16">
                <div className="relative pl-10 border-l border-white/10">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-white rounded-none"></div>
                  <h5 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-4">
                    A MATEMÁTICA DA RIQUEZA
                  </h5>
                  <p className="text-sm md:text-[11px] text-white/40 mb-6 uppercase tracking-widest font-light leading-relaxed">
                    Exemplo prático na linha Select™: o investimento do partner
                    por bobina na fábrica é irrelevante frente ao valor
                    percebido no mercado. Você não vende película, você
                    implementa blindagem térmica e proteção patrimonial premium.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.03] p-6 rounded-none border border-white/5 group-hover:border-white/20 transition-all">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/20 uppercase font-bold tracking-widest mb-2">
                        Lucro Limpo / Rolo
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                        R$ 5.3k{" "}
                        <span className="text-sm font-medium tracking-normal text-white/50">
                          a
                        </span>{" "}
                        9.6k
                      </p>
                    </div>
                    <div className="bg-white/[0.03] p-6 rounded-none border border-white/5 group-hover:border-white/20 transition-all">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 uppercase font-bold tracking-widest mb-2">
                        Multiplicador (ROI)
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                        Até 530%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative pl-10 border-l border-white/10">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-white/40 rounded-none"></div>
                  <h5 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-4">
                    PROJEÇÃO DE FLUXO DE CAIXA
                  </h5>
                  <p className="text-sm md:text-[11px] text-white/40 mb-6 uppercase tracking-widest font-light leading-relaxed">
                    Um técnico operando em regime de alta eficiência pode
                    processar volumes expressivos mensais. Aliado à nossa engine
                    de captação de clientes corporativos e residenciais premium,
                    os limites tradicionais de faturamento do mercado de
                    insulfilm são sumariamente rompidos.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.03] p-6 rounded-none border border-white/5 group-hover:border-white/20 transition-all">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/20 uppercase font-bold tracking-widest mb-2">
                        Caixa Mensal (Nível 1)
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                        R$ 30k
                      </p>
                    </div>
                    <div className="bg-white/[0.03] p-6 rounded-none border border-white/5 group-hover:border-white/20 transition-all">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 uppercase font-bold tracking-widest mb-2">
                        Caixa Mensal (Nível 2)
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">
                        R$ 60k{" "}
                        <span className="text-sm font-medium tracking-normal text-white/50">
                          +
                        </span>
                      </p>
                    </div>
                  </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION (IMMERSIVE ALBUM - ELITE REFINEMENT) */}
      <section
        id="social"
        className="py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-[0.7em] mb-8 flex items-center gap-3"
              >
                <GalleryVerticalEnd size={14} className="text-white/30" />{" "}
                PORTFÓLIO VISUAL // ELITE_ASSETS
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-8xl font-bold text-white leading-[0.8] uppercase tracking-tighter"
              >
                A ESTÉTICA DO{" "}
                <span className="text-white/80 italic font-medium">PODER.</span>
              </motion.h3>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-sm md:text-lg max-w-sm leading-relaxed text-right font-light uppercase tracking-widest"
            >
              "Aja como um Rei para ser tratado como um." Explore a
              materialização absoluta do prestígio Winf™ em ativos de
              ultra-luxo.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[1000px] md:h-[700px]">
            {/* 1. Supercars (Large Vertical) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative rounded-none overflow-hidden md:col-span-1 md:row-span-2 border border-white/5 bg-black"
            >
              <img
                src={(WINF_CONSTANTS as any).assets.aerocoreForest}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity select-none z-10">
                <div className="text-6xl font-black text-white whitespace-nowrap rotate-[-15deg]">
                  CONFIDENTIAL
                </div>
              </div>

              <div className="absolute inset-0 p-6 md:p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-[0.5em] mb-4">
                  01 // ASSET_CORE
                </p>
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Supercars
                </h4>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity scanline-overlay"></div>
            </motion.div>

            {/* 2. Arquitetura (Square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative rounded-none overflow-hidden border border-white/5 bg-black"
            >
              <img
                src={(WINF_CONSTANTS as any).assets.aerocoreStudio}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-xs md:text-[10px] text-white/70 font-black uppercase tracking-[0.3em]">
                  Arquitetura
                </p>
              </div>
            </motion.div>

            {/* 3. Lifestyle (Square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-none overflow-hidden border border-white/5 bg-black"
            >
              <img
                src={(WINF_CONSTANTS as any).assets.kiosk}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-xs md:text-[10px] text-white/70 font-black uppercase tracking-[0.3em]">
                  Lifestyle
                </p>
              </div>
            </motion.div>

            {/* 4. Detailing (Wide) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative rounded-none overflow-hidden md:col-span-2 border border-white/5 bg-black"
            >
              <img
                src={(WINF_CONSTANTS as any).assets.aerocoreMulti}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>

              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity select-none z-10">
                <div className="text-8xl font-black text-white whitespace-nowrap rotate-[-15deg]">
                  CONFIDENTIAL
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-12">
                <p className="text-xs md:text-[10px] text-white/40 font-black uppercase tracking-[0.5em] mb-4">
                  04 // PROCESS_FLOW
                </p>
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
                  Detailing
                </h4>
                <p className="text-sm md:text-[11px] text-white/40 uppercase tracking-widest max-w-md hidden md:block font-medium leading-relaxed">
                  Processos de correção de pintura e aplicação de NeoSkin™ PPF
                  com precisão cirúrgica em laboratórios certificados.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-24 text-center">
            <a
              href="https://www.instagram.com/winfpartners"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-xs md:text-[10px] font-black text-white uppercase tracking-[0.4em] border border-white/10 px-6 md:px-10 py-5 rounded-none hover:bg-white hover:text-black transition-all group"
            >
              <Share2 size={18} /> Acessar Galeria Oficial{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Dark Factory / Industry Section */}
      <section className="py-40 bg-[#020202] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center grayscale mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-none border border-white/5 bg-black backdrop-blur-xl">
              <div className="w-1.5 h-1.5 bg-white rounded-none animate-pulse"></div>
              <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em]">
                ORIGEM TECNOLÓGICA // MANUFATURA_AVANÇADA
              </span>
            </div>

            <h2 className="text-4xl md:text-[6rem] font-bold text-white uppercase tracking-tighter leading-[0.8] mb-12">
              A Origem Real. <br />
              <span className="text-white/80 italic font-medium">
                O Topo da Cadeia.
              </span>
            </h2>

            <div className="space-y-12">
              <p className="text-xl md:text-3xl font-light text-white/80 leading-tight tracking-tight max-w-5xl mx-auto italic border-l-8 border-white/20 pl-8 md:pl-12 text-left">
                "Esqueça argumentos de venda genéricos. A liderança global em
                proteção térmica é desenhada por engenharia molecular em parques
                nanotecnológicos de altíssimo investimento (ex: KDX). Dominar a
                ponta é ter acesso direto à origem."
              </p>

              <p className="text-sm md:text-lg font-medium text-white/50 leading-relaxed max-w-4xl mx-auto uppercase tracking-[0.2em] md:tracking-[0.4em]">
                A realidade corporativa: 80% das marcas dependem de terceiros. A
                WINF™ exige e opera no núcleo tecnológico dos maiores
                desenvolvedores do mundo. Nossos 4 pilares inegociáveis:
              </p>

              {/* Molecular Specs & Certifications Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-white/5 mt-20 border border-white/5 p-px">
                {/* 1 */}
                <div className="p-8 bg-[#020202] text-left group hover:bg-[#050505] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-all rounded-full -mt-16 -mr-16"></div>
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black">
                      <Hexagon size={18} className="text-white/80" />
                    </div>
                    <h4 className="text-sm md:text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-2">
                      Tecnologia
                      <br />
                      <span className="text-white/40 font-normal">
                        Core do Jogo
                      </span>
                    </h4>
                  </div>
                  <ul className="space-y-4 mt-8 relative z-10">
                    {[
                      {
                        label: "MAGNETRON SPUTTERING",
                        value: "Multi-metálica",
                      },
                      { label: "NANO_CERÂMICA", value: "Dispersa" },
                      { label: "FILMES_ÓPTICOS", value: "200+ Layers" },
                    ].map((spec, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-1 border-l-2 border-white/10 pl-3"
                      >
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 font-bold uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-xs md:text-[10px] text-white font-mono">
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2 */}
                <div className="p-8 bg-[#020202] text-left group hover:bg-[#050505] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-all rounded-full -mt-16 -mr-16"></div>
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black">
                      <Microscope size={18} className="text-white/80" />
                    </div>
                    <h4 className="text-sm md:text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-2">
                      Controle
                      <br />
                      <span className="text-white/40 font-normal">
                        de Ambiente
                      </span>
                    </h4>
                  </div>
                  <ul className="space-y-4 mt-8 relative z-10">
                    {[
                      { label: "CLEAN_ROOM", value: "Nível Óptico Alto" },
                      { label: "MEDIDA_EXATA", value: "Controle Molecular" },
                      { label: "ATMOSFERA", value: "Nível Aeroespacial" },
                    ].map((spec, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-1 border-l-2 border-white/10 pl-3"
                      >
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 font-bold uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-xs md:text-[10px] text-white font-mono">
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 */}
                <div className="p-8 bg-[#020202] text-left group hover:bg-[#050505] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-all rounded-full -mt-16 -mr-16"></div>
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black">
                      <Factory size={18} className="text-white/80" />
                    </div>
                    <h4 className="text-sm md:text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-2">
                      Cadeia
                      <br />
                      <span className="text-white/40 font-normal">
                        Verticalizada
                      </span>
                    </h4>
                  </div>
                  <ul className="space-y-4 mt-8 relative z-10">
                    {[
                      { label: "PROCESSO", value: "PET > Coating" },
                      { label: "ESTRUTURA", value: "Metal > Adesivo" },
                      { label: "PRODUÇÃO ELITE", value: "200 Milhões m²/ano" },
                    ].map((spec, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-1 border-l-2 border-white/10 pl-3"
                      >
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 font-bold uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-xs md:text-[10px] text-white font-mono">
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4 */}
                <div className="p-8 bg-[#020202] text-left group hover:bg-[#050505] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-all rounded-full -mt-16 -mr-16"></div>
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black">
                      <Fingerprint size={18} className="text-white/80" />
                    </div>
                    <h4 className="text-sm md:text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-2">
                      Patentes
                      <br />
                      <span className="text-white/40 font-normal">Reais</span>
                    </h4>
                  </div>
                  <ul className="space-y-4 mt-8 relative z-10">
                    {[
                      { label: "CONTROLE_ESPECTRAL", value: "IR/UV" },
                      { label: "REJEIÇÃO_DE_CALOR", value: "Seletiva" },
                      { label: "NANOMATERIAIS", value: "Transp. + Proteção" },
                    ].map((spec, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-1 border-l-2 border-white/10 pl-3"
                      >
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 font-bold uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-xs md:text-[10px] text-white font-mono">
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-12 flex justify-center gap-12 opacity-60">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/80">
                  <Hexagon size={24} />
                </div>
                <span className="text-[10px] md:text-[8px] font-bold uppercase tracking-widest text-white/50">
                  GLOBALLY SOURCED
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/80">
                  <Layers size={24} />
                </div>
                <span className="text-[10px] md:text-[8px] font-bold uppercase tracking-widest text-white/50">
                  NANO_LAYER
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/80">
                  <Fingerprint size={24} />
                </div>
                <span className="text-[10px] md:text-[8px] font-bold uppercase tracking-widest text-white/50">
                  MIL_SPEC SECURE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer (ELITE REFINEMENT) */}
      <footer className="py-32 border-t border-white/5 bg-[#010203] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold text-white tracking-widest text-2xl uppercase">
                  WINF™ PARTNERS
                </span>
                <div className="w-1.5 h-1.5 bg-white rounded-none"></div>
              </div>
              <p className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
                GLOBAL_EXPANSION_CORE // EST. 2026
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[12px] font-bold uppercase tracking-[0.6em] text-white/60">
              <button
                onClick={() =>
                  onNavigateToMarketingPage(ViewState.LANDING_ASSET_LIGHT)
                }
                className="hover:text-white transition-all hover:tracking-[0.8em]"
              >
                Asset Light
              </button>
              <button
                onClick={() =>
                  onNavigateToMarketingPage(ViewState.LANDING_AEROCORE)
                }
                className="hover:text-white transition-all hover:tracking-[0.8em]"
              >
                Aerocore
              </button>
              <button
                onClick={() =>
                  onNavigateToMarketingPage(ViewState.LANDING_NEOSKIN)
                }
                className="hover:text-white transition-all hover:tracking-[0.8em]"
              >
                Neoskin
              </button>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <a
                href="https://www.instagram.com/winfpartners/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-8 py-4 rounded-none border border-white/10 bg-transparent hover:bg-white hover:text-black transition-all group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/50 group-hover:text-black transition-colors"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-sm md:text-[11px] font-bold uppercase tracking-[0.5em] text-white/50 group-hover:text-black transition-colors">
                  @WINFPARTNERS
                </span>
              </a>
              <div className="flex items-center gap-6 px-8 py-4 rounded-none border border-white/10 bg-transparent shadow-none">
                <ShieldCheck size={20} className="text-white/50" />
                <span className="text-sm md:text-[11px] font-bold text-white/50 uppercase tracking-[0.5em]">
                  SECURED_NUCLEUS_V6.0
                </span>
              </div>
              <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-medium text-white/20 uppercase tracking-[0.4em]">
                © 2026 WINF INTERNATIONAL GROUP. ALL SYSTEMS ACTIVE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
