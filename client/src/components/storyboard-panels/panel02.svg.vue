<script setup lang="ts">
import { useUI } from '../../stores/ui'
import mercury from '../assets/planets/mercury.svg.vue'
import venus from '../assets/planets/venus.svg.vue'
import earth from '../assets/planets/earth.svg.vue'
import mars from '../assets/planets/mars.svg.vue'
import jupiter from '../assets/planets/jupiter.svg.vue'
import saturn from '../assets/planets/saturn.svg.vue'
import uranus from '../assets/planets/uranus.svg.vue'
import neptune from '../assets/planets/neptune.svg.vue'
import pluto from '../assets/planets/pluto.svg.vue'

import backdrop from '../assets/backdrop.svg.vue'
import minerva from '../assets/minerva.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['prev', 'next'],
  data() {
    return {
      ui: useUI(),
      showMoons: true,
      showStation: false
    }
  },
  props: {
  },
  computed: {
    hMult() {
      if (this.ui.portrait) {
        return 1
      }
      return 2.5
    },
    vmult() {
      if (this.ui.landscape) {
        return 1
      }
      return 2.5
    },
  }
}
</script>

<template>
<g>
  <g id="f2bg">
    <backdrop transform="scale(0.5)" />

  </g>

  <text
    font-size="40px"
    text-anchor="start"
    :transform="'translate(-180 ' + (ui.top + 50) + ')'
    ">Civilization has spread
  </text>
  <text
    font-size="30px"
    text-anchor="start"
    :transform="'translate(-150 ' + (ui.top + 100) + ')'
    ">to the whole of the solar system.
  </text>
  <g :transform="'translate(0 ' + (ui.top + 50) + ')'">
    <minerva transform="translate(-250 0) scale(0.5)" />
  </g>

  <g>

    <g :transform="'translate(' + (-100 * hMult) + ' ' + (-160 * vMult) +' scale(' + pScale + ')'">
      <mercury
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(-90 -120) scale(0.75)">
      <venus
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(-70 -80) scale(0.75)">
      <earth
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(-40 -40) scale(0.75)">
      <mars
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(0 0) scale(0.75)">
      <jupiter
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(40 40) scale(0.75)">
      <saturn
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(70 80) scale(0.75)">
      <uranus
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(90 120) scale(0.75)">
      <neptune
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g transform="translate(100 160) scale(0.75)">
      <pluto
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>

    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="scale"

      dur="3s"

      values="0; 0.1; 1"
      keyTimes="0; 0.25; 1"

      calcMode="linear"
      fill="freeze"
      repeatCount="1"
    />
  </g>

</g>
</template>

<style scoped>
</style>
