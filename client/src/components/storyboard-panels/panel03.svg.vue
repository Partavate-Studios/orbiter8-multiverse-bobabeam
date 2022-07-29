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
    ">Orbiter 8: First Intersteller Ship Goes Into Commercial Production
  </text>
  <text transform="translate(0 30)">
    Show: future news headline with an orbiter 8 ship
  </text>
  <text transform="translate(0 50)">
    Transition: slow fade in
  </text>
</g>
</template>

<style scoped>
</style>
