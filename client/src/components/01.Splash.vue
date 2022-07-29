<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/backdrop.svg.vue'
import gridlines from './assets/gridlines.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import logo from './assets/logo.svg.vue'
import ship from './assets/ship08.svg.vue'
import portal from './assets/portal.svg.vue'
import star from './assets/star.svg.vue'

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
  <g>
    <backdrop  transform="scale(0.5)" />
  </g>

    <logo  :transform="'translate(0 ' + (ui.top + 80) + ') scale(0.4)'" />

      <text
        font-size="28px"
        fill-opacity="0.75"
        fill="#ffffff"
        :transform="'translate(0 ' + (ui.top + 180) + ')'">
        Multiverse Portals
      </text>
      <text
        font-size="14px"
        fill-opacity="0.5"
        fill="#ffffff"
        :transform="'translate(0 ' + (ui.top + 210) + ')'">
        D E M O
      </text>

    <g>
      <g transform="translate(-300 -100) scale(0.25)">
        <star />
      </g>
      <g transform="translate(200 -150) scale(0.2)">
        <star />
      </g>
      <g transform="translate(100 150) scale(0.1)">
        <star />
      </g>

      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0"
        to="360"
        dur="600s"
        repeatCount="indefinite"
      />
    </g>

    <g transform="translate(0 40) scale(2)">
      <g>
        <g>
          <portal transform="scale(1.5)" />

          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="scale"
            values="0.8; 1.2; 0.8"
            dur="60s"
            repeatCount="indefinite"
          />
        </g>
        <g transform="translate(-40 40) rotate(45) scale(2)" opacity="1">
          <g>
            <ship :showEngines="true" />

            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              values="0.90; 1; 0.90"
              dur="4s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="360; 0"
          dur="240s"
          repeatCount="indefinite"
        />
      </g>
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
      <g  font-size="30px">
        <btn
          :width="300" :height="60"
          text="Begin"
           @click="routing.switchScreen('about')"
          transform="translate(0 -20)" />
      </g>


    </g>

  </svgContainer>
</template>

<style scoped>
</style>
