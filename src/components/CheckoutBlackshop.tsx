import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Box, CreditCard, ChevronRight, CheckCircle2, Lock, Cpu, Globe, Database, Fingerprint, Loader2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

interface CheckoutBlackshopProps {
  onBack: () => void;
  onSuccess: () => void;
  items: any[];
}

const CheckoutBlackshop: React.FC<CheckoutBlackshopProps> = ({ onBack, onSuccess, items }) => {
  const { user, gamify } = useWinf();
  const [step, setStep] = useState(0); // 0: Security Gate, 1: Default
  const [paymentMethod, setPaymentMethod] = useState<'credit'|'pix'|'winfcoin'|'crypto'>('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [securityError, setSecurityError] = useState(false);

  const handleVerifySecurity = () => {
    if (pinCode === '0000' || pinCode === '2024' || pinCode.length >= 4) {
      setStep(1);
    } else {
      setSecurityError(true);
      setTimeout(() => setSecurityError(false), 2000);
    }
  };

  // When step === 0, render security wall
  if (step === 0) {
    return (
      <div className="min-h-[85vh] bg-[#050505] flex items-center justify-center relative overflow-hidden animate-fade-in text-white border border-red-500/20 rounded-none shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="z-10 max-w-sm w-full p-5 md:p-8 border border-red-500/30 bg-black/80 backdrop-blur-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto border border-red-500 text-red-500 flex items-center justify-center bg-red-500/10 mb-4 animate-pulse">
            <Lock size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Protocolo de Segurança</h3>
            <p className="text-xs md:text-[10px] text-white/50 uppercase tracking-[0.2em]">Acesso restrito Winf BlackShop™</p>
          </div>
          
          <div className="space-y-4 pt-4">
            <input 
              type="password" 
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\\D/g, ''))}
              placeholder="Digite o PIN (ex: 0000)" 
              className={`w-full bg-black border ${securityError ? 'border-red-500' : 'border-white/10'} p-4 text-center text-2xl font-mono tracking-widest text-white outline-none focus:border-red-500 transition-colors`}
            />
            {securityError && <p className="text-xs md:text-[10px] text-red-500 uppercase tracking-widest animate-pulse">Acesso Negado</p>}
          </div>

          <button 
            onClick={handleVerifySecurity}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-[10px] uppercase tracking-[0.3em] py-4 transition-colors mt-4"
          >
            Verificar Identidade
          </button>
          
          <button onClick={onBack} className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-widest hover:text-white pt-4">
            Cancelar Transação
          </button>
        </div>
      </div>
    );
  }
  
  const total = items.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setStep(3); // Verification step
    
    // Simulate Blockchain node validation
    setTimeout(() => {
      const generatedHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setTxHash(generatedHash);
      setStep(4); // Success step
      
      // Award points
      gamify('SALE_CLOSED', { value: total });
      
    }, 4500);
  };

  return (
    <div className="min-h-[85vh] bg-winf-background flex flex-col md:flex-row relative overflow-hidden animate-fade-in text-white border border-white/5 rounded-none shadow-2xl">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* LEFT COL: Cart & Details */}
      <div className="w-full md:w-[45%] bg-[#080808] border-r border-white/5 p-5 md:p-8 md:p-12 z-10 flex flex-col">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-[0.3em] mb-12 w-fit">
          <ChevronLeft size={14} /> Voltar para Loja
        </button>

        <h2 className="text-3xl font-light tracking-tight mb-8">Resumo do <span className="font-bold">Pedido</span></h2>
        
        <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-16 h-16 bg-[#111] border border-white/10 flex items-center justify-center">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <Box className="text-white/40" size={24} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">{item.category}</p>
                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">R$ {item.price.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 mt-auto">
          <div className="flex justify-between items-center text-sm text-white/60 mb-4">
            <span>Subtotal</span>
            <span>R$ {total.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-white/60 mb-6 pb-6 border-b border-white/10">
            <span>Taxas (WINF™ Network)</span>
            <span>R$ 0,00</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="block text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total a Pagar</span>
              <span className="text-3xl font-black text-white">R$ {total.toLocaleString('pt-BR')}</span>
            </div>
            {paymentMethod === 'winfcoin' && (
              <div className="text-right">
                 <span className="block text-xs md:text-[10px] uppercase text-yellow-400 font-bold">WINF Coins</span>
                 <span className="text-lg text-yellow-400">~ {(total * 1.5).toLocaleString('pt-BR')} ¢</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COL: Checkout logic */}
      <div className="w-full md:w-[55%] bg-[#0A0A0A] p-5 md:p-8 md:p-12 z-10 flex flex-col justify-center min-h-[500px]">
        {step === 1 && (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Método de Pagamento</h3>
              <p className="text-white/40 text-sm">Transação encriptada via WINF CHAIN™</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setPaymentMethod('credit')}
                className={`w-full flex items-center justify-between p-5 border transition-all ${paymentMethod === 'credit' ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30 bg-black'}`}
              >
                <div className="flex items-center gap-4">
                  <CreditCard className={paymentMethod === 'credit' ? 'text-white' : 'text-white/40'} />
                  <span className="font-bold text-sm tracking-widest uppercase">Cartão de Crédito</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-5 bg-white/10 rounded-sm"></span>
                  <span className="w-8 h-5 bg-white/10 rounded-sm"></span>
                </div>
              </button>

              <button 
                onClick={() => setPaymentMethod('pix')}
                className={`w-full flex items-center justify-between p-5 border transition-all ${paymentMethod === 'pix' ? 'border-winf-primary bg-winf-primary/5' : 'border-white/10 hover:border-white/30 bg-black'}`}
              >
                <div className="flex items-center gap-4">
                  <ShieldCheck className={paymentMethod === 'pix' ? 'text-winf-primary' : 'text-white/40'} />
                  <span className={`font-bold text-sm tracking-widest uppercase ${paymentMethod==='pix'?'text-winf-primary':''}`}>PIX (Aprovação Imadiata)</span>
                </div>
              </button>

              <button 
                onClick={() => setPaymentMethod('crypto')}
                className={`w-full flex items-center justify-between p-5 border transition-all ${paymentMethod === 'crypto' ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-white/30 bg-black'}`}
              >
                <div className="flex items-center gap-4">
                  <Globe className={paymentMethod === 'crypto' ? 'text-purple-500' : 'text-white/40'} />
                  <span className={`font-bold text-sm tracking-widest uppercase ${paymentMethod==='crypto'?'text-purple-500':''}`}>USDT / Crypto</span>
                </div>
                <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold text-purple-500 bg-purple-500/10 px-2 py-1 uppercase tracking-widest">Web3</span>
              </button>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-white text-black py-4 mt-8 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              Prosseguir <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto w-full">
            <button onClick={() => setStep(1)} className="text-xs md:text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white flex items-center gap-1 mb-8">
              <ChevronLeft size={12} /> Voltar
            </button>

            {paymentMethod === 'credit' && (
              <div className="space-y-6">
                 <h3 className="text-xl font-black uppercase tracking-widest text-white mb-6">Dados do Cartão</h3>
                 <input type="text" placeholder="Nome no Cartão" className="w-full bg-black border border-white/10 p-4 text-white focus:border-white transition-colors outline-none" />
                 <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/10 p-4 text-white focus:border-white transition-colors outline-none font-mono" />
                 <div className="flex gap-4">
                   <input type="text" placeholder="MM/AA" className="w-1/2 bg-black border border-white/10 p-4 text-white focus:border-white transition-colors outline-none" />
                   <input type="text" placeholder="CVC" className="w-1/2 bg-black border border-white/10 p-4 text-white focus:border-white transition-colors outline-none" />
                 </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="text-center py-8">
                 <div className="w-48 h-48 bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-6">
                    <span className="text-white/20 font-mono text-sm">QR_CODE_GENERATOR</span>
                 </div>
                 <p className="text-sm text-white/60 mb-2">Escaneie o QR Code ou copie o código Pix copia e cola.</p>
                 <div className="bg-[#111] border border-white/10 p-3 flex justify-between items-center">
                    <span className="font-mono text-xs text-white/40 truncate w-4/5">00020126420014br.gov.bcb.pix...</span>
                    <button className="text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest font-bold text-white">Copiar</button>
                 </div>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="text-center py-8 space-y-6">
                 <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mx-auto mb-4">
                    <Fingerprint size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-white">Conectar Wallet</h3>
                 <p className="text-white/40 text-sm">Aceitamos MetaMask, TrustWallet e WalletConnect na rede Polygon e Ethereum.</p>
                 <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 font-bold tracking-widest uppercase transition-colors">
                   Connect Web3 Wallet
                 </button>
              </div>
            )}

            <button 
              onClick={handleProcessPayment}
              className="w-full bg-winf-primary text-black py-4 mt-8 font-black text-xs uppercase tracking-widest hover:bg-winf-primary/90 transition-colors flex items-center justify-center gap-2"
            >
               Confirmar & Pagar
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-8 animate-fade-in flex flex-col items-center justify-center h-full">
            <div className="relative">
              <Cpu size={64} className="text-winf-primary animate-pulse" />
              <div className="absolute inset-0 bg-winf-primary blur-[50px] opacity-20"></div>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Registrando na I-BLOCKCHAIN™</h3>
              <p className="text-white/40 text-sm font-mono flex items-center justify-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Verificando nós da rede...
              </p>
            </div>
            
            <div className="w-64 max-w-full text-left space-y-2 font-mono text-xs md:text-[10px] text-white/30">
               <p>➜ Validando credenciais...</p>
               <p className="text-winf-primary/50">➜ Lock Smart Contract...</p>
               <p>➜ Gerando Hash...</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-8 animate-fade-in max-w-md mx-auto w-full">
            <div className="w-20 h-20 bg-winf-primary/10 rounded-full flex items-center justify-center mx-auto text-winf-primary mb-6">
              <CheckCircle2 size={40} />
            </div>
            
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Pagamento Aprovado</h3>
              <p className="text-white/60 mb-8">Sua transação foi confirmada e registrada na WINF CHAIN.</p>
            </div>

            <div className="bg-[#111] border border-white/5 p-6 rounded-sm text-left space-y-4">
              <div>
                <span className="block text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest text-white/40 mb-1">Hash da Transação</span>
                <span className="font-mono text-xs text-winf-primary break-all">{txHash}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-4">
                <div>
                  <span className="block text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest text-white/40 mb-1">Valor</span>
                  <span className="font-bold text-white">R$ {total.toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span className="block text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-widest text-white/40 mb-1">Status</span>
                  <span className="font-bold text-green-400">Verificado</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onSuccess}
              className="w-full bg-white text-black py-4 mt-8 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Acessar Módulo Blockchain
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutBlackshop;
