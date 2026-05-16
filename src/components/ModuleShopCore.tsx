import React, { useState } from 'react';
import { 
  Calendar, Package, Users, Calculator, 
  ChevronLeft, Plus, Search, Filter, 
  Clock, CheckCircle2, AlertTriangle, 
  MapPin, User, ArrowRight, Save, 
  ClipboardList, TrendingUp, Scissors
} from 'lucide-react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  id: string;
  customer: string;
  vehicle: string;
  service: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  time: string;
  applicator: string;
  film: string;
}

interface RollStock {
  id: string;
  brand: string;
  series: string;
  shade: string;
  remainingMeters: number;
  widthMeters: number;
}

const ModuleShopCore: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'stock' | 'team' | 'calc'>('agenda');

  const [jobs] = useState<Job[]>([
    { id: '1', customer: 'Ricardo Silva', vehicle: 'BMW X5', service: 'Full AeroCore™', status: 'in_progress', time: '14:30', applicator: 'Marcos', film: 'AeroCore 70' },
    { id: '2', customer: 'Lúcia Ferreira', vehicle: 'Tesla Model 3', service: 'Privacidade NeoSkin', status: 'pending', time: '16:00', applicator: 'Mário', film: 'NeoSkin 05' },
    { id: '3', customer: 'Condomínio Alpha', vehicle: 'Portaria (Arquitetura)', service: 'Eficiência Térmica', status: 'completed', time: '09:00', applicator: 'Equipe B', film: 'Winf Arch Silver' },
  ]);

  const [stock] = useState<RollStock[]>([
    { id: 'R1', brand: 'WINF', series: 'AeroCore™', shade: '70%', remainingMeters: 12.5, widthMeters: 1.52 },
    { id: 'R2', brand: 'WINF', series: 'NeoSkin', shade: '20%', remainingMeters: 5.2, widthMeters: 1.52 },
    { id: 'R3', brand: 'WINF', series: 'Precision Black', shade: '05%', remainingMeters: 30, widthMeters: 0.50 },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <ChevronLeft size={14} /> Back to Hub
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
            SHOP <span className="text-white">CORE™</span>
          </h1>
          <p className="text-gray-600 text-xs mt-3 uppercase tracking-widest font-mono">Operational Excellence & Shop Management</p>
        </div>

        <div className="flex bg-black/40 border border-white/5 p-1">
          {[
            { id: 'agenda', label: 'Agenda', icon: Calendar },
            { id: 'stock', label: 'Estoque', icon: Package },
            { id: 'team', label: 'Equipe', icon: Users },
            { id: 'calc', label: 'Corte', icon: Scissors },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 text-xs md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'agenda' && (
          <motion.div 
            key="agenda"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4">
                   <div className="flex items-center gap-6">
                      <h3 className="text-white font-bold uppercase text-xs">Hoje: 02 Maio</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase border border-amber-500/20">2 Pendentes</span>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase border border-blue-500/20">1 Em Execução</span>
                      </div>
                   </div>
                   <button className="bg-white text-black px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all">
                      <Plus size={14} /> Novo Serviço
                   </button>
                </div>

                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-[#0A0A0A] border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-winf-primary/30 transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/40 group-hover:text-white transition-colors">
                             <Clock size={20} />
                             <span className="text-xs md:text-[10px] font-black mt-1">{job.time}</span>
                          </div>
                          <div>
                             <h4 className="text-white font-bold text-lg uppercase tracking-tighter">{job.vehicle}</h4>
                             <p className="text-white/40 text-xs md:text-[10px] font-black uppercase tracking-widest">{job.customer} • {job.service}</p>
                          </div>
                       </div>

                       <div className="flex flex-wrap items-center gap-4">
                          <div className="flex flex-col items-end">
                             <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-gray-600 uppercase font-black">Aplicador</span>
                             <span className="text-white text-xs font-bold uppercase">{job.applicator}</span>
                          </div>
                          <div className="w-[1px] h-8 bg-white/10 hidden md:block"></div>
                          <div className={`px-4 py-2 text-xs md:text-[10px] font-black uppercase tracking-widest border ${
                            job.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            job.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            'bg-green-500/10 text-green-500 border-green-500/20'
                          }`}>
                            {job.status.replace('_', ' ')}
                          </div>
                          <button className="p-3 bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                             <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6">Métrica Diária</h3>
                    <div className="space-y-6">
                       <div>
                          <div className="flex justify-between text-xs md:text-[10px] font-black uppercase mb-2">
                             <span className="text-white/40">Capacidade da Loja</span>
                             <span className="text-white">75%</span>
                          </div>
                          <div className="h-1 bg-white/5 overflow-hidden">
                             <div className="h-full bg-white" style={{ width: '75%' }}></div>
                          </div>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 border border-white/10">
                             <span className="text-[10px] md:text-[8px] text-white/40 uppercase font-black block mb-1">M² Instalados</span>
                             <span className="text-xl font-bold text-white uppercase italic">42.5</span>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10">
                             <span className="text-[10px] md:text-[8px] text-white/40 uppercase font-black block mb-1">Ticket Médio</span>
                             <span className="text-xl font-bold text-white uppercase italic">R$1.8k</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4">Próximos Dias</h3>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                         <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-gray-600 font-black text-xs uppercase">
                            {i + 2} <br/> Mai
                         </div>
                         <div className="flex-1">
                            <span className="text-white text-xs md:text-[10px] font-bold uppercase block">4 Agendamentos</span>
                            <span className="text-gray-600 text-[10px] md:text-[8px] uppercase font-black">Previsão: R$ 8.400,00</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'stock' && (
          <motion.div 
            key="stock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1 relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                 <input 
                  type="text" 
                  placeholder="Pesquisar bobina..."
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm text-white focus:outline-none focus:border-winf-primary/40" 
                 />
               </div>
               <button className="bg-white/5 border border-white/10 px-8 py-4 text-xs md:text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 hover:bg-white/10 transition-all">
                 <Filter size={14} /> Filtros Avançados
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {stock.map(roll => (
                 <div key={roll.id} className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-6 group hover:border-winf-primary/30 transition-all">
                    <div className="flex justify-between items-start">
                       <div>
                          <span className="text-white text-xs md:text-[10px] font-black uppercase tracking-widest">{roll.brand}™</span>
                          <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">{roll.series} {roll.shade}</h4>
                       </div>
                       <div className="p-3 bg-white/5 border border-white/10 text-gray-600">
                          <Package size={20} />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div>
                          <div className="flex justify-between text-xs md:text-[10px] font-black uppercase mb-2">
                             <span className="text-gray-600">Meters Remaining</span>
                             <span className={roll.remainingMeters < 10 ? 'text-amber-500' : 'text-white'}>
                                {roll.remainingMeters}m / 30m
                             </span>
                          </div>
                          <div className="h-1 bg-white/5 overflow-hidden">
                             <div 
                              className={`h-full transition-all duration-1000 ${roll.remainingMeters < 10 ? 'bg-amber-500' : 'bg-white'}`} 
                              style={{ width: `${(roll.remainingMeters / 30) * 100}%` }}
                             ></div>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="flex-1 bg-white/5 p-3 text-center border border-white/5">
                             <span className="text-[10px] md:text-[8px] text-gray-600 uppercase font-black block">Largura</span>
                             <span className="text-xs text-white font-bold">{roll.widthMeters}m</span>
                          </div>
                          <div className="flex-1 bg-white/5 p-3 text-center border border-white/5">
                             <span className="text-[10px] md:text-[8px] text-gray-600 uppercase font-black block">Estimativa</span>
                             <span className="text-xs text-white font-bold">~{Math.floor(roll.remainingMeters / 2.5)} Veículos</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-2">
                       <button className="flex-1 bg-white/5 border border-white/10 text-white text-xs md:text-[10px] font-black uppercase tracking-widest py-3 hover:bg-white/10 transition-all">Baixar Métrica</button>
                       <button className="flex-1 bg-white text-black text-xs md:text-[10px] font-black uppercase tracking-widest py-3 hover:bg-white transition-all">Solicitar Reposição</button>
                    </div>
                 </div>
               ))}

               {/* New Roll Placeholder */}
               <div className="border border-dashed border-white/10 flex flex-col items-center justify-center p-5 md:p-8 space-y-4 group hover:border-winf-primary/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-gray-600 group-hover:text-white group-hover:border-winf-primary transition-all">
                     <Plus size={24} />
                  </div>
                  <span className="text-xs md:text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover:text-white transition-all">Cadastrar Nova Bobina</span>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
           <motion.div 
            key="team"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
           >
              {[
                { name: 'Marcos Oliver', role: 'Head Applicator / AeroCore Specialist', efficiency: 98, jobs: 420 },
                { name: 'Mário Souza', role: 'Premium Tint Specialist', efficiency: 92, jobs: 315 },
                { name: 'Equipe B', role: 'Architectural / Commercial Division', efficiency: 85, jobs: 84 },
              ].map((member, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-white/10 p-5 md:p-8 space-y-8 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Users size={80} />
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                         <User size={32} />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg uppercase tracking-tighter leading-none">{member.name}</h4>
                         <p className="text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest mt-1">{member.role}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 border border-white/10 text-center">
                         <span className="text-[10px] md:text-[8px] text-gray-600 uppercase font-black block mb-1">Qualidade</span>
                         <span className="text-2xl font-black text-white italic">{member.efficiency}%</span>
                      </div>
                      <div className="bg-white/5 p-4 border border-white/10 text-center">
                         <span className="text-[10px] md:text-[8px] text-gray-600 uppercase font-black block mb-1">Total Jobs</span>
                         <span className="text-2xl font-black text-white italic">{member.jobs}</span>
                      </div>
                   </div>

                   <button className="w-full bg-white/5 border border-white/10 text-white text-xs md:text-[10px] font-black uppercase tracking-widest py-4 hover:bg-white hover:text-black transition-all">Histórico de Performance</button>
                </div>
              ))}
           </motion.div>
        )}

        {activeTab === 'calc' && (
          <motion.div 
            key="calc"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-10 space-y-8">
                     <header>
                        <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-2">Calculadora de Corte Winf™</h3>
                        <p className="text-white/40 text-xs md:text-[10px] font-black uppercase tracking-widest">Otimização máxima de bobina.</p>
                     </header>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-black uppercase tracking-widest">Tipo de Veículo</label>
                           <select className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs font-bold uppercase outline-none focus:border-winf-primary/40">
                              <option>Sedan Médio</option>
                              <option>SUV Grande</option>
                              <option>Pickup</option>
                              <option>Hatch Compacto</option>
                           </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-black uppercase tracking-widest">Tamanho do Parabrisa</label>
                              <input type="text" placeholder="cm x cm" className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs outline-none focus:border-winf-primary/40" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-black uppercase tracking-widest">Laterais / Traseiro</label>
                              <input type="text" placeholder="cm x cm" className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs outline-none focus:border-winf-primary/40" />
                           </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/5 border border-winf-primary/20">
                           <TrendingUp size={24} className="text-white" />
                           <div>
                              <span className="text-white text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest">IA Recomendação</span>
                              <p className="text-white text-xs md:text-[10px] font-bold">Use bobina de 1.52m com corte longitudinal para reduzir perda em 15%.</p>
                           </div>
                        </div>

                        <button className="w-full bg-white text-black text-xs md:text-[10px] font-black uppercase tracking-widest py-5 flex items-center justify-center gap-3 hover:bg-white transition-all">
                           Calcular Otimização <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 md:p-10 flex flex-col justify-center items-center text-center space-y-8 border-l border-white/10">
                     <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 border-2 border-winf-primary/20 rounded-full animate-spin-slow"></div>
                        <span className="text-4xl font-black text-white italic">2.4m</span>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg uppercase tracking-tighter">Sugestão de Uso</h4>
                        <div className="space-y-2 text-xs text-white/40 font-medium">
                           <p>Parabrisa: 0.90m</p>
                           <p>Laterais: 1.20m</p>
                           <p>Traseiro: 0.30m (Aproveitamento)</p>
                        </div>
                        <div className="pt-6">
                           <span className="text-xs md:text-[10px] text-gray-600 font-black uppercase tracking-widest block mb-1">Perda Estimada</span>
                           <span className="text-amber-500 font-black italic">0.12m (Mínima)</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Support */}
      <div className="flex items-center justify-center gap-6 opacity-30 mt-20">
        <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">WINF™ SHOP CORE OS</p>
        <div className="w-12 h-[1px] bg-white/20"></div>
        <p className="text-xs md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">2026 OPERATIONAL PROTOCOL</p>
      </div>
    </div>
  );
};

export default ModuleShopCore;
