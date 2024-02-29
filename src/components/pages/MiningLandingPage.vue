<template lang="html">
  <div class="flex-overview">
    <div class="full-width-header">
    </div>
    <div class="page-inner">
      <div class="blur-container">
        <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">

        <h1>Welcome back, #Hasher</h1>

        <img class="img faux-dash" :src="require('/src/assets/img/design/hashboard-89c2eb.webflow.io_reports.webp')">
      </div>
        <div class="text-overlay">
        <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">
        <h1>Welcome back, #Hasher</h1>
        <p>We're working on the Zettahash Mining & Energy displays.</p>
<p>Visit <router-link :to="{ name: 'consensus' }" class="link" >Consensus</router-link> for updates.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { walletShortName } from '@/utils/strings.js'
import { doDisconnect } from '@/utils/wallet'

export default {
  name: 'MiningLandingPage',
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

.centred-connect-btn {
  width: max-content;
  margin: auto;
}

.faux-dash {
  width: 100%;
  height: auto;
}

.page-inner {
  background: var(--neutral-7);
}

.blur-container{

  animation: toBlur 2s 1500ms ease forwards 1;
}

@keyframes toBlur {
  100% {
    filter: blur(10px);
  }
}
@keyframes toAppear {
  100% {
   opacity: 1;
  }
}

.text-overlay {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0,0,0,0.5);
    width: max-content;
    padding: 10px 30px 10px 30px;
    border-radius: 20px;
   opacity: 0;
   backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
  animation: toAppear 2s 1500ms ease forwards 1;
}
</style>