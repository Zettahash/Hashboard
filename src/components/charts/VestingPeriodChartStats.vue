<template>
  <div class="flex wrap" :set="asset = vested.dealPurchase[0].assetCurrency">
    <div class="col">
      <span class="subtle">Vested so far</span>
      <span class="main">{{ asset.ticker }} {{ vestedSoFar }}</span>
      <span class="subtle">~${{ decimalisePrice(vestedSoFar) }}</span>
    </div>
    <div class="col">
      <span class="subtle">Available to claim now</span>
      <span class="main">{{ asset.ticker }} {{unlockedValue}}</span>
      <span class="subtle">~${{ decimalisePrice(unlockedValue) }}</span>
    </div>
    <div class="col">
      <span class="subtle">Vesting rate</span>
      <span class="main">{{ transcribeValue(vested.rate) }} <span class="">{{ asset.ticker }} / period</span></span>
      <span class="subtle">~${{ decimalisePrice(vested.totalAmount, asset.decimals,
    asset.ticker) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'VestingPeriodLineGraph',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    vested: Array,
    now: Number,
  },
  computed: {
    ...mapGetters({
      rates: 'rates',
    }),
    vestedSoFar() {
      if (this.now > this.vested.cliffDate) { return 0 }
      let elapsed = this.now - this.vested.cliffDate
      elapsed = Math.ceil(elapsed / this.vested.period)
      return elapsed * this.vested.rate
    },
    unlockedValue() {
      if (this.now > this.vested.unlockDate) { return 0 }
      let elapsed = this.now - this.vested.unlockDate
      elapsed = Math.ceil(elapsed / this.vested.period)
      return elapsed
    },
  },
  methods: {
    decimalisePrice(totalAmount, decimals, ticker) {
      ticker = ticker ? ticker : (this.vested.dealPurchase[0].assetCurrency.ticker ? this.vested.dealPurchase[0].assetCurrency.ticker : '')
      decimals = decimals ? decimals : (this.vested.dealPurchase[0].assetCurrency.decimals ? this.vested.dealPurchase[0].assetCurrency.decimals : 1)
      let price = (Number(totalAmount) / (Math.pow(10, decimals))) *
        this.rates[ticker].priceUsd

      return price >= 1 ? Number(price.toFixed(2)).toLocaleString() : price
    },
    transcribeValue(totalAmount) {
      let price = (Number(totalAmount) / (Math.pow(10, this.vested.dealPurchase[0].assetCurrency.decimals)))

      return Number(price).toLocaleString()// >= 1?price.toFixed(2): price
    },
  },
}
</script>

<style lang="scss" scoped>
.line-graph {
  width: 100%;
  flex-grow: 1;
  padding: 30px;
  background: var(--neutral-5);
  border-radius: 8px;
  display: grid;
}

.line-graph {
  .flex {
    gap: 30px;

    .col {
      gap: 0;
    }
  }

  .subtle {
    opacity: .5;
    font-size: 12px;
    font-weight: 200;
  }

  .main {
    font-weight: 600;
  }
}
</style>