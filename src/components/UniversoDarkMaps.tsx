import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Line } from 'react-simple-maps';
import { MapPin, Globe, CheckCircle2, X } from 'lucide-react';

const worldGeoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const brazilGeoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

// The Brazil map center coordinates
const BRAZIL_CENTER: [number, number] = [-53, -15];

const CAPITALS = [
  [-46.6333, -23.5505], // SP
  [-43.1729, -22.9068], // RJ
  [-49.2731, -25.4284], // Curitiba
  [-51.2177, -30.0346], // Porto Alegre
  [-38.5267, -3.7319],  // Fortaleza
  [-38.5016, -12.9714], // Salvador
  [-43.9378, -19.9208], // Belo Horizonte
  [-47.8822, -15.7942], // Brasilia
  [-48.5492, -27.5969], // Floripa
  [-34.8811, -8.0578],  // Recife
  [-60.0217, -3.1190],  // Manaus
  [-48.3277, -1.4550],  // Belém
  [-49.2646, -16.6869], // Goiania
  [-44.3036, -2.5297],  // São Luís
  [-35.7351, -9.6662],  // Maceió
  [-35.2094, -5.7945],  // Natal
  [-42.8016, -5.0892],  // Teresina
  [-34.8631, -7.1153],  // Joao Pessoa
  [-37.0719, -10.9472], // Aracaju
  [-56.0969, -15.6014], // Cuiabá
  [-54.6201, -20.4428], // Campo Grande
  [-63.9039, -8.7612],  // Porto Velho
  [-51.0620, 0.0356]    // Macapá
];

const RAND_ASSETS = Array.from({ length: 42 }).map((_, i) => {
  const cap = CAPITALS[i % CAPITALS.length];
  const dx = (Math.sin(i) * 0.3) - (i % 2 === 0 ? 0.2 : 0);
  const dy = (Math.cos(i) * 0.3);
  return {
    coordinates: [cap[0] + dx, cap[1] + dy] as [number, number],
    name: `Asset Light Unit #${i + 13}`,
    status: 'available',
    owner: 'Território Disponível'
  };
});

const ASSET_LIGHT_LOCATIONS = [
  // Tiago (CEO / Founder) - Baixada Santista e afins
  { coordinates: [-46.3333, -23.9608] as [number, number], name: "Asset Light Santos/SP", status: "active", owner: "Tiago (CEO / Founder)" },
  { coordinates: [-46.4167, -24.0058] as [number, number], name: "Asset Light Praia Grande/SP", status: "active", owner: "Tiago (CEO / Founder)" },
  { coordinates: [-46.2564, -23.9931] as [number, number], name: "Asset Light Guarujá/SP", status: "active", owner: "Tiago (CEO / Founder)" },
  { coordinates: [-46.4233, -23.8950] as [number, number], name: "Asset Light Cubatão/SP", status: "active", owner: "Tiago (CEO / Founder)" },
  { coordinates: [-46.1386, -23.8492] as [number, number], name: "Asset Light Bertioga/SP", status: "active", owner: "Tiago (CEO / Founder)" },
  
  // Disponíveis - Baixada Santista
  { coordinates: [-46.3917, -23.9536] as [number, number], name: "Asset Light São Vicente/SP", status: "available", owner: "Território Disponível" },
  { coordinates: [-46.6206, -24.0931] as [number, number], name: "Asset Light Mongaguá/SP", status: "available", owner: "Território Disponível" },

  // Tiago (Tech / Founder)
  { coordinates: [-35.8811, -7.2307] as [number, number], name: "Asset Light Campina Grande/PB", status: "active", owner: "Tiago (Tech / Founder)" },

  ...RAND_ASSETS
];

