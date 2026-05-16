
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  ChevronLeft, 
  Headphones, 
  RotateCw, 
  Camera, 
  Zap, 
  AlertTriangle, 
  Loader, 
  Car, 
  CheckCircle, 
  Layers, 
  MousePointer2,
  FileSpreadsheet,
  Palette
} from 'lucide-react';
import { GamificationAction, ViewState } from '../types';
import { useWinf } from '../contexts/WinfContext';

// Catálogo de Materiais Winf para o Configurador
const WINF_MATERIALS = [
  { id: 'aerocore-blue', name: 'AeroCore™ Cyber Blue', hex: 0x0057FF, metalness: 0.9, roughness: 0.1, desc: 'Película nano-cerâmica de alta performance.' },
  { id: 'neoskin-matte', name: 'NeoSkin™ Satin Black', hex: 0x1A1A1A, metalness: 0.2, roughness: 0.8, desc: 'Proteção PPF com acabamento acetinado premium.' },
  { id: 'platinum-select', name: 'Select™ Platinum Mirror', hex: 0xE5E4E2, metalness: 1.0, roughness: 0.05, desc: 'Arquitetura: Máxima rejeição de calor e privacidade.' },
  { id: 'carbon-stealth', name: 'Carbon Stealth™', hex: 0x0A0A0A, metalness: 0.4, roughness: 0.3, desc: 'Estética agressiva com proteção UV absoluta.' }
];

const MODELS: ModelItem[] = [
  { id: 'car1', name: 'Concept Aero X50', type: 'automotive', path: '/models/aerocar.glb', thumbnail: 'https://images.unsplash.com/photo-1552519503-f92d2429f9df?q=80&w=2070&auto=format&fit=crop', description: 'Otimizado para testes de AeroCore.', polyCount: '250k' },
  { id: 'arch1', name: 'Winf Tower Concept', type: 'architectural', path: '/models/architecture.glb', thumbnail: 'https://images.unsplash.com/photo-1502672260273-b3db776b971a?q=80&w=2070&auto=format&fit=crop', description: 'Simulação de Winf Select em fachadas.', polyCount: '180k' }
];

interface ModelItem { id: string; name: string; type: string; path: string; thumbnail: string; description: string; polyCount: string; }

