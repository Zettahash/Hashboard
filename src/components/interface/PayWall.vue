<template lang="">
  <div class="modal-stationary">
    <h1><i class="i-alert-circle"></i> Message</h1>
    <template v-if="message==='needZH'">
    <p>Only Holders of the ZH token may participate on this platform.<br>
       Check back soon for details on acquiring ZH, or email <a href="mailto:zetta@zettahash.org" class="link">zetta@zettahash.org</a> for more information.</p>
    </template>

    <template v-if="message==='needAcc'">
    <p>Connect your wallet to get started.</p>
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
      // message: '',
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
    message() {

      if(!this.application.walletConnected){return 'needAcc'}
      if (!this.application.zhHolderBool) {return 'needZH'}
      return '?'
    },
  },
}
</script>
<style lang="scss" scoped>
  .modal-stationary{
    margin:50px auto auto auto;
    height: auto;
    width:500px;
    max-width:80vw;
    padding:30px;
    border-radius: 20px;
    background: var(--neutral-9);
    h1{
      margin-top:0;
    }
    p{margin-bottom:0;}
  }
</style>