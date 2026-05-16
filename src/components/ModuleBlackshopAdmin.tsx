import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Plus, Edit, Trash2, Save, X, Search, 
  Store, ThermometerSun, ShieldCheck, EyeOff, LayoutDashboard 
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ModuleBlackshopAdmin: React.FC = () => {
  const { products, user, fetchProducts } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Temporary state for the form
  const [formData, setFormData] = useState<any>({
    name: '', line: '', category: 'Arquitetura', description: '', price: 0,
    thermal_score: 0, light_score: 0, shield_score: 0, privacy_score: 0, expiration_date: ''
  });

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEdit = (product: any) => {
    setFormData(product);
    setIsEditing(product.id);
  };

  const handleCreateNew = () => {
    setFormData({
      name: '', line: 'WINF Select™', category: 'Arquitetura', description: '', price: 0,
      thermal_score: 5, light_score: 5, shield_score: 5, privacy_score: 5,
      is_active: true, expiration_date: ''
    });
    setIsEditing('new');
  };

  const handleSave = async () => {
    if (user?.id?.startsWith('proto-')) {
      alert("Aviso: No modo proto (demo), as alterações não serão salvas permanentemente no banco central. O banco precisaria estar online.");
      setIsEditing(null);
      return;
    }

    try {
      if (isEditing === 'new') {
        await addDoc(collection(db, 'products'), {
          ...formData,
          stock_quantity: 100, // deafult
          created_at: serverTimestamp()
        });
      } else {
        await updateDoc(doc(db, 'products', isEditing as string), {
          ...formData
        });
      }
      alert('Produto salvo com sucesso no Hub Central!');
      fetchProducts();
      setIsEditing(null);
    } catch (e: any) {
      alert(`Erro ao salvar: ${e.message}`);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
            <Store className="text-white" size={32} />
            Gestor <span className="text-white">Catálogo Core</span>
          </h1>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Single Source of Truth (SSOT) - Backoffice
          </p>
        </div>
        
        <button 
          onClick={handleCreateNew}
          className="px-6 py-3 bg-white text-black hover:bg-white/80 rounded-none font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,168,132,0.2)]"
        >
          <Plus size={16} /> Adicionar Nova Película
        </button>
      </div>

      <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-none">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Buscar pelo nome da película ou linha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-none text-sm focus:outline-none focus:border-winf-primary transition-colors text-white"
            />
          </div>
          <p className="text-xs font-mono text-white/40 uppercase">{products.length} Ativos no Hub</p>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {filteredProducts.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-none hover:border-winf-primary/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-none border border-white/10 flex items-center justify-center shrink-0">
                  <Package size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs md:text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-none font-mono uppercase">{p.line}</span>
                    <span className="text-xs md:text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-none font-mono uppercase">{p.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                 <div className="hidden md:flex items-center gap-4 text-xs font-mono text-white/40">
                    <div className="flex items-center gap-1" title="Térmica"><ThermometerSun size={14}/> {p.thermal_score || '-'}</div>
                    <div className="flex items-center gap-1" title="Proteção"><ShieldCheck size={14}/> {p.shield_score || '-'}</div>
                    <div className="flex items-center gap-1" title="Privacidade"><EyeOff size={14}/> {p.privacy_score || '-'}</div>
                 </div>
                 
                 <div className="text-right">
                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Preço M²</p>
                    <p className="text-sm font-bold text-white">R$ {p.price?.toFixed(2) || '0.00'}</p>
                 </div>

                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(p)} className="p-2 bg-white/5 hover:bg-white/20 hover:text-white rounded-none text-white/40 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-none text-white/40 transition-colors">
                      <Trash2 size={16} />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Edit Modal Base */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-none p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase tracking-tighter text-white">
                {isEditing === 'new' ? 'Nova Película' : 'Editar Película'}
              </h2>
              <button onClick={() => setIsEditing(null)} className="text-white/40 hover:text-white"><X size={20}/></button>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white/40 mb-1 block">Nome Comercial</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-none px-4 py-2 text-sm text-white focus:border-winf-primary outline-none" />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white/40 mb-1 block">Linha de Família</label>
                    <input type="text" value={formData.line} onChange={e => setFormData({...formData, line: e.target.value})} className="w-full bg-black border border-white/10 rounded-none px-4 py-2 text-sm text-white focus:border-winf-primary outline-none" placeholder="Ex: WINF Select™" />
                  </div>
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white/40 mb-1 block">Categoria Base</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-none px-4 py-2 text-sm text-white focus:border-winf-primary outline-none">
                      <option value="Arquitetura">Arquitetura</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Segurança">Segurança</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white/40 mb-1 block">Descrição Tática</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-none px-4 py-2 text-sm text-white focus:border-winf-primary outline-none h-24" />
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white mb-1 block" title="Rejeição Térmica">Score TSER</label>
                    <input type="number" max="10" min="0" value={formData.thermal_score} onChange={e => setFormData({...formData, thermal_score: Number(e.target.value)})} className="w-full bg-black border border-white/20 rounded-none px-4 py-2 text-sm text-white text-center" />
                  </div>
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-blue-500 mb-1 block" title="Luz Visível">Score VLT</label>
                    <input type="number" max="10" min="0" value={formData.light_score} onChange={e => setFormData({...formData, light_score: Number(e.target.value)})} className="w-full bg-black border border-blue-500/20 rounded-none px-4 py-2 text-sm text-blue-500 text-center" />
                  </div>
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-purple-500 mb-1 block" title="Proteção / Anti-Vandalismo">Score Shield</label>
                    <input type="number" max="10" min="0" value={formData.shield_score} onChange={e => setFormData({...formData, shield_score: Number(e.target.value)})} className="w-full bg-black border border-purple-500/20 rounded-none px-4 py-2 text-sm text-purple-500 text-center" />
                  </div>
                  <div>
                    <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white mb-1 block">Preço Base (R$)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-black border border-winf-primary/30 rounded-none px-4 py-2 text-sm text-white text-center" />
                  </div>
               </div>

               <div>
                 <label className="text-xs md:text-[10px] font-black tracking-widest uppercase text-white/40 mb-1 block">Data de Validade / Expiração</label>
                 <input type="date" value={formData.expiration_date || ''} onChange={e => setFormData({...formData, expiration_date: e.target.value})} className="w-full max-w-xs bg-black border border-white/10 rounded-none px-4 py-2 text-sm text-white focus:border-winf-primary outline-none" style={{ colorScheme: 'dark' }} />
               </div>

               <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                 <button onClick={() => setIsEditing(null)} className="px-6 py-2.5 rounded-none text-xs font-bold text-white/40 hover:text-white uppercase transition-colors">Cancelar</button>
                 <button onClick={handleSave} className="px-6 py-2.5 bg-white text-black hover:bg-white/80 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
                   <Save size={16} /> Salvar no Repositório
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModuleBlackshopAdmin;
