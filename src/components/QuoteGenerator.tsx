import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Calculator } from 'lucide-react';

const FILM_PRICES: { [key: string]: number } = {
  'AeroCore™': 550,
  'Select™ IR-99': 450,
  'BlackPro™': 350,
};

const QuoteGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [address, setAddress] = useState('');
  const [filmType, setFilmType] = useState('AeroCore™');
  const [sqMeters, setSqMeters] = useState(0);

  const subtotal = sqMeters * (FILM_PRICES[filmType] || 0);

  const handleGeneratePdf = () => {
    console.log('Gerando PDF para:', { name, whatsapp, address, filmType, sqMeters, subtotal });
    alert('Funcionalidade de geração de PDF em breve.');
  };

  return (
    <div className="bg-[#050505] p-5 md:p-8 border border-white/10 rounded-none">
      <h2 className="text-white font-bold text-xl uppercase tracking-widest mb-8 flex items-center gap-3">
        <Calculator size={20} className="text-white/50" /> Estimador de Projeto
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <input 
          placeholder="Nome do Cliente" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="bg-white/[0.03] border border-white/10 p-4 text-white text-sm outline-none focus:border-white/30"
        />
        <input 
          placeholder="WhatsApp" 
          value={whatsapp} 
          onChange={(e) => setWhatsApp(e.target.value)}
          className="bg-white/[0.03] border border-white/10 p-4 text-white text-sm outline-none focus:border-white/30"
        />
        <input 
          placeholder="Endereço" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          className="bg-white/[0.03] border border-white/10 p-4 text-white text-sm outline-none focus:border-white/30 col-span-full"
        />
        <select 
          value={filmType}
          onChange={(e) => setFilmType(e.target.value)}
          className="bg-white/[0.03] border border-white/10 p-4 text-white text-sm outline-none focus:border-white/30"
        >
          {Object.keys(FILM_PRICES).map(film => <option key={film} value={film}>{film}</option>)}
        </select>
        <input 
          type="number"
          placeholder="Metragem Quadrada (m²)" 
          value={sqMeters || ''} 
          onChange={(e) => setSqMeters(parseFloat(e.target.value) || 0)}
          className="bg-white/[0.03] border border-white/10 p-4 text-white text-sm outline-none focus:border-white/30"
        />
      </div>

      <div className="flex justify-between items-center mb-8 border-t border-white/10 pt-8">
        <span className="text-white/50 text-sm uppercase tracking-widest">Subtotal</span>
        <span className="text-white font-bold text-2xl">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>

      <button 
        onClick={handleGeneratePdf}
        className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] py-5 hover:bg-white/90 transition-all"
      >
        <FileText size={16} /> Gerar Orçamento PDF
      </button>
    </div>
  );
};

export default QuoteGenerator;
