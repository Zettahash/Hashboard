<template>
  <div id="app">
    <SideBar />

    <div :class="pageContentsClass" :data-zhHolder="application.zhHolderBool ? 'yes' : 'no'" @click="collapseSidebar()">

      <Notifications />
      <template v-if="application.zhHolderBool || (routeIsAllowedWithoutHoldingZH && wallet)">
        <router-view></router-view>
      </template>
      <template v-else>
        <LandingPage />
      </template>
    </div>
  </div>
</template>

<script>
import SideBar from './components/interface/SideBar.vue'
import LandingPage from './components/pages/LandingPage.vue'
import Notifications from './components/modules/Notifications.vue'
import { mapGetters } from 'vuex';


export default {
  name: 'App',
  components: {
    SideBar,
    LandingPage,
    Notifications,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      wallet: 'wallet',
    }),
    routerLoaded() {
      return this.application.routerLoaded
    },
    uiSidebarCollapse() {
      return this.application.uiSidebarCollapse
    },
    pageContentsClass() {
      let className = 'page-contents'
      if (this.routerLoaded) { className += ' loaded' }
      else { className += ' not-loaded' }
      if (!this.uiSidebarCollapse && window.innerWidth <= 700) { className += ' blur' }
      return className
    },
    dark() {
      return this.application.uiThemeDark
    },
    routeIsAllowedWithoutHoldingZH() {
      const allowedUnauthenticatedRoutes = ['beneficiary']
      return allowedUnauthenticatedRoutes.indexOf(this.$route.name) >= 0 ? true : false
    },
  },
  watch: {
    $route() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: false
      })
    }
  },
  methods: {
    collapseSidebar() {
      if (window.innerWidth < 1250) {
        this.$store.commit('setDynamic', {
          item: 'uiSidebarCollapse',
          value: true
        })
      }
    },
  },
  mounted() {
    let umami = document.createElement('script')
    umami.setAttribute('src', 'https://eu.umami.is/script.js')
    umami.setAttribute('data-website-id', '2e3126f1-0704-4e97-ab66-393d6bb08f06')
    document.head.appendChild(umami)
  }
}
</script>



<style lang="scss">
@import "/src/assets/scss/styles.scss";
</style>
