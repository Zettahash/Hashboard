<template lang="html">
  <div class="flex-overview demo">
      <div class="ui-ele">
        <h1 class="title">Markets</h1>
        <p>Here you can find data on ZH trading prices as well as links to exchanges listing ZH.</p>
      </div>

      <iframe id="dextools-widget" title="DEXTools Trading Chart" :width="width" :height="height"
        src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x501a9614b47040b84033147adae98a0b097e8981?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"></iframe>
      <PlacesToBuyZH />
    <div class="text-overlay exempt">
      <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">
      <p>We're working on this section.</p>
      <p>Visit <router-link :to="{ name: 'consensus' }" class="link">Consensus</router-link> for updates.</p>
    </div>
  </div>
</template>
<script>
import PlacesToBuyZH from './../tiles/PlacesToBuyZH.vue'
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components: {
    PlacesToBuyZH,
  },
  mounted() {
    this.routeLoaded()
  },
  computed: {
    ...mapGetters({
      payload: 'payload',
      application: 'application',
    }),
    uiSidebarCollapse() {
      return this.application.uiSidebarCollapse
    },
    width() {
      return this.uiSidebarCollapse ? (window.outerWidth > 700 ? window.innerWidth - 110 : window.innerWidth - 40) : window.innerWidth - 320
    },
    height() {
      return window.innerHeight <= 800 ? 380 : (window.innerHeight > 1200 ? 480 : window.innerHeight * .4)
    },
  },
  methods: {
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
</style>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
#dextools-widget {
  border: 0;
  border-radius: $radius1;
  margin: auto;
}
</style>