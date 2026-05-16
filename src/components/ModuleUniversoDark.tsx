
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock, TrendingUp, AlertTriangle, Fingerprint, Activity, DollarSign, Briefcase, Share2, Eye, Shield, Globe, Users, MapPin, Package, PieChart, Wallet, LogIn, Key, User, UserPlus } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { WinfLogo } from './WinfLogo';

import { UniversoDarkMaps } from './UniversoDarkMaps';
import { InvestorDashboard } from './InvestorDashboard';
import { ImportSimulator } from './ImportSimulator';

interface ModuleUniversoDarkProps {
  onBack: () => void;
}

const GROWTH_DATA = [
  { step: '1Q25', arr: 1.2, equity: 15, dividend: 0.2 },
  { step: '2Q25', arr: 4.5, equity: 18, dividend: 1.5 },
  { step: '3Q25', arr: 12.8, equity: 24, dividend: 5.2 },
  { step: '4Q25', arr: 28.5, equity: 31, dividend: 14.0 },
  { step: '1Q26', arr: 50.0, equity: 45, dividend: 25.0 },
  { step: '2Q26', arr: 75.0, equity: 68.5, dividend: 42.0 },
];

const ASSET_LIGHT_STATUS = {
  sold: 88,
  total: 100,
  waitlist: 312,
  averageProfit: 'BRL 1,250.00',
  nextBatch: 'Quarter 3 / 2026'
};

const ROADMAP = [
  {
    phase: 'Fase 1: Pioneer Kiosk',
    status: 'Em Execução',
    items: ['Instalação do Kiosk AeroCore Alpha', 'Padrão Aeroespacial de Atendimento', 'Prova de Conceito de Fluxo de Shopping']
  },
  {
    phase: 'Fase 2: Flagship Studio',
    status: 'Planejamento',
    items: ['Studio AeroCore de Alta Performance', 'Showroom Conceito para Investidores', 'Centro de Treinamento Elite']
  },
  {
    phase: 'Fase 3: BlackShop Ecosystem',
    status: 'Desenvolvimento',
    items: ['E-commerce B2B de Insumos Exclusivos', 'Distribuição de Bobinas para Licensees', 'Ecossistema de Receita Recorrente']
  }
];

const REPORTS = [
  { id: 1, title: 'Q2/2026 Financial Report (Estimate)', date: '12/05/2026', type: 'PDF' },
  { id: 2, title: 'Network Yield Distribution Q1', date: '15/04/2026', type: 'Spreadsheet' },
  { id: 3, title: 'Operational Transparency Audit', date: '10/03/2026', type: 'PDF' }
];

const RECENT_TRANSACTIONS = [
  { id: 'tx_01', user: 'Investor #088', action: 'Buy [ALGT.NA] Shares', value: 'BRL 15,000.00', time: '2h ago' },
  { id: 'tx_02', user: 'Investor #012', action: 'BlackShop Reinvestment', value: 'BRL 5,420.00', time: '5h ago' },
  { id: 'tx_03', user: 'Winf Smart Contract', action: 'Dividend Payout #042', value: 'BRL 1,850.00', time: '12h ago' },
  { id: 'tx_04', user: 'Investor #201', action: 'AeroCore Studio Setup', value: 'BRL 50,000.00', time: '1d ago' },
];

const INVESTMENT_RULES = [
  { title: 'Janela de Resgate', desc: 'Saques de lucros (Yield) são liberados todo dia 05 de cada mês automaticamente.' },
  { title: 'Lock-up de Capital', desc: 'O aporte principal possui carência de 12 meses para garantir a estabilidade do estoque BlackShop.' },
  { title: 'Liquidez Secundária', desc: 'É permitido vender sua cota Asset Light para outros membros aprovados após o 6º mês.' },
  { title: 'Taxa de Saque', desc: '0% para saques programados. 10% de taxa administrativa para resgates emergenciais fora da janela.' }
];

