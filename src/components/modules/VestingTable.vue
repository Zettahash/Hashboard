<script setup>
import { onMounted, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { walletShortName } from '@/utils/strings.js';
import VestingTableDetails from '@/components/modules/VestingTableDetails.vue';

const props = defineProps({
  address: String,
  walletName: String,
  graphQLKey: String,
  tokenContract: String,
});

const systemCurrencies = computed(() => {return store.getters.systemCurrencies[props.tokenContract].contract});


const store = useStore();
const state  = reactive({vested:false, now:false, details:false});

const rates = computed(() => store.getters.rates);

const casify = (key) => {
  key = key.replace(/([A-Z])/g, " $1");
  key = key.indexOf(" ") == 0 ? key.substring(1) : key;
  return key;
};

const hedgeyVested = async () => {
  const reply = await store.dispatch("queryHedgeyVestingNFTs", { id: props.address, graphQLKey: props.graphQLKey, token: systemCurrencies.value });
  let data = reply.payload.result.data;
  state.vested = data.NFTGallery ? (data.NFTGallery.nfts ? data.NFTGallery.nfts : []) : [];
  state.now = reply.timestamp;
};

const decimalisePrice = (totalAmount, decimals, ticker) => {
  let price = (Number(totalAmount) / (Math.pow(10, decimals))) * rates.value[ticker].priceUsd;
  return price >= 1 ? Number(price.toFixed(2)).toLocaleString() : price;
};

watch(() => props.walletName, hedgeyVested);
watch(() => props.graphQLKey, hedgeyVested);
watch(() => props.tokenContract, hedgeyVested);

onMounted(() => {
  hedgeyVested();
});
</script>

<template>
  <div class="app-module">
    <template v-if="!state.vested">
      <span>Fetching data... <a class="spinner"></a></span>
    </template>
    <template v-if="state.vested.length === 0">
      <span>No {{ casify(graphQLKey) }} found for {{ walletName.replace(/_/g, ' ') }} wallet.</span>
    </template>

    <template v-if="!state.details">
      <template v-if="state.vested.length > 0">
        <table class="vesting-table-ui">
          <thead>
            <th>Recipient</th>
            <th>Token</th>
            <th>Granted tokens</th>
            <th>Vested</th>
            <th></th>
          </thead>
          <tbody>
            <template v-for="(item, index) of state.vested" :key="index">
              <tr>
                <td colspan="1" data-header="Recipient">
                  <div class="col" :set="to = item.actions[0].to">
                    <span :title="to" class="main">{{ walletShortName(to) }}</span>
                    <div class="actions sub col">
                      <a class="click-to-copy" @click="c2c" :data-copy="to"><span>Copy address</span> <i class="icon-copy"></i></a>
                      <a :href="`https://app.safe.global/apps/open?safe=eth:${to}&appUrl=https%3A%2F%2Fapp.hedgey.finance%2Fvesting`" target="_blank" rel="noreferrer">
                        <span>View on Hedgey</span> <i class="icon-external-link"></i>
                      </a>
                    </div>
                  </div>
                </td>
                <td colspan="1" data-header="Token">
                  <div class="icon-stack horizontal">
                    <img :src="`/static/tokens/${item.network.substring(0, 3).toLowerCase()}.png`" alt="">
                    <img :src="`/static/tokens/${item.dealPurchase[0].assetCurrency.ticker.substring(0, 3).toLowerCase()}.png`" alt="">
                  </div>
                  <div class="col">
                    <a :href="`https://etherscan.io/token/${item.dealPurchase[0].assetCurrency.address}`" target="_blank" rel="noreferrer">
                      <span>{{ item.dealPurchase[0].assetCurrency.name }} {{ item.dealPurchase[0].assetCurrency.ticker }}</span> <i class="icon-external-link"></i>
                    </a>
                  </div>
                </td>
                <td colspan="1" data-header="Granted tokens">
                  <div class="col">
                    <span>{{ Number(item.totalAmount) / (Math.pow(10, item.dealPurchase[0].assetCurrency.decimals)) }} {{ item.dealPurchase[0].assetCurrency.ticker }}</span>
                    <span>${{ decimalisePrice(item.totalAmount, item.dealPurchase[0].assetCurrency.decimals, item.dealPurchase[0].assetCurrency.ticker) }}</span>
                  </div>
                </td>
                <td colspan="1" data-header="Vested">
                  <div class="col"><span>0 ZHD</span> <span>$0.00</span></div>
                </td>
                <td colspan="4" data-header="Available actions">
                  <div>
                    <a @click.stop="state.details = index + 1" class="link basic">Details <i class="icon-chevron-right"></i></a>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </template>
    <template v-if="state.details">
      <VestingTableDetails :vested="state.vested" :now="state.now" :index="state.details" @exit-vesting-details="state.details=false" />
    </template>
  </div>
</template>


<style lang="scss">
@import 'src/assets/scss/wallet-ui';
</style>

<style lang="scss" scoped>
@import 'src/assets/scss/constants';
.spinner {
  margin-left: 10px;
  height: 1rem;
}

.col {
  display: flex;
  flex-direction: column;
  .col { gap: 0; }
}

.sub {
  opacity: .5;
  font-size: 12px;
  font-weight: 200;
}

.app-module {
  margin-top: 20px;
  padding: 20px;
  border-radius: $radius2;
  background: var(--neutral-6);
}
</style>