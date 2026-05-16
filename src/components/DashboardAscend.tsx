
import React, { useEffect } from 'react';
import { Award, Calendar, Lock } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const DashboardAscend: React.FC<{user: any, onChangeView: any}> = ({ user, onChangeView }) => {
  const { userModuleProgress, platformEvents, fetchUserModuleProgress, fetchPlatformEvents } = useWinf();
  useEffect(() => { fetchUserModuleProgress(); fetchPlatformEvents(); }, []);

  const completed = userModuleProgress.filter(p => p.status === 'completed').length;

  // Role-based Access Control for Events
  const filteredEvents = platformEvents.filter(ev => {
    // If no roles specified, everyone sees it. If specified, must include user role.
    if (!ev.target_roles || ev.target_roles.length === 0) return true;
    return ev.target_roles.includes(user.role);
  });

  // Calculate hidden events to show "blocked" count
  const hiddenCount = platformEvents.length - filteredEvents.length;

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <h1 className="text-3xl font-light text-white">WINF <span className="font-bold text-winf-ascend">ASCEND</span></h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-winf-card border border-white/10 rounded-none p-6">
                <h3 className="text-white font-bold mb-4">Seu Progresso</h3>
                <div className="text-4xl font-bold text-winf-ascend mb-2">{completed} / 12</div>
                <p className="text-xs text-white/40">Módulos Completados</p>
            </div>
            
            <div className="lg:col-span-2 bg-winf-card border border-white/10 rounded-none p-6">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-white font-bold flex items-center gap-2"><Calendar size={18}/> Próximos Eventos</h3>
                     {hiddenCount > 0 && (
                        <div className="flex items-center gap-2 text-xs md:text-[10px] text-gray-600 bg-gray-900 px-2 py-1 rounded-none border border-gray-800">
                           <Lock size={10} /> {hiddenCount} Eventos Restritos
                        </div>
                     )}
                </div>
                
                <div className="space-y-3">
                    {filteredEvents.map(ev => (
                        <div key={ev.id} className="flex justify-between items-center p-3 bg-white/5 rounded-none border border-white/5 relative group hover:border-winf-ascend/50 transition-colors">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-bold">{ev.title}</p>
                                    {ev.target_roles && ev.target_roles.includes('Admin') && (
                                        <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] bg-red-900/50 text-red-400 border border-red-500/30 px-1 rounded-none uppercase font-bold">Admin Only</span>
                                    )}
                                </div>
                                <p className="text-xs text-white/40">{new Date(ev.date).toLocaleDateString()} • {ev.type}</p>
                            </div>
                            <button className="text-xs border border-white/20 px-3 py-1 rounded-none text-white hover:bg-white/10">Inscrever</button>
                        </div>
                    ))}
                    {filteredEvents.length === 0 && <p className="text-white/40 text-sm">Nenhum evento disponível para seu nível.</p>}
                </div>
            </div>
        </div>
    </div>
  );
};
export default DashboardAscend;
