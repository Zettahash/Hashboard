<template lang="">
  <div class="flex-overview">
  <div>
  <h2><img :src="require('@/assets/img/providers/specter.png')"/>Specter Solutions</h2>
  <p>Select any wallet to view directly on block explorer.</p>
  </div>
    <WalletsUI provider="Specter" />
  </div>
</template>
<script>

import WalletsUI from '@/components/modules/WalletsUI.vue'

export default {
  components: {
    // AssetsStats,
    WalletsUI,
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SpecterTreasury',
  data() {
    return {
    }
  },
  mounted() {
    this.routeLoaded()
  },
  methods: {
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
@import '@/assets/scss/constants';
h2{display: flex;gap:15px;
  align-items: center;
img{
  height:80px;
  max-width:80px;
  border-radius: $radius3;
}}
</style>