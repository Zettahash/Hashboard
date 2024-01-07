<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Vote</h1>
      <p>Zettahash governance using the Snapshot protocol.</p>
      <div class="containers-ui">
        <!-- <ProtocolVotingLocations /> -->
        <div class="container compact">
          <div class="head">
            <router-link :to="{ name: 'protocol-about' }" class="space-id">
              <ipfs-image radius="100" width="40" height="40" :src="`${space.avatar}`" />
              <span class="name">{{ space.name }}</span>
              <span class="id">{{ space.id }}</span>
            </router-link>
            <span @click="followUnfollow(space.id)" :class="`state ${following ? 'following' : ''}`"
              :data-text="following ? 'Joined' : 'Follow'"><i class="i-check" v-if="following"></i></span>

          </div>

          <div class="contents">
            <!-- <a :href="`https://snapshot.org/#/${space.id}`" target="_blank" class="link-to-snapshot">
              <h2>{{ space.name }} on Snapshot <i class="i-external-link"></i></h2>
            </a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ProtocolVotingLocations from './../tiles/ProtocolVotingLocations.vue'
import { mapGetters } from 'vuex';
import { Web3Provider } from '@ethersproject/providers';
import snapshot from '@snapshot-labs/snapshot.js';
// import {space, proposals} from "@/components/data/graphQL"
// import snapshot from '@snapshot-labs/snapshot.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Vote',
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
      snapshotUser: 'snapshotUser',
      wallet: 'wallet',
    }),
    space() {
      return (this.snapshot && this.snapshot.space) ? this.snapshot.space.data.space : []
    },
    following() {
      let follow = false
      let wallet = this.wallet.toLowerCase()
      if (this.snapshotUser) {
        for (const item of this.snapshotUser.user.data.follows) {
          let follower = item.follower.toLowerCase()
          if (follower === wallet && item.space.id === this.space.id) {
            follow = item
            break
          }
        }
      }
      return follow
    },
  },
  async mounted() {
    this.routeLoaded()
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
    },
    async followUnfollow(space) {
      const hub = 'https://hub.snapshot.org'; // or https://testnet.hub.snapshot.org for testnet
      const client = new snapshot.Client712(hub);
      const web3 = new Web3Provider(window.ethereum);
      const [account] = await web3.listAccounts();
      let receipt = false

      if (this.following) {
        receipt = await client.unfollow(web3, account, {
          "name": space ? space : "zettahash.eth"
        });
      } else {
        receipt = await client.follow(web3, account, {
          "name": space ? space : "zettahash.eth"
        });
      }
      console.log(receipt)
    },
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
        box-shadow: 0 0 0 1px var(--crimson);
        background: transparent;
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
</style>