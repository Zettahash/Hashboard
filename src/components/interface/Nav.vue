<template lang="">
<div class="nav">

  <a title="Toggle sidebar" :class="`sidebar-toggle collapse-${uiSidebarCollapse}`" @click.stop="toggleSidebarCollapse(!application.uiSidebarCollapse);menu=false;">
    <i class="i-arrow-right-circle"></i>
    <i class="i-chevron-left"></i>
  </a>
<div class="nav-inner">
  <router-link :to="{ name: 'manager'}" class="app-title logo animated">
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
    <div :class="'exposed sync-status ' + data.synchronisationStatus" @click="$store.dispatch('fetchCombinedDataPayload')">
      <i class="i-refresh-cw"></i>
      <i class="i-alert-circle"></i>
      <i class="i-check"></i>
    </div>
    <div class="menu-container">
      <a class="btn" @click="menu=!menu"><i class="icon-ellipsis-v"></i></a>
      <div class="menu" v-if="menu">
        <ul>
          <li class="centre">
            <template v-if="width<=800">
              <WalletConnector />
            </template>
          </li>
          <li>
            <a @click="toggleDemoValues()"><span>Demo Mode</span><i :class="'switch-indicator' + (application.uiDemoValues ? ' on' : ' off')"></i></a>
          </li>

          <li>
            <a @click="$store.dispatch('fetchLincoin');$store.dispatch('fetchCombinedDataPayload')">
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
    </div>
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

