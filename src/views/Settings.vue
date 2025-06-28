<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-list>
        <ion-list-header>
          <ion-label>Account Settings</ion-label>
        </ion-list-header>
        
        <ion-item v-if="user">
          <ion-label>
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </ion-label>
        </ion-item>
        
        <ion-item button>
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          <ion-label>Edit Profile</ion-label>
        </ion-item>
        
        <ion-item button>
          <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
      </ion-list>
      
      <ion-list>
        <ion-list-header>
          <ion-label>App Settings</ion-label>
        </ion-list-header>
        
        <ion-item>
          <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
          <ion-label>Notifications</ion-label>
          <ion-toggle slot="end"></ion-toggle>
        </ion-item>
        
        <ion-item>
          <ion-icon :icon="moonOutline" slot="start"></ion-icon>
          <ion-label>Dark Mode</ion-label>
          <ion-toggle slot="end"></ion-toggle>
        </ion-item>
        
        <ion-item>
          <ion-icon :icon="languageOutline" slot="start"></ion-icon>
          <ion-label>Language</ion-label>
          <ion-select value="en" interface="popover">
            <ion-select-option value="en">English</ion-select-option>
            <ion-select-option value="de">Deutsch</ion-select-option>
            <ion-select-option value="fr">Français</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      
      <ion-list>
        <ion-list-header>
          <ion-label>Support</ion-label>
        </ion-list-header>
        
        <ion-item button>
          <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
          <ion-label>Help & Support</ion-label>
        </ion-item>
        
        <ion-item button>
          <ion-icon :icon="informationCircleOutline" slot="start"></ion-icon>
          <ion-label>About</ion-label>
        </ion-item>
        
        <ion-item button>
          <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
          <ion-label>Privacy Policy</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonToggle,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import {
  personOutline,
  lockClosedOutline,
  notificationsOutline,
  moonOutline,
  languageOutline,
  helpCircleOutline,
  informationCircleOutline,
  documentTextOutline,
} from 'ionicons/icons';

const user = ref(null);

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    user.value = JSON.parse(userData);
  }
});
</script> 