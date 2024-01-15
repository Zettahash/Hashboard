<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>About</h1>
      <p></p>
      <div class="containers-ui">
        <div class="container">
          <div class="head">
            <router-link :to="{ name: 'protocol-about' }" class="space-id">
              <div class="img-wrapper"><img radius="100" :src="`${space.avatar.replace(`ipfs://`, `https://snapshot.4everland.link/ipfs/`)}`" /></div>
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
              <a class="address-truncated" :href="`https://snapshot.org/#/profile/${member.address}`" target="_blank"><span>{{
                member.addressTruncated }} <i class="i-external-link"></i></span></a>
              <span class="role">{{ member.role }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
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
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
      wallet: 'wallet',
    }),
    space() {
      return (this.snapshot && this.snapshot.space) ? this.snapshot.space.data.space : []
    },
    members() {
      let arr = []
      for (const i of this.space.members) {
        let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
        arr.push({ role: 'Member', address: i, addressTruncated: address })
      }
      for (const i of this.space.admins) {
        let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
        arr.push({ role: 'Admin', address: i, addressTruncated: address })
      }
      for (const i of this.space.moderators) {
        let address = i.toLowerCase() === this.wallet.toLowerCase() ? 'You' : `${i.substr(0, 6)}...${i.substr(i.length - 6)}`
        arr.push({ role: 'Moderators', address: i, addressTruncated: address })
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
<style lang="scss">@import '@/assets/scss/_constants.scss';
@import '@/assets/scss/_vote-ui.scss';</style>