const INVESTMENT_POOLS = [
  {
    id: 'w12_board',
    name: 'W12 Global Board Seat [W12.B]',
    type: 'Private Equity / Hub Master',
    available: 'Valuation Premium',
    min: 'Under Review (BRL 250k - 1M+)',
    roi: 'Dividends + M&A Yield (Exit)',
    risk: 'Moderate (Expansion Risks)',
    progress: 16,
    description: 'Acquire one of the 12 global seats. You will own a Regional/International Hub.',
    payback: 'Long Term (Equity Share)',
    structure: 'Corporate Equity + Network Dividends',
    thesis: 'The 12 apostles of Winf Partners. Each seat represents geographic dominance of ONE COUNTRY or REGION, sharing profits from the BlackShop distribution network. The mission: reach 100 active Asset Lights per territory.',
    docs: ['W12_Board_Statute.pdf', 'Founder_Shareholders_Agreement.pdf'],
  },
  {
    id: 'asset_light_100',
    name: 'Winf Asset Light Network [ALGT.NA]',
    type: 'Fast Scalability',
    available: 'BRL 15,000 (Unit)',
    min: 'BRL 15,000',
    roi: '10% to 15% monthly on sales',
    risk: 'Low (Asset Backed)',
    progress: 88,
    description: 'The tactical entry plan. BRL 15k investment with avg. 30-day payback. Generates recurring revenue for BlackShop.',
    payback: '30 to 45 days',
    structure: 'Licensee Association + Ecosystem Equity Share',
    thesis: 'Targeting 100 Asset Light members per country. Primary activation validates global demand. Each member generates continuous recurring profit through supplies purchased exclusively via BlackShop.',
    docs: ['Asset_Light_Contract_v2.pdf', 'Investor_Journey_Manual.pdf', 'ALGT_ROI_Calculator.xlsx'],
  },
  {
    id: 'blackshop_d2c',
    name: 'BlackShop Retail [BSHP.US]',
    type: 'E-commerce & Logistics',
    available: 'BRL 3,000,000',
    min: 'BRL 100,000',
    roi: '20% p.a. + Equity Upside',
    risk: 'High',
    progress: 45,
    description: 'Funding for primary inventory import, digital branding, and consolidating the largest Private Label in the sector.',
    payback: '24 to 36 months',
    structure: 'Shareholder Equity (Corporate Participation)',
    thesis: 'The BlackShop e-commerce serves as the intelligent distribution center for the Asset Light network, generating recurring profit on every inch of film applied globally.',
    docs: ['BlackShop_Supply_Chain_Thesis.pdf', 'Digital_Shareholders_Contract.pdf'],
  }
];

