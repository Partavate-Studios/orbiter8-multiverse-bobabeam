<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import panel01 from './storyboard-panels/panel01.svg.vue'
import panel02 from './storyboard-panels/panel02.svg.vue'
import panel03 from './storyboard-panels/panel03.svg.vue'
import panel04 from './storyboard-panels/panel04.svg.vue'
import panel05 from './storyboard-panels/panel05.svg.vue'
import panel06 from './storyboard-panels/panel06.svg.vue'
import minerva from './assets/minerva.svg.vue'
import backdrop from './assets/backdrop.svg.vue'


import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      panel: 0,
      panelCount: 6,
      routing: useRouting(),
      words: [
        [
          'In the year 2140',
          'humans inhabit all',
          'of our planets.',
        ],
        [
          'Bound to our sun,',
          'this was as far',
          'as we could go.',
        ],
        [
          'Until the Orbiter 8! ',
          'The first intersteller ships',
          'have unlocked the galaxy.',
        ],
        [
          'Now They\'re Settling Across The Galaxy',
          '',
          '',
        ],
        [
          'But they found something ancient.',
          '',
          '',
        ],
        [
          'Doors to the Multiverse',
          '',
          '',
        ],
      ]
    }
  },
  methods: {
    next() {
      this.panel = (this.panel + 1) % this.panelCount
    },
    prev() {
      if (this.panel > 0) {
        this.panel --
      }
    },
    switchTo(n:number) {
      if ((n >= 0) && (n < this.panelCount)) {
        this.panel = n
      }
    },
    finish() {
      this.routing.switchScreen('network')
    }
  }
}
</script>

<template>
  <svgContainer>

    <backdrop transform="scale(2)" />

    <panel01 v-if="panel == 0" v-on:next="next"   />
    <panel02 v-if="panel == 1" v-on:pre="prev()" v-on:next="next"      />
    <panel03 v-if="panel == 2" v-on:pre="prev()" v-on:next="next"     />
    <panel04 v-if="panel == 3" v-on:pre="prev()" v-on:next="next"     />
    <panel05 v-if="panel == 4" v-on:pre="prev()" v-on:next="next"     />
    <panel06 v-if="panel == 5" v-on:pre="prev()" v-on:finish="finish" />


    <g :transform="'translate(0 ' + (ui.top + 50) + ')'">
      <minerva transform="translate(-250 0) scale(0.5)" />
    </g>

    <text
      font-size="40px"
      text-anchor="start"
      :transform="'translate(-180 ' + (ui.top + 50) + ')'
      ">{{ words[panel][0] }}
    </text>
    <text
      font-size="30px"
      text-anchor="start"
      :transform="'translate(-150 ' + (ui.top + 100) + ')'
      ">{{ words[panel][1] }}
    </text>
    <text
      font-size="30px"
      text-anchor="start"
      :transform="'translate(-150 ' + (ui.top + 150) + ')'
      ">{{ words[panel][2] }}
    </text>


    <g :transform="'translate(0 ' + (ui.bottom - 50) + ')'">
      <rect
        :x="ui.left"
        y="-50"
        :width="ui.right - ui.left"
        height="100"
        fill="#000000"
        fill-opacity="0.2"
        />
      <g font-size="10px">
        <g fill-opacity="0.5"
          :transform="'translate(' + ((panelCount + 3) * -25) + ' 0)'"
        >
          <btn
            v-if="panel > 0"
            fill="#ffff88"
            :width="20" :height="20"
            @click="prev" text="&larr;"
            transform="scale(1.75)" />
            />
          <btn
            v-if="panel == 0"
            fill="#ff88ff"
            :width="40" :height="20"
            @click="routing.switchScreen('splash')" text="Close"
            transform="scale(1.5)" />
            />
        </g>
        <g fill-opacity="0.75" fill="#ffff88"
          :transform="'translate(' + ((panelCount + 3) * 25) + ' 0)'">
          <btn
            :width="60" :height="20"
            @click="next" text="next &rarr;"
            v-if="panel != (panelCount-1)"
            transform="scale(1.75)" />
          <btn
            :width="60" :height="20"
            @click="finish" text="Connect"
            v-else
            transform="scale(2)" />
        </g>
      </g>

      <btn
        v-for="n in panelCount"
        v-bind:key="n"
        font-size="12px"
        fill="#ffffff"
        :width="30"
        :height="20"
        :text="(n).toString()"
        :selected="n <= panel + 1"
        @click="switchTo(n - 1)"
        :transform="'translate(' + ((n * 50) - ((panelCount + 1) * 25)) + ' 0) scale(1.25)'" />

    </g>

  </svgContainer>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
