<script setup lang="ts">
import { useUI } from '../../stores/ui'
import btn from '../ui-primitives/button-basic.svg.vue'
import starfield from '../assets/starfield.svg.vue'
import portal from '../assets/portal.svg.vue'
import ship from '../assets/ship08.svg.vue'
import moonbeam from '../assets/moonbeam.svg.vue'
import boba from '../assets/boba.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next', 'finish'],
  data() {
    return {
      ui: useUI()
    }
  },
  props: {
  },
  computed: {
  }
}
</script>

<template>
<g>


  <g transform="translate(-150 100)">
    <circle
      r="100"
      stroke-dasharray="4 2"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#ccff00"
      fill-opacity="0" />
    <starfield :showLines="true"  transform="scale(0.15) rotate(-90)"/>
  </g>

  <g transform="translate(150 -100)">
    <circle
      r="100"
      stroke-dasharray="4 2"
      stroke-width="2.25"
      stroke-opacity="0.5"
      stroke="#E1177C"
      fill-opacity="0" />
    <starfield :showLines="true"  transform="scale(0.15) rotate(90)"/>
  </g>

  <line x1="-120" y1="35" x2="120" y2="-35" stroke="#ffff88" stroke-dasharray="2 2" />

  <g transform="translate(30 -8.75) scale(1.5) rotate(-104)">
    <ship :showEngines="true" />
  </g>

  <g transform="translate(-120 35) scale(0.4)">
    <portal />
  </g>

  <g transform="translate(120 -35) scale(0.3)">
    <portal />
  </g>

  <g transform="translate(50 -100) scale(0.75)">
    <circle
      r="40"
      fill="#280b4b"
      stroke-dasharray="4 2"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#e1177c" />
    <moonbeam transform="translate(0 -2) scale(0.75)"/>
  </g>
  <g transform="translate(-50 100) scale(0.75)">
    <circle
      r="40"
      fill="#280b4b"
      stroke-dasharray="4 2"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#ccff00" />
    <boba transform="translate(0 9) scale(0.15)" />
  </g>

</g>
</template>

<style scoped>
</style>
