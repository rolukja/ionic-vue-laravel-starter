// API-Konfiguration für das Laravel Backend

// Environment-basierte API-URLs
const getApiBaseUrl = () => {
  // IMMER die Environment-Variable verwenden, falls gesetzt
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('🌐 Using API URL from .env:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback: Produktionsumgebung
  if (import.meta.env.PROD) {
    console.log('🏭 Using production fallback API URL:', 'http://46.232.248.112:85');
    return 'http://46.232.248.112:85';
  }
  
  // Fallback: Entwicklungsumgebung
  console.log('🔧 Using development fallback API URL:', 'http://192.168.178.22');
  return 'http://192.168.178.22';
};

export const API_CONFIG = {
  // Backend URL aus Environment-Variable oder automatische Erkennung
  baseURL: getApiBaseUrl(),
  
  // Weitere API-Einstellungen
  timeout: 10000,
  withCredentials: false, // Für stateless Bearer-Token Authentication
  
  // Debug-Modus
  debug: import.meta.env.VITE_APP_DEBUG === 'true',
};

console.log('🚀 Final API Config:', API_CONFIG);

// Helper-Funktion um die vollständige API-URL zu erhalten
export const getApiUrl = (endpoint: string = '') => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// API-Endpunkte als Konstanten
export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  LOGOUT: '/api/logout',
  USER: '/api/user',
  CSRF_COOKIE: '/sanctum/csrf-cookie',
}; 