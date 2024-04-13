<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele front">
      <h1>Buy ZH Token</h1>
      <p></p>
      <div class="filter-ui">
        <div class="button-flex-organiser" data-label="Purchasing options">
          <div :set="type = 'crypto'" :class="`btn uppercase ${purchaseType === type ? 'active' : ''}`">
            <b-icon-currency-bitcoin />Buy with {{ type }}
          </div>

          <div :set="type = 'CEX'" :class="`btn disabled uppercase ${purchaseType === type ? 'active' : ''}`">
            <b-icon-currency-exchange />On {{ type }} <small>(Coming soon)</small>
          </div>

          <div :set="type = 'card'" :class="`btn disabled uppercase ${purchaseType === type ? 'active' : ''}`">
            <b-icon-credit-card />With {{ type }} <small>(Coming soon)</small>
          </div>
        </div>

        <div class="dropdown-wrapper" :wrapper-open="dropdownInvestmentOptions ? 'expanded' : 'collapsed'"
          @click.stop="dropdownInvestmentOptions = true" data-label="Investment Round">
          <b-icon-caret-down-fill v-if="!dropdownInvestmentOptions" />
          <b-icon-caret-up-fill v-if="dropdownInvestmentOptions" />
          <ul>
            <template v-if="rounds">
              <li v-for="(item, index) of rounds" :key="index"
                :dropdown-selected="selectedRound == item.name ? 'true' : 'false'"
                @click.stop="selectedRound = item.name; dropdownInvestmentOptions = false">
                {{ item.name }} (Bonus: {{ item.bonus }})
              </li>
            </template>
          </ul>
        </div>
        <!-- <router-link v-if="walletType=='eth'" class="uppercase link" :to="{ path: `/treasury/hedgey-vesting/${defaultWalletsActive}`}">Hedgey Vesting <b-icon-arrow-right /></router-link> -->

      </div>
    </div>
    <template v-if="holdings[walletType]">

      <!-- <WalletDisplay :wallet_type="walletType" :wallet_group_key="defaultWalletsActive" /> -->

      <div class="ui-ele">
        <div class="brick-wall">
          <div class="balances-group tile open">
            <h2>
              <span>Private Investment {{ activeRound.name }} <span class="">(Bonus: {{ activeRound.bonus }})</span></span>
              <span class="sub" v-for="(value, key, index) in activeRound" :key="index"><i class="counter" :data-numb="index+1"></i><b>{{ casify(key) }}</b>: {{ value }}</span>
              <!-- <span class="sub">Allocation: {{ activeRound.bonus }}</span>
              <span class="sub">Transferrable: {{ activeRound.bonus }}</span>
              <span class="sub">Tokens Sold: {{ activeRound.bonus }}</span>
              <span class="sub">Bonus: {{ activeRound.bonus }}</span> -->
              <!-- <span class="sub click-to-copy" @click="c2c" :title="address.address" :data-copy="address.address"><span class="cap">{{ wallet_type }} </span> address: {{ address.addressShort }}</span> -->
            </h2>
          </div>
        </div>
      </div>

      <div class="ui-ele">
        <div class="brick-wall">
          <div class="balances-group tile open">
            <h2><span>Policy</span></h2>
            <p class="" ><i></i><b-icon-check-square /> I agree that I am not a citizen of United States or Canada.</p>
            <!-- <p class="" ><i></i><b-icon-check-square /> This is a demonstration module. Check back soon.</p> -->
          </div>
        </div>
      </div>

      <div class="ui-ele">

            <a class="btn" >Continue<b-icon-arrow-right /></a>
          </div>

    </template>
  </div>
</template>
<script>

// import WalletDisplay from '@/components/modules/WalletDisplay.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    // WalletDisplay,
  },
  name: 'BeneficiaryOnboard',
  data() {
    return {
      dropdownInvestmentOptions: false,
      walletType: 'eth',
      walletActive: false,
      purchaseType: 'crypto',
      selectedRound:'Round 1',
      rounds: [
        {
          name: 'Round 1',
          bonus: '40%',
          allocation: '$1,500,000.00',
          transferable: '5%',
          lockup: '5% @ transferable - Distributed quarterly for 2 years',
          tokensSold: '21,000,000.00',
          pricePerToken: '$0.07143',
          percentOfAllocation: '18.50%',
        },
        {
          name: 'Round 2',
          bonus: '25%',
          allocation: '$2,000,000.00',
          transferable: '10%',
          lockup: '10% @ transferable - Distributed quarterly for 2 years',
          tokensSold: '25,000,000.00',
          pricePerToken: '$0.08000',
          percentOfAllocation: '22.03%',
        },
        {
          name: 'Round 3',
          bonus: '10%',
          allocation: '$2,500,000.00',
          transferable: '15%',
          lockup: '15% @ transferable - Distributed quarterly for 1 year',
          tokensSold: '27,500,000.00',
          pricePerToken: '$0.09091',
          percentOfAllocation: '24.23%',
        },
        {
          name: 'Round 4',
          bonus: '0%',
          allocation: '$4,000,000.00',
          transferable: '25%',
          lockup: '25% @ transferable  Distributed 50% 3 months 50% 3 months',
          tokensSold: '40,000,000.00',
          pricePerToken: '$0.10000',
          percentOfAllocation: '35.24%',
        }
      ],
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
    activeRound() {
      let temp = false
      for (const round of this.rounds) {
        if(round.name==this.selectedRound){temp= round}
      }
      return temp
    },
  },
  mounted() {
    this.routeLoaded()
    document.body.addEventListener("click", () => {
      this.dropdownInvestmentOptions = false
    })
    if (this.data.geoBlocked.forbidden) {
      this.$store.commit("setNotification", {
        title: `Your geographic location, ${this.data.geoBlocked.region_name}, ${this.data.geoBlocked.country_code}, is not currently supported.`,
        className: 'error',
        data: this.data.geoBlocked.ip,
      })
    } else {
      this.$store.commit("setNotification", {
        title: `Your geographic location, ${this.data.geoBlocked.region_name}, ${this.data.geoBlocked.country_code}, is supported`,
        className: 'good',
        data: this.data.geoBlocked.ip,
      })
    }
  },
  methods: {
    casify(str) {
      str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); })
    return str
    },
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
.uppercase {
  text-transform: capitalize;
}

h2 {
  display: flex;
  gap: 15px;
  align-items: start;

  img {
    height: 80px;
    max-width: 80px;
    border-radius: 5px;
  }
}
p{
  margin-top:0;
}
.counter::before {
  content: attr(data-numb);
  font-style: normal;
  padding: 3px;
  aspect-ratio: 1/1;
  display: inline-block;
  margin-right: 8px;
  background: var(--neutral-4);
  border-radius: 3px;
  width: 1rem;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: var(--neutral-0);
}
.btn{
  display:inline-flex;
  width: max-content;
}
</style>