<template>
  <ion-page>
    <ion-content class="ion-padding" fullscreen>
      <div class="register-container">
        <div class="register-card">
          <div class="logo-section">
            <ion-icon :icon="walletOutline" class="logo-icon"></ion-icon>
            <h1>Join My App</h1>
            <p>Create your account</p>
          </div>
          
          <div class="form-section">
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Full Name</ion-label>
              <ion-input v-model="name" type="text" autocomplete="name"></ion-input>
            </ion-item>
            
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email" type="email" autocomplete="email"></ion-input>
            </ion-item>
            
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password" autocomplete="new-password"></ion-input>
            </ion-item>
            
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Confirm Password</ion-label>
              <ion-input v-model="password_confirmation" type="password" autocomplete="new-password"></ion-input>
            </ion-item>
            
            <ion-button 
              expand="block" 
              @click="register" 
              class="register-button"
              :disabled="!name || !email || !password || !password_confirmation"
            >
              Create Account
            </ion-button>
            
            <div class="login-link">
              <p>Already have an account?</p>
              <ion-button fill="clear" router-link="/login">
                Sign In
              </ion-button>
            </div>
            
            <ion-text color="danger" v-if="error" class="error-text">
              {{ error }}
            </ion-text>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { walletOutline } from 'ionicons/icons';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const error = ref<string | null>(null);

const register = async () => {
  try {
    error.value = null;
    
    // Sende Registrierungsanfrage direkt ohne CSRF-Cookie
    const response = await axios.post(API_ENDPOINTS.REGISTER, {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });

    // Speichere Token und Benutzerdaten
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    // Weiterleitung zur Home-Seite
    router.push('/home');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed';
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 4rem;
  color: var(--ion-color-primary);
  margin-bottom: 1rem;
}

.logo-section h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--ion-color-primary);
}

.logo-section p {
  color: var(--ion-color-medium);
  margin: 0;
}

.form-section {
  margin-top: 1rem;
}

.input-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  --background: rgba(255, 255, 255, 1);
  --color: var(--ion-color-dark);
  --placeholder-color: var(--ion-color-medium);
  --border-color: rgba(0, 0, 0, 0.1);
}

.input-item ion-label {
  color: var(--ion-color-medium) !important;
}

.input-item ion-input {
  --color: var(--ion-color-dark) !important;
  --placeholder-color: var(--ion-color-medium) !important;
}

.register-button {
  margin: 1.5rem 0 1rem 0;
  --border-radius: 12px;
  height: 50px;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link p {
  margin: 0;
  color: var(--ion-color-medium);
  font-size: 0.9rem;
}

.error-text {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 480px) {
  .register-card {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .logo-icon {
    font-size: 3rem;
  }
  
  .logo-section h1 {
    font-size: 1.8rem;
  }
}
</style>