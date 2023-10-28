<template lang="">
  <div :class="!application.uiSidebarCollapse? 'flex-overview compact':'flex-overview'">
    <template v-for="(item, index) of hashrateWorker">
      <div :class="'block ui-ele ' + item.size" :key="index" :title="item.date">
      <div class="head">
        <div class="product-icon">
          <img :src="getIcon(item.url)">
        </div>
        <div class="type"><span>{{item.manufacturer}}</span> <span v-if="item.model" class="badge">{{item.model}}</span></div>
        <div class="title">{{item.rating}}</div>
      </div>
      <div class="body">
        <div class="data">{{Number(item.data).toLocaleString('en-GB')}}</div>
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
          manufacturer: 'Bitmain',
          model: 'S21',
          rating: '200T',
          data: '1582',
          graph: {
            data: [4, 10, 6, 2, 12, 10, 22],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19j XP',
          rating: '151T',
          data: '3850',
          graph: {
            data: [5, 2, 9, 2, 12, 9, 9],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19 XP',
          rating: '141T',
          data: '2892',
          graph: {
            data: [1, 12, 1, 100, 70, 100],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19k Pro',
          rating: '120T',
          data: '1682',
          graph: {
            data: [1, 12, 1, 100, 70, 100],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      payload: 'payload',
    }),
    hashrateWorker() {
      let tmp = []
      if (this.application.uiDemoValues) { return this.samplePayload }
      if (this.payload.hashrateWorker) {
        for (const worker of this.payload.hashrateWorker.value) {
          tmp.push(
            {
              size: 'asset-complicated wide',
              manufacturer: worker.worker_name,
              model: 'Model No',
              rating: worker.consumption,
              data: '1',
              graph: {
                data: [worker.hashrate_10min, worker.hashrate_1hour, worker.hashrate_24hour],
                colour: "#0062ff",
              },
              url: 'heatsink'
            })
        }
      }
      return tmp
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
        return require(`/src/assets/img/${token}.png`)
      } catch (e) { console.log(e) }
      try {
        return require(`/src/assets/img/${token}.svg`)
      } catch (e) { console.log(e) }
      try {
        let tokenAlpha = token.replace(/-/g, '')
        return require(`/src/assets/img/${tokenAlpha}.png`)
      } catch (e) { console.log(e) }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';

.product-icon {
  grid-row: 1/3;

  img {
    height: 50px;
    opacity: .5;
  }
}

.graph {
  max-width: 300px;
  margin-left: auto;
}

.data {
  display: grid;

  &::after {
    content: 'units';
    opacity: .5;
    font-size: 75%;
  }
}

.head {
  min-width: 250px;
}</style>