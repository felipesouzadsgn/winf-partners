
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  ChevronLeft,
  Filter,
  MoreVertical
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { PartnerTask } from '../types';

registerLocale('pt-BR', ptBR);

interface ModuleTasksProps {
  onBack: () => void;
}

const ModuleTasks: React.FC<ModuleTasksProps> = ({ onBack }) => {
  const { partnerTasks, addPartnerTask, updatePartnerTask, deletePartnerTask } = useWinf();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as PartnerTask['priority'],
    category: 'OTHER' as PartnerTask['category'],
    due_date: ''
  });

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    await addPartnerTask(newTask);
    setNewTask({
      title: '',
      description: '',
      priority: 'MEDIUM',
      category: 'OTHER',
      due_date: ''
    });
    setShowAddModal(false);
  };

  const toggleTaskStatus = async (task: PartnerTask) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await updatePartnerTask(task.id, { status: newStatus });
  };

  const filteredTasks = partnerTasks.filter(task => {
    const statusMatch = filter === 'ALL' || task.status === filter;
    const categoryMatch = categoryFilter === 'ALL' || task.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'text-white/40 bg-zinc-800/10 border-zinc-700/20';
      case 'HIGH': return 'text-white/40 bg-zinc-800/10 border-zinc-700/20';
      case 'MEDIUM': return 'text-white/40 bg-zinc-800/10 border-zinc-700/20';
      default: return 'text-white/40 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            <ChevronLeft size={16} />
            <span>Voltar ao Painel</span>
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Gestão de <span className="text-white">Tarefas</span>
          </h1>
          <p className="text-white/40">Organize suas atividades e metas diárias.</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-white hover:bg-white/90 text-black font-bold py-3 px-6 rounded-none flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex bg-[#0A0A0A]/50 p-1 rounded-none border border-white/5">
          {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-none text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {f === 'ALL' ? 'Todas' : f === 'PENDING' ? 'Pendentes' : 'Concluídas'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-[#0A0A0A]/50 p-1 rounded-none border border-white/5">
          <Filter size={16} className="text-white/40 ml-2" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-white/60 text-sm border-none focus:ring-0 pr-8"
          >
            <option value="ALL">Todas Categorias</option>
            <option value="SALES">Vendas</option>
            <option value="TECHNICAL">Técnico</option>
            <option value="ADMIN">Admin</option>
            <option value="MARKETING">Marketing</option>
            <option value="OTHER">Outros</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group bg-[#0A0A0A]/40 backdrop-blur-sm border p-4 rounded-none transition-all hover:border-winf-primary/30 ${
                  task.status === 'COMPLETED' ? 'border-green-500/20 opacity-60' : 'border-white/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className={`mt-1 transition-colors ${
                      task.status === 'COMPLETED' ? 'text-green-500' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {task.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold text-lg truncate ${task.status === 'COMPLETED' ? 'line-through text-white/40' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <span className={`text-xs md:text-[10px] px-2 py-0.5 rounded-none border font-bold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Sem data'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag size={14} />
                        <span>{task.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => deletePartnerTask(task.id)}
                      className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-none transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-none transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#0A0A0A]/20 rounded-none border border-dashed border-white/10">
              <div className="bg-[#0A0A0A] p-4 rounded-none w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-gray-600" size={32} />
              </div>
              <h3 className="text-xl font-medium text-white/40">Nenhuma tarefa encontrada</h3>
              <p className="text-white/40 mt-2">Relaxe ou crie uma nova tarefa para começar.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-none p-5 md:p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Nova Tarefa</h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/40 mb-1.5">Título</label>
                  <input 
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-white focus:border-winf-primary focus:ring-1 focus:ring-winf-primary outline-none transition-all"
                    placeholder="O que precisa ser feito?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/40 mb-1.5">Descrição (Opcional)</label>
                  <textarea 
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-white focus:border-winf-primary focus:ring-1 focus:ring-winf-primary outline-none transition-all h-24 resize-none"
                    placeholder="Detalhes da tarefa..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/40 mb-1.5">Prioridade</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                      className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-white focus:border-winf-primary focus:ring-1 focus:ring-winf-primary outline-none transition-all"
                    >
                      <option value="LOW">Baixa</option>
                      <option value="MEDIUM">Média</option>
                      <option value="HIGH">Alta</option>
                      <option value="CRITICAL">Crítica</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/40 mb-1.5">Categoria</label>
                    <select 
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value as any})}
                      className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-white focus:border-winf-primary focus:ring-1 focus:ring-winf-primary outline-none transition-all"
                    >
                      <option value="SALES">Vendas</option>
                      <option value="TECHNICAL">Técnico</option>
                      <option value="ADMIN">Admin</option>
                      <option value="MARKETING">Marketing</option>
                      <option value="OTHER">Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/40 mb-1.5">Data de Entrega</label>
                  <div className="relative">
                    <DatePicker
                      selected={newTask.due_date ? new Date(newTask.due_date) : null}
                      onChange={(date) => setNewTask({...newTask, due_date: date ? date.toISOString() : ''})}
                      locale="pt-BR"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Selecione uma data"
                      className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-3 text-white focus:border-winf-primary focus:ring-1 focus:ring-winf-primary outline-none transition-all"
                      wrapperClassName="w-full"
                    />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-none transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-white hover:bg-white/90 text-black font-bold py-3 rounded-none transition-all"
                  >
                    Criar Tarefa
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleTasks;
