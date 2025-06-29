<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const result = ref<string>('Noch nichts getestet');

const ping = async () => {
  result.value = '⏳ … lade';
  try {
    const r = await axios.get(getApiUrl('/api/ping'));
    result.value = '✅ ' + JSON.stringify(r.data);
  } catch (e: any) {
    result.value = '❌ ' + (e.message ?? 'Fehler');
  }
};
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-button expand="block" @click="ping">Backend pingen</ion-button>
      <pre style="white-space:pre-wrap">{{ result }}</pre>
    </ion-content>
  </ion-page>
</template>