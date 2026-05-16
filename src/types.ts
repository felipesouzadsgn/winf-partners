
export interface ParadoxAnalysis {
  verdade: string;
  risco: string;
  conselho: string;
  copy: string;
  celula_sugerida: string;
  visual_prompt: string;
}

export enum ViewState {
  DASHBOARD_WINF = 'WINF',
  DASHBOARD_ASCEND = 'ASCEND',
  DASHBOARD_SYNAPSE = 'SYNAPSE',
  W_RANK = 'W_RANK',
  DASHBOARD_WINFCOIN = 'WINFCOIN',
  SALES_FUNNEL = 'FUNNEL',
  WARRANTY = 'WARRANTY',
  MODULES = 'MODULES',
  PROFILE = 'PROFILE',
  MODULE_ECOTECH = 'MODULE_ECOTECH',
  MODULE_FACECAR = 'MODULE_FACECAR',
  MODULE_GRID = 'MODULE_GRID',
  MODULE_CROSS_PLATFORM = 'MODULE_CROSS_PLATFORM',
  MODULE_NEUROMESH = 'MODULE_NEUROMESH',
  MODULE_CAPTURE = 'MODULE_CAPTURE',
  MODULE_MEMBERS = 'MODULE_MEMBERS',
  MODULE_SYNTHWAVE = 'MODULE_SYNTHWAVE',
  MODULE_UNIVERSO_DARK = 'MODULE_UNIVERSO_DARK',
  LANDING_UNIVERSO_DARK = 'LANDING_UNIVERSO_DARK',
  MODULE_WARP = 'MODULE_WARP',
  MODULE_CONCIERGE = 'MODULE_CONCIERGE',
  MODULE_DATA_CORE = 'MODULE_DATA_CORE',
  MODULE_ACADEMY = 'ACADEMY',
  MODULE_ESCAPE_3D = 'MODULE_ESCAPE_3D',
  MODULE_PRICE_TABLE = 'MODULE_PRICE_TABLE',
  MODULE_BIOMETRIC = 'MODULE_BIOMETRIC',
  MODULE_FINANCIAL = 'MODULE_FINANCIAL',
  MODULE_QUOTES = 'MODULE_QUOTES',
  MODULE_NEURO_PARADOX = 'NEURO_PARADOX',
  MODULE_NEURAL_FLOW = 'NEURAL_FLOW',
  MODULE_SQUAD_PERFORMANCE = 'SQUAD_PERFORMANCE',
  MODULE_ARCHITECTURAL = 'ARCHITECTURAL',
  MODULE_ARSENAL = 'ARSENAL',
  MODULE_KIOSK_MODE = 'KIOSK_MODE',
  BRAND_MANUAL = 'BRAND_MANUAL',
  MODULE_WINF_CUT = 'WINF_CUT',
  MODULE_AVATAR_JOURNEY = 'AVATAR_JOURNEY',
  MODULE_STOCK = 'STOCK',
  MODULE_THE_BOARD = 'THE_BOARD',
  MODULE_MISSION_CONTROL = 'MISSION_CONTROL',
  MODULE_CONNECT = 'CONNECT',
  MODULE_NEURAL_BRIDGE = 'NEURAL_BRIDGE',
  MODULE_WHATSAPP_HUB = 'WHATSAPP_HUB',
  MODULE_CONSULTANCY_LINK = 'CONSULTANCY_LINK',
  MODULE_TASKS = 'MODULE_TASKS',
  MODULE_FAQ = 'MODULE_FAQ',
  MODULE_PRODUCTS = 'MODULE_PRODUCTS',
  MODULE_INSTALLATIONS = 'MODULE_INSTALLATIONS',
  MODULE_BLACKSHOP_ADMIN = 'MODULE_BLACKSHOP_ADMIN',
  MODULE_WARRANTIES = 'MODULE_WARRANTIES',
  CERTIFICATE_VIEWER = 'CERTIFICATE_VIEWER',
  PRODUCTS_CATALOG = 'PRODUCTS_CATALOG',
  PRODUCT_LANDING = 'PRODUCT_LANDING',
  MODULE_BLACKSHOP = 'MODULE_BLACKSHOP',
  MODULE_CHECKOUT_BLACKSHOP = 'MODULE_CHECKOUT_BLACKSHOP',
  MODULE_WINF_CHAIN = 'MODULE_WINF_CHAIN',
  MODULE_CORE_AI = 'MODULE_CORE_AI',
  MODULE_NEXUS_AI = 'MODULE_NEXUS_AI',
  MODULE_WINF_BRAIN = 'MODULE_WINF_BRAIN',
  MODULE_WINF_WORLD = 'MODULE_WINF_WORLD',
  MODULE_INTEGRATIONS = 'MODULE_INTEGRATIONS',
  MODULE_MARKETING_AI = 'MODULE_MARKETING_AI',
  MODULE_CONTROL_ROOM = 'MODULE_CONTROL_ROOM',
  PUBLIC_PORTAL = 'PUBLIC_PORTAL',
  DASHBOARD_ARCHITECT = 'DASHBOARD_ARCHITECT',
  DASHBOARD_ASSET_LIGHT = 'DASHBOARD_ASSET_LIGHT',
  MODULE_ESSENTIAL_TOOLS = 'ESSENTIAL_TOOLS',
  
