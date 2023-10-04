<template lang="">
  <div class="flex-overview">
    <template v-for="(item, index) of samplePayload">
      <div :class="'block ' + item.size" :key="index" :title="item.date">
        <div class="data">{{item.data}}</div>
        <div class="sub" v-if="item.sub.length>0">
          <i v-if="item.subIconPre.length>0" :class="item.subIconPre"></i>
          <span>{{item.sub}}</span>
        </div>
        <div class="title">{{item.title}}</div>
      </div>
    </template>
    <HashRate />
    <PoolStats />
  </div>
</template>
<script>
import HashRate from './../charts/HashRate.vue'
import PoolStats from './../charts/PoolStats.vue'


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Overview',
  data() {
    return {
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
  components: {
    HashRate,
    PoolStats,
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