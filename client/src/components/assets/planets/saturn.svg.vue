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
        :classification="6"
        :size="45"
        :rotationPeriod="rotationPeriod"
        :rings="10"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="111" :distance="110">
        <moon
          :size="3"
        />
      </orbit>
      <orbit :duration="46" :distance="-120">
        <moon
          :size="3"
        />
      </orbit>
      <orbit :duration="21" :distance="130">
        <moon
          :size="3"
        />
      </orbit>
      <orbit :duration="71" :distance="-140">
        <moon
          :size="5"
        />
      </orbit>
      <orbit :duration="67" :distance="150">
        <moon
          :size="14"
        />
      </orbit>
      <orbit :duration="31" :distance="-160">
        <moon
          :size="5"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="75">
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

