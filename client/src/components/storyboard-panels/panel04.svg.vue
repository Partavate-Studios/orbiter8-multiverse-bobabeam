<script setup lang="ts">
import { useUI } from '../../stores/ui'
import planets from '../assets/planets/_planets.svg.vue'
import starfield from '../assets/starfield.svg.vue'
import star from '../assets/star.svg.vue'
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
    this.$refs.fadein.beginElement()
    this.$refs.fadeout.beginElement()
    this.$refs.zoomaway.beginElement()
    this.$refs.zoomin.beginElement()
    setTimeout(() => { this.expand() }, 10)
  },
}
</script>

<template>
<g>
  <g id="starfield">
    <starfield :showLines="true" />
  </g>
  <animate
    ref="fadeinlater"
    xlink:href="#starfield"
    attributeType="CSS"
    attributeName="opacity"
    dur="6s"
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
    dur="600s"
    repeatCount="indefinite"
  />

  <g>
    <star id="sol" />
  </g>
  <animateTransform
    ref="zoomin"
    xlink:href="#sol"
    attributeName="transform"
    attributeType="XML"
    type="scale"
    dur="3s"
    values="0; 0.5"
    keyTimes="0; 1"
    calcMode="linear"
    restart="always"
    fill="freeze"
    repeatCount="1"
  />
  <animate
    ref="fadein"
    xlink:href="#sol"
    attributeType="CSS"
    attributeName="opacity"
    dur="1s"
    values="0; 1"
    keyTimes="0; 1"
    repeatCount="1"
    restart="always"
    calcMode="linear"
    fill="freeze" />

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
    dur="2s"
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
