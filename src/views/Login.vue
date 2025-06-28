<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // Sende Login-Anfrage direkt ohne CSRF-Cookie
        const response = await axios.post(API_ENDPOINTS.LOGIN, {
          email: this.email,
          password: this.password,
        });

        // Speichere Token (z. B. in localStorage oder Ionic Storage)
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Weiterleitung zur Home-Seite
        this.$router.push('/home');
      } catch (error) {
        this.error = error.response?.data?.error || 'Login failed';
        console.log('Login Error:', error.response?.data);
      }
    },
  },
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input v-model="email" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="login">Login</ion-button>
      <ion-button expand="block" router-link="/register">Register</ion-button>
      <ion-text color="danger" v-if="error">{{ error }}</ion-text>
    </ion-content>
  </ion-page>
</template>

