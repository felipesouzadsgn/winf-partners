import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight,
  Shield,
  Zap,
  Building2,
  Gem,
  Award,
  Users,
  Briefcase
} from 'lucide-react';

import { ViewState } from '../types';

interface LicensingPlansProps {
  onNavigate?: (view: ViewState) => void;
}

const LicensingPlans: React.FC<LicensingPlansProps> = ({ onNavigate }) => {
  return (
    <div className="w-full text-black bg-[#F9F9F9] font-sans selection:bg-black selection:text-white pb-32">
      
      <div className="max-w-[1400px] mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 border border-black/10 bg-white text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#050505] mb-6"
          >
            Nossas Operações
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase mb-6 text-[#050505]"
          >
            Planos de <span className="block text-zinc-500">Expansão.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-zinc-600 text-lg md:text-xl font-light leading-relaxed"
          >
            A Winf™ não é uma empresa de películas. Somos um ecossistema de tecnologia e serviços projetado para entregar conforto e performance. Três formatos exclusivos projetados para dominar nichos e se fortalecerem mutuamente.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 relative z-10 w-full max-w-4xl mx-auto">
          
          {/* Asset Light */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F9F9F9] border border-black/5 p-6 md:p-10 flex flex-col relative group hover:border-black/20 transition-all shadow-xl"
          >
            <div className="mb-8">
              <Shield size={28} className="text-[#050505]/40 mb-6" />
              <div className="text-xs md:text-[10px] font-black uppercase tracking-widest text-[#050505]/40 mb-2">NÍVEL 01</div>
              <h3 className="text-3xl md:text-5xl font-heading font-black tracking-tighter text-[#050505] mb-2">ASSET LIGHT SELECT</h3>
              <p className="text-sm md:text-base text-zinc-500 h-auto md:h-10">O modelo perfeito para instaladores e profissionais autônomos. Foque nas vendas e entregas, nós cuidamos da engenharia e da estrutura.</p>
            </div>
            
            <div className="mb-8 p-6 bg-white border border-black/5">
              <div className="text-xs font-bold text-black/40 uppercase tracking-wider mb-2">Investimento Inicial</div>
              <div className="flex items-end gap-2 mb-1">
                <div className="text-3xl md:text-5xl font-heading font-black tracking-tighter text-[#050505]"><span className="text-xl md:text-2xl text-black/40">12x R$</span> 1.500<span className="text-sm font-normal text-black/40">*</span></div>
              </div>
              <div className="text-xs md:text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#050505]/60 flex justify-between items-center mt-2">
                <span>ou R$ 15.000 à vista</span>
                <span className="bg-green-500/10 text-green-700 px-3 py-1 rounded">Alta Margem & Retorno Imediato</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-[#050505]/40 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-600">Geração de Leads</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-[#050505]/40 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-600">Kit de Materiais Premium</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-[#050505]/40 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-600">One-Page & WINF OS</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-[#050505]/40 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-600">Mapeamento Satelital Global</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate && onNavigate(ViewState.LANDING_ASSET_LIGHT)}
              className="w-full py-5 bg-[#050505] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
            >
              SABER MAIS SOBRE ASSET LIGHT <ArrowRight size={16} />
            </button>
          </motion.div>

        </div>

        <div className="mt-16 max-w-5xl mx-auto p-6 md:p-8 bg-black text-white border border-white/10 flex flex-col items-center text-center gap-6 relative z-10 shadow-xl overflow-hidden group">
          <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Building2 size={120} />
          </div>
          <div className="relative z-10 w-full">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/50 mb-3 flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-none"></div>
              Acesso Restrito
              <div className="w-1.5 h-1.5 bg-white/50 rounded-none"></div>
            </h4>
            <h3 className="text-2xl md:text-4xl font-heading font-black tracking-tighter text-white mb-4">
              OPÇÕES PARA INVESTIDORES
            </h3>
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Para perfis corporativos e investidores com capital a partir de R$ 95.000. Opções focadas em varejo de alto fluxo (Kiosk) e dominação regional automotiva e arquitetônica (Flagship Studio).
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
              <button 
                onClick={() => onNavigate && onNavigate(ViewState.LANDING_KIOSK)}
                className="py-4 border border-white/20 text-xs md:text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Detalhes KIOSK
              </button>
              <button 
                onClick={() => onNavigate && onNavigate(ViewState.LANDING_STUDIO)}
                className="py-4 border border-white/20 bg-white/5 text-xs md:text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Detalhes STUDIO
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-5xl mx-auto p-6 md:p-8 bg-white border border-black/10 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 shadow-sm">
          <div className="w-16 h-16 shrink-0 bg-[#050505] flex items-center justify-center text-white rounded-none">
            <Briefcase size={24} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#050505] mb-2">Aos Arquitetos e Especificadores</h4>
            <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
              Você pode formalizar a homologação e fechar o projeto com os membros homologados de <b className="text-[#050505] font-bold">qualquer um dos 3 níveis de operação</b>. O arquiteto com cadastro gratuito possui acesso a uma tabela diferenciada com os licenciados Nível 1 (<b className="text-[#050505] font-bold">Asset Light</b>), que recebem prioridade nos projetos.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4 border-t border-black/5 pt-4">
              <div>
                <strong className="text-xs md:text-[10px] uppercase font-black tracking-widest text-[#050505]">Fluxo e RT (Reserva Técnica)</strong>
                <p className="text-xs text-zinc-500 mt-1">O RT é garantido para projetos encaminhados. Você pode fechar o pedido direto com seu cliente ou enviar para o licenciado atender. Pagamento padrão: 50% no pedido, saldo a combinar (com você ou o cliente).</p>
              </div>
              <div>
                <strong className="text-xs md:text-[10px] uppercase font-black tracking-widest text-[#050505]">Expansão para Arquitetos</strong>
                <p className="text-xs text-zinc-500 mt-1">Arquitetos também podem se tornar <b className="text-[#050505]">Asset Light</b>. Ao se licenciar, você internaliza a operação, garantindo as margens máximas da rede e dominando a execução dos seus próprios projetos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LicensingPlans;

