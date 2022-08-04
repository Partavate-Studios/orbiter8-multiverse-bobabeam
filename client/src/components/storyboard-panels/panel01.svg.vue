<script setup lang="ts">
import { useUI } from '../../stores/ui'
import planets from '../assets/planets/_planets.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
  data() {
    return {
      ui: useUI(),
      expansion: 0.24
    }
  },
  mounted() {
    this.$refs.fadein.beginElement()
    this.$refs.zoomout.beginElement()
  },
  props: {
  },
}
</script>

<template>
<g>
  <g id="planets">
    <g>
      <planets :expansion="expansion" :showSats="false" />
    </g>

    <animate
      ref="fadein"
      xlink:href="#planets"
      attributeType="CSS"
      attributeName="opacity"
      dur="2s"
      values="0; 1"
      keyTimes="0; 1"
      repeatCount="1"
      restart="always"
      calcMode="linear"
      fill="freeze" />

    <animateTransform
      ref="zoomout"
      xlink:href="#planets"
      attributeName="transform"
      attributeType="XML"
      type="scale"
      dur="3s"
      values="0; 2.25; 2.5"
      keyTimes="0; 0.75; 1"
      calcMode="linear"
      restart="always"
      fill="freeze"
      repeatCount="1"
      additive="sum"
    />

  </g>

</g>
</template>

<style scoped>
</style>
