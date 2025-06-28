import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';

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


// Konfiguriere Axios für Laravel Sail (stateless)
axios.defaults.baseURL = 'http://localhost'; // Laravel Sail läuft normalerweise auf Port 80
// axios.defaults.withCredentials = true; // Nicht benötigt für stateless Bearer-Token

// Füge Interceptor hinzu um Auth-Token zu jeder Anfrage hinzuzufügen
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
