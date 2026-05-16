import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  QrCode, 
  FileText, 
  User, 
  Calendar, 
  MapPin, 
  X, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Award,
  Clock,
  CheckCircle2,
  DollarSign,
  Share2,
  Phone,
  Printer,
  Bell,
  MessageSquare
} from 'lucide-react';

const ModuleInstallations: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { installations, products, user, registerInstallation, installationJobs, updateInstallationJob, completeJobAndGenerateWarranty, quotes, addInstallationJob } = useWinf();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'agenda' | 'history'>('agenda');
  const [viewMode, setViewMode] = useState<'list' | 'weekly'>('weekly');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState({ enabled: true, leadTime: 24 });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showManualOSModal, setShowManualOSModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({ quoteId: '', scheduledDate: '' });
  const [manualOSData, setManualOSData] = useState({
    customerName: '',
    customerWhatsApp: '',
    chosenFilm: '',
    vehicleModel: '',
    totalAmount: '',
    scheduledDate: ''
  });

  const handleManualOSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualOSData.customerName || !manualOSData.chosenFilm || !manualOSData.scheduledDate) {
      alert("Preencha os campos obrigatórios (Cliente, Película, Data).");
      return;
    }
    setLoading(true);
    const jobData = {
      service_order_id: `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: manualOSData.customerName,
      customer_whatsapp: manualOSData.customerWhatsApp || '',
      customer_address: '',
      customer_city: '',
      chosen_film: manualOSData.chosenFilm,
      vehicle_model: manualOSData.vehicleModel || 'Manual',
      total_amount: parseFloat(manualOSData.totalAmount) || 0,
      scheduled_date: manualOSData.scheduledDate,
      collaborator_id: user?.id,
    };
    await addInstallationJob(jobData);
    setShowManualOSModal(false);
    setManualOSData({
      customerName: '', customerWhatsApp: '', chosenFilm: '', vehicleModel: '', totalAmount: '', scheduledDate: ''
    });
    alert("OS Manual criada com sucesso!");
    setLoading(false);
  };

  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const getDayJobs = (dayIndex: number) => {
    // dayIndex 0 = Seg, 1 = Ter, etc.
    // This is a simplified mock logic to distribute jobs across the week for visualization
    // In a real app, we would filter by the actual date
    return installationJobs.filter((job, idx) => (idx % 6) === dayIndex && job.status !== 'completed');
  };

  const notifications = [
    { id: '1', type: 'interest', member: 'João Silva', project: 'Residencial Alphaville', time: '10 min atrás' },
    { id: '2', type: 'assignment', member: 'Carlos Tech', project: 'BMW X5 - AeroCore', time: '1 hora atrás' },
    { id: '3', type: 'update', member: 'Ana Arquiteta', project: 'Escritório Central', time: '2 horas atrás' },
  ];

  const filteredJobs = installationJobs.filter(job => 
    job.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.vehicle_model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.service_order_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [vehiclePlate, setVehiclePlate] = useState('');

  const handleCompleteJob = async (jobId: string) => {
    setLoading(true);
    if (vehiclePlate) {
      await updateInstallationJob(jobId, { vehicle_plate: vehiclePlate });
    }
    const result = await completeJobAndGenerateWarranty(jobId);
    if (result.success) {
      // Update payment method
      await updateInstallationJob(jobId, { payment_method: paymentMethod });
      setSelectedJob(null);
      alert("Garantia Registrada! Serviço concluído e recibo disponível.");
      setVehiclePlate('');
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const shareReceipt = (job: any) => {
    const text = `*RECIBO WINF™*\n\nOlá ${job.customer_name},\nSeu serviço foi concluído com sucesso!\n\n*OS:* ${job.service_order_id}\n*Produto:* ${job.chosen_film}\n*Valor:* R$ ${job.total_amount?.toLocaleString('pt-BR')}\n*Pagamento:* ${job.payment_method || 'Confirmado'}\n\n*Garantia:* ${job.warranty_id}\n\nObrigado por escolher Winf!`;
    const url = `https://wa.me/${job.customer_whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleScheduleService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleData.quoteId || !scheduleData.scheduledDate) {
      alert("Selecione um orçamento e a data.");
      return;
    }
    setLoading(true);
    const selectedQuote = quotes.find(q => q.id === scheduleData.quoteId);
    if (selectedQuote) {
      const jobData = {
        service_order_id: `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_name: selectedQuote.customerName,
        customer_whatsapp: selectedQuote.customerWhatsApp || '',
        customer_address: selectedQuote.customerAddress || '',
        customer_city: selectedQuote.customerCity || '',
        chosen_film: selectedQuote.items.map(i => i.description).join(', '),
        vehicle_model: selectedQuote.vehicleModel || selectedQuote.projectType || 'Residencial',
        total_amount: selectedQuote.totalAmount,
        scheduled_date: scheduleData.scheduledDate,
        collaborator_id: user?.id,
      };
      await addInstallationJob(jobData);
      setShowScheduleModal(false);
      setScheduleData({ quoteId: '', scheduledDate: '' });
      alert("Serviço agendado com sucesso!");
    } else {
      alert("Orçamento não encontrado.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12 w-full text-white">
        {/* Header - Banking Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em]">
                    <ChevronLeft size={14} /> Voltar ao Painel
                </button>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm mb-4">
                     <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                     Logística & Deployment
                   </div>
                   <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">Agenda <span className="font-medium text-white/80">Operacional</span></h1>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 items-end">
                <div className="flex bg-[#0A0A0A] p-1 rounded-sm border border-white/5">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative px-4 border-r border-white/5 py-2 text-xs md:text-[10px] font-bold transition-all ${showNotifications ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    <Bell size={14} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('agenda')}
                    className={`px-6 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'agenda' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    ORDENS DE SERVIÇO
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-2 rounded-sm text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'history' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    HISTÓRICO
                  </button>
                </div>
            </div>
        </div>

      {showNotifications && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-winf-primary/20 rounded-none p-6 mb-8 backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Bell size={14} className="text-white" /> Central de Notificações & Automação
            </h3>
            <button onClick={() => setShowNotifications(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5">
            <div className="space-y-4">
              <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Configurações de Alerta</h4>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-none border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-none flex items-center justify-center transition-all ${notificationConfig.enabled ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-600'}`}>
                    <Bell size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Notificações Prévias</p>
                    <p className="text-xs md:text-[10px] text-zinc-500">Alertar equipe antes do serviço</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotificationConfig({...notificationConfig, enabled: !notificationConfig.enabled})}
                  className={`w-12 h-6 rounded-none transition-all relative ${notificationConfig.enabled ? 'bg-white' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-none transition-all ${notificationConfig.enabled ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tempo de Antecedência</h4>
              <div className="flex gap-3">
                {[24, 48].map(hours => (
                  <button 
                    key={hours}
                    onClick={() => setNotificationConfig({...notificationConfig, leadTime: hours})}
                    className={`flex-1 py-4 rounded-none text-xs font-bold transition-all border ${notificationConfig.leadTime === hours ? 'bg-white text-black border-white' : 'bg-black/40 text-zinc-500 border-white/10 hover:border-white/20'}`}
                  >
                    {hours} HORAS
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Atividades Recentes</h4>
            {notifications.map(n => (
              <div key={n.id} className="flex items-center justify-between p-3 bg-black/40 rounded-none border border-white/5 hover:border-winf-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white">
                    {n.type === 'interest' ? <MessageSquare size={18} /> : <User size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {n.type === 'interest' ? `${n.member} demonstrou interesse em ${n.project}` : 
                       n.type === 'assignment' ? `Nova atribuição: ${n.project} para ${n.member}` :
                       `${n.member} atualizou o status de ${n.project}`}
                    </p>
                    <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{n.time}</p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-white text-black text-xs md:text-[10px] font-black px-3 py-1 rounded-none uppercase transition-all">Ver Detalhes</button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'agenda' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-500" /> Fluxo de Trabalho
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowManualOSModal(true)}
                  className="bg-zinc-800 text-white border border-white/10 px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:border-winf-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> Nova OS (Avulso)
                </button>
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-white text-black px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2"
                >
                  <FileText size={14} /> Vincular Orçamento
                </button>
                <div className="flex bg-zinc-900/50 p-1 rounded-none border border-white/5">
                  <button 
                    onClick={() => setViewMode('weekly')}
                    className={`px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'weekly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Semanal
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-1.5 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Lista
                  </button>
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Buscar OS ou Cliente..."
                className="w-full bg-black/40 border border-white/10 rounded-none py-2.5 pl-10 pr-4 text-xs text-white focus:border-white/30 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.filter(j => j.status !== 'completed').map((job) => (
                <motion.div
                  key={job.id}
                  layoutId={job.id}
                  className="bg-zinc-900/40 border border-white/10 rounded-none p-6 space-y-4 hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-white/5 border border-white/10 text-xs md:text-[10px] font-mono text-white/40 px-2 py-1 rounded-none uppercase tracking-widest">
                      {job.service_order_id}
                    </span>
                    <span className={`text-xs md:text-[10px] font-bold uppercase px-2 py-1 rounded ${job.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {job.status === 'in_progress' ? 'Em Execução' : 'Pendente'}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-zinc-300 transition-colors">{job.customer_name}</h3>
                    <p className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3" /> {job.customer_city || 'Não informado'}
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-none p-4 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Produto:</span>
                      <span className="text-zinc-300 font-bold">{job.chosen_film}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Agendado:</span>
                      <span className="text-zinc-300">{new Date(job.scheduled_date || '').toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <button className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-none text-xs font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">
                    Ver Detalhes da OS
                  </button>
                </motion.div>
              ))}
              {filteredJobs.filter(j => j.status !== 'completed').length === 0 && (
                <div className="col-span-full py-24 text-center border border-dashed border-white/5 bg-black rounded-none flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-zinc-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-bold text-sm uppercase tracking-widest">Agenda Disponível</p>
                    <p className="text-zinc-500 text-xs max-w-xs mx-auto">Nenhuma ordem de serviço pendente para os critérios selecionados.</p>
                  </div>
                  <button 
                    onClick={() => setShowManualOSModal(true)}
                    className="text-white text-xs md:text-[10px] font-black uppercase tracking-widest hover:underline mt-2"
                  >
                    + Criar OS Manual
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {daysOfWeek.map((day, idx) => (
                <div key={day} className="space-y-4">
                  <div className="text-center py-3 bg-white/5 rounded-none border border-white/5">
                    <span className="text-xs md:text-[10px] font-black text-white uppercase tracking-[0.3em]">{day}</span>
                  </div>
                  <div className="space-y-3 min-h-[400px]">
                    {getDayJobs(idx).map(job => (
                      <motion.div 
                        key={job.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedJob(job)}
                        className="p-4 bg-zinc-900/60 border border-white/5 rounded-none cursor-pointer hover:border-winf-primary/30 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] md:text-[8px] font-mono text-zinc-500">{job.service_order_id}</span>
                          <div className={`w-1.5 h-1.5 rounded-none ${job.status === 'in_progress' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700'}`}></div>
                        </div>
                        <h4 className="text-xs md:text-[10px] font-black text-white uppercase tracking-tight truncate">{job.customer_name}</h4>
                        <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-500 mt-1 truncate">{job.chosen_film}</p>
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] md:text-[8px] font-bold text-zinc-600 uppercase">OS_ACTIVE</span>
                          <ChevronRight size={10} className="text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                    {getDayJobs(idx).length === 0 && (
                      <div className="h-full flex items-center justify-center border border-dashed border-white/5 rounded-none opacity-20">
                        <span className="text-[10px] md:text-[8px] font-black uppercase tracking-widest rotate-90 whitespace-nowrap">Livre</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-none overflow-hidden">
          <table className="w-full text-left text-sm text-white/40">
            <thead className="bg-white/5 text-xs md:text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              <tr>
                <th className="p-6">OS / Data</th>
                <th className="p-6">Cliente</th>
                <th className="p-6">Produto</th>
                <th className="p-6">Valor / Pagamento</th>
                <th className="p-6">Status</th>
                <th className="p-6">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredJobs.filter(j => j.status === 'completed').map(job => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6">
                    <div className="font-mono text-zinc-300">{job.service_order_id}</div>
                    <div className="text-xs md:text-[10px]">{new Date(job.completed_at || '').toLocaleDateString('pt-BR')}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-white">{job.customer_name}</div>
                    <div className="text-xs md:text-[10px] flex items-center gap-1"><Phone className="w-2 h-2" /> {job.customer_whatsapp}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-zinc-300">{job.chosen_film}</div>
                    <div className="text-xs md:text-[10px] uppercase text-zinc-500">{job.vehicle_model}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-white">R$ {job.total_amount?.toLocaleString('pt-BR')}</div>
                    <div className="text-xs md:text-[10px] uppercase text-zinc-500">{job.payment_method || 'Confirmado'}</div>
                  </td>
                  <td className="p-6">
                    <span className="bg-green-500/20 text-green-400 text-xs md:text-[10px] font-bold px-2 py-1 rounded-none uppercase">Concluído</span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button onClick={() => shareReceipt(job)} className="p-2 bg-zinc-800 rounded-none hover:bg-zinc-700 transition-colors text-zinc-300" title="Enviar Recibo WhatsApp">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-zinc-800 rounded-none hover:bg-zinc-700 transition-colors text-zinc-300" title="Imprimir Comprovante">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.filter(j => j.status === 'completed').length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">Nenhum serviço concluído no histórico.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual OS Modal */}
      <AnimatePresence>
        {showManualOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowManualOSModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0A0A0A] border border-white/10 rounded-none w-full max-w-lg overflow-hidden shadow-2xl p-5 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">Nova OS (Serviço Avulso)</h3>
                  <p className="text-white/40 text-xs md:text-[10px] uppercase tracking-widest mt-1">Lançamento direto sem orçamento</p>
                </div>
                <button onClick={() => setShowManualOSModal(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleManualOSSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <User size={10} className="text-white" /> 1. Nome do Cliente
                    </label>
                    <input
                      type="text"
                      value={manualOSData.customerName}
                      onChange={(e) => setManualOSData({ ...manualOSData, customerName: e.target.value })}
                      placeholder="Identificação do cliente"
                      className="w-full bg-black/60 border border-white/5 rounded-none px-4 py-4 text-xs text-white focus:outline-none focus:border-winf-primary/50 transition-all focus:ring-1 focus:ring-winf-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <ShieldCheck size={10} className="text-white" /> 2. Material Escolhido
                    </label>
                    <input
                      type="text"
                      value={manualOSData.chosenFilm}
                      onChange={(e) => setManualOSData({ ...manualOSData, chosenFilm: e.target.value })}
                      placeholder="Ex: AeroCore Full, Winf Select Plus"
                      className="w-full bg-black/60 border border-white/5 rounded-none px-4 py-4 text-xs text-white focus:outline-none focus:border-winf-primary/50 transition-all focus:ring-1 focus:ring-winf-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <MapPin size={10} className="text-white" /> Veículo / Local
                    </label>
                    <input
                      type="text"
                      value={manualOSData.vehicleModel}
                      onChange={(e) => setManualOSData({ ...manualOSData, vehicleModel: e.target.value })}
                      placeholder="Audi Q5 / Varanda"
                      className="w-full bg-black/60 border border-white/5 rounded-none px-4 py-4 text-xs text-white focus:outline-none focus:border-winf-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <DollarSign size={10} className="text-white" /> Investimento (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={manualOSData.totalAmount}
                      onChange={(e) => setManualOSData({ ...manualOSData, totalAmount: e.target.value })}
                      placeholder="0.00"
                      className="w-full bg-black/60 border border-white/5 rounded-none px-4 py-4 text-xs text-white focus:outline-none focus:border-winf-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <Calendar size={10} className="text-white" /> 3. Data de Ativação
                    </label>
                    <input
                      type="date"
                      value={manualOSData.scheduledDate}
                      onChange={(e) => setManualOSData({ ...manualOSData, scheduledDate: e.target.value })}
                      className="w-full bg-black/60 border border-white/5 rounded-none px-4 py-4 text-xs text-white focus:outline-none focus:border-winf-primary/50 transition-all [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-white text-black font-black text-xs md:text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Processando...' : <><Plus size={16} /> Salvar OS</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowScheduleModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0A0A0A] border border-white/10 rounded-none w-full max-w-md overflow-hidden shadow-2xl p-5 md:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">Agendar Serviço</h3>
                  <p className="text-white/40 text-xs md:text-[10px] uppercase tracking-widest mt-1">Vincular orçamento e data</p>
                </div>
                <button onClick={() => setShowScheduleModal(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleScheduleService} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-black tracking-widest">Selecione o Orçamento (PDF)</label>
                  <select
                    value={scheduleData.quoteId}
                    onChange={(e) => setScheduleData({ ...scheduleData, quoteId: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-winf-primary transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled>Escolha um orçamento aprovado...</option>
                    {quotes.map(q => (
                      <option key={q.id} value={q.id}>{q.customerName} - R$ {q.totalAmount?.toLocaleString('pt-BR')} ({new Date(q.createdAt).toLocaleDateString()})</option>
                    ))}
                    {quotes.length === 0 && <option value="" disabled>Nenhum orçamento encontrado.</option>}
                  </select>
                  {scheduleData.quoteId && (
                    <div className="p-3 bg-white/5 border border-white/5 rounded-none mt-2">
                      <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase">Preenchimento Automático ativado</p>
                      <p className="text-xs text-green-400 flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> Dados do cliente, produto e valores vinculados.</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] text-zinc-500 uppercase font-black tracking-widest">Selecione a Data</label>
                  <input
                    type="date"
                    value={scheduleData.scheduledDate}
                    onChange={(e) => setScheduleData({ ...scheduleData, scheduledDate: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-winf-primary transition-colors [color-scheme:dark]"
                    required
                  />
                  <div className="flex gap-2 mt-2">
                    <button 
                      type="button"
                      onClick={() => {
                         const tomorrow = new Date();
                         tomorrow.setDate(tomorrow.getDate() + 1);
                         setScheduleData({...scheduleData, scheduledDate: tomorrow.toISOString().split('T')[0]});
                      }}
                      className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white/40 rounded-none transition-colors uppercase font-bold tracking-widest text-xs md:text-[10px] md:text-sm md:text-[11px]"
                    >
                      Amanhã
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                         const nextWeek = new Date();
                         nextWeek.setDate(nextWeek.getDate() + 7);
                         setScheduleData({...scheduleData, scheduledDate: nextWeek.toISOString().split('T')[0]});
                      }}
                      className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-white/40 rounded-none transition-colors uppercase font-bold tracking-widest text-xs md:text-[10px] md:text-sm md:text-[11px]"
                    >
                      Próx. Semana
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-black text-xs md:text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-white transition-all disabled:opacity-50"
                >
                  {loading ? 'Processando...' : 'Confirmar Agendamento'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 rounded-none w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Ordem de Serviço</span>
                    <h2 className="text-4xl font-black text-white tracking-tighter mt-1">{selectedJob.service_order_id}</h2>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/5 rounded-none transition-colors">
                    <X className="w-6 h-6 text-zinc-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cliente</p>
                      <p className="text-xl font-bold text-white">{selectedJob.customer_name}</p>
                      <p className="text-sm text-white/40 flex items-center gap-2"><Phone className="w-3 h-3" /> {selectedJob.customer_whatsapp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Endereço de Execução</p>
                      <p className="text-sm text-zinc-300">{selectedJob.customer_address}</p>
                      <p className="text-sm text-zinc-500">{selectedJob.customer_city}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Produto Escolhido</p>
                      <p className="text-xl font-bold text-white">{selectedJob.chosen_film}</p>
                      <p className="text-sm text-white/40 uppercase">{selectedJob.vehicle_model}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Valor do Serviço</p>
                      <p className="text-2xl font-black text-white">R$ {selectedJob.total_amount?.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                {selectedJob.status !== 'completed' && (
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Placa do Veículo / Identificação (Opcional)</label>
                        <input
                          type="text"
                          value={vehiclePlate}
                          onChange={(e) => setVehiclePlate(e.target.value)}
                          placeholder="ABC-1234"
                          className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-winf-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">Forma de Pagamento</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['Pix', 'Cartão', 'Dinheiro'].map((m) => (
                            <button 
                              key={m}
                              onClick={() => setPaymentMethod(m as any)}
                              className={`py-3 rounded-none text-xs font-bold transition-all border ${paymentMethod === m ? 'bg-white text-black border-white' : 'bg-black/40 text-zinc-500 border-white/10 hover:border-white/20'}`}
                            >
                              {m.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCompleteJob(selectedJob.id)}
                      disabled={loading}
                      className="w-full bg-white text-black py-5 rounded-none font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3"
                    >
                      {loading ? 'Processando...' : <><CheckCircle2 className="w-6 h-6" /> Registrar Garantia e Concluir</>}
                    </button>
                  </div>
                )}

                {selectedJob.status === 'completed' && (
                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button onClick={() => shareReceipt(selectedJob)} className="flex-1 bg-green-600 text-white py-4 rounded-none font-bold uppercase tracking-widest hover:bg-green-500 transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" /> Compartilhar Recibo
                    </button>
                    <button className="flex-1 bg-zinc-800 text-white py-4 rounded-none font-bold uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                      <Printer className="w-5 h-5" /> Imprimir
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleInstallations;
