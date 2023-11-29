<template lang="">
  <div>
  <div class="w3m-core-button"></div>
    <!-- <w3m-core-button></w3m-core-button> -->
  </div>
</template> 
<script>
import { mapGetters } from 'vuex';
import { configureChains, createClient } from "@wagmi/core";
import { mainnet, goerli } from "@wagmi/core/chains";
 
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";

export default {
  name: "WalletConnector",
  // components:['w3m-core-button'],
  data() {
    return {
      checkConnectionInterval: false,
      network: false,
      buttonConnectUI: false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
  },
  mounted() {
    const html = document.createElement('w3m-core-button')
    document.querySelector(".w3m-core-button").replaceWith(html)
    this.init()
  },
  methods: {
    async init() {
      // 1. Define constants
      const projectId = process.env.VUE_APP_WALLET_CONNECT_PROJECT_ID;
      const chains = [goerli, mainnet];

      // 2. Configure wagmi client
      const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
      const wagmiClient = createClient({
        autoConnect: true,
        connectors: w3mConnectors({ chains, version: 1, projectId }),
        provider,
      });

      // 3. Create ethereum and modal clients
      const ethereumClient = new EthereumClient(wagmiClient, chains);
      const web3modal = new Web3Modal(
        {
          projectId,
          walletImages: {
            safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
          },
        },
        ethereumClient
      );
      web3modal.setDefaultChain(mainnet)

      web3modal.setTheme({
        themeMode: 'dark',
        themeVariables: {
          '--w3m-font-family': 'Roboto, Arial, Helvetica, sans-serif',
          '--w3m-z-index': '89',
          '--w3m-background-border-radius': '20px',
          '--w3m-container-border-radius': '20px',
          '--w3m-container-border-width': '20px',
          '--w3m-wallet-icon-border-radius': '15px',
          '--w3m-input-border-radius': '28px',
          '--w3m-button-border-radius': '100px',
          '--w3m-notification-border-radius': '36px',
          '--w3m-secondary-button-border-radius': '28px',
          '--w3m-icon-button-border-radius': '50%',
          '--w3m-button-hover-highlight-border-radius': '10px',
          '--w3m-text-big-bold-size': '20px',
          '--w3m-text-big-bold-weight': '500',
          '--w3m-text-big-bold-line-height': '24px',
          '--w3m-text-big-bold-letter-spacing': '-0.03em',
          '--w3m-text-big-bold-text-transform': 'none',
          '--w3m-text-xsmall-bold-size': '10px',
          '--w3m-text-xsmall-bold-weight': '500',
          '--w3m-text-xsmall-bold-line-height': '12px',
          '--w3m-text-xsmall-bold-letter-spacing': '0.02em',
          '--w3m-text-xsmall-bold-text-transform': 'uppercase',
          '--w3m-text-xsmall-regular-size': '12px',
          '--w3m-text-xsmall-regular-weight': '500',
          '--w3m-text-xsmall-regular-line-height': '14px',
          '--w3m-text-xsmall-regular-letter-spacing': '-0.03em',
          '--w3m-text-xsmall-regular-text-transform': 'none',
          '--w3m-text-small-thin-size': '14px',
          '--w3m-text-small-thin-weight': '500',
          '--w3m-text-small-thin-line-height': '16px',
          '--w3m-text-small-thin-letter-spacing': '-0.03em',
          '--w3m-text-small-thin-text-transform': 'none',
          '--w3m-text-small-regular-size': '14px',
          '--w3m-text-small-regular-weight': '500',
          '--w3m-text-small-regular-line-height': '16px',
          '--w3m-text-small-regular-letter-spacing': '-0.03em',
          '--w3m-text-small-regular-text-transform': 'none',
          '--w3m-text-medium-regular-size': '16px',
          '--w3m-text-medium-regular-weight': '500',
          '--w3m-text-medium-regular-line-height': '-18px',
          '--w3m-text-medium-regular-letter-spacing': '-0.03em',
          '--w3m-text-medium-regular-text-transform': 'none',
          '--w3m-success-color': 'rgb(38,181,98)',
          '--w3m-error-color': 'rgb(242, 90, 103)',
          '--w3m-background-image-url': 'none',
        }
      })

      // await console.log(ethereumClient, web3modal)
//       window.ethereum.on('accountsChanged', function (accounts) {
//   // Time to reload your interface with accounts[0]!
// })

// window.ethereum.on('networkChanged', function (networkId) {
//   // Time to reload your interface with the new networkId
// })
// const account = getAccount()

//       this.$store.commit('setDynamic', {
//         item: 'wallet',
//         value: account
//       })
      this.ui()
      window.globalSelf = this
      window.addEventListener("focus", ()=>{window.globalSelf.ui()})
      window.addEventListener("mousemove", ()=>{window.globalSelf.ui()})
      window.addEventListener("click", ()=>{window.globalSelf.ui()})
    },
    async ui() {

      this.buttonConnectUI = setInterval(() => {
        const core = document.querySelector('w3m-core-button')
        if (core.shadowRoot && core.shadowRoot.querySelectorAll('w3m-account-button').length > 0) {
          const btnBig = core.shadowRoot.querySelector('w3m-account-button').shadowRoot.querySelector('w3m-button-big')
          btnBig.querySelector('w3m-avatar').style['margin-right'] = "5px"
          btnBig.shadowRoot.querySelector('button').style.height = "40px"
          btnBig.shadowRoot.querySelector('button').style.padding = "0px calc(1.5rem / 1.62)"
          clearInterval(this.buttonConnectUI)
          this.buttonConnectUI = false
        }
        if (core.shadowRoot && core.shadowRoot.querySelectorAll('w3m-connect-button').length > 0) {
          const btnBig = core.shadowRoot.querySelector('w3m-connect-button').shadowRoot.querySelector('w3m-button-big')
          btnBig.querySelector('w3m-text').style['margin-left'] = "5px"
          btnBig.shadowRoot.querySelector('button').style.height = "40px"
          btnBig.shadowRoot.querySelector('button').style.padding = "0px calc(1.5rem / 1.62)"
          clearInterval(this.buttonConnectUI)
          this.buttonConnectUI = false
        }
      }, 100)
    }
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