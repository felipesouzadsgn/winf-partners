import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Shield, Zap, Maximize2, X } from 'lucide-react';

interface LandingGalleryProps {
  onBack: () => void;
}

const LandingGallery: React.FC<LandingGalleryProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    { 
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80", 
      label: "Arquitetura", 
      title: "Residencial Select", 
      span: "md:col-span-2 md:row-span-2" 
    },
    { 
      img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80", 
      label: "Automotive", 
      title: "Porsche GT3 RS", 
      span: "md:col-span-1 md:row-span-2" 
    },
    { 
      img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80", 
      label: "Aviation", 
      title: "Gulfstream G650", 
      span: "md:col-span-1 md:row-span-2" 
    },
    { 
      img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=2000&q=80", 
      label: "Nautical", 
      title: "Azimut 74 Grande", 
      span: "md:col-span-2 md:row-span-2" 
    },
    { 
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80", 
      label: "Corporate Building", 
      title: "Corporate Faria Lima", 
      span: "md:col-span-3 md:row-span-2" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-white selection:text-black font-sans scroll-smooth">
      {/* Navbar Minimal */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-xl border-b border-white/5 pointer-events-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
           Voltar
        </button>
        <div className="font-light tracking-[0.3em] text-xs md:text-[10px] text-white uppercase flex items-center gap-3">
          WINF<span className="text-white/30 font-bold">GALLERY</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden pb-32 pt-32 px-6 md:px-12 border-b border-white/5">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3000&q=80')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[150px] pointer-events-none rounded-full" />
           <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent pointer-events-none" />
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-start text-left">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/80 mb-8 backdrop-blur-md"
           >
              <Camera size={12} className="text-white/50" />
              PORTFÓLIO VISUAL WINF™
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-[7rem] font-extralight tracking-tight leading-[0.9] mb-8"
           >
             Estética <br/>
             do <span className="font-medium text-white italic">Domínio.</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-lg md:text-xl font-light text-white/40 leading-relaxed max-w-3xl"
           >
             Galeria de alta performance. Extratos visuais de projetos de máxima complexidade executados globalmente em nossos <b>Studios, Kiosks e Operações Especiais.</b>
           </motion.p>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="py-24 px-6 md:px-12 bg-[#020202] relative z-10 w-full mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-[300px] md:auto-rows-[350px]">
            {projects.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden group cursor-pointer border border-white/5 bg-[#050505] ${item.span}`}
                onClick={() => setSelectedImage(item.img)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/80 to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
                
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Maximize2 size={16} className="text-white" />
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-[2px] w-8 bg-white/80 transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100 delay-100" />
                      <span className="text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors duration-500">{item.label}</span>
                    </div>
                    <span className="text-3xl md:text-5xl font-light text-white tracking-tight">{item.title}</span>
                  </div>
                </div>
                
                {/* Frame border highlight */}
                <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/10 transition-colors duration-700 z-10 pointer-events-none" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-full text-white z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={20} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Gallery Lightbox" 
              className="max-w-full max-h-full object-contain cursor-default select-none border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection CTA */}
      <section className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden flex justify-center">
         <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
         
         <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl flex flex-col items-center">
           <div className="w-16 h-px bg-white/20 mb-8" />
           <div className="text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">REDE SOCIAL</div>
           <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-12 text-white">
             Siga a Operação <br/><span className="font-medium italic">Global.</span>
           </h2>
           
           <a 
             href="https://www.instagram.com/winfpartners"
             target="_blank"
             rel="noreferrer"
             className="px-10 py-5 bg-white text-black font-bold text-xs md:text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center gap-3 w-fit mx-auto shadow-xl hover:shadow-white/10"
           >
             Acessar Instagram
           </a>
         </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 border-t border-white/5 text-center bg-[#020202] relative z-10">
        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/30 uppercase tracking-[0.4em]">WINF™ INTERNATIONAL GROUP // VISUAL ARCHIVE</p>
      </footer>
    </div>
  );
};

export default LandingGallery;
