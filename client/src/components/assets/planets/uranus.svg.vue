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
        :size="20"
        :rotationPeriod="rotationPeriod"
        :rings="1"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="18" :distance="90">
        <moon
          :size="1"
        />
      </orbit>
      <orbit :duration="29" :distance="-100">
        <moon
          :size="3"
        />
      </orbit>
      <orbit :duration="15" :distance="110">
        <moon
          :size="5"
        />
      </orbit>
      <orbit :duration="33" :distance="-120">
        <moon
          :size="5"
        />
      </orbit>
      <orbit :duration="15" :distance="130">
        <moon
          :size="5"
        />
      </orbit>
      <orbit :duration="41" :distance="-140">
        <moon
          :size="5"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="55">
        <station
          :size="1"
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

