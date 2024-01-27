<template lang="">
  <div>
  <template v-if="!web3ModalAccountIsConnected">
    <w3m-button balance="hide"/>
  <!-- <div class="w3m-button" balance="show"></div> -->
  <!-- <w3m-network-button disabled/> -->
    <!-- <w3m-button></w3m-button> -->
</template> 

</div>
</template> 
<script>
import { mapGetters } from 'vuex';
import { genericABI } from '@/components/data/genericABI'
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount } from '@web3modal/ethers/vue'
import { BrowserProvider, formatUnits, Contract } from 'ethers'
const alchemyKey = process.env.VUE_APP_ALCHEMY_API_KEY;
// const ethersProvider = new AlchemyProvider('mainnet', alchemyKey)

const projectId = process.env.VUE_APP_WALLET_CONNECT_PROJECT_ID;
const metadata = {
  name: 'Zettahash Hashboard',
  description: 'Zettahash Hashboard',
  url: 'https://hashboard.zettahash.org',
  icons: [require('@/assets/img/tokens/zh.png')]
}

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`,
}
const chains = [mainnet]
const ethersConfig = defaultConfig({ metadata })
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
// eslint-disable-next-line no-unused-vars
const web3Modal = createWeb3Modal({ ethersConfig, chains, projectId, themeMode, themeVariables, tokens })

const { address, chainId, isConnected } = useWeb3ModalAccount()

export default {
  name: "WalletConnector",
  data() {
    return {
      zettahash: '0x2C0e15190aCB858Bf74447928Cbd8Fb9709dCB19',
      checkConnectionInterval: false,
      network: false,
      buttonConnectUI: false,
      web3ModalAccountAddress: address,
      web3ModalAccountChainId: chainId,
      web3ModalAccountIsConnected: isConnected,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      wallet:'wallet',
    }),
  },
  mounted() {
    this.init()
    window.globalSelf = this
  },
  watch: {
    web3ModalAccountIsConnected(value) {
      console.log("web3ModalAccountIsConnected:", value)
      this.updateAccount()
    },
    web3ModalAccountAddress(value) {
      console.log("web3ModalAccountAddress:", value)
      this.updateAccount()
    },
  },
  methods: {
    async init() {
      try {
        this.$store.commit('setDynamic', {
          item: 'walletConnectModal',
          value: web3Modal
        })
        this.updateAccount()
      } catch (e) {
        console.log(e)
      }
    },
    async fetchBalance() {
      const walletProvider = this.application.walletConnectModal.getWalletProvider()
      const ethersProvider = new BrowserProvider(walletProvider)
      const zhContract = new Contract(this.zettahash, genericABI, ethersProvider)
      const zhBalance = await zhContract.balanceOf(this.web3ModalAccountAddress)
      const formatted = await formatUnits(zhBalance, 18)
      return { formatted: formatted }
    },
    async updateAccount() {
      if (this.web3ModalAccountIsConnected) {
        const balance = await this.fetchBalance()
        let holderBool = Number(balance.formatted) >= 1 ? true : false

        this.$store.commit('setDynamic', {
          item: 'zhHolderBool',
          value: holderBool
        })
        this.$store.commit('setDynamic', {
          item: 'zhBalance',
          value: balance.formatted
        })

        this.$store.commit('setWallet', this.web3ModalAccountAddress)
        this.$store.dispatch('getSnapshotUser', { address: this.web3ModalAccountAddress, store: this.$store });
        this.$store.dispatch('initProfile', { address: this.web3ModalAccountAddress, store: this.$store });

        this.$store.commit('setDynamic', {
          item: 'walletConnected',
          value: true
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