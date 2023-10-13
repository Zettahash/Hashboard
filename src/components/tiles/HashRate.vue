<template lang="">
<div class="block small" title="hash rate" v-if="hashRate">
  <div class="head">
  <h3>Average Hashrate</h3>
  <h4>{{hashRate.active_workers}} of {{hashRate.unactive_workers + hashRate.active_workers}} active worker{{hashRate.active_workers>1?'s':''}}</h4>
  </div>
  <template v-for="(object, key, index) of hashRate">
    <div :key="index" :data-target="key" v-if="index==activeHashrateIndex">
      <!-- {{object}} -->
      <!-- {{key}} -->
      <div class="data">{{object.toFixed(2)}} Th/s</div> 
      <div class="sub">
      <span>Hashrate average {{key.replace("hashrate_", '').replace('hour', 'hr')}}</span>
    </div>
      <!-- <div class="data">{{item.data}}</div>
   
    <div class="title">{{item.title}}</div> -->
    </div>
  </template>
  <div class="button-flex-organiser">
    <template v-for="(object, key, index) of hashRate">
      <div :key="index" v-if="key.indexOf('hashrate_')==0" :class="`btn compact${index==activeHashrateIndex?' active':''}`" :data-for="key" @click="activeHashrateIndex=index">{{key.replace("hashrate_", '').replace('hour', 'hr')}}</div>
    </template>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  name: 'HashRate',
  data() {
    return {
      activeHashrateIndex: 1,
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
    }),
    hashRate() {
      let hash = false
      for (const obj of this.payload) {
        if (obj.item === 'hashrate') {
          hash =  obj.value
        }
      }
      return hash
    }
  },
  methods: {
    stripHashrateText(str) {
      return str.replace("hashrate_", '').replace('hour', 'hr')
    },
  }
}
</script>

<style lang="scss">
.button-flex-organiser {
  display: flex;
  gap: 10px;
  justify-content: space-around;
}
</style>
