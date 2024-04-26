<template lang="">
  <div>
      <a v-for="(item, index) of zhVoting" target="_blank" class="block ui-ele asset-complicated tile" :key="index" :title="item.title" :href="item.url">
        <div class="head">

        <div class="product-icon">
          <img :src="getIcon(item.img)">
        </div>
        <div class="type"><span>{{item.title}}</span> <span class="badge">{{item.type}}</span></div>
        <div class="title">Zettahash Governance on {{item.title}} <i class="i-external-link"></i></div>


        </div>
      </a>
  </div>
</template>
<script>
import { getIcon } from '@/utils/general'
import { mapGetters } from 'vuex';
export default {
  name: 'ProtocolVotingLocations',
  data() {
    return {
      zhVoting: [
        {
          title: 'Snapshot',
          url: 'https://snapshot.org/#/zettahash.eth',
          img: 'providers/snapshot',
          type:'Voting platform'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
  },
  methods: {
    getIcon,
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
.product-icon {
  grid-row: 1/3;

  img {
    height: 50px;
    // opacity: .5;
    border-radius: $radius3;
  }
}

.graph {
  max-width: 300px;
  margin-left: auto;
}

.data {
  display: grid;

  &::after {
    content: 'units';
    opacity: .5;
    font-size: 75%;
  }
}

.head {
  min-width: 250px;
}
</style>