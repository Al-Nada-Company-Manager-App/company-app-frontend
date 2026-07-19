// Cross-platform abstraction for storing application settings like Backend URL

let currentBackendUrl = "";

export const getSyncBackendUrl = (): string => {
  return currentBackendUrl || import.meta.env.VITE_API_BASE_URL || "http://192.168.1.34:4000";
};

export const initBackendUrl = async (): Promise<void> => {
  currentBackendUrl = await getBackendUrl();
};

/**
 * Get the current backend API URL based on platform.
 * It follows this priority:
 * 1. Saved URL from platform storage
 * 2. Default API URL from environment variables
 */
export const getBackendUrl = async (): Promise<string> => {
  const defaultUrl = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.34:4000";
  
  try {
    // 1. Electron
    // @ts-ignore - Electron IPC injected via preload
    if (window.companyManager && window.companyManager.getBackendUrl) {
      // @ts-ignore
      const saved = await window.companyManager.getBackendUrl();
      return saved || defaultUrl;
    }

    // 2. Capacitor (Android)
    // @ts-ignore
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      const { Preferences } = await import('@capacitor/preferences');
      const { value } = await Preferences.get({ key: 'backendUrl' });
      return value || defaultUrl;
    }

    // 3. Web Fallback
    const saved = localStorage.getItem("backendUrl");
    return saved || defaultUrl;
  } catch (error) {
    console.error("Failed to get backend URL from storage:", error);
    return defaultUrl;
  }
};

/**
 * Save the backend API URL across platforms.
 */
export const setBackendUrl = async (url: string): Promise<void> => {
  try {
    // 1. Electron
    // @ts-ignore
    if (window.companyManager && window.companyManager.setBackendUrl) {
      // @ts-ignore
      await window.companyManager.setBackendUrl(url);
      return;
    }

    // 2. Capacitor (Android)
    // @ts-ignore
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
      const { Preferences } = await import('@capacitor/preferences');
      await Preferences.set({ key: 'backendUrl', value: url });
      return;
    }

    // 3. Web Fallback
    localStorage.setItem("backendUrl", url);
  } catch (error) {
    console.error("Failed to save backend URL to storage:", error);
  }
};
