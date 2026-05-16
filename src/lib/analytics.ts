
// Google Analytics 4 Utility

// Substitua pelo seu ID de Medida do GA4
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Log a Page View (Virtual for SPA)
export const logPageView = (page_path: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: `/${page_path.toLowerCase()}`,
    });
  }
};

// Log a specific event (e.g., generate_lead, purchase, login)
export const logEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};

// Specific helper for Lead Generation
export const logLeadGeneration = (details: { source: string; interest: string; value?: number }) => {
  logEvent('generate_lead', {
    currency: 'BRL',
    value: details.value || 0,
    lead_source: details.source,
    lead_interest: details.interest
  });
};
