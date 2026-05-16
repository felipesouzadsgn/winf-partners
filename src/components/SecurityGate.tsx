import React, { useState } from 'react';
import { Lock, ShieldAlert, Fingerprint } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

interface SecurityGateProps {
  children: React.ReactNode;
  level: 'STANDARD' | 'RESTRICTED' | 'CONFIDENTIAL';
  onDecline?: () => void;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ children, level, onDecline }) => {
  const { user } = useWinf();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Skip security for standard level if user is already logged in
  if (level === 'STANDARD' && user) {
    return <>{children}</>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleVerify = () => {
    // In a real app we'd verify the PIN against backend data.
    // For MVP, simulating a valid PIN as any 4-6 digit combination like "2024" or corresponding to rank
    if (pin.length >= 4) {
      if (pin === '0000') {
        setError(true);
        setTimeout(() => setError(false), 2000);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-[85vh] w-full bg-[#050505] flex items-center justify-center relative overflow-hidden animate-fade-in text-white border border-red-500/10 rounded-none shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      
      {/* Visual Glitch FX */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 opacity-50 animate-[pulse_2s_infinite]"></div>

      <div className="z-10 max-w-md w-full p-5 md:p-8 md:p-12 border border-red-500/20 bg-black/80 backdrop-blur-xl text-center space-y-8">
        
        <div className="relative w-24 h-24 mx-auto mb-6">
           <div className="absolute inset-0 border border-red-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
           <div className="absolute inset-0 border border-red-500/30 rounded-full animate-[spin_3s_linear_infinite_reverse] scale-110"></div>
           <div className="w-full h-full bg-red-500/5 rounded-full flex items-center justify-center text-red-500 relative z-10">
              <Fingerprint size={48} className="animate-pulse" />
           </div>
        </div>

        <div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Acesso Restrito</h3>
          <div className="flex items-center justify-center gap-2 text-red-500 text-xs md:text-[10px] font-bold uppercase tracking-[0.3em] bg-red-500/10 py-1.5 px-3 inline-block">
             <ShieldAlert size={12} /> Nível: {level}
          </div>
        </div>

        <p className="text-xs text-white/50 text-center uppercase tracking-widest leading-relaxed">
          Área classificada. Concorrentes e acessos não autorizados serão rastreados e bloqueados. Confirme sua biometria digital (PIN).
        </p>
        
        <div className="space-y-4 pt-2">
          <input 
            type="password" 
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\\D/g, ''))}
            placeholder="WINF SECURE PIN" 
            className={`w-full bg-[#111] border ${error ? 'border-red-500 text-red-500' : 'border-white/10 text-white'} p-4 text-center text-xl font-mono tracking-[0.5em] focus:border-red-500 outline-none transition-colors`}
          />
          {error && <p className="text-xs md:text-[10px] text-red-500 uppercase tracking-[0.2em] animate-pulse">Acesso Negado</p>}
        </div>

        <div className="space-y-4">
            <button 
                onClick={handleVerify}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-[10px] uppercase tracking-[0.3em] py-5 transition-colors shadow-[0_0_20px_rgba(255,0,0,0.2)]"
            >
                Confirmar Identidade
            </button>
            
            {onDecline && (
                <button 
                    onClick={onDecline} 
                    className="w-full border border-white/10 hover:bg-white/5 text-white/40 font-bold text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] py-4 transition-colors"
                >
                    Remover Conexão
                </button>
            )}
        </div>

        <div className="text-[10px] md:text-[8px] text-white/20 font-mono text-left pt-6 border-t border-white/5">
           <p>IP ADDRESS: {Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}</p>
           <p>SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityGate;
