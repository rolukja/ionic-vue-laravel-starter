<script>
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { walletOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonIcon,
  },
  setup() {
    return {
      walletOutline,
    };
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
        this.error = null;
        
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
    <ion-content class="ion-padding" fullscreen>
      <div class="login-container">
        <div class="login-card">
          <div class="logo-section">
            <ion-icon :icon="walletOutline" class="logo-icon"></ion-icon>
            <h1>My App</h1>
            <p>Sign in to your account</p>
          </div>
          
          <div class="form-section">
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email" type="email" autocomplete="email"></ion-input>
            </ion-item>
            
            <ion-item lines="inset" class="input-item">
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password" autocomplete="current-password"></ion-input>
            </ion-item>
            
            <ion-button 
              expand="block" 
              @click="login" 
              class="login-button"
              :disabled="!email || !password"
            >
              Sign In
            </ion-button>
            
            <div class="register-link">
              <p>Don't have an account?</p>
              <ion-button fill="clear" router-link="/register">
                Create Account
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

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
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

.login-button {
  margin: 1.5rem 0 1rem 0;
  --border-radius: 12px;
  height: 50px;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link p {
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
  .login-card {
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

