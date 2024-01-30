<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <div class="head-organiser">
        <h1>Hi,</h1>
        <div class="hasher-name-organiser">
          <img :src="profileImg()" class="wallet-logo" />
          <h2>Hasher #{{ hasherName() }}</h2>
        </div>
      </div>

      <p>Your profile is your Ethereum wallet.</p>
      <div class="containers-ui">
        <!-- <ProtocolVotingLocations /> -->
        <div class="container compact" v-if="ens.name">
          <div class="head">
            ENS
          </div>

          <div class="contents">
            <p>We found the following name associated with your address:<br>
              <b>{{ ens.name }}</b>
            </p>
            <div class="break"></div>
          </div>
          <div class="head"><span>Use <b>{{ ens.name }}</b> instead of #{{ hasherName() }}, as your display name.<br><small class="notice"><i class="i-alert-triangle"></i> Your Consensus profile will still display "{{ hasherName() }}" while we work on this feature.</small></span>
            <a @click="toggleUseENS()"><i :class="`switch-indicator ${(ensEnabled ? 'on' : 'off')}`"></i></a>
          </div>
        </div>
        <div class="container compact" v-else>
          <div class="head">
            <span><i class="i-alert-circle"></i> ENS options not available for your address.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName, setProfile } from '@/utils/forum'
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
      ens: 'ens',
    }),
    ensEnabled() {
      if (!this.forumProfile) { return false }
      if (String(this.forumProfile.data).indexOf('noens') >= 0) { return false }
      return this.forumProfile.ens === this.ens.name
    },
  },
  async mounted() {
    this.routeLoaded()
    const walletProvider = this.application.walletConnectModal.getWalletProvider()
    const ethersProvider = new BrowserProvider(walletProvider)
    let ensName = await ethersProvider.lookupAddress(this.wallet)
    if (ensName) {
      this.$store.commit("setENS", { name: ensName })

      const resolver = await ethersProvider.getResolver(ensName)
      const avatar = await resolver.getAvatar()
      const avatarMetaData = await resolver.getText(avatar)
      console.log(`Avatar Metadata: ${avatarMetaData}`)
    }
  },
  components: {
    // ProtocolVotingLocations,
  },
  methods: {
    setProfile,
    toggleUseENS() {
      let ens = this.ensEnabled ? 'noens' : 'ens'
      this.setProfile(ens)
    },
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    }, profileImg, hasherName,
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  gap: 10px;

  .head {
    align-items: center;

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

  .break {
    height: 1px;
    width: 100%;
    display: block;
    background: var(--neutral-6);
    margin-bottom: 10px;
  }
  p{line-height: 1.6;}
  small{
    &.notice{
      color: var(--neutral-4);
    }
  }
}</style>