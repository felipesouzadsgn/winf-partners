import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Users, Trophy, ChevronRight, Globe, Droplets, Zap, Shield, Sparkles, MessageSquare, Heart, Share2, Award, ArrowLeft } from 'lucide-react';

interface ModuleCuidarConectarProps {
  onBack: () => void;
}

const IMPACT_STATS = [
  { label: 'Árvores Preservadas', value: '12.450', icon: Leaf, color: 'text-green-400' },
  { label: 'Kg CO₂ Evitados', value: '8.720', icon: Globe, color: 'text-blue-400' },
  { label: 'Litros Água Economizados', value: '3.890', icon: Droplets, color: 'text-cyan-400' }
];

const FEED_ITEMS = [
  {
    id: 1,
    user: 'Marcos Oliveira',
    avatar: 'M',
    time: '2h atrás',
    content: 'Acabei de completar minha 10ª instalação de película AeroCore™ este mês. Orgulhoso em contribuir para a redução de 320kg de CO₂!',
    likes: 24,
    comments: 5,
    actionType: 'impact',
    impactHighlight: '-320kg CO₂',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    id: 2,
    user: 'Carla Mendes',
    avatar: 'C',
    time: '5h atrás',
    content: 'Participei do workshop de sustentabilidade ontem. As novas técnicas de aplicação realmente reduzem o desperdício em até 30%!',
    likes: 18,
    comments: 3,
    actionType: 'education',
    impactHighlight: '-30% Desperdício',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    id: 3,
    user: 'Rafael Costa',
    avatar: 'R',
    time: '1d atrás',
    content: 'Minha loja atingiu o nível Platinum de sustentabilidade! Obrigado a todos os clientes que escolheram produtos eco-friendly.',
    likes: 42,
    comments: 12,
    actionType: 'level_up',
    impactHighlight: 'Selo Platinum',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  }
];

const STRATEGIC_ELEMENTS = [
  {
    id: 1,
    title: 'Rastreador de Impacto',
    description: 'Visualização em tempo real do impacto ambiental positivo gerado pelos produtos Winf e ações do programa.',
    features: [
      { name: 'Métricas Personalizadas', desc: 'Acompanhe seu impacto individual e compare com médias.' },
      { name: 'Visualização Avançada', desc: 'Gráficos interativos e mapas de calor para análise intuitiva.' },
      { name: 'Certificação Verificada', desc: 'Dados validados por organizações ambientais independentes.' }
    ]
  },
  {
    id: 2,
    title: 'Comunidade Conectada',
    description: 'Rede social exclusiva para participantes do programa, conectando pessoas comprometidas.',
    features: [
      { name: 'Feed Personalizado', desc: 'Conteúdo relevante baseado em seus interesses e histórico.' },
      { name: 'Grupos Temáticos', desc: 'Comunidades específicas para diferentes aspectos eco-tech.' },
      { name: 'Eventos Exclusivos', desc: 'Acesso a workshops, webinars e encontros presenciais.' }
    ]
  },
  {
    id: 3,
    title: 'Gamificação Social',
    description: 'Sistema de recompensas por ações positivas, incentivando comportamentos sustentáveis.',
    features: [
      { name: 'Desafios Semanais', desc: 'Missões que incentivam práticas sustentáveis com recompensas.' },
      { name: 'Sistema de Níveis', desc: 'Progressão de status baseada em ações e contribuições.' },
      { name: 'Recompensas Tangíveis', desc: 'Benefícios reais como descontos e reconhecimento público.' }
    ]
  }
];

