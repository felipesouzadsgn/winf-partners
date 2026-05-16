import React, { useState, useEffect } from 'react';
import { WINF_CONSTANTS } from '../constants';
import { FileText, Download, Printer, Plus, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

interface ArchitectSpecGeneratorProps {
  onSpecChange?: (spec: { filmId: string; area: string }) => void;
}

const ArchitectSpecGenerator: React.FC<ArchitectSpecGeneratorProps> = ({ onSpecChange }) => {
  const { paradoxAnalysis } = useWinf();
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    filmId: WINF_CONSTANTS.portfolio.lines[0].items[0].id,
    area: '',
    glassType: 'Vidro Comum (Float)',
  });

  useEffect(() => {
    if (paradoxAnalysis) {
      const suggestedFilm = WINF_CONSTANTS.portfolio.lines
        .flatMap(line => line.items)
        .find(item => item.name.includes(paradoxAnalysis.celula_sugerida) || paradoxAnalysis.celula_sugerida.includes(item.name));
      
      if (suggestedFilm) {
        setFormData(prev => ({ ...prev, filmId: suggestedFilm.id }));
      }
    }
  }, [paradoxAnalysis]);

  const [generated, setGenerated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (onSpecChange) {
      onSpecChange({ filmId: newData.filmId, area: newData.area });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    if (onSpecChange) {
      onSpecChange({ filmId: formData.filmId, area: formData.area });
    }
  };

  const generatePDF = () => {
    alert('Funcionalidade de geração de PDF em desenvolvimento.');
  };


  const selectedFilm = WINF_CONSTANTS.portfolio.lines
    .flatMap(line => line.items)
    .find(item => item.id === formData.filmId);

  return (
    <div className="p-10 bg-[#080808] border border-white/10 rounded-none shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-none blur-[100px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000"></div>
      
      <div className="flex items-center justify-between mb-10 px-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">WINF™ ARCH <span className="text-zinc-500 font-light">SPEC ENGINE</span></h2>
        <div className="w-12 h-12 bg-white/5 rounded-none flex items-center justify-center border border-white/10">
          <FileText size={20} className="text-zinc-500" />
        </div>
      </div>
      
      {!generated ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Identificação do Projeto</label>
            <input 
              name="projectName" 
              required 
              onChange={handleInputChange} 
              className="w-full bg-black border border-white/10 rounded-none px-6 py-5 text-sm text-white focus:border-white transition-all outline-none placeholder:text-zinc-800" 
              placeholder="EX: RESIDÊNCIA ALTO PADRÃO" 
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Proprietário / Titular</label>
            <input 
              name="clientName" 
              required 
              onChange={handleInputChange} 
              className="w-full bg-black border border-white/10 rounded-none px-6 py-5 text-sm text-white focus:border-white transition-all outline-none placeholder:text-zinc-800" 
              placeholder="EX: FAMÍLIA SILVA" 
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Filme de Alta Performance</label>
            <div className="relative">
              <select 
                name="filmId" 
                value={formData.filmId} 
                onChange={handleInputChange} 
                className="w-full bg-black border border-white/10 rounded-none px-6 py-5 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer"
              >
                {WINF_CONSTANTS.portfolio.lines.flatMap(line => line.items).map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <Plus size={16} />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Área de Cobertura (m²)</label>
            <input 
              name="area" 
              type="number" 
              required 
              onChange={handleInputChange} 
              className="w-full bg-black border border-white/10 rounded-none px-6 py-5 text-sm text-white focus:border-white transition-all outline-none placeholder:text-zinc-800 font-mono" 
              placeholder="EX: 150" 
            />
          </div>
          <button 
            type="submit" 
            className="col-span-full mt-6 bg-white text-black py-6 rounded-none font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.05)] active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
          >
            Sincronizar Dossiê de Performance™ <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>
      ) : (
        <div className="space-y-10">
          <div className="p-10 bg-[#050505] border border-white/10 rounded-none font-sans text-xs text-white space-y-8 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <ShieldCheck size={160} />
            </div>
            
            <div className="flex items-start justify-between border-b border-white/10 pb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white leading-none">DOSSIÊ TÉCNICO</h3>
                <p className="text-xs md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">WINF™ ARCHITECTURAL SPECIFICATION</p>
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-white/40 border border-white/5">
                Ref: #WAP-2026
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                 <div>
                   <span className="text-zinc-600 uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-widest block mb-2">Projeto Especial</span>
                   <p className="text-lg font-bold uppercase tracking-tight">{formData.projectName}</p>
                 </div>
                 <div>
                   <span className="text-zinc-600 uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-widest block mb-2">Titular da Especificação</span>
                   <p className="text-lg font-bold uppercase tracking-tight">{formData.clientName}</p>
                 </div>
               </div>
               <div className="space-y-6">
                 <div>
                   <span className="text-zinc-600 uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-widest block mb-2">Engenharia Nano-Molecular</span>
                   <p className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                     <CheckCircle size={18} className="text-zinc-500" /> {selectedFilm?.name}
                   </p>
                 </div>
                 <div>
                   <span className="text-zinc-600 uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-widest block mb-2">Cálculo de Cobertura</span>
                   <p className="text-2xl font-mono font-black">{formData.area} <span className="text-xs text-zinc-500 font-sans">m²</span></p>
                 </div>
               </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <span className="text-zinc-600 uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-widest block mb-3">Memória Descritiva de Performance:</span>
              <div className="flex flex-wrap gap-2">
                {selectedFilm?.specs?.map((spec, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-none text-xs md:text-[10px] font-bold uppercase tracking-wider text-white/40">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-700 font-bold uppercase tracking-[0.3em]">Gerado via WINF™ Neural Architecture System</p>
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-zinc-800 rounded-none"></div>)}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setGenerated(false)} 
              className="flex-1 py-5 border border-white/10 rounded-none text-white/40 font-black uppercase tracking-[0.2em] text-xs md:text-[10px] hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Nova Especificação
            </button>
            <button 
              onClick={generatePDF} 
              className="flex-2 py-5 bg-white text-black rounded-none font-black uppercase tracking-[0.3em] text-xs md:text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
            >
              <Download size={16}/> Compilar Memorial PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectSpecGenerator;
