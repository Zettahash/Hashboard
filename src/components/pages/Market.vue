<template lang="">
    <div class="flex-overview">
    <!-- <LoadingEle v-if="!payload" /> -->
    <!-- <iframe id="dextswap-aggregator-widget"
    title="DEXTswap Aggregator"
    width="400" height="420"
    src="https://www.dextools.io/widget-aggregator/en/swap/eth/0x2c0e15190acb858bf74447928cbd8fb9709dcb19"></iframe> -->
    <div class="ui-ele">
    <h1 class="title">Markets</h1>
      <p>Here you can find data on ZH trading prices as well as links to exchanges listing ZH.</p>
  </div>
  
    <iframe id="dextools-widget"
    title="DEXTools Trading Chart"
    :width="width" :height="height"
    src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x501a9614b47040b84033147adae98a0b097e8981?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"></iframe>
    <PlacesToBuyZH />
    <!-- <MarketCandles v-if="payload"/> -->
    <!-- <OrderBook v-if="payload" /> -->
    <!-- <BuySell v-if="payload" /> -->
  </div>
</template>
<script>
// import LoadingEle from './../interface/LoadingEle.vue'
import PlacesToBuyZH from './../tiles/PlacesToBuyZH.vue'
// import MarketCandles from './../charts/MarketCandles.vue'
// import OrderBook from './../tiles/OrderBook.vue'
// import BuySell from './../tiles/BuySell.vue'
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components: {
    // LoadingEle,
    PlacesToBuyZH,
    // MarketCandles,
    // OrderBook, BuySell
  },
  mounted() {
    this.routeLoaded()
  },
  computed: {
    ...mapGetters({
      payload: 'payload',
      application: 'application',
    }),
    uiSidebarCollapse() {
      return this.application.uiSidebarCollapse
    },
    width() {
      return this.uiSidebarCollapse ? (window.outerWidth > 700? window.innerWidth - 110 :window.innerWidth - 40) : window.innerWidth - 320
    },
    height() {
      return window.innerHeight <= 800 ? 380 : (window.innerHeight > 1200 ? 480 : window.innerHeight * .4)
    },
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
<style lang="scss" scoped>
#dextools-widget {
  border: 0;
  border-radius: 20px;
  margin: auto;
}
</style>