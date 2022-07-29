<script setup lang="ts">
import { useUI } from '../../stores/ui'
import btn from '../ui-primitives/button-basic.svg.vue'
import backdrop from '../assets/backdrop.svg.vue'
import orbit from '../containment/_orbit.svg.vue'
import minerva from '../assets/minerva.svg.vue'
import earth from '../assets/planets/earth.svg.vue'
import star from '../assets/star.svg.vue'
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
  <g id="f1bg">
    <backdrop transform="scale(0.5)" />

    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="scale"

      dur="3s"

      values="1; 1.3; 1.25"
      keyTimes="0; 0.75; 1"

      calcMode="linear"
      fill="freeze"
      repeatCount="1"
    />
  </g>

  <text
    font-size="40px"
    text-anchor="start"
    :transform="'translate(-180 ' + (ui.top + 50) + ')'
    ">In the year 2140
  </text>
  <text
    font-size="30px"
    text-anchor="start"
    :transform="'translate(-150 ' + (ui.top + 100) + ')'
    ">and humans are in space.
  </text>

  <g :transform="'translate(0 ' + (ui.top + 50) + ')'">
    <minerva transform="translate(-250 0) scale(0.5)" />
  </g>

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
