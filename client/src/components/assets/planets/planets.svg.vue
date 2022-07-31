<script setup lang="ts">
import { useUI } from '../../../stores/ui'
import mercury from './mercury.svg.vue'
import venus from './venus.svg.vue'
import earth from './earth.svg.vue'
import mars from './mars.svg.vue'
import jupiter from './jupiter.svg.vue'
import saturn from './saturn.svg.vue'
import uranus from './uranus.svg.vue'
import neptune from './neptune.svg.vue'
import pluto from './pluto.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      showMoons: false,
      showStation: false
    }
  },
  props: {
  },
  computed: {
    hMult() {
      if (this.ui.landscape) {
        return 3
      }
      //portrait
      return 1
    },
    vMult() {
      if (this.ui.landscape) {
        return 1
      }
      //portrait
      return 3
    },
    pScale() {
      return 1
    }
  }
}
</script>

<template>
<g>

  <g>
    <g :transform="'translate(' + (-160 * hMult) + ' ' + (-100 * vMult) +') scale(' + pScale + ')'">
      <mercury
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (-120 * hMult) + ' ' + (-90 * vMult) +') scale(' + pScale + ')'">
      <venus
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (-80 * hMult) + ' ' + (-70 * vMult) +') scale(' + pScale + ')'">
      <earth
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (-40 * hMult) + ' ' + (-40 * vMult) +') scale(' + pScale + ')'">
      <mars
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(0 0) scale(' + pScale + ')'">
      <jupiter
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (40 * hMult) + ' ' + (40 * vMult) +') scale(' + pScale + ')'">
      <saturn
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (80 * hMult) + ' ' + (70 * vMult) +') scale(' + pScale + ')'">
      <uranus
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (120 * hMult) + ' ' + (90 * vMult) +') scale(' + pScale + ')'">
      <neptune
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>
    <g :transform="'translate(' + (160 * hMult) + ' ' + (100 * vMult) +') scale(' + pScale + ')'">
      <pluto
        :showMoons="showMoons"
        :showStation="showStation"
        :rotationPeriod="0"
      />
    </g>

  </g>

</g>
</template>

<style scoped>
</style>
