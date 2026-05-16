import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { WINF_CONSTANTS } from '../constants';
import { Eye, Building2, ArrowLeftRight } from 'lucide-react';

const FilmVisualizer = ({ fullHeight = false, isKiosk = false }: { fullHeight?: boolean, isKiosk?: boolean }) => {
  const { products } = useWinf();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [viewMode, setViewMode] = useState<'inside' | 'outside'>('inside');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  const getImageUrl = () => {
    if (viewMode === 'inside') return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070';
    return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070';
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className={`${isKiosk ? '' : 'p-8 md:p-12 bg-[#0A0A0A] border border-white/10 rounded-none'} flex flex-col ${fullHeight ? 'h-full' : ''}`}>
      {!isKiosk && <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-10 shrink-0">Visualizador de Performance</h2>}
      
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0`}>
        <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
          <select 
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-3 text-sm text-white"
          >
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          {selectedProduct && (
            <div className="bg-[#050505] p-4 rounded-none border border-white/10 space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40">Performance IR</span>
                 <span className="text-sm font-black text-white">{selectedProduct.tech_specs?.irr || '--'}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40">Bloqueio UV</span>
                 <span className="text-sm font-black text-white">{selectedProduct.tech_specs?.uvr || '--'}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40">Transparência</span>
                 <span className="text-sm font-black text-white">{selectedProduct.tech_specs?.vlt || '--'}</span>
               </div>
            </div>
          )}

          <div className="flex gap-2 p-1 bg-[#050505] rounded-none border border-white/10">
            <button onClick={() => setViewMode('inside')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none text-xs md:text-[10px] font-bold uppercase tracking-widest ${viewMode === 'inside' ? 'bg-winf-text_primary text-winf-background' : 'text-white/40'}`}>
              <Eye size={14} /> Interior
            </button>
            <button onClick={() => setViewMode('outside')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none text-xs md:text-[10px] font-bold uppercase tracking-widest ${viewMode === 'outside' ? 'bg-winf-text_primary text-winf-background' : 'text-white/40'}`}>
              <Building2 size={14} /> Fachada
            </button>
          </div>
        </div>

        <div 
          className={`lg:col-span-3 relative ${fullHeight ? 'h-full min-h-[400px]' : 'h-[300px] md:h-[400px]'} rounded-none overflow-hidden border border-white/10 cursor-ew-resize select-none`}
          ref={containerRef}
          onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          onTouchMove={handleTouchMove}
        >
          {/* Base Image (Sem Proteção) */}
          <img src={getImageUrl()} alt="Sem Proteção" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          
          {/* Overlay Image (Com WINF) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img src={getImageUrl()} alt="Com Proteção" className="absolute inset-0 w-[100vw] max-w-none h-full object-cover" style={{ width: containerRef.current?.offsetWidth || '100%' }} />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </div>
          
          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-black cursor-ew-resize flex items-center justify-center"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center shadow-lg transform -translate-x-1/2">
              <ArrowLeftRight size={16} className="text-winf-background" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest text-white pointer-events-none">
            {selectedProduct?.name || 'WINF™'}
          </div>
          <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest text-white pointer-events-none">
            Vidro Comum
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmVisualizer;
