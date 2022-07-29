<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import logo from './assets/logo.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting()
    }
  },
  methods: {
  }
}
</script>

<template>
  <svgContainer>

    <logo v-if="ui.portrait" transform="translate(0 -420) scale(0.7)" />
    <logo v-if="ui.landscape" transform="translate(0 -240) scale(0.4)" />

    <g transform="translate(0 -50)">
      <text transform="translate(0 -10)">
       Every network is a universe
      </text>
      <text transform="translate(0 10)">
       Together they are the multiverse
      </text>
    </g>


    <g :transform="'translate(0 ' + (ui.bottom - 50) + ')'">
      <rect
        :x="ui.left"
        y="-100"
        :width="ui.right - ui.left"
        height="150"
        fill="#000000"
        fill-opacity="0.2"
        />
      <text
        font-size="40px"
        fill-opacity="1"
        :transform="'translate(0 -55)'">
        Orbiter 8 Multiverse Demo
      </text>
      <g  font-size="30px">
        <btn
          :width="200" :height="40"
          text="Let's Begin"
           @click="routing.switchScreen('about')"
          transform="translate(0 0)" />
      </g>


    </g>

  </svgContainer>
</template>

<style scoped>
</style>
