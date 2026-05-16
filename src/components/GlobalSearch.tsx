
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  X, 
  ArrowRight, 
  FileText, 
  Package, 
  GraduationCap,
  ChevronRight,
  Clock,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { ViewState } from '../types';
import { getAllModules } from '../config/modules';

interface GlobalSearchProps {
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onClose, onNavigate }) => {
  const { products, documentItems, trainingModules, user } = useWinf();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All'); // All, Today, Week, Month
  const [activeTab, setActiveTab] = useState<'All' | 'Products' | 'Documents' | 'Academy' | 'Tools'>('All');

  const allModules = useMemo(() => {
    return getAllModules().filter(m => !m.isAdminOnly || user?.role === 'Admin');
  }, [user?.role]);

  const categories = useMemo(() => {
    const productCats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return ['All', ...productCats];
  }, [products]);

  const filteredResults = useMemo(() => {
    if (!searchQuery && selectedCategory === 'All' && dateFilter === 'All') return [];

    const query = searchQuery.toLowerCase();

    // Filter Modules
    const filteredModules = allModules.filter(m => 
      m.title.toLowerCase().includes(query) || m.desc.toLowerCase().includes(query)
    ).map(m => ({ ...m, type: 'Tool' as const }));

    // Filter Products
    const filteredProducts = products.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      
      let matchesDate = true;
      if (dateFilter !== 'All' && p.created_at) {
        const date = new Date(p.created_at);
        const now = new Date();
        if (dateFilter === 'Today') {
          matchesDate = date.toDateString() === now.toDateString();
        } else if (dateFilter === 'Week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = date >= weekAgo;
        } else if (dateFilter === 'Month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = date >= monthAgo;
        }
      }

      return matchesQuery && matchesCategory && matchesDate;
    }).map(p => ({ ...p, type: 'Product' as const }));

    // Filter Documents
    const filteredDocs = documentItems.filter(d => {
      const matchesQuery = d.title.toLowerCase().includes(query) || d.content.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      
      let matchesDate = true;
      if (dateFilter !== 'All' && d.created_at) {
        const date = new Date(d.created_at);
        const now = new Date();
        if (dateFilter === 'Today') {
          matchesDate = date.toDateString() === now.toDateString();
        } else if (dateFilter === 'Week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = date >= weekAgo;
        } else if (dateFilter === 'Month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = date >= monthAgo;
        }
      }
      return matchesQuery && matchesCategory && matchesDate;
    }).map(d => ({ ...d, type: 'Document' as const }));

    // Filter Training
    const filteredTraining = trainingModules.filter(t => {
      const matchesQuery = t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
      // Training modules don't have a specific category from the product list, but we can filter by their own category
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      return matchesQuery && matchesCategory;
    }).map(t => ({ ...t, type: 'Training' as const }));

    let results = [];
    if (activeTab === 'All') {
      results = [...filteredModules, ...filteredProducts, ...filteredDocs, ...filteredTraining];
    } else if (activeTab === 'Products') {
      results = filteredProducts;
    } else if (activeTab === 'Documents') {
      results = filteredDocs;
    } else if (activeTab === 'Academy') {
      results = filteredTraining;
    } else if (activeTab === 'Tools') {
      results = filteredModules;
    }

    return results;
  }, [searchQuery, selectedCategory, dateFilter, activeTab, products, documentItems, trainingModules, allModules]);

  const handleResultClick = (result: any) => {
    if (result.type === 'Tool') {
      onNavigate(result.viewState || result.view_state);
    } else if (result.type === 'Product') {
      onNavigate(ViewState.PRODUCTS_CATALOG);
    } else if (result.type === 'Document') {
      onNavigate(ViewState.MODULE_DATA_CORE);
    } else if (result.type === 'Training') {
      onNavigate(ViewState.MODULE_ACADEMY);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex flex-col animate-fade-in">
      {/* Header */}
      <div className="h-24 border-b border-white/10 flex items-center px-8 gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input 
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você está procurando? (Produtos, Documentos, Treinamentos...)"
            className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-14 pr-6 text-white outline-none focus:border-winf-primary/50 transition-all text-lg font-medium"
          />
        </div>
        <button 
          onClick={onClose}
          className="p-3 hover:bg-white/10 rounded-none text-white/40 hover:text-white transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-80 border-r border-white/10 p-5 md:p-8 space-y-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <h3 className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
              <Tag size={12} /> Categoria de Produto
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat || 'All')}
                  className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === (cat || 'All')
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {cat || 'Sem Categoria'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
              <Calendar size={12} /> Data de Publicação
            </h3>
            <div className="space-y-2">
              {['All', 'Today', 'Week', 'Month'].map(date => (
                <button
                  key={date}
                  onClick={() => setDateFilter(date)}
                  className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all ${
                    dateFilter === date
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {date === 'All' ? 'Qualquer Data' : 
                   date === 'Today' ? 'Hoje' : 
                   date === 'Week' ? 'Esta Semana' : 'Este Mês'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="px-8 pt-8 border-b border-white/5 flex gap-8">
            {['All', 'Tools', 'Products', 'Documents', 'Academy'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab === 'All' ? 'Tudo' : 
                 tab === 'Tools' ? 'Ferramentas' :
                 tab === 'Products' ? 'Produtos' : 
                 tab === 'Documents' ? 'Documentos' : 'Academy'}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
            <div className="max-w-4xl space-y-4">
              {filteredResults.length > 0 ? (
                filteredResults.map((result: any, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full group bg-black border border-white/5 hover:border-winf-primary/30 p-6 rounded-none flex items-center gap-6 transition-all text-left"
                  >
                    <div className={`w-12 h-12 rounded-none flex items-center justify-center shrink-0 transition-colors ${
                      result.type === 'Tool' ? 'bg-white/10 text-white' :
                      result.type === 'Product' ? 'bg-blue-500/10 text-blue-500' :
                      result.type === 'Document' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-white/10 text-white'
                    }`}>
                      {result.type === 'Tool' ? (result.icon ? <result.icon size={24} /> : <Grid size={24} />) :
                       result.type === 'Product' ? <Package size={24} /> :
                       result.type === 'Document' ? <FileText size={24} /> :
                       <GraduationCap size={24} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white/40">
                          {result.type === 'Tool' ? 'Ferramenta' : result.type}
                        </span>
                        {result.category && (
                          <>
                            <span className="text-gray-800">•</span>
                            <span className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">
                              {result.category}
                            </span>
                          </>
                        )}
                        {result.created_at && (
                          <>
                            <span className="text-gray-800">•</span>
                            <span className="text-xs md:text-[10px] font-mono text-gray-600 flex items-center gap-1">
                              <Clock size={10} /> {new Date(result.created_at).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-white transition-colors truncate">
                        {result.name || result.title}
                      </h4>
                      <p className="text-sm text-white/40 line-clamp-1 mt-1">
                        {result.description || result.content?.substring(0, 100) + '...'}
                      </p>
                    </div>

                    <ChevronRight className="text-gray-800 group-hover:text-white transition-colors" size={20} />
                  </motion.button>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20">
                  <Search size={64} strokeWidth={1} className="mb-6" />
                  <p className="text-xl font-black uppercase tracking-widest">
                    {searchQuery ? 'Nenhum resultado encontrado' : 'Digite algo para pesquisar'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
