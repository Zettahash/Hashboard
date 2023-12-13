<template lang="">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Mining</h1>
      <p>We're working on getting this section ready for you.</p>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mining',
  mounted() {
    this.routeLoaded()
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
<style lang="">
  
</style>