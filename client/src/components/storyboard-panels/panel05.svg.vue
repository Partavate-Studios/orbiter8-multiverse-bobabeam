<script setup lang="ts">
import { useUI } from '../../stores/ui'
import portal from '../assets/portal.svg.vue'
import starfield from '../assets/starfield.svg.vue'
</script>

<script lang="ts">
export default {
}
</script>

<template>
<g>
  <g id="starfield">
    <starfield />
  </g>
  <g transform="scale(5)" >
    <portal />
  </g>
</g>
</template>

<style scoped>
</style>
