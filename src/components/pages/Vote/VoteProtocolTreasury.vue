<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Treasury</h1>
      <p>The snapshot protocol treasury accounts are displayed below.<br>You may also be interested in the department-itemised <router-link :to="{ name: 'safe' }" class="link">Zettahash DAO Treasury</router-link></p>
      <div class="containers-ui">
        <div class="list">
          <h2>Wallets</h2>
          <ul>
            <li v-for="(member, index) of members" :key="index">
              <div class="avatar-wrapper">
                <img :src="`https://cdn.stamp.fyi/avatar/${member.address}`">
              </div>
              <div class="address-truncated">
                <a :href="`https://snapshot.org/#/profile/${member.address}`" target="_blank">{{
                  member.name }} <i class="i-external-link"></i></a>
                <small>{{ member.address }}</small>
              </div>
                <span class="role"></span>
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
  name: "VoteProtocolTreasury",
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
      return this.space.treasuries
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
@import 'src/assets/scss/_constants.scss';
@import 'src/assets/scss/_vote-ui.scss';
</style>