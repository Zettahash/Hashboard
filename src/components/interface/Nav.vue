<template lang="">
<div class="nav">

  <a title="Toggle sidebar" :class="`sidebar-toggle collapse-${uiSidebarCollapse}`" @click.stop="toggleSidebarCollapse(!application.uiSidebarCollapse);menu=false;">
    <i class="i-arrow-right-circle"></i>
    <i class="i-chevron-left"></i>
  </a>
<div class="nav-inner">
  <router-link :to="{ path: '/'}" class="app-title logo animated">
    <svg width="100%" height="100%" viewBox="0 0 833 790" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:bevel;stroke-miterlimit:1.5;">
      <rect id="Artboard1" x="0" y="0" width="832.178" height="789.611" style="fill:none;" />
      <clipPath id="_logo_clip1">
        <rect x="0" y="0" width="832.178" height="789.611" />
      </clipPath>
      <g clip-path="url(#_logo_clip1)">
        <g id="Layer-1" serif:id="Layer 1">
          <path d="M91.508,216.009l-16.008,86.258l376.552,-0l-299.045,273.746l602.156,-0l18.331,-83.318l-394.203,-0l301.039,-276.686l-588.822,0Z" style="fill:none;" />
          <clipPath id="_logo_clip2">
            <path d="M91.508,216.009l-16.008,86.258l376.552,-0l-299.045,273.746l602.156,-0l18.331,-83.318l-394.203,-0l301.039,-276.686l-588.822,0Z" />
          </clipPath>
          <g clip-path="url(#_logo_clip2)">
            <path id="zed" d="M48.777,253.466l648.389,0l-118.62,0l-313.072,283.662l-131.636,0l660.735,0" style="fill:none;stroke-width:100px;" />
          </g>
          <path d="M815.854,300.051l16.737,-84.042l-115.799,0l-92.888,84.042l191.95,0Z" style="fill:none;" />
          <clipPath id="_logo_clip3">
            <path d="M815.854,300.051l16.737,-84.042l-115.799,0l-92.888,84.042l191.95,0Z" />
          </clipPath>
          <g clip-path="url(#_logo_clip3)">
            <path id="horizontal_1" d="M578.546,258.03l286.018,0" style="fill:none;stroke-width:100px;" />
          </g>
          <path d="M17.15,491.971l-16.737,84.042l115.798,-0l92.889,-84.042l-191.95,0Z" style="fill:none;" />
          <clipPath id="_logo_clip4">
            <path d="M17.15,491.971l-16.737,84.042l115.798,-0l92.889,-84.042l-191.95,0Z" />
          </clipPath>
          <g clip-path="url(#_logo_clip4)">
            <path id="horizontal_2" d="M-31.56,533.992l286.018,-0" style="fill:none;stroke-width:100px;" />
          </g>
          <path d="M621.318,0.949l94.005,-0l-169.267,789.61l-94.004,0l41.063,-192.217l94.146,-0l27.135,-126.58l-94.119,0l21.053,-97.675l116.441,-104.664l17.009,-79.346l-94.141,0l40.679,-189.128Z" style="fill:none;" />
          <clipPath id="_logo_clip5">
            <path d="M621.318,0.949l94.005,-0l-169.267,789.61l-94.004,0l41.063,-192.217l94.146,-0l27.135,-126.58l-94.119,0l21.053,-97.675l116.441,-104.664l17.009,-79.346l-94.141,0l40.679,-189.128Z" />
          </clipPath>
          <g clip-path="url(#_logo_clip5)">
            <path id="vertical_2" d="M676.956,-28.386l-187.559,860.148" style="fill:none;stroke-width:100px;stroke-linejoin:round;" />
          </g>
          <path d="M303.105,0.949l94.004,-0l-169.266,789.61l-94.005,0l41.064,-192.217l94.146,-0l41.649,-194.287l-116.06,101.004l36.025,-184.335l98.084,-0.869l27.82,-129.778l-94.141,0l40.68,-189.128Z" style="fill:none;" />
          <clipPath id="_logo_clip6">
            <path d="M303.105,0.949l94.004,-0l-169.266,789.61l-94.005,0l41.064,-192.217l94.146,-0l41.649,-194.287l-116.06,101.004l36.025,-184.335l98.084,-0.869l27.82,-129.778l-94.141,0l40.68,-189.128Z" />
          </clipPath>
          <g clip-path="url(#_logo_clip6)">
            <path id="vertical_1" d="M354.313,-28.386l-183.13,860.148" style="fill:none;stroke-width:100px;stroke-linejoin:round;" />
          </g>
        </g>
      </g>
    </svg>
    <span>Zettahash</span>
  </router-link>

  <div></div>
  <div class="nav-links">
  <template v-if="width>800">
    <WalletConnector />
  </template>
    <!-- <div class="menu-container">
      <a class="btn" @click="menu=!menu"><i class="icon-ellipsis-v"></i></a>
      <div class="menu" v-if="menu">
        <ul>
          <li>
            <a @click="toggleDemoValues()"><span>Demo Mode</span><i :class="'switch-indicator' + (application.uiDemoValues ? ' on' : ' off')"></i></a>
          </li>

          <li>
            <a @click="$store.dispatch('fetchCombinedDataPayload')">
            <span v-if="data.synchronisationStatus==='syncing'">Syncing</span>
            <span v-if="String(data.synchronisationStatus)==='false'">Up to date<br>
              <small>{{new Date(data.synchronisation)}}</small>
            </span>
            <span v-if="String(data.synchronisationStatus)==='error'">An Error has occurred</span>
            <span v-if="String(data.synchronisationStatus)==='true'">Error</span>
              <i v-if="data.synchronisationStatus==='syncing'" class="i-refresh-cw spinning"></i>
              <i v-if="String(data.synchronisationStatus)==='error'" class="i-alert-circle"></i>
              <i v-if="String(data.synchronisationStatus)==='false'" class="i-check"></i> 
            </a>
          </li>

          <li>
            <div class="social-grid">
              <a href="#"><i class="fab fa-discord"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fab fa-github"></i></a>
            </div>

          </li>
        </ul>
      </div>
    </div> -->
  </div>
</div>
</div>
</template>

<script>
import WalletConnector from './WalletConnector.vue'
import {
  mapGetters
} from 'vuex';
export default {
  name: "NavBar",
  components: {
    WalletConnector,
  },
  data() {
    return {
      // uiSidebarCollapse: false,
      menu: false,
    }
  },
  mounted() {
    document.querySelector(".page-contents").addEventListener("click", this.resetMenu)
    document.querySelector(".logo.animated").addEventListener("mouseenter", () => {
      document.querySelector(".logo").classList.remove("animated")
      setTimeout(() => {
        document.querySelector(".logo").classList.add("animated")
      }, 100)
    })
    if (window.innerWidth < 800) {
      this.toggleSidebarCollapse(true)
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
    }),
    dark() {
      return this.application.uiThemeDark
    },
    width() {
      return window.innerWidth
    },
    uiSidebarCollapse() {
      let stage = 2
      if (window.outerWidth < 700) { stage-- }
      if (this.application.uiSidebarCollapse) { stage-- }
      return stage == 0 ? false : stage
    },
  },
  methods: {
    resetMenu() {
      this.menu = false
    },
    toggleSidebarCollapse(bool) {
      this.$store.commit('setDynamic', {
        item: 'uiSidebarCollapse',
        value: bool
      })
    },
    toggleDemoValues() {
      this.$store.commit('setDynamic', {
        item: 'uiDemoValues',
        value: !this.application.uiDemoValues
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/nav';

</style>
