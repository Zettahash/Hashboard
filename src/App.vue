<template>
  <div id="app">
    <NavBar />
    <SideBar />

    <div :class="application.routerLoaded ? 'page-contents loaded' : 'page-contents not-loaded'" :data-zhHolder="application.zhHolderBool?'yes':'no'">

      <div class="coming-soon"></div>
      <template v-if="application.zhHolderBool">
      <router-view></router-view></template>
      <template v-else>
        <PayWall />
      </template>
    </div>
  </div>
</template>

<script>
import NavBar from './components/interface/Nav.vue'
import SideBar from './components/interface/SideBar.vue'
import PayWall from './components/interface/PayWall.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    PayWall,
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

// REMOVE ALL STYLES AFTER THIS LINE WHEN REMOVING COMING SOON BANNER
.page-contents{
  grid-template-rows: auto 1fr;
} 
.coming-soon {
  padding: 20px;
  display: block;
  position: relative;
  text-align: center;
  height: max-content;

  &::before {
    content: "🚀 Hashboard Launching Soon 🚀";
    font-size: 24px;
  }

  &::after {
    background: linear-gradient(60deg, var(--primary), var(--yellow));
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    content: '';
    z-index: -1;
    opacity:.1;
  }
}
</style>
