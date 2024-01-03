<template lang="">
  <div :class="!application.uiSidebarCollapse? 'sidebar open':'sidebar closed'">
    <template v-if="!application.uiSidebarCollapse">
    <div class="shortcuts">
      <a :class="routeClass('hashboard')" @click="dropdown.hashboard=!dropdown.hashboard"><i class="i-cpu"></i><span>Hashboard</span></a>
      <ul v-if="dropdown.hashboard">
        <li><router-link :to="{name:'manager'}" class="shortcut">Manager</router-link></li>
        <li><router-link :to="{name:'accountant'}" class="shortcut">Accountant</router-link></li>
      </ul>
      <!-- <router-link :to="{name:'private-sale'}" class="shortcut"><i class="i-tag"></i><span>Private Sales</span></router-link> -->
      <router-link :to="{name:'consensus'}" class="shortcut"><i class="i-users"></i><span>Consensus</span></router-link>
      <router-link :to="{name:'mining'}" class="shortcut"><i class="i-zap"></i><span>Mining</span></router-link>
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
      },
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
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

  &.open {
    width: 300px;
    max-width: 90vw;
    background-color: var(--neutral-10);
    box-shadow: 1px 0 0 0 var(--neutral-6);

  }

  .shortcuts {
    display: grid;
    gap: 5px;
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
    }

    .shortcut {
      display: flex;
      gap: 10px;
      padding: 12px 20px;
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