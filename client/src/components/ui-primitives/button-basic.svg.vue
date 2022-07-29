<script lang="ts">
export default {
  emits: ['click'],
  data() {
    return {
      hover: false
    }
  },
  props: {
    val: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 24
    }
  },
  computed: {
    fillOpacity():string {
      if (this.selected) {
        return '0.3'
      }
      if (this.hover) {
        return '0.2'
      }
      return '0.1'
    },
    strokeOpacity(): string {
      if (this.hover || this.selected) {
        return '0.8'
      }
      return '0.3'
    }
  }
}
</script>

<template>
<g @mouseover="hover=true" @mouseleave="hover=false">
  <rect
    :x="width / -2" :y="height / -2"
    :width="width"
    :height="height"
    :stroke-opacity="strokeOpacity"
    :fill-opacity="fillOpacity"
    stroke="1"
    rx="10"
    ry="10" />
  <text>
  {{ text }}
  </text>
  <rect
    class="canclick"
    :x="width / -2" :y="height / -2"
    :width="width"
    :height="height"
    fill-opacity="0"
    stroke-opacity="0"
    stroke-width="1"
    @click="$emit('click', val)"
    rx="10"
    ry="10" />
</g>
</template>

<style scoped>
</style>
