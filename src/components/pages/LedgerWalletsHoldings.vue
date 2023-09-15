<template lang="">
  <div>
    
  </div>
</template>
<script>
export default {
  name:'LedgerWalletsHoldings',
  mounted() {
    this.routeLoaded() 
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