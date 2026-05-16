import React from 'react';
import { 
  Star, ArrowUpRight
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { MODULES_CONFIG, ADMIN_MODULES } from '../config/modules';

interface ToolCardProps {
  id: string;
  title: string;
  icon: any;
  desc: string;
  onClick: () => void;
  isComingSoon?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon: Icon, desc, onClick, isComingSoon, isFavorite, onToggleFavorite }) => (
  <div className="relative group/tooltip">
    <div 
      onClick={isComingSoon ? undefined : onClick} 
      className={`w-full flex items-center gap-4 p-5 bg-[#050505] border border-white/5 rounded-sm transition-all text-left group min-h-[90px] ${isComingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0A0A0A] hover:border-white/20 cursor-pointer'}`}
      role={isComingSoon ? undefined : 'button'}
      tabIndex={isComingSoon ? undefined : 0}
      onKeyDown={(e) => {
        if (!isComingSoon && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${!isComingSoon ? 'border-white/5 text-white/40 group-hover:text-white group-hover:border-white/30' : 'border-white/5 text-white/20'}`}>
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-sm font-medium tracking-wide text-white/90 truncate group-hover:text-white transition-colors">{title}</h3>
          {isComingSoon && (
            <span className="text-[7px] font-bold uppercase tracking-widest bg-white/5 text-white/40 px-2 py-0.5 rounded-sm">Em breve</span>
          )}
        </div>
        <p className="text-sm md:text-[11px] font-light text-white/40 tracking-wide truncate">{desc}</p>
      </div>
      
      {!isComingSoon && (
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleFavorite}
            className={`p-1.5 rounded-sm transition-all ${isFavorite ? 'text-white' : 'text-white/20 hover:text-white opacity-0 group-hover:opacity-100'}`}
          >
            <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <ArrowUpRight size={14} className="text-white/20 group-hover:text-white transition-colors" />
        </div>
      )}
    </div>
    
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white/80 text-xs font-light rounded-sm opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-50 shadow-2xl pointer-events-none tracking-wide">
      {isComingSoon ? 'Este módulo será liberado em breve.' : desc}
    </div>
  </div>
);

const ModulesList: React.FC<{ onNavigate: (view: any) => void; userRole?: string }> = ({ onNavigate, userRole }) => {
  const { favoriteModules, toggleFavoriteModule } = useWinf();
  const role = userRole?.toLowerCase();
  const isAdmin = role === 'admin' || role === 'licenciado';
  const isArchitect = role === 'architect' || role === 'arquiteto';

  // Filter tools based on role
  const tools = MODULES_CONFIG.map(section => ({
    ...section,
    items: section.items.filter(item => {
      // Architects only see specific tools
      if (isArchitect) {
        const allowedIds = [
          'quotes', 'consultancy', 'precision', 'molecular_twin', 
          'catalog', 'academy', 'faq', 'blackshop', 'escape_3d',
          'architectural', 'digital_start', 'shop_core'
        ];
        return allowedIds.includes(item.id);
      }
      return true;
    })
  })).filter(section => section.items.length > 0);

  if (isAdmin) {
    tools.push({
      category: 'Gestão Organizacional',
      items: ADMIN_MODULES
    });
  }

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-light tracking-tight text-white mb-1">Catálogo de Ferramentas</h1>
        <p className="text-sm font-light tracking-wide text-white/50">Módulos especializados para gestão integrada da operação.</p>
      </div>

      {tools.map((section, idx) => (
        <div key={idx} className="space-y-6">
          <div className="flex items-center gap-4 group/header">
            <h2 className="text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 pl-1">
              {section.category}
            </h2>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((tool) => (
              <ToolCard 
                key={tool.id} 
                id={tool.id}
                title={tool.title}
                icon={tool.icon}
                desc={tool.desc}
                isComingSoon={tool.isComingSoon}
                isFavorite={favoriteModules.includes(tool.id)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavoriteModule(tool.id);
                }}
                onClick={() => onNavigate(tool.viewState)} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModulesList;
