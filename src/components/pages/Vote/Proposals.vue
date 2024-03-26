<template lang="">
  <div class="flex-overview">
    <div class="ui-ele">
      <h1>Proposals</h1>
      <p></p>
      <LoadingEle :stop="proposals ? true : false" :long="true" />
      <div class="proposals-ui">
      <Proposal v-for="(proposal, index) of proposals" :key="index" :proposal="proposal"/>
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Proposal from '@/components/modules/Proposal.vue'
import LoadingEle from '@/components/interface/LoadingEle.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Proposals",
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
  },
  components: {
    Proposal,LoadingEle,
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
    }),
    proposals() {
      return (this.snapshot && this.snapshot.proposals) ? this.snapshot.proposals.data.proposals : []
    },
  },
}
</script>
<style lang="scss" scoped>
.ui-ele{
  margin: auto;
}
</style>
<style lang="scss">
  @import '@/assets/scss/_constants.scss';
  @import '@/assets/scss/_vote-ui.scss';


</style>