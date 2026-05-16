import React, { useState, useEffect, Suspense, lazy } from 'react';
import ModuleNexusAI from './components/ModuleNexusAI';
import Layout from './components/Layout';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import InstitutionalSite from './components/InstitutionalSite';
import AboutUs from './components/AboutUs';
import { PublicPortal } from './components/PublicPortal';

const ModuleEssentialTools = lazy(() => import('./components/ModuleEssentialTools'));
const ModuleAvatarJourney = lazy(() => import('./components/ModuleAvatarJourney'));
const DashboardWinf = lazy(() => import('./components/DashboardWinf'));
const DashboardWinfCoin = lazy(() => import('./components/DashboardWinfCoin'));
const DashboardArchitect = lazy(() => import('./components/DashboardArchitect'));
const SalesFunnel = lazy(() => import('./components/SalesFunnel'));
const WarrantySystem = lazy(() => import('./components/WarrantySystem'));
const ModulesList = lazy(() => import('./components/ModulesList'));
const ModuleEcoTech = lazy(() => import('./components/ModuleEcoTech'));
const ModuleFaceCar = lazy(() => import('./components/ModuleFaceCar'));
const ModuleGridInstagram = lazy(() => import('./components/ModuleGridInstagram'));
const ModuleCrossPlatform = lazy(() => import('./components/ModuleCrossPlatform'));
const ModuleNeuroMesh = lazy(() => import('./components/ModuleNeuroMesh'));
const ModuleCaptureSystem = lazy(() => import('./components/ModuleCaptureSystem'));
const ModuleMemberManagement = lazy(() => import('./components/ModuleMemberManagement'));
const ModuleSynthwave = lazy(() => import('./components/ModuleSynthwave'));
const ModuleUniversoDark = lazy(() => import('./components/ModuleUniversoDark'));
const ModuleWarp = lazy(() => import('./components/ModuleWarp'));
const ModuleConcierge = lazy(() => import('./components/ModuleConcierge'));
const ModuleDataCore = lazy(() => import('./components/ModuleDataCore'));
const ModuleAcademy = lazy(() => import('./components/ModuleAcademy'));
const ModulePriceTable = lazy(() => import('./components/ModulePriceTable'));
const ModuleQuotes = lazy(() => import('./components/ModuleQuotes'));
const ModuleArsenal = lazy(() => import('./components/ModuleArsenal'));
const ModuleWinfPrecision = lazy(() => import('./components/ModuleWinfPrecision'));
const ModuleStock = lazy(() => import('./components/ModuleStock'));
const ModuleTheBoard = lazy(() => import('./components/ModuleTheBoard'));
const ModuleConnect = lazy(() => import('./components/ModuleConnect'));
const ModuleConsultancyLink = lazy(() => import('./components/ModuleConsultancyLink'));
const ModuleFAQ = lazy(() => import('./components/ModuleFAQ'));
const ModuleProducts = lazy(() => import('./components/ModuleProducts'));
const ModuleBlackshop = lazy(() => import('./components/ModuleBlackshop'));
const ModuleWinfChain = lazy(() => import('./components/ModuleWinfChain'));
const ModuleBlackshopAdmin = lazy(() => import('./components/ModuleBlackshopAdmin'));
const ModuleInstallations = lazy(() => import('./components/ModuleInstallations'));
const ModuleWarranties = lazy(() => import('./components/ModuleWarranties'));
const CertificateViewer = lazy(() => import('./components/CertificateViewer'));
const ProductsCatalog = lazy(() => import('./components/ProductsCatalog'));
const ModuleCoreAI = lazy(() => import('./components/ModuleCoreAI'));
const ModuleWinfBrain = lazy(() => import('./components/ModuleWinfBrain'));
const ModuleMarketingAI = lazy(() => import('./components/ModuleMarketingAI'));
const ModuleWinfWorld = lazy(() => import('./components/ModuleWinfWorld'));
const ModuleControlRoom = lazy(() => import('./components/ModuleControlRoom'));
const PublicConsultancy = lazy(() => import('./components/PublicConsultancy'));
const PublicConsultancyEntrance = lazy(() => import('./components/PublicConsultancyEntrance'));
const MemberOnePage = lazy(() => import('./components/MemberOnePage')); 
const LandingAssetLight = lazy(() => import('./components/LandingAssetLight'));
const LandingPartnersCorporate = lazy(() => import('./components/LandingPartnersCorporate'));
const LandingKiosk = lazy(() => import('./components/LandingKiosk'));
const LandingStudio = lazy(() => import('./components/LandingStudio'));
const LandingGallery = lazy(() => import('./components/LandingGallery'));
const LandingUniversoDark = lazy(() => import('./components/LandingUniversoDark'));
const AccessForm = lazy(() => import('./components/AccessForm'));
const ModuleFinancial = lazy(() => import('./components/ModuleFinancial'));
const ModuleMissionControl = lazy(() => import('./components/ModuleMissionControl'));
const ModuleTasks = lazy(() => import('./components/ModuleTasks'));
const ModuleWhatsAppHub = lazy(() => import('./components/ModuleWhatsAppHub'));
const ModuleNeuralBridge = lazy(() => import('./components/ModuleNeuralBridge'));
const ModuleIntegrations = lazy(() => import('./components/ModuleIntegrations'));
const ModuleNeuroParadox = lazy(() => import('./components/ModuleNeuroParadox'));
const ModuleNeuralFlow = lazy(() => import('./components/ModuleNeuralFlow'));
const ModuleSquadPerformance = lazy(() => import('./components/ModuleSquadPerformance'));
const ModuleArchitecturalPro = lazy(() => import('./components/ModuleArchitecturalPro'));
const ModuleEscape3D = lazy(() => import('./components/ModuleEscape3D'));
const ModuleBiometricInvite = lazy(() => import('./components/ModuleBiometricInvite'));
const ModuleKioskMode = lazy(() => import('./components/ModuleKioskMode'));
const DashboardWRank = lazy(() => import('./components/DashboardWRank'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const ModuleMolecularTwin = lazy(() => import('./components/ModuleMolecularTwin'));
const ModuleDigitalStart = lazy(() => import('./components/ModuleDigitalStart'));
const ModuleShopCore = lazy(() => import('./components/ModuleShopCore'));
const ArchitectRegistration = lazy(() => import('./components/ArchitectRegistration'));

import { ViewState, ChartDataPoint } from './types';
import { useWinf } from './contexts/WinfContext';
import { PRODUCT_CATALOG } from './data/productCatalogData';
import { logPageView } from './lib/analytics';
import LandingProductLayout from './components/LandingProductLayout';
import LandingAeroCore from './components/LandingAeroCore';
import LandingNeoskin from './components/LandingNeoskin';
import LandingBriefing from './components/LandingBriefing';

const ModuleCuidarConectar = lazy(() => import('./components/ModuleCuidarConectar'));
const WinfBrandLanding = lazy(() => import('./components/WinfBrandLanding'));
const LandingSynthwave = lazy(() => import('./components/LandingSynthwave'));
const ModuleBrandShowcase = lazy(() => import('./components/ModuleBrandShowcase'));

const CHART_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 4000, secondary: 2400 },
  { name: 'Fev', value: 3000, secondary: 1398 },
  { name: 'Mar', value: 2000, secondary: 9800 },
  { name: 'Abr', value: 2780, secondary: 3908 },
  { name: 'Mai', value: 1890, secondary: 4800 },
  { name: 'Jun', value: 2390, secondary: 3800 },
  { name: 'Jul', value: 3490, secondary: 4300 },
];

