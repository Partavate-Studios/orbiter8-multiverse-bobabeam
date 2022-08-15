<script setup lang="ts">
import Splash from './components/01.Splash.vue'
import About from './components/02.AboutOrbiter8.vue'
import NetworkSelect from './components/03.NetworkSelect.vue'

import Play from './components/04.Play.vue'

import { useRouting } from './stores/routing'
const routing = useRouting()
</script>

<template>
  <Splash v-if="routing.isScreen('splash')"/>
  <About v-if="routing.isScreen('about')" />
  <NetworkSelect v-if="routing.isScreen('network')"/>
  <Play v-if="routing.isScreen('play')"/>
</template>

<style lang="scss">
body {
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');
  font-family: 'Ubuntu', sans-serif;
  background: var(--color-bg);
  color: var(--color-light);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
}
.canclick:hover {
  cursor: pointer;
}
</style>


<style lang="scss">
//Default Theme
:root {
  --color-bg: #000000;
  --color-text: #ffffff;
  --color-btn-text: #000000;
}

//Orbiter 8 Theme
[data-theme="orbiter8"] {
  --color-bg: #310e5c;
  --color-light: #c3b3da;
  --color-btn: #ffffff;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
