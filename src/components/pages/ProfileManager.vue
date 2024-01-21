<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <div class="head-organiser">
    <h1>Hi,</h1>
    <div class="hasher-name-organiser">
    <img :src="profileImg()" class="wallet-logo" />
    <h2>Hasher #{{hasherName()}}</h2>
    </div>
    </div>

      <p>Your profile is your Ethereum wallet. Manage how your details appear on this app.</p>
      <div class="containers-ui">
        <!-- <ProtocolVotingLocations /> -->
        <div class="container compact">
          <div class="head">
           </div>

          <div class="contents">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName} from '@/utils/forum'
// eslint-disable-next-line no-unused-vars
import { BrowserProvider, formatUnits, Contract, EnsResolver } from 'ethers'


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ProfileManager',
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
      snapshotUser: 'snapshotUser',
      wallet: 'wallet',
      forumProfile: 'forumProfile',
    }),
  },
  async mounted() {
    this.routeLoaded()
    const walletProvider = this.application.walletConnectModal.getWalletProvider()
    const ethersProvider = new BrowserProvider(walletProvider)
    let result = await ethersProvider.lookupAddress('0xa908d4AB22c4BfEe98957A575FE93549D917d1BB')
      console.log(result)
  },
  components: {
    // ProtocolVotingLocations,
  },
  methods: {
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    },profileImg, hasherName,
  }
}
</script>
<style lang="scss" scoped>
.container {
  .head {
    .state {
      margin-bottom: unset !important;
      background: var(--neutral-10) !important;
      padding: 10px 20px !important;
      display: flex;
      align-items: center;
      width: 140px;
      justify-content: center;
      cursor: pointer;

      &::after {
        content: attr(data-text);
      }

      i {
        color: var(--moss);
        line-height: 1;
        margin-right: 5px;
      }

      &:hover {
        background: var(--primary) !important;
      }

      &.following {
        &:hover {
          box-shadow: 0 0 0 1px var(--crimson);
          background: transparent !important;
          color: var(--crimson);

          i {
            display: none;
          }

          &::after {
            content: 'Leave';
            color: var(--crimson);
          }
        }
      }
    }
  }
}
</style>