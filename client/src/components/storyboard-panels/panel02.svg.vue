<script setup lang="ts">
import { useUI } from '../../stores/ui'
import btn from '../ui-primitives/button-basic.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
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
  <text
    font-size="50px"
    :transform="'translate(0 ' + (ui.top + 100) + ')'
    ">Humans Settled The Solar System
  </text>
  <text transform="translate(0 30)">
    Show: ships jumping between planets all with space stations
  </text>
  <text transform="translate(0 50)">
    Action: following various ships as they move about
  </text>
</g>
</template>

<style scoped>
</style>
