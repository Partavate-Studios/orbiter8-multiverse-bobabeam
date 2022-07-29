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
    ">Now They're Settling Across The Galaxy
  </text>

  <text transform="translate(0 30)">
 - - Show: Orbiter 8 Jumping To Star
  </text>
  <text transform="translate(0 50)">
   - Transition: Ship on page comes to life, flies to new star
  </text>
  <text transform="translate(0 70)">
   - Action: fly around sun, paralax sidescrolling to new star
  </text>
</g>
</template>

<style scoped>
</style>
