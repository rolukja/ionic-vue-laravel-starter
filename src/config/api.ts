// API-Konfiguration für das Laravel Backend

export const API_CONFIG = {
  // Backend URL aus Environment-Variable oder Fallback
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
  
  // Weitere API-Einstellungen
  timeout: 10000,
  withCredentials: false, // Für stateless Bearer-Token Authentication
  
  // Debug-Modus
  debug: import.meta.env.VITE_APP_DEBUG === 'true',
};

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