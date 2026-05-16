import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { Package, Shield, Sun, Eye, Thermometer, ChevronRight, Search, Filter, X, CheckCircle, Droplets, Zap } from 'lucide-react';
import { PRODUCT_CATALOG } from '../data/productCatalogData';

const ModuleProducts: React.FC = () => {
  const { products, user } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<any | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateOrder = (product: any) => {
    alert(`Pedido gerado para ${product.name}. A central processará e encaminhará para o instalador mais apropriado.`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">WINF GLASS INTELLIGENCE™</h1>
          <p className="text-white/40 mt-1">Catálogo técnico e performance de produtos</p>
        </div>
        <div className="flex bg-[#0A0A0A] p-1 rounded-none border border-white/10">
          <button 
            onClick={() => setShowPricing(false)}
            className={`px-6 py-2 rounded-none text-xs font-bold transition-all ${!showPricing ? 'bg-winf-text_primary text-winf-background' : 'text-white/40 hover:text-white'}`}
          >
            FICHA TÉCNICA
          </button>
          <button 
            onClick={() => setShowPricing(true)}
            className={`px-6 py-2 rounded-none text-xs font-bold transition-all ${showPricing ? 'bg-white text-winf-background' : 'text-white/40 hover:text-white'}`}
          >
            TABELA DE PREÇOS
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Buscar produto ou tecnologia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-none pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-winf-primary focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-none whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-white text-winf-background' : 'bg-[#0A0A0A] text-white/40 hover:text-white'}`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as string)}
              className={`px-4 py-2 rounded-none whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-white text-winf-background' : 'bg-[#0A0A0A] text-white/40 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <div className="text-xs font-mono text-white mb-1">{product.line || 'WINF SERIES'}</div>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-white/40 mt-2 line-clamp-2">{product.description}</p>
              </div>
              <div className="bg-[#050505] p-3 rounded-none border border-white/10">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6">
              {!showPricing ? (
                <>
                  {product.thermal_score !== undefined && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-white" />
                        WINF PERFORMANCE SYSTEM™
                      </h4>
                      
                      <div className="space-y-4">
                        <PerformanceBar label="Thermal Intelligence" score={product.thermal_score || 0} icon={<Thermometer className="w-4 h-4" />} />
                        <PerformanceBar label="Light Intelligence" score={product.light_score || 0} icon={<Sun className="w-4 h-4" />} />
                        <PerformanceBar label="Shield Intelligence" score={product.shield_score || 0} icon={<Shield className="w-4 h-4" />} />
                        <PerformanceBar label="Privacy Intelligence" score={product.privacy_score || 0} icon={<Eye className="w-4 h-4" />} />
                      </div>
                    </div>
                  )}

                  {product.tech_specs && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-tighter">VLT</div>
                        <div className="text-xs font-bold text-white">{product.tech_specs.vlt}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-tighter">IRR</div>
                        <div className="text-xs font-bold text-white">{product.tech_specs.irr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-tighter">UVR</div>
                        <div className="text-xs font-bold text-white">{product.tech_specs.uvr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-tighter">TSER</div>
                        <div className="text-xs font-bold text-white">{product.tech_specs.tser}</div>
                      </div>
                    </div>
                  )}

                  {product.available_widths && product.available_widths.length > 0 && (
                    <div>
                      <h4 className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Larguras Disponíveis (Roll Widths)</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.available_widths.map(width => (
                          <span key={width} className="px-3 py-1 bg-[#050505] border border-white/10 rounded-none text-xs md:text-[10px] font-mono text-white">
                            {width}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-[#050505] p-6 rounded-none border border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/40 uppercase tracking-widest">Preço Especial Arquiteto</span>
                      <span className="text-2xl font-black text-white">R$ {(product.price || 250).toLocaleString('pt-BR')} / m²</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10/50">
                      <span className="text-xs text-white/40 uppercase tracking-widest">Lucratividade Estimada</span>
                      <span className="text-lg font-bold text-green-500">+ 35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/40 uppercase tracking-widest">Retorno por Projeto</span>
                      <span className="text-lg font-bold text-white">Alto Impacto</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-winf-primary/20 rounded-none">
                    <p className="text-xs md:text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">
                      * Valores exclusivos para membros do ecossistema AeroCore Architect AI™. 
                      O pedido será processado pela central e encaminhado para a equipe técnica homologada.
                    </p>
                  </div>

                  <button 
                    onClick={() => handleGenerateOrder(product)}
                    className="w-full bg-white text-winf-background py-4 rounded-none font-black uppercase tracking-widest hover:bg-white_hover transition-all shadow-lg shadow-white/20"
                  >
                    Gerar Pedido & Garantia
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#050505] border-t border-white/10 flex justify-between items-center">
              <div className="text-sm text-white/40">
                {product.warranty_years ? (
                  <>Garantia: <span className="text-white font-medium">{product.warranty_years} Anos</span></>
                ) : (
                  <span className="text-white font-medium tracking-widest text-xs md:text-[10px] uppercase">Fornecimento Exclusivo</span>
                )}
              </div>
              {!showPricing && (
                <button 
                  onClick={() => setSelectedProductDetails(product)}
                  className="text-white hover:text-white_hover text-sm font-medium flex items-center gap-1 transition-colors group">
                  Ver Ficha Técnica <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
        </div>

      {/* Product Details Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f0f0f] border border-white/10 rounded-none w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col shadow-2xl shadow-black"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center">
              <div>
                <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white mb-1">
                  {selectedProductDetails.line || 'WINF SERIES'}
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                  FICHA TÉCNICA: {selectedProductDetails.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedProductDetails(null)} 
                className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8 flex-1">
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Visual / Info */}
                <div className="space-y-6">
                  <div className="aspect-video bg-black rounded-none border border-white/5 overflow-hidden relative group">
                    <img 
                      src={selectedProductDetails.image || selectedProductDetails.image_url || `https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop`} 
                      alt={selectedProductDetails.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                       <Shield className="w-5 h-5 text-white" />
                       <span className="text-white text-xs font-bold tracking-widest uppercase">Proteção Ativa</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Descrição e Benefícios</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
                      {selectedProductDetails.description || 'Tecnologia avançada de controle solar e proteção. Rejeição extrema de calor e bloqueio UV com durabilidade incomparável.'}
                    </p>
                  </div>

                  {selectedProductDetails.benefits && selectedProductDetails.benefits.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {selectedProductDetails.benefits.map((b: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 bg-white/5 p-3 rounded-none border border-white/5">
                           <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                           <div className="flex flex-col">
                             <span className="text-xs font-bold text-white uppercase tracking-widest">{b}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="space-y-8">
                   {selectedProductDetails.tech_specs && (
                   <div>
                     <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Zap className="w-4 h-4 text-white" /> Raio-X Molecular
                     </h3>
                     
                     <div className="bg-black/50 border border-white/5 rounded-none overflow-hidden divide-y divide-white/5">
                        <div className="flex justify-between items-center p-4 hover:bg-black transition-colors">
                           <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Transmissão de Luz (VLT)</span>
                           <span className="text-sm font-mono text-white">{selectedProductDetails.tech_specs?.vlt || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 hover:bg-black transition-colors">
                           <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Rejeição Infravermelho (IRR)</span>
                           <span className="text-sm font-mono text-white">{selectedProductDetails.tech_specs?.irr || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 hover:bg-black transition-colors">
                           <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Bloqueio UV (UVR)</span>
                           <span className="text-sm font-mono text-white">{selectedProductDetails.tech_specs?.uvr || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 hover:bg-black transition-colors">
                           <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Energia Rejeitada (TSER)</span>
                           <span className="text-sm font-mono text-white">{selectedProductDetails.tech_specs?.tser || 'N/A'}</span>
                        </div>
                     </div>
                   </div>
                   )}

                   {selectedProductDetails.thermal_score !== undefined && (
                   <div>
                     <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Métricas de Performance</h3>
                     <div className="space-y-4 bg-black/50 border border-white/5 p-5 rounded-none">
                        <PerformanceBar label="Thermal Intelligence" score={selectedProductDetails.thermal_score || 0} icon={<Thermometer className="w-4 h-4 text-red-500" />} />
                        <PerformanceBar label="Light Intelligence" score={selectedProductDetails.light_score || 0} icon={<Sun className="w-4 h-4 text-white" />} />
                        <PerformanceBar label="Shield Intelligence" score={selectedProductDetails.shield_score || 0} icon={<Shield className="w-4 h-4 text-purple-500" />} />
                        <PerformanceBar label="Privacy Intelligence" score={selectedProductDetails.privacy_score || 0} icon={<Eye className="w-4 h-4 text-blue-500" />} />
                     </div>
                   </div>
                   )}

                   {selectedProductDetails.availableWidths && selectedProductDetails.availableWidths.length > 0 && (
                     <div>
                       <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Roll Widths (Larguras)</h3>
                       <div className="flex flex-wrap gap-2">
                         {selectedProductDetails.availableWidths.map((width: number) => (
                           <span key={width} className="px-4 py-2 bg-white/5 border border-white/10 rounded-none text-xs font-mono text-white/60 shadow-inner">
                             {width}" polegadas
                           </span>
                         ))}
                       </div>
                     </div>
                   )}
                </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Shield className="w-5 h-5 text-white" />
                 <div>
                   <div className="text-xs md:text-[10px] text-white/40 tracking-widest uppercase">
                     {selectedProductDetails.warranty_years ? 'Garantia Oficial' : 'Fornecimento Oficial'}
                   </div>
                   <div className="text-sm text-white font-bold">
                     {selectedProductDetails.warranty_years ? `${selectedProductDetails.warranty_years} Anos` : 'WINF BLACKSHOP™'}
                   </div>
                 </div>
               </div>
               
               <button 
                 onClick={() => setSelectedProductDetails(null)}
                 className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-none hover:bg-gray-200 transition-colors"
               >
                 Fechar Detalhes
               </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

const PerformanceBar = ({ label, score, icon }: { label: string, score: number, icon: React.ReactNode }) => {
  // Score is out of 10
  const normalizedScore = Math.min(Math.max(score, 0), 10);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/40 flex items-center gap-1.5">
          {icon} {label}
        </span>
        <span className="text-xs font-mono text-white">{normalizedScore}/10</span>
      </div>
      <div className="h-2 w-full bg-[#050505] rounded-none overflow-hidden border border-white/10/50">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: `${(normalizedScore / 10) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ModuleProducts;
