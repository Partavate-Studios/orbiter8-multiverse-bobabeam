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
    ">In the year 2140...
  </text>
  <text transform="translate(0 30)">
 - - Show: planet earth with a busy space station
  </text>
  <text transform="translate(0 50)">
   - Action: slow zoom out
  </text>


</g>
</template>

<style scoped>
</style>
