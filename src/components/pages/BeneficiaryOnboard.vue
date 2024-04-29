<template lang="html">
  <div class="flex-overview">
    <LoadingEle :stop="(data.geoBlocked && data.geoBlocked.forbidden == false) ? true : false" :long="true" />
    <template v-if="data.geoBlocked && data.geoBlocked.forbidden == false">
      <div class="ui-ele front">
        <h1>Buy ZH Token</h1>
        <p></p>

        <InlineInformation v-if="geoEligibility" :payload="geoEligibility" />

        <template v-if="!stage2">
          <div class="filter-ui">
            <div class="button-flex-organiser" data-label="Purchasing options">
              <div :set="type = 'crypto'" :class="`btn uppercase ${purchaseType === type ? 'active' : ''}`">
                <b-icon-currency-bitcoin /><span class="text-vertical"><span>Buy with {{ type }}</span></span>
              </div>

              <div :set="type = 'CEX'" :class="`btn disabled uppercase ${purchaseType === type ? 'active' : ''}`">
                <b-icon-currency-exchange /><span class="text-vertical"><span>On {{ type }}</span> <small>Coming
                    soon</small></span>
              </div>

              <div :set="type = 'card'" :class="`btn disabled uppercase ${purchaseType === type ? 'active' : ''}`">
                <b-icon-credit-card /><span class="text-vertical"><span>With {{ type }}</span> <small>Coming
                    soon</small></span>
              </div>
            </div>

            <div class="button-flex-organiser" data-label="Investment round">
              <div v-for="(item, index) of rounds" :key="index"
                :class="`btn uppercase ${selectedRound === item.name ? 'active' : ''}`"
                @click.stop="selectedRound = item.name">
                <i class="counter" :data-numb="index + 1"></i>
                <span class="text-vertical">
                  <span>{{ item.name }}</span>
                  <small>Bonus: {{ item.bonus }}<br><br>
                    <span v-if="item.status == 'closed'">(preview)</span>
                    <span v-else>Open</span>
                  </small>
                </span>
              </div>
            </div>

          </div>
        </template>
      </div>
      <template v-if="holdings[walletType] && !stage2">

        <div class="ui-ele">
          <div class="brick-wall">
            <div class="balances-group tile open">
              <h3>Tokens Sold in {{ activeRound.name }}</h3>
              <div class="horizontal-fill-status-bar"
                :style="`--pc: ${(soldThisRound / activeRound.threshold) * 100}%;`">
                <span class="name"></span>
                <span class="value">{{ soldThisRound.toLocaleString() }} ZH
                  <template v-if="soldThisRound>0">
                    <br>
                    <small>{{ Number(((soldThisRound * rates.ZH.priceUsd) * rates.USDT.priceUsd ).toFixed(2)).toLocaleString() }} USDT</small>
                  </template>
                </span>
                <span class="pc">{{ ((soldThisRound / activeRound.threshold) * 100).toFixed(2) }} %</span>
              </div>
              
            </div>
          </div>
        </div>

        <div class="ui-ele">
          <div class="brick-wall">
            <div class="balances-group tile open">
              <h2>
                <span>{{ activeRound.bonus==="0%" ? `Invest without a bonus in ${activeRound.name}` : `Receive ${activeRound.bonus} bonus when you invest in ${activeRound.name}` }}</span>

              </h2>
              <div class="v-flex">
                <p><b-icon-clock-history /> <b>Lockup</b>: {{ activeRound.lockup }}</p>
                <p><b-icon-currency-dollar /> <b>Token price</b>: {{ activeRound.tokenPrice }}</p>
                <p><b-icon-arrow-return-right /> <b>Transferable</b>: {{ activeRound.transferable }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ui-ele">
          <div class="brick-wall">
            <div class="balances-group tile open">
              <h2><span>Policy</span></h2>
              <div class="inline" v-if="activeRound.name !== openRound.name">
                <div class="checkbox-container">
                  <input type="checkbox" checked disabled />
                  <img :src="require('/src/assets/img/checkbox.svg')" />
                </div>
                <p>I understand that I am Purchasing ZH in {{ openRound.name }}.</p>
              </div>
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

          <a :class="`btn ${!policyAccepted ? 'disabled' : ''}`"
            @click="stage2 = true">Continue<b-icon-arrow-right /></a>
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
              <a @click="invoiceURL = false" class="btn-link neutral subtle"><i class="i-arrow-left"></i>
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

      <template v-if="!data.geoBlocked || (invoiceURL && data.geoBlocked.forbidden)">
        <div class="ui-ele front wide">
          <p>
            We're not able to complete this process.
            <br>Reason: User is in a restricted geographical location.
          </p>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import LoadingEle from '@/components/interface/LoadingEle.vue'

import InlineInformation from '@/components/modules/InlineInformation.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    InlineInformation,
    LoadingEle,
  },
  name: 'BeneficiaryOnboard',
  data() {
    return {
      beneficiariesTotal: 113500000,
      dropdownInvestmentOptions: false,
      walletType: 'eth',
      walletActive: false,
      purchaseType: 'crypto',
      policyAccepted: false,
      stage2: false,
      userEmail: '',
      investmentValueUSD: 1000,
      selectedRound: 'Round 1',
      invoiceURL: false,
      geoEligibility: false,
      rounds: [
        {
          name: 'Round 1',
          status: 'open',
          bonus: '40%',
          allocation: '$1,500,000.00',
          transferable: '5%',
          lockup: '95% distributed quarterly for 2 years',
          tokensSold: '21,000,000.00',
          threshold: 21000000,
          tokenPrice: '$0.10',
          percentOfAllocation: '18.50%',
        },
        {
          name: 'Round 2',
          status: 'closed',
          bonus: '25%',
          allocation: '$2,000,000.00',
          transferable: '10%',
          lockup: '90% distributed quarterly for 2 years',
          tokensSold: '25,000,000.00',
          threshold: 46000000,
          tokenPrice: '$0.10',
          percentOfAllocation: '22.03%',
        },
        {
          name: 'Round 3',
          status: 'closed',
          bonus: '10%',
          allocation: '$2,500,000.00',
          transferable: '15%',
          lockup: '85% distributed quarterly for 1 year',
          tokensSold: '27,500,000.00',
          threshold: 73500000,
          tokenPrice: '$0.10',
          percentOfAllocation: '24.23%',
        },
        {
          name: 'Round 4',
          status: 'closed',
          bonus: '0%',
          allocation: '$4,000,000.00',
          transferable: '25%',
          lockup: '50% at month 3 : 50% at month 6',
          tokensSold: '40,000,000.00',
          threshold: 113500000,
          tokenPrice: '$0.10000',
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
    lastRoundThreshold() {
      let temp = 0
      for (let i = 0; i < this.rounds.length; i++) {
        if (this.rounds[i].name == this.selectedRound) { temp = i > 0 ? this.rounds[i - 1].threshold : 0 }
      }
      return temp
    },
    totalSold() { return this.beneficiariesTotal - this.holdings.eth.beneficiary_zettahash_eth_zh.balance },
    soldThisRound() {
      let val = 0
      if (this.totalSold >= this.lastRoundThreshold) {
        if (this.totalSold < this.activeRound.threshold) {
          val = this.totalSold - this.lastRoundThreshold
        } else {
          val = this.activeRound.threshold
        }
      } else {
        val = 0
      }

      return val
    },
    openRound() {
      let temp = false
      for (const round of this.rounds) {
        if (round.status == 'open') { temp = round; break; }
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
    geoBlocked() {
      return this.data.geoBlocked
    },
  },
  mounted() {
    this.routeLoaded()
    document.body.addEventListener("click", () => {
      this.dropdownInvestmentOptions = false
    })
    this.notifyGeo()
  },
  watch: {
    geoBlocked() {
    this.notifyGeo()
      
    },
  },
  methods: {
    notifyGeo() {
      if(this.geoBlocked) {
      if (this.geoBlocked.forbidden) {
        this.geoEligibility = {
          title: `We are not able to provide this service in ${this.geoBlocked.country_name}.`,
          className: 'error',
          data: `IP:${this.geoBlocked.ip} - 
          ${this.geoBlocked.region_name}, ${this.geoBlocked.country_code}`,
        }

      } else {
        this.geoEligibility = {
          title: `Your geographic location is supported.`,
          className: 'good',
          data: `IP:${this.geoBlocked.ip} - 
          ${this.geoBlocked.region_name}, ${this.geoBlocked.country_code}`,
        }
      }
    }
    },
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
          originatingIP: this.geoBlocked.ip,
          geoCountry: this.geoBlocked.region_name + ', ' + this.geoBlocked.country_code,
          buyerConfirmedNotUSOrCanadaCitizen: this.policyAccepted,
          roundOption: this.openRound.name + ' Bonus:' + this.openRound.bonus
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

h3,
h4 {
  margin: 0;
  ;
}

.tile {
  p {
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1;
    opacity: .5;

    svg {
      transform: translateY(15%);
      height: 1.2rem;
      width: 1.2rem;
    }
  }
}

.buyZH-frame {
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