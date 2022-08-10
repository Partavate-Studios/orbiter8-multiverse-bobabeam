<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import panel01 from './storyboard-panels/panel01.svg.vue'
import panel02 from './storyboard-panels/panel02.svg.vue'
import panel03 from './storyboard-panels/panel03.svg.vue'
import panel04 from './storyboard-panels/panel04.svg.vue'
import panel05 from './storyboard-panels/panel05.svg.vue'
import panel06 from './storyboard-panels/panel06.svg.vue'
import minerva from './assets/minervaBox.svg.vue'
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
          'By the year 2140,',
          'every planet in our solar',
          'system is overpopulated.',
        ],
        [
          'Still bound to our sun,',
          'we continued to long',
          'to explore the stars.',
        ],
        [
          'With Orbiter 8,',
          'the first starships',
          'have arrived.',
        ],
        [
          'Orbiter 8 is an MMO',
          'strategy game built ',
          'for the EVM.',
        ],
        [
          'Introducing Portals!',
          'Starships will soon cross',
          'more than just the galaxy.',
        ],
        [
          'Portals are Bridges',
          'connecting distinct universes',
          'into a multiverse.',
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

    <panel01 v-if="panel == 0" v-on:next="next" />
    <panel02 v-if="panel == 1" v-on:pre="prev()" v-on:next="next" />
    <panel03 v-if="panel == 2" v-on:pre="prev()" v-on:next="next" />
    <panel04 v-if="panel == 3" v-on:pre="prev()" v-on:next="next" />
    <panel05 v-if="panel == 4" v-on:pre="prev()" v-on:next="next" />
    <panel06 v-if="panel == 5" v-on:pre="prev()" v-on:finish="finish" />

    <g :transform="'translate(0 ' + (ui.top + 15) + ')'">
      <g transform="scale(1)">
        <g fill="#000000"
          fill-opacity="0.25"
          stroke="#ffffff"
          stroke-width="0.5"
          stroke-opacity="0.25">
          <rect
            v-if="ui.portrait"
            x="-290"
            y="0"
            width="590"
            height="170"
            rx="20"
            ry="20"
          />
          <rect
            v-else
            x="-390"
            y="0"
            width="790"
            height="115"
            rx="20"
            ry="20"
          />
        </g>

        <g v-if="ui.portrait" transform="translate(-250 45)">
          <minerva transform="translate(0 0) scale(0.5)" />
        </g>
        <g v-else transform="translate(-350 45)">
          <minerva transform="translate(0 0) scale(0.5)" />
        </g>

        <g v-if="ui.portrait" transform="translate(-170 0)" text-anchor="start">
          <text
            font-size="40px"
            transform="translate(0 35)"
          >{{ words[panel][0] }}
          </text>
          <text
            font-size="30px"
            transform="translate(0 85)"
          >{{ words[panel][1] }}
          </text>
          <text
            font-size="30px"
            transform="translate(0 135)"
          >{{ words[panel][2] }}
          </text>
        </g>
        <g v-else transform="translate(-275 0)" text-anchor="start">
          <text
            font-size="35px"
            transform="translate(0 35)"
          >{{ words[panel][0] }}
          </text>
          <text
            font-size="25px"
            transform="translate(0 85)"
          >{{ words[panel][1] }} {{ words[panel][2] }}
          </text>
        </g>
      </g>
    </g>


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
            @click="finish" text="Try It"
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
