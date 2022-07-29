<script setup lang="ts">
import logo from '../assets/logo.svg.vue'
import btn from '../ui-primitives/button-basic.svg.vue'
import { useUI } from '../../stores/ui'
import { useWallet } from '../../stores/wallet'
</script>

<script lang="ts">
export default {
  data() {
    return {
      wallet: useWallet(),
      ui: useUI()
    }
  },
  mounted() {
    this.wallet.init()
  },
  methods: {
    async connectWallet() {
      await this.wallet.connect()
    },
    createWallet() {
      alert('this feature is not yet implemented')
    }
  },
  computed: {
  }
}
</script>

<template>
  <g :transform="'translate(0 ' + (ui.top + 80) + ')'">
    <g transform="scale(0.5)">
    <logo />
    </g>
    <line :x1="ui.left + 50" :x2="ui.right-50" y1="60" y2="60" stroke="#ffffff44" stroke-width="4" />
  </g>
  <text font-size="2em" :transform="'translate(0 ' + (ui.top + 200) + ')'">Wallet Collect</text>

  <btn transform="translate(0 -20)" @click="connectWallet" text="Connect Your Wallet" />

  <btn transform="translate(0 20)" @click="createWallet" text="Create Wallet" />

<text font-size="1em" :transform="'translate(0 ' + (200) + ')'">{{ wallet.status }}</text>
</template>

<style scoped>
</style>
