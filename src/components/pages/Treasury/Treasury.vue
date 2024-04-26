<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele front">
      <h1><img :src="require('@/assets/img/zh-circle.svg')" />Zettahash DAO Treasury</h1>
      <p></p>
      <div class="filter-ui">
        <div class="button-flex-organiser" data-label="Network">
          <div v-for="typeObj of types" :key="typeObj" :class="`btn ${walletType === typeObj ? 'active' : ''}`"
            @click.stop="walletType = typeObj; walletActive = false">{{ typeObj.toUpperCase() }}</div>
        </div>

        <div class="dropdown-wrapper" :wrapper-open="dropdownWallets ? 'expanded' : 'collapsed'"
          @click.stop="dropdownWallets = true" data-label="Wallet">
          <b-icon-caret-down-fill v-if="!dropdownWallets" />
          <b-icon-caret-up-fill v-if="dropdownWallets" />

          <ul>
            <template v-if="holdings[walletType]">
              <li v-for="(key, index) of Object.keys(payloadGrouped)" :key="index"
                :dropdown-selected="!walletActive ? (index == 0 ? 'true' : 'false') : (walletActive == key ? 'true' : 'false')"
                @click.stop="walletActive == key ? (dropdownWallets = !dropdownWallets) : (walletActive = key, dropdownWallets = false)">
                {{ key.replace(/_/g, ' ') }}
              </li>
            </template>
          </ul>
        </div>
        <router-link v-if="walletType == 'eth'" class="uppercase link"
          :to="{ path: `/treasury/hedgey-vesting/${defaultWalletsActive}` }">Hedgey Vesting
          <b-icon-arrow-right /></router-link>

      </div>
    </div>
    <template v-if="holdings[walletType]">

      <WalletDisplay :wallet_type="walletType" :wallet_group_key="defaultWalletsActive" />
    </template>
  </div>
</template>
<script>

import WalletDisplay from '@/components/modules/WalletDisplay.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    WalletDisplay,
  },
  name: 'DAOTreasury',
  data() {
    return {
      dropdownWallets: false,
      walletType: 'eth',
      walletActive: false,
      types: ['btc', 'eth'],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
      wallet: 'wallet',
    }),
    defaultWalletsActive() {
      return !this.walletActive ? Object.keys(this.payloadGrouped)[0] : this.walletActive
    },
    instanceWallets() {
      return this.holdings[this.walletType]
    },
    // holdingsGrouped() {

    // },
    payload() {
      if (!this.holdings) { return false }
      let masterPayload = []
      try {
        let instances = this.instanceWallets
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(instances)) {
          // console.log(key)
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
          obj.addressShort = value.address ? value.address.substr(0, 5) + '...' + value.address.substr(value.address.length - 5) : ''
          for (const [key, val] of Object.entries(value)) { obj[key] = val }

          if (this.rates && this.rates[obj.displayCurrency]) {
            obj.balanceUSD = Number((balance * Number(this.rates[obj.displayCurrency].priceUsd)).toFixed(2)).toLocaleString('en-GB')
            obj.balanceUSDRaw = Number(balance * Number(this.rates[obj.displayCurrency].priceUsd))
            obj.change = Number(this.rates[obj.displayCurrency].changePercent24Hr).toFixed(2)
          }
          masterPayload.push(obj)
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
    this.routeLoaded()
    document.body.addEventListener("click", () => {
      this.dropdownWallets = false
    })
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

<style lang="scss" scoped>
@import '@/assets/scss/constants';

.uppercase {
  text-transform: capitalize;
}

h2 {
  display: flex;
  gap: 15px;
  align-items: center;

  img {
    height: 80px;
    max-width: 80px;
    border-radius: $radius3;
  }
}
</style>