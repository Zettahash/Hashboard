<template lang="">
  <div :class="!application.uiSidebarCollapse? 'flex-overview compact':'flex-overview'">
      <div v-for="(item, index) of payload" :class="'block ui-ele ' + item.size" :key="index" :title="item.date">
      <div class="head">
        <div class="icon-group">
          <img :src="getIcon(item.currency)">
          <img :src="getIcon('zh')">
        </div>
        <div class="type"><span>{{item.type}}</span> <span v-if="item.badge" class="badge">{{item.badge}}</span></div>
        <div class="title">{{item.title}}</div>
        <i class="i-check-square good" v-if="item.verified"></i>
        <i class="i-star star" v-if="item.favourite"></i>
      </div>
      <div class="body">
        <div class="data">{{item.data}} {{item.displayCurrency?item.displayCurrency:''}}</div>
        <div class="sub" v-if="item.sub">{{item.sub}} 
          <span :class="item.change>0?'good plus pc':'bad pc'">{{item.change?item.change:''}}</span>
        </div>
      </div>
        <div class="graph" v-if="item.graph">
          <AssetsStats :dataValues="item.graph.data" :colour="item.graph.colour" />
        </div>
      </div>
  </div>
</template>
<script>

import AssetsStats from './../charts/AssetsStats.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    AssetsStats,
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Holdings',
  data() {
    return {
      samplePayload: [
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'ZH Foundation',
          data: '49,500,000',
          displayCurrency: 'ZH',
          currency: 'ETH',
          sub: false,
          change: '+0.0%',
          graph: {
            data: [49500000, 49500000],
            colour: "#5c6bc0",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'ZH Private Sale',
          data: '46,566,000',
          displayCurrency: 'ZH',
          currency: 'ETH',
          sub: false,
          change: '+0.0%',
          graph: {
            data: [46566000, 46566000],
            colour: "#5c6bc0",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'ZH Presale',
          data: '250,000,000',
          displayCurrency: 'ZH',
          currency: 'ETH',
          sub: false,
          change: '+0.0%',
          graph: {
            data: [250000000, 250000000],
            colour: "#5c6bc0",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'ZH Holdings Contract',
          data: '300,000,000',
          displayCurrency: 'ZH',
          currency: 'ETH',
          sub: false,
          change: '+0.0%',
          graph: {
            data: [300000000, 300000000],
            colour: "#5c6bc0",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Bitcoin',
          badge: false,
          title: 'Zettahash BTC Holdings',
          data: '58.427652',
          displayCurrency: 'BTC',
          currency: 'BTC',
          sub: '$1,576,482.22 USD',
          change: '+0.0%',
          graph: {
            data: [58.427652, 58.427652, 58.427652],
            colour: "#d97919",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },


        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'Zettahash USDT Holdings',
          data: '265,876.76',
          displayCurrency: 'USDT',
          currency: 'USD-T',
          sub: '$265,876.76',
          change: '+0.0%',
          graph: {
            data: [265876.76, 265876.76],
            colour: "#00acc1",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'ERC-20',
          title: 'Zettahash USDC Holdings',
          data: '165,736.36',
          displayCurrency: 'USDC',
          currency: 'USD-C',
          sub: '$165,736.36',
          change: '+0.0%',
          graph: {
            data: [165736.36, 165736.36],
            colour: "#1e88e5",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Ethereum',
          badge: false,
          title: 'Zettahash ETH Holdings',
          data: '536.25',
          displayCurrency: 'ETH',
          currency: 'ETH',
          sub: '$897,482.91 USD',
          change: '+0.0%',
          graph: {
            data: [536.25, 536.25],
            colour: "#5c6bc0",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Bitcoin',
          badge: false,
          title: 'Zettahash BTC Mining Wallet',
          data: '92.14234',
          displayCurrency: 'BTC',
          currency: 'BTC',
          sub: '$2,486,341.29 USD',
          change: '+0.0%',
          graph: {
            data: [92.14234, 92.14234],
            colour: "#ff8f00",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
    }),
    payload() {
      if (this.application.uiDemoValues) { return this.samplePayload }
      let masterPayload = []
      for (const key of Object.keys(this.holdings)) {
        let instance = this.holdings[key]
        for (const [key, value] of Object.entries(instance)) {
          let childObject = {}
          let balance = value.balance
          let colour = "#fff"
          let type = false
          let historyBalanceMultiplier = 0
          switch (value.unit) {
            case 'BTC':
              historyBalanceMultiplier = 1/100000000
              balance = balance > 0 ? Number(balance) / 100000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#ff8f00"
              break;
            case 'ETH':
              historyBalanceMultiplier = 1/1000000000000000000
              balance = balance > 0 ? Number(balance) / 1000000000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#5c6bc0"
              break;
            case 'USD-T':
            case 'USD-C':
              historyBalanceMultiplier = 1000000000000
              balance = balance > 0 ? Number(balance) * 1000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = value.unit === "USD-C" ? "#1e88e5" : "#00acc1"
              type = "token"
              break;
            default:
          }
          childObject.size = 'asset-complicated small'
          childObject.displayCurrency = value.unit.replace(/-/g, '')
          childObject.currency = value.unit
          childObject.type = value.unit
          childObject.badge = type
          childObject.id = key
          childObject.data = Number(balance).toLocaleString('en-GB')
          childObject.title = value.name
          childObject.graph = { data: [], colour: colour }

          if (this.rates && this.rates[childObject.displayCurrency]) {
            childObject.sub = `$${Number((balance * Number(this.rates[childObject.displayCurrency].priceUsd)).toFixed(2)).toLocaleString('en-GB')} USD`
            childObject.change = Number(this.rates[childObject.displayCurrency].changePercent24Hr).toFixed(2)
          }

          let history = value.history
          for (const [key, value] of Object.entries(history)) {
            childObject.graph.key = key
            let formattedBalance = value.balance * historyBalanceMultiplier
            if (value.balance) { childObject.graph.data.push(formattedBalance) }
          }
          masterPayload.push(childObject)
        }
      }
      return masterPayload

      // {
      //     size: 'asset-complicated small',
      //     type: 'Token',
      //     badge: 'ERC-20',
      //     title: 'ZH Foundation',
      //     data: '49,500,000',
      //     displayCurrency: 'ZH',
      //     currency: 'ETH',
      //     sub: false,
      //     change: '+0.0%',
      //     graph: {
      //       data: [49500000, 49500000],
      //       colour: "#5c6bc0",
      //     },
      //     date: '',
      //     favourite: false,
      //     verified: false,
      //     info: ''
      //   },
    },
  },
  mounted() {
    this.routeLoaded()
  },
  methods: {
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    },
    getIcon(str) {
      if (!str) { return false }
      let token = str.toLowerCase().replace(/-/g, '')
      try {
        return require(`/src/assets/img/tokens/${token}.png`)
      } catch (e) { console.log(e) }
      try {
        return require(`/src/assets/img/tokens/${token}.svg`)
      } catch (e) { console.log(e) }
      try {
        let tokenAlpha = token.replace(/-/g, '')
        return require(`/src/assets/img/tokens/${tokenAlpha}.png`)
      } catch (e) { console.log(e) }
    },
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
</style>