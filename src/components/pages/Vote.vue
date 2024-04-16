<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1><img :src="require('@/assets/img/providers/65da72d13d4f02927b3d58bf_snapshot.png')" />Voting Spaces</h1>
      <p>Zettahash governance using the Snapshot protocol.</p>
      <LoadingEle :stop="(snapshot && snapshotUser) ? true : false" :long="true" />
      <template v-if="snapshot && snapshotUser">
        <div class="containers-ui">
          <div v-for="space of snapshot.data.spaces" :key="space.id">
            <router-link :to="{ path: `/vote/${space.id}/details` }" class="container compact link">
              <div class="head">
                <a class="space-id">
                  <div class="img-wrapper"><img radius="100"
                      :src="`${space?.avatar.replace(`ipfs://`, `https://snapshot.4everland.link/ipfs/`)}`" /></div>
                  <span class="name">{{ space.name }}</span>
                  <span class="id">{{ space.id }}</span>
                </a>
                    <SpaceFollowUnfollow :spaceId="space.id"/>
              </div>
              <div class="contents">
              </div>
            </router-link>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SpaceFollowUnfollow from "@/components/modules/SpaceFollowUnfollow"
import LoadingEle from '@/components/interface/LoadingEle.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Vote',
  data() {
    return {
      loading: {},
    }
  },
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
        arr[prop.space.id] = prop
      }
      return arr
    },
  },
  created() {
    this.$store.dispatch('getSnapshotUser', { address: this.wallet, store: this.$store });
  },
  async mounted() {
    this.routeLoaded()

  },
  components: {
    LoadingEle,SpaceFollowUnfollow,
    // ProtocolVotingLocations,
  },
  methods: {
    proposalsCount(id) {
      let arr = []
      for (const prop of this.snapshot.data.proposals) {
        if (prop.space.id == id) { arr.push(prop.space.id) }
      }
      return arr.length
    },
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
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
      &[data-text="Follow"]{
        background: var(--neutral-6) !important;
      }
      &[data-text="Joined"]{
        background: var(--neutral-10) !important;
      }
      &::after {
        content: attr(data-text);
      }

      i,.tick {
        color: var(--moss);
        line-height: 1;
        margin-right: 5px;
      }

      &:hover {
        background: var(--primary) !important;
      }

      &.following {
        &:not(.loading)
       { &:hover {
          box-shadow: 0 0 0 1px var(--crimson);
          background: transparent !important;
          color: var(--crimson);

          i,.tick {
            display: none;
          }

          &::after {
            content: 'Leave';
            color: var(--crimson);
          }
        }
      }}
    }
  }
}
.spinner{&::after {
  border-left-color: var(--secondary);
  border-top-color: var(--secondary);
  border-right-color: var(--secondary);
  border-bottom-color: transparent;
  }
}
</style>