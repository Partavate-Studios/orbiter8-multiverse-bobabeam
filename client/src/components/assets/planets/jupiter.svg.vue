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
        :classification="6"
        :size="55"
        :rotationPeriod="rotationPeriod"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="40" :distance="100">
        <moon
          :size="10"
        />
      </orbit>
      <orbit :duration="50" :distance="-110">
        <moon
          :size="8"
        />
      </orbit>
      <orbit :duration="45" :distance="120">
        <moon
          :size="14"
        />
      </orbit>
      <orbit :duration="70" :distance="-130">
        <moon
          :size="14"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="110" :distance="60">
        <station
          :size="12"
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

