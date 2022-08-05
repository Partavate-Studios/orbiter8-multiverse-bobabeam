<script setup lang="ts">
import star from './star.svg.vue'
import ship from './ship08.svg.vue'
</script>

<script lang="ts">
export default {
  props: {
    showLines: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<template>
<g>
  <g v-if="showLines">
    <g
      stroke-width="1"
      stroke-dasharray="4 6"
      stroke-opacity="0.5"
      stroke="#ffff88">
      <line x1="0" y1="0" x2="-300" y2="-100" />
      <line x1="0" y1="0" x2="200" y2="-150" />
      <line x1="0" y1="0" x2="100" y2="150" />
      <line x1="200" y1="-150" x2="350" y2="-150" />
      <line x1="0" y1="0" x2="-400" y2="250" />
      <line x1="0" y1="0" x2="-100" y2="-400" />
    </g>

    <g transform="translate(-110 -36) rotate(-70) scale(2)">
      <ship :showEngines="true" />
    </g>
    <g transform="translate(-84 -335) rotate(-12) scale(1.1)">
      <ship :showEngines="true" />
    </g>
    <g transform="translate(290 -150) rotate(90) scale(2.2)">
      <ship :showEngines="true" />
    </g>
  </g>

  <g transform="translate(-300 -100) scale(0.25)">
    <star />
  </g>
  <g transform="translate(200 -150) scale(0.1)">
    <star />
  </g>
  <g transform="translate(100 150) scale(0.15)">
    <star />
  </g>
  <g transform="translate(350 -150) scale(0.3)">
    <star />
  </g>
  <g transform="translate(-400 250) scale(0.1)">
    <star />
  </g>
  <g transform="translate(-100 -400) scale(0.1)">
    <star />
  </g>

</g>

</template>

<style scoped>
</style>
