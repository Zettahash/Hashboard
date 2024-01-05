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
    getIcon(str) {
      let token = str.toLowerCase()
      try {
        return require(`/src/assets/img/${token}.png`)
      } catch (e) { console.log(e) }
      try {
        return require(`/src/assets/img/${token}.svg`)
      } catch (e) { console.log(e) }
      try {
        let tokenAlpha = token.replace(/-/g, '')
        return require(`/src/assets/img/${tokenAlpha}.png`)
      } catch (e) { console.log(e) }
    },
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