<template lang="">
  <div class="flex-overview">
    <template v-for="(item, index) of samplePayload">
      <div :class="'block ' + item.size" :key="index" :title="item.date">
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
        <div class="data">{{item.data}} {{item.currency?item.currency:''}}</div>
        <div class="sub">{{item.sub}} <span :class="item.change.substring(0,1)=='+'?'good':'bad'">{{item.change?item.change:''}}</span></div>
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
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'Ethereum',
          title: 'Tether USD',
          data: '26,386.77',
          currency: 'USD-T',
          sub: '$26,386.77',
          change: '+0.01%',
          graph: {
            data: [25386, 26186, 26286, 26380, 26380.77, 26386.77],
            colour: "#4db6ac",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'Ethereum',
          title: 'Tether USD',
          data: '26,386.77',
          currency: 'USD-T',
          sub: '$26,386.77',
          change: '+0.01%',
          graph: {
            data: [26386.77, 26386.77],
            colour: "#4db6ac",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Token',
          badge: 'Ethereum',
          title: 'USD Coin',
          data: '26,386.77',
          currency: 'USD-C',
          sub: '$26,386.77',
          change: '-0.01%',
          graph: {
            data: [25386, 26186, 26286, 26380, 26380.77, 26386.77],
            colour: "#0062ff",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Bitcoin',
          badge: 'Segwit',
          title: 'Bitcoin Cold Storage',
          data: '26,386.77',
          currency: 'BTC',
          sub: '$26,386.77',
          change: '-0.01%',
          graph: {
            data: [25386, 26186, 26286, 26380, 26380.77, 26386.77],
            colour: "#d97919",
          },
          date: '',
          favourite: false,
          verified: false,
          info: ''
        },
        {
          size: 'asset-complicated small',
          type: 'Bitcoin',
          badge: 'Native Segwit',
          title: 'Bitcoin Hot',
          data: '26,386.77',
          currency: 'BTC',
          sub: '$26,386.77',
          change: '-0.01%',
          graph: {
            data: [253, 253, 253, 26186, 26286, 26380, 26380.77, 26386.77],
            colour: "#d97919",
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
          title: 'Zettahash',
          data: '26,386.77',
          currency: 'ETH',
          sub: '$26,386.77',
          change: '+0.01%',
          graph: {
            data: [253, 253, 253, 26186, 26286, 26380, 26380.77, 26386.77],
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
          title: 'Zettahash',
          data: '26,386.77',
          currency: 'ETH',
          sub: '$26,386.77',
          change: '+0.01%',
          graph: {
            data: [253, 253, 253, 26186, 26286, 26380, 26380.77, 26386.77],
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
          title: 'Zettahash',
          data: '26,386.77',
          currency: 'ETH',
          sub: '$26,386.77',
          change: '+0.01%',
          graph: {
            data: [253, 253, 253, 26186, 26286, 26380, 26380.77, 26386.77],
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
      }catch(e){console.log(e)}
    },
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
</style>