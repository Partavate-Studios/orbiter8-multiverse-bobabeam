<script setup lang="ts">
import { useUI } from '../../stores/ui'
import btn from '../ui-primitives/button-basic.svg.vue'
import backdrop from '../assets/backdrop.svg.vue'
import gridlines from '../assets/gridlines.svg.vue'
import orbit from '../containment/_orbit.svg.vue'
import minerva from '../assets/minerva.svg.vue'
import planet from '../assets/planet.svg.vue'
import moon from '../assets/moon.svg.vue'
import station from '../assets/station.svg.vue'
import star from '../assets/star.svg.vue'
import shipO8 from '../assets/ship08.svg.vue'
import portal from '../assets/portal.svg.vue'
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
  <backdrop />
  <gridlines transform="scale(1)" />

  <text
    font-size="50px"
    :transform="'translate(0 ' + (ui.top + 50) + ')'
    ">In the year 2140...
  </text>

  <text transform="translate(0 -240)">
    planet earth, busy station, slow zoom out
  </text>
    <minerva transform="translate(-250 -200) scale(0.5)" />
  <g>
    <g id="earth-glump">
      <g>
        <planet
          :classification="0"
          :size="3"
          :rotationPeriod="120"
        />

        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0"
          to="360"
          dur="120s"
          repeatCount="indefinite"
        />
      </g>
      <orbit :duration="40" :distance="100">
        <moon
          :size="2"
        />
      </orbit>
      <orbit :duration="60" :distance="60">
        <station
          :size="1"
        />

        <orbit :duration="30" :distance="14">
          <shipO8
            transform="rotate(180)"
            :size="0.75"
          />
        </orbit>

        <orbit :begin="15" :duration="30" :distance="14">
          <shipO8
            transform="rotate(180)"
            :size="0.75"
          />
        </orbit>

      </orbit>

      <animateTransform
        attributeName="transform"
        attributeType="XML"
        xlink:href="#earth-glump"
        type="scale"

        dur="1s"

        values="0; 2.5; 2"
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
