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
  <text font-size="2em" :transform="'translate(0 ' + (ui.top + 150) + ')'">Please connect your wallet.</text>

  <btn font-size="30" :height="80" transform="translate(0 -20)" @click="connectWallet" text="Connect Wallet" />


  <text fill="#888888" font-size="0.9em" :transform="'translate(0 ' + (250) + ')'">{{ wallet.status }}</text>

</template>

<style scoped>
</style>
