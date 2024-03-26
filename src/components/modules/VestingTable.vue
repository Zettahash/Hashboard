<template lang="html">
  <div class="app-module">
    <template v-if="!vested">
      <span>Fetching Vesting Plans... <a class="spinner"></a></span>
    </template>
    <template v-if="vested.length === 0">
      <span>No Vesting Plans found for {{ walletName.replace(/_/g, ' ') }} wallet.</span>
    </template>

    <template v-if="!details">
      <template v-if="vested.length > 0">
        <table class="vesting-table-ui">
          <thead>
            <th>Token</th>
            <th>Granted tokens</th>
            <th>Vested</th>
            <th></th>
          </thead>
          <tbody>
            <!-- eslint-disable-next-line vue/no-v-for-template-key -->
            <template v-for="(item, index) of vested" :key="index">
              <tr>
                <td colspan="1" data-header="Token">
                  <div class="icon-stack horizontal">
                    <img :src="require(`@/assets/img/tokens/${item.network.substring(0, 3).toLowerCase()}.png`)" alt="">
                    <img
                      :src="require(`@/assets/img/tokens/${item.dealPurchase[0].assetCurrency.ticker.substring(0, 3).toLowerCase()}.png`)"
                      alt="">
                  </div>
                  <div class="col">
                    <a :href="`https://etherscan.io/token/${item.dealPurchase[0].assetCurrency.address}`"
                      target="_blank" rel="noreferrer">
                      <span> {{ item.dealPurchase[0].assetCurrency.name }} {{ item.dealPurchase[0].assetCurrency.ticker
                        }}</span> <i class="icon-external-link"></i>
                    </a>
                  </div>
                </td>
                <td colspan="1" data-header="Granted tokens">
                  <div class="col">
                    <span>{{ Number(item.totalAmount) / (Math.pow(10, item.dealPurchase[0].assetCurrency.decimals))
                      }}
                      {{ item.dealPurchase[0].assetCurrency.ticker }}</span>
                    <span>${{ decimalisePrice(item.totalAmount, item.dealPurchase[0].assetCurrency.decimals,
      item.dealPurchase[0].assetCurrency.ticker) }}</span>
                  </div>
                </td>
                <td colspan="1" data-header="Vested">
                  <div class="col"><span>0 ZH</span> <span>$0.00</span></div>
                </td>
                <!-- <td colspan="1" data-header="Active plans">
                  <div><span>1</span></div>
                </td> -->
                <td colspan="4" data-header="Available actions">
                  <div>
                    <a @click.stop="details = index+1" class="link basic">Details <i class="icon-chevron-right"></i></a>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </template>
    <template v-if="details">
      <VestingTableDetails :vested="vested" :now="now" :index="details" @exit-vesting-details="details=false"/>
    </template>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon, c2c } from '@/utils/general'
import VestingTableDetails from '@/components/modules/VestingTableDetails'
export default {
  name: "VestingTable",
  data() {
    return {
      vested: false,
      details: false,
      now: false,
    }
  },
  props: {
    address: String,
    walletName: String,
  },
  components: { VestingTableDetails, },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      holdings: 'holdings',
      rates: 'rates',
      wallet: 'wallet',
    }),
  },
  mounted() {
    this.hedgeyVested()
  },
  methods: {
    getIcon, c2c,
    async hedgeyVested() {
      const reply = await this.$store.dispatch("fetchHedgeyVesting", { id: this.address })
      let data = reply.payload.result.data
      this.vested = data.NFTGallery ? (data.NFTGallery.nfts ? data.NFTGallery.nfts : []) : []
      this.now = reply.timestamp
    },
    decimalisePrice(totalAmount, decimals, ticker) {
      // return ticker
      let price = (Number(totalAmount) / (Math.pow(10, decimals))) * this.rates[ticker].priceUsd
      return price >= 1 ? Number(price.toFixed(2)).toLocaleString() : price
    },
    exitVestingDetails() { this.details = false },
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

.app-module {
  margin-top:20px;
  padding: 20px;
  border-radius: 10px;
  background: var(--neutral-6);
}


</style>