<template>
  <ion-app>
    <!-- Guest Layout für Login/Register -->
    <guest-layout v-if="isGuestRoute">
      <router-view />
    </guest-layout>
    
    <!-- Authenticated Layout für alle anderen Routen -->
    <authenticated-layout v-else-if="isAuthenticatedRoute">
      <router-view />
    </authenticated-layout>
    
    <!-- Fallback für unbekannte Routen -->
    <router-view v-else />
  </ion-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonApp } from '@ionic/vue';
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue';
import GuestLayout from './layouts/GuestLayout.vue';

const route = useRoute();

const isGuestRoute = computed(() => {
  const guestRoutes = ['/login', '/register'];
  return guestRoutes.includes(route.path);
});

const isAuthenticatedRoute = computed(() => {
  const authRoutes = ['/home', '/dashboard', '/settings'];
  return authRoutes.includes(route.path);
});
</script>
