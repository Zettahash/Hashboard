<template lang="">
<div class="block small ui-ele" title="hash rate" v-if="payload.hashrate && payload.hashrate.value">
  <div class="head">
  <h3>Average Hashrate</h3>
  <h4>{{payload.hashrate.value.active_workers}} of {{payload.hashrate.value.unactive_workers + payload.hashrate.value.active_workers}} active worker{{payload.hashrate.value.active_workers>1?'s':''}}</h4>
  </div>
  <template v-for="(object, key, index) of payload.hashrate.value">
    <div :key="index" :data-target="key" v-if="index==activeHashrateIndex">
      <div class="data">{{object.toFixed(2)}} Th/s</div> 
      <div class="sub">
      <span>Hashrate average {{key.replace("hashrate_", '').replace('hour', 'hr')}}</span>
    </div>
    </div>
  </template>
  <div class="button-flex-organiser">
    <template v-for="(object, key, index) of payload.hashrate.value">
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
      return this.payload.hashrate.value
    }
  },
  methods: {
    stripHashrateText(str) {
      return str.replace("hashrate_", '').replace('hour', 'hr')
    },
  }
}
</script>

<style lang="scss" scoped>
.button-flex-organiser {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  // width: 100%;
}
</style>
