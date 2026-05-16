

import { MANUAL_DATA } from '../data/manual';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { 
  User, 
  NotificationState, 
  GamificationAction, 
  WarrantyRegistration, 
  Lead as LeadType, 
  Product, 
  Order, 
  Installation,
  Vehicle, 
  AiGeneration, 
  CoinLedgerEntry, 
  SocialPost, 
  UserModuleProgress, 
  PlatformEvent,
  WinfContextType,
  UserPerformanceMetrics,
  ContentCalendarEvent,
  DocumentItem,
  Transaction,
  Quote,
  StockItem,
  TrainingModule,
  AgentState,
  AgentCommand,
  WhatsAppConfig,
  WhatsAppChat,
  Retalho,
  InstallationJob,
  PartnerTask,
  ParadoxAnalysis,
  AgentInsight
} from '../types';
import { db, auth } from '../lib/firebase';
import { winfApi } from '../services/winfApi';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, limit, orderBy, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const WinfContext = createContext<WinfContextType | undefined>(undefined);

export const useWinf = () => {
  const context = useContext(WinfContext);
  if (!context) throw new Error('useWinf must be used within a WinfProvider');
  return context;
};

// Fixed missing arch_clearance to satisfy the User interface
const PROTO_USER_TIAGO: User = {
  id: 'proto-tiago-001',
  name: 'Tiago Augusto Correa',
  email: 'tiago.correa@winf.com',
  role: 'Admin',
  avatar: 'https://via.placeholder.com/150/0057FF/FFFFFF?text=TC', 
  company: 'Winf Corporate',
  phone: '(13) 99999-9999',
  cnpj: '00.000.000/0001-00',
  address: {
    city: 'Santos',
    state: 'SP',
    street: 'Av. Ana Costa, 400',
    zip: '11060-002'
  },
  w_rank_xp: 4500,
  w_rank_level: 'Master',
  winfCoins: 12500,
  arch_clearance: {
    invisible: true,
    blackpro: true,
    dualreflect: true
  },
  plan: 'nivel3',
  winf_knowledge: 2500,
  cortex_influence: 980,
  neural_memory: 1200,
  tactical_assets: 450
};

const PROTO_USER_ARCHITECT: User = {
  id: 'proto-arch-001',
  name: 'Arq. Roberto Simões',
  email: 'roberto.architect@winf.com',
  role: 'Architect',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80', 
  company: 'RS Fine Architecture',
  phone: '(11) 98888-7777',
  cnpj: '11.111.111/0001-11',
  address: {
    city: 'São Paulo',
    state: 'SP',
    street: 'Av. Paulista, 1000',
    zip: '01310-100'
  },
  w_rank_xp: 1200,
  w_rank_level: 'Elite',
  winfCoins: 3500,
  arch_clearance: {
    invisible: true,
    blackpro: true,
    dualreflect: true
  },
  plan: 'nivel1',
  winf_knowledge: 1500,
  cortex_influence: 400,
  neural_memory: 600,
  tactical_assets: 200
};

const PROTO_USER_LICENCIADO: User = {
  id: 'proto-lic-001',
  name: 'João Licenciado',
  email: 'joao.licenciado@winf.com',
  role: 'Licenciado',
  avatar: 'https://via.placeholder.com/150/111111/FFFFFF?text=JL', 
  company: 'Winf Cuidade Master',
  phone: '(13) 98888-7777',
  cnpj: '22.222.222/0001-22',
  address: {
    city: 'Santos',
    state: 'SP',
    street: 'Av. Conselheiro Nébias, 500',
    zip: '11045-000'
  },
  w_rank_xp: 500,
  w_rank_level: 'Initiate',
  winfCoins: 1000,
  arch_clearance: {
    invisible: true,
    blackpro: true,
    dualreflect: false
  },
  plan: 'nivel1',
  winf_knowledge: 500,
  cortex_influence: 100,
  neural_memory: 200,
  tactical_assets: 50
};

