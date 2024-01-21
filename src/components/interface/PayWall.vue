<template lang="">
  <div class="modal-stationary">
    <h1><i class="i-alert-circle"></i> Message</h1>
    <template v-if="message==='needZH'">
    <p>Only Holders of the ZH token may participate on this platform.<br>
       Check back soon for details on acquiring ZH, or email <a href="mailto:zetta@zettahash.org" class="link">zetta@zettahash.org</a> for more information.</p>
    </template>

    <template v-if="message==='needAcc'">
    <p>{{needAccMsg}}</p>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line no-unused-vars
export default {
  name: 'PayWall',
  data() {
    return {
      needAccMsg: 'Checking for wallet connection...',
      timeout: false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
    message() {

      if (!this.application.walletConnected) { return 'needAcc' }
      if (!this.application.zhHolderBool) { return 'needZH' }
      return '?'
    },
    zhHolderBool() {
      return this.application.zhHolderBool
    },
  },
  watch: {
    zhHolderBool(value) {
      if (value == true) {
        clearTimeout(this.timeout)
        this.timeout = false
      }
    }
  },
  mounted() {
    window.payWallThis = this
    this.timeout = setTimeout(() => {
      if(!window.payWallThis.application.zhHolderBool)
     { window.payWallThis.needAccMsg = 'Connect your wallet to get started.'
      window.payWallThis = this
      this.$store.commit("setNotification", {
        title: "Connect your wallet to get started.",
        data: "You'll need to connect your wallet and hold at least 1ZH to continue.",
      })}
    }, 8000)
  },
}
</script>
<style lang="scss" scoped>
.modal-stationary {
  margin: 50px auto auto auto;
  height: auto;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: 20px;
  background: var(--neutral-10);

  h1 {
    margin-top: 0;
  }

  p {
    margin-bottom: 0;
  }
}</style>