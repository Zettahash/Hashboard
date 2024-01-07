<template lang="">
  <div>
    <div class="iframe"></div>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'LincoinManager',
  mounted() {
    const iframe = document.createElement('iframe')
    iframe.onload = this.frameLoaded
    iframe.src = 'https://app.lincoin.com/user/observer-welcome?token=developer.manager.046b51007b0ca230deeebf736eda19f4&role=manager';
    iframe.classList.add("dom-iframe")
    document.querySelector(".iframe").replaceWith(iframe)
    this.$store.commit('setDynamic', {
      item: 'activeFarm',
      value: 'lincoin'
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