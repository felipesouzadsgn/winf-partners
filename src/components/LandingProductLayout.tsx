import React, { useState } from 'react';
import { Shield, Sun, Eye, Droplets, CheckCircle, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCatalogData } from '../data/productCatalogData';

interface LandingProductLayoutProps {
  product: ProductCatalogData;
  onBack?: () => void;
}

const iconMap: Record<string, React.FC<any>> = {
  Sun: Sun,
  Shield: Shield,
  Eye: Eye,
  Droplets: Droplets
};

const LandingProductLayout: React.FC<LandingProductLayoutProps> = ({ product, onBack }) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs'>('benefits');

  const handleBuy = () => {
    // Redirect to WhatsApp
    const phone = '5511999999999'; // Número fictício / placeholder da central 
    const message = encodeURIComponent(`Olá, estava vendo o catálogo online e tenho interesse na película ${product.name} (${product.subname}). Podemos conversar?`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-bold tracking-widest uppercase border-l-2 border-white/50 pl-3">
          WINF<span className="text-white/50">™</span>
        </div>
        <div className="flex items-center gap-6">
          {onBack && (
            <button 
              onClick={onBack}
              className="text-sm md:text-[11px] uppercase tracking-[0.1em] text-white/50 hover:text-white transition-colors"
            >
              Voltar ao Catálogo
            </button>
          )}
          <button 
            onClick={handleBuy}
            className="flex items-center gap-2 px-6 py-2 bg-white hover:bg-white/90 hover:scale-105 transition-all text-black text-xs uppercase tracking-widest font-bold rounded-none"
          >
            <ShoppingCart className="w-4 h-4" /> Comprar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 px-6 md:px-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url(${product.image})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 border border-white/30 bg-white/10 text-white text-xs md:text-[10px] uppercase tracking-[0.2em] font-semibold">
                {product.badge}
              </span>
              <span className="text-white/50 text-xs tracking-widest uppercase">
                {product.category === 'arch' ? 'Arquitetura' : 'Automotivo'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-light leading-[0.9] tracking-[-0.02em] mb-4">
              {product.name.split('®')[0]}<span className="text-2xl align-super">®</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/40 font-light mb-8 italic tracking-wide">
              {product.subname}
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed mb-10 border-l border-white/20 pl-6">
              {product.fullDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleBuy}
                className="group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-[0.1em] font-bold overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">Falar com Consultor</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                <div className="absolute inset-0 bg-black border border-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <div className="border-y border-white/10 bg-black/40 backdrop-blur-md shrink-0 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: 'Rejeição IR (Calor)', value: product.keyMetrics.ir },
              { label: 'Bloqueio UV', value: product.keyMetrics.uv },
              { label: 'Energia Rejeitada (TSER)', value: product.keyMetrics.tser },
              { label: 'Garantia', value: product.keyMetrics.warranty }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={idx !== 0 ? 'pl-4 sm:pl-8' : ''}
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-white mb-2">{stat.value}</div>
                <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] sm:text-xs md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features & Specs Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
        <div className="flex items-center justify-center gap-12 mb-16 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`text-xs uppercase tracking-[0.15em] pb-6 relative transition-colors ${activeTab === 'benefits' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Benefícios
            {activeTab === 'benefits' && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`text-xs uppercase tracking-[0.15em] pb-6 relative transition-colors ${activeTab === 'specs' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Especificações Técnicas
            {activeTab === 'specs' && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
            )}
          </button>
        </div>

        {activeTab === 'benefits' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {product.benefits.map((benefit, idx) => {
              const IconComp = iconMap[benefit.icon] || Shield;
              return (
                <div key={idx} className="bg-[#111] p-5 md:p-8 md:p-12 border border-white/5 hover:border-white/20 transition-colors group">
                  <IconComp className="w-10 h-10 text-white mb-6 group-hover:rotate-12 transition-transform duration-500" />
                  <h3 className="text-xl font-light mb-4">{benefit.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'specs' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#111] border border-white/5 rounded-none p-5 md:p-8 mb-8">
              <h3 className="text-2xl font-light mb-8 text-white">Raio-X Molecular</h3>
              <div className="space-y-4">
                {[
                  { label: 'Transmissão de Luz Visível (VLT)', value: product.specs.vlt },
                  { label: 'Rejeição de Energia IR (IRER)', value: product.specs.irer },
                  { label: 'Energia Solar Total Rejeitada (TSER)', value: product.specs.tsr },
                  { label: 'Redução de Ofuscamento', value: product.specs.glareReduction },
                  { label: 'Espessura', value: product.specs.thickness },
                  { label: 'Estrutura do Material', value: product.specs.material }
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-black px-4 transition-colors">
                    <span className="text-sm text-white/60 font-light">{spec.label}</span>
                    <span className="text-sm font-semibold tracking-wide text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex bg-white/5 border border-white/10 p-6 rounded-none items-start gap-4">
              <CheckCircle className="w-6 h-6 text-white/60 shrink-0 mt-1" />
              <p className="text-sm text-white/60 leading-relaxed font-light">
                * As métricas (TSER e IRER) são baseadas em testes aplicados a vidro claro de 3mm (1/8"). Valores exatos variam de acordo com o lote e calibração óptica do vidro base. Garantia oficial cobre esfoliação, bolhas, delaminação e perda colorimétrica.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 bg-white text-black text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Pronto para blindar seu conforto?</h2>
          <p className="text-lg text-black/70 mb-10 font-light px-4">
            A proteção perfeita e a discrição ideal para o seu espaço através de nanotecnologia extrema. 
            Entre em contato com nossa equipe agora.
          </p>
          <button 
            onClick={handleBuy}
            className="inline-flex items-center gap-2 bg-black text-white px-6 md:px-10 py-5 text-sm uppercase tracking-[0.15em] font-bold hover:bg-black/80 hover:-translate-y-1 transition-transform border border-transparent hover:border-black/20"
          >
            Falar pelo WhatsApp central <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingProductLayout;
