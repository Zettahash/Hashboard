<template lang="">
  <div :class="!application.sidebarCollapse? 'sidebar open':'sidebar closed'">
    <template v-if="!application.sidebarCollapse">
    <div class="shortcuts">
      <router-link :to="{name:'overview'}" class="shortcut"><i><svg width="100%" height="100%" viewBox="0 0 1351 1351" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="Artboard2" x="0" y="0" width="1350.63" height="1350.63" style="fill:none;"/><g><path d="M479.007,835.254l-88.105,419.213l-142.19,-0l58.726,-279.426l-285.528,1.057l28.729,-139.257l428.368,-1.587Zm467.937,-1.733l-88.469,420.946l-142.19,-0l59.09,-281.159l-262.968,0.974l29.268,-139.26l405.269,-1.501Zm63.215,-0.234l-29.268,139.259l224.623,-0.831l28.73,-139.258l-224.085,0.83Zm-434.909,-455.969l-96.243,457.936l-142.301,0.527l66.975,-318.676l-287.299,1.064l28.729,-139.258l430.139,-1.593Zm384.473,-281.159l142.19,-0l-154.969,737.362l-142.301,0.527l155.08,-737.889Zm-328.277,280.951l-29.268,139.259l269.44,-0.997l29.268,-139.26l-269.44,0.998Zm468.484,-1.735l-29.268,139.259l229.324,-0.849l28.73,-139.258l-228.786,0.848Zm-524.68,1.943l-142.301,0.527l59.201,-281.686l142.19,-0l-59.09,281.159Z" style="fill-opacity:0.4;"/><path d="M545.982,516.578l-142.301,0.527l29.268,-139.26l142.301,-0.527l-29.268,139.26Z" style=""/><path d="M1013.92,514.844l-142.301,0.528l29.268,-139.26l142.301,-0.527l-29.268,139.259Z" style=""/><path d="M449.739,974.514l-142.301,0.527l29.268,-139.26l142.301,-0.527l-29.268,139.26Z" style=""/><path d="M917.676,972.781l-142.301,0.527l29.268,-139.26l142.301,-0.527l-29.268,139.26Z" style=""/></g></svg></i><span>Hashboard</span></router-link>
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
  overflow-x: hidden;
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
      padding: 15px 20px;
      margin: 0 15px;
      align-items: center;
      position: relative;

      &.router-link-exact-active {
        color: var(--primary);

        &:after {
          content: "";
          z-index: -1;
          height: 100%;
          width: 100%;
          background: var(--secondary);
          left: 0;
          top: 0;
          opacity: .1;
          position: absolute;
          border-radius: 15px;
        }

        span {
          font-weight: 600;
        }

        i {
          svg {
            path {
              fill: var(--primary);
            }
          }
        }

      }

      &:not(.router-link-exact-active) {
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

      img {
        height: 30px;
        max-width: 30px;
      }

      i {
        font-size: 30px;

        svg {
          height: 30px;
          width: 30px;
          margin: auto;
          display: block;

          path {
            fill: var(--neutral-0);
          }
        }
      }
    }
  }
}</style>