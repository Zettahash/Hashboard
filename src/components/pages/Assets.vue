<template lang="">
  <div class="flex-overview">
    <template v-for="(item, index) of payload">
      <div :class="'block ui-ele ' + item.size" :key="index" :title="item.date">
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
        <div class="sub" v-if="item.sub">{{item.sub}} <span :class="item.change.substring(0,1)=='+'?'good':'bad'">{{item.change?item.change:''}}</span></div>
      </div>
        <div class="graph" v-if="item.graph">
          <AssetsStats :dataValues="item.graph.data" :colour="item.graph.colour" />
        </div>
      </div>
    </template>

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
  name: 'Assets',
  data() {
    return {
      samplePayload: [
        {
          size: 'asset-complicated wide',
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
          size: 'asset-complicated wide',
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
          size: 'asset-complicated wide',
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
      ],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
    }),
    payload() {
      if (this.application.uiDemoValues) { return this.samplePayload }
      return false
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
      let token = str.toLowerCase()
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