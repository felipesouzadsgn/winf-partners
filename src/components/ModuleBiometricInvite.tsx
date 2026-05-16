
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ScanFace, Lock, CheckCircle, Fingerprint, Loader, Cpu, ShieldCheck, MapPin, AlertTriangle, Search, Activity, UserCheck, Eye, Zap, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useWinf } from '../contexts/WinfContext';
import TextoCriptografado from './TextoCriptografado';

// --- Biometric Scanner Component Enhanced ---
const BiometricScanner: React.FC<{ onScanComplete: () => void }> = ({ onScanComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scanState, setScanState] = useState<'CALIBRATING' | 'TRACKING' | 'ANALYZING' | 'LOCKED'>('CALIBRATING');
    const [metrics, setMetrics] = useState({ symmetry: 0, attention: 0, liveness: 0 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let stream: MediaStream | null = null;
        
        // Simulação de Métricas em Tempo Real
        const metricInterval = setInterval(() => {
            setMetrics({
                symmetry: 85 + Math.random() * 14,
                attention: 90 + Math.random() * 9,
                liveness: 98 + Math.random() * 2
            });
        }, 150);

        // Sequência de Estados
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1500));
            setScanState('TRACKING');
            await new Promise(r => setTimeout(r, 2000));
            setScanState('ANALYZING');
            
            // Barra de Progresso durante análise
            let p = 0;
            const progInt = setInterval(() => {
                p += 2;
                setProgress(p);
                if (p >= 100) {
                    clearInterval(progInt);
                    setScanState('LOCKED');
                    setTimeout(onScanComplete, 800);
                }
            }, 30);
        };

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user', width: { ideal: 1280 } } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    sequence();
                }
            } catch (err) {
                console.error("Camera access denied", err);
                // Fallback sequence sem câmera
                sequence();
            }
        };
        startCamera();
        
        return () => { 
            if (stream) stream.getTracks().forEach(track => track.stop()); 
            clearInterval(metricInterval);
        };
    }, []);

    const getColor = () => {
        switch(scanState) {
            case 'CALIBRATING': return 'text-white border-white';
            case 'TRACKING': return 'text-white/40 border-zinc-700';
            case 'ANALYZING': return 'text-white/40 border-zinc-700';
            case 'LOCKED': return 'text-green-500 border-green-500';
            default: return 'text-white border-white';
        }
    };

    const borderColor = getColor().split(' ')[1];
    const textColor = getColor().split(' ')[0];

    return (
        <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-none overflow-hidden border border-white/10 shadow-2xl group">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-60 grayscale scale-110" />
            
            {/* --- GRID BACKGROUND --- */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            {/* --- HUD OVERLAY --- */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none">
                
                {/* HUD Header */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className={`flex items-center gap-2 text-xs md:text-[10px] font-bold tracking-widest ${textColor} animate-pulse`}>
                            <Activity size={12} /> {scanState}
                        </div>
                        <div className="font-mono text-[10px] md:text-[8px] text-white/40">NEUROMESH v4.2</div>
                    </div>
                    <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                            <div key={i} className={`w-1 h-4 ${i <= (progress/25) ? textColor.replace('text-', 'bg-') : 'bg-gray-800'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Central Reticle & Face Mesh Sim */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                    {/* Corners */}
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${borderColor} transition-colors duration-500`}></div>
                    <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${borderColor} transition-colors duration-500`}></div>
                    <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${borderColor} transition-colors duration-500`}></div>
                    <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${borderColor} transition-colors duration-500`}></div>
                    
                    {/* Scanning Line */}
                    <div className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${textColor.replace('text-', '')} to-transparent animate-[scan_2s_ease-in-out_infinite] opacity-50`}></div>

                    {/* Face Dots Simulation (Static Pattern for Effect) */}
                    {scanState !== 'CALIBRATING' && (
                        <div className="absolute inset-10 grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-8 opacity-40 animate-pulse">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-none ${textColor.replace('text-', 'bg-')} mx-auto`}></div>
                            ))}
                        </div>
                    )}
                </div>

                {/* HUD Data Panels */}
                <div className="flex justify-between items-end">
                    <div className="space-y-1 bg-black/60 backdrop-blur-sm p-2 rounded-none border border-white/5">
                        <div className="flex justify-between gap-4 text-[10px] md:text-[8px] text-white/40 font-mono uppercase">
                            <span>Symmetry</span>
                            <span className={textColor}>{metrics.symmetry.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between gap-4 text-[10px] md:text-[8px] text-white/40 font-mono uppercase">
                            <span>Attention</span>
                            <span className={textColor}>{metrics.attention.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between gap-4 text-[10px] md:text-[8px] text-white/40 font-mono uppercase">
                            <span>Liveness</span>
                            <span className={textColor}>{metrics.liveness.toFixed(1)}%</span>
                        </div>
                    </div>

                    <div className="text-right">
                        {scanState === 'ANALYZING' && (
                            <div className="mb-2">
                                <div className="text-[10px] md:text-[8px] text-white/40 uppercase font-bold mb-1">Decrypting Identity</div>
                                <div className="w-24 h-1 bg-gray-800 rounded-none overflow-hidden">
                                    <div className={`h-full ${textColor.replace('text-', 'bg-')}`} style={{width: `${progress}%`}}></div>
                                </div>
                            </div>
                        )}
                        <div className={`text-2xl font-mono font-bold ${textColor}`}>
                            {scanState === 'LOCKED' ? 'MATCH' : 'SCAN'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Module ---
type State = 'LOCKED' | 'SCANNING' | 'ANALYZING' | 'REVEALED' | 'SUBMITTED';

const ModuleBiometricInvite: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { addLead } = useWinf();
    const [state, setState] = useState<State>('LOCKED');
    const [aiProfile, setAiProfile] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', city: '', phone: '', businessModel: '' });
    
    // UI Loading State
    const [isCheckingCity, setIsCheckingCity] = useState(false);
    const [cityStatus, setCityStatus] = useState<'IDLE' | 'AVAILABLE' | 'LOCKED' | 'WAITLIST'>('IDLE');
    const [isInitializing, setIsInitializing] = useState(false);

    // Pre-load AI Archetype
    useEffect(() => {
        const generateArchetype = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
                const prompt = `
                    Você é o NeuroMesh AI, o sistema central da marca WINF. 
                    Acabamos de escanear um novo candidato a parceiro. 
                    Crie um perfil psicológico curto e impactante para ele em formato JSON.
                    
                    Gere UM destes arquétipos aleatoriamente:
                    1. "O ESTRATEGISTA SILENCIOSO" (Focado em dados, precisão, lucro oculto)
                    2. "O EXECUTOR DE ELITE" (Ação rápida, dominância, escala agressiva)
                    3. "O VISIONÁRIO TÉCNICO" (Obsessão por qualidade, detalhe, perfeição)

                    JSON Format: { 
                        "archetype": "NOME DO ARQUÉTIPO", 
                        "analysis": "Uma frase curta e misteriosa explicando por que a biometria dele revelou esse padrão.",
                        "access_level": "NÍVEL ALPHA - ACESSO IMEDIATO"
                    }
                `;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { responseMimeType: 'application/json' }
                });
                setAiProfile(JSON.parse(response.text));
            } catch (e) {
                // Fallback
                setAiProfile({
                    archetype: "O EXECUTOR DE ELITE",
                    analysis: "Padrões óticos indicam alta tolerância a risco e foco absoluto em dominação de território.",
                    access_level: "NÍVEL ALPHA - ACESSO IMEDIATO"
                });
            }
        };
        generateArchetype();
    }, []);

    const handleCityBlur = () => {
        if (!formData.city) return;
        setIsCheckingCity(true);
        setCityStatus('IDLE');
        
        // Simulação do W.A.R.P. check
        setTimeout(() => {
            const cityLower = formData.city.toLowerCase();
            const occupied = ['santos', 'são paulo', 'campinas', 'balneário camboriú', 'curitiba'];
            
            if (occupied.some(c => cityLower.includes(c))) {
                setCityStatus('LOCKED');
            } else {
                setCityStatus('AVAILABLE');
            }
            setIsCheckingCity(false);
        }, 1500);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addLead({
            name: formData.name,
            contact: formData.phone,
            source: 'Biometric Invite',
            interest: `${formData.businessModel} [${aiProfile?.archetype || 'ANALYZED'}]`,
            status: cityStatus === 'LOCKED' ? 'Waitlist' : 'Qualificado',
            ai_score: 95
        });
        setState('SUBMITTED');
    };

    const handleStartScan = () => {
        setIsInitializing(true);
        setTimeout(() => {
            setIsInitializing(false);
            setState('SCANNING');
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col relative overflow-hidden bg-[#020202] font-sans">
            {/* Background Grid - Matrix Style */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#050505_1px,transparent_1px),linear-gradient(to_bottom,#050505_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
            
            {/* Header */}
            <div className="relative z-20 flex justify-between items-center border-b border-white/5 pb-4 mb-4 p-6">
                <button onClick={onBack} className="flex gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ChevronLeft size={16} /> ABORTAR MISSÃO
                </button>
                <div className="flex items-center gap-3">
                    <Activity size={16} className={state === 'SCANNING' ? 'text-white/40 animate-pulse' : 'text-gray-600'} />
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        NEUROMESH: {state === 'LOCKED' ? 'STANDBY' : 'ACTIVE'}
                    </span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-3xl mx-auto w-full">
                
                {/* STATE: LOCKED */}
                {state === 'LOCKED' && (
                    <div className="text-center space-y-10 animate-fade-in relative">
                        <div className="relative inline-block group cursor-pointer" onClick={handleStartScan}>
                            <div className="absolute inset-0 bg-zinc-800/20 rounded-none blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="w-32 h-32 mx-auto bg-black border border-zinc-700/50 rounded-none flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(113,113,122,0.3)] group-hover:scale-105 transition-transform duration-300">
                                <Fingerprint size={64} className="text-white/40 animate-pulse" strokeWidth={1} />
                            </div>
                            {/* Ring Animation */}
                            <div className="absolute top-0 left-0 w-full h-full border border-zinc-700/30 rounded-none animate-[ping_3s_linear_infinite]"></div>
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-heading font-light text-white mb-4 tracking-[0.2em] leading-tight">
                                PROTOCOLO <br/><span className="font-bold text-white/40">GENESIS</span>
                            </h1>
                            <div className="w-24 h-1 bg-zinc-800 mx-auto mb-6"></div>
                            <p className="text-white/40 font-mono text-sm max-w-lg mx-auto leading-relaxed">
                                Você não 'entra' no Ecossistema Winf™. Você é **selecionado**. 
                                Provar sua dignidade começa aqui. Ative o Protocolo Genesis e submeta-se à varredura biométrica. 
                                Seus padrões definirão sua aptidão para a supremacia da nossa rede neural.
                            </p>
                        </div>

                        <button 
                            onClick={handleStartScan}
                            disabled={isInitializing}
                            className={`bg-white text-black px-6 md:px-10 py-4 rounded-none font-bold tracking-[0.25em] text-xs uppercase hover:bg-zinc-800 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group flex items-center justify-center gap-3 min-w-[240px] ${isInitializing ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isInitializing ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    <span>Inicializando...</span>
                                </>
                            ) : (
                                <>
                                    <span className="group-hover:hidden">Iniciar Validação</span>
                                    <span className="hidden group-hover:inline-block">Unlock Potential</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* STATE: SCANNING & ANALYZING (Handled by Component) */}
                {state === 'SCANNING' && (
                    <div className="animate-fade-in flex flex-col items-center gap-8 w-full">
                        <BiometricScanner onScanComplete={() => {
                            setState('REVEALED');
                        }} />
                    </div>
                )}

                {/* STATE: REVEALED */}
                {state === 'REVEALED' && aiProfile && (
                    <div className="w-full max-w-4xl bg-[#050505] border border-white/10 rounded-none p-1 relative overflow-hidden animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-2xl opacity-0">
                        {/* Decorative Top Bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-winf-aerocore_blue via-zinc-900 to-winf-aerocore_blue"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left: The Verdict */}
                            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                <div className="mb-6">
                                    <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                        <ScanFace size={14} className="text-green-500" /> Identidade Confirmada
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
                                        VOCÊ É UM <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-winf-aerocore_blue to-zinc-950">
                                            {aiProfile.archetype}
                                        </span>
                                    </h2>
                                    <div className="text-sm text-white/40 font-light leading-relaxed italic border-l-2 border-zinc-700 pl-4">
                                        <TextoCriptografado text={`"${aiProfile.analysis}"`} />
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-zinc-800/5 border border-zinc-700/20 rounded-none mt-auto">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs md:text-[10px] text-white/40 font-bold uppercase">Nível de Acesso</span>
                                        <Lock size={12} className="text-white/40" />
                                    </div>
                                    <p className="text-white font-mono text-sm">{aiProfile.access_level}</p>
                                </div>
                            </div>

                            {/* Right: The Application */}
                            <div className="p-8 md:p-10 bg-[#080808]">
                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-white/40" /> Reivindicação de Território
                                </h3>
                                
                                <form onSubmit={handleFormSubmit} className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-xs md:text-[10px] text-white/40 uppercase font-bold">Nome do Operador</label>
                                        <input 
                                            required 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-black border border-white/10 rounded-none p-3 text-white text-sm focus:border-zinc-700 outline-none transition-colors"
                                            placeholder="Nome Completo"
                                        />
                                    </div>

                                    <div className="space-y-1 relative">
                                        <label className="text-xs md:text-[10px] text-white/40 uppercase font-bold">Cidade Alvo (Scanner de Grid)</label>
                                        <div className="relative">
                                            <input 
                                                required 
                                                value={formData.city}
                                                onChange={e => setFormData({...formData, city: e.target.value})}
                                                onBlur={handleCityBlur}
                                                className={`w-full bg-black border rounded-none p-3 text-white text-sm outline-none transition-colors ${
                                                    cityStatus === 'LOCKED' ? 'border-red-500/50 text-red-100' :
                                                    cityStatus === 'AVAILABLE' ? 'border-green-500/50 text-green-100' :
                                                    'border-white/10 focus:border-zinc-700'
                                                }`}
                                                placeholder="Ex: São Paulo"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {isCheckingCity ? <Loader size={14} className="animate-spin text-white/40" /> : 
                                                cityStatus === 'LOCKED' ? <Lock size={14} className="text-red-500" /> :
                                                cityStatus === 'AVAILABLE' ? <CheckCircle size={14} className="text-green-500" /> :
                                                <Search size={14} className="text-gray-600" />}
                                            </div>
                                        </div>
                                        {cityStatus === 'LOCKED' && <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-red-500 mt-1 uppercase font-bold tracking-wider">⚠ Território Ocupado. Entrando em Lista de Espera.</p>}
                                        {cityStatus === 'AVAILABLE' && <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-green-500 mt-1 uppercase font-bold tracking-wider">✔ Território Disponível. Prioridade Máxima.</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs md:text-[10px] text-white/40 uppercase font-bold">Link de Comunicação</label>
                                        <input 
                                            required 
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                            className="w-full bg-black border border-white/10 rounded-none p-3 text-white text-sm focus:border-zinc-700 outline-none transition-colors"
                                            placeholder="WhatsApp / Celular"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs md:text-[10px] text-white/40 uppercase font-bold">Modelo de Inserção</label>
                                        <select 
                                            required
                                            value={formData.businessModel}
                                            onChange={e => setFormData({...formData, businessModel: e.target.value})}
                                            className="w-full bg-black border border-white/10 rounded-none p-3 text-white text-sm focus:border-zinc-700 outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" className="text-white/40">Selecione o Nível de Interesse...</option>
                                            <option value="nivel1">Nível 1 - Asset Light (Consultoria)</option>
                                            <option value="nivel2">Nível 2 - High Velocity (Quiosques/Operação)</option>
                                            <option value="nivel3">Nível 3 - Total Authority (Estúdios Flagship)</option>
                                        </select>
                                    </div>

                                    <button 
                                        type="submit"
                                        className={`w-full py-4 mt-2 font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-all flex items-center justify-center gap-2 ${
                                            cityStatus === 'LOCKED' 
                                            ? 'bg-red-900/20 text-red-400 border border-red-500/50 hover:bg-red-900/40' 
                                            : 'bg-zinc-800 text-white hover:bg-zinc-800 shadow-[0_0_20px_rgba(113,113,122,0.2)]'
                                        }`}
                                    >
                                        {cityStatus === 'LOCKED' ? 'Entrar na Fila de Espera' : 'Ativar Protocolo'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* STATE: SUBMITTED */}
                {state === 'SUBMITTED' && (
                    <div className="text-center space-y-8 animate-fade-in relative z-10">
                         <div className="w-24 h-24 mx-auto bg-black border-2 border-green-500 rounded-none flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                            <UserCheck size={48} className="text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-4xl text-white font-heading font-light tracking-tight mb-4">DADOS <span className="font-bold text-green-500">ASSEGURADOS</span></h2>
                            <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
                                Seu perfil foi criptografado e enviado diretamente para o <strong>Winf™ Driver</strong>. Nossa equipe de elite analisará sua compatibilidade territorial e entrará em contato via canal seguro em até 24 horas.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-none text-center">
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase">Ticket ID</p>
                                <p className="text-white font-mono text-sm font-bold">WNF-{Math.floor(Math.random() * 99999)}</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-none text-center">
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase">Prioridade</p>
                                <p className="text-green-400 font-mono text-sm font-bold">ALTA</p>
                            </div>
                        </div>

                        <button onClick={onBack} className="inline-block mt-8 text-xs text-white/40 hover:text-white underline transition-colors">
                            Retornar à Base
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModuleBiometricInvite;
