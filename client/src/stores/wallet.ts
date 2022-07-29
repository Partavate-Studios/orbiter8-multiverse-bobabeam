import { defineStore } from 'pinia'
import { ethers } from "ethers"

export const useWallet = defineStore('wallet', {
  state: () => {
    return {
      hasWallet: false,
      isConnected: false,
      signer: null as ethers.Signer | null,
      signerAddress: null,
      provider: null as ethers.providers.Web3Provider | null,
      chain: null,
      chainId: null,
      status: '',
      block: null,
      switchingNetwork: false
    }
  },
  actions: {

    async init() {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      } catch (e:any) {
        this.status = 'No wallet found.'
        console.log(e.message)
        return
      }
      this.hasWallet = true
      this.status = 'Wallet avaialble.'

      //TODO: some wallets may not be able to return
      //chain data until after there is a signer?
      await this.getChainData()
    },

    async getChainData() {
      try {
        this.chain = await this.provider.getNetwork()
      } catch (e:any) {
        this.log(e.message)
        return
      }
      this.chainId = this.chain.chainId
      this.status = 'Compatible EVM network discovered.'
    },


    async connect() {
      if (!this.hasWallet) {
        return
      }
      try {
        await this.provider.send("eth_requestAccounts", [])
        await this.getSigner()
      } catch (e:any) {
        console.log(e.message)
        return
      }
    },

    async getSigner() {
      try {
        this.signer = await this.provider.getSigner()
        this.signerAddress = await this.signer.getAddress()
        console.log('signer is ', this.signerAddress)
      } catch (e:any) {
        this.log(e.message)
        return
      }
      this.applyEvents()
      this.isConnected = true
      console.log('Signer Address: ', this.signerAddress)
    },

    applyEvents () {
      window.ethereum.removeAllListeners()
      window.ethereum.on('accountsChanged', async () => {
        console.log('account changed')
        this.signer = null
        this.signerAddress = null
        this.isConnected = false
        this.getSigner()
      })
      window.ethereum.on('connected', async () => {
        console.log('account re-connected')
        this.getSigner()
      })
      window.ethereum.on('disconnect', async () => {
        console.log('account disconnected')
        if (!this.switchingNetwork) {
          this.signer = null
          this.signerAddress = null
          this.isConnected = false
        }
      })
      window.ethereum.on('chainChanged', async () => {
        console.log('chain changed')
        this.getChainData()
      }),
      this.provider.removeAllListeners()
      this.provider.on("block", (blockNumber:Number) => {
        this.block = blockNumber
      })
      this.switchingNetwork = false
    },

    async switchNetwork(chainId:String) {
      this.switchingNetwork = true
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }]
        });
      } catch (e) {
        console.log('Error requesting network.', e.message)
        /*
        if (confirm('Polygon Mainnet was not found. Would you like us to try to add it?')) {
          let data = [{
            chainId: chainId,
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com/']
          }]
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: data
            });
          } catch (e) {
            console.log('Error requesting network.', e.message)
            store.alert = 'We were unable to add the network.'
          }
        }
        */
      }
      setTimeout(function(){ this.switchingNetwork = false }.bind(this), 500)
    },

    async getContract(address:string, abi:any) {
      const avatarContract =  await new ethers.Contract(address, abi, this.signer)
      return avatarContract
    }
  }
})
