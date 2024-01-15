<template lang="">
  <div>
    <w3m-button balance="show"/>
  <!-- <div class="w3m-button" balance="show"></div> -->
  <!-- <w3m-network-button disabled/> -->
    <!-- <w3m-button></w3m-button> -->
  </div>
</template> 
<script>
import { mapGetters } from 'vuex';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { watchAccount, getAccount, fetchBalance } from '@wagmi/core'
import { mainnet, arbitrum } from 'viem/chains'

const projectId = process.env.VUE_APP_WALLET_CONNECT_PROJECT_ID;
const metadata = {
  name: 'Zettahash Hashboard',
  description: 'Zettahash Hashboard',
  url: 'https://hashboard.zettahash.org',
  icons: ['https://hashboard.zettahash.org/src/assets/img/tokens/zh.png']
}
const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
const themeMode = 'dark'
const themeVariables = {
  '--w3m-font-family': "'Roboto', Arial, Helvetica, sans-serif",
  '--w3m-accent': '#0062ff',
  '--w3m-color-mix': '#3783ff',
}
const tokens = {
  1: {
    address: '0x2C0e15190aCB858Bf74447928Cbd8Fb9709dCB19',
  },
}
createWeb3Modal({ wagmiConfig, projectId, chains, themeMode, themeVariables, tokens })

export default {
  name: "WalletConnector",
  data() {
    return {
      zettahash: '0x2C0e15190aCB858Bf74447928Cbd8Fb9709dCB19',
      checkConnectionInterval: false,
      network: false,
      buttonConnectUI: false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
    wagmiConnected() { return this.application['wagmi.connected'] },
  },
  mounted() {
    this.init()
    window.globalSelf = this
    watchAccount((account) => window.globalSelf.updateAccount(account))
  },
  watch: {
    wagmiConnected(value) {
      console.log("wagmiConnected:", value)
    },
  },
  methods: {
    async init() {
    },
    async updateAccount(account) {
      const { isConnected } = getAccount()
      if (account.isConnected) {
        const balance = await fetchBalance({
          address: account.address,
          token: this.zettahash,
        })
        let holderBool = Number(balance.formatted) >= 1 ? true : false

        this.$store.commit('setDynamic', {
          item: 'zhHolderBool',
          value: holderBool
        })
        this.$store.commit('setDynamic', {
          item: 'zhBalance',
          value: balance.formatted
        })
      } else {
        this.$store.commit('setDynamic', {
          item: 'zhHolderBool',
          value: false
        })
        this.$store.commit('setDynamic', {
          item: 'zhBalance',
          value: '0.00'
        })
      }

      if (isConnected) {

        this.$store.commit('setWallet', account.address)
        this.$store.dispatch('getSnapshotUser', { address: account.address, store: this.$store });
        this.$store.dispatch('initProfile', { address: account.address, store: this.$store });
        this.$store.commit('setDynamic', {
          item: 'walletConnected',
          value: true
        })
      } else {

        this.$store.commit('setDynamic', {
          item: 'walletConnected',
          value: false
        })
      }
    },
  },
}
</script>
<style lang="scss">
.w3m-small {
  min-height: 45px !important;
}

#w3m-overlay.w3m-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

[label='Disconnect'] {
  color: red !important;
}
</style>