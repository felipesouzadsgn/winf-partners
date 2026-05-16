
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  Share2, 
  Play, 
  Pause, 
  Music, 
  Search,
  BookOpen,
  Zap,
  ExternalLink,
  Smartphone,
  Globe,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Camera,
  Copy,
  Layout,
  Video,
  Rocket,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Asset {
  id: string;
  title: string;
  type: 'catalog' | 'tech' | 'audio' | 'visual' | 'script';
  category: string;
  description: string;
  fileSize?: string;
  duration?: string;
  copy?: string;
  thumbnail?: string;
}

const ARSENAL_DATA: Asset[] = [
  { 
    id: '1', 
    title: 'The Art of Protection: Volume I', 
    type: 'catalog', 
    category: 'Lifestyle', 
    description: 'Catálogo de luxo focado em experiência do usuário e estética de super-carros.', 
    fileSize: '18.4 MB' 
  },
  { 
    id: '2', 
    title: 'Select™ Architectural Series', 
    type: 'catalog', 
    category: 'Arquitetura', 
    description: 'Portfólio técnico para arquitetos de alto padrão e projetos corporativos.', 
    fileSize: '12.8 MB' 
  },
  { 
    id: '3', 
    title: 'Ficha Técnica: AeroCore™ Nano-Ceramic', 
    type: 'tech', 
    category: 'Técnico', 
    description: 'Dados brutos de rejeição IR (99%), bloqueio UV e fator de proteção FPS 1000+.', 
    fileSize: '1.2 MB' 
  },
  { 
    id: '4', 
    title: 'Áudio: A Ciência do IR-99', 
    type: 'audio', 
    category: 'Educação', 
    description: 'Explicação audível sobre como a nanotecnologia Winf bloqueia o calor sem escurecer o vidro.', 
    duration: '0:45'
  },
  {
    id: 'v1',
    title: 'Avatar Premium Minimal (White)',
    type: 'visual',
    category: 'Identity',
    description: 'Foto de perfil oficial WINF para Instagram e WhatsApp.',
    fileSize: '450 KB'
  },
  {
    id: 's1',
    title: 'Roteiro Reel: O Sol é seu Inimigo?',
    type: 'script',
    category: 'Reels',
    description: 'Roteiro de 30s focado no problema do calor e na solução AeroCore.',
    copy: 'HOOK: Você sabia que o sol dentro do seu carro pode estar destruindo seu painel e sua pele? \n\nTECNOLOGIA: A NanoCerâmica AeroCore bloqueia 99% do calor...\n\nCTA: Comente PROTEÇÃO para orçar agora.'
  }
];

const DAILY_PULSE = {
  date: "Maio 02, 2026",
  title: "A Vantagem AeroCore™",
  copy: "O calor não é opcional, a sua proteção sim. 🛡️\n\nA tecnologia AeroCore™ Nano-Ceramic não apenas escurece seu veículo, ela cria um escudo térmico de 99% de rejeição IR. \n\nConforto térmico absoluto e visibilidade cristalina. Esse é o padrão WINF™. #WinfHighTech #AeroCore",
  suggestion: "Postar no Status do WhatsApp entre 11:30 e 13:00 para máxima visualização."
};

