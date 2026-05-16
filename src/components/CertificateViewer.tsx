import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  Calendar, 
  User, 
  MapPin, 
  FileText, 
  Award,
  Thermometer,
  Sun,
  ShieldAlert,
  EyeOff,
  Download,
  Share2
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { Installation } from '../types';

const CertificateViewer: React.FC<{ id?: string }> = ({ id }) => {
  const { installations, fetchInstallationById } = useWinf();
  const [installation, setInstallation] = useState<Installation | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (id) {
        const found = installations.find(i => i.id === id);
        if (found) {
          setInstallation(found);
          const timer = setTimeout(() => setIsVerifying(false), 2500);
          return () => clearTimeout(timer);
        } else {
          // If not in context (e.g. public view), fetch directly
          const fetched = await fetchInstallationById(id);
          if (fetched) {
            setInstallation(fetched);
            const timer = setTimeout(() => setIsVerifying(false), 2500);
            return () => clearTimeout(timer);
          } else {
            setIsVerifying(false);
          }
        }
      } else {
        setIsVerifying(false);
      }
    };
    verify();
  }, [id, installations, fetchInstallationById]);

  if (isVerifying || !installation) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
        {/* Verification HUD */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-12 z-10">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-2 border-dashed border-winf-primary/20 rounded-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-32 h-32 border border-winf-primary/40 rounded-none scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-12 h-12 text-white animate-pulse" />
            </div>
            
            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ['-10%', '110%', '-10%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[-20%] right-[-20%] h-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
            />
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white uppercase tracking-[0.4em] italic">WINF VERIFICATION SYSTEM™</h2>
              <p className="text-xs md:text-[10px] font-mono text-white uppercase tracking-[0.3em] animate-pulse">
                {installation ? 'AUTENTICANDO REGISTRO DIGITAL...' : 'BUSCANDO CERTIFICADO NO DATABASE...'}
              </p>
            </div>
            
            {installation && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-mono text-gray-600 uppercase tracking-widest"
              >
                ID: {id} <br />
                UPLINK: ESTABLISHED <br />
                ENCRYPTION: AES-256-GCM
              </motion.div>
            )}
          </div>
        </div>
        
        {!installation && !isVerifying && (
          <div className="absolute bottom-12 text-center">
            <p className="text-red-500 font-mono text-xs uppercase tracking-widest">Erro: Certificado não encontrado ou inválido.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-white" />
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">WINF OS™</h1>
            </div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Official Digital Certificate of Authenticity</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 rounded-none hover:bg-white/10 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white/5 rounded-none hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Certificate Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-none overflow-hidden p-5 md:p-8 md:p-12"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
          </div>

          <div className="relative z-10 space-y-12">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Certificate ID</span>
                <h2 className="text-2xl font-mono font-bold text-white">{installation.id}</h2>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-none">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Verified Authentic</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Proprietário / Cliente</label>
                  <p className="text-3xl font-bold tracking-tight">{installation.client_name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Data de Instalação</label>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Calendar className="w-4 h-4 text-white/40" />
                      {new Date(installation.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Garantia</label>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Award className="w-4 h-4 text-white/40" />
                      {installation.warranty_years} ANOS
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Localização</label>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin className="w-4 h-4 text-white/40" />
                    {installation.location}
                  </div>
                </div>
              </div>

              <div className="space-y-8 bg-white/5 rounded-none p-5 md:p-8 border border-white/5">
                <div className="space-y-2">
                  <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Produto Instalado</label>
                  <p className="text-2xl font-bold text-white">{installation.product_name}</p>
                  <p className="text-sm text-white/40">{installation.product_line}</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Performance Intelligence</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 rounded-none border border-white/5">
                      <Thermometer className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-xs text-white/40 uppercase">Térmica</p>
                      <p className="text-lg font-bold">{installation.performance_snapshot?.thermal || 0}/10</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-none border border-white/5">
                      <Sun className="w-5 h-5 text-white mb-2" />
                      <p className="text-xs text-white/40 uppercase">Luminosidade</p>
                      <p className="text-lg font-bold">{installation.performance_snapshot?.light || 0}/10</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-none border border-white/5">
                      <ShieldAlert className="w-5 h-5 text-white mb-2" />
                      <p className="text-xs text-white/40 uppercase">Escudo</p>
                      <p className="text-lg font-bold">{installation.performance_snapshot?.shield || 0}/10</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-none border border-white/5">
                      <EyeOff className="w-5 h-5 text-purple-500 mb-2" />
                      <p className="text-xs text-white/40 uppercase">Privacidade</p>
                      <p className="text-lg font-bold">{installation.performance_snapshot?.privacy || 0}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-white/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40">Instalador Autorizado</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">{installation.installer_name || 'WINF AUTHORIZED GLASS TECH™'}</p>
                  {installation.installer_level && <p className="text-xs text-white uppercase tracking-widest">{installation.installer_level}</p>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">Selo de Autenticidade</p>
                <div className="w-24 h-24 bg-white p-2 rounded-none mx-auto md:ml-auto">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-black rounded-none flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <div className="text-center space-y-4 py-8">
          <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Este certificado digital é um registro imutável da instalação realizada pela rede WINF™. 
            A autenticidade deste documento pode ser verificada a qualquer momento através do sistema WINF OS™.
          </p>
          <div className="flex justify-center gap-8 text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span>WINF GLOBAL NETWORK</span>
            <span>WINF PERFORMANCE SYSTEM™</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