  LANDING_PAGE = 'LANDING_PAGE',
  LANDING_PAGE_MENU = 'LANDING_PAGE_MENU',
  INSTITUTIONAL_SITE = 'INSTITUTIONAL_SITE',
  PUBLIC_CONSULTANCY = 'PUBLIC_CONSULTANCY',
  PUBLIC_CONSULTANCY_ENTRANCE = 'PUBLIC_CONSULTANCY_ENTRANCE',
  LANDING_PARCERIA = 'LANDING_PARCERIA',
  LANDING_ASSET_LIGHT = 'LANDING_ASSET_LIGHT',
  LANDING_PARCERIA_NIVEL1 = 'LANDING_PARCERIA_NIVEL1',
  LANDING_PARCERIA_NIVEL2 = 'LANDING_PARCERIA_NIVEL2',
  LANDING_PARCERIA_NIVEL3 = 'LANDING_PARCERIA_NIVEL3',
  LANDING_KIOSK = 'LANDING_KIOSK',
  LANDING_STUDIO = 'LANDING_STUDIO',
  LANDING_AEROCORE = 'LANDING_AEROCORE',
  LANDING_NEOSKIN = 'LANDING_NEOSKIN',
  LANDING_BIOMETRIC = 'LANDING_BIOMETRIC',
  LANDING_WINF_SELECT_ELITE = 'LANDING_WINF_SELECT_ELITE',
  ABOUT_US = 'ABOUT_US',
  ACCESS_FORM = 'ACCESS_FORM',
  ARCHITECT_REGISTRATION = 'ARCHITECT_REGISTRATION',
  LANDING_PARTNERS_CORPORATE = 'LANDING_PARTNERS_CORPORATE',
  LANDING_GALLERY = 'LANDING_GALLERY',
  
  LOGIN = 'LOGIN',
  SEARCH = 'SEARCH',
  ADMIN_PANEL = 'ADMIN_PANEL',
  MODULE_MOLECULAR_TWIN = 'MOLECULAR_TWIN',
  MODULE_CUIDAR_CONECTAR = 'CUIDAR_CONECTAR',
  MODULE_DIGITAL_START = 'DIGITAL_START',
  MODULE_SHOP_CORE = 'SHOP_CORE',
  WINF_BRAND_LANDING = 'WINF_BRAND_LANDING',
  LANDING_SYNTHWAVE = 'LANDING_SYNTHWAVE',
  LANDING_BRIEFING = 'LANDING_BRIEFING',
  BRAND_SHOWROOM = 'BRAND_SHOWROOM',
}

export type BusinessModel = 'STUDIO' | 'ONLINE' | 'KIOSK' | 'CORPORATE';
export type DocumentCategory = 'Estratégia' | 'Marca' | 'Técnico' | 'Equity' | 'Operacional';

export type GamificationAction = 
  | 'COMMENT' 
  | 'POST' 
  | 'SHARE' 
  | 'LOGIN' 
  | 'AI_GENERATED' 
  | 'LEAD_ADDED' 
  | 'WARRANTY_REGISTERED' 
  | 'COURSE_COMPLETED' 
  | 'ACADEMY_COMPLETED'
  | 'REDEEM' 
  | 'SCHEDULE_POST'
  | 'INSTALLATION_REGISTERED'
  | 'SALE_CLOSED';

export interface NotificationState {
  show: boolean;
  message: string;
  points: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // e.g., 'trophy', 'star'
  xpReward: number;
  winfCoinsReward: number;
  unlocked: boolean;
}

