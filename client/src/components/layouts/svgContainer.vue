<script setup lang="ts">
import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      mouseHold: false,
      ui: useUI(),
      debug: false,
      rect: false
    }
  },
  mounted () {
    this.ui.resizeHandler() //set initial ratio
    //TODO: consider throttling these methods
    window.addEventListener('resize', this.ui.resizeHandler)
    window.addEventListener('keyup', this.keyHandler)
    window.addEventListener('wheel', this.wheelHandler)
    window.addEventListener('mousemove', this.ui.mouseMoveHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.ui.resizeHandler);
    window.removeEventListener('keyup', this.keyHandler)
    window.removeEventListener('wheel', this.wheelHandler)
    window.removeEventListener('mousemove', this.ui.mouseMoveHandler)
  },
  methods: {
    wheelHandler(event:any) {
      //todo - wheel should modify map, not UI
      console.log('wheel', event.deltaY)
      if (event.deltaY > 0) {
        this.ui.setScale(this.ui.scale * 1.01)
      } else if (event.deltaY < 0) {
        this.ui.setScale(this.ui.scale / 1.01)
      }
    },
    keyHandler() {
    }
  },
  computed: {
  }
}
</script>

<template>
  <div id="svgWrapper">
  <svg
    :viewBox="ui.viewBoxSize"
    :class="{ 'is-dragging': mouseHold }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    v-on:mousedown="mouseHold = true"
    v-on:mouseup="mouseHold = false"
    text-anchor="middle"
    dominant-baseline="middle"
    rendering="auto"
    text-rendering="auto"
    shape-rendering="auto"
    fill="#ffffff">
    <slot />

    <rect
      v-if="rect"
      :x="ui.protectedBoxX"
      :y="ui.protectedBoxY"
      :width="ui.protectedBoxWidth"
      :height="ui.protectedBoxHeight"
      fill="none"
      stroke="#ff0000"
      stroke-width="0.5"
      stroke-dasharray="2 1"
      stroke-opacity="0.5" />
    <g v-if="debug">
      <rect
        :x="ui.left" :y="ui.top"
        :height="ui.height" :width="ui.width"
        fill="none" stroke="#ff00ff" stroke-width="20" />
      <circle :cx="ui.mouseX" :cy="ui.mouseY" :r="5 * ui.scale" fill="#ff0000" />
      <text transform="translate(0 100)" fill="#ffffff">Top {{ ui.top }} Bottom {{ ui.bottom }}</text>
      <text transform="translate(0 120)" fill="#ffffff">Left {{ ui.left }} Right {{ ui.right }}</text>
      <text transform="translate(0 140)" fill="#ffffff">Scale {{ ui.scale }} Resolution {{ ui.resolution }}</text>
      <text transform="translate(0 160)" fill="#ffffff">Screen orientation: <tspan v-if="ui.portrait">Portrait</tspan><tspan v-else-if="ui.landscape">Landscape</tspan><tspan v-else>Error</tspan></text>
      <text transform="translate(0 180)" fill="#ffffff">MouseX: {{ ui.mouseX.toFixed(3) }} MouseY: {{ ui.mouseY.toFixed(3) }}</text>
      <text transform="translate(0 200)" fill="#ffffff"></text>



    </g>
  </svg>
  </div>
</template>


<style scoped lang="scss">
  svg {
    min-width: 100%;
    min-height: 100%;
  }

  div#svgWrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;

  }

  .is-dragging {
    cursor: grabbing;
  }
</style>
