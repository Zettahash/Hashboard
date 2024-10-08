<template lang="html">
  <div class="ui-ele">
    <LoadingEle :stop="(holdings && rates) ? true : false" :long="true" />
    <div class="brick-wall" v-if="wallet_group_key && wallet_type && holdings">
      <div class="balances-group tile open">
        <h2>
          <span>{{ String(wallet_group_key).replace(/_/g, ' ') }} {{casify(contractType)}} on Hedgey</span>
          <span class="sub">{{systemCurrencies[tokenContract].name}} Token Holdings: <b>${{ tokenBalance }} USD</b></span>
          <span class="sub click-to-copy" @click="c2c" :title="address.address" :data-copy="address.address"><span
              class="cap">{{ wallet_type }} </span> address: {{ address.addressShort }}</span>
        </h2>
        <VestingTable :address="address.address" :walletName="wallet_group_key" :graphQLKey="contractType" :tokenContract="tokenContract" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon, c2c, scrollTo } from '@/utils/general.js'
import VestingTable from '@/components/modules/VestingTable.vue'
import LoadingEle from '@/components/interface/LoadingEle.vue'
export default {
  name: 'WalletDisplayHedgey',
  data() {
    return {
      dropdown: {},
      app: {},
    }
  },
  components: { LoadingEle, VestingTable, },
  props: {
    wallet_type: String,
    wallet_group_key: String,
    contractType: String,
    tokenContract: String,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
      wallet: 'wallet',
      systemCurrencies: 'systemCurrencies',
    }),
    tokenBalance() {
      const currentToken = this.systemCurrencies[this.tokenContract].name
      for (const bal of this.walletBalances) { if (bal.currency == currentToken) { return bal.balanceUSD } }
      return "0.00"
    },
    walletBalances() {
      let masterPayload = []
      for (const key of Object.keys(this.holdings[this.wallet_type])) {
        let value = this.holdings[this.wallet_type][key]
        if (value.group_id == this.wallet_group_key) {
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
          for (const [key, val] of Object.entries(value)) { obj[key] = val }

          obj.displayCurrency = String(value.currency).replace(/-/g, '')
          obj.badge = type
          obj.balanceFormatted = Number(balance) < 1000 ? (Number(balance) == 0 ? 0 : balance) : Number(balance).toLocaleString('en-GB')
          obj.balance = Number(obj.balance)
          obj.addressShort = value.address ? `${value.address.substr(0, 5)}...${value.address.substr(value.address.length - 5)}` : (value.xpub ? 'HD Wallet' : '')

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
    address() {
      let address = ''
      let addressShort = ''
      for (const item of this.walletBalances) {
        address = address === item.address ? address : item.address
        addressShort = addressShort === item.addressShort ? addressShort : item.addressShort
      }
      return { address: address, addressShort: addressShort }
    },
    groupBalance() {
      let balance = 0
      for (const item of this.walletBalances) {
        let bal = Number(item.balanceUSDRaw)
        balance += bal
      }
      return Number(balance.toFixed(2)).toLocaleString('en-GB')
    },
  },
  mounted() {


  },
  methods: {
    c2c,
    getIcon,
    scrollTo,
    casify(key) {
      key = key.replace(/([A-Z])/g, " $1")
      key = key.indexOf(" ") == 0 ? key.substring(1) : key
      return key
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

.cap {
  text-transform: uppercase;
}



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