export interface WRankMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  winfCoinsReward: number;
  progress: number; // 0-100
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Licenciado' | 'Admin' | 'Member' | 'Collaborator' | 'Instalador' | 'Arquiteto' | 'Architect';
  avatar: string;
  winfCoins: number;
  company?: string;
  phone?: string;
  cnpj?: string;
  businessModel?: BusinessModel;
  territory?: string;
  city?: string;
  technical_level?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Master';
  certifications?: string[];
  installation_history_count?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  w_rank_xp: number;
  w_rank_level: string;
  collaborator_level?: 'Operador' | 'Especialista' | 'Master';
  tech_level?: 'Authorized' | 'Specialist' | 'Master';
  is_active?: boolean;
  arch_clearance: {
    invisible: boolean;
    blackpro: boolean;
    dualreflect: boolean;
  };
  winf_knowledge: number;
  cortex_influence: number;
  neural_memory: number;
  tactical_assets: number;
  plan?: 'nivel1' | 'nivel2' | 'nivel3' | 'nivel4';
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  category: DocumentCategory | string;
  access_level?: 'Public' | 'Member' | 'Licensee' | 'Admin';
  access_role?: string;
  required_plan?: 'nivel1' | 'nivel2' | 'nivel3' | 'nivel4';
  version?: string;
  last_update?: string;
  created_at?: string;
}

export interface Lead {
  id: string;
  user_id?: string;
  name: string;
  contact: string;
  source: string;
  interest: string;
  status: string;
  ai_score: number;
  dominance_score: number; 
  psychological_weakness?: string;
  last_paradox_truth?: string;
  last_paradox_maneuver?: string;
  suggested_cell?: 'Invisible' | 'BlackPro' | 'dUAL Reflect' | 'AeroCore' | 'NeoSkin';
  decay_level: number;
  agent_status?: 'pending' | 'processing' | 'completed';
  created_at?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface WarrantyRegistration {
  id: string;
  customerName: string;
  customerEmail?: string | null;
  productLine: string;
  serialNumber: string;
  purchaseDate: string;
  coverage?: string;
  status: string;
  agent_status?: 'pending' | 'processing' | 'completed';
  licenciado_id?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  line?: string;
  description?: string | null;
  benefits?: string[];
  application?: string;
  dimensions?: string;
  thickness?: string;
  warranty_years?: number;
  thermal_score?: number;
  light_score?: number;
  shield_score?: number;
  privacy_score?: number;
  price: number;
  image_url?: string | null;
  category?: string | null;
  stock_quantity: number;
  is_active: boolean;
  available_widths?: number[];
  created_at: string;
  tech_specs?: {
    vlt?: string;
    irr?: string;
    uvr?: string;
    tser?: string;
  };
}

export interface Installation {
  id: string;
  user_id: string;
  client_name: string;
  client_email?: string;
  product_id: string;
  product_name: string;
  product_line?: string;
  location: string;
  date: string;
  installer_id: string;
  installer_name: string;
  installer_level?: string;
  warranty_id?: string;
  warranty_years?: number;
  qr_code_url?: string;
  agent_status?: 'pending' | 'processing' | 'completed';
  status: 'pending' | 'completed' | 'cancelled';
  performance_snapshot?: {
    thermal: number;
    light: number;
    shield: number;
    privacy: number;
  };
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  owner_id: string;
  model: string;
  plate?: string | null;
  status?: string | null;
  battery_level?: number | null;
  created_at: string;
}

export interface AiGeneration {
  id: string;
  user_id: string;
  tool_used: string;
  prompt?: string | null;
  output_url?: string | null;
  media_type?: string | null;
  created_at: string;
}

export interface CoinLedgerEntry {
  id: string;
  user_id: string;
  amount: number;
  description?: string | null;
  action_type?: string | null;
  created_at: string;
}

export interface SocialPost {
  id: string;
  user_id: string;
  title?: string | null;
  caption?: string | null;
  platform?: string | null;
  status: string;
  scheduled_date?: string | null;
  image_url?: string | null;
  created_at: string;
}

export interface UserModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  track_id: string;
  progress_percentage: number;
  status: string;
  created_at: string;
}

export interface PlatformEvent {
  id: string;
  title: string;
  date: string;
  type?: string | null;
  host?: string | null;
  created_at: string;
  target_roles?: string[];
}

export interface UserPerformanceMetrics {
  id: string;
  user_id: string;
  metric_name: string;
  metric_value: number;
  created_at: string;
}

export interface ContentCalendarEvent {
  id: string;
  user_id: string;
  title: string;
  date: string;
  type?: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  paymentMethod: string;
  date: string;
}

export interface QuoteItem {
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  user_id?: string;
  customerName: string;
  customerWhatsApp?: string;
  customerAddress?: string;
  customerCity?: string;
  vehicleModel?: string;
  projectType?: 'Automotive' | 'Architecture';
  items: QuoteItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  measurements?: string;
  paymentMethod?: string;
  pixDiscount?: number;
  installments?: number;
  installmentValue?: number;
}