const ModuleUniversoDark: React.FC<ModuleUniversoDarkProps> = ({ onBack }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user?.uid === 'dev-mode') return; // protect dev bypass
      setUser(currentUser);
      setIsVerifying(false);
    });
    return () => unsubscribe();
  }, [user?.uid]);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hub' | 'painel' | 'jornada' | 'roadmap' | 'transparencia' | 'celulas' | 'dashboard'>('hub');
  const [lang, setLang] = useState<'pt' | 'en' | 'es'>('pt');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          name: name || 'Investidor',
          role: 'investor',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setLoginError('Email já está em uso.');
      } else if (err.code === 'auth/weak-password') {
        setLoginError('Senha deve ter pelo menos 6 caracteres.');
      } else {
        setLoginError('Credenciais inválidas. Verifique seu email e senha.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const renderJornada = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-zinc-900/50 border border-white/5 p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold mb-2 text-white uppercase tracking-wider italic flex items-center gap-2">
          <TrendingUp className="text-green-500" /> A Máquina de Equity Winf
        </h3>
        <p className="text-xs text-white/40 mb-8 max-w-2xl">
          Como transformamos R$ 15k iniciais em uma rede multimilionária de aplicações automotivas, gerando valor real através de uma cadeia de suprimentos monopolizada (BlackShop) e pontos físicos dominantes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Seed: Os 100 Pioneiros', desc: 'Aporte inicial de R$ 15k garantindo um dos primeiros 100 slots Asset Light. Payback relâmpago de 30 dias para validação de mercado e prova do modelo econômico.', icon: <DollarSign className="text-zinc-500" /> },
            { step: 2, title: 'Scale: 100 por País', desc: 'Expansão agressiva da rede Asset Light visando 100 aplicadores descentralizados por cada país (Hub W12). Uma força de vendas e prestação de serviço incomparável localmente.', icon: <Users className="text-zinc-500" /> },
            { step: 3, title: 'Domínio Físico', desc: 'Abertura de Kiosks em shoppings e Studios Flagship (AeroCore). Isso fixa a autoridade da marca e eleva o ticket médio, gerando ancoragem para a rede Asset Light.', icon: <MapPin className="text-zinc-500" /> },
            { step: 4, title: 'A Máquina: BlackShop', desc: 'A verdadeira fonte do Equity. Todos os membros globais e lojas são OBRIGADOS a consumir da BlackShop. Recorrência projetada implacável POR MEMBRO/mês.', icon: <Package className="text-zinc-500" /> }
          ].map((item) => (
            <div key={item.step} className="p-6 bg-black/40 border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors uppercase italic">{item.step}</div>
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">{item.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black border border-white/5 p-8 relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 text-zinc-900">
             <PieChart size={200} />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-4 relative z-10 flex items-center gap-2">
            <TrendingUp size={14} className="text-green-500" /> O Caminho para a Liquidez (Exit / Venda de Equity)
          </h3>
          <p className="text-xs text-white/60 mb-6 relative z-10">
            A Winf não é apenas sobre o retorno mensal. O grande salto patrimonial ocorre na formatação da empresa para M&A ou venda de participação para Fundos de Private Equity. O valor da rede (Valuation) multiplica conforme a BlackShop escoa materiais para a rede global de pontos Asset Light (alvo sustentável de 1.200 postos globais).
          </p>
          <div className="space-y-4 relative z-10">
            <div className="bg-white/5 p-4 border border-white/10 border-l-green-500 border-l-2">
              <h5 className="text-xs md:text-[10px] font-bold text-white uppercase tracking-widest mb-1">Cenário 1: Dividendos (Yield)</h5>
              <p className="text-xs md:text-[10px] text-white/50">Distribuição mensal dos lucros gerados pela margem de distribuição da BlackShop. Quanto mais Asset Lights consumindo globalmente, maior o pool de dividendos para o board W12.</p>
            </div>
            <div className="bg-white/5 p-4 border border-white/10 border-l-blue-500 border-l-2">
              <h5 className="text-xs md:text-[10px] font-bold text-white uppercase tracking-widest mb-1">Cenário 2: Venda de Participação Governança</h5>
              <p className="text-xs md:text-[10px] text-white/50">Investidores originais vendem suas cotas (no mercado secundário ou na bolsa/fundo) inflacionadas pelo multiplicador de receita gerada pela cadeia global (as 12 cadeiras atingindo suas metas).</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-500 opacity-5 blur-[100px]"></div>
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Acesso ao Data Room</h3>
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Documentos Legais</h4>
              {['Estatuto Social Winf Capital', 'Contrato de Parceria Asset Light', 'Termos de Confidencialidade (NDA)'].map(doc => (
                <div key={doc} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 text-xs md:text-[10px] text-white/60 hover:bg-white/10 hover:border-zinc-500 transition-all cursor-pointer">
                  <Shield size={12} className="text-zinc-500" /> {doc}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Operacional</h4>
              {['Manual de Execução Studio', 'Manual do Quiosque Pioneiro', 'Processos BlackShop Logística'].map(doc => (
                <div key={doc} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 text-xs md:text-[10px] text-white/60 hover:bg-white/10 hover:border-zinc-500 transition-all cursor-pointer">
                  <Briefcase size={12} className="text-zinc-500" /> {doc}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Financeiro</h4>
              {['Relatório de Distribuição de Lucros', 'Auditoria de Insumos BlackShop', 'Projeção Global 2030'].map(doc => (
                <div key={doc} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 text-xs md:text-[10px] text-white/60 hover:bg-white/10 hover:border-zinc-500 transition-all cursor-pointer">
                  <TrendingUp size={12} className="text-zinc-500" /> {doc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImportSimulator />
    </div>
  );

  const renderRoadmap = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
      {ROADMAP.map((item, idx) => (
        <div key={idx} className="bg-zinc-900/50 border border-white/5 p-8 relative group">
          <div className="absolute top-0 right-0 p-4">
            <span className={`text-[10px] md:text-[8px] font-black uppercase tracking-widest px-2 py-1 ${item.status === 'Em Execução' ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-white/40'}`}>
              {item.status}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-6 group-hover:text-zinc-300 transition-colors">{item.phase}</h3>
          <ul className="space-y-4">
            {item.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1 flex-shrink-0"></span>
                {it}
              </li>
            ))}
          </ul>
          {idx === 2 && (
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">A BlackShop Strategy</p>
              <p className="text-xs md:text-[10px] text-white/30 leading-relaxed font-light">
                O e-commerce centralizado será a pulsação financeira de toda a rede. Lucro líquido vindo da recorrência de cada batedor de insumo em cada cidade do Brasil.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCelulas = () => (
    <div className="space-y-8 animate-fade-in">
      <UniversoDarkMaps lang={lang} />
      
      <div className="bg-zinc-900/50 border border-white/5 p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-black/60 border border-white/5 p-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-zinc-500" /> W12 Brasil (Hubs Regionais)
              </h4>
              <ul className="space-y-4">
                {[
                  { r: 'Cadeira 01: Santos (SP) / Asset Light', role: 'Founder (Tiago CEO) / Base Central Winf' },
                  { r: 'Cadeira 02: Campina Grande (PB) / Asset Light', role: 'Founder (Tiago Tech) / Base Central Winf OS' },
                  { r: 'Cadeira 03: Sul', role: 'Hub de Frio e Flagships de Alto Padrão (Luxo)' },
                  { r: 'Cadeira 04: Sudeste', role: 'Volume Massivo de Kiosks e BlackShop Central' },
                  { r: 'Cadeira 05: Centro-Oeste', role: 'Capital Agro / Blindagem e Máquinas Agrícolas' },
                  { r: 'Cadeira 06: Nordeste/Norte', role: 'Expansão Latam-Conectiva e Turismo' },
                ].map(cel => (
                  <li key={cel.r} className="flex flex-col border-l-2 border-zinc-800 pl-3 hover:border-green-500 transition-colors cursor-pointer">
                    <span className="text-sm md:text-[11px] font-bold text-white uppercase tracking-wider">{cel.r}</span>
                    <span className="text-xs md:text-[10px] text-zinc-500">{cel.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/60 border border-white/5 p-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe size={16} className="text-zinc-500" /> W12 International
              </h4>
              <p className="text-sm md:text-[11px] text-white/40 mb-4">
                Cada master inter-nacional domina a importação da BlackShop para seu território e coordena as ramificações de Studios Pilotos locais.
              </p>
              <ul className="space-y-4">
                {[
                  { r: 'Cadeira 07: USA', role: 'Penetração Mercado Norte Americano' },
                  { r: 'Cadeira 08: Portugal/Europa', role: 'Porta de entrada EU e Alto Luxo' },
                  { r: 'Cadeira 09: EAU (Dubai)', role: 'Capital Global, Fundos Privados' },
                  { r: 'Cadeira 10: Japão/Ásia', role: 'Hub Tecnológico' },
                  { r: 'Cadeira 11: Austrália', role: 'Mercado de Isolamento Térmico' },
                  { r: 'Cadeira 12: Board Flutuante', role: 'Fundo Coletivo Gold (Liquidez)' },
                ].map(cel => (
                  <li key={cel.r} className="flex flex-col border-l-2 border-zinc-800 pl-3 hover:border-green-500 transition-colors cursor-pointer">
                    <span className="text-sm md:text-[11px] font-bold text-white uppercase tracking-wider">{cel.r}</span>
                    <span className="text-xs md:text-[10px] text-zinc-500">{cel.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-green-500/5 text-center border-t border-green-500/20">
          <p className="text-sm text-green-500/80 mb-2"><strong>A Máquina de Dinheiro da Cadeira</strong></p>
          <p className="text-xs text-white/60 max-w-2xl mx-auto">
            Ao se tornar um dos 12, o investidor não apenas injeta capital, ele passa a receber dividendos de toda a cadeia da sua região. Estúdios Piloto e Kiosks são projetados para retroalimentar o caixa do W12, gerando Equity bruto e lucro distribuível para os conselheiros antes mesmo do Exit (Venda da empresa).
          </p>
        </div>
      </div>
  );

  const renderTransparencia = () => (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Relatórios */}
        <div className="lg:col-span-2 bg-black border border-white/5 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-widest">Governança & Payouts</h3>
              <p className="text-xs text-white/40 italic">Métricas de saída e transparência de capital.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INVESTMENT_RULES.map((rule, i) => (
                <div key={i} className="p-4 bg-white/2 border border-white/5">
                  <h4 className="text-xs md:text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Shield size={10} /> {rule.title}
                  </h4>
                  <p className="text-sm md:text-[11px] text-white/60 leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Relatórios de Auditoria</h4>
              <div className="space-y-2">
                {REPORTS.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-zinc-500 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Activity size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                      <div>
                        <p className="text-xs font-bold text-white">{report.title}</p>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase font-mono">{report.date}</p>
                      </div>
                    </div>
                    <button onClick={() => setNotification(`Acessando relatório: ${report.title}`)} className="text-xs md:text-[10px] font-mono text-zinc-500 group-hover:text-white transition-colors flex items-center gap-2">
                      VIEW {report.type} <ChevronRight size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Ledger */}
        <div className="bg-zinc-900/50 border border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/20 via-transparent to-transparent"></div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={14} className="text-green-500" /> Live Activity Feed
          </h3>
          <div className="space-y-4">
            {RECENT_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="border-l border-white/10 pl-4 py-2 relative">
                <div className="absolute -left-[4.5px] top-4 w-2 h-2 rounded-full bg-white/10"></div>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs md:text-[10px] font-bold text-white/80">{tx.user}</p>
                  <span className="text-[10px] md:text-[8px] font-mono text-white/30 uppercase">{tx.time}</span>
                </div>
                <p className="text-sm md:text-[11px] text-zinc-500 mb-1">{tx.action}</p>
                <p className="text-xs font-mono text-white">{tx.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm md:text-[11px] md:text-sm md:text-[11px] md:text-[9px] text-white/20 uppercase tracking-[0.2em] font-light">
              Todas as transações registradas via <br/> Sinf-Chain Ledger v2.1
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 p-8">
          <h4 className="text-xs md:text-[10px] font-black text-white/60 uppercase tracking-widest mb-4 italic">Alocação de Recursos (Q1 2026)</h4>
          <div className="space-y-4">
            {[
              { label: 'Marketing de Aquisição', value: 45 },
              { label: 'P&D (Novos Insumos)', value: 20 },
              { label: 'Logística BlackShop', value: 25 },
              { label: 'Custos Operacionais', value: 10 },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs md:text-[10px] font-mono text-white/50 mb-2 uppercase">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-1 w-full bg-white/5">
                  <div className="h-full bg-zinc-600 transition-all duration-1000" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-white/5 p-8 flex flex-col justify-center text-center">
            <Lock size={32} className="mx-auto text-zinc-700 mb-4" />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Área de Votação (LPs)</h4>
            <p className="text-xs text-white/30 italic">Disponível apenas para investidores Tier 1 & Elite Squad.</p>
        </div>
      </div>
    </div>
  );

  if (isVerifying) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-black px-6 py-3 rounded shadow-lg z-50 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-fade-in">
            <Activity size={16} />
            {notification}
          </div>
        )}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/40 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="flex flex-col items-center mb-12">
            <WinfLogo className="text-6xl mb-6 text-white/50" />
            <h1 className="text-3xl font-light tracking-widest uppercase mb-2">Universo <span className="font-black text-zinc-500">Dark</span></h1>
            <p className="text-xs md:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">Restricted Access Area</p>
          </div>

          <form onSubmit={handleAccess} className="bg-zinc-900 border border-white/10 p-8 rounded-xl w-full shadow-2xl backdrop-blur-sm relative z-10">
            {loginError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              {isRegistering && (
                <div className="space-y-1">
                  <label className="text-xs md:text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      type="text" 
                      required={isRegistering}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-10 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs md:text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Email de Investidor</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-10 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="investidor@winf.com.br"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs md:text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Token de Acesso (Senha)</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-10 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full bg-green-500 hover:bg-green-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold uppercase tracking-widest text-sm py-4 mt-6 rounded transition-colors flex justify-center items-center gap-2"
              >
                {isLoggingIn ? 'Processando...' : (
                  isRegistering ? <><UserPlus size={18} /> Registrar Acesso</> : <><LogIn size={18} /> Entrar na Sessão Segura</>
                )}
              </button>
            </div>

            <div className="mt-6 text-center flex flex-col gap-3">
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs md:text-[10px] text-green-500 hover:text-green-400 uppercase tracking-widest font-mono underline"
              >
                {isRegistering ? 'Já tenho uma credencial' : 'Criar nova credencial'}
              </button>

              <button 
                type="button" 
                onClick={() => {
                  setUser({ uid: 'dev-mode', email: 'dev@winf.com.br' } as FirebaseUser);
                }}
                className="text-xs md:text-[10px] text-yellow-500 hover:text-yellow-400 uppercase tracking-widest font-mono border border-yellow-500/50 rounded py-2 px-4 w-full"
              >
                [ DEV ] BYPASS LOGIN
              </button>
            </div>
          </form>

          <div className="mt-8 text-center flex flex-col gap-4">
            <button onClick={onBack} className="text-xs md:text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest font-mono transition-colors">
              [ Retornar ao Sistema ]
            </button>
            <button 
              onClick={() => {
                  setUser({ uid: 'dev-mode', email: 'dev@winf.com.br' } as FirebaseUser);
              }} 
              className="text-xs md:text-[10px] text-yellow-500 hover:text-yellow-400 uppercase tracking-widest font-mono border border-yellow-500/50 rounded py-2 px-4 inline-block mx-auto"
            >
              [ DEV ] BYPASS DARK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12 bg-[#050505] min-h-screen text-white p-4 md:p-8 overflow-x-hidden">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-black px-6 py-3 rounded shadow-lg z-50 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-fade-in">
          <Activity size={16} />
          {notification}
        </div>
      )}
      {/* Header CEO Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8 mt-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-[0.4em] text-white/50 rounded-sm">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Connection Secure // Investor Intelligence Terminal
          </div>
          <div className="flex flex-col">
            <WinfLogo className="text-4xl md:text-5xl mb-2" />
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2 uppercase">Universo <span className="font-black text-zinc-600">DARK</span></h1>
            <p className="text-zinc-500 text-xs md:text-[10px] uppercase font-mono tracking-widest">Winf Capital Management // Strategic Expansion Board</p>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] mt-4">
            <ChevronLeft size={14} /> Retornar
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-0">
          <div className="flex bg-black border border-white/10 p-1 rounded-sm mr-4">
             <button onClick={() => setLang('pt')} className={`px-2 py-1 text-xs md:text-[10px] font-bold ${lang === 'pt' ? 'bg-white/10 text-white' : 'text-white/40'} transition-all`}>PT</button>
             <button onClick={() => setLang('en')} className={`px-2 py-1 text-xs md:text-[10px] font-bold ${lang === 'en' ? 'bg-white/10 text-white' : 'text-white/40'} transition-all`}>EN</button>
             <button onClick={() => setLang('es')} className={`px-2 py-1 text-xs md:text-[10px] font-bold ${lang === 'es' ? 'bg-white/10 text-white' : 'text-white/40'} transition-all`}>ES</button>
          </div>
          <div className="text-left md:text-right bg-white/5 border border-white/10 p-4 rounded-sm">
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 font-black uppercase tracking-[0.2em] mb-1">Mkt Cap / Valuation Est.</p>
            <p className="text-3xl text-white font-bold font-mono">BRL 68.5M</p>
          </div>
          <div className="text-left md:text-right bg-zinc-900 border border-white/10 p-4 rounded-sm border-l-4 border-l-zinc-500">
            <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">Asset Light Penetration</p>
            <p className="text-3xl text-white font-bold font-mono">{ASSET_LIGHT_STATUS.sold}/100</p>
          </div>
        </div>
      </div>

      {/* Main Hub Menu Or Tabs */}
      {activeTab === 'hub' ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12 animate-fade-in">
          {[
            { id: 'dashboard', label: 'Dashboard Bancário', icon: <Wallet className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-white transition-colors" />, desc: 'Acompanhamento do portfólio de investimentos, relatórios de rendimento e fluxo de dividendos.' },
            { id: 'painel', label: 'Painel Tático', icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-green-500 transition-colors" />, desc: 'Previsões de crescimento da rede, KPIs de absorção do mercado e oportunidades de alocação.' },
            { id: 'jornada', label: 'A Máquina de Equity', icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-white transition-colors" />, desc: 'O plano estratégico para transformação de equity. Estudo de formação de valuation e liquidity events.' },
            { id: 'celulas', label: 'As 12 Cadeiras (W12)', icon: <Users className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-white transition-colors" />, desc: 'Explore as vagas disponíveis para os Hubs Master (W12) pelo globo e no Brasil.' },
            { id: 'roadmap', label: 'Roadmap de Expansão', icon: <Globe className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-white transition-colors" />, desc: 'Metas globais, lançamentos de Hubs e fases de aquisição.' },
            { id: 'transparencia', label: 'Transparência & Governança', icon: <Shield className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-zinc-500 group-hover:text-white transition-colors" />, desc: 'Comitê de risco, auditoria de insumos e contratos WINF.' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="group bg-black border border-white/5 p-4 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-white/20 transition-all shadow-xl hover:-translate-y-1"
            >
              {tab.icon}
              <h3 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.1em] md:tracking-[0.2em] mb-1 md:mb-2">{tab.label}</h3>
              <p className="hidden md:block text-xs text-white/40 leading-relaxed font-light">{tab.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 border-b border-white/5 mb-8 animate-fade-in">
          <button
             onClick={() => setActiveTab('hub')}
             className="flex items-center gap-2 px-4 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2 border-transparent text-white/30 hover:text-white"
          >
             <ChevronLeft size={14} /> Hub
          </button>
          {[
            { id: 'dashboard', label: 'Dashboard Bancário', icon: <Wallet size={14} /> },
            { id: 'painel', label: 'Painel Tático', icon: <TrendingUp size={14} /> },
            { id: 'jornada', label: 'A Máquina de Equity', icon: <Briefcase size={14} /> },
            { id: 'celulas', label: 'As 12 Cadeiras (W12)', icon: <Users size={14} /> },
            { id: 'roadmap', label: 'Roadmap Expansão', icon: <Globe size={14} /> },
            { id: 'transparencia', label: 'Transparência', icon: <Shield size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-4 text-xs md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab.id ? 'border-white text-white' : 'border-transparent text-white/30 hover:text-white/50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'painel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          
          {/* Left Col - Graph */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-black border border-white/5 p-5 md:p-8 relative shadow-2xl">
              <div className="absolute top-0 right-0 p-4"><Eye size={20} className="text-white/10" /></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h3 className="text-xl font-light text-white tracking-tight mb-1">Previsão Alpha de Crescimento</h3>
                    <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Escala Brasil/Mundo (Base BlackShop Revenue)</p>
                  </div>
              </div>

              <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GROWTH_DATA}>
                        <defs>
                          <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="dividendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="step" stroke="#666" tick={{fill: '#666', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" stroke="#666" tick={{fill: '#666', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#22c55e" tick={{fill: '#22c55e', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '0px', fontSize: '10px', color: '#fff' }} itemStyle={{color: '#fff'}} />
                        <Area yAxisId="left" type="monotone" dataKey="equity" name="Valuation/Equity (M)" stroke="#888" strokeWidth={2} fillOpacity={1} fill="url(#equityGrad)" />
                        <Area yAxisId="right" type="monotone" dataKey="dividend" name="Dividendos Distrib. (M)" stroke="#22c55e" strokeWidth={1} fillOpacity={1} fill="url(#dividendGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Globe size={16} /> Oportunidades de Alocação</h3>
              <div className="space-y-4">
                  {INVESTMENT_POOLS.map((pool) => (
                    <div 
                      key={pool.id} 
                      onClick={() => setSelectedPool(pool.id)}
                      className={`bg-zinc-900/30 border ${selectedPool === pool.id ? 'border-zinc-500' : 'border-white/5'} p-6 cursor-pointer hover:border-zinc-700 transition-all group`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] px-2 py-0.5 border border-white/10 text-white/50 uppercase tracking-[0.2em]">{pool.type}</span>
                            <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] px-2 py-0.5 bg-white/5 text-white/50 uppercase tracking-[0.2em]">Risco: {pool.risk}</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors uppercase italic tracking-tighter">{pool.name}</h4>
                          <p className="text-xs text-white/40 leading-relaxed max-w-lg italic font-light">"{pool.description}"</p>
                        </div>
                        
                        <div className="w-full md:w-auto flex-shrink-0 bg-[#0A0A0A] p-4 border border-white/5 md:min-w-[200px]">
                          <div className="flex justify-between mb-4">
                            <div>
                              <p className="text-[10px] md:text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">Aporte/Entry</p>
                              <p className="text-sm font-mono text-white">{pool.min}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] md:text-[8px] text-white/40 uppercase tracking-[0.2em] mb-1">ROI Est.</p>
                              <p className="text-sm font-mono text-green-500 tracking-tighter">{pool.roi}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-[10px] md:text-[8px] font-mono text-white/50 mb-2 italic">
                              <span>Absorção de Mercado</span>
                              <span>{pool.progress}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 overflow-hidden">
                              <div className="h-full bg-zinc-500" style={{ width: `${pool.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Col - Execution */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-zinc-900 to-black border border-white/10 p-5 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 blur-[100px]"></div>
                
                <h4 className="text-xs md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 italic">
                  <Briefcase size={12} /> Execution Engine
                </h4>
                
                {!selectedPool ? (
                  <div className="text-center py-12 border border-white/5 border-dashed">
                    <Fingerprint size={32} className="mx-auto text-white/20 mb-4" />
                    <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-[0.2em]">Selecione um Syndicate <br/> para visualizar a tese.</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in text-left">
                    {(() => {
                      const pool = INVESTMENT_POOLS.find(p => p.id === selectedPool);
                      return pool ? (
                        <>
                          <div className="border-b border-white/10 pb-6 mb-6">
                            <h5 className="text-2xl font-bold text-white mb-2 leading-none uppercase italic tracking-tighter">{pool.name}</h5>
                            <p className="text-xs md:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mb-6">{pool.structure}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/40 p-4 border border-white/5 rounded-none">
                                  <p className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Target Yield</p>
                                  <p className="text-base font-mono text-green-500 font-bold">{pool.roi}</p>
                                </div>
                                <div className="bg-black/40 p-4 border border-white/5 rounded-none">
                                  <p className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Cycle Length</p>
                                  <p className="text-xs font-mono text-white mt-1 uppercase italic tracking-widest">{pool.payback}</p>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h6 className="text-xs md:text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3 border-l-2 border-zinc-600 pl-3">Tese Alpha</h6>
                                <p className="text-xs text-white/40 leading-relaxed font-light italic">"{pool.thesis}"</p>
                            </div>

                            <div className="mb-8">
                                <h6 className="text-xs md:text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3 border-l-2 border-zinc-600 pl-3">Arquivos de Inteligência</h6>
                                <div className="flex flex-col gap-1.5">
                                    {pool.docs.map((doc, i) => (
                                        <button onClick={() => setNotification('Download do arquivo indisponível no momento.')} key={i} className="flex items-center justify-between p-3 bg-white/2 border border-white/5 hover:bg-white/10 transition-all group w-full text-left">
                                            <div className="flex items-center gap-3">
                                              <Share2 size={12} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                              <span className="text-xs md:text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">{doc}</span>
                                            </div>
                                            <Eye size={12} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs md:text-[10px] text-white/50 uppercase tracking-[0.1em]">Allocated: <span className="font-mono text-white">{pool.available}</span></p>
                          </div>
                          
                          <div className="space-y-4">
                            <button onClick={() => setNotification('Sua solicitação de interesse foi registrada. Um Capital Officer entrará em contato.')} className="w-full py-5 bg-white text-black font-black text-xs md:text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 transition-colors">
                              Contact Capital Officer
                            </button>
                            <p className="text-sm md:text-[11px] md:text-sm md:text-[11px] md:text-[9px] text-zinc-600 text-center uppercase tracking-widest leading-loose">
                              Todas as propostas estão sujeitas ao KYC (Know Your Customer) e AML (Anti-Money Laundering).
                            </p>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>
                )}
            </div>

            <div className="bg-zinc-900/50 border border-white/5 p-6 relative group overflow-hidden">
               <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-zinc-500 opacity-5 blur-3xl transition-all group-hover:opacity-10"></div>
               <h4 className="text-xs md:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Shield size={12} /> Live Portfolio Monitor
               </h4>
               <div className="text-center py-6">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <p className="text-5xl font-mono font-bold text-white tracking-tighter">R$ 0,00</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
                    <p className="text-xs md:text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-mono">No Active Positions Detected</p>
                  </div>
               </div>
               <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] md:text-[8px] font-mono text-zinc-500">
                  <span className="uppercase tracking-widest italic">Status: Standby</span>
                  <span className="uppercase tracking-widest">Winf-Core v4.2</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jornada' && renderJornada()}
      {activeTab === 'celulas' && renderCelulas()}
      {activeTab === 'roadmap' && renderRoadmap()}
      {activeTab === 'transparencia' && renderTransparencia()}
      {activeTab === 'dashboard' && <InvestorDashboard user={user} />}
      
      <div className="mt-12 text-center border-t border-white/5 pt-8">
        <div className="flex flex-col items-center gap-4">
          <WinfLogo className="text-xl text-white/20" />
          <p className="text-[10px] md:text-[8px] text-white/20 uppercase tracking-[0.4em] font-mono">
            Winf Capital Management // Strictly Confidential // Encryption Layer Base-64
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleUniversoDark;
