<template lang="html">
  <div v-if="snapshot && snapshotUser" @click.stop.prevent="followUnfollow(spaceId)"
    :class="`state ${isFollowing(spaceId) ? (loading[spaceId] ? `following loading` : 'following') : ''}`" :data-text="isFollowing(spaceId)
        ? loading[spaceId]
          ? ''
          : 'Joined'
        : loading[spaceId]
          ? ''
          : 'Follow'
      ">
    <b-icon-check-circle-fill class="tick" v-if="isFollowing(spaceId)" />
    <i class="spinner" v-if="loading[spaceId]"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Client712 } from '@snapshot-labs/snapshot.js';
import { providers } from 'ethers'
const client = new Client712('https://hub.snapshot.org', { relayerURL: 'https://hub.snapshot.org' })
export default {
  name: "SpaceFollowUnfollow",
  data() {
    return {
      loading: {},
    }
  },
  props: {
    spaceId: String,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      snapshot: 'snapshot',
      snapshotUser: 'snapshotUser',
      wallet: 'wallet',
    }),
    proposals() {
      let arr = {}
      for (const prop of this.snapshot.data.proposals) {
        arr[prop.space.id] = prop
      }
      return arr
    },
    spacesFollowing() {
      let arr = {}
      for (const prop of this.snapshotUser.user.data.follows) {
        arr[prop.space.id] = prop
      }
      return arr
    },
  },
  methods: {
    isFollowing(id) {
      return this.spacesFollowing[id] ? true : false
    },
    async followUnfollow(space) {
      let receipt = false
      const walletProvider = this.application.walletConnectModal.getWalletProvider()
      const provider = new providers.Web3Provider(walletProvider)
      const account = this.wallet//await provider.listAccounts()
      this.loading[space] = true
      if (this.isFollowing(space)) {
        try {
          receipt = await client.unfollow(provider, account, {
            from: account,
            space: space,
          });
        } catch (err) {
          this.$store.commit("setNotification", {
            title: "Unable to unfollow " + space,
            className: 'error',
            data: err,
          })
          this.loading[space] = false
        }
      } else {
        try {
          receipt = await client.follow(provider, account, {
            // "from": this.wallet,
            from: account,
            space: space,
          });
        } catch (err) {
          this.$store.commit("setNotification", {
            title: "Unable to follow " + space,
            className: 'error',
            data: err,
          })
          this.loading[space] = false
        }
      }
      if (receipt) {
        this.$store.dispatch('getSnapshotUser', { address: this.wallet, store: this.$store });
        this.loading[space] = false
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.state {
  margin-bottom: unset !important;
  background: var(--neutral-10) !important;
  padding: 10px 20px !important;
  display: flex;
  align-items: center;
  width: 140px;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
  font-size: 18px;
  font-weight: 400;
  border-radius: 100px;

  &[data-text="Follow"] {
    background: var(--neutral-6) !important;
  }

  &[data-text="Joined"] {
    background: var(--neutral-10) !important;
  }

  &::after {
    content: attr(data-text);
  }

  i,
  .tick {
    color: var(--moss);
    line-height: 1;
    margin-right: 5px;
  }

  &:hover {
    background: var(--primary) !important;
  }

  &.following {
    &:not(.loading) {
      &:hover {
        box-shadow: 0 0 0 1px var(--crimson);
        background: transparent !important;
        color: var(--crimson);

        i,
        .tick {
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

.spinner {
  &::after {
    border-left-color: var(--secondary);
    border-top-color: var(--secondary);
    border-right-color: var(--secondary);
    border-bottom-color: transparent;
  }
}
</style>