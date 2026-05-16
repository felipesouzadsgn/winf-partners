
import React, { useState } from 'react';
import { Hexagon, ArrowRight, Mail, Lock, Loader, Key, ShieldCheck } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

import { ViewState } from '../types';

interface LoginProps {
  onNavigate?: (view: ViewState) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login, loginAsPrototype } = useWinf();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const { success, error: authError } = await login(email, password);
      if (!success) {
        setError(authError || "Credenciais inválidas.");
        setIsLoading(false);
      }
      // If success, the context/App.tsx handles the view switch via user state change
    } catch (e) {
      setError("Erro de conexão.");
      setIsLoading(false);
    }
  };

  const handlePrototypeAccess = async () => {
    setIsLoading(true);
    await loginAsPrototype();
    // Context handles redirection
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-800/10 rounded-none blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-zinc-800/10 rounded-none blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-none p-6 md:p-8 shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-black border border-zinc-700/30 rounded-none flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(113,113,122,0.2)]">
            <Hexagon size={28} className="text-white/40 md:size-[32px]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-light text-white tracking-widest">WINF <span className="font-bold">OS</span></h1>
          <p className="text-xs md:text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em] mt-1">Acesso Restrito // Licenciados</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/40 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-black/50 border border-white/10 rounded-none py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-zinc-700 focus:ring-1 focus:ring-winf-aerocore_blue/50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Senha</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/40 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/50 border border-white/10 rounded-none py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-zinc-700 focus:ring-1 focus:ring-winf-aerocore_blue/50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-none flex items-center gap-3 text-red-400 text-xs animate-slide-up">
              <ShieldCheck size={14} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-800 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-none uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(113,113,122,0.3)] hover:shadow-[0_0_30px_rgba(113,113,122,0.5)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader size={16} className="animate-spin" /> : <><Key size={16} /> Acessar Sistema</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs md:text-[10px] text-white/40 mb-4 uppercase tracking-[0.3em] font-bold">Acesso Rápido - Protótipo System</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  loginAsPrototype('Admin');
                }, 800);
              }}
              disabled={isLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all"
            >
              System Admin
            </button>
            <button 
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  loginAsPrototype('Licenciado' as any);
                }, 800);
              }}
              disabled={isLoading}
              className="bg-white/10 border border-winf-primary/20 hover:bg-white/20 text-white py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Parceiros WINF™ (Licenciado)
            </button>
            <button 
              onClick={() => {
                 setIsLoading(true);
                 setTimeout(() => {
                   loginAsPrototype('Architect');
                   // Wait for the auth context change
                   setTimeout(() => {
                     onNavigate?.(ViewState.DASHBOARD_ARCHITECT);
                   }, 100);
                 }, 800);
              }}
              disabled={isLoading}
              className="bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 text-amber-400 py-3 rounded-none text-xs md:text-[10px] font-black uppercase tracking-widest transition-all border-dashed"
            >
              Hub Architect
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-xs md:text-[10px] text-gray-600 uppercase tracking-widest">
        Winf Partners © 2025. Secure Connection.
      </div>
    </div>
  );
};

export default Login;
    