<script lang="ts">
export default {
  emits: ['click'],
  data() {
    return {
      dots: 10
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
    }
  },
  computed: {
  }
}
</script>

<template>
<g>

  <defs>
    <linearGradient id="spinner-dot-background">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="100%" stop-color="#aaaaaa" stop-opacity="1" />
    </linearGradient>
    <radialGradient id="star-glow">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>
\
  <g>
    <g
      fill="url(#spinner-dot-background)"
      fill-opacity="1"
      stroke="#ffffff"
      stroke-width="2"
      stroke-opacity="0.5" >

        <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0"
                          to="-360"
                          dur="5s"
                          animate="freeze"
                          repeatCount="indefinite"/>
      <circle
        stroke-width="0"
        fill="url(#star-glow)"
        r="120" />
      <g v-for="num in dots" :transform="'rotate(' + num * (360 / dots) + ') translate(100 0)'">
        <g>
          <animateTransform attributeName="transform"
                            attributeType="XML"
                            type="scale"
                            :begin="num / dots * 1"
                            values="0.5;1;0.5"
                            dur="2s"
                            animate="freeze"
                            repeatCount="indefinite"/>
          <circle
            r="15">

          </circle>
        </g>
      </g>
    </g>
  </g>
</g>
</template>

<style scoped>
</style>
