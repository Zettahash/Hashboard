<template lang="">
  <div :class="`sidebar collapse-${uiSidebarCollapse}`" @scroll="unlabelify">
    <template v-if="uiSidebarCollapse !== 'false'">
    <div class="shortcuts">
      <router-link :to="{ name: 'lincoin-manager' }" :class="routeClass('hashboard')" @click="dropdown.hashboard = !dropdown.hashboard" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-cpu"></i><span>Hashboard</span></router-link>
      <ul v-if="dropdown.hashboard" :class="`dropdown ${dropdown.pool}`" @click="dropdown.pool=!dropdown.pool" @mouseenter="labelify" @mouseleave="unlabelify">
        <li data-for="lincoin" :data-active="activeFarm('lincoin')">
          <router-link :to="{ name: 'lincoin-manager' }" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/lincoin.png')" class="icon" /><span>Lincoin</span></router-link>
        </li>
        <li data-for="ocean" :data-active="activeFarm('ocean')">
          <router-link :to="{ name: 'ocean-manager' }" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/ocean.png')" class="icon" /><span>Ocean</span></router-link>
        </li>
      </ul>
      <ul v-if="dropdown.hashboard && application.activeFarm=='lincoin'">
        <li><router-link :to="{ name: 'lincoin-manager' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-grid"></i><span>Manager</span></router-link></li>
        <li><router-link :to="{ name: 'lincoin-accountant' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-book"></i><span>Accountant</span></router-link></li>
      </ul>
      <router-link :to="{ name: 'consensus' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-users"></i><span>Consensus</span></router-link>
      <router-link :class="routeClass('vote')" @click="dropdown.vote = !dropdown.vote" :to="{ name: 'vote' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-zap"></i><span>Vote</span></router-link>
      <ul v-if="dropdown.vote">
        <li><router-link :to="{ name: 'protocol-proposals' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-crosshair"></i><span>Proposals</span></router-link></li>
        <li><router-link :to="{ name: 'protocol-treasury' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-dollar-sign"></i><span>Treasury</span></router-link></li>
        <li><router-link :to="{ name: 'protocol-about' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-info"></i><span>About</span></router-link></li>
      </ul>
      <a :class="routeClass('treasury')" @click="dropdown.treasury = !dropdown.treasury" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-shield"></i><span>Treasury</span></a>
      <ul v-if="dropdown.treasury">
        <li><router-link :to="{ name: 'safe' }" :class="routeClass('safe')" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/safe.png')" class="icon" /><span>SAFE</span></router-link></li>
        <li><router-link :to="{ name: 'specter' }" :class="routeClass('specter')" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/specter.png')" class="icon" /><span>Specter</span></router-link></li>
      </ul>
      <router-link :to="{ name: 'assets' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-hard-drive"></i><span>Assets</span></router-link>
      <router-link :to="{ name: 'market' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-trending-up"></i><span>Market</span></router-link>
    </div>
    <div class="shortcuts">
      <label>Shortcuts</label>
      <a @mouseenter="labelify" @mouseleave="unlabelify" href="https://zettahash.org"><i class="i-hash"></i><span>Zettahash home</span></a>
    </div>
    </template>

    <div class="version shortcuts">
      <a>{{version[0]}}<span>{{version[1]}}</span></a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "SideBar",
  components: {
  },
  data() {
    return {
      checkConnectionInterval: false,
      network: false,
      dropdown:
      {
        hashboard: false,
        treasury: false,
        vote: false,
        pool: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
    uiSidebarCollapse() {
      let stage = 2
      if (window.outerWidth < 700) { stage-- }
      if (this.application.uiSidebarCollapse) { stage-- }
      return stage == 0 ? false : stage
    },
    version() {
      if (this.application.version) {
        let arr = []
        arr.push(String(this.application.version).split("-")[0])
        arr.push(String(this.application.version).split(arr[0])[1])
        return arr
      }
      return []
    },
  },
  mounted() {
    this.init()
    window.addEventListener("scroll", this.unlabelify)
  },
  methods: {
    async init() {
    },
    routeClass(parent, depth = 0) {
      let className = 'shortcut '
      if (this.$route.meta.breadcrumbs) {
        let breadcrumbs = this.$route.meta.breadcrumbs
        if (breadcrumbs.indexOf(parent) == depth) {
          className += 'active '
          this.dropdown[parent] = true
        }
      }
      return className
    },
    getIcon(str) {
      let token = str.toLowerCase()
      let dir = '@/assets/img/providers'
      console.log(`${dir}/${token}.png`)
      try {
        return require(`${dir}/${token}.png`)
      } catch (e) { console.log(e) }
      try {
        return require(`${dir}/${token}.svg`)
      } catch (e) { console.log(e) }
      try {
        let tokenAlpha = token.replace(/-/g, '')
        return require(`${dir}/${tokenAlpha}.png`)
      } catch (e) { console.log(e) }
    },
    labelify(event) {
      let label = event.target.querySelector('span').innerHTML
      this.unlabelify()
      if (document.querySelector('.sidebar').classList.contains("collapse-1")) {
        let temp = document.createElement("div")
        temp.classList.add('temp-label-sidebar')
        temp.setAttribute('style', `transform:translate(${event.clientX}px, ${event.clientY}px)`)
        temp.innerHTML = label
        document.body.append(temp)
      }
    },
    unlabelify() {
      if (document.querySelector(".temp-label-sidebar")) { document.querySelector(".temp-label-sidebar").remove() }
    },
    activeFarm(pool) {
      return pool === this.application.activeFarm
    },
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';

.temp-label-sidebar {
  position: absolute;
  top: 0;
  left: calc(1rem + 5px);
  z-index: 301;
  background: var(--neutral-10);
  box-shadow: 0 0 0 1px var(--neutral-6);
  padding: 2px 5px;
  border-radius: 3px;
}

.sidebar {
  // height: 100vh;
  padding-top: 20px;
  position: sticky;
  top: 0;
  z-index: 300;
  overflow-x: hidden;
  overflow-y: auto;
  width: 0px;
  transition: 400ms ease;
  display: flex;
  flex-direction: column;

  &:not(.collapse-false) {
    width: $sidebar;
    max-width: 90vw;
    background-color: var(--neutral-9);
    box-shadow: 1px 0 0 0 var(--neutral-6);
  }

  &.collapse-1 {
    width: 70px;
    padding-top: 60px;

    .shortcuts {
      justify-content: center;

      label {
        height: 0px;
        width: 50%;
        overflow: hidden;
        padding: 0;
        margin: 0 auto;
        box-shadow: 0 0 0 .5px var(--neutral-6);
        display: block;
        line-height: 2;
      }

      .shortcut,
      a {
        padding: 0;
        justify-content: center;

        span {
          display: none;
        }
      }
    }

    ul {
      padding-left: 0;
    }
  }

  &.collapse-2 {

    ul {
      &::after {
        opacity: 0.1 !important;
        transform: translate(calc((-50% - 6px) + 2rem), calc(-50% - 6px)) !important;
        width: calc((100% + 12px) - 2rem) !important;
      }
    }
  }

  .shortcuts {
    display: grid;
    gap: 25px;
    justify-content: start;
    align-items: center;
    padding: 15px 0px;
    font-family: $sans-serif;
    font-size: 16px;

    &.version {
      flex-grow: 1;
      align-content: end;

      .shortcut,
      a {
        gap: 0;
        color: var(--neutral-5);
        font-size: .8rem;
      }
    }

    label {
      text-transform: uppercase;
      font-weight: 900;
      font-size: .8rem;
      color: var(--neutral-4);
      padding: 24px 20px 0px 20px;
      margin: 0 15px;
    }

    ul {
      list-style: none;
      margin-top: 0;
      position: relative;

      &.dropdown {
        margin-bottom: -10px;

        &.false {
          &::before {
            font-family: "ico" !important;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -moz-osx-font-smoothing: grayscale;
            content: "\e92e";
            position: absolute;
            color: var(--neutral-0);
            z-index: 2;
            right: -4px;
          }
          [data-active="true"] {
            pointer-events:none;
          }
          [data-active="false"] {
            display: none;
          }
        }
      }

      &::after {
        content: '';
        position: absolute;
        height: calc(100% + 12px);
        width: calc(100% + 12px);
        background: var(--primary);
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 6px));
        z-index: -1;
        opacity: .2;
        border-radius: 5px;
      }

      li {
        padding-bottom: 12px;
      }
    }

    .shortcut,
    a {
      display: flex;
      gap: 10px;
      padding: 0px 20px;
      margin: 0 15px;
      align-items: center;
      position: relative;
      font-weight: 400;
      cursor: pointer;

      &.router-link-exact-active,
      &.active {
        color: var(--primary);

        // &:after {
        //   content: "";
        //   z-index: -1;
        //   height: 100%;
        //   width: 100%;
        //   background: var(--secondary);
        //   left: 0;
        //   top: 0;
        //   opacity: .1;
        //   position: absolute;
        //   border-radius: 15px;
        // }

        span {
          // font-weight: 800;
        }

        i {
          svg {
            path {
              fill: var(--primary);
            }
          }
        }

      }

      &:not(.router-link-exact-active),
      &:not(.active) {
        &:hover {
          color: var(--secondary);

          i {
            svg {
              path {
                fill: var(--secondary);
              }
            }
          }

        }
      }

      --icon-size: 18px;

      img {
        height: var(--icon-size);
        max-width: var(--icon-size);
      }

      i {
        font-size: var(--icon-size);

        svg {
          height: var(--icon-size);
          width: var(--icon-size);
          margin: auto;
          display: block;

          path {
            fill: var(--neutral-0);
          }
        }
      }
    }
  }
}
</style>