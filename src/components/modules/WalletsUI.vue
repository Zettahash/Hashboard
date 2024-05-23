<template lang="html">
  <div>
    <LoadingEle :stop="(holdings && rates) ? true : false" :long="true" />
    <div class="brick-wall">

      <template v-if="payloadGrouped">
        <div v-for="(value, key) of payloadGrouped" :key="key"
          :class="`wallet-group tile ${key} ${dropdown[key] ? 'open' : ''}`"
          @click="!dropdown[key] ? dropdown[key] = true : false; scrollTo($refs[key])" :ref="key">
          <h2>
            <span>{{ key.replace(/_/g, ' ') }}
              <template v-if="app[key] || !dropdown[key]"><br><span class="sub">${{ groupBalance(value) }}
                  USD</span></template>
              <template v-if="dropdown[key]">
                <br><span class="sub click-to-copy" @click="c2c" :title="consistentAddress(value).address"
                  :data-copy="consistentAddress(value).address">address: {{ consistentAddress(value).addressShort }}
                </span>
              </template>
            </span>
            <div class="tile-controls">
              <a @click.stop="openWalletInProviderView(value)"><i class="i-link-2"></i></a>
              <a @click.stop="dropdown[key] = !dropdown[key]">
                <i class="i-maximize-2" v-if="!dropdown[key]"></i>
                <i class="i-minimize-2" v-if="dropdown[key]"></i>
              </a>
            </div>
          </h2>
          <template v-if="dropdown[key]">
            <div class="wallet-grid" v-if="!app[key]">
              <div v-for="(item, index) of value" :class="`block ui-ele ${key} ${item.currency}`" :key="index"
                :title="item.date">
                <div class="head">
                  <img class="coin-icon" :src="`/static/tokens/${item.currency.replace(/-/g, '').toLowerCase()}.png`">
                  <div class="head-text">
                    <h3 class="type"><span>{{ item.currency }}</span> <span v-if="item.badge" class="badge">{{
                        item.badge
                        }}</span></h3>
                    <div class="balance"><span class="truncate">{{ item.balanceFormatted }}</span>
                      {{ item.displayCurrency ? item.displayCurrency : item.currency }}</div>
                    <div class="balance sub"><span class="">${{ item.balanceUSD }} USD</span></div>
                  </div>
                </div>
              </div>
            </div>
            <HedgeyApp :provider="provider" :address="consistentAddress(value).address" :walletKey="key"
              @set-application-open="(app[key] = 'Hedgey.', scrollTo($refs[key]))"
              @set-application-closed="app[key] = false" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon, c2c, scrollTo } from '@/utils/general.js'
import HedgeyApp from '@/components/modules/HedgeyApp.vue'
import LoadingEle from '@/components/interface/LoadingEle.vue'
export default {
  name: 'WalletsUI',
  data() {
    return {
      dropdown: {},
      app: {},
    }
  },
  components: { HedgeyApp, LoadingEle, },
  props: {
    provider: String,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
      wallet: 'wallet',
    }),
    payload() {
      if (!this.holdings) { return false }
      let masterPayload = []
      try {
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
      } catch (e) { console.log("Waiting for holdings to initiate.", e) }
      return masterPayload
    },
    payloadGrouped() {
      if (!this.holdings) { return false }
      let arr = {}
      try {
        for (const item of this.payload) {
          if (!item.group_id) { continue }
          let group = item.group_id
          if (!arr[group]) { arr[group] = [] }
          arr[group].push(item)
        }
      } catch (e) { console.log("Waiting for payload to initiate.", e) }

      return arr
    },
  },
  mounted() {


  },
  methods: {
    c2c,
    getIcon,
    scrollTo,
    consistentAddress(items) {
      let address = ''
      let addressShort = ''
      for (const item of items) {
        address = address === item.address ? address : item.address
        addressShort = addressShort === item.addressShort ? addressShort : item.addressShort
      }
      return { address: address, addressShort: addressShort }
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
@import 'src/assets/scss/wallet-ui';

.link-wrapper {
  padding: 5px 10px 5px 15px;

  &.active {
    box-shadow: 0 0 0 1px var(--secondary);
    border-radius: 100px;
    display: inline-flex;
    gap: 10px;
    align-items: center;

    .link {
      &:hover {
        text-decoration: none;
        box-shadow: none;
      }
    }
  }
}
</style>