const ModuleEscape3D: React.FC<{onBack: () => void, onGamificationAction: any}> = ({ onBack, onGamificationAction }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);
  const [currentModel, setCurrentModel] = useState<THREE.Object3D | null>(null);
  const [selectedModelItem, setSelectedModelItem] = useState<ModelItem>(MODELS[0]);
  const [activeMaterial, setActiveMaterial] = useState(WINF_MATERIALS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicialização da Cena 3D
  const initScene = useCallback(() => {
    if (!canvasRef.current || !mountRef.current) return;
    
    const s = new THREE.Scene();
    s.background = new THREE.Color(0x050505);
    
    const cam = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    cam.position.set(4, 2, 4);
 
    const rend = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    rend.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rend.shadowMap.enabled = true;
 
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    s.add(ambient);
 
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 10, 5);
    sun.castShadow = true;
    s.add(sun);
 
    const ctrl = new OrbitControls(cam, rend.domElement);
    ctrl.enableDamping = true;
    ctrl.maxPolarAngle = Math.PI / 2;

    setScene(s); setCamera(cam); setRenderer(rend); setControls(ctrl);

    const animate = () => {
      requestAnimationFrame(animate);
      ctrl.update();
      rend.render(s, cam);
    };
    animate();
  }, []);

  useEffect(() => { initScene(); }, [initScene]);

  // Função para aplicar material Winf às partes do modelo
  const applyWinfMaterial = useCallback((model: any, matConfig: typeof WINF_MATERIALS[0]) => {
    model.traverse((node: any) => {
        if (node.isMesh) {
            // Se o modelo tiver partes nomeadas como "Body", "Glass", etc, poderíamos ser seletivos
            // Para o protótipo, aplicamos um reskin global sofisticado
            if (node.material) {
                node.material.color.setHex(matConfig.hex);
                node.material.metalness = matConfig.metalness;
                node.material.roughness = matConfig.roughness;
                node.material.needsUpdate = true;
            }
        }
    });
  }, []);

  const loadModel = useCallback((item: ModelItem) => {
    if (!scene) return;
    setIsLoading(true);
    const loader = new GLTFLoader();
    
    loader.load(item.path, (gltf: any) => {
        if (currentModel) scene.remove(currentModel);
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        applyWinfMaterial(model, activeMaterial);
        scene.add(model);
        setCurrentModel(model);
        setIsLoading(false);
    }, undefined, (err: any) => {
        setError("Modelo 3D de demonstração carregado com materiais básicos.");
        setIsLoading(false);
    });
  }, [scene, currentModel, activeMaterial, applyWinfMaterial]);

  useEffect(() => { if (scene) loadModel(selectedModelItem); }, [scene, selectedModelItem]);

  // Atualizar material em tempo real
  const handleMaterialChange = (mat: typeof WINF_MATERIALS[0]) => {
    setActiveMaterial(mat);
    if (currentModel) applyWinfMaterial(currentModel, mat);
    onGamificationAction('COMMENT', { detail: `Visualizou ${mat.name}` });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in relative">
        {/* Header HUD */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-none transition-colors text-white/40 hover:text-white">
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-heading font-bold text-white tracking-widest flex items-center gap-2">
                        ESCAPE3D <span className="text-zinc-500">CONFIGURATOR</span>
                    </h1>
                    <p className="text-xs md:text-[10px] text-white/40 uppercase font-bold tracking-widest">Winf Virtual Showroom v2.5</p>
                </div>
            </div>
            
            <button 
                className="bg-zinc-800 text-white px-6 py-2 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(113,113,122,0.3)]"
                onClick={() => alert(`Configuração enviada para NeuroMesh: ${selectedModelItem.name} + ${activeMaterial.name}`)}
            >
                <FileSpreadsheet size={14} /> Criar Orçamento
            </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* 3D Viewport */}
            <div ref={mountRef} className="flex-1 bg-[#030303] border border-white/5 rounded-none relative overflow-hidden group shadow-inner">
                {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="w-16 h-16 border-4 border-zinc-700 border-t-transparent rounded-none animate-spin mb-4"></div>
                        <p className="text-xs font-mono text-white/40 animate-pulse uppercase tracking-[0.3em]">Syncing Neural Data...</p>
                    </div>
                )}
                
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/10 border border-white/20 px-4 py-2 rounded-none text-xs md:text-[10px] text-white font-bold uppercase flex items-center gap-2">
                        <AlertTriangle size={12} /> {error}
                    </div>
                )}

                <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

                {/* HUD Overlay Inferior */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-none pointer-events-auto max-w-sm shadow-2xl">
                        <p className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Status do Ativo</p>
                        <h4 className="text-white font-bold text-lg mb-2">{selectedModelItem.name}</h4>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <p className="text-[10px] md:text-[8px] text-white/40 uppercase">Resolução</p>
                                <p className="text-xs text-white font-mono">{selectedModelItem.polyCount}</p>
                            </div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="text-center">
                                <p className="text-[10px] md:text-[8px] text-white/40 uppercase">Material</p>
                                <p className="text-xs text-green-500 font-bold">W-AUTHENTIC</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pointer-events-auto">
                        <button onClick={() => controls?.target.set(0,0,0)} className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-none text-white/40 hover:text-white transition-all"><RotateCw size={18} /></button>
                        <button className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-none text-white/40 hover:text-white transition-all"><Camera size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Sidebar de Customização */}
            <div className="lg:w-80 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar pb-10">
                
                {/* Seleção de Modelo */}
                <div className="bg-winf-card border border-white/5 p-6 rounded-none">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Car size={14} className="text-white/40" /> Seleção de Ativo
                    </h3>
                    <div className="space-y-2">
                        {MODELS.map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setSelectedModelItem(m)}
                                className={`w-full flex items-center gap-3 p-3 rounded-none border transition-all ${selectedModelItem.id === m.id ? 'bg-zinc-800/10 border-zinc-700/50' : 'bg-white/5 border-transparent hover:border-white/10'}`}
                            >
                                <div className="w-10 h-10 rounded-none overflow-hidden shrink-0">
                                    <img src={m.thumbnail} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-xs md:text-[10px] font-bold uppercase tracking-wider ${selectedModelItem.id === m.id ? 'text-white' : 'text-white/40'}`}>{m.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seletor de Película / Material */}
                <div className="bg-winf-card border border-white/5 p-6 rounded-none flex-1">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Palette size={14} className="text-white/40" /> Winf Skin Library
                    </h3>
                    
                    <div className="space-y-4">
                        {WINF_MATERIALS.map(mat => (
                            <button 
                                key={mat.id}
                                onClick={() => handleMaterialChange(mat)}
                                className={`w-full text-left group transition-all ${activeMaterial.id === mat.id ? 'opacity-100 scale-100' : 'opacity-60 scale-95 hover:opacity-100'}`}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div 
                                        className="w-12 h-12 rounded-none shadow-lg border-2 border-white/10 group-hover:border-white/30 transition-all relative overflow-hidden"
                                        style={{ backgroundColor: `#${mat.hex.toString(16).padStart(6, '0')}` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                                        {activeMaterial.id === mat.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/20">
                                                {/* Fixed: changed CheckCircle2 to CheckCircle */}
                                                <CheckCircle size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold text-xs truncate">{mat.name}</h4>
                                        <p className="text-[10px] md:text-[8px] text-white/40 uppercase font-mono tracking-widest">HEX #{mat.hex.toString(16).toUpperCase()}</p>
                                    </div>
                                </div>
                                {activeMaterial.id === mat.id && (
                                    <div className="p-3 bg-white/5 rounded-none border border-white/5 animate-fade-in mb-4">
                                        <p className="text-xs md:text-[10px] text-white/40 leading-relaxed italic">{mat.desc}</p>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Card de Performance */}
                <div className="p-5 bg-gradient-to-br from-zinc-800/20 to-black border border-winf-darkpurple/30 rounded-none">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap size={18} className="text-zinc-500" />
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest">Simulação de Performance</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-bold tracking-widest">
                            <span className="text-white/40">Rejeição IR</span>
                            <span className="text-zinc-500">99.9%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-900 rounded-none overflow-hidden">
                            <div className="h-full bg-zinc-900" style={{width: '99%'}}></div>
                        </div>
                        <div className="flex justify-between text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase font-bold tracking-widest pt-2">
                            <span className="text-white/40">Fator de Proteção</span>
                            <span className="text-white/40">MIL-SPEC</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default ModuleEscape3D;
