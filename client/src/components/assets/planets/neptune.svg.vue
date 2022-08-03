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
  <g>
    <g>
      <planet
        :classification="4"
        :size="19.5"
        :rotationPeriod="rotationPeriod"
        :rings="4"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="25" :distance="90">
        <moon
          :size="1"
        />
      </orbit>
      <orbit :duration="22" :distance="-100">
        <moon
          :size="9"
        />
      </orbit>
      <orbit :duration="28" :distance="110">
        <moon
          :size="1"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="60">
        <station
          :size="3"
        />
        <orbit :duration="30" :distance="-14">
          <shipO8
            transform="rotate(0)"
            :size="0.75"
          />
        </orbit>
      </orbit>
    </g>
  </g>
</template>

