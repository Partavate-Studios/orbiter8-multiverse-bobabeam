<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/backdrop.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import ship from './assets/ship08.svg.vue'
import portal from './assets/portal.svg.vue'
import starfield from './assets/starfield.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      hasShip: false
    }
  },
  methods: {
    enterportal() {
      if (!this.hasShip) {
        alert('you have no ship')
      }
    }
  }
}
</script>

<template>
  <svgContainer>
  <g>
    <backdrop  transform="scale(1.5)" />
  </g>

    <g>
      <starfield />

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

    <g transform="translate(0 -40) scale(1.5)">
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
          <g v-if="hasShip">
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

    <g :transform="'translate(0 ' + (ui.bottom - 50) + ')'" font-size="20px">
      <g v-if="hasShip">
        <btn
          :width="200" :height="60"
          text="Enter Portal"
          @click="enterportal()"
          transform="translate(0 -20)" />
      </g>
      <g v-else>
        <text>No ships found in this universe.</text>
      </g>
    </g>

  </svgContainer>
</template>

<style scoped>
</style>