export const WinfProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState>({ show: false, message: '', points: 0 });
  
  const [leads, setLeads] = useState<LeadType[]>([]);
  const [publicLeads, setPublicLeads] = useState<LeadType[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [aiGenerations, setAiGenerations] = useState<AiGeneration[]>([]);
  const [coinLedger, setCoinLedger] = useState<CoinLedgerEntry[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userModuleProgress, setUserModuleProgress] = useState<UserModuleProgress[]>([]);
  const [platformEvents, setPlatformEvents] = useState<PlatformEvent[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [userPerformanceMetrics, setUserPerformanceMetrics] = useState<UserPerformanceMetrics[]>([]);
  const [contentCalendarEvents, setContentCalendarEvents] = useState<ContentCalendarEvent[]>([]);
  const [documentItems, setDocumentItems] = useState<DocumentItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [stockHistory, setStockHistory] = useState<any[]>([]);
  const [retalhos, setRetalhos] = useState<Retalho[]>([]);
  const [trainingModules, setTrainingModules] = useState<any[]>([]);
  const [partnerTasks, setPartnerTasks] = useState<PartnerTask[]>([]);
  const [agentInsights, setAgentInsights] = useState<AgentInsight[]>([]);
  const [effectiveRole, setEffectiveRole] = useState<User['role'] | null>(null);
  const [favoriteModules, setFavoriteModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('winf_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentActivities, setRecentActivities] = useState<{ id: string; type: string; description: string; created_at: string; }[]>([]);

  // Agent State (Neural Bridge)
  const [agentState, setAgentState] = useState<AgentState>({
    status: 'online',
    activeAgents: 3,
    memoryPoints: 1240,
    lastSync: new Date().toISOString(),
    logs: [
      '[SYSTEM] Neural Bridge v2.5 initialized.',
      '[VPS] Connected to Hostinger-Node-01 (Kimi K2.5)',
      '[DOCKER] Container "second-brain-core" is running.',
      '[AGENT] Sub-agent "Researcher-01" started web crawl.',
      '[SYNC] Memory core updated with 124 new context points.'
    ]
  });

  const [paradoxAnalysis, setParadoxAnalysis] = useState<ParadoxAnalysis | null>(null);

  const dispatchAgentCommand = useCallback(async (command: AgentCommand): Promise<{ success: boolean; output: string }> => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] [${command.type}] Executing: ${command.action}...`;
    
    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, logEntry]
    }));

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));

    let output = `[${timestamp}] [SUCCESS] ${command.action} completed.`;
    
    if (command.type === 'TERMINAL' && command.action.includes('status')) {
      output = `[${timestamp}] [VPS] CPU: 14% | RAM: 1.6GB/4GB | Disk: 45%`;
    }

    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, output],
      memoryPoints: prev.memoryPoints + 5 // Agent learns from every command
    }));

    return { success: true, output };
  }, []);

  // WhatsApp Hub & Lead Distribution State
  const [whatsappConfigs, setWhatsappConfigs] = useState<WhatsAppConfig[]>([
    { id: 'wa-central', city: 'Central (Brasil)', phoneNumber: '+55 13 99999-0000', isCentral: true, status: 'online', agentName: 'Winf Core AI' },
    { id: 'wa-santos', city: 'Santos', phoneNumber: '+55 13 98888-1111', isCentral: false, status: 'online', agentName: 'Santos Agent v1' },
    { id: 'wa-sp', city: 'São Paulo', phoneNumber: '+55 11 97777-2222', isCentral: false, status: 'online', agentName: 'SP Agent v2' },
    { id: 'wa-curitiba', city: 'Curitiba', phoneNumber: '+55 41 96666-3333', isCentral: false, status: 'online', agentName: 'Curitiba Agent v1' },
  ]);

  const [activeChats, setActiveChats] = useState<WhatsAppChat[]>([
    { id: 'chat1', customerName: 'Carlos Silva', lastMessage: 'Quero saber sobre PPF em Santos', timestamp: new Date().toISOString(), city: 'Santos', status: 'bot_handling' },
    { id: 'chat2', customerName: 'Mariana Oliveira', lastMessage: 'Olá, sou de SP e vi o anúncio', timestamp: new Date().toISOString(), city: 'São Paulo', status: 'bot_handling' },
  ]);

  const distributeLead = useCallback(async (leadData: any): Promise<{ success: boolean; routedTo: string }> => {
    const timestamp = new Date().toLocaleTimeString();
    const city = leadData.city || 'Desconhecido';
    
    // Add to logs in Neural Bridge too
    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, `[WHATSAPP] Novo lead detectado na Central: ${leadData.name} (${city})`]
    }));

    // Find regional config
    const regionalConfig = whatsappConfigs.find(c => c.city.toLowerCase() === city.toLowerCase() && !c.isCentral);
    const routedTo = regionalConfig ? regionalConfig.city : 'Fila de Espera Central';

    // Simulate routing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newChat: WhatsAppChat = {
      id: `chat-${Date.now()}`,
      customerName: leadData.name,
      lastMessage: `Encaminhado para ${routedTo}`,
      timestamp: new Date().toISOString(),
      city: city,
      status: regionalConfig ? 'routed' : 'waiting'
    };

    setActiveChats(prev => [newChat, ...prev]);

    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, `[WHATSAPP] Lead ${leadData.name} distribuído para: ${routedTo}`]
    }));

    return { success: true, routedTo };
  }, [whatsappConfigs]);

  const fetchUserProfile = useCallback(async (id: string): Promise<User | null> => {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      const profileData = docSnap.data();
      return {
        id: docSnap.id,
        name: profileData.name || profileData.email,
        email: profileData.email,
        role: profileData.role || 'Member',
        avatar: profileData.avatar || '',
        winfCoins: profileData.winfCoins || 0,
        company: profileData.company || '',
        phone: profileData.phone || '',
        cnpj: profileData.cnpj || '',
        address: profileData.address || undefined,
        w_rank_xp: profileData.w_rank_xp || 0,
        w_rank_level: profileData.w_rank_level || 'Initiate',
        arch_clearance: profileData.arch_clearance || {
          invisible: false,
          blackpro: false,
          dualreflect: false
        },
        winf_knowledge: profileData.winf_knowledge || 0,
        cortex_influence: profileData.cortex_influence || 0,
        neural_memory: profileData.neural_memory || 0,
        tactical_assets: profileData.tactical_assets || 0,
        plan: profileData.plan || 'nivel1'
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const loginAsPrototype = async (role: 'Admin' | 'Architect' | 'Member' | 'Licenciado' = 'Admin') => {
    if (role === 'Architect') {
      setUser(PROTO_USER_ARCHITECT);
    } else if (role === 'Licenciado') {
      setUser(PROTO_USER_LICENCIADO);
    } else {
      setUser(PROTO_USER_TIAGO);
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    if (!user?.id?.startsWith('proto-')) {
      await signOut(auth);
    }
    setUser(null); 
    setIsAuthenticated(false);
  };

  const fetchCoinLedger = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { 
      setCoinLedger([
        { id: 'cl1', user_id: user.id, amount: 50, description: 'Bônus de Login', action_type: 'EARN', created_at: new Date().toISOString() },
        { id: 'cl2', user_id: user.id, amount: -20, description: 'Resgate de Voucher', action_type: 'SPEND', created_at: new Date(Date.now() - 3600000).toISOString() },
      ]);
      return; 
    } 
    try {
      const q = query(collection(db, 'coin_ledger'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setCoinLedger(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'coin_ledger');
    }
  }, [user?.id]);

  const updateUserCoins = async (amount: number, reason: string, xp: number = 0) => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { 
      setUser(prev => prev ? { ...prev, winfCoins: prev.winfCoins + amount, w_rank_xp: prev.w_rank_xp + xp } : null);
      setNotification({ show: true, message: amount > 0 ? `Ganhou moedas: ${reason}` : `Gastou moedas: ${reason}`, points: amount });
      setRecentActivities(prev => [{ id: `act-${Date.now()}`, type: 'XP_EARNED', description: reason, created_at: new Date().toISOString() }, ...prev]);
      return;
    }
    try {
      const docRef = doc(db, 'users', user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentCoins = docSnap.data().winfCoins || 0;
        const currentXp = docSnap.data().w_rank_xp || 0;
        await updateDoc(docRef, {
          winfCoins: currentCoins + amount,
          w_rank_xp: currentXp + xp
        });
        
        await addDoc(collection(db, 'coin_ledger'), {
          user_id: user.id,
          amount: amount,
          description: reason,
          action_type: amount > 0 ? 'EARN' : 'SPEND',
          created_at: new Date().toISOString()
        });

        const updatedProfile = await fetchUserProfile(user.id);
        if (updatedProfile) setUser(updatedProfile);
        await fetchCoinLedger();
        setNotification({ show: true, message: amount > 0 ? `Ganhou moedas: ${reason}` : `Gastou moedas: ${reason}`, points: amount });
        setRecentActivities(prev => [{ id: `act-${Date.now()}`, type: 'XP_EARNED', description: reason, created_at: new Date().toISOString() }, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const redeemMarketingActivation = useCallback(async (serviceName: string, cost: number) => {
    if (!user || user.winfCoins < cost) return { success: false, error: 'WinfCoins insuficientes' };

    try {
      await updateUserCoins(-cost, `Ativação de Marketing: ${serviceName}`);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user, updateUserCoins]);

  const gamify = useCallback((action: GamificationAction, details?: any) => {
    let points = 0; let xp = 0; let message = '';
    switch (action) {
      case 'COMMENT': points = 15; xp = 5; message = 'Você ganhou <strong>WinfCoins</strong> por interagir!'; break;
      case 'POST': points = 20; xp = 10; message = 'Publicação realizada! <strong>+20 WinfCoins</strong>.'; break;
      case 'SHARE': points = 25; xp = 10; message = 'Obrigado por compartilhar!'; break;
      case 'LOGIN': points = 10; xp = 5; message = 'Bônus de acesso diário.'; break;
      case 'AI_GENERATED': points = 30; xp = 15; message = 'Conteúdo IA gerado! <strong>+30 WinfCoins</strong>.'; break; // Added XP for AI_GENERATED
      case 'LEAD_ADDED': points = 40; xp = 20; message = 'Novo lead capturado!'; break;
      case 'WARRANTY_REGISTERED': points = 50; xp = 25; message = 'Garantia registrada. Bom trabalho!'; break;
      case 'COURSE_COMPLETED': points = 60; xp = 30; message = 'Módulo da Academy concluído!'; break;
      case 'ACADEMY_COMPLETED': points = 100; xp = 50; message = 'Curso concluído na Academy! <strong>+100 WinfCoins</strong>.'; break;
      case 'SCHEDULE_POST': points = 25; xp = 10; message = 'Postagem agendada!'; break;
      case 'SALE_CLOSED': points = 50; xp = 25; message = 'Pedido finalizado! <strong>Dica: Guarde retalhos!</strong> Registre-os no estoque para otimizar futuras instalações.'; break;
      case 'REDEEM': points = -details?.cost || 0; xp = 0; message = `Resgate de ${details?.item || 'item'} concluído.`; break;
    }
    if (points !== 0 || xp !== 0) updateUserCoins(points, message, xp);
    else if (message) setNotification({ show: true, message, points: 0 });
  }, [user?.id]);

  const closeNotification = useCallback(() => setNotification(prev => ({ ...prev, show: false })), []);

  // Installation Jobs State
  const [installationJobs, setInstallationJobs] = useState<InstallationJob[]>([
    {
      id: 'job-1',
      service_order_id: 'OS-2025-001',
      customer_name: 'Marcos Paulo',
      vehicle_model: 'Porsche 911 Carrera',
      collaborator_id: '1',
      status: 'in_progress',
      measurements: { windshield: '1.2m x 0.8m', sides: '0.9m x 0.5m' },
      media: { photos: [], videos: [] },
      created_at: new Date().toISOString()
    }
  ]);

  const addInstallationJob = useCallback(async (job: any) => {
    const newJob: InstallationJob = {
      id: `job-${Date.now()}`,
      ...job,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setInstallationJobs(prev => [newJob, ...prev]);
    return { success: true, error: null };
  }, []);

  const updateInstallationJob = useCallback(async (id: string, updates: any) => {
    setInstallationJobs(prev => prev.map(job => job.id === id ? { ...job, ...updates } : job));
    return { success: true, error: null };
  }, []);

  const completeJobAndGenerateWarranty = useCallback(async (jobId: string, additionalData?: { vehiclePlate: string, rollSerialNumber?: string, areaUsedM2?: number }) => {
    const job = installationJobs.find(j => j.id === jobId);
    if (!job) return { success: false, error: 'Job not found' };

    try {
        if (user?.id?.startsWith('proto-')) {
          setInstallationJobs(prev => prev.map(j => j.id === jobId ? { 
            ...j, 
            status: 'completed', 
            completed_at: new Date().toISOString(),
            warranty_id: 'mock-warr-123',
            vehicle_plate: additionalData?.vehiclePlate
          } : j));
  
          setWarranties(prev => [{
            id: 'mock-warr-123',
            customerName: job.customer_name,
            productLine: job.chosen_film || 'Winf AeroCore',
            serialNumber: job.service_order_id,
            purchaseDate: new Date().toISOString(),
            status: 'Ativa',
            agent_status: 'pending',
            licenciado_id: user?.id,
            vehiclePlate: additionalData?.vehiclePlate
          } as any, ...prev]);
  
          setUser(prev => prev ? { ...prev, winfCoins: (prev.winfCoins || 0) + 150 } : null);
          return { success: true, warrantyId: 'mock-warr-123', error: null };
        }

        // WINF.OS™ Zero-Trust Cloud Function Interaction
        const result = await winfApi.completeInstallation({
            osId: jobId,
            rollSerialNumber: additionalData?.rollSerialNumber || 'MOCK-ROLL-001',
            areaUsedM2: additionalData?.areaUsedM2 || 2.5,
            photos: ['mock-photo.jpg'],
            customerId: job.customer_name || 'Anonymous'
        });

        // Update Job Optimistically
        setInstallationJobs(prev => prev.map(j => j.id === jobId ? { 
          ...j, 
          status: 'completed', 
          completed_at: new Date().toISOString(),
          warranty_id: result.warranty_id,
          vehicle_plate: additionalData?.vehiclePlate
        } : j));

        setWarranties(prev => [{
          id: result.warranty_id,
          customerName: job.customer_name,
          productLine: job.chosen_film || 'Winf AeroCore',
          serialNumber: job.service_order_id,
          purchaseDate: new Date().toISOString(),
          status: 'Ativa',
          agent_status: 'pending',
          licenciado_id: user?.id,
          vehiclePlate: additionalData?.vehiclePlate
        } as any, ...prev]);

        // Note: gamify and other internal things shouldn't directly modify secure db without admin,
        // The cloud function already added the WINFCoins via 'coin_ledger'.
        // gamify('WARRANTY_REGISTERED');
        // Let's just update local stat for Prototype:
        setUser(prev => prev ? { ...prev, winfCoins: (prev.winfCoins || 0) + result.coins_earned } : null);

        return { success: true, warrantyId: result.warranty_id, error: null };

    } catch (e: any) {
        console.error("WINF.OS™ Security Hub Rejeitou a Operação:", e.message);
        return { success: false, error: e.message };
    }
  }, [installationJobs, user?.id]);

  const fetchLeads = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { 
      setLeads([
        { 
          id: 'lead1', user_id: user?.id || 'proto', name: 'Ricardo Santos (Porsche 911)', contact: '11999991234', source: 'Instagram Ads', interest: 'NeoSkin PPF Gloss', status: 'Zona de Ataque', ai_score: 95, 
          dominance_score: 92, decay_level: 80, last_paradox_truth: 'Cliente busca status, mas teme o custo invisível da manutenção.', last_paradox_maneuver: 'Focar na Valorização de Ativo e Revenda Garantida.' 
        },
        { 
          id: 'lead2', user_id: user?.id || 'proto', name: 'Amanda Carvalho (Audi Q8)', contact: '13988887766', source: 'W.A.R.P Search', interest: 'AeroCore NanoCeramic', status: 'Zona de Pressão', ai_score: 70,
          dominance_score: 68, decay_level: 40, last_paradox_truth: 'Comparando Winf com película comum. Medo de ser "enganado" por marketing.', last_paradox_maneuver: 'Demonstração Técnica da Grade Molecular e Certificado MIL-SPEC.'
        },
        { 
          id: 'lead3', user_id: user?.id || 'proto', name: 'Condomínio Prime (Arquitetura)', contact: '11977775544', source: 'Select Pro Portal', interest: 'Winf Select IR-99', status: 'Zona de Ataque', ai_score: 88,
          dominance_score: 85, decay_level: 90, last_paradox_truth: 'Decisão coletiva. Síndico focado em redução de custo energético.', last_paradox_maneuver: 'Apresentar Laudo de ROI Energético e Garantia de 15 Anos.'
        },
      ]);
      return; 
    } 
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadType));
      setLeads(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'leads');
    }
  }, [user?.id]);

  const fetchPublicLeads = useCallback(async () => {
    if (user?.id?.startsWith('proto-')) {
      setPublicLeads([]);
      return;
    }
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', 'system-public-inbox'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadType));
      setPublicLeads(data);
    } catch (e) {
      console.error('Error fetching public leads:', e);
    }
  }, []);

  const addLead = useCallback(async (lead: any) => {
    const userId = user?.id || 'system-public-inbox';
    if (userId?.startsWith('proto-')) { 
      const newLead = { 
        ...lead, 
        id: `demo-lead-${Date.now()}`, user_id: userId, created_at: new Date().toISOString(),
        dominance_score: 50, decay_level: 20, agent_status: 'pending'
      };
      setLeads(prev => [newLead, ...prev]);
      gamify('LEAD_ADDED');
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'leads'), { ...lead, user_id: userId, created_at: new Date().toISOString(), agent_status: 'pending' });
      const newLead = { id: docRef.id, ...lead, user_id: userId, agent_status: 'pending' };
      if (user?.id === userId) { setLeads(prev => [newLead as any, ...prev]); gamify('LEAD_ADDED'); }
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify]);

  const updateLead = useCallback(async (id: string, updates: any) => {
    if (user?.id?.startsWith('proto-')) { setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l)); return { success: true, error: null }; }
    try {
      await updateDoc(doc(db, 'leads', id), updates);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const deleteLead = useCallback(async (id: string) => {
    if (user?.id?.startsWith('proto-')) { setLeads(prev => prev.filter(l => l.id !== id)); return { success: true, error: null }; }
    try {
      await deleteDoc(doc(db, 'leads', id));
      setLeads(prev => prev.filter(l => l.id !== id));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchWarranties = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { 
      setWarranties([
        { id: 'warr1', customerName: 'João Silva', customerEmail: 'joao@email.com', productLine: 'AeroCore™ Nano-Ceramic', serialNumber: 'SN-123456', purchaseDate: new Date().toISOString().split('T')[0], coverage: '5 years', status: 'Active' },
      ]);
      return; 
    } 
    try {
      const q = query(collection(db, 'warranties'), where('licenciado_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const warrantiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setWarranties(warrantiesData ? warrantiesData.map(w => ({ id: w.id, customerName: w.customer_name, customerEmail: w.customer_email, productLine: w.product_line, serialNumber: w.serial_number, purchaseDate: w.installation_date || '', coverage: w.coverage_period || '', status: w.status || '' })) : []);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'warranties');
    }
  }, [user?.id]);

  const fetchWarrantyBySerialNumber = useCallback(async (serialNumber: string) => {
    try {
      const q = query(collection(db, 'warranties'), where('serialNumber', '==', serialNumber), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as WarrantyRegistration;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `warranties/${serialNumber}`);
      return null;
    }
  }, []);

  const registerWarranty = useCallback(async (data: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    if (user?.id?.startsWith('proto-')) {
      const newWarranty = { ...data, id: `demo-warranty-${Date.now()}`, licenciado_id: user.id, status: 'Active', coverage: '5 years', serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`, created_at: new Date().toISOString() };
      setWarranties(prev => [newWarranty, ...prev]);
      gamify('WARRANTY_REGISTERED');
      return { success: true, error: null };
    }
    const sn = `SN-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      await addDoc(collection(db, 'warranties'), { licenciado_id: user.id, customer_name: data.customerName, customer_email: data.customerEmail, product_line: data.productLine, serial_number: sn, installation_date: data.purchaseDate, status: 'Active' });
      await fetchWarranties(); gamify('WARRANTY_REGISTERED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify, fetchWarranties]);

  const fetchProducts = useCallback(async () => {
    if (user?.id?.startsWith('proto-')) { 
      setProducts([
        { 
          id: 'prod-invisible', 
          name: 'Winf Invisible®', 
          line: 'WINF Select™', 
          description: 'Linha Arquitetura IR Advanced Ceramic. 100% UV, 86% IR. Tecnologia NanoCeramic de última geração.', 
          benefits: ['100% Rejeição UV', '86% Rejeição IR', 'Alta Transparência', 'Não interfere em sinais'],
          category: 'Arquitetura', 
          thickness: '2 mil',
          dimensions: '1.52m x 30m',
          warranty_years: 10,
          thermal_score: 9, 
          light_score: 8, 
          shield_score: 7, 
          privacy_score: 3, 
          price: 450.00, 
          image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705', 
          stock_quantity: 500, 
          is_active: true, 
          available_widths: [0.50, 0.75, 1.00, 1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '70%', irr: '86%', uvr: '100%', tser: '58%' }
        },
        { 
          id: 'prod-dual', 
          name: 'Winf Dual Reflect®', 
          line: 'WINF Select™', 
          description: 'Arquitetura Metalizada. Equilíbrio perfeito entre privacidade e rejeição térmica.', 
          benefits: ['Alta Privacidade Diurna', 'Rejeição Térmica Superior', 'Redução de Brilho'],
          category: 'Arquitetura', 
          thickness: '1.5 mil',
          dimensions: '1.52m x 30m',
          warranty_years: 7,
          thermal_score: 8, 
          light_score: 6, 
          shield_score: 6, 
          privacy_score: 8, 
          price: 380.00, 
          image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', 
          stock_quantity: 500, 
          is_active: true, 
          available_widths: [0.50, 0.75, 1.00, 1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '15%', irr: '81%', uvr: '99%', tser: '72%' }
        },
        { 
          id: 'prod-blackpro', 
          name: 'Winf BlackPro®', 
          line: 'WINF Select™', 
          description: 'Arquitetura Não Metalizada. Estética premium com alta durabilidade.', 
          benefits: ['Cor Estável', 'Sem Interferência', 'Fácil Aplicação'],
          category: 'Arquitetura', 
          thickness: '1.5 mil',
          dimensions: '1.52m x 30m',
          warranty_years: 7,
          thermal_score: 7, 
          light_score: 4, 
          shield_score: 6, 
          privacy_score: 9, 
          price: 290.00, 
          image_url: 'https://images.unsplash.com/photo-1502672260273-b3db776b971a', 
          stock_quantity: 500, 
          is_active: true, 
          available_widths: [0.50, 0.75, 1.00, 1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '05%', irr: '73%', uvr: '99%', tser: '65%' }
        },
        { 
          id: 'prod-shadow', 
          name: 'ShadowCarbon™', 
          line: 'WINF AeroCore™ MOBILE', 
          description: 'Tecnologia Carbon para veículos premium. Estética negra profunda.', 
          benefits: ['Estética Premium', 'Rejeição de Calor', 'Sem Metal'],
          category: 'Automotivo', 
          thickness: '1.5 mil',
          dimensions: '1.52m x 30m',
          warranty_years: 5,
          thermal_score: 6, 
          light_score: 5, 
          shield_score: 8, 
          privacy_score: 7, 
          price: 350.00, 
          image_url: 'https://images.unsplash.com/photo-1579586311681-35b866596b6d', 
          stock_quantity: 200, 
          is_active: true, 
          available_widths: [0.50, 0.75, 1.00, 1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '20%', irr: '65%', uvr: '99%', tser: '52%' }
        },
        { 
          id: 'prod-aerocore-99', 
          name: 'AeroCore™ IR-99', 
          line: 'WINF AeroCore™', 
          description: 'A elite da proteção térmica automotiva. Rejeição de infravermelho próxima da perfeição.', 
          benefits: ['99.8% Rejeição IR', 'Conforto Térmico Extremo', 'Nitidez Cristalina'],
          category: 'Automotivo', 
          thickness: '2 mil',
          dimensions: '1.52m x 30m',
          warranty_years: 15,
          thermal_score: 10, 
          light_score: 9, 
          shield_score: 9, 
          privacy_score: 4, 
          price: 890.00, 
          image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e', 
          stock_quantity: 150, 
          is_active: true, 
          available_widths: [0.50, 0.75, 1.00, 1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '70%', irr: '99.8%', uvr: '100%', tser: '62%' }
        },
        { 
          id: 'prod-neoskin', 
          name: 'NeoSkin ADV™', 
          line: 'WINF AeroCore™ | NeoSkin', 
          description: 'Paint Protection Film de alta resistência. Autocura térmica e brilho hidrofóbico. Sub-marca oficial AeroCore™.', 
          benefits: ['Proteção extrema contra Impactos', 'Self-Healing Rápido', 'Resistência Química'],
          category: 'PPF', 
          thickness: '8 mil',
          dimensions: '1.52m x 15m',
          warranty_years: 10,
          thermal_score: 3, 
          light_score: 10, 
          shield_score: 10, 
          privacy_score: 1, 
          price: 2500.00, 
          image_url: 'https://images.unsplash.com/photo-1507089947368-19c1da977535', 
          stock_quantity: 40, 
          is_active: true, 
          available_widths: [1.52],
          created_at: new Date().toISOString(),
          tech_specs: { vlt: '92%', irr: '25%', uvr: '100%', tser: '15%' }
        },
        { 
          id: 'prod-insumo-tools', 
          name: 'Kit Insumos & Ferramentas Master', 
          line: 'WINF BLACKSHOP™', 
          description: 'Reposição oficial de ferramentas, lâminas de titânio, espátulas de precisão e fluidos de aplicação Winf OS.', 
          benefits: ['Qualidade Homologada', 'Ferramentas de Titânio', 'Fluido de Aplicação Exclusivo'],
          category: 'Insumos', 
          price: 550.00, 
          image_url: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab', 
          stock_quantity: 150, 
          is_active: true, 
          created_at: new Date().toISOString(),
        },
        { 
          id: 'prod-marketing-pack', 
          name: 'Pacote de Marketing Digital (Mensal)', 
          line: 'WINF PARTNERS™', 
          description: 'Pack de artes, vídeos em 4k, roteiros para reels e banners digitais homologados pela Winf. Atualizado mensalmente.', 
          benefits: ['Material Premium 4K', 'Roteiros Validados', 'Posicionamento de Alto Valor'],
          category: 'Marketing', 
          price: 350.00, 
          image_url: 'https://images.unsplash.com/photo-1557838923-298493635a8f', 
          stock_quantity: 999, 
          is_active: true, 
          created_at: new Date().toISOString(),
        },
        { 
          id: 'prod-ads-traffic', 
          name: 'Assessoria de Tráfego & Impulsionamento', 
          line: 'WINF OS™', 
          description: 'Nossa equipe de performance cria, otimiza e gerencia suas campanhas de Ads locais para atração de leads High-Ticket.', 
          benefits: ['Gestão Profissional', 'Relatórios Mensais', 'Foco no Público Certo'],
          category: 'Marketing', 
          price: 900.00, 
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 
          stock_quantity: 50, 
          is_active: true, 
          created_at: new Date().toISOString(),
        },
        { 
          id: 'prod-uniforms', 
          name: 'Kit Vestuário & Uniformes', 
          line: 'WINF BLACKSHOP™', 
          description: 'Camisas polo, camisetas em algodão egípcio e jaquetas corta-vento com a marca exclusiva Winf e seu nome.', 
          benefits: ['Algodão Premium', 'Estilo Tático & Clean', 'Apresentação Profissional'],
          category: 'Vestuário', 
          price: 420.00, 
          image_url: 'https://images.unsplash.com/photo-1618354691438-25af04751493', 
          stock_quantity: 200, 
          is_active: true, 
          created_at: new Date().toISOString(),
        },
        { 
          id: 'prod-stationery', 
          name: 'Materiais de Papelaria Corporativa', 
          line: 'WINF BLACKSHOP™', 
          description: 'Cartões de visita em metal/acrílico, pastas premium de apresentação, pen-drives e brindes corporativos Winf.', 
          benefits: ['Alto Valor Percebido', 'Acabamentos Nobres', 'Impacto na Entrega'],
          category: 'Papelaria', 
          price: 680.00, 
          image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338', 
          stock_quantity: 300, 
          is_active: true, 
          created_at: new Date().toISOString(),
        }
      ]);
      return;
    }
    try {
      const q = query(collection(db, 'products'), where('is_active', '==', true));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  }, [user?.id]);

  const fetchOrders = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { setOrders([]); return; } 
    try {
      const q = query(collection(db, 'orders'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  }, [user?.id]);

  const fetchInstallations = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { setInstallations([]); return; }
    try {
      const q = query(collection(db, 'installations'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setInstallations(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'installations');
    }
  }, [user?.id]);

  const fetchInstallationById = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, 'installations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Installation;
      }
      return null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `installations/${id}`);
      return null;
    }
  }, []);

  const registerInstallation = useCallback(async (data: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    
    const installationId = `INST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const qrCodeUrl = `https://winf.app/certificate/${installationId}`;
    
    const installationData = {
      ...data,
      id: installationId,
      user_id: user.id,
      installer_id: user.id,
      installer_name: user.name,
      qr_code_url: qrCodeUrl,
      status: 'completed',
      agent_status: 'pending',
      created_at: new Date().toISOString()
    };

    if (user?.id?.startsWith('proto-')) {
      setInstallations(prev => [installationData, ...prev]);
      
      // Auto-generate warranty
      const warrantyId = `W-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const newWarranty: WarrantyRegistration = {
        id: warrantyId,
        customerName: data.client_name,
        customerEmail: data.client_email,
        productLine: data.product_name,
        serialNumber: installationId,
        purchaseDate: data.date,
        status: 'Active',
        licenciado_id: user.id,
        created_at: new Date().toISOString()
      };
      setWarranties(prev => [newWarranty, ...prev]);
      
      gamify('INSTALLATION_REGISTERED');
      return { success: true, error: null };
    }
    try {
      await setDoc(doc(db, 'installations', installationId), installationData);
      
      // Also register warranty in Firestore
      const warrantyId = `W-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      await addDoc(collection(db, 'warranties'), {
        licenciado_id: user.id,
        customer_name: data.client_name,
        customer_email: data.client_email,
        product_line: data.product_name,
        serial_number: installationId,
        installation_date: data.date,
        status: 'Active',
        created_at: new Date().toISOString()
      });

      setInstallations(prev => [installationData, ...prev]);
      await fetchWarranties();
      gamify('INSTALLATION_REGISTERED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify, fetchWarranties]);

  const createOrder = useCallback(async (items: any[], shippingAddress: any, paymentMethod: string) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    if (user?.id?.startsWith('proto-')) {
      const newOrder = { id: `demo-order-${Date.now()}`, user_id: user.id, total_amount: total, status: 'completed', created_at: new Date().toISOString() };
      setOrders(prev => [newOrder, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'orders'), { user_id: user.id, total_amount: total, status: 'completed', created_at: new Date().toISOString() });
      const orderItems = items.map(i => ({ order_id: docRef.id, product_id: i.product_id, quantity: i.quantity, unit_price: i.unit_price }));
      for (const item of orderItems) {
        await addDoc(collection(db, 'order_items'), item);
      }
      
      // Automatically add to stock for members
      for (const item of items) {
          const product = products.find(p => p.id === item.product_id);
          if (product) {
              await addStockItem({
                  product_id: product.id,
                  product_name: product.name,
                  total_meters: 30 * item.quantity, // Assuming 30m per roll
                  width: 1.52,
                  remaining_meters: 30 * item.quantity
              });
          }
      }
      
      await fetchOrders();
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, fetchOrders, products]);

  const addStockItem = useCallback(async (item: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      const newItem = { ...item, id: `stock-${Date.now()}`, user_id: user.id, created_at: new Date().toISOString() };
      setStockItems(prev => [newItem, ...prev]);
      setStockHistory(prev => [{ id: `hist-${Date.now()}`, user_id: user.id, product_id: item.product_id, product_name: item.product_name, type: 'IN', amount: item.total_meters, date: new Date().toISOString() }, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'stock_items'), { ...item, user_id: user.id });
      setStockItems(prev => [{ id: docRef.id, ...item, user_id: user.id }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);
  const fetchAiGenerations = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { 
      setAiGenerations([{ id: 'ai1', user_id: user.id, tool_used: 'Vision', prompt: 'Porsche 911 protected...', output_url: 'https://images.unsplash.com/photo-1618557219623-64a2747bb7eb', media_type: 'image/png', created_at: new Date().toISOString() }]);
      return; 
    }
    try {
      const q = query(collection(db, 'ai_generations'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setAiGenerations(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'ai_generations');
    }
  }, [user?.id]);

  const saveAiGeneration = useCallback(async (gen: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    if (user?.id?.startsWith('proto-')) {
      const newGen = { ...gen, id: `demo-ai-${Date.now()}`, user_id: user.id, created_at: new Date().toISOString() };
      setAiGenerations(prev => [newGen, ...prev]);
      gamify('AI_GENERATED');
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'ai_generations'), { ...gen, user_id: user.id });
      setAiGenerations(prev => [{ id: docRef.id, ...gen, user_id: user.id }, ...prev]);
      gamify('AI_GENERATED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify]);

  const fetchSocialPosts = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { setSocialPosts([]); return; } 
    try {
      const q = query(collection(db, 'social_posts'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setSocialPosts(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'social_posts');
    }
  }, [user?.id]);

  const fetchVehicles = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) { setVehicles([]); return; } 
    try {
      const q = query(collection(db, 'vehicles'), where('owner_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setVehicles(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'vehicles');
    }
  }, [user?.id]);

  const fetchPlatformEvents = useCallback(async () => {
    if (!user?.id) return; 
    if (user?.id?.startsWith('proto-')) { 
      setPlatformEvents([{ id: 'ev1', title: 'Global Townhall 2025', date: new Date().toISOString(), type: 'Online', host: 'CEO', created_at: new Date().toISOString(), target_roles: ['Admin', 'Licenciado', 'Member'] }]); 
      return; 
    } 
    try {
      const querySnapshot = await getDocs(collection(db, 'platform_events'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setPlatformEvents(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'platform_events');
    }
  }, [user?.id]);

  const fetchMembers = useCallback(async () => {
    if (user?.role !== 'Admin') return;
    if (user?.id?.startsWith('proto-')) {
      setMembers([
        { id: 'u1', name: 'Tiago Winf', email: 'tiago@winf.com', role: 'Admin', winfCoins: 15000, w_rank_level: 'Sovereign' } as User,
        { id: 'u2', name: 'João Silva', email: 'joao@parceiro.com', role: 'Licenciado', winfCoins: 2500, w_rank_level: 'Master' } as User,
        { id: 'u3', name: 'Maria Oliveira', email: 'maria@membro.com', role: 'Member', winfCoins: 500, w_rank_level: 'Initiate' } as User,
        { id: 'u4', name: 'Carlos Souza', email: 'carlos@elite.com', role: 'Licenciado', winfCoins: 8000, w_rank_level: 'Elite' } as User,
      ]);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setMembers(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'users');
    }
  }, [user?.role]);

  const updateUserRole = async (userId: string, newRole: string) => {
    if (user?.role !== 'Admin') return;
    if (user?.id?.startsWith('proto-')) {
      setMembers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
      return;
    }
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setMembers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${userId}`);
    }
  };
  const fetchDocumentItems = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setDocumentItems([
        {
          id: 'doc-apresentacao-comercial',
          title: 'Apresentação Comercial Winf™',
          category: 'Estratégia',
          required_plan: 'nivel1',
          content: `# APRESENTAÇÃO COMERCIAL DA FRANQUIA WINF™
## O Ecossistema de Franquias para Liderar o Futuro da Proteção e do Conforto.

### Seja um Líder. Seja Winf™.
A Oportunidade de Franquia com Modelo de Negócio Validado.

### Fundada sobre Experiência. Construída para o Futuro.
"A Winf™ não nasceu de uma teoria. Ela é o resultado de 30 anos de experiência no mercado de alta performance, fundada por mim, Tiago Augusto Correa. Unimos décadas de know-how com uma visão inovadora para criar um negócio que não apenas atende, mas define o futuro do nosso setor. Não estamos vendendo uma franquia; estamos convidando parceiros para escalar um sucesso comprovado."
- Tiago Augusto Correa, CEO & Chief Vision Officer

### Nosso Maior Argumento: Resultados Reais.
Antes de nos tornarmos uma franquia, fomos nosso próprio caso de sucesso. Nossa unidade piloto em Santos-SP, operando com um modelo de negócio enxuto e inovador:
- Faturamento Médio: R$ 300.000 / ano.
- Operação Otimizada: Atendimento 100% digital e aplicações apenas 4 dias por semana.
- Estrutura Enxuta: Gestão de técnicos parceiros autônomos.
- Marketing Eficaz: Captação de clientes premium via Instagram.

### Um Mercado em Aquecimento. Literalmente.
O mundo busca, mais do que nunca, conforto e eficiência. Com um modelo de negócio validado que prospera em um mercado aquecido, a Winf™ oferece uma oportunidade única para quem busca uma operação lucrativa e com forte posicionamento de marca.

### Não Vendemos Películas. Entregamos Resultados.
A Winf™ é um ecossistema de tecnologia e serviços projetado para entregar o que o cliente realmente deseja: Conforto em sua casa e Performance em seu carro. Fazemos isso através de dois modelos de franquia distintos e sinérgicos.

### O Kiosk: Seu Showroom de Vendas Arquitetônicas.
- Conceito: Um hub de consultoria e vendas de alto impacto, focado na Vertical Arquitetônica.
- Missão: Vender projetos de aplicação de películas para residências e escritórios.
- Perfil do Franqueado: O Vendedor. Foco em relacionamento e vendas consultivas.

### O Studio: Seu Ateliê de Performance Automotiva.
- Conceito: O centro de excelência técnica para aplicação da Vertical Automotiva.
- Missão: Entregar a aplicação perfeita das linhas AeroCore™ e NeoSkin™ PPF.
- Perfil do Franqueado: O Artista. Foco na perfeição técnica e na paixão automotiva.

### Você é o Dono do Negócio. Mas Nunca Estará Sozinho.
Oferecemos suporte completo em Implantação, Treinamento intensivo na Winf Ascend™, Marketing de alto padrão e a transferência de um modelo de Gestão já validado.`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-brand-book-winf',
          title: 'Brand Book Winf™ - Alma da Excelência',
          category: 'Marca',
          required_plan: 'nivel1',
          content: `# BRAND BOOK WINF™
## A Alma da Excelência: O Guia da Marca Winf™

### 1: Nossa Essência
- Visão: Ser a marca global sinônimo de inteligência, proteção e valorização de superfícies.
- Missão: Oferecer soluções tecnológicas de ponta através de um ecossistema de parceiros de elite.
- Pilares: Excelência Obsessiva, Tecnologia Invisível, Design como Filosofia, Parceria de Elite.
- Arquétipo: O Sábio + O Mago.

### 2: Nossa Identidade Verbal
- Tom de Voz: Confiante, Sofisticado, Educacional.
- Vocabulário: Preferimos "Solução", "Investimento". Evitamos "Peliculinha", "Barato".
- Slogans Oficiais:
  - Winf™. Proteção que se vê. Tecnologia que se sente.
  - Architectural: O mesmo vidro. Uma nova percepção.
  - Automotive: AeroCore™. Invisível, mas indispensável.

### 3: Nossa Identidade Visual
- O Logo: O símbolo minimalista e premium.
- Paleta de Cores: 
  - Preto Winf™ (#000000) - Sofisticação, exclusividade
  - Branco Puro (#FFFFFF) - Clareza, limpeza
  - Azul AeroCore™ (#0057FF) - Tecnologia, performance
  - Verde Winf Ascend™ (#ADFF2F) - Crescimento, energia
  - Cinza Grafite (#222222) / Cinza Claro (#F3F4F6) - Neutralidade
- Tipografia: Montserrat (Títulos/Destaques), Open Sans (Textos Corridos).
- Estilo Fotográfico: Iluminação dramática, alto contraste, arquitetura moderna, estúdios industriais, postura profissional.`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-catalogo-arch',
          title: 'Catálogo Comercial - Architectural',
          category: 'Operacional',
          required_plan: 'nivel1',
          content: `# CATÁLOGO COMERCIAL - WINF™ ARCHITECTURAL
## O mesmo vidro. Uma nova percepção.

### Manifesto
A Tecnologia Não Precisa Ser Vista. Precisa Ser Sentida.
A Winf™ transforma ambientes em santuários de conforto, privacidade e eficiência, filtrando o que há de ruim no sol e deixando entrar apenas o melhor: a luz.

### Linha INVISIBLE™
- Climatização Invisível. Clareza Absoluta.
- Foco em manter a luz natural, bloquear o calor extremo e proteger os móveis do desbotamento.

### Linha DUAL REFLECT™
- Privacidade Inteligente. Dia e Noite.
- Privacidade diurna bloqueando a visão externa, sem o "efeito espelho" indesejado no período noturno.

### Linha BLACKPRO™
- Conforto Visual. Estilo Sofisticado.
- Focado na redução drástica de brilho em telas (TVs/Monitores) e acabamento fumê elegante de alto padrão.

### Benefícios Universais e Garantia
- Segurança, Saúde e Economia em Cada Janela.
- Proteção anti-estilhaço em caso de quebra, bloqueio severo de Raios UV (antienvelhecimento e proteção à pele), redução do uso de ar condicionado.
- Selo de Garantia Winf™: Instalação por Especialistas Certificados Winf Ascend™.`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-catalogo-auto',
          title: 'Catálogo Comercial - Automotive',
          category: 'Operacional',
          required_plan: 'nivel1',
          content: `# CATÁLOGO COMERCIAL - WINF™ AUTOMOTIVE
## AeroCore™. Invisível, mas indispensável.

### Manifesto
Engenharia de Ponta. Execução de Mestre.
Pela paixão pela alta performance e proteção das verdadeiras obras de arte da engenharia global.

### Linha AeroCore™ - Películas de Performance
- A Engenharia do Conforto.
- Explicando a tecnologia de nanocerâmica, com índices absurdos de rejeição de calor e barreira de proteção UV definitiva.
- Invisible Series / Performance Series.

### Linha NeoSkin™ PPF (Paint Protection Film)
- A Armadura Invisível.
- Proteção anti-impacto (pedras, detritos), tecnologia self-healing (regeneração de riscos ao calor) e acabamento hidrofóbico.

### Pacotes de Serviço e Aplicação
- Proteção Sob Medida para Sua Necessidade.
- Kit Frontal (High Impact) vs Full Body (Proteção Completa do chassi).
- Selo de Qualidade: "Aplicação Artesanal. Realizada apenas por Mestres Aplicadores Certificados Winf Ascend™."

### A Experiência do Studio
- Mais que um Serviço. Uma Experiência.
- O processo consultivo premium e a execução obsessiva por detalhes em nossos ateliês de performance Winf™ Studio.`,
          access_role: 'Member',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-playbook-kiosk',
          title: 'Playbook do Kiosk Winf™',
          category: 'Operacional',
          required_plan: 'nivel2',
          content: `# MANUAL OPERACIONAL DO KIOSK WINF™
## O Guia para Transformar Interações em Projetos de Valor.

### 1: A Missão do Consultor de Experiência
- Você Não é um Vendedor. Você é um Arquiteto de Soluções.
- Seus pilares: Embaixador, Especialista, Apresentador.

### 2: Rotinas de Excelência: O Dia a Dia da Operação
- A Excelência Mora nos Detalhes: Checklist de abertura rigoroso.
- A Postura Proativa: Encante e convide; não fique estático no balcão.

### 3: O Domínio do Produto (Arquitetônica)
- Você Vende Conforto, Privacidade e Economia.
- Domine INVISIBLE™, DUAL REFLECT™, BLACKPRO™.
- Argumentos universais: Segurança, Garantia e Valorização Imobiliária.

### 4: A Jornada do Cliente: Venda Consultiva em 5 Passos
- Vender é um roteiro ensaiado, não improviso.
- Passos: Conexão, Diagnóstico, Apresentação da Solução, Oferta de Valor e Ação (Fechamento).

### 5: Ferramentas de Engajamento
- Não Apenas Fale. Mostre. Faça Sentir.
- O Demonstrador Térmico: A prova irrefutável do calor vs nanocerâmica.
- O Simulador Escape3D/VR ou Tablet interativo.

### 6: Gestão e Performance
- O que não se mede, não se gerencia.
- Acompanhar SLAs: Abordagens, Leads, Agendamentos, Taxa de Conversão, Ticket Médio.`,
          access_role: 'Licenciado',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-manual-master',
          title: 'Manual Mestre Winf™ Premium',
          category: 'Estratégia',
          required_plan: 'nivel2',
          content: `# MANUAL MESTRE DA WINF™ PREMIUM QUALITY WINDOWFILM

### 1. Visão Geral da Marca
Winf™ é uma marca brasileira de películas para controle solar com o conceito “Do Brasil para o Mundo”. Nosso foco está na tecnologia avançada, sustentabilidade, economia de energia e conforto térmico para criar ambientes mais frescos, reduzindo o uso de ar condicionado e promovendo um planeta mais sustentável.

### 2. Valores da Marca
- Sustentabilidade: Reduzir o impacto ambiental.
- Inovação tecnológica: Uso de nano cerâmica e materiais avançados.
- Qualidade premium: Alta durabilidade, garantia (5 a 10 anos).
- Brasil para o Mundo: Orgulho nacional, visão global.
- Foco no cliente: Impacto positivo na vida das pessoas.

### 3. Tom de Voz e Linguagem
Profissional, mas acessível. Positivo, motivacional e inspirador. Direto ao ponto e altamente focado na inovação, tecnologias de futuro e impacto ambiental.`,
          access_role: 'Licenciado',
          created_at: new Date('2026-05-04').toISOString()
        },
        {
          id: 'doc-brand-manual-oficial',
          title: 'Manual de Marca Oficial - Winf™ Select',
          category: 'Marca',
          required_plan: 'nivel1',
          content: MANUAL_DATA,
          access_role: 'Member',
          created_at: new Date().toISOString()
        },
        {
          id: 'doc-investidor-board',
          title: 'Sistema e Lógica de Investimentos da W12 Board',
          category: 'Equity',
          required_plan: 'nivel1',
          content: `# SISTEMA DE INVESTIMENTO: MASTER BOARD (W12) E ASSET LIGHT

O Sistema de Investimentos foi desenhado para consolidar o modelo de franquias da Winf-Chain mundialmente, a começar pelo Brasil.

### Visão Geral (Valuation & Escala)
- Target Valuation de **$1.2 Bilhões** num horizonte de globalização completa. 
- Receitas operacionais geradas pelos processos de licenciamento, royalties e micro-transações na rede.

### As Cadeiras (Master Boards)
A Winf atua em 18 territórios/países no mundo. Para cada país, existe o conceito do Master Board Regional.
- No **Brasil**, o controle central é dividido em **12 Cadeiras**. 
- Em **Global Hubs (cada outro país)**, existe 1 Cadeira (Master Board) que comanda a difusão da rede lá.
- Cada Assessor/Cadeira tem um **objetivo máximo (Meta)**: A aprovação e capacitação de **100 Polos Asset Light** na sua jurisdição (10.000 polos globais projetados).

### Os Polos Asset Light
O formato de entrada simplificado na Winf-Chain para aplicadores de alto nível ou empresários do ramo arquitetônico.
- Taxa de licenciamento muito mais tangível.
- Repasse de fluxo logístico direto da rede master.
- Proporcional ao investimento, recebimento da estrutura básica de operação.

### O Painel do Investidor
O portal de transparência e acesso ao patrimônio dentro da Winf-Chain:
1. **Ativos (Equity)**: Os membros visualizam as Cadeiras que possuem ao redor do mundo ou suas operações Asset Light.
2. **Distribuição de Lucros**: Visor de dividendos sobre transações validadas (Aportes/Royalties).
3. **Métricas de Performance da Malha**: Visual gráfico demonstrando expansão (Gráfico AreaChart do Target Valuation).
4. **Segurança (Sinf-Chain)**: Garantia baseada em estoque (Asset Backed), monitorada digitalmente pelo Master Board BlackShop.

As metas dos conselheiros convergem para a consolidação dos 100% de Asset Lights.
`,
          access_role: 'Member',
          created_at: new Date().toISOString()
        }
      ]);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, 'documents_master'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setDocumentItems(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'documents_master');
    }
  }, [user?.id]);

  const fetchTotalLeads = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setTotalLeads(leads.length);
      return;
    }
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      setTotalLeads(querySnapshot.size);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'leads/count');
    }
  }, [user?.id, leads.length]);

  const fetchTransactions = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setTransactions([{ id: 'tx1', type: 'income', amount: 1500, description: 'Serviço Porsche', category: 'Vendas', paymentMethod: 'Pix', date: new Date().toISOString() }]);
      return;
    }
    try {
      const q = query(collection(db, 'transactions'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setTransactions(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'transactions');
    }
  }, [user?.id]);

  const addTransaction = useCallback(async (tx: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      setTransactions(prev => [{ ...tx, id: `tx-${Date.now()}` }, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'transactions'), { ...tx, user_id: user.id });
      setTransactions(prev => [{ id: docRef.id, ...tx, user_id: user.id }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchQuotes = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setQuotes([
        { id: 'quote1', customerName: 'João Cliente', vehicleModel: 'Porsche 911', items: [], totalAmount: 12000, status: 'Approved', createdAt: new Date().toISOString(), projectType: 'Automotive' },
        { id: 'quote2', customerName: 'Edifício Luxo', vehicleModel: '', items: [], totalAmount: 45000, status: 'Pending', createdAt: new Date(Date.now() - 86400000).toISOString(), projectType: 'Architecture' },
      ]);
      return;
    }
    try {
      const q = query(collection(db, 'quotes'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setQuotes(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'quotes');
    }
  }, [user?.id]);

  const addQuote = useCallback(async (quote: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      setQuotes(prev => [{ ...quote, id: `quote-${Date.now()}`, createdAt: new Date().toISOString(), status: 'Pending' }, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'quotes'), { ...quote, user_id: user.id, status: 'Pending', createdAt: new Date().toISOString() });
      setQuotes(prev => [{ id: docRef.id, ...quote, user_id: user.id, status: 'Pending', createdAt: new Date().toISOString() }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const approveQuote = useCallback(async (quoteId: string, scheduledDate?: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return { success: false, error: 'Quote not found' };

    // 1. Update Quote Status
    await updateQuote(quoteId, { status: 'Approved' });

    // 2. Create Order
    const orderId = `ORD-${Date.now()}`;
    await createOrder(quote.items, {}, 'Pending'); // Simplified order creation

    // 2.1 Add Transaction
    await addTransaction({
        type: 'income',
        amount: quote.totalAmount,
        description: `Venda Aprovada: ${quote.customerName} - ${quote.vehicleModel || 'Serviço'}`,
        category: 'Vendas',
        date: new Date().toISOString()
    });

    // 3. Create Installation Job (OS)
    const osId = `OS-${Math.floor(Math.random() * 9000) + 1000}`;
    await addInstallationJob({
      service_order_id: osId,
      customer_name: quote.customerName,
      customer_whatsapp: quote.customerWhatsApp,
      customer_address: quote.customerAddress,
      customer_city: quote.customerCity,
      vehicle_model: quote.vehicleModel || 'Architecture',
      chosen_film: quote.items[0]?.description || 'Winf Film',
      total_amount: quote.totalAmount,
      payment_method: quote.paymentMethod as any,
      status: 'pending',
      scheduled_date: scheduledDate || new Date(Date.now() + 86400000).toISOString(),
      measurements: { architecture: quote.measurements }
    });

    gamify('SALE_CLOSED' as any);
    return { success: true, error: null };
  }, [quotes, user?.id, gamify, createOrder, addInstallationJob, addTransaction]);

  const updateQuote = useCallback(async (id: string, updates: any) => {
    if (user?.id?.startsWith('proto-')) {
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
      return { success: true, error: null };
    }
    try {
      await updateDoc(doc(db, 'quotes', id), updates);
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchStockItems = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setStockItems([
        { id: 'stock1', user_id: user.id, product_id: 'prod2', product_name: 'Winf Invisible®', total_meters: 30, width: 1.52, remaining_meters: 24.5, created_at: new Date().toISOString() },
        { id: 'stock2', user_id: user.id, product_id: 'prod4', product_name: 'Winf BlackPro®', total_meters: 30, width: 1.52, remaining_meters: 12.0, created_at: new Date().toISOString() },
      ]);
      return;
    }
    try {
      const q = query(collection(db, 'stock_items'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setStockItems(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'stock_items');
    }
  }, [user?.id]);

  const updateStock = useCallback(async (id: string, metersUsed: number) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      const item = stockItems.find(i => i.id === id);
      setStockItems(prev => prev.map(item => item.id === id ? { ...item, remaining_meters: Math.max(0, item.remaining_meters - metersUsed) } : item));
      if (item) {
        setStockHistory(prev => [{ id: `hist-${Date.now()}`, user_id: user.id, product_id: item.product_id, product_name: item.product_name, type: 'OUT', amount: metersUsed, date: new Date().toISOString() }, ...prev]);
      }
      return { success: true, error: null };
    }
    try {
      const docRef = doc(db, 'stock_items', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return { success: false, error: "Item not found" };
      const current = docSnap.data();
      const newRemaining = Math.max(0, (current.remaining_meters || 0) - metersUsed);
      await updateDoc(docRef, { remaining_meters: newRemaining });
      await fetchStockItems();
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, fetchStockItems, stockItems]);

  const fetchTrainingModules = useCallback(async () => {
    // Mock training data
    setTrainingModules([
      { id: 'tm1', title: 'A Ciência da Rejeição IR', description: 'Entenda como as películas Winf bloqueiam o calor sem escurecer o ambiente.', type: 'video', category: 'Technical', url: 'https://example.com/video1', duration: '12:45', xp_reward: 100, coins_reward: 50 },
      { id: 'tm2', title: 'Argumentação de Elite: Arquitetura', description: 'Como abordar arquitetos e fechar projetos de alto ticket.', type: 'audio', category: 'Sales', url: 'https://example.com/audio1', duration: '08:20', xp_reward: 80, coins_reward: 40 },
      { id: 'tm3', title: 'Gestão de Estoque e Winf Precision', description: 'Maximizando o lucro através do aproveitamento inteligente de material.', type: 'video', category: 'Management', url: 'https://example.com/video2', duration: '15:10', xp_reward: 120, coins_reward: 60 },
      { id: 'tm4', title: 'Instalação em Grandes Formatos', description: 'Técnicas avançadas para vidros de fachadas e coberturas.', type: 'video', category: 'Technical', url: 'https://example.com/video3', duration: '20:00', xp_reward: 150, coins_reward: 75 },
    ]);
  }, []);

  const fetchRetalhos = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      return;
    }
    try {
      const q = query(collection(db, 'retalhos'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Retalho));
      setRetalhos(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'retalhos');
    }
  }, [user?.id]);
  
  const addRetalho = useCallback(async (retalho: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      setRetalhos(prev => [{ 
        id: `ret-${Date.now()}`, 
        ...retalho, 
        user_id: user.id, 
        created_at: new Date().toISOString(), 
        is_used: false 
      }, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'retalhos'), { 
        ...retalho, 
        user_id: user.id, 
        created_at: serverTimestamp(), 
        is_used: false 
      });
      setRetalhos(prev => [{ 
        id: docRef.id, 
        ...retalho, 
        user_id: user.id, 
        created_at: new Date().toISOString(), 
        is_used: false 
      }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchPartnerTasks = useCallback(async () => {
    if (!user?.id) return;
    if (user?.id?.startsWith('proto-')) {
      setPartnerTasks([
        { id: 'task1', user_id: user.id, title: 'Revisar Leads da Porsche', description: 'Fazer follow-up com os leads quentes do Instagram.', priority: 'HIGH', status: 'PENDING', category: 'SALES', created_at: new Date().toISOString() },
        { id: 'task2', user_id: user.id, title: 'Treinamento AeroCore', description: 'Completar o módulo técnico de instalação.', priority: 'MEDIUM', status: 'IN_PROGRESS', category: 'TECHNICAL', created_at: new Date().toISOString() },
        { id: 'task3', user_id: user.id, title: 'Reposição de Estoque', description: 'Pedir mais rolos de Winf Invisible.', priority: 'CRITICAL', status: 'PENDING', category: 'ADMIN', created_at: new Date().toISOString() },
      ]);
      return;
    }
    try {
      const q = query(collection(db, 'partner_tasks'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PartnerTask));
      setPartnerTasks(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'partner_tasks');
    }
  }, [user?.id]);

  const fetchAgentInsights = useCallback(async () => {
    if (!user?.id || user.id.startsWith('proto-')) return;
    try {
      const q = query(collection(db, 'agent_insights'), where('user_id', '==', user.id), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AgentInsight));
      setAgentInsights(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'agent_insights');
    }
  }, [user?.id]);

  const markInsightAsRead = useCallback(async (id: string) => {
    if (!user?.id || user?.id?.startsWith('proto-')) return { success: true, error: null };
    try {
      await updateDoc(doc(db, 'agent_insights', id), { is_read: true });
      setAgentInsights(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
      return { success: true, error: null };
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `agent_insights/${id}`);
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const addPartnerTask = useCallback(async (task: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    if (user?.id?.startsWith('proto-')) {
      const newTask: PartnerTask = { ...task, id: `task-${Date.now()}`, user_id: user.id, created_at: new Date().toISOString(), status: 'PENDING' };
      setPartnerTasks(prev => [newTask, ...prev]);
      return { success: true, error: null };
    }
    try {
      const docRef = await addDoc(collection(db, 'partner_tasks'), { ...task, user_id: user.id });
      setPartnerTasks(prev => [{ id: docRef.id, ...task, user_id: user.id } as PartnerTask, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const updatePartnerTask = useCallback(async (id: string, updates: any) => {
    if (user?.id?.startsWith('proto-')) {
      setPartnerTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
      return { success: true, error: null };
    }
    try {
      await updateDoc(doc(db, 'partner_tasks', id), updates);
      setPartnerTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } as PartnerTask : t));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const deletePartnerTask = useCallback(async (id: string) => {
    if (user?.id?.startsWith('proto-')) {
      setPartnerTasks(prev => prev.filter(t => t.id !== id));
      return { success: true, error: null };
    }
    try {
      await deleteDoc(doc(db, 'partner_tasks', id));
      setPartnerTasks(prev => prev.filter(t => t.id !== id));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const toggleFavoriteModule = useCallback((moduleId: string) => {
    setFavoriteModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('winf_favorites', JSON.stringify(favoriteModules));
  }, [favoriteModules]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          // Create basic profile if not exists
          const newProfile: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email || 'User',
            email: firebaseUser.email || '',
            role: 'Licenciado',
            avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            winfCoins: 0,
            w_rank_xp: 0,
            w_rank_level: 'Initiate',
            arch_clearance: {
              invisible: false,
              blackpro: false,
              dualreflect: false
            },
            winf_knowledge: 0,
            cortex_influence: 0,
            neural_memory: 0,
            tactical_assets: 0
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
          setUser(newProfile);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserProfile]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && user?.id) {
        setIsLoading(true);
        // Load initial data only once when user is authenticated
        await Promise.all([
          fetchLeads(), fetchWarranties(), fetchOrders(), fetchInstallations(), fetchAiGenerations(),
          fetchPlatformEvents(), fetchDocumentItems(),
          fetchTotalLeads(), fetchTransactions(), fetchQuotes(),
          fetchStockItems(), fetchTrainingModules(), fetchPartnerTasks(), fetchAgentInsights()
        ]);
        setIsLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated, user?.id, fetchLeads, fetchWarranties, fetchOrders, fetchInstallations, fetchAiGenerations, fetchPlatformEvents, fetchDocumentItems, fetchTotalLeads, fetchTransactions, fetchQuotes, fetchStockItems, fetchTrainingModules, fetchPartnerTasks, fetchAgentInsights]);

  const contextValue: WinfContextType = useMemo(() => ({
    user, isAuthenticated, isLoading, notification, leads, warranties, products, orders, installations, aiGenerations, coinLedger, socialPosts, vehicles,
    userModuleProgress, platformEvents, members, userPerformanceMetrics, contentCalendarEvents, documentItems, transactions, quotes,
    stockItems, stockHistory, retalhos, trainingModules, partnerTasks,
    totalLeads, totalMembers, totalOrders, recentActivities,
    login, loginAsPrototype, logout, updateUserCoins, redeemMarketingActivation, gamify, closeNotification,
    uploadFileToStorage: async () => ({ url: null, error: 'Not implemented' }),
    fetchLeads, fetchPublicLeads, addLead, updateLead, deleteLead,
    publicLeads,
    fetchWarranties, registerWarranty, fetchProducts, fetchOrders, createOrder: async () => ({ success: true, error: null }),
    fetchInstallations, registerInstallation,
    fetchAiGenerations, saveAiGeneration: async () => ({ success: true, error: null }), fetchSocialPosts: async () => {}, 
    addSocialPost: async () => ({ success: true, error: null }),
    updateSocialPost: async () => ({ success: true, error: null }),
    deleteSocialPost: async () => ({ success: true, error: null }),
    fetchVehicles: async () => {}, addVehicle: async () => ({ success: true, error: null }),
    updateVehicle: async () => ({ success: true, error: null }),
    deleteVehicle: async () => ({ success: true, error: null }),
    fetchUserModuleProgress: async () => {},
    updateUserModuleProgress: async () => ({ success: true, error: null }),
    fetchPlatformEvents: async () => {}, 
    fetchMembers: async () => {},
    updateUserRole: async () => ({ success: true, error: null }),
    deleteProfile: async () => ({ success: true, error: null }),
    fetchDocumentItems: async () => {}, 
    fetchCoinLedger, fetchTransactions, addTransaction,
    fetchQuotes, addQuote, approveQuote,
    fetchStockItems, updateStock, addStockItem: async () => ({ success: true, error: null }), fetchRetalhos, addRetalho, fetchTrainingModules,
    fetchPartnerTasks, addPartnerTask, updatePartnerTask, deletePartnerTask,
    agentInsights, fetchAgentInsights, markInsightAsRead,
    fetchTotalLeads: async () => {}, fetchTotalMembers: async () => {}, fetchTotalOrders: async () => {}, fetchRecentActivities: async () => {},
    fetchInstallationById, fetchWarrantyBySerialNumber,
    fetchUserPerformanceMetrics: async () => {}, fetchContentCalendarEvents: async () => {}, addContentCalendarEvent: async () => ({ success: true, error: null }),
    agentState,
    dispatchAgentCommand,
    paradoxAnalysis,
    setParadoxAnalysis,
    whatsappConfigs,
    distributeLead,
    activeChats,
    installationJobs,
    addInstallationJob,
    updateInstallationJob,
    completeJobAndGenerateWarranty,
    effectiveRole,
    setEffectiveRole,
    favoriteModules,
    toggleFavoriteModule
  }), [
    user, isAuthenticated, isLoading, notification, leads, warranties, products, orders, installations, aiGenerations, coinLedger, socialPosts, vehicles,
    userModuleProgress, platformEvents, members, userPerformanceMetrics, contentCalendarEvents, documentItems, transactions, quotes,
    stockItems, stockHistory, retalhos, trainingModules, partnerTasks,
    totalLeads, totalMembers, totalOrders, recentActivities,
    publicLeads,
    agentInsights,
    agentState,
    paradoxAnalysis,
    whatsappConfigs,
    activeChats,
    installationJobs,
    effectiveRole,
    favoriteModules,
    login, loginAsPrototype, logout, updateUserCoins, redeemMarketingActivation, gamify, closeNotification,
    fetchLeads, fetchPublicLeads, addLead, updateLead, deleteLead,
    fetchWarranties, registerWarranty, fetchProducts, fetchOrders,
    fetchInstallations, registerInstallation,
    fetchAiGenerations,
    fetchCoinLedger, fetchTransactions, addTransaction,
    fetchQuotes, addQuote, approveQuote,
    fetchStockItems, updateStock, fetchTrainingModules,
    fetchPartnerTasks, addPartnerTask, updatePartnerTask, deletePartnerTask,
    fetchAgentInsights, markInsightAsRead,
    fetchInstallationById, fetchWarrantyBySerialNumber,
    dispatchAgentCommand,
    distributeLead,
    addInstallationJob, updateInstallationJob, completeJobAndGenerateWarranty,
    toggleFavoriteModule
  ]);

  return <WinfContext.Provider value={contextValue}>{children}</WinfContext.Provider>;
};
