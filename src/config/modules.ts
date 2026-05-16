import { 
  Zap, Globe, Star, ShoppingBag, Wallet, Scissors,
  GraduationCap, FileSpreadsheet, 
  Building2, ShieldCheck, Link, HelpCircle, Brain,
  Package, LayoutDashboard, Users, Target, Monitor, Cpu,
  Filter, MessageCircle, CalendarDays, PackageSearch, Blocks, Trophy, Leaf, Rocket, ClipboardList, Settings
} from 'lucide-react';
import { ViewState } from '../types';

export interface ModuleItem {
  id: string;
  title: string;
  icon: any;
  desc: string;
  viewState: ViewState;
  isComingSoon?: boolean;
  isAdminOnly?: boolean;
}

export interface ModuleCategory {
  category: string;
  items: ModuleItem[];
}

export const MODULES_CONFIG: ModuleCategory[] = [
  { category: 'CRM & Vendas High-Ticket', items: [
      { id: 'essential_tools', title: 'Arsenal Comercial', icon: Zap, desc: 'Acesso Rápido a Links, Tabelas e Áudios', viewState: ViewState.MODULE_ESSENTIAL_TOOLS },
      { id: 'sales_funnel', title: 'CRM Precision™', icon: Filter, desc: 'Gestão Algorítmica de Leads Elite', viewState: ViewState.SALES_FUNNEL },
      { id: 'quotes', title: 'Orçamentos Elite', icon: FileSpreadsheet, desc: 'Gerador de Contratos High-Ticket', viewState: ViewState.MODULE_QUOTES },
      { id: 'whatsapp_hub', title: 'WhatsApp Central', icon: MessageCircle, desc: 'Automação de Vendas e Lembretes', viewState: ViewState.MODULE_WHATSAPP_HUB },
      { id: 'consultancy', title: 'Consultoria Digital', icon: Link, desc: 'Apresentação Corporativa Oficial', viewState: ViewState.MODULE_CONSULTANCY_LINK },
  ]},
  { category: 'Engenharia Operacional & Agendamentos', items: [
      { id: 'shop_core', title: 'Shop Core™', icon: ClipboardList, desc: 'Mapeamento de Rotinas da Loja', viewState: ViewState.MODULE_SHOP_CORE },
      { id: 'installations', title: 'Logística de Deployment', icon: CalendarDays, desc: 'Agendamentos e Ordens de Serviço', viewState: ViewState.MODULE_INSTALLATIONS },
      { id: 'precision', title: 'Winf Precision™', icon: Scissors, desc: 'Motor de Otimização de Corte (M²)', viewState: ViewState.MODULE_WINF_CUT },
      { id: 'molecular_twin', title: 'Gêmeo Molecular™', icon: Cpu, desc: 'Simulador Termodinâmico AI', viewState: ViewState.MODULE_MOLECULAR_TWIN },
      { id: 'catalog', title: 'Especificações Técnicas', icon: PackageSearch, desc: 'Engenharia Base do Produto (Fichas)', viewState: ViewState.PRODUCTS_CATALOG },
  ]},
  { category: 'Núcleo Estratégico Financeiro', items: [
      { id: 'financial', title: 'Fluxo de Caixa (Macro)', icon: Wallet, desc: 'Análise DRE, Receitas e Despesas', viewState: ViewState.MODULE_FINANCIAL },
      { id: 'stock', title: 'Winf Stock™', icon: Package, desc: 'Inventário Nacional de Bobinas', viewState: ViewState.MODULE_STOCK },
      { id: 'blackshop', title: 'Blackshop™ B2B', icon: ShoppingBag, desc: 'Centro de Abastecimento (Reposições)', viewState: ViewState.MODULE_BLACKSHOP },
      { id: 'winf_chain', title: 'WINF CHAIN™', icon: Globe, desc: 'Rede Blockchain & Contratos Inteligentes', viewState: ViewState.MODULE_WINF_CHAIN },
  ]},
  { category: 'Crescimento Sistêmico & Inteligência Artificial', items: [
      { id: 'digital_start', title: 'Protocolo Start Digital', icon: Rocket, desc: 'Setup Ativação da Matriz', viewState: ViewState.MODULE_DIGITAL_START },
      { id: 'brain', title: 'WINF BRAIN™', icon: Brain, desc: 'Rede Neural Auxiliar de Consultas', viewState: ViewState.MODULE_WINF_BRAIN },
      { id: 'arsenal', title: 'Arsenal Tático WINF™', icon: Zap, desc: 'Banco Central de Mídias e Scripts', viewState: ViewState.MODULE_ARSENAL },
      { id: 'integrations', title: 'Ponte de Integrações', icon: Blocks, desc: 'Conexões Ocultas via API/Zapier', viewState: ViewState.MODULE_INTEGRATIONS },
  ]},
  { category: 'Expansão de Rede WINF™', items: [
      { id: 'academy', title: 'Winf Academy™', icon: GraduationCap, desc: 'Doutrina Técnica de Alta Performance', viewState: ViewState.MODULE_ACADEMY },
      { id: 'wrank', title: 'W-Rank Oficial', icon: Trophy, desc: 'Sistema Global de Autoridade e Missões', viewState: ViewState.W_RANK },
      { id: 'connect', title: 'Synapse Connect', icon: Users, desc: 'Ponto de Conexão de Operadores', viewState: ViewState.MODULE_CONNECT },
      { id: 'cuidar_conectar', title: 'Iniciativa Eco-Tech', icon: Leaf, desc: 'Diretrizes Estratégicas Ambientais', viewState: ViewState.MODULE_CUIDAR_CONECTAR },
      { id: 'faq', title: 'Central de Resolução', icon: HelpCircle, desc: 'Protocolos de Segurança Rápida', viewState: ViewState.MODULE_FAQ },
  ]},
  { category: 'Branding Showroom', items: [
      { id: 'kiosk', title: 'Kiosk Mode', icon: Monitor, desc: 'Módulo Totem Ponto de Venda', viewState: ViewState.MODULE_KIOSK_MODE, isComingSoon: false },
      { id: 'brand_showroom', title: 'Brand Showroom™', icon: Star, desc: 'Apresentação High-Profile', viewState: ViewState.BRAND_SHOWROOM, isComingSoon: false },
  ]},
  { category: 'Arquitetura & Engenharia', items: [
      { id: 'architectural', title: 'Architectural Pro™', icon: Building2, desc: 'Gestão de Obras e Projetos', viewState: ViewState.MODULE_ARCHITECTURAL, isComingSoon: false },
      { id: 'escape_3d', title: 'Escape 3D™', icon: Blocks, desc: 'Mapeamento Tridimensional (Beta)', viewState: ViewState.MODULE_ESCAPE_3D, isComingSoon: false },
  ]}
];

