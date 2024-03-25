<template lang="html">
  <div class="app-child">
    <template v-if="vested">
      <a class="close btn-link" @click.stop="$emit('exitVestingDetails')"><i class="icon-arrow-left"></i> Back</a>
      <VestingPeriodLineGraph :vested="indexedVesting" :now="now" />
      <table class="vesting-table-ui">
        <thead>
          <th>Total tokens</th>
          <th>Issued</th>
          <th>Schedule</th>
          <th>Vesting rate</th>
          <th>Vested / Unvested</th>
        </thead>
        <tbody :set="item = indexedVesting">
            <tr>
              <td>
                <div class="col">
                  <div class="main">{{ transcribeValue(item.totalAmount) }} {{ asset.ticker }}</div>
                  <div class="sub">~${{ decimalisePrice(item.totalAmount) }}</div>
                </div>
              </td>

              <td>
                <div class="col">
                  <div class="main">{{ dMY(item.createdAt) }}</div>
                </div>
              </td>

              <td>
                <div class="col">
                  <div class="main"><i class="h-i-start"></i> {{ dMY(item.start) }}</div>
                  <div class="main"><i class="h-i-end"></i> {{ dMY(item.end) }}</div>
                  <div class="sub"><i class="h-i-cliff"></i> {{ dMY(item.cliffDate) }}</div>
                </div>
              </td>

              <td>
                <div class="col">
                  <div class="main"><i class="h-i-step"></i> {{ transcribeValue(item.rate) }} {{ asset.ticker }}</div>
                  <div class="sub">~${{ decimalisePrice(item.rate) }}</div>
                </div>
              </td>

              <td>
                <div class="col">
                  <div class="main">Vested: {{ transcribeValue(vestedSoFar) }} {{ asset.ticker }}</div>
                  <div class="main">Unvested: {{ transcribeValue(item.currentAmount) }} {{ asset.ticker }}</div>
                </div>
              </td>
              
            </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon, c2c } from '@/utils/general'
import VestingPeriodLineGraph from '@/components/charts/VestingPeriodLineGraph'
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
export default {
  name: "VestingTableDetails",
  data() {
    return {

    }
  },
  props: {
    vested: Array,
    index: Number,
    now: Number,
  },
  components: { VestingPeriodLineGraph, },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
      wallet: 'wallet',
    }),
    indexedVesting() { return this.vested[this.index - 1] },
    asset() { return this.indexedVesting.dealPurchase[0].assetCurrency },
    vestedSoFar() {
      if (this.now > Number(this.indexedVesting.cliffDate)) { return 0 }
      let elapsed = this.now - this.indexedVesting.cliffDate
      elapsed = Math.ceil(elapsed / this.indexedVesting.period)
       return elapsed * this.indexedVesting.rate

    },
  },
  mounted() {
    // this.hedgeyVested()
  },
  methods: {
    getIcon, c2c,
    // async hedgeyVested() {
    //   const reply = await this.$store.dispatch("fetchHedgeyVesting", { id: this.address })
    //   console.log(reply)
    //   let data = reply.payload.result.data
    //   this.vested = data.NFTGallery ? (data.NFTGallery.nfts ? data.NFTGallery.nfts : []) : []
    // },
    decimalisePrice(totalAmount, decimals, ticker) {
      decimals = decimals ? decimals : (this.asset.decimals ? this.asset.decimals : 1)
      ticker = ticker ? ticker : (this.asset.ticker ? this.asset.ticker : "")
      let price = (Number(totalAmount) / (Math.pow(10, decimals))) *
        this.rates[ticker].priceUsd

      // return price >= 1 ? price.toFixed(2) : price
      return price >= 1 ? Number(price.toFixed(2)).toLocaleString() : price
    },
    transcribeValue(totalAmount, decimals) {
      decimals = decimals ? decimals : (this.asset.decimals ? this.asset.decimals : 1)
      let price = (Number(totalAmount) / (Math.pow(10, decimals )))

      return Number(price).toLocaleString()// >= 1?price.toFixed(2): price
    },
    dMY(ts) {
      let date = new Date(ts * 1000)
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    },
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/wallet-ui';
</style>
<style lang="scss" scoped>
.spinner {
  margin-left: 10px;
  height: 1rem;
}

.col {
  display: flex;
  flex-direction: column;
}

.app-child {
  display: flex;
  flex-direction: column;
  gap: 10px;}

  table{
  margin-top: 20px;
}

.sub {
    opacity: .5;
    font-size: 12px;
    font-weight: 200;
  }

  .main {
    font-weight: 600;
  }
</style>