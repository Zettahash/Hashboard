<template lang="">
  <div :class="`sidebar collapse-${uiSidebarCollapse}`">
    <template v-if="uiSidebarCollapse!=='false'">
    <div class="shortcuts">
      <router-link :to="{name:'manager'}" :class="routeClass('hashboard')" @click="dropdown.hashboard=!dropdown.hashboard"><i class="i-cpu"></i><span>Hashboard</span></router-link>
      <ul v-if="dropdown.hashboard">
        <li><router-link :to="{name:'manager'}" class="shortcut"><i class="i-grid"></i><span>Manager</span></router-link></li>
        <li><router-link :to="{name:'accountant'}" class="shortcut"><i class="i-book"></i><span>Accountant</span></router-link></li>
      </ul>
      <!-- <router-link :to="{name:'private-sale'}" class="shortcut"><i class="i-tag"></i><span>Private Sales</span></router-link> -->
      <router-link :to="{name:'consensus'}" class="shortcut"><i class="i-users"></i><span>Consensus</span></router-link>
      <router-link :class="routeClass('vote')" @click="dropdown.vote=!dropdown.vote" :to="{name:'vote'}" class="shortcut"><i class="i-zap"></i><span>Vote</span></router-link>
      <ul v-if="dropdown.vote">
        <li><router-link :to="{name:'protocol-proposals'}" class="shortcut"><i class="i-crosshair"></i><span>Proposals</span></router-link></li>
        <li><router-link :to="{name:'protocol-treasury'}" class="shortcut"><i class="i-dollar-sign"></i><span>Treasury</span></router-link></li>
        <li><router-link :to="{name:'protocol-about'}" class="shortcut"><i class="i-info"></i><span>About</span></router-link></li>
      </ul>
      <!-- <router-link :to="{name:'ledger-wallets-holdings'}" class="shortcut"><i class="i-file-text"></i><span>Ledger</span></router-link> -->
      <!-- <router-link :to="{name:'treasury'}" class="shortcut"><i class="i-shield"></i><span>Treasury</span></router-link> -->
      <a :class="routeClass('treasury')" @click="dropdown.treasury=!dropdown.treasury"><i class="i-shield"></i><span>Treasury</span></a>
      <ul v-if="dropdown.treasury">
        <li><router-link :to="{name:'safe'}" :class="routeClass('safe')"><img :src="require('@/assets/img/providers/safe.png')" class="icon" /><span>SAFE</span></router-link></li>
        <li><router-link :to="{name:'specter'}" :class="routeClass('specter')"><img :src="require('@/assets/img/providers/specter.png')" class="icon" /><span>Specter</span></router-link></li>
      </ul>
      <!-- <router-link :to="{name:'holdings'}" class="shortcut"><i class="i-pie-chart"></i><span>Ledger</span></router-link> -->
      <router-link :to="{name:'assets'}" class="shortcut"><i class="i-hard-drive"></i><span>Assets</span></router-link>
      <router-link :to="{name:'market'}" class="shortcut"><i class="i-trending-up"></i><span>Market</span></router-link>
    </div>
    <div class="shortcuts">
      <label>Shortcuts</label>
      <a class="shortcut" href="https://zettahash.org"><i class="i-hash"></i><span>Zettahash home</span></a>
    </div>
    </template>
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
        safe: false,
        vote:false,
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
  },
  mounted() {
    this.init()
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
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';

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

  &:not(.collapse-false) {
    width: 300px;
    max-width: 90vw;
    background-color: var(--neutral-10);
    box-shadow: 1px 0 0 0 var(--neutral-6);
  }

  &.collapse-1 {
    width: 70px;
    padding-top: 60px;
    .shortcuts {
      justify-content: center;

      label {
        display: none;
      }

      .shortcut {
        padding: 0;

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

    .shortcut {
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