export const ADMIN_MODULES: ModuleItem[] = [
  { id: 'board', title: 'The Board™', icon: LayoutDashboard, desc: 'Núcleo Central de Licenciados', viewState: ViewState.MODULE_THE_BOARD, isAdminOnly: true },
  { id: 'catalog_admin', title: 'Controladoria de Produto', icon: Package, desc: 'Single Source of Truth', viewState: ViewState.MODULE_BLACKSHOP_ADMIN, isAdminOnly: true },
  { id: 'mission_control', title: 'Mission Control™', icon: Target, desc: 'Logística de Comando', viewState: ViewState.MODULE_MISSION_CONTROL, isAdminOnly: true },
  { id: 'world', title: 'WINF™ WORLD', icon: Globe, desc: 'Mapeamento Satelital Global', viewState: ViewState.MODULE_WINF_WORLD, isAdminOnly: true },
  { id: 'nexus_ai', title: 'Central NEXUS™', icon: Brain, desc: 'Gerenciamento de Agentes (Terminal)', viewState: ViewState.MODULE_NEXUS_AI, isAdminOnly: true },
  { id: 'data_core', title: 'Data Core', icon: Settings, desc: 'Configurações Globais', viewState: ViewState.MODULE_DATA_CORE, isAdminOnly: true },
];

export const getAllModules = () => {
  const all: ModuleItem[] = [];
  MODULES_CONFIG.forEach(cat => all.push(...cat.items));
  all.push(...ADMIN_MODULES);
  return all;
};
