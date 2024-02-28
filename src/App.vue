<template>
  <div id="app">
    <NavBar />
    <SideBar />

    <div :class="pageContentsClass" :data-zhHolder="application.zhHolderBool ? 'yes' : 'no'" @click="collapseSidebar()">

      <Notifications />
      <template v-if="application.zhHolderBool">
        <router-view></router-view></template>
      <template v-else>
        <LandingPage />
      </template>
    </div>
  </div>
</template>

<script>
import NavBar from './components/interface/Nav.vue'
import SideBar from './components/interface/SideBar.vue'
import LandingPage from './components/pages/LandingPage.vue'
import Notifications from './components/modules/Notifications.vue'
import { mapGetters } from 'vuex';


export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    LandingPage,
    Notifications,
  },
  computed: {
    ...mapGetters({
      application: 'application',
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
    // this.$store.commit("setNotification", {
    //   title: `Hashboard BETA`,
    //   data: `We're getting the Hashboard ready to launch 🚀`,
    // })
  }
}
</script>



<style lang="scss">
@import "@/assets/scss/styles.scss";

// REMOVE ALL STYLES AFTER THIS LINE WHEN REMOVING COMING SOON BANNER
.page-contents {
  grid-template-rows: 1fr;
  transition: 200ms ease;

  &.blur {
    filter: blur(50px);
    -webkit-filter: blur(50px);
  }
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
    opacity: .1;
  }
}
</style>
