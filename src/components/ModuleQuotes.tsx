import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Plus, 
  Trash2, 
  Printer, 
  Share2, 
  Bot, 
  Scissors,
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Box,
  TrendingDown
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { QuoteItem, ViewState } from '../types';
import { Skeleton } from './ui/LoadingSkeleton';
import QRCode from 'qrcode';
import { PDFDownloadLink } from '@react-pdf/renderer';
import QuotePDF from './QuotePDF';

const ModuleQuotes: React.FC<{onBack: () => void; onNavigate?: (view: ViewState) => void}> = ({ onBack, onNavigate }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [projectType, setProjectType] = useState<'Automotive' | 'Architecture'>('Architecture');
  const [measurements, setMeasurements] = useState('');
  const [sqMeters, setSqMeters] = useState<number>(0);
  const [pixDiscount, setPixDiscount] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('PIX');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (selectedQuote) {
        QRCode.toDataURL(`https://winf-os.app/verify/${selectedQuote.id || 'new'}`)
            .then(url => setQrCodeUrl(url))
            .catch(err => console.error(err));
    }
  }, [selectedQuote]);

  const { products, addQuote, fetchQuotes, quotes, fetchProducts, approveQuote, isLoading } = useWinf();

  useEffect(() => { fetchProducts(); }, []);

  const handleApplyMetragem = () => {
    if (sqMeters <= 0) return;
    
    // Filtra produtos de arquitetura para gerar opções
    const archProducts = products.filter(p => p.category === 'Arquitetura' || p.name.includes('Select') || p.name.includes('White'));
    
    // Se não tiver produtos de arquitetura no contexto, cai de volta para alguns padrões mas usando o preço do produto
    const fallbackProducts = archProducts.length > 0 ? archProducts : products.slice(0, 3);
    
    const newItems: QuoteItem[] = fallbackProducts.map(p => ({
      description: `${p.name} (${sqMeters}m²)`,
      quantity: sqMeters,
      unitPrice: p.price || 0,
      productId: p.id
    }));
    
    setItems(newItems);
  };

  const handleAddItem = (productId: string) => {
      const product = products.find(p => p.id === productId);
      if (product) {
          setItems([...items, { productId: product.id, description: product.name, quantity: 1, unitPrice: product.price }]);
      }
  };

  const handleAddCustomItem = () => {
      setItems([...items, { description: 'Serviço Personalizado', quantity: 1, unitPrice: 0 }]);
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
      const newItems = [...items];
      (newItems[index] as any)[field] = value;
      setItems(newItems);
  };

  const removeItem = (index: number) => {
      setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalWithDiscount = subtotal - pixDiscount;
  const installmentValue = totalWithDiscount / installments;
  
  const handleSaveQuote = async () => {
      if(!customerName || items.length === 0) return;
      setIsGenerating(true);
      const quoteData = {
          customerName,
          customerWhatsApp,
          customerAddress,
          customerCity,
          vehicleModel,
          items,
          totalAmount: totalWithDiscount,
          status: 'Pending',
          projectType,
          measurements,
          pixDiscount,
          paymentMethod,
          installments,
          installmentValue
      };
      await addQuote(quoteData);
      setIsGenerating(false);
      setSelectedQuote({ ...quoteData, createdAt: new Date().toISOString() });
      setShowPdfPreview(true);
      setCustomerName(''); setCustomerWhatsApp(''); setCustomerAddress(''); setCustomerCity(''); setVehicleModel(''); setItems([]); setMeasurements(''); setSqMeters(0); setPixDiscount(0); setInstallments(1);
  };

  const handleApprove = async (id: string | any) => {
      const quoteId = typeof id === 'string' ? id : selectedQuote?.id;
      const ok = confirm("Deseja aprovar este orçamento e gerar o Pedido/OS?");
      if (ok) {
          await approveQuote(quoteId);
          alert("Orçamento aprovado! O Pedido foi enviado ao Agente e a OS foi gerada na sua Agenda.");
          setShowPdfPreview(false);
          setActiveTab('history');
      }
  };

  const handleShareWithAgent = () => {
    const text = `*NOVO PEDIDO WINF™*\n\nUm novo orçamento foi salvo e aguarda processamento.\n\n*Cliente:* ${selectedQuote.customerName}\n*Valor:* R$ ${selectedQuote.totalAmount.toLocaleString('pt-BR')}\n*Ref:* ${selectedQuote.id?.substring(0, 8).toUpperCase() || 'NEW'}\n\nPor favor, valide o estoque e confirme a data na agenda.`;
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareWithClient = () => {
    const text = `*PROPOSTA WINF™ ELITE*\n\nOlá ${selectedQuote.customerName},\nSegue sua proposta exclusiva para o projeto de automação solar.\n\n*Total:* R$ ${selectedQuote.totalAmount.toLocaleString('pt-BR')}\n*Sua Garantia:* Rastreável Digitalmente\n\nAcesse sua proposta detalhada no PDF anexo ou pelo link:\nhttps://winf-os.app/q/${selectedQuote.id || 'new'}`;
    const url = `https://wa.me/${selectedQuote.customerWhatsApp?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAiSuggest = () => {
      if (!customerName) {
          return alert("Para sugestões arquitetônicas, digite o nome do cliente ou projeto.");
      }

      setItems([
          ...items,
          { description: 'Winf Select® IR-99 (Alta Performance)', quantity: 1, unitPrice: 550 },
          { description: 'Winf Security® (Anti-Intrusão)', quantity: 1, unitPrice: 420 },
          { description: 'Winf White® (Privacidade Total)', quantity: 1, unitPrice: 350 },
          { description: 'Consultoria de Eficiência Energética', quantity: 1, unitPrice: 200 },
      ]);
  };

  const filteredProducts = products.filter(p => 
      p.category === 'Arquitetura' || p.name.includes('Select') || p.name.includes('Security') || p.name.includes('White') || p.name.includes('Invisible') || p.name.includes('Dual Reflect') || p.name.includes('BlackPro')
  );

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white">
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                    <ChevronLeft size={14} /> Voltar ao Painel
                </button>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Vendas & Finanças
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Orçamentos <span className="font-medium text-white/80">Elite</span></h1>
                </div>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('new')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${activeTab === 'new' ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > Emitir Contrato Elite </button>
                <button 
                  onClick={() => setActiveTab('history')} 
                  className={`px-6 py-3 rounded-sm text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${activeTab === 'history' ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                > Histórico Corporativo </button>
            </div>
        </div>

        {activeTab === 'new' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Area */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Information Area */}
                    <div className="bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <h3 className="text-xl font-light tracking-tight mb-8 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40"><User size={14}/></div> 
                           Identificação Corporativa
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Responsável / Empresa</label>
                              <input 
                                  placeholder="Digite o nome..." 
                                  value={customerName} 
                                  onChange={e => setCustomerName(e.target.value)} 
                                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-sm p-4 text-white text-sm font-light outline-none focus:border-white/20 transition-all placeholder:text-white/20" 
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">WhatsApp Contato</label>
                              <input 
                                  placeholder="(00) 00000-0000" 
                                  value={customerWhatsApp} 
                                  onChange={e => setCustomerWhatsApp(e.target.value)} 
                                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-sm p-4 text-white text-sm font-light outline-none focus:border-white/20 transition-all placeholder:text-white/20" 
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Endereço da Obra</label>
                              <input 
                                  placeholder="Logradouro..." 
                                  value={customerAddress} 
                                  onChange={e => setCustomerAddress(e.target.value)} 
                                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-sm p-4 text-white text-sm font-light outline-none focus:border-white/20 transition-all placeholder:text-white/20" 
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Cidade / UF</label>
                              <input 
                                  placeholder="Localidade..." 
                                  value={customerCity} 
                                  onChange={e => setCustomerCity(e.target.value)} 
                                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-sm p-4 text-white text-sm font-light outline-none focus:border-white/20 transition-all placeholder:text-white/20" 
                              />
                            </div>
                            
                            <div className="md:col-span-2 pt-6 border-t border-white/5 mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                    <div className="space-y-1 bg-[#0A0A0A] p-4 border border-white/5 rounded-sm">
                                        <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block">Largura (m)</label>
                                        <input 
                                            type="number"
                                            placeholder="Ex: 2.50" 
                                            id="input-width"
                                            className="w-full bg-transparent text-white text-xl font-light outline-none transition-all placeholder:text-white/10" 
                                            onChange={(e) => {
                                                const w = parseFloat(e.target.value) || 0;
                                                const h = parseFloat((document.getElementById('input-height') as HTMLInputElement)?.value) || 0;
                                                setSqMeters(parseFloat((w * h).toFixed(2)));
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1 bg-[#0A0A0A] p-4 border border-white/5 rounded-sm">
                                        <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block">Altura (m)</label>
                                        <input 
                                            type="number"
                                            placeholder="Ex: 3.00" 
                                            id="input-height"
                                            className="w-full bg-transparent text-white text-xl font-light outline-none transition-all placeholder:text-white/10" 
                                            onChange={(e) => {
                                                const h = parseFloat(e.target.value) || 0;
                                                const w = parseFloat((document.getElementById('input-width') as HTMLInputElement)?.value) || 0;
                                                setSqMeters(parseFloat((w * h).toFixed(2)));
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block">Total (m²)</label>
                                        <div className="flex border border-white/10 rounded-sm overflow-hidden focus-within:border-white/30 transition-all">
                                            <input 
                                                type="number"
                                                placeholder="Ex: 7.5" 
                                                value={sqMeters || ''} 
                                                onChange={e => setSqMeters(parseFloat(e.target.value) || 0)} 
                                                className="w-full bg-[#0A0A0A] p-4 text-white text-xl font-light outline-none" 
                                            />
                                            <button 
                                                onClick={handleApplyMetragem}
                                                className="bg-white text-black px-6 font-bold hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest border-l border-white/10"
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8 shadow-2xl relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h3 className="text-xl font-light tracking-tight flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40"><Box size={14}/></div> 
                               Especificação Técnica Master
                            </h3>
                            <button onClick={handleAiSuggest} className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] bg-[#0A0A0A] text-white/70 border border-white/10 px-4 py-2.5 rounded-sm flex items-center gap-2 hover:bg-white/5 hover:text-white transition-all">
                                <Bot size={14}/> WINF BRAIN™ AI
                            </button>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:items-center bg-[#0A0A0A] p-4 rounded-sm border border-white/5 group hover:border-white/10 transition-colors">
                                    <input 
                                        value={item.description} 
                                        onChange={e => updateItem(idx, 'description', e.target.value)} 
                                        className="flex-1 bg-transparent text-white text-sm font-light outline-none placeholder:text-white/20" 
                                        placeholder="Composição / Ferramenta"
                                    />
                                    <div className="flex gap-4 items-center pl-4 sm:border-l sm:border-white/5">
                                        <div className="w-16">
                                            <label className="sm:hidden text-[10px] md:text-[8px] font-bold text-white/40 uppercase mb-1 block">Qtd</label>
                                            <input 
                                                type="number" 
                                                value={item.quantity || ''} 
                                                onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)} 
                                                className="w-full bg-transparent text-white text-center text-sm font-light outline-none placeholder:text-white/20" 
                                                placeholder="Qtd"
                                            />
                                        </div>
                                        <div className="w-24 border-l border-white/5 pl-4">
                                            <label className="sm:hidden text-[10px] md:text-[8px] font-bold text-white/40 uppercase mb-1 block">Preço Unit.</label>
                                            <input 
                                                type="number" 
                                                value={item.unitPrice || ''} 
                                                onChange={e => updateItem(idx, 'unitPrice', parseFloat(e.target.value) || 0)} 
                                                className="w-full bg-transparent text-white text-right text-sm font-light outline-none placeholder:text-white/20" 
                                                placeholder="R$ 0,00"
                                            />
                                        </div>
                                        <button onClick={() => removeItem(idx)} className="text-white/20 hover:text-white transition-colors p-2"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <select onChange={e => { if(e.target.value) handleAddItem(e.target.value); e.target.value = ''; }} className="w-full appearance-none bg-[#0A0A0A] border border-white/10 rounded-sm p-4 text-white text-sm font-light outline-none focus:border-white/30 transition-all cursor-pointer">
                                    <option value="" className="text-white/40">Adicionar Insumo do Catálogo WINF...</option>
                                    {filteredProducts.map(p => <option key={p.id} value={p.id}>{p.name} - R$ {p.price}</option>)}
                                </select>
                                <ChevronLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none text-white/20" />
                            </div>
                            <button onClick={handleAddCustomItem} className="bg-[#0A0A0A] text-white/60 px-5 rounded-sm hover:bg-white/10 hover:text-white border border-white/10 transition-all"><Plus size={18}/></button>
                        </div>
                    </div>
                </div>

                {/* Summary & Actions */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#050505] border border-white/5 rounded-sm p-5 md:p-8 shadow-2xl sticky top-6">
                        <h3 className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4">Liquidação & Fechamento</h3>
                        
                        <div className="space-y-6 text-sm font-light mb-8">
                            <div className="flex justify-between items-center text-white/60">
                                <span>Subtotal</span>
                                <span className="font-medium text-white">R$ {subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block text-right">Forma de Repasse</label>
                                <select 
                                    value={paymentMethod}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white outline-none cursor-pointer text-right appearance-none font-medium pb-2"
                                >
                                    <option className="bg-black" value="PIX">PIX (À Vista)</option>
                                    <option className="bg-black" value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option className="bg-black" value="Cartão de Débito">Cartão de Débito</option>
                                    <option className="bg-black" value="Dinheiro">Dinheiro Físico</option>
                                    <option className="bg-black" value="Boleto">Boleto Bancário</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2"><TrendingDown size={14}/> Desconto (R$)</label>
                                <input 
                                    type="number" 
                                    value={pixDiscount || ''} 
                                    onChange={e => setPixDiscount(parseFloat(e.target.value) || 0)}
                                    className="w-32 bg-transparent text-white outline-none text-right font-medium"
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="flex justify-between items-center gap-4 border-b border-white/10 pb-2">
                                <div>
                                    <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block mb-1">Parcelamento</label>
                                    <div className="flex items-center">
                                       <span className="text-white/40 mr-2 text-xs">x</span>
                                       <input 
                                           type="number" 
                                           value={installments || ''} 
                                           onChange={e => setInstallments(parseInt(e.target.value) || 1)}
                                           className="w-16 bg-transparent text-white outline-none font-medium"
                                       />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] block mb-1">Valor Unitário</label>
                                    <div className="text-white font-medium">R$ {installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end mb-8 pt-4 border-t border-white/5">
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Total Operação</span>
                            <span className="text-4xl font-light tracking-tighter leading-none">
                                R$ {totalWithDiscount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <button onClick={handleSaveQuote} disabled={isGenerating} className="w-full bg-white text-black py-4 rounded-sm font-bold uppercase tracking-widest text-xs md:text-[10px] hover:bg-zinc-200 transition-colors flex justify-center items-center gap-3">
                                {isGenerating ? 'Processando Contrato...' : <><FileText size={16} strokeWidth={1.5}/> Emitir Proposta Corporativa</>}
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedQuote ? (
                                    <PDFDownloadLink 
                                        document={<QuotePDF quote={selectedQuote} qrCodeUrl={qrCodeUrl} />} 
                                        fileName={`WINF_Proposta_${selectedQuote.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`}
                                        className="bg-[#0A0A0A] border border-white/10 text-white/80 py-3 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase hover:bg-white/5 hover:text-white transition-all flex justify-center items-center gap-2"
                                    >
                                        {({ loading }) => (
                                            <><Printer size={14}/> {loading ? 'Gerando' : 'Baixar'}</>
                                        )}
                                    </PDFDownloadLink>
                                ) : (
                                    <button className="bg-[#0A0A0A] border border-white/10 text-white/40 py-3 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase flex justify-center items-center gap-2 cursor-not-allowed">
                                        <Printer size={14}/> Imprimir
                                    </button>
                                )}
                                <button className="bg-[#0A0A0A] border border-white/10 text-white/80 py-3 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase hover:bg-white/5 hover:text-white transition-all flex justify-center items-center gap-2">
                                    <Share2 size={14}/> Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Historico */}
        {activeTab === 'history' && (
            <div className="bg-[#050505] border border-white/5 rounded-sm overflow-hidden p-2">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-sm font-light min-w-[800px]">
                        <thead className="bg-[#0A0A0A] text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            <tr><th className="p-4 rounded-tl-sm">Data Emissão</th><th className="p-4">Cliente / Entidade</th><th className="p-4">Praça</th><th className="p-4">Categoria</th><th className="p-4">VGV</th><th className="p-4">Status Oportunidade</th><th className="p-4 rounded-tr-sm">Protocolos</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-4" colSpan={7}>
                                            <Skeleton className="h-8 w-full opacity-20" />
                                        </td>
                                    </tr>
                                ))
                            ) : quotes.length === 0 ? (
                                <tr><td colSpan={7} className="p-8 text-center text-white/20 text-sm">Registro limpo. Nenhuma emissão localizada.</td></tr>
                            ) : (
                                quotes.map(q => (
                                    <tr key={q.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4 font-mono text-xs">{new Date(q.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-medium text-white">{q.customerName}</td>
                                        <td className="p-4">{q.customerCity || 'N/E'}</td>
                                        <td className="p-4">{q.projectType || 'Corporate'}</td>
                                        <td className="p-4 font-medium text-white">R$ {q.totalAmount.toLocaleString('pt-BR')}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-sm text-[10px] md:text-[8px] font-black uppercase tracking-widest border ${q.status === 'Approved' ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/40 border-white/10'}`}>
                                                {q.status === 'Approved' ? 'CONSOLIDADO' : 'EM TRATATIVA'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => { setSelectedQuote(q); setShowPdfPreview(true); }}
                                                    className="p-2 border border-white/10 rounded-sm hover:bg-white/10 text-white/60 hover:text-white transition-all"
                                                    title="Inspecionar Relatório"
                                                >
                                                    <FileText size={14} />
                                                </button>
                                                {q.status !== 'Approved' && (
                                                    <button 
                                                        onClick={() => handleApprove(q.id)}
                                                        className="bg-white text-black px-4 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase hover:bg-zinc-200 transition-colors tracking-widest"
                                                    >
                                                        Consolidar
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* PDF Preview Modal */}
        <AnimatePresence>
            {showPdfPreview && selectedQuote && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={() => setShowPdfPreview(false)}
                        className="absolute inset-0 bg-[#000000]/90 backdrop-blur-md" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-5 md:p-8 md:p-14 font-sans border border-white/10"
                    >
                        <button 
                            onClick={() => setShowPdfPreview(false)}
                            className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* PDF Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-black/10 pb-8 mb-8 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">WINF <span className="font-bold">PRECISION™</span></h2>
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] text-black/50">Módulo Analítico & Comercial</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-sm font-light">Emissão: <span className="font-medium">{new Date(selectedQuote.createdAt).toLocaleDateString('pt-BR')}</span></p>
                                <p className="text-xs md:text-[10px] font-mono text-black/40 mt-1 uppercase tracking-widest">ID: {selectedQuote.id?.substring(0, 8) || 'DRAFT'}</p>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-black/5 p-6 rounded-sm">
                                <h4 className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-black/40 mb-4 border-b border-black/10 pb-2">Entidade Atendida</h4>
                                <p className="text-xl font-light tracking-tight mb-1">{selectedQuote.customerName}</p>
                                <p className="text-sm text-black/60 font-light">{selectedQuote.customerAddress} - {selectedQuote.customerCity}</p>
                                <p className="text-sm font-medium mt-3">{selectedQuote.customerWhatsApp}</p>
                            </div>
                            <div className="bg-black/5 p-6 rounded-sm">
                                <h4 className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-black/40 mb-4 border-b border-black/10 pb-2">Parâmetros</h4>
                                <div className="space-y-2 text-sm font-light">
                                   <div className="flex justify-between"><span className="text-black/50">Vertical:</span> <span className="font-medium">Arquitetura Corporate</span></div>
                                   {selectedQuote.measurements && <div className="flex justify-between"><span className="text-black/50">Área:</span> <span className="font-medium">{selectedQuote.measurements}</span></div>}
                                   <div className="flex justify-between"><span className="text-black/50">Status:</span> <span className="font-medium">{selectedQuote.status === 'Approved' ? 'Aprovado' : 'Aguardando Avaliação'}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto no-scrollbar mb-12 border border-black/10 rounded-sm">
                            <table className="w-full min-w-[600px] text-sm">
                                <thead className="bg-black text-white">
                                    <tr>
                                        <th className="text-left font-bold py-4 px-6 text-xs md:text-[10px] uppercase tracking-widest">Ata de Itens</th>
                                        <th className="text-center font-bold py-4 px-6 text-xs md:text-[10px] uppercase tracking-widest">Volume</th>
                                        <th className="text-right font-bold py-4 px-6 text-xs md:text-[10px] uppercase tracking-widest">Custo Unitário</th>
                                        <th className="text-right font-bold py-4 px-6 text-xs md:text-[10px] uppercase tracking-widest">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {selectedQuote.items.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-black/[0.02]">
                                            <td className="py-4 px-6">
                                                <p className="font-medium">{item.description}</p>
                                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-black/40 uppercase tracking-widest mt-1">Garantia Ativa + Selo de Qualidade Winf</p>
                                            </td>
                                            <td className="py-4 px-6 text-center">{item.quantity}</td>
                                            <td className="py-4 px-6 text-right font-light">R$ {item.unitPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                            <td className="py-4 px-6 text-right font-medium">R$ {(item.quantity * item.unitPrice).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals & Conditions */}
                        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-8">
                            <div className="bg-black/5 p-6 rounded-sm w-full sm:w-1/2">
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-black/40 mb-3 border-b border-black/10 pb-2">Cláusulas Comerciais</p>
                                <div className="space-y-2 text-sm font-light">
                                   <div className="flex justify-between"><span className="text-black/60">Modalidade:</span> <span className="font-medium">{selectedQuote.paymentMethod || 'Não especificado'}</span></div>
                                   {selectedQuote.installments > 1 && (
                                       <div className="flex justify-between"><span className="text-black/60">Parcelamento:</span> <span className="font-medium">{selectedQuote.installments}x de R$ {selectedQuote.installmentValue?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
                                   )}
                                </div>
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-black/40 mt-4 leading-relaxed font-light">* Documento referencial para análise técnica e aprovação de custos de insumo+serviços atrelados. Condições passíveis a reajuste.</p>
                            </div>

                            <div className="w-full sm:w-auto space-y-3 pt-4 border-t sm:border-none border-black/10">
                                <div className="flex justify-between text-sm gap-12 font-light">
                                    <span className="text-black/60">Base de Cálculo</span>
                                    <span className="font-medium">R$ {(selectedQuote.totalAmount + (selectedQuote.pixDiscount || 0)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                                {selectedQuote.pixDiscount > 0 && (
                                    <div className="flex justify-between text-sm text-black font-medium pb-3 border-b border-black/10">
                                        <span>Abatimento Comercial</span>
                                        <span>- R$ {selectedQuote.pixDiscount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-end gap-12 pt-2">
                                    <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-black/40">VGV Consolidado</span>
                                    <span className="text-3xl font-light tracking-tighter leading-none">R$ {selectedQuote.totalAmount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 no-print border-t border-black/10 pt-8">
                            <button 
                                onClick={() => handleApprove(selectedQuote.id)}
                                className="flex-1 bg-black text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-black/80 transition-all shadow-xl"
                            >
                                <CheckCircle2 size={16} /> Aprovar Ordem Fabril
                            </button>
                            <button 
                                onClick={() => onNavigate && onNavigate(ViewState.MODULE_WINF_CUT)}
                                className="flex-1 bg-transparent text-black py-4 border border-black/20 rounded-sm font-bold uppercase tracking-[0.2em] text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-black/5 transition-all"
                            >
                                <Scissors size={16} /> Passar para WINF™ Precision
                            </button>
                            <button 
                                onClick={handleShareWithClient}
                                className="flex-1 bg-[#25D366] text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs md:text-[10px] flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-xl"
                            >
                                <Share2 size={16} /> Enviar (WhatsApp VIP)
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default ModuleQuotes;
