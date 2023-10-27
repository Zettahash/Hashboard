<template lang="">
    <div class="flex-overview">

    <MarketCandles />
  </div>
</template>
<script>
import MarketCandles from './../charts/MarketCandles.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components:{MarketCandles},
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