const GLOBAL_HUBS = [
  { coordinates: [-95.7129, 37.0902] as [number, number], country: 'USA', id: 'US', capital: 'Washington, D.C.', name: 'Cadeira 07: USA', active: false, investor: 'Master Board USA', location: 'Meta: 100 Asset Lights no país.' },
  { coordinates: [-8.2245, 39.3999] as [number, number], country: 'Portugal', id: 'PT', capital: 'Lisboa', name: 'Cadeira 08: Portugal', active: false, investor: 'Master Board PT/EU', location: 'Meta: 100 Asset Lights no país.' },
  { coordinates: [55.2708, 25.2048] as [number, number], country: 'EAU', id: 'AE', capital: 'Abu Dhabi', name: 'Cadeira 09: EAU (Dubai)', active: false, investor: 'Master Board EAU', location: 'Meta: 100 Asset Lights no país.' },
  { coordinates: [138.2529, 36.2048] as [number, number], country: 'Japão', id: 'JP', capital: 'Tóquio', name: 'Cadeira 10: Japão/Ásia', active: false, investor: 'Master Board JP', location: 'Meta: 100 Asset Lights no país.' },
  { coordinates: [133.7751, -25.2744] as [number, number], country: 'Austrália', id: 'AU', capital: 'Camberra', name: 'Cadeira 11: Austrália', active: false, investor: 'Master Board AU', location: 'Meta: 100 Asset Lights no país.' },
  { coordinates: [-0.1276, 51.5074] as [number, number], country: 'UK', id: 'UK', capital: 'Londres', name: 'Cadeira 12: Board Flutuante', active: false, investor: 'Fundo Coletivo Gold', location: 'Liquidez Global.' },
];

