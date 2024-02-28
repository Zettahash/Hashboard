<template lang="html">
  <div class="flex-overview">
    <div class="full-width-header">
    </div>
    <div class="page-inner">
      <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">

      <h1>Welcome to #Hashboard</h1>
      <p>ZH Token-holders get access to the #Hashboard and can participate in the DAO Governance.</p>

      <div class="container">
        <img class="img overlap-lower"
          :src="require('/src/assets/img/design/6590e06479ac1d8d587b3952_dashdark-x-reports-page-dashboard-webflow-template.png')">
        <img class="img overlap-upper"
          :src="require('/src/assets/img/design/6590e06479ac1d8d587b3954_dashdark-x-products-page-dashboard-webflow-template-p-500.png')">
        <div class="text-overlay">
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

.modal-relative {
  margin: 40px auto;
  height: max-content;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: 15px;
  background: var(--neutral-10);
  position: relative;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.full-width-header {
  width: 100%;
  min-height: 500px;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: var(--neutral-8);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: radial-gradient(var(--neutral-10) 20%, transparent 20%);
    background-size: 20px 20px;
    background-repeat: repeat;
    display: block;
    position: absolute;
    z-index: 2;
  }

  &::before {
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(ellipse at top left, var(--indigo) -100%, transparent 50%), radial-gradient(ellipse at bottom right, var(--crimson) -100%, transparent 50%);
    display: block;
    position: absolute;
    z-index: 1;
  }

  >* {
    z-index: 3;
    position: relative;
  }
}
.centred-connect-btn{
  width: max-content;
    margin: auto;
}
</style>