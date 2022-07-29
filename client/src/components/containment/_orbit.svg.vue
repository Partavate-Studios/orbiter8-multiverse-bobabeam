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