export interface StockItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  total_meters: number; // Total linear meters (usually 30m rolls)
  width: number; // Usually 1.52m
  remaining_meters: number;
  created_at: string;
}

export interface Retalho {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  dimensions: string; // e.g., "1.5m x 0.5m"
  areaM2: number;
  created_at: string;
  is_used: boolean;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'text';
  category: 'Sales' | 'Technical' | 'Management';
  url: string;
  duration?: string;
  thumbnail?: string;
  xp_reward: number;
  coins_reward: number;
}

export interface InstallationJob {
  id: string;
  service_order_id: string;
  customer_name: string;
  customer_whatsapp?: string;
  customer_address?: string;
  customer_city?: string;
  vehicle_model: string;
  chosen_film?: string;
  total_amount?: number;
  payment_method?: string;
  collaborator_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'approved';
  measurements?: {
    windshield?: string;
    sides?: string;
    rear?: string;
    roof?: string;
    architecture?: string;
  };
  media?: {
    photos: string[];
    videos: string[];
  };
  observations?: string;
  warranty_id?: string;
  created_at: string;
  completed_at?: string;
  scheduled_date?: string;
}

export interface WinfContextType {
  user: User | null;
  isAuthenticated: boolean;
  notification: NotificationState;
  leads: Lead[];
  publicLeads: Lead[];
  warranties: WarrantyRegistration[];
  products: Product[];
  orders: Order[];
  installations: Installation[];
  aiGenerations: AiGeneration[];
  coinLedger: CoinLedgerEntry[];
  socialPosts: SocialPost[];
  vehicles: Vehicle[];
  userModuleProgress: UserModuleProgress[];
  platformEvents: PlatformEvent[];
  members: User[];
  userPerformanceMetrics: UserPerformanceMetrics[];
  contentCalendarEvents: ContentCalendarEvent[];
  documentItems: DocumentItem[];
  transactions: Transaction[];
  quotes: Quote[];
  stockItems: StockItem[];
  stockHistory: any[];
  retalhos: Retalho[];
  trainingModules: TrainingModule[];
  partnerTasks: PartnerTask[];
  totalLeads: number;
  totalMembers: number;
  totalOrders: number;
  recentActivities: { id: string; type: string; description: string; created_at: string; }[];
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  loginAsPrototype: (role?: 'Admin' | 'Architect' | 'Member' | 'Licenciado' | 'Collaborator') => Promise<void>;
  logout: () => Promise<void>;
  updateUserCoins: (amount: number, reason: string, xp?: number) => Promise<void>;
  gamify: (action: GamificationAction, details?: any) => void;
  closeNotification: () => void;
  uploadFileToStorage: (file: File) => Promise<{ url: string | null; error: string | null }>;
  
