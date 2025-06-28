<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card v-if="user">
        <ion-card-header>
          <ion-card-title>Welcome, {{ user.name }}!</ion-card-title>
          <ion-card-subtitle>Your Personal Dashboard</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Welcome to your application.</p>
        </ion-card-content>
      </ion-card>
      
      <ion-text color="danger" v-if="error">{{ error }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle,
  IonCardContent, 
  IonButton, 
  IonText,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { gridOutline } from 'ionicons/icons';

const router = useRouter();
const user = ref<any>(null);
const error = ref<string | null>(null);

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      error.value = 'No auth token found';
      router.push('/login');
      return;
    }

    const response = await axios.get(API_ENDPOINTS.USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user.value = response.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch user';
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    router.push('/login');
  }
};

onMounted(async () => {
  await fetchUser();
});
</script>

<style scoped>
.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: var(--ion-color-primary);
}

.stat-item p {
  margin: 0;
  color: var(--ion-color-medium);
}
</style>