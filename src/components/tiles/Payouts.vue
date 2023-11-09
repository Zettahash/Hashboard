<template lang="">
<div class="block small ui-ele" title="hash rate" v-if="payload">
  <div class="head">
  <h3>Latest Payout</h3>
  <h4 :title="new Date(topPayout.create_time)">{{topPayout.create_time.split("T")[0]}}</h4>
  </div>
    <div>
      <div class="data"><span>{{Number(topPayout.amount).toFixed(6)}}</span> <span>{{topPayout.coin}}</span></div> 
      <div class="sub">
      <a :title="topPayout.tx" :href="'https://www.blockchain.com/explorer/transactions/btc/' + topPayout.tx" class="link-on-hover">{{ellipse(topPayout.tx)}} <i class="i-external-link"></i></a>
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
  name: 'Payouts',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
    }),
    topPayout() {
      if (this.payload.paymentHistory.value.length == 0) { return 0 }
      let payouts = this.payload.paymentHistory.value
      payouts.sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        return 0
      })
      return payouts[0]
    }
  },
  methods: {
    ellipse(string) {
      return string.substring(0, 6) + "..." + string.substring(string.length - 6)
    }
  }
}
</script>

<style lang="scss" scoped>
.link-on-hover {
  transition: 200ms ease;
  cursor: pointer;
  i {
    transition: 200ms ease;
    opacity: 0;
  }

  &:hover {
    box-shadow: 0 1px 0 0;

    i {
      opacity: 1;
    }
  }
}</style>
