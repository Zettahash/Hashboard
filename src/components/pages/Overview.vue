<template lang="">
  <div class="flex-overview">
    <template v-for="(item, index) of dataObjects">
      <div :class="'block ' + item.size" :key="index" :title="item.date">
        <div class="data">{{item.data}}</div>
        <div class="sub" v-if="item.sub.length>0">
          <i v-if="item.subIconPre.length>0" :class="item.subIconPre"></i>
          <span>{{item.sub}}</span>
        </div>
        <div class="title">{{item.title}}</div>
      </div>
    </template>
    <LoadingEle v-if="!payload" />
    <HashRate />
    <Profitability />
    <Payouts />
    <div class="charts-organiser-tabs ui-ele" v-if="payload">
      <div class="tabs">
        <div :class="activeChart==='HashLineGraph'?'btn active':'btn'" @click="activeChart='HashLineGraph'">Hashrate</div>
        <div :class="activeChart==='Energy'?'btn active':'btn'" @click="activeChart='Energy'">Energy</div>
        <div :class="activeChart==='ProfitLineGraph'?'btn active':'btn'" @click="activeChart='ProfitLineGraph'">Profitability</div>
      </div>
      <HashLineGraph v-if="activeChart==='HashLineGraph'" />
      <ProfitLineGraph v-if="activeChart==='ProfitLineGraph'" />
    </div>
  </div>
</template>
<script>
import LoadingEle from './../interface/LoadingEle.vue'
import HashRate from './../tiles/HashRate.vue'
import Payouts from './../tiles/Payouts.vue'
import Profitability from './../tiles/Profitability.vue'
import HashLineGraph from './../charts/HashLineGraph.vue'
import ProfitLineGraph from './../charts/ProfitLineGraph.vue'
import { mapGetters } from 'vuex';


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Overview',
  data() {
    return {
      dataObjects: false,
      activeChart: 'HashLineGraph',
      samplePayload: [
        {
          size: 'small',
          title: 'Daily SHA256 Average',
          data: '724.75 PHs',
          sub: '',
          subIconPre: '',
          date: '',
          info: ''
        },
        {
          size: 'small',
          title: 'Bitcoin Price Change (24hr)',
          data: '26,386.77 USD',
          sub: '0.01%',
          subIconPre: 'icon-arrow-up',
          date: '',
          info: ''
        },
        {
          size: 'small',
          title: 'ASICs Hashing',
          data: '6,879',
          sub: 'of 6,900',
          subIconPre: '',
          date: '',
          info: ''
        },
        {
          size: 'small',
          title: 'USD/day',
          data: '46,014.66',
          sub: '',
          subIconPre: '',
          date: '',
          info: ''
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
    }),
  },
  components: {
    LoadingEle,
    HashRate,
    HashLineGraph,
    Payouts,
    Profitability,
    ProfitLineGraph,
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
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
</style>

<style lang="scss" scoped>
.charts-organiser-tabs {
  background: var(--neutral-9);
  border-radius: 30px;
  display: grid;
  gap: 10px;

  .tabs {
    display: flex;
    gap: 10px 2px;
    padding: 30px 30px 0px 30px;
    grid-row: 1/2;
    grid-column: 1/2;

    .btn {
      padding: 10px 20px;
      color: var(--neutral-0);
        border-radius: 0px 0px 0px 0px;
      &:first-of-type{
        border-radius: 100px 0px 0px 100px;
      }
      &:last-of-type{
        border-radius: 0px 100px 100px 0px;
      }
      &:hover {
        background: var(--primary);
      }
      &:not(.active) {
        background: var(--neutral-7);
        &:hover {
          background: var(--secondary);
        }
      }
    }
  }
  .line-graph {
    grid-row: 2/3 !important;
    grid-column: 1/2;
  }
}
</style>