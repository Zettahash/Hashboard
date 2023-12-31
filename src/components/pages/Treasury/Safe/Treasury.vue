<template lang="">
  <div>
    <div class="iframe"></div>
  </div>
</template>
<script>

export default {
  name: 'SafeTreasury',
  mounted() {
    const iframe = document.createElement('iframe')
    iframe.onload = this.frameLoaded
    iframe.src = 'https://app.safe.global/home?safe=eth:0xc3262111bAAcf9d90930eD11E1b91FF676D9bFF7';
    iframe.classList.add("dom-iframe")
    document.querySelector(".iframe").replaceWith(iframe)
  },
  methods: {
    frameLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
      if (window.innerWidth < 800){
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
  .dom-iframe{
    height: 100%;
    width: 100%;
    border: 0;
  }
</style>