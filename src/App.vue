<template>
  <div id="app">
    <NavBar/>
    <SideBar/>

    <div :class="application.routerLoaded?'page-contents loaded':'page-contents not-loaded'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/interface/Nav.vue'
import SideBar from './components/interface/SideBar.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
    dark() {
      return this.application.uiThemeDark
    },
  },
  watch: {
    $route() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: false
      })
    }
  }
}
</script>



<style lang="scss">
@import "@/assets/scss/styles.scss";
</style>
