<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import logo from './assets/logo.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import spinner from './ui-primitives/spinner.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import { useRouting } from '../stores/routing'
import { useUI } from '../stores/ui'
import { useWallet} from '../stores/wallet'
import deployments from "../../libraries/networkDeployments"
import networks from "../../libraries/networkDetails"
</script>

<script lang="ts">
export default {
  data() {
    return {
      wallet: useWallet(),
      routing: useRouting(),
      ui: useUI(),
      deployments: deployments,
      networks: networks,
      hoverId: null
    }
  },
  methods: {
    switchNetwork(chainId:String) {
      const hexId = this.networks[chainId].hexId
      console.log('clicked', hexId)
      this.wallet.switchNetwork(hexId)
    }
  },
  computed: {
    networkCount():number {
      return Object.keys(this.deployments).length
    },
    networkToShow():number {
      if (this.hoverId != null) {
        return this.hoverId
      }
      if (this.wallet.chainId != null) {
        return this.wallet.chainId
      }
      return 0
    }
  }
}
</script>

<template>
<svgContainer>
  <web3Containment>

    <g :transform="'translate(0 ' + (ui.top + 80) + ')'">
      <g transform="scale(0.5)">
      <logo />
      </g>
      <line :x1="ui.left + 50" :x2="ui.right-50" y1="60" y2="60" stroke="#ffffff44" stroke-width="4" />
    </g>
    <text font-size="2em" :transform="'translate(0 ' + (ui.top + 200) + ')'">Choose a Network</text>
    <g transform="scale(1.4)">
      <g :transform="'translate(-100 ' + (networkCount * -15 ) + ')'">
        <g v-for="(network, key, index) in deployments" :transform="'translate(0 ' + index * 30 + ')'" @mouseenter="this.hoverId = key" @mouseleave="this.hoverId = null">
          <btn :val="key" :width="120" :height="28" @click="switchNetwork" font-size="0.9em" :text="networks[key].shortName" :selected="wallet.chainId == key" />
        </g>
      </g>
      <g transform="translate(-40 -150)" v-if="networkToShow > 0">
        <rect
          x="0"
          y="0"
          fill="#000000"
          fill-opacity="0.1"
          stroke-opacity="0.6"
          stroke="#ffffff"
          stroke-width="6"
          rx="15"
          ry="15"
          width="240"
          height="320" />
        <text transform="translate(120 30)">{{ networks[networkToShow] ? networks[networkToShow].name : 'Select A Network' }}</text>
        <g v-if="networks[networkToShow]">
          <g font-size="0.75em" opacity="0.75">
            <text transform="translate(120 60)">Native Token: {{ networks[networkToShow].currency.symbol }}</text>
            <text transform="translate(120 80)">Chain ID: {{ networks[networkToShow].hexId }}</text>
          </g>
          <text transform="translate(120 150)">{{ networks[networkToShow].description }}</text>
          <g v-if="wallet.chainId == networkToShow" transform="translate(120 280)">
            <text opacity="0.5" font-size="0.8em" transform="translate(0 -40)">you are connected to this network</text>
            <btn :width="210" :height="50" @click="routing.switchScreen('play')" font-size="1em" :text="'Play on ' + networks[networkToShow].shortName"  />
          </g>
        </g>
      </g>
    </g>

    <g v-if="wallet.switchingNetwork">
      <rect
        :x="ui.left + 50"
        :y="ui.top + 150"
        :width="ui.width - 100"
        :height="ui.height - 200"
        opacity="0.1"
        fill="#ffffff"
        stroke-width="0" />
      <spinner />
    </g>

  </web3Containment>
</svgContainer>
</template>

<style scoped>
</style>
