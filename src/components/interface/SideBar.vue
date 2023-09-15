<template lang="">
  <div :class="!application.sidebarCollapse? 'sidebar open':'sidebar closed'">
    <template v-if="!application.sidebarCollapse">
    <div class="shortcuts">
      <router-link :to="{name:'overview'}" class="shortcut"><i class="duotone icon-dashboard"></i><span>Hashboard</span></router-link>
      <router-link :to="{name:'private-sale'}" class="shortcut"><i class="duotone icon-shield"></i><span>Private Sale</span></router-link>
      <router-link :to="{name:'community-consensus-forum'}" class="shortcut"><i class="duotone icon-field-group"></i><span>Community Consensus Forum</span></router-link>
      <router-link :to="{name:'live-hashrate'}" class="shortcut"><i class="duotone icon-logs"></i><span>Live Hash-rate</span></router-link>
      <router-link :to="{name:'ledger-wallets-holdings'}" class="shortcut"><i class="duotone icon-content"></i><span>Ledger - Wallets and Holdings</span></router-link>
      <router-link :to="{name:'market'}" class="shortcut"><i class="duotone icon-category"></i><span>Market</span></router-link>
      <router-link :to="{name:'network'}" class="shortcut"><i class="duotone icon-workflows"></i><span>Network</span></router-link>
      <router-link :to="{name:'earnings'}" class="shortcut"><i class="duotone icon-table"></i><span>Earnings</span></router-link>
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
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/constants';
.sidebar {
  // height: 100vh;
  position: sticky;
  top: 0;
  z-index: 300;
  overflow-x:hidden;
  overflow-y: auto;
  &.open {
    width: 300px;
    max-width: 90vw;
    background-color: var(--neutral-10);
    box-shadow: 1px 0 0 0 var(--neutral-6);

  }

  .shortcuts {
    display: grid;
    gap: 5px;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
    font-family: $font-family;
    .shortcut {
      display: flex;
      gap: 15px;
      padding:15px 20px;
      margin: 0 15px;
      align-items: center;
      position:relative;
      &.router-link-exact-active{
        color: var(--primary);
        &:after{
          content:"";
          z-index: -1;
          height: 100%;
          width: 100%;
          background: var(--secondary);
          left: 0;
          top: 0;
          opacity: .1;
          position:absolute;
          border-radius: 15px;
        }
        span{
          font-weight: 600;
        }
      }
      &:not(.router-link-exact-active){
      &:hover{
        color: var(--secondary);
      }
    }
      img {
        height: 30px;
        max-width: 30px;
      }
      i{
        font-size: 30px;
      }
    }
  }
}
</style>