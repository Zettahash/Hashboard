<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele front">
      <h1>Buy ZH Token</h1>
      <p></p>

      <template v-if="!stage2">
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
                  @click.stop="selectedRound == item.name ? (dropdownInvestmentOptions = !dropdownInvestmentOptions) : (selectedRound = item.name, dropdownInvestmentOptions = false)">
                  {{ item.name }} (Bonus: {{ item.bonus }})
                </li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <template v-if="holdings[walletType] && !stage2">

      <!-- <WalletDisplay :wallet_type="walletType" :wallet_group_key="defaultWalletsActive" /> -->

      <div class="ui-ele">
        <div class="brick-wall">
          <div class="balances-group tile open">
            <h2>
              <span>Private Investment {{ activeRound.name }} <span class="">(Bonus: {{ activeRound.bonus
                  }})</span></span>
              <span class="sub" v-for="(value, key, index) in activeRound" :key="index"><i class="counter"
                  :data-numb="index + 1"></i><b>{{ casify(key) }}</b>: {{ value }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="ui-ele">
        <div class="brick-wall">
          <div class="balances-group tile open">
            <h2><span>Policy</span></h2>
            <div class="inline">
              <div class="checkbox-container">
                <input type="checkbox" v-model="policyAccepted" />
                <img v-if="!policyAccepted" :src="require('/src/assets/img/open-checkbox.svg')" />
                <img v-if="policyAccepted" :src="require('/src/assets/img/checkbox.svg')" />
              </div>
              <p>I agree that I am not a citizen of United States or Canada.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ui-ele">

        <a :class="`btn ${!policyAccepted ? 'disabled' : ''}`" @click="stage2 = true">Continue<b-icon-arrow-right /></a>
      </div>

    </template>

    <template v-if="stage2 && !invoiceURL">
      <div class="ui-ele front wide">
        <p>

        </p>

        <div class="form new-post ui-ele">
          <div class="head-organiser">
            <a @click="stage2 = false; policyAccepted = false" class="btn-link neutral subtle"><i
                class="i-arrow-left"></i>
              Back</a>
            <h2>Account & Contact</h2>
          </div>

          <div :class="`form-section`">
            <label>Selected Round</label>
            <div class="editor-wrapper">
              <input :value="`${activeRound.name} (Bonus: ${activeRound.bonus})`" disabled>
            </div>
          </div>

          <div :class="`form-section`">
            <label>ETHEREUM Address<br>(To receive ZH)</label>
            <div class="editor-wrapper">
              <input :value="wallet" disabled>
            </div>
          </div>

          <div :class="`form-section`">
            <label>Investment Value</label>
            <div class="editor-wrapper">
              <input v-model="investmentValueUSD" placeholder="1000">
            </div>
          </div>

          <div :class="`form-section`">
            <label>Email<br>(Not used for marketing)</label>
            <div class="editor-wrapper">
              <input v-model="userEmail" placeholder="email@example.com">
            </div>
          </div>

          <div class="form-section">
            <a :class="`btn ${!validEmail || !validInvestmentValue ? 'disabled' : ''}`"
              @click="generateInvoice">Generate
              Invoice<b-icon-arrow-right /></a>
          </div>
        </div>
      </div>
    </template>

    <template v-if="(invoiceURL && !data.geoBlocked.forbidden)">
      <div class="ui-ele front wide">
        <p>

        </p>

        <div class="form new-post ui-ele">
          <div class="head-organiser">
            <a @click="invoiceURL = false" class="btn-link neutral subtle"><i
                class="i-arrow-left"></i>
              Cancel</a>
            <h2>Invoice</h2>
          </div>

          <div :class="`form-section`">
            <label>Recipient address: {{ wallet }}</label>
            <div class="editor-wrapper">
              <iframe :src="invoiceURL" class="buyZH-frame"></iframe>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="(invoiceURL && data.geoBlocked.forbidden)">
      <div class="ui-ele front wide">
        <p> 
          We're not able to complete this process.
          <br>Reason: User is in a restricted geographical location.
        </p>
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
      policyAccepted: false,
      stage2: false,
      userEmail: '',
      investmentValueUSD: 1000,
      selectedRound: 'Round 1',
      invoiceURL:false,
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
        if (round.name == this.selectedRound) { temp = round }
      }
      return temp
    },
    validEmail() {
      if (this.userEmail.length == 0) { return false }
      if (this.userEmail.indexOf("@") < 1) { return false }
      if (this.userEmail.indexOf(".") < 1) { return false }
      let failCount = 0
      let splitAt = this.userEmail.split("@")
      if (splitAt[0].length < 1) { failCount++ }
      if (splitAt[1].indexOf(".") < 1) { failCount++ }
      if (splitAt[1].length < 3) { failCount++ }

      return failCount == 0 ? true : false
    },
    validInvestmentValue() {
      return (this.investmentValueUSD && this.investmentValueUSD >= 1000)
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
    generateInvoice() {
      const btcpayServerUrl = 'https://btcpay.zettahash.org'
      const storeId = 'AHiTJcmjqv5Ekvh1nWJyskMAeBTogrdu1jEja1E5wpLB'
      const apiKey = 'f2b66197bc856171a64ddbeafb250087c3303b40'
      const amount = this.investmentValueUSD
      const currency = 'USD'

      const apiEndpoint = `/api/v1/stores/${storeId}/invoices`

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'token ' + apiKey
      }
      const payload = {
        amount: amount,
        currency: currency,
        metadata: {
          buyerEmail: this.userEmail,
          etherAccount: this.wallet,
          originatingIP: this.data.geoBlocked.ip,
          geoCountry: this.data.geoBlocked.region_name + ', ' + this.data.geoBlocked.country_code,
          buyerConfirmedNotUSOrCanadaCitizen: this.policyAccepted,
          roundOption: this.activeRound.name + ' Bonus:' + this.activeRound.bonus
        }
      }
      fetch(btcpayServerUrl + apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          let invoiceID = `https://btcpay.zettahash.org/i/${data.id}`
          this.invoiceURL = invoiceID
          //https://btcpay.zettahash.org/i/LEgKahj3RFmjuG2ZCSWY6y
        })

    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
</style>

<style lang="scss" scoped>
@import '@/assets/scss/constants';
.buyZH-frame{
  width: 400px;
  max-width: 80vw;
  height: 850px;
  margin: 20px auto;
  border: 0;
  border-radius: 5px;
  mix-blend-mode: screen;
  overflow: auto;
}
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
    border-radius: $radius3;
  }
}

p {
  margin-top: 0;
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

.btn {
  display: inline-flex;
  width: max-content;

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    background: var(--neutral-3);
    opacity: .5;
  }
}
</style>