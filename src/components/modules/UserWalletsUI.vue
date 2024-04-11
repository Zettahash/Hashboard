<template lang="html">
  <div class="brick-wall">

    <div :class="`wallet-group wide ${dropdown.mainnet_balances ? 'open' : ''}`" v-if="holdings" @click="!dropdown.mainnet_balances?dropdown.mainnet_balances=true:false">
      <h2>
        <span>Mainnet Balances <template v-if="!dropdown.mainnet_balances"><br><span
              class="sub">${{ groupBalance(holdings) }} USD</span></template></span>
        <a @click.stop="dropdown.mainnet_balances = !dropdown.mainnet_balances">
          <i class="i-maximize" v-if="!dropdown.mainnet_balances"></i>
          <i class="i-minimize" v-if="dropdown.mainnet_balances"></i>
        </a>
      </h2>
      <div class="wallet-grid" v-if="dropdown.mainnet_balances">
        <div v-for="(item, index) of holdings" :class="`block ui-ele shadow-outline ${item.name} ${item.currency}`" :key="index"
          :title="item.date">
          <div class="head">
            <img class="coin-icon" :src="require(`@/assets/img/tokens/${item.currency.replace(/-/g, '').toLowerCase()}.png`)">
            <div class="head-text">
              <h3>{{ item.name }}</h3>
              <a class="type" :title="item.address" ><span>{{ item.currency }} {{ item.addressShort }}</span></a>
              <div class="balance"><span class="truncate">{{ item.balanceFormatted }}</span>
                {{ item.displayCurrency ? item.displayCurrency : item.currency }}</div>
              <div class="balance sub"><span class="">${{ item.balanceUSD >=1?Number(item.balanceUSD.toFixed(2)).toLocaleString():item.balanceUSD }} USD</span></div>
            </div>
          </div>
        </div>
      </div>
      <HedgeyApp v-if="dropdown.mainnet_balances" :address="wallet" :walletKey="wallet" @set-application-open="app[key] = 'Hedgey.'" @set-application-closed="app[key]=false"/>
    </div>
    <div v-else class="wallet-group">
      <h2>
        <a class="spinner"></a>
        <span>Mainnet Balances<br><span class="sub">Fetching data...</span></span>
      </h2>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon } from '@/utils/general'
import HedgeyApp from '@/components/modules/HedgeyApp'

export default {
  components: { HedgeyApp, },
  name: 'UserWalletsUI',
  data() {
    return {
      dropdown: { mainnet_balances: false, },
      app: {},
    }
  },
  props: {
    holdings: Array,
    wallet: String,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      rates: 'rates',
    }),
  },
  mounted() {
  },
  methods: {
    getIcon,
    groupBalance(items) {
      let balance = 0
      for (const item of items) {
        let bal = Number(item.balanceUSDRaw)
        balance += bal
      }
      return Number(balance.toFixed(2)).toLocaleString('en-GB')
    },
  }
}
</script>
<style lang="scss" scoped>@import '@/assets/scss/wallet-ui';</style>