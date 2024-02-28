<template lang="">
  <div :class="`sidebar collapse-${uiSidebarCollapse}`" @scroll="unlabelify">
    <template v-if="uiSidebarCollapse !== 'false'">
    <div class="shortcuts">
      <!-- <router-link :to="{ name: 'lincoin-manager' }" :class="routeClass('hashboard')" @click="dropdownToggle('hashboard')" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-cpu"></i><span>Hashboard</span></router-link>
      <ul v-if="dropdown.hashboard" :class="`dropdown ${dropdown.pool}`" @click="dropdownToggle('pool', 1)" @mouseenter="labelify" @mouseleave="unlabelify">
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
      </ul> -->


      <router-link :to="{ name: 'mining' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-activity"></i><span>Mining</span></router-link>

      <router-link :to="{ name: 'consensus' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-forum"></i><span>Consensus</span></router-link>

      <router-link :class="routeClass('vote')" @click="dropdownToggle('vote')" :to="{ name: 'vote' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-zap"></i><span>Vote</span></router-link>
      <ul v-if="dropdown.vote">
        <li><router-link :to="{ name: 'protocol-proposals' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-bulb"></i><span>Proposals</span></router-link></li>
        <li><router-link :to="{ name: 'protocol-treasury' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-banknote"></i><span>Treasury</span></router-link></li>
        <li><router-link :to="{ name: 'protocol-about' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-info"></i><span>About</span></router-link></li>
      </ul>
      <a :class="routeClass('treasury')" @click="dropdownToggle('treasury')" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-library"></i><span>Treasury</span></a>
      <ul v-if="dropdown.treasury">
        <li><router-link :to="{ name: 'safe' }" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/safe.png')" class="icon" /><span>SAFE</span></router-link></li>
        <li><router-link :to="{ name: 'specter' }" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="require('@/assets/img/providers/specter.png')" class="icon" /><span>Specter</span></router-link></li>
      </ul>
      <router-link :to="{ name: 'assets' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-hard-drive"></i><span>Assets</span></router-link>
      <router-link :to="{ name: 'market' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-trending-up"></i><span>Market</span></router-link>
    </div>
    <div class="shortcuts">
      <label>Management</label>
      <router-link :to="{ name: 'profile' }" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-user"></i><span>Profile #{{hasherName()}}</span></router-link>
      <router-link v-if="wallet" :to="{ name: 'wallet' }" @mouseenter="labelify" @mouseleave="unlabelify"><img :src="profileImg(wallet)" class="wallet-icon" /><span>Wallet - {{walletShortName(wallet)}}</span></router-link>
      <a v-if="wallet && !application.zhHolderBool" @click="doDisconnect()" @mouseenter="labelify" @mouseleave="unlabelify"><i class="i-log-out"></i><span>Disconnect</span></a>
      <a :class="`sync-status ${data.synchronisationStatus}`" @click="$store.dispatch('fetchCombinedDataPayload')" @mouseenter="labelify" @mouseleave="unlabelify">
      <i class="i-refresh-cw"></i>
      <i class="i-alert-circle"></i>
      <i class="i-check"></i>
      <i class="i-alert-triangle"></i>
      <span v-if="!data.synchronisationStatus">Hashboard synced</span>
      <span v-if="data.synchronisationStatus=='syncing'">Syncing...</span>
      <span v-if="data.synchronisationStatus=='error'">Sync errors detected</span>
    </a>
    </div>
    <div class="shortcuts">
      <label>Shortcuts</label>
      <a @mouseenter="labelify" @mouseleave="unlabelify" href="https://zettahash.org"><i class="i-hash"></i><span>Zettahash home</span></a>
    </div>
    </template>

    <div class="version shortcuts">
      <a>{{version[0]}}-beta<span>{{version[1]}}</span></a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName } from '@/utils/forum'
import { walletShortName } from '@/utils/strings'
import { useDisconnect } from '@web3modal/ethers/vue'
const { disconnect } = useDisconnect()
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
        consensus: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      wallet: 'wallet',
      data: 'data',
      
    }),
    uiSidebarCollapse() {
      let stage = 2
      if (window.innerWidth < 700) { stage-- }
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
  watch: {
    $route() {
      if (window.innerWidth < 700) {
        this.$store.commit('setDynamic', {
          item: 'uiSidebarCollapse',
          value: true
        })
      }
    },
  },
  methods: {
    profileImg, hasherName, walletShortName, disconnect,
    doDisconnect() {
      this.$store.commit('setWallet', false)
      disconnect()
    },
    async init() {
    },
    routeClass(parent, depth = 0) {
      let className = 'caret shortcut '
      if (this.$route.meta.breadcrumbs) {
        let breadcrumbs = this.$route.meta.breadcrumbs
        if (breadcrumbs.indexOf(parent) == depth) {
          className += 'active '
          this.dropdown[parent] = true
        }
      }
      if (this.dropdown[parent]) { className += 'dropdown-open' }
      return className
    },
    dropdownToggle(item, depth = 0) {
      if (depth == 0) {
        for (const key of Object.keys(this.dropdown)) {
          if(key != item)
          { this.dropdown[key] = false }
        }
      }
      this.dropdown[item]=!this.dropdown[item]
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
</style>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/sidebar';
.wallet-icon{
  background: var(--neutral-10);
  border-radius: 100px;
}
</style>