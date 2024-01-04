<template lang="">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Vote</h1>
      <p></p>

      <ProtocolVotingLocations />
    </div>
  </div>
</template>
<script>
import ProtocolVotingLocations from './../tiles/ProtocolVotingLocations.vue'

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
  components: {
    ProtocolVotingLocations,
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