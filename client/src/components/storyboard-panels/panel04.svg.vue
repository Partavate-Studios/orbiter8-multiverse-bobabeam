<script setup lang="ts">
import { useUI } from '../../stores/ui'
import planets from '../assets/planets/_planets.svg.vue'
import starfield from '../assets/starfield.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
  data() {
    return {
      ui: useUI(),
      expansion: 1
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    expand() {
      this.expansion = 0
    }
  },
  mounted() {
    this.$refs.fadeinlater.beginElement()
    this.$refs.fadeout.beginElement()
    this.$refs.zoomaway.beginElement()
    setTimeout(() => { this.expand() }, 10)
  },
}
</script>

<template>
<g>
  <circle
    r="275"
    stroke-dasharray="4 2"
    stroke-width="0.25"
    stroke-opacity="0.5"
    stroke="#ff88ff"
    fill-opacity="0" />
  <g id="starfield">
    <starfield :showLines="true"  transform="scale(0.5)"/>
  </g>
  <animate
    ref="fadeinlater"
    xlink:href="#starfield"
    attributeType="CSS"
    attributeName="opacity"
    dur="4s"
    values="0; 0; 1"
    keyTimes="0; 0.5; 1"
    repeatCount="1"
    restart="always"
    calcMode="linear"
    fill="freeze"
  />
  <animateTransform
    attributeName="transform"
    xlink:href="#starfield"
    attributeType="XML"
    type="rotate"
    from="0"
    to="360"
    dur="360s"
    repeatCount="indefinite"
  />


  <g id="planets">
    <g>
      <planets :expansion="expansion" :showSats="false" />
    </g>
  </g>

  <animateTransform
    ref="zoomaway"
    xlink:href="#planets"
    attributeName="transform"
    attributeType="XML"
    type="scale"
    dur="2s"
    values="20; 1; 0"
    keyTimes="0; 0.7; 1"
    calcMode="linear"
    restart="always"
    fill="freeze"
    repeatCount="1"
  />
  <animate
    ref="fadeout"
    xlink:href="#planets"
    attributeType="CSS"
    attributeName="opacity"
    dur="3s"
    values="1; 0"
    keyTimes="0; 1"
    repeatCount="1"
    restart="always"
    calcMode="linear"
    fill="freeze" />
</g>
</template>

<style scoped>
</style>