const DEMO_MODE = process.env.DEMO_MODE === 'true';

import SecurityGate from './components/SecurityGate';

const App: React.FC = () => {
  const { user, isAuthenticated, logout, notification, closeNotification, gamify, updateUserCoins, loginAsPrototype, effectiveRole } = useWinf();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD_WINF);
  const [navigationStack, setNavigationStack] = useState<ViewState[]>([]);
  const [selectedInstallationId, setSelectedInstallationId] = useState<string | undefined>();
  const [currentMarketingView, setCurrentMarketingView] = useState<ViewState | null>(DEMO_MODE ? null : ViewState.LANDING_BRIEFING);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [returnToMenu, setReturnToMenu] = useState(false);

  // States to catch external unit data via URL
  const [externalPartnerName, setExternalPartnerName] = useState<string | undefined>();
  const [externalPartnerPhone, setExternalPartnerPhone] = useState<string | undefined>();

  useEffect(() => {
    // Check for "Smart Links" routing when clients click an Ad link
    const searchParams = new URLSearchParams(window.location.search);
    const flow = searchParams.get('flow');
    const smartPhone = searchParams.get('phone');
    const smartName = searchParams.get('name');

    if (smartPhone) {
      setExternalPartnerPhone(smartPhone);
    }
    if (smartName) {
      setExternalPartnerName(smartName);
    }

    if (flow === 'smart' || smartPhone) {
      // If the link explicitly says it's a smart flow, bypass the Briefing and go straight to the Entrance Page.
      setCurrentMarketingView(ViewState.PUBLIC_CONSULTANCY_ENTRANCE);
      // Clean up URL to look professional
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Basic Deep Linking for Shared Products
    const path = window.location.pathname;
    if (path.startsWith('/produto/')) {
      const slug = path.split('/produto/')[1];
      // Convert slug back to product ID if needed or search by name
      const product = PRODUCT_CATALOG.find(p => p.id.toLowerCase().replace(/\s+/g, '-') === slug);
      if (product) {
        setSelectedProductId(product.id);
        setCurrentMarketingView(ViewState.PRODUCT_LANDING);
      }
    }
  }, []);

  const handleNavigate = (view: ViewState) => {
    if (view === ViewState.DASHBOARD_WINF || view === ViewState.DASHBOARD_ARCHITECT) {
      setNavigationStack([]);
    } else if (view !== currentView) {
      setNavigationStack(prev => [...prev, currentView]);
    }
    setCurrentView(view);
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const prev = navigationStack[navigationStack.length - 1];
      setNavigationStack(prevStack => prevStack.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView(isArchitect ? ViewState.DASHBOARD_ARCHITECT : ViewState.DASHBOARD_WINF);
    }
  };

  const isArchitect = (user?.role?.toLowerCase() === 'architect' || user?.role?.toLowerCase() === 'arquiteto');

  const getBackView = () => {
    if (navigationStack.length > 0) {
      return navigationStack[navigationStack.length - 1];
    }
    if (isArchitect) return ViewState.DASHBOARD_ARCHITECT;
    return ViewState.MODULES;
  };

  useEffect(() => {
    // Handle public certificate route
    const path = window.location.pathname;
    if (path.startsWith('/certificate/')) {
      const id = path.split('/').pop();
      if (id) {
        setSelectedInstallationId(id);
        setCurrentView(ViewState.CERTIFICATE_VIEWER);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      logPageView(currentView);
    } else if (currentMarketingView) {
      logPageView(currentMarketingView);
    } else { 
      logPageView(ViewState.LOGIN);
    }
  }, [currentView, isAuthenticated, currentMarketingView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentMarketingView, currentView]);

  const handleRedeem = (cost: number, item: string) => {
    if (user && user.winfCoins >= cost) {
       updateUserCoins(-cost, `Resgate: ${item}`, 0);
    } else {
       alert("Saldo insuficiente");
    }
  };

  const handleEnterApp = () => {
    setCurrentMarketingView(ViewState.LOGIN);
  };

  const handleNavigateToMarketingPage = (view: ViewState, options?: { menuOpen?: boolean }) => {
    setReturnToMenu(options?.menuOpen || false);
    setCurrentMarketingView(view);
  };

  const handleBackFromMarketing = () => {
    setCurrentMarketingView(returnToMenu ? ViewState.LANDING_PAGE_MENU : ViewState.LANDING_PAGE);
  };

  const renderContent = () => {
    if (!user && isAuthenticated) {
      return (
        <div className="min-h-screen bg-winf-background flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-none animate-spin"></div>
        </div>
      ); 
    }
    
    switch (currentView) {
      case ViewState.INSTITUTIONAL_SITE:
        return <InstitutionalSite territory={user?.territory || 'Santos'} onBack={() => handleNavigate(ViewState.MODULE_ARSENAL)} onNavigateToAccess={(view) => handleNavigate((view as ViewState) || ViewState.PROFILE)} onNavigateToCatalog={() => handleNavigate(ViewState.PRODUCTS_CATALOG)} />;
      case ViewState.ABOUT_US:
        return <AboutUs onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.PUBLIC_CONSULTANCY:
        return <PublicConsultancy partnerName={user?.name} partnerPhone={user?.phone} onBack={() => handleNavigate(ViewState.MODULE_CONSULTANCY_LINK)} onAccessSystem={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.MODULE_CONSULTANCY_LINK:
        return <ModuleConsultancyLink user={user} onBack={handleBack} onOpenConsultancy={() => handleNavigate(ViewState.PUBLIC_CONSULTANCY)} />;
      case ViewState.MODULE_WINF_CUT:
        return <ModuleWinfPrecision onBack={handleBack} />;
      case ViewState.MODULE_STOCK:
        return <ModuleStock onBack={handleBack} />;
      case ViewState.MODULE_THE_BOARD:
        return <ModuleTheBoard onBack={handleBack} />;
      case ViewState.MODULE_FINANCIAL:
        return <ModuleFinancial onBack={handleBack} />;
      case ViewState.MODULE_MISSION_CONTROL:
        return <ModuleMissionControl />;
      case ViewState.MODULE_TASKS:
        return <ModuleTasks onBack={handleBack} />;
      case ViewState.MODULE_WHATSAPP_HUB:
        return <ModuleWhatsAppHub />;
      case ViewState.MODULE_INTEGRATIONS:
        return <ModuleIntegrations />;
      case ViewState.MODULE_NEURAL_BRIDGE:
        return <ModuleNeuralBridge />;
      case ViewState.MODULE_NEURO_PARADOX:
        return <ModuleNeuroParadox onBack={handleBack} />;
      case ViewState.MODULE_NEURAL_FLOW:
        return <ModuleNeuralFlow onBack={handleBack} />;
      case ViewState.MODULE_SQUAD_PERFORMANCE:
        return <ModuleSquadPerformance onBack={handleBack} />;
      case ViewState.MODULE_ARCHITECTURAL:
        return <ModuleArchitecturalPro onBack={handleBack} />;
      case ViewState.MODULE_ESCAPE_3D:
        return <ModuleEscape3D onBack={handleBack} onGamificationAction={() => {}} />;
      case ViewState.MODULE_BIOMETRIC:
        return <ModuleBiometricInvite onBack={handleBack} />;
      case ViewState.MODULE_KIOSK_MODE:
        return <ModuleKioskMode onBack={handleBack} />;
      case ViewState.BRAND_SHOWROOM:
        return <ModuleBrandShowcase onBack={handleBack} />;
      case ViewState.MODULE_ACADEMY:
        return <ModuleAcademy onNavigate={handleNavigate} />;
      case ViewState.MODULE_SYNTHWAVE:
        return <ModuleSynthwave onBack={handleBack} />;
      case ViewState.MODULE_CONNECT:
        return <ModuleConnect onBack={handleBack} />;
      case ViewState.DASHBOARD_WINF:
        return <DashboardWinf data={CHART_DATA} user={user!} onChangeView={handleNavigate} />;
      // Fix: Add W_RANK case
      case ViewState.W_RANK:
        return <DashboardWRank />;
      case ViewState.MODULE_ARSENAL:
        return <ModuleArsenal onBack={handleBack} onNavigate={handleNavigate} />;
      case ViewState.SALES_FUNNEL:
        return <SalesFunnel user={user!} />;
      case ViewState.WARRANTY:
        return <WarrantySystem onBack={handleBack} />;
      case ViewState.MODULE_CAPTURE:
        return <ModuleCaptureSystem onBack={handleBack} />;
      case ViewState.MODULE_NEUROMESH:
        return <ModuleNeuroMesh onBack={handleBack} />;
      case ViewState.MODULES:
        return <ModulesList onNavigate={handleNavigate} userRole={user?.role} />;
      case ViewState.PROFILE:
        return <MemberOnePage user={user!} onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.DASHBOARD_WINFCOIN:
        return <DashboardWinfCoin user={user!} onRedeem={handleRedeem} />;
      case ViewState.MODULE_DATA_CORE:
        return <ModuleDataCore onBack={handleBack} />;
      case ViewState.MODULE_QUOTES:
        return <ModuleQuotes onBack={handleBack} onNavigate={handleNavigate} />;
      case ViewState.MODULE_PRICE_TABLE:
        return <ModulePriceTable onBack={handleBack} />;
      case ViewState.MODULE_FAQ:
        return <ModuleFAQ onBack={handleBack} />;
      case ViewState.MODULE_BLACKSHOP_ADMIN:
        return <SecurityGate level="CONFIDENTIAL" onDecline={handleBack}><ModuleBlackshopAdmin /></SecurityGate>;
      case ViewState.MODULE_BLACKSHOP:
        return <SecurityGate level="RESTRICTED" onDecline={handleBack}><ModuleBlackshop onBack={handleBack} onNavigateToChain={() => setCurrentView(ViewState.MODULE_WINF_CHAIN)} /></SecurityGate>;
      case ViewState.MODULE_WINF_CHAIN:
        return <SecurityGate level="RESTRICTED" onDecline={handleBack}><ModuleWinfChain onBack={handleBack} /></SecurityGate>;
      case ViewState.MODULE_PRODUCTS:
        return <ModuleProducts />;
      case ViewState.MODULE_INSTALLATIONS:
        return <SecurityGate level="RESTRICTED" onDecline={handleBack}><ModuleInstallations onBack={handleBack} /></SecurityGate>;
      case ViewState.MODULE_WARRANTIES:
        return <SecurityGate level="RESTRICTED" onDecline={handleBack}><ModuleWarranties onBack={handleBack} /></SecurityGate>;
      case ViewState.DASHBOARD_ARCHITECT:
        return <SecurityGate level="STANDARD" onDecline={handleBack}><DashboardArchitect onChangeView={handleNavigate} /></SecurityGate>;
      case ViewState.MODULE_NEXUS_AI:
        return <ModuleNexusAI />;
      case ViewState.MODULE_CORE_AI:
        return <SecurityGate level="RESTRICTED" onDecline={handleBack}><ModuleCoreAI /></SecurityGate>;
      case ViewState.MODULE_WINF_BRAIN:
        return <ModuleWinfBrain />;
      case ViewState.MODULE_WINF_WORLD:
        return <ModuleWinfWorld />;
      case ViewState.MODULE_MARKETING_AI:
        return <ModuleMarketingAI />;
      case ViewState.MODULE_CONTROL_ROOM:
        return <SecurityGate level="CONFIDENTIAL" onDecline={handleBack}><ModuleControlRoom /></SecurityGate>;
      case ViewState.MODULE_ESSENTIAL_TOOLS:
        return <ModuleEssentialTools onBack={handleBack} onNavigate={handleNavigate} />;
      case ViewState.MODULE_AVATAR_JOURNEY:
        return <ModuleAvatarJourney onBack={handleBack} onNavigate={handleNavigate} />;
      case ViewState.PUBLIC_PORTAL:
        return <PublicPortal onBack={() => handleNavigate(ViewState.MODULE_ARSENAL)} onNavigateToLogin={() => handleNavigate(ViewState.PROFILE)} onNavigateToCatalog={() => handleNavigate(ViewState.PRODUCTS_CATALOG)} />;
      case ViewState.CERTIFICATE_VIEWER:
        return <CertificateViewer id={selectedInstallationId} />;
      case ViewState.PRODUCTS_CATALOG:
        return <ProductsCatalog onBack={handleBack} onSelectProduct={(id) => {
          setSelectedProductId(id);
          handleNavigate(ViewState.PRODUCT_LANDING);
        }} />;
      case ViewState.PRODUCT_LANDING:
        if (selectedProductId) {
          const product = PRODUCT_CATALOG.find((p: any) => p.id === selectedProductId);
          if (product) {
            return <LandingProductLayout product={product} onBack={handleBack} />;
          }
        }
        return <ProductsCatalog onBack={handleBack} />;
      case ViewState.SEARCH:
        return <GlobalSearch onClose={() => handleBack()} onNavigate={handleNavigate} />;
      case ViewState.ADMIN_PANEL:
        return <AdminPanel onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.MODULE_MOLECULAR_TWIN:
        return <ModuleMolecularTwin onBack={handleBack} />;
      case ViewState.MODULE_CUIDAR_CONECTAR:
        return <ModuleCuidarConectar onBack={handleBack} />;
      case ViewState.MODULE_DIGITAL_START:
        return <ModuleDigitalStart onBack={handleBack} onNavigate={handleNavigate} />;
      case ViewState.MODULE_SHOP_CORE:
        return <ModuleShopCore onBack={handleBack} />;
      default:
        return <DashboardWinf data={CHART_DATA} user={user!} onChangeView={handleNavigate} />;
    }
  };

  if (currentView === ViewState.CERTIFICATE_VIEWER) {
    return <CertificateViewer id={selectedInstallationId} />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-winf-background flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-none animate-spin"></div>
        </div>
      }>
        {currentMarketingView === ViewState.LOGIN && <Login onNavigate={(view) => setCurrentView(view)} />}
        {currentMarketingView === ViewState.LANDING_ASSET_LIGHT && (
          <LandingAssetLight onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.LANDING_PARTNERS_CORPORATE && (
          <LandingPartnersCorporate onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.LANDING_KIOSK && (
          <LandingKiosk onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.LANDING_STUDIO && (
          <LandingStudio onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.LANDING_AEROCORE && (
          <LandingAeroCore 
            onBack={handleBackFromMarketing} 
            onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)} 
            onNavigateToNeoskin={() => setCurrentMarketingView(ViewState.LANDING_NEOSKIN)}
          />
        )}
        {currentMarketingView === ViewState.LANDING_NEOSKIN && (
          <LandingNeoskin onBack={handleBackFromMarketing} onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)} />
        )}
        {currentMarketingView === ViewState.LANDING_BRIEFING && (
          <LandingBriefing 
            onEnter={() => setCurrentMarketingView(ViewState.LANDING_PAGE)}
            onNavigateShowroom={() => setCurrentMarketingView(ViewState.BRAND_SHOWROOM)}
            onNavigateUniversoDark={() => setCurrentMarketingView(ViewState.LANDING_UNIVERSO_DARK)}
            onNavigatePublicConsultancy={() => setCurrentMarketingView(ViewState.PUBLIC_CONSULTANCY_ENTRANCE)}
            onNavigateManual={() => setCurrentMarketingView(ViewState.BRAND_MANUAL)}
          />
        )}
        {currentMarketingView === ViewState.PUBLIC_CONSULTANCY_ENTRANCE && (
          <PublicConsultancyEntrance 
            onEnterExperiences={() => setCurrentMarketingView(ViewState.PUBLIC_CONSULTANCY)} 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_BRIEFING)} 
          />
        )}
        {currentMarketingView === ViewState.ARCHITECT_REGISTRATION && (
          <ArchitectRegistration onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.ACCESS_FORM && (
          <AccessForm 
            onBack={handleBackFromMarketing} 
            onSuccess={() => {
              loginAsPrototype();
              setCurrentMarketingView(null);
              setCurrentView(ViewState.MODULES);
            }}
          />
        )}
        {currentMarketingView === ViewState.INSTITUTIONAL_SITE && <InstitutionalSite onBack={handleBackFromMarketing} onNavigateToAccess={(view) => setCurrentMarketingView((view as ViewState) || ViewState.ACCESS_FORM)} onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)} onSelectProduct={(id) => { setSelectedProductId(id); setCurrentMarketingView(ViewState.PRODUCT_LANDING); }} />}
        {currentMarketingView === ViewState.WINF_BRAND_LANDING && <WinfBrandLanding onEnter={handleEnterApp} onBack={handleBackFromMarketing} onNavigateToSynthwave={() => setCurrentMarketingView(ViewState.LANDING_SYNTHWAVE)} />}
        {currentMarketingView === ViewState.LANDING_SYNTHWAVE && <LandingSynthwave onEnter={() => setCurrentMarketingView(ViewState.MODULE_SYNTHWAVE)} onBack={handleBackFromMarketing} />}
        {currentMarketingView === ViewState.MODULE_SYNTHWAVE && <ModuleSynthwave onBack={() => setCurrentMarketingView(ViewState.LANDING_SYNTHWAVE)} />}
        {currentMarketingView === ViewState.ABOUT_US && <AboutUs onBack={handleBackFromMarketing} />}
        {currentMarketingView === ViewState.LANDING_GALLERY && <LandingGallery onBack={handleBackFromMarketing} />}
        {currentMarketingView === ViewState.PUBLIC_CONSULTANCY && <PublicConsultancy partnerName={externalPartnerName} partnerPhone={externalPartnerPhone} onBack={handleBackFromMarketing} onAccessSystem={() => setCurrentMarketingView(ViewState.LOGIN)} />}
        {currentMarketingView === ViewState.PUBLIC_PORTAL && (
          <PublicPortal 
            onBack={handleBackFromMarketing} 
            onNavigateToLogin={() => setCurrentMarketingView(ViewState.LOGIN)}
            onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)}
          />
        )}
        {currentMarketingView === ViewState.PRODUCTS_CATALOG && (
          <ProductsCatalog 
            onBack={handleBackFromMarketing} 
            onSelectProduct={(id) => {
              setSelectedProductId(id);
              setCurrentMarketingView(ViewState.PRODUCT_LANDING);
            }}
          />
        )}
        {currentMarketingView === ViewState.PRODUCT_LANDING && selectedProductId && (
          <LandingProductLayout 
            product={PRODUCT_CATALOG.find(p => p.id === selectedProductId)!}
            onBack={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)}
          />
        )}
        {currentMarketingView === ViewState.BRAND_SHOWROOM && (
          <ModuleBrandShowcase onBack={handleBackFromMarketing} />
        )}
        {currentMarketingView === ViewState.LANDING_UNIVERSO_DARK && (
          <LandingUniversoDark 
             onBack={() => {
                if (returnToMenu) {
                   setCurrentMarketingView(ViewState.LANDING_PAGE_MENU);
                } else {
                   setCurrentMarketingView(ViewState.LANDING_BRIEFING);
                }
             }} 
             onEnterRestricted={() => setCurrentMarketingView(ViewState.MODULE_UNIVERSO_DARK)} 
          />
        )}
        {currentMarketingView === ViewState.MODULE_UNIVERSO_DARK && (
          <ModuleUniversoDark onBack={() => setCurrentMarketingView(ViewState.LANDING_UNIVERSO_DARK)} />
        )}

        {!currentMarketingView ? (
          <WinfBrandLanding onEnter={handleEnterApp} onNavigateToSynthwave={() => setCurrentMarketingView(ViewState.LANDING_SYNTHWAVE)} />
        ) : currentMarketingView === ViewState.LANDING_PAGE || currentMarketingView === ViewState.LANDING_PAGE_MENU ? (
          <LandingPage onEnter={handleEnterApp} onNavigateToMarketingPage={handleNavigateToMarketingPage} defaultMenuOpen={currentMarketingView === ViewState.LANDING_PAGE_MENU} />
        ) : null}

      </Suspense>
    );
  }

  // Se estiver em modo Kiosk ou Site Institucional (quando logado), remove o Layout para ser Fullscreen
  if (currentView === ViewState.MODULE_KIOSK_MODE || currentView === ViewState.BRAND_SHOWROOM || currentView === ViewState.INSTITUTIONAL_SITE || currentView === ViewState.PUBLIC_CONSULTANCY || currentView === ViewState.PUBLIC_PORTAL) {
      return (
        <Suspense fallback={
          <div className="min-h-screen bg-winf-background flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-none animate-spin"></div>
          </div>
        }>
          <div className="bg-black min-h-screen text-white">
              {renderContent()}
          </div>
        </Suspense>
      );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-winf-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-none animate-spin"></div>
      </div>
    }>
      <Layout 
        currentView={currentView}
        onChangeView={handleNavigate}
        onBack={handleBack}
        user={user}
        onLogout={logout}
        notification={notification}
        onCloseNotification={closeNotification}
      >
        {renderContent()}
      </Layout>
    </Suspense>
  );
};

export default App;
