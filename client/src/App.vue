<script setup lang="ts">
import Splash from './components/01.Splash.vue'
import About from './components/02.AboutOrbiter8.vue'
import NetworkSelect from './components/03.NetworkSelect.vue'

import Configuration from './components/Configuration.vue'
import Settings from './components/Settings.vue'

import { useRouting } from './stores/routing'
const routing = useRouting()
</script>

<template>
  <Splash v-if="routing.isScreen('splash')"/>
  <NetworkSelect v-if="routing.isScreen('network')"/>
  <About v-if="routing.isScreen('about')" />

  <Settings v-if="routing.isScreen('settings')"/>
  <Configuration v-if="routing.isScreen('configuration')"/>
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
