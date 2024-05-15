<template lang="">
<div class="nav">
<div class="nav-inner">
  <router-link :to="{ path: '/'}" class="app-title logo animated">
    <Zed />
    <span>Zettahash</span>
  </router-link>

  <div></div>
  <div class="nav-links">
  <template v-if="width>800">
    <WalletConnector />
  </template>
   
  </div>
</div>
</div>
</template>

<script>
import WalletConnector from './WalletConnector.vue'
import Zed from './Zed'
import {mapGetters} from 'vuex';
export default {
  name: "NavBar",
  components: {
    WalletConnector,
    Zed
  },
  data() {
    return {
      menu: false,
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
    }),
    dark() {
      return this.application.uiThemeDark
    },
    width() {
      return window.innerWidth
    },
    uiSidebarCollapse() {
      let stage = 2
      if (window.outerWidth < 700) { stage-- }
      if (this.application.uiSidebarCollapse) { stage-- }
      return stage == 0 ? false : stage
    },
  },
  methods: {
    resetMenu() {
      this.menu = false
    },
    toggleSidebarCollapse(bool) {
      this.$store.commit('setDynamic', {
        item: 'uiSidebarCollapse',
        value: bool
      })
    },
    toggleDemoValues() {
      this.$store.commit('setDynamic', {
        item: 'uiDemoValues',
        value: !this.application.uiDemoValues
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/constants';
@import 'src/assets/scss/nav';

</style>
