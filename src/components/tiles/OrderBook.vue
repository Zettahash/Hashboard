<template lang="">
<div class="block half ui-ele" title="hash rate">
  <div class="head">
  <h3>Order Book</h3>
  <h4>{{payload.orderCount24hr}} orders opened in last 24 hours</h4>
  </div>
  <table>
  <tr><td>Price</td><td>Size ({{payload.exchange.unit}})</td><td>Sum ({{payload.exchange.unit}})</td></tr>
  <template v-for="object, index of payload.orders">
    <tr :key="index" :class="object.price >= 0.0837 ? 'good-hover':'bad-hover'">
      <td :class="object.price >= 0.0837 ? 'good':'bad'">{{object.price}}</td>
      <td>{{object.size}}</td>
      <td>{{object.sum}}</td>
    </tr>
  </template>
  </table>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  name: 'OrderBook',
  data() {
    return {
      activeHashrateIndex: 1,
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      application: 'application',
    }),
    hashRate() {
      return this.payload.hashrate.value
    },
    payload() {
      let tmp = {}
      if (this.application.uiDemoValues) {
        tmp.orderCount24hr = Math.floor(Math.random() * 1000)
        tmp.exchange = {}
        tmp.exchange.unit = "USD-T"
        tmp.orders = []
        
        for (let i = 0; i < 20; i++) {
          let multiplier = Math.floor(Math.random() * 100)>=50?1:-1
          let price = Number((Number(8.37 + (multiplier * (1 / (Math.ceil(Math.random() * 100)))))*.01).toFixed(6))
          let size = (Math.random() * 100).toFixed(2)
          let sum = (price*size).toFixed(6)
          tmp.orders.push({ time: 0, price: price, size: size, sum: sum })
        }
        tmp.orders = tmp.orders.sort((a) => {
          if (a.price > 0.0837) { return 0 }
          return 1
        })

      }
      return tmp
    },
  },
  methods: {
    stripHashrateText(str) {
      return str.replace("hashrate_", '').replace('hour', 'hr')
    },
  }
}
</script>

<style lang="scss" scoped>
.button-flex-organiser {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  width: 100%;
}
</style>
