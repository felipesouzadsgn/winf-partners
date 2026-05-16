
import React, { useEffect, useState } from 'react';
import { ChevronLeft, DollarSign, Download, Loader, Check } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const ModulePriceTable: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { products, fetchProducts } = useWinf();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const handleExport = () => {
      setIsExporting(true);
      setTimeout(() => {
          setIsExporting(false);
          setExported(true);
          // In real app, triggering window.print() or csv download here
          setTimeout(() => setExported(false), 3000);
      }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-4"><ChevronLeft size={16} /> Voltar</button>
            <h1 className="text-3xl font-light text-white">TABELA DE <span className="font-bold text-white/40">PREÇOS</span></h1>
        </div>
        <button 
            onClick={handleExport}
            disabled={isExporting || exported}
            className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-none text-xs uppercase font-bold tracking-wider hover:bg-white/10 flex items-center gap-2 transition-all"
        >
            {isExporting ? <Loader size={14} className="animate-spin" /> : exported ? <Check size={14} className="text-green-500" /> : <Download size={14} />}
            {isExporting ? 'Gerando PDF...' : exported ? 'Exportado!' : 'Exportar Tabela'}
        </button>
      </div>
      <div className="bg-winf-card border border-white/10 rounded-none overflow-hidden">
         <table className="w-full text-left text-sm text-white/60">
             <thead className="bg-white/5 text-xs uppercase text-white/40">
                 <tr><th className="p-4">Produto</th><th className="p-4">Preço</th><th className="p-4">Categoria</th></tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                 {products.map(p => (
                     <tr key={p.id} className="hover:bg-white/5">
                         <td className="p-4 font-bold text-white">{p.name}</td>
                         <td className="p-4 text-white/40 font-mono">R$ {p.price}</td>
                         <td className="p-4">{p.category}</td>
                     </tr>
                 ))}
             </tbody>
         </table>
      </div>
    </div>
  );
};
export default ModulePriceTable;
