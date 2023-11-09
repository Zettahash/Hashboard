<template lang="">
<div class="block small ui-ele" title="hash rate" v-if="payload">
  <div class="head">
  <h3>Average Energy</h3>
  <h4>*data interpolated</h4>
  </div>
    <div>
      <div class="data"><span>{{Number( energyRateSummary.kw).toFixed(2)}}</span> <span>(kW)</span></div> 
      <div class="sub">
      <span>daily average based on last 7 days</span>
    </div>
    </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Energy',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
    }),
    energyRateSummary() {
      let tmp = []
      if (this.payload.profitHistory && this.payload.profitHistory.value) {
        let i = 1
        for (const item of this.payload.profitHistory.value.data) {
          tmp.push({
            time: (new Date(item.date).getTime() / 1000) + i, //.split("T")[0],
            kw: (Number(item.hashrate)/ 100000000000000)*2
          })
          i++
        }
      } else {
        tmp = false
      }
      let averagekW = 0
      for (let i = 0; i < tmp.length; i++) {
        averagekW += tmp[i].kw
        if (i === tmp.length - 1) {
          averagekW = averagekW/i
        }
      }
      tmp =tmp.reverse()
      return {date: tmp[0].time, kw: averagekW}
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