const ModuleArsenal: React.FC<{ onBack: () => void, onNavigate: (view: ViewState) => void }> = ({ onBack, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assets' | 'campaigns' | 'technical'>('dashboard');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Texto copiado para a área de transferência!');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white mx-4 md:mx-0">
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                {onBack && (
                  <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                      <ChevronLeft size={14} /> Voltar ao Painel
                  </button>
                )}
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Inteligência & Manuais
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Arsenal <span className="font-medium text-white/80">Tático WINF™</span></h1>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 items-end">
                <div className="w-full md:w-72 relative mb-4 md:mb-0">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Localizar Scripts, Mídia ou Manuais..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-sm py-2 pl-11 pr-4 text-sm md:text-[11px] text-white focus:border-white/20 outline-none transition-all placeholder:text-white/20 font-bold"
                  />
                </div>
                <div className="flex bg-[#0A0A0A] p-1 border border-white/5 overflow-x-auto max-w-full">
                    {[
                      { id: 'dashboard', label: 'Centro de Comando', icon: Layout },
                      { id: 'assets', label: 'Imagens WINF™', icon: ImageIcon },
                      { id: 'campaigns', label: 'Scripts de Venda', icon: Camera },
                      { id: 'technical', label: 'Documentação Técnica', icon: FileText },
                    ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex whitespace-nowrap items-center gap-2 px-6 py-2.5 text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all ${activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                      >
                        <tab.icon size={14} /> {tab.label}
                      </button>
                    ))}
                </div>
            </div>
        </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div 
            key="dash"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 px-4 md:px-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Pulse Section */}
              <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-5 md:p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 bg-white text-black text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">Diretriz da Matriz</div>
                 <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3 text-white/40 text-xs md:text-[10px] font-bold uppercase tracking-widest">
                       <Smartphone size={14} /> WhatsApp Status Sync
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">{DAILY_PULSE.title}</h3>
                       <p className="text-white/40 text-sm leading-relaxed border-l-2 border-winf-primary pl-4 py-2 italic font-medium">
                         "{DAILY_PULSE.copy}"
                       </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                       <button 
                        onClick={() => handleCopy(DAILY_PULSE.copy)}
                        className="flex items-center justify-center gap-3 bg-white text-black px-8 py-3 font-black text-xs md:text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all"
                       >
                         <Copy size={16} /> Copiar Copywriter WINF
                       </button>
                       <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-3 font-black text-xs md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                         <Download size={16} /> Baixar Arte em Alta Resolução
                       </button>
                    </div>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/50 font-black uppercase tracking-[0.2em]">INTELIGÊNCIA: {DAILY_PULSE.suggestion}</p>
                 </div>
              </div>

              {/* Start Digital Quick Link */}
              <div 
                onClick={() => onNavigate(ViewState.MODULE_DIGITAL_START)}
                className="bg-white p-5 md:p-8 flex flex-col justify-between cursor-pointer group hover:bg-zinc-200 transition-all"
              >
                 <Rocket size={32} className="text-black group-hover:scale-110 transition-transform" />
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter leading-none">START <br/> DIGITAL</h3>
                    <p className="text-black/60 text-xs md:text-[10px] font-black uppercase tracking-widest">Protocolo de Onboarding</p>
                 </div>
                 <div className="flex items-center gap-2 text-xs md:text-[10px] font-black uppercase mt-4 text-black">
                    Iniciar agora <ArrowRight size={14} />
                 </div>
              </div>
            </div>

            {/* Quick Access Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[
                 { title: 'Site Institucional', desc: 'Sua presença global customizada.', icon: Globe, view: ViewState.INSTITUTIONAL_SITE },
                 { title: 'Blackshop Elite', desc: 'Peça suporte de marketing premium.', icon: ShieldCheck, view: ViewState.MODULE_BLACKSHOP },
                 { title: 'Grid Instagram', desc: 'Visualize seu feed ideal.', icon: Layout, view: ViewState.MODULE_GRID },
                 { title: 'Vantagem do Cliente', desc: 'Página pública de consulta.', icon: Smartphone, view: ViewState.PUBLIC_CONSULTANCY },
               ].map((item, i) => (
                 <div 
                  key={i} 
                  onClick={() => onNavigate(item.view)}
                  className="bg-white/5 border border-white/10 p-6 hover:border-winf-primary/30 cursor-pointer group transition-all"
                 >
                    <item.icon size={20} className="text-white mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-bold text-sm uppercase mb-1">{item.title}</h4>
                    <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">{item.desc}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {activeTab !== 'dashboard' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0"
          >
             {ARSENAL_DATA.filter(a => {
               if (activeTab === 'assets') return a.type === 'visual';
               if (activeTab === 'campaigns') return a.type === 'script';
               if (activeTab === 'technical') return a.type === 'catalog' || a.type === 'tech' || a.type === 'audio';
               return true;
             }).map(asset => (
               <div key={asset.id} className="bg-white/5 border border-white/10 p-5 md:p-8 flex flex-col justify-between hover:border-winf-primary/30 transition-all group">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                       <div className="p-3 bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors">
                          {asset.type === 'visual' && <ImageIcon size={20} />}
                          {asset.type === 'script' && <Camera size={20} />}
                          {asset.type === 'audio' && <Headphones size={20} />}
                          {(asset.type === 'catalog' || asset.type === 'tech') && <FileText size={20} />}
                       </div>
                       <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase text-gray-600 border border-white/5 px-2 py-1">{asset.category}</span>
                    </div>
                    <h3 className="text-white font-bold text-base uppercase tracking-tighter mb-4">{asset.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed font-medium mb-8">{asset.description}</p>
                    
                    {asset.copy && (
                      <div className="bg-black/60 p-4 border border-white/5 font-mono text-xs md:text-[10px] text-white/40 mb-8 max-h-32 overflow-y-auto">
                        {asset.copy}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                     <span className="text-xs md:text-[10px] text-gray-600 font-mono italic">
                       {asset.fileSize || asset.duration || 'Dynamic Asset'}
                     </span>
                     <div className="flex gap-2">
                        {asset.copy ? (
                          <button onClick={() => handleCopy(asset.copy!)} className="p-3 bg-white text-black hover:bg-zinc-200 transition-all">
                            <Copy size={16} />
                          </button>
                        ) : (
                          <button className="p-3 bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                            <Download size={16} />
                          </button>
                        )}
                        <button className="p-3 bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                          <Share2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Institutional Site Bridge */}
      <div className="bg-gradient-to-br from-zinc-800/20 to-black border border-zinc-700/30 p-6 md:p-10 rounded-none relative overflow-hidden group mx-4 md:mx-0">
          <div className="absolute top-0 right-0 p-16 bg-zinc-800/10 rounded-none blur-3xl pointer-events-none group-hover:bg-zinc-800/20 transition-all"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white text-black rounded-none flex items-center justify-center shadow-xl">
                          <Globe size={24} />
                      </div>
                      <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter">Site Institucional Winf™</h3>
                  </div>
                  <p className="text-white/40 text-base max-w-2xl leading-relaxed font-medium">
                      Ative seu território digital. Site oficial sincronizado com SEO local para captação de leads exclusiva. O cliente vê sua autoridade de nível mundial.
                  </p>
              </div>
              <button 
                onClick={() => onNavigate(ViewState.INSTITUTIONAL_SITE)}
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-6 md:px-10 py-5 rounded-none font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl shrink-0"
              >
                  Visualizar Minha Versão <ArrowRight size={16} />
              </button>
          </div>
      </div>
    </div>
  );
};

export default ModuleArsenal;
