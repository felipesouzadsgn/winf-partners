import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Activity, 
  Shield, Clock, TrendingUp, BarChart2,
  ChevronRight, Lock, FileText, Globe
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const DATA_VALUATION = [
  { term: '1Q25', value: 15, volume: 1.2 },
  { term: '2Q25', value: 18, volume: 1.8 },
  { term: '3Q25', value: 24, volume: 2.1 },
  { term: '4Q25', value: 31, volume: 3.4 },
  { term: '1Q26', value: 45, volume: 6.2 },
  { term: '2Q26', value: 68.5, volume: 8.5 },
];

const TICKERS = [
  { id: 'WINF.Q', label: 'WINF GLOBAL', price: 'USD 42.50', change: '+2.4%', up: true },
  { id: 'ALGT.NA', label: 'ASSET LIGHT IDX', price: 'USD 18.20', change: '+1.1%', up: true },
  { id: 'W12.B', label: 'W12 BOARD', price: 'USD 1,245.00', change: '+0.5%', up: true },
  { id: 'BSHP.US', label: 'BLACKSHOP RETAIL', price: 'USD 8.40', change: '-0.2%', up: false }
];

interface InvestorDashboardProps {
  user: FirebaseUser | null;
}

export const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ user: parentUser }) => {
  const [user, setUser] = useState<FirebaseUser | null>(parentUser);
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState('');
  
  const [investments, setInvestments] = useState<any[]>([]);
  const [dividends, setDividends] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (parentUser?.uid === 'dev-mode') {
      setUser(parentUser);
      setUserName('Dev User');
      fetchInvestorData('dev-mode');
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user?.uid === 'dev-mode') return;
      setUser(currentUser);
      if (currentUser) {
        fetchInvestorData(currentUser.uid);
      } else {
        setInvestments([]);
        setDividends([]);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, [parentUser, user?.uid]);

  const fetchInvestorData = async (uid: string) => {
    setLoadingData(true);
    try {
      if (uid !== 'dev-mode') {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserName(userDocSnap.data().name || '');
        }
      }

      let _investments: any[] = [];
      let _dividends: any[] = [];

      if (uid !== 'dev-mode') {
        const invQuery = query(collection(db, 'investments'), where('userId', '==', uid));
        const invSnapshot = await getDocs(invQuery);
        _investments = invSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const divQuery = query(collection(db, 'dividends'), where('userId', '==', uid));
        const divSnapshot = await getDocs(divQuery);
        _dividends = divSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      
      if (_investments.length === 0) {
        _investments = [
          { id: '1', poolId: 'ASSET LIGHT CAP', amount: 30000, shares: 1200, status: 'Active', title: 'Asset Light Real Estate' },
          { id: '2', poolId: 'W12 MASTER', amount: 1200000, shares: 10000, status: 'Active', title: 'W12 Global Board Seat' }
        ];
      }
      
      if (_dividends.length === 0) {
        _dividends = [
          { id: 1, type: 'credit', title: 'Q2 Dividend Payout (ALGT)', date: '2026-05-12', amount: '+ 12,450.00', currency: 'BRL', status: 'Settled' },
          { id: 2, type: 'credit', title: 'Royalties Distribution (BSHP)', date: '2026-05-05', amount: '+ 4,230.00', currency: 'BRL', status: 'Settled' },
          { id: 3, type: 'investment', title: 'Capital Call (W12 Series A)', date: '2026-04-28', amount: '- 15,000.00', currency: 'BRL', status: 'Executed' },
          { id: 4, type: 'credit', title: 'Q1 Dividend Payout (ALGT)', date: '2026-04-12', amount: '+ 8,900.00', currency: 'BRL', status: 'Settled' }
        ];
      }

      setInvestments(_investments);
      setDividends(_dividends);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    if (user?.uid === 'dev-mode') {
      setUser(null);
      setInvestments([]);
      setDividends([]);
      setUserName('');
    } else {
      auth.signOut();
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 animate-fade-in w-full text-zinc-100 relative max-w-[1400px] mx-auto pb-20 font-sans tracking-tight">
      {loadingData && (
        <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm z-50 flex items-center justify-center">
           <div className="animate-pulse flex flex-col items-center">
             <div className="w-12 h-1 border-t-2 border-white mb-4"></div>
             <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">CONNECTING TO MARKET DATA...</p>
           </div>
        </div>
      )}

      {/* Ticker Tape */}
      <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar bg-black border-y border-white/10 py-2 px-4 select-none">
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest shrink-0 mr-4">MARKET QUOTES (DELAYED)</div>
        {TICKERS.map(t => (
          <div key={t.id} className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-bold text-white tracking-wider">{t.id}</span>
            <span className="text-[11px] font-mono">{t.price}</span>
            <span className={`text-[10px] font-mono flex items-center ${t.up ? 'text-green-500' : 'text-red-500'}`}>
              {t.up ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
              {t.change}
            </span>
            <span className="w-px h-3 bg-white/10 ml-6"></span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Left Column (Portfolio Overview) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          <div className="p-6 md:p-8 bg-[#050505] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">CONSOLIDATED PORTFOLIO</span>
                <span className="text-[8px] bg-white text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">LIVE</span>
              </div>
              <div className="text-5xl font-light tracking-tight text-white mb-2">
                <span className="text-2xl text-zinc-600 mr-2 font-mono">BRL</span>
                1,245,890<span className="text-zinc-500 text-3xl">.00</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight size={14} className="mr-1" />
                  +14.2% YTD
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">UNREALIZED GAIN: +174,000.00</span>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => setNotification('Trade execution module temporarily offline.')} className="flex-1 md:flex-none uppercase text-[10px] font-bold tracking-widest bg-white text-black px-6 py-3 hover:bg-zinc-200 transition-colors">
                TRADE
              </button>
              <button onClick={handleLogout} className="flex-1 md:flex-none uppercase text-[10px] font-bold tracking-widest border border-white/20 text-white px-6 py-3 hover:bg-white/10 transition-colors">
                LOGOUT
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#050505] border border-white/10">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">PERFORMANCE & VOLUME</h3>
               <div className="flex space-x-2">
                 {['1M', '3M', 'YTD', '1Y', 'MAX'].map(p => (
                   <button key={p} className={`text-[9px] font-mono px-2 py-1 ${p === 'MAX' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>{p}</button>
                 ))}
               </div>
             </div>
             
             <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA_VALUATION} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.1}/>
                        <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="term" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}M`} />
                    <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.1)" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', borderRadius: '0' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: any, name: string) => [name === 'value' ? `${value}M` : `${value}M Vol`, name === 'value' ? 'AUM' : 'Volume']}
                      labelStyle={{ color: '#888', marginBottom: '4px' }}
                      cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area yAxisId="left" type="step" dataKey="value" stroke="#fff" strokeWidth={1.5} fillOpacity={1} fill="url(#gradient)" activeDot={{ r: 4, fill: '#fff' }} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="h-[60px] w-full mt-2">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_VALUATION} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <YAxis yAxisId="right" orientation="right" hide domain={[0, 'dataMax']} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<></>} />
                    <Bar yAxisId="right" dataKey="volume" fill="rgba(255,255,255,0.1)" />
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-[#050505] border border-white/10 p-6">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">RECENT TRANSACTIONS</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono">
                <thead>
                  <tr className="text-zinc-600 border-b border-white/10">
                    <th className="font-normal pb-3 font-sans tracking-widest text-[9px] uppercase">Date</th>
                    <th className="font-normal pb-3 font-sans tracking-widest text-[9px] uppercase">Description</th>
                    <th className="font-normal pb-3 font-sans tracking-widest text-[9px] uppercase text-right">Amount</th>
                    <th className="font-normal pb-3 font-sans tracking-widest text-[9px] uppercase text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dividends.map((tx: any, idx: number) => (
                    <tr key={tx.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? '' : 'bg-[#080808]'}`}>
                      <td className="py-4 text-zinc-400">{tx.date}</td>
                      <td className="py-4 text-white">{tx.title}</td>
                      <td className={`py-4 text-right ${tx.type === 'credit' ? 'text-green-400' : 'text-zinc-300'}`}>
                        {tx.currency} {tx.amount}
                      </td>
                      <td className="py-4 text-right">
                        <span className="bg-white/10 px-2 py-1 text-zinc-300 tracking-widest uppercase text-[8px]">{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Keys & Intelligence) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          <div className="bg-[#050505] border border-white/10 p-6">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">ASSET ALLOCATION</h3>
            <div className="space-y-4">
              {investments.map((inv: any) => (
                <div key={inv.id} className="border border-white/10 p-4 bg-[#0a0a0a] hover:border-white/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-sm text-white tracking-tight mb-1">{inv.title}</h4>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{inv.poolId}</p>
                    </div>
                    <Lock size={14} className="text-zinc-600" />
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/10 mt-2">
                    <div>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">TOTAL SHARES</p>
                      <p className="text-xs font-mono text-white">{inv.shares?.toLocaleString() || '---'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">MARKET VALUE</p>
                      <p className="text-sm font-mono text-white">BRL {inv.amount.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 p-6">
            <div className="flex justify-between items-start mb-6">
               <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">NETWORK INTELLIGENCE</h3>
               <Globe size={16} className="text-zinc-600" />
            </div>
            
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-white">Asset Light Penetration</span>
                <span className="text-[10px] font-mono text-zinc-400">12 / 100</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-none overflow-hidden mb-2">
                <div className="h-full bg-white" style={{ width: '12%' }}></div>
              </div>
              <p className="text-[9px] text-zinc-500 leading-relaxed font-mono">
                Regional board quota utilization currently stands at 12%. Valuation multiplier triggering at 100 benchmark.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                 <span className="text-zinc-400">WINF Index Volatility</span>
                 <span className="font-mono text-white">14.2%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="text-zinc-400">Est. Dividend Yield (TTM)</span>
                 <span className="font-mono text-white">8.4%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="text-zinc-400">Price / Earnings</span>
                 <span className="font-mono text-white">12.5x</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-6 border border-zinc-800">
             <div className="flex gap-4">
               <Shield className="text-zinc-400 shrink-0" size={16} />
               <div>
                 <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Sinf-Chain Compliance</h4>
                 <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                   All equity positions and physical asset backings are audited and stored immutably via Base-64 encrypted ledgers.
                 </p>
                 <button className="text-[9px] font-mono tracking-widest uppercase border border-zinc-700 w-full py-2 hover:bg-zinc-800 transition-colors">
                   ACCESS DATA ROOM
                 </button>
               </div>
             </div>
          </div>
          
        </div>
      </div>

      {/* Notifications Overlay */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-white text-black px-6 py-4 border border-zinc-300 shadow-xl z-50 animate-fade-in flex items-center gap-3">
          <Activity size={16} />
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">SYSTEM MESSAGE</div>
            <div className="text-xs">{notification}</div>
          </div>
        </div>
      )}
    </div>
  );
};

