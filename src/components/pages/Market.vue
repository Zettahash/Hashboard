<template lang="">
    <div class="flex-overview">
    <LoadingEle v-if="!payload" />
    <MarketCandles v-if="payload"/>
    <OrderBook v-if="payload" />
    <BuySell v-if="payload" />
  </div>
</template>
<script>
import LoadingEle from './../interface/LoadingEle.vue'
import MarketCandles from './../charts/MarketCandles.vue'
import OrderBook from './../tiles/OrderBook.vue'
import BuySell from './../tiles/BuySell.vue'
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components:{LoadingEle,MarketCandles, OrderBook, BuySell},
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