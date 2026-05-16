import React, { useState, useEffect } from "react";
import { PRODUCT_CATALOG } from "../data/productCatalogData";
import {
  ChevronLeft,
  ArrowRight,
  Shield,
  Share2,
  Hexagon,
  Maximize,
  Thermometer,
  Sun,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsCatalogProps {
  onBack: () => void;
  onSelectProduct?: (productId: string) => void;
}

const ARCH_MODELS = [
  {
    id: "corp",
    name: "Fachada Corporativa",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
  },
  {
    id: "house",
    name: "Residência Luxo",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "view",
    name: "Vista Panorâmica",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
];

const AUTO_MODELS = [
  {
    id: "sport",
    name: "Porsche 911 GT3",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "suv",
    name: "Range Rover SV",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "sedan",
    name: "BMW M5 Sedan",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670&auto=format&fit=crop",
  },
];

const MARINE_MODELS = [
  {
    id: "yacht",
    name: "Iate de Luxo",
    img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "speedboat",
    name: "Lancha Esportiva",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop",
  }
];

const AERO_MODELS = [
  {
    id: "jet",
    name: "Jato Executivo",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "heli",
    name: "Helicóptero",
    img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2670&auto=format&fit=crop",
  }
];

const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  onBack,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<"auto" | "arch" | "marine" | "aero">("arch");
  const [sunIntensity, setSunIntensity] = useState(85);
  const [selectedSimFilm, setSelectedSimFilm] = useState<string>("");

  const activeModelsList =
    activeCategory === "arch" ? ARCH_MODELS : 
    activeCategory === "marine" ? MARINE_MODELS : 
    activeCategory === "aero" ? AERO_MODELS : 
    AUTO_MODELS;
  const [activeModelId, setActiveModelId] = useState<string>(
    activeModelsList[0].id,
  );

  // --- Tuning Studio State (Auto Only) ---
  const CAR_PRESETS = [
    {
      id: "sports",
      name: "Coupe Esportivo",
      // Good side profile car
      img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1600",
      windowsPath: "polygon(32% 35%, 52% 36%, 63% 45%, 26% 45%)",
    },
    {
      id: "suv",
      name: "Luxo 4x4",
      // SUV side profile
      img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1600",
      windowsPath: "polygon(20% 32%, 72% 32%, 75% 50%, 15% 48%)",
    },
  ];

  const [tuningModel, setTuningModel] = useState(CAR_PRESETS[0].id);
  const [tuningColorHue, setTuningColorHue] = useState(0);
  const [tuningHeight, setTuningHeight] = useState(0);
  const [tuningFilmId, setTuningFilmId] = useState("");
  const [tuningTab, setTuningTab] = useState<
    "car" | "color" | "height" | "film"
  >("car");

  const activeTuningModel =
    CAR_PRESETS.find((m) => m.id === tuningModel) || CAR_PRESETS[0];
  const activeTuningFilm = PRODUCT_CATALOG.find((p) => p.id === tuningFilmId);
  const tuningVltStr = activeTuningFilm?.specs?.vlt || "100%";
  const tuningVltMatch = tuningVltStr.match(/\d+/);
  const tuningVlt = tuningVltMatch ? parseInt(tuningVltMatch[0]) : 100;
  const tuningTintOpacity = tuningFilmId ? (100 - tuningVlt) / 100 : 0;
  // ---------------------------------------

  useEffect(() => {
    setActiveModelId(
      activeCategory === "arch" ? ARCH_MODELS[0].id : 
      activeCategory === "marine" ? MARINE_MODELS[0].id : 
      activeCategory === "aero" ? AERO_MODELS[0].id : 
      AUTO_MODELS[0].id,
    );
    setSelectedSimFilm(""); // reset film
  }, [activeCategory]);

  const handleShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    const productSlug = product.id.toLowerCase().replace(/\s+/g, "-");
    const shareUrl = `${window.location.origin}/produto/${productSlug}`;
    const message = `*Catálogo Winf™ - ${product.name}*\n\nConheça os detalhes técnicos da ${product.subname}.\nAcesse a ficha oficial no nosso site:\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredProducts = PRODUCT_CATALOG.filter(
    (product) => product.category === activeCategory,
  );
  const isAuto = activeCategory === "auto";
  const isDarkTheme = activeCategory !== "arch";

  // Theming based on category
  const theme = {
    bg: "bg-[#050505]",
    text: "text-white",
    textMuted: "text-white/40",
    border: "border-white/10",
    card: "bg-[#0A0A0A]",
    cardHover: "hover:bg-white/5",
    button: "bg-white text-black",
    navBg: "bg-black/60",
    accent: "text-white/20",
  };

  // Find the selected film for the simulator
  const activeSimFilm =
    PRODUCT_CATALOG.find(
      (p) => p.id === selectedSimFilm && p.category === activeCategory,
    ) || filteredProducts[0];
  const activeBgModel =
    activeModelsList.find((m) => m.id === activeModelId) || activeModelsList[0];

  const getSimulatedTemperatures = () => {
    const externalTemp = Math.round(25 + sunIntensity * 0.15);
    const commonTemp = Math.round(20 + sunIntensity * 0.21);

    const irrStr = activeSimFilm?.keyMetrics?.ir || "70%";
    const irrValue = parseFloat(irrStr.replace(/[^\d.]/g, "")) || 70;

    const factor = (100 - irrValue) / 100;
    const winfTemp = Math.round(
      20 + sunIntensity * 0.21 * Math.max(0.05, factor),
    );

    return { externalTemp, commonTemp, winfTemp };
  };

  const temps = getSimulatedTemperatures();

  // VLT logic to tint image
  const vltStr = activeSimFilm?.specs?.vlt || "50%";
  const vltMatch = vltStr.match(/\d+/);
  const vlt = vltMatch ? parseInt(vltMatch[0]) : 50;

  // VLT mapping: a VLT of 5% means 95% opacity of black.
  // We use this to darken the overlay on the car/house image.
  const tintOpacity = (100 - vlt) / 100;

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 selection:bg-zinc-500/30 selection:text-current font-sans flex flex-col`}
    >
      {/* Dynamic Background Effects */}
      {isDarkTheme ? (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-zinc-900/40 rounded-full blur-[150px] opacity-50 mix-blend-screen" />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-zinc-200 rounded-full blur-[150px] opacity-30 mix-blend-multiply" />
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 ${theme.navBg} backdrop-blur-xl border-b ${theme.border} transition-colors duration-700`}
      >
        <button
          onClick={onBack}
          className={`w-10 h-10 flex items-center justify-center rounded-none transition-colors border ${theme.border} ${isDarkTheme ? "hover:bg-white/10" : "hover:bg-black/5"}`}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex bg-black/5 p-1 border border-black/5 rounded-none dark:bg-white/5 dark:border-white/10 absolute left-1/2 -translate-x-1/2 overflow-x-auto max-w-[60%] md:max-w-none hide-scrollbar">
          <button
            onClick={() => setActiveCategory("arch")}
            className={`px-3 md:px-6 py-2 text-[10px] md:text-[8px] md:text-xs md:text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-none whitespace-nowrap
              ${activeCategory === 'arch' ? "bg-white text-black shadow-lg border border-black/10" : "text-current opacity-40 hover:opacity-100"}
            `}
          >
            Arch
          </button>
          <button
            onClick={() => setActiveCategory("auto")}
            className={`px-3 md:px-6 py-2 text-[10px] md:text-[8px] md:text-xs md:text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-none whitespace-nowrap
              ${activeCategory === 'auto' ? "bg-[#050505] text-white shadow-lg" : "text-current opacity-40 hover:opacity-100"}
            `}
          >
            Auto
          </button>
          <button
            onClick={() => setActiveCategory("marine")}
            className={`px-3 md:px-6 py-2 text-[10px] md:text-[8px] md:text-xs md:text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-none whitespace-nowrap
              ${activeCategory === 'marine' ? "bg-[#0a1526] text-white shadow-lg border border-white/10" : "text-current opacity-40 hover:opacity-100"}
            `}
          >
            Marine
          </button>
          <button
            onClick={() => setActiveCategory("aero")}
            className={`px-3 md:px-6 py-2 text-[10px] md:text-[8px] md:text-xs md:text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-none whitespace-nowrap
              ${activeCategory === 'aero' ? "bg-[#111] text-white shadow-lg border border-white/10" : "text-current opacity-40 hover:opacity-100"}
            `}
          >
            Aero
          </button>
        </div>

        <div
          className={`hidden md:block text-xs font-bold tracking-widest uppercase border-l-2 ${theme.border} pl-4`}
        >
          CATÁLOGO <span className="opacity-50">WINF™</span>
        </div>
      </nav>

      {/* Manifesto Header */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-12"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-bold tracking-[0.4em] mb-6 flex items-center gap-4 ${isDarkTheme ? "text-zinc-500" : "text-white/40"}`}
            >
              <div className={`h-px w-8 ${theme.border}`} />
              {activeCategory === "auto"
                ? "Divisão de Performance Automotiva"
                : activeCategory === "marine"
                ? "Divisão de Proteção Náutica"
                : activeCategory === "aero"
                ? "Divisão de Engenharia Aeroespacial"
                : "Divisão de Conforto Arquitetônico"}
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-extralight tracking-tight leading-[1.1] mb-8">
              {activeCategory === "auto" ? (
                <>
                  AeroCore™.
                  <br />
                  <span className="font-medium">
                    Invisível, mas indispensável.
                  </span>
                </>
              ) : activeCategory === "marine" ? (
                <>
                  Abyssal™.
                  <br />
                  <span className="font-medium">
                    Domine os oceanos sem reflexos.
                  </span>
                </>
              ) : activeCategory === "aero" ? (
                <>
                  Horizon™.
                  <br />
                  <span className="font-medium">
                    Conforto na estratosfera.
                  </span>
                </>
              ) : (
                <>
                  O mesmo vidro.
                  <br />
                  <span className="font-medium">Uma nova percepção.</span>
                </>
              )}
            </h1>

            <div
              className={`text-base md:text-xl font-light leading-relaxed max-w-2xl ${theme.textMuted}`}
            >
              {activeCategory === "auto" ? (
                <p>
                  <b className={theme.text}>
                    Engenharia de Ponta. Execução de Mestre.
                  </b>{" "}
                  A paixão por performance exige o mais alto nível de proteção
                  para verdadeiras obras de arte da engenharia motorizada.
                </p>
              ) : activeCategory === "marine" ? (
                <p>
                  <b className={theme.text}>
                    Resistência contra Maresia e Glare Extremo.
                  </b>{" "}
                  Camada extra de proteção e privacidade para iates e lanchas, com absorção massiva de choque térmico marítimo.
                </p>
              ) : activeCategory === "aero" ? (
                <p>
                  <b className={theme.text}>
                    Bloqueio UV em Altas Altitudes.
                  </b>{" "}
                  O conforto visual e a regulagem térmica exata que jatos executivos exigem em dezenas de milhares de pés.
                </p>
              ) : (
                <p>
                  <b className={theme.text}>
                    A Tecnologia Não Precisa Ser Vista. Precisa Ser Sentida.
                  </b>{" "}
                  Transforme ambientes em santuários de conforto, privacidade e
                  eficiência, filtrando o que há de ruim no sol e deixando
                  entrar apenas a luz.
                </p>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`hidden lg:flex w-32 h-32 rounded-full border border-dashed ${theme.border} items-center justify-center relative shrink-0`}
          >
            <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
              {isDarkTheme ? (
                <Hexagon size={64} strokeWidth={1} />
              ) : (
                <Maximize size={64} strokeWidth={1} />
              )}
            </div>
            <div
              className={`text-[10px] md:text-[8px] font-black tracking-widest text-center uppercase ${isDarkTheme ? "text-white" : "text-black"}`}
            >
              Master
              <br />
              Specs
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Catalog Grid */}
      <section className="relative z-10 pb-32 px-6 md:px-12 w-full max-w-7xl mx-auto flex-1">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group cursor-pointer border ${theme.border} ${theme.card} ${theme.cardHover} transition-all duration-500 overflow-hidden flex flex-col relative`}
                onClick={() => onSelectProduct && onSelectProduct(product.id)}
              >
                {/* Image Area */}
                <div className="relative h-[300px] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center origin-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  {/* Subtle gradient overlay matched to theme */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${isDarkTheme ? "from-[#0A0A0A] via-[#0A0A0A]/40" : "from-white via-white/20"} to-transparent`}
                  />

                  {/* Header Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 text-[10px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-white border border-white/20">
                      {product.line}
                    </div>
                    <button
                      onClick={(e) => handleShare(e, product)}
                      className="w-8 h-8 bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all text-white"
                      title="Compartilhar"
                    >
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1 relative">
                  <div
                    className={`text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${isDarkTheme ? "text-zinc-500" : "text-white/40"}`}
                  >
                    {product.badge}
                  </div>

                  <h3 className={`text-2xl font-light mb-1 ${theme.text}`}>
                    {product.name}
                  </h3>
                  <h4 className={`text-xs italic mb-6 ${theme.textMuted}`}>
                    {product.subname}
                  </h4>

                  <p
                    className={`text-sm font-light leading-relaxed mb-10 flex-1 line-clamp-3 ${theme.textMuted}`}
                  >
                    {product.shortDescription}
                  </p>

                  {/* Footer Metrics */}
                  <div
                    className={`flex items-center justify-between mt-auto pt-6 border-t ${theme.border}`}
                  >
                    <div
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${theme.textMuted}`}
                    >
                      <Shield size={14} className={theme.accent} />
                      {product.keyMetrics.warranty}
                    </div>

                    <div
                      className={`text-xs md:text-[10px] uppercase font-bold tracking-[0.2em] flex items-center gap-2 transition-colors ${theme.text} group-hover:opacity-100 opacity-60`}
                    >
                      Explorar Specs{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Hover Line Effect */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-500 group-hover:w-full ${isDarkTheme ? "text-white" : "text-black"}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* Tuning Studio / 3D Tuning Simulator (Auto Only) */}
      {isAuto && (
        <section
          className={`relative z-10 py-24 px-6 md:px-12 w-full max-w-7xl mx-auto border-t ${theme.border}`}
        >
          <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">
                Winf™ 3D Studio.
              </h2>
              <p className="text-sm text-white/50 max-w-2xl">
                Simulador externo avançado. Personalize a altura, cor da
                carroçaria e aplique nossas películas virtuais para visualizar o
                grau de escurecimento.
              </p>
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 flex flex-col overflow-hidden">
            {/* Stage */}
            <div className="h-[300px] md:h-[500px] relative bg-[#111] overflow-hidden flex items-center justify-center">
              {/* Background gradient simulating a studio cycle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a1a1a] to-[#222]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-white opacity-5 blur-[150px] pointer-events-none" />

              {/* Grid floor */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
                style={{
                  transform: "perspective(500px) rotateX(60deg) scale(2)",
                }}
              />

              {/* The Car */}
              <div
                className="relative w-full max-w-[900px] transition-all duration-700 ease-out"
                style={{ transform: `translateY(${tuningHeight}px)` }}
              >
                {/* Main Car Image */}
                <img
                  src={activeTuningModel.img}
                  className="w-full h-auto object-cover"
                  style={{
                    filter: `hue-rotate(${tuningColorHue}deg) contrast(1.1) brightness(0.9) drop-shadow(0 40px 30px rgba(0,0,0,0.8))`,
                  }}
                  alt="Car Model"
                />

                {/* Tint Overlay (using generic approximate clip-path to simulate window glass) */}
                <div
                  className="absolute bg-black pointer-events-none transition-opacity duration-700 ease-in-out mix-blend-multiply"
                  style={{
                    inset: 0,
                    opacity: tuningTintOpacity * 0.9, // max out a bit under 1 so it doesn't look like MS Paint
                    clipPath: activeTuningModel.windowsPath,
                  }}
                />

                {/* Additional overlay for reflection to keep it looking like glass */}
                <div
                  className="absolute bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none transition-all duration-700"
                  style={{
                    inset: 0,
                    opacity: tuningFilmId ? 1 : 0.2,
                    clipPath: activeTuningModel.windowsPath,
                  }}
                />
              </div>

              {/* Floating badges */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-white border border-white/20">
                  VLT {tuningVlt}%
                </span>
                {tuningFilmId && (
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 text-[10px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-white border border-white/20">
                    {activeTuningFilm?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Controls panel */}
            <div className="bg-[#050505] p-6 lg:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              {/* Tab Navigation */}
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-48 overflow-x-auto shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                <button
                  onClick={() => setTuningTab("car")}
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest text-left px-4 py-3 whitespace-nowrap transition-colors ${tuningTab === "car" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                  Veículo
                </button>
                <button
                  onClick={() => setTuningTab("film")}
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest text-left px-4 py-3 whitespace-nowrap transition-colors ${tuningTab === "film" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                  Película
                </button>
                <button
                  onClick={() => setTuningTab("color")}
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest text-left px-4 py-3 whitespace-nowrap transition-colors ${tuningTab === "color" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                  Pintura Exterior
                </button>
                <button
                  onClick={() => setTuningTab("height")}
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest text-left px-4 py-3 whitespace-nowrap transition-colors ${tuningTab === "height" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                  Suspensão
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 min-h-[120px] w-full">
                {tuningTab === "car" && (
                  <div className="space-y-4">
                    <label className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                      Selecionar Carroçaria
                    </label>
                    <div className="flex gap-4">
                      {CAR_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setTuningModel(preset.id)}
                          className={`px-6 py-3 text-sm font-light border transition-all ${tuningModel === preset.id ? "border-white bg-white/10 text-white" : "border-white/20 text-white/50 hover:border-white/50"}`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tuningTab === "film" && (
                  <div className="space-y-4">
                    <label className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                      Aplicar Película (VLT)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <button
                        onClick={() => setTuningFilmId("")}
                        className={`p-4 text-left border flex flex-col gap-1 transition-all ${tuningFilmId === "" ? "border-white bg-white/10 text-white" : "border-white/20 text-white/50 hover:border-white/50"}`}
                      >
                        <span className="text-sm font-light leading-tight">
                          Original
                        </span>
                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest opacity-60">
                          Sem Película
                        </span>
                      </button>

                      {filteredProducts.map((p) => {
                        const vlt = p.specs?.vlt?.match(/\d+/)?.[0] || "X";
                        return (
                          <button
                            key={p.id}
                            onClick={() => setTuningFilmId(p.id)}
                            className={`p-4 text-left border flex flex-col gap-1 transition-all ${tuningFilmId === p.id ? "border-white bg-white/10 text-white" : "border-white/20 text-white/50 hover:border-white/50"}`}
                          >
                            <span className="text-xs font-light leading-tight truncate">
                              {p.name}
                            </span>
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest opacity-60">
                              VLT {vlt}%
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {tuningTab === "color" && (
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between">
                      <label className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                        Modificador Mágico de Cor (Matiz)
                      </label>
                      <span className="text-xs bg-white/10 px-2 py-1">
                        {tuningColorHue}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={tuningColorHue}
                      onChange={(e) =>
                        setTuningColorHue(parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-none appearance-none cursor-pointer accent-white"
                    />
                    <p className="text-xs md:text-[10px] text-white/40">
                      Utiliza alteração de matiz sobre imagens base para
                      pré-visualizar tonalidades do veículo.
                    </p>
                  </div>
                )}

                {tuningTab === "height" && (
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between">
                      <label className="text-xs md:text-[10px] font-bold uppercase tracking-widest text-white/50 block">
                        Altura do Veículo (Suspensão)
                      </label>
                      <span className="text-xs bg-white/10 px-2 py-1">
                        {tuningHeight > 0
                          ? "Alta"
                          : tuningHeight < 0
                            ? "Design Esportivo"
                            : "Original"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="20"
                      value={tuningHeight}
                      onChange={(e) =>
                        setTuningHeight(parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-xs md:text-[10px] text-white/40 uppercase tracking-widest">
                      <span>Rebaixado</span>
                      <span>OEM</span>
                      <span>Elevado</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simulator Section */}
      <section
        className={`relative z-10 py-24 px-6 md:px-12 w-full max-w-7xl mx-auto border-t ${theme.border}`}
      >
        <div className="mb-12">
          <h2 className={`text-4xl md:text-5xl font-light mb-4 ${theme.text}`}>
            Simulador Termodinâmico.
          </h2>
          <p
            className={`text-sm md:text-base ${theme.textMuted} max-w-2xl leading-relaxed`}
          >
            Selecione uma película do catálogo e um cenário base para visualizar
            a redução de calor e escurecimento (VLT) em tempo real.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Controls */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className={`p-8 border ${theme.border} ${theme.card}`}>
              <div className="mb-6">
                <label
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest mb-3 block ${theme.textMuted}`}
                >
                  CENÁRIO (MODELO EM TESTE)
                </label>
                <select
                  value={activeModelId}
                  onChange={(e) => setActiveModelId(e.target.value)}
                  className={`w-full bg-transparent border-b ${theme.border} pb-3 text-sm focus:outline-none appearance-none cursor-pointer`}
                >
                  {activeModelsList.map((m) => (
                    <option
                      key={m.id}
                      value={m.id}
                      className={
                        isAuto ? "bg-black text-white" : "bg-white text-black"
                      }
                    >
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest mb-3 block ${theme.textMuted}`}
                >
                  PELÍCULA APLICADA
                </label>
                <select
                  value={selectedSimFilm}
                  onChange={(e) => setSelectedSimFilm(e.target.value)}
                  className={`w-full bg-transparent border-b ${theme.border} pb-3 text-sm focus:outline-none appearance-none cursor-pointer`}
                >
                  <option
                    value=""
                    className={
                      isAuto ? "bg-black text-white" : "bg-white text-black"
                    }
                  >
                    Selecione a Película...
                  </option>
                  {filteredProducts.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      className={
                        isAuto ? "bg-black text-white" : "bg-white text-black"
                      }
                    >
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div
                  className={`flex justify-between items-center pb-4 border-b ${theme.border}`}
                >
                  <span
                    className={`text-xs md:text-[10px] uppercase font-bold tracking-widest ${theme.textMuted}`}
                  >
                    Transmissão de Luz (VLT):
                  </span>
                  <span className="font-light text-xl">
                    {activeSimFilm?.specs?.vlt || "-"}
                  </span>
                </div>
                <div
                  className={`flex justify-between items-center pb-4 border-b ${theme.border}`}
                >
                  <span
                    className={`text-xs md:text-[10px] uppercase font-bold tracking-widest ${theme.textMuted}`}
                  >
                    Rejeição IR:
                  </span>
                  <span className="font-light text-xl">
                    {activeSimFilm?.keyMetrics.ir || "-"}
                  </span>
                </div>
                <div className={`flex justify-between items-center`}>
                  <span
                    className={`text-xs md:text-[10px] uppercase font-bold tracking-widest ${theme.textMuted}`}
                  >
                    Garantia:
                  </span>
                  <span className="font-light text-sm uppercase tracking-widest">
                    {activeSimFilm?.keyMetrics.warranty || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className={`p-8 border ${theme.border} ${theme.card}`}>
              <div className="flex items-center justify-between mb-8">
                <span
                  className={`text-xs md:text-[10px] font-bold uppercase tracking-widest ${theme.textMuted}`}
                >
                  Intensidade Solar
                </span>
                <span className="text-sm font-bold bg-white/10 px-3 py-1">
                  {sunIntensity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sunIntensity}
                onChange={(e) => setSunIntensity(parseInt(e.target.value))}
                className={`w-full h-1 rounded-none appearance-none cursor-pointer ${isAuto ? "bg-white/20 accent-white" : "bg-black/20 accent-black"}`}
              />
              <div className="mt-6 flex items-center justify-between opacity-40">
                <Sun size={14} />
                <Sun size={20} />
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Visual Glass Tint Simulator */}
            <div
              className={`w-full h-[250px] md:h-[350px] border ${theme.border} relative overflow-hidden group`}
            >
              {/* Base Environment Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${activeBgModel.img})` }}
              />

              {/* Sun intensity overlay to brighten/fade the background slightly */}
              <div
                className="absolute inset-0 bg-white transition-opacity duration-300"
                style={{ mixBlendMode: "overlay", opacity: sunIntensity / 400 }}
              />

              {/* Film Overlay (Tint). Only darkens if a film is selected, else 0 */}
              <div
                className="absolute inset-0 bg-[#0A0A0A] pointer-events-none transition-all duration-700 ease-in-out"
                style={{ opacity: selectedSimFilm ? tintOpacity : 0 }}
              />

              {/* Frame over it to make it look like a window */}
              {isAuto ? (
                <div className="absolute inset-0 border-[24px] md:border-[48px] border-[#080808] rounded-[100px_10px_10px_10px] pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] flex items-end">
                  <div className="w-full h-2 bg-[#111] mb-[-30px]" />
                </div>
              ) : (
                <div className="absolute inset-0 border-[16px] md:border-[32px] border-[#EEEEEE] font-light pointer-events-none relative shadow-[inset_0_0_30px_rgba(0,0,0,0.2)]">
                  {/* Window mullions */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-[#EEEEEE] -translate-x-1/2 shadow-xl" />
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#EEEEEE] -translate-y-1/2 shadow-xl" />
                </div>
              )}

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/60 backdrop-blur-md px-3 py-1.5 text-[10px] md:text-[8px] md:text-xs md:text-[10px] uppercase tracking-[0.2em] font-bold text-white border border-white/20">
                VISÃO DO INTERIOR •{" "}
                {selectedSimFilm
                  ? `VLT ${activeSimFilm?.specs?.vlt || "50%"}`
                  : "SEM PELÍCULA"}
              </div>

              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 backdrop-blur-md w-10 h-10 flex flex-col items-center justify-center border border-white/20 text-white rounded-full">
                <Camera size={14} />
              </div>
            </div>

            {/* Temperatures */}
            <div className={`flex flex-col sm:flex-row border ${theme.border}`}>
              <div
                className={`flex-1 p-6 md:p-8 flex items-center gap-6 ${isAuto ? "border-b sm:border-b-0 sm:border-r border-white/10" : "border-b sm:border-b-0 sm:border-r border-black/10"}`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${isAuto ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-500"}`}
                >
                  <Thermometer size={20} />
                </div>
                <div>
                  <div
                    className={`text-xs md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${theme.textMuted}`}
                  >
                    Vidro Comum (Sem Proteção)
                  </div>
                  <div className="text-3xl font-light">
                    {temps.commonTemp}°C
                  </div>
                </div>
              </div>

              <div
                className={`flex-1 p-6 md:p-8 flex items-center gap-6 ${isAuto ? "bg-blue-900/10" : "bg-blue-50"} transition-colors duration-500`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${isAuto ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"} transition-colors duration-500`}
                >
                  <Shield size={20} />
                </div>
                <div>
                  <div
                    className={`text-xs md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isAuto ? "text-blue-400/80" : "text-blue-600/80"}`}
                  >
                    Com {selectedSimFilm ? activeSimFilm?.name : "Winf™"}
                  </div>
                  <div className="text-3xl font-light">
                    {selectedSimFilm ? temps.winfTemp : temps.commonTemp}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact callout */}
      <section className={`py-12 border-t ${theme.border} mt-auto text-center`}>
        <p
          className={`text-xs uppercase tracking-widest font-bold ${theme.textMuted}`}
        >
          Aplicação Artesanal. Realizada apenas por Mestres Aplicadores
          Certificados Winf Ascend™.
        </p>
      </section>
    </div>
  );
};

export default ProductsCatalog;
