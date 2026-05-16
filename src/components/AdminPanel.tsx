
import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Shield, 
  UserCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail,
  UserPlus, 
  Award, 
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  ArrowLeft,
  Zap,
  Bot,
  Settings2,
  Terminal,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { User } from '../types';
import ModuleControlRoom from './ModuleControlRoom';

const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { members, fetchMembers, updateUserRole, user: currentUser } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filteredUsers = members.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roles = ['All', 'Admin', 'Level 1', 'Level 2', 'Level 3', 'Architect', 'Member'];
  const [activeTab, setActiveTab] = useState<'members' | 'orchestration'>('members');

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white animate-fade-in relative selection:bg-amber-400/30 selection:text-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/50 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-none hover:bg-white/5 transition-colors text-white/40 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Shield size={24} className="text-amber-400" />
              Painel de <span className="text-amber-400">Orquestração</span>
            </h1>
            <p className="text-xs md:text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-1">Gestão de Níveis, Arquitetos e Automações (Agentes de IA)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all">
             <UserPlus size={14} /> Ativar Novo Licenciado
          </button>
          <div className="flex rounded-none border border-white/10 p-1 bg-black">
            <button
               onClick={() => setActiveTab('members')}
               className={`px-6 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === 'members' ? 'bg-white text-black' : 'text-white/50 hover:text-white hover:bg-white/5'
               }`}
            >
              Membros & Níveis
            </button>
            <button
               onClick={() => setActiveTab('orchestration')}
               className={`px-6 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                 activeTab === 'orchestration' ? 'bg-amber-400 text-black' : 'text-amber-400/50 hover:text-amber-400 hover:bg-amber-400/10'
               }`}
            >
              <Zap size={12} /> IA & Automações
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative z-10">
        {activeTab === 'members' ? (
          <>
            {/* Sidebar Filters */}
        <div className="w-full md:w-64 border-r border-white/5 p-6 space-y-8 bg-zinc-900/10">
          <div>
            <label className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 block">Pesquisar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input 
                type="text"
                placeholder="Nome ou Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-winf-primary/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 block">Nível de Acesso</label>
            <div className="space-y-2">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-none text-xs font-bold transition-all ${
                    roleFilter === role 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {role === 'All' ? 'Todos' : role}
                  {roleFilter === role && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-none bg-white/5 border border-winf-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={14} className="text-white" />
              <span className="text-xs md:text-[10px] font-black uppercase tracking-tighter text-white">Acesso Restrito</span>
            </div>
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-500 leading-relaxed font-medium">
              Apenas administradores de nível Board podem conceder ou revogar permissões exclusivas.
            </p>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((u, idx) => (
                <motion.div
                  key={u.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-zinc-900/40 border border-white/5 rounded-none p-4 hover:border-winf-primary/30 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-none bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative group-hover:border-winf-primary/50 transition-colors">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users size={20} className="text-zinc-600" />
                        )}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold uppercase tracking-tight">{u.name}</h3>
                          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-none border border-white/5 font-black uppercase tracking-tighter ${
                            u.role === 'Admin' ? 'bg-white/10 text-white' : 
                            u.role === 'Licenciado' ? 'bg-blue-500/10 text-blue-400' : 
                            'bg-white/5 text-zinc-500'
                          }`}>
                            <div className={`w-1 h-1 rounded-none ${
                              u.role === 'Admin' ? 'bg-white animate-pulse shadow-[0_0_5px_currentColor]' : 
                              u.role === 'Licenciado' ? 'bg-blue-400' : 
                              'bg-zinc-600'
                            }`} />
                            <span className="text-[10px] md:text-[8px]">{u.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs md:text-[10px] text-zinc-500">
                            <Mail size={10} />
                            {u.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs md:text-[10px] text-white/60">
                            <Award size={10} />
                            {u.w_rank_level || 'Initiate'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex flex-col items-end">
                        <span className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">WinfCoins</span>
                        <span className="text-xs font-bold text-white">{u.winfCoins?.toLocaleString() || 0}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <select 
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value)}
                          disabled={u.id === currentUser?.id}
                          className="bg-white/5 border border-white/10 rounded-none px-3 py-1.5 text-xs md:text-[10px] font-bold uppercase tracking-tighter focus:outline-none focus:border-winf-primary/50 transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                        >
                          <option value="Member">Member</option>
                          <option value="Level 1">Level 1</option>
                          <option value="Level 2">Level 2</option>
                          <option value="Level 3">Level 3</option>
                          <option value="Architect">Architect</option>
                          <option value="Licensee">Licensee</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <ChevronRight className="absolute right-10 pointer-events-none text-zinc-500 rotate-90" size={10} />
                        
                        <button className="p-2 rounded-none hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                <Users size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Nenhum membro encontrado</p>
              </div>
            )}
          </div>
        </div>
          </>
        ) : (
          <div className="flex-1 w-full overflow-hidden overflow-y-auto bg-black flex flex-col">
             <div className="p-8 border-b border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/40 border border-white/10 p-6 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-amber-400/20 flex items-center justify-center text-amber-400">
                            <Bot size={20} />
                         </div>
                         <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-white">Winf Agent Control</h4>
                            <p className="text-[10px] md:text-[8px] text-white/50 uppercase tracking-[0.2em] font-bold">Orquestração de Agentes IA</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] md:text-[8px] font-black uppercase tracking-tighter">
                         <div className="w-1 h-1 bg-green-500 animate-pulse" />
                         Active
                      </div>
                   </div>
                   <div className="space-y-2">
                       <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5">
                          <span className="text-xs md:text-[10px] font-bold text-white/70 uppercase">WINF BRAIN AGENT™</span>
                          <button className="text-[10px] md:text-[8px] font-black uppercase tracking-widest bg-amber-400 text-black px-3 py-1 hover:bg-amber-500 transition-all">Configurar</button>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 opacity-50">
                          <span className="text-xs md:text-[10px] font-bold text-white/70 uppercase">SALES HUNTER AGENT™</span>
                          <button className="text-[10px] md:text-[8px] font-black uppercase tracking-widest bg-white/5 text-white/50 border border-white/10 px-3 py-1">Habilitar</button>
                       </div>
                   </div>
                </div>

                <div className="bg-zinc-900/40 border border-white/10 p-6 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-blue-400/20 flex items-center justify-center text-blue-400">
                            <Zap size={20} />
                         </div>
                         <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-white">Provisioning System</h4>
                            <p className="text-[10px] md:text-[8px] text-white/50 uppercase tracking-[0.2em] font-bold">Habilitar Ferramentas p/ Nível</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-2">
                       {[
                         { name: 'Calculadora Térmica', levels: ['N1', 'N2'] },
                         { name: 'Winf Precision', levels: ['N2', 'N3'] },
                         { name: 'Architect Hub', levels: ['Arch'] },
                         { name: 'Blackshop Elite', levels: ['N3', 'Lic'] }
                       ].map((tool) => (
                         <div key={tool.name} className="flex items-center justify-between p-3 bg-black/40 border border-white/5">
                            <span className="text-xs md:text-[10px] font-bold text-white/70 uppercase">{tool.name}</span>
                            <div className="flex items-center gap-1">
                               {tool.levels.map(l => (
                                 <div key={l} className="bg-blue-500/10 border border-blue-500/20 text-blue-500 px-1 py-0.5 text-[10px] md:text-[8px] font-black">{l}</div>
                               ))}
                               <button className="w-4 h-4 flex items-center justify-center bg-white/5 border border-white/10 text-white/30 hover:text-white transition-all">
                                 <Settings2 size={8} />
                               </button>
                            </div>
                         </div>
                       ))}
                   </div>
                </div>

                <div className="bg-[#111] border border-white/10 overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-amber-400" />
                        <h4 className="text-xs md:text-[10px] font-black uppercase tracking-widest text-white">Neural Terminal</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500" />
                        <div className="w-1 h-1 bg-amber-500" />
                        <div className="w-1 h-1 bg-green-500" />
                      </div>
                   </div>
                   <div className="flex-1 p-4 font-mono text-xs md:text-[10px] md:text-sm md:text-[11px] text-green-500/70 space-y-1 bg-black/60 overflow-y-auto max-h-[160px]">
                      <p>{">"} SYSTEM: Cortex v.3.4.1 online</p>
                      <p>{">"} ACCESS: Administrator protocol verified</p>
                      <p>{">"} ANALYZING: System payload integrity... OK</p>
                      <p>{">"} AGENT: Winf Brain responding at 24ms</p>
                      <p className="animate-pulse">{">"} WAITING FOR COMMAND...</p>
                   </div>
                   <div className="p-2 border-t border-white/10 bg-zinc-900 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Digite comando mestre..." 
                        className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs md:text-[10px] text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                      <button className="bg-amber-400 text-black px-4 py-1 text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all">
                        SEND
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 w-full overflow-hidden flex flex-col">
                <div className="px-8 py-4 bg-zinc-950 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Activity size={16} className="text-white" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-white">Painel de Controle de Fluxos</h3>
                   </div>
                   <div className="flex items-center gap-4 text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-white/40 uppercase">
                      <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Load: 12%</span>
                      <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-white rounded-full" /> API: Stable</span>
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                   <ModuleControlRoom />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
