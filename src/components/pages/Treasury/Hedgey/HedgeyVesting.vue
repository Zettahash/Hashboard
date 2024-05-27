<script setup>
import DropdownUi from '@/components/modules/DropdownUi.vue'

import WalletDisplayHedgey from '@/components/modules/WalletDisplayHedgey.vue'
import { useStore } from 'vuex';
import { reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import ButtonSwitch from '@/components/modules/ButtonSwitch.vue';
import LoadingEle from '@/components/interface/LoadingEle.vue';
const store = useStore();


const router = useRouter()

const routeParams = router.currentRoute.value.params

const ethHoldings = computed(() => store.getters.ethHoldings);
const ethHoldingsKeys = computed(() => { return Object.keys(store.getters.ethHoldings.grouped) })
const hedgeyKeys = computed(() => { return Object.keys(store.getters.graphQL.hedgeyGraphQL) })
const systemCurrencies = computed(() => store.getters.systemCurrencies);
//
const state = reactive({
  wallet: routeParams.walletActive ? routeParams.walletActive : ethHoldingsKeys.value[0],
  contract: hedgeyKeys.value[0]||false,
  tokenContract: 'zhd',
})

store.commit('setDynamic', {
  item: 'routerLoaded',
  value: true,
})

function newRoute() {
  router.push({
    path: `/treasury/hedgey-vesting/${state.wallet}`,
  })
}

watch(() => state.wallet, newRoute)
watch(() => hedgeyKeys.value, () => { state.contract = state.contract ? state.contract : hedgeyKeys.value[0]})

</script>

<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele front">
      <h2><img src="/src/assets/img/providers/65ec83064e64d3fad5f53b5d_h..png" />Hedgey App</h2>
      <p></p>
      <div class="filter-ui" v-if="ethHoldings">

        <DropdownUi dropdownTitle="Wallet" :dropdownOptions="ethHoldingsKeys" :activeKey="state.wallet"
          @set-active="(key) => state.wallet = key" />
        <DropdownUi dropdownTitle="Contract" :dropdownOptions="hedgeyKeys" :activeKey="state.contract"
          @set-active="(key) => state.contract = key" />

        <ButtonSwitch setTitle="Token" :setOptions="Object.keys(systemCurrencies)" :activeKey="state.tokenContract"
          @set-active="(key) => state.tokenContract = key" />

      </div>
    </div>
    <template v-if="state.wallet && state.contract">
      <WalletDisplayHedgey wallet_type="eth" :wallet_group_key="state.wallet" :contractType="state.contract" :tokenContract="state.tokenContract"/>
    </template>
      <LoadingEle :stop="(state.wallet && state.contract) ? true : false" :long="true"  />
  </div>
</template>


<style lang="scss">
@import 'src/assets/scss/constants';
@import 'src/assets/scss/ui';
</style>

<style lang="scss" scoped>
@import 'src/assets/scss/constants';

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