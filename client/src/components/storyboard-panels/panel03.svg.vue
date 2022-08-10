<script setup lang="ts">
import { useUI } from '../../stores/ui'
import planets from '../assets/planets/_planets.svg.vue'
import ship from '../assets/ship08.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
  data() {
    return {
      ui: useUI()
    }
  },
  mounted() {
    this.$refs.zoomfurtherin.beginElement()
    this.$refs.flyby.beginElement()
    this.$refs.flybehind.beginElement()
  },
  props: {
  },
  computed: {
  }
}
</script>

<template>
<g>

  <g id="planets">
    <g transform="translate(-200 0)" id="flybehindship">
      <g transform="rotate(90) scale(0.15) translate(-5 0)">
        <ship :showEngines="true" />
      </g>
    </g>

    <animateTransform
      ref="flybehind"
      xlink:href="#flybehindship"
      attributeName="transform"
      attributeType="XML"
      type="translate"
      dur="10s"
      values="-75 0; 200 0; 100 0"
      keyTimes="0; 0.95; 1"
      calcMode="linear"
      restart="always"
      fill="freeze"
      repeatCount="10"
    />

    <g>
      <planets :expansion="1" :showSats="true" />
    </g>

    <animateTransform
      ref="zoomfurtherin"
      xlink:href="#planets"
      attributeName="transform"
      attributeType="XML"
      type="scale"
      dur="3s"
      values="1; 25"
      keyTimes="0; 1"
      calcMode="linear"
      restart="always"
      fill="freeze"
      repeatCount="1"
    />

    <g transform="translate(300 0)" id="flybyship">
      <g transform="rotate(-90) scale(3.5)">
        <ship :showEngines="true" />
      </g>
    </g>

    <animateTransform
      ref="flyby"
      xlink:href="#flybyship"
      attributeName="transform"
      attributeType="XML"
      type="translate"
      dur="15s"
      values="300 0; 300 0; -500 0"
      keyTimes="0; 0.40; 1"
      calcMode="linear"
      restart="always"
      fill="freeze"
      repeatCount="10"
    />

  </g>
</g>
</template>

<style scoped>
</style>
