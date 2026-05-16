import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, ShieldCheck, Zap, Network, Database, MessageSquare, Terminal, Globe, Search, Clock, ChevronRight } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useWinf, OperationType, handleFirestoreError } from '../contexts/WinfContext';

const ModuleControlRoom: React.FC = () => {
  const { user, isAuthenticated } = useWinf();
  const [logs, setLogs] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentInstallations, setRecentInstallations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeAgents: 8,
    certificatesIssued: 0,
    networkOperators: 45
  });

  useEffect(() => {
    if (!db || !isAuthenticated || !user) return;
    if (user.id.startsWith('proto-')) return;
    
    const isAdmin = user.role === 'Admin';

    // Listen to Agent Logs
    const qLogs = isAdmin 
      ? query(collection(db, 'agent_logs'), orderBy('created_at', 'desc'), limit(15))
      : query(collection(db, 'agent_logs'), where('user_id', '==', user.id), orderBy('created_at', 'desc'), limit(15));
    const unsubLogs = onSnapshot(qLogs, (snapshot) => {
      const fetchedLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        time: new Date(doc.data().created_at).toLocaleTimeString()
      }));
      setLogs(fetchedLogs);
    }, (error) => {
      console.error('Error in agent_logs listener:', error);
      // We don't necessarily want to crash the whole app if one listener fails
      // but we should log it properly if it's a permission issue
      if (error.code === 'permission-denied') {
        try {
          handleFirestoreError(error, OperationType.GET, 'agent_logs');
        } catch (e) {
          // Error already logged by handleFirestoreError
        }
      }
    });

    // Listen to Recent Leads (Pending Agents)
    // If not admin, only show user's leads
    const qLeads = isAdmin 
      ? query(collection(db, 'leads'), orderBy('created_at', 'desc'), limit(10))
      : query(collection(db, 'leads'), where('user_id', '==', user.id), orderBy('created_at', 'desc'), limit(10));

    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      const fetchedLeads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentLeads(fetchedLeads);
      setStats(prev => ({ ...prev, totalLeads: snapshot.size }));
    }, (error) => {
      console.error('Error in leads listener:', error);
      if (error.code === 'permission-denied') {
        try {
          handleFirestoreError(error, OperationType.GET, 'leads');
        } catch (e) {}
      }
    });

    // Listen to Recent Installations
    const qInst = query(collection(db, 'installations'), orderBy('created_at', 'desc'), limit(10));
    const unsubInst = onSnapshot(qInst, (snapshot) => {
      const fetchedInst = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentInstallations(fetchedInst);
      setStats(prev => ({ ...prev, certificatesIssued: snapshot.size }));
    }, (error) => {
      console.error('Error in installations listener:', error);
      if (error.code === 'permission-denied') {
        try {
          handleFirestoreError(error, OperationType.GET, 'installations');
        } catch (e) {}
      }
    });

    return () => {
      unsubLogs();
      unsubLeads();
      unsubInst();
    };
  }, [isAuthenticated, user]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">WINF CONTROL ROOM</h1>
          </div>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Centro de Comando do Ecossistema</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-none">
          <div className="w-2 h-2 rounded-none bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Sistema Operacional Online</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Leads Ativos', value: stats.totalLeads, icon: Users, color: 'zinc' },
          { label: 'Certificados', value: stats.certificatesIssued, icon: ShieldCheck, color: 'green' },
          { label: 'Operadores', value: stats.networkOperators, icon: Network, color: 'purple' },
          { label: 'Agentes IA', value: stats.activeAgents, icon: Zap, color: 'zinc' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-winf-card border border-white/10 p-6 rounded-none group hover:border-winf-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-${stat.color}-500/10 rounded-none group-hover:bg-${stat.color}-500/20 transition-colors`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Agent Terminal */}
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-none overflow-hidden flex flex-col h-[650px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="bg-zinc-900 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-none bg-red-500/50 animate-pulse"></div>
                <div className="w-2 h-2 rounded-none bg-white/50 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-none bg-green-500/50 animate-pulse delay-150"></div>
              </div>
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <Terminal className="w-4 h-4 text-white" />
              <h3 className="text-xs md:text-[10px] font-mono text-white/60 uppercase tracking-[0.3em]">WINF_OS_AGENT_STREAM_v2.5</h3>
            </div>
            <div className="flex items-center gap-4 text-xs md:text-[10px] font-mono text-white animate-pulse">
              <Activity className="w-3 h-3" />
              LIVE_UPLINK_ACTIVE
            </div>
          </div>
          
          {/* Map Visualization Overlay */}
          <div className="h-48 bg-[#050505] relative overflow-hidden border-b border-white/10 group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {[
                  { t: '20%', l: '30%', s: 1 },
                  { t: '40%', l: '60%', s: 1.2 },
                  { t: '70%', l: '45%', s: 0.8 },
                  { t: '25%', l: '80%', s: 1.5 },
                  { t: '55%', l: '20%', s: 1.1 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5 * p.s, 1 * p.s], opacity: [0, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                    className="absolute w-3 h-3 bg-white rounded-none blur-[2px]"
                    style={{ top: p.t, left: p.l }}
                  />
                ))}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <Globe className="w-3 h-3 text-white" />
              <span className="text-[10px] md:text-[8px] font-mono text-white/40 uppercase tracking-widest">Global Network Activity Visualization</span>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto font-mono text-xs md:text-[10px] space-y-4 custom-scrollbar bg-black/80">
            {/* Pending Leads Section */}
            {recentLeads.filter(l => l.agent_status === 'pending').map((lead, i) => (
              <motion.div 
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 group border-l-2 border-white/50 pl-4 py-1"
              >
                <span className="text-white shrink-0 font-bold tracking-tighter">[PENDING]</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-black tracking-tight px-1.5 py-0.5 rounded-none bg-white/10 text-white">
                    WINF CONCIERGE AI™
                  </span>
                  <span className="text-gray-800">::</span>
                  <span className="text-white/40">Qualificando novo lead: <span className="text-white">{lead.name}</span> ({lead.city})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-none bg-white animate-pulse" />
                  <span className="shrink-0 uppercase font-black tracking-[0.2em] text-[10px] md:text-[8px] text-white">
                    processing
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Logs Section */}
            {logs.map((log, i) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 group"
              >
                <span className="text-gray-700 shrink-0 font-bold tracking-tighter">[{log.time}]</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className={`font-black tracking-tight px-1.5 py-0.5 rounded bg-white/5 ${
                    log.agent.includes('CONCIERGE') ? 'text-zinc-100' :
                    log.agent.includes('REGISTRY') ? 'text-green-400' :
                    log.agent.includes('SALES') ? 'text-white' :
                    log.agent.includes('OPS') ? 'text-white/40' : 'text-purple-400'
                  }`}>
                    {log.agent}
                  </span>
                  <span className="text-gray-800">::</span>
                  <span className="text-white/40 group-hover:text-white transition-colors">{log.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-none ${
                    log.status === 'completed' ? 'bg-green-500' : 'bg-white animate-pulse'
                  }`} />
                  <span className={`shrink-0 uppercase font-black tracking-[0.2em] text-[10px] md:text-[8px] ${
                    log.status === 'completed' ? 'text-green-500' : 'text-white'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-Time Registry */}
        <div className="bg-winf-card border border-white/10 rounded-none flex flex-col h-[650px] shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs md:text-[10px]">Real-Time Registry</h3>
            <Database className="w-4 h-4 text-gray-700" />
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            <AnimatePresence>
              {recentInstallations.map((inst, i) => (
                <motion.div 
                  key={inst.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-black/40 border border-white/5 p-5 rounded-none hover:border-winf-primary/20 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-mono text-white font-bold tracking-widest">{inst.id}</span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-none ${
                      inst.status === 'completed' ? 'bg-green-500/10' : 'bg-white/10'
                    }`}>
                      <ShieldCheck className={`w-3 h-3 ${inst.status === 'completed' ? 'text-green-500' : 'text-white'}`} />
                      <span className={`text-[10px] md:text-[8px] font-black uppercase tracking-widest ${
                        inst.status === 'completed' ? 'text-green-500' : 'text-white'
                      }`}>
                        {inst.status === 'completed' ? 'Certificado Emitido' : 'Processando'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-black text-white mb-1 uppercase tracking-tight group-hover:text-white transition-colors">{inst.client_name}</p>
                  <p className="text-xs md:text-[10px] text-white/40 mb-3 font-medium">{inst.product_name}</p>
                  <div className="flex items-center gap-2 text-[10px] md:text-[8px] text-gray-600 font-mono uppercase tracking-widest border-t border-white/5 pt-3">
                    <Activity className="w-3 h-3" />
                    LOC: {inst.city}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {recentInstallations.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 md:p-10">
                <div className="w-16 h-16 rounded-none bg-white/5 flex items-center justify-center mb-6">
                  <Database className="w-8 h-8 text-gray-700" />
                </div>
                <p className="text-xs md:text-[10px] font-black uppercase tracking-widest text-gray-600">Aguardando Sincronização...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleControlRoom;
