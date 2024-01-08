<template lang="">
  <div>
  </div>
</template>
<script>
export default {
  name: 'CommunityConsensusForum',
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
  },
  methods: {

  }
}
</script>
<style lang="scss"></style>