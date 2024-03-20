<template lang="html">
  <div class="brick-wall">
    <div v-for="(value, key, index) of payloadGrouped" :key="index"
      :class="`wallet-group wide ${key} ${dropdown[key] ? 'open' : ''}`"  @click="!dropdown[key]?dropdown[key]=true:false">
      <h2>
        <span>{{ key.replace(/_/g, ' ') }} 
              <template v-if="!dropdown[key]"><br><span class="sub">${{ groupBalance(value) }}
              USD</span></template>
              <template v-if="dropdown[key]"><br><span class="sub" :title="consistentAddress(value).address">address: {{ consistentAddress(value).addressShort }}
              </span></template>
              </span>
        <a @click.stop="openWalletInProviderView(value)"><i class="i-link-2"></i></a>
        <a @click.stop="dropdown[key] = !dropdown[key]">
          <i class="i-maximize" v-if="!dropdown[key]"></i>
          <i class="i-minimize" v-if="dropdown[key]"></i>
        </a>
      </h2>
      <div class="wallet-grid" v-if="dropdown[key]">
        <div v-for="(item, index) of value" :class="`block ui-ele ${key} ${item.currency}`" :key="index"
          :title="item.date">
          <div class="head">
            <img class="coin-icon" :src="getIcon(item.currency)">
            <div class="head-text">
              <h3>{{ item.name }}</h3>
              <a class="type"><span>{{ item.currency }}</span> <span v-if="item.badge"
                  class="badge">{{ item.badge }}</span></a>
              <!-- <p :title="item.address">{{ item.addressShort }}</p> -->
              <div class="balance"><span class="truncate">{{ item.balanceFormatted }}</span>
                {{ item.displayCurrency ? item.displayCurrency : item.currency }}</div>
              <div class="balance"><span class="">${{ item.balanceUSD }} USD</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon } from '@/utils/general'
export default {
  name: 'WalletsUI',
  data() {
    return {
      dropdown: {}
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
          let type = false
          let unit = String(value.currency).toLowerCase()
          switch (unit) {
            case 'btc':
              balance = balance > 0 ? Number(balance) / 100000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              type = "Bitcoin"
              break;
            case 'eth':
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              break;
            case 'usd-t':
            case 'usdt':
              balance = balance > 0 ? Number(balance) * 1000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              type = "ERC-20"
              break;
            case 'usd-c':
            case 'usdc':
              balance = balance > 0 ? Number(balance) * 1000000000000 : balance
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              type = "ERC-20"
              break;
            case 'zh':
              balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
              type = "ERC-20"
              break;
            default:
          }
          obj.displayCurrency = String(value.currency).replace(/-/g, '')
          obj.badge = type
          obj.balanceFormatted = Number(balance) < 1000 ? (Number(balance) == 0 ? 0 : balance) : Number(balance).toLocaleString('en-GB')
          obj.balance = Number(obj.balance)
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
    getIcon,
    consistentAddress(items) {
      let address = ''
      let addressShort = ''
      for (const item of items) {
        address = address === item.address ? address : item.address
        addressShort = addressShort === item.addressShort ? addressShort : item.addressShort
      }
      return {address: address, addressShort: addressShort}
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
<style lang="scss" scoped>@import '@/assets/scss/wallet-ui';</style>