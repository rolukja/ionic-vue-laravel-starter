<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Name</ion-label>
        <ion-input v-model="name" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input v-model="email" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Confirm Password</ion-label>
        <ion-input v-model="password_confirmation" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="register">Register</ion-button>
      <ion-button expand="block" router-link="/login">Back to Login</ion-button>
      <ion-text color="danger" v-if="error">{{ error }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';

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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        // Sende Registrierungsanfrage direkt ohne CSRF-Cookie
        const response = await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        // Speichere Token und Benutzerdaten
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Weiterleitung zur Home-Seite
        this.$router.push('/home');
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        console.log('Registration Error:', error.response?.data);
      }
    },
  },
};
</script>