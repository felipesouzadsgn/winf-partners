import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search,
  Grid, 
  Star, 
  Coins, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  ChevronLeft,
  Brain,
  CheckCircle2,
  Cpu,
  Target,
  Zap,
  Shield,
  Layers,
  Settings,
  Terminal,
  Globe,
  LayoutGrid,
  ShieldCheck,
  BookOpen,
  Database,
  Building2,
  MessageSquare
} from 'lucide-react';
import { ViewState } from '../types';
import { useWinf } from '../contexts/WinfContext';
import { getAllModules } from '../config/modules';
import AgentAutomationsEngine from './AgentAutomationsEngine';
import FeedbackModal from './FeedbackModal';
import { WinfLogo } from './WinfLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onBack?: () => void;
  user: any;
  onLogout: () => void;
  notification: any;
  onCloseNotification: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView, 
  onBack,
  user, 
  onLogout, 
  notification, 
  onCloseNotification 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeSphere, setActiveSphere] = useState<'OPERATIONAL' | 'INTELLIGENCE' | 'ADMIN' | 'ARCHITECT'>('OPERATIONAL');
  const { agentInsights, markInsightAsRead, favoriteModules, effectiveRole, setEffectiveRole } = useWinf();

  const currentRole = effectiveRole || user?.role || 'Guest';
  const isAdmin = currentRole.toLowerCase() === 'admin';
  const isLicenciado = currentRole.toLowerCase() === 'licenciado';
  const isArchitect = currentRole.toLowerCase() === 'architect' || currentRole.toLowerCase() === 'arquiteto';
  
  // Real Admin check for the preview toggle
  const isRealAdmin = user?.role?.toLowerCase() === 'admin';

  const allModules = getAllModules();
  const favoriteItems = allModules.filter(m => favoriteModules?.includes(m.id) || false);

  const unreadInsights = agentInsights?.filter(i => !i.is_read) || [];

  useEffect(() => {
    if (notification && notification.show) {
      const timer = setTimeout(onCloseNotification, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onCloseNotification]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onChangeView(ViewState.SEARCH);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChangeView]);

  const getSidebarGroups = useCallback(() => {
    const groups = [];

    // Main Platform (Admin or Architect)
    if (isAdmin || isArchitect) {
      groups.push({
        id: 'MAIN',
        label: 'Plataforma',
        items: [
          { id: isArchitect ? ViewState.DASHBOARD_ARCHITECT : ViewState.DASHBOARD_WINF, label: 'Início', icon: LayoutDashboard },
          { id: ViewState.MODULES, label: 'Central de Apps', icon: Grid },
        ]
      });
    }

    // ARCHITECT HUB
    if (isArchitect || isAdmin) {
      groups.push({
        id: 'ARCHITECT',
        label: 'Architect Hub',
        items: [
          { id: ViewState.MODULE_ARCHITECTURAL, label: 'Winf Arch Pro', icon: Target },
          { id: ViewState.MODULE_ESCAPE_3D, label: 'Escape 3D', icon: Layers },
          { id: ViewState.PRODUCTS_CATALOG, label: 'Catálogo Premium', icon: Star },
        ]
      });
    }

    // CORE OPERATIONS (Licenciado & Partner Hub)
    groups.push({
      id: 'OPERATIONAL',
      label: 'Operação WINF™',
      items: [
        { id: ViewState.DASHBOARD_WINF, label: 'Monitor de Unidade', icon: LayoutGrid },
        { id: ViewState.MODULE_QUOTES, label: 'Orçamentos (IA)', icon: Zap },
        { id: ViewState.WARRANTY, label: 'Garantias & CRM', icon: ShieldCheck },
        { id: ViewState.PRODUCTS_CATALOG, label: 'Catálogo & Preço', icon: BookOpen },
      ]
    });

    // ADMIN SYSTEM
    if (isAdmin) {
      groups.push({
        id: 'SYSTEM',
        label: 'System & Admin',
        items: [
          { id: ViewState.ADMIN_PANEL, label: 'Painel Admin', icon: Shield },
          { id: ViewState.MODULE_DATA_CORE, label: 'Data Core', icon: Settings },
          { id: ViewState.MODULE_STOCK, label: 'Gerenciar Estoque', icon: Database },
          { id: ViewState.MODULE_NEXUS_AI, label: 'Central NEXUS™ (Agentes)', icon: Brain },
          { id: ViewState.MODULE_WINF_WORLD, label: 'WINF™ World', icon: Globe },
        ]
      });
    }

    return groups;
  }, [isAdmin, isArchitect]);

  const handleNavClick = (view: ViewState) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-white/30">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <button 
            className="fixed top-4 right-4 z-50 p-2 text-white/70 hover:text-white bg-white/5 rounded-none lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <WinfLogo className="text-xl text-white" />
            <span className="font-bold tracking-widest text-[#555] text-xs mt-1">OS</span>
          </div>
          <button className="lg:hidden text-white/40 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          {getSidebarGroups().map((group) => (
            <div key={group.id} className="space-y-2">
              <h3 className="px-4 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all group relative overflow-hidden ${
                        isActive 
                          ? 'bg-white/10 text-white border-l-2 border-winf-primary' 
                          : 'text-white/40 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="nav-glow"
                          className="absolute inset-0 bg-gradient-to-r from-winf-primary/10 to-transparent pointer-events-none"
                        />
                      )}
                      <item.icon size={16} className={isActive ? 'text-white' : 'text-white/40 group-hover:text-white transition-colors'} />
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Favoritos Section */}
          {favoriteItems.length > 0 && (
            <div className="pt-2 space-y-2">
              <h3 className="px-4 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 flex items-center gap-2">
                <Star size={10} className="text-white" /> Favoritos
              </h3>
              <div className="space-y-1">
                {favoriteItems.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => handleNavClick(module.viewState)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-none text-sm md:text-[11px] font-bold transition-all border-l-2 ${
                      currentView === module.viewState 
                        ? 'bg-white/5 text-white border-winf-primary' 
                        : 'text-white/40 hover:bg-white/5 hover:text-white border-transparent'
                    }`}
                  >
                    <module.icon size={14} strokeWidth={1.5} />
                    <span className="truncate">{module.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* User Area */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-none bg-white/20 border border-winf-primary/30 flex items-center justify-center text-white font-black">
              {user?.name?.charAt(0) || 'W'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-white/40 truncate">{user?.role || 'Membro'}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-none text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 lg:h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-white/40 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white hidden sm:block">
                SYSTEM_STATE: <span className="text-white">ACTIVE</span>
              </h2>
              {currentView !== ViewState.DASHBOARD_WINF && currentView !== ViewState.DASHBOARD_ARCHITECT && (
                <button 
                  onClick={() => onBack ? onBack() : onChangeView(isArchitect ? ViewState.DASHBOARD_ARCHITECT : ViewState.DASHBOARD_WINF)}
                  className="hidden sm:flex items-center gap-2 text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-none border border-white/10"
                >
                  <ChevronLeft size={14} /> Voltar
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Switcher (Admin Only) */}
            {isRealAdmin && (
              <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/40 uppercase tracking-widest">Modo:</span>
                <select 
                  value={effectiveRole || 'Admin'}
                  onChange={(e) => setEffectiveRole(e.target.value as any)}
                  className="bg-[#0A0A0A] border border-white/10 text-xs md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 outline-none text-white"
                >
                  <option value="Admin">System Admin</option>
                  <option value="Licenciado">Licenciado</option>
                  <option value="Architect">Architect</option>
                </select>
              </div>
            )}

            {/* Search Toggle */}
            <button 
              onClick={() => onChangeView(ViewState.SEARCH)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-none text-white/40 hover:text-white transition-all group"
              title="Busca Global (Ctrl+K)"
            >
              <Search size={14} className="group-hover:text-white transition-colors" />
              <span className="text-xs md:text-[10px] font-bold uppercase tracking-wider hidden md:block">Buscar...</span>
              <kbd className="hidden md:flex h-5 items-center gap-1 rounded-none border border-white/10 bg-white/5 px-1.5 font-mono text-xs md:text-[10px] md:text-sm md:text-[11px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Feedback Button */}
            <button
               onClick={() => setIsFeedbackOpen(true)}
               className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-none hover:bg-white/10 text-white/60 hover:text-white transition-colors"
               title="Enviar Feedback desta ferramenta"
            >
               <MessageSquare size={14} />
               <span className="text-xs md:text-[10px] font-bold uppercase tracking-wider">Feedback (Labs)</span>
            </button>

            {/* WinfCoin Balance */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-none">
              <Coins size={14} className="text-white" />
              <span className="text-xs font-bold text-white">{user?.winfCoins || 0}</span>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsInsightsOpen(!isInsightsOpen)}
                className="relative p-2 text-white/40 hover:text-white transition-colors rounded-none hover:bg-[#0A0A0A]"
              >
                <Brain size={20} className={unreadInsights.length > 0 ? "text-purple-400 animate-pulse" : ""} />
                {unreadInsights.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-none"></span>
                )}
              </button>

              <AnimatePresence>
                {isInsightsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-white/10 rounded-none shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight flex items-center gap-2">
                        <Brain size={16} className="text-purple-400" />
                        WINF AI Insights
                      </h3>
                      <span className="text-xs font-mono text-white/40">{unreadInsights.length} novos</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {agentInsights && agentInsights.length > 0 ? (
                        agentInsights.map(insight => (
                          <div key={insight.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!insight.is_read ? 'bg-purple-500/5' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xs font-bold text-white">{insight.title}</h4>
                              {!insight.is_read && (
                                <button 
                                  onClick={() => markInsightAsRead(insight.id)}
                                  className="text-white/40 hover:text-green-400 transition-colors"
                                  title="Marcar como lido"
                                >
                                  <CheckCircle2 size={14} />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed">{insight.content}</p>
                            <span className="text-xs md:text-[10px] text-gray-600 mt-2 block font-mono">
                              {new Date(insight.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-white/40 text-sm">
                          Nenhum insight gerado ainda.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-white/40 hover:text-white transition-colors rounded-none hover:bg-[#0A0A0A]">
              <Bell size={20} />
              {notification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-none animate-pulse"></span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative">
          {isAdmin && <AgentAutomationsEngine />}
          
          {/* Notification Toast */}
          {notification && notification.show && (
            <div className="fixed top-6 right-6 z-[9999] bg-[#0A0A0A] border border-winf-primary/30 shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.2)] rounded-none p-4 flex items-start gap-3 max-w-sm w-[calc(100vw-3rem)] md:w-auto animate-in slide-in-from-top-4">
              <div className="text-white mt-0.5">
                <Bell size={16} />
              </div>
              <div className="flex-1">
                {notification.title && <h4 className="text-sm font-bold text-white mb-1">{notification.title}</h4>}
                <p className="text-xs text-white/40" dangerouslySetInnerHTML={{ __html: notification.message }}></p>
              </div>
              <button onClick={onCloseNotification} className="text-white/40 hover:text-white p-2 -mr-2 -mt-2">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        currentTool={currentView.replace(/_/g, ' ')} 
      />
    </div>
  );
};

export default Layout;
