<script setup lang="ts">
import { useWallet } from '../../stores/wallet'
import walletConnect  from './_walletConnect.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      wallet: useWallet()
    }
  },
}
</script>

<template>
<slot v-if="wallet.isConnected" />
<walletConnect v-else />
</template>