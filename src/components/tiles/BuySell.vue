<template lang="">
<div class="block half ui-ele" title="hash rate">
  <div class="head">
    <h3>Place Market Order</h3>
  </div>
  <div class="main-trade-types">
    <div class="switch">
      <div :class="orderType==='buy'?'buy active':'buy'" @click="orderType='buy'">Buy</div>
      <div :class="orderType==='sell'?'sell active':'sell'" @click="orderType='sell'">Sell</div>
    </div>
  </div>
  <div class="input-organiser">
    <label>Total Value</label>
    <input type="currency" class="input-value" placeholder="0.00" v-model="inputValue" />
    <span>{{orderActiveCurrency}}</span>
  </div>
  <div class="input-organiser">
  <div class="dots-organiser">
    <div :class="`pc-${percentAvailableFundsSelectedUI} dots-selector`">
      <i @click="percentAvailableFundsSelected=0"></i>
      <i @click="percentAvailableFundsSelected=25"></i>
      <i @click="percentAvailableFundsSelected=50"></i>
      <i @click="percentAvailableFundsSelected=75"></i>
      <i @click="percentAvailableFundsSelected=100"></i>
    </div>
      <span>{{percentAvailableFundsSelectedUI}}%</span>
    </div>
    <label>Available balance {{availableBalance}} {{orderActiveCurrency}}</label>
  </div>
  <div class="input-organiser">
  <a class="btn">Place Order</a>
</div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  name: 'OrderBook',
  data() {
    return {
      orderType: 'buy',
      inputValue: '0.00',
      orderActiveCurrency: 'USD-T',
      percentAvailableFundsSelected: 0,
      percentAvailableFundsSelectedUI: 0,
    }
  },
  watch: {
    percentAvailableFundsSelected(value) {
      this.percentAvailableFundsSelectedUI = Math.ceil(value)
      this.inputValue = Number(this.availableBalance * (this.percentAvailableFundsSelectedUI * .01)).toFixed(4)
    },
    inputValue(value) {
      this.percentAvailableFundsSelectedUI = Math.ceil((Number(value) / Number(this.availableBalance)) * 100)
    },
  },
  computed: {
    ...mapGetters({
      data: 'data',
      application: 'application',
    }),

    availableBalance() {
      if (this.application.uiDemoValues) {
        return (Math.random() * 1000).toFixed(4)
      }
      return 0
    },
    payload() {
      let tmp = {}
      if (this.application.uiDemoValues) {
        tmp.orderCount24hr = Math.floor(Math.random() * 1000)
        tmp.exchange = {}
        tmp.exchange.unit = "USD-T"
        tmp.orders = []

        for (let i = 0; i < 20; i++) {
          let multiplier = Math.floor(Math.random() * 100) >= 50 ? 1 : -1
          let price = Number((Number(8.37 + (multiplier * (1 / (Math.ceil(Math.random() * 100))))) * .01).toFixed(6))
          let size = (Math.random() * 100).toFixed(2)
          let sum = (price * size).toFixed(6)
          tmp.orders.push({
            time: 0,
            price: price,
            size: size,
            sum: sum
          })
        }
        tmp.orders = tmp.orders.sort((a) => {
          if (a.price > 0.0837) {
            return 0
          }
          return 1
        })

      }
      return tmp
    },
  },
  methods: {
    stripHashrateText(str) {
      return str.replace("hashrate_", '').replace('hour', 'hr')
    },
  }
}
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  gap: 4px;
  padding: 6px;
  background: var(--neutral-7);
  border-radius: $radius2;

  .buy,
  .sell {
    padding: 8px 16px;
    border-radius: $radius3;;
    cursor: pointer;
    position: relative;

    &.active {
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--primary);
        z-index: 1;
        opacity: .4;
        border-radius: $radius3;;
      }

      z-index:2;
      font-weight: 800;
    }

    &:not(.active) {
      &:hover {
        box-shadow: inset 0 0 0 1px var(--primary);
      }
    }
  }
}

.input-organiser {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
  flex-wrap: wrap;

  input {
    background: var(--neutral-10);
    color: inherit;
    border: none;
    text-align: right;
    padding: 10px;
    border-radius: $radius2;
    font-size: 1.5rem;
    max-width: 200px;

    &:focus {
      outline: none;
    }
  }
}

.dots-organiser {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;

  .dots-selector {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      width: 4rem;
    }

    @for $i from 0 through 100 {
      &.pc-#{$i} {
        &::before {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          top: 0;
          bottom: 0;
      border-radius: 100px;
          left: calc((#{$i} * 1%) - .5rem);
          margin: auto;
          background-color: var(--primary);
      z-index: 3;
        }
      }
    }

    i {
      display: block;
      height: .5rem;
      width: .5rem;
      border-radius: 100px;
      cursor:pointer;
      background: var(--neutral-3);
      position: relative;
      z-index: 2;

      &:hover {
        box-shadow: 0 0 0 .125rem var(--neutral-2);
        background: var(--neutral-2);
      }
    }

    &::after {
      content: '';
      position: absolute;
      width: calc(100%);
      height: 2px;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: var(--neutral-4);
    }
  }
}
</style>
