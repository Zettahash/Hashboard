<template lang="">
    <div class="flex-overview">
    <MarketCandles />
    <OrderBook />
    <BuySell />
  </div>
</template>
<script>
import MarketCandles from './../charts/MarketCandles.vue'
import OrderBook from './../tiles/OrderBook.vue'
import BuySell from './../tiles/BuySell.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components:{MarketCandles, OrderBook, BuySell},
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