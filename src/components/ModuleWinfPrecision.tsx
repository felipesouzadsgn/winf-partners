
import React, { useState, useEffect } from 'react';
import { Scissors, Ruler, Package, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Layers, Layout, Plus, Trash2, Copy, ChevronLeft } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowPane {
    id: string;
    width: number; // in meters
    height: number; // in meters
    quantity: number;
    label: string;
}

const PREDEFINED_PATTERNS = [
    { label: 'Porta Padrão', width: 0.80, height: 2.10 },
    { label: 'Porta Grande', width: 1.00, height: 2.10 },
    { label: 'Janela Quarto', width: 1.20, height: 1.00 },
    { label: 'Janela Sala', width: 1.50, height: 1.20 },
    { label: 'Basculante Banheiro', width: 0.60, height: 0.60 },
    { label: 'Vidro Fixo Lateral', width: 0.40, height: 2.10 },
];

interface ModuleWinfPrecisionProps {
    onBack?: () => void;
}

const ModuleWinfPrecision: React.FC<ModuleWinfPrecisionProps> = ({ onBack }) => {
    const { stockItems, updateStock, gamify, user, products } = useWinf();
    const [panes, setPanes] = useState<WindowPane[]>([]);
    const [newPane, setNewPane] = useState({ width: '', height: '', quantity: '1', label: '' });
    const [bulkInput, setBulkInput] = useState('');
    const [showBulkInput, setShowBulkInput] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedStockId, setSelectedStockId] = useState('');
    const [customRollWidth, setCustomRollWidth] = useState(1.52);
    const [calculation, setCalculation] = useState<{
        totalLinearMeters: number;
        totalArea: number;
        wastePercentage: number;
        efficiency: number;
        layout: any[];
    } | null>(null);

    const activeProduct = products.find(p => p.id === selectedProductId);
    const rollWidth = activeProduct?.available_widths?.[0] || customRollWidth;

    const addPane = (customPane?: { width: number, height: number, label: string }) => {
        const width = customPane ? customPane.width : parseFloat(newPane.width);
        const height = customPane ? customPane.height : parseFloat(newPane.height);
        const qty = customPane ? 1 : parseInt(newPane.quantity) || 1;
        const label = customPane ? customPane.label : newPane.label || `Vidro ${panes.length + 1}`;

        if (!width || !height) return;

        const pane: WindowPane = {
            id: Math.random().toString(36).substr(2, 9),
            width,
            height,
            quantity: qty,
            label
        };
        setPanes([...panes, pane]);
        if (!customPane) setNewPane({ width: '', height: '', quantity: '1', label: '' });
    };

    const removePane = (id: string) => {
        setPanes(panes.filter(p => p.id !== id));
    };

    const calculateOptimization = () => {
        if (panes.length === 0) return;

        // Flatten panes based on quantity
        const flattenedPanes: any[] = [];
        panes.forEach(p => {
            for (let i = 0; i < p.quantity; i++) {
                flattenedPanes.push({ ...p, instanceLabel: p.quantity > 1 ? `${p.label} (${i + 1})` : p.label });
            }
        });

        // Simple linear nesting algorithm for 1.52m roll
        let totalLinearMeters = 0;
        let totalArea = 0;
        const layout: any[] = [];

        // Sort panes by height (descending) to optimize linear usage
        const sortedPanes = [...flattenedPanes].sort((a, b) => b.height - a.height);

        let currentY = 0;
        let currentX = 0;
        let currentRowHeight = 0;

        sortedPanes.forEach(pane => {
            totalArea += pane.width * pane.height;

            // Check if pane fits in current row width (1.52m)
            // We add 0.02m (2cm) for safety margin
            const wWithMargin = pane.width + 0.02; 
            const hWithMargin = pane.height + 0.02;

            if (currentX + wWithMargin <= rollWidth) {
                layout.push({
                    ...pane,
                    x: currentX,
                    y: currentY,
                    w: wWithMargin,
                    h: hWithMargin
                });
                currentX += wWithMargin;
                currentRowHeight = Math.max(currentRowHeight, hWithMargin);
            } else {
                // Start new row
                currentY += currentRowHeight;
                currentX = 0;
                layout.push({
                    ...pane,
                    x: currentX,
                    y: currentY,
                    w: wWithMargin,
                    h: hWithMargin
                });
                currentX += wWithMargin;
                currentRowHeight = hWithMargin;
            }
        });

        totalLinearMeters = currentY + currentRowHeight;
        const totalRollArea = totalLinearMeters * rollWidth;
        const wasteArea = totalRollArea - totalArea;
        const wastePercentage = (wasteArea / totalRollArea) * 100;

        setCalculation({
            totalLinearMeters: parseFloat(totalLinearMeters.toFixed(2)),
            totalArea: parseFloat(totalArea.toFixed(2)),
            wastePercentage: parseFloat(wastePercentage.toFixed(1)),
            efficiency: parseFloat((100 - wastePercentage).toFixed(1)),
            layout
        });
    };

    const handleConfirmCut = async () => {
        if (!calculation || !selectedStockId) return;
        
        const res = await updateStock(selectedStockId, calculation.totalLinearMeters);
        if (res.success) {
            gamify('WARRANTY_REGISTERED', { detail: 'Otimização de Corte Winf Precision™' });
            alert(`Corte confirmado! ${calculation.totalLinearMeters}m deduzidos do estoque.`);
            setPanes([]);
            setCalculation(null);
        }
    };

    const handleBulkAdd = () => {
        const lines = bulkInput.split('\n');
        const newPanes: WindowPane[] = [];
        
        lines.forEach(line => {
            // Regex to match patterns like "1.20x1.50 Vidro 1" or "1.20 1.50 Vidro 1" or "1.20,1.50 Vidro 1"
            const match = line.match(/(\d+[.,]\d+)\s*[xX\s,]\s*(\d+[.,]\d+)\s*(.*)/);
            if (match) {
                const width = parseFloat(match[1].replace(',', '.'));
                const height = parseFloat(match[2].replace(',', '.'));
                const label = match[3].trim() || `Vidro ${panes.length + newPanes.length + 1}`;
                
                newPanes.push({
                    id: Math.random().toString(36).substr(2, 9),
                    width,
                    height,
                    quantity: 1,
                    label
                });
            }
        });

        if (newPanes.length > 0) {
            setPanes([...panes, ...newPanes]);
            setBulkInput('');
            setShowBulkInput(false);
        }
    };

    const isAdmin = user?.role === 'Admin' || user?.role === 'Licenciado';

    return (
        <div className="space-y-10 animate-fade-in pb-12 w-full text-white">
            {/* Header - Banking Style */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
                <div className="space-y-4">
                    {onBack && (
                        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                            <ChevronLeft size={14} /> Voltar ao Painel
                        </button>
                    )}
                    <div>
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                         <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                         Winf Precision
                       </div>
                       <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Módulo <span className="font-medium text-white/80">Winf Precision</span></h1>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-none flex items-center gap-2">
                        <Package size={18} className="text-white/40" />
                        <select 
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            className="bg-transparent text-xs font-bold text-white uppercase tracking-widest outline-none border-none cursor-pointer"
                        >
                            <option value="" className="bg-[#050505]">Personalizado</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id} className="bg-[#050505]">{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {!selectedProductId && (
                         <div className="bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-none flex items-center gap-2">
                            <span className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest">Largura:</span>
                            <input 
                                type="number" 
                                step="0.01" 
                                value={customRollWidth}
                                onChange={(e) => setCustomRollWidth(parseFloat(e.target.value))}
                                className="bg-transparent text-xs font-bold text-white w-16 outline-none border-none"
                            />
                            <span className="text-xs md:text-[10px] font-black text-white/40 uppercase">m</span>
                        </div>
                    )}

                    {selectedProductId && (
                        <div className="bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-none flex items-center gap-2">
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Rolo: {rollWidth}m</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                                    <Ruler size={20} className="text-white/40" /> Parâmetros do Projeto (Mapping)
                                </h3>
                                <button 
                                    onClick={() => setShowBulkInput(!showBulkInput)}
                                    className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    {showBulkInput ? 'Inserção Unitária' : 'Importação em Lote'}
                                </button>
                            </div>
                            
                            {showBulkInput ? (
                                <div className="space-y-4">
                                    <textarea 
                                        value={bulkInput}
                                        onChange={e => setBulkInput(e.target.value)}
                                        placeholder="Ex:&#10;1.20x1.50 Vidro Sala&#10;0.80x2.10 Porta Principal"
                                        className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all font-mono text-sm h-32 resize-none"
                                    />
                                    <button 
                                        onClick={handleBulkAdd}
                                        className="w-full bg-[#050505] hover:bg-[#050505]/80 text-white font-black py-4 rounded-none transition-all flex items-center justify-center gap-2 border border-white/10 uppercase tracking-widest"
                                    >
                                        Processar Lista
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest ml-1">Largura (m)</label>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                value={newPane.width} 
                                                onChange={e => setNewPane({...newPane, width: e.target.value})}
                                                className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all font-mono text-lg"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest ml-1">Altura (m)</label>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                value={newPane.height} 
                                                onChange={e => setNewPane({...newPane, height: e.target.value})}
                                                className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all font-mono text-lg"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest ml-1">Chave de Identificação</label>
                                            <input 
                                                type="text" 
                                                value={newPane.label} 
                                                onChange={e => setNewPane({...newPane, label: e.target.value})}
                                                className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all"
                                                placeholder="Ex: Face Leste 01"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest ml-1">Qtd</label>
                                            <input 
                                                type="number" 
                                                value={newPane.quantity} 
                                                onChange={e => setNewPane({...newPane, quantity: e.target.value})}
                                                className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all font-mono"
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => addPane()}
                                        className="w-full bg-white text-winf-background font-black py-4 rounded-none transition-all flex items-center justify-center gap-2 hover:bg-white_hover uppercase tracking-widest shadow-lg shadow-white/10"
                                    >
                                        <Plus size={20} /> Adicionar ao Plano
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <h4 className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Gabaritos WINF Catalogados</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {PREDEFINED_PATTERNS.map((pattern, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => addPane(pattern)}
                                        className="text-left p-3 bg-[#050505]/40 border border-white/10 rounded-none hover:border-winf-primary/30 transition-all group"
                                    >
                                        <p className="text-xs md:text-[10px] font-bold text-white group-hover:text-white truncate">{pattern.label}</p>
                                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-mono">{pattern.width}x{pattern.height}m</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/10 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            <h4 className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Lista de Recortes</h4>
                            {panes.map(pane => (
                                <div key={pane.id} className="flex justify-between items-center p-4 bg-[#050505]/40 rounded-none border border-white/10 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#0A0A0A] rounded-none flex items-center justify-center text-xs md:text-[10px] font-bold text-white/40">
                                            {pane.quantity}x
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold">{pane.label}</p>
                                            <p className="text-xs md:text-[10px] text-white/40 font-mono">{pane.width}m x {pane.height}m</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removePane(pane.id)} className="p-2 text-white/40 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {panes.length === 0 && (
                                <div className="text-center py-6 md:py-10 bg-[#050505]/20 rounded-none border border-dashed border-white/10">
                                    <p className="text-white/40 text-xs md:text-[10px] uppercase font-bold tracking-widest">Nenhum item na lista</p>
                                </div>
                            )}
                        </div>

                        {panes.length > 0 && (
                            <button 
                                onClick={calculateOptimization}
                                className="w-full bg-[#050505] border border-white/10 text-white font-black py-5 rounded-none hover:bg-[#0A0A0A] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-xl"
                            >
                                <RefreshCw size={20} /> Processar Algoritmo de Encaixe
                            </button>
                        )}
                    </div>
                </div>

                {/* Visualization Section */}
                <div className="lg:col-span-8 space-y-6">
                    {calculation ? (
                        <div className="space-y-6 animate-slide-up">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 rounded-none">
                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Linear Necessário</p>
                                    <p className="text-4xl font-black text-white">{calculation.totalLinearMeters}m</p>
                                    <p className="text-xs md:text-[10px] text-white/40 mt-3 flex items-center gap-2">
                                        <CheckCircle size={12} className="text-green-500" /> Margem de segurança inclusa
                                    </p>
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 rounded-none">
                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Eficiência</p>
                                    <p className="text-4xl font-black text-green-500">{calculation.efficiency}%</p>
                                    <div className="w-full bg-[#050505] h-2 rounded-none mt-4 overflow-hidden">
                                        <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${calculation.efficiency}%` }}></div>
                                    </div>
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 rounded-none">
                                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Desperdício</p>
                                    <p className="text-4xl font-black text-white/40">{calculation.wastePercentage}%</p>
                                    <p className="text-xs md:text-[10px] text-white/40 mt-3 uppercase font-bold tracking-widest">Retalhos para amostras</p>
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 md:p-10">
                                <div className="flex justify-between items-center mb-8">
                                    <h4 className="text-white font-black flex items-center gap-3 text-xl uppercase tracking-tighter">
                                        <Layout size={24} className="text-white/40" /> Mapa de Corte
                                    </h4>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-[#050505]/40 rounded-none text-white/40 hover:text-white transition-all"><Copy size={18} /></button>
                                        <button className="p-2 bg-[#050505]/40 rounded-none text-white/40 hover:text-white transition-all"><Layout size={18} /></button>
                                    </div>
                                </div>
                                
                                <div className="relative bg-[#050505] border border-white/10 rounded-none overflow-hidden shadow-inner" style={{ height: '500px' }}>
                                    {/* Roll Background */}
                                    <div className="absolute inset-0 opacity-5" style={{ 
                                        backgroundImage: 'linear-gradient(90deg, transparent 95%, currentColor 95%), linear-gradient(0deg, transparent 95%, currentColor 95%)',
                                        backgroundSize: '40px 40px'
                                    }}></div>

                                    {/* Layout Visualization */}
                                    <div className="relative w-full h-full overflow-auto p-5 md:p-8 custom-scrollbar">
                                        <div className="relative bg-[#0A0A0A] border-r-4 border-winf-primary/20 shadow-2xl" style={{ 
                                            width: `${rollWidth * 200}px`, 
                                            height: `${calculation.totalLinearMeters * 200}px`,
                                            minHeight: '100%'
                                        }}>
                                            {calculation.layout.map((p, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="absolute bg-[#050505]/80 border border-white/10 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm group hover:border-winf-primary/50 transition-all"
                                                    style={{
                                                        left: `${p.x * 200}px`,
                                                        top: `${p.y * 200}px`,
                                                        width: `${p.w * 200}px`,
                                                        height: `${p.h * 200}px`
                                                    }}
                                                >
                                                    <div className="text-center p-1">
                                                        <p className="text-xs md:text-[10px] text-white font-black uppercase truncate max-w-full">{p.instanceLabel}</p>
                                                        <p className="text-[10px] md:text-[8px] text-white/40 font-mono mt-0.5">{p.width}x{p.height}m</p>
                                                    </div>
                                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-none shadow-lg shadow-green-500/50"></div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col md:flex-row gap-8 items-center justify-between border-t border-white/10 pt-10">
                                    <div className="w-full md:w-80 space-y-3">
                                        <label className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-[0.2em] ml-1">Material em Estoque</label>
                                        <select 
                                            value={selectedStockId}
                                            onChange={e => setSelectedStockId(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 p-4 rounded-none text-white outline-none focus:border-winf-primary/30 transition-all appearance-none text-sm font-bold"
                                        >
                                            <option value="">Configurar Rolo Base...</option>
                                            {stockItems.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.product_name} — {item.remaining_meters}m disp.
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button 
                                        disabled={!selectedStockId}
                                        onClick={handleConfirmCut}
                                        className={`w-full md:w-auto px-16 py-5 rounded-none font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl ${selectedStockId ? 'bg-white text-winf-background hover:bg-white_hover' : 'bg-[#0A0A0A] text-white/40 cursor-not-allowed'}`}
                                    >
                                        Confirmar & Baixar Estoque <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-[#0A0A0A]/20 border border-dashed border-white/10 rounded-none">
                            <div className="w-24 h-24 bg-[#050505] rounded-none flex items-center justify-center mb-8 border border-white/10">
                                <Layout size={40} className="text-white/40/30" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">Aguardando Medidas</h3>
                            <p className="text-white/40 max-w-sm font-medium">
                                Adicione as dimensões dos vidros para que o motor <span className="text-white">Winf Precision™</span> calcule o melhor aproveitamento do seu material.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleWinfPrecision;