const W12_BRASIL_CELLS = [
  { coordinates: [-46.3333, -23.9608] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 01 / Tiago (CEO)", id: "01", active: true, investor: "Tiago (CEO / Founder)", location: "Santos/SP" },
  { coordinates: [-35.8811, -7.2307] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 02 / Tiago (Tech)", id: "02", active: true, investor: "Tiago (Tech / Founder)", location: "Campina Grande/PB" },
  { coordinates: [-46.3188, -22.8550] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 03 (Livre)", id: "03", active: false, investor: "Não Atribuído", location: "Extrema/MG" },
  { coordinates: [-46.8833, -23.3556] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 04 (Livre)", id: "04", active: false, investor: "Não Atribuído", location: "Cajamar/SP" },
  { coordinates: [-49.2731, -25.4284] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 05 (Livre)", id: "05", active: false, investor: "Não Atribuído", location: "Curitiba/PR" },
  { coordinates: [-48.6672, -26.9105] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 06 (Livre)", id: "06", active: false, investor: "Não Atribuído", location: "Itajaí/SC" },
  { coordinates: [-50.9939, -29.9347] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 07 (Livre)", id: "07", active: false, investor: "Não Atribuído", location: "Gravataí/RS" },
  { coordinates: [-47.8822, -15.7942] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 08 (Livre)", id: "08", active: false, investor: "Não Atribuído", location: "Brasília/DF" },
  { coordinates: [-38.3275, -12.8944] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 09 (Livre)", id: "09", active: false, investor: "Não Atribuído", location: "Lauro de Freitas/BA" },
  { coordinates: [-35.0353, -8.2861] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 10 (Livre)", id: "10", active: false, investor: "Não Atribuído", location: "Cabo de Santo Agostinho/PE" },
  { coordinates: [-48.4902, -1.4558] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 11 (Livre)", id: "11", active: false, investor: "Não Atribuído", location: "Belém/PA" },
  { coordinates: [-60.0217, -3.1190] as [number, number], country: "Brasil", capital: "Brasília", name: "Cadeira 12 (Livre)", id: "12", active: false, investor: "Não Atribuído", location: "Manaus/AM" },
];

const W12_WORLD_CELLS = GLOBAL_HUBS;

interface UniversoDarkMapsProps {
  lang?: 'pt' | 'en' | 'es';
}

export const UniversoDarkMaps: React.FC<UniversoDarkMapsProps> = ({ lang = 'pt' }) => {
  const [activeTab, setActiveTab] = useState<string>('brasil');
  const [position, setPosition] = useState({ coordinates: BRAZIL_CENTER as [number, number], zoom: 6.5 });
  const [tooltipInfo, setTooltipInfo] = useState<{ x: number, y: number, content: any, type: 'cell' | 'asset' } | null>(null);
  const [showValuationModal, setShowValuationModal] = useState(false);

  const countryPoints = React.useMemo(() => {
    const data: Record<string, { chairs: any[], assets: any[] }> = {};
    
    // Configurações Estratégicas Baseadas em População e HUBs Financeiros
    const STRATEGIC_LOCATIONS: Record<string, any[]> = {
      'US': [
        { coords: [-74.0060, 40.7128], name: "New York (East Coast Hub)" },
        { coords: [-118.2437, 34.0522], name: "Los Angeles (West Coast Hub)" },
        { coords: [-87.6298, 41.8781], name: "Chicago (Midwest Hub)" },
        { coords: [-80.1918, 25.7617], name: "Miami (LatAm Gateway)" },
        { coords: [-95.3698, 29.7604], name: "Houston (South Hub)" },
        { coords: [-122.4194, 37.7749], name: "San Francisco (Tech Hub)" },
        { coords: [-79.3832, 43.6532], name: "Toronto (Canada Hub)" }
      ],
      'PT': [
        { coords: [-9.1393, 38.7223], name: "Lisboa (Iberia Gateway)" },
        { coords: [-3.7038, 40.4168], name: "Madrid (Spain Hub)" },
        { coords: [2.3522, 48.8566], name: "Paris (France Hub)" },
        { coords: [13.4050, 52.5200], name: "Berlin (DACH Hub)" },
        { coords: [12.4964, 41.9028], name: "Roma (Italy Hub)" }
      ],
      'AE': [
        { coords: [55.2708, 25.2048], name: "Dubai (Global Trade Hub)" },
        { coords: [54.3667, 24.4667], name: "Abu Dhabi (Capital Hub)" },
        { coords: [46.7167, 24.6333], name: "Riyadh (Saudi Hub)" },
        { coords: [51.5333, 25.2833], name: "Doha (Qatar Hub)" }
      ],
      'JP': [
        { coords: [139.6917, 35.6895], name: "Tokyo (Japan Hub)" },
        { coords: [126.9780, 37.5665], name: "Seoul (Korea Hub)" },
        { coords: [121.4737, 31.2304], name: "Shanghai (China Hub)" },
        { coords: [103.8198, 1.3521], name: "Singapore (SE Asia Hub)" },
        { coords: [114.1694, 22.3193], name: "Hong Kong (Fin Hub)" }
      ],
      'AU': [
        { coords: [151.2093, -33.8688], name: "Sydney (East Coast Hub)" },
        { coords: [144.9631, -37.8136], name: "Melbourne (Southern Hub)" },
        { coords: [153.0251, -27.4698], name: "Brisbane (North East Hub)" },
        { coords: [115.8605, -31.9505], name: "Perth (West Coast Hub)" }
      ],
      'UK': [
        { coords: [-0.1276, 51.5074], name: "London (Master Financial Hub)" },
        { coords: [-2.2426, 53.4808], name: "Manchester (Northern Hub)" },
        { coords: [-3.1883, 55.9533], name: "Edinburgh (Scotland Hub)" }
      ]
    };

    GLOBAL_HUBS.forEach(h => {
      const locations = STRATEGIC_LOCATIONS[h.id] || [];
      const assetCount = ['US'].includes(h.id) ? 100 : ['PT', 'AE'].includes(h.id) ? 50 : 30;
      
      let seed = h.country.length;
      const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      const spread = ['PT', 'AE', 'JP', 'UK'].includes(h.id) ? 4 : 10;

      data[h.id] = {
        chairs: locations.map((loc, i) => ({
          coordinates: loc.coords as [number, number],
          country: h.country,
          name: loc.name,
          id: String(i + 1).padStart(2, '0'),
          active: false,
          investor: "Asset List",
          location: "Elegível para Captação"
        })),
        assets: Array.from({ length: assetCount }).map((_, i) => ({
          coordinates: [h.coordinates[0] + (random() - 0.5) * (spread * 1.5), h.coordinates[1] + (random() - 0.5) * (spread * 1.5)] as [number, number],
          name: `Asset Light #${i + 1}`,
          status: 'available',
          owner: 'Território Disponível',
          country: h.country
        }))
      };
    });
    return data;
  }, []);

  const handleZoomIn = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 20) }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
  };

  const handleMoveEnd = (newPosition: any) => {
    setPosition(newPosition);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'brasil') {
      setPosition({ coordinates: BRAZIL_CENTER, zoom: 6.5 });
    } else if (tabId === 'world') {
      setPosition({ coordinates: [0, 20], zoom: 1 });
    } else {
      const hub = GLOBAL_HUBS.find(h => h.id === tabId);
      if (hub) {
        setPosition({ coordinates: hub.coordinates, zoom: 4.5 });
      }
    }
  };


  const dict = {
    pt: {
      geoStrategy: "Geo-Estratégia W12",
      mapping: "Mapeamento em tempo real das Cadeiras Board (W12) e pontos Asset Light.",
      brHubs: "Brasil (5.000 Hubs)",
      globalBoard: "Global Board",
      activeCells: "Cadeiras Ativas (Fundadores)",
      availChairs: "Cadeiras Disponíveis",
      assetLights: "Asset Lights (Rede)",
      statusRep: "Status do Relatório",
      chairsOcc: "Cadeiras W12 Ocupadas",
      assetBr: "Asset Lights (Brasil)",
      mapText: "À medida que as cotas são adquiridas e novos polos Asset Light são montados, eles aparecem em tempo real no mapa da Sinf-Chain. O atingimento da meta de 100 polos Asset Light por território garante Múltiplos de Valuation. Após 100 polos, a expansão exige no mínimo 1 Asset Light por cidade em cada país.",
      pleitear: "Pleitear Cadeira Regional"
    },
    en: {
      geoStrategy: "W12 Geo-Strategy",
      mapping: "Real-time mapping of Board Cells (W12) and Asset Light hubs.",
      brHubs: "Brazil (5,000 Hubs)",
      globalBoard: "Global Board",
      activeCells: "Active Chairs (Founders)",
      availChairs: "Available Seats",
      assetLights: "Asset Lights (Network)",
      statusRep: "Report Status",
      chairsOcc: "Occupied W12 Seats",
      assetBr: "Asset Lights (Brazil)",
      mapText: "As quotas are acquired and new Asset Light hubs are deployed, they appear in real-time on the map. Every 100 new cells secure Valuation Multipliers. After 100 hubs, expansion requires at least 1 Asset Light per city in each country.",
      pleitear: "Claim Regional Seat"
    },
    es: {
      geoStrategy: "Geo-Estrategia W12",
      mapping: "Mapeo en tiempo real de Sillas de la Junta (W12) y puntos Asset Light.",
      brHubs: "Brasil (5.000 Hubs)",
      globalBoard: "Junta Global",
      activeCells: "Sillas Activas (Fundadores)",
      availChairs: "Asientos Disponibles",
      assetLights: "Asset Lights (Red)",
      statusRep: "Estado del Informe",
      chairsOcc: "Asientos W12 Ocupados",
      assetBr: "Asset Lights (Brasil)",
      mapText: "A medida que se adquieren cuotas y se despliegan nuevos hubs Asset Light, aparecen en tiempo real en el mapa. Cada 100 nuevos hubs aseguran Múltiplos de Valoración. Después de 100 hubs, la expansión requiere al menos 1 Asset Light por ciudad en cada país.",
      pleitear: "Reclamar Asiento Regional"
    }
  };

  const t = dict[lang];

  return (
    <div className="bg-black border border-white/5 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 opacity-5 blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1 text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="text-green-500" /> {t.geoStrategy}
          </h3>
          <p className="text-xs text-white/50">{t.mapping}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 border border-white/10 p-2 bg-white/5 rounded-sm w-full md:max-w-2xl">
          <button 
            onClick={() => handleTabChange('world')}
            className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'world' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
          >
            {t.globalBoard}
          </button>
          <button 
            onClick={() => handleTabChange('brasil')}
            className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'brasil' ? 'bg-green-500 text-black' : 'text-white/40 hover:text-white'}`}
          >
            BRASIL
          </button>
          {GLOBAL_HUBS.map(hub => (
            <button
              key={hub.id}
              onClick={() => handleTabChange(hub.id)}
              className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === hub.id ? 'bg-green-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              {hub.country}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-[400px] md:h-[500px] border border-white/5 bg-[#050505] relative cursor-crosshair">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs md:text-[10px] uppercase font-mono bg-black/60 px-3 py-1.5 border border-white/10">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span> {t.activeCells}
            </div>
            <div className="flex items-center gap-2 text-xs md:text-[10px] uppercase font-mono bg-black/60 px-3 py-1.5 border border-white/10">
               <span className="w-2 h-2 rounded-full border border-zinc-600"></span> {t.availChairs}
            </div>
            <div className="flex items-center gap-2 text-xs md:text-[10px] uppercase font-mono bg-black/60 px-3 py-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span> {t.assetLights}
            </div>
          </div>

          <ComposableMap
            projectionConfig={{
              scale: 180,
              center: [0, 20]
            }}
            width={800}
            height={500}
            style={{ width: "100%", height: "100%", touchAction: "none" }}
          >
            <ZoomableGroup 
              zoom={position.zoom}
              center={position.coordinates} 
              onMoveEnd={handleMoveEnd}
            >
              <Geographies geography={activeTab === 'brasil' ? brazilGeoUrl : worldGeoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isWorldMap = activeTab !== 'brasil';
                    if (isWorldMap) {
                      const geoName = geo.properties.name;
                      const topoJsonNameMap: Record<string, string> = {
                        'US': 'United States of America',
                        'PT': 'Portugal',
                        'AE': 'United Arab Emirates',
                        'JP': 'Japan',
                        'AU': 'Australia',
                        'UK': 'United Kingdom',
                        'FR': 'France',
                        'DE': 'Germany',
                        'AR': 'Argentina',
                        'CL': 'Chile',
                        'CN': 'China',
                        'IN': 'India',
                        'ZA': 'South Africa',
                        'CA': 'Canada',
                        'MX': 'Mexico',
                        'ES': 'Spain',
                        'IT': 'Italy'
                      };
                      
                      const isSelectedCountry = activeTab !== 'world' && topoJsonNameMap[activeTab] === geoName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isSelectedCountry ? "#1a1a1a" : "#111"}
                          stroke={isSelectedCountry ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.05)"}
                          strokeWidth={isSelectedCountry ? 1 : 0.5}
                          style={{
                            default: { outline: "none", transition: "all 0.5s ease" },
                            hover: { fill: "#1a1a1a", outline: "none", cursor: activeTab === 'world' ? 'pointer' : 'default' },
                            pressed: { fill: "#1a1a1a", outline: "none" },
                          }}
                          onClick={() => {
                            if (activeTab === 'world') {
                              // Identify which hub was clicked
                              const clickedHubEntry = Object.entries(topoJsonNameMap).find(([_, name]) => name === geoName);
                              if (clickedHubEntry) {
                                handleTabChange(clickedHubEntry[0]);
                              }
                            }
                          }}
                          onMouseEnter={(e) => {
                             if (activeTab === 'world') {
                               const clickedHubEntry = Object.entries(topoJsonNameMap).find(([_, name]) => name === geoName);
                               if (clickedHubEntry) {
                                  const hub = GLOBAL_HUBS.find(h => h.id === clickedHubEntry[0]);
                                  if (hub) setTooltipInfo({ x: e.clientX, y: e.clientY, content: { name: `Global Hub: ${hub.country}`, status: "available", owner: "Click to explore W12 seats" }, type: "asset" });
                               }
                             }
                          }}
                          onMouseMove={(e) => {
                             if (activeTab === 'world') {
                               const clickedHubEntry = Object.entries(topoJsonNameMap).find(([_, name]) => name === geoName);
                               if (clickedHubEntry) {
                                  const hub = GLOBAL_HUBS.find(h => h.id === clickedHubEntry[0]);
                                  if (hub) setTooltipInfo({ x: e.clientX, y: e.clientY, content: { name: `Global Hub: ${hub.country}`, status: "available", owner: "Click to explore W12 seats" }, type: "asset" });
                               }
                             }
                          }}
                          onMouseLeave={() => setTooltipInfo(null)}
                        />
                      );
                    }

                    // Brazil states
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#050505"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={0.5}
                        onClick={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: { name: `Estado: ${geo.properties.name}`, status: "available", owner: "WINF Territory" }, type: "asset" })}
                        onMouseEnter={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: { name: `Estado: ${geo.properties.name}`, status: "available", owner: "WINF Territory" }, type: "asset" })}
                        onMouseMove={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: { name: `Estado: ${geo.properties.name}`, status: "available", owner: "WINF Territory" }, type: "asset" })}
                        onMouseLeave={() => setTooltipInfo(null)}
                        style={{
                          default: { outline: "none", transition: "all 0.3s ease" },
                          hover: { 
                            fill: "#0a0a0a", 
                            stroke: "rgba(34,197,94,0.6)", 
                            strokeWidth: 1, 
                            outline: "none",
                            filter: "drop-shadow(0 0 6px rgba(34,197,94,0.4))",
                            cursor: "pointer"
                          },
                          pressed: { fill: "#0a0a0a", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Render Logistic Connections */}
              {activeTab === 'brasil' && ASSET_LIGHT_LOCATIONS.map((loc, i) => {
                if (loc.owner === "Tiago (CEO / Founder)" && loc.name !== "Asset Light Santos/SP") {
                  return <Line key={`route-ceo-${i}`} from={[-46.3333, -23.9608]} to={loc.coordinates} stroke="rgba(34,197,94,0.2)" strokeWidth={1 / position.zoom} strokeDasharray="2,2" />;
                }
                if (loc.owner === "Tiago (Tech / Founder)" && loc.name !== "Asset Light Campina Grande/PB") {
                  return <Line key={`route-tech-${i}`} from={[-35.8811, -7.2307]} to={loc.coordinates} stroke="rgba(34,197,94,0.2)" strokeWidth={1 / position.zoom} strokeDasharray="2,2" />;
                }
                if (loc.status === "available") { // conectando hubs disponíveis ao master board pra dar efeito de inteligência artificial calculando malha
                  return <Line key={`route-avail-${i}`} from={[-46.3333, -23.9608]} to={loc.coordinates} stroke="rgba(234,179,8,0.1)" strokeWidth={0.5 / position.zoom} strokeDasharray="1,3" />;
                }
                return null;
              })}
              
              {activeTab === 'world' && GLOBAL_HUBS.map((loc, i) => {
                 return <Line key={`route-world-${i}`} from={[-46.3333, -23.9608]} to={loc.coordinates} stroke="rgba(234,179,8,0.1)" strokeWidth={1 / position.zoom} strokeDasharray="2,4" />;
              })}

              {/* Render Asset Lights */}
              {activeTab === 'brasil' && ASSET_LIGHT_LOCATIONS.map((loc, i) => (
                <Marker 
                  key={`asset-${i}`} 
                  coordinates={loc.coordinates}
                  onMouseEnter={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: loc, type: 'asset' })}
                  onMouseLeave={() => setTooltipInfo(null)}
                  onClick={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: loc, type: 'asset' })}
                >
                  <g transform={`scale(${2 / (position.zoom + 1)})`}>
                    {loc.status === 'available' && (
                      <circle r={8} fill="rgba(234,179,8,0.15)" className="animate-pulse pointer-events-none" />
                    )}
                    <circle 
                      r={4} 
                      fill={loc.status === 'active' ? "rgba(34,197,94,0.8)" : "rgba(234,179,8,0.6)"} 
                      style={{ filter: loc.status === 'active' ? 'drop-shadow(0 0 6px rgba(34,197,94,0.9))' : 'none' }}
                      className={`cursor-pointer transition-all ${loc.status === 'active' ? 'hover:fill-green-400 hover:scale-125' : 'animate-pulse hover:fill-yellow-400 hover:scale-125'}`} 
                    />
                  </g>
                </Marker>
              ))}

              {/* Render Asset Lights for Country Tabs */}
              {activeTab !== 'brasil' && activeTab !== 'world' && countryPoints[activeTab]?.assets.map((loc, i) => (
                <Marker 
                  key={`asset-country-${i}`} 
                  coordinates={loc.coordinates}
                  onMouseEnter={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: loc, type: 'asset' })}
                  onMouseLeave={() => setTooltipInfo(null)}
                  onClick={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: loc, type: 'asset' })}
                >
                  <g transform={`scale(${2 / (position.zoom + 1)})`}>
                    <circle r={8} fill="rgba(234,179,8,0.15)" className="animate-pulse pointer-events-none" />
                    <circle 
                      r={4} 
                      fill="rgba(234,179,8,0.6)"
                      className="cursor-pointer transition-all animate-pulse hover:fill-yellow-400 hover:scale-125"
                    />
                  </g>
                </Marker>
              ))}

              {/* Render W12 Cadeiras */}
              {(activeTab === 'brasil' 
                ? W12_BRASIL_CELLS 
                : activeTab === 'world' 
                  ? [W12_BRASIL_CELLS[0], ...W12_WORLD_CELLS] // include BR master board in world view
                  : countryPoints[activeTab]?.chairs || [])
                .map((cell, i) => {
                  const isActive = cell.active;
                  const innerFill = isActive ? "rgba(34,197,94,1)" : "#fff";
                  const outerFill = isActive ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.15)";
                  const dropShadow = isActive ? 'drop-shadow(0 0 8px rgba(34,197,94,0.9))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.5))';
                  const textFill = isActive ? 'fill-green-500' : 'fill-white';

                  return (
                    <Marker 
                      key={`w12-${i}`} 
                      coordinates={cell.coordinates}
                      onMouseEnter={(e) => setTooltipInfo({ x: e.clientX, y: e.clientY, content: cell, type: 'cell' })}
                      onMouseLeave={() => setTooltipInfo(null)}
                      onClick={(e) => {
                        setTooltipInfo({ x: e.clientX, y: e.clientY, content: cell, type: 'cell' });
                        if (activeTab === 'world') {
                          if (cell.id === '01') handleTabChange('brasil');
                          else handleTabChange(cell.id);
                        }
                      }}
                    >
                      <g transform={`scale(${2 / (position.zoom + 1)})`} className="cursor-pointer group">
                        <circle r={14} fill={outerFill} className={`${isActive ? 'animate-pulse' : 'animate-pulse'} pointer-events-none`} />
                        <circle 
                          r={7} 
                          fill={innerFill} 
                          stroke="#000" 
                          strokeWidth={2} 
                          style={{ filter: dropShadow }}
                          className="transition-transform group-hover:scale-125 duration-300"
                        />
                        {cell.id && (
                          <text
                            textAnchor="middle"
                            y={22}
                            className={`text-[9px] font-mono tracking-widest font-bold pointer-events-none ${textFill}`}
                          >
                            {cell.id}
                          </text>
                        )}
                      </g>
                    </Marker>
                  );
                })}
            </ZoomableGroup>
          </ComposableMap>
          
          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
            <button onClick={handleZoomIn} className="w-8 h-8 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
              +
            </button>
            <button onClick={handleZoomOut} className="w-8 h-8 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
              -
            </button>
          </div>
          
          {/* Tooltip */}
          {tooltipInfo && (
            <div 
              className="fixed z-50 pointer-events-none bg-black/90 border border-white/10 p-4 shadow-2xl backdrop-blur-md rounded-sm"
              style={{ top: tooltipInfo.y > window.innerHeight - 150 ? tooltipInfo.y - 120 : tooltipInfo.y - 10, left: tooltipInfo.x > window.innerWidth - 250 ? tooltipInfo.x - 230 : tooltipInfo.x + 15, width: 250 }}
            >
              {tooltipInfo.type === 'cell' ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <h5 className="text-sm md:text-[11px] font-black tracking-widest uppercase text-white">
                      {tooltipInfo.content.name}
                    </h5>
                  </div>
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs md:text-[10px] text-zinc-400 font-mono"><strong className="text-zinc-300">País:</strong> {tooltipInfo.content.country}</p>
                    {tooltipInfo.content.location ? (
                      <p className="text-xs md:text-[10px] text-zinc-400 font-mono"><strong className="text-zinc-300">HUB:</strong> {tooltipInfo.content.location}</p>
                    ) : (
                      <p className="text-xs md:text-[10px] text-zinc-400 font-mono"><strong className="text-zinc-300">Capital:</strong> {tooltipInfo.content.capital}</p>
                    )}
                    <p className="text-xs md:text-[10px] text-zinc-400 font-mono"><strong className="text-zinc-300">Investidor:</strong> {tooltipInfo.content.investor}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    {tooltipInfo.content.status === 'active' ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    )}
                    <h5 className="text-sm md:text-[11px] font-black tracking-widest uppercase text-white">
                      {tooltipInfo.content.name}
                    </h5>
                  </div>
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs md:text-[10px] text-zinc-400 font-mono"><strong className="text-zinc-300">Licenciado:</strong> {tooltipInfo.content.owner}</p>
                    <div className="pt-2">
                      <span className={`text-[11px] md:text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${tooltipInfo.content.status === 'active' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'}`}>
                        {tooltipInfo.content.status === 'active' ? 'Status: Ativo' : 'Status: Disponível'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 p-6 flex flex-col h-full">
           <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
             <CheckCircle2 size={12} /> {t.statusRep}
           </h4>
           
           <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs md:text-[10px] text-white/40 uppercase font-mono mb-1">
                  {t.chairsOcc} {activeTab === 'world' ? '(Global)' : activeTab !== 'brasil' ? `(${GLOBAL_HUBS.find(h => h.id === activeTab)?.country})` : ''}
                </p>
                <p className="text-xl font-bold font-mono text-green-500">
                  {activeTab === 'brasil' ? '02 ' : activeTab === 'world' ? '02 ' : '00 '} 
                  <span className="text-xs text-zinc-600">/ {activeTab === 'brasil' ? '12' : activeTab === 'world' ? '216' : countryPoints[activeTab]?.chairs.length || '0'}</span>
                </p>
              </div>
              
              <div>
                <p className="text-xs md:text-[10px] text-white/40 uppercase font-mono mb-1">
                  {activeTab === 'brasil' ? t.assetBr : activeTab === 'world' ? t.assetLights : `Asset Lights (${GLOBAL_HUBS.find(h => h.id === activeTab)?.country})`}
                </p>
                <p className="text-xl font-bold font-mono text-white">
                  {activeTab === 'brasil' ? '08 ' : activeTab === 'world' ? '08 ' : '00 '} 
                  <span className="text-xs text-zinc-600">/ {activeTab === 'brasil' ? '5000' : activeTab === 'world' ? 'Global (Est.)' : '100 min'}</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <p className="text-[11px] md:text-[9px] text-zinc-500 leading-relaxed italic">
                  {t.mapText}
                </p>
              </div>
           </div>

           <div className="space-y-2 mt-4">
             <button 
                onClick={() => setShowValuationModal(true)}
                className="w-full py-3 bg-zinc-900 border border-green-500/30 text-green-500 font-black text-xs md:text-[10px] uppercase tracking-[0.1em] hover:bg-green-500/10 transition-colors">
                SIMULAÇÃO DE VALUATION
             </button>
             <button className="w-full py-3 bg-white text-black font-black text-xs md:text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors">
                {t.pleitear}
             </button>
           </div>
        </div>
      </div>
      {/* Valuation Simulation Modal */}
      {showValuationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-4xl p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Valuation <span className="text-green-500">Global & Meta</span></h2>
                <p className="text-zinc-500 mt-2 font-mono text-sm max-w-xl">Projeção da meta 100% (12 Cadeiras + 100 Asset Lights ativos) e a expansão da WINF-Chain em 18 territórios.</p>
              </div>
              <button onClick={() => setShowValuationModal(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white/5 border border-white/5">
                <div className="text-white/40 font-mono text-xs mb-2">Meta Brasil (Captação)</div>
                <div className="text-4xl font-black text-white">100%</div>
                <div className="text-green-500 text-xs font-mono mt-2">12 Cadeiras + 100 Asset Lights</div>
              </div>
              <div className="p-6 bg-white/5 border border-white/5">
                <div className="text-white/40 font-mono text-xs mb-2">Receita de Licenciamento</div>
                <div className="text-4xl font-black text-white">R$ 10.8<span className="text-2xl">M</span></div>
                <div className="text-green-500 text-xs font-mono mt-2">Ticket Médio Arrecadado</div>
              </div>
              <div className="p-6 bg-white/5 border border-white/5">
                <div className="text-white/40 font-mono text-xs mb-2">MRR Projetado (Rede)</div>
                <div className="text-4xl font-black text-green-500">R$ 2.5<span className="text-2xl">M</span></div>
                <div className="text-green-500/50 text-xs font-mono mt-2">Royalties e Transações/mês</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">A Lógica Exponencial (Equity)</h3>
                <ul className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-green-500">01.</span>
                    <p><strong>Atingimento da Meta:</strong> Ao fechar os 100 Asset Lights e 12 Cadeiras, geramos fluxo de caixa massivo e uma rede logística capilarizada invencível.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500">02.</span>
                    <p><strong>Escala Global:</strong> Cada território internacional replica esse modelo exato. Ao ter as maiores potências territoriais (USA, Dubai, Japão, UK...), o valor da W12 dispara através da <strong>Malha Logística e de Inteligência</strong>.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500">03.</span>
                    <p>A WINF-Chain atua absorvendo as transações globais, jogando nosso Valuation para múltiplos de M&A (Fusões e Aquisições) de empresas de tecnologia e franquia.</p>
                  </li>
                </ul>
              </div>

              <div className="bg-black border border-green-500/30 p-6 flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-green-500 font-mono text-sm mb-4 tracking-widest uppercase">Target Valuation (W12 Global)</div>
                  <div className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">$1.2<span className="text-green-500">B</span></div>
                  <p className="text-zinc-500 text-sm">Com o Brasil consolidado (Meta 100%) e o modelo validado, o Equity atinge a escala de Unicórnio tracionando em moedas fortes (Dólar, Euro, Dirham).</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
