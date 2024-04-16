<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <router-link :to="{ name: 'vote' }" class="btn-link neutral subtle"><i class="i-arrow-left"></i>
        Back</router-link>
      <h1><i class="i-zap"></i> {{ space ? `${space.name} Space` : 'Details' }}</h1>
      <p></p>
      <LoadingEle :stop="(snapshot && space) ? true : false" :long="true" />
      <div class="containers-ui flex" v-if="snapshot && space">
        <div class="container">
          <div class="head">
            <router-link :to="{ name: 'protocol-about' }" class="space-id">
              <div class="img-wrapper"><img radius="100"
                  :src="`${space.avatar ? space.avatar.replace(`ipfs://`, `https://snapshot.4everland.link/ipfs/`) : ''}`" />
              </div>
              <span class="name">{{ space.name }}</span>
              <span class="id">{{ space.id }}</span>
            </router-link>
            <span class="state">{{ space.followersCount }} followers</span>
          </div>
          <div class="contents">
            <a :href="`https://snapshot.org/#/${space.id}`" target="_blank" class="link-to-snapshot">
              <h2>{{ space.name }} on Snapshot <i class="i-external-link"></i></h2>
            </a>

            <div class="container-body expanded">
              <p>{{ space.about }}</p>
              <div>
                <br>
                <h4>Terms of service</h4><a href="https://zettahash.org/organization/#terms-of-service" target="_blank">
                  <div>https://zettahash.org/organization/#term... <i class="i-external-link"></i></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h2>Members</h2>
          <ul>
            <li v-for="(member, index) of members" :key="index">
              <div class="avatar-wrapper">
                <img :src="`https://cdn.stamp.fyi/avatar/${member.address}`">
              </div>
              <a class="address-truncated" :href="`https://snapshot.org/#/profile/${member.address}`"
                target="_blank"><span>{{
                  member.addressTruncated }} <i class="i-external-link"></i></span></a>
              <span class="role">{{ member.role }}</span>
            </li>
          </ul>
        </div>
      </div>
      <h1><br><i class="i-bulb"></i>{{ proposals.length>0?``:`No ` }} Proposals</h1>
      <div class="containers-ui" v-if="proposals">
        <Proposal v-for="(proposal, index) of proposals" :key="index" :proposal="proposal" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoadingEle from '@/components/interface/LoadingEle.vue'
import Proposal from '@/components/modules/Proposal.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AboutVoteProtocol",
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
  },
  components: {
    LoadingEle, Proposal,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
      wallet: 'wallet',
    }),
    proposals() {
      let arr = []
      for (const prop of this.snapshot.data.proposals) {
        if(prop.space.id==this.$route.params.spaceId)
        {arr.push(prop)}
      }
      return arr
    },
    spaces() {
      let arr = {}
      for (const prop of this.snapshot.data.spaces) {
        arr[prop.id] = prop
      }
      return arr
    },
    space() {
      return this.spaces[this.$route.params.spaceId]
    },
    members() {
      let arr = []
      if (this.space.members) {
        for (const i of this.space.members) {
          let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
          arr.push({ role: 'Member', address: i, addressTruncated: address })
        }
      }
      if (this.space.admins) {
        for (const i of this.space.admins) {
          let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
          arr.push({ role: 'Admin', address: i, addressTruncated: address })
        }
      }
      if (this.space.moderators) {
        for (const i of this.space.moderators) {
          let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
          arr.push({ role: 'Moderators', address: i, addressTruncated: address })
        }
      }
      return arr
    },
  },
}
</script>
<style lang="scss" scoped>
.ui-ele {
  margin: auto;
}
</style>
<style lang="scss">
@import '@/assets/scss/_constants.scss';
@import '@/assets/scss/_vote-ui.scss';
</style>