import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  FileText,
  ExternalLink,
  User,
  Mail,
  ChevronLeft
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { WarrantyRegistration } from '../types';

const ModuleWarranties: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { warranties } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarranties = warranties.filter(w => 
    w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-black bg-white border border-white';
      case 'expired': return 'text-white/40 bg-zinc-900 border border-white/10';
      case 'pending': return 'text-white/70 bg-transparent border border-white/20';
      default: return 'text-white/40 bg-transparent border border-white/10';
    }
  };

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
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Certificação de Autenticidade
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Garantia <span className="font-medium text-white/80">Rastreável</span></h1>
                   <p className="text-white/40 max-w-2xl mt-4 text-sm md:text-[11px] font-bold uppercase tracking-[0.1em] leading-relaxed">O fim do achismo. Na WINF™, sua garantia é um ativo digital imutável, atrelado ao número de série da sua película. Transparência técnica de ponta a ponta.</p>
                </div>
            </div>
            {/* Nav */}
        </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="Rastrear por Número de Série, Cliente ou E-mail..."
          className="w-full bg-[#0A0A0A] border border-white/10 py-4 pl-12 pr-4 text-white text-sm md:text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredWarranties.length > 0 ? (
          filteredWarranties.map((warranty) => (
            <motion.div
              key={warranty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-6 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white/80" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light tracking-tight text-white">{warranty.customerName}</h3>
                        <p className="text-xs md:text-[10px] text-white/40 font-bold tracking-widest uppercase flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3" /> {warranty.customerEmail}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black tracking-[0.2em] uppercase ${getStatusColor(warranty.status)}`}>
                      {warranty.status === 'active' ? 'ATIVO DIGITAL VERIFICADO' : warranty.status === 'expired' ? 'EXPIRADO' : 'PENDENTE'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-black/50 border border-white/5">
                    <div className="space-y-2">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">Produto</p>
                      <p className="text-sm text-white font-medium">{warranty.productLine}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">Número de Série</p>
                      <p className="text-sm text-white font-mono tracking-wider">{warranty.serialNumber}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">Data de Emissão</p>
                      <p className="text-sm text-white">{new Date(warranty.purchaseDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold">Expiração</p>
                      <p className="text-sm text-white flex items-center gap-2">
                        <Clock className="w-3 h-3 text-white/40" />
                        {/* Assuming 10 years for demo if not specified */}
                        {new Date(new Date(warranty.purchaseDate).setFullYear(new Date(warranty.purchaseDate).getFullYear() + 10)).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col justify-center gap-3 lg:pl-6 pt-4 lg:pt-0">
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors w-full">
                    <FileText className="w-4 h-4" />
                    Abrir Certificado
                  </button>
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-[#0A0A0A] border border-white/10 text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-colors w-full">
                    <ExternalLink className="w-4 h-4" />
                    Portal do Cliente
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24 bg-[#0A0A0A] border border-dashed border-white/10">
            <Shield className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1} />
            <p className="text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest">Nenhuma garantia rastreada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleWarranties;
