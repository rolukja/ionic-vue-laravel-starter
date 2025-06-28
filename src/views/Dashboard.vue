<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Dashboard Overview</ion-card-title>
          <ion-card-subtitle>Manage your data and content</ion-card-subtitle>
        </ion-card-header>
        
        <ion-card-content>
          <p>This is your main dashboard where you can access various features.</p>
          <p>Customize this area based on your application needs.</p>
          
          <ion-button expand="block" fill="outline">
            <ion-icon slot="start" :icon="addOutline"></ion-icon>
            Add New Item
          </ion-button>
        </ion-card-content>
      </ion-card>
      
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Statistics</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="stat-item">
                  <h2>25</h2>
                  <p>Total Items</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Activity</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="stat-item">
                  <h2>12</h2>
                  <p>This Week</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
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
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
</script>

<style scoped>
.stat-item {
  text-align: center;
}

.stat-item h2 {
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