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
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p>Welcome to your personal application dashboard.</p>
          
          <ion-button expand="block" router-link="/dashboard" fill="outline">
            <ion-icon slot="start" :icon="gridOutline"></ion-icon>
            Open Dashboard
          </ion-button>
        </ion-card-content>
      </ion-card>
      
      <ion-text color="danger" v-if="error">{{ error }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script>
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

export default {
  components: {
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
    IonCol,
  },
  setup() {
    return {
      gridOutline,
    };
  },
  data() {
    return {
      user: null,
      error: null,
    };
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          this.error = 'No auth token found';
          this.$router.push('/login');
          return;
        }

        const response = await axios.get(API_ENDPOINTS.USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.user = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch user';
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    },
  },
};
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