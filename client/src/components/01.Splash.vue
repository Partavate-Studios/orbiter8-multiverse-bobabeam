<script setup lang="ts">
import htmlContainer from './layouts/htmlContainer.vue'
import { useRouting } from '../stores/routing'
const routing = useRouting()
</script>

<template>
  <htmlContainer>
    <h1>Orbiter 8 Multiverse Demo</h1>
    <p>
       Every network is a universe
    </p>
    <p>
       Together they are the multiverse
    </p>
    <p>
      <button @click="routing.switchScreen('about')">Begin the Experience</button>
    </p>
  </htmlContainer>
</template>

<style scoped>
</style>
