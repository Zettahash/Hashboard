<template lang="html">
  <div class="welcome-banner">
    <h1>Welcome back, 
      <br>
      <img :src="profileImg()" class="wallet-logo" />
      <template v-if="ensEnabled && ens.name">{{ ens.name }}</template>
      <template v-else>Hasher #{{ hasherName() }}</template>
      </h1>
  </div>
</template>
<script setup>
import { profileImg, hasherName } from '@/utils/forum.js'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const forumProfile = computed(() => store.state.forumProfile)
const ens = computed(() => store.state.ens)
const ensEnabled = computed(() => {
  if (!forumProfile.value) { return false }
  if (String(forumProfile.value.data).indexOf('noens') >= 0) { return false }
  return forumProfile.value.ens === ens.value.name ? true : false
})
</script>
<style lang="scss" scoped>
h1{
  flex-wrap: wrap;
}
  .wallet-logo{height:1em;width:1em;border-radius: 1em;;}
  .welcome-banner{
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    height: max-content;
    padding: 30px 0;
    border-radius: 4px;
    // background: var(--neutral-7);
    h1{
      margin:0;
    }
  }
</style>