const ModuleCuidarConectar: React.FC<ModuleCuidarConectarProps> = ({ onBack }) => {
  const [activeStat, setActiveStat] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-6 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-none transition-colors text-white/40 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-xl font-light tracking-[0.3em] uppercase">
            CUIDAR & <span className="font-bold text-green-500">CONECTAR™</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest">User Status</span>
            <span className="text-xs font-medium text-green-400">ECO AMBASSADOR</span>
          </div>
          <div className="w-10 h-10 rounded-none border border-white/20 bg-zinc-900 flex items-center justify-center font-bold text-green-500 ring-2 ring-green-500/20">
            A
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Massive Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[80vh] rounded-none overflow-hidden flex items-center justify-center group"
        >
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=100&w=2500" 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[3s] ease-out"
            alt="Nature Meets Tech"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="relative z-10 text-center space-y-8 p-6 md:p-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-none backdrop-blur-md"
            >
              <Leaf size={14} className="text-green-500" />
              <span className="text-xs md:text-[10px] font-bold uppercase tracking-[0.4em] text-green-400">Iniciativa Eco-Tech Global</span>
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] uppercase">
              PROTEGEMOS <br />
              <span className="text-green-500">O FUTURO.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-light tracking-wide max-w-2xl mx-auto">
              Tecnologia invisível que cria impacto visível no mundo. Bem-vindo à nova era da sustentabilidade cinematográfica.
            </p>
          </div>
        </motion.section>

        {/* Conceptual Visualizer */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light tracking-[0.2em] uppercase">
              VISUALIZAÇÃO <span className="font-bold text-green-500">CONCEITUAL</span>
            </h2>
            <p className="text-white/40 font-light max-w-2xl mx-auto">
              Mockup visual da plataforma Cuidar & Conectar com estética Eco-Tech e visualizações de impacto em tempo real.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-white/5 rounded-none overflow-hidden shadow-2xl shadow-green-500/5"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-green-500" />
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase">IMPACTO AMBIENTAL</h3>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Impact Visualization */}
              <div className="lg:col-span-2 p-6 md:p-12 border-r border-white/5 space-y-12 bg-black/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Impacto Positivo Acumulado</h4>
                    <p className="text-lg font-light tracking-wider">MÉTRICAS GLOBAIS WINF™</p>
                  </div>
                  <span className="text-xs md:text-[10px] text-green-500 font-bold border border-green-500/30 px-2 py-1 rounded-none bg-green-500/5">REAL-TIME DATA</span>
                </div>

                <div className="flex items-center justify-center py-8 relative">
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-64 h-64 rounded-none border border-green-500/20"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-20px] rounded-none border border-green-500/10"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-bold text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">87%</span>
                      <span className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">Eficiência Eco</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {IMPACT_STATS.map((stat, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div className={`mx-auto w-10 h-10 rounded-none bg-zinc-900 flex items-center justify-center border border-white/5 ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Feed */}
              <div className="p-8 space-y-6 bg-zinc-950/50">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Comunidade Conectada</h4>
                <div className="space-y-4">
                  {FEED_ITEMS.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`p-4 bg-zinc-900 border ${item.borderColor} rounded-none space-y-4 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 ${item.bgColor} blur-2xl rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity`} />
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-none bg-zinc-800 border ${item.borderColor} flex items-center justify-center text-xs font-bold ${item.color}`}>
                            {item.avatar}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{item.user}</div>
                            <div className="text-[10px] text-white/40">{item.time}</div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 ${item.bgColor} border ${item.borderColor} rounded-none`}>
                          {item.actionType === 'impact' && <Globe size={12} className={item.color} />}
                          {item.actionType === 'education' && <Leaf size={12} className={item.color} />}
                          {item.actionType === 'level_up' && <Trophy size={12} className={item.color} />}
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${item.color}`}>
                            {item.impactHighlight}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed group-hover:text-white/80 transition-colors relative z-10">
                        "{item.content}"
                      </p>
                      <div className="flex gap-4 pt-3 border-t border-white/5 relative z-10">
                        <div className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/80 transition-colors">
                          <Heart size={12} className="group-hover:text-red-400 transition-colors" /> {item.likes}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/80 transition-colors">
                          <MessageSquare size={12} /> {item.comments}
                        </div>
                        <Share2 size={12} className="ml-auto text-gray-600 hover:text-white/80 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Strategic Elements */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light tracking-[0.2em] uppercase">
              ELEMENTOS <span className="font-bold text-green-500">ESTRATÉGICOS</span>
            </h2>
            <p className="text-white/40 font-light max-w-2xl mx-auto">
              Recursos avançados que transformam a experiência dos participantes do programa Cuidar & Conectar™
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STRATEGIC_ELEMENTS.map((element, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-zinc-950 border border-white/5 p-5 md:p-8 rounded-none space-y-6 hover:border-green-500/30 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 text-green-500/10 group-hover:text-green-500/20 transition-colors">
                   <div className="text-6xl font-bold">{element.id}</div>
                </div>
                
                <h3 className="text-xl font-bold tracking-wider uppercase flex items-center gap-3">
                  {i === 0 && <Zap size={20} className="text-green-500" />}
                  {i === 1 && <Users size={20} className="text-blue-500" />}
                  {i === 2 && <Trophy size={20} className="text-white" />}
                  {element.title}
                </h3>
                
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  {element.description}
                </p>

                <div className="space-y-4 pt-4">
                  {element.features.map((feature, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs md:text-[10px] font-bold text-green-400 uppercase tracking-widest">{feature.name}</div>
                      <p className="text-xs text-white/40">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-24 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
             <div className="w-[800px] h-[800px] bg-green-500/20 rounded-none blur-[120px]" />
          </div>
          
          <div className="relative z-10 text-center space-y-12">
            <h2 className="text-xs font-bold text-green-500 uppercase tracking-[1em] mb-12">NARRATIVA ENVOLVENTE</h2>
            
            <div className="space-y-16">
              {[
                "Protegemos mais que vidros, protegemos o futuro",
                "Tecnologia invisível, impacto visível",
                "Conectando pessoas através da proteção do planeta"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-3xl md:text-5xl font-light tracking-wide italic text-white/60"
                >
                  "{text}"
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 space-y-8 bg-gradient-to-b from-transparent to-green-500/5 rounded-none">
          <h2 className="text-4xl font-bold tracking-tighter uppercase">JUNTE-SE AO <span className="text-green-500">MOVIMENTO</span></h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            Faça parte da comunidade que está transformando o futuro através de ações sustentáveis e tecnologia de ponta.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-transparent border border-green-500 text-green-500 font-bold uppercase tracking-[0.3em] hover:bg-green-500 hover:text-black transition-all rounded-none text-sm"
          >
            Participar Agora
          </motion.button>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-white/5 bg-zinc-950 flex flex-col items-center space-y-8">
        <div className="text-lg font-light tracking-[0.5em] uppercase">
          WINF <span className="font-bold text-green-500">GROUP™</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
          <a href="#" className="hover:text-green-400 transition-colors">Sobre</a>
          <a href="#" className="hover:text-green-400 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-green-400 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-green-400 transition-colors">Contato</a>
        </div>
        
        <div className="text-xs md:text-[10px] text-gray-600 tracking-widest uppercase">
          © 2026 Winf Group™. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default ModuleCuidarConectar;
