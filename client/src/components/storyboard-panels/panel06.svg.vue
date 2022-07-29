<script setup lang="ts">
import { useUI } from '../../stores/ui'
import btn from '../ui-primitives/button-basic.svg.vue'
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
  <text
    font-size="50px"
    :transform="'translate(0 ' + (ui.top + 100) + ')'
    ">Doors to the Multiverse
  </text>


  <text transform="translate(0 30)">
 - - Show: Still the Portal, no transition
  </text>
  <text transform="translate(0 50)">
   - Transition: none in, fade out to white
  </text>
  <text transform="translate(0 70)">
   - Action: ship comes into frame, hitchcock zoom reverses into portal,
  </text>


    <g transform="translate(0 -50)">
      <text transform="translate(0 -10)">
       Every network is a universe
      </text>
      <text transform="translate(0 10)">
       Together they are the multiverse
      </text>
    </g>

  <g transform="translate(0 100)">
    <btn
      :width="300" :height="30"
      font-size="20px"
      fill-opacity="0.25"
        @click="$emit('finish')"
      text="Next"
      transform="translate(0 20)" />
  </g>

</g>
</template>

<style scoped>
</style>
