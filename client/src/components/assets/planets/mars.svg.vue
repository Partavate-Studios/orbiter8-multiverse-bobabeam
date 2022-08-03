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
        :classification="1"
        :size="7.5"
        :rotationPeriod="rotationPeriod"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="185" :distance="60">
        <moon
          :size="1"
        />
      </orbit>
      <orbit :duration="42" :distance="-70">
        <moon
          :size="1"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="38">
        <station
          :size="4"
        />
        <orbit :duration="30" :distance="14">
          <shipO8
            transform="rotate(180)"
            :size="0.75"
          />
        </orbit>
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

