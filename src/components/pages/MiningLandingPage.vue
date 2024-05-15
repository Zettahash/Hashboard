<template lang="html">
  <div class="flex-overview">
    <InlineInformation :payload="inlineInformationPayload" />
    <WelcomeBanner />
    <div class="filter-ui">
      <DropdownUi dropdownTitle="Mining Sites" :dropdownOptions="sitesDropdown" :activeKey="sitesDropdown[0]" />
    </div>
    <MiningDemoGauges />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { walletShortName } from '@/utils/strings.js'
import { doDisconnect } from '@/utils/wallet.js'
import WelcomeBanner from '@/components/modules/WelcomeBanner.vue'
import MiningDemoGauges from '@/components/pages/Farms/MiningDemoGauges.vue'
import InlineInformation from '@/components/modules/InlineInformation.vue'
import DropdownUi from '@/components/modules/DropdownUi.vue'
export default {
  name: 'MiningLandingPage',
  data() {
    return {
      timeout: false,
      timeoutFunction: false,
      inlineInformationPayload: {
        title: `Demo Mining Overview.`,
        className: 'neutral',
        data: `We're still working on this section. In the meantime, here's a demo version of our Hashboard Mining Overview.`,
      },
      sitesDropdown: [
        'All Farms', 'Camcy Icora',
        'Iros',
        'Laosnia Damyan',
        'Landle Mapantu',
        'Custa Sternsounited',
        'Niare',
        'Guaynka Puarbru',
        'Western Nianewmau',
        'North Biama',
        'Galla',
      ],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      wallet: 'wallet',

    }),
    message() {

      if (!this.timeout) { return 'waiting' }
      if (!this.application.walletConnected) { return 'needAcc' }
      if (!this.application.zhHolderBool) { return 'needZH' }
      return '?'
    },
    zhHolderBool() {
      return this.application.zhHolderBool
    },
  },
  components: {
    MiningDemoGauges, WelcomeBanner, InlineInformation, DropdownUi,
  },
  methods: {
    walletShortName, doDisconnect,
    reset() {
      this.doDisconnect()
    },
  },
  watch: {
    zhHolderBool(value) {
      if (value == true) {
        clearTimeout(this.timeoutFunction)
        this.timeoutFunction = false
      }
    }
  },
  mounted() {
    window.payWallThis = this
    this.timeoutFunction = setTimeout(() => {
      if (!window.payWallThis.application.zhHolderBool) {
        window.payWallThis.timeout = true
        window.payWallThis = this
      }
    }, 8000)
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/constants';
@import 'src/assets/scss/ui';

.flex-overview {
  min-height: 100vh;
  background: var(--neutral-10);
  align-content: baseline;

  >div:last-of-type {
    margin-bottom: auto;
  }
}

.modal-relative {
  margin: 40px auto;
  height: max-content;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: $radius1;
  background: var(--neutral-10);
  position: relative;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.icon {
  height: 80px;
  width: auto;
  margin: 20px auto;
  display: block;
}

h1 {
  justify-content: center;
  align-items: center;
}

p {
  max-width: calc($ui-width / 2);
  margin: 20px auto;
  display: block;
  text-align: center;
}

.centred-connect-btn {
  width: max-content;
  margin: auto;
}

.faux-dash {
  width: 100%;
  height: auto;
}

.page-inner {
  background: var(--neutral-7);
}
</style>