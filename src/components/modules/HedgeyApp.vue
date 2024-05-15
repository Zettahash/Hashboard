<template lang="html">
  <div>
      <div class="apps-flex" v-if="!noControls">
        <span :set="name = 'Hedgey.'" :class="`link-wrapper ${app[walletKey] == name ? 'active' : ''}`"><a
            @click.stop="openApp(name)" :class="`link`">{{ name }} </a><span
            v-if="app[walletKey] == name" class="close link" @click.stop="closeApp()"><i
              class="icon-times"></i></span></span>
      </div>
    <template v-if="noControls || app[walletKey]">
      <VestingTable :address="address" :walletName="walletKey" />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getIcon, c2c, scrollTo } from '@/utils/general.js'
import VestingTable from '@/components/modules/VestingTable.vue'
export default {
  name: 'HedgeyApp',
  data() {
    return {
      dropdown: {},
      app: {},
    }
  },
  components: { VestingTable, },
  props: {
    provider: String,
    address: String,
    walletKey: String,
    noControls: Boolean,
  },
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
  },
  methods: {
    c2c,
    getIcon,
    scrollTo,
    async hedgeyVested(address) {
      const reply = this.$store.dispatch('queryHedgey', address);
      console.log(reply)
      return reply
    },
    openApp(name) {
      this.app[this.walletKey] = name
      this.$emit('setApplicationOpen')
    },
    closeApp() {
      this.app[this.walletKey] = false
      this.$emit('setApplicationClosed')
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/wallet-ui';

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