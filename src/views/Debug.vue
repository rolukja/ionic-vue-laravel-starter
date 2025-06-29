<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { API_CONFIG, getApiUrl } from '../config/api';
import { IonPage, IonContent, IonButton } from '@ionic/vue';

const result = ref<string>('Noch nichts getestet');

const showConfig = () => {
  result.value = `🔧 API Config:
baseURL: ${API_CONFIG.baseURL}
timeout: ${API_CONFIG.timeout}
debug: ${API_CONFIG.debug}

🌍 Environment:
PROD: ${import.meta.env.PROD}
VITE_API_BASE_URL: ${import.meta.env.VITE_API_BASE_URL}

📡 Full ping URL: ${getApiUrl('/api/ping')}`;
};

const ping = async () => {
  result.value = '⏳ Pinge Backend...';
  try {
    const startTime = Date.now();
    const response = await axios.get(getApiUrl('/api/ping'));
    const duration = Date.now() - startTime;
    
    result.value = `✅ SUCCESS (${duration}ms):
${JSON.stringify(response.data, null, 2)}

Status: ${response.status}
Headers: ${JSON.stringify(response.headers, null, 2)}`;
  } catch (error: any) {
    result.value = `❌ ERROR:
Message: ${error.message}
Code: ${error.code}
Response Status: ${error.response?.status}
Response Data: ${JSON.stringify(error.response?.data, null, 2)}
Config URL: ${error.config?.url}
Config BaseURL: ${error.config?.baseURL}`;
  }
};

const testDirectIP = async () => {
  result.value = '⏳ Teste direkte IP...';
  try {
    const response = await axios.get('http://46.232.248.112:85/api/ping');
    result.value = `✅ Direkte IP funktioniert: ${JSON.stringify(response.data)}`;
  } catch (error: any) {
    result.value = `❌ Direkte IP Fehler: ${error.message}`;
  }
};
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Debug-Seite</h1>
      
      <ion-button expand="block" @click="showConfig">
        Zeige Konfiguration
      </ion-button>
      
      <ion-button expand="block" @click="ping" color="primary">
        Backend pingen (über Config)
      </ion-button>
      
      <ion-button expand="block" @click="testDirectIP" color="secondary">
        Direkte IP testen
      </ion-button>
      
      <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
        <pre style="white-space: pre-wrap; font-size: 12px;">{{ result }}</pre>
      </div>
    </ion-content>
  </ion-page>
</template>