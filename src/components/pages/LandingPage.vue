<template lang="html">
  <div class="flex-overview demo">
    <div class="full-width-header">
    </div>
    <div class="page-inner">
      <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">

      <h1>Welcome to #Hashboard</h1>
      <p>ZH Token-holders get access to the #Hashboard and can participate in the DAO Governance.</p>

      <div class="modal-relative centre" v-if="!application.zhHolderBool">
        <template v-if="message === 'needZH'">
          <h1>
            <i class="i-alert-circle"></i> Notice
          </h1>
          <p>Only Holders of the ZH token may participate on this platform.<br>
            Check back soon for details on acquiring ZH, or email <a href="mailto:zetta@zettahash.org"
              class="link">zetta@zettahash.org</a> for more information.</p>
          <p>You can disconnect this wallet, {{ walletShortName(wallet) }}, and try another account.</p>
          <p><a class="btn-link error" @click="doDisconnect()">Disconnect {{ walletShortName(wallet) }} <i
                class="i-log-out"></i></a></p>
        </template>
        <template v-if="message === 'waiting'">
          <h1>
            <a class="spinner"></a> Connecting...
          </h1>
          <p>Checking for wallet connection...</p>

        </template>
        <template v-if="message === 'needAcc'">
          <h1>
            <i class="i-alert-circle"></i> Welcome
          </h1>
          <p>Connect your wallet to get started.</p>
          <p class="centred-connect-btn">
            <WalletConnector />
          </p>
          <p>
            <template v-if="wallet">
              <a class="btn-link error" @click="reset()">Reset wallet connection</a>
            </template>
          </p>

        </template>
      </div>
      <template v-if="wallet">
      <div class="container">
      <div class="section">
        <h2>Dive right in to these #Hashboard features:</h2>
        <div class="flex-shortcuts">
        <router-link :to="{ name: 'protocol-proposals' }" class="btn"><i class="i-bulb"></i> View Proposals</router-link>
        <router-link :to="{ name: 'safe' }" class="btn"><i class="i-library"></i> Check ETH & ERC-20 Wallet balances</router-link>
        <router-link :to="{ name: 'specter' }" class="btn"><i class="i-library"></i> Check BTC Wallet balances</router-link>
        <router-link :to="{ name: 'market' }" class="btn"><i class="i-trending-up"></i> ZH Markets</router-link>
        <a href="https://teams.zettahash.org/signup_user_complete/?id=sy8det39ypgyxcjye9oxodk36a&md=link&sbr=fa" target="_blank" class="btn"><i class="i-forum"></i> Consensus</a>
        </div>
      </div>
      </div>
      </template>
      <div class="container">
        <img class="img overlap-lower"
          :src="require('/src/assets/img/design/6590e06479ac1d8d587b3952_dashdark-x-reports-page-dashboard-webflow-template.png')">
        <img class="img overlap-upper"
          :src="require('/src/assets/img/design/6590e06479ac1d8d587b3954_dashdark-x-products-page-dashboard-webflow-template-p-500.png')">
        <div class="text-overlay exempt">
          <p>Get Ready for next-level transparency.</p>
          <p v-if="application.zhHolderBool"><router-link :to="{ name: 'mining' }" class="btn">Enter
              Hashboard</router-link></p>
          <template v-else>
            <template v-if="message === 'needAcc'">
              <p>Connect your wallet to get started.</p>
              <p class="centred-connect-btn">
                <WalletConnector />
              </p>
              <p>
                <template v-if="wallet">
                  <a class="btn-link error" @click="reset()">Reset wallet connection</a>
                </template>
              </p>

            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import WalletConnector from '@/components/interface/WalletConnector.vue'
import { walletShortName } from '@/utils/strings.js'
import { doDisconnect } from '@/utils/wallet'

export default {
  name: 'LandingPage',
  data() {
    return {
      timeout: false,
      timeoutFunction: false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      wallet: 'wallet',

    }),
    message() {

      if (!this.timeout) { return 'waiting' }
      if (!this.application.walletConnected) { return 'needAcc' }
      if (!this.application.zhHolderBool) { return 'needZH' }
      return '?'
    },
    zhHolderBool() {
      return this.application.zhHolderBool
    },
  },
  components: {
    WalletConnector,
  },
  methods: {
    walletShortName, doDisconnect,
    reset() {
      this.doDisconnect()
    },
  },
  watch: {
    zhHolderBool(value) {
      if (value == true) {
        clearTimeout(this.timeoutFunction)
        this.timeoutFunction = false
      }
    }
  },
  mounted() {
    window.payWallThis = this
    this.timeoutFunction = setTimeout(() => {
      if (!window.payWallThis.application.zhHolderBool) {
        window.payWallThis.timeout = true
        window.payWallThis = this
      }
    }, 8000)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';

.section{
  box-shadow: 0 0 0 1px var(--neutral-4);
  border-radius: $radius1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: max-content;
  padding: 20px;
  gap: 10px;
  h2{
    margin-top:0;
    text-align: center;
  }
}

.flex-shortcuts{
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  a{
    &:nth-of-type(1){&:not(:hover){background:linear-gradient(60deg, var(--blue-1), var(--light-cerulean));}}
    &:nth-of-type(2){&:not(:hover){background:linear-gradient(60deg, var(--blue-1), var(--lime));}}
    &:nth-of-type(3){&:not(:hover){background:linear-gradient(60deg, var(--blue-1), var(--light-amber));}}
    &:nth-of-type(4){&:not(:hover){background:linear-gradient(60deg, var(--blue-1), var(--crimson));}}
    &:nth-of-type(5){&:not(:hover){background:linear-gradient(60deg, var(--blue-1), var(--violet));}}
  }
}
.modal-relative {
  margin: 40px auto;
  height: max-content;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: $radius1;
  background: var(--neutral-10);
  position: relative;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
h1{
  justify-content: center;
  align-items: center;
}

.icon {
  height: 80px;
  width: auto;
  margin: 20px auto;
  display: block;
}

p {
  max-width: $ui-width / 2;
  margin: 20px auto;
  display: block;
  text-align: center;
}


.centred-connect-btn{
  width: max-content;
    margin: auto;
}
</style>