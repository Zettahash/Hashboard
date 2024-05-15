<template lang="">
  <div :class="!application.uiSidebarCollapse? 'flex-overview compact':'flex-overview'">
      <a v-for="(item, index) of zhMarkets" target="_blank" class="block ui-ele asset-complicated tile" :key="index" :title="item.title" :href="item.url">
        <div class="head">

        <div class="product-icon">
          <img :src="getIcon(item.img)">
        </div>
        <div class="type"><span>{{item.title}}</span> <span class="badge">{{item.type}}</span></div>
        <div class="title">Exchange ZH on {{item.title}} <i class="i-external-link"></i></div>


        </div>
      </a>
  </div>
</template>
<script>
import { getIcon } from '@/utils/general.js'
import { mapGetters } from 'vuex';
export default {
  name: 'PlacesToBuyZH',
  data() {
    return {
      zhMarkets: [
        {
          title: 'Dextools.io',
          url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x501a9614b47040b84033147adae98a0b097e8981',
          img: 'markets/dextools',
          type:'Decentralised Exchange'
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
@import 'src/assets/scss/constants';
@import 'src/assets/scss/ui';
.product-icon {
  grid-row: 1/3;

  img {
    height: 50px;
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