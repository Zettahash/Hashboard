<template lang="">
  <div class="nav">
    
  <a title="Toggle sidebar" :class="'sidebar-toggle ' + !application.sidebarCollapse" @click.stop="toggleSidebarCollapse(!application.sidebarCollapse)">
    <i :class="application.sidebarCollapse?'i-chevrons-right':'i-chevrons-left'"></i>
  </a>
  <router-link :to="{ name: 'overview'}" class="app-title logo animated">
    <svg width="100%" height="100%" viewBox="0 0 833 790" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:bevel;stroke-miterlimit:1.5;"><rect id="Artboard1" x="0" y="0" width="832.178" height="789.611" style="fill:none;"/><clipPath id="_logo_clip1"><rect x="0" y="0" width="832.178" height="789.611"/></clipPath><g clip-path="url(#_logo_clip1)"><g id="Layer-1" serif:id="Layer 1"><path d="M91.508,216.009l-16.008,86.258l376.552,-0l-299.045,273.746l602.156,-0l18.331,-83.318l-394.203,-0l301.039,-276.686l-588.822,0Z" style="fill:none;"/><clipPath id="_logo_clip2"><path d="M91.508,216.009l-16.008,86.258l376.552,-0l-299.045,273.746l602.156,-0l18.331,-83.318l-394.203,-0l301.039,-276.686l-588.822,0Z"/></clipPath><g clip-path="url(#_logo_clip2)"><path id="zed" d="M48.777,253.466l648.389,0l-118.62,0l-313.072,283.662l-131.636,0l660.735,0" style="fill:none;stroke-width:100px;"/></g><path d="M815.854,300.051l16.737,-84.042l-115.799,0l-92.888,84.042l191.95,0Z" style="fill:none;"/><clipPath id="_logo_clip3"><path d="M815.854,300.051l16.737,-84.042l-115.799,0l-92.888,84.042l191.95,0Z"/></clipPath><g clip-path="url(#_logo_clip3)"><path id="horizontal_1" d="M578.546,258.03l286.018,0" style="fill:none;stroke-width:100px;"/></g><path d="M17.15,491.971l-16.737,84.042l115.798,-0l92.889,-84.042l-191.95,0Z" style="fill:none;"/><clipPath id="_logo_clip4"><path d="M17.15,491.971l-16.737,84.042l115.798,-0l92.889,-84.042l-191.95,0Z"/></clipPath><g clip-path="url(#_logo_clip4)"><path id="horizontal_2" d="M-31.56,533.992l286.018,-0" style="fill:none;stroke-width:100px;"/></g><path d="M621.318,0.949l94.005,-0l-169.267,789.61l-94.004,0l41.063,-192.217l94.146,-0l27.135,-126.58l-94.119,0l21.053,-97.675l116.441,-104.664l17.009,-79.346l-94.141,0l40.679,-189.128Z" style="fill:none;"/><clipPath id="_logo_clip5"><path d="M621.318,0.949l94.005,-0l-169.267,789.61l-94.004,0l41.063,-192.217l94.146,-0l27.135,-126.58l-94.119,0l21.053,-97.675l116.441,-104.664l17.009,-79.346l-94.141,0l40.679,-189.128Z"/></clipPath><g clip-path="url(#_logo_clip5)"><path id="vertical_2" d="M676.956,-28.386l-187.559,860.148" style="fill:none;stroke-width:100px;stroke-linejoin:round;"/></g><path d="M303.105,0.949l94.004,-0l-169.266,789.61l-94.005,0l41.064,-192.217l94.146,-0l41.649,-194.287l-116.06,101.004l36.025,-184.335l98.084,-0.869l27.82,-129.778l-94.141,0l40.68,-189.128Z" style="fill:none;"/><clipPath id="_logo_clip6"><path d="M303.105,0.949l94.004,-0l-169.266,789.61l-94.005,0l41.064,-192.217l94.146,-0l41.649,-194.287l-116.06,101.004l36.025,-184.335l98.084,-0.869l27.82,-129.778l-94.141,0l40.68,-189.128Z"/></clipPath><g clip-path="url(#_logo_clip6)"><path id="vertical_1" d="M354.313,-28.386l-183.13,860.148" style="fill:none;stroke-width:100px;stroke-linejoin:round;"/></g></g></g></svg>
  <span>Zettahash</span>
  </router-link>

  <div></div>
  <div class="nav-links">

    <div :class="'sync-status ' + data.synchronisationStatus" @click="$store.dispatch('fetchLincoin')">
      <i class="i-refresh-cw"></i>
      <i class="i-alert-circle"></i>
      <i class="i-check"></i>
    </div>
    <div class="menu-container">
    <a class="btn" @click="menu=!menu"><i class="icon-ellipsis-v"></i></a>
    <div class="menu" v-if="menu">
      <ul>
        <li>
          <router-link :to="{ name: 'Profile'}"><i class="duotone icon-user"></i><span>User profile</span></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings'}"><i class="duotone icon-equalizer"></i><span>Settings</span></router-link>
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
  </div></div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "NavBar",
  components: {
  },
  data() {
    return {
      sidebarCollapse: false,
      menu: false,
    }
  },
  mounted() {
    const self = this
    document.querySelector(".page-contents").addEventListener("click", () => { self.menu = false })
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
  },
  methods: {
    toggleSidebarCollapse(bool) {
      this.$store.commit('setDynamic', {
        item: 'sidebarCollapse',
        value: bool
      })
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';

.nav {
  display: grid;
  padding: 10px 20px;
  gap: 20px;
  grid-template: auto/auto auto 1fr auto;
  align-items: center;
  position: relative;
  z-index: 400;
  grid-column: 1/3;
  grid-row: 1/2;
  background-color: var(--neutral-10);
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
        background: var(--neutral-7);
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
  min-width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  transition: 200ms ease;
  cursor: pointer;
  gap: 10px;
  padding: 0 calc(2rem / 1.62);

  &:not(.syncing) {

    &:hover {
      background-color: var(--primary);
      color: var(--neutral-1);

      &::before {
        content: 'Refresh now' !important;
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
    }

    i.i-check {
      display: block;
    }
  }

  &.syncing {
    pointer-events: none;

    &::before {
      content: 'Syncing';
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

.sidebar-toggle {
  background-color: var(--neutral-8);
  color: var(--neutral-2);
  display: flex;
  height: 100%;
  min-width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  transition: 200ms ease;
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-6);

  }

  &.true {
    background: var(--secondary);
    color: var(--neutral-10);
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
</style>