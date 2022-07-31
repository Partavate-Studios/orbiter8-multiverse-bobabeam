<script setup lang="ts">
import { useUI } from '../../stores/ui'
import planets from '../assets/planets/planets.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
  data() {
    return {
      ui: useUI(),
      showMoons: true,
      showStation: true
    }
  },
  props: {
  },
  computed: {
    hMult() {
      if (this.ui.portrait) {
        return 1
      }
      return 2.5
    },
    vmult() {
      if (this.ui.landscape) {
        return 1
      }
      return 2.5
    },
    pScale() {
      return 1
    }
  }
}
</script>

<template>
<g>

  <g fill="freeze">

    <planets />

    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="translate"

      dur="3s"

      values="0 1000; 0 -20; 0 0"
      keyTimes="0; 0.25; 1"

      calcMode="linear"
      fill="freeze"
      repeatCount="1"
    />
  </g>

</g>
</template>

<style scoped>
</style>
