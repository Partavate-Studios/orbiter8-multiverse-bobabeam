<script setup lang="ts">
import { useUI } from '../../stores/ui'
import earth from '../assets/planets/earth.svg.vue'
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
}
</script>

<template>
<g>
  <g>
    <g id="earth">
      <earth />

      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="scale"

        dur="3s"

        values="0; 2; 1.75"
        keyTimes="0; 0.75; 1"

        calcMode="linear"
        fill="freeze"
        repeatCount="1"
      />
    </g>
  </g>

</g>
</template>

<style scoped>
</style>
