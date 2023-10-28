<template lang="">
<div class="block small ui-ele" title="hash rate" v-if="payload">
  <div class="head">
  <h3>Profitability Summary</h3>
  <h4>PPS {{profitSummary.pps_profit}}</h4>
  </div>
    <div>
      <div class="data">{{profitSummary.total_profit}} {{profitSummary.coin}}</div> 
      <div class="sub">
      <span>Solo Profit {{profitSummary.solo_profit}}</span>
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
  name: 'Profitability',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
    }),
    profitSummary() {
      return this.payload.profitSummary.value
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
