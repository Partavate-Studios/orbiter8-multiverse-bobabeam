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

  <text transform="translate(0 30)">
 - - Show: Portal
  </text>
  <text transform="translate(0 50)">
   - Transition: slow fade in,
  </text>
  <text transform="translate(0 70)">
   - Action: hitchcock zoom away from portal
  </text>
</g>
</template>

<style scoped>
</style>
