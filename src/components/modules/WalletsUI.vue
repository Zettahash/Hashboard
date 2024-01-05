<template lang="">
  <div class="brick-wall">
    <div v-for="(value, key, index) of payloadGrouped" :key="index" :class="`wallet-group ${key}`">
      <h2>
        <span>{{key.replace(/_/g, ' ')}} <template v-if="!dropdown[key]"><br><span class="sub">${{groupBalance(value)}} USD</span></template></span> 
        <a @click="openWalletInProviderView(value)"><i class="i-link"></i></a> 
        <a @click="dropdown[key]=!dropdown[key]">
        <i class="i-maximize" v-if="!dropdown[key]"></i>
        <i class="i-minimize" v-if="dropdown[key]"></i>
        </a>
      </h2>
      <template v-if="dropdown[key]">
      <div v-for="(item, index) of value" :class="'block ui-ele ' + key" :key="index" :title="item.date" :style="`box-shadow:0 0 0 1px ${item.colour};`">
        <div class="head">
          <img class="coin-icon" :src="getIcon(item.currency)" :style="`background-color:${item.colour};`">
          <div class="head-text">
            <h3>{{item.name}}</h3>
            <a class="type"><span>{{item.currency}}</span> <span v-if="item.badge" class="badge">{{item.badge}}</span></a>
            <p :title="item.address">{{item.addressShort}}</p>
          <div class="balance"><span class="truncate">{{item.balanceFormatted}}</span> {{item.displayCurrency?item.displayCurrency:item.currency}}</div>
          <div class="balance"><span class="">${{item.balanceUSD}} USD</span></div>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'WalletsUI',
  data() {
    return {
      dropdown:{}
    }
  },
  props: {
    provider: String,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
    }),
    payload() {
      let masterPayload = []
      for (const key of Object.keys(this.holdings)) {
        let instance = this.holdings[key]
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(instance)) {
          if (!value.provider) { continue }
          if (String(value.provider).toLowerCase() !== String(this.provider).toLowerCase()) { continue }
          let obj = {}
          let balance = Number(value.balance)
          let colour = "#fff"
          let type = false
          let unit = String(value.currency).toLowerCase()
          // let historyBalanceMultiplier = 0
          switch (unit) {
            case 'btc':
              // historyBalanceMultiplier = 1/100000000
              balance = balance > 0 ? Number(balance) / 100000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#ff8f00"
              type = "Bitcoin"
              break;
            case 'eth':
              // historyBalanceMultiplier = 1/1000000000000000000
              // balance = balance > 0 ? Number(balance) / 1000000000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#5c6bc0"
              break;
            case 'usd-t':
            case 'usdt':
              balance = balance > 0 ? Number(balance) * 1000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#00bc95"
              type = "ERC-20"
              break;
            case 'usd-c':
            case 'usdc':
              balance = balance > 0 ? Number(balance) * 1000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#1e88e5"
              type = "ERC-20"
              break;
            case 'zh':
              // historyBalanceMultiplier = 1000000000000
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              colour = "#0062ff"
              type = "ERC-20"
              break;
            default:
          }
          obj.displayCurrency = String(value.currency).replace(/-/g, '')
          obj.badge = type
          obj.balanceFormatted = Number(balance) < 1000 ? (Number(balance) == 0 ? 0 : balance) : Number(balance).toLocaleString('en-GB')
          obj.balance = Number(obj.balance)
          obj.colour = colour
          obj.addressShort = value.address.substr(0, 5) + '...' + value.address.substr(value.address.length - 5)
          for (const [key, val] of Object.entries(value)) { obj[key] = val }

          if (this.rates && this.rates[obj.displayCurrency]) {
            obj.balanceUSD = Number((balance * Number(this.rates[obj.displayCurrency].priceUsd)).toFixed(2)).toLocaleString('en-GB')
            obj.balanceUSDRaw = Number(balance * Number(this.rates[obj.displayCurrency].priceUsd))
            obj.change = Number(this.rates[obj.displayCurrency].changePercent24Hr).toFixed(2)
          }
          masterPayload.push(obj)
        }
      }
      return masterPayload
    },
    payloadGrouped() {
      let arr = {}
      for (const item of this.payload) {
        if (!item.group_id) { continue }
        let group = item.group_id
        if (!arr[group]) { arr[group] = [] }
        arr[group].push(item)
      }
      return arr
    },
  },
  mounted() {
  },
  methods: {
    getIcon(str) {
      if (!str) { return false }
      let token = str.toLowerCase().replace(/-/g, '')
      try {
        return require(`/src/assets/img/tokens/${token}.png`)
      } catch (e) { console.log(e) }
      try {
        return require(`/src/assets/img/tokens/${token}.svg`)
      } catch (e) { console.log(e) }
      try {
        let tokenAlpha = token.replace(/-/g, '')
        return require(`/src/assets/img/tokens/${tokenAlpha}.png`)
      } catch (e) { console.log(e) }
    },
    groupBalance(items) {
      let balance = 0
      for (const item of items) {
        let bal = Number(item.balanceUSDRaw)
        balance += bal
      }
      return Number(balance.toFixed(2)).toLocaleString('en-GB')
    },
    openWalletInProviderView(items) {
      let address = false
      for (const item of items) {
        if (item.xpub) { address = item.xpub; break }
        if (item.address) { address = item.address; break }
      }
      let url = `${this.deriveProviderURL()}${address}`
      window.open(url, '_blank').focus()
      return url
    },
    deriveProviderURL() {
      let url = false
      if (this.provider) {
        let provider = String(this.provider).toLowerCase()
        switch (provider) {
          case 'safe':
            url = 'https://app.safe.global/home?safe=eth:'
            break;
            case 'specter':
            url = 'https://www.blockchain.com/explorer/addresses/btc/'
            break;
          default:
        }
      }
      return url
    },
  }
}
</script>
<style lang="scss" scoped>
.brick-wall {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  flex-grow: 1;
  width: 100%;

  .wallet-group {
  box-shadow: 0 0 0 1px var(--neutral-6);
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: var(--neutral-9);
    padding: 20px;
    border-radius: 15px;
    position: relative;
    transition: 200ms ease;
    min-width: 300px;
    width: max-content;
    max-width: 80vw;
    margin-bottom: auto;

    &:hover {
      box-shadow:  0 0 0 1px var(--neutral-6), 0 10px 80px -20px var(--black);
      z-index: 999;
      background: var(--neutral-10);

      h2 {
        a {
          color: var(--primary);

        }
      }
    }

    h2 {
      text-transform: capitalize;
      margin-top: 0;
      margin-bottom: 0px;
      display: grid;
      grid-template: 1fr / 1fr auto auto;
      gap: 15px;

      a {
        transition: 200ms ease;
        cursor: pointer;

        &:hover {
          color: var(--secondary);
        }
      }
      .sub{
        font-weight:200;
        font-size: .9rem;
      }
    }

    .block {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: start;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      // background: var(--neutral-8);
      margin-top: 10px;
      box-shadow: 0 0 0 1px var(--neutral-5);

      .head {
        display: flex;
        gap: 20px;
        align-items: start;
        justify-content: center;

        .head-text {
          display: flex;
          flex-direction: column;
          gap: 10px;

          h3,
          p {
            margin: 0;
          }
        }

        .type {
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 800;
          color: var(--neutral-4);
          grid-row: 1/2;
          grid-column: 2/3;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 5px 10px;

          .badge {
            box-shadow: 0 0 0 2px;
            padding: 2px 6px;
            border-radius: 100px;
            font-size: 80%;
            font-weight: 600;
            display: inline-block;
            text-align: center;
          }
        }

        .star {
          color: var(--amber);
        }

        .title {
          font-size: 18px;
          grid-row: 2/3;
          grid-column: 2/3;
        }
      }
    }
  }
}

.coin-icon {
  height: 30px;
  max-width: 30px;
  border-radius: 40px;
}




.truncate {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 0;
}

.body {
  display: flex;

}

.balance {
  display: flex;
  flex-direction: row;
  gap: 10px;
}</style>