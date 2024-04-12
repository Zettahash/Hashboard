<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Voting Spaces</h1>
      <p>Zettahash governance using the Snapshot protocol.</p>
      <LoadingEle :stop="(snapshot && snapshotUser) ? true : false" :long="true" />

      <template v-if="snapshot && snapshotUser">
        <div class="containers-ui">
          <!-- <ProtocolVotingLocations /> -->
          <div v-for="space of snapshot.data.spaces" :key="space.id">
          <router-link :to="{ path: `/vote/${space.id}/details` }" class="container compact link">
            <div class="head">
              <a class="space-id">
                <div class="img-wrapper"><img radius="100"
                    :src="`${space?.avatar.replace(`ipfs://`, `https://snapshot.4everland.link/ipfs/`)}`" /></div>
                <span class="name">{{ space.name }}</span>
                <span class="id">{{ space.id }}</span>
              </a>
              <span @click="followUnfollow(space.id)" :class="`state ${isFollowing(space.id) ? 'following' : ''}`"
                :data-text="isFollowing(space.id) ? 'Joined' : 'Follow'"><i class="i-check" v-if="isFollowing(space.id)"></i></span>

            </div>

            <div class="contents">
              <!-- <a :href="`https://snapshot.org/#/${space.id}`" target="_blank" class="link-to-snapshot">
              <h2>{{ space.name }} on Snapshot <i class="i-external-link"></i></h2>
            </a> -->
            </div>
          </router-link></div>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Client } from '@snapshot-labs/snapshot.js';
import LoadingEle from '@/components/interface/LoadingEle.vue'

// eslint-disable-next-line no-unused-vars
import { BrowserProvider } from 'ethers'
const client = new Client('https://hub.snapshot.org', { relayerURL: 'https://hub.snapshot.org' })
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
    proposals() {
      let arr = {}
      for (const prop of this.snapshot.data.proposals) {
        arr[prop.space.id]=prop
      }
      return arr
    },
  },
  created() {
    this.$store.dispatch('getSnapshotUser', { address: this.web3ModalAccountAddress, store: this.$store });
  },
  async mounted() {
    this.routeLoaded()

  },
  components: {
    LoadingEle,
    // ProtocolVotingLocations,
  },
  methods: {
    proposalsCount(id) {
      let arr = []
      for (const prop of this.snapshot.data.proposals) {
        if(prop.space.id==id){arr.push(prop.space.id)}
      }
      return arr.length
    },
    isFollowing(id) {
      return this.proposals[id]?true:false
    },
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    },
    async followUnfollow(space) {
      let receipt = false
      const walletProvider = this.application.walletConnectModal.getWalletProvider()
      const ethersProvider = new BrowserProvider(walletProvider)
      if (this.following) {
        try {
          receipt = await client.unfollow(ethersProvider, this.wallet, {
            "from": this.wallet,
            "name": space
          });
        } catch (err) {
          this.$store.commit("setNotification", {
            title: "Something went wrong with unfollow",
            className: 'error',
            data: err,
          })
        }
      } else {
        try {
          receipt = await client.follow(ethersProvider, this.wallet, {
            "from": this.wallet,
            "name": space
          });
        } catch (err) {
          this.$store.commit("setNotification", {
            title: "Something went wrong with follow",
            className: 'error',
            data: err,
          })
        }
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