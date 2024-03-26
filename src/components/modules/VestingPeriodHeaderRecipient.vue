<template lang="html">
  <div :set="to = vested.actions[0].to" class="vesting-header">
    <span>Recipient:</span>
    <h2 class="flex">
      <span :title="to" class="main">{{ walletShortName(to) }}</span>
      <div class="actions sub flex">
        <a class="click-to-copy" @click="c2c" :data-copy="to"><i class="icon-copy"></i></a>
        <a :href="`https://etherscan.io/address/${to}`" target="_blank" rel="noreferrer"><i
            class="icon-external-link"></i></a>
      </div>
    </h2>
  </div>
</template>
<script>
import { walletShortName } from '@/utils/strings'
export default {
  name: 'VestingPeriodHeaderRecipient',
  props: {
    vested: Array,
  },
  methods: { walletShortName, }
}
</script>
<style lang="scss" scoped>
.vesting-header {
  width: max-content;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>