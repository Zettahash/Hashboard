<template lang="">
  <div>
    <div class="iframe"></div>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Overview',
  mounted() {
    const iframe = document.createElement('iframe')
    iframe.onload = this.frameLoaded
    iframe.src = 'https://app.lincoin.com/user/observer-welcome?token=developer.manager.046b51007b0ca230deeebf736eda19f4&role=manager';
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
