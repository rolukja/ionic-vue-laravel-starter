import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import { API_CONFIG } from './config/api';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


// Konfiguriere Axios mit dynamischer API-Konfiguration
axios.defaults.baseURL = API_CONFIG.baseURL;
axios.defaults.timeout = API_CONFIG.timeout;
// axios.defaults.withCredentials = API_CONFIG.withCredentials; // Nicht benötigt für stateless Bearer-Token

// Füge Interceptor hinzu um Auth-Token zu jeder Anfrage hinzuzufügen
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  
  return config;
});

// Response Interceptor für Debug-Logging
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (API_CONFIG.debug) {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  }
);

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
