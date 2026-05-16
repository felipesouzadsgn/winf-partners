
import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  FileText, 
  Lock, 
  Scan, 
  ShieldCheck, 
  Download, 
  Search, 
  History, 
  Terminal, 
  Trophy, 
  BarChart4, 
  Zap, 
  QrCode,
  Layout,
  UserCheck,
  Globe
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import TextoCriptografado from './TextoCriptografado';

const ModuleDataCore: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, documentItems } = useWinf();
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);

  const categories = ['Todos', 'Estratégia', 'Marca', 'Técnico', 'Equity', 'Operacional'];
  
  const PLAN_LEVELS: Record<string, number> = {
    'nivel1': 1,
    'nivel2': 2,
    'nivel3': 3
  };

  const handleOpenDoc = (doc: any) => {
    // Verificação de Nível de Acesso (Hierarquia de Planos)
    if (doc.required_plan && user?.role !== 'Admin') {
        const userPlan = user?.plan || 'nivel1';
        const userLevel = PLAN_LEVELS[userPlan] || 0;
        const requiredLevel = PLAN_LEVELS[doc.required_plan] || 0;

        if (userLevel < requiredLevel) {
            alert(`ACESSO NEGADO. Este documento requer o plano ${doc.required_plan.toUpperCase()} ou superior. Seu plano atual: ${userPlan.toUpperCase()}.`);
            return;
        }
    }

    // Verificação legada (Role-based fallback)
    if (doc.access_role === 'Admin' && user?.role !== 'Admin') {
        alert("ACESSO NEGADO. Nível Board Requerido.");
        return;
    }
    if (doc.access_role === 'Licenciado' && user?.role === 'Member' && !doc.required_plan) {
        alert("ACESSO NEGADO. Licença Ativa Requerida.");
        return;
    }

    setActiveDoc(doc);
    setIsDecrypting(true);
    setDecryptProgress(0);
    
    const interval = setInterval(() => {
        setDecryptProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setIsDecrypting(false);
                return 100;
            }
            return prev + (Math.random() * 20);
        });
    }, 150);
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-heading font-bold text-white mt-10 mb-6 tracking-tighter border-b border-white/5 pb-4">{line.replace('# ', '')}</h1>;
        if (line.match(/^\d+\. /)) return <h1 key={i} className="text-4xl font-heading font-bold text-white mt-10 mb-6 tracking-tighter border-b border-white/5 pb-4">{line}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white/40 mt-8 mb-4 uppercase tracking-widest">{line.replace('## ', '')}</h2>;
        if (line.match(/^\d+\.\d+\. /)) return <h2 key={i} className="text-xl font-bold text-white/40 mt-8 mb-4 uppercase tracking-widest">{line}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-white/60 mt-6 mb-2 uppercase">{line.replace('### ', '')}</h3>;
        if (line.startsWith('- ')) return <li key={i} className="ml-4 text-white/40 mb-2 font-light list-disc pl-2">{line.replace('- ', '')}</li>;
        return <p key={i} className="mb-4 text-white/40 leading-relaxed font-light text-base">{line}</p>;
    });
  };

  const filteredDocs = documentItems.filter(d => activeCategory === 'Todos' || d.category === activeCategory);

    const handleDownloadPDF = () => {
        window.print();
    };

  return (
    <div className="flex flex-col h-full animate-fade-in bg-black print:bg-white print:text-black">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/[0.05] pb-6 md:pb-10 mb-6 md:mb-10 gap-6 md:gap-8 print:hidden">
            <div className="w-full lg:w-auto">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <ChevronLeft size={14} /> Mission Control
                </button>
                <h1 className="text-3xl md:text-5xl font-heading font-light text-white tracking-tighter uppercase leading-none">
                    WINF™ PARTNERS <span className="font-bold text-white/40">KNOWLEDGE</span>
                </h1>
                <p className="text-gray-600 text-xs md:text-[10px] mt-4 uppercase tracking-[0.4em] font-mono">Central Intelligence Repository // v5.0.3</p>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full lg:w-auto">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 md:px-6 py-2 rounded-none border text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                            activeCategory === cat 
                            ? 'bg-zinc-800 border-zinc-700 text-white shadow-[0_0_20px_rgba(113,113,122,0.3)]' 
                            : 'border-white/10 text-gray-600 hover:border-white/30'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:gap-1 min-h-0 overflow-hidden print:overflow-visible print:block">
            {/* Sidebar List */}
            <div className={`w-full lg:w-1/3 bg-[#050505] border border-white/[0.05] flex flex-col rounded-none lg:rounded-none lg:rounded-tl-3xl overflow-hidden print:hidden ${activeDoc ? 'hidden lg:flex' : 'flex'}`}>
                <div className="p-6 md:p-8 border-b border-white/[0.03] flex justify-between items-center bg-white/[0.01]">
                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest flex items-center gap-2">
                        <Terminal size={12} /> Asset Library
                    </p>
                    <Search size={14} className="text-gray-700" />
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
                    {filteredDocs.map(doc => (
                        <button 
                            key={doc.id} 
                            onClick={() => handleOpenDoc(doc)} 
                            className={`w-full text-left p-4 md:p-6 rounded-none transition-all flex items-start gap-4 group ${
                                activeDoc?.id === doc.id 
                                ? 'bg-zinc-800/10 border border-zinc-700/30' 
                                : 'hover:bg-black border border-transparent'
                            }`}
                        >
                            <div className={`mt-1 p-2 rounded-none ${activeDoc?.id === doc.id ? 'bg-zinc-800 text-white' : 'bg-white/5 text-gray-700'}`}>
                                {doc.category === 'Equity' ? <BarChart4 size={16} /> : 
                                 doc.category === 'Estratégia' ? <Trophy size={16} /> :
                                 doc.category === 'Marca' ? <Zap size={16} /> : <FileText size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block truncate font-bold text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{doc.title}</span>
                                <div className="flex justify-between items-center mt-3">
                                    <span className={`text-[10px] md:text-[8px] font-black uppercase tracking-tighter ${
                                        doc.access_role === 'Admin' ? 'text-white/40' : 'text-gray-600'
                                    }`}>
                                        {doc.category}
                                    </span>
                                    {doc.access_role === 'Admin' && <Lock size={10} className="text-zinc-700" />}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Document Viewer */}
            <div className={`flex-1 bg-[#020202] border border-white/[0.05] relative overflow-hidden flex flex-col shadow-2xl rounded-none lg:rounded-none lg:rounded-tr-3xl print:shadow-none print:border-none print:bg-white print:text-black ${!activeDoc ? 'hidden lg:flex' : 'flex'}`}>
                {isDecrypting ? (
                    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 md:p-10 animate-fade-in print:hidden">
                        <div className="w-full max-w-xs h-1 bg-white/[0.03] mb-8 relative overflow-hidden rounded-none">
                            <div className="h-full bg-zinc-800 transition-all duration-300" style={{ width: `${decryptProgress}%` }}></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Scan size={20} className="text-white/40 animate-pulse" />
                            <p className="text-[12px] font-mono text-white/40 uppercase tracking-[0.5em]">Neural Link: {Math.floor(decryptProgress)}%</p>
                        </div>
                    </div>
                ) : activeDoc ? (
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 print:overflow-visible">
                        <div className="p-8 md:p-16 lg:p-24 max-w-4xl mx-auto print:p-0">
                            <div className="flex justify-between items-center mb-10 md:mb-16 print:mb-8 opacity-50 print:opacity-100">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setActiveDoc(null)} className="lg:hidden p-2 bg-white/5 rounded-none text-white/40 print:hidden">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <ShieldCheck size={18} className="text-white/40 print:text-black" />
                                    <span className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 print:text-black hidden sm:inline">Validated Tactical Knowledge // WINF™</span>
                                </div>
                                <div className="flex gap-2 md:gap-4 print:hidden">
                                    <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 border border-white/5 hover:bg-white/10 rounded-none text-white/40 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-widest"><Download size={14}/> Gerar PDF</button>
                                    <button className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-none text-white/40 hover:text-white transition-colors"><History size={18}/></button>
                                </div>
                            </div>
                            
                            <div className="prose prose-invert max-w-none print:prose-p:text-gray-900 print:prose-headings:text-black print:prose-li:text-gray-900">
                                {renderMarkdown(activeDoc.content)}
                            </div>

                            <div className="mt-20 md:mt-32 pt-12 border-t border-white/5 print:border-gray-200 text-center">
                                <div className="inline-block p-4 md:p-6 border border-white/5 print:border-gray-200 rounded-none mb-8">
                                    <QrCode size={60} className="text-gray-800 print:text-gray-900 md:w-20 md:h-20" />
                                </div>
                                <p className="text-xs md:text-[10px] text-gray-800 print:text-gray-900 uppercase tracking-[0.6em]">Winf™ PARTNERS International // Official Document</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-10 opacity-10">
                        <BookOpen size={60} strokeWidth={0.5} className="mb-6 md:mb-10 text-white md:w-24 md:h-24" />
                        <p className="text-xs uppercase font-black tracking-[0.4em] md:tracking-[0.8em]">Selecione um ativo para análise tática</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
export default ModuleDataCore;
