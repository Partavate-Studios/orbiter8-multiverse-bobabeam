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
import star from '../star.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      rotational: 0,
      expandState: 1
    }
  },
  props: {
    showSats: {
      type: Boolean,
      default: true
    },
    centerOnSun: {
      type: Boolean,
      default: false
    },
    expansion: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    this.expandState = this.expansion
  },
  watch: {
    expansion(oldVal, newVal) {
      this.expandTo()
    }
  },
  methods: {
    expandTo() {
      if (Math.abs(this.expandState - this.expansion) > 0.05) {
        this.expandState = ((this.expandState * 9 + this.expansion) / 10)
        setTimeout(() => { this.expandTo() }, 50)
      } else if(this.expandState != this.expansion) {
        this.expandState = this.expansion
      }
    }
  },
  computed: {
    hMult() {
      if (this.ui.landscape) {
        return 4 * this.expandState
      }
      //portrait
      return 2 * this.expandState
    },
    vMult() {
      if (this.ui.landscape) {
        return 1 * this.expandState
      }
      //portrait
      return 3 * this.expandState
    },
    pScale() {
      return 0.2
    }
  }
}
</script>

<template>
<g>
  <g >
    <g :transform="'translate(' + (-100 * hMult) + ' ' + (-100 * vMult) +') scale(' + pScale * 3 + ')'" class="smooth">
      <star />
    </g>

    <g :transform="'translate(' + (-19 * hMult) + ' ' + (-19 * vMult) +') scale(' + pScale + ')'" class="smooth">

      <mercury
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (-10 * hMult) + ' ' + (-10 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <venus
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (0 * hMult) + ' ' + (0 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <earth
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (10 * hMult) + ' ' + (10 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <mars
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (30 * hMult) + ' ' + (30 * vMult) +') scale(' + pScale + ')'">
      <jupiter
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (55 * hMult) + ' ' + (55 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <saturn
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (80 * hMult) + ' ' + (80 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <uranus
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (100 * hMult) + ' ' + (100 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <neptune
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>
    <g :transform="'translate(' + (120 * hMult) + ' ' + (120 * vMult) +') scale(' + pScale + ')'" class="smooth">
      <pluto
        :showMoons="showSats"
        :showStation="showSats"
        :rotationPeriod="rotational"
      />
    </g>


  </g>

</g>
</template>

<style scoped>
.smooth {
  transition-property: all;
  transition-property: transform;
  transition: 1s ease-out;
}
</style>
