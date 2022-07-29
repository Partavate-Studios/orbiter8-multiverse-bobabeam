<script lang="ts">
export default {
  data() {
    return {
    }
  },
  props: {
    duration: {
      type: Number,
      default: 60
    },
    distance: {
      type: Number,
      default: 100
    },
    begin: {
      type:Number,
      default: 0
    }
  },
}
</script>

<template>
<g>
  <circle
    cx="0" cy="0" :r="distance"
    fill="none" stroke="#ffffff"
    stroke-opacity="0.25" stroke-width="0.25"
    stroke-dasharray="2 6"
  />
  <g>
    <g :transform="'translate(' + distance + ' 0)'">
      <slot />
    </g>
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0"
      to="360"
      :begin="begin + 's'"
      :dur="duration + 's'"
      repeatCount="indefinite"
    />
  </g>
</g>
</template>

<style scoped>
</style>