  fetchLeads: () => Promise<void>;
  fetchPublicLeads: () => Promise<void>;
  addLead: (lead: any) => Promise<{ success: boolean; error: string | null }>;
  updateLead: (id: string, updates: any) => Promise<{ success: boolean; error: string | null }>;
  deleteLead: (id: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchWarranties: () => Promise<void>;
  fetchWarrantyBySerialNumber: (serialNumber: string) => Promise<WarrantyRegistration | null>;
  registerWarranty: (data: any) => Promise<{ success: boolean; error: string | null }>;
  
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  createOrder: (items: any[], shippingAddress: any, paymentMethod: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchInstallations: () => Promise<void>;
  fetchInstallationById: (id: string) => Promise<Installation | null>;
  registerInstallation: (data: any) => Promise<{ success: boolean; error: string | null }>;
  
  fetchAiGenerations: () => Promise<void>;
  saveAiGeneration: (gen: any) => Promise<{ success: boolean; error: string | null }>;
  
  fetchSocialPosts: () => Promise<void>;
  addSocialPost: (post: any) => Promise<{ success: boolean; error: string | null }>;
  updateSocialPost: (id: string, updates: any) => Promise<{ success: boolean; error: string | null }>;
  deleteSocialPost: (id: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: any) => Promise<{ success: boolean; error: string | null }>;
  updateVehicle: (id: string, updates: any) => Promise<{ success: boolean; error: string | null }>;
  deleteVehicle: (id: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchUserModuleProgress: () => Promise<void>;
  updateUserModuleProgress: (moduleId: string, trackId: string, progress: number, status: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchPlatformEvents: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  updateUserRole: (userId: string, newRole: string) => Promise<void | { success: boolean; error: any }>;
  deleteProfile: (id: string) => Promise<{ success: boolean; error: string | null }>;
  fetchDocumentItems: () => Promise<void>;
  
  fetchCoinLedger: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  addTransaction: (tx: any) => Promise<{ success: boolean; error: string | null }>;
  
  fetchQuotes: () => Promise<void>;
  addQuote: (quote: any) => Promise<{ success: boolean; error: string | null }>;
  approveQuote: (quoteId: string, scheduledDate?: string) => Promise<{ success: boolean; error: string | null }>;
  
  fetchStockItems: () => Promise<void>;
  updateStock: (id: string, metersUsed: number) => Promise<{ success: boolean; error: string | null }>;
  addStockItem: (item: any) => Promise<{ success: boolean; error: string | null }>;
  fetchRetalhos: () => Promise<void>;
  addRetalho: (retalho: any) => Promise<{ success: boolean; error: string | null }>;
  fetchTrainingModules: () => Promise<void>;

  // Squad & Installation
  installationJobs: InstallationJob[];
  addInstallationJob: (job: any) => Promise<{ success: boolean; error: string | null }>;
  updateInstallationJob: (id: string, updates: any) => Promise<{ success: boolean; error: string | null }>;
  completeJobAndGenerateWarranty: (jobId: string) => Promise<{ success: boolean; warrantyId?: string; error: string | null }>;

  fetchTotalLeads: () => Promise<void>;
  fetchTotalMembers: () => Promise<void>;
  fetchTotalOrders: () => Promise<void>;
  fetchRecentActivities: () => Promise<void>;
  fetchUserPerformanceMetrics: () => Promise<void>;
  fetchContentCalendarEvents: () => Promise<void>;
  addContentCalendarEvent: (event: any) => Promise<{ success: boolean; error: string | null }>;

  // Agent Control (Neural Bridge)
  agentState: AgentState;
  dispatchAgentCommand: (command: AgentCommand) => Promise<{ success: boolean; output: string }>;
  paradoxAnalysis: ParadoxAnalysis | null;
  setParadoxAnalysis: (analysis: ParadoxAnalysis | null) => void;

  // WhatsApp Hub & Lead Distribution
  whatsappConfigs: WhatsAppConfig[];
  distributeLead: (leadData: any) => Promise<{ success: boolean; routedTo: string }>;
  activeChats: WhatsAppChat[];
  
  fetchPartnerTasks: () => Promise<void>;
  addPartnerTask: (task: any) => Promise<{ success: boolean; error: string | null }>;
  updatePartnerTask: (id: string, updates: any) => Promise<{ success: boolean; error: string | null }>;
  deletePartnerTask: (id: string) => Promise<{ success: boolean; error: string | null }>;

  agentInsights: AgentInsight[];
  fetchAgentInsights: () => Promise<void>;
  markInsightAsRead: (id: string) => Promise<{ success: boolean; error: string | null }>;
  
  // Role Simulation / Preview
  effectiveRole: User['role'] | null;
  setEffectiveRole: (role: User['role'] | null) => void;
  
  // Favorites
  favoriteModules: string[];
  toggleFavoriteModule: (moduleId: string) => void;
}

export interface WhatsAppConfig {
  id: string;
  city: string;
  phoneNumber: string;
  isCentral: boolean;
  status: 'online' | 'offline';
  agentName: string;
}

export interface WhatsAppChat {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  city?: string;
  status: 'waiting' | 'bot_handling' | 'routed' | 'completed';
}

export interface AgentState {
  status: 'online' | 'offline' | 'syncing';
  activeAgents: number;
  memoryPoints: number;
  lastSync: string;
  logs: string[];
}

export interface AgentCommand {
  type: 'FILE' | 'TERMINAL' | 'WEB' | 'SCHEDULE' | 'DEVICE' | 'MEMORY' | 'SUBAGENT' | 'VOICE' | 'MESSAGE' | 'SKILL';
  action: string;
  payload?: any;
}

export interface PartnerTask {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  category: 'SALES' | 'TECHNICAL' | 'ADMIN' | 'MARKETING' | 'OTHER';
  created_at: string;
}

export interface AgentLog {
  id: string;
  agent_id: string;
  agent_name: string;
  action: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
  details?: string;
}

export interface AgentInsight {
  id: string;
  user_id: string;
  type: 'STOCK_ALERT' | 'LEAD_SCRIPT' | 'QUOTE_FOLLOWUP' | 'GOAL_RISK' | 'ONBOARDING';
  title: string;
  content: string;
  related_entity_id?: string;
  is_read: boolean;
  created_at: string;
}
