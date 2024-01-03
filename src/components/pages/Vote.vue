<template lang="">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Vote</h1>
      <p>We're working on getting this section ready for you.</p>
    </div>
  </div>
</template>
<script>
import snapshot from '@snapshot-labs/snapshot.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Vote',
  mounted() {
    this.routeLoaded()
    const hub = 'https://hub.snapshot.org'; // or https://testnet.hub.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    console.log(client)
  },
  methods: {
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    }
  }
}
</script>
<style lang="">
  
</style>