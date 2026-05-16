import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Search, 
  ArrowRight, 
  ChevronLeft, 
  MessageSquare, 
  Package,
  Check,
  X,
  Printer,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';

interface PublicPortalProps {
  onBack: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToCatalog?: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onBack, onNavigateToLogin, onNavigateToCatalog }) => {
  const { fetchWarrantyBySerialNumber, quotes } = useWinf();
  const [activeTab, setActiveTab] = useState<'warranty' | 'quote' | 'support'>('warranty');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (activeTab === 'warranty') {
        const warranty = await fetchWarrantyBySerialNumber(searchValue);
        if (warranty) {
          setResult(warranty);
        } else {
          setError('Garantia não encontrada. Verifique o número de série.');
        }
      } else if (activeTab === 'quote') {
        // In a real app, this would be a fetchQuoteById
        const quote = quotes.find(q => q.id === searchValue || q.id?.substring(0, 8).toUpperCase() === searchValue.toUpperCase());
        if (quote) {
          setResult(quote);
        } else {
          setError('Orçamento não encontrado. Verifique o código REF.');
        }
      }
    } catch (e) {
      setError('Erro ao processar solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      {/* Header - System Command Bar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-[80] transition-all duration-500">
        <div className="relative w-full border border-white/5 rounded-none bg-black/40 backdrop-blur-2xl h-16 md:h-20 flex items-center px-6 md:px-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="relative w-full flex justify-between items-center z-10">
            <div className="flex items-center gap-4 md:gap-8">
              <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-none">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <span className="font-black tracking-tighter text-lg md:text-xl uppercase italic">WINF™</span>
                  <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded-none border border-zinc-800 bg-white/5">
                    <div className="w-1 h-1 bg-white/40 rounded-none"></div>
                    <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">Portal Cliente</span>
                  </div>
              </div>
            </div>

            <button 
              onClick={() => window.open('https://wa.me/5513999191510', '_blank')} 
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all shadow-xl"
            >
              <MessageSquare size={14} /> Suporte Técnico
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-6 md:py-10 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 uppercase italic">ACESSO AO ECOSSISTEMA</h1>
          <p className="text-white/40 text-xs md:text-lg max-w-2xl mx-auto font-light">
            Consulte suas garantias vitalícias, visualize orçamentos técnicos ou entre em contato com nosso suporte especializado.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
          {[
            { id: 'warranty', label: 'Consultar Garantia', icon: ShieldCheck },
            { id: 'quote', label: 'Ver Orçamento', icon: FileText },
            { id: 'support', label: 'Suporte Técnico', icon: MessageSquare },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setResult(null); setError(null); setSearchValue(''); }}
              className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon size={14} className="md:w-4 md:h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Area */}
        <AnimatePresence mode="wait">
          {activeTab !== 'support' ? (
            <motion.div 
              key="search"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-winf-primary/20 to-white/10 rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-winf-card border border-white/10 rounded-none overflow-hidden">
                  <div className="flex items-center flex-1">
                    <div className="pl-6 text-white/40"><Search size={18} /></div>
                    <input 
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      placeholder={activeTab === 'warranty' ? "Número de Série" : "Código REF"}
                      className="flex-1 bg-transparent py-5 md:py-6 px-4 text-white outline-none font-mono text-xs md:text-sm uppercase placeholder:text-gray-700"
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-white text-black px-8 py-4 md:py-6 font-black text-xs md:text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processando...' : 'Consultar'}
                  </button>
                </div>
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold uppercase tracking-widest mt-4 text-center">
                  {error}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="support"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-winf-card border border-white/10 p-5 md:p-8 rounded-none hover:border-winf-primary/30 transition-all group">
                <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Direct</h3>
                <p className="text-white/40 text-sm mb-6">Fale agora com um especialista técnico para tirar dúvidas sobre seu projeto.</p>
                <button onClick={() => window.open('https://wa.me/5513999191510', '_blank')} className="w-full py-4 bg-white text-black rounded-none font-black text-xs md:text-[10px] uppercase tracking-widest hover:bg-white transition-all">Iniciar Conversa</button>
              </div>
              <div className="bg-winf-card border border-white/10 p-5 md:p-8 rounded-none hover:border-winf-primary/30 transition-all group">
                <div className="w-12 h-12 bg-white/5 rounded-none flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Catálogo de Ativos</h3>
                <p className="text-white/40 text-sm mb-6">Conheça as especificações técnicas de todas as nossas células de blindagem.</p>
                <button onClick={onNavigateToCatalog} className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-none font-black text-xs md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Ver Catálogo</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Area */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16"
            >
              {activeTab === 'warranty' ? (
                <div className="bg-white text-black rounded-none md:rounded-none p-6 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-none -mr-32 -mt-32 z-0"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-8 md:mb-12">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="text-white md:w-6 md:h-6" size={20} />
                          <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-[0.3em]">Certificado de Autenticidade</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic">GARANTIA ATIVA</h2>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Número de Série</p>
                        <p className="font-mono font-bold text-base md:text-lg">{result.serialNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                      <div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 md:mb-2">Titular</p>
                        <p className="font-bold text-sm md:text-base">{result.customerName}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 md:mb-2">Tecnologia Aplicada</p>
                        <p className="font-bold text-sm md:text-base">{result.productLine}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 md:mb-2">Data de Instalação</p>
                        <p className="font-bold text-sm md:text-base">{new Date(result.purchaseDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 md:p-6 rounded-none border border-gray-100 mb-8">
                      <div className="flex items-center gap-3 text-green-600 mb-2">
                        <Check size={18} className="md:w-5 md:h-5" />
                        <span className="font-bold text-xs md:text-sm">Status: Verificado & Autêntico</span>
                      </div>
                      <p className="text-xs md:text-[10px] md:text-xs text-white/40 leading-relaxed">
                        Este certificado confirma que seu veículo/imóvel está protegido com tecnologia original Winf™ PARTNERS. 
                        Sua garantia vitalícia cobre desbotamento, bolhas e descolamento conforme os termos de serviço.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button className="flex-1 min-w-[200px] bg-black text-white py-4 rounded-none font-bold uppercase tracking-widest text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                        <Printer size={16} /> Baixar Certificado
                      </button>
                      <button className="flex-1 min-w-[200px] bg-zinc-100 text-black py-4 rounded-none font-bold uppercase tracking-widest text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                        <Share2 size={16} /> Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-winf-card border border-white/10 rounded-none md:rounded-none p-6 md:p-12">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-8 md:mb-12">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic mb-2">ORÇAMENTO TÉCNICO</h2>
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest">REF: {result.id?.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-none text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-black uppercase tracking-widest ${result.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {result.status === 'Approved' ? 'Aprovado' : 'Em Análise'}
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                    {result.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-3 md:py-4 border-b border-white/5">
                        <div className="max-w-[70%]">
                          <p className="font-bold text-xs md:text-sm">{item.description}</p>
                          <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Qtd: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm md:text-base">R$ {(item.quantity * item.unitPrice).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-end gap-1 md:gap-2 mb-10 md:mb-12">
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] md:text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest">Valor Total do Investimento</p>
                    <p className="text-3xl md:text-4xl font-black text-white">R$ {result.totalAmount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    {result.installments > 1 && (
                      <p className="text-xs md:text-sm text-white/40">Ou {result.installments}x de R$ {result.installmentValue?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => window.open('https://wa.me/5513999191510', '_blank')} className="flex-1 bg-white text-black py-4 rounded-none font-bold uppercase tracking-widest text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-white transition-all">
                      Aprovar via WhatsApp
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-none font-bold uppercase tracking-widest text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                      <Printer size={16} /> Imprimir
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <p className="text-xs md:text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em]">WINF™ ENGINEERING // PROTEÇÃO MOLECULAR</p>
          <button 
            onClick={onNavigateToLogin} 
            className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-gray-700 uppercase tracking-widest hover:text-white transition-colors"
          >
            Área Restrita: Login do Parceiro
          </button>
        </div>
      </footer>
    </div>
  );
};
