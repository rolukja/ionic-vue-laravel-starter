<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card v-if="user">
        <ion-card-header>
          <ion-card-title>Welcome, {{ user.name }}!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Email: {{ user.email }}</p>
          <ion-button expand="block" color="danger" @click="logout">Logout</ion-button>
        </ion-card-content>
      </ion-card>
      <ion-text color="danger" v-if="error">{{ error }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';

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
    IonCardContent,
    IonButton,
    IonText,
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

        const response = await axios.get('/api/user', {
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
    async logout() {
      try {
        const token = localStorage.getItem('auth_token');
        await axios.post('/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      } catch (error) {
        this.error = error.response?.data?.message || 'Logout failed';
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    },
  },
};
</script>