<template lang="html">
  <div class="modal-stationary">

    <template v-if="message === 'needZH'">
      <h1>
        <i class="i-alert-circle"></i> Notice
      </h1>
      <p>Only Holders of the ZH or ZHD token may participate on this platform.<br>
        Email <a href="mailto:zetta@zettahash.org"
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
      <p>
        <WalletConnector />
      </p>
      <p>
        <template v-if="wallet">
          <a class="btn-link error" @click="reset()">Reset wallet connection</a>
        </template>
      </p>

    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import WalletConnector from './WalletConnector.vue'
import { walletShortName } from '@/utils/strings.js'
import { doDisconnect } from '@/utils/wallet.js'

export default {
  name: 'PayWall',
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
@import 'src/assets/scss/constants';
.modal-stationary {
  margin: 50px auto auto auto;
  height: auto;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: $radius1;
  background: var(--neutral-10);

  h1 {
    margin-top: 0;
  }

  p {
    margin-bottom: 0;
  }
}
</style>