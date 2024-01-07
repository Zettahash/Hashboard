<template lang="">
  <div>
    <div class="iframe"></div>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'OceanManager',
  mounted() {
    const iframe = document.createElement('iframe')
    iframe.onload = this.frameLoaded
    iframe.src = 'https://ocean.xyz/stats/bc1q26pwx77e3024uetddkr5mtk3llkk36juu64l6ll2w9nry7k2rymsg0la96.zettahash';
    iframe.classList.add("dom-iframe")
    iframe.setAttribute("style", "filter: invert(1) hue-rotate(180deg)")
    document.querySelector(".iframe").replaceWith(iframe)
    this.$store.commit('setDynamic', {
      item: 'activeFarm',
      value: 'ocean'
    })
  },
  methods: {
    frameLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
      if (window.innerWidth < 800) {
        this.$store.commit('setDynamic', {
          item: 'uiSidebarCollapse',
          value: true
        })
      }
    }
  }
}
</script>
<style lang="scss">
.dom-iframe {
  height: 100%;
  width: 100%;
  border: 0;
}
</style>