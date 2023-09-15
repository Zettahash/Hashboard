<template lang="">
  <div>
    
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Market',
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