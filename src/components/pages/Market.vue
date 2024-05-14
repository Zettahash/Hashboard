<template lang="html">
  <div class="flex-overview">
    <InlineInformation :payload="{
        title: `Demo Market Overview.`,
        className: 'neutral',
        data: `We're still working on this section. In the meantime, here's a demo of our Markets Overview.`,
      }" />

      <div class="ui-ele">
        <h1 class="title">Markets</h1>
        <p>Here you can find data on ZH trading prices as well as links to exchanges listing ZH.</p>
      </div>
        <ZHTVChart :width="width" :height="height" />
<UniSwap />

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import InlineInformation from '@/components/modules/InlineInformation.vue'
import ZHTVChart from '../charts/ZHTVChart.vue';
import UniSwap from '../modules/UniSwap.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Market',
  components: {
    InlineInformation,
    ZHTVChart,
    UniSwap,
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
.title{margin-bottom:5px !important; }
spacer{min-height: 100vh;}
</style>