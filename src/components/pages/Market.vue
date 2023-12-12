<template lang="">
    <div class="flex-overview">
    <LoadingEle v-if="!payload" />
    <iframe id="dextswap-aggregator-widget"
    title="DEXTswap Aggregator"
    width="400" height="420"
    src="https://www.dextools.io/widget-aggregator/en/swap/eth/0x2c0e15190acb858bf74447928cbd8fb9709dcb19"></iframe>

    <iframe id="dextools-widget"
    title="DEXTools Trading Chart"
    width="500" height="400"
    src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x501a9614b47040b84033147adae98a0b097e8981?theme=light&chartType=2&chartResolution=30&drawingToolbars=false"></iframe>
    <!-- <MarketCandles v-if="payload"/> -->
    <!-- <OrderBook v-if="payload" /> -->
    <!-- <BuySell v-if="payload" /> -->
  </div>
</template>
<script>
import LoadingEle from './../interface/LoadingEle.vue'
// import MarketCandles from './../charts/MarketCandles.vue'
// import OrderBook from './../tiles/OrderBook.vue'
// import BuySell from './../tiles/BuySell.vue'
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components: {
    LoadingEle,
    // MarketCandles,
    // OrderBook, BuySell
  },
  mounted() {
    this.routeLoaded() 
  },
  computed: {
    ...mapGetters({payload: 'payload',}),
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