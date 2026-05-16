
import React, { useState, useRef, useMemo } from 'react';
import { 
  ChevronLeft, 
  Building2, 
  Maximize2, 
  Trash2, 
  Plus, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  Camera, 
  RefreshCw, 
  FileSpreadsheet, 
  ArrowUpRight, 
  Thermometer, 
  Sun,
  Layers,
  Wand2,
  Loader,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Clock,
  Info,
  Hexagon,
  Download,
  Printer,
  Share2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line } from 'recharts';
import { useWinf } from '../contexts/WinfContext';
import { GoogleGenAI } from "@google/genai";

import { getApiKey } from '../lib/gemini';

interface WindowPane {
  id: string;
  width: number;
  height: number;
  qty: number;
  type: string;
}

const ModuleArchitecturalPro: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [panes, setPanes] = useState<WindowPane[]>([]);
  const [newPane, setNewPane] = useState({ width: '', height: '', qty: '1', type: 'Vidro Simples' });
  const [activeTab, setActiveTab] = useState<'survey' | 'vision' | 'roi' | 'proposal' | 'orders'>('survey');
  const [facadeImg, setFacadeImg] = useState<string | null>(null);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const { products } = useWinf();

  // Obter películas de arquitetura do contexto, ou usar padrões
  const archProducts = useMemo(() => {
     const arch = products.filter(p => p.category === 'Arquitetura' || p.name.includes('Select') || p.name.includes('Arquitetura'));
     if (arch.length > 0) return arch;
     
     // Fallback if none found
     return [
        { id: '1', name: 'Winf Select™ IR-99 (Elite)', price: 450, cost_architect: 180, tech_specs: { tser: '24.5' } },
        { id: '2', name: 'Winf Select™ Platinum', price: 350, cost_architect: 140, tech_specs: { tser: '18.2' } },
        { id: '3', name: 'Winf Select™ Charcoal', price: 220, cost_architect: 90, tech_specs: { tser: '12.8' } }
     ];
  }, [products]);

  const [selectedFilmId, setSelectedFilmId] = useState<string>(archProducts[0]?.id || '1');
  const selectedProduct = archProducts.find(p => p.id === selectedFilmId) || archProducts[0];
  const selectedFilmName = selectedProduct?.name || 'Winf Select';
  const clientPrice = selectedProduct?.price || 450;
  // Assumes architect cost is around 40% of client price if not explicitly defined
  const architectCost = (selectedProduct as any)?.cost_architect || Math.floor(clientPrice * 0.4);
  const filmEfficiency = parseFloat(selectedProduct?.tech_specs?.tser || '15');
  const [acBTUs, setAcBTUs] = useState('12000');
  const [acUsageHours, setAcUsageHours] = useState('8');
  const [kwhCost, setKwhCost] = useState('0.92');
  const [projectCost, setProjectCost] = useState('4500');
  const [showDossier, setShowDossier] = useState(false);
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPane = () => {
    if (!newPane.width || !newPane.height) return;
    const pane: WindowPane = {
      id: Date.now().toString(),
      width: parseFloat(newPane.width),
      height: parseFloat(newPane.height),
      qty: parseInt(newPane.qty),
      type: newPane.type
    };
    setPanes([...panes, pane]);
    setNewPane({ width: '', height: '', qty: '1', type: 'Vidro Simples' });
  };

  const removePane = (id: string) => setPanes(panes.filter(p => p.id !== id));

  const totalM2 = useMemo(() => panes.reduce((acc, p) => acc + (p.width * p.height * p.qty), 0), [panes]);
  const totalWithWaste = totalM2 * 1.15; 

  // ROI LOGIC
  const roiData = useMemo(() => {
    const efficiencyFactor = filmEfficiency;
    const btuFactor = parseInt(acBTUs) / 12000;
    const monthlySavings = (totalM2 * efficiencyFactor) * (parseInt(acUsageHours) / 8) * btuFactor * parseFloat(kwhCost); 
    const monthsToPay = parseFloat(projectCost) / (monthlySavings || 1);
    
    const chartData = Array.from({ length: 24 }, (_, i) => {
        const month = i + 1;
        const accumulatedSaving = monthlySavings * month;
        return {
            name: month === 1 ? '1m' : month % 6 === 0 ? `${month}m` : '',
            saving: Math.round(accumulatedSaving),
            cost: parseFloat(projectCost)
        };
    });

    return { monthlySavings, monthsToPay, chartData };
  }, [totalM2, acUsageHours, kwhCost, projectCost, filmEfficiency, acBTUs]);

  const handleSimulateSelect = async () => {
    if (!facadeImg) return;
    setIsSimulating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: getApiKey() });
        const base64Data = facadeImg.split(',')[1];
        const mimeType = facadeImg.split(';')[0].split(':')[1];

        const prompt = `
            Simule a aplicação da película arquitetônica Winf Select™ Platinum na fachada desta imagem.
            O vidro deve ficar com um tom sutilmente escurecido/espelhado de luxo.
            Destaque a redução de reflexo e o conforto visual.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType } },
                    { text: prompt }
                ]
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setGeneratedImg(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20 font-sans">
      {/* Header Tático - Universo Dark Theme */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/[0.05] pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-4 transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] group">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Mission Control
          </button>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-black border border-zinc-700/50 rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(113,113,122,0.2)]">
                <Building2 size={24} className="text-white/40" />
             </div>
             <div>
                <h1 className="text-4xl md:text-5xl font-heading font-light text-white tracking-tighter uppercase">
                    WINF <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-950">SELECT™ PRO</span>
                </h1>
                <p className="text-white/40 text-xs mt-1 font-mono uppercase tracking-[0.2em]">Architectural Intelligence Unit // Level 4 Access</p>
             </div>
          </div>
        </div>
        
        {/* Navigation Pod */}
        <div className="flex bg-[#050505] border border-white/10 p-1.5 rounded-none shadow-2xl backdrop-blur-md">
           {[
               { id: 'survey', label: 'Medição', icon: Maximize2 },
               { id: 'roi', label: 'ROI Engine', icon: DollarSign },
               { id: 'vision', label: 'Visão AI', icon: Wand2 },
               { id: 'proposal', label: 'Relatório', icon: FileSpreadsheet },
               { id: 'orders', label: 'Pedidos', icon: Share2 }
           ].map((tab) => (
               <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`px-6 py-3 text-xs md:text-[10px] font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-2 ${
                    activeTab === tab.id 
                    ? 'bg-zinc-800 text-white shadow-[0_0_20px_rgba(113,113,122,0.4)] border border-zinc-700/50' 
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
               >
                   <tab.icon size={12} /> {tab.label}
               </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo: Ferramenta Ativa */}
        <div className="lg:col-span-8 space-y-6">
            
            {activeTab === 'orders' && (
                <div className="bg-[#080808] border border-white/10 rounded-none p-5 md:p-8 space-y-8 animate-fade-in shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/5 rounded-none blur-[100px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-800/20 rounded-none flex items-center justify-center border border-zinc-700/30">
                                <Share2 size={20} className="text-white/40" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">CENTRAL DE PEDIDOS & GARANTIA</h3>
                                <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-mono">Architect Exclusive Access</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-zinc-800/10 border border-zinc-700/30 rounded-none text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest">
                            Status: Autenticado
                        </div>
                    </div>

                    {/* Tabela de Preços Especiais */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                            <TrendingUp size={14} /> TABELA DE PREÇOS & LUCRATIVIDADE
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {archProducts.slice(0, 3).map((p) => {
                                const pClientPrice = p.price || 450;
                                const pArchitectCost = (p as any).cost_architect || Math.floor(pClientPrice * 0.4);
                                return (
                                <div key={p.id} className="p-6 bg-[#020202] border border-white/5 rounded-none hover:border-zinc-700/30 transition-all group">
                                    <p className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 truncate" title={p.name}>{p.name}</p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-gray-600 uppercase font-bold">Custo Arquiteto</span>
                                            <span className="text-sm font-mono text-white font-bold">R$ {pArchitectCost}/m²</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-gray-600 uppercase font-bold">Preço Sugerido</span>
                                            <span className="text-sm font-mono text-white/40">R$ {pClientPrice}/m²</span>
                                        </div>
                                        <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold">Sua Margem</span>
                                            <span className="text-lg font-mono text-white font-black">R$ {pClientPrice - pArchitectCost}/m²</span>
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {/* Resumo do Pedido Atual */}
                    <div className="bg-[#020202] border border-white/5 rounded-none p-5 md:p-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest">RESUMO DO PROJETO</h4>
                            <span className="text-xs md:text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Área Total: {totalM2.toFixed(2)} m²</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="p-4 bg-zinc-800/10 rounded-none border border-zinc-700/20">
                                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-500 uppercase font-bold mb-1">Investimento Total (Cliente)</p>
                                    <p className="text-3xl font-mono text-white font-black">R$ {(totalM2 * clientPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-none border border-white/10">
                                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-1">Seu Retorno Estimado</p>
                                    <p className="text-3xl font-mono text-white/40 font-black">R$ {(totalM2 * (clientPrice - architectCost)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    onClick={() => alert('Pedido enviado para a Central Winf™. Nossa IA está selecionando o instalador certificado mais próximo para o seu projeto.')}
                                    className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-none hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-3"
                                >
                                    <Share2 size={16} /> Enviar para Central Winf™
                                </button>
                                <button 
                                    onClick={() => alert('Certificado de Garantia Vitalícia Winf™ gerado e vinculado ao projeto.')}
                                    className="w-full py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-none hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                                >
                                    <ShieldCheck size={16} /> Gerar Garantia Vitalícia
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-none flex items-start gap-4">
                            <Info size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                            <p className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                                Ao enviar para a central, nosso sistema processa os dados técnicos e encaminha para o instalador Master mais apropriado para a sua região, garantindo a execução perfeita do projeto.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'survey' && (
                <div className="bg-[#080808] border border-white/10 rounded-none p-5 md:p-8 space-y-8 animate-fade-in shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/10 rounded-none blur-[80px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Maximize2 size={20} className="text-white/40" /> 
                            LEVANTAMENTO TÉCNICO
                        </h3>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest font-mono">Grid System Active</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end bg-[#020202] p-6 rounded-none border border-white/5 shadow-inner">
                        <div className="space-y-2">
                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider">Largura (m)</label>
                            <input type="number" value={newPane.width || ''} onChange={e => setNewPane({...newPane, width: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-sm focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700/50 outline-none transition-all font-mono" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider">Altura (m)</label>
                            <input type="number" value={newPane.height || ''} onChange={e => setNewPane({...newPane, height: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-sm focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700/50 outline-none transition-all font-mono" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider">Qtd</label>
                            <input type="number" value={newPane.qty || ''} onChange={e => setNewPane({...newPane, qty: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-sm focus:border-zinc-700 outline-none font-mono" />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider">Substrato</label>
                            <select value={newPane.type} onChange={e => setNewPane({...newPane, type: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-xs h-[46px] focus:border-zinc-700 outline-none cursor-pointer">
                                <option>Vidro Simples</option>
                                <option>Laminado</option>
                                <option>Temperado</option>
                                <option>Duplo Insulado</option>
                            </select>
                        </div>
                        <button onClick={addPane} className="bg-white text-black font-bold h-[46px] rounded-none hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <Plus size={16} /> ADD
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                        {panes.length === 0 && (
                            <div className="text-center py-6 md:py-10 opacity-30 border-2 border-dashed border-white/10 rounded-none">
                                <Layers size={48} className="mx-auto mb-4" />
                                <p className="text-xs uppercase font-bold tracking-widest">Nenhuma superfície mapeada</p>
                            </div>
                        )}
                        {panes.map(p => (
                            <div key={p.id} className="flex justify-between items-center p-4 bg-black border border-white/[0.05] rounded-none hover:border-zinc-700/50 hover:bg-zinc-800/10 transition-all group">
                                <div className="flex gap-6 items-center">
                                    <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 rounded-none font-mono shadow-inner">{p.qty}x</div>
                                    <div>
                                        <p className="text-sm text-white font-bold font-mono">{p.width}m x {p.height}m</p>
                                        <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">{p.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-mono text-white font-bold">{(p.width * p.height * p.qty).toFixed(2)} m²</span>
                                    <button onClick={() => removePane(p.id)} className="p-2 rounded-none hover:bg-zinc-800/20 text-gray-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'roi' && (
                <div className="bg-[#080808] border border-white/10 rounded-none p-5 md:p-8 space-y-8 animate-fade-in shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950"></div>
                    <div className="absolute top-0 right-0 p-40 bg-zinc-800/5 rounded-none blur-[120px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <DollarSign size={20} className="text-white/40" /> SELECT™ ROI ENGINE
                        </h3>
                        <div className="px-4 py-1.5 bg-zinc-800/20 rounded-none text-white/40 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] border border-zinc-700/30 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-zinc-800 rounded-none animate-pulse"></div> Live Calculation
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Inputs Técnicos */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="p-6 bg-[#020202] rounded-none border border-white/5 space-y-5 shadow-inner">
                                <div>
                                    <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 block flex items-center gap-1">Película Selecionada <Info size={10}/></label>
                                    <select value={selectedFilmId} onChange={e => setSelectedFilmId(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-xs focus:border-zinc-700 outline-none appearance-none">
                                        {archProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 block">Capacidade Ar (BTUs)</label>
                                    <select value={acBTUs} onChange={e => setAcBTUs(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-xs focus:border-zinc-700 outline-none appearance-none">
                                        <option value="9000">9.000 BTUs</option>
                                        <option value="12000">12.000 BTUs</option>
                                        <option value="18000">18.000 BTUs</option>
                                        <option value="30000">30.000 BTUs+</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 block">Uso Diário</label>
                                    <div className="flex items-center gap-3">
                                        <input type="range" min="1" max="24" value={acUsageHours} onChange={e => setAcUsageHours(e.target.value)} className="w-full accent-zinc-400 h-1 bg-gray-800 rounded-none appearance-none cursor-pointer" />
                                        <span className="text-xs text-white/40 font-bold font-mono w-16 text-right">{acUsageHours}h</span>
                                    </div>
                                </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 block">kWh (R$)</label>
                                            <input type="number" step="0.01" value={kwhCost || ''} onChange={e => setKwhCost(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-xs focus:border-zinc-700 outline-none font-mono" />
                                        </div>
                                        <div>
                                            <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 block">Invest. (R$)</label>
                                            <input type="number" value={projectCost || ''} onChange={e => setProjectCost(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 p-3 rounded-none text-white text-xs focus:border-zinc-700 outline-none font-mono" />
                                        </div>
                                    </div>
                            </div>
                        </div>

                        {/* Gráfico e Resultados */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-[#020202] rounded-none border border-white/5 p-6 min-h-[300px] flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>
                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Projeção Acumulada (24 Meses)</h4>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold"><div className="w-2 h-2 bg-zinc-800 rounded-none shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div> Savings</div>
                                        <div className="flex items-center gap-2 text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold"><div className="w-2 h-2 bg-gray-600 rounded-none"></div> Break-even</div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={roiData.chartData}>
                                            <defs>
                                                <linearGradient id="colorSaving" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                            <XAxis dataKey="name" stroke="#444" tick={{fontSize: 9, fill: '#666'}} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#444" tick={{fontSize: 9, fill: '#666'}} axisLine={false} tickLine={false} />
                                            <Tooltip 
                                                contentStyle={{backgroundColor: '#050505', border: '1px solid #333', fontSize: '10px', color: '#fff'}}
                                                itemStyle={{color: '#ffffff'}}
                                            />
                                            <Area type="monotone" dataKey="saving" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorSaving)" />
                                            <Area type="step" dataKey="cost" stroke="#4B5563" strokeWidth={1} fill="transparent" strokeDasharray="4 4" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    <div className="p-4 bg-zinc-800/10 border border-zinc-700/20 rounded-none">
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-1 tracking-wider">Payback Estimado</p>
                                        <p className="text-2xl text-white font-bold font-mono">{roiData.monthsToPay.toFixed(1)} <span className="text-xs text-white/40 font-sans font-normal">meses</span></p>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-none">
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-1 tracking-wider">Economia Mensal</p>
                                        <p className="text-2xl text-white/40 font-bold font-mono">R$ {roiData.monthlySavings.toFixed(2)}</p>
                                    </div>
                                    <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-none col-span-2">
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-500 uppercase font-bold mb-1 tracking-wider">Lucratividade do Especificador (Estimada)</p>
                                        <p className="text-xl font-mono text-white font-black">R$ {(totalM2 * (clientPrice - architectCost)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-zinc-800/20 to-black p-5 rounded-none border-l-4 border-zinc-700 flex items-start gap-4">
                                <Lightbulb className="text-white/40 shrink-0" size={24} />
                                <div>
                                    <p className="text-white font-bold text-sm mb-1 uppercase tracking-wide">NeuroArgument™</p>
                                    <p className="text-xs text-white/40 leading-relaxed font-light">
                                        Ao investir na tecnologia <strong>{selectedFilmName}</strong>, o retorno total ocorre em apenas <strong>{roiData.monthsToPay.toFixed(0)} meses</strong>. Após esse período, o sistema gera lucro líquido mensal de <strong>R$ {roiData.monthlySavings.toFixed(2)}</strong> em eficiência energética pura.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'vision' && (
                <div className="bg-[#080808] border border-white/10 rounded-none p-5 md:p-8 space-y-8 animate-fade-in shadow-2xl relative">
                    <div className="text-center space-y-4 mb-8">
                        <div className="w-16 h-16 mx-auto bg-zinc-800/10 rounded-none border border-zinc-700/30 flex items-center justify-center shadow-[0_0_30px_rgba(113,113,122,0.2)]">
                            <Wand2 size={32} className="text-white/40" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-heading font-light text-white tracking-tight">ARCHITECTURAL <span className="font-bold text-white/40">SIMULATOR</span></h3>
                            <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-2">Neural Vision Rendering // Winf Dark</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div 
                            className={`aspect-video bg-[#020202] border-2 border-dashed ${facadeImg ? 'border-zinc-700/50' : 'border-white/10'} rounded-none flex flex-col items-center justify-center cursor-pointer hover:border-zinc-700/50 hover:bg-zinc-800/5 transition-all overflow-hidden relative group`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {facadeImg ? (
                                <img src={facadeImg} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 rounded-none bg-white/5 group-hover:bg-zinc-800/20 transition-colors">
                                        <Camera size={32} className="text-gray-600 group-hover:text-white/40" />
                                    </div>
                                    <span className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Carregar Fachada</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if(file) {
                                    const reader = new FileReader();
                                    reader.onload = () => setFacadeImg(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </div>

                        <div className="aspect-video bg-[#020202] rounded-none border border-white/10 flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
                             {isSimulating ? (
                                 <div className="text-center space-y-4">
                                     <Loader size={40} className="animate-spin text-white/40 mx-auto" />
                                     <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase animate-pulse tracking-[0.3em]">Renderizando Matriz...</p>
                                 </div>
                             ) : generatedImg ? (
                                 <img src={generatedImg} className="w-full h-full object-cover animate-fade-in" />
                             ) : (
                                 <div className="text-center opacity-20">
                                     <Layers size={48} className="mx-auto mb-2 text-white" />
                                     <p className="text-xs md:text-[10px] uppercase font-bold tracking-[0.3em] text-white">Output Visual</p>
                                 </div>
                             )}
                             {/* Scanline Effect */}
                             {isSimulating && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(113,113,122,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>}
                        </div>
                    </div>

                    <button 
                        onClick={handleSimulateSelect}
                        disabled={!facadeImg || isSimulating}
                        className="w-full py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.3em] rounded-none flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 hover:bg-zinc-800 hover:text-white transition-all duration-300"
                    >
                        {isSimulating ? 'PROCESSANDO...' : 'SIMULAR WINF SELECT™'}
                    </button>
                </div>
            )}

            {activeTab === 'proposal' && (
                <div className="bg-[#080808] border border-white/10 rounded-none p-6 md:p-10 animate-fade-in flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950"></div>
                    
                    <div className="w-24 h-24 bg-zinc-800/10 border border-zinc-700/30 rounded-none flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(113,113,122,0.15)]">
                        <CheckCircle size={48} className="text-white/40" />
                    </div>
                    <h2 className="text-4xl font-heading font-light text-white mb-2 tracking-tighter">RELATÓRIO <span className="font-bold text-white/40">CONFIDENCIAL</span></h2>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-10">
                        Protocolo de Proposta Gerado em {new Date().toLocaleDateString()}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-12">
                        <div className="p-6 bg-[#020202] border border-white/5 rounded-none text-center hover:border-zinc-700/30 transition-all group">
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider mb-2 group-hover:text-white/40">Total Área</p>
                            <p className="text-2xl font-mono text-white font-bold">{totalM2.toFixed(2)}<span className="text-sm text-gray-600 ml-1">m²</span></p>
                        </div>
                        <div className="p-6 bg-[#020202] border border-white/5 rounded-none text-center hover:border-zinc-700/30 transition-all group">
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider mb-2 group-hover:text-white/40">Payback</p>
                            <p className="text-2xl font-mono text-white/40 font-bold">{roiData.monthsToPay.toFixed(1)}<span className="text-sm text-gray-600 ml-1">m</span></p>
                        </div>
                        <div className="p-6 bg-[#020202] border border-white/5 rounded-none text-center hover:border-zinc-700/30 transition-all group">
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-wider mb-2 group-hover:text-white/40">Economia/Ano</p>
                            <p className="text-2xl font-mono text-white font-bold">R$ {(roiData.monthlySavings * 12).toFixed(0)}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setShowDossier(true)}
                        className="bg-zinc-800 text-white px-12 py-4 rounded-none font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-zinc-700 transition-all shadow-lg shadow-zinc-800/30"
                    >
                        <FileSpreadsheet size={16} /> Gerar Dossiê Técnico
                    </button>
                </div>
            )}

        </div>

        {/* Dossier Modal */}
        <AnimatePresence>
            {showDossier && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDossier(false)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white text-black rounded-none overflow-hidden flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                    >
                        {/* Dossier Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl rounded-none">W</div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tighter">Dossiê de Performance Energética</h2>
                                    <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest">Winf Select™ Architectural Intelligence</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-3 hover:bg-gray-200 rounded-none transition-colors text-white/40" title="Imprimir">
                                    <Printer size={20} />
                                </button>
                                <button className="p-3 hover:bg-gray-200 rounded-none transition-colors text-white/40" title="Compartilhar">
                                    <Share2 size={20} />
                                </button>
                                <button onClick={() => setShowDossier(false)} className="p-3 hover:bg-gray-200 rounded-none transition-colors text-white/40">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Dossier Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-16 custom-scrollbar-light">
                            {/* Cover Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] md:text-[8px] font-black uppercase tracking-[0.3em]">Relatório Técnico #8829-X</div>
                                        <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                                            Eficiência <br /> <span className="text-white/60">Molecular.</span>
                                        </h1>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-black pl-6">
                                            <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Cliente / Projeto</p>
                                            <input 
                                                value={projectName} 
                                                onChange={e => setProjectName(e.target.value)}
                                                placeholder="NOME DO PROJETO"
                                                className="text-2xl font-black uppercase tracking-tighter w-full border-none focus:ring-0 p-0 placeholder:text-white/80"
                                            />
                                        </div>
                                        <div className="border-l-4 border-gray-200 pl-6">
                                            <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Responsável Técnico</p>
                                            <p className="text-xl font-bold uppercase tracking-tight">Winf Authorized Partner</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded-none overflow-hidden relative">
                                    {generatedImg ? (
                                        <img src={generatedImg} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/60">
                                            <Building2 size={64} />
                                            <p className="text-xs md:text-[10px] font-bold uppercase tracking-widest mt-4">Simulação Visual Indisponível</p>
                                        </div>
                                    )}
                                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-none border border-white/20 shadow-xl">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] md:text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Tecnologia Aplicada</p>
                                                <p className="text-xs font-black uppercase tracking-tight">{selectedFilmName}</p>
                                            </div>
                                            <ShieldCheck className="text-black" size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { label: 'Área Total', value: `${totalM2.toFixed(2)}m²`, icon: Maximize2 },
                                    { label: 'Economia Mensal', value: `R$ ${roiData.monthlySavings.toFixed(2)}`, icon: DollarSign },
                                    { label: 'Payback', value: `${roiData.monthsToPay.toFixed(1)} Meses`, icon: Clock },
                                    { label: 'Redução Temp.', value: '-12°C', icon: Thermometer }
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-none border border-gray-100">
                                        <stat.icon size={18} className="text-white/40 mb-4" />
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-xl font-black font-mono">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Technical Specs */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                    <Layers size={24} /> Especificações de Performance
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Rejeição de Calor (IR)</span>
                                            <span className="text-lg font-black font-mono">99%</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Bloqueio UV</span>
                                            <span className="text-lg font-black font-mono">99.9%</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Redução de Brilho</span>
                                            <span className="text-lg font-black font-mono">65%</span>
                                        </div>
                                    </div>
                                    <div className="bg-black p-5 md:p-8 rounded-none text-white space-y-4">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Certificação Winf™</h4>
                                        <p className="text-xs leading-relaxed font-light opacity-70">
                                            Este projeto utiliza a tecnologia Winf Select™, garantindo a máxima eficiência energética disponível no mercado global. O material possui garantia vitalícia contra desbotamento e descolamento, assegurada pelo Winf OS™ Blockchain.
                                        </p>
                                        <div className="pt-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center">
                                                <Hexagon size={20} className="text-white" />
                                            </div>
                                            <span className="text-xs md:text-[10px] font-bold uppercase tracking-widest">Selo de Autenticidade Digital</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dossier Footer */}
                        <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-[0.4em]">WINF ARCHITECTURAL INTELLIGENCE UNIT</p>
                            <button className="bg-black text-white px-8 py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all">
                                <Download size={14} /> Baixar Versão Final
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Sidebar: Tactical Field Data */}
        <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-zinc-700/30 p-5 md:p-8 rounded-none relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-16 bg-zinc-800/10 rounded-none blur-[60px] group-hover:bg-zinc-800/20 transition-colors"></div>
                <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                    Survey Data <Building2 size={16} className="text-white/40" />
                </h3>
                
                <div className="space-y-8 relative z-10">
                    <div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Área Total Mapeada</p>
                        <div className="text-6xl font-mono font-light text-white tabular-nums tracking-tighter">{totalM2.toFixed(0)}<span className="text-lg text-white/40 font-bold ml-1">m²</span></div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-3 tracking-widest">Performance Térmica Estimada</p>
                        <div className="flex items-center gap-3 text-white/40">
                            <Thermometer size={18} />
                            <span className="text-xl font-bold font-mono">-12°C</span>
                            <span className="text-xs text-white/40">redução interna</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#080808] border border-white/10 p-5 md:p-8 rounded-none space-y-8 shadow-xl">
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-white/40" /> Efficiency Matrix
                </h4>
                <div className="space-y-4">
                    <div className="p-5 bg-black rounded-none border-l-2 border-zinc-700">
                       <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 tracking-wider">Redução Energética</p>
                       <p className="text-sm text-white/60 font-light leading-relaxed">
                         O sistema projeta uma queda de <strong>35% a 45%</strong> no consumo de HVAC da edificação.
                       </p>
                    </div>
                    <div className="p-5 bg-black rounded-none border-l-2 border-zinc-700">
                       <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase font-bold mb-2 tracking-wider">Bloqueio UV Total</p>
                       <p className="text-sm text-white/60 font-light leading-relaxed">
                         Blindagem de 99.9% contra raios nocivos, preservando o interior do ativo.
                       </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#080808] border border-white/10 p-5 md:p-8 rounded-none shadow-xl">
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <CheckCircle size={16} className="text-gray-600" /> Field Checklist
                </h4>
                <ul className="space-y-4">
                    {['Aferição de Vidros', 'Mapeamento de Sombras', 'Verificação de AC (BTU)', 'Stress Térmico UV'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs md:text-[10px] text-white/40 uppercase font-bold tracking-widest group cursor-default">
                            <div className="w-4 h-4 rounded-none border border-white/20 flex items-center justify-center group-hover:border-zinc-700 group-hover:bg-zinc-800/20 transition-all">
                                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div> 
                            <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ModuleArchitecturalPro;
