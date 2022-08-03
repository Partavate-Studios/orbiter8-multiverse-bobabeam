<script setup lang="ts">
import orbit from '../../containment/_orbit.svg.vue'
import planet from '../../assets/planet.svg.vue'
import moon from '../../assets/moon.svg.vue'
import station from '../../assets/station.svg.vue'
import shipO8 from '../../assets/ship08.svg.vue'
</script>


<script lang="ts">
export default {
  props: {
    showMoons: {
        type: Boolean,
        default: true
    },
    showStation: {
        type: Boolean,
        default: true
    },
    rotationPeriod: {
      type: Number,
      default: 50
    }
  }
}
</script>


<template>
  <g id="earth-glump">
    <g>
      <planet
        :classification="1"
        :size="1"
        :rotationPeriod="rotationPeriod"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="40" :distance="40">
        <moon
          :size="1"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="20">
        <station
          :size="1"
        />
      </orbit>
    </g>
  </g>
</template>