.nav {
  position: relative;
  z-index: 400;
  grid-column: 1/3;
  grid-row: 1/2;

  .nav-inner {
    display: grid;
    padding: 10px 20px;
    gap: 20px;
    grid-template: auto / auto 1fr auto;
    align-items: center;
    background-color: var(--neutral-9);
    box-shadow: 0 1px 0 0 var(--neutral-6);

    .logo {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      font-weight: 600;
      transition: 200ms ease;
      width: 170px;

      @media (max-width: $small) {
        margin-right: auto;
        width: auto;

        span {
          display: none;
        }
      }

      svg {
        height: 30px;
        opacity: 0;
        transform: scale(0.8);
        transform-origin: center;
        transition: 200ms ease;

        path {
          stroke: var(--neutral-1);
        }
      }

      span {
        font-size: 22px;
        font-family: $font-family;

      }

      &.animated {
        svg {
          transform: scale(1);
          opacity: 1;
        }

        #zed,
        #vertical_1,
        #vertical_2,
        #horizontal_1,
        #horizontal_2 {
          opacity: 0;
        }

        #zed {
          animation: animateDashLong 1500ms 50ms ease forwards 1;
        }

        #vertical_1 {
          animation: animateDash 1000ms 750ms linear forwards 1;
        }

        #vertical_2 {
          animation: animateDash 1000ms 1000ms linear forwards 1;
        }

        #horizontal_1 {
          animation: animateDashShort 500ms 750ms linear forwards 1;
        }

        #horizontal_2 {
          animation: animateDashShort 500ms 1000ms linear forwards 1;
        }
      }
    }

    .nav-links {
      display: grid;
      gap: 20px;
      grid-auto-flow: column;

      .menu-container {
        position: relative;

        .btn {
          background-color: var(--neutral-8);
          color: var(--neutral-2);
          padding: calc(1rem / 1.62);
          min-width: 2.75rem;
          justify-content: center;
        }

        .menu {
          position: absolute;
          width: 250px;
          right: 0;
          max-width: 100vw;
          background: var(--neutral-8);
          box-shadow: 0 0 0 1px var(--text), 0px 30px 50px -10px var(--black);
          padding: 15px;
          border-radius: 1rem;
          top: calc(100% + 12px);

          ul {
            list-style: none;
            padding: 0;
            color: var(--neutral-4);
            margin: 0;

            li {
              cursor: pointer;
              font-size: 20px;

              &:not(:first-of-type) {
                padding-top: 15px;
              }

              &:not(:last-of-type) {
                padding-bottom: 15px;
                box-shadow: 0 1px 0 0 var(--neutral-5);
              }

              &:hover {
                color: var(--neutral-2);

              }

              i {
                margin-right: 10px;
              }

              >a {
                display: flex;
                justify-content: space-between;
              }

              .social-grid {
                display: flex;
                justify-content: space-around;

                a {
                  color: var(--neutral-4);
                }

                &:hover {
                  color: var(--neutral-2);

                }
              }

              small {
                font-size: 75%;
                opacity: .5;
              }

              &.centre {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}

.sync-status {

  background-color: var(--neutral-8);
  color: var(--neutral-2);
  display: flex;
  height: 100%;
  min-width: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  transition: 200ms ease;
  cursor: pointer;
  // gap: 10px;
  padding: 0 calc(1.5rem / 1.62);

  @media (max-width:$small) {
    &::before {
      display: none;
    }
  }

  &::before {
    margin-right: 0px;
    overflow: hidden;
    text-wrap: nowrap;
    width: 0%;
    max-width: 0vw;
    opacity: 0;
    transition: 100ms ease-in-out;
  }

  &:not(.syncing) {

    &:hover {
      background-color: var(--primary);
      color: var(--neutral-1);


      &::before {
        content: 'Refresh now' !important;
        margin-right: 10px !important;
        overflow: hidden !important;
        text-wrap: nowrap !important;
        width: 100% !important;
        max-width: 100vw !important;
        opacity: 1 !important;
      }

      i.i-alert-circle {
        display: block;
      }

      i.i-check {
        display: none !important;
      }
    }
  }

  i {
    display: none;
  }

  &.false {
    &::before {
      content: 'Up-to-date';
      animation: text-grow-in-out 4000ms ease-in-out forwards 1;
    }

    i.i-check {
      display: block;
    }
  }

  &.syncing {
    pointer-events: none;

    &::before {
      transition: 400ms ease-in-out;
      content: 'Syncing';
      margin-right: 10px;
      overflow: hidden;
      text-wrap: nowrap;
      width: 100%;
      max-width: 100vw;
      opacity: 1;
    }

    i.i-refresh-cw {
      display: block;
      transform-origin: center;
      animation: spin 1s linear forwards infinite;
    }
  }

  &.true {
    background: var(--secondary);
    color: var(--neutral-10);
  }




}

i.i-refresh-cw.spinning {
  transform-origin: center;
  animation: spin 1s linear forwards infinite;
}

.sidebar-toggle {
  // background-color: var(--neutral-8);
  color: var(--neutral-2);
  display: flex;
  height: auto;
  width: max-content;
  aspect-ratio: 1/1;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  transition: 200ms ease;
  cursor: pointer;
  position: absolute;
  top: 100%;
  transform: translate(20px, 20px);

  &:hover {
    i {
      &::before {
        color: var(--white);
      }
    }
  }

  .i-arrow-right-circle,
  .i-chevron-left {
    display: none;

    &::before {
      // padding: 2px;
      border-radius: 100px;
    }
  }


  &:not(.collapse-false) {
    i {
      &::before {
        color: var(--secondary);
        background-color: var(--neutral-9);
    padding: 2px;
      }
    }

    // color: var(--neutral-10);
    transform: translate(calc(300px - 50%), 20px);

  }

  &.collapse-false {
    .i-arrow-right-circle {
      display: block;
    }
  }

  &.collapse-2 {
    .i-chevron-left {
      display: block;
      // transform: translate(-2px, -1px);

    }
  }

  &.collapse-1 {
    transform: translate(calc(8px + 50%), 20px);
    font-size: 24px;

    .i-chevron-left {
      display: block;
      // transform: translate(-2px, -1px);

      @media (min-width:700px) {
        display: none;

      }

    }

    .i-arrow-right-circle {
      display: none;

      @media (min-width:700px) {

        display: block;
      }
    }

    i {
      transform: translate(-.5px, -1px);
    }
  }
}

.switch-indicator {
  display: inline-block;
  width: 50px;
  height: 25px;
  border-radius: 100px;
  box-shadow: 0 0 0 2px;
  padding: 3px;
  margin: auto 10px;

  &::before {
    content: '';
    height: 100%;
    aspect-ratio: 1/1;
    background: var(--neutral-5);
    display: block;
    border-radius: 100px;
    transition: 200ms ease;
  }

  &.on {
    box-shadow: 0 0 0 2px var(--moss);

    &::before {
      transform: translateX(calc(100% + 6px));
      background: var(--light-moss);
    }
  }
}

@keyframes animateDashShort {
  from {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    opacity: 0;
  }

  to {
    stroke-dasharray: 500;
    stroke-dashoffset: 0;
    opacity: 0.5;
  }
}

@keyframes animateDash {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    opacity: 0;
  }

  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    opacity: 0.5;
  }
}

@keyframes animateDashLong {
  from {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    opacity: 0;
  }

  to {
    stroke-dasharray: 2000;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes text-grow-in-out {
  0% {
    white-space: nowrap;
    margin-right: 0px;
    overflow: hidden;
    text-wrap: nowrap;
    width: 0%;
    max-width: 0vw;
    opacity: 0;
  }

  20% {
    white-space: nowrap;
    margin-right: 10px;
    overflow: hidden;
    text-wrap: nowrap;
    width: 100%;
    max-width: 100vw;
    opacity: 1;
  }

  80% {
    white-space: nowrap;
    margin-right: 10px;
    overflow: hidden;
    text-wrap: nowrap;
    width: 100%;
    max-width: 100vw;
    opacity: 1;
  }

  100% {
    white-space: nowrap;
    margin-right: 0px;
    overflow: hidden;
    text-wrap: nowrap;
    width: 0%;
    max-width: 0vw;
    opacity: 0;
  }
}
</style>
