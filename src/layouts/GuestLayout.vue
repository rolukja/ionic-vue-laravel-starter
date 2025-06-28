<template>
  <ion-router-outlet>
    <slot />
  </ion-router-outlet>
</template>

<script setup lang="ts">
import {
  IonRouterOutlet,
} from '@ionic/vue';
</script>

<style scoped>
ion-router-outlet {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

/* Optional: Füge hier weitere Styling für Guest-Layout hinzu */
.guest-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style> 