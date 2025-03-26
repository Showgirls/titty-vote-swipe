
// Type definitions for Google Analytics gtag.js
interface Window {
  gtag: (
    command: 'event' | 'config' | 'set' | 'js' | 'consent',
    targetId: string,
    config?: Record<string, any> | null
  ) => void;
  dataLayer: